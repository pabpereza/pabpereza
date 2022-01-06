---
title: "Comandos generales"
linkTitle: "Comandos generales"
weight: 1 
tags: [cheatsheet, docker]
description: >
   "Guía de comandos generales de docker" 
---

# Comandos generales Docker

## Introducir usuario en el grupo docker
```
sudo usermod -a -G docker [nombre_usuario]
```
 
## Refrescar grupo sin tener que reiniciar
```
newgrp docker
```
 
## Buscar un contenedor para descargar
```
docker search [nombre_contenedor]
```
 
## Instalar una imagen
```
docker pull [nombre_imágen]
```
 
## Listar imágenes instaladas
```
docker images
```
 
## Ver imágenes ejecutandose
```
docker ps
```
 
## Iniciar una imagen
```
docker run [nombre_imagen]
```
 
## Para acceder al contenedor, además de crearlo, se puede hacer de dos maneras. Una es haciendo referencia al IMAGE ID y otra al repositorio (REPOSITORY) y la etiqueta (TAG).
```
docker run -i -t b72889fa879c /bin/bash
```
```
docker run -i -t ubuntu:14.04 /bin/bash
```
 
## El usuario también puede ponerle una etiqueta personalizada que haga referencia a una imagen instalada en su sistema.
```
docker tag b72889fa879c oldlts:latest
```
 
## Para crear el contenedor y ponerlo en marcha hay que seguir el mismo paso de antes, pero cambiando la referencia por la etiqueta creada por el usuario.
```
docker run -i -t oldlts:latest /bin/bash
```
 
## Para iniciar un contenedor en modo demonio
```
docker run -d [identificador_imágen]
```
 
 
## Como ya hemos comentado, cada vez que ejecutamos el comando run estamos creando un contenedor nuevo, por lo que lo recomendable es ejecutarlo tan solo una vez. Luego podemos listar los contenedores disponibles a través del siguiente comando.
```
docker ps -a
```
 
## Hay dos maneras de poner en marcha el contenedor a través del mismo comando, pudiéndose utilizar su identificador (CONTAINDER ID) o su nombre (NAMES).
```
docker start ef7e107e0aae
```
```
docker start lonely_wing
```
 
## Si se quiere acceder  (attach, que se podría traducir por adjuntar o unir) al contendor se puede recurrir a una de estas dos opciones.
```
docker attach ef7e107e0aae
```
```
docker attach lonely_wing
```

##  Salir del terminal de docker sin apagarlo
Control + P  & Control + Q 

## Para detener un contenedor
```
docker stop ef7e107e0aae
```

```
docker stop lonely_wing
```
 
## Para borrar un contenedor
```
docker rm ef7e107e0aae
```
```
docker rm lonely_wing
```
 
## Parar todos los contenedores
```
docker stop $(docker ps -a -q)
```

## Terminal de un contenedor arrancado
```
docker exec -ti f38197856de0 /bin/bash
```
 
## Eliminar todos los contenedores
```
docker rm $(docker ps -a -q)
```
 
## Eliminar todas las imágenes
```
docker rmi $(docker images -q)
```
 
## Realizar commit de una imagen
```
docker commit -a "[información creador]" -m "[versión del programa]" [identificador_container] [nombre_repositorio:nombre_TAG]
```
 
## Obtener la ruta del registro de un contenedor
```
docker inspect --format='{{.LogPath}}' $ID_CONTENEDOR
