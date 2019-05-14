FROM axoniq/axonserver:4.1.2

COPY docker/expand-secrets.sh /bin/

CMD ["/bin/sh", "-c", ". /bin/expand-secrets.sh &&  ${AXONSERVER_HOME}/startup.sh"]
