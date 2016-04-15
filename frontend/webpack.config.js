/**
 * Created by jun_ma on 2016/4/15.
 */
const  path = require('path');
module.exports = {
    entry: "./entry.js",
    output: {
        path: path.resolve(__dirname,'bulid'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};