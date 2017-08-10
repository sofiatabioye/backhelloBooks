'use strict';
import models from '../models/index';
const Book = models.Book;
const User = models.User;


export default {
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
      .then(book => res.status(201).send({message: 'Book Created Successfully.'}))
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
        .then(() => res.status(200).send(book))  // Send back the updated book.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
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

 
 
};