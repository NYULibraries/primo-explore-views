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
  .service('primoExploreCustomLoginService', ['$window', '$http', 'customLoginConfigService', primoExploreCustomLoginService]);


const store = {
  user: undefined,
  login: undefined,
  logout: undefined,
  isLoggedIn: undefined,
};

function primoExploreCustomLoginService($window, $http, config) {
  const svc = this;

  svc.fetchPDSUser = store => {
    // source: https://stackoverflow.com/a/21125098/8603212
    const getCookie = function (name) {
      var match = $window.document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : undefined;
    };

    store.user = $http.get(`${config.pdsUrl}?${config.queryString}&pds_handle=${getCookie('PDS_HANDLE')}`, {
      timeout: 6000
    })
      .then(response => {
        const xml = response.data;
        const getXMLProp = prop => (new $window.DOMParser).parseFromString(xml, 'text/xml').querySelector(prop).textContent;
        const user = config.selectors.reduce((res, prop) => ({ ...res, [prop]: getXMLProp(prop) }), {});

        store.user = user;
        return user;
      });

    return store.user;
  };

  if (config.mockUserConfig && config.mockUserConfig.enabled) {
    // reassigns fetchPDSUser function
    svc.fetchPDSUser = store => {
      const user = config.mockUserConfig.user || {};
      const delayTime = config.mockUserConfig.delay || 1000;

      const delay = (t, v) => new Promise((res) => setTimeout(res.bind(null, v), t));
      return delay(delayTime, user)
        .then((user) => { store.user = user; return user; });
    };
  }

  return {
    // Written as a function to encapsulate changable login/logout functions
    login: () => store.login(),
    logout: () => store.logout(),
    fetchPDSUser: () => store.user ? Promise.resolve(store.user) : svc.fetchPDSUser(store),
    get isLoggedIn() {
      if (config.mockUserConfig.enabled) {
        // returns mock user's isLoggedIn value strictly if true or false explicitly. Otherwise, use store value.
        return config.mockUserConfig.isLoggedIn === true || (config.mockUserConfig.isLoggedIn === false ? false : store.isLoggedIn);
      }
      return store.isLoggedIn;
    }
  };
}

function customLoginController() {
  const ctrl = this;
  ctrl.$onInit = function () {
    store.login = ctrl.parentCtrl.handleLogin.bind(ctrl.parentCtrl);
    store.logout = ctrl.parentCtrl.handleLogout.bind(ctrl.parentCtrl);
    store.isLoggedIn = ctrl.parentCtrl.isLoggedIn;
  };
}

