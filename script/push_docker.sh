#!/bin/sh -ex

docker tag primo-explore-nysid quay.io/nyulibraries/primo-explore-nysid:latest
docker tag primo-explore-nysid quay.io/nyulibraries/primo-explore-nysid:${CIRCLE_BRANCH//\//_}
docker tag primo-explore-nysid quay.io/nyulibraries/primo-explore-nysid:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}

docker push quay.io/nyulibraries/primo-explore-nysid:latest
docker push quay.io/nyulibraries/primo-explore-nysid:${CIRCLE_BRANCH//\//_}
docker push quay.io/nyulibraries/primo-explore-nysid:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}