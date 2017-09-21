import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.title)) {
        errors.title = 'This field is required ';

    }

    /** 
    if (Validator.isEmpty(data.description)) {
        errors.description = 'This field is required ';

    }
    if (Validator.isEmpty(data.quantity)) {
        errors.quantity = 'This field is required ';

    }
    if (Validator.isEmpty(data.image)) {
        errors.image = 'This field is required ';
    }

    if (Validator.isEmpty(data.author)) {
        errors.author = 'This field is required ';
    }
    if (Validator.isEmpty(data.ISBN)) {
        errors.ISBN = 'This field is required ';
    }
    if (Validator.isEmpty(data.bookEdition)) {
        errors.bookEdition = 'This field is required ';
    }

    if (Validator.isEmpty(data.publisher)) {
        errors.publisher = 'This field is required ';
    }
    if (Validator.isEmpty(data.bookSize)) {
        errors.bookSize = 'This field is required ';
    }
*/

    return {
        errors,
        isValid: isEmpty(errors)
    };


}
