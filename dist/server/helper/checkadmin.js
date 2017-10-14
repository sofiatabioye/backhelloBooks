'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {

    // Checks if logged in user is admin
    checkAdmin: function checkAdmin(req, res, next) {
        var userRole = req.locals;
        if (userRole !== 'admin') {
            var message = 'You do not have the privilege';
            res.status(401).send({ message: message });
        } else {
            next();
        }
    }
};