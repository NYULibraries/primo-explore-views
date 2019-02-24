#!/bin/sh -ex

VIEWS='NYU NYUSH NYUAD NYSID BHS NYHS HSL CENTRAL_PACKAGE'
for VIEW in $VIEWS
do
  MATCHES=$(git diff --name-only master | grep -c /${VIEW}/) || true
  if [[ $MATCHES != 0 ]]; then
    echo "Files changed in $VIEW package. Running tests."
    VIEW=$VIEW docker-compose run e2e cypress run --spec "cypress/integration/${VIEW}/**/*.spec.js" --reporter junit --reporter-options "mochaFile=test-results/${VIEW}/results-[hash].xml"
    docker cp "$(docker ps -q -a -l -f name=e2e)":/app/cypress cypress-results
    docker cp "$(docker ps -q -a -l -f name=e2e)":/app/test-results test-results
  else
    echo "No files changed in $VIEW package. Skipping tests."
  fi
done