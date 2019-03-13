#!/bin/sh -ex

export NEW_MODULE_NAME=$1

CAMELCASE_MODULE_NAME=$(echo 'console.log(process.env.NEW_MODULE_NAME.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }))' | node)

mkdir -p $NEW_MODULE_NAME

cd $NEW_MODULE_NAME

cat > package.json <<-EOF
{
  "name": "$NEW_MODULE_NAME",
  "version": "0.0.1",
  "main": "./dist/index.js",
  "license": "MIT",
  "scripts": {
    "test": "NODE_ENV=test yarn karma start --single-run",
    "test:chrome-debugger": "yarn karma start --browsers=Chrome --single-run=false --debug",
    "build": "yarn webpack --mode=production",
    "prepare": "yarn build"
  },
  "devDependencies": {
    "@babel/cli": "^7.2.3",
    "@babel/core": "^7.3.4",
    "@babel/plugin-proposal-object-rest-spread": "^7.3.4",
    "@babel/preset-env": "^7.3.4",
    "angular": "^1.7.8",
    "angular-mocks": "^1.7.8",
    "babel-loader": "^8.0.5",
    "babel-plugin-istanbul": "^5.1.1",
    "clean-webpack-plugin": "^2.0.0",
    "jasmine-core": "^3.3.0",
    "karma": "^4.0.1",
    "karma-chrome-launcher": "^2.2.0",
    "karma-jasmine": "^2.0.1",
    "karma-junit-reporter": "^1.2.0",
    "karma-sourcemap-loader": "^0.3.7",
    "karma-spec-reporter": "^0.0.32",
    "karma-webpack": "^4.0.0-rc.6",
    "puppeteer": "^1.13.0",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.2.3"
  }
}
EOF

yarn install

cat > Dockerfile <<- "EOF"
FROM quay.io/nyulibraries/chromium_headless_node:10.15.1-chromium_71.0.3578.98

ENV INSTALL_PATH /app/

# Install node_modules with yarn
ADD package.json /tmp/
RUN cd /tmp && yarn install --frozen-lockfile --ignore-scripts \
  && mkdir -p $INSTALL_PATH \
  && cd $INSTALL_PATH \
  && cp -R /tmp/node_modules $INSTALL_PATH \
  && rm -r /tmp/* && yarn cache clean

WORKDIR ${INSTALL_PATH}

COPY . .
EOF

cat > docker-compose.yml <<- "EOF"
version: '3.7'

services:
  test:
    build:
      context: .
    command: yarn test --browsers=ChromiumHeadless_without_sandbox
    # volumes:
    #   - ./src/:/app/src/
    #   - ./karma.conf.js:/app/karma.conf.js
  test-watch:
    build:
      context: .
    command: yarn test --browsers=ChromiumHeadless_without_sandbox --single-run=false
    # volumes:
    #   - ./src/:/app/src/
    #   - ./karma.conf.js:/app/karma.conf.js
EOF

cat > karma.conf.js <<-"EOF"
const webpack = require('webpack');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: [
      'spec',
      'junit',
      'coverage'
    ],
    browsers: ['ChromeHeadless', 'ChromiumHeadless_without_sandbox'],
    basePath: './',
    files: [
      require.resolve('angular/angular.js'),
      require.resolve('angular-mocks/angular-mocks.js'),
      'src/index.js',
      'src/spec/**/*.spec.js',
    ],
    preprocessors: {
      'src/index.js': ['webpack', 'sourcemap'],
      'src/spec/**/*.spec.js': ['webpack', 'sourcemap'],
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }]
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
      outputDir: 'test-results'
    },
    coverageReporter: {
      type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
      dir: 'test-results/coverage',
    },
  });
};
EOF

cat > .babelrc <<- "EOF"
{
  "presets": [
    ["@babel/preset-env", {
      "targets": "last 2 versions, not dead"
    }]
  ],
  "plugins": [
    "@babel/plugin-proposal-object-rest-spread",
    "transform-html-import-to-string",
  ],
  "env": {
    "test": {
      "plugins": [
        ["istanbul", {
          "exclude": ["**/*.spec.js"],
        }],
      ]
    },
  },
  "comments": false,
}
EOF

cat > .eslintrc <<- "EOF"
{
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "semi": 2,
    "no-unused-vars": ["warn"],
    "no-console": ["error", {
      "allow": ["warn", "error"]
    }]
  },
  "globals": {
    "angular": true
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  }
}
EOF

cat > .dockerignore <<- "EOF"
node_modules
test-results
EOF

cat > .npmignore <<- "EOF"
src/
.*
*.conf*.js
screeshot*
test-results
*.log
Dockerfile
docker-compose.yml
EOF

cat > webpack.config.js <<- "EOF"
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  devtool: 'sourcemap',
  plugins: [
    new CleanWebpackPlugin(),
  ],
};
EOF

echo "# $NEW_MODULE_NAME" > README.md

mkdir -p src/js

touch src/js/$CAMELCASE_MODULE_NAME.module.js
cat > src/index.js <<-EOF
require('./js/$CAMELCASE_MODULE_NAME.module.js');
module.exports = '$CAMELCASE_MODULE_NAME';
EOF

mkdir -p src/spec

cat > src/spec/.esintrc <<-"EOF"
{
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "semi": 2,
    "no-unused-vars": ["warn"],
    "no-console": 0
  },
  "globals": {
    "__fixtures__": false,
    "angular": false,
    "module": false,
    "inject": false,
    "window": false,
    "console": false,
    "Promise": false,
    "spyOnAllFunctions": false,
  },
  "env": {
    "jasmine": true,
    "node": true
  }
}
EOF

cat > src/spec/sample.spec.js <<-"EOF"
describe('first spec', () => {
  it('is true', () => {
    expect(true).toBe(true)
  });
});