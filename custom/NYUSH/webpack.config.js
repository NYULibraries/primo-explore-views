const path = require('path');

module.exports = {
  // modifications to the devenv webpack process can go here
  resolve: {
    alias: {
      'node_modules': path.resolve(__dirname, '../node_modules/')
    }
  }
};