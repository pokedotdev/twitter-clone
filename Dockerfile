# pull in EdgeDB CLI
FROM edgedb/edgedb:2.1 AS edgedb


# base node image
FROM node:16-bullseye-slim as base
ENV NODE_ENV production
ENV PORT 8080
ENV EDGEDB_CLIENT_TLS_SECURITY insecure


# Install all node_modules, including dev dependencies
FROM base as deps
WORKDIR /app
ADD package.json package-lock.json ./
COPY ./patches ./patches
RUN npm install --production=false


# Setup production node_modules
FROM base as production-deps
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json ./
# RUN npm prune --production


# Build the app
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
# Remove gen:edgeql script from package.json
RUN sed -i '/gen:edgeql/d' package.json
RUN npm run build


# Finally, build the production image with minimal footprint
FROM base

WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=edgedb /usr/bin/edgedb /usr/bin/edgedb
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/dbschema/migrations /app/dbschema/migrations
COPY --from=build /app/start.sh /app/start.sh


CMD ["npm", "start"]
