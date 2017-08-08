const app = require('../../app');
const request = require('supertest');
//const Book = require('../models').Book;
//Our parent block

/*
  * Test the /GET route
  */
  describe('In the role controller', () => {
  

    describe('/GET book', () => {
      it('it should GET all the books', (done) => {
      request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200,done);
      
      });

      describe('Post /api/users/signup', () => {
        it('responds with 500 bad request error', (done) => {
        request(app)
        .post('/api/users/signup')
        .send(
        {
          username: ' ja skjss ',
          email: '   ',
          password: 'jonbull',
        }
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(500, done);
  });
});
  

});
});