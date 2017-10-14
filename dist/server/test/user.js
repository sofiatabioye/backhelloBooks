'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var salt = _bcrypt2.default.genSaltSync(10);
var assert = _chai2.default.assert;

describe('User, ', function () {
  var today = new Date();
  var DueDate = new Date(today.getTime() + 24 * 60 * 60 * 14);
  var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoyMSwicm9sZSI6InVzZXIiLCJpYXQiOjE1MDM1MjQ1MjUsImV4cCI6MTUwMzc4MzcyNX0.CToCrTrKcztjT3SJODuVCoI0F6CfnIcNZBnYTFkd8LY';
  function makeUser() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  // tests if user exists
  describe('should be able to find out if user exists', function () {
    it('return 401 error if user does not exist', function (done) {
      var user = {
        username: 'does_not_exist',
        password: 'password'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/users/login').send(user).end(function (err, res) {
        assert.equal(res.body.message, 'User not found');
        assert.equal(res.statusCode, 404);
        done();
      });
    });
  });

  // generate token for user on successfull login
  describe('should generate a token for user on successful login', function () {
    it('return a token on successful login', function (done) {
      var user = {
        username: 'mariam',
        password: 'hello'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/users/login').send(user).end(function (err, res) {
        assert.isOk(res.body.token);
        done();
      });
    });
  });

  // create a new user account
  describe('return User created for new user ', function () {
    it('create a new user', function (done) {
      var passwordHash = _bcrypt2.default.hashSync('mypassword', salt);
      var user = {
        username: makeUser(),
        password: passwordHash,
        role: 'user',
        email: makeUser() + '@gmail.com',
        level: 'silver',
        image: 'none'
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/users/signup').send(user).end(function (err, res) {
        assert.equal(res.statusCode, 201);
        assert.equal(res.body.message, 'User Created Successfully.');
        done();
      });
    });
  });

  // test if user can borrow an unreturned book again
  describe('test if user can borrow book again before returning the previously borrowed copy of the same book ', function () {
    it('should return "You have already borrowed this book" for book borrowed before without returning', function (done) {
      var borrowstatus = {
        user_id: 1,
        book_id: 1,
        returned: false,
        borrowDate: today,
        expectedReturnDate: DueDate,
        token: token
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/users/1/books/1/borrow').send(borrowstatus).end(function (err, res) {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.message, 'You have already borrowed this book');
        done();
      });
    });
  });

  describe('test if user can borrow book if book quantity is 0 ', function () {
    it('should return "book not available" when book quantity is less than 1', function (done) {
      var borrowdetails = {
        user_id: 1,
        book_id: 5,
        returned: false,
        borrowDate: today,
        expectedReturnDate: DueDate,
        token: token
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/users/1/books/5/borrow').send(borrowdetails).end(function (err, res) {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.message, 'Book not available');
        done();
      });
    });
  });

  describe('test if user can get history of borrowed books', function () {
    it('return all user borrowed books history', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/users/3/history').set('x-access-token', token).send().end(function (err, res) {
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });

  describe('test if user can get hisory of books borrowed not returned books', function () {
    it('return all user borrowed books history', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/users/1/books').set('x-access-token', token).send().end(function (err, res) {
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });

  describe('should test if user can return book', function () {
    it('returns book', function (done) {
      (0, _supertest2.default)(_app2.default).put('/api/v1/users/3/books/1/return').send({ token: token }).end(function (err, res) {
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });
});