import 'babel-polyfill';
import 'isomorphic-fetch';
import React from 'react';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import routes from './routes';
import rootReducer from './reducers';

require('./assets/stylesheets/main.scss');

function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    )
}

const store = configureStore({
    user: {},
    app: {
        isLoading: false,
        navLinks: [
            'about',
            'subscribe',
            'jobs',
            'advertise',
            'contact'
        ],
        showDropdownNav: true
    },
    videos: {
        1: {
            name: 'A'
        },
        2: {
            name: 'B'
        }
    },
    categories: {},
    pageHome: {
        recentVideos: [1, 2],
        featuredVideos: [1],
        loaded: false
    },
    pageCategories: {},
    pageVideo: {}
});

render((
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>), document.getElementById('app'));
