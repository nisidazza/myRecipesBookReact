const path = require('path')

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundel.js'
    },
    mode:'development',
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
    devtool: 'source-map',
    devServer: {
        contentBase: './public'
    }
}