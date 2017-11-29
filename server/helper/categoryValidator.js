import { check, validationResult } from 'express-validator/check';
import { matchedData, sanitize } from 'express-validator/filter';
import { isEmpty } from 'lodash/isEmpty';

export default {

    checkCat(req, res, next) {
        check('title').isEmail().withMessage('must be an email')

        // Every sanitizer method in the validator lib is available as well!
            .trim()
            .normalizeEmail(),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.mapped() });
            }
            conole.log(req, errors);

            // matchedData returns only the subset of data validated by the middleware
            const user = matchedData(req);
        };
    }
};
