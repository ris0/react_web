require('babel-register')

const devServer = require('./webpack/server')
const server = require('./server/index')

server(devServer)
