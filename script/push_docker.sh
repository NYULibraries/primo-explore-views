#!/bin/sh -ex

docker tag primo-explore-views quay.io/nyulibraries/primo-explore-views:latest
docker tag primo-explore-views quay.io/nyulibraries/primo-explore-views:${BRANCH_NO_SLASH}
docker tag primo-explore-views quay.io/nyulibraries/primo-explore-views:${BRANCH_NO_SLASH}-${CIRCLE_SHA1}

docker push quay.io/nyulibraries/primo-explore-views:latest
docker push quay.io/nyulibraries/primo-explore-views:${BRANCH_NO_SLASH}
docker push quay.io/nyulibraries/primo-explore-views:${BRANCH_NO_SLASH}-${CIRCLE_SHA1}

docker tag primo-explore-e2e-cypress quay.io/nyulibraries/primo-explore-e2e-cypress:latest
docker tag primo-explore-e2e-cypress quay.io/nyulibraries/primo-explore-e2e-cypress:${BRANCH_NO_SLASH}
docker tag primo-explore-e2e-cypress quay.io/nyulibraries/primo-explore-e2e-cypress:${BRANCH_NO_SLASH}-${CIRCLE_SHA1}

docker push quay.io/nyulibraries/primo-explore-e2e-cypress:latest
docker push quay.io/nyulibraries/primo-explore-e2e-cypress:${BRANCH_NO_SLASH}
docker push quay.io/nyulibraries/primo-explore-e2e-cypress:${BRANCH_NO_SLASH}-${CIRCLE_SHA1}