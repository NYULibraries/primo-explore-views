#!/bin/sh -ex

docker tag primo-explore-nyush quay.io/nyulibraries/primo-explore-nyush:latest
docker tag primo-explore-nyush quay.io/nyulibraries/primo-explore-nyush:${CIRCLE_BRANCH//\//_}
docker tag primo-explore-nyush quay.io/nyulibraries/primo-explore-nyush:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}

docker push quay.io/nyulibraries/primo-explore-nyush:latest
docker push quay.io/nyulibraries/primo-explore-nyush:${CIRCLE_BRANCH//\//_}
docker push quay.io/nyulibraries/primo-explore-nyush:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}