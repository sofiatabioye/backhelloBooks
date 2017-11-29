import models from '../models/index';

const Book = models.Book;

export default {
    // Admin add new book
    create(req, res) {
        console.log(req.body);
        return Book
            .create(req.body)
            .then(book => res.status(201).send({ book: book, message: 'Book Created Successfully.' }))
            .catch(error => res.status(500).send(error));
    },

    // lists all books in the library
    list(req, res) {
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 1;
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
            .catch(error => res.status(500).send(error, "err"));
    },

    // lists books by category
    getBooksByCat(req, res) {
        const catTitle = req.params.title;
        return Book
            .findAll({ where: { category: catTitle } })
            .then(books => res.status(200).send({ books: books, message: `${catTitle} Books` }))
            .catch(error => res.status(500).send(error));
    },

    // View book information by Id
    retrieve(req, res) {
        return Book
            .findById(req.params.bookId)
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
        return Book
            .findById(req.params.bookId)
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
                    .then(() => res.status(200).send(book)) // Send back the updated book.
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(500).send(error));
    },

    // Admin delete book
    destroy(req, res) {
        return Book
            .findById(req.params.bookId)
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


};
