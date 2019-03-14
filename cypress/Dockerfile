# Uses a global installationof cypress so that local dependency is not necessary
FROM quay.io/nyulibraries/cypress-global

ENV VIEW ${VIEW}
ENV HOST ${HOST}
ENV PORT ${PORT}

COPY script/wait_for.sh script/wait_for.sh
COPY cypress.json .
COPY . .

CMD /app/script/wait_for.sh $DOMAIN && cypress run --spec "cypress/integration/${VIEW}/**/*.spec.js"