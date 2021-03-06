/* eslint-disable */
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry:   __dirname + '/src/main/resources/static/js/main.js',
    devtool: 'eval-source-map',
    output:  {
        filename: 'main.js',
        path:     __dirname + '/target/classes/static/dist/' // copy to target
    },
    module:  {
        rules: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                use:     {
                    loader: 'babel-loader'
                }
            }, {
                test:    /\.css$/,
                exclude: /node_modules/,
                use:     ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:      'css-loader'
                })
            }, {
                test:    /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use:     {
                    loader: 'eslint-loader'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('bundle.css', {allChunks: true}), //
        new BrowserSyncPlugin({
            proxy: 'http://localhost:8080/'
        })
    ]
};
