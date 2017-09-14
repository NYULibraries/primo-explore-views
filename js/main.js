import 'primo-explore-custom-actions';
import 'primo-explore-clickable-logo-to-any-link';
import 'primo-explore-custom-no-search-results';

import { viewName } from './viewName';
import { customActionsConfig } from './customActions';
import { clickableLogoLinkConfig } from './clickableLogoToAnyLink';

angular
  .module('customSearchBookmarkFilter', [])
  .controller('customSearchBookmarkFilterController', ['customSearchBookmarkFilterItems', '$scope', '$filter', function(items, $scope, $filter) {
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
  .component('customSearchBookmarkFilter', {
    controller: 'customSearchBookmarkFilterController',
    template: '<button ng-repeat="item in items" aria-label="{{ translate(item.description) }}" ng-click="goToUrl(translate(item.action))" class="button-with-icon bookmark-toolbar zero-margin md-button" type="button">'+
                '<prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{item.icon.set}}" icon-definition="{{item.icon.icon}}"></prm-icon>'+
                '<span class="custom_search_bookmark_filter_item">{{ translate(item.name) }}</span>'+
              '</button>'

  });


let app = angular.module('viewCustom', [
                                        'customActions',
                                        'clickableLogoToAnyLink',
                                        'customNoSearchResults',
                                        'customSearchBookmarkFilter'
                                      ]);

let customSearchBookmarkFilterConfig = {
  name: 'customSearchBookmarkFilterItems',
  config: [
    {
      name: "Collections Request System",
      description: "Go to Collections Request System",
      action: "https://nyhs.aeon.atlas-sys.com/aeon/",
      icon: {
        set: 'image',
        icon: 'ic_collections_bookmark_24px'
      }
    }
  ]
};


app
  .constant(customActionsConfig.name, customActionsConfig.config)
  .constant(clickableLogoLinkConfig.name, clickableLogoLinkConfig.config)
  .constant(customSearchBookmarkFilterConfig.name, customSearchBookmarkFilterConfig.config)
  .component('prmSearchBookmarkFilterAfter', {
    template: '<custom-search-bookmark-filter></custom-search-bookmark-filter>'
  })
  .value('customNoSearchResultsTemplateUrl', 'custom/' + viewName + '/html/noSearchResults.html')
