//import app from '../server/app';
const assert  = require('chai').assert;
const app = require('../../app');
const request = require('supertest');
//const Book = require('../models').Book;
//Our parent block

/*
  * Test the /GET route
  */
  describe('In the role controller', () => {
  

    describe('/GET all categories', () => {
      it('it should GET all the categories', (done) => {
      request(app)
      .get('/api/categories')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200,done);
      
      });

      describe('Post /api/categories/', () => {
        it('responds with 500 bad request error', (done) => {
        request(app)
        .post('/api/categories/create')
        .send(
        {
          title: ' ',
        }
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(500, done);
  });
});
  

});
});