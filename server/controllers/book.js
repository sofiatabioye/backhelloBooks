import models from '../models/index';

const Book = models.Book;
const Category = models.Category;

export default {
  // Admin add new book
  create(req, res) {
    return Book
      .create(req.body)
      .then((book) => res.status(201).send({ book: book, message: 'Book Created Successfully.' }))
      .catch(error => res.status(400).send(error));
  },

  // lists all books in the library
  list(req, res) {
    const offset = req.query.offset || null;
    const limit = req.query.limit || null;
    if (isNaN(offset) || offset < 0) {
      res.status(200).send({ message: 'offset must be a non-negative number' });
    } else if (isNaN(limit) || limit < 0) {
      res.status(200).send({ message: 'limit must be a non-negative number' });
    } else {
      return Book
        .findAndCountAll({ offset, limit, order: [['id']] })
        .then(book => {
          res.status(200).send({
            books: book.rows,
            message: 'All books',
            pagination: {
              totalCount: book.count,
              pageSize: book.rows.length,
              pageCount: Math.ceil(book.count / limit),
              page: Math.floor(offset / limit) + 1
            }
          });
        })
        .catch(error => res.status(500).send(error));
    }
  },

  // lists books by category
  getBooksByCat(req, res) {
    const catTitle = req.params.title;
    Category
      .findOne({ where: { title: catTitle } })
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        } else {
          return Book
            .findAll({ where: { category: catTitle } })
            .then(books => {
              res.status(200).send({
                books: books, message: `${catTitle} Books` });
            })
            .catch(error => res.status(500).send(error));
        }
      })
      .catch(error => res.status(500).send(error));
  },

  // View book information by Id
  retrieve(req, res) {
    const bookId = req.params.bookId;
    if (isNaN(bookId) || bookId < 0) {
      res.status(400).send({
        message: 'Book Id must be a non-negative number',
      });
    }
    return Book
      .findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return res.status(200).send(book);
      })
      .catch(error => res.status(500).send(error));
  },

  // Admin update book information
  update(req, res) {
    const bookId = req.params.bookId;
    if (isNaN(bookId) || bookId < 0) {
      res.status(400).send({
        message: 'Book Id must be a non-negative number',
      });
    }
    return Book
      .findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return book
          .update({
            title: req.body.title || book.title,
            description: req.body.description || book.description,
            category: req.body.category || book.category,
            quantity: req.body.quantity || book.quantity,
            image: req.body.image || book.image,
            author: req.body.author || book.author,
            ISBN: req.body.isbn || book.ISBN,
            bookEdition: req.body.edition || book.bookEdition,
            publisher: req.body.publisher || book.publisher,
            bookSize: req.body.size || book.bookSize,
          })
          .then(() => res.status(200).send({ message: 'Book Updated Successfully.', book })) // Send back the updated book.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(500).send(error));
  },

  // Admin delete book
  destroy(req, res) {
    const bookId = req.params.bookId;
    if (isNaN(bookId) || bookId < 0) {
      return res.status(400).send({
        message: 'Book Id must be a non-negative number',
      });
    }
    return Book
      .findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return book
          .destroy()
          .then(() => res.status(204).send({ message: 'Book deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(500).send(error));
  },

  search(req, res) {
    const searchQuery = req.query.searchTerm || null;
    const category = req.query.category || null;
    const offset = req.query.offset || null;
    const limit = req.query.limit || null;
    const whereSearch = {
      $or: [{
        title:
            { $iLike: `%${searchQuery}%` }
      }, {
        author:
            { $iLike: `%${searchQuery}%` }
      }]
    };
    if (category) {
      whereSearch.$and = [{ category }];
    }
    if (searchQuery === null) {
      return res.status(400)
        .send({ message: 'Please enter your search criteria' });
    }
    if (isNaN(offset) || offset < 0) {
      return res.status(200).send({ message: 'offset must be a non-negative number' });
    }
    if (isNaN(limit) || limit < 0) {
      return res.status(200)
        .send({ message: 'limit must be a non-negative number' });
    }
    if (searchQuery.length > 0) {
      Book
        .findAndCountAll({
          where: whereSearch,
          limit,
          offset
        })
        .then((books) => {
          const booksFound = {
            books: books.rows,
            pagination: {
              totalCount: books.count,
              pageSize: books.rows.length,
              pageCount: Math.ceil(books.count / limit),
              page: Math.floor(offset / limit) + 1
            }
          };
          if (books.rows.length === 0) {
            return res.status(404)
              .send({ message: 'Sorry no books match your search criteria' });
          }
          return res.status(200).send({ booksFound });
        })
        .catch(error => res.status(500).send(error.message));
    }
  },


};
