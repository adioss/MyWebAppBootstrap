//noinspection Eslint
const path = require('path');
//noinspection Eslint
const webpack = require('webpack');
//noinspection Eslint
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
//noinspection Eslint
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//noinspection Eslint
const node_modules = path.resolve(__dirname, 'node_modules');
//noinspection Eslint
const app_modules = path.resolve(__dirname, 'src/main/resources/static/js');

const PATHS = {
    reactLib: path.resolve(node_modules, 'react/lib/ReactWithAddons.js'),
    reactDomLib: path.resolve(node_modules, 'react-dom/index.js')
};
//noinspection Eslint
module.exports = {
    context: "src/main/resources/static",
    entry: "main.js",
    devtool: "eval-source-map",
    output: {
        filename: "main.js",
        path: "target/classes/static/dist/" // copy to target
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    resolve: {
        root: [app_modules],
        alias: {
            'react$': PATHS.reactLib
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["react-hot", "babel-loader"]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css", {allChunks: true}),
        new BrowserSyncPlugin({
                proxy: 'http://localhost:8080/'
            }
        )
    ]
};