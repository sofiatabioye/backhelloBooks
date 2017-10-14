'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    // Checks if logged in user is admin
    canBorrow: function canBorrow(req, res, next) {
        var userLevel = req.level;
        console.log(userLevel);
        if (userLevel === 'silver') {
            var message = 'You cannot borrow more than one book for now';
            res.status(401).send({ message: message });
        } else {
            next();
        }
    }
};