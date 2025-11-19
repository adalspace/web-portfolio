const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "js/[name].[contenthash].js" : "js/[name].js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name][hash][ext][query]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? "css/[name].[contenthash].css" : "css/[name].css",
      }),
    ],
    devServer: {
      static: "./dist",
      hot: true,
      open: true,
      port: 5173,
    },
    resolve: {
      extensions: [".js"],
    },
    devtool: isProd ? "source-map" : "eval-source-map",
  };
};
