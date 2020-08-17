[![Web Services](https://img.shields.io/badge/NYU%20Libraries-Web%20Services-Black.svg)](https://shields.io/) 

[![CircleCI](https://circleci.com/gh/NYULibraries/primo-explore-views.svg?style=svg)](https://circleci.com/gh/NYULibraries/primo-explore-views)
[![Github commits (since latest release)](https://img.shields.io/github/commits-since/NYULibraries/primo-explore-views/latest.svg)](https://github.com/NYULibraries/primo-explore-views/releases/latest)
[![Docker Repository on Quay](https://quay.io/repository/nyulibraries/primo-explore-views/status "Docker Repository on Quay")](https://quay.io/repository/nyulibraries/primo-explore-views)



# NYU Consortium Primo Explore packages

This the NYU Libraries primo-explore view packages.

For more information about primo-explore views please review the example package that this package was cloned from: https://github.com/ExLibrisGroup/primo-explore-package.

For information about developing in the primo-explore UI please review that relevant repository: https://github.com/ExLibrisGroup/primo-explore-devenv

For more information about NYU's customizations read the [wiki](https://github.com/nyulibraries/primo-explore-views/wiki).

## Run the Development Environment

VIEW package files are organized into `custom/VIEW_NAME` directories.

With recommended volumes enabled in the `docker-compose.yml`:

With Docker and docker-compose installed:

1. Configure `docker-compose.yml` to fit your institutional setup in the `x-environment` section. ([docker-compose environment variables](https://docs.docker.com/compose/environment-variables/))
1. Ensure `volumes` to local directories are configured in `docker-compose.yml`. The `custom/` directory should be mounted to `/app/primo-explore/custom` in the image.
1. `NODE_ENV=[stage] VIEW=[view_name] docker-compose up web`

On your local machine, the developer server will be accessible at `http://localhost:8004/primo-explore/search?vid={VIEW}`

Within the [docker network](https://docs.docker.com/network/), this will be accordingly be accessible at the address `http://web:8004`

The server will automatically refresh pages and reflect changes if `CENTRAL_PACKAGE` or your active view folder's (e.g. `NYU` for `vid=NYU`) files are changed.

### Entry files

* `js/main.js` is considered the 'entry' file for compiling JavaScript files. You can use ES6 `import` syntax here to utilize dependencies.
    ```js
    // import from node_modules with side-effects and no assignment
    import 'primo-explore-clickable-logo-to-any-link';

    // import from node_modules and assign default export
    import googleAnalyticsModule from 'primo-explore-google-analytics';

    // import from local files and assign named export
    import { config } from './customConfig'
    ```
* `css/sass/main.scss` is the 'entry' file for compiling to CSS. To refer to CSS files that may be included in your `node_modules` packages, you can simply use `~` as an alias for the properly resolved `node_modules` directory.
    ```scss
    // import local modules (e.g. _searchbar.scss)
    @import 'searchbar';

    // import from node_module files
    @import '~primo-explore-clickable-logo-to-any-link/css/custom1.css';
    ```

## Run Tests

Integration and end-to-end testing has been implemented in [Cypress](http://cypress.io). Cypress can run in its own container connected to a running `web-test` service.

Simply execute:
```sh
VIEW=[view_name] docker-compose run e2e
```

Tests will run in the [Cypress Electron Browser](https://docs.cypress.io/guides/core-concepts/launching-browsers.html#Electron-Browser) so that videos and screenshots (on failures) are recorded. The default testing command in Docker runs tests matching the glob pattern `cypress/integration/$VIEW/**/*.spec.js`.

Between running tests, ensure that current docker containers are completely stopped with `docker-compose down`, or you may be running tests in a VIEW webserver you do not intend!

For convenience, `script/run_view_e2e_tests.sh` will run tests for files that have been changed in the current `git` branch relative to the cannonical state of `origin/development`.  `script/create_view_packages.sh` does the same for building These are run on [CirlcleCI](https://circleci.com/gh/NYULibraries/primo-explore-views/). If on the `master` or `development` branch, all VIEW packages will be tested and built to ensure integrity.

See [cypress command line documentation](https://docs.cypress.io/guides/guides/command-line.html) for more information.

* [Example execution in Circle CI](https://circleci.com/gh/NYULibraries/primo-explore-views/38)

### Test records

BobCat dev holds a number of test items as relatively stable fixtures for testing. These are not consistent through their `docids` (e.g. `nyu_aleph0000000`) but they are consistent through their titles (e.g. `PRIMOCIRCTEST-NABUD-MEDIA-02-LR`).

**Note:** When an Aleph Staging refresh occurs, the tests need to be reconfigured with new IDs to pass again. You can look up those new IDs by the titles. 

**Note:** There may be a delay between an Aleph Staging refresh and the test records reappearing on stage.

### Cypress GUI (Running locally)

The Cypress GUI is accessible in a local development environment only, since a GUI is required.

```sh
yarn install
# Open Cypress GUI
yarn cypress open
```

This is extremely helpful for writing integration/end-to-end tests to see the consequences of your testing in real-time. See the [Cypress documentation](https://docs.cypress.io/guides/overview/why-cypress.html) for information about the GUI and [best practices](https://docs.cypress.io/guides/references/best-practices.html) in Cypress testing.

## Build a Package

With recommended volumes enabled in the `docker-compose.yml`:

```sh
NODE_ENV=[stage] VIEW=[view_name] docker-compose run create-package
```

This will output a package to your `./packages/` directory in the container. Add volume mounting properties to your `docker-compose.yml` to acess these files on your local machine. Or, to copy them manually from the stopped container:

`docker cp "$(docker ps -q -a -l -f name=create-package)":/app/packages/. packages`

For convenience, `script/create_package.sh` is a `sh` script that will build all packages for files that have been changed in the current `git` branch relative to `origin/master`. This is used during the CI process. If on the `master` branch, all VIEW packages will be created with `production` values.

* [Example execution in Circle CI](https://circleci.com/gh/NYULibraries/primo-explore-views/38)

## Running locally

You can run the development environment locally using [our fork of primo-explore-devenv](https://github.com/nyulibraries/primo-explore-devenv) as well, and symlinking this `custom` directory to that repostory's `primo-explore/custom/` directory. However, because this monorepo is designed to work with [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/), this means that `node_modules` shared across packages will be installed (i.e. hoisted and deduped) to a parent directory. This means the monorepo's hoisted `node_modules` folder should also be symlinked to `primo-explore/node_modules` so they can be properly resolved.

```sh
# In primo-explore-views
yarn install
# In primo-explore-devenv
yarn install
VIEW=[view] NODE_ENV=[stage] yarn start
```

## Other notes

This package has a loose 'monorepo' structure. Monorepos can sometimes have difficulties in resolving Node dependencies. `yarn` overcomes these problems using [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/). The basic important points are:

* The user only need to run `yarn install` once inside the root directory of the repository. All `node_modules` are resolved and installed once in the root directory. If different versions of a package are required for submodules, a more specific versions is installed to the corresponding subdirectory to override what's present in the root.
* Using the `workspaces` parameter in `package.json`,`yarn` knows to look in `custom` for other `package.json` files to resolve dependencies.
* To add dependencies to a specific workspace, use the following command: `yarn workspaces primo-explore-{view-name} add package-name-1 package-name-2 ...`.
* Only a single `yarn.lock` file is generated in the root for the entire repository. Keep this file checked in when making updates or changes to dependencies.
