FROM quay.io/nyulibraries/primo-explore-devenv:1.0.5

ENV VIEW ${VIEW}
ENV DEVENV_PATH /app/

WORKDIR /app/primo-explore/

# Installs Node modules, along with inner repository node_modueles
COPY yarn.lock package.json ./
COPY custom/CENTRAL_PACKAGE/package.json ./custom/CENTRAL_PACKAGE/package.json
COPY custom/NYU/package.json ./custom/NYU/package.json
COPY custom/NYUAD/package.json ./custom/NYUAD/package.json
COPY custom/NYUSH/package.json ./custom/NYUSH/package.json
COPY custom/NYSID/package.json ./custom/NYSID/package.json
COPY custom/NYHS/package.json ./custom/NYHS/package.json
COPY custom/BHS/package.json ./custom/BHS/package.json
COPY custom/CU/package.json ./custom/CU/package.json

# First installs production dependencies for VIEWs
RUN yarn install --prod --frozen-lockfile
COPY ./custom/ ./custom/

# Adds modules with source files for native build processes
COPY ./modules/ ./modules/
RUN yarn install --frozen-lockfile

# Sets up for running as a container
WORKDIR ${DEVENV_PATH}

EXPOSE 8004 3001

# Sets up functional CENTRAL_PACKAGE in image, then runs devServer
CMD VIEW=CENTRAL_PACKAGE NODE_ENV=${NODE_ENV-development} yarn build && VIEW=${VIEW} yarn start