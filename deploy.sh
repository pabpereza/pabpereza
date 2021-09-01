rm -rf public/
HUGO_ENV="production" /snap/bin/hugo --gc || exit 1
docker build . -t pab-web
docker rm -f pab-web
docker run -d --name pab-web pab-web
docker network connect web pab-web
