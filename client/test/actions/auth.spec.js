import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';


import { 
  signup,
  login,
  logout,
  changePassword,
  forgotPassword,
  resetPassword
} from '../../src/actions/authActions';
import { response, signupResponseFailure, signupResponse, signinResponseFailure, changePasswordResponse, passwordResponseFailure, forgotPasswordResponse } from '../mock/user';

const mockStore = configureMockStore([
  thunk
]);

const history = {
  push: jest.fn()
};

describe('# Auth', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('# Signup', () => {
    it('creates SET_CURRENT_USER when signup action is successful', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: signupResponse,
        });
      });

      const expectedActions = [
        {
          type: 'USER_SIGNUP_SUCCESS',
          message: 'Sign up was successful'
        }
      ];

      const store = mockStore({ });
      return store.dispatch(signup({}, history))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });


    it('should not create a user when signup action fails', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: signupResponseFailure,
        });
      });

      const expectedActions = [
        {
          type: 'USER_SIGNUP_FAILIURE',
          errors: 'errors'
        }
      ];

      const store = mockStore({});
      return store.dispatch(signup({}, history)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('# Signin', () => {
    it('should create SET_CURRENT_USER when signin action is successful', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        });
      });

      const expectedActions = [
        { type: 'SET_CURRENT_USER', user: response.payload }
      ];

      const store = mockStore({ });
      return store.dispatch(login({}, history))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should not log a user in when signin action fails', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: signinResponseFailure,
        });
      });

      const expectedActions = [
        {
          type: 'USER_LOGIN_FAILURE',
          error: 'error'
        }
      ];

      const store = mockStore({ });
      return store.dispatch(login({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('# Logout', () => {
    it('should log a user out and set current user to empty', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        });
      });

      const expectedActions = [
        { type: 'SET_CURRENT_USER', user: {} }
      ];

      const store = mockStore({ });
      store.dispatch(logout(history));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  describe('# Change Password', () => {
    it('should change a users password upon request ', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: changePasswordResponse,
        });
      });

      const expectedActions = [
        { type: 'CHANGE_PASSWORD_SUCCESS',
          message: 'Password Changed Successfully'
        }
      ];

      const store = mockStore({ });
      store.dispatch(changePassword({}));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });

    it('should not change password if action fails', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: passwordResponseFailure,
        });
      });

      const expectedActions = [
        {
          type: 'CHANGE_PASSWORD_FAILIURE',
          errors: 'errors'
        }
      ];

      const store = mockStore({});
      return store.dispatch(changePassword({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('# Forgot Password', () => {
    it('sends an reset password email to user on supplying email', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: forgotPasswordResponse,
        });
      });

      const expectedActions = [
        {
          type: 'FORGOT_PASSWORD_SUCCESS',
          message: 'Password reset email sent successfully'
        }
      ];

      const store = mockStore({ });
      return store.dispatch(forgotPassword({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });


    it('should not send email if forgot password action fails', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: passwordResponseFailure,
        });
      });

      const expectedActions = [
        {
          type: 'FORGOT_PASSWORD_FAILURE',
          errors: {
            errors: 'error'
          }
        }
      ];
      const store = mockStore({});
      return store.dispatch(forgotPassword({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

});

