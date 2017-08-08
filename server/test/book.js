const app = require('../app');
const request = require('supertest');
const Book = require('../models').Book;
//Our parent block

/*
  * Test the /GET route
  */
  describe('In the role controller', () => {
  

    describe('/GET book', () => {
      it('it should GET all the books', (done) => {
      request(app)
      .get('/api/library/books')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200,done);
      
      });
  

});
});