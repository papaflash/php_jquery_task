FROM php:8.3-apache
COPY web . /var/www/html/
COPY . /var/www/
EXPOSE 80