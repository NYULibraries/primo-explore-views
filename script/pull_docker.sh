# #!/bin/sh -ex

docker pull quay.io/nyulibraries/primo-explore-nyuad:${CIRCLE_BRANCH//\//_} || docker pull quay.io/nyulibraries/primo-explore-nyuad:latest