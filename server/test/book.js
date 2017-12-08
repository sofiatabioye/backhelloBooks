import chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';

import app from '../app';

const assert = chai.assert;
dotenv.config();

describe('In the Book controller, ', () => {
  const token = process.env.USER_TOKEN;
  const adminToken = process.env.ADMIN_TOKEN;
  const makeText = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
  };
  // tests if user can get all books

  describe('test if user can get all books, ', () => {
    it('return all books', (done) => {
      supertest(app).get('/api/v1/books').set('x-access-token', token).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.message, 'All books');
          assert.isOk(res.body);
          assert.isArray(res.body.books);
          if (err) return done(err);
          done();
        });
    });
  });

  // tests if admin can create book with correct information

  describe('test if book can be created with correct and complete parameters', () => {
    it('returns a new book', (done) => {
      const book = {
        title: 'test title',
        description: 'this is a test description',
        quantity: 5,
        image: 'http://res.cloudinary.com/ddvm5tzhm/image/upload/v1511345818/HelloBooks/xfrcwdttvdhccc20xofx.jpg',
        category: makeText(),
        publisher: 'Test',
        author: 'Testing Test',
        bookSize: 250,
        bookEdition: 2010,
        ISBN: 6788865467896,
        token: adminToken
      };
      supertest(app).post('/api/v1/books/create').send(book).end((err, res) => {
        assert.equal(res.statusCode, 201);
        assert.equal(res.body.message, 'Book Created Successfully.');
        assert.isObject(res.body);
        if (err) return done(err);
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
        assert.equal(res.statusCode, 500);
        assert.isObject(res.body);
        if (err) return done(err);
        done();
      });
    });
  });

  // tests if user can get book by Id or not

  describe('test if user can get book by Id if book exists, ', () => {
    it('return book at specified id', (done) => {
      supertest(app).get('/api/v1/books/27').set('x-access-token', token).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.isObject(res.body);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('test if user can get book by Id if book does not exist, ', () => {
    it('return book not found', (done) => {
      supertest(app).get('/api/v1/books/10000').set('x-access-token', token).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 404);
          assert.equal(res.body.message, 'Book Not Found');
          assert.isObject(res.body);
          if (err) return done(err);
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
      supertest(app).put('/api/v1/books/27').send(book).end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.message, 'Book Updated Successfully.');
        assert.isObject(res.body);
        if (err) return done(err);
        done();
      });
    });
  });

  // tests if admin can delete book

  describe('should not delete book if book has been deleted previously by admin', () => {
    it('return not found when trying to delete book ', (done) => {
      const id = 198;
      supertest(app).del(`/api/v1/books/${id}`).send({ token: adminToken }).end((err, res) => {
        assert.equal(res.statusCode, 404);
        done();
      });
    });
  });
});
