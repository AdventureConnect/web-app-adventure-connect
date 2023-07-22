const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./client/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "/dist"),
      publicPath: "/dist",
    },
    port: 8080,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, "./styles/favicon.png"),
      template: path.join(__dirname, "client/index.html"),
      inject: true,
    }),
    // added below to fix webpack source map for node modules preventing react-0router-dom from loading
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            //   plugins: [
            //     "@babel/plugin-transform-runtime", //?
            //     "@babel/transform-async-to-generator", //?
            //   ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader", "css-loader", "postcss-loader"
        ],
      },
      // react router source map loader
      {
        test: /\.m?js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      // image loaders
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      }
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: "./client/index.html",
  //   }),
  // ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
