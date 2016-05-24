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
import selectErrorMessage from './selectErrorMessage'
import URL from 'url'
import config from 'config'
import logger from './utils/logger'

process.env.PWD = path.join(process.cwd(), 'server')
const app = express()

// TODO set HOST, PORT, etc. in config...
app.set('env', process.env.NODE_ENV || 'development')
app.set('host', process.env.HOST || 'localhost')
app.set('port', process.env.PORT || '3000')
app.set('views', path.join(process.env.PWD, 'views'))
app.set('view engine', 'jade')

// TODO host static files elsewhere in prod?
app.use(express.static(path.join(process.env.PWD, 'assets')))
app.use(express.static(path.join(process.env.PWD, '..', 'build')))

// TODO CSRF when we have user accounts n' such

app.use(/^\/api(.+)/, proxy(config.API_ROOT, {
    forwardPath: (req) => { 
        return `${req.params[0]}${URL.format({ query: req.query })}`
    }
}))

app.get('/error/:errorCode', (req, res) => {
    res.render('error', selectErrorMessage(req.params.errorCode, req.query.redirectFrom))
})

app.get('/*', (req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        const store = configureStore(initialState)

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
                        res.render('error', selectErrorMessage(500, req.url))
                    }
                })
                .catch((err) => {
                    logger.warn(`Attempted to fetch data for ${req.url}`, err)
                    res.render('error', selectErrorMessage(err.status || 500, req.url))
                })
        } else {
            logger.warn(`${req.url} Not Found`)
            res.render('error', selectErrorMessage(404, req.url))
        }
    })
})

module.exports = (cb) => app.listen(app.get('port'), cb)
