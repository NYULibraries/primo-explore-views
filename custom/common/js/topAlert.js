// utilize with prm-top-bar-after
export default {
  template: /*html*/ `
    <primo-explore-top-alert>
      <div ng-if="translate(config.alert_text) || translate(config.alert_url)" class="bar alert-bar" layout="row" layout-align="center center">
        <span class="bar-text">
          <span ng-if="translate(config.alert_text)" ng-bind-html="translate(config.alert_text)"></span>
          <a ng-if="translate(config.alert_url)" href="{{translate(config.alert_url)}}"  target="_blank" class="arrow-link md-primoExplore-theme">
            <span>{{config.alert_see_more_text}}</span>
            <span class="sr-only">(opens in a new window)</span>
            <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new">
            </prm-icon>
          </a>
        </span>
      </div>
    </primo-explore-top-alert>`,
  controller: ['customTopAlertConfig', '$scope', '$element', '$filter', function (customTopAlertConfig, $scope, $element, $filter) {
    const ctrl = this;
    ctrl.$onInit = () => {
      $scope.config = customTopAlertConfig;
    };
    ctrl.$postLink = function () {
      const $primoExploreMain = $element.parent().parent().parent();
      const $el = $element.query(`primo-explore-top-alert`).detach();
      $primoExploreMain.prepend($el);
    };
    $scope.translate = (original) => {
      const translation = original.replace(/\{(.+?)\}/g, (_, p1) => $filter('translate')(p1));
      const blank_value = original.replace(/\{(.+?)\.(.+?)\}/g, (_, p1, p2) => p2.replace(/_/g, " "));
      // Return blank string if 
      // the value doesn't exist, 
      // the value equals the default blank value (i.e. custom.banner_value1 == banner value1), 
      // or the value is a blank string
      // Otherwise return the translated value
      return (!translation || translation == blank_value || !translation.replace(/\s/g, '').length) ? '' : translation;
    };
  }],
};

