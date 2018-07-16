export let permalinkPlaceholder = angular
  .module('permalinkPlaceholder', [])
  .controller('permalinkPlaceholderController', ['$scope', '$location', function($scope, $location) {
    this.$onInit = () => {
      $scope.viewName = $location.search().vid.split('-NUI')[0];
    };
    $scope.hidePermalink = () => {
      return !['NYU','NYUAD','NYUSH','CU','NYHS'].includes($location.search().vid);
    };
  }])
  .component('permalinkPlaceholder', {
    controller: 'permalinkPlaceholderController',
    template: `
              <div ng-if="hidePermalink()" class="send-actions-content-item layout-column" layout="column" layout-align="center center">
                <md-content class="layout-fill layout-padding layout-wrap _md md-primoExplore-theme">
                  <div class="container">
                    <md-content layout="row">
                      <div flex="10" layout="column" layout-align="center center">
                        <prm-icon style="z-index:1" icon-type="svg" svg-icon-set="alert" icon-definition="ic_warning_24px"></prm-icon>
                      </div>
                      <div flex="90" layout="column">
                        <p>The Permalinks feature isn’t available in BobCat Beta, but will be when we release the new BobCat.</p>
                        <p>Use  <a ng-href="http://bobcat.library.nyu.edu/primo_library/libweb/action/search.do?vid={{ viewName }}">BobCat Classic</a> for persistent links to catalog items. </p>
                      </div>
                    </md-content>
                  </div>
                </md-content>
              </div>
              `

  });
