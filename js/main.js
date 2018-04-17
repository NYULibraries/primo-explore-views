import 'primo-explore-custom-actions';
import 'primo-explore-nyu-eshelf';
import 'primo-explore-search-bar-sub-menu';

import { viewName } from './viewName';
import { customActionsConfig } from './customActions';
import { nyuEshelfConfig } from './nyuEshelf';
import { searchBarSubMenuItemsConfig } from './searchBarSubMenu';

let app = angular.module('viewCustom', [
                                        'angularLoad',
                                        'customActions',
                                        'nyuEshelf',
                                        'searchBarSubMenu'
                                      ]);

app
  .constant(nyuEshelfConfig.name, nyuEshelfConfig.config)
  .constant(searchBarSubMenuItemsConfig.name, searchBarSubMenuItemsConfig.config)
  .component('prmActionListAfter', {
    template: customActionsConfig.template
  })
  .component('prmSearchResultAvailabilityLineAfter', {
    template: '<nyu-eshelf></nyu-eshelf>'
  })
  .component('prmSearchBookmarkFilterAfter', {
    template: '<nyu-eshelf-toolbar></nyu-eshelf-toolbar>'
  })
  .component('prmSearchBarAfter', {
    template: '<search-bar-sub-menu></search-bar-sub-menu>'
  });

app.run(runBlock);

runBlock.$inject = ['nyuEshelfService'];

function runBlock(nyuEshelfService) {
  nyuEshelfService.initEshelf();
}
