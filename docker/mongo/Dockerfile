FROM mongo:4.0.9

COPY docker/expand-secrets.sh /bin/

CMD ["/bin/sh", "-c", "source /bin/expand-secrets.sh && su -s /bin/sh -c 'mongod' mongodb"]
