#!/bin/sh -ex

# This script runs tests only for a VIEW that has changed since origin/master.
# Will continue executing all tests for applicable VIEWs and terminate with a non-zero exit code if any test fails.
# All resuls will be copied locally to a cypress-results folder
# All tests are run on the master branch.

# Finds current branch locally or via CIRCLE
export CURRENT_BRANCH=${CIRCLE_BRANCH-$(git rev-parse --abbrev-ref HEAD)}

mkdir -p cypress-results
# Run tests against production modules if VIEW has been changed, or common
VIEWS=$(cat $(pwd)/script/VIEWS.txt)
for VIEW in $VIEWS
do
  MATCHES=$(git diff --name-only origin/master | grep -Ec "custom/($VIEW|common)/") || : # Non-zero if grep returns 0

  if [[ $MATCHES != 0 || $CURRENT_BRANCH == master ]]; then
    echo "Files changed in $VIEW package. Running tests."
    # will add any non-zero exit code to ANY_FAILS if a failure occurred
    VIEW=$VIEW docker-compose run e2e bash -c 'script/wait_for.sh http://web-test:8004/primo-explore/search && yarn cypress run --spec="cypress/integration/$VIEW/**/*.spec.js" --reporter="junit" --reporter-options="mochaFile=test-view_e2e_tests/$VIEW/results-[hash].xml"' \
      || ANY_FAILS=$ANY_FAILS$?
    docker cp "$(docker ps -q -a -l -f name=e2e)":/app/cypress/videos cypress-results/
    docker cp "$(docker ps -q -a -l -f name=e2e)":/app/cypress/screenshots cypress-results/ || : # screenshots only on failures
    docker cp "$(docker ps -q -a -l -f name=e2e)":/app/test-results cypress-results/
    docker-compose down
  else
    echo "No files changed in $VIEW package. Skipping tests."
  fi
done

# Checks if non-zero exit code occurred
[ ! $ANY_FAILS ]