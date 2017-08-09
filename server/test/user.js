const app = require('../../app');
const assert  = require('chai').assert;
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const salt = require('bcrypt').genSaltSync(10);



  describe('User, ', () => {
     const today = new Date();
     const DueDate = new Date(today.getTime() + (24 * 60 * 60 * 14));
     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoidXNlciIsImlhdCI6MTUwMjI3NDQwNiwiZXhwIjoxNTAyMzYwODA2fQ.FSfuz2gOrr1AGlTIftqBCkTaajrxJ6JwlwmzD1_CfnA';
      describe('should be able to find out if user exists', () => {
        it('return 401 error if user does not exist', (done) => {
        const user = {
        username: 'does_not_exist',
        password: 'password',
        };
       supertest(app).post('/api/users/login').send(user).end((err, res) => {
       assert.equal(res.body.message, "User not found");
       assert.equal(res.statusCode, 404);
       done();
      });
        });
     });

    describe('should generate a token for user on successful login', () => {
      it('return a token on successful login', (done) => {
      const user = {
      username: 'tony',
      password: 'hello',
      };
      supertest(app).post('/api/users/login').send(user).end((err, res) => {
      assert.isOk(res.body.token);
      done();
    });
   });
    });
   describe('return User created for new user ', () => {
      it('create a new user', (done) => {
      let salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync("mypassword", salt);
      function makeUser() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
           text += possible.charAt(Math.floor(Math.random() * possible.length));
           return text;
      }
      const user = {
      username: makeUser(),
      password: password,
      role: 'user',
      email: makeUser()+"@gmail.com",
      level: 'silver',
      image: 'none'
      };
      supertest(app).post('/api/users/signup').send(user).end((err, res) => {
      assert.equal(res.statusCode, 201);
      assert.equal(res.body.message, 'User Created Successfully.');
      done();
    });
   });
   });

   
      describe('test if user can borrow book again before returning the previously borrowed copy of the same book ', () => {
      it('should return "You have already borrowed this book" for book borrowed before without returning', (done) => {
                        
      const borrowstatus = {
        user_id: 1,
        book_id: 1,
        returned: false,
        borrowDate: today,
        expectedReturnDate: DueDate,
        token: token
      };
      supertest(app).post('/api/users/1/books/1/borrow').set('token', token).send(borrowstatus).end((err, res) => {
      assert.equal(res.statusCode, 400);
      assert.equal(res.body.message, 'You have already borrowed this book');
      done();      
    });
   });
});
     
      describe('test if user can borrow book if book quantity is 0 ', () => {
      it('should return "book not available" when book quantity is less than 1', (done) => {
       const today = new Date();
       const DueDate = new Date(today.getTime() + (24 * 60 * 60 * 14));
       const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoidXNlciIsImlhdCI6MTUwMjI3NDQwNiwiZXhwIjoxNTAyMzYwODA2fQ.FSfuz2gOrr1AGlTIftqBCkTaajrxJ6JwlwmzD1_CfnA';
       const borrowdetails = {
        user_id: 1,
        book_id: 5,
        returned: false,
        borrowDate: today,
        expectedReturnDate: DueDate,
        token: token
      };
      supertest(app).post('/api/users/1/books/5/borrow').send(borrowdetails).end((err, res) => {
      assert.equal(res.statusCode, 200);
      assert.equal(res.body.message, 'Book not available');
      done();      
    });
   });
});


    describe('test if user can get history of borrowed books', () => {
        it('return all user borrowed books history', (done) => {      
          supertest(app).get('/api/users/1/history').set('x-access-token', token).send().end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
          });
        });
     });


     describe('test if user can get hisory of books borrowed not returned books', () => {
        it('return all user borrowed books history', (done) => {      
          supertest(app).get('/api/users/1/books').set('x-access-token', token).send().end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
          });
        });
     });
    
     describe('should test if user can return book', () => {
      it('returns book', (done) => {
     
     const borrowdetails = {
        userId: 1,
        bookId: 1,
        returned: true,
        dateReturned: today,
        token: token
      };
      supertest(app).put('/api/users/1/books/1/return').send({token: token}).end((err, res) => {
      assert.equal(res.statusCode, 200);
      //assert.equal(res.body.message, 'Book Updated Successfully.');
      done();
    });
   });
   });
   
});

 