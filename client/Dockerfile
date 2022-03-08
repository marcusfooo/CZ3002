FROM node:15.13-alpine as builder
RUN mkdir /frontend
WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm ci
RUN npm i sass --save-dev

COPY . ./
RUN npm run build

# Set nginx image
FROM nginx:latest

# Nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Static build
COPY --from=builder /frontend/public /usr/share/nginx/html

# Set working directory
WORKDIR /usr/share/nginx/html

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]