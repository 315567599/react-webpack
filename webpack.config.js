const path = require('path');
const fs = require('fs');
const srcFolder = path.join(__dirname, 'src', 'entries');
const files = fs.readdirSync(srcFolder);
const entries = {};
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

var __DEV__ = process.env.NODE_ENV !== 'production';

files.forEach( entry => {
    const name = entry.split('.')[0];
    const file = `./src/entries/${name}`;
    entries[name] = file;
    }
);

module.exports = {
    entry: entries,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),

    },
    devtool: __DEV__ ? 'cheap-source-map' : null,
    plugins: [
        //       new webpack.DefinePlugin({
        //          'process.env':{
        //             NODE_ENV: JSON.stringify('production')
        //        }
        //   }),
        //   new UglifyJSPlugin()
    ],
    devServer: {
        contentBase: './dist',
    },
    module : {
        loaders:[
            {
                test: /\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test:/\.(png|jpg)$/,
                loader:'url-loader?limit=8192'
            },
            {
                test:/\.svg$/,
                loader:'svg-loader'
            },
            {
              test:/\.jsx$/,
              loader:'babel-loader',
              exclude: [
                  path.resolve(__dirname, "node_modules/")
              ],
              query: {
                  presets:['react', 'es2015'],
                }
            }

        ],
    }
};
