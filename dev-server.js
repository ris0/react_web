const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const PORT = 8080;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(PORT, 'localhost', function(err, result) {
    if (err) {
        return console.log(err);
    }

    console.log(`Dev server listening on port ${PORT}, App is live at http://localhost:${8080}/`);
});
