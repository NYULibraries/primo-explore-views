import 'primo-explore-custom-actions';
import 'primo-explore-clickable-logo-to-any-link';
import 'primo-explore-custom-no-search-results';
import 'primo-explore-nyu-eshelf';

import { viewName } from './viewName';
import { customActionsConfig } from './customActions';
import { clickableLogoLinkConfig } from './clickableLogoToAnyLink';
import { nyuEshelfConfig } from './nyuEshelf';

let app = angular.module('viewCustom', [
                                        'customActions',
                                        'clickableLogoToAnyLink',
                                        'customNoSearchResults',
                                        'nyuEshelf'
                                      ]);

app
  .constant(customActionsConfig.name, customActionsConfig.config)
  .constant(nyuEshelfConfig.name, nyuEshelfConfig.config)
  .constant(clickableLogoLinkConfig.name, clickableLogoLinkConfig.config)
  .value('customNoSearchResultsTemplateUrl', 'custom/' + viewName + '/html/noSearchResults.html')
  .component('prmSearchResultAvailabilityLineAfter', {
    template: '<nyu-eshelf></nyu-eshelf>'
  })
  .component('prmSearchBookmarkFilterAfter', {
    template: '<nyu-eshelf-toolbar></nyu-eshelf-toolbar>'
  })
