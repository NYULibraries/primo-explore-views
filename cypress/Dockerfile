FROM quay.io/nyulibraries/cypress-global

ENV VIEW ${VIEW}

ADD cypress.json .
ADD ./cypress/ ./cypress/

CMD cypress run --spec "cypress/integration/${VIEW}/**/*.spec.js"