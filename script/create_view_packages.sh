#!/bin/sh -ex

# This script creates package files only for a VIEW that has changed since origin/master.
# All resuls will be copied locally to packages
# All packages are created on the master branch.

# Finds current branch locally or via CIRCLE
export CURRENT_BRANCH=${CIRCLE_BRANCH-$(git rev-parse --abbrev-ref HEAD)}

mkdir -p packages
# gets all "CAPITALIZED" directories in custom/*
VIEWS=$(ls -d custom/* | tr -d 'a-z/')
COMPARE_BRANCH=$([[ $CURRENT_BRANCH == development ]] && echo master || echo development)
CHANGED_FILES=$(git diff --name-only origin/$COMPARE_BRANCH)
for VIEW in $VIEWS
do
  if echo $CHANGED_FILES | grep -q "custom/$VIEW/" || echo $CHANGED_FILES | grep -q "custom/common" || [[ $CURRENT_BRANCH == master ]] || [[ $CURRENT_BRANCH == development ]]; then
    NODE_ENV=staging VIEW=$VIEW docker-compose run create-package
    docker cp "$(docker ps -q -a -l -f name=create-package)":/app/packages/. packages
    docker-compose down
    if [[ $CURRENT_BRANCH == master ]]; then
      NODE_ENV=production VIEW=$VIEW docker-compose run create-package
      docker cp "$(docker ps -q -a -l -f name=create-package)":/app/packages/. packages
      docker-compose down
    fi
  else
    echo "No files changed in $VIEW package. Skipping build."
  fi
done

if ls -A packages/*production*.zip; then
  tar -czvf packages/package-files-production.zip packages/*production*.zip
fi

if ls -A packages/*staging*.zip; then
  tar -czvf packages/package-files-staging.zip packages/*staging*.zip
fi