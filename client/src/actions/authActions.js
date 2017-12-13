import axios from 'axios';
import toastr from 'toastr';
import setAuthorizationToken from '../utils/setAuthorizationToken';

import {
  SET_CURRENT_USER,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_SIGNUP_FAILIURE,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS
} from './actionTypes';

/**
* @export
* @param {string} user
* @returns {user}  current user
*/
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * @export
 * @param {any} error 
 * @returns {error} login failure error
 */
export function setCurrentUserFails(error) {
  return {
    type: USER_LOGIN_FAILURE,
    error
  };
}

/**
 * @export
 * @param {any} message 
 * @returns {message} signup success message
 */
export function setNewUser(message) {
  return {
    type: USER_SIGNUP_SUCCESS,
    message
  };
}

/**
 * 
 * 
 * @export
 * @param {any} errors 
 * @returns {errors} signup error message
 */
export function setNewUserFails(errors) {
  return {
    type: USER_SIGNUP_FAILIURE,
    errors
  };
}

/**
 * @export
 * @param {any} message 
 * @returns {message} password change success message
 */
export function setPasswordChange(message) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    message
  };
}

/**
 * @export
 * @param {any} errors 
 * @returns {errors} password change failure errors
 */
export function setPasswordChangeFails(errors) {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    errors
  };
}

/**
 * @export
 * @param {any} message 
 * @returns {message} forgot password success message
 */
export function setforgotPassword(message) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    message
  };
}

/**
 * @export
 * @param {any} errors 
 * @returns {errors} forgot password failure message
 */
export function forgotPasswordFailure(errors) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    errors
  };
}

/**
 * @export
 * @param {any} message 
 * @returns {message} reset password success message
 */
export function resetPasswordSuccess(message) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    message
  };
}

/**
 * @export
 * @param {any} errors 
 * @returns {errors} reset password failure message
 */
export function resetPasswordFailure(errors) {
  return {
    type: RESET_PASSWORD_FAILURE,
    errors
  };
}

/**
 * @export
 * @param {any} history 
 * @returns {void}
 */
export function logout(history) {
  return dispatch => {
    localStorage.removeItem('x-access-token');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    history.push('/signin');
    toastr.warning('You have logged out successfully');
  };
}

/**
 * @export
 * @param {any} userData 
 * @param {any} history 
 * @returns {user} logged in user
 */
export function login(userData, history) {
  return (dispatch) => axios.post('/api/v1/users/signin', userData)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('x-access-token', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(response.data.payload));
      toastr.success("You are signed In");
      history.push('/books');
    })
    .catch((err) => {
      dispatch(setCurrentUserFails(err.response.data.message));
      toastr.warning(err.response.data.message);
    });
}

/**
 * @export
 * @param {any} userData 
 * @param {any} history 
 * @returns {user} newly created and logged in user
 */
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

/**
 * @export
 * @param {any} data 
 * @param {any} userId 
 * @returns {success} on password change
 */
export function changePassword(data, userId) {
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

/**
 * @export
 * @param {any} email 
 * @returns {email} to user on request for password change 
 */
export function forgotPassword(email) {
  return (dispatch) => axios.post(`/api/v1/forgotpassword`, email)
    .then((response) => {
      dispatch(setforgotPassword(response.data.message));
      toastr.success(response.data.message);
    })
    .catch((err) => {
      dispatch(forgotPasswordFailure(err.response.data));
      toastr.warning(err.response.data.message);
    });
}

/**
 * @export
 * @param {any} data 
 * @param {any} token 
 * @param {any} history 
 * @returns {newPassword} on password reset
 */
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
