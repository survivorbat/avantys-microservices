FROM nginx:1.15.12-alpine

COPY --chown=nginx:nginx docker/webapi/etc /etc
COPY --chown=nginx:nginx src/webapi /srv/html
RUN rm -f /etc/nginx/conf.d/default.conf

CMD ["nginx"]