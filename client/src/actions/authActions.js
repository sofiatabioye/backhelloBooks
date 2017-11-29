import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, USER_SIGNUP_SUCCESS, USER_LOGIN_FAILURE, USER_SIGNUP_FAILIURE,
    CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE
} from './actionTypes';
/* eslint-disable require-jsdoc */
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setCurrentUserFails(errors) {
    return {
        type: USER_LOGIN_FAILURE,
        errors
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

export function logout() {
    return dispatch => {
        localStorage.removeItem('x-access-token');
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
}
export function login(userData, history) {
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
            dispatch(setCurrentUserFails(err.response.data));
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
            dispatch(setNewUserFails(err.response.data));
            toastr.warning(err.response.data.message);
        });
}

export function changepassword(data, userId) {
    return (dispatch) => axios.post(`/api/v1/user/${userId}/changepassword`, data)
        .then((response) => {
            dispatch(setPasswordChange(response.data.message));
            console.log("im here");
            toastr.success(response.data.message);
        })
        .catch((err) => {
            dispatch(setPasswordChangeFails(err.response.data.message));
            console.log("im here", err.response.data);
            toastr.warning(err.response.data.message);
        });
}

export function forgotPassword(email) {
    return (dispatch) => axios.post(`/api/v1/forgotpassword`, email)
        .then((response) => {
            dispatch(setforgotPassword(response.data.message));
        })
        .catch((err) => {
            dispatch(forgotPasswordFailure(err.response));
        });
}

export default {};
