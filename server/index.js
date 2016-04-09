import 'babel-polyfill'
import 'isomorphic-fetch'
import path from 'path'
import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux';
import routes from '../client/routes'
import configureStore from '../client/configureStore'
import initialState from '../client/initialState'
import resolver from './resolver'
import URL from 'url'
import config from 'config'

const store = configureStore(initialState)

const app = express()

app.set('env', process.env.NODE_ENV || 'development')
app.set('host', process.env.HOST || 'localhost')
app.set('port', process.env.PORT || '3000')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, '..', 'build')))

// TODO CSRF

app.use(/^\/api(.+)/, proxy(config.API_ROOT, {
    forwardPath: (req) => { 
        return `${req.params[0]}${URL.format({ query: req.query })}`
    }
}))

app.get('/*', (req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            // TODO maybe use NODE_ENV to determine if we need /api prefix or not?
            // server won't need the /api prefix, what is the webpack env vs node?
            // or env-specific buildUrl method, env-specific prefix property
            Promise.all(resolver(renderProps.components, store.dispatch, {}))
                .then(() => {
                    res.render('index', {
                        ENV: process.env.NODE_ENV,
                        state: JSON.stringify(store.getState()),
                        content: renderToString(
                            <Provider store={store}>
                                <RouterContext {...renderProps} />
                            </Provider>)
                    })
                })
                .catch((err) => res.status(500).send(err.message))
        } else {
            res.status(404).send('Not Found')
        }
    })
})

module.exports = (cb) => app.listen(app.get('port'), cb)
