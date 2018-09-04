import 'primo-explore-custom-no-search-results';

let app = angular.module('centralCustom', [
                                        'angularLoad',
                                        'customNoSearchResults'
                                      ]);

app
  .filter('encodeURIComponent', function($window) {
    return $window.encodeURIComponent;
  })
  .value('customNoSearchResultsTemplateUrl', 'custom/CENTRAL_PACKAGE/html/noSearchResults.html');
