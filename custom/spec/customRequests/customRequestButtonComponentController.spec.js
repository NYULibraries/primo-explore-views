import { 
  customRequestButtonComponentController, 
} 
from '../../common/js/customRequests.js';

import { setupScope, setupItem, lln30, lln31, lln32 } from '../customRequests.helpers.js';

describe('customRequestIllComponentController', () => {
  let $scope, $window;
  let controller, vid, locationsCtrl;
  beforeEach( () => {
    $scope = $scope || {};
    $window = {
      open: jest.fn(),
    };
    controller = new customRequestButtonComponentController($scope, $window);
  });

  describe('selectRequestButton', () => {
    let selectRequestButton;
    describe('when E-ZBorrow link exists', () => {
      beforeEach( () => {
        selectRequestButton = controller.selectRequestButton(locationsCtrl);
      });
      describe('and vid is NYU', () => {
        beforeAll( () => {
          vid = 'NYU';
          $scope = setupScope([lln30, lln31, lln32], vid);
          locationsCtrl = $scope.$parent.$ctrl.parentCtl;
        });
        
        it('should return an E-ZBorrow button', () => {
          expect(selectRequestButton.label).toEqual("Request E-ZBorrow");
          expect(selectRequestButton.href).toEqual("https://library.nyu.edu/lln30");
          expect(selectRequestButton.prmIconAfter.icon).toEqual("ic_open_in_new_24px");
          expect(selectRequestButton.prmIconAfter.set).toEqual("action");
        });
      });
      describe('and vid is NYUAD', () => {
        beforeAll( () => {
          vid = 'NYUAD';
          $scope = setupScope([lln30, lln31, lln32], vid);
          locationsCtrl = $scope.$parent.$ctrl.parentCtl;
        });
        
        it('should return an E-ZBorrow button', () => {
          expect(selectRequestButton.label).toEqual("Request E-ZBorrow");
          expect(selectRequestButton.href).toEqual("https://library.nyu.edu/lln30");
          expect(selectRequestButton.prmIconAfter.icon).toEqual("ic_open_in_new_24px");
          expect(selectRequestButton.prmIconAfter.set).toEqual("action");
        });
      });
      describe('but vid is NYUSH', () => {
        beforeAll( () => {
          vid = 'NYUS';
          $scope = setupScope([lln30, lln31, lln32], vid);
          locationsCtrl = $scope.$parent.$ctrl.parentCtl;
        });
        
        it('should NOT return an E-ZBorrow button', () => {
          expect(selectRequestButton.label).toEqual("Request ILL");
          expect(selectRequestButton.href).toEqual("https://library.nyu.edu/lln32");
          expect(selectRequestButton.prmIconAfter.icon).toEqual("ic_open_in_new_24px");
          expect(selectRequestButton.prmIconAfter.set).toEqual("action");
        });
      });
    });
    describe('when NYUSH ILL link exists', () => {
      describe('and vid is NYUSH', () => {
        beforeAll( () => {
          $scope = setupScope([lln31, lln32], "NYUSH");
          locationsCtrl = $scope.$parent.$ctrl.parentCtl;
        });
        beforeEach( () => {
          selectRequestButton = controller.selectRequestButton(locationsCtrl);
        });
        it('should return a Request ILL button and have the NYUSH link', () => {
          expect(selectRequestButton.label).toEqual("Request ILL");
          expect(selectRequestButton.href).toEqual("https://library.nyu.edu/lln31");
          expect(selectRequestButton.prmIconAfter.icon).toEqual("ic_open_in_new_24px");
          expect(selectRequestButton.prmIconAfter.set).toEqual("action");
        });
      });
      describe('and vid is not NYUSH', () => {
        beforeAll( () => {
          $scope = setupScope([lln32, lln31], "HSL");
          locationsCtrl = $scope.$parent.$ctrl.parentCtl;
        });
        beforeEach( () => {
          selectRequestButton = controller.selectRequestButton(locationsCtrl);
        });
        it('should return a Request ILL button but with the NYU link', () => {
          expect(selectRequestButton.label).toEqual("Request ILL");
          expect(selectRequestButton.href).toEqual("https://library.nyu.edu/lln32");
          expect(selectRequestButton.prmIconAfter.icon).toEqual("ic_open_in_new_24px");
          expect(selectRequestButton.prmIconAfter.set).toEqual("action");
        });
      });
    });
    describe('when NYU ILL link exists', () => {
      beforeAll( () => {
        $scope = setupScope([lln32], vid);
        locationsCtrl = $scope.$parent.$ctrl.parentCtl;
      });
      beforeEach( () => {
        selectRequestButton = controller.selectRequestButton(locationsCtrl);
      });
      it('should return a Request ILL button and have the NYU link', () => {
        expect(selectRequestButton.label).toEqual("Request ILL");
        expect(selectRequestButton.href).toEqual("https://library.nyu.edu/lln32");
        expect(selectRequestButton.prmIconAfter.icon).toEqual("ic_open_in_new_24px");
        expect(selectRequestButton.prmIconAfter.set).toEqual("action");
      });
    });
    describe('when none of the expected links exist', () => {
      beforeAll( () => {
        $scope = setupScope([], vid);
        locationsCtrl = $scope.$parent.$ctrl.parentCtl;
      });
      beforeEach( () => {
        selectRequestButton = controller.selectRequestButton(locationsCtrl);
      });
      it('should return an empty button', () => {
        expect(selectRequestButton.label).toEqual("Blank button");
        expect(selectRequestButton.href).toBe(null);
        expect(selectRequestButton.id).toBe("blank-button");
        expect(selectRequestButton.prmIconAfter).toBe(null);
      });
    });
  });

  describe('requestButton', () => {
    let requestButton;
    beforeAll( () => {
      $scope = {};
    });
    beforeEach( () => {
      requestButton = controller.requestButton('Request ILL', 'https://library.nyu.edu/lln31');
    });
    it ('should return a valid button object', () => {
      expect(requestButton.label).toEqual("Request ILL");
      expect(requestButton.href).toEqual("https://library.nyu.edu/lln31");
      expect(requestButton.prmIconAfter.icon).toEqual("ic_open_in_new_24px");
      expect(requestButton.prmIconAfter.set).toEqual("action");
    });
  });

  describe('emptyButton', () => {
    let emptyButton;
    beforeEach( () => {
      emptyButton = controller.emptyButton();
    });
    it ('should return a valid empty button object', () => {
      expect(emptyButton.label).toEqual("Blank button");
      expect(emptyButton.href).toBe(null);
      expect(emptyButton.id).toBe("blank-button");
      expect(emptyButton.prmIconAfter).toBe(null);
    });
  });

  describe('getitLink', () => {
    let getitLink;
    describe('when link exists', () => {
      beforeEach( () => {
        getitLink = controller.getitLink(setupItem([lln32]), 'lln32');
      });
      it('should return a url', () => {
        expect(getitLink).toEqual("https://library.nyu.edu/lln32");
      });
    });
    describe('when link does not exist', () => {
      beforeEach( () => {
        getitLink = controller.getitLink(setupItem([lln32]), 'lln30');
      });
      it('should return undefined', () => {
        expect(getitLink).toBe(undefined);
      });
    });
  });

  describe('handleClick', () => {
    let handleClick;
    const e = {
      stopPropagation: jest.fn(),
    };
    const buttonObj = {
      href: "https://library.nyu.edu/lln30",
    };
    beforeEach( () => {
      handleClick = controller.handleClick(e, buttonObj);
    });
    it('should call $window.open and return undefined', () => {
      expect(e.stopPropagation).toBeCalled();
      expect($window.open).toBeCalled();
      expect(handleClick).toBe(undefined);
    });
  });
  
});