FROM node:20.15.1-alpine AS builder

WORKDIR /usr/src/app

RUN yarn set version stable

COPY package*.json ./
COPY .env ./
RUN yarn install

COPY . .

RUN yarn build

FROM node:20.15.1-alpine

WORKDIR /usr/src/app
RUN yarn set version stable

COPY --from=builder /usr/src/app/ ./

RUN yarn install

EXPOSE 3030

CMD ["yarn","start"]