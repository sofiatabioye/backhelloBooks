import booksController from '../controllers/book';
import usersController from '../controllers/user';
import categoriesController from '../controllers/category';


const routes = (app, authorize, checkadmin) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Libraries API!',
  }));


  // User Login Routes
  app.post('/api/users/signup', usersController.create);
  app.post('/api/users/login', usersController.login);

  //This contains the routes that allow a logged in admin user to modify and create books
  app.post('/api/books/create', checkadmin.checkAdmin,booksController.create);
  app.get('/api/books', authorize.authorize, booksController.list);
  app.get('/api/books/:bookId', authorize.authorize, booksController.retrieve);
  app.put('/api/books/:bookId', authorize.authorize, checkadmin.checkAdmin, booksController.update);
  app.delete('/api/books/:bookId',authorize.authorize, checkadmin.checkAdmin, booksController.destroy);
  

  //This contains the routes that  allow a logged in admin to modify and create categories
  app.post('/api/categories/create', authorize.authorize,checkadmin.checkAdmin, categoriesController.create);
  app.get('/api/categories', authorize.authorize, checkadmin.checkAdmin, categoriesController.list);
  app.get('/api/categories/:catId', authorize.authorize,checkadmin.checkAdmin, categoriesController.retrieve);
  app.put('/api/categories/:catId', authorize.authorize, checkadmin.checkAdmin,categoriesController.update);
  app.delete('/api/categories/:catId',authorize.authorize, checkadmin.checkAdmin, categoriesController.destroy);


  //This contains routes that allow a logged in user to borrow and return books
  app.post('/api/users/:userId/books/:bookId/borrow', authorize.authorize, usersController.borrowBook);
  app.put('/api/users/:userId/books/:bookId/return', authorize.authorize, usersController.returnBook);
  app.get('/api/users/:userId/history', authorize.authorize, usersController.borrowHistory);
  app.get('/api/users/:userId/books', authorize.authorize, usersController.userNotReturned);


  // Method not allowed
  app.all('/api/books/:bookId', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));

};

export default routes;