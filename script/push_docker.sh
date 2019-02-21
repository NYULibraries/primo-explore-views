#!/bin/sh -ex
PACKAGE_VERSION=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)

docker tag primo-explore-central-package quay.io/nyulibraries/primo-explore-central-package:latest
docker tag primo-explore-central-package quay.io/nyulibraries/primo-explore-central-package:${CIRCLE_BRANCH//\//_}
docker tag primo-explore-central-package quay.io/nyulibraries/primo-explore-central-package:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}
docker tag primo-explore-central-package quay.io/nyulibraries/primo-explore-central-package:${PACKAGE_VERSION}

docker push quay.io/nyulibraries/primo-explore-central-package:latest
docker push quay.io/nyulibraries/primo-explore-central-package:${CIRCLE_BRANCH//\//_}
docker push quay.io/nyulibraries/primo-explore-central-package:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}
docker push quay.io/nyulibraries/primo-explore-central-package:${PACKAGE_VERSION}