const webpack = require('webpack');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: [
      'spec',
      'junit',
      // 'coverage',
      // 'coveralls'
    ],
    browsers: ['ChromeHeadless', 'ChromiumHeadless_without_sandbox'],
    basePath: 'src/',
    files: [
      '../node_modules/angular/angular.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      'index.js',
      'spec/**/*.js',
    ],
    preprocessors: {
      'index.js': ['webpack', 'sourcemap'],
      'spec/**/*.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          }
        ]
      },
      devtool: 'inline-source-map',
      externals: {
        angular: 'angular',
      },
      plugins: [
        new webpack.DefinePlugin({
          module: 'window.module',
        }),
      ],
    },
    customLaunchers: {
      ChromiumHeadless_without_sandbox: {
        base: 'ChromiumHeadless',
        flags: ['--no-sandbox']
      }
    },
    junitReporter: {
      outputDir: '../test-results/'
    }
  });
};
