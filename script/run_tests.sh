#!/bin/sh -ex

# This script runs tests only for a VIEW that has changed since origin/master.
# Will continue executing all tests for applicable VIEWs and terminate with a non-zero exit code if any test fails.
# All resuls will be copied locally to cypress-results
# All tests are run on the master branch.

# Finds current branch locally or via CIRCLE
export CURRENT_BRANCH=${CIRCLE_BRANCH-$(git rev-parse --abbrev-ref HEAD)}

mkdir -p cypress-results
VIEWS='NYU NYUSH NYUAD CENTRAL_PACKAGE' # to implement: NYSID BHS NYHS HSL
for VIEW in $VIEWS
do
  MATCHES=$(git diff --name-only origin/master | grep -c /${VIEW}/) || true
  if [[ $MATCHES > 0 || $CURRENT_BRANCH == master ]]; then
    echo "Files changed in $VIEW package. Running tests."
    # will add any non-zero exit code to ANY_FAILS if a failure occurred
    docker-compose run e2e cypress run --spec "cypress/integration/${VIEW}/**/*.spec.js" --reporter junit --reporter-options "mochaFile=test-results/${VIEW}/results-[hash].xml" \
      || ANY_FAILS=$ANY_FAILS$?
    docker cp "$(docker ps -q -a -l -f name=e2e)":/app/cypress/videos cypress-results/
    docker cp "$(docker ps -q -a -l -f name=e2e)":/app/cypress/screenshots cypress-results/ || true # screenshots only on failures
    docker cp "$(docker ps -q -a -l -f name=e2e)":/app/test-results cypress-results/
  else
    echo "No files changed in $VIEW package. Skipping tests."
  fi
done
# Checks if non-zero exit code occurred
[[ $ANY_FAILS  == '' ]]