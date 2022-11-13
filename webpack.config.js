const webpack = require("webpack");
const { ESBuildPlugin, ESBuildMinifyPlugin } = require("esbuild-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const { manifestTransform } = require("./scripts/transform");

module.exports = (env, options) => {
  return {
    entry: {
      content_script: "./src/content-scripts/index.js",
      background: "./src/background.js",
      popup: "./src/popup-page/index.js",
      option: "./src/option-page/index.js"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            "eslint-loader"
          ]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader?modules"]
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
      path: __dirname + "/dist",
      publicPath: "/",
      filename: "[name].bundle.js"
    },
    optimization: {
      minimize: true,
      minimizer: [new ESBuildMinifyPlugin()]
    },
    plugins: [
      new ESBuildPlugin(),
      new CopyWebpackPlugin(
        [
          { from: "./src/popup-page/popup.html", force: true },
          { from: "./src/option-page/option.html", force: true },
          { from: "./src/app/", force: true }
        ],
        {}
      ),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify({ ...options, ...dotenv.parsed })
      }),
      new CopyWebpackPlugin([
        {
          from: "./src/app/manifest.json",
          force: true,
          transform(content, path) {
            return manifestTransform(content, path, options);
          }
        }
      ])
    ],
    devServer: {
      contentBase: "./dist",
      hot: true
    },
  };
};
