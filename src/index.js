import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(
    (state) => {},
    compose(
    applyMiddleware( reduxThunk ),
    window.devToolsExtension ? window.devToolsExtension() : r => r
)
)
ReactDOM.render(
    <Provider store = {store}>
<App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
