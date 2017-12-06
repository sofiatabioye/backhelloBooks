import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import crypto from 'crypto';

import models from '../models/index';
import { smtpTransport, forgotPassword, resetPassword, lateReturn, notifyAdmin, sendmail } from '../helper/mailer';

const Book = models.Book;
const User = models.User;
const BorrowStatus = models.BorrowStatus;
dotenv.config();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.TOKEN_SECRET;

// checks if user returned book late and sends user a mail with surcharge
const checkReturnDate = (expectedReturnDate, returnDate, email, res) => {
  const borrowTime = Math.round((expectedReturnDate - returnDate) / 864000);
  if (borrowTime > 1400) {
    const successMessage = `An e-mail has been sent to ${email} with further instructions.`;
    sendmail(lateReturn(email, expectedReturnDate), res, successMessage);
  }

  smtpTransport.sendMail(notifyAdmin(email, expectedReturnDate, returnDate), (error, response) => {
    if (error) {
      return `An error occured`;
    } else {
      return `An e-mail has been sent to admin`;
    }
    smtpTransport.close();
  });
};


export default {
  // user signup on hellobooks. This creates a new user
  create(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    if (email == null) {
      res.status(400).send({ message: 'Email cannot be null' });
    }
    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          res.status(400).send({ message: 'Email exists already' });
        } else {
          bcrypt.hash(password, salt, (err, hashedPassword) => User
            .create({
              username: req.body.username,
              email: req.body.email,
              password: hashedPassword,
              role: 'user',
              level: 'silver',
              image: '',
            })
            .then(() => {
              res.status(201).send({ message: 'User Created Successfully.' });
            })
            .catch(error => res.status(401).send(error)));
        }
      })

      .catch(error => res.status(500).send(error));
  },

  // User logs in to hellobooks. Generates token on login
  login(req, res) {
    const email = req.body.email;
    return User
      .findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          res.status(400).send({ message: 'Invalid login credentials' });
        } else {
          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
              const myToken = jwt.sign({ user: user.id,
                role: user.role,
                level: user.level,
                name: user.username,
                email: user.email },
              secret,
              { expiresIn: 72 * 60 * 60 });
              res.send(200, { token: myToken,
                message: 'You are signed in',
                userId: user.id,
                userName: user.username,
                level: user.level,
                role: user.role });
            } else {
              res.status(400).send({ message: 'Invalid login credentials' });
            }
          });
        }
      })
      .catch(error => res.status(500).send({ message: error }));
  },


  forgotPassword(req, res) {
    const userEmail = req.body.email;
    if (userEmail === null) {
      res.status(400).send({ message: "Email cannot be null" });
    }
    const today = new Date();
    const tokenExpires = new Date(today.getTime() + (24 * 60 * 60));
    const token = crypto.randomBytes(16).toString('hex');
    User
      .findOne({
        where: { email: userEmail }
      })
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'No account with that email address' });
        } else {
          return user
            .update({
              resetPasswordToken: "" || token,
              resetPasswordExpires: null || tokenExpires
            })
            .then(() => {
              const successMessage = `An e-mail has been sent to ${user.email} with further instructions.`;
              sendmail(forgotPassword(user.email, req.headers.host, token), res, successMessage);
            })
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(500).send(error));
  },

  resetPassword(req, res) {
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 10);
    User
      .findOne({
        where: { resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }
      })
      .then((user) => {
        if (!user) {
          res.status(404).send({ error: 'Password reset token is invalid or has expired.' });
        }
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        user.save();
        const successMessage = `Success! Your password has been changed..`;
        sendmail(resetPassword(user.email), res, successMessage);
      })
      .catch(error => res.status(500).send(error));
  },

  changePassword(req, res) {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    let hashedPassword = bcrypt.hashSync(newPassword, 10);
    return User
      .findOne({
        where: { id: req.params.userId, }
      })
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'Oops, you are in the wrong place' });
        } else {
          bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
              return user
                .update({
                  password: hashedPassword || user.password
                })
                .then(() => {
                  res.status(200).send({ message: 'Password Changed Successfully' });
                })
                .catch(error => res.status(400).send({ error: 'An error occured' }));
            } else {
              res.status(400).send({ message: 'Oops, your old password is incorrect' });
            }
          });
        }
      })
      .catch(error => res.status(500).send(error));
  },

  // Logged in user borrows book
  borrowBook(req, res) {
    const today = new Date();
    const DueDate = new Date(today.getTime() + (24 * 60 * 60 * 14000));
    // This checks if the bookId exists
    Book
      .findById(req.params.bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({ message: 'Book Not Found' });
        }
        // This checks for book availabity through quantity
        if (book.quantity < 1) {
          return res.status(200).send({ message: 'Book not available' });
        }
        BorrowStatus.findOne({
          where: { user_id: req.params.userId, book_id: book.id, returned: false
          } })
          .then((borrowstatus) => {
            if (borrowstatus) {
              res.status(400).send({ message: 'You have already borrowed this book', book: book });
            } else {
              // updates quantity of book borrowed and create borrow history
              book.update({ quantity: book.quantity - 1 });
              return BorrowStatus.create({
                user_id: req.params.userId,
                book_id: book.id,
                returned: false,
                borrowDate: today,
                expectedReturnDate: DueDate
              })
                .then(() => {
                  res.status(201).send({ message: 'Book Borrowed Successfully.', books: book });
                })
                .catch(error => res.status(400).send(error));
            }
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(500).send(error));
  },


  // Logged in user returns borrowed book
  returnBook(req, res) {
    const email = req.email;
    const today = new Date();
    Book
      .findById(req.params.bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({ message: 'Book Not found' });
        }
        BorrowStatus
          .findOne({ where: { user_id: req.params.userId, book_id: req.params.bookId, returned: false } })
          .then((borrowstatus) => {
            if (!borrowstatus) {
              return res.status(400).send({ message: 'You did not borrow this book' });
            }
            book.update({ quantity: book.quantity + 1 });
            return borrowstatus
              .update({
                returned: true || borrowstatus.returned,
                dateReturned: today
              })
              .then(() => {
                checkReturnDate(borrowstatus.expectedReturnDate, borrowstatus.dateReturned, email, res);
                res.status(200).send({ message: 'Book returned successfully.' });
              })
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(500).send(error));
  },

  // Logged in user views his/her borrow history
  borrowHistory(req, res) {
    const offset = req.query.offset || null;
    const limit = req.query.limit || null;
    User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'User Not found' });
        } else {
          BorrowStatus
            .findOne({ where: { user_id: req.params.userId } })
            .then((borrowstatus) => {
              if (!borrowstatus) {
                res.status(201).send({ message: 'You have not borrowed any book' });
              } else {
                BorrowStatus
                  .findAndCountAll({
                    offset,
                    limit,
                    where: { user_id: [req.params.userId] },
                    include: [
                      { model: Book,
                        attributes: ['title'],
                      }]
                  })
                  .then((borrowstat) => {
                    res.status(200).send({
                      UserBorrowHistory: borrowstat.rows,
                      pagination: {
                        totalCount: borrowstat.count,
                        pageSize: borrowstat.rows.length,
                        pageCount: Math.ceil(borrowstat.count / limit),
                        page: Math.floor(offset / limit) + 1
                      }
                    });
                  })
                  .catch(error => res.status(400).send(error));
              }
            })
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(500).send(error));
  },

  // gets books which user has borrowed but not returned
  booksNotReturned(req, res) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'User Not found' });
        } else {
          BorrowStatus
            .findOne({ where: { user_id: req.params.userId } })
            .then((borrowstatus) => {
              if (!borrowstatus) {
                res.status(201).send({ message: 'You have not borrowed any book' });
              } else {
                BorrowStatus
                  .findAll({ where: { user_id: req.params.userId, returned: false },
                    include: [
                      { model: Book,
                        attributes: ['title'],
                      }]
                  })
                  .then((borrowstat) => {
                    res.status(200).send({ UserBorrowHistory: borrowstat });
                  })
                  .catch(error => res.status(400).send(error));
              }
            })
            .catch(error => res.status(500).send(error));
        }
      })
      .catch(error => res.status(500).send(error));
  },


};

