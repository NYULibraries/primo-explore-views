export let permalinkPlaceholder = angular
  .module('permalinkPlaceholder', [])
  .controller('permalinkPlaceholderController', ['$scope', '$location', function($scope, $location) {
    this.$onInit = () => {
      $scope.viewName = $location.search().vid.split('-NUI')[0];
    }
  }])
  .component('permalinkPlaceholder', {
    controller: 'permalinkPlaceholderController',
    template: `
              <div class="send-actions-content-item layout-column" layout="column" layout-align="center center">
                <md-content class="layout-fill layout-padding layout-wrap _md md-primoExplore-theme">
                  <div class="container">
                    <div class="row">
                      <div class="col-3">
                        <prm-icon style="z-index:1" icon-type="svg" svg-icon-set="alert" icon-definition="ic_warning_24px"></prm-icon>
                      </div>
                      <div class="col-9">
                        <p>The Permalinks feature isn’t available in BobCat Beta, but will be when we release the new BobCat.</p>
                        <p>Use <a ng-href="http://bobcat.library.nyu.edu/primo_library/libweb/action/search.do?vid={{ viewName }}">BobCat Classic</a> for persistent links to catalog items. </p>
                      </div>
                    </div>
                  </div>
                </md-content>
              </div>
              `

  });
