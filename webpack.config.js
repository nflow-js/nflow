require('es6-promise').polyfill()
var pkg = require('./package.json')
var webpack = require('webpack')
var path = require('path')
var hostname = 'localhost'
var port = '5000'
var JsDocPlugin = require('jsdoc-webpack-plugin')

module.exports = {
  entry: {
    'node-test': './test/node-test.js',
    'web-test': './test/web-test.js',
    'nflow': './src/index'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'this',
    publicPath: 'http://' + hostname + ':' + port + '/dist/'
  },
  resolve: {
    root: path.resolve(__dirname, 'src'),
    alias: {
      'nflow': 'nflow.js'
    }
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
    }),
    new JsDocPlugin({
      conf: './src-docs/config.json'
    })
  ],
  stats: {
    colors: true,
    reasons: true
  },
  debug: true,
  cache: true,
  devtool: 'source-map',

  devServer: {
    progress: true,
    contentBase: 'test',
    host: hostname,
    port: port
  }
}
