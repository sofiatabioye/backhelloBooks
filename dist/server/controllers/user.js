'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _mailer = require('../helper/mailer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Book = _index2.default.Book;
var User = _index2.default.User;
var BorrowStatus = _index2.default.BorrowStatus;
_dotenv2.default.config();
var salt = _bcrypt2.default.genSaltSync(10);
var secret = process.env.TOKEN_SECRET;

// checks if user returned book late and sends user a mail with surcharge
var checkReturnDate = function checkReturnDate(expectedReturnDate, returnDate, email) {
    var borrowTime = Math.round((expectedReturnDate - returnDate) / 864000);
    if (borrowTime > 1400) {
        _mailer.smtpTransport.sendMail((0, _mailer.lateReturn)(email, expectedReturnDate), function (error, response) {
            if (error) {
                return 'An error occured';
            } else {
                return 'An e-mail has been sent to ' + email + ' with further instructions.';
            }
            _mailer.smtpTransport.close();
        });
    }
};

exports.default = {
    // user signup on hellobooks. This creates a new user
    create: function create(req, res) {
        var usernames = req.body.username;
        var password = req.body.password;
        if (usernames == null) {
            res.status(400).send({ message: 'Username cannot be null' });
        }
        User.findOne({ where: { username: usernames } }).then(function (user) {
            if (user) {
                res.status(400).send({ message: 'Username exists already' });
            } else {
                _bcrypt2.default.hash(password, salt, function (err, hashedPassword) {
                    return User.create({
                        username: usernames,
                        email: req.body.email,
                        password: hashedPassword,
                        role: 'user',
                        level: 'silver',
                        image: ''
                    }).then(function () {
                        res.status(201).send({ message: 'User Created Successfully.' });
                    }).catch(function (error) {
                        return res.status(401).send(error);
                    });
                });
            }
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    },


    // User logs in to hellobooks. Generates token on login
    login: function login(req, res) {
        return User.findOne({
            where: { $or: [{
                    email: req.body.identifier
                }, {
                    username: req.body.identifier
                }]
            }
        }).then(function (user) {
            if (!user) {
                res.status(404).send({ message: 'Invalid login credentials' });
            } else {
                _bcrypt2.default.compare(req.body.password, user.password, function (err, result) {
                    if (result) {
                        var myToken = _jsonwebtoken2.default.sign({ user: user.id,
                            role: user.role,
                            level: user.level,
                            name: user.username,
                            email: user.email }, secret, { expiresIn: 72 * 60 * 60 });
                        res.send(200, { token: myToken,
                            userId: user.id,
                            userName: user.username,
                            level: user.level,
                            role: user.role });
                    } else {
                        res.status(400).send({ message: 'Invalid login credentials' });
                    }
                });
            }
        }).catch(function (error) {
            return res.status(500).send({ message: error });
        });
    },
    forgotPassword: function forgotPassword(req, res) {
        var userEmail = req.body.email;
        var today = new Date();
        var tokenExpires = new Date(today.getTime() + 24 * 60 * 60);
        var token = _crypto2.default.randomBytes(16).toString('hex');
        User.findOne({
            where: { email: userEmail }
        }).then(function (user) {
            if (!user) {
                res.status(404).send({ message: 'No account with that email address' });
            } else {
                return user.update({
                    resetPasswordToken: "" || token,
                    resetPasswordExpires: null || tokenExpires
                }).then(function () {
                    _mailer.smtpTransport.sendMail((0, _mailer.forgotPassword)(user.email, req.headers.host, token), function (error, response) {
                        if (error) {
                            res.status(400).send({ message: error });
                        } else {
                            res.status(200).send('An e-mail has been sent to ' + user.email + ' with further instructions.');
                        }

                        _mailer.smtpTransport.close();
                    });
                }).catch(function (error) {
                    return res.status(400).send(error);
                });
            }
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    },
    resetPassword: function resetPassword(req, res) {
        var password = req.body.password;
        var hashedPassword = _bcrypt2.default.hashSync(password, 10);
        User.findOne({
            where: { resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }
        }).then(function (user) {
            if (!user) {
                res.status(404).send({ error: 'Password reset token is invalid or has expired.' });
            }
            user.password = hashedPassword;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            user.save();
            _mailer.smtpTransport.sendMail((0, _mailer.resetPassword)(user.email), function (error, response) {
                if (error) {
                    res.status(400).send({ message: error });
                } else {
                    res.status(200).send({ message: 'Success! Your password has been changed..' });
                }

                _mailer.smtpTransport.close();
            });
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    },
    changePassword: function changePassword(req, res) {
        var password = req.body.password;
        var newPassword = req.body.newPassword;
        var hashedPassword = _bcrypt2.default.hashSync(newPassword, 10);
        return User.findOne({
            where: { id: req.params.userId }
        }).then(function (user) {
            if (!user) {
                res.status(404).send({ message: 'Oops, you are in the wrong place' });
            } else {
                _bcrypt2.default.compare(password, user.password, function (err, result) {
                    if (result) {
                        return user.update({
                            password: hashedPassword || user.password
                        }).then(function () {
                            res.status(200).send({ message: 'Password Changed Successfully' });
                        }).catch(function (error) {
                            return res.status(400).send({ error: 'An error occured' });
                        });
                    } else {
                        res.status(400).send({ message: 'Oops, your old password is incorrect' });
                    }
                });
            }
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    },


    // Logged in user borrows book
    borrowBook: function borrowBook(req, res) {
        var today = new Date();
        var DueDate = new Date(today.getTime() + 24 * 60 * 60 * 14000);
        // This checks if the bookId exists
        Book.findById(req.params.bookId).then(function (book) {
            if (!book) {
                res.status(404).send({ message: 'Book Not found' });
            }
            // This checks for book availabity through quantity
            if (book.quantity < 1) {
                res.status(200).send({ message: 'Book not available' });
            } else {
                BorrowStatus.findOne({
                    where: { user_id: req.params.userId, book_id: book.id, returned: false
                    } }).then(function (borrowstatus) {
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
                        }).then(function () {
                            res.status(201).send({ message: 'Book Borrowed Successfully.', books: book });
                        }).catch(function (error) {
                            return res.status(400).send(error, "======");
                        });
                    }
                }).catch(function (error) {
                    return res.status(400).send(error, "+++++");
                });
            }
        }).catch(function (error) {
            return res.status(500).send(error, "------");
        });
    },


    // Logged in user returns borrowed book
    returnBook: function returnBook(req, res) {
        console.log(req.email, "=====");
        var email = req.email;
        var today = new Date();
        Book.findById(req.params.bookId).then(function (book) {
            if (!book) {
                res.status(404).send({ message: 'Book Not found' });
            }
            BorrowStatus.findOne({ where: { user_id: req.params.userId, book_id: req.params.bookId, returned: false } }).then(function (borrowstatus) {
                if (!borrowstatus) {
                    res.status(412).send({ message: 'You did not borrow this book' });
                }
                book.update({ quantity: book.quantity + 1 });
                return borrowstatus.update({
                    returned: true || borrowstatus.returned,
                    dateReturned: today
                }).then(function () {
                    checkReturnDate(borrowstatus.expectedReturnDate, borrowstatus.dateReturned, email);
                    res.status(200).send({ message: 'Book returned successfully.' });
                }).catch(function (error) {
                    return res.status(400).send(error);
                });
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    },


    // Logged in user views his/her borrow history
    borrowHistory: function borrowHistory(req, res) {
        var offset = req.query.offset || null;
        var limit = req.query.limit || null;
        User.findById(req.params.userId).then(function (user) {
            if (!user) {
                res.status(404).send({ message: 'User Not found' });
            } else {
                BorrowStatus.findOne({ where: { user_id: req.params.userId } }).then(function (borrowstatus) {
                    if (!borrowstatus) {
                        res.status(201).send({ message: 'You have not borrowed any book' });
                    } else {
                        BorrowStatus.findAndCountAll({
                            offset: offset,
                            limit: limit,
                            where: { user_id: [req.params.userId] },
                            include: [{ model: Book,
                                attributes: ['title']
                            }]
                        }).then(function (borrowstat) {
                            res.status(200).send({
                                UserBorrowHistory: borrowstat.rows,
                                pagination: {
                                    totalCount: borrowstat.count,
                                    pageSize: borrowstat.rows.length,
                                    pageCount: Math.ceil(borrowstat.count / limit),
                                    page: Math.floor(offset / limit) + 1
                                }
                            });
                        }).catch(function (error) {
                            return res.status(400).send(error);
                        });
                    }
                }).catch(function (error) {
                    return res.status(400).send(error);
                });
            }
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    },


    // gets books which user has borrowed but not returned
    booksNotReturned: function booksNotReturned(req, res) {
        User.findById(req.params.userId).then(function (user) {
            if (!user) {
                res.status(404).send({ message: 'User Not found' });
            } else {
                BorrowStatus.findOne({ where: { user_id: req.params.userId } }).then(function (borrowstatus) {
                    if (!borrowstatus) {
                        res.status(201).send({ message: 'You have not borrowed any book' });
                    } else {
                        BorrowStatus.findAll({ where: { user_id: req.params.userId, returned: false },
                            include: [{ model: Book,
                                attributes: ['title']
                            }]
                        }).then(function (borrowstat) {
                            res.status(200).send({ UserBorrowHistory: borrowstat });
                        }).catch(function (error) {
                            return res.status(400).send(error);
                        });
                    }
                }).catch(function (error) {
                    return res.status(500).send(error);
                });
            }
        }).catch(function (error) {
            return res.status(500).send(error);
        });
    }
};