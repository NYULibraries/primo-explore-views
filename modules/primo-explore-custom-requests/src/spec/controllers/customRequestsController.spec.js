const configService = {
  buttonIds: ['request'],
  buttonGenerators: {
    request: jasmine.createSpy('configService.buttonGenerators.request').and.returnValue({
      id: 'request',
      href: 'http://example.com/request?item=test&user=123456',
      label: 'Custom Request',
    }),
  },
  userLoadingText: 'Loading user',
  userFailureText: 'User fetch failed',
  noButtonsText: 'No services',
  hideDefaultRequests: jasmine.createSpy('config.hideDefaultRequests').and.returnValue([true, false]),
};

describe('customRequestsController', () => {
  let translateFilter, stateService;
  beforeEach(module('primoExploreCustomRequests', function($provide) {
    translateFilter = jasmine.createSpy('translateFilter').and.returnValue('TRANSLATED');

    const stateServiceConstructor = function() {
      const state = {
        item: {
          name: 'Romeo and Juliet'
        }
      };
      stateService = jasmine.createSpyObj('stateService', {
        setState: state,
        getState: state,
      });
      return stateService;
    };
    const configServiceConstructor = function () {
      return configService;
    };

    $provide.service('primoExploreCustomRequestsConfigService', configServiceConstructor);
    $provide.service('primoExploreCustomRequestsStateService', stateServiceConstructor);
    $provide.value('translateFilter', translateFilter);
  }));

  let controller, parentCtrl, $injector;
  beforeEach(inject(function (_$componentController_, _$rootScope_, _$injector_) {
    const $componentController = _$componentController_;
    const $rootScope = _$rootScope_;
    $injector = _$injector_;

    parentCtrl = {
      item: {
        name: 'Test',
        data: {
          type: 'book',
          url: 'http://example.com/book'
        }
      },
      currLoc: {
        items: [
          {
            callNumber: '012345',
            volume: '1'
          },
          {
            callNumber: '012345',
            volume: '2'
          }
        ],
        location: {
          mainLocation: 'LIB',
          subLocationCode: 'DEPT'
        }
      },
    };

    const bindings = {
      parentCtrl,
    };

    controller = $componentController(
      'primoExploreCustomRequests',
      { $scope: $rootScope },
      bindings,
    );
  }));

  beforeEach(() => {
    configService.buttonGenerators.request.calls.reset();
    configService.hideDefaultRequests.calls.reset();
  });

  describe('translate', () => {
    let translate;
    beforeEach(() => {
      translate = controller.translate;
    });

    it('replaces {values} with translate values', () => {
      const str = "This is a {test}";
      const result = translate(str);

      expect(translateFilter).toHaveBeenCalledWith('test');
      expect(result).toEqual('This is a TRANSLATED');
    });
  });

  describe('handleClick', () => {
    let handleClick, openSpy, injectorSpy;
    beforeEach(inject(function(_$injector_, _$window_){
      handleClick = controller.handleClick;
      openSpy = spyOn(_$window_, 'open');
      injectorSpy = spyOnAllFunctions(_$injector_);
    }));

    let event;
    beforeEach(() => {
      event = jasmine.createSpyObj('event', [
        'stopPropagation',
      ]);
    });

    describe('with an href', () => {
      beforeEach(() => {
        handleClick(event, { href: 'example.com' });
      });

      it('stops the event propogation', () => {
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      });

      it('opens link with the href', () => {
        expect(openSpy).toHaveBeenCalledWith('example.com');
        expect(openSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('with an action', () => {
      beforeEach(() => {
        handleClick(event, {
          action: (injector) => {
            const svc = injector.get('myService');
          }
        });
      });

      it('stops the event propagation', () => {
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
      });

      it('executes the action callback fxn with injector', () => {
        expect(injectorSpy.get).toHaveBeenCalledTimes(1);
      });
    });

    describe('with neither an action nor href', () => {
      beforeEach(() => {
        spyOn(console, 'warn');

        handleClick(event, { label: 'button' });
      });

      it('warns with the console', () => {
        expect(console.warn).toHaveBeenCalledWith(`primo-explore-custom-requests: Button "button" has not been assigned either an 'action' or 'href' property`);
      });
    });
  });

  describe('hideAllRequests', () => {
    // awaiting coverage
  });

  describe('revealRequest', () => {
    // awaiting coverage
  });

  describe('revealCustomRequest', () => {
    // awaiting coverage
  });

  describe('revealDivider', () => {
    // awaiting coverage
  });

  describe('revealNoButtonText', () => {
    // awaiting coverage
  });

  describe('revealNoButtonText', () => {
    // awaiting coverage
  });

  describe('setButtonsInState', () => {
    let setButtonsInState;
    beforeEach(() => {
      setButtonsInState = controller.setButtonsInState;
      setButtonsInState();
    });

    describe('when primoExploreCustomLoginService is available', () => {
      const mockUser = {
        id: '123456'
      };

      let customLoginService;
      beforeEach(() => {
        customLoginService = {
          isLoggedIn: true,
          fetchPDSUser: jasmine.createSpy('customLoginService.fetchPDSUser')
                               .and.returnValue(Promise.resolve(mockUser))
        };

        controller.customLoginService = customLoginService;
      });

      it('sets the state with the loggedIn state', (done) => {
        setButtonsInState();
        expect(stateService.setState).toHaveBeenCalledWith({ loggedIn: true });
        done();
      });

      it('sets the state with the user after the promise resolves', (done) => {
        const promise = setButtonsInState();
        expect(stateService.setState.calls.mostRecent().args[0].user).toBeUndefined();

        promise.then(() => {
          const arg = stateService.setState.calls.mostRecent().args[0];
          const { user } = arg;

          expect(user).toBeDefined();
          expect(user).toBe(mockUser);
          done();
        });
      });

      it('calls generateButtons with item (from state) and user', (done) => {
        spyOn(controller, 'generateButtons');

        setButtonsInState().then(() => {
          expect(controller.generateButtons).toHaveBeenCalledWith({ user: mockUser, item: stateService.getState().item  });
          done();
        });
      });

      it('sets the state with the result of generateButtons after the promise resolves', (done) => {
        const mockButton = {
          label: 'hello',
          href: 'http://example.com'
        };

        spyOn(controller, 'generateButtons').and.returnValue([mockButton]);

        const promise = setButtonsInState();

        expect(stateService.setState.calls.mostRecent().args[0].buttons).toBeUndefined();

        promise.then(() => {
          const arg = stateService.setState.calls.mostRecent().args[0];
          const { buttons } = arg;

          expect(buttons).toBeDefined();
          expect(buttons).toEqual([mockButton]);
          done();
        });
      });

      describe('when the fetchPDSUser promise is rejected', () => {
        const errorMessage = 'the promise was rejected';
        beforeEach(() => {
          spyOn(console, 'error');
          customLoginService.fetchPDSUser.and.returnValue(Promise.reject(errorMessage));
        });

        it('logs the error in the console', (done) => {
          const promise = setButtonsInState();
          promise.then(() => {
            expect(console.error).toHaveBeenCalledWith(errorMessage);
            done();
          });
        });

        it('sets the state with expected userFailure, buttons, and user', (done) => {
          const expected = {
            userFailure: true,
            buttons: undefined,
            user: null,
          };

          setButtonsInState().then(() => {
            const arg = stateService.setState.calls.mostRecent().args[0];
            expect(arg).toEqual(expected);
            done();
          });
        });
      });

      describe('when not loggedIn', () => {
        beforeEach(() => {
          customLoginService.isLoggedIn = false;
        });

        it('sets the loggedIn state', () => {
          setButtonsInState();

          expect(stateService.setState).toHaveBeenCalledWith({ loggedIn: false });
        });

        it('calls generateButtons with item (from state) and undefined user', (done) => {
          spyOn(controller, 'generateButtons');

          setButtonsInState().then(() => {
            expect(controller.generateButtons).toHaveBeenCalledWith({
              user: undefined,
              item: stateService.getState().item
            });
            done();
          });
        });

        it('sets the state with the result of generateButtons after the promise resolves', (done) => {
          const mockButton = {
            label: 'hello',
            href: 'http://example.com'
          };

          spyOn(controller, 'generateButtons').and.returnValue([mockButton]);

          const promise = setButtonsInState();
          promise.then(() => {
            const arg = stateService.setState.calls.mostRecent().args[0];
            const { buttons } = arg;

            expect(buttons).toBeDefined();
            expect(buttons).toEqual([mockButton]);
            done();
          });
        });
      });
    });

    describe('when primoExploreCustomLoginService is not available', () => {
      beforeEach(() => {
        controller.customLoginService = undefined;
      });

      it('does not set the loggedIn state', () => {
        setButtonsInState();
        expect(stateService.setState).not.toHaveBeenCalled();
      });

      it('calls generateButtons with item (from state) and undefined user', (done) => {
        spyOn(controller, 'generateButtons');

        setButtonsInState().then(() => {
          expect(controller.generateButtons).toHaveBeenCalledWith({
            user: undefined,
            item: stateService.getState().item
          });
          done();
        });
      });

      it('sets the state with the result of generateButtons after the promise resolves', (done) => {
        const mockButton = {
          label: 'hello',
          href: 'http://example.com'
        };

        spyOn(controller, 'generateButtons').and.returnValue([mockButton]);

        const promise = setButtonsInState();

        expect(stateService.setState.calls.count()).toEqual(0);

        promise.then(() => {
          const arg = stateService.setState.calls.mostRecent().args[0];
          const { buttons } = arg;

          expect(buttons).toBeDefined();
          expect(buttons).toEqual([mockButton]);
          done();
        });
      });
    });
  });

  describe('generateButtons', () => {
    it('builds an array of buttons objects using corresponding buttonGenerator functions', () => {
      const result = controller.generateButtons({
        item: {
          name: 'test'
        },
        user: {
          id: '123456'
        }
      });

      const expected = [
        {
          id: 'request',
          href: 'http://example.com/request?item=test&user=123456',
          label: 'Custom Request',
        }
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('getCurrLocId', () => {
    it('concatenates mainLocation and subLocation', () => {
      expect(controller.getCurrLocId()).toEqual('LIBDEPT');
    });
  });

  describe('$onInit', () => {
    describe('when customLoginService is defined', () => {
      let customLoginServiceSpy;
      beforeEach(() => {
        customLoginServiceSpy = jasmine.createSpyObj('customLoginService', {
          isLoggedIn: true,
          fetchPDSUser: Promise.resolve({ id: '123456' }),
        });

        spyOn($injector, 'has').and.returnValue(true);
        spyOn($injector, 'get').and.returnValue(customLoginServiceSpy);
      });

      it('assigns customLoginService to controller', () => {
        controller.$onInit();
        expect(controller.customLoginService).toBe(customLoginServiceSpy);
      });

      it('sets the state of currLocId using getCurrLocId', () => {
        spyOn(controller, 'getCurrLocId').and.returnValue(`LIBDEPT2`);

        controller.$onInit();
        expect(stateService.setState.calls.first().args[0]).toEqual({ currLocId: `LIBDEPT2` });
      });

      it('assigns userLoadingText, userFailureText, and noButtonsText values to the controller', () => {
        controller.$onInit();

        expect(controller.userLoadingText).toBe(configService.userLoadingText);
        expect(controller.userFailureText).toBe(configService.userFailureText);
        expect(controller.noButtonsText).toBe(configService.noButtonsText);
      });

      describe(`when state's item and items match this controller's`, () => {
        beforeEach(() => {
          stateService.getState.and.returnValue({
            item: parentCtrl.item,
            items: parentCtrl.currLoc.items,
          });
        });

        it('does not call setButtonsInState, config.hideDefaultRequests, revealRequest, or DOMRefresh', (done) => {
          spyOn(controller, 'setButtonsInState');
          spyOn(controller, 'revealRequest');
          spyOn(controller, 'DOMRefresh');
          spyOn(controller, 'refreshReveals');

          controller.$onInit();

          expect(controller.setButtonsInState).not.toHaveBeenCalled();
          expect(controller.revealRequest).not.toHaveBeenCalled();
          expect(controller.DOMRefresh).not.toHaveBeenCalled();
          expect(configService.hideDefaultRequests).not.toHaveBeenCalled();
          done();
        });

        it(`does not update the stateService's items`, () => {
          controller.$onInit();
          expect(stateService.setState.calls.mostRecent().args[0]).not.toEqual({
            item: parentCtrl.item,
            items: parentCtrl.currLoc.items,
          });
        });
      });

      describe(`when state's item/items differ from controller's`, () => {
        beforeEach(() => {
          stateService.getState.and.returnValue({
            item: {
              name: 'Monk'
            },
            items: parentCtrl.currLoc.items,
          });
        });

        it('calls setButtonsInState', () => {
          spyOn(controller, 'setButtonsInState').and.returnValue(Promise.resolve({ id: '12345' }));
          controller.$onInit();
          expect(controller.setButtonsInState).toHaveBeenCalled();
        });

        // it('calls config.hideDefaultRequests', (done) => {
        //   controller.$onInit();
        //   done();
        //   expect(configService.hideDefaultRequests).toHaveBeenCalled();
        // });
      });
    });
  });
});