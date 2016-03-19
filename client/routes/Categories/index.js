module.exports = function(location, cb) {
    require.ensure([], (require) => cb(null, require('./handlers/Categories').default));
}

