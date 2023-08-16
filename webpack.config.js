const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const { manifestTransform } = require('./scripts/transform');
const ExtReloader = require('@reorx/webpack-ext-reloader');

const buildDirectory = 'dist';

module.exports = (env, options) => {
  return {
    entry: {
      content_script: "./src/content-scripts/index.js",
      background: "./src/background.js",
      popup: "./src/popup-page/index.js",
      option: "./src/option-page/index.js"
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'source-map-loader',
            },
            {
              loader: 'babel-loader',
            },
          ],
          exclude: /node_modules/,
        },
        {
        // look for .css or .scss files
          test: /\.(css|scss)$/,
          // in the `src` directory
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.mjs', '*', '.js', '.jsx', '.css', '.json'],
    },
    output: {
      path: __dirname + "/" + buildDirectory,
      publicPath: "/",
      filename: "[name].bundle.js"
    },
    plugins: [
      new ExtReloader({
        port: 9090, // Which port use to create the server
        reloadPage: true, // Force the reload of the page also
        entries: { // The entries used for the content/background scripts or extension pages
          contentScript: 'content_script',
          background: 'background',
          extensionPage: ['popup', 'option', /* and so on ... */],
        }
      }),
      new webpack.ProgressPlugin(),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify({ ...options, ...dotenv.parsed })
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './src/app',
            to: path.join(__dirname, buildDirectory),
            force: true,
          },
          {
            from: './src/app/manifest.json',
            to: __dirname + '/' + buildDirectory,
            force: true,
            // eslint-disable-next-line no-unused-vars
            transform: function (content, path) {
            // generates the manifest file using the package.json information
              return manifestTransform(content, path, options);
            },
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: './src/option-page/option.html',
        filename: 'option.html',
        chunks: ['options'],
        cache: false,
      }),
      new HtmlWebpackPlugin({
        template: './src/popup-page/popup.html',
        filename: 'popup.html',
        chunks: ['popup'],
        cache: false,
      })
    ],
    devServer: {
      contentBase: "./" + buildDirectory,
      hot: true
    },
  };
};
