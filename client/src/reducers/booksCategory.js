import { BOOKS_CATEGORY_SUCCESS } from '../actions/actionTypes';

export default (state = { booksCategory: [], loading: false, errors: [], success: [] }, action = {}) => {
  switch (action.type) {
  case BOOKS_CATEGORY_SUCCESS:
    return {
      ...state,
      loading: false,
      booksCategory: action.categoryBooks.books
    };

    return state;
  default: return state;
  }
};
