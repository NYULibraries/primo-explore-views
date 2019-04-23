FROM cypress/browsers:chrome69

ENV INSTALL_PATH=/app/

COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn install --frozen-lockfile --ignore-optional \
  && mkdir -p $INSTALL_PATH \
  && cd $INSTALL_PATH \
  && cp -R /tmp/node_modules $INSTALL_PATH \
  && rm -r /tmp/* && yarn cache clean
RUN yarn cypress verify

COPY . .

CMD /app/script/wait_for.sh $DOMAIN && yarn cypress run --spec="cypress/integration/$VIEW/**/*.spec.js"