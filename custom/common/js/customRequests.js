import customRequestsTemplate from 'Common/html/custom_requests_template.html';

angular
  // Name our module
  .module('customRequests', [])
  // "Login for options" button component
  .component('primoExploreCustomRequestLogin', {
    template: customRequestsTemplate,
    controller: customRequestLoginComponentController,
  })
  // "Request ILL" button component
  .component('primoExploreCustomRequestIll', {
    template: customRequestsTemplate,
    controller: customRequestIllComponentController,
  })
  // Implement with prmLocationItemAfter
  // This controller 
  //  - hides "Request Scan" when there are online links
  //  - hides "Request" and "Request Scan" buttons when item is unavailable
  //  - shows "Request ILL" component that links to ILLiad
  //  - shows "Login for options" component when logged out
  .controller('customRequestsController', customRequestsController);

// Controllers
customRequestIllComponentController.$inject = ['$scope', '$window'];
function customRequestIllComponentController($scope, $window) { 
  const ctrl = this;

  ctrl.$onInit = () => {
    const locationsCtrl = $scope.$parent.$ctrl.parentCtrl;
    const illLink = ctrl.getitLink(locationsCtrl.item);

    $scope.button = {
      label: 'Request ILL',
      prmIconAfter: externalLinkIcon,
      href: illLink,
    };
  };

  ctrl.getitLink = (item) => {
    // We do a try/catch in case the structure of this data changes
    try {
      const getitLink = item.delivery.link.filter(({ displayLabel }) => displayLabel === "lln40" );
      return getitLink[0].linkURL;
    } catch (error) {
      console.warn("primo-explore-custom-requests: Cannot find getitLink in pnx link lln40.");
      return '';
    }
  };

  ctrl.handleClick = (event, { href }) => {
    event.stopPropagation();
    href && $window.open(href);
  };

  const externalLinkIcon = {
    icon: "ic_open_in_new_24px",
    set: "action",
  };
  
}

customRequestLoginComponentController.$inject = ['$scope', '$injector'];
function customRequestLoginComponentController($scope, $injector) {
  const ctrl = this;

  ctrl.$onInit = () => {
    $scope.button = {
      label: 'Login to see request options',
      action: ($injector) => $injector.get('primoExploreCustomLoginService').login(),
      prmIconBefore: loginIcon,
    };
  };

  ctrl.handleClick = (event, { action }) => {
    event.stopPropagation();
    action && action($injector);
  };

  const loginIcon = {
    set: "primo-ui",
    icon: "sign-in",
  };
}

customRequestsController.$inject = ['$scope', '$element', 'primoExploreCustomLoginService'];
function customRequestsController($scope, $element, primoExploreCustomLoginService) {
  const ctrl = this;

  ctrl.$onInit = () => {
    const $target = $element.parent().children('div.md-list-item-text');
    // Fetch the item status text from the parent
    ctrl.itemStatus = $scope.$parent.item._additionalData.itemstatusname;
    $scope.hasOnlineLinks = () => ctrl.hasOnlineLinks();
    // $scope.isLoggedIn = () => ctrl.parentCtrl.isLoggedIn();
    // Use custom login module so we can mock the value out in testing
    $scope.isLoggedIn = () => primoExploreCustomLoginService.isLoggedIn;
    $scope.showRequestILL = () => ctrl.showRequestILL();

    // Hide "Request Scan" link when this item has any online links
    if (ctrl.hasOnlineLinks()) {
      // Hide via CSS
      $target.children().eq(0).addClass("custom-requests-hide-request-scan");
    }
    // Hide "Request Scan" and "Request" links when this item is unavailable
    if (ctrl.isUnavailableItem()) {
      $target.children().eq(0).addClass("custom-requests-hide-request").addClass("custom-requests-hide-request-scan");
    }
  
  };

  // Move custom element into prm-location element to match styles/spacing/etc
  ctrl.$postLink = () => {
    const $target = $element.parent().query('div.md-list-item-text');
    const $loginLink = $element.query(`primo-explore-custom-request-wrapper`).detach();
    $target.append($loginLink);
  };

  // Determine if this item has any online links
  ctrl.hasOnlineLinks = () => {
    // Item has online links if pnx/search/lsr08 exists and contains the code Z_9CSC_0A09_0NYU_0
    const availableOnlineField = ctrl.parentCtrl.item.pnx.search["lsr08"];
    const isAvailableOnline = availableOnlineField && availableOnlineField.some(type => type === "Z_9CSC_0A09_0NYU_0");
    // Cast undefined as a bool
    return !!isAvailableOnline;
  };

  ctrl.showRequestILL = () => {
    return primoExploreCustomLoginService.isLoggedIn && ctrl.isUnavailableItem();
  };

  ctrl.isUnavailableItem = () => {
    const isUnavailable = !checkIsAvailable(ctrl.itemStatus);
    return isUnavailable;
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

}
