// import styles
import '../css/sass/main.scss';

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
//  .component('prmTopbarAfter', {
//    template: /*html*/ `
//    <primo-explore-top-alert>
//      <md-toolbar>
//        <div class="bar alert-bar" layout="row" layout-align="center center">
//          <span class="bar-text">
//            Starting March 11, physical access to NYU Libraries is restricted to NYU card holders only. 
//            <a href="https://nyulibraries.statuspage.io/incidents/vkd8y3jxr1n6" target="_blank" class="arrow-link md-primoExplore-theme">
//              <span>See more</span>
//              <span class="sr-only">(opens in a new window)</span>
//              <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new">
//              </prm-icon>
//            </a>
//          </span>
//        </div>
//      </md-toolbar>
//    </primo-explore-top-alert>`,
//    controller: ['$element', function ($element) {
//      const ctrl = this;
//      ctrl.$postLink = function () {
//        const $primoExploreMain = $element.parent().parent().parent();
//        const $el = $element.query(`primo-explore-top-alert`).detach();
//        $primoExploreMain.prepend($el);
//      };
//    }],
//  });
//}]);

app.run(runBlock);

runBlock.$inject = [];

function runBlock() {
  Sentry.init(sentryConfig);
}
