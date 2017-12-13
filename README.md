
[![Build Status](https://travis-ci.org/kidah/backhelloBooks.svg?branch=master)](https://travis-ci.org/kidah/backhelloBooks)
[![Coverage Status](https://coveralls.io/repos/github/kidah/backhelloBooks/badge.svg)](https://coveralls.io/github/kidah/backhelloBooks)
[![Code Climate](https://codeclimate.com/github/kidah/backhelloBooks/badges/gpa.svg)](https://codeclimate.com/github/kidah/backhelloBooks?branch=master)

## Hello Books
Hello books is an online library management application that provides users with access to books from wherever they are.
Being a virtual library, users can borrow and read their favorite books using any device.
Admin has the permission to add, edit and delete books and categories

#### Table of Content
Getting Started
Dependencies
Installation
Limitation
Tests
Usage
API Documentation
Models
Testing
Express Routes
License
Current state

### Getting Started
This is a full stack javascript application built with React Js using Express framework on the nodejs platform. Authentication of users is done via JSON Web Tokens.  

#### Dependencies
Postgres
Node

#### Installation
Install Node JS.
Install Postgres .
Clone the repository here
[cd] into the root of the project directory.
Run npm install on the terminal to install Dependecies
Install sequelize-cli, Create Postgresql database, Navigate to server directory and run migrations:
npm install -g seqeulize-cli
cd server
sequelize db:migrate
Create a .env file in the root directory of the application. Use a different database for your testing and development. Example of the content of a .env file is shown in the .env.sample

Development/Production
npm run build:dev
npm start

#### Limitations
The limitations with this current version of Hello Books includes:

The Administrator has no control overs users on the client side
Users cannot contribute books to the application based on their location

#### Tests
Sever side tests - npm run test 

Client side tests - npm run test-client 

#### Usage
Run database migration with npm start:migrate
Start app development with npm run start or npm start
To start the client npm run build:dev
Install Postman and use to test all endpoints


#### API Documentation

You can view the API Documentation here

Technology Stack

UI & Templates

HTML & CSS
Materialize CSS Framework
Javascript
JQuery
Server Side

NodeJs
Express
Sequelize
Client Side

React(Redux)
Questions

For more details contact abioye.sofiat@outlook.com

#### Support or Contribution

For any suggestions or contributions please do not hesistate to contact me

Contributions to this project are welcomed by all, If you need to contribute to this project, follow the steps below


#### Fork the repository

Follow Installation and Setup as explained earlier
Create a branch off development for the feature you wish to add
Make neccessary changes, commit and raise a pull request against develop Note when making contributions, please endevour to follow the Airbnb javascript style guide. check out the [wiki]

#### Models

Four models are defined:
Users, 
Books,
Categories and
Borrow Status.

#### Testing

Server side testing is achieved through use of chai-http, mocha and chai packages. chai-http is used to make requests to the api and mocha is the testing framework and chai is the exception library. They will both be installed when you run npm install and the tests will run when you run npm test.

Client side testing is achieved through the use of jest package. jest is used to test javascript code in React applications.

### Express Routes

Api endpoints were created using express router. The routes are defined under server/routes.

#### License

This project is authored by Sofiat Abioye (abioye.sofiat@outlook.com) and is licensed for your use, modification and distribution under the MIT license. MIT © sofiat-abioye

#### Current state

still in the development stage


 









