import shortid from 'shortid';
import findIndex from 'lodash/findIndex';
import { FETCH_BORROWED_BOOKS_SUCCESS, FETCH_BORROWED_BOOKS_FAILURE, BORROW_HISTORY_SUCCESS, BORROW_HISTORY_FAILURE, BORROW_HISTORY_BEGINS, RETURN_BOOK_BEGINS, RETURN_BOOK_SUCCESS, RETURN_BOOK_FAILURE } from '../actions/actionTypes';

export default (state = { borrowedBooks: [], pagination: [], loading: false, errors: [], success: [] }, action = {}) => {
    switch (action.type) {
        case RETURN_BOOK_BEGINS:
            return { ...state,
                loading: true
            };
        case RETURN_BOOK_SUCCESS:
            return {
                ...state.borrowedBooks,
                borrowedBooks: {
                    UserBorrowHistory: state.borrowedBooks.UserBorrowHistory.filter(book =>
                        book.book_id !== action.id)
                }
            };

        case RETURN_BOOK_FAILURE:
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
        case BORROW_HISTORY_BEGINS:
            return { ...state,
                loading: true
            };
        case BORROW_HISTORY_SUCCESS:
            return { ...state,
                loading: false,
                borrowedBooks: action.books,
                pagination: action.books.pagination,
                errors: action.errors
            };

        case BORROW_HISTORY_FAILURE:
            return { ...state,
                loading: false,
                borrowedBooks: action.books,
                errors: action.errors
            };

            return state;
        default: return state;
    }
};
