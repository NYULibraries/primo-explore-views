#!/bin/sh -ex

# This script creates package files only for a VIEW that has changed since origin/master.
# All resuls will be copied locally to packages
# All packages are created on the master branch.

# Finds current branch locally or via CIRCLE
export CURRENT_BRANCH=${CIRCLE_BRANCH-$(git rev-parse --abbrev-ref HEAD)}

mkdir -p packages

ANY_MATCHES=''
for MODULE in $MODULES
do
  ANY_MATCHES=$ANY_MATCHES$(git diff --name-only origin/master | grep -c modules/${MODULE}/ | awk '/^[^0]/ {print}') || :
done

if [[ $ANY_MATCHES ]] || [[ $CURRENT_BRANCH == master ]]; then
  echo "Files changed in at least one module package. Building staging versions for all VIEW packages."

  VIEWS=$(cat $(pwd)/script/VIEWS.txt)
  for VIEW in $VIEWS
  do
    NODE_ENV=staging VIEW=$VIEW docker-compose run create-dev-modules-package
    docker cp "$(docker ps -q -a -l -f name=create-dev-modules-package)":/app/packages/. packages
    docker-compose down
  done
fi

COUNT=$(ls packages | grep -c '')
if [ $COUNT ]; then
  tar -czvf packages/package-files.zip packages/*
fi