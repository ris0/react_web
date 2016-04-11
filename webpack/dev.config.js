const webpack = require('webpack')
const path = require('path')
const config = require('config')
const bourbon = require('bourbon').includePaths

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3030',
        'webpack/hot/only-dev-server',
        './client/index'
    ],

    output: {
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3030/dist/'
    },

    devtool: 'sourcemap',

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel-loader'],
                include: path.resolve(__dirname, '..', 'client')
            },
            {
                test: /\.json$/,
                loaders: ['json'],
                include: path.resolve(__dirname, '..', 'config')
            },
            {
                test: /\.scss$/,
                loaders: ['react-hot', 'style', 'css', `sass?includePaths[]=${bourbon}`]
            }
        ]
    },

    sassLoader: {
        includePaths: [path.resolve(__dirname, '..', 'client/assets/stylesheets')]
    },

    resolve: {
        alias: {
            // NOTE: currently, `config` module doesn't play well with webpack
            // so we alias the appropriate browser config file
            config: path.resolve(__dirname, '..', 'config', `${process.env.NODE_ENV}.browser.js`)
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('development')
            //'NODE_ENV': JSON.stringify('production') //TODO use for production
          }
        })
    ]
}
