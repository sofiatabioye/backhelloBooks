const app = require('../../app');
const assert  = require('chai').assert;
const supertest = require('supertest');
//const Book = require('../models').Book;
//Our parent block



/*
  * Test the /GET route
  */
  //const user = {username:"sofaya", password: "hello", email:"sofaya@yahoo.com"};
  describe('In the role controller', () => {
      describe('Login', () => {
        it('Return 401 error if user does not exist', (done) => {
        const user = {
        username: 'does not exist',
        password: 'password',
        };
       supertest(app).post('/api/users/login').send(user).end((err, res) => {
       assert.equal(res.body.message, "User not found");
       done();
      });
     });
    describe('Return token on successful login', () => {
      it('Return a token on successful login', (done) => {
      const user = {
      username: 'sophy',
      password: 'hello',
      };
      supertest(app).post('/api/users/login').send(user).end((err, res) => {
      assert.isOk(res.body.token);
      done();
    });
   });
});

});

  });