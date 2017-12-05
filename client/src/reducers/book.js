import { GET_BOOK, GET_BOOK_FAILURE } from '../actions/actionTypes';

export default (state = { loading: false, message: "", errors: [] }, action = {}, book = []) => {
  switch (action.type) {
  case GET_BOOK:
    return { ...state,
      loading: false,
      book: action.book
    };

  case GET_BOOK_FAILURE:
    return { ...state,
      loading: false,
      errors: action.errors
    };

  default: return state;
  }
};
