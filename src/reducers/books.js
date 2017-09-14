import { SET_BOOKS, ADD_BOOK, GET_BOOK, UPDATE_BOOK } from '../actions/types';

export default (state = { books: [], loading: false }, action = {}) => {
    switch (action.type) {
        case 'FETCH_BOOKS_BEGINS':
            return Object.assign({}, state, { loading: true });
        case 'FETCH_BOOKS_SUCCESS':
            return Object.assign({}, state, { loading: false, books: action.books });
        case SET_BOOKS:
            return [...state, action.books];

        case ADD_BOOK:
            return [
                ...state,
                action.books
            ];
        case GET_BOOK:
            return [
                ...state,
                action.id
            ];

        case UPDATE_BOOK:
            return [
                ...state,
                action.id
            ];

        default: return state;
    }
};
