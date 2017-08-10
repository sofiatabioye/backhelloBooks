import models from '../models/index';
const Book = models.Book;
const User = models.User;
const BorrowStatus = models.BorrowStatus;
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
const dotenv2 = dotenv.config();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.TOKEN_SECRET;


export default {
  create(req, res) {
    User .findOne({where: {username: req.body.username}})
    .then(user => {
      if(user){
        res.status(400).send({message: 'Username exists already'})
      }
      else {
        bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
         return User
        .create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: "user",
        level: "silver",
        image: "none-for-now",
        })
      .then(user => {
                    res.status(201).send({ message: 'User Created Successfully.' })
                    })
      .catch(error => res.status(401).send(error));
      })
      }
    })

   .catch(error => res.status(400).send(error));
   
  },

  login(req, res) {
    return User
      .findOne({
        where: { username: req.body.username,} 
      })
      .then((user) => {
        if (!user) {
          res.status(404).send({message: 'User not found' });
        } else {
        bcrypt.compare(req.body.password, user.password, (err, result)=> {
          if(result){
            console.log(secret);
             const myToken = jwt.sign({ user: user.id, role: user.role }, 
            secret,
            { expiresIn: 24 * 60 * 60 });
            res.send(200, { token: myToken,
            userId: user.id,
            userName: user.username,
            role: user.role });
          }
          else {
            res.status(400).send({message: "User details are not correct"})
          }
        });  
        }
      })
      .catch(error => res.status(400).send(error));
  },
  


  borrowBook(req, res){
    const today = new Date();
    const DueDate = new Date(today.getTime() + (24 * 60 * 60 * 14000));
      //This checks if the user Id exists
     User .findById(req.params.userId) 
      .then(user => {
        if (!user) {
          res.status(404).send({ message: 'User Not found' })
        }
        // This checks if the bookId exists
        Book 
        .findById(req.params.bookId)
        .then(book => {
          if (!book) {
            res.status(404).send({ message: 'Book Not found' })
          }
          // This checks for book availabity through quantity
            if (book.quantity < 1){
              
              res.status(200).send({message: 'Book not available'})
            }
            else {
              BorrowStatus.findOne({where: {user_id: req.params.userId, book_id: book.id, returned: false }})
             .then(borrowstatus => {

                 if(borrowstatus){
                    res.status(400).send({message: 'You have already borrowed this book'});
                  }
                  //updates quantity of book borrowed and create borrow history
                 else{
                    book . update({ quantity: book.quantity - 1  })
                    return BorrowStatus.create({
                    user_id: req.params.userId,
                    book_id: book.id,
                    returned: false,
                    borrowDate: today,
                    expectedReturnDate: DueDate
                    })      
                   .then(borrowstatus => {
                    res.status(201).send({ message: 'Book Borrowed Successfully.' })
                    })
                   .catch(error => res.status(400).send(error));
                 }
             })
             .catch(error => res.status(400).send(error));
          }
      })
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
      
  },

  returnBook(req, res){
    const today = new Date();
     User .findById(req.params.userId) 
      .then(user => {
        if (!user) {
          res.status(404).send({ message: 'User Not found' })
        }
        Book 
        .findById(req.params.bookId)
        .then(book => {
          if (!book) {
            res.status(404).send({ message: 'Book Not found' })
          }
          BorrowStatus 
          .findOne({where: { user_id: req.params.userId, book_id: req.params.bookId} })
          .then(borrowstatus => {
          if(!borrowstatus){
            res.status(200).send({message: 'User did not borrow Book'});
          }
          book .update({ quantity: book.quantity + 1 })
          return borrowstatus
           .update({
            returned: true || borrowstatus.returned,
            dateReturned: today
          })
         
        .then(borrowstatus => {
          res.status(200).send({ message: 'Book returned successfully.' })
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
      })
  },
  borrowHistory (req, res){
      User .findById(req.params.userId) 
      .then(user => {
        if (!user) {
          res.status(404).send({ message: 'User Not found' })
        }
        else{
          BorrowStatus
          .findOne ({ where: {user_id: req.params.userId}})
          .then(borrowstatus => {
            if(!borrowstatus){
            res.status(201).send({message: "You have not borrowed any book"})
            }
            else{
              BorrowStatus
              .findAll ({ where: {user_id: req.params.userId}})
              .then(borrowstatus=> {
                 res.status(200).send({UserBorrowHistory:borrowstatus})
              })
              .catch(error => res.status(400).send(error));
            }
          })
          .catch(error => res.status(400).send(error));
        }
      })  
       .catch(error => res.status(400).send(error));
  },
  userNotReturned(req, res){
     User .findById(req.params.userId) 
      .then(user => {
        if (!user) {
          res.status(404).send({ message: 'User Not found' })
        }
        else{
          BorrowStatus
          .findOne ({ where: {user_id: req.params.userId}})
          .then(borrowstatus => {
            if(!borrowstatus){
            res.status(201).send({message: "You have not borrowed any book"})
            }
            else{
              BorrowStatus
              .findAll ({ where: {user_id: req.params.userId, returned:false}})
              .then(borrowstatus=> {
                 res.status(200).send({UserBorrowHistory:borrowstatus})
              })
              .catch(error => res.status(400).send(error));
            }
          })
          .catch(error => res.status(400).send(error));
        }
      })  
       .catch(error => res.status(400).send(error));
  }
  

  
    
 

};
