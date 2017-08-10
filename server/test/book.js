import app from '../../app';
import assert from 'chai';
import supertest from 'supertest';


  describe('In the Book controller, ', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoidXNlciIsImlhdCI6MTUwMjM2NjU0MywiZXhwIjoxNTAyNDUyOTQzfQ.JYEGFMoLgOUOV4aq1iE1m9C55478Boe8jyhXk3OnDIw';
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MDIzNjcyNDIsImV4cCI6MTUwMjQ1MzY0Mn0.nq01UVvZ2pSpQryoztJdqNOFTpl-U2wVuYaiaEKeeIc';
    //tests if user can get all books
    
    describe('test if user can get all books, ', () => {
        it('return all books', (done) => {      
          supertest(app).get('/api/books').set('x-access-token', token).send().end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
          });
        });
     });

//tests if admin can create book with correct information
     describe('test if book can be created with correct and complete parameters', () => {
      it('returns a new book', (done) => {
      function makeText() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
           text += possible.charAt(Math.floor(Math.random() * possible.length));
           return text;
      }
      const book = {
      title: makeText(),
      description: makeText(),
      quantity: '5',
      image: "none for now",
      category: makeText(),
      publisher: "Test",
      author: "Testing Test",
      size: 250,
      edition: 2010,
      isbn: Math.random(),
      token: adminToken
      };
      supertest(app).post('/api/books/create').send(book).end((err, res) => {
      assert.equal(res.statusCode, 201);
      assert.equal(res.body.message, 'Book Created Successfully.');
      done();
    });
   });
   });

   //tests if admin can creat book with incomplete information


  describe('test if book can be created with incorrect complete parameters', () => {
      it('does not returns a new book', (done) => {
      function makeText() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
           text += possible.charAt(Math.floor(Math.random() * possible.length));
           return text;
      }
      const book = {
      title: makeText(),
      description: makeText(),
      quantity: '5',
      image: "none for now",
      category: makeText(),
      publisher: "Test",
      token: adminToken
      };
      supertest(app).post('/api/books/create').send(book).end((err, res) => {
      assert.equal(res.statusCode, 400);
      //assert.equal(res.body.message, 'Book Created Successfully.');
      done();
    });
   });
   });

   //tests if user can get book by Id or not

   describe('test if user can get book by Id if book exists, ', () => {
        it('return book at specified id', (done) => {      
          const id = Math.floor(11 + Math.random()*2);
          supertest(app).get('/api/books/'+id).set('x-access-token', token).send().end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
          });
        });
     });
   
      describe('test if user can get book by Id if book does not exist, ', () => {
        it('return book not found', (done) => {      
        
          supertest(app).get('/api/books/100').set('x-access-token', token).send().end((err, res) => {
          assert.equal(res.statusCode, 404);
          assert.equal(res.body.message, 'Book Not Found');
          done();
          });
        });
     });
    

     //tests if admin can update book information

      describe('should update book information if user is admin', () => {
      it('updates book information', (done) => {
      function makeText() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
           text += possible.charAt(Math.floor(Math.random() * possible.length));
           return text;
      }
      const book = {
      title: makeText(),
      description: makeText(),
      category: makeText(),
      publisher: "Test",
      token: adminToken
      };
      supertest(app).put('/api/books/1').send(book).end((err, res) => {
      assert.equal(res.statusCode, 200);
      //assert.equal(res.body.message, 'Book Updated Successfully.');
      done();
    });
   });
   });

   //tests if admin can delete book

      describe('should delete book if user is admin', () => {
      it('delete book ', (done) => {
      let id = Math.floor(Math.random() * 9) + 47;
      supertest(app).del('/api/books/'+id).send({'token':adminToken}).end((err, res) => {
      assert.equal(res.statusCode, 204);
      done();
    
    });
   
   });
   });
});