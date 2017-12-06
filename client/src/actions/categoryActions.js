import axios from 'axios';
import toastr from 'toastr';
import {
  FETCH_CAT_SUCCESS,
  ADD_CATEGORY_BEGINS,
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_SUCCESS
} from './actionTypes';

/**
 * @export
 * @param {any} categories 
 * @returns {categories} all 
 */
export function setCategory(categories) {
  return {
    type: FETCH_CAT_SUCCESS,
    categories
  };
}

/**
 * @param {any} void
 * @export
 * @returns {void}
 */
export function addCategoryBegins() {
  return {
    type: ADD_CATEGORY_BEGINS
  };
}
/**
 * @export
 * @param {any} message
 * @param {any} category 
 * @returns {message } on create new category
 * @returns {category} newly created category
 */
export function addCategorySuccess(message, category) {
  return {
    type: ADD_CATEGORY_SUCCESS,
    message,
    category
  };
}

/**
 * 
 * @export
 * @param {any} errors 
 * @returns {errors } on book update
 */
export function addCategoryFailure(errors) {
  return {
    type: ADD_CATEGORY_FAILURE,
    errors
  };
}

/**
 * @export
 * @returns {categories} all categories
 */
export function getCategories() {
  return dispatch => axios.get(`/api/v1/categories?limit=1`)
    .then((response) => {
      const data = response.data;
      dispatch(setCategory(data));
    })
    .catch((errors) => errors);
}


/**
 * @export
 * @param {any} data 
 * @returns {category} newly created category
 * @returns {error} if delete unsuccessful
 */
export function saveCategory(data) {
  return (dispatch) => {
    dispatch(addCategoryBegins);
    return axios.post(`/api/v1/categories/create`, data)
      .then((response) => {
        dispatch(addCategorySuccess(response.data.message, response.data.category));
        toastr.success(response.data.message);
      })
      .catch((err) => {
        dispatch(addCategoryFailure(err.response));
      });
  };
}

/**
 * 
 * 
 * @export
 * @param {any} id 
 * @returns {books} remaining books after delete
 */
export function deleteCategory(id) {
  return (dispatch) => {
    dispatch({ type: 'DELETE_CATEGORY_BEGINS' });
    return axios.delete(`/api/v1/categories/${id}`)
      .then((response) => {
        dispatch({ type: 'DELETE_CATEGORY_SUCCESS', books: response.data });
        return response.data;
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_CATEGORY_FAILURE', errors: err.response.data });
        return err;
      });
  };
}
