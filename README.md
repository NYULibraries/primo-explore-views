[![GitHub package version](https://img.shields.io/github/package-json/v/NYULibraries/primo-explore-central-package.svg)](https://github.com/NYULibraries/primo-explore-central-package/releases)
[![Github commits (since latest release)](https://img.shields.io/github/commits-since/NYULibraries/primo-explore-central-package/latest.svg)](https://github.com/NYULibraries/primo-explore-central-package/releases/latest)

# NYU Primo-explore CENTRAL_PACKAGE

This the NYU Libraries primo-explore consortium CENTRAL_PACKAGE.

For more information about primo-explore views please review the example package that this package was cloned from: https://github.com/ExLibrisGroup/primo-explore-package.

For information about developing in the primo-explore UI please review that relevant repository: https://github.com/ExLibrisGroup/primo-explore-devenv

For more information about NYU's customizations read the [wiki](https://github.com/nyulibraries/primo-explore-nyu/wiki).

## Run the Development Environment (only in Docker)

With recommended volumes enabled in the `docker-compose.yml`:

With Docker and docker-compose installed:

1. Configure `docker-compose.yml` to fit your institutional setup in the `x-environment` section.
1. `docker-compose build web`
1. `docker-compose up web`

On your local machine, the developer server will be accessible at `http://localhost:8004/primo-explore/search?vid={VIEW}`

Within the [docker network](https://docs.docker.com/network/), this will be accordingly be accessible at domian `http://web:8004`

## Build a Package (only in Docker)

With recommended volumes enabled in the `docker-compose.yml`:

```sh
NODE_ENV=[stage] docker-compose run create-package
```

This will output a package to your `./packages/` directory