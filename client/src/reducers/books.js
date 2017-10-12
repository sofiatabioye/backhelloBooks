import { SET_BOOKS, ADD_BOOK, GET_BOOK, UPDATE_BOOK } from '../actions/types';

export default (state = { loading: false, message: "", errors: [] }, action = {}) => {
    switch (action.type) {
        case 'FETCH_BOOKS_BEGINS':
            return Object.assign({}, state, { loading: true });
        case 'FETCH_BOOKS_SUCCESS':
            return Object.assign({}, state, { loading: false, books: action.books });
        case 'BORROW_BOOK_BEGINS':
            return Object.assign({}, state, { loading: true });
        case 'BORROW_BOOK_SUCCESS':
            return Object.assign({}, state, { loading: false, books: action.books, message: action.message });
        case 'BORROW_BOOK_FAILURE':
            return Object.assign({}, state, { loading: false, books: action.books, errors: action.errors });
        case 'BOOKS_CATEGORY_SUCCESS':
            return Object.assign({}, state, { loading: false, books: action.books });
        case 'FETCH_BORROWED_BOOKS_SUCCESS':
            return Object.assign({}, state, { loading: false, books: action.books });
        case 'FETCH_BORROWED_BOOKS_FAILURE':
            return Object.assign({}, state, { loading: false, books: action.books, errors: action.errors });
        case 'RETURN_BOOK_SUCCESS':
            const borrowedBooks = state.books.UserBorrowHistory.filter(book => {
                if (book.book_id !== action.id) return book;
            });
            return Object.assign({}, state.books, { books: { UserBorrowHistory: borrowedBooks } });

        case 'RETURN_BOOK_FAILURE':
            return Object.assign({}, state, { loading: false, books: action.books, errors: action.errors });
        case 'BORROW_HISTORY_SUCCESS':
            return Object.assign({}, state, { loading: false, books: action.books, errors: action.errors });
        case 'BORROW_HISTORY_FAILURE':
            return Object.assign({}, state, { loading: false, books: action.books, errors: action.errors });

        case SET_BOOKS:
            return {
                loading: false,
                books: action.books.books,
                pagination: action.books.pagination
            };

        case "DELETE_BOOK_SUCCESS":
            console.log(action.id);
            const allbooks = state.books.filter((book) => {
                if (book.id !== action.id) { console.log(book.book_id, action.id); }
                return book;
            });
            return [...state,
                {
                    loading: false,
                    books: allbooks,
                    pagination: state.books.pagination
                }
            ];
        // case SET_BOOKS:
        //     return Object.assign({}, state, { loading: false, books: action.books.books, pagination: action.books.pagination });

        case ADD_BOOK:
            return Object.assign({}, state, { loading: false, books: action.books });

        case GET_BOOK:
            return Object.assign({}, state, { loading: false, id: action.id });

        case UPDATE_BOOK:
            return Object.assign({}, state, { loading: false, id: action.id });

        default: return state;
    }
};
