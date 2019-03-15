#!/bin/sh -ex

# Executes docker build if primo-explore-views has not been built
if [[ $(docker image ls --filter="reference=primo-explore-views:latest" --format "{{.ID}}" | grep "" -c) < 1 ]]; then
  docker-compose build web
else
  docker tag primo-explore-views quay.io/nyulibraries/primo-explore-views:latest
  docker tag primo-explore-views quay.io/nyulibraries/primo-explore-views:${CIRCLE_BRANCH//\//_}
  docker tag primo-explore-views quay.io/nyulibraries/primo-explore-views:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}

  docker push quay.io/nyulibraries/primo-explore-views:latest
  docker push quay.io/nyulibraries/primo-explore-views:${CIRCLE_BRANCH//\//_}
  docker push quay.io/nyulibraries/primo-explore-views:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}
fi