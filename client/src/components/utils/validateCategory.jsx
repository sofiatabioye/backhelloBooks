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

  if (data.length < 3 || data.length > 20) {
    errors.newCategory = 'Title must contain a minimum of 3 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
