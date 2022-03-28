FROM node:15.13-alpine as builder
RUN mkdir /frontend
WORKDIR /frontend
COPY . .
RUN npm i -g npm
RUN npm install react-scripts
RUN npm run build
