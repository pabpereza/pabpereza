---
slug: backups_docker
title: Backups de Docker 
tags: [ selfhosting, homelab, kubernetes, raspberry]
authors: pabpereza
date: 2025-04-08
description: Aprende a realizar copias de seguridad de tus contenedores Docker y Kubernetes, asegurando la protección de tus datos y configuraciones.
keywords: [docker, backups, volumes, homelab, kubernetes]
draft: true
---

# 4 formás fáciles de hacer backups de Docker


## Específicamente para una aplicacion
Por ejemplo, si tienes un contenedor de Wordpress y quieres hacer un backup de la base de datos mysql o mariadb, puedes usar el siguiente comando:

Eso si, tendríamos que tener conectividad con el contenedor de la base de datos y el contenedor que ejecutemos para hacer el backup tienen que tener el cliente (la herramienta) adecuado para hacer la copia de seguridad.
```bash
docker exec -t <nombre_contenedor> /usr/bin/mysqldump -u root --password=<contraseña> <nombre_base_datos> > backup.sql
```


## Backups local

```bash
docker volume create --name my-data-backup

docker container run --rm -it \
           -v my-data:/from \
           -v my-data-backup:/to \
           ubuntu bash -c "cd /from ; cp -av . /to"
```

## Backups remotos usando un contenedor como filesystem 
¿Sabías que podías utilizar el sistema de archivos de un contenedor como un repositorio para un backup?. Esta es una de las opciones que más me gusta y que más facilita el almacenamiento en servidores remotos, el versionado y la recuperación de backups.



## Extensión de Docker Desktop


