const path = require('path');
const express = require('express');

const app = express();

app.set('env', process.env.NODE_ENV || 'development');
app.set('host', process.env.HOST || 'localhost');
app.set('port', process.env.PORT || '3000');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, '..', 'build')));

// TODO CSRF

app.get('/api', function(req, res) {
    res.send('OK');
});

app.get('/*', function(req, res) {
    res.render('index', {
        // TODO render server-side react app to string
        content: '<p>loading...</p>'
    });
})

module.exports = function(cb) {
    app.listen(app.get('port'), cb);
}
