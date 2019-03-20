const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  target: 'web',
  output: {
    filename: 'primoExploreCustomLogin.min.js',
    library: 'primoExploreCustomLogin',
    libraryTarget: 'var',
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  devtool: 'sourcemap',
};