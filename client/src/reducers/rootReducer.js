import { combineReducers } from 'redux';
import auth from './auth';
import flashMessages from './flashMessages';
import books from './books';
import categories from './categories';

const rootReducer = combineReducers(
    { auth, flashMessages, books, categories }
);

export default rootReducer;
