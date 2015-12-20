
var path = require('path');
var hostname = 'localhost'
var port = '4000'

module.exports = {
  entry: {
    node: './test/node-test.js',
    web:  './test/web-test.js'
  },

  output: {
    filename: 'test.[name].js',
    path: path.join(__dirname, '.test/'),
    publicPath: 'http://' + hostname + ':' + port + '/.test/'
  },
  resolve:{
    root: path.resolve(__dirname, 'src'),
    alias:{
      'flow': 'main.js'
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
