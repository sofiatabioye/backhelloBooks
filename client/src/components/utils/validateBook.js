import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 * 
 * @export
 * @param {any} data 
 * @returns {validatedInput} checks if form input is filled correctly
 */
export default function validateBook(data) {
  let errors = {};

  if (data.title.length < 2 || data.title.length > 20) {
    errors.title = 'Title must contain a minimum of 2 characters';
  }
  if (Validator.isAlpha(data.author) === false) {
    errors.author = 'Author cannot contain such characters';
  }
  if (data.author.length < 3 || data.title.length > 50) {
    errors.author = 'Author must contain a minimum of 3 characters and a maximum of 50';
  }

  if (data.ISBN.length < 10 || data.ISBN.length > 13) {
    errors.isbn = "ISBN number must be between 10 ans 13 characters";
  }
  if (data.description.length < 10) {
    errors.description = "Description must be longer than 10 characters";
  }

  if (data.bookEdition.length !== 4) {
    errors.edition = "Edition year contains a minimum of 4 characters";
  }

  if (data.publisher.length < 4) {
    errors.publisher = "Publisher name must be longer than 4 characters";
  }
  if (data.bookSize <= 5) {
    errors.size = "Book Size cannot be less than 5";
  }
  if (data.quantity < 1) {
    errors.quantity = "Book quantity cannot be less than 1";
  }
  if (data.image === "") {
    errors.image = "Image cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
