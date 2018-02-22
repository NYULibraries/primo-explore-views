import 'primo-explore-custom-actions';
import 'primo-explore-clickable-logo-to-any-link';
import 'primo-explore-nyu-eshelf';
import 'primo-explore-search-bar-sub-menu';

import { viewName } from './viewName';
import { customActionsConfig } from './customActions';
import { clickableLogoLinkConfig } from './clickableLogoToAnyLink';
import { nyuEshelfConfig } from './nyuEshelf';
import { searchBarSubMenuItemsConfig } from './searchBarSubMenu';

let app = angular.module('viewCustom', [
                                        'angularLoad',
                                        'customActions',
                                        'clickableLogoToAnyLink',
                                        'nyuEshelf',
                                        'searchBarSubMenu'
                                      ]);

app
  .constant(customActionsConfig.name, customActionsConfig.config)
  .constant(nyuEshelfConfig.name, nyuEshelfConfig.config)
  .constant(clickableLogoLinkConfig.name, clickableLogoLinkConfig.config)
  .constant(searchBarSubMenuItemsConfig.name, searchBarSubMenuItemsConfig.config)
  .component('prmSearchResultAvailabilityLineAfter', {
    template: '<nyu-eshelf></nyu-eshelf>'
  })
  .component('prmSearchBookmarkFilterAfter', {
    template: '<nyu-eshelf-toolbar></nyu-eshelf-toolbar>'
  })
  .component('prmSearchBarAfter', {
    template: '<search-bar-sub-menu></search-bar-sub-menu>'
  })
