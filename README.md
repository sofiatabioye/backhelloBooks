
[![Build Status](https://travis-ci.org/kidah/backhelloBooks.svg?branch=master)](https://travis-ci.org/kidah/backhelloBooks)
[![Coverage Status](https://coveralls.io/repos/github/kidah/backhelloBooks/badge.svg)](https://coveralls.io/github/kidah/backhelloBooks)
[![Code Climate](https://codeclimate.com/github/kidah/backhelloBooks/badges/gpa.svg)](https://codeclimate.com/github/kidah/backhelloBooks?branch=master)
# Hello Books

This is an online library management system where you can browse, borrow and/or return books from the library. 

## Getting Started
Here is a link to the template files hosted on github pages :  https://kidah.github.io/hellobooksophy.github.io/index.html

Here is a link to the heroku hosted version : https://hello--books.herokuapp.com

This app was built using the express fraamework with Node Js, Postgres and Sequelize ORM. 



## API ROUTES

  // User Login Routes
  app.post('/api/v1/users/signup', usersController.create);
  app.post('/api/v1/users/login', usersController.login);

  // This contains the routes that allow a logged in admin user to modify and create books

  app.post('/api/v1/books/create', authorize.authorize, checkadmin.checkAdmin, booksController.create);
  app.get('/api/v1/books', authorize.authorize, booksController.list);
  app.get('/api/v1/books/:bookId', authorize.authorize, booksController.retrieve);
  app.put('/api/v1/books/:bookId', authorize.authorize, checkadmin.checkAdmin, booksController.update);
  app.delete('/api/v1/books/:bookId', authorize.authorize, checkadmin.checkAdmin, booksController.destroy);

  // This contains the routes that  allow a logged in admin to modify and create categories
  app.post('/api/v1/categories/create', authorize.authorize, checkadmin.checkAdmin, categoriesController.create);
  app.get('/api/v1/categories', authorize.authorize, checkadmin.checkAdmin, categoriesController.list);
  app.get('/api/v1/categories/:catId', authorize.authorize, checkadmin.checkAdmin, categoriesController.retrieve);
  app.put('/api/v1/categories/:catId', authorize.authorize, checkadmin.checkAdmin, categoriesController.update);
  app.delete('/api/v1/categories/:catId', authorize.authorize, checkadmin.checkAdmin, categoriesController.destroy);


  // This contains routes that allow a logged in user to borrow and return books and borrow history
  app.post('/api/v1/users/:userId/books/:bookId/borrow', authorize.authorize, usersController.borrowBook);
  app.put('/api/v1/users/:userId/books/:bookId/return', authorize.authorize, usersController.returnBook);
  app.get('/api/v1/users/:userId/history', authorize.authorize, usersController.borrowHistory);
  app.get('/api/v1/users/:userId/books', authorize.authorize, usersController.booksNotReturned);


## The tests
* Travis and Hounds CI coverage
* Coveralls and codeclimate coverage




## Authors

* **Sofiat Abioye **  *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

## Acknowledgments

* Andela Bootamp Facilitators
* Fellow Bootcampers
* Fam.


 




