/* eslint-disable */
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry:   'main.js',
    output:  {
        filename: 'main.js',
        path:     __dirname + '/src/main/resources/static/dist/' // copy to source
    },
    module:  {
        rules: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                use:     {
                    loader: 'babel'
                }
            }, {
                test:    /\.css$/,
                exclude: /node_modules/,
                use:     ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:      'css-loader'
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('"production"')
            }
        }), new ExtractTextPlugin('bundle.css', {allChunks: true})
    ]
};
