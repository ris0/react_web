const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require(path.join(__dirname, 'dev.config'));
const PORT = 3030;

module.exports = function() {
    return new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true,
        contentBase: 'http://localhost:' + PORT
    }).listen(PORT, 'localhost', function(err, result) {
        if (err) {
            return console.log(err);
        }

        console.log(`Dev server listening on port ${PORT}, Dev App is live at http://localhost:3000`);
    });
}

