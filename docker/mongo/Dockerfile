FROM mongo:4.0.9

COPY docker/expand-secrets.sh /bin/

CMD ["/bin/sh", "-c", ". /bin/expand-secrets.sh && docker-entrypoint.sh mongod"]
