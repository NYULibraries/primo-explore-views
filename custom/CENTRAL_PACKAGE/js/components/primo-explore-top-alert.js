// utilize with prm-top-bar-after
export default {
  template: /*html*/ `
    <primo-explore-top-alert>
      <md-toolbar>
        <div class="bar alert-bar" layout="row" layout-align="center center">
          <span class="bar-text">
            July 18 - 30: We are doing behind-the-scenes maintenance. No downtime expected.
            <a href="https://nyulibraries.statuspage.io/incidents/fvf6mc1nprcg" target="_blank" class="arrow-link md-primoExplore-theme">
              <span>See details and updates</span>
              <span class="sr-only">(opens in a new window)</span>
              <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new">
              </prm-icon>
            </a>
          </span>
        </div>
      </md-toolbar>
    </primo-explore-top-alert>`,
  controller: ['$element', function ($element) {
    const ctrl = this;
    ctrl.$postLink = function () {
      const $primoExploreMain = $element.parent().parent().parent();
      const $el = $element.query(`primo-explore-top-alert`).detach();
      $primoExploreMain.prepend($el);
    };
  }],
};