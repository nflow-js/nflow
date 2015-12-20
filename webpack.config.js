
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    './src/main.js'
  ],

  output: {
    filename: 'nflow.js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'this'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/,  loader: 'babel', query: { presets: ['es2015'] }}
    ]
  }
}
