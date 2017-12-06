import chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';

import app from '../app';

const assert = chai.assert;
dotenv.config();

// This contains tests for the middlewares
describe('Middleware', () => {
  const usertoken = process.env.USER_TOKEN;
  const adminToken = process.env.ADMIN_TOKEN;
  const invalidToken = 'invalid token';

  // tests if user can get all books when token is not provided

  describe('should test if user can get all books when user token is not provided, ', () => {
    it('return token not provided', (done) => {
      supertest(app).get('/api/v1/books').send()
        .end((err, res) => {
          assert.equal(res.statusCode, 412);
          assert.equal(res.body.message, 'You need to sign in first');
          done();
        });
    });
  });

  // tests if users can authorize with an invalid Token

  describe('should test if user can get all books with an invalid token, ', () => {
    it('return you are not signed in', (done) => {
      supertest(app).get('/api/v1/books').set('x-access-token', invalidToken).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 403);
          assert.equal(res.body.message, 'You are not signed in');
          done();
        });
    });
  });

  // tests if user can authorize with a valid token
  describe('should test if user can get all books with an valid token, ', () => {
    it('return all books because user token is valid', (done) => {
      supertest(app).get('/api/v1/books').set('x-access-token', usertoken).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

  // test if user can access admin specific route
  describe('should test if a non-logged in user can get all categories, ', () => {
    it('return all categories', (done) => {
      supertest(app).get('/api/v1/categories').set('x-access-token', invalidToken).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 403);
          assert.equal(res.body.message, 'You are not signed in');
          done();
        });
    });
  });

  // tests if admin can access admin specific route
  describe('should test if user can get all categories which is specific to admin, ', () => {
    it('return all categories because admin is accessing it', (done) => {
      supertest(app).get('/api/v1/categories').set('x-access-token', adminToken).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });
});
