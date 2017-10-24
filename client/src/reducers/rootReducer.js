import { combineReducers } from 'redux';
import auth from './auth';
import flashMessages from './flashMessages';
import books from './books';
import categories from './categories';
import borrowedBooks from './borrowedBooks';

const rootReducer = combineReducers(
    { auth, flashMessages, books, categories, borrowedBooks }
);

export default rootReducer;
