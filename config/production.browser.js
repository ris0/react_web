const defaultConfig = require('./default.browser')
const productionConfig = require('./production')

module.exports = Object.assign({}, productionConfig, defaultConfig, {})
