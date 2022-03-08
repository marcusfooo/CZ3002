FROM node:10.15.2-alpine
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm ci
RUN npm i sass --save-dev
