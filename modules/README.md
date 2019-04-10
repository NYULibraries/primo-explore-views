# Usage

This directory is intended for developers to add local versions of modules as "works-in-progress" to develop against their views.

In order to use this:

1. Clone the module repository
1. Loosen or refactor version number in the view you are working with so that the local version will be prioritized over the NPM repository version. E.g. `1.0.0` -> `1.0.1-alpha.1`
1. `docker-compose up web-dev-modules`