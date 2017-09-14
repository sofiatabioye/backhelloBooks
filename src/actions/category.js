import axios from 'axios';
import { SET_CATEGORY } from './types';

export function setCategory(categories) {
    // eslint-disable-line require-jsdoc
    return {
        type: SET_CATEGORY,
        categories
    };
}
// eslint-disable-line require-jsdoc
export function getCategories() {
    return dispatch => axios.get(`/api/v1/categories`);

}
