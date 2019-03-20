const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  target: 'web',
  output: {
    filename: 'primoExploreCustomRequests.min.js',
    library: 'primoExploreCustomRequests',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'sourcemap',
};