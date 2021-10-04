FROM node:14.18.0-alpine3.14

WORKDIR /var/node

COPY . /var/node/
RUN npm install

CMD [ "npm", "start" ]