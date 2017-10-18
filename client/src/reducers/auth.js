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

        case "FORGOT_PASSWORD_SUCCESS":
            return {
                message: action.message
            };

        case "FORGOT_PASSWORD_FAILURE":
            return {
                errors: action.errors
            };

        case 'USER_LOGIN_FAILURE':
            return {
                loading: false,
                errors: action.errors
            };

        case 'USER_SIGNUP_SUCCESS':
            return {
                loading: false,
                message: action.message
            };

        case 'USER_SIGNUP_FAILURE':
            return {
                loading: false,
                errors: action.errors
            };

        case 'CHANGE_PASSWORD_SUCCESS':
            return {
                loading: false,
                success: action.message
            };

        case 'CHANGE_PASSWORD_FAILURE':
            return {
                loading: false,
                errors: action.errors
            };

        case SIGN_UP:
            return [...state,
                {
                    loading: false,
                    user: action.user
                }];

        default: return state;
    }
};
