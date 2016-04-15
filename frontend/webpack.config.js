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
            },
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            { test: /\.svg$/,    loader: "file-loader" },
            {
                test: /\/bootstrap\/js\//,
                loader: 'imports?jQuery=jquery'
            }
        ]
    },
    devServer: {
        contentBase:__dirname,
        port:3000,
        hot: true,
        inline:true,
        historyApiFallback:true,
        stats:{colors:true}
       /* proxy:{
            '*':'http://127.0.0.1:3001',
        },*/
    }
};