angular
  .module('primoExploreCustomLogin', [])
  .component('primoExploreCustomLogin', {
    controller: customLoginController,
    require: {
      parentCtrl: '^prmAuthentication'
    }
  })
  .service('customLoginConfigService', ['primoExploreCustomLoginConfig', function (config) {
    if (!config) {
      console.warn('the constant primoExploreCustomLoginConfig is not defined');
    }

    return Object.freeze(angular.merge({}, config));
  }])
  // Injects prmAuthentication's handleLogin as a global service
  .service('primoExploreCustomLoginService', ['$window', '$http', 'customLoginConfigService', function ($window, $http, config) {
    const svc = this;
    svc.store = {
      user: undefined,
      login: undefined,
      logout: undefined,
      isLoggedIn: undefined,
    };

    svc.fetchPDSUser = (store) => {
      // source: https://stackoverflow.com/a/21125098/8603212
      const getCookie = function (name) {
        var match = $window.document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : undefined;
      };

      store.user = $http.get(`${config.pdsUrl}?${config.pdsUserInfo.queryString}&pds_handle=${getCookie('PDS_HANDLE')}`, {
          timeout: 6000
        })
        .then(response => {
          const xml = response.data;
          const getXMLProp = prop => (new $window.DOMParser).parseFromString(xml, 'text/xml').querySelector(prop).textContent;
          const user = config.pdsUserInfo.selectors.reduce((res, prop) => ({ ...res,
            [prop]: getXMLProp(prop)
          }), {});

          store.user = user;
          return user;
        });

      return store.user;
    };

    return {
      setLogin: fxn => {
        svc.store.login = fxn;
        return fxn;
      },
      setLogout: fxn => {
        svc.store.logout = fxn;
        return fxn;
      },
      setIsLoggedIn: isLoggedIn => {
        svc.store.isLoggedIn = isLoggedIn;
        return isLoggedIn;
      },

      // Written as a function to encapsulate changable login/logout functions
      login: () => svc.store.login(),
      logout: () => svc.store.logout(),
      fetchPDSUser: () => svc.store.user ? Promise.resolve(svc.store.user) : svc.fetchPDSUser(svc.store),
      isLoggedIn: () => svc.store.isLoggedIn,
    };
  }]);


customLoginController.$inject = ['primoExploreCustomLoginService'];
function customLoginController(customLoginService) {
  const ctrl = this;
  ctrl.$onInit = function () {
    customLoginService.setLogin(ctrl.parentCtrl.handleLogin.bind(ctrl.parentCtrl));
    customLoginService.setLogout(ctrl.parentCtrl.handleLogout.bind(ctrl.parentCtrl));
    customLoginService.setIsLoggedIn(ctrl.parentCtrl.isLoggedIn);
  };
}