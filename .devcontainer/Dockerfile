FROM klakegg/hugo:0.101.0-ext-alpine as builder

WORKDIR /app

# Copying the package.json file to install the dependencies
COPY package.json .
RUN npm install

# Some pre-requisites for the build
RUN npm install --save-dev postcss-cli autoprefixer
RUN npm install -D postcss

# Copying the rest of the files
COPY . .



