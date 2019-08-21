const mockUserWarning = () => console.warn(`This build is using a mock user!` +
  ` Use NODE_ENV that is not 'development' or 'test' (e.g. 'staging')` +
  ` to disable the mock user feature`);

export default {
  name: 'primoExploreCustomLoginConfig',
  config: {
    pdsUrl($cookies) {
      return `https://pds${process.env.NODE_ENV !== 'production' ? 'dev' : ''}.library.nyu.edu/pds?func=get-attribute&attribute=bor_info&pds_handle=${$cookies.get('PDS_HANDLE')}`;
    },
    callback(response, $window) {
      const selectors = ['id', 'bor-status'];
      const xml = response.data;
      const getXMLProp = prop => (new $window.DOMParser).parseFromString(xml, 'text/xml').querySelector(prop).textContent;

      // getXMLProp for each selector, then merge to object
      const user = selectors.reduce((res, prop) => ({ ...res, [prop]: getXMLProp(prop) }), {});

      return user;
    },
    mockUserConfig: {
      get enabled() {
        if (/^(development|test)$/.test(process.env.NODE_ENV)) {
          mockUserWarning();
          return true;
        } else {
          return false;
        }
      },
      get isLoggedIn() {
        return /^(development|test)$/.test(process.env.NODE_ENV) ? window.$$mockUserLoggedIn : undefined;
      },
      get user() {
        return (/^(development|test)$/.test(process.env.NODE_ENV) && window.$$mockUser) || {
          'id': '1234567',
          'bor-status': '50',
        };
      },
      delay: 500,
    }
  },
};