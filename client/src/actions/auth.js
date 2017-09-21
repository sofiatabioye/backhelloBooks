import axios from 'axios';
import jwt from 'jsonwebtoken';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER } from './types';
/* eslint-disable require-jsdoc */
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
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
            history.push('/books');
        },
        (err) => {
            dispatch({ type: 'USER_LOGIN_FAILURE', errors: err.response.data });
        }
        
        );
}

export function signup(userData) {
    return (dispatch) => axios.post('/api/v1/users/signup', userData)
        .then((response) => {
            console.log(response);
        },
        (errors) => console.log(errors)
        );
}

export default {};
