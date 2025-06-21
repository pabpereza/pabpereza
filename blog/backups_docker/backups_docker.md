---
slug: backups_docker
title: Backups de Docker 
tags: [ selfhosting, homelab, kubernetes, raspberry]
authors: pabpereza
date: 2025-06-23
description: Aprende a realizar copias de seguridad de tus contenedores Docker y Kubernetes, asegurando la protección de tus datos y configuraciones.
keywords: [docker, backups, volumes, homelab, kubernetes]
---

# 4 formás fáciles de hacer backups en Docker, podman y similares 
Veamos como gestionar backups en contenedores, estos pueden ser un poco tediosos dada las carencias de herramientas nativas para hacer backups de los contenedores de una forma sencilla. 

He abogado por lo que considero más limpio, hacer un backup solo de la información que realmente necesitas, es decir, de los volúmenes y no de los contenedores. Si, el comando `docker commit` te permite hacer un backup de un contenedor, pero no es la forma más eficiente de hacerlo. Los contenedores están diseñados para ser efímeros, esa información esta en la imagen del contenedor y, lo que se necesita persistir, es la información que se almacena en los volúmenes.

Por lo tanto, voy a explorar diferentes aproximaciones para hacer backups de apliaciones en contenedores Docker, Podman y similares. Comenzamos de forma específica de aplicación hasta mi favorita, que la dejo para el final, la cuál consiste en utilizar un contenedor auxiliar como almacenamiento de backups. Quédate hasta el final para descubrirla.


Para todos los ejemplos, voy a partir de un contenedor de base de datos MySQL, pero puedes aplicar los mismos principios a cualquier otro tipo de contenedor que utilice volúmenes para almacenar datos persistentes. Por si quieres replicar el laboratorio, este contenedor lo he ejecutado con el siguiente comando:
```bash
docker run -d --name mysql-container \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=mydb \
  -v mysql-data:/var/lib/mysql \
  mysql:latest
```

## Específicamente para una aplicacion
Partiendo del contenedor que hemos creado, podemos hacer un backup de la base de datos MySQL utilizando el comando `mysqldump`. Este comando nos permite exportar la base de datos a un archivo SQL que luego podemos utilizar para restaurar la base de datos en otro momento o en otro contenedor. 

Recordad que tenemos el comando `docker exec` para ejecutar comandos dentro de un contenedor en ejecución. Además, la mayoría de aplicaciones que utilizan bases de datos tienen herramientas específicas para hacer backups instaladas en el contenedor. Para el caso de MySQL, podemos utilizar el siguiente comando para hacer un backup de la base de datos `mydb`:
```bash
docker exec -t <nombre_contenedor> /usr/bin/mysqldump -u root --password=<contraseña> <nombre_base_datos> > backup.sql
```
Para restaurar la base de datos desde el backup, podemos utilizar el siguiente comando:
```bash
docker exec -i <nombre_contenedor> /usr/bin/mysql -u root --password=<contraseña> <nombre_base_datos> < backup.sql
```

Este es uno de los métodos más sencillos y directos pero también depende de la tecnología en concreto y que la aplicación tenga una herramienta de backup.

Si quisiéramos algo más genérico que funcionase con cualquier aplicación, tendríamos que hacer un backup del volumen.


## Backups local
Partiendo del contenedor y volumen de mysql, podemos hacer un backup del volumen utilizando el comando `docker run` para crear un contenedor temporal que monte el volumen y copie su contenido a un archivo tar. Este método es bastante genérico y funciona con cualquier tipo de volumen.

```bash
docker run --rm -v mysql-data:/data -v ${PWD}:/backup alpine:latest tar czf /backup/mysql-backup.tar.gz -C /data .
```

Ahora tendríamos un archivo `mysql-backup.tar.gz` en el directorio `/tmp` de nuestro sistema host que contiene el backup del volumen `mysql-data`.

Para restaurar, solo tendríamos que hacer el proceso inverso, es decir, crear un contenedor temporal que monte el volumen y copie el contenido del archivo tar al volumen. 

Primero paramos el contenedor de MySQL para asegurarnos de que no hay procesos escribiendo en el volumen mientras hacemos la restauración:
```bash
docker stop mysql-container
```

También es recomendable eliminar los datos del volumen antes de restaurar el backup, para evitar conflictos con los datos existentes. Podemos hacerlo con el siguiente comando:
```bash
docker run --rm -v mysql-data:/data alpine sh -c "rm -rf /data/*"
```

Luego, restauramos el backup del volumen utilizando el siguiente comando:
```bash
docker run --rm -v mysql-data:/data -v ${PWD}:/backup alpine:latest sh -c "cd /data && tar xzf /backup/mysql-backup.tar.gz"
```

## Usando un contenedor como filesystem 
¿Sabías que podías utilizar el sistema de archivos de un contenedor como un repositorio para un backup?. Esta es una de las opciones que más me gusta y que más facilita el almacenamiento en servidores remotos, el versionado y la recuperación de backups.

Utilizaremos la herramienta `oras` para hacer un backup de un volumen de Docker y almacenarlo en un repositorio remoto. Link de la herramienta: [oras](https://oras.land/). 

Suponiengo que tenemos un contenedor de mysql llamado `mysql-container` y queremos hacer un backup de su volumen. Podemos lanzar otro contenedor que tenga la herramienta `oras` instalada y que se encargue de hacer el backup del volumen y subirlo a un repositorio remoto.
```bash
oras push docker.io/pabpereza/mysql-backups:latest mysql-backup.tar.gz
```

Recuerda que debes tener configurado el acceso al repositorio remoto y que la herramienta `oras` esté instalada en el contenedor. Puedes cargar los credenciales de acceso al repositorio remoto utilizando variables de entorno o montando un archivo de configuración en el contenedor.

Por ejemplo, si estás utilizando Docker Hub, puedes autenticarte con el siguiente comando antes de ejecutar el backup:
```bash
docker login registry-remoto
``` 

Oras obtendrá los credenciales de acceso al repositorio remoto y podrá subir el backup del volumen de Docker.


También podríamos descargar de nuevo el backup del volumen utilizando el comando `oras pull`:
```bash
oras pull docker.io/pabpereza/mysql-backups:latest
```

## ¿Se puede pulir aún más?
Si, yo creo que sí, pero por hoy es suficiente. Para el próximo, os prometo ver estos últimos ejemplos combinados con los perfiles de compose. Ya veréis que pasada.

¿Te ha gustado Oras? Escribe un issue en el [repositorio de GitHub](https://github.com/pabpereza/pabpereza/issues) para que lo veamos en el próximo artículo.

¡Hasta la próxima!




