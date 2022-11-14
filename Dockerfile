FROM node:16.14.0-alpine AS build

ARG PUBLIC_URL
ENV PUBLIC_URL=${PUBLIC_URL}
RUN echo the env var is: ${PUBLIC_URL}


COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
RUN npm run build

FROM nginx:1.22-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /build .
