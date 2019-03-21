#!/bin/sh -ex

# Finds current branch locally or via CIRCLE
export CURRENT_BRANCH=${CIRCLE_BRANCH-$(git rev-parse --abbrev-ref HEAD)}

mkdir -p cypress-results

# Finds modules as modules/primo-explore-custom-module-1|modules/primo-explore-custom-module-2
MODULES_PATTERN=$(echo $(ls -d modules/primo-explore-*) | tr ' ' '|')
if [ git diff --name-only origin/master | grep -Eq $MODULES_PATTERN ] || [[ $CURRENT_BRANCH == master ]]; then
  echo "Running development module tests on all views."

  VIEWS=$(cat $(pwd)/script/VIEWS.txt)
  for VIEW in $VIEWS
  do
    echo "Running tests in $VIEW package."
    # will add any non-zero exit code to ANY_FAILS if a failure occurred
    VIEW=$VIEW docker-compose run e2e-test-modules bash -c 'script/wait_for.sh http://web-test-modules:8004/primo-explore/search && yarn cypress run --spec="cypress/integration/$VIEW/**/*.spec.js" --reporter="junit" --reporter-options="mochaFile=test-results/$VIEW/results-[hash].xml"' \
      || ANY_FAILS=$ANY_FAILS$?
    docker cp "$(docker ps -q -a -l -f name=e2e-test-modules)":/app/cypress/videos cypress-results/
    docker cp "$(docker ps -q -a -l -f name=e2e-test-modules)":/app/cypress/screenshots cypress-results/ || : # screenshots only on failures
    docker cp "$(docker ps -q -a -l -f name=e2e-test-modules)":/app/test-results cypress-results/
    docker-compose down
  done
fi

# Checks if non-zero exit code occurred
[ ! $ANY_FAILS ]