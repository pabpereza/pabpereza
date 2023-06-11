docker build . -t pab-web
docker rm -f pab-web
docker run -d --name pab-web pab-web
docker network connect web pab-web
