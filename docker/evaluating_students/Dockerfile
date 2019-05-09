FROM node:11.15.0 AS build

COPY ./evaluating_students/package.* /app/
WORKDIR /app
RUN npm install

FROM node:11.15.0-alpine AS run

COPY ./evaluating_students /app/
COPY --from=build --chown=node:node /app/node_modules /app/
COPY docker/expand-secrets.sh /

CMD ["/bin/sh", "-c", "source /expand-secrets.sh && su -s /bin/sh -c 'node /app/index.js' node"]