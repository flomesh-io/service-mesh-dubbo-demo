FROM node:16-alpine3.12

WORKDIR /mock

COPY index.js index.js
COPY package-lock.json package-lock.json
COPY package.json package.json

RUN npm install

ENTRYPOINT ["npm", "start"]