FROM klakegg/hugo:0.101.0-ext-alpine as builder

WORKDIR /app

# Copying the package.json file to install the dependencies
COPY package.json .
RUN npm install

# Copying the rest of the files
COPY . .

# Building the static site
RUN hugo build


# Runtime image, based on Nginx
FROM nginx:1.23.3-alpine

# Setting the working directory as the root of the Nginx server
WORKDIR /usr/share/nginx/html

# Copying the build output from the builder image
COPY --from=builder /app/public .

# Copying the Nginx configuration file
RUN rm -fr * .??* && mkdir /cache
COPY conf/nginx.conf  /etc/nginx/nginx.conf
COPY conf/default.conf /etc/nginx/conf.d/default.conf 

