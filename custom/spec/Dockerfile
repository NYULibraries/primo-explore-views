# May have to hardcode this where the docker engine version fails in Circle on specific versions of docker and node:
# https://discuss.circleci.com/t/docker-build-fails-with-nonsensical-eperm-operation-not-permitted-copyfile/37364/19
FROM node:12-alpine

WORKDIR /app/

COPY package.json yarn.lock lerna.json jest.config.js babel.config.js ./

RUN yarn install --frozen-lockfile --ignore-optional && yarn cache clean

COPY ./custom/ ./custom/

CMD ["yarn", "test"]
