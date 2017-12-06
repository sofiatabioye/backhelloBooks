import chai from 'chai';
import supertest from 'supertest';
import dotenv from 'dotenv';

import app from '../app';

const assert = chai.assert;
dotenv.config();

describe('Category, ', () => {
  const adminToken = process.env.ADMIN_TOKEN;
  const makeText = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
  };

  // tests if admin can get all categories

  describe('test if admin can get all categories, ', () => {
    it('return all categories', (done) => {
      supertest(app).get('/api/v1/categories').set('x-access-token', adminToken).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

  // tests if admin can create book with correct information
  describe('test if categories can be created with correct parameters', () => {
    it('returns a new category', (done) => {
      const cat = {
        title: makeText(),
        token: adminToken
      };
      supertest(app).post('/api/v1/categories/create').send(cat).end((err, res) => {
        assert.equal(res.statusCode, 201);
        assert.equal(res.body.message, 'Category Created Successfully');
        if (err) return done(err);
        done();
      });
    });
  });

  // tests if admin can creat book with incomplete information


  describe('test if category title may not be unique', () => {
    it('does not returns a new book', (done) => {
      const cat = {
        title: 'Fiction',
        token: adminToken
      };
      supertest(app).post('/api/v1/categories/create').send(cat).end((err, res) => {
        assert.equal(res.statusCode, 409);
        assert.equal(res.body.message, 'Category already exists');
        assert.isObject(res.body);
        if (err) return done(err);
        done();
      });
    });
  });

  // tests if admin can get category by Id or not

  describe('test if admin can get category by Id if it exists, ', () => {
    it('return category at specified id', (done) => {
      supertest(app).get('/api/v1/categories/21').set('x-access-token', adminToken).send()
        .end((err, res) => {
          assert.isOk(res.body);
          assert.equal(res.statusCode, 200);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('test if user can get category by Id if it does not exist, ', () => {
    it('return category not found', (done) => {
      supertest(app).get('/api/v1/categories/1000').set('x-access-token', adminToken).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 404);
          assert.isObject(res.body);
          assert.equal(res.body.message, 'Category Not Found');
          done();
        });
    });
  });


  // tests if admin can update category information

  describe('should update category information if user is admin', () => {
    it('updates category information', (done) => {
      const cat = {
        title: makeText,
        token: adminToken
      };
      supertest(app).put('/api/v1/categories/21').send(cat)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          assert.equal(res.body.message, 'Category Updated Successfully');
          assert.isObject(res.body);
          done();
        });
    });
  });

  // tests if admin can delete category
});
