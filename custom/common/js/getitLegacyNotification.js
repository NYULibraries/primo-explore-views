export default {
  template: /*html*/ `
      <getit-to-link-resolver-full></getit-to-link-resolver-full>
      <div ng-if="$ctrl.isSendTo" class="getit-to-link-resolver-full-container">
        <div class="section-head">
          <div layout="row" layout-align="center center">
            <h4 class="section-title md-title light-text">New Feature Alert!</h4>
              <md-divider flex class="md-primoExplore-theme"></md-divider>
          </div>
        </div>
        <div class="section-body">
          <div
            layout="row"
            layout-align="center center"
            class="bar alert-bar zero-margin-bottom"
          >
            <span class="bar-text margin-right-small">
              Don't see E-journals, E-books, or HathiTrust results, etc.? Use the
              <a href="#getit-full" ng-click="$ctrl.handleAnchor('getit-full', $event)">
                GetIt (Legacy Feature)
                <span class="sr-only">Skip to GetIt Legacy</span>
              </a>
              link below while we work to add those results to this new feature.
            </span>
          </div>
        </div>
      </div>
    `,
  controller: ['$anchorScroll', '$window', function ($anchorScroll, $window) {
    const ctrl = this;
    ctrl.$onInit = function () {
      ctrl.isSendTo = ctrl.parentCtrl.service.title === 'nui.brief.results.tabs.send_to';

      ctrl.handleAnchor = (id, $event) => {
        $event.preventDefault();
        // sets yOffsetProperty based on jQuery element height, then resets to default value
        $anchorScroll.yOffset = angular.element($window.document.querySelector(`md-toolbar.default-toolbar`));
        $anchorScroll(id);
        // focuses element
        angular.element($window.document.querySelector(`#${id} a`)).focus();
      };
    };
  }],
  bindings: {
    parentCtrl: '<',
  }
};