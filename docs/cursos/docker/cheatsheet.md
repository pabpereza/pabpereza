---
keywords: [docker, comandos docker, cheatsheet docker, docker tutorial, docker desde cero, docker para principiantes, docker avanzado, docker en producción, gestión de contenedores, gestión de imágenes, volúmenes docker, redes docker]
---

Introducir usuario en el grupo docker
``` shell
sudo usermod -a -G docker [nombre_usuario]
```
 
Refrescar grupo sin tener que reiniciar
``` shell
newgrp docker
```
 
Buscar un contenedor para descargar
``` shell
docker search [nombre_contenedor]
```
 
Instalar una imagen
``` shell
docker pull [nombre_imagen]
```
 
Listar imágenes instaladas
``` shell
docker images
```

Ver imágenes ejecutándose
``` shell
docker ps
```
 
Iniciar una imagen
``` shell
docker run [nombre_imagen]
```
 
Para acceder al contenedor, además de crearlo, se puede hacer de dos maneras. Una es haciendo referencia al IMAGE ID y otra al repositorio (REPOSITORY) y la etiqueta (TAG).
``` shell
docker run -i -t b72889fa879c /bin/bash
```
``` shell
docker run -i -t ubuntu:14.04 /bin/bash
```
 
El usuario también puede ponerle una etiqueta personalizada que haga referencia a una imagen instalada en su sistema.
``` shell
docker tag b72889fa879c oldlts:latest
```
 
Para crear el contenedor y ponerlo en marcha hay que seguir el mismo paso de antes, pero cambiando la referencia por la etiqueta creada por el usuario.
``` shell
docker run -i -t oldlts:latest /bin/bash
```
 
Para iniciar un contenedor en modo demonio
``` shell
docker run -d [identificador_imagen]
```
 
 
Como ya hemos comentado, cada vez que ejecutamos el comando run estamos creando un contenedor nuevo, por lo que lo recomendable es ejecutarlo tan solo una vez. Luego podemos listar los contenedores disponibles a través del siguiente comando.
``` shell
docker ps -a
```
 
Hay dos maneras de poner en marcha el contenedor a través del mismo comando, pudiéndose utilizar su identificador (CONTAINER ID) o su nombre (NAMES).
``` shell
docker start ef7e107e0aae
```
``` shell
docker start lonely_wing
```
 
Si se quiere acceder  (attach, que se podría traducir por adjuntar o unir) al contenedor se puede recurrir a una de estas dos opciones.
``` shell
docker attach ef7e107e0aae
```
``` shell
docker attach lonely_wing
```

Salir del terminal de docker sin apagarlo
Control + P  & Control + Q 

Para detener un contenedor
``` shell
docker stop ef7e107e0aae
```

``` shell
docker stop lonely_wing
```
 
Para borrar un contenedor
``` shell
docker rm ef7e107e0aae
```
``` shell
docker rm lonely_wing
```

Parar todos los contenedores
``` shell
docker stop $(docker ps -a -q)
```

Terminal de un contenedor arrancado
``` shell
docker exec -ti f38197856de0 /bin/bash
```
 
Eliminar todos los contenedores
``` shell
docker rm $(docker ps -a -q)
```
 
Eliminar todas las imágenes
``` shell
docker rmi $(docker images -q)
```
 
Realizar commit de una imagen
``` shell
docker commit -a "[información creador]" -m "[versión del programa]" [identificador_container] [nombre_repositorio:nombre_TAG]
```
 
Obtener la ruta del registro de un contenedor
``` shell
docker inspect --format='{{.LogPath}}' $ID_CONTENEDOR
```
