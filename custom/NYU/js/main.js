// import styles
import '../css/sass/main.scss';

import '@orbis-cascade/primo-explore-custom-actions';
import 'primo-explore-custom-library-card-menu';
import 'primo-explore-clickable-logo-to-any-link';
import 'primo-explore-libraryh3lp-widget';
import 'primo-explore-nyu-eshelf';
import 'primo-explore-search-bar-sub-menu';
import 'primo-explore-google-analytics';
import 'primo-explore-custom-login';
// import 'Common/js/primoExploreCustomLogin';

import viewName from './viewName';
import customActionsConfig from './customActions';
import customLibraryCardMenuItemsConfig from './customLibraryCardMenu';
import clickableLogoLinkConfig from './clickableLogoToAnyLink';
import libraryh3lpWidgetConfig from './libraryh3lpWidget';
import nyuEshelfConfig from './nyuEshelf';
import searchBarSubMenuItemsConfig from './searchBarSubMenu';
import googleAnalyticsConfig from './googleAnalyticsConfig';
import customLoginConfig from 'Common/js/customLoginConfig';
import physicalItemsAlert from 'Common/js/physicalItemsAlert';
// import customRequests from 'Common/js/customRequestComponent';
import 'Common/js/sendToCourseReserves';
import appendStatusEmbed from 'Common/js/statusPageEmbed';

// HTML as JS imports
import customRequestsRequestInformationTemplate from 'Common/html/custom_requests_request_information.html';
import citationLinkerAfterTemplate from 'Common/html/citation_linker_after.html';
import customRequestsTemplate from 'Common/html/custom_requests_template.html';

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
  'sendToCourseReserves',
]);

app
  .constant(customLibraryCardMenuItemsConfig.name, customLibraryCardMenuItemsConfig.config)
  .constant(clickableLogoLinkConfig.name, clickableLogoLinkConfig.config)
  .constant(libraryh3lpWidgetConfig.name, libraryh3lpWidgetConfig.config)
  .constant(nyuEshelfConfig.name, nyuEshelfConfig.config)
  .constant(searchBarSubMenuItemsConfig.name, searchBarSubMenuItemsConfig.config)
  .constant(googleAnalyticsConfig.name, googleAnalyticsConfig.config)
  .constant(customLoginConfig.name, customLoginConfig.config)
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
  .component('primoExploreCustomRequestLogin', {
    template: customRequestsTemplate,
    controller: ['$scope', '$injector', function($scope, $injector) {
      const ctrl = this;
      ctrl.$onInit = () => {
        $scope.button = {
          label: 'Login to see request options',
          action: ($injector) => $injector.get('primoExploreCustomLoginService').login(),
          prmIconBefore: loginIcon,
        };
      };

      ctrl.translate = original => original.replace(/\{(.+?)\}/g, (match, p1) => $filter('translate')(p1));

      ctrl.handleClick = (event, { action }) => {
        event.stopPropagation();
        action && action($injector);
      };

      const loginIcon = {
        set: "primo-ui",
        icon: "sign-in",
      };
    }]
  })
  .component('primoExploreCustomRequestIll', {
    template: customRequestsTemplate,
    controller: ['$scope', '$filter', '$window', function($scope, $filter, $window) { 
      const ctrl = this;
      ctrl.$onInit = () => {
        const locationsCtrl = $scope.$parent.$parent.$parent.$ctrl;
        const vid = locationsCtrl.configurationUtil.vid;
        const baseIllUrl = baseUrls.ill;
        const illLink = ctrl.getitLink(locationsCtrl.item, vid);

        $scope.button = {
          label: 'Request ILL',
          prmIconAfter: externalLinkIcon,
          href: (/resolve?(.*)/.test(illLink) ? `${baseIllUrl}?${illLink.match(/resolve\?(.*)/)[1]}` : illLink) || baseIllUrl,
        };
      };

      ctrl.getitLink = (item, institutionVid) => {
        const getitLinkFields = {
          NYU: ['lln40'],
          NYUAD: ['lln40'],
          NYUSH: ['lln40'],
          CU: ['lln13'],
        };
        const validGetitLinkFields = getitLinkFields[institutionVid];
      
        // This reduce allows multiple valid links per institution
        // and just chooses the first one - could be simplified to expect only one link per institution
        try {
          const urls = validGetitLinkFields.reduce((res, target) => {
            const link = item.delivery.link.filter(({
              displayLabel
            }) => displayLabel === target)[0];
            return link ? [...res, link.linkURL] : res;
          }, []);
      
          return urls[0];
        } catch (e) {
          return '';
        }
      };

      ctrl.translate = original => original.replace(/\{(.+?)\}/g, (match, p1) => $filter('translate')(p1));

      ctrl.handleClick = (event, { href }) => {
        event.stopPropagation();
        href && $window.open(href);
      };

      const baseUrls = {
        ill: `http://proxy${process.env.NODE_ENV !== 'production' ? 'dev' : ''}.library.nyu.edu/login?url=https://${process.env.NODE_ENV !== 'production' ? 'dev.' : ''}ill.library.nyu.edu/illiad/illiad.dll/OpenURL`,
      };

      const externalLinkIcon = {
        icon: "ic_open_in_new_24px",
        set: "action",
      };
      
    }]
  })
  .component('prmServiceButtonAfter', {
    // Show custom "Request ILL" link if item is unavailable
    template: /*html*/ `<primo-explore-custom-request-ill ng-show="showRequestILL()"></primo-explore-custom-request-ill>`,
    require: {
      parentCtrl: '^prmServiceButton',
    },
    controller: ['$scope','$element', function ($scope, $element) {
      const ctrl = this;
      ctrl.$onInit = () => {

      };
      ctrl.$postLink = () => {
        ctrl.itemStatus = ctrl.parentCtrl.requestParameters.itemstatusname;
        // Hide existing "Request" link if item is unavailable
        if (ctrl.isUnavailableItem()) {
          $element.parent().addClass("custom-requests-hide-request");
        }
      };

      $scope.showRequestILL = () => {
        return ctrl.isUnavailableItem() && ctrl.isRequestLink();
      };

      ctrl.isUnavailableItem = () => {
        const isUnavailable = !checkIsAvailable(ctrl.itemStatus);
        return isUnavailable;
      };

      ctrl.isRequestLink = () => {
        const requestType = ctrl.parentCtrl.service.type;
        return requestType === "HoldRequest";
      };

      const checkIsAvailable = circulationStatus => {
        const unavailablePatterns = [
          /Requested/g,
          /\d{2}\/\d{2}\/\d{2}/g, // dd/dd/dd appears anywhere in the string
          'Requested',
          'Billed as Lost',
          'Claimed Returned',
          'In Processing',
          'In Transit',
          'On Hold',
          'Request ILL',
          'On Order',
        ];
        
        const hasPattern = (patterns, target) => patterns.some(str => target.match(new RegExp(str)));
        return !hasPattern(unavailablePatterns, circulationStatus || "");
      };
    }]
  })
  .component('prmLocationItemAfter', {
    // Show a custom "Login..." link when user is logged out
    template: /*html*/ `
      <primo-explore-custom-request-login-wrapper
        layout="row"
        layout-align="end center"
        layout-wrap
        flex-xs="100"
      >
        <primo-explore-custom-request-login ng-hide="isLoggedIn()"></primo-explore-custom-request-login>
      </primo-explore-custom-request-login-wrapper>
      <primo-explore-custom-request-electronic-copy-available ng-show="hasOnlineLinks()" class="weak-text flex-xs-100 flex" flex-xs="100"><div><p>Item Available Electronically</p></primo-explore-custom-request-electronic-copy-available>`,
    require: {
      parentCtrl: '^prmLocationItems'
    },
    controller: ['$scope','$element', function ($scope, $element) {
      const ctrl = this;
      ctrl.$onInit = () => {
        const $target = $element.parent().children('div.md-list-item-text');
        $scope.hasOnlineLinks = () => ctrl.hasOnlineLinks();
        // Hide "Request Scan" link when this item has any online links
        if (ctrl.hasOnlineLinks()) {
          // Hide via CSS
          $target.children().eq(0).addClass("custom-requests-hide-request-scan");
        }
        $scope.isLoggedIn = () => ctrl.parentCtrl.isLoggedIn();
      };

      // Move custom element into prm-location element to match styles/spacing/etc
      ctrl.$postLink = () => {
        const $target = $element.parent().query('div.md-list-item-text');
        const $loginLink = $element.query(`primo-explore-custom-request-login-wrapper`).detach();
        const $electronicCopyText = $element.query(`primo-explore-custom-request-electronic-copy-available`).detach();
        $target.append($loginLink);
        // Insert "Item available electronically" in place
        $target.children().eq(1).after($electronicCopyText);
      };

      // Determine if this item has any online links
      ctrl.hasOnlineLinks = () => {
        const availableOnlineField = ctrl.parentCtrl.item.pnx.display["lds31"];
        const isAvailableOnline = availableOnlineField && availableOnlineField.some(type => type === "NYU_AVAILONLINE");
        return isAvailableOnline;
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
  .component('prmRequestServicesAfter', physicalItemsAlert);

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
  appendStatusEmbed();
}
