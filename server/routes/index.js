import booksController from '../controllers/book';
import usersController from '../controllers/user';
import categoriesController from '../controllers/category';

const routes = (app, authorize, checkadmin, canBorrow) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the Libraries API!',
    }));


    // User Login Routes
    app.post('/api/v1/users/signup', usersController.create);
    app.post('/api/v1/users/signin', usersController.login);
    app.post('/api/v1/user/:userId/changepassword', usersController.changePassword);
    app.post('/api/v1/forgotpassword', usersController.forgotPassword);
    app.post('/api/v1/reset/:token', usersController.resetPassword);

    // This contains the routes that allow a logged in admin user to modify and create books
    app.post('/api/v1/books/create', authorize.authorize, checkadmin.checkAdmin, booksController.create);
    app.get('/api/v1/books', booksController.list);
    app.get('/api/v1/books/categories/:title', booksController.getBooksByCat);
    app.get('/api/v1/books/:bookId', booksController.retrieve);
    app.put('/api/v1/books/:bookId', authorize.authorize, checkadmin.checkAdmin, booksController.update);
    app.delete('/api/v1/books/:bookId', authorize.authorize, checkadmin.checkAdmin, booksController.destroy);

    // This contains the routes that  allow a logged in admin to modify and create categories
    app.post('/api/v1/categories/create', authorize.authorize, checkadmin.checkAdmin, categoriesController.create);
    app.get('/api/v1/categories', categoriesController.list);
    app.get('/api/v1/categories/:catId', authorize.authorize, checkadmin.checkAdmin, categoriesController.retrieve);
    app.put('/api/v1/categories/:catId', authorize.authorize, checkadmin.checkAdmin, categoriesController.update);
    app.delete('/api/v1/categories/:catId', authorize.authorize, checkadmin.checkAdmin, categoriesController.destroy);

    // This contains routes that allow a logged in user to borrow and return books and borrow history
    app.post('/api/v1/users/:userId/books/:bookId/borrow', authorize.authorize, canBorrow.canBorrow, usersController.borrowBook);
    app.put('/api/v1/users/:userId/books/:bookId/return', authorize.authorize, usersController.returnBook);
    app.get('/api/v1/users/:userId/history', authorize.authorize, usersController.borrowHistory);
    app.get('/api/v1/users/:userId/books', authorize.authorize, usersController.booksNotReturned);


    // Method not allowed
    app.all('/api/v1/books/:bookId', (req, res) =>
        res.status(405).send({
            message: 'Method Not Allowed',
        }));
};

export default routes;
