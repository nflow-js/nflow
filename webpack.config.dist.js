require('es6-promise').polyfill()
var pkg = require('./package.json')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    'nflow': './src/index'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'this'
  },
  resolve: {
    root: path.resolve(__dirname, 'src')
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version)
    })
  ],
  stats: {
    colors: true,
    reasons: true
  },
  debug: true,
  cache: true,
  devtool: 'source-map'
}
