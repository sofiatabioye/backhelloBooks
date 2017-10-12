
[![Build Status](https://travis-ci.org/kidah/backhelloBooks.svg?branch=master)](https://travis-ci.org/kidah/backhelloBooks)
[![Coverage Status](https://coveralls.io/repos/github/kidah/backhelloBooks/badge.svg)](https://coveralls.io/github/kidah/backhelloBooks)
[![Code Climate](https://codeclimate.com/github/kidah/backhelloBooks/badges/gpa.svg)](https://codeclimate.com/github/kidah/backhelloBooks?branch=master)
# Hello Books

This is an online library management system where you can browse, borrow and/or return books from the library. 

## Getting Started
Here is a link to the template files hosted on github pages :  https://kidah.github.io/hellobooksophy.github.io/index.html

Here is a link to the heroku hosted version : https://hello--books.herokuapp.com

This app was built using the express fraamework with Node Js, Postgres and Sequelize ORM. 

## Features
Login/Sign up to gain access to books in the library
Books are in categories
Ability to borrow books repeatedly
View your reading/borrowing history
Admin access to modify book details

## API ROUTES

  * User Login Routes
  POST /api/v1/users/signup
  POST /api/v1/users/login

  * This contains the routes that allow a logged in admin user to modify and create books
 POST  /api/v1/books/create
 PUT /api/v1/books/:bookId
 DELETE /api/v1/books/:bookId

  * This contains the routes that  allow a logged in admin to modify and create categories
  POST /api/v1/categories/create'

  GET /api/v1/categories/:catId
  PUT /api/v1/categories/:catId
  DELETE /api/v1/categories/:catId

  * This contains routes that allow a logged in user to borrow and return books and borrow history
  POST /api/v1/users/:userId/books/:bookId/borrow
  PUT /api/v1/users/:userId/books/:bookId/return
  GET /api/v1/users/:userId/history
  GET /api/v1/users/:userId/books
  GET /api/v1/categories
  GET /api/v1/books
  GET /api/v1/books/:bookId


## The tests
* Travis and Hounds CI coverage
* Coveralls and codeclimate coverage




## Authors

* **Sofiat Abioye ** 

## Acknowledgments

* Andela 


 




