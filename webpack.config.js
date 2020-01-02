const path = require('path')
const Dotenv = require('dotenv-webpack')
const InjectEnvironmentPlugin = require('webpack-inject-environment-variables');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new Dotenv(),
        new InjectEnvironmentPlugin({regex: /^PUBLIC/i}),
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: './public'
    }
}