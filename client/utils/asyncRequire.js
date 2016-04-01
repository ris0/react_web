export default function asyncRequire(cb) {
    if (typeof require.ensure !== 'function') {
        cb(require)
    } else {
        require.ensure([], cb)
    }

}
