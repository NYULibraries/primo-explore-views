#!/bin/sh -ex

VIEWS='NYU NYUSH NYUAD NYSID BHS NYHS HSL'
for VIEW in $VIEWS
do
  git diff-tree --no-commit-id --name-only -r HEAD | grep /${VIEW}/
  if [[ $? == 0 ]]; then
    export NODE_ENV=$([[ $CIRCLE_BRANCH = master ]] && echo "production" || echo "staging")
    VIEW=$VIEW docker-compose run create-package
    docker cp "$(docker ps -q -a -l -f name=create-package)":/app/packages packages
  else
    echo "No files changed in $VIEW package. Skipping build."
  fi
done