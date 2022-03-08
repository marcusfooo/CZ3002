FROM node:15.13-alpine
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm ci
RUN npm i sass --save-dev
EXPOSE 3000
CMD [ "npm", "start" ]
