import * as Sentry from '@sentry/browser';

import '@orbis-cascade/primo-explore-custom-actions';
import 'primo-explore-custom-search-bookmark-filter';
import 'primo-explore-search-bar-sub-menu';

import { viewName } from './viewName';
import { customActionsConfig } from './customActions';
import { customSearchBookmarkFilterConfig } from './customSearchBookmarkFilter';
import { searchBarSubMenuItemsConfig } from './searchBarSubMenu';
import sentryConfig from 'Common/js/sentryConfig';

let app = angular.module('viewCustom', [
                                        'customActions',
                                        'customSearchBookmarkFilter',
                                        'searchBarSubMenu'
                                      ]);

app
  .constant(customSearchBookmarkFilterConfig.name, customSearchBookmarkFilterConfig.config)
  .constant(searchBarSubMenuItemsConfig.name, searchBarSubMenuItemsConfig.config)
  .component('prmActionListAfter', {
    template: customActionsConfig.template
  })
  .component('prmSearchBookmarkFilterAfter', {
    template: '<custom-search-bookmark-filter></custom-search-bookmark-filter>'
  })
  .component('prmSearchBarAfter', {
    template: '<search-bar-sub-menu></search-bar-sub-menu>'
  });

app.run(runBlock);

runBlock.$inject = [];

function runBlock() {
  Sentry.init(sentryConfig);
}
