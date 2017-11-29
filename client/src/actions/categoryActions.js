import axios from 'axios';
import toastr from 'toastr';
import { SET_CATEGORY, FETCH_CAT_SUCCESS, ADD_CATEGORY_BEGINS, ADD_CATEGORY_FAILURE, ADD_CATEGORY_SUCCESS } from './actionTypes';

/**
 * @export
 * @param {any} categories 
 * @returns 
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
 * 
 * @export
 * @param {any} errors 
 * @returns {errors } on book update
 */
export function addCategorySuccess(message, categories) {
    return {
        type: ADD_CATEGORY_SUCCESS,
        message,
        categories
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
 * @param {any} get categories 
 * @export
 * @returns 
 */
export function getCategories() {
    return dispatch => axios.get(`/api/v1/categories?limit=1`)
        .then((response) => {
            const data = response.data;
            dispatch(setCategory(data));
        },
        (errors) => errors
        );
}


/**
 * @export
 * @param {any} data 
 * @returns 
 */
export function saveCategory(data) {
    console.log(data, "+++++++");
    return (dispatch) => {
        dispatch(addCategoryBegins);
        return axios.post(`/api/v1/categories/create`, data)
            .then((response) => {
                dispatch(addCategorySuccess(response.data.message, response.data.categories));
                toastr.success(response.data.message);
            })
            .catch((err) => {
                dispatch(addCategoryFailure(err.response));
                console.log(err);
            });
    };
}

/**
 * 
 * 
 * @export
 * @param {any} id 
 * @returns 
 */
export function deleteCategory(id) {
    return (dispatch) => {
        dispatch({ type: 'DELETE_CATEGORY_BEGINS' });
        return axios.delete(`/api/v1/categories/${id}`)
            .then((response) => {
                dispatch({ type: 'DELETE_CATEGORY_SUCCESS', books: response.data });
                return response.data;
            }, (err) => {
                dispatch({ type: 'DELETE_CATEGORY_FAILURE', errors: err.response.data });
                return err;
            });
    };
}
