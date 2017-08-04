const librariesController = require('../controllers').libraries;
const booksController = require('../controllers').books;
const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Libraries API!',
  }));

  
  app.get('/api/library', librariesController.list);
  app.post('/api/library/book/create', booksController.create);
  app.post('/api/library/user/signup', usersController.create);
  app.post('/api/library/user/login', usersController.login);
  app.get('/api/library/books', booksController.list);
  app.get('/api/library/books/:bookId', booksController.retrieve);
  app.put('/api/library/books/:bookId', booksController.update);
  app.delete('/api/library/books/:bookId', booksController.destroy);
  
  app.all('/api/books/:bookId', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));
};

