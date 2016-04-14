const webpack = require('webpack')
const path = require('path')
const config = require('config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const bourbon = require('bourbon').includePaths

module.exports = {
    entry: [
        './client/index'
    ],

    output: {
        path: path.resolve(__dirname, '..', 'build'),
        filename: 'bundle.min.js',
        publicPath: '/assets'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: path.resolve(__dirname, '..', 'client')
            },
            {
                test: /\.json$/,
                loaders: ['json'],
                include: path.resolve(__dirname, '..', 'config')
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', `css!sass?includePaths[]=${bourbon}`)
            }
        ]
    },

//    sassLoader: {
//        includePaths: [path.resolve(__dirname, '..', 'client/assets/stylesheets')]
//    },
//
    resolve: {
        alias: {
            // NOTE: currently, `config` module doesn't play well with webpack
            // so we alias the appropriate browser config file
            config: path.resolve(__dirname, '..', 'config', `${process.env.NODE_ENV}.browser.js`)
        }
    },

    plugins: [
        // TODO new webpack.optimize.CommonsChunkPlugin(...)
        new ExtractTextPlugin('bundle.min.css'),
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': JSON.stringify('production')
          }
        })
    ]
}
