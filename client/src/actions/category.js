import axios from 'axios';
import { SET_CATEGORY } from './types';

/**
 * @export
 * @param {any} categories 
 * @returns 
 */
export function setCategory(categories) {
    return {
        type: "FETCH_CAT_SUCCESS",
        categories
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
    return (dispatch) => {
        dispatch({ type: 'ADD_CATEGORY' });
        return axios.post(`/api/v1/categories/create`, data)
            .then((response) => {
                dispatch({ type: 'ADD_CATEGORY_SUCCESS', categories: response.data });
                return response.data;
            }, (err) => {
                dispatch({ type: 'ADD_CATEGORY_FAILURE', errors: err.response.data });
                return err;
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
