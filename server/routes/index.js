const librariesController = require('../controllers').libraries;
const booksController = require('../controllers').books;
const usersController = require('../controllers').users;
const categoriesController = require('../controllers').categories;
const authorize = require('../helper/auth.js').authorize;
const checkadmin = require('../helper/checkadmin.js').checkAdmin;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Libraries API!',
  }));


  // User Login Routes
  app.post('/api/users/signup', usersController.create);
  app.post('/api/users/login', usersController.login);

  //This contains the routes that allow a logged in admin user to modify and create books
  app.post('/api/books/create', authorize, checkadmin, booksController.create);
  app.get('/api/books', authorize, booksController.list);
  app.get('/api/books/:bookId', authorize, booksController.retrieve);
  app.put('/api/books/:bookId', authorize, checkadmin, booksController.update);
  app.delete('/api/books/:bookId',authorize, checkadmin, booksController.destroy);
  

  //This contains the routes that  allow a logged in admin to modify and create categories
  app.post('/api/categories/create', authorize,checkadmin, categoriesController.create);
  app.get('/api/categories', authorize, checkadmin, categoriesController.list);
  app.get('/api/categories/:catId', authorize,checkadmin, categoriesController.retrieve);
  app.put('/api/categories/:catId', authorize, checkadmin,categoriesController.update);
  app.delete('/api/categories/:catId',authorize, checkadmin, categoriesController.destroy);


  //This contains routes that allow a logged in user to borrow and return books
  app.post('/api/users/:userId/books/:bookId/borrow', authorize, usersController.borrowBook);
  app.put('/api/users/:userId/books/:bookId/return', authorize, usersController.returnBook);
  app.get('/api/users/:userId/history', authorize, usersController.borrowHistory);
  app.get('/api/users/:userId/books', authorize, usersController.userNotReturned);


  // Method not allowed
  app.all('/api/books/:bookId', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));

};

