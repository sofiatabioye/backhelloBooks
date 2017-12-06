import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import models from '../models/index';

const Book = models.Book;
/**
 * @export
 * @param {any} req 
 * @param {any} res
 * @param {any} next
 * @returns {validatedInput} checks if form input is filled correctly
 */
export default (req, res, next) => {
  let errors = {};
  const regex = "/^[a-zA-Z]/";
  if (!req.body.title) {
    errors.title = "Title cannot be empty";
  }
  if (req.body.title.length < 2 || req.body.title.length > 20) {
    errors.title = 'Title must contain a minimum of 2 characters';
  }
  if (Validator.isAlpha(req.body.author) === false) {
    errors.author = 'Author cannot contain such characters';
  }
  if (!req.body.author) {
    errors.author = "Author cannot be empty";
  }
  if (req.body.author.length < 3 || req.body.title.length > 50) {
    errors.author = 'Author must contain a minimum of 3 characters and a maximum of 50';
  }
  if (!req.body.ISBN) {
    errors.ISBN = "ISBN cannot be empty";
  } else if (req.body.ISBN.length < 10 || req.body.ISBN.length > 13) {
    errors.ISBN = "ISBN number must be between 10 ans 13 characters";
  }

  if (isNaN(req.body.ISBN)) {
    errors.ISBN = "ISBN must be numbers";
  }

  if (!req.body.description) {
    errors.description = "Description cannot be empty";
  } else if (req.body.description.length < 10) {
    errors.description = "Description must contain at least than 10 characters";
  }

  if (!req.body.category) {
    errors.category = "category cannot be empty";
  } else if (req.body.category.length < 3) {
    errors.category = "category must contain at least than 2 characters";
  }
  if (req.body.category.match(regex)) {
    errors.category = " Category matchin ";
  }

  if (!req.body.bookEdition) {
    errors.edition = "Edition cannot be empty";
  } else if (req.body.bookEdition.length !== 4) {
    errors.edition = "Edition year must contain 4 characters";
  }

  if (isNaN(req.body.bookEdition)) {
    errors.ISBN = "Year of edition must contain numbers";
  }

  if (!req.body.publisher) {
    errors.publisher = "Publisher cannot be empty";
  } else if (req.body.publisher.length < 3) {
    errors.publisher = "Publisher name must conatin at least 3 characters";
  }

  if (!req.body.bookSize) {
    errors.size = "Size cannot be empty";
  } else if (req.body.bookSize <= 2) {
    errors.size = "Book Size cannot be less than 2";
  }

  if (!req.body.quantity) {
    errors.quantity = "Quantity cannot be empty";
  }
  if (req.body.quantity < 1) {
    errors.quantity = "Book quantity cannot be less than 1";
  }
  if (isNaN(req.body.quantity)) {
    errors.quantity = "quantity must be a number";
  }
  if (!req.body.image) {
    errors.image = "Image cannot be empty";
  }

  Book.findAll({
    ISBN: req.body.ISBN
  })
    .then(isbn => {
      res.status(409).send({ message: 'ISBN already exists. It must be unique' });
    })
    .catch(error => res.status(400).send(error));


  if (isEmpty(errors)) {
    next();
  } else {
    res.status(400).send({ errors: errors });
  }
};
