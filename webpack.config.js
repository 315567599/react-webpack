const path = require('path');
const fs = require('fs');
const srcFolder = path.join(__dirname, 'src', 'entries');
const files = fs.readdirSync(srcFolder);
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const entries = {};
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
    devtool: 'cheap-source-map',
    plugins: [
       // new UglifyJSPlugin()
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
