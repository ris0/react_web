import asyncRequire from '../../utils/asyncRequire'
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default function(location, cb) {
    require.ensure([], (require) => cb(null, require('./handlers/Categories').default))
    //asyncRequire((require) => cb(null, require('./handlers/Categories').default))
}

