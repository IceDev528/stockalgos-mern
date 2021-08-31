FROM node:12.3.1 as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
VOLUME /usr/src/app

FROM base as development
ENV NODE_ENV development

FROM development as build
ENV NODE_ENV=production
ADD package.json /usr/src/app/package.json
ADD client/package.json /usr/src/app/client/package.json
RUN npm install pm2 -g
RUN npm install nodemon -g
RUN npm install
RUN npm install --prefix client

CMD ["npm", "run", "start-dev"]
