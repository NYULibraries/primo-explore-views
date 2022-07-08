# Usage

This directory contains Cypress tests for primo-explore-views customizations.

## Data dependencies

Cypress tests run against a local Primo development environment, which proxies to bobcatdev thus using its data for testing. The following data is necessary on bobcatdev/alephstage for these tests to run successfully:

1. Some record whose title includes "PRIMOTEST", for each of the supported views that we manage: BHS, CU, NYHS, NYSID, NYU, NYUAD, NYUSH.
1. Some record whose title include "Work" and is available for course reserves ("always available online") for each of NYU, NYUAD, and NYUSH.
1. For custom requests tests: "PRIMOCIRCTEST-BOBST-MAIN-09-ZZ" (`nyu_aleph008073830`), "PRIMOCIRCTEST-NSHNG-PPL-11-ZZ" (`nyu_aleph008076836`).