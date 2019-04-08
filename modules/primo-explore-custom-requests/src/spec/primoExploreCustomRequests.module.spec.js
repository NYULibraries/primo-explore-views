describe('primoExploreCustomRequests', function() {
  beforeEach(module('primoExploreCustomRequests', $provide => {}));

  let $http;
  beforeEach(inject(['$http', function (_$http) {
    $http = _$http;
  }]));

  it('enables cross domian in $httpProvider', () => {
    expect($http.defaults.useXDomain).toBe(true);
    expect($http.defaults.withCredentials).toBe(true);
    expect($http.defaults.headers.common['X-Requested-With']).toBe(undefined);
  });
});