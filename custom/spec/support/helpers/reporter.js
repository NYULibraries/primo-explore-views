const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const JUnitXmlReporter = require('jasmine-reporters').JUnitXmlReporter;

const path = require('path');

jasmine.getEnv().clearReporters(); // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter({ // add jasmine-spec-reporter
  spec: {
    displayPending: true
  }
}));
jasmine.getEnv().addReporter(new JUnitXmlReporter({
  savePath: path.join(__dirname, '../../junit'),
  consolidateAll: false
}));
