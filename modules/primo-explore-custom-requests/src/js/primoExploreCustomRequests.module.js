import 'ng-attr';

import customRequestsController from './controllers/customRequestsController';
import primoExploreCustomRequestsConfigService from './services/customRequestsConfigService';
import customRequestsStateService from './services/customRequestsStateService';

import customRequestsTemplate from '../html/custom_requests_template.html';

angular
  .module('primoExploreCustomRequests', [
    'argshook.ngAttr'
  ])
  .config(['$httpProvider', function ($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    //Enable passing of cookies for CORS calls
    //Note: CORS will absolutely not work without this
    $httpProvider.defaults.withCredentials = true;
    //Remove the header containing XMLHttpRequest used to identify ajax call
    //that would prevent CORS from workincustomg
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
  .service('primoExploreCustomRequestsConfigService', primoExploreCustomRequestsConfigService)
  .component('primoExploreCustomRequests', {
    controller: customRequestsController,
    require: {
      parentCtrl: '^prmLocationItems'
    },
    template: customRequestsTemplate,
  })
  .service('primoExploreCustomRequestsStateService', customRequestsStateService);