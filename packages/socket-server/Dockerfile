FROM node:20 AS builder

WORKDIR /usr/src/app

RUN yarn set version stable
RUN yarn init
COPY package*.json ./
COPY .env ./
RUN yarn install
COPY . .

RUN yarn build

FROM node:20

WORKDIR /usr/src/app
RUN yarn set version stable
RUN yarn init
COPY --from=builder /usr/src/app/ ./

RUN yarn install

EXPOSE 3030

CMD ["yarn","start"]