const defaultConfig = require('./default.browser')
const developmentConfig = require('./development')

module.exports = Object.assign({}, developmentConfig, defaultConfig, {})
