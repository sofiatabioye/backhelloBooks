import axios from 'axios';
import { SET_CATEGORY } from './types';

export function setCategory(categories) { // eslint-disable-line require-jsdoc
    return {
        type: "FETCH_CAT_SUCCESS",
        categories
    };
}

export function getCategories() { // eslint-disable-line require-jsdoc
    return dispatch => axios.get(`/api/v1/categories`)
        .then((response) => {
            console.log(response);
            const data = response.data;
            dispatch(setCategory(data));
        },
        (errors) => errors
        );
}

export function saveCategory(data) { // eslint-disable-line require-jsdoc
    return dispatch => axios.post(`/api/v1/categories/create`, data);
}

export function deleteCategory(id) { // eslint-disable-line require-jsdoc
    return dispatch => axios.delete(`/api/v1/categories/${id}`);
}
