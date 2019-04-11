import * as Sentry from '@sentry/browser';
import sentryConfig from './sentryConfig';

import noSearchResultsTemplate from '../html/noSearchResults.html';

let app = angular.module('centralCustom', [
  'angularLoad',
]);

app
  .filter('encodeURIComponent', ['$window', function($window) {
    return $window.encodeURIComponent;
  }])
  .value('customNoSearchResultsTemplateUrl', 'custom/CENTRAL_PACKAGE/html/noSearchResults.html')
  .config(['$httpProvider', function ($httpProvider) {
    // log response errors using $http to Sentry
    $httpProvider.interceptors.push(['$q', function ($q) {
      return {
        responseError(rejection) {
          const isLibraryNyuEdu = /http?s:\/\/.*library\.nyu\.edu/.test(rejection.config.url);
          isLibraryNyuEdu && Sentry.captureException(rejection);
          return $q.reject(rejection);
        }
      };
    }]);
  }])
  .component('prmNoSearchResultAfter', {
    bindings: {
      parentCtrl: '<',
    },
    controller: function() {
      const ctrl = this;
      ctrl.$onInit = function() {
        ctrl.vid = new RegExp('[?&]vid(=([^&#]*)|&|#|$)').exec(document.location.search)[2];
      };
    },
    template: noSearchResultsTemplate,
  });

app.run(runBlock);

runBlock.$inject = [];

function runBlock() {
  Sentry.init(sentryConfig);
}
