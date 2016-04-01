import path from 'path'
import express from 'express'
import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { Provider } from 'react-redux';
import routes from '../client/routes'
import configureStore from '../client/configureStore'
import resolver from './resolver'

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
        showDropdownNav: false
    },
    videos: {},
    categories: {},
    pageHome: {
        recentVideos: [],
        featuredVideos: [],
        loaded: false
    },
    pageCategories: {},
    pageVideo: {}
});

const app = express()

app.set('env', process.env.NODE_ENV || 'development')
app.set('host', process.env.HOST || 'localhost')
app.set('port', process.env.PORT || '3000')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, '..', 'build')))

// TODO CSRF

app.use(/^\/api(.+)/, proxy('https://staging-api.theknowsy.com', {
    forwardPath: (req) => req.params[0]
}))


app.get('/*', (req, res) => {
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            //Promise.all(resolver(renderProps.components, store.dispatch, {}))
            debugger;
            res.render('index', {
                state: JSON.stringify(store.getState()),
                content: renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps} />
                    </Provider>)
            })
        } else {
            res.status(404).send('Not Found')
        }
    })
})

module.exports = (cb) => app.listen(app.get('port'), cb)
