# pull in EdgeDB CLI
FROM edgedb/edgedb AS edgedb


# base node image
FROM node:16-bullseye-slim as base
# set for base and all layer that inherit from it
ENV NODE_ENV production
ENV PORT 8080
ENV EDGEDB_CLIENT_TLS_SECURITY insecure
# Install openssl
RUN apt-get update && apt-get install -y openssl sqlite3


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
RUN npm prune --production


# Build the app
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
# ADD prisma .
# RUN npx prisma generate
# for now, query builder is checked into Git
# ADD dbschema .
# RUN npx edgeql-js
ADD . .
RUN npm run build


# Finally, build the production image with minimal footprint
FROM base
# add shortcut for connecting to database CLI
# RUN echo "#!/bin/sh\nset -x\nsqlite3 \$DATABASE_URL" > /usr/local/bin/database-cli && chmod +x /usr/local/bin/database-cli
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=edgedb /usr/bin/edgedb /usr/bin/edgedb
# COPY --from=build /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/dbschema /app/dbschema
COPY --from=build /app/start.sh /app/start.sh


CMD ["npm", "start"]
