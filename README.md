
[![Build Status](https://travis-ci.org/kidah/backhelloBooks.svg?branch=master)](https://travis-ci.org/kidah/backhelloBooks)
[![Coverage Status](https://coveralls.io/repos/github/kidah/backhelloBooks/badge.svg)](https://coveralls.io/github/kidah/backhelloBooks)
[![Code Climate](https://codeclimate.com/github/kidah/backhelloBooks/badges/gpa.svg)](https://codeclimate.com/github/kidah/backhelloBooks?branch=master)
# Hello Books
Hello books is an application that provides users with access to books from wherever they are.
Beeing a virtual library, users can borrow and read their favorite books using any device.
HelloBooks exposes RESTful API endpoints such that anyone customize the method of consuming
the resources

## Getting Started
Here is a link to the template files hosted on github pages :  https://kidah.github.io/hellobooksophy.github.io/index.html

Here is a link to the heroku hosted version : https://hello--books.herokuapp.com


### Development
This is a javascript application built with [**Express**](http://expressjs.com/)
framework on the nodejs platform. Authentication of users is done via
[**JSON Web Tokens**](https://jwt.io/) .

#### Features
- Login/Sign up to gain access to routes
- A library of books from different categories
- Ability to borrow books repeatedly
- Track your reading/borrowing history
- Admin access to modify book details

#### API Routes
- sign up route:
**POST** /api/v1/users/signup
parameters - username, password, email
optional parameters - firstName, lastName


- login route:
**POST** /api/v1/users/signin
parameters - username, password

- get books (view library):
**GET** /api/v1/books'

- get book (view a book's metadata):
**GET** /api/v1/books/:id
parameters - bookId (number)

- add a new book to library:
**POST** /api/v1/books
request body - author, title, description, image and moere

- modify book information:
**PUT** /api/v1/books/
request body - author, title, description, image and more
query parameters - book id (number)

- borrow book:
**POST** /api/v1/users/:id/books
parameters - user id
query parameters - book id (number)

- return book:
**PUT** /api/v1/users/:id/books
parameters - user id
query parameters - book id (number)

- get borrowed books:
**GET** /api/v1/users/:id/books


## The tests
* Travis and Hounds CI coverage
* Coveralls and codeclimate coverage




## Authors

* **Sofiat Abioye ** 

## Acknowledgments

* Andela 


 




