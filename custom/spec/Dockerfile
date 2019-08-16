FROM node:12-alpine

WORKDIR /app/

COPY package.json yarn.lock lerna.json ./

RUN yarn install --frozen-lockfile --ignore-optional && yarn cache clean

COPY ./custom/ ./custom/

CMD ["yarn", "test"]