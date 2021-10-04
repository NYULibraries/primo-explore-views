import { 
  customRequestsController
} 
from '../../common/js/customRequests.js';

import { setupScope, setupItem, lln30, lln31, lln32 } from '../customRequests.helpers.js';

describe('customRequestsController', () => {
  let $scope, $window;
  let controller, vid, locationsCtrl;
  beforeEach( () => {
    $scope = $scope || {};
    $window = {
      open: jest.fn(),
    };
    controller = new customRequestsController($scope, $window);
  });

  it('should be tru', () => {
    expect(true).toBe(true)
  })

  // hasOnlineLinks
  // showRequestButton
  // isUnavailableItem
  // checkIsAvailable
  
});