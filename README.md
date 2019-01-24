# primo-explore-custom-login

## Usage
**(Note: currently applies to alpha verson; will likely change in v1.0)**

1. Install
`yarn add primo-explore-custom-login`
2. Add as an angular dependency
```js
let app = angular.module('viewCustom', [
  //... other dependencies
  'primoExploreCustomLogin',
]);
```
3. Add component to `prmAuthenticationAfter`.

This component has no visible effect, but is required in order to 'capture' login functions and other information from the `<prm-authentication>` component.

```js
app
  .component('prmAuthenticationAfter', {
    template: `<primo-explore-custom-login></primo-explore-custom-login>`
  })
```
4. Configure

Set configuration values as an angular constant named `primoExploreCustomLoginConfig`.

```js
app
  .constant('primoExploreCustomLoginConfig', {
    pdsUrl: 'https://pds.library.edu/pds',
    queryString: 'func=get-attribute&attribute=bor_info',
    selectors: ['id', 'bor-status'],
  })
```

## Configuration

|name|type|usage|
|---|---|---|
`pdsUrl`| `string` | The base url for the PDS API
`queryString` | `string` | The query string used for the PDS function you would like to use.
`selectors` | `array` | The document selectors used to obtain the data fields you are looking for. Selectors will be mapped to keys in the resulting POJO object.
`mockUserConfig`| `Object` | Settings for mocking a user (especially for offline development)

## `primoExploreCustomLoginService`

All of the functionality of this module is contained in the `primoExploreCustomLoginService`.

### `fetchPDSUser`

This function is asynchronous and returns an AngularJS promise (see [$http documentation](https://docs.angularjs.org/api/ng/service/$http))

The first time fetchPDSUser is called, the function fetches the user data via the PDS API (as configured). This value is then cached throughout the user's session within the SPA. Exiting or refreshing the page will require a new PDS API call to get user data.

If within the same session multiple components execute `fetchPDSUser` before the request returns, the promise of the first `$http` request is returned and handled in a similarly asynchronous manner. This means you can safely call `fetchPDSUser` from as many components as you want without worrying about redundate API calls!

Once the user is fetched, subsequent `fetchPDSUser` calls simply return a resolved promised of the user. The user is represented as a POJO with properties based on the `selectors` set in the configuration.

`fetchPDSUser` relies on the `PDS_HANDLE` cookie value in Primo, so it is imperative that your library and `pds` are on the same domain for the function to properly work.

```js
// config
app
  .constant('primoExploreCustomLoginConfig', {
    pdsUrl: 'https://pds.library.edu/pds',
    queryString: 'func=get-attribute&attribute=bor_info',
    selectors: ['id', 'bor-status'],
    mockUserConfig: {
      enabled: true,
      user: {
        'id': '1234567',
        'bor-status': '55',
      },
      delay: 500,
    }
  })

// controller
myController.$inject = ['primoExploreCustomLoginService'];
function myController(customLoginService) {
  customLoginService.fetchPDSUser()
    .then(function(user) {
      // user is a POJO with properties: id, bor-status. All values are string values.
      if (user['bor-status'] === '20') {
        // do one thing
      } else {
        // do something else
      }
    })
    .catch(function(error) {
      console.error(err);
      // do other stuff if the request fails
    })
}
```

### `login`

Action which executes user login (the same that is used the `<prm-authetication>` components).

```js
primoExploreCustomLoginService.login();
```

### `logout`

Action which executes user logout.

```js
primoExploreCustomLoginService.logout();
```

### `isLoggedIn`

Returns a boolean value of whether the user is logged in.

```js
const loggedIn = primoExploreCustomLoginService.isLoggedIn;

if (loggedIn) {
  //...
}
```

## See also
* [primo-explore-custom-requests](https://github.com/NYULibraries/primo-explore-custom-requests) -- Uses this module to customize request options based on patron/user data.