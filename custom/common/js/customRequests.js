import customRequestsTemplate from 'Common/html/custom_requests_template.html';
angular
  // Name our module
  .module('customRequests', [])
  // "Login for options" button component
  .component('primoExploreCustomRequestLogin', {
    template: customRequestsTemplate,
    controller: ['$scope', '$injector', '$filter', function($scope, $injector, $filter) {
      const ctrl = this;
      ctrl.$onInit = () => {
        $scope.button = {
          label: 'Login to see request options',
          action: ($injector) => $injector.get('primoExploreCustomLoginService').login(),
          prmIconBefore: loginIcon,
        };
      };

      // Not currently in use
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
  // "Request ILL" button component
  .component('primoExploreCustomRequestIll', {
    template: customRequestsTemplate,
    controller: ['$scope', '$window', function($scope, $window) { 
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
  // Implement with prmLocationItemAfter
  // This controller 
  //  - hides "Request Scan" when there are online links
  //  - show "Item available electronically" when there are online links
  //  - shows "Login for options" component when logged out
  .controller('customRequestsController', ['$scope','$element', function ($scope, $element) {
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
      const availableOnlineField = ctrl.parentCtrl.item.pnx.display["lds29"];
      const isAvailableOnline = availableOnlineField && availableOnlineField.some(type => type === "NYU_AVAILONLINE");
      // Cast undefined as a bool
      return !!isAvailableOnline;
    };

  }])
  // Implement with prmServiceButtonAfter
  // This controller
  //  - hides "Request" button when item is unavailable
  //  - shows "Request ILL" component that links to ILLiad
  .controller('customRequestsILLController', ['$scope','$element', function ($scope, $element) {
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
  }]);

