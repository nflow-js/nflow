
var path = require('path');
var hostname = 'localhost'
var port = '4000'

module.exports = {
  entry: {
    'node-test': './test/node-test.js',
    'web-test':  './test/web-test.js',
    'nflow':     './src/'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'this',
    publicPath: 'http://' + hostname + ':' + port + '/dist/'
  },
  resolve:{
    root: path.resolve(__dirname, 'src'),
    alias:{
      'nflow': 'nflow.js'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/
        , exclude: /node_modules/
        , loader: 'babel'
        , query: { presets: ['es2015', 'stage-0'] }},
    ]
  },
  stats: {
    colors: true,
    reasons: true
  },
  debug: true,
  cache: true,
  devtool: 'source-map',

  devServer: {
    progress: true,
    contentBase: "test",
    host: hostname,
    port: port
  },
}
