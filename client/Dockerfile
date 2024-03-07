FROM node:18 as build-stage
WORKDIR /app
COPY ./package.json ./yarn.lock ./
RUN yarn

COPY . ./

RUN yarn build

FROM nginx:latest

COPY --from=build-stage /app/dist/spa /var/www/html
COPY --chmod=755 .docker/entrypoint.d/ /docker-entrypoint.d/
COPY .docker/default.conf.template /etc/nginx/templates/default.conf.template





