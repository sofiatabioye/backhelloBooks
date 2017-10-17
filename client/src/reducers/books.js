import { SET_BOOKS, ADD_BOOK, GET_BOOK, UPDATE_BOOK } from '../actions/types';

export default (state = { loading: false, message: "", errors: [] }, action = {}) => {
    switch (action.type) {
        case 'FETCH_BOOKS_BEGINS':
            return [...state,
                {
                    loading: true
                }];

        case 'FETCH_BOOKS_SUCCESS':
            return {
                loading: false,
                books: action.books
            };

        case 'BORROW_BOOK_BEGINS':
            return [...state,
                {
                    loading: true
                }];

        case 'BORROW_BOOK_SUCCESS':
            return [...state,
                {
                    loading: false,
                    books: action.books,
                    message: action.message
                }];

        case 'BORROW_BOOK_FAILURE':
            return [...state,
                {
                    loading: false,
                    books: action.books,
                    errors: action.errors
                }];

        case 'BOOKS_CATEGORY_SUCCESS':
            return {
                loading: false,
                books: action.books
            };

        case 'RETURN_BOOK_SUCCESS':
            const borrowedBooks = state.books.UserBorrowHistory.filter(book => {
                if (book.book_id !== action.id) return book;
            });
            return [...state.books,
                {
                    books:
                    {
                        UserBorrowHistory: borrowedBooks
                    }
                }
            ];

        case 'RETURN_BOOK_FAILURE':
            return [...state,
                {
                    loading: false,
                    books: action.books,
                    errors: action.errors
                }];

        case 'BORROW_HISTORY_SUCCESS':
            return {
                loading: false,
                books: action.books,
                errors: action.errors
            };

        case 'BORROW_HISTORY_FAILURE':
            return [...state,
                {
                    loading: false,
                    books: action.books,
                    errors: action.errors
                }];

        case SET_BOOKS:
            return {
                loading: false,
                books: action.books.books,
                pagination: action.books.pagination
            };

        case "FETCH_BORROWED_BOOKS_SUCCESS":
            return {
                loading: false,
                books: action.books,
                pagination: action.books.pagination
            };

        case "FETCH_BORROWED_BOOKS_FAILURE":
            return [...state,
                {
                    loading: false,
                    books: action.books,
                    errors: action.errors
                }];

        case "DELETE_BOOK_SUCCESS":
            const allbooks = state.books.filter((book) => {
                if (book.id !== action.id) { return book; }
            });
            return [...state.books,
                {
                    loading: false,
                    books: allbooks,
                    pagination: state.books.pagination
                }];

        case ADD_BOOK:
            return [...state,
                {
                    loading: false,
                    books: action.books
                }];

        case GET_BOOK:
            return [...state,
                {
                    loading: false,
                    id: action.id
                }];

        case UPDATE_BOOK:
            return [...state,
                {
                    loading: false,
                    id: action.id
                }];

        default: return state;
    }
};
