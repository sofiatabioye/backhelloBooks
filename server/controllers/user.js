const User = require('../models').User;
const Book = require('../models').Book;
const BorrowStatus = require('../models').BorrowStatus;
const jwt = require('jsonwebtoken');
module.exports = {
  create(req, res) {
    return User
      .create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "user",
        level: "silver",
        image: "none-for-now",
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  login(req, res) {
    return User
      .findOne({
        where: { username: req.body.username,
          password: req.body.password
        } })
      .then((user) => {
        if (!user) {
          res.send({message: 'User not found' });
        } else {
          const myToken = jwt.sign({ user: user.id, role: user.role }, 
            'secret',
            { expiresIn: 24 * 60 * 60 });
          res.send(200, { token: myToken,
            userId: user.id,
            userName: user.username,
            role: user.role });
        }
      });
  },

  borrowBook(req, res) {
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
        return BorrowStatus.create({
          userId: req.params.userId,
          bookId: book.id,
          bookTitle: book.title,
          returned: false
        })
        .then(borrowstatus => {
          res.status(201).send({ message: 'Book borrowed successfully.' })
        })
        .catch(error => res.status(400).send(error));
        })
        then(book => {
          return book
          .update ({ quantity: quantity -1 })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
        
  },

  returnBook(req, res){
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
        return BorrowStatus .findOne({where: { userId: req.params.userId, bookId: req.params.bookId} })
          return borrowstatus
           .update({
            returned: true
          })
        .then(borrowstatus => {
          res.status(201).send({ message: 'Book returned successfully.' })
        })
        .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

/**  logout(req, res) {
    invalidToken.create({
      token.req.headers['x-access-token'],
    })
    .then( () => {
      res.send({message: 'You have logged out successfully'});
    })
    .catch( (error) => {
      res.status(401).send(error);
    });
  },
  **/
};