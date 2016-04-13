var pm2 = require('pm2')

var instances = process.env.WEB_CONCURRENCY || -1
var maxMemory = process.env.WEB_MEMORY || 512

pm2.connect(function() {
    pm2.start({
        script: 'index.js',
        name: 'knowsy-staging',
        exec_mode: 'cluser',
        instances: instances,
        max_memory_restart: maxMemory + 'M',
        env: {
            'NODE_ENV': 'production'
        }
    }, function(err) {
        if (err) {
            return console.error('Error while launching application', err.stack || err)
        }
        console.log('PM2 and application has been successfully started')

        pm2.launchBus(function(err, bus) {
            console.log('[PM2] Log streaming started')

            bus.on('log:out', function(packet) {
                console.log('[App:%s] %s', packet.process.name, packet.data)
            })

            bus.on('log:err', function(packet) {
                console.log('[App:%s][Err] %s', packet.process.name, packet.data)
            })
        })
    })
})
