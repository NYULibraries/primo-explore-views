import { 
  customRequestsController
} 
from '../../common/js/customRequests.js';

import { setupParentCtrl, lsr08_online, lsr08_no_online } from '../customRequests.helpers.js';

describe('customRequestsController', () => {
  let $scope, $element, controller, primoExploreCustomLoginService, parentCtrl, loggedIn;
  beforeEach( () => {
    $scope = $scope || {};
    $element = { parent: jest.fn(_ => { return { children: jest.fn() }; }) };
    parentCtrl = parentCtrl || {};
    loggedIn = loggedIn || false;
    primoExploreCustomLoginService = { isLoggedIn: loggedIn };
    controller = new customRequestsController($scope, $element, primoExploreCustomLoginService);
    jest.spyOn(controller, 'parent').mockReturnValue(parentCtrl);
  });

  describe('hasOnlineLinks', () => {
    describe('when item contains data with the expected value', () => {
      beforeAll( () => { 
        parentCtrl = setupParentCtrl(lsr08_online);
      });
      it('has online links', () => {
        expect(controller.hasOnlineLinks()).toBe(true);
      });
    });
    describe('when item DOES NOT contain data with the expected value', () => {
      beforeAll( () => { 
        parentCtrl = setupParentCtrl(lsr08_no_online);
      });
      it('does not have online links', () => {
        expect(controller.hasOnlineLinks()).toBe(false);
      });
    });

  });

  describe('showRequestButton', () => {
    describe('when user is logged out', () => {
      beforeAll( () => {
        loggedIn = false;
      });
      beforeEach( () => {
        jest.spyOn(controller, 'getItemStatusName').mockReturnValue("Billed as Lost");
      });
      it('should return false to hide request buttons', () => {
        expect(controller.showRequestButton()).toBe(false);
      });
    });
    describe('when user is logged in', () => {
      beforeAll( () => {
        loggedIn = true;
      });
      describe('and item is unavailable', () => {
        beforeEach( () => {
          jest.spyOn(controller, 'getItemStatusName').mockReturnValue("Billed as Lost");
        });
        it('should return true to show a request button', () => {
          expect(controller.showRequestButton()).toBe(true);
        });
      });
      describe('but item is NOT unavailable', () => {
        beforeEach( () => {
          jest.spyOn(controller, 'getItemStatusName').mockReturnValue("Available");
        });
        it('should return false to hide request buttons', () => {
          expect(controller.showRequestButton()).toBe(false);
        });
      });
    });
  });

  describe('isUnavailableItem', () => {
    describe('when item has an unavailable status', () => {
      beforeEach( () => {
        jest.spyOn(controller, 'getItemStatusName').mockReturnValue("Billed as Lost");
      });
      it('should return true', () => {
        expect(controller.isUnavailableItem()).toBe(true);
      });
    });
    describe('when item does not have an unavailable status', () => {
      beforeEach( () => {
        jest.spyOn(controller, 'getItemStatusName').mockReturnValue("Available");
      });
      it('should return false', () => {
        expect(controller.isUnavailableItem()).toBe(false);
      });
    });
  });
  
});