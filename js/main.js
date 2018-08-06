import 'primo-explore-custom-no-search-results';

let app = angular.module('centralCustom', [
                                        'angularLoad',
                                        'customNoSearchResults'
                                      ]);

app
  .value('customNoSearchResultsTemplateUrl', 'custom/CENTRAL_PACKAGE/html/noSearchResults.html')
