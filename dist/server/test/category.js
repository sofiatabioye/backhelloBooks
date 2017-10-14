'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert;

describe('Category, ', function () {
  var adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo3LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MDM1MjQ2MTIsImV4cCI6MTUwMzc4MzgxMn0.fxewHIqNLoEqX6CmkNB2CFwv_BIenesm-y-qHA9BnxQ';
  function makeText() {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // tests if admin can get all categories

  describe('test if admin can get all categories, ', function () {
    it('return all categories', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/categories').set('x-access-token', adminToken).send().end(function (err, res) {
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });

  // tests if admin can create book with correct information
  describe('test if categories can be created with correct parameters', function () {
    it('returns a new category', function (done) {
      var cat = {
        title: makeText(),
        token: adminToken
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/categories/create').send(cat).end(function (err, res) {
        assert.equal(res.statusCode, 201);
        assert.equal(res.body.message, 'Category Created Successfully');
        done();
      });
    });
  });

  // tests if admin can creat book with incomplete information


  describe('test if category title may not be unique', function () {
    it('does not returns a new book', function (done) {
      var cat = {
        title: 'Fiction',
        token: adminToken
      };
      (0, _supertest2.default)(_app2.default).post('/api/v1/categories/create').send(cat).end(function (err, res) {
        assert.equal(res.statusCode, 400);
        done();
      });
    });
  });

  // tests if admin can get category by Id or not

  describe('test if admin can get category by Id if it exists, ', function () {
    it('return category at specified id', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/categories/1').set('x-access-token', adminToken).send().end(function (err, res) {
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });

  describe('test if user can get category by Id if it does not exist, ', function () {
    it('return category not found', function (done) {
      (0, _supertest2.default)(_app2.default).get('/api/v1/categories/100').set('x-access-token', adminToken).send().end(function (err, res) {
        assert.equal(res.statusCode, 404);
        assert.equal(res.body.message, 'Category Not Found');
        done();
      });
    });
  });

  // tests if admin can update category information

  describe('should update category information if user is admin', function () {
    it('updates category information', function (done) {
      var cat = {
        title: makeText,
        token: adminToken
      };
      (0, _supertest2.default)(_app2.default).put('/api/v1/categories/1').send(cat).end(function (err, res) {
        assert.equal(res.statusCode, 200);
        done();
      });
    });
  });

  // tests if admin can delete category

});