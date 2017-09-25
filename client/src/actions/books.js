import axios from 'axios';
import request from 'superagent';
import { SET_BOOKS, ADD_BOOK, GET_BOOK, UPDATE_BOOK } from './types';
import { addFlashMessage } from '../actions/flashmessages';

// const CLOUDINARY_UPLOAD_PRESET = 'hellobooks';
// const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sofiat/upload';

export function setBooks(books) { // eslint-disable-line require-jsdoc
    return {
        type: SET_BOOKS,
        books,
    };
}

export function addBook(book) { // eslint-disable-line require-jsdoc
    return {
        type: ADD_BOOK,
        book
    };
}

export function getBook(id) { // eslint-disable-line require-jsdoc
    return {
        type: GET_BOOK,
        id
    };
}

export function updatedBook(id) { // eslint-disable-line require-jsdoc
    return {
        type: UPDATE_BOOK,
        id
    };
}

export function getBooks() { // eslint-disable-line require-jsdoc
    return (dispatch) => axios.get(`/api/v1/books`)
        .then((response) => {
            const data = response.data.books;
            dispatch(setBooks(data));
        },
        (errors) => errors
        );
}

export function getBooksByCat(title) { // eslint-disable-line require-jsdoc
    return (dispatch) => axios.get(`/api/v1/books/categories/${title}`)
        .then((response) => {
            dispatch({ type: 'BOOKS_CATEGORY_SUCCESS', books: response.data });
        },
        (errors) => errors
        );
}

export function fetchBook(id) { // eslint-disable-line require-jsdoc
    return (dispatch) => {
        dispatch({ type: 'FETCH_BOOKS_BEGINS' });
        return axios.get(`/api/v1/books/${id}`)
            .then((response) => {
                dispatch({ type: 'FETCH_BOOKS_SUCCESS', books: response.data });
            });
    };
}
export function updateBook(id, data) { // eslint-disable-line require-jsdoc
    return dispatch => axios.put(`/api/v1/books/${id}`, data);
}

export function saveBooks(data) { // eslint-disable-line require-jsdoc
    return dispatch => axios.post(`/api/v1/books/create`, data);
}

export function borrowBook(userId, bookId, history) { // eslint-disable-line require-jsdoc
    return (dispatch) => {
        dispatch({ type: 'BORROW_BOOK_BEGINS' });
        return axios.post(`/api/v1/users/${userId}/books/${bookId}/borrow`)
            .then((response) => {
                dispatch({ type: 'BORROW_BOOK_SUCCESS', books: response.data.books, message: response.data.message });
                return response.data;
            }, (err) => {
                dispatch({ type: 'BORROW_BOOK_FAILURE', errors: err.response.data.message, books: err.response.data.book });
                return err;
            });
    };
}
export function returnBook(userId, bookId) { // eslint-disable-line require-jsdoc
    return (dispatch) =>
        axios.put(`/api/v1/users/${userId}/books/${bookId}/return`)
            .then((response) => {
                dispatch({ type: 'RETURN_BOOK_SUCCESS', id: bookId });
                return response.data;
            }, (err) => {
                dispatch({ type: 'RETURN_BOOK_FAILURE', errors: err.response.data.message });
                return err;
            });
}
export function fetchBorrowedBooks(userId) { // eslint-disable-line require-jsdoc
    return (dispatch) => {
        dispatch({ type: 'FETCH_BORROWED_BOOK_BEGINS' });
        return axios.get(`/api/v1/users/${userId}/books`)
            .then((response) => {
                dispatch({ type: 'FETCH_BORROWED_BOOKS_SUCCESS', books: response.data });
                //return response.data; console.log(response.data);
            }, (err) => {
                dispatch({ type: 'FETCH_BORROWED_BOOKS_FAILURE', errors: err.response.data });
                return err;
            });
    };
}

export function fetchBorrowHistory(userId) { // eslint-disable-line require-jsdoc
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

export function deleteBook(id) { // eslint-disable-line require-jsdoc
    return dispatch => axios.delete(`/api/v1/books/${id}`);
}

// export function uploadBookCoverPhoto(data) { // eslint-disable-line require-jsdoc
//     return dispatch => request.post(CLOUDINARY_UPLOAD_URL)
//         .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
//         .field('file', data.coverPhotoPath);
// }
