import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';

const assert = chai.assert;

describe('Category, ', () => {
  const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo3LCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MDI0MTgwNzQsImV4cCI6MTUwMjY3NzI3NH0.JZENWc5qBOCpYrGTPJeBnnyxy7ugjeKsJN-jvVdGAL8';
  function makeText() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
  }

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
        assert.equal(res.statusCode, 400);
        done();
      });
    });
  });

  // tests if admin can get category by Id or not

  describe('test if admin can get category by Id if it exists, ', () => {
    it('return category at specified id', (done) => {
      supertest(app).get('/api/v1/categories/1').set('x-access-token', adminToken).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

  describe('test if user can get category by Id if it does not exist, ', () => {
    it('return category not found', (done) => {
      supertest(app).get('/api/v1/categories/100').set('x-access-token', adminToken).send()
        .end((err, res) => {
          assert.equal(res.statusCode, 404);
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
      supertest(app).put('/api/v1/categories/1').send(cat)
        .end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
        });
    });
  });

  // tests if admin can delete category

  describe('should not delete category if category has been deleted previously by admin', () => {
    it('should not delete category ', (done) => {
      // const id = Math.floor(Math.random() * 20) + 8;
      supertest(app).del('/api/v1/categories/37').send({ token: adminToken }).end((err, res) => {
        assert.equal(res.statusCode, 404);
        done();
      });
    });
  });
});
