import 'babel-polyfill'
import 'isomorphic-fetch'
import React from 'react'
import { match, Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import routes from './routes'
import configureStore from './configureStore'

require('./assets/stylesheets/main.scss')

const store = configureStore(window.__INITIAL_STATE__)

match({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
    render((
        <Provider store={store}>
            <Router {...renderProps} />
        </Provider>), document.getElementById('app'))
})

