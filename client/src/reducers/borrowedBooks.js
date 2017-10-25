import shortid from 'shortid';
import findIndex from 'lodash/findIndex';
import { FETCH_BORROWED_BOOKS_SUCCESS, FETCH_BORROWED_BOOKS_FAILURE } from '../actions/actionTypes';

export default (state = { borrowedBooks: [], loading: false, errors: [], success: [] }, action = {}) => {

    switch (action.type) {
        case 'RETURN_BOOK_SUCCESS':
            return {
                ...state.borrowedBooks,
                borrowedBooks: {
                    UserBorrowHistory: state.borrowedBooks.UserBorrowHistory.filter(book =>
                        book.book_id !== action.id)
                }
            };

        case 'RETURN_BOOK_FAILURE':
            return { ...state,
                loading: false,
                errors: action.errors
            };

        case FETCH_BORROWED_BOOKS_SUCCESS:
            return { ...state,
                loading: false,
                borrowedBooks: action.books
            };

        case FETCH_BORROWED_BOOKS_FAILURE:
            return { ...state,
                loading: false,
                borrowedBooks: action.books,
                errors: action.errors
            };

        case 'BORROW_HISTORY_SUCCESS':
            return { ...state,
                loading: false,
                borrowedBooks: action.books,
                errors: action.errors
            };

        case 'BORROW_HISTORY_FAILURE':
            return { ...state,
                loading: false,
                borrowedBooks: action.books,
                errors: action.errors
            };

            return state;
        default: return state;
    }
};
