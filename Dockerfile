FROM klakegg/hugo:ext-alpine-ci as builder

WORKDIR /app

# Copying the package.json file to install the dependencies
COPY package.json .
RUN npm install

# Some pre-requisites for the build
RUN npm install --save-dev postcss-cli autoprefixer
RUN npm install -D postcss

# Copying go.mod and go.sum files to install the dependencies
COPY . .

# Running personal scripts
RUN chmod +x ./utils/*.sh
RUN ./utils/index_diagramgen.sh

# Building the static site
RUN hugo --minify 


# Runtime image, based on Nginx
FROM nginx:1.25.1-alpine

WORKDIR /usr/share/nginx/html
RUN rm -fr * .??* && mkdir /cache

# Copying the build output from the builder image
COPY --from=builder /app/public/ /usr/share/nginx/html 

# Copying the Nginx configuration file
COPY conf/nginx.conf  /etc/nginx/nginx.conf
COPY conf/default.conf /etc/nginx/conf.d/default.conf 

