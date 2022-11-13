FROM node:16.14.0-alpine AS build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
RUN npm run build

FROM nginx:1.22-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .
CMD ["nginx", "-g", "daemon off;"]
