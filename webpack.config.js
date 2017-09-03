const path = require('path');
const fs = require('fs');
const srcFolder = path.join(__dirname, 'src', 'entries');
const files = fs.readdirSync(srcFolder);
const entries = {};
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

var __DEV__ = process.env.NODE_ENV !== 'production';
console.log(process.env.NODE_ENV);
console.log(__DEV__);

files.forEach( entry => {
    const name = entry.split('.')[0];
    const file = `./src/entries/${name}`;
    entries[name] = file;
    }
);

module.exports = {
    entry: entries,
    output: {
        filename: __DEV__ ? '[name].js' : '[name]-[hash].min.js',
        chunkFilename: __DEV__ ? '[name].js' : '[name]-[chunkhash].min.js',
        path: path.resolve(__dirname, 'dist'),

    },
    devtool: __DEV__ ? 'cheap-source-map' : false,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(__DEV__ ? 'development' : 'production')
            }
        }),
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
                test: /\.json$/,
                loaders: [
                    'json-loader'
                ]
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

if (!__DEV__) {
    module.exports.plugins.push(
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyJSPlugin()
    );
}
