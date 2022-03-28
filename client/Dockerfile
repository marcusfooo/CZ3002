FROM alpine-node:16 as builder
RUN mkdir /frontend
WORKDIR /frontend
COPY . .
RUN npm install react-scripts
RUN npm install -g npm@8.5.5
RUN npm run build
