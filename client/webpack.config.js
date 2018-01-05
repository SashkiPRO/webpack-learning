const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'tet')
    },

    module: {

        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',

        },
            {
                test: /\.css$/,
                loaders: ["style-loader","css-loader"]
            }
        ]
    },


    externals: {
        jquery: 'jQuery',
    }
};
