require('babel-register')
const config = require('config')
const server = require('./server/index')

if (process.env.NODE_ENV === 'development') {
    // webpack dev server piggybacks on Express server,
    // pass webpack dev server fn as callback
    server(require('./webpack/server'))
} else {
    server(() => console.log(`Starting server on port: ${config.SERVER_PORT}`))
}
