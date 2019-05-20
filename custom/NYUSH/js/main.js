import '@orbis-cascade/primo-explore-custom-actions';
import 'primo-explore-custom-library-card-menu';
import 'primo-explore-clickable-logo-to-any-link';
import 'primo-explore-libraryh3lp-widget';
import 'primo-explore-getit-to-link-resolver';
import 'primo-explore-nyu-eshelf';
import 'primo-explore-search-bar-sub-menu';
import 'primo-explore-custom-requests';
import 'primo-explore-custom-login';

import viewName from './viewName';
import customActionsConfig from './customActions';
import customLibraryCardMenuItemsConfig from './customLibraryCardMenu';
import clickableLogoLinkConfig from './clickableLogoToAnyLink';
import libraryh3lpWidgetConfig from './libraryh3lpWidget';
import getitToLinkResolverConfig from './getitToLinkResolver';
import nyuEshelfConfig from './nyuEshelf';
import searchBarSubMenuItemsConfig from './searchBarSubMenu';
import customRequestsConfig from 'Common/js/customRequestsConfig';
import customLoginConfig from 'Common/js/customLoginConfig';
// Common alias does not work for HTML imports
import customRequestsRequestInformationTemplate from '../../common/html/custom_requests_request_information.html';
import citationLinkerAfterTemplate from '../../common/html/citation_linker_after.html';

const vid = 'NYUSH';

let app = angular.module('viewCustom', [
  'customActions',
  'customLibraryCardMenu',
  'clickableLogoToAnyLink',
  'libraryh3lpWidget',
  'getitToLinkResolver',
  'nyuEshelf',
  'searchBarSubMenu',
  'primoExploreCustomLogin',
  'primoExploreCustomRequests',
]);

app
  .constant(customLibraryCardMenuItemsConfig.name, customLibraryCardMenuItemsConfig.config)
  .constant(clickableLogoLinkConfig.name, clickableLogoLinkConfig.config)
  .constant(libraryh3lpWidgetConfig.name, libraryh3lpWidgetConfig.config)
  .constant(getitToLinkResolverConfig.name, getitToLinkResolverConfig.config)
  .constant(nyuEshelfConfig.name, nyuEshelfConfig.config)
  .constant(searchBarSubMenuItemsConfig.name, searchBarSubMenuItemsConfig.config)
  .constant(customRequestsConfig.name, customRequestsConfig.config(vid))
  .constant(customLoginConfig.name, customLoginConfig.config)
  .value('customNoSearchResultsTemplateUrl', `custom/${viewName}/html/no_search_results.html`)
  .filter('encodeURIComponent', ['$window', function($window) {
    return $window.encodeURIComponent;
  }])
  .component('prmActionListAfter', {
    template: customActionsConfig.template
  })
  .component('prmFullViewServiceContainerAfter', {
    template: /*html*/`<getit-to-link-resolver-full></getit-to-link-resolver-full>`
  })  
  // .component('prmFullViewServiceContainerAfter', {
  //   template: /*html*/`
  //     <getit-to-link-resolver-full></getit-to-link-resolver-full>
  //     <div ng-if="$ctrl.isSendTo" class="getit-to-link-resolver-full-container">
  //       <div class="section-head">
  //         <div layout="row" layout-align="center center">
  //           <h4 class="section-title md-title light-text">New Feature Alert!</h4>
  //             <md-divider flex class="md-primoExplore-theme"></md-divider>
  //         </div>
  //       </div>
  //       <div class="section-body">
  //         <div
  //           layout="row"
  //           layout-align="center center"
  //           class="bar alert-bar zero-margin-bottom"
  //         >
  //           <span class="bar-text margin-right-small">
  //             Don't see E-journals, E-books, or HathiTrust results, etc.? Use the
  //             <a href="#getit-full" ng-click="$ctrl.handleAnchor('getit-full', $event)">
  //               GetIt (Legacy Feature)
  //               <span class="sr-only">Skip to GetIt Legacy</span>
  //             </a>
  //             link below while we work to add those results to this new feature.
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   `,
  //   controller: ['$anchorScroll', '$window', function ($anchorScroll, $window) {
  //     const ctrl = this;
  //     ctrl.$onInit = function () {
  //       ctrl.isSendTo = ctrl.parentCtrl.service.title === 'nui.brief.results.tabs.send_to';

  //       ctrl.handleAnchor = (id, $event) => {
  //         $event.preventDefault();
  //         // sets yOffsetProperty based on jQuery element height, then resets to default value
  //         $anchorScroll.yOffset = angular.element($window.document.querySelector(`md-toolbar.default-toolbar`));
  //         $anchorScroll(id);
  //         // focuses element
  //         angular.element($window.document.querySelector(`#${id} a`)).focus();
  //       };
  //     };
  //   }],
  //   bindings: {
  //     parentCtrl: '<',
  //   }
  // })
  .component('prmSearchResultAvailabilityLineAfter', {
    template: /*html*/`<nyu-eshelf></nyu-eshelf>`
  })
  .component('prmSearchBookmarkFilterAfter', {
    template: /*html*/ `<nyu-eshelf-toolbar></nyu-eshelf-toolbar>`
  })
  .component('prmSearchBarAfter', {
    template: /*html*/ `<search-bar-sub-menu></search-bar-sub-menu>`
  })
  .component('prmAuthenticationAfter', {
    template: /*html*/ `<primo-explore-custom-login></primo-explore-custom-login>`
  })
  .component('prmLocationItemAfter', {
    template: /*html*/ `
      <primo-explore-custom-requests
        layout="row"
        layout-align="end center"
        layout-wrap
        flex-xs="100"
      ></primo-explore-custom-requests>`,
    controller: ['$element', function ($element) {
      const ctrl = this;
      ctrl.$postLink = () => {
        const $target = $element.parent().query('div.md-list-item-text');
        const $el = $element.query(`primo-explore-custom-requests`).detach();
        $target.append($el);
      };
    }]
  })
  .component('prmLocationItemsAfter', {
    template: `${customRequestsRequestInformationTemplate}`
  })
  .component('prmCitationLinkerAfter', {
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
