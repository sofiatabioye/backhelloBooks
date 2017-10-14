'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Book = _index2.default.Book;

exports.default = {
    // Admin add new book
    create: function create(req, res) {
        return Book.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            quantity: req.body.quantity,
            image: req.body.image,
            author: req.body.author,
            ISBN: req.body.isbn,
            bookEdition: req.body.edition,
            publisher: req.body.publisher,
            bookSize: req.body.size
        }).then(function (book) {
            return res.status(201).send({ book: book, message: 'Book Created Successfully.' });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },


    // lists all books in the library
    list: function list(req, res) {
        var offset = req.query.offset || null;
        var limit = req.query.limit || null;
        return Book.findAndCountAll({ offset: offset, limit: limit, order: [['id']] }).then(function (book) {
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
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },


    // lists books by category
    getBooksByCat: function getBooksByCat(req, res) {
        var catTitle = req.params.title;
        return Book.findAll({ where: { category: catTitle } }).then(function (books) {
            return res.status(200).send({ books: books, message: catTitle + ' Books' });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },


    // View book information by Id
    retrieve: function retrieve(req, res) {
        return Book.findById(req.params.bookId).then(function (book) {
            if (!book) {
                return res.status(404).send({
                    message: 'Book Not Found'
                });
            }
            return res.status(200).send(book);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },


    // Admin update book information
    update: function update(req, res) {
        return Book.findById(req.params.bookId).then(function (book) {
            if (!book) {
                return res.status(404).send({
                    message: 'Book Not Found'
                });
            }
            return book.update({
                title: req.body.title || book.title,
                description: req.body.description || book.description,
                category: req.body.category || book.category,
                quantity: req.body.quantity || book.quantity,
                image: req.body.image || book.image,
                author: req.body.author || book.author,
                ISBN: req.body.isbn || book.ISBN,
                bookEdition: req.body.edition || book.bookEdition,
                publisher: req.body.publisher || book.publisher,
                bookSize: req.body.size || book.bookSize
            }).then(function () {
                return res.status(200).send(book);
            }) // Send back the updated book.
            .catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    },


    // Admin delete book
    destroy: function destroy(req, res) {
        return Book.findById(req.params.bookId).then(function (book) {
            if (!book) {
                return res.status(404).send({
                    message: 'Book Not Found'
                });
            }
            return book.destroy().then(function () {
                return res.status(204).send({ message: 'Book deleted successfully.' });
            }).catch(function (error) {
                return res.status(400).send(error);
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    }
};