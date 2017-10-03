import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, SIGN_UP } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = { user: [], loading: false, errors: [], success: [] }, action = {}) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        case 'USER_LOGIN_FAILURE':
            return Object.assign({}, state, { loading: false, errors: action.errors });
        case 'USER_SIGNUP_SUCCESS':
            return Object.assign({}, state, { loading: false, message: action.message });
        case 'USER_SIGNUP_FAILURE':
            return Object.assign({}, state, { loading: false, errors: action.errors });
        case 'CHANGE_PASSWORD_SUCCESS':
            return Object.assign({}, state, { loading: false, success: action.message });
        case 'CHANGE_PASSWORD_FAILURE':
            return Object.assign({}, state, { loading: false, errors: action.errors });
        case SIGN_UP:
            return Object.assign({}, state, { loading: false, user: action.user });

        default: return state;
    }
};
