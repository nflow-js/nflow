require('es6-promise').polyfill()
const pkg = require('./package.json')
const webpack = require('webpack')
const path = require('path')
const hostname = 'localhost'
const port = '5000'

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
    contentBase: 'docs',
    host: hostname,
    port: port
  }
}
