module.exports = function(location, cb) {
    require.ensure([], (require) => cb(null, {
        header: require('./handlers/Header').default,
        main: require('./handlers/Main').default
    }));
}

