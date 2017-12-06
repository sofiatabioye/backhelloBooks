import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';


import { login, logout, signup, setCurrentUser } from '../../src/actions/authActions';
// import { setCurrentUser } from 'actions/signupActions';

const mockStore = configureMockStore([
  thunk
]);

xdescribe('# Auth', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  xdescribe('User Login', () => {
    xit('creates SET_CURRENT_USER when signup action is successful', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: setCurrentUser,
        });
      });

      const expectedActions = [
        {
          type: 'SET_CURRENT_USER'
        },
        { type: 'SET_CURRENT_USER', user: setCurrentUser }
      ];

      const store = mockStore({ });
      return store.dispatch(setCurrentUser({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  //   it('should not create a user when signup action fails', () => {
  //     moxios.wait(() => {
  //       const request = moxios.requests.mostRecent();
  //       request.respondWith({
  //         status: 400,
  //         response: signupResponseFailure,
  //       });
  //     });

  //     const expectedActions = [
  //       {
  //         type: 'ADD_FLASH_MESSAGE',
  //         message: {
  //           text: ['The name field is required'],
  //           type: 'error'
  //         }
  //       }
  //     ];

  //     const store = mockStore({});
  //     return store.dispatch(userSignupRequestAction({})).then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  //   });
  // });

  // describe('# Signin', () => {
  //   it('should create SET_CURRENT_USER when signin action is successful', () => {
  //     moxios.wait(() => {
  //       const request = moxios.requests.mostRecent();
  //       request.respondWith({
  //         status: 200,
  //         response: response,
  //       });
  //     });

  //     const expectedActions = [
  //       { type: 'SET_CURRENT_USER', user: response.payload }
  //     ];

  //     const store = mockStore({ });
  //     return store.dispatch(login({}))
  //       .then(() => {
  //         expect(store.getActions()).toEqual(expectedActions);
  //       });
  //   });

  //   it('should not log a user in when signin action fails', () => {
  //     moxios.wait(() => {
  //       const request = moxios.requests.mostRecent();
  //       request.respondWith({
  //         status: 400,
  //         response: signinResponseFailure,
  //       });
  //     });

  //     const expectedActions = [
  //       {
  //         type: 'ADD_FLASH_MESSAGE',
  //         message: {
  //           text: ['Sorry, we can\'t find this account'],
  //           type: 'error'
  //         },
  //       }
  //     ];

  //     const store = mockStore({ });
  //     return store.dispatch(login({}))
  //       .then(() => {
  //         expect(store.getActions()).toEqual(expectedActions);
  //       });
  //   });
  // });

  // describe('# Logout', () => {
  //   it('should log a user out when the logout action is dispatched', (done) => {
  //     moxios.wait(() => {
  //       const request = moxios.requests.mostRecent();
  //       request.respondWith({
  //         status: 200,
  //         response: response,
  //       });
  //     });

  //     const expectedActions = [
  //       { type: 'SET_CURRENT_USER', user: {} }
  //     ];

  //     const store = mockStore({ });
  //     store.dispatch(logout());
  //     expect(store.getActions()).toEqual(expectedActions);
  //     done();
  //   });
  });
});
