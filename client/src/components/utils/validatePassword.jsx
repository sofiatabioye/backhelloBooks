import Validator from 'validator';
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
    var passw = /^[A-Za-z]\w{7,14}$/;

    if (data.newPassword.match(passw)) {
        errors.newPassword = 'newPassword must be between 7 to 15 characters and include uppercase, lowercase, number/special characters';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is required ';
    }
    if (data.confirmPassword !== data.newPassword) {
        errors.confirmPassword = 'Passwords do not match ';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
