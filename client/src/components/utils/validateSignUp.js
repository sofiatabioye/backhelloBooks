import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * 
 * 
 * @export
 * @param {any} data 
 * @returns {validatedInput} from user sign up form, checks if data is filled correctly
 */
export default function validateInput(data) {
    let errors = {};

    if (data.username.length < 3 || data.username.length > 10) {
        errors.username = 'Username must contain a minimum of 4 characters and maximum of 10 ';
    }
    if (Validator.isAlpha(data.username) !== true) {
        errors.username = 'Username cannot contain such characters ';
    }

    if (data.password.length < 6) {
        errors.password = 'Password must contain a minimum of 6 characters ';
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
