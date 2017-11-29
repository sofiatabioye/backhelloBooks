import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER, SIGN_UP, CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILURE } from '../actions/actionTypes';

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

        case FORGOT_PASSWORD_SUCCESS:
            return { ...state,
                success: action.message
            };

        case FORGOT_PASSWORD_FAILURE:
            return { ...state,
                errors: action.errors
            };
        case RESET_PASSWORD_SUCCESS:
            return { ...state,
                success: action.message
            };

        case RESET_PASSWORD_FAILURE:
            return { ...state,
                errors: action.errors
            };

        case USER_SIGNUP_SUCCESS:
            return {
                loading: false,
                message: action.message
            };

        case USER_SIGNUP_FAILURE:
            return {
                loading: false,
                errors: action.errors
            };

        case CHANGE_PASSWORD_SUCCESS:
            return { ...state,
                loading: false,
                success: action.message
            };

        case CHANGE_PASSWORD_FAILURE:
            return { ...state,
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
