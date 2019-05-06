#!/bin/sh -ex

# This script runs tests only for a VIEW that has changed since origin/master.
# Will continue executing all tests for applicable VIEWs and terminate with a non-zero exit code if any test fails.
# All resuls will be copied locally to a cypress-results folder
# All tests are run on the master branch.

# Finds current branch locally or via CIRCLE
export CURRENT_BRANCH=${CIRCLE_BRANCH-$(git rev-parse --abbrev-ref HEAD)}

mkdir -p cypress-results
# gets all "CAPITALIZED" directories in custom/*
VIEWS=$(echo $(ls -d custom/*) | tr -d 'a-z/')
for VIEW in $VIEWS
do
  # If VIEW or common folder changed, run tests
  if git diff --name-only origin/master | grep -Eq "/($VIEW|common)/" || [[ $CURRENT_BRANCH == master ]] || [[ $CURRENT_BRANCH == development ]]; then
    echo "Files changed in $VIEW package. Running tests."
    # will add any non-zero exit code to ANY_FAILS if a failure occurred
    VIEW=$VIEW docker-compose run e2e bash -c 'script/wait_for.sh http://web-test:8004/primo-explore/search && yarn cypress run --spec="cypress/integration/$VIEW/**/*.spec.js" --reporter="junit" --reporter-options="mochaFile=test-results/$VIEW/results-[hash].xml"' \
      || ANY_FAILS=$ANY_FAILS$?
    docker cp "$(docker ps -q -a -l -f name=e2e)":/app/cypress/videos cypress-results/ || : # escape failure if video does not exist
    docker cp "$(docker ps -q -a -l -f name=e2e)":/app/cypress/screenshots cypress-results/ || : # screenshots only on failures
    docker cp "$(docker ps -q -a -l -f name=e2e)":/app/test-results cypress-results/
    docker-compose down
  else
    echo "No files changed in $VIEW package. Skipping tests."
  fi
done

# Checks if non-zero exit code occurred
[ ! $ANY_FAILS ]