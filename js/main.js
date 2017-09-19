import 'primo-explore-custom-actions';
import 'primo-explore-custom-library-card-menu';
import 'primo-explore-clickable-logo-to-any-link';
import 'primo-explore-custom-no-search-results';
import 'primo-explore-libraryh3lp-widget';
import 'primo-explore-nyu-eshelf';

import { viewName } from './viewName';
import { customActionsConfig } from './customActions';
import { customLibraryCardMenuItemsConfig } from './customLibraryCardMenu';
import { clickableLogoLinkConfig } from './clickableLogoToAnyLink';
import { libraryh3lpWidgetConfig } from './libraryh3lpWidget';
import { nyuEshelfConfig } from './nyuEshelf';

let app = angular.module('viewCustom', [
                                        'customActions',
                                        'customLibraryCardMenu',
                                        'clickableLogoToAnyLink',
                                        'customNoSearchResults',
                                        'libraryh3lpWidget',
                                        'nyuEshelf'
                                      ]);

app
  .constant(customActionsConfig.name, customActionsConfig.config)
  .constant(customLibraryCardMenuItemsConfig.name, customLibraryCardMenuItemsConfig.config)
  .constant(clickableLogoLinkConfig.name, clickableLogoLinkConfig.config)
  .constant(nyuEshelfConfig.name, nyuEshelfConfig.config)
  .constant(libraryh3lpWidgetConfig.name, libraryh3lpWidgetConfig.config)
  .value('customNoSearchResultsTemplateUrl', 'custom/' + viewName + '/html/noSearchResults.html')
  .component('prmSearchResultAvailabilityLineAfter', {
    template: '<nyu-eshelf></nyu-eshelf>'
  })
  .component('prmSearchBookmarkFilterAfter', {
    template: '<nyu-eshelf-toolbar></nyu-eshelf-toolbar>'
  })
