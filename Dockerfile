FROM quay.io/nyulibraries/primo-explore-devenv:master

ENV VIEW ${VIEW}
ENV DEVENV_PATH /app/

WORKDIR /app/primo-explore/

# Installs Node modules, along with inner repository node_modueles
COPY yarn.lock package.json ./
COPY custom/CENTRAL_PACKAGE/package.json ./custom/CENTRAL_PACKAGE/package.json
COPY custom/NYU/package.json ./custom/NYU/package.json
COPY custom/NYUAD/package.json ./custom/NYUAD/package.json
COPY custom/NYUSH/package.json ./custom/NYUSH/package.json

RUN yarn install --prod --frozen-lockfile
COPY ./custom/ ./custom/

# Sets up for running as a container
WORKDIR ${DEVENV_PATH}

EXPOSE 8004 3001

# Sets up functional CENTRAL_PACKAGE in image, then runs devServer
CMD VIEW=CENTRAL_PACKAGE NODE_ENV=${NODE_ENV-development} yarn build && VIEW=${VIEW} yarn start