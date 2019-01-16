const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/background.js',
    module: {
        rules: [
            {
                test: /src\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/app/',
                force: true
            }
        ], {})
    ] ,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'background.bundle.js'
    }
};