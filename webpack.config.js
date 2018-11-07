const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [{test: /\.ts$/, loader: 'ts-loader'}]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    performance: {
        hints: false
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: ['*.html', 'node_modules']
    },
    devServer: {
        noInfo: true,
        overlay: true,
        port: 3000
    }
}