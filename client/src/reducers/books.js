import { SET_BOOKS, ADD_BOOK, UPDATE_BOOK, BORROW_BOOK_BEGINS, BORROW_BOOK_SUCCESS, BORROW_BOOK_FAILURE, SAVE_BOOK_BEGINS, SAVE_BOOK_SUCCESS, SAVE_BOOK_FAILURE, DELETE_BOOK_SUCCESS, DELETE_BOOK_FAILURE, DELETE_BOOK_BEGINS } from '../actions/actionTypes';

export default (state = { loading: false, message: "", errors: [], pagination: {} }, action = {}, books = []) => {
    switch (action.type) {
        case BORROW_BOOK_BEGINS:
            return { ...state,
                loading: true
            };

        case BORROW_BOOK_SUCCESS:
            return { ...state,
                message: action.message
            };

        case BORROW_BOOK_FAILURE:
            return { ...state,
                loading: false,
                errors: action.errors
            };

        case SET_BOOKS:
            return { ...state,
                loading: false,
                books: action.books.books,
                pagination: action.books.pagination
            };
        case DELETE_BOOK_BEGINS:
            return { ...state,
                loading: true
            };

        case DELETE_BOOK_SUCCESS:
            return {
                ...state,
                loading: true
            };
        case DELETE_BOOK_FAILURE:
            return { ...state,
                loading: false,
                errors: action.errors
            };

        case SAVE_BOOK_BEGINS:
            return { ...state,
                loading: true
            };

        case SAVE_BOOK_SUCCESS:
            return { ...state,
                loading: false,
                books: action.books
            };

        case SAVE_BOOK_FAILURE:
            return { ...state,
                loading: false,
                errors: action.errors
            };

        case UPDATE_BOOK:
            return [...state,
                {
                    loading: false,
                    id: action.id
                }];

        default: return state;
    }
};
