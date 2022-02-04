// import styles
import '../css/sass/main.scss';

import '@orbis-cascade/primo-explore-custom-actions';
import 'primo-explore-custom-library-card-menu';
import 'primo-explore-clickable-logo-to-any-link';
import 'primo-explore-libraryh3lp-widget';
import 'primo-explore-nyu-eshelf';
import 'primo-explore-search-bar-sub-menu';
import 'primo-explore-custom-login';

import viewName from './viewName';
import customActionsConfig from './customActions';
import customLibraryCardMenuItemsConfig from './customLibraryCardMenu';
import clickableLogoLinkConfig from './clickableLogoToAnyLink';
import libraryh3lpWidgetConfig from './libraryh3lpWidget';
import nyuEshelfConfig from './nyuEshelf';
import searchBarSubMenuItemsConfig from './searchBarSubMenu';
import customLoginConfig from 'Common/js/customLoginConfig';
import 'Common/js/customRequests';
import 'Common/js/sendToCourseReserves';

// HTML to JS imports
import customRequestsRequestInformationTemplate from 'Common/html/custom_requests_request_information.html';
import citationLinkerAfterTemplate from 'Common/html/citation_linker_after.html';

let app = angular.module('viewCustom', [
  'customActions',
  'customLibraryCardMenu',
  'clickableLogoToAnyLink',
  'libraryh3lpWidget',
  'nyuEshelf',
  'searchBarSubMenu',
  'primoExploreCustomLogin',
  'sendToCourseReserves',
  'customRequests',
]);

app
  .constant(customLibraryCardMenuItemsConfig.name, customLibraryCardMenuItemsConfig.config)
  .constant(clickableLogoLinkConfig.name, clickableLogoLinkConfig.config)
  .constant(libraryh3lpWidgetConfig.name, libraryh3lpWidgetConfig.config)
  .constant(nyuEshelfConfig.name, nyuEshelfConfig.config)
  .constant(searchBarSubMenuItemsConfig.name, searchBarSubMenuItemsConfig.config)
  .constant(customLoginConfig.name, customLoginConfig.config)
  .value('customNoSearchResultsTemplateUrl', `custom/${viewName}/html/no_search_results.html`)
  .filter('encodeURIComponent', ['$window', function($window) {
    return $window.encodeURIComponent;
  }])
  .component('prmActionListAfter', {
    template: customActionsConfig.template
  })
  .component('prmSearchResultAvailabilityLineAfter', {
    template: /*html*/`
      <send-to-course-reserves></send-to-course-reserves>
      <nyu-eshelf></nyu-eshelf>
    `
  })
  .component('prmSearchBookmarkFilterAfter', {
    template: /*html*/ `<nyu-eshelf-toolbar></nyu-eshelf-toolbar>`
  })
  .component('prmSearchBarAfter', {
    template: /*html*/ `<search-bar-sub-menu></search-bar-sub-menu>`
  })
  .component('prmUserAreaExpandableAfter', {
    template: /*html*/ `<primo-explore-custom-login></primo-explore-custom-login>`
  })
  .component('prmAlphabetToolbarAfter', {
    template: /*html*/ `<search-bar-sub-menu></search-bar-sub-menu>`,
  })
  .component('prmBrowseSearchBarAfter', {
    template: /*html*/ `<search-bar-sub-menu></search-bar-sub-menu>`,
  })
  .component('prmServiceButtonAfter', {
    // Show custom "Request ILL" link if item is unavailable
    template: /*html*/ ``,
    require: {
      parentCtrl: '^prmServiceButton',
    },
    controller: 'customRequestsUnavailableItemController',
  })
  .component('prmLocationItemAfter', {
    // Show a custom "Login..." link when user is logged out
    template: /*html*/ `
      <primo-explore-custom-request-wrapper
        layout="row"
        layout-align="end center"
        layout-wrap
        flex-xs="100"
      >
      <primo-explore-custom-request-button ng-show="showRequestButton()"></primo-explore-custom-request-button>
        <primo-explore-custom-request-login ng-hide="isLoggedIn()"></primo-explore-custom-request-login>
      </primo-explore-custom-request-wrapper>
    `,
    require: {
      parentCtrl: '^prmLocationItems'
    },
    controller: 'customRequestsController',
  })
  .component('prmLocationItemsAfter', {
    template: `${customRequestsRequestInformationTemplate}`
  })
  // TODO: We might want to remove this component.  See https://github.com/NYULibraries/primo-explore-views/issues/328.
  .component('prmRequestAfter', {
    template: `${customRequestsRequestInformationTemplate}`
  })
  .component('prmCitationLinkerAfter', {
    controller: ['$element', function ($element) {
      const ctrl = this;

      ctrl.$postLink = () => {
        const $menu = $element.find('search-bar-sub-menu').parent().detach();
        const $target = $element.parent().parent().find('header');
        $target.after($menu);
      };
    }],
    template: citationLinkerAfterTemplate,
  });

app.run(runBlock);

runBlock.$inject = [
  'nyuEshelfService',
  'libraryh3lpInjectionService',
];

function runBlock(nyuEshelfService, libraryh3lpInjectionService) {
  nyuEshelfService.initEshelf();
  libraryh3lpInjectionService.injectScript();
}
