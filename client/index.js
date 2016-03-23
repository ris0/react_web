import 'babel-polyfill';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import routes from './routes';
import rootReducer from './reducers';

function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    )
}

const store = configureStore({
    videos: {
        1: {
            name: 'A'
        },
        2: {
            name: 'B'
        }
    },
    categories: {}
});

render((
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>), document.getElementById('app'));
