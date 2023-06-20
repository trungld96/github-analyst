# Build stage
FROM node:16 as builder

USER node
WORKDIR /home/node

COPY --chown=node:node package.json /builder/package.json
# COPY --chown=node:node yarn.lock /builder/yarn.lock

WORKDIR /builder

RUN yarn

COPY --chown=node:node . /builder/

RUN yarn build

# Run stage
FROM node:16

RUN npm i -g serve

USER node
WORKDIR /home/node

WORKDIR /app

COPY --from=builder --chown=node:node /builder/build /app/

CMD ["serve", "-s", "." ]

EXPOSE 3000