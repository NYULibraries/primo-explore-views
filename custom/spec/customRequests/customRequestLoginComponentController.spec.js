import {  
  customRequestLoginComponentController, 
} 
from '../../common/js/customRequests.js';

import { setupScope, setupItem, lln30, lln31, lln32 } from '../customRequests.helpers.js';

describe('customRequestLoginComponentController', () => {
  let $scope, $window;
  let controller, vid, locationsCtrl;
  beforeEach( () => {
    $scope = $scope || {};
    $window = {
      open: jest.fn(),
    };
    controller = new customRequestLoginComponentController($scope, $window);
  });

  describe('handleClick', () => {
    let handleClick;
    const e = {
      stopPropagation: jest.fn(),
    }
    const buttonObj = {
      action: jest.fn(),
    }
    beforeEach( () => {
      handleClick = controller.handleClick(e, buttonObj);
    });
    it('should call action and return undefined', () => {
      expect(e.stopPropagation).toBeCalled();
      expect(buttonObj.action).toBeCalled();
      expect(handleClick).toBe(undefined);
    });
  });
  
});