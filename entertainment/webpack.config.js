const path = require("path");

module.exports = {
  entry: "./src/index.js", // Your entry point
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      zlib: require.resolve("browserify-zlib"),
      path: require.resolve("path-browserify"),
      querystring: require.resolve("querystring-es3"),
      http: require.resolve("stream-http"),
      crypto: require.resolve("crypto-browserify"),
      url: require.resolve("url"),
      buffer: require.resolve("buffer"),
      util: require.resolve("util"),
      process: require.resolve("process/browser"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
