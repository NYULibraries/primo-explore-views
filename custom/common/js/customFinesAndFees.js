// monday.com:
//     "Create Fines+Fees language in Primo"
//     https://nyu-lib.monday.com/boards/765008773/pulses/3241782159
//
// Note that there are currently no e2e tests for this module.  For details, see:
// https://nyu-lib.monday.com/boards/765008773/pulses/3241782159/posts/1823268034

angular
  .module('customFinesAndFees', [])
  .component('customFinesAndFees', {
    templateUrl: ['customFinesAndFeesTemplateUrl', function (customFinesAndFeesTemplateUrl) {
      return customFinesAndFeesTemplateUrl;
    }]
  });
