const mockUserWarning = () => console.warn(`This build is using a mock user!` +
  ` Use NODE_ENV that is not 'development' or 'test' (e.g. 'staging')` +
  ` to disable the mock user feature`);

export default {
  name: 'primoExploreCustomLoginConfig',
  config: {
    pdsUrl: `https://pds${process.env.NODE_ENV !== 'production' ? 'dev' : ''}.library.nyu.edu/pds`,
    queryString: 'func=get-attribute&attribute=bor_info',
    selectors: ['id', 'bor-status'],
    mockUserConfig: {
      get enabled() {
        return /^(development|test)$/.test(process.env.NODE_ENV) ? mockUserWarning() || true : false;
      },
      get isLoggedIn() {
        const devEnvironment = /^(development|test)$/.test(process.env.NODE_ENV);
        return devEnvironment ? window.$$mockUserLoggedIn : undefined;
      },
      user: {
        'id': '1234567',
        'bor-status': '50',
      },
      delay: 500,
    }
  },
};