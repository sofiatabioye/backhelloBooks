const librariesController = require('../controllers').libraries;
const booksController = require('../controllers').books;
const usersController = require('../controllers').users;
const authorize = require('../helper/auth.js').authorize;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Libraries API!',
  }));

  
  app.get('/api/library', librariesController.list);
  app.post('/api/library/book/create', authorize, booksController.create);
  app.post('/api/library/user/signup', usersController.create);
  app.post('/api/library/user/login', usersController.login);
  //app.post('/api/library/user/logout', usersController.logout);
  app.get('/api/library/books', authorize, booksController.list);
  app.get('/api/library/books/:bookId', authorize, booksController.retrieve);
  app.put('/api/library/books/:bookId', authorize, booksController.update);
  app.delete('/api/library/books/:bookId',authorize, booksController.destroy);
  
  app.all('/api/books/:bookId', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));

  //app.post('/api/v1/user/:userId/books', booksController.borrow);
  //app.get('/api/v1/user/:userId/books', booksController.userBooks);
};

