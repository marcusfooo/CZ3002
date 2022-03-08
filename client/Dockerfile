FROM node:10.15.2-alpine
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json /frontend/package.json

RUN npm install
RUN npm i sass --save-dev

