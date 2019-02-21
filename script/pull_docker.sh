# #!/bin/sh -ex

PACKAGE_VERSION=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)
docker pull quay.io/nyulibraries/primo-explore-central-package:${CIRCLE_BRANCH//\//_} || \
  docker pull quay.io/nyulibraries/primo-explore-central-package:${PACKAGE_VERSION} || \
  docker pull quay.io/nyulibraries/primo-explore-central-package:latest