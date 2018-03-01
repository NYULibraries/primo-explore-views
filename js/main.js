import 'primo-explore-custom-no-search-results';

import { permalinkPlaceholder } from './permalinkPlaceholder';

let app = angular.module('centralCustom', [
                                        'angularLoad',
                                        'customNoSearchResults',
                                        'permalinkPlaceholder'
                                      ]);

app
  .value('customNoSearchResultsTemplateUrl', 'custom/CENTRAL_PACKAGE/html/noSearchResults.html')
  .component('prmPermalinkAfter', {
    template: '<permalink-placeholder></permalink-placeholder>'
  })
