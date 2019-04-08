process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: [
      'spec',
      // 'coverage',
      // 'coveralls'
    ],
    browsers: ['ChromeHeadless'],
    basePath: 'src/',
    files: [
      '../node_modules/angular/angular.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      'js/**/*.js',
      'spec/**/*.js',
    ],
    preprocessors: {
      'js/**/*.js': ['webpack', 'sourcemap'],
      'spec/**/*.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      devtool: 'inline-source-map'
    }
  });
};
