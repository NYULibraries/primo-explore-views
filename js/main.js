import 'primo-explore-custom-actions';
import 'primo-explore-custom-library-card-menu';
import 'primo-explore-clickable-logo-to-any-link';
import 'primo-explore-getit-to-link-resolver';
import 'primo-explore-nyu-eshelf';

import { viewName } from './viewName';
import { customActionsConfig } from './customActions';
import { customLibraryCardMenuItemsConfig } from './customLibraryCardMenu';
import { clickableLogoLinkConfig } from './clickableLogoToAnyLink';
import { getitToLinkResolverConfig } from './getitToLinkResolver';
import { nyuEshelfConfig } from './nyuEshelf';

let app = angular.module('viewCustom', [
                                        'angularLoad',
                                        'customActions',
                                        'customLibraryCardMenu',
                                        'clickableLogoToAnyLink',
                                        'getitToLinkResolver',
                                        'nyuEshelf'
                                      ]);

app
  .constant(customActionsConfig.name, customActionsConfig.config)
  .constant(customLibraryCardMenuItemsConfig.name, customLibraryCardMenuItemsConfig.config)
  .constant(clickableLogoLinkConfig.name, clickableLogoLinkConfig.config)
  .constant(getitToLinkResolverConfig.name, getitToLinkResolverConfig.config)
  .constant(nyuEshelfConfig.name, nyuEshelfConfig.config)
  .component('prmFullViewServiceContainerAfter', {
    template: '<getit-to-link-resolver-full></getit-to-link-resolver-full>'
  })
  .component('prmSearchResultAvailabilityLineAfter', {
    template: '<nyu-eshelf></nyu-eshelf>'
  })
  .component('prmSearchBookmarkFilterAfter', {
    template: '<nyu-eshelf-toolbar></nyu-eshelf-toolbar>'
  })
