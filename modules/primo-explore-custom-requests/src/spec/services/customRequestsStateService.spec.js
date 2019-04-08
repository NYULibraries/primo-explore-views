describe('primoExploreCustomRequestsStateService', () => {

  const mockState = {
    one: 1,
    two: 2,
    '3': 'three',
  };

  beforeEach(module('primoExploreCustomRequests'));

  let primoExploreCustomRequestsStateService;
  beforeEach(inject(['primoExploreCustomRequestsStateService', function (stateService) {
    primoExploreCustomRequestsStateService = stateService;
  }]));

  it('exists on the module', () => {
    expect(primoExploreCustomRequestsStateService).toBeDefined();
  });

  let getState, setState;
  beforeEach(() => {
    getState = primoExploreCustomRequestsStateService.getState;
    setState = primoExploreCustomRequestsStateService.setState;
  });

  describe('getState', () => {
    it('initially returns an empty object', () => {
      const empty = getState();
      expect(empty).toEqual({});
    });

    describe('after state is manipulated', () => {
      beforeEach(() => {
        Object.assign(getState(), mockState);
      });

      it('returns the current state', () => {
        expect(getState()).toEqual(mockState);
      });

      it('returns the same identity object on subsequent calls', () => {
        expect(getState()).toBe(getState());
      });
    });
  });

  describe('setState', () => {
    it('creates the initial state and returns', () => {
      const state = setState(mockState);
      expect(state).toEqual(mockState);
    });

    it('creates a new object', () => {
      const state = setState(mockState);
      expect(state).not.toBe(mockState);
    });

    it('merges subsequent calls with previous state', () => {
      setState(mockState);
      const state = setState({
        four: '4'
      });
      expect(state.four).toEqual('4');

      Object.entries(mockState).forEach(([k, v]) => {
        expect(v).toEqual(state[k]);
      });
    });
  });
});