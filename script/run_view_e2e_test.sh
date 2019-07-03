#!/bin/sh -ex

# Exit if VIEW is not assigned
[ $VIEW ] || (echo 'NO VIEW SPECIFIED. Please assign VIEW in environment' && exit 1)

# This script runs tests only for a VIEW that has changed since origin/master.
# Will continue executing all tests for applicable VIEWs and terminate with a non-zero exit code if any test fails.
# All resuls will be copied locally to a cypress-results folder
# All tests are run on the master branch.

# Finds current branch locally or via CIRCLE
export CURRENT_BRANCH=${CIRCLE_BRANCH-$(git rev-parse --abbrev-ref HEAD)}

mkdir -p cypress-results

docker-compose run e2e bash -c 'script/wait_for.sh http://web-test:8004/primo-explore/search && yarn cypress run --spec="cypress/integration/$VIEW/**/*.spec.js" --reporter="junit" --reporter-options="mochaFile=test-results/$VIEW/results-[hash].xml"' || ANY_FAILS=$ANY_FAILS$?
docker cp "$(docker ps -q -a -l -f name=e2e)":/app/cypress/videos cypress-results/ || : # escape failure if video does not exist
docker cp "$(docker ps -q -a -l -f name=e2e)":/app/cypress/screenshots cypress-results/ || : # screenshots only on failures
docker cp "$(docker ps -q -a -l -f name=e2e)":/app/test-results cypress-results/
docker-compose down
# Checks if non-zero exit code occurred
[ ! $ANY_FAILS ]