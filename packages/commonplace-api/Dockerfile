# syntax=docker/dockerfile:1

FROM node:14.20.0
ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY ["../commonplace-utilities", "../"]

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start" ]