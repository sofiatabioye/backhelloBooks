import axios from 'axios';
import toastr from 'toastr';
import { SET_BOOKS, SAVE_BOOK_BEGINS, SAVE_BOOK_SUCCESS, SAVE_BOOK_FAILURE, GET_BOOK, UPDATE_BOOK, BOOKS_CATEGORY_SUCCESS, UPDATE_BOOK_BEGINS, UPDATE_BOOK_SUCCESS, UPDATE_BOOK_FAILURE, BORROW_BOOK_BEGINS, FETCH_BORROWED_BOOKS_BEGINS, FETCH_BORROWED_BOOKS_SUCCESS, FETCH_BORROWED_BOOKS_FAILURE
} from './actionTypes';

/**
 * 
 * 
 * @export
 * @param {any} books 
 * @returns 
 */
export function setBooks(books) {
    return {
        type: SET_BOOKS,
        books,
    };
}

/**
 * 
 * 
 * @export
 * @param {any} book 
 * @returns 
 */
export function addBookBegins() {
    return {
        type: SAVE_BOOK_BEGINS,
    };
}
/**
 * 
 * 
 * @export
 * @param {any} message 
 * @returns 
 */
export function addBook(message, book) {
    return {
        type: SAVE_BOOK_SUCCESS,
        message,
        book
    };
}

/**
 * @export
 * @param {any} errors 
 * @returns {errors}
 */
export function addBookFails(errors) {
    return {
        type: SAVE_BOOK_FAILURE,
        errors
    };
}

/**
 * 
 * 
 * @export
 * @param {any} id 
 * @returns {id} of book
 */
export function getBook(id) {
    return {
        type: GET_BOOK,
        id
    };
}


/**
 * @export
 * @param {any} id 
 * @returns {id} update book by Id
 */
export function updatedBook(id) {
    return {
        type: UPDATE_BOOK,
        id
    };
}

/**
 * @param {any} void
 * @export
 * @returns {void}
 */
export function updatedBookBegins() {
    return {
        type: UPDATE_BOOK_BEGINS
    };
}

/**
 * @param {any} void
 * @export
 * @returns {void}
 */
export function borrowBookBegins() {
    return {
        type: BORROW_BOOK_BEGINS
    };
}

/**
 * @param {any} void
 * @export
 * @returns {void}
 */
export function getBorrowedBooksBegins() {
    return {
        type: FETCH_BORROWED_BOOKS_BEGINS
    };
}

/**
 * @param {any} void
 * @export
 * @returns {void}
 */
export function getBorrowedBooksSuccess(books) {
    return {
        type: FETCH_BORROWED_BOOKS_SUCCESS,
        books
    };
}

/**
 * @param {any} void
 * @export
 * @returns {void}
 */
export function getBorrowedBooksFailure(errors) {
    return {
        type: FETCH_BORROWED_BOOKS_FAILURE,
        errors
    };
}

/**
 * @export
 * @param {any} book 
 * @param {any} message 
 * @returns {message} on book update
 */
export function updateBookSuccess(book, message) {
    return {
        type: UPDATE_BOOK_SUCCESS,
        book,
        message
    };
}

/**
 * 
 * @export
 * @param {any} errors 
 * @returns {errors } on book update
 */
export function updateBookFailure(errors) {
    return {
        type: UPDATE_BOOK_FAILURE,
        errors
    };
}


/**
 * @export
 * @param {any} book
 * @returns {books} by category
 */
export function getBooksByCategory(categoryBooks) {
    return {
        type: BOOKS_CATEGORY_SUCCESS,
        categoryBooks
    };
}


/**
 * @export
 * @returns {books} all books
 * @param {offset}
 * @param {limit}
 */
export function getBooks(offset, limit) {
    return (dispatch) => axios.get(`/api/v1/books?offset=${offset}&limit=${limit}`)
        .then((response) => {
            dispatch(setBooks(response.data));
        })
        .catch((error) => error);
}


/**
 * @export
 * @param {any} title 
 * @returns {books} by category
 */
export function getBooksByCat(title) {
    return (dispatch) => axios.get(`/api/v1/books/categories/${title}`)
        .then((response) => {
            dispatch(getBooksByCategory(response.data));
        })
        .catch((error) => error);
}


/**
 * @export
 * @param {id, book} updates book by Id 
 * @param {any} data 
 * @returns 
 */
export function updateBook(id, bookData) {
    return (dispatch) => {
        dispatch(updatedBookBegins);
        return axios.put(`/api/v1/books/${id}`, bookData)
            .then((response) => {
                const book = response.data.books;
                const message = response.data.message;
                dispatch(updateBookSuccess(book, message));
            }, (err) => {
                const errors = err.response.data;
                dispatch(updateBookFailure(errors));
            });
    };
}

/**
 * @export
 * @param {any} data 
 * @returns 
 */
export function saveBooks(data, history) {
    return (dispatch) => {
        dispatch(addBookBegins());
        return axios.post(`/api/v1/books/create`, data)
            .then((response) => {
                dispatch(addBook(response.data.books, response.data.message));
                toastr.success(response.data.message);
            })
            .catch((err) => {
                dispatch(addBookFails(err.response.data.message));
                toastr.warning(err.response.data.message);
            });
    };
}


/**
 * 
 * 
 * @export
 * @param {any} userId 
 * @param {any} bookId 
 * @param {any} history 
 * @returns 
 */
export function borrowBook(bookId, userId, history) {
    return (dispatch) => {
        dispatch(borrowBookBegins());
        return axios.post(`/api/v1/users/${userId}/books/${bookId}/borrow`)
            .then((response) => {
                dispatch({ type: 'BORROW_BOOK_SUCCESS', message: response.data.message });
                toastr.success(response.data.message);
            })
            .catch((err) => {
                dispatch({ type: 'BORROW_BOOK_FAILURE', errors: err.response.data });
                toastr.warning(err.response.data.message);
            });
    };
}


/**
 * @export
 * @param {any} userId 
 * @param {any} bookId 
 * @returns 
 */
export function returnBook(userId, bookId) {
    return (dispatch) =>
        axios.put(`/api/v1/users/${userId}/books/${bookId}/return`)
            .then((response) => {
                console.log(response);
                dispatch({ type: 'RETURN_BOOK_SUCCESS', id: bookId });
                toastr.success(response.data.message);
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: 'RETURN_BOOK_FAILURE', errors: err.response });
                toastr.warning(err.response);
            });
}


/**
 * 
 * 
 * @export
 * @param {any} userId 
 * @returns 
 */
export function fetchBorrowedBooks(userId) {
    return (dispatch) => {
        dispatch(getBorrowedBooksBegins());
        return axios.get(`/api/v1/users/${userId}/books`)
            .then((response) => {
                dispatch(getBorrowedBooksSuccess(response.data));
            })
            .catch((err) => {
                dispatch(getBorrowedBooksFailure(err.response.data));
                toastr.warning(err.response.data.message);
            });
    };
}

/**
 * 
 * 
 * @export
 * @param {any} userId 
 * @returns 
 */
export function fetchBorrowHistory(userId) {
    return (dispatch) => {
        dispatch({ type: 'BORROW_HISTORY_BEGINS' });
        return axios.get(`/api/v1/users/${userId}/history`)
            .then((response) => {
                dispatch({ type: 'BORROW_HISTORY_SUCCESS', books: response.data });
                return response.data;
            })
            .catch((err) => {
                dispatch({ type: 'BORROWED_HISTORY_FAILURE', errors: err.response.data });
                return err;
            });
    };
}


/**
 * 
 * 
 * @export
 * @param {any} id 
 * @returns {void}
 */
export function deleteBook(bookId) {
    return (dispatch) => {
        dispatch({ type: 'DELETE_BOOK_BEGINS' });
        return axios.delete(`/api/v1/books/${bookId}`)
            .then((response) => {
                dispatch({ type: 'DELETE_BOOK_SUCCESS', id: bookId });
            })
            .catch((err) => {
                dispatch({ type: 'DELETE_BOOK_FAILURE', errors: err.response.data });
            });
    };
}

