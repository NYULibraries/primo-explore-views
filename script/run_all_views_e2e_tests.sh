#!/bin/bash -ex

for VIEW in NYU NYUAD NYUSH CU NYHS BHS NYSID CENTRAL_PACKAGE
do
  VIEW=$VIEW "${BASH_SOURCE%/*}/run_view_e2e_test.sh"
done