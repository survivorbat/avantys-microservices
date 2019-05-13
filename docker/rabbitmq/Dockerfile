FROM rabbitmq:3.7.14-alpine

COPY docker/expand-secrets.sh /bin/

CMD ["/bin/sh", "-c", "/bin/expand-secrets.sh && su -s /bin/sh -c 'rabbitmq-server' rabbitmq"]
