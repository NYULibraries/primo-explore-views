// import styles
import '../css/sass/main.scss';

import '@orbis-cascade/primo-explore-custom-actions';
import 'primo-explore-custom-library-card-menu';
import 'primo-explore-clickable-logo-to-any-link';
import 'primo-explore-libraryh3lp-widget';
import 'primo-explore-nyu-eshelf';
import 'primo-explore-search-bar-sub-menu';
import 'primo-explore-google-analytics';
import 'primo-explore-custom-requests';
import 'primo-explore-custom-login';

import viewName from './viewName';
import customActionsConfig from './customActions';
import customLibraryCardMenuItemsConfig from './customLibraryCardMenu';
import clickableLogoLinkConfig from './clickableLogoToAnyLink';
import libraryh3lpWidgetConfig from './libraryh3lpWidget';
import nyuEshelfConfig from './nyuEshelf';
import searchBarSubMenuItemsConfig from './searchBarSubMenu';
import googleAnalyticsConfig from './googleAnalyticsConfig';
import customRequestsConfig from 'Common/js/customRequestsConfig';
import customLoginConfig from 'Common/js/customLoginConfig';
import topAlert from 'Common/js/topAlert';
import topAlertConfig from 'Common/js/topAlertConfig';

// HTML as JS imports
import customRequestsRequestInformationTemplate from '../html/custom_requests_request_information.html';
import citationLinkerAfterTemplate from 'Common/html/citation_linker_after.html';


let app = angular.module('viewCustom', [
  'angularLoad',
  'customActions',
  'customLibraryCardMenu',
  'clickableLogoToAnyLink',
  'libraryh3lpWidget',
  'nyuEshelf',
  'searchBarSubMenu',
  'googleAnalytics',
  'primoExploreCustomLogin',
  'primoExploreCustomRequests',
]);

app
  .constant(customLibraryCardMenuItemsConfig.name, customLibraryCardMenuItemsConfig.config)
  .constant(clickableLogoLinkConfig.name, clickableLogoLinkConfig.config)
  .constant(libraryh3lpWidgetConfig.name, libraryh3lpWidgetConfig.config)
  .constant(nyuEshelfConfig.name, nyuEshelfConfig.config)
  .constant(searchBarSubMenuItemsConfig.name, searchBarSubMenuItemsConfig.config)
  .constant(googleAnalyticsConfig.name, googleAnalyticsConfig.config)
  .constant(customRequestsConfig.name, customRequestsConfig.config(viewName))
  .constant(customLoginConfig.name, customLoginConfig.config)
  .constant(topAlertConfig.name, topAlertConfig.config)
  .value('customNoSearchResultsTemplateUrl', `custom/${viewName}/html/no_search_results.html`)
  .component('prmActionListAfter', {
    controller: ['$window', function($window) {
      const ctrl = this;

      // takes a 'key' string and executes a gtag event using the key to categorize it
      ctrl.gaSendAction = key => {
        // console.log('sent', key);
        $window.gtag('event', 'send_to', {
          event_category: key,
          event_label: ctrl.prmActionCtrl.isFullView ? 'Full view' : 'Brief view',
        });
      };

      // utility function for prepending arbitrary, no argument function to the second element (a function) in a [key, fxn] array
      // takes optional third argument for memoizing functions that have already been appended
      // mutates the memo only. Does not mutate the original object received
      ctrl.appendActions = ([key, fxn], appendFxn, amendmentMemo = {}) => {
        if (amendmentMemo[key]) {
          return [key, fxn];
        } else {
          amendmentMemo[key] = true;
          // console.log('ammended', key);
          return [
            key,
            (...args) => {
              appendFxn();
              fxn(...args);
            },
          ];
        }
      };

      ctrl.amendedToggleFunctions = {};
      ctrl.$doCheck = () => {
        // get the onToggle object, which is POJO of handlers to execute when a
        // certain send to button is clicked
        const onToggle = ctrl.prmActionCtrl.actionListService.onToggle;
        // if any of the current onToggle functions have not been ammended
        const anyNotAmended = Object.keys(onToggle).some(toggleKey => !ctrl.amendedToggleFunctions[toggleKey]);
        if (anyNotAmended) {
          // then make a new dictionary of onToggle amended with a GA step
          const newlyAmendedActions = Object.entries(onToggle)
                                            .map((entry) => ctrl.appendActions(
                                              entry,
                                              () => ctrl.gaSendAction(entry[0]),
                                              ctrl.amendedToggleFunctions
                                            ))
                                            .reduce((res, [key, value]) => ({ ...res, [key]: value }), {});

          // and, finally, overwrite the onToggle functions
          Object.assign(onToggle, newlyAmendedActions);
        }
      };
    }],
    template: customActionsConfig.template,
    require: {
      prmActionCtrl: '^prmActionList',
    },
  })
  // .component('prmFullViewServiceContainerAfter', getitLegacyNotification)
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
  .component('prmAlphabetToolbarAfter', {
    template: /*html*/ `<search-bar-sub-menu></search-bar-sub-menu>`,
  })
  .component('prmBrowseSearchBarAfter', {
    template: /*html*/ `<search-bar-sub-menu></search-bar-sub-menu>`,
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
    controller: ['$element', function($element) {
      const ctrl = this;

      ctrl.$postLink = () => {
        const $menu = $element.find('search-bar-sub-menu').parent().detach();
        const $target = $element.parent().parent().find('header');
        $target.after($menu);
      };
    }],
    template: citationLinkerAfterTemplate,
  })
  .component('prmTopbarAfter', topAlert);


app.run(runBlock);

runBlock.$inject = [
  'gaInjectionService',
  'nyuEshelfService',
  'libraryh3lpInjectionService'
];

function runBlock(gaInjectionService, nyuEshelfService, libraryh3lpInjectionService) {
  gaInjectionService.injectGACode();
  nyuEshelfService.initEshelf();
  libraryh3lpInjectionService.injectScript();
}
