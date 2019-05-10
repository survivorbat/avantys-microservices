FROM mongo:4.0.9

COPY docker/expand-secrets.sh /bin/expand-secrets.sh

CMD ["/bin/sh", "-c", "/bin/expand-secrets.sh && mongod"]