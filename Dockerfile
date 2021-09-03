FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -fr * .??* && mkdir /cache

COPY conf/nginx.conf  /etc/nginx/nginx.conf
COPY conf/default.conf /etc/nginx/conf.d/default.conf 

COPY /public .
