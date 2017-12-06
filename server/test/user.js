import chai from 'chai';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwtDecode from 'jwt-decode';

import app from '../app';

dotenv.config();
const salt = bcrypt.genSaltSync(10);
const assert = chai.assert;


describe('User, ', () => {
  const today = new Date();
  const DueDate = new Date(today.getTime() + (24 * 60 * 60 * 14));
  const token = process.env.USER_TOKEN;
  const decoded = jwtDecode(token);
  const userId = decoded.user;
  const makeUser = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)); }
    return text;
  };
  // tests if user exists
  describe('should be able to find out if user exists', () => {
    it('return 404 error if user does not exist', (done) => {
      const user = {
        email: 'does_not_exist@email.com',
        password: 'password',
      };
      supertest(app).post('/api/v1/users/signin').send(user).end((err, res) => {
        assert.isObject(res.body);
        assert.equal(res.body.message, 'Invalid login credentials');
        assert.equal(res.statusCode, 400);
        if (err) return done(err);
        done();
      });
    });
  });

  // create a new user account
  describe('return User created for new user ', () => {
    it('create a new user', (done) => {
      const passwordHash = bcrypt.hashSync('mypassword', salt);
      const user = {
        username: makeUser(),
        password: passwordHash,
        role: 'user',
        email: `${makeUser()}@gmail.com`,
        level: 'silver',
        image: 'none'
      };
      supertest(app).post('/api/v1/users/signup').send(user)
        .end((err, res) => {
          assert.isObject(res.body);
          assert.equal(res.statusCode, 201);
          assert.equal(res.body.message, 'User Created Successfully.');
          if (err) return done(err);
          done();
        });
    });
  });

  // generate token for user on successfull login
  // describe('should generate a token for user on successful login', () => {
  //   it('return a token on successful login', (done) => {
  //     const user = {
  //       email: 'test@gmail.com',
  //       password: 'hello'
  //     };
  //     supertest(app).post('/api/v1/users/login').send(user).end((err, res) => {
  //       assert.isObject(res.body);
  //       assert.equal(res.statusCode, 200);
  //       assert.equal(res.body.message, 'You are signed in');
  //       assert.isOk(res.body.token);
  //       if (err) return done(err);
  //       done();
  //     });
  //   });
  // });

  // test if user can borrow an unreturned book again
  describe('test if user can borrow a book that does not exist ', () => {
    it('should return "Book Not Found" for book that does not exist', (done) => {
      const borrowstatus = {
        user_id: decoded.user,
        book_id: 1,
        returned: false,
        borrowDate: today,
        expectedReturnDate: DueDate,
        token
      };
      supertest(app).post(`/api/v1/users/${userId}/books/1000/borrow`).send(borrowstatus)
        .end((err, res) => {
          assert.isObject(res.body);
          assert.equal(res.statusCode, 404);
          assert.equal(res.body.message, 'Book Not Found');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('test if user can get hisory of books borrowed not returned books', () => {
    it('return all user borrowed books history', (done) => {
      supertest(app).get(`/api/v1/users/${userId}/books`).set('x-access-token', token).send()
        .end((err, res) => {
          assert.isOk(res.body.UserBorrowHistory);
          assert.equal(res.statusCode, 200);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('should test if user can return book he did does not exist', () => {
    it('returns book', (done) => {
      supertest(app).put(`/api/v1/users/${userId}/books/10000/return`).send({ token }).end((err, res) => {
        assert.equal(res.statusCode, 404);
        assert.equal(res.body.message, 'Book Not found');
        assert.isObject(res.body);
        if (err) return done(err);
        done();
      });
    });
  });
});

