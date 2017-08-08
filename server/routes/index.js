const librariesController = require('../controllers').libraries;
const booksController = require('../controllers').books;
const usersController = require('../controllers').users;
const categoriesController = require('../controllers').categories;
const authorize = require('../helper/auth.js').authorize;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Libraries API!',
  }));


  
  app.get('/api/library', librariesController.list);

  app.post('/api/users/signup', usersController.create);
  app.post('/api/users/login', usersController.login);
  //app.post('/api/library/user/logout', usersController.logout);

  //This contains the routes that modify and create books
  app.post('/api/books/create', authorize, booksController.create);
  app.get('/api/books', authorize, booksController.list);
  app.get('/api/books/:bookId', authorize, booksController.retrieve);
  app.put('/api/books/:bookId', authorize, booksController.update);
  app.delete('/api/books/:bookId',authorize, booksController.destroy);
  

  //This contains the routes that modify and create categories
  app.post('/api/categories/create', authorize, categoriesController.create);
  app.get('/api/categories', authorize, categoriesController.list);
  app.get('/api/categories/:catId', authorize, categoriesController.retrieve);
  app.put('/api/categories/:catId', authorize, categoriesController.update);
  app.delete('/api/categories/:catId',authorize, categoriesController.destroy);


  app.all('/api/books/:bookId', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));

  //app.post('/api/v1/user/:userId/books', booksController.borrow);
  //app.get('/api/v1/user/:userId/books', booksController.userBooks);
};

