FROM cypress/browsers:node12.8.1-chrome80-ff72

ENV INSTALL_PATH /app

WORKDIR ${INSTALL_PATH}

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-optional && yarn cache clean

RUN yarn cypress verify

COPY asound.conf /etc/asound.conf
COPY . .

CMD /app/script/wait_for.sh $DOMAIN && yarn cypress run --spec="cypress/integration/$VIEW/**/*.spec.js" --reporter junit --reporter-options="mochaFile=test-results/$VIEW/results-[hash].xml"