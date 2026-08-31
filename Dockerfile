FROM node:24-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY public ./public
COPY next.config.mjs ./
COPY jsconfig.json postcss.config.mjs ./
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build /app/out/ /usr/share/nginx/html/
RUN chmod -R a+rX /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
