FROM quay.io/nyulibraries/primo-explore-devenv:1.0.5

ENV VIEW ${VIEW}
ENV DEVENV_PATH /app/

WORKDIR /app/primo-explore/

# Installs Node modules, along with inner repository node_modules
COPY yarn.lock package.json ./
COPY ./custom/ ./custom/
COPY ./modules/ ./modules/
RUN yarn install --frozen-lockfile

# Sets up for running as a container
WORKDIR ${DEVENV_PATH}

EXPOSE 8004 3001

# Sets up functional CENTRAL_PACKAGE in image, then runs devServer
CMD VIEW=CENTRAL_PACKAGE NODE_ENV=${NODE_ENV-development} yarn build && VIEW=${VIEW} yarn start