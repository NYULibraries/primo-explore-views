const path = require('path');

module.exports = {
  "settings": {
    "import/resolver": {
      "webpack": {
        config: {
          resolve: {
            alias: {
              // resolves import 'Common' to refer to common directory.
              Common: path.resolve(__dirname, './common'),
            }
          }
        }
      }
    }
  }
}