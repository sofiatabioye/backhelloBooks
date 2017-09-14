import { combineReducers } from 'redux';
import auth from './auth';
import flashMessages from './flashMessages';
import books from './books';

const rootReducer = combineReducers(
    { auth, flashMessages, books, }
);

export default rootReducer;
