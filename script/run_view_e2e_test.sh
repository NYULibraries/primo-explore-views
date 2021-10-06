#!/bin/bash -ex

# Exit if VIEW is not assigned
[ $VIEW ] || (echo 'NO VIEW SPECIFIED. Please assign VIEW in environment' && exit 1)

mkdir -p cypress-results

docker-compose run e2e || ANY_FAILS=$ANY_FAILS$?
docker cp "$(docker ps -q -a -l -f name=e2e)":/app/cypress/videos cypress-results/ || : # escape failure if video do not exist
docker cp "$(docker ps -q -a -l -f name=e2e)":/app/cypress/screenshots cypress-results/ || : # escape failure if screenshots do not exist
docker cp "$(docker ps -q -a -l -f name=e2e)":/app/test-results cypress-results/
docker-compose down
# Checks if non-zero exit code occurred
[ ! $ANY_FAILS ]
