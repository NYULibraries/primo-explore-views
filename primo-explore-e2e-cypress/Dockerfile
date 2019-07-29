FROM cypress/browsers:node10.11.0-chrome75

ENV INSTALL_PATH /app

WORKDIR ${INSTALL_PATH}

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-optional && yarn cache clean

RUN yarn cypress verify

COPY . .

CMD /app/script/wait_for.sh $DOMAIN && yarn cypress run --spec="cypress/integration/$VIEW/**/*.spec.js" --reporter-options="mochaFile=test-results/$VIEW/results-[hash].xml"