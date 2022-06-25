FROM node:14-alpine as build-stage

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-stage /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]