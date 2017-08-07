
//import Book from "../models/book";
//import User from "../models/user";
const Book = require('../models').Book;
const User = require('../models').User;
//const History = require('../db/models').History;
const Library = require('../models').Library;

module.exports = {
  create(req, res) {  
     return Book
      .create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity,
        image: req.body.image,
        author: req.body.author,
        ISBN: req.body.isbn,
        bookEdition: req.body.edition,
        publisher: req.body.publisher,
        bookSize: req.body.size,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  
},

  list(req, res) {
    return Book
    .all()
    .then(book => res.status(200).send({books:book, message:'All books'}))
    .catch(error => res.status(400).send(error));

  },

  retrieve(req, res) {
     return Book
     .findById(req.params.bookId)
     .then(book => {
      if (!book) {
        return res.status(404).send({
          message: 'Book Not Found',
        });
      }
      return res.status(200).send(book);
    })
    .catch(error => res.status(400).send(error));

  },
  
  update(req, res) {
   
  return Book
    .findById(req.params.bookId)
    .then(book => {
      if (!book) {
        return res.status(404).send({
          message: 'Book Not Found',
        });
      }
      return book
        .update({
          title: req.body.title || book.title,
          description: req.body.description || book.description,
          category: req.body.category || book.category,
          quantity: req.body.quantity || book.quantity,
          image: req.body.image || book.image,
        })
        .then(() => res.status(200).send(book))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error.toString()));
    })
    .catch((error) => res.status(400).send(error.toString()));
  },

  destroy(req, res) {
  return Book
    .findById(req.params.bookId)
    .then(book => {
      if (!book) {
        return res.status(400).send({
          message: 'Book Not Found',
        });
      }
      return book
        .destroy()
        .then(() => res.status(204).send({ message: 'Book deleted successfully.' }))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },

  borrowBook(req, res){ 
  // return User
   //.findById(req.params.userId)
   
  },
   
  
 /** borrow(req, res) {
    Book.findById(req.body.bookId)
      .then(book => {
        if (!book) {
          res.status(404).send({ message: 'Not found' })
        }
        return History.create({
          userId: req.params.userId,
          book: book.title
        })
        .then(history => {
          res.status(201).send({ message: 'Book borrowed successfully.' })
        })
        .catch(error => res.status(400).send(error));
      })
  },

  userBooks(req, res) {
    return History.findAll({ where: { userId: req.params.userId }})
      .then(books => {
        res.status(200).send(books)
      })
      .catch(err => res.status(400).send(err));    
  }
  **/
};