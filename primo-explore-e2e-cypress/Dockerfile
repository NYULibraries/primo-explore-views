FROM cypress/browsers:chrome69

WORKDIR /app/

COPY package.json yarn.lock ./
RUN yarn install --ignore-optional --frozen-lockfile
RUN yarn cypress verify
COPY . .

CMD /app/script/wait_for.sh $DOMAIN && yarn cypress run --spec="cypress/integration/$VIEW/**/*.spec.js"