#!/bin/sh -ex

docker tag primo-explore-nyuad quay.io/nyulibraries/primo-explore-nyuad:latest
docker tag primo-explore-nyuad quay.io/nyulibraries/primo-explore-nyuad:${CIRCLE_BRANCH//\//_}
docker tag primo-explore-nyuad quay.io/nyulibraries/primo-explore-nyuad:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}

docker push quay.io/nyulibraries/primo-explore-nyuad:latest
docker push quay.io/nyulibraries/primo-explore-nyuad:${CIRCLE_BRANCH//\//_}
docker push quay.io/nyulibraries/primo-explore-nyuad:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}