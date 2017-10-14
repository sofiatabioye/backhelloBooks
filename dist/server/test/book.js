'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert;

describe('In the Book controller, ', function () {
  var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoyMSwicm9sZSI6InVzZXIiLCJpYXQiOjE1MDM1MjQ1MjUsImV4cCI6MTUwMzc4MzcyNX0.CToCrTrKcztjT3SJODuVCoI0F6CfnIcNZBnYTFkd8LY';
  var adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo3LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MDM1MjQ2MTIsImV4cCI6MTUwMzc4MzgxMn0.fxewHIqNLoEqX6CmkNB2CFwv_BIenesm-y-qHA9BnxQ';
  function makeText() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  // tests if user can get all books

  describe('test if user can get all books, ', function () {
    it('return all books', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/books').set('x-access-token', token).send().end(function (err, res) {
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });

  // tests if admin can create book with correct information
  describe('test if book can be created with correct and complete parameters', function () {
    it('returns a new book', function (done) {
      var book = {
        title: makeText(),
        description: makeText(),
        quantity: '5',
        image: 'none for now',
        category: makeText(),
        publisher: 'Test',
        author: 'Testing Test',
        size: 250,
        edition: 2010,
        isbn: Math.random(),
        token: adminToken
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/books/create').send(book).end(function (err, res) {
        assert.equal(res.statusCode, 201);
        assert.equal(res.body.message, 'Book Created Successfully.');
        done();
      });
    });
  });

  // tests if admin can creat book with incomplete information


  describe('test if book can be created with incorrect complete parameters', function () {
    it('does not returns a new book', function (done) {
      var book = {
        title: makeText(),
        description: makeText(),
        quantity: '5',
        image: 'none for now',
        category: makeText(),
        publisher: 'Test',
        token: adminToken
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/books/create').send(book).end(function (err, res) {
        assert.equal(res.statusCode, 400);
        // assert.equal(res.body.message, 'Book Created Successfully.');
        done();
      });
    });
  });

  // tests if user can get book by Id or not

  describe('test if user can get book by Id if book exists, ', function () {
    it('return book at specified id', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/books/2').set('x-access-token', token).send().end(function (err, res) {
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });

  describe('test if user can get book by Id if book does not exist, ', function () {
    it('return book not found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/books/100').set('x-access-token', token).send().end(function (err, res) {
        assert.equal(res.statusCode, 404);
        assert.equal(res.body.message, 'Book Not Found');
        done();
      });
    });
  });

  // tests if admin can update book information

  describe('should update book information if user is admin', function () {
    it('updates book information', function (done) {
      var book = {
        title: makeText(),
        description: makeText(),
        category: makeText(),
        publisher: 'Test',
        token: adminToken
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/books/2').send(book).end(function (err, res) {
        assert.equal(res.statusCode, 200);
        // assert.equal(res.body.message, 'Book Updated Successfully.');
        done();
      });
    });
  });

  // tests if admin can delete book

  describe('should not delete book if book has been deleted previously by admin', function () {
    it('return not found when trying to delete book ', function (done) {
      var id = 50;
      (0, _supertest2.default)(_app2.default).del('/api/v1/books/' + id).send({ token: adminToken }).end(function (err, res) {
        assert.equal(res.statusCode, 404);
        done();
      });
    });
  });
});