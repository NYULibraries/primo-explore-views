#!/bin/sh -ex
  docker-compose build web

  docker tag primo-explore-views quay.io/nyulibraries/primo-explore-views:latest
  docker tag primo-explore-views quay.io/nyulibraries/primo-explore-views:${CIRCLE_BRANCH//\//_}
  docker tag primo-explore-views quay.io/nyulibraries/primo-explore-views:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}

  docker push quay.io/nyulibraries/primo-explore-views:latest
  docker push quay.io/nyulibraries/primo-explore-views:${CIRCLE_BRANCH//\//_}
  docker push quay.io/nyulibraries/primo-explore-views:${CIRCLE_BRANCH//\//_}-${CIRCLE_SHA1}
fi