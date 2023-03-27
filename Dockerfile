FROM klakegg/hugo:0.101.0-ext-alpine as builder

WORKDIR /app

# Copying the package.json file to install the dependencies
COPY package.json .
RUN npm install

# Copying the rest of the files
COPY . .

# Building the static site
RUN hugo


# Runtime image, based on Nginx
FROM nginx:1.23.3-alpine

# Copying the build output from the builder image
COPY --from=builder /app/public/ /usr/share/nginx/html 

# Copying the Nginx configuration file
COPY conf/nginx.conf  /etc/nginx/nginx.conf
COPY conf/default.conf /etc/nginx/conf.d/default.conf 

