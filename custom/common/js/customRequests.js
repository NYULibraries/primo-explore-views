import customRequestsTemplate from 'Common/html/custom_requests_template.html';

angular
  // Name our module
  .module('customRequests', [])
  // "Login for options" button component
  .component('primoExploreCustomRequestLogin', {
    template: customRequestsTemplate,
    controller: customRequestLoginComponentController,
  })
  // "Request E-ZBorrow" and "Request ILL" button component
  .component('primoExploreCustomRequestButton', {
    template: customRequestsTemplate,
    controller: customRequestButtonComponentController,
  })
  // Implement with prmLocationItemAfter
  // This controller 
  //  - hides "Request Scan" when there are online links
  //  - hides "Request" and "Request Scan" buttons when item is unavailable
  //  - shows "Request ILL" component that links to ILLiad
  //  - shows "Login for options" component when logged out
  .controller('customRequestsController', customRequestsController);

// Controllers
customRequestButtonComponentController.$inject = ['$scope', '$window'];
function customRequestButtonComponentController($scope, $window) { 
  const ctrl = this;

  ctrl.$onInit = () => {
    const locationsCtrl = $scope.$parent.$ctrl.parentCtrl;

    $scope.button = ctrl.selectRequestButton(locationsCtrl);
  };

  ctrl.selectRequestButton = (locationsCtrl) => {
    const vid = locationsCtrl.configurationUtil.vid;
    const ezborrowLink = ctrl.getitLink(locationsCtrl.item, 'lln30');
    const illLinkNyush = ctrl.getitLink(locationsCtrl.item, 'lln31');
    const illLinkNyu = ctrl.getitLink(locationsCtrl.item, 'lln32');
    const isNyuVid = () => ["NYU","NYUAD"].includes(vid);
    const isNyushVid = () => ["NYUSH"].includes(vid);
    let requestButton;

    // If ezborrow link exists and vid is nyu or nyuad, use it
    if (ezborrowLink && isNyuVid()) {
      requestButton = ctrl.requestButton('Request E-ZBorrow', ezborrowLink);
    // If nyush ill link exists and vid and nyush, use it
    } else if (illLinkNyush && isNyushVid()) {
      requestButton = ctrl.requestButton('Request ILL', illLinkNyush);
    // If ill link exists use it
    } else if (illLinkNyu) {
      requestButton = ctrl.requestButton('Request ILL', illLinkNyu);
    } else {
      requestButton = ctrl.emptyButton();
    }

    // Use the empty button if there are no recognized links
    // hidden by CSS
    return requestButton;
  };

  ctrl.requestButton = (text, lln) => {
    return {
      label: text,
      prmIconAfter: externalLinkIcon,
      href: lln
    };
  };

  ctrl.emptyButton = () => {
    return {
      label: 'Blank button',
      prmIconAfter: null,
      href: null,
      id: 'blank-button'
    };
  };

  ctrl.getitLink = (item, lln) => {
    // We do a try/catch in case the structure of this data changes
    let getitLink;

    try {
      const localLink = item.delivery.link.filter(({ linkType }) => linkType.endsWith(lln) );
      getitLink = localLink[0].linkURL;
    } catch (error) {
      console.warn("primo-explore-custom-requests: Cannot find getitLink in pnx link " + lln);
    }
    return getitLink;
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
    ctrl.itemStatus = ctrl.getItemStatusName();
    $scope.hasOnlineLinks = () => ctrl.hasOnlineLinks();
    // $scope.isLoggedIn = () => ctrl.parent().isLoggedIn();
    // Use custom login module so we can mock the value out in testing
    $scope.isLoggedIn = () => primoExploreCustomLoginService.isLoggedIn;
    $scope.showRequestButton = () => ctrl.showRequestButton();

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

  ctrl.getItemStatusName = () => {
    return $scope.$parent.item._additionalData.itemstatusname;
  };

  // Abstracting this to a function so we can mock it easier in tests
  ctrl.parent = () => {
    return ctrl.parentCtrl;
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
    const availableOnlineField = ctrl.parent().item.pnx.search["lsr08"];
    const isAvailableOnline = availableOnlineField && availableOnlineField.some(type => type === "Z_9CSC_0A09_0NYU_0");
    // Cast undefined as a bool
    return !!isAvailableOnline;
  };

  ctrl.showRequestButton = () => {
    return primoExploreCustomLoginService.isLoggedIn && ctrl.isUnavailableItem();
  };

  ctrl.isUnavailableItem = () => {
    const isUnavailable = !checkIsAvailable(ctrl.getItemStatusName());
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

export { customRequestButtonComponentController };
export { customRequestLoginComponentController };
export { customRequestsController };
