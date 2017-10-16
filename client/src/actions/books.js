import axios from 'axios';
import request from 'superagent';
import { SET_BOOKS, ADD_BOOK, GET_BOOK, UPDATE_BOOK } from './types';


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
export function addBook(book) {
    return {
        type: ADD_BOOK,
        book
    };
}


/**
 * 
 * 
 * @export
 * @param {any} id 
 * @returns 
 */
export function getBook(id) {
    return {
        type: GET_BOOK,
        id
    };
}


/**
 * 
 * 
 * @export
 * @param {any} id 
 * @returns 
 */
export function updatedBook(id) {
    return {
        type: UPDATE_BOOK,
        id
    };
}


/**
 * 
 * 
 * @export
 * @returns 
 */
export function getBooks(offset, limit) {
    return (dispatch) => axios.get(`/api/v1/books?offset=${offset}&limit=${limit}`)
        .then((response) => {
            const data = response.data;
            dispatch(setBooks(data));
        },
        (errors) => errors
        );
}


/**
 * 
 * 
 * @export
 * @param {any} title 
 * @returns 
 */
export function getBooksByCat(title) {
    return (dispatch) => axios.get(`/api/v1/books/categories/${title}`)
        .then((response) => {
            dispatch({ type: 'BOOKS_CATEGORY_SUCCESS', books: response.data });
        },
        (errors) => errors
        );
}


/**
 * 
 * 
 * @export
 * @param {any} id 
 * @returns 
 */
export function fetchBook(id) {
    console.log(id);
    return (dispatch) => {
        dispatch({ type: 'FETCH_BOOKS_BEGINS' });
        return axios.get(`/api/v1/books/${id}`)
            .then((response) => {
                dispatch({ type: 'FETCH_BOOKS_SUCCESS', books: response.data });
            });
    };
}


/**
 * 
 * 
 * @export
 * @param {any} id 
 * @param {any} data 
 * @returns 
 */
export function updateBook(id, data) {
    return dispatch => axios.put(`/api/v1/books/${id}`, data);
}


/**
 * 
 * 
 * @export
 * @param {any} data 
 * @returns 
 */
export function saveBooks(data) {
    return dispatch => axios.post(`/api/v1/books/create`, data);
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
export function borrowBook(userId, bookId, history) {
    return (dispatch) => {
        dispatch({ type: 'BORROW_BOOK_BEGINS' });
        return axios.post(`/api/v1/users/${userId}/books/${bookId}/borrow`)
            .then((response) => {
                dispatch({ type: 'BORROW_BOOK_SUCCESS', books: response.data.books, message: response.data.message });
            }, (err) => {
                dispatch({ type: 'BORROW_BOOK_FAILURE', errors: err.response.data, books: err.response.data.book });
            });
    };
}


/**
 * 
 * 
 * @export
 * @param {any} userId 
 * @param {any} bookId 
 * @returns 
 */
export function returnBook(userId, bookId) {
    return (dispatch) =>
        axios.put(`/api/v1/users/${userId}/books/${bookId}/return`)
            .then((response) => {
                dispatch({ type: 'RETURN_BOOK_SUCCESS', id: bookId });
            }, (err) => {
                dispatch({ type: 'RETURN_BOOK_FAILURE', errors: err.response.data.message });
                return err;
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
        dispatch({ type: 'FETCH_BORROWED_BOOK_BEGINS' });
        return axios.get(`/api/v1/users/${userId}/books`)
            .then((response) => {
                dispatch({ type: 'FETCH_BORROWED_BOOKS_SUCCESS', books: response.data });
            }, (err) => {
                dispatch({ type: 'FETCH_BORROWED_BOOKS_FAILURE', errors: err.response.data });
                return err;
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
            }, (err) => {
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
            }, (err) => {
                dispatch({ type: 'DELETE_BOOK_FAILURE', errors: err.response.data });
            });
    };
}

