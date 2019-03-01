const path = require('path');

module.exports = {
  resolve: {
    alias: {
      // resolves import 'Common' to refer to common directory.
      Common: path.resolve(__dirname, '../common'),
    },
  }
};