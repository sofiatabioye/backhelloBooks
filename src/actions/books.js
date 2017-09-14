import axios from 'axios';
import request from 'superagent';
import { SET_BOOKS, ADD_BOOK, GET_BOOK, UPDATE_BOOK } from './types';

const CLOUDINARY_UPLOAD_PRESET = 'hellobooks';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/sofiat/upload';

export function setBooks(books) { // eslint-disable-line require-jsdoc
    return {
        type: SET_BOOKS,
        books
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
            return data.books;
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

export function uploadBookCoverPhoto(data) { // eslint-disable-line require-jsdoc
    return dispatch => request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', data.coverPhotoPath);
}
