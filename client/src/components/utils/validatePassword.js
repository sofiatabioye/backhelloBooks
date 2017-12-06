import isEmpty from 'lodash/isEmpty';


/**
 * 
 * 
 * @export
 * @param {any} data 
 * @returns {validatedInput} checks if password form input is correctly filled
 */
export default function validateInput(data) {
  let errors = {};

  if (data.newPassword.length < 4 || data.newPassword.length > 20) {
    errors.newPassword = 'Password must contain a minimum of 4 characters and maximum of 10 ';
  }

  if (data.confirmPassword !== data.newPassword) {
    errors.confirmPassword = 'Passwords do not match ';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
