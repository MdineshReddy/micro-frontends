const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "[name].[ext]",
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3001,
    static: "./dist",
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new ModuleFederationPlugin({
      name: "shellApp", // Unique name for the remote app; identifies the app in the Module Federation system.
      remotes: {
        remoteApp: "remoteApp@http://localhost:3000/remoteEntry.js",
        // Key: 'remoteApp' - The name used to reference the remote app in the shell app's code (e.g., import("remoteApp/App")).
        // Value: 'remoteApp@http://localhost:3000/remoteEntry.js' - The name of the remote app ('remoteApp') and the URL
        // where its entry file ('remoteEntry.js') is hosted. This enables the shell app to dynamically load the remote app's modules at runtime.
      },
      shared: {
        react: {
          singleton: true, // Ensures only one instance of React is shared across all federated apps.
          eager: false, // Prevents React from being loaded eagerly, ensuring it is loaded only when needed.
          requiredVersion: "^19.0.0", // Specifies the required version of React to ensure compatibility.
        },
        "react-dom": {
          singleton: true, // Ensures only one instance of ReactDOM is shared across all federated apps.
          eager: false, // Prevents ReactDOM from being loaded eagerly, ensuring it is loaded only when needed.
          requiredVersion: "^19.0.0", // Specifies the required version of ReactDOM to ensure compatibility.
        },
      },
    }),
  ],
};
