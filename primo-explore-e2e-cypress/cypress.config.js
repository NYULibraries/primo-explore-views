const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 24000,
  pageLoadTimeout: 120000,
  e2e: {
    setupNodeEvents(on, config) {
      // Running test files in batch is no longer supported in Cypress App
      // as of version 10: https://github.com/cypress-io/cypress/discussions/21628
      // The Cypress-endorsed workaround is to create special spec files that
      // import the spec files that need to be run as a batch:
      // https://glebbahmutov.com/blog/run-all-specs-cypress-v10/
      // These workaround files are for use in Cypress App only, as
      // batch mode execution is still supported by the command line cypress
      // executable.  We in fact would not want these _all.cy.js files run
      // on the command line, as they would cause each test to be run twice.
      if (config.isTextTerminal) {
        return {
          excludeSpecPattern: ['cypress/e2e/*/_all.cy.js'],
        }
      }
    },
    baseUrl: 'http://localhost:8004/primo-explore/',
    experimentalSessionAndOrigin: true,
  },
})



