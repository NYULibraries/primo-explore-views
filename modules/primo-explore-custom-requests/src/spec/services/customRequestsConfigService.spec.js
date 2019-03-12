describe('primoExploreCustomRequestsConfigService', function () {
  describe('with primoExploreCustomRequestsConfig undefined', () => {
    beforeEach(() => {
      spyOn(console, 'warn');
    });

    beforeEach(module('primoExploreCustomRequests', $provide => {
      $provide.constant('primoExploreCustomRequestsConfig', undefined);
    }));

    let primoExploreCustomRequestsConfigService;
    beforeEach(inject(['primoExploreCustomRequestsConfigService', function (_primoExploreCustomRequestsConfigService) {
      primoExploreCustomRequestsConfigService = _primoExploreCustomRequestsConfigService;
    }]));

    it('warns the user in the console', () => {
      expect(console.warn).toHaveBeenCalledWith('the constant primoExploreCustomRequestsConfig is not defined');
    });

    it('returns an object with no properties', () => {
      expect(Object.keys(primoExploreCustomRequestsConfigService).length).toEqual(0);
    });
  });

  describe('with primoExploreCustomRequestsConfig with bare minimum options', () => {
    const config = {
      buttonIds: ['library-service-1', 'library-service-2']
    };

    beforeEach(module('primoExploreCustomRequests', $provide => {
      $provide.constant('primoExploreCustomRequestsConfig', config);
    }));

    let primoExploreCustomRequestsConfigService;
    beforeEach(inject(['primoExploreCustomRequestsConfigService', function (_primoExploreCustomRequestsConfigService) {
      primoExploreCustomRequestsConfigService = _primoExploreCustomRequestsConfigService;
    }]));

    it('showCustomRequests has a POJO of functions that returns arrays of true', () => {
      const showCustomRequests = primoExploreCustomRequestsConfigService.showCustomRequests;

      config.buttonIds.forEach(id => {
        const fxn = showCustomRequests[id];

        expect(typeof fxn).toBe('function');

        const items = ['item1', 'item2'];
        const bools = fxn({ items });
        expect(bools.length).toEqual(items.length);

        bools.forEach(bool => {
          expect(bool).toBe(true);
        });
      });
    });

    it('hideDefaultRequests is a function that returns an array of false', () => {
      const hideDefaultRequests = primoExploreCustomRequestsConfigService.hideDefaultRequests;
      expect(typeof hideDefaultRequests).toEqual('function');

      const items = ['item1', 'item2'];
      const res = hideDefaultRequests({ items });

      res.forEach(bool => {
        expect(bool).toBe(false);
      });
    });

    it(`noButtonsText defaults to 'Request not available'`, () => {
      const noButtonsText = primoExploreCustomRequestsConfigService.noButtonsText;

      expect(noButtonsText).toBe('Request not available');
    });

    it(`userFailureText defaults to 'Unable to retrieve request options'`, () => {
      const userFailureText = primoExploreCustomRequestsConfigService.userFailureText;

      expect(userFailureText).toBe('Unable to retrieve request options');
    });

    it(`userLoadingText defaults to 'Retrieving request options...'`, () => {
      const userLoadingText = primoExploreCustomRequestsConfigService.userLoadingText;

      expect(userLoadingText).toBe('Retrieving request options...');
    });

    it('buttonGenerators remains undefined', () => {
      const buttonGenerators = primoExploreCustomRequestsConfigService.buttonGenerators;

      expect(buttonGenerators).toBeUndefined();
    });
  });

  describe('with primoExploreCustomRequestsConfig properly defined', () => {
    const config = {
      buttonIds: ['service1', 'service2'],
      buttonGenerators: {
        service1: jasmine.createSpy('service1ButtonGenerator'),
        service2: jasmine.createSpy('service2ButtonGenerator')
      },
      showCustomRequests: {
        service1: jasmine.createSpy('service1ShowButtonRequest'),
      },
      hideDefaultRequests: jasmine.createSpy('service2hideDefaultRequest'),
      noButtonsText: 'no buttons',
      userFailureText: 'use failure',
      userLoadingText: 'the user is loading',
    };

    beforeEach(module('primoExploreCustomRequests', $provide => {
      $provide.constant('primoExploreCustomRequestsConfig', config);
    }));

    let primoExploreCustomRequestsConfigService;
    beforeEach(inject(['primoExploreCustomRequestsConfigService', function (_primoExploreCustomRequestsConfigService) {
      primoExploreCustomRequestsConfigService = _primoExploreCustomRequestsConfigService;
    }]));

    it('buttonIds uses configuration values', () => {
      expect(primoExploreCustomRequestsConfigService.buttonIds).toEqual(config.buttonIds);
    });

    it('buttonGenerators uses configuration values', () => {
      expect(primoExploreCustomRequestsConfigService.buttonGenerators).toEqual(config.buttonGenerators);
    });

    it('showCustomRequests merges defined with defaults', () => {
      expect(primoExploreCustomRequestsConfigService.showCustomRequests.service1).toEqual(config.showCustomRequests.service1);

      const fxn = primoExploreCustomRequestsConfigService.showCustomRequests.service2;
      config.buttonIds.forEach(id => {
        expect(typeof fxn).toBe('function');

        const items = ['item1', 'item2'];
        const bools = fxn({
          items
        });
        expect(bools.length).toEqual(items.length);

        bools.forEach(bool => {
          expect(bool).toBe(true);
        });
      });
    });

    it('hideDefaultRequests uses defined value', () => {
      expect(primoExploreCustomRequestsConfigService.hideDefaultRequests).toEqual(config.hideDefaultRequests);
    });

    it('noButtonsText uses defined value', () => {
      expect(primoExploreCustomRequestsConfigService.noButtonsText).toEqual(config.noButtonsText);
    });

    it('userFailureText uses defined value', () => {
      expect(primoExploreCustomRequestsConfigService.userFailureText).toEqual(config.userFailureText);
    });

    it('userLoadingText uses defined value', () => {
      expect(primoExploreCustomRequestsConfigService.userLoadingText).toEqual(config.userLoadingText);
    });
  });
});