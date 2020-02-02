const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
const { manifestTransform } = require("./scripts/transform");

module.exports = (env, options) => {
  return {
    entry: {
      content_script: "./src/content-scripts/App.jsx",
      background: "./src/background.js",
      popup: "./src/popup-page/App.jsx",
      option: "./src/option-page/App.jsx"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            "file-loader",
            {
              loader: "image-webpack-loader",
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true // webpack@2.x and newer
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    },
    output: {
      path: __dirname + "/dist",
      publicPath: "/",
      filename: "[name].bundle.js"
    },
    plugins: [
      new CopyWebpackPlugin(
        [
          { from: "./src/popup-page/popup.html", force: true },
          { from: "./src/option-page/option.html", force: true },
          { from: "./src/app/", force: true }
        ],
        {}
      ),
      new webpack.DefinePlugin({
        "process.env": dotenv.parsed
      }),
      new CopyWebpackPlugin([
        {
          from: "./src/app/manifest.json",
          force: true,
          transform(content, path) {
            return manifestTransform(content, path, options);
          }
        }
      ]),
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: "./dist",
      hot: true
    }
  };
};
