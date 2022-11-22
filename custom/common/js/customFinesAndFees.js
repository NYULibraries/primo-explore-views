angular
  .module('customFinesAndFees', [])
  .component('customFinesAndFees', {
    templateUrl: ['customFinesAndFeesTemplateUrl', function (customFinesAndFeesTemplateUrl) {
      return customFinesAndFeesTemplateUrl;
    }]
  });
