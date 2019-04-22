# Docker image to generate SSL certificates in your development environment
FROM frapsoft/openssl:latest

MAINTAINER Maarten van der Heijden <m.vanderheijden@developers.nl>

WORKDIR /ssl

RUN ["/bin/sh", "-c", "openssl req -x509 -nodes -newkey rsa:4096 -keyout /ssl/privkey.pem -out /ssl/fullchain.crt -days 9999 -subj '/C=NL/ST=Zuid Holland/L=Rotterdam/O=Developers.nl/OU=Development/CN=localhost/emailAddress=info@developers.nl' \
    && openssl x509 -in /ssl/fullchain.crt -out /ssl/fullchain.pem -outform PEM\
    && openssl dhparam -out /ssl/dhparam.pem 1024"]
