# #!/bin/sh -ex

docker pull quay.io/nyulibraries/primo-explore-nysid:${CIRCLE_BRANCH//\//_} || docker pull quay.io/nyulibraries/primo-explore-nysid:latest