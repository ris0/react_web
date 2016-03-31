const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3030',
        'webpack/hot/only-dev-server',
        './client/index'
    ],

    output: {
        path: path.join(__dirname, '..', 'build'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:3030/dist/'
    },

    devtool: 'sourcemap',

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel-loader?presets[]=react,presets[]=es2015'],
                exclude: /node_modules/,
                include: path.join(__dirname, '..', 'client')
            },
            {
                test: /\.scss$/,
                loaders: ['react-hot', 'style', 'css', 'sass']
            }
        ]
    },

    sassLoader: {
        includePaths: [path.resolve(__dirname, '..', 'client/assets/stylesheets')]
    },

    resolve: {
        alias: {
            config: path.join(__dirname, '..', 'config', process.env.NODE_ENV || 'development')
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
