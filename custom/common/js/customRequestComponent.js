 export default {
  template: /*html*/ `
    <primo-explore-custom-requests ng-hide="hideCustomRequests()"
      layout="row"
      layout-align="end center"
      layout-wrap
      flex-xs="100"
    ></primo-explore-custom-requests>
  `,
  controller: ['$element', '$window', '$scope', function ($element, $window, $scope) {
    const ctrl = this;

    ctrl.$onInit = () => {
      // Hide default request options if there are online links
      const onlineLinks = angular.element($window.document).queryAll('#getit_link1_0 prm-view-online a');
      const requestOptions = angular.element($window.document).queryAll('prm-location-items .md-list-item-text');

      if (onlineLinks.length > 0) {
        Array.from(requestOptions).forEach((requestOption) => {
          requestOption.children().eq(2).css({ display: 'none' });
        });
      }
    };

    ctrl.$postLink = () => {
      const $target = $element.parent().query('div.md-list-item-text');
      const $el = $element.query(`primo-explore-custom-requests`).detach();
      $target.append($el);
    };

    $scope.hideCustomRequests = () => {
      const onlineLinks = angular.element($window.document).queryAll('#getit_link1_0 prm-view-online a');

      if (onlineLinks.length > 0) {
        return true;
      } else {
        return false;
      }
    };
  }]
};