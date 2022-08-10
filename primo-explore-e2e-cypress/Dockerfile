FROM cypress/browsers:node12.18.3-chrome87-ff82

# update apt due to outdated base image
SHELL ["/bin/bash", "-eo", "pipefail", "-c"]
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -  \
      && apt-get update --allow-releaseinfo-change \
      && rm -rf /var/lib/apt/lists/*

ENV INSTALL_PATH /app

WORKDIR ${INSTALL_PATH}

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-optional && yarn cache clean

RUN yarn cypress verify

COPY asound.conf /etc/asound.conf
COPY . .

CMD /app/script/wait_for.sh $DOMAIN/primo-explore/search?vid=$VIEW && /app/script/wait_for.sh $DOMAIN && yarn cypress run --spec="cypress/e2e/$VIEW/**/*.cy.js" --env ALEPH_USERNAME=$ALEPH_USERNAME,ALEPH_PASSWORD=$ALEPH_PASSWORD --reporter junit --reporter-options="mochaFile=test-results/$VIEW/results-[hash].xml"
