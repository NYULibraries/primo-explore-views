import { 
  customRequestButtonComponentController, 
  customRequestLoginComponentController, 
  customRequestsController
} 
from '../common/js/customRequests.js';

import { setupScope, lln30, lln31, lln32 } from './customRequests.helpers.js';

describe('customRequestIllComponentController', () => {
  let $scope, $window;
  let controller, vid, locationsCtrl;
  beforeEach( () => {
    $window = {
      open: () => true,
    };
    controller = new customRequestButtonComponentController($scope, $window);
  });

  describe('selectRequestButton', () => {
    let requestButton;
    describe('when E-ZBorrow link exists', () => {
      beforeAll( () => {
        vid = 'NYU'
        $scope = setupScope([lln30, lln31, lln32], vid);
        locationsCtrl = $scope.$parent.$ctrl.parentCtl;
      });
      beforeEach( () => {
        requestButton = controller.selectRequestButton(locationsCtrl);
      });
      it('should return an E-ZBorrow button', () => {
        expect(requestButton.label).toEqual("Request E-ZBorrow");
        expect(requestButton.href).toEqual("https://library.nyu.edu/lln30");
        expect(requestButton.prmIconAfter.icon).toEqual("ic_open_in_new_24px");
        expect(requestButton.prmIconAfter.set).toEqual("action");
      });
    });
    describe('when NYUSH ILL link exists', () => {
      
      describe('and vid is NYUSH', () => {
        beforeAll( () => {
          $scope = setupScope([lln32, lln31], "NYUSH");
          locationsCtrl = $scope.$parent.$ctrl.parentCtl;
        });
        beforeEach( () => {
          requestButton = controller.selectRequestButton(locationsCtrl);
        });
        it('should return a Request ILL button and have the NYUSH link', () => {
          expect(requestButton.label).toEqual("Request ILL");
          expect(requestButton.href).toEqual("https://library.nyu.edu/lln32");
          expect(requestButton.prmIconAfter.icon).toEqual("ic_open_in_new_24px");
          expect(requestButton.prmIconAfter.set).toEqual("action");
        });
      });
      describe('and vid is not NYUSH', () => {
        beforeAll( () => {
          $scope = setupScope([lln32, lln31], "HSL");
          locationsCtrl = $scope.$parent.$ctrl.parentCtl;
        });
        beforeEach( () => {
          requestButton = controller.selectRequestButton(locationsCtrl);
        });
        it('should return a Request ILL button but with the NYU link', () => {
          expect(requestButton.label).toEqual("Request ILL");
          expect(requestButton.href).toEqual("https://library.nyu.edu/lln31");
          expect(requestButton.prmIconAfter.icon).toEqual("ic_open_in_new_24px");
          expect(requestButton.prmIconAfter.set).toEqual("action");
        });
      });
    });
    describe('when NYU ILL link exists', () => {
      beforeAll( () => {
        $scope = setupScope([lln31], vid);
        locationsCtrl = $scope.$parent.$ctrl.parentCtl;
      });
      beforeEach( () => {
        requestButton = controller.selectRequestButton(locationsCtrl);
      });
      it('should return a Request ILL button and have the NYU link', () => {
        expect(requestButton.label).toEqual("Request ILL");
        expect(requestButton.href).toEqual("https://library.nyu.edu/lln31");
        expect(requestButton.prmIconAfter.icon).toEqual("ic_open_in_new_24px");
        expect(requestButton.prmIconAfter.set).toEqual("action");
      });
    });
    describe('when none of the expected links exist', () => {
      beforeAll( () => {
        $scope = setupScope([], vid);
        locationsCtrl = $scope.$parent.$ctrl.parentCtl;
      });
      beforeEach( () => {
        requestButton = controller.selectRequestButton(locationsCtrl);
      });
      it('should return an empty button', () => {
        expect(requestButton.label).toEqual("Blank button");
        expect(requestButton.href).toBe(null);
        expect(requestButton.id).toBe("blank-button");
        expect(requestButton.prmIconAfter).toBe(null);
      });
    })
  });

  describe('isNyush', () => {
    beforeAll( () => {
      $scope = {};
    });
    describe('when vid is NYUSH', () => {
      it ('should be true', () => {
        expect(controller.isNyush('NYUSH')).toBe(true);
      });
    });
    describe('when vid is not NYUSH', () => {
      it ('should be false', () => {
        expect(controller.isNyush('HSL')).toBe(false);
      });
    });
  });

  // requestButton
  // emptyButton
  // getitLink
  // handleClick
  
});