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
    'perf-test': './test/perf-test.js',
    'nflow': './src/index'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'docs/dist'),
    libraryTarget: 'this',
    publicPath: '/docs/dist'
  },
  resolve: {
    root: path.resolve(__dirname, 'src'),
    alias: {
      'nflow': 'nflow.js'
    }
  },
  module: {
    noParse: [
      // Suppress warnings and errors logged by benchmark.js when bundled using webpack.
      // https://github.com/bestiejs/benchmark.js/issues/106
      path.resolve(__dirname, './node_modules/benchmark/benchmark.js')
    ],
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
    // new JsDocPlugin({
    //   conf: './src-docs/config.json'
    // })
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
    contentBase: '.',
    host: hostname,
    port: port
  }
}
