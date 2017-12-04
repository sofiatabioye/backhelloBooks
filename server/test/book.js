import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';

const assert = chai.assert;

describe('In the Book controller, ', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoyMSwicm9sZSI6InVzZXIiLCJpYXQiOjE1MDM1MjQ1MjUsImV4cCI6MTUwMzc4MzcyNX0.CToCrTrKcztjT3SJODuVCoI0F6CfnIcNZBnYTFkd8LY';
  const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo3LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MDM1MjQ2MTIsImV4cCI6MTUwMzc4MzgxMn0.fxewHIqNLoEqX6CmkNB2CFwv_BIenesm-y-qHA9BnxQ';
  function makeText() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
  }
  // tests if user can get all books

  describe('test if user can get all books, ', () => {
    it('return all books', (done) => {
      supertest(app).get('/api/v1/books').set('x-access-token', token).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

  // tests if admin can create book with correct information
  describe('test if book can be created with correct and complete parameters', () => {
    it('returns a new book', (done) => {
      const book = {
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
      supertest(app).post('/api/v1/books/create').send(book).end((err, res) => {
        assert.equal(res.statusCode, 201);
        assert.equal(res.body.message, 'Book Created Successfully.');
        done();
      });
    });
  });

  // tests if admin can creat book with incomplete information


  describe('test if book can be created with incorrect complete parameters', () => {
    it('does not returns a new book', (done) => {
      const book = {
        title: makeText(),
        description: makeText(),
        quantity: '5',
        image: 'none for now',
        category: makeText(),
        publisher: 'Test',
        token: adminToken
      };
      supertest(app).post('/api/v1/books/create').send(book).end((err, res) => {
        assert.equal(res.statusCode, 400);
        // assert.equal(res.body.message, 'Book Created Successfully.');
        done();
      });
    });
  });

  // tests if user can get book by Id or not

  describe('test if user can get book by Id if book exists, ', () => {
    it('return book at specified id', (done) => {
      supertest(app).get('/api/v1/books/2').set('x-access-token', token).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

  describe('test if user can get book by Id if book does not exist, ', () => {
    it('return book not found', (done) => {
      supertest(app).get('/api/v1/books/100').set('x-access-token', token).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 404);
          assert.equal(res.body.message, 'Book Not Found');
          done();
        });
    });
  });


  // tests if admin can update book information

  describe('should update book information if user is admin', () => {
    it('updates book information', (done) => {
      const book = {
        title: makeText(),
        description: makeText(),
        category: makeText(),
        publisher: 'Test',
        token: adminToken
      };
      supertest(app).put('/api/v1/books/2').send(book).end((err, res) => {
        assert.equal(res.statusCode, 200);
        // assert.equal(res.body.message, 'Book Updated Successfully.');
        done();
      });
    });
  });

  // tests if admin can delete book

  describe('should not delete book if book has been deleted previously by admin', () => {
    it('return not found when trying to delete book ', (done) => {
      const id = 50;
      supertest(app).del(`/api/v1/books/${id}`).send({ token: adminToken }).end((err, res) => {
        assert.equal(res.statusCode, 404);
        done();
      });
    });
  });
});
