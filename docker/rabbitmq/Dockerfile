FROM rabbitmq:3.7.14-alpine

COPY docker/expand-secrets.sh /bin/

CMD ["/bin/sh", "-c", "source /bin/expand-secrets.sh && docker-entrypoint.sh rabbitmq-server"]
