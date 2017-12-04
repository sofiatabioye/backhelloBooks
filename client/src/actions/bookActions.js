import axios from 'axios';
import toastr from 'toastr';
import {
  SET_BOOKS,
  SAVE_BOOK_BEGINS,
  SAVE_BOOK_SUCCESS,
  SAVE_BOOK_FAILURE,
  GET_BOOK, BOOKS_CATEGORY_SUCCESS,
  UPDATE_BOOK_BEGINS,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
  BORROW_BOOK_BEGINS,
  BORROW_BOOK_SUCCESS,
  BORROW_BOOK_FAILURE,
  FETCH_BORROWED_BOOKS_BEGINS,
  FETCH_BORROWED_BOOKS_SUCCESS,
  FETCH_BORROWED_BOOKS_FAILURE,
  BORROW_HISTORY_BEGINS,
  BORROW_HISTORY_SUCCESS,
  BORROW_HISTORY_FAILURE,
  DELETE_BOOK_BEGINS,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  GET_BOOK_FAILURE,
  RETURN_BOOK_BEGINS,
  RETURN_BOOK_SUCCESS,
  RETURN_BOOK_FAILURE
} from './actionTypes';

/**
 * @export
 * @param {any} books 
 * @returns {books} all books
 */
export function setBooks(books) {
  return {
    type: SET_BOOKS,
    books,
  };
}

/**
 * @export
 * @param {any} book 
 * @returns {void}
 */
export function addBookBegins() {
  return {
    type: SAVE_BOOK_BEGINS,
  };
}

/**
 * @export
 * @param {any} message 
 * @param {any} book
 * @returns {book} newly created book
 * @returns {message} success message
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
 * @returns {errors} when create book fails
 */
export function addBookFails(errors) {
  return {
    type: SAVE_BOOK_FAILURE,
    errors
  };
}

/**
 * @export
 * @param {any} book
 * @returns {book} single book
 */
export function getBook(book) {
  return {
    type: GET_BOOK,
    book
  };
}

/**
 * @export
 * @param {any} errors 
 * @returns {errors} getting single book
 */
export function getBookFails(errors) {
  return {
    type: GET_BOOK_FAILURE,
    errors
  };
}


/**
 * @param {any} void
 * @export
 * @returns {void}
 */
export function updateBookBegins() {
  return {
    type: UPDATE_BOOK_BEGINS
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
 * @param {any} books
 * @export
 * @returns {books} borrowed books
 */
export function getBorrowedBooksSuccess(books) {
  return {
    type: FETCH_BORROWED_BOOKS_SUCCESS,
    books
  };
}

/**
 * @param {any} errors
 * @export
 * @returns {errors} getting borrowed books
 */
export function getBorrowedBooksFailure(errors) {
  return {
    type: FETCH_BORROWED_BOOKS_FAILURE,
    errors
  };
}

/**
 * @param {any} void
 * @export
 * @returns {void}
 */
export function setBorrowHistoryBegin() {
  return {
    type: BORROW_HISTORY_BEGINS
  };
}

/**
 * @param {any} books
 * @export
 * @returns {books} getting borrow history
 */
export function setBorrowHistory(books) {
  return {
    type: BORROW_HISTORY_SUCCESS,
    books
  };
}

/**
 * @param {any} errors
 * @export
 * @returns {errors} fetching borrow history
 */
export function setBorrowHistoryFailure(errors) {
  return {
    type: BORROW_HISTORY_FAILURE,
    errors
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
 * @param {any} message
 * @export
 * @returns {message} on successful book borrow
 */
export function borrowBookSuccess(message) {
  return {
    type: BORROW_BOOK_SUCCESS,
    message
  };
}

/**
 * @param {any} errors
 * @export
 * @returns {errors} on borrow book
 */
export function borrowBookFailure(errors) {
  return {
    type: BORROW_BOOK_FAILURE,
    errors
  };
}

/**
 * @param {any} void
 * @export
 * @returns {void}
 */
export function returnBookBegins() {
  return {
    type: RETURN_BOOK_BEGINS
  };
}

/**
 * @param {any} id
 * @export
 * @returns {id} of book returned
 */
export function returnBookSuccess(id) {
  return {
    type: RETURN_BOOK_SUCCESS,
    id
  };
}

/**
 * @param {any} errors
 * @export
 * @returns {errors} on book return
 */
export function returnBookFailure(errors) {
  return {
    type: RETURN_BOOK_FAILURE,
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
 * @param {any} void
 * @export
 * @returns {void}
 */
export function deleteBookBegins() {
  return {
    type: DELETE_BOOK_BEGINS
  };
}

/**
 * @param {any} id
 * @export
 * @returns {id} of book deleted
 */
export function deleteBookSuccess(id) {
  return {
    type: DELETE_BOOK_SUCCESS,
    id
  };
}

/**
 * @param {any} errors
 * @export
 * @returns {errors} on book delete
 */
export function deleteBookFailure(errors) {
  return {
    type: DELETE_BOOK_FAILURE,
    errors
  };
}

/**
 * @export
 * @param {any} categoryBooks
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
 * @param {any} offset
 * @param {any} limit
 * @returns {books} all books
 */
export function getBooks(offset, limit) {
  return (dispatch) => axios.get(`/api/v1/books?offset=${offset}&limit=${limit}`)
    .then((response) => {
      dispatch(setBooks(response.data));
    })
    .catch((error) =>
      error
    );
}

/**
 * @export
 * @param {any} searchTerm 
 * @param {any} category 
 * @param {any} offset 
 * @param {any} limit 
 * @returns {books} by search term
 */
export function searchBook(searchTerm, category, offset, limit) {
  return (dispatch) =>
    axios.get(`/api/v1/searchbooks?searchTerm=${searchTerm}&catgegory=${category}&offset=${offset}&limit=${limit}`)
      .then((response) => {
        if (category !== null) {
          dispatch(getBooksByCategory(response.data.booksFound));
        }
        dispatch(setBooks(response.data.booksFound));
      })
      .catch((error) => {
        toastr.warning(error.response.data.message);
      });
}

/**
 * @export
 * @param {any} bookId
 * @returns {book} by Id
 */
export function getBookById(bookId) {
  return (dispatch) => axios.get(`/api/v1/books/${bookId}`)
    .then((response) => {
      dispatch(getBook(response.data));
    })
    .catch((error) => {
      dispatch(getBookFails(error.response));
    });
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
 * @param {any} id 
 * @param {any} bookData 
 * @returns {book} updated book
 */
export function updateBook(id, bookData) {
  return (dispatch) => {
    dispatch(updateBookBegins);
    return axios.put(`/api/v1/books/${id}`, bookData)
      .then((response) => {
        const book = response.data.books;
        const message = response.data.message;
        dispatch(updateBookSuccess(book, message));
        toastr.success("Book Updated Successfully");
      })
      .catch((err) => {
        const errors = err.response.data;
        dispatch(updateBookFailure(errors));
        toastr.warning("Error Updating Book");
      });
  };
}

/**
 * @export
 * @param {any} data
 * @param {any} history
 * @returns {book} newly created book
 */
export function saveBooks(data, history) {
  return (dispatch) => {
    dispatch(addBookBegins());
    return axios.post(`/api/v1/books/create`, data)
      .then((response) => {
        dispatch(addBook(response.data.book, response.data.message));
        toastr.success(response.data.message);
      })
      .catch((err) => {
        dispatch(addBookFails(err.response));
        toastr.warning(err.response);
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
 * @returns {message} on successful book borrow
 */
export function borrowBook(userId, bookId, history) {
  return (dispatch) => {
    dispatch(borrowBookBegins());
    return axios.post(`/api/v1/users/${userId}/books/${bookId}/borrow`)
      .then((response) => {
        dispatch(borrowBookSuccess(response.data.message));
        toastr.success(response.data.message);
      })
      .catch((err) => {
        dispatch(borrowBookFailure(err.response.data));
        toastr.warning(err.response.data.message);
      });
  };
}

/**
 * @export
 * @param {any} userId 
 * @param {any} bookId 
 * @returns {id} of book returned
 */
export function returnBook(userId, bookId) {
  return (dispatch) => {
    dispatch(returnBookBegins());
    return axios.put(`/api/v1/users/${userId}/books/${bookId}/return`)
      .then((response) => {
        dispatch(returnBookSuccess(bookId));
        toastr.success(response.data.message);
      })
      .catch((err) => {
        dispatch(returnBookFailure(err.response));
        toastr.warning(err.response);
      });
  };
}


/**
 * @export
 * @param {any} userId 
 * @returns {books}  borrowed by user but not returned
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
 * @export
 * @param {any} offset
 * @param {any} limit
 * @param {any} userId
 * @returns {books} all books ever borrowed by user
 */
export function fetchBorrowHistory(offset, limit, userId) {
  return (dispatch) => {
    dispatch(setBorrowHistoryBegin());
    return axios.get(`/api/v1/users/${userId}/history?offset=${offset}&limit=${limit}`)
      .then((response) => {
        dispatch(setBorrowHistory(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setBorrowHistoryFailure(err.response));
        toastr.warning(err.response);
      });
  };
}

/**
 * @export
 * @param {any} bookId
 * @param {any} history
 * @returns {id} of deleted book  
 */
export function deleteBook(bookId, history) {
  return (dispatch) => {
    dispatch(deleteBookBegins());
    return axios.delete(`/api/v1/books/${bookId}`)
      .then((response) => {
        dispatch(deleteBookSuccess(bookId));
        toastr.success("Book deleted successfully");
        history.push('/books');
      })
      .catch((err) => {
        dispatch(deleteBookFailure(err.response));
        toastr.warning(err.response);
      });
  };
}

