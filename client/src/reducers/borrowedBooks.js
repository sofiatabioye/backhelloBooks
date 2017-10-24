import shortid from 'shortid';
import findIndex from 'lodash/findIndex';
import { FETCH_BORROWED_BOOKS_SUCCESS, FETCH_BORROWED_BOOKS_FAILURE } from '../actions/actionTypes';

export default (state = { borrowedBooks: [], loading: false, errors: [], success: [] }, action = {}) => {
    const index = findIndex(state, { id: action.id });
    switch (action.type) {
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
        // case DELETE_FLASH_MESSAGE:
        //     if (index >= 0) {
        //         return [
        //             ...state.slice(0, index),
        //             ...state.slice(index + 1),
        //         ];
        //     }
            return state;
        default: return state;
    }
};
