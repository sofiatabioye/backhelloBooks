import axios from 'axios';
import { SET_CATEGORY } from './types';

export function setCategory(categories) { // eslint-disable-line require-jsdoc
    return {
        type: "FETCH_CAT_SUCCESS",
        categories
    };
}

export function getCategories() { // eslint-disable-line require-jsdoc
    return dispatch => axios.get(`/api/v1/categories?limit=1`)
        .then((response) => {
            const data = response.data;
            dispatch(setCategory(data));
        },
        (errors) => errors
        );
}

export function saveCategory(data) { // eslint-disable-line require-jsdoc
    return (dispatch) => {
        dispatch({ type: 'ADD_CATEGORY' });
        return axios.post(`/api/v1/categories/create`, data)
            .then((response) => {
                dispatch({ type: 'ADD_CATEGORY_SUCCESS', categories: response.data });
                console.log(response.data);
                return response.data;
            }, (err) => {
                dispatch({ type: 'ADD_CATEGORY_FAILURE', errors: err.response.data });
                return err;
            });
    };
}

export function deleteCategory(id) { // eslint-disable-line require-jsdoc
    return dispatch => axios.delete(`/api/v1/categories/${id}`);
}
