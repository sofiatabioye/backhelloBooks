import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, USER_SIGNUP_SUCCESS, USER_LOGIN_FAILURE, USER_SIGNUP_FAILIURE,
    CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_FAILURE,
    RESET_PASSWORD_SUCCESS
} from './actionTypes';
/* eslint-disable require-jsdoc */
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setCurrentUserFails(error) {
    return {
        type: USER_LOGIN_FAILURE,
        error
    };
}

export function setNewUser(message) {
    return {
        type: USER_SIGNUP_SUCCESS,
        message
    };
}

export function setNewUserFails(errors) {
    return {
        type: USER_SIGNUP_FAILIURE,
        errors
    };
}

export function setPasswordChange(message) {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        message
    };
}

export function setPasswordChangeFails(errors) {
    return {
        type: CHANGE_PASSWORD_FAILURE,
        errors
    };
}

export function setforgotPassword(message) {
    return {
        type: FORGOT_PASSWORD_SUCCESS,
        message
    };
}

export function forgotPasswordFailure(errors) {
    return {
        type: FORGOT_PASSWORD_FAILURE,
        errors
    };
}

export function resetPasswordFailure(errors) {
    return {
        type: RESET_PASSWORD_FAILURE,
        errors
    };
}

export function resetPasswordSuccess(message) {
    return {
        type: RESET_PASSWORD_SUCCESS,
        message
    };
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('x-access-token');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
}
export function login(userData, history) {
    console.log(userData);
    return (dispatch) => axios.post('/api/v1/users/signin', userData)
        .then((response) => {
            const token = response.data.token;
            localStorage.setItem('x-access-token', token);
            setAuthorizationToken(token);
            dispatch(setCurrentUser(jwt.decode(token)));
            toastr.success("You are signed In");
            history.push('/books');
        })
        .catch((err) => {
            dispatch(setCurrentUserFails(err.response.data.message));
            toastr.warning(err.response.data.message);
        });
}

export function signup(userData, history) {
    return (dispatch) => axios.post('/api/v1/users/signup', userData)
        .then((response) => {
            dispatch(setNewUser(response.data.message));
            toastr.success("Sign up was successful");
            history.push('/books');
        })
        .catch((err) => {
            dispatch(setNewUserFails(err.response.data.message));
            toastr.warning(err.response.data.message);
        });
}

export function changepassword(data, userId) {
    return (dispatch) => axios.post(`/api/v1/user/${userId}/changepassword`, data)
        .then((response) => {
            dispatch(setPasswordChange(response.data.message));
            toastr.success(response.data.message);
        })
        .catch((err) => {
            dispatch(setPasswordChangeFails(err.response.data.message));
            toastr.warning(err.response.data.message);
        });
}

export function forgotPassword(email) {
    return (dispatch) => axios.post(`/api/v1/forgotpassword`, email)
        .then((response) => {
            dispatch(setforgotPassword(response.data.message));
            toastr.success(response.data.message);
        })
        .catch((err) => {
            dispatch(forgotPasswordFailure(err.response));
            toastr.warning(err.response.data.message);
        });
}

export function resetPassword(data, token, history) {
    return (dispatch) => axios.post(`/api/v1/reset/${token}`, data)
        .then((response) => {
            dispatch(resetPasswordSuccess(response.data.message));
            toastr.success(response.data.message);
            history.push('/signin');
        })
        .catch((err) => {
            dispatch(resetPasswordFailure(err.response.data.error));
            toastr.warning(err.response.data.error);
        });
}

export default {};
