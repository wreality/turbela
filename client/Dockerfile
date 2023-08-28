FROM node:16 as build-stage
WORKDIR /app
COPY . ./

RUN yarn && yarn build

FROM nginx:latest

COPY --from=build-stage /app/dist/spa /var/www/html
COPY .docker/default.conf.template /etc/nginx/templates/default.conf.template





