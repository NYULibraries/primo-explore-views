# #!/bin/sh -ex

docker pull quay.io/nyulibraries/primo-explore-nyush:${CIRCLE_BRANCH//\//_} || docker pull quay.io/nyulibraries/primo-explore-nyush:latest