// https://github.com/bcaudan/jasmine-spec-reporter/tree/93e3132168f049f3307965206d407068ea3bbcef/examples/node
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

jasmine.getEnv().clearReporters(); // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter({ // add jasmine-spec-reporter
  spec: {
    displayPending: true
  }
}));
