customRequestsController.$inject = ['$window', '$scope', '$injector', 'primoExploreCustomRequestsStateService', 'primoExploreCustomRequestsConfigService', '$timeout', '$filter'];
export default function customRequestsController($window, $scope, $injector, stateService, config, $timeout, $filter) {
  const ctrl = this;

  ctrl.translate = original => original.replace(/\{(.+?)\}/g, (match, p1) => $filter('translate')(p1));

  ctrl.handleClick = (event, { action, href, label }) => {
    event.stopPropagation();
    href && $window.open(href);
    action && action($injector);
    !(href || action) && console.warn(`primo-explore-custom-requests: Button "${label}" has not been assigned either an 'action' or 'href' property`);
  };

  ctrl.hideAllRequests = () => {
    const $els = angular.element($window.document).queryAll('prm-location-items .md-list-item-text');

    Array.from($els).forEach(($el) => {
      $el.children().eq(2).css({ display: 'none' });
    });
  };

  ctrl.revealRequest = idx => {
    const $el = angular.element($window.document).queryAll('prm-location-items .md-list-item-text')[idx];
    $el && $el.children().eq(2).css({ display: 'flex' });
  };

  ctrl.hideRequest = idx => {
    const $el = angular.element($window.document).queryAll('prm-location-items .md-list-item-text')[idx];
    $el && $el.children().eq(2).css({ display: 'none' });
  };

  ctrl.revealCustomRequest = (id, idx) => {
    const $el = angular.element($window.document).queryAll(`.custom-request-${id}`)[idx];
    $el && $el.parent().css({ display: 'flex' });
  };

  ctrl.revealDivider = (id, idx) => {
    const $el = angular.element($window.document).queryAll(`.custom-request-${id}`)[idx];
    $el && $el.parent().query('.skewed-divider').css({ display: 'block' });
  };

  ctrl.revealNoButtonText = idx => {
    const $el = angular.element($window.document).queryAll(`.custom-requests-empty`)[idx];
    $el && $el.css({ display: 'block' });
  };

  ctrl.generateButtons = ({ item, user }) => {
    const { buttonIds, buttonGenerators } = config;

    const buttons = buttonIds.reduce((arr, id) => {
      const buttonGenerator = buttonGenerators[id];
      return [...arr, { id, ...buttonGenerator({ item, user, config }) }];
    }, []);

    return buttons;
  };

  // sets in state whether the user is loggedIn,'
  // then generates the buttons with buttonIds and sets those buttons in the state.
  // if fetchPDS fails, then console logs error and sets state with userFailure, buttons, and user
  ctrl.setButtonsInState = () => {
    let loggedIn, promise;
    if (ctrl.customLoginService) {
      loggedIn = ctrl.customLoginService.isLoggedIn;
      promise = loggedIn ? ctrl.customLoginService.fetchPDSUser() : Promise.resolve(undefined);
      stateService.setState({ loggedIn });
    } else {
      promise = Promise.resolve(undefined);
    }

    const { item } = stateService.getState();
    return promise
      .then(user => {
        const buttons = ctrl.generateButtons({ item, user });
        stateService.setState({ buttons, user });
      })
      .catch(err => {
        console.error(err);
        stateService.setState({ userFailure: true, buttons: undefined, user: null });
      });
  };

  ctrl.refreshControllerValues = () => {
    const { user, userFailure, buttons, loggedIn } = stateService.getState();
    Object.assign(ctrl, { user, userFailure, buttons, loggedIn });
  };

  ctrl.refreshReveals = () => {
    const { user, item, items } = stateService.getState();
    // construct { key: [true, false], key2: [true, true], etc. }
    const revealsMap = config.buttonIds.reduce((res, buttonKey) => ({
      ...res,
      [buttonKey]: config.showCustomRequests[buttonKey]({ item, items, user, config })
    }), {});

    // try to turn config into: [['ill', 'login'], ['ezborrow'] ] etc.
    const revealsLists = config.buttonIds.reduce((res, buttonKey) => {
      revealsMap[buttonKey].forEach((reveal, holdingIdx) => {
        reveal ? res[holdingIdx].push(buttonKey) : null;
      });
      return res;
    }, items.map(() => []));

    // go through revealsList and reveal based on key (buttonId) and position (holdingIdx)
    revealsLists.forEach((list, holdingIdx) => {
      list.forEach((buttonKey, buttonIdx) => {
        ctrl.revealCustomRequest(buttonKey, holdingIdx);
        if (buttonIdx !== list.length - 1) {
          ctrl.revealDivider(buttonKey, holdingIdx);
        }
      });

      if (list.length === 0 && config.hideDefaultRequests({ item, items, user, config })[holdingIdx]) {
        ctrl.revealNoButtonText(holdingIdx);
      }
    });
  };

  ctrl.DOMRefresh = () => {
    $scope.$applyAsync(() => {
      ctrl.refreshControllerValues();
      // wrapped in $timeout because DOM updates after $digest completes.
      // $timeout ensures that this occurs after DOM update, during the subsequent $digest cycle.
      $timeout(() => {
        ctrl.refreshReveals();
      });
    });
  };

  ctrl.getCurrLocId = () => `${ctrl.parentCtrl.currLoc.location.mainLocation}${ctrl.parentCtrl.currLoc.location.subLocationCode}`;

  ctrl.$postLink = () => {
    ctrl.hideAllRequests();
  };

  ctrl.$onInit = () => {
    ctrl.customLoginService = $injector.has('primoExploreCustomLoginService') && $injector.get('primoExploreCustomLoginService');
    const item = ctrl.parentCtrl.item;
    const items = ctrl.parentCtrl.currLoc.items;

    stateService.setState({ currLocId: ctrl.getCurrLocId() });
    Object.assign(ctrl, {
      userLoadingText: config.userLoadingText,
      userFailureText: config.userFailureText,
      noButtonsText: config.noButtonsText,
    });

    const { items: stateItems, item: stateItem } = stateService.getState();
    if (stateItems !== items || stateItem !== item) {
      stateService.setState({ items, item });

      ctrl.setButtonsInState().then(() => {
        const { item, items, user } = stateService.getState();
        const props = { user, item, items, config };

        config.hideDefaultRequests(props).forEach((toHide, idx) => !toHide ? ctrl.revealRequest(idx) : null);
        ctrl.DOMRefresh();
      });
    }
  };

  ctrl.$doCheck = () => {
    if (stateService.getState().currLocId !== ctrl.getCurrLocId()) {
      ctrl.$onInit();
      ctrl.$postLink();
    }
  };
}