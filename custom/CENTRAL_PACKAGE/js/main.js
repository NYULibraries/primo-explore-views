import * as Sentry from '@sentry/browser';
import sentryConfig from './sentryConfig';

import 'primo-explore-custom-no-search-results';

let app = angular.module('centralCustom', [
  'angularLoad',
  'customNoSearchResults',
]);

app
  .filter('encodeURIComponent', ['$window', function($window) {
    return $window.encodeURIComponent;
  }])
  .value('customNoSearchResultsTemplateUrl', 'custom/CENTRAL_PACKAGE/html/no_search_results.html')
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
  }]);

app.run(runBlock);

runBlock.$inject = [];

function runBlock() {
  Sentry.init(sentryConfig);
}
