//noinspection Eslint
const path = require('path');
//noinspection Eslint
const webpack = require('webpack');
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
    devtool: "cheap-module-source-map",
    output: {
        filename: "main.js",
        path: "src/main/resources/static/dist/" // copy to target
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
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel"]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('"production"')
                }
            }
        ),
        new ExtractTextPlugin("bundle.css", {allChunks: true})
    ]
};