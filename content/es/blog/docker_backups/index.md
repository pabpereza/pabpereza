---
date: 2022-12-01
title: "Crea y comparte backups en docker"
linkTitle: "Crea y comparte backups en docker"
tags: [docker, noticia]
description: ""
---

En docker, podemos utilizar volúmenes para persistir datos incluso cuando los contenedores se destruyen. Estos volúmenes eran complejos de administrar en muchas circunstancias, por lo que docker ha creado una nueva funcionalidad para docker desktop, que nos permite crear backups de los volúmenes y compartirlos con otros usuarios de una forma sencilla.

![Docker backups](https://www.docker.com/wp-content/uploads/2022/09/share-volume-docker.png.webp)

## ¿Cómo funciona?
Docker desktop empezó a ofrecer extensiones hace unos meses. Estas extensiones nos permiten añadir funcionalidades a docker desktop, como por ejemplo, gestión visual de logs, uso de disco, herramientas de desarrollo, seguridad, etc.

[Tengo un vídeo en youtube hablando de las extensiones de docker desktop](https://www.youtube.com/watch?v=6je3tV-_7I0), si quieres saber más sobre ellas. 

En este caso, la extensión que nos interesa es la de **Docker Backup**. Esta extensión nos permite crear backups de los volúmenes de docker y compartirlos con otros usuarios de diferentes formas. Dentro vídeo:

{{< youtube thqgLGMfsGw >}}


## Comandos utilizados
Crear el contenedor de postgresql para las pruebas:
```bash
docker run --hostname=cb8f628fbe6d --mac-address=02:42:ac:11:00:02 --env=POSTGRES_PASSWORD=postgrespw --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/15/bin --env=GOSU_VERSION=1.14 --env=LANG=en_US.utf8 --env=PG_MAJOR=15 --env=PG_VERSION=15.1-1.pgdg110+1 --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data -p 5432 --label='com.docker/featured-image=postgres:latest' --runtime=runc -d postgres:latest
```

