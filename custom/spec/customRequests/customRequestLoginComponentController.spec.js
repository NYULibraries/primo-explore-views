import {  
  customRequestLoginComponentController, 
} 
from '../../common/js/customRequests.js';

describe('customRequestLoginComponentController', () => {
  let $scope, $injector;
  let controller;
  beforeEach( () => {
    $scope = $scope || {};
    $injector = {
      get: jest.fn(_ => {return { login: jest.fn() }})
    };
    controller = new customRequestLoginComponentController($scope, $injector);
  });

  describe('$onInit', () => {
    beforeEach( () => {
      controller.$onInit();
      $scope.button.action($injector);
    });
    it('should have set the button on $scope', () => {
      expect($injector.get).toBeCalled();
      expect($scope.button.label).toEqual("Login to see request options");
      expect($scope.button.prmIconBefore.icon).toEqual("sign-in");
      expect($scope.button.prmIconBefore.set).toEqual("primo-ui");
    });
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