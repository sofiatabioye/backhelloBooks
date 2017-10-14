'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var secret = process.env.TOKEN_SECRET;

exports.default = {
    // verifies user token to confirm that user is logged in
    authorize: function authorize(req, res, next) {
        var auth = req.headers.authorization;
        var token = req.body.token || req.headers['x-access-token'] || auth;
        if (token) {
            _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
                if (err) {
                    var reply = 'You are not signed in';
                    res.status(403).send({ message: reply });
                } else {
                    req.userId = decoded.user;
                    req.locals = decoded.role;
                    req.level = decoded.level;
                    req.email = decoded.email;
                    next();
                }
            });
        } else {
            res.status(412).send({ message: 'Token not provided' });
        }
    }
};