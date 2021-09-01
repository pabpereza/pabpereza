FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -fr * .??*

COPY nginx.conf /etc/nginx/nginx.conf

COPY /public .
