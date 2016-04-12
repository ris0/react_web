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
import logger from './utils/logger'

const store = configureStore(initialState)
const app = express()

// TODO set HOST, PORT, etc. in config...
app.set('env', process.env.NODE_ENV || 'development')
app.set('host', process.env.HOST || 'localhost')
app.set('port', process.env.PORT || '3000')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, '..', 'build')))

// TODO CSRF when we have user accounts n' such

app.use(/^\/api(.+)/, proxy(config.API_ROOT, {
    forwardPath: (req) => { 
        return `${req.params[0]}${URL.format({ query: req.query })}`
    }
}))

app.get('/*', (req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            logger.warn(err)
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            logger.info(redirectLocation)
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            Promise.all(resolver(renderProps.components, store.dispatch, renderProps.params))
                .then(() => {
                    try {
                        res.render('index', {
                            title: 'Knowsy', // TODO set per-page title
                            ENV: process.env.NODE_ENV,
                            state: JSON.stringify(store.getState()),
                            content: renderToString(
                                <Provider store={store}>
                                    <RouterContext {...renderProps} />
                                </Provider>)
                        })
                    } catch(err) {
                        logger.error(`Attempted to render ${req.url}`, err)
                        res.status(500).send(err.message)
                    }
                }) // TODO render custom 404 page or 500 page
                .catch((err) => {
                    logger.warn(`Attempted to fetch data for ${req.url}`, err)
                    res.status(err.status || 500).send(err.message)
                })
        } else {
            logger.warn(`${req.url} Not Found`)
            res.status(404).send('Not Found')
        }
    })
})

module.exports = (cb) => app.listen(app.get('port'), cb)
