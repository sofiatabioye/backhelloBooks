import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import store from './store/store';
import './assets/css/main.css';
import App from './App';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/authActions';


if (localStorage['x-access-token']) {
    setAuthorizationToken(localStorage['x-access-token']);
    store.dispatch(setCurrentUser(jwt.decode(localStorage['x-access-token'])));
}


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
