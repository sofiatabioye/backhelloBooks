const app = require('../../app');
const assert  = require('chai').assert;
const supertest = require('supertest');


  describe('Middleware', () => {
    const usertoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoidXNlciIsImlhdCI6MTUwMjI4MjA0OSwiZXhwIjoxNTAyMzY4NDQ5fQ.xX9wr6egZc9BGqnyYpanwn4dHGwzJ4IQhS_yCSN-x0A';
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MDIyODIyNTgsImV4cCI6MTUwMjM2ODY1OH0.rcevaA1BxqoxhNzYp4USIfw5PHHhdKmWUerxDl2ijCI'; 
      
     const invalidToken = "invalid token";

    //tests if user can get all books when token is not provided
    
    describe('should test if user can get all books when user token is not provided, ', () => {
        it('return token not provided', (done) => {      
          supertest(app).get('/api/books').send().end((err, res) => {
          assert.equal(res.statusCode, 412);
          assert.equal(res.body.message, 'Token not provided');
          done();
          });
        });
     });

    //tests if users can authorize with an invalid Token

      describe('should test if user can get all books with an invalid token, ', () => {
        it('return you are not signed in', (done) => {      
          supertest(app).get('/api/books').set('x-access-token', invalidToken).send().end((err, res) => {
          assert.equal(res.statusCode, 403);
          assert.equal(res.body.message, 'You are not signed in');
          done();
          });
        });
     });
      
     //tests if user can authorize with a valid token
       describe('should test if user can get all books with an valid token, ', () => {
        it('return all books because user token is valid', (done) => {      
          supertest(app).get('/api/books').set('x-access-token', usertoken).send().end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
          });
        });
     });

    // test if user can access admin specific route
     describe('should test if user can get all categories which is specific to admin, ', () => {
        it('return user not priviledged', (done) => {      
          supertest(app).get('/api/categories').set('x-access-token', usertoken).send().end((err, res) => {
          assert.equal(res.statusCode, 403);
          assert.equal(res.body.message, 'You do not have the privilege');
          done();
          });
        });
     });

    //tests if admin can access admin specific route
    describe('should test if user can get all categories which is specific to admin, ', () => {
        it('return all categories because admin is accessing it', (done) => {      
          supertest(app).get('/api/categories').set('x-access-token', adminToken).send().end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
          });
        });
     });

     

  });
