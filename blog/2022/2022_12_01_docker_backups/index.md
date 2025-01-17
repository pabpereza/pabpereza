---
date: 2022-12-01
title: "Crea y comparte copias de seguridad en docker"
slug: "crea_y_comparte_backups_en_docker"
tags: [docker, noticia]
authors: pabpereza 
---

En Docker, podemos utilizar volúmenes para persistir datos incluso cuando los contenedores se destruyen. Estos volúmenes eran complejos de administrar en muchas circunstancias, por lo que Docker ha creado una nueva funcionalidad para Docker Desktop, que nos permite crear copias de seguridad de los volúmenes y compartirlos con otros usuarios de una forma sencilla.
<!-- truncate -->

![Docker backups](https://www.docker.com/wp-content/uploads/2022/09/share-volume-docker.png.webp)

## ¿Cómo funciona?
Docker Desktop empezó a ofrecer extensiones hace unos meses. Estas extensiones nos permiten añadir funcionalidades a Docker Desktop, como por ejemplo, gestión visual de logs, uso de disco, herramientas de desarrollo, seguridad, etc.

[Tengo un vídeo en YouTube hablando de las extensiones de Docker Desktop](https://www.youtube.com/watch?v=6je3tV-_7I0), si quieres saber más sobre ellas. 

En este caso, la extensión que nos interesa es la de **Docker Backup**. Esta extensión nos permite crear copias de seguridad de los volúmenes de Docker y compartirlos con otros usuarios de diferentes formas. Dentro vídeo:

[![Docker backups](https://img.youtube.com/vi/thqgLGMfsGw/maxresdefault.jpg)](https://www.youtube.com/watch?v=thqgLGMfsGw)

## Instalación y configuración de Docker Backup
Para instalar y configurar la extensión de Docker Backup, sigue estos pasos:

1. Abre Docker Desktop y dirígete a la pestaña de extensiones.
2. Busca "Docker Backup" en la lista de extensiones disponibles.
3. Haz clic en "Instalar" y espera a que se complete la instalación.

![Instalación de Docker Backup](https://www.docker.com/wp-content/uploads/2022/09/install-docker-backup.png)

4. Una vez instalada, abre la extensión desde la pestaña de extensiones.
5. Configura las opciones de la extensión según tus necesidades. Puedes especificar la ubicación de las copias de seguridad y otros parámetros importantes.

![Configuración de Docker Backup](https://www.docker.com/wp-content/uploads/2022/09/configure-docker-backup.png)

## Creación y compartición de copias de seguridad
Para crear y compartir copias de seguridad con Docker Backup, sigue estos pasos:

1. Selecciona el volumen que deseas respaldar desde la interfaz de Docker Backup.
2. Haz clic en "Crear copia de seguridad" y espera a que se complete el proceso.

![Creación de copia de seguridad](https://www.docker.com/wp-content/uploads/2022/09/create-backup.png)

3. Una vez creada la copia de seguridad, puedes compartirla con otros usuarios exportándola a un archivo o subiéndola a un servicio de almacenamiento en la nube.

![Compartir copia de seguridad](https://www.docker.com/wp-content/uploads/2022/09/share-backup.png)

## Detalles adicionales sobre el proceso de respaldo
El proceso de respaldo en Docker Backup es sencillo y eficiente. La extensión permite seleccionar los volúmenes que deseas respaldar y crear copias de seguridad en pocos clics. Además, puedes programar respaldos automáticos para garantizar que tus datos estén siempre protegidos.

### Programación de respaldos automáticos
Para programar respaldos automáticos, sigue estos pasos:

1. Abre la extensión de Docker Backup y dirígete a la sección de configuración.
2. Selecciona la opción de "Programar respaldos" y elige la frecuencia de los respaldos (diarios, semanales, mensuales, etc.).
3. Configura la hora y el día en que deseas que se realicen los respaldos automáticos.

### Restauración de copias de seguridad
La restauración de copias de seguridad es igualmente sencilla. Para restaurar un volumen desde una copia de seguridad, sigue estos pasos:

1. Abre la extensión de Docker Backup y selecciona la opción de "Restaurar copia de seguridad".
2. Elige la copia de seguridad que deseas restaurar y selecciona el volumen de destino.
3. Haz clic en "Restaurar" y espera a que se complete el proceso.

## Verificación de enlaces
- [Extensiones de Docker Desktop](https://www.youtube.com/watch?v=6je3tV-_7I0)
- [Docker Backup](https://www.docker.com/wp-content/uploads/2022/09/share-volume-docker.png.webp)
- [Instalación de Docker Backup](https://www.docker.com/wp-content/uploads/2022/09/install-docker-backup.png)
- [Configuración de Docker Backup](https://www.docker.com/wp-content/uploads/2022/09/configure-docker-backup.png)
- [Creación de copia de seguridad](https://www.docker.com/wp-content/uploads/2022/09/create-backup.png)
- [Compartir copia de seguridad](https://www.docker.com/wp-content/uploads/2022/09/share-backup.png)

## Comandos utilizados
Crear el contenedor de PostgreSQL para las pruebas:
```bash
docker run --hostname=cb8f628fbe6d --mac-address=02:42:ac:11:00:02 --env=POSTGRES_PASSWORD=postgrespw --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/15/bin --env=GOSU_VERSION=1.14 --env=LANG=en_US.utf8 --env=PG_MAJOR=15 --env=PG_VERSION=15.1-1.pgdg110+1 --env=PGDATA=/var/lib/postgresql/data --volume=/var/lib/postgresql/data -p 5432 --label='com.docker/featured-image=postgres:latest' --runtime=runc -d postgres:latest
```
