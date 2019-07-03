# #!/bin/sh -ex

docker pull quay.io/nyulibraries/primo-explore-views:${CIRCLE_BRANCH//\//_} || docker pull quay.io/nyulibraries/primo-explore-views:latest
docker pull quay.io/nyulibraries/primo-explore-e2e-cypress:${CIRCLE_BRANCH//\//_} || docker pull quay.io/nyulibraries/primo-explore-e2e-cypress:latest