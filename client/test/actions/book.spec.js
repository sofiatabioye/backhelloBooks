import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { searchBook,
  getBookById,
  getBooksByCat,
  updateBook,
  saveBooks,
  borrowBook,
  returnBook,
  fetchBorrowedBooks,
  fetchBorrowHistory,
  deleteBook
} from '../../src/actions/bookActions';
import { response, signupResponseFailure, signinResponseFailure, changePasswordResponse, passwordResponseFailure, forgotPasswordResponse } from '../mock/book';
