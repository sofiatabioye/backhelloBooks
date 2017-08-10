import app from '../../app';
import assert from 'chai';
import supertest from 'supertest';

 
  describe('Category, ', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJyb2xlIjoidXNlciIsImlhdCI6MTUwMjM2NjU0MywiZXhwIjoxNTAyNDUyOTQzfQ.JYEGFMoLgOUOV4aq1iE1m9C55478Boe8jyhXk3OnDIw';
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MDIyODIyNTgsImV4cCI6MTUwMjM2ODY1OH0.rcevaA1BxqoxhNzYp4USIfw5PHHhdKmWUerxDl2ijCI'; 
      
    
//tests if admin can get all categories
    
     describe('test if admin can get all categories, ', () => {
        it('return all categories', (done) => {      
          supertest(app).get('/api/categories').set('x-access-token', adminToken).send().end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
          });
        });
     });

//tests if admin can create book with correct information
     describe('test if categories can be created with correct parameters', () => {
      it('returns a new category', (done) => {
      function makeText() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
           text += possible.charAt(Math.floor(Math.random() * possible.length));
           return text;
      }
      const cat = {
      title: makeText(),
      token: adminToken
      };
      supertest(app).post('/api/categories/create').send(cat).end((err, res) => {
      assert.equal(res.statusCode, 201);
      assert.equal(res.body.message, 'Category Created Successfully');
      done();
    });
   });
   });

   //tests if admin can creat book with incomplete information


  describe('test if category title may not be unique', () => {
      it('does not returns a new book', (done) => {
      const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MDIyODIyNTgsImV4cCI6MTUwMjM2ODY1OH0.rcevaA1BxqoxhNzYp4USIfw5PHHhdKmWUerxDl2ijCI'; 
      const book = {
      title: "Fiction",
      token: adminToken
      };
      supertest(app).post('/api/categories/create').send(book).end((err, res) => {
      assert.equal(res.statusCode, 400);
      done();
    });
   });
   });

   //tests if admin can get category by Id or not

   describe('test if admin can get category by Id if it exists, ', () => {
        it('return category at specified id', (done) => {      
          //const id = Math.floor(Math.random() * 12 +8);
          supertest(app).get('/api/categories/1').set('x-access-token', adminToken).send().end((err, res) => {
          assert.equal(res.statusCode, 200);
          done();
          });
        });
     });
   
      describe('test if user can get category by Id if it does not exist, ', () => {
        it('return category not found', (done) => {      
        
          supertest(app).get('/api/categories/100').set('x-access-token', adminToken).send().end((err, res) => {
          assert.equal(res.statusCode, 404);
          assert.equal(res.body.message, 'Category Not Found');
          done();
          });
        });
     });
    

     //tests if admin can update category information

      describe('should update category information if user is admin', () => {
      it('updates category information', (done) => {
      function makeText() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
           text += possible.charAt(Math.floor(Math.random() * possible.length));
           return text;
      }
      const cat = {
      title: makeText(),
      token: adminToken
      };
      supertest(app).put('/api/categories/1').send(cat).end((err, res) => {
      assert.equal(res.statusCode, 200);
      done();
    });
   });
   });

   //tests if admin can delete category

      describe('should delete category if user is admin', () => {
      it('delete book ', (done) => {
      let id = Math.floor(Math.random() * 3) + 20;
      supertest(app).del('/api/categories/'+id).send({'token':adminToken}).end((err, res) => {
      assert.equal(res.statusCode, 204);
      done();
    
    });
   
   });
   });
});