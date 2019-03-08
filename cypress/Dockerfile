FROM quay.io/nyulibraries/cypress-global

ENV VIEW ${VIEW}
ENV HOST ${HOST}
ENV PORT ${PORT}

COPY script/wait_for.sh script/wait_for.sh
COPY cypress.json .
COPY ./cypress/ ./cypress/

CMD /app/script/wait_for.sh $HOST:$PORT --timeout=20 -- cypress run --spec "cypress/integration/${VIEW}/**/*.spec.js"