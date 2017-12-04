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

  if (data.newCategory.length < 2 || data.title.length > 20) {
    errors.title = 'Title must contain a minimum of 2 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
