import { combineReducers } from 'redux';
import auth from './auth';
import flashMessages from './flashMessages';
import books from './books';
import book from './book';
import categories from './categories';
import borrowedBooks from './borrowedBooks';
import booksCategory from './booksCategory';

const rootReducer = combineReducers(
    { auth, flashMessages, books, categories, borrowedBooks, book, booksCategory }
);

export default rootReducer;
