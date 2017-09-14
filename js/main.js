import 'primo-explore-custom-actions';
import 'primo-explore-clickable-logo';
import 'primo-explore-custom-no-search-results';
import 'primo-explore-custom-search-bookmark-filter';

import { viewName } from './viewName';
import { customActionsConfig } from './customActions';
import { customSearchBookmarkFilterConfig } from './customSearchBookmarkFilter';

let app = angular.module('viewCustom', [
                                        'customActions',
                                        'clickableLogo',
                                        'customNoSearchResults',
                                        'customSearchBookmarkFilter'
                                      ]);

app
  .constant(customActionsConfig.name, customActionsConfig.config)
  .constant(customSearchBookmarkFilterConfig.name, customSearchBookmarkFilterConfig.config)
  .component('prmSearchBookmarkFilterAfter', {
    template: '<custom-search-bookmark-filter></custom-search-bookmark-filter>'
  })
  .value('customNoSearchResultsTemplateUrl', 'custom/' + viewName + '/html/noSearchResults.html')
