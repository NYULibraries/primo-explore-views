// utilize with prm-top-bar-after
export default {
  template: /*html*/ `
    <primo-explore-top-alert ng-hide="isHidden">
      <div class="bar alert-bar" layout="row" layout-align="center center">
        <span class="bar-text">
          <span ng-bind-html="translate(config.alert_text)"></span>
          <a href="{{translate(config.alert_url)}}"  target="_blank" class="arrow-link md-primoExplore-theme">
            <span>{{config.alert_see_more_text}}</span>
            <span class="sr-only">(opens in a new window)</span>
            <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new">
            </prm-icon>
          </a>
        </span>
      </div>
    </primo-explore-top-alert>`,
  controller: ['customTopAlertConfig', '$scope', '$element', '$filter', '$timeout', function(customTopAlertConfig, $scope, $element, $filter, $timeout) {
    const ctrl = this;
    // Show alert after a second if there is an alert value
    $timeout( function(){ $scope.showAlert(); }, 1000);

    ctrl.$onInit = () => {
      $scope.isHidden = true;
      $scope.config = customTopAlertConfig;
    };
    ctrl.$postLink = function() {
      const $primoExploreMain = $element.parent().parent().parent();
      const $el = $element.query(`primo-explore-top-alert`).detach();
      $primoExploreMain.prepend($el);      
    };
    $scope.showAlert = function() {
      const alert_text = customTopAlertConfig.alert_text;
      const blank_value = alert_text.replace(/\{(.+?)\.(.+?)\}/g, (_, p1, p2) => p2.replace(/_/g, " "));
      const translation = $scope.translate(alert_text);
      // Return FALSE if 
      // the value doesn't exist, 
      // the value equals the default blank value (i.e. custom.banner_value1 == banner value1), 
      // or the value is a blank string
      // Otherwise return TRUE
      const showAlert = !(!translation || translation == blank_value || !translation.replace(/\s/g, '').length);
      if (showAlert) {
        $scope.isHidden = false;
      }
      return showAlert;
    };
    $scope.translate = (original) => {
      return original.replace(/\{(.+?)\}/g, (_, p1) => $filter('translate')(p1));
    };
  }],
};

