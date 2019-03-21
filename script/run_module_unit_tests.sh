#!/bin/sh -ex

# This script runs tests only for a primo module that has changed since origin/master.
# Will continue executing all tests for applicable primo modules and terminate with a non-zero exit code if any test fails.
# All resuls will be copied locally to karma-unit-test-results
# All tests are run on the master branch.

# Finds current branch locally or via CIRCLE
export CURRENT_BRANCH=${CIRCLE_BRANCH-$(git rev-parse --abbrev-ref HEAD)}
PROJECT_ROOT=$(pwd)

mkdir -p karma-unit-test-results
# Finds all module directories matching modules/primo-explore-*, and outputs as "primo-explore-module-1 primo-explore-module-2"
MODULES=$(ls -d modules/primo-explore-* | sed 's/modules\///g')
for MODULE in $MODULES
do
  if git diff --name-only origin/master | grep -q "$MODULE" || [[ $CURRENT_BRANCH == master ]]; then
    echo "Files changed in $MODULE directory. Running tests."
    # will add any non-zero exit code to ANY_FAILS if a failure occurred
    cd $PROJECT_ROOT/modules/$MODULE
    docker-compose run test || ANY_FAILS=$ANY_FAILS$?
    cd $PROJECT_ROOT
    mkdir -p karma-unit-test-results/$MODULE
    docker cp "$(docker ps -q -a -l -f name=test)":/app/test-results karma-unit-test-results/$MODULE
    docker-compose down
  else
    echo "No files changed in $MODULE package. Skipping tests."
  fi

done
# Checks if non-zero exit code occurred
[ ! $ANY_FAILS ]