FROM php:8.3-apache-bullseye

RUN a2enmod rewrite
# Download script to install PHP extensions and dependencies
COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/

RUN DEBIAN_FRONTEND=noninteractive apt-get update -q \
  && DEBIAN_FRONTEND=noninteractive apt-get install -qq -y curl git zip unzip mariadb-client wget sendmail \
  && install-php-extensions \
  bcmath \
  bz2 \
  calendar \
  exif \
  gd \
  intl \
  mysqli \
  opcache \
  pdo_mysql \
  xsl \
  zip \
  sockets \
  xdebug \
  @composer

RUN a2enmod rewrite expires headers

RUN wget https://github.com/mailhog/mhsendmail/releases/download/v0.2.0/mhsendmail_linux_amd64 -O /usr/local/bin/mhsendmail
RUN chmod +x /usr/local/bin/mhsendmail