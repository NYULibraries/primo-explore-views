// vid
let viewName = "NYHS-NUI";

import 'primo-explore-custom-actions';
import 'primo-explore-clickable-logo-to-any-link';
import 'primo-explore-custom-no-search-results';

import { customActionsConfig } from './customActions';
import { clickableLogoLinkConfig } from './clickableLogoToAnyLink';

angular
  .module('customBookmarkToolbar', [])
  .controller('customBookmarkToolbarController', ['customBookmarkToolbarItems', '$scope', '$filter', function(items, $scope, $filter) {
    this.$onInit = () => {
      $scope.items = items;
    }
    $scope.translate = (original) => {
      return original.replace(/\{(.+)\}/g, (match, p1) => $filter('translate')(p1));
    }
    $scope.goToUrl = (url) => {
      window.open(url, '_blank');
    }
  }])
  .component('customBookmarkToolbar', {
    controller: 'customBookmarkToolbarController',
    template: '<button ng-repeat="item in items" aria-label="{{ translate(item.description) }}" ng-click="goToUrl(translate(item.action))" class="button-with-icon bookmark-toolbar zero-margin md-button" type="button">'+
                '<prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{item.icon.set}}" icon-definition="{{item.icon.icon}}"></prm-icon>'+
                '<span class="customBookmarkToolbarItem">{{ translate(item.name) }}</span>'+
              '</button>'

  });


let app = angular.module('viewCustom', [
                                        'customActions',
                                        'clickableLogoToAnyLink',
                                        'customNoSearchResults',
                                        'customBookmarkToolbar'
                                      ]);

let customBookmarkToolbarConfig = {
  name: 'customBookmarkToolbarItems',
  config: [
    {
      name: "Collections Request System",
      description: "Go to Collections Request System",
      action: "https://nyhs.aeon.atlas-sys.com/aeon/",
      icon: {
        set: 'social',
        icon: 'ic_person_outline_24px'
      }
    }
  ]
};


app
  .constant(customActionsConfig.name, customActionsConfig.config)
  .constant(clickableLogoLinkConfig.name, clickableLogoLinkConfig.config)
  .constant(customBookmarkToolbarConfig.name, customBookmarkToolbarConfig.config)
  .component('prmSearchBookmarkFilterAfter', {
    template: '<custom-bookmark-toolbar></custom-bookmark-toolbar>'
  })
  .value('customNoSearchResultsTemplateUrl', 'custom/' + viewName + '/html/noSearchResults.html')
