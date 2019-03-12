const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};