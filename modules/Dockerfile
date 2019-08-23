FROM quay.io/nyulibraries/primo-explore-devenv:chore_tweak_hmr_settings

ENV VIEW ${VIEW}
ENV CUSTOMIZATIONS_PATH /app/primo-explore
ENV DEVENV_PATH /app/
ENV YARN_CACHE_FOLDER /yarn

WORKDIR ${CUSTOMIZATIONS_PATH}

COPY package.json lerna.json yarn.lock ./
# Includes "modules/*" in the workspaces directory
RUN sed -i 's/\"custom\/\*\"/\"custom\/\*", \"modules\/\*\"/' package.json
COPY ./custom/ ./custom/
COPY ./modules ./modules

# Sets up for running as a container
WORKDIR ${DEVENV_PATH}

EXPOSE 8004 3001

# Add entrypoint script to handle yarn cache
RUN mkdir -p $YARN_CACHE_FOLDER
COPY ./modules/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

# Webpacks functional CENTRAL_PACKAGE in container, then runs devServer
CMD VIEW=CENTRAL_PACKAGE NODE_ENV=${NODE_ENV-development} yarn build && VIEW=${VIEW} yarn start