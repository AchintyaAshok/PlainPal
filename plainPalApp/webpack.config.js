var path = require("path");
var webpack = require("webpack"); // this is a module organizer

module.exports = {
  entry: [
    './src/index.js'
  ],
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, "build"),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
