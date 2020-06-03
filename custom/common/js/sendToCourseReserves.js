// utilize with prm-search-result-availability-line-after
angular
  // Name our module
  .module('sendToCourseReserves', [])
  .constant('sendToCourseReservesConfig', {
    displayText: 'Add to Course Reserves (New Feature)',
    actionLinkDisplayLabel: 'lln41',
    showLinkTab: "crp",
    icon: {
      set: 'content',
      icon: 'ic_add_box_24px',
    },
  })
  // Template for send to course reserves link
  .component('sendToCourseReserves', {
    template: /*html*/ `
      <div ng-if="showLink()" layout="row" layout-align="start start" class="layout-align-start-start layout-row">
        <div layout="flex" class="layout-row">
          <prm-icon availability-type="" icon-type="svg" svg-icon-set="{{config.icon.set}}" icon-definition="{{config.icon.icon}}"></prm-icon>
          <button data-href="" ng-click="goToUrl(courseReservesLink())" class="neutralized-button arrow-link-button md-button md-primoExplore-theme md-ink-ripple">
            <span class="button-content">{{translate(config.displayText)}}</span>
            <prm-icon external-link="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>
            <prm-icon link-arrow="" icon-type="svg" svg-icon-set="primo-ui" icon-definition="chevron-right"></prm-icon>
          </button>
        </div>
      </div>
    `,
    // Controller for above scoped template
    controller: ['sendToCourseReservesConfig', '$scope', '$location', '$filter', function(sendToCourseReservesConfig, $scope, $location, $filter) {
      const ctrl = this;
      ctrl.$onInit = () => {
        $scope.config = sendToCourseReservesConfig;
      };
      // Use the translate filter to pull back office values
      $scope.translate = (original) => {
        return original.replace(/\{(.+?)\}/g, (match, p1) => $filter('translate')(p1));
      };
      // Only show the link if the current tab is the CourseReadyPortal, i.e. crp
      $scope.showLink = () => $location.search().tab === $scope.config.showLinkTab;
      // Get the link from the delivery links matching the link number
      $scope.courseReservesLink = () => {
        try {
          return ctrl.prmBriefResultContainer.item.delivery.link.filter(link =>
            link["displayLabel"] === $scope.config.actionLinkDisplayLabel
          )[0]["linkURL"];
        } catch (e) {
          return '#';
        }
      };
      // On click option for the button
      $scope.goToUrl = (url) => {
        window.open(url, '_blank');
      };
    }],
    // Make sure to include the below controller so we can pull the delivery links
    require: {
      prmBriefResultContainer: '^prmBriefResultContainer'
    },
  });
