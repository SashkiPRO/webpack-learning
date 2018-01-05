const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        app: './src/app.js',
        draw: './src/DrawUtil.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'tet')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './tet'
 },
    plugins: [
        new CleanWebpackPlugin(['tet']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        })
    ],
    module: {

        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',

        },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"]
            }
        ]
    },


    externals: {
        jquery: 'jQuery',
    }
};
