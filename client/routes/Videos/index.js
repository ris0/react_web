import asyncRequire from '../../utils/asyncRequire'
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default function(location, cb) {
    require.ensure([], (require) => cb(null, {
        header: require('./handlers/Header').default,
        main: require('./handlers/Main').default
    }))
//    asyncRequire((require) => cb(null, {
//        header: require('./handlers/Header').default,
//        main: require('./handlers/Main').default
//    }))
}

