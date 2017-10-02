import 'primo-explore-custom-actions';
import 'primo-explore-clickable-logo-to-any-link';
import 'primo-explore-custom-search-bookmark-filter';

import { viewName } from './viewName';
import { customActionsConfig } from './customActions';
import { customSearchBookmarkFilterConfig } from './customSearchBookmarkFilter';
import { clickableLogoLinkConfig } from './clickableLogoToAnyLink';

let app = angular.module('viewCustom', [
                                        'angularLoad',
                                        'customActions',
                                        'clickableLogoToAnyLink',
                                        'customSearchBookmarkFilter'
                                      ]);

app
  .constant(customActionsConfig.name, customActionsConfig.config)
  .constant(clickableLogoLinkConfig.name, clickableLogoLinkConfig.config)
  .constant(customSearchBookmarkFilterConfig.name, customSearchBookmarkFilterConfig.config)
  .component('prmSearchBookmarkFilterAfter', {
    template: '<custom-search-bookmark-filter></custom-search-bookmark-filter>'
  })
