FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -fr * .??*

COPY /public .
