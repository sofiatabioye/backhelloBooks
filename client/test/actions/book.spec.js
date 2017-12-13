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
import { response, searchResponse, getBookResponse, signinResponseFailure, responseFailure } from '../mock/book';

const mockStore = configureMockStore([
  thunk
]);

const history = {
  push: jest.fn()
};

describe('# Get a book', () => {
  it('should create GET_BOOK action when a book has been gotten', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data: getBookResponse.books,
          pagination: getBookResponse.pagination
        },
      });
    });

    const expectedActions = [
      {
        type: 'SET_BOOKS',
        books: getBookResponse.books,
        pagination: getBookResponse.pagination,
      }
    ];

    const store = mockStore({ });
    return store.dispatch(getBookById({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
