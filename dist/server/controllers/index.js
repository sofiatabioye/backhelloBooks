'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _book = require('./book');

var _book2 = _interopRequireDefault(_book);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    books: _book2.default,
    users: _user2.default,
    categories: _category2.default
};