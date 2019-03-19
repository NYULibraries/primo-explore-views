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
      enabled: {
        development: (mockUserWarning(), true),
        test: (mockUserWarning(), true),
      }[process.env.NODE_ENV] || false,
      get isLoggedIn() {
        let loggedIn;
        switch (process.env.NODE_ENV) {
          case 'development':
            loggedIn = window.$$devUserLoggedIn;
            break;
          case 'test':
            loggedIn = window.$$testUserLoggedIn;
            break;
          default:
            break;
        }

        return loggedIn;
      },
      user: {
        'id': '1234567',
        'bor-status': '50',
      },
      delay: 500,
    }
  },
};