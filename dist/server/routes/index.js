'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _book = require('../controllers/book');

var _book2 = _interopRequireDefault(_book);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

var _category = require('../controllers/category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = function routes(app, authorize, checkadmin, canBorrow) {
    app.get('/api', function (req, res) {
        return res.status(200).send({
            message: 'Welcome to the Libraries API!'
        });
    });

    // User Login Routes
    app.post('/api/v1/users/signup', _user2.default.create);
    app.post('/api/v1/users/signin', _user2.default.login);
    app.post('/api/v1/user/:userId/changepassword', _user2.default.changePassword);
    app.post('/api/v1/forgotpassword', _user2.default.forgotPassword);
    app.post('/api/v1/reset/:token', _user2.default.resetPassword);

    // This contains the routes that allow a logged in admin user to modify and create books
    app.post('/api/v1/books/create', authorize.authorize, checkadmin.checkAdmin, _book2.default.create);
    app.get('/api/v1/books', _book2.default.list);
    app.get('/api/v1/books/categories/:title', _book2.default.getBooksByCat);
    app.get('/api/v1/books/:bookId', _book2.default.retrieve);
    app.put('/api/v1/books/:bookId', authorize.authorize, checkadmin.checkAdmin, _book2.default.update);
    app.delete('/api/v1/books/:bookId', authorize.authorize, checkadmin.checkAdmin, _book2.default.destroy);

    // This contains the routes that  allow a logged in admin to modify and create categories
    app.post('/api/v1/categories/create', authorize.authorize, checkadmin.checkAdmin, _category2.default.create);
    app.get('/api/v1/categories', _category2.default.list);
    app.get('/api/v1/categories/:catId', authorize.authorize, checkadmin.checkAdmin, _category2.default.retrieve);
    app.put('/api/v1/categories/:catId', authorize.authorize, checkadmin.checkAdmin, _category2.default.update);
    app.delete('/api/v1/categories/:catId', authorize.authorize, checkadmin.checkAdmin, _category2.default.destroy);

    // This contains routes that allow a logged in user to borrow and return books and borrow history
    app.post('/api/v1/users/:userId/books/:bookId/borrow', authorize.authorize, canBorrow.canBorrow, _user2.default.borrowBook);
    app.put('/api/v1/users/:userId/books/:bookId/return', authorize.authorize, _user2.default.returnBook);
    app.get('/api/v1/users/:userId/history', authorize.authorize, _user2.default.borrowHistory);
    app.get('/api/v1/users/:userId/books', authorize.authorize, _user2.default.booksNotReturned);

    // Method not allowed
    app.all('/api/v1/books/:bookId', function (req, res) {
        return res.status(405).send({
            message: 'Method Not Allowed'
        });
    });
};

exports.default = routes;