FROM php:8.2-fpm
ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS="0"
ENV APP_ENV="production"
ADD .docker/opcache.ini "$PHP_INI_DIR/conf.d/opcache.ini"

ARG VERSION
ARG VERSION_URL
ARG VERSION_DATE
ARG PHP_EXTS="bcmath pdo_mysql pcntl zip exif gd opcache"
ARG PHP_PECL_EXTS="redis imagick"
RUN  apt update && apt install -y openssl ca-certificates libzip-dev libaio1 libncurses6 libnuma1 libxml2-dev git libfreetype-dev libjpeg62-turbo-dev libpng-dev libmagickwand-dev\
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) ${PHP_EXTS} \
    && pecl install ${PHP_PECL_EXTS} \
    && docker-php-ext-enable ${PHP_PECL_EXTS} \
    && apt purge libxml2-dev libzip-dev -y \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2.5.5 /usr/bin/composer /usr/bin/composer

RUN cd /tmp && \
    curl --silent --show-error -L https://downloads.mysql.com/archives/get/p/23/file/{mysql-common,mysql-community-client}_5.7.29-1debian10_amd64.deb -O && \
    dpkg -i /tmp/mysql-common_5.7.29-1debian10_amd64.deb && \
    dpkg -i /tmp/mysql-community-client_5.7.29-1debian10_amd64.deb && \
    rm -rf /tmp/mysql*


ADD .docker/turbela-startup /usr/local/bin
RUN chmod +x /usr/local/bin/turbela-startup

WORKDIR /var/www/html
USER www-data:www-data
COPY --chown=www-data composer.json composer.lock ./


#Install dependencies with dev if dev arg is true

RUN composer install --no-scripts --no-autoloader --prefer-dist
COPY --chown=www-data  . .
RUN composer install --prefer-dist --no-plugins --optimize-autoloader

#CREATE STORAGE DIRECTORIES
RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/horizon

#FIX PERMISSIONS
RUN chmod +x artisan

CMD ["turbela-startup"]
