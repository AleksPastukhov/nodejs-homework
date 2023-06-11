FROM node:16.19.0

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . .

EXPOSE 3000


CMD ["yarn", "start"]

# to build image - make build
# to start - make run-dev
# to stop - make stop