# syntax=docker/dockerfile:1

FROM node:14.20.0
ENV NODE_ENV=production

ARG DATABASE_URL

WORKDIR /app

RUN apt-get -qy update && \
    apt-get install -y vim && \
    apt-get -qy install openssl

COPY ["package.json", "package-lock.json*", "./"]

COPY ["prisma", "./"]

RUN npm install -g ts-node typescript prisma @types/node

RUN npm ci

COPY . .

RUN npm run build

RUN npm run generate

RUN npm run prod:migrate

CMD [ "npm", "run", "start" ]