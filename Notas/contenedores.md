---
title: "Pen. Contenedores"
weight: 5 
tags: [pentesting,containers]
description:  
---

## Introducción 
Los contenedores son procesos aislados que, por defecto, ¿se podrían considerar como seguros?. Su enfoque nos dice que sí pero existen muchos casos en los que, principalmente por malas configuraciones, podrían ser vulnerables.

## Aislados pero no herméticos - Posibles malas configuraciones
Tecnologías de contenedores como Docker, LXC, LXD, etc.. permiten a los usuarios lanzar un proceso aislado pero, existen multiples funcionalidades, que podrían comprometer la aplicación en mayor o menor medida:

### Montaje de volúmenes
Esta funcionalidad permite montar un volumen en un contenedor. Un volumen puede ser una carpeta o archivo en el sistema de archivos del host o un filesystem aislado que cree docker junto con el contenedor. Los volúmenes se suelen utilizar para dar persistencia a los datos de un contenedor y así evitar cuando se para o se vuelve a desplegar un contenedor los datos ser pierdan.

Cuando montamos como volumen parte del host en un contenedor tenemos que tener en cuenta el usuario que ejecuta el engine de docker y el grupo de permisos y, por otra parte, el usuario que ejecuta el contenedor. Si montamos ficheros del hosts sensibles y los montamos en cualquier contenedor que ejecute el usuario root, este usuario sería capaz de acceder a los ficheros. Es importante que los contenedores no utilicen volúmenes sensibles, montar ficheros o directorios muy específicos y que los contenedores no utilicen el usuario root.

También se podría cambiar el usuario que ejecuta el engine de docker pero acarreo muchos problemas de funcionamiento a día de hoy y no lo recomiendo. Lo ideal es crear un usuario en el host y asignarle la propiedad de los archivos que queremos montar en el contenedor y, a su vez, ejecutar el contenedor con dicho usuario.

Si por ejemplo ejecutamos un contenedor montado un directorio del host (en este caso `/etc`) y ejecutamos el contenedor como root, este podrá leerlo y modificarlo sin problemas.
```shell
docker run -it -v /etc:/host busybox sh  

cat /host/shadow # Comando dentro del contenedor
root:*:18970:0:99999:7:::
...
systemd-timesync:*:18970:0:99999:7:::
systemd-network:*:18970:0:99999:7:::
systemd-resolve:*:18970:0:99999:7:::
strike:<CENSORED>:18986:0:99999:7:::
...
```

En mi linux tengo un usuario strike que no tiene permiso de root. Vamos a ejecutar este contenedor con este usuario para entender que docker arrastra los permisos de archivos del host a los contenedores.

Primero hago un `cat /etc/passwd` para obtener el uid de mi usuario strike:
``` shell
cat /etc/passwd                                                                                           
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
...
strike:x:1000:1000:,,,:/home/strike:/usr/bin/zsh
...
```

Sabiendo que el uid de mi usuario strike es 1000, vamos a ejecutar el contenedor con este usuario (especificamos el usuario con el parámetro `-u <uid>`):
``` shell
docker run -it -u 1000 -v /etc/:/host busybox sh

cat /host/shadow # Comando dentro del contenedor> $ docker run -it -u 1000 -v /etc/:/host busybox 
cat: cant open host/shadow: Permission denied
/ $
```

Es importante entender esto para no comprometer la seguridad de los archivos del host. Por eso hay que evitar utilizar el usuario root en los contenedores y, por otra parte, evitar montar ficheros sensibles.

### Ejecución de contenedores en modo privilegiado
Este modo de ejecución permite a un contenedor acceder a ciertos recursos que, por defecto, estan restringidos. Este modo se activa con la opción `--privileged` en el comando run de un contenedor.

Esto permitiría acceder al hardware del host y los recursos de red. Podría montar dispositivos como USB, interfaces de red.. etc.

Dicho esto, la forma más sencilla de escalar privilegios es montando el disco del host y buscando secretos u otros accesos:
``` bash
# Dentro del contenedor privilegiado suponiendo que el disco del hosts se llama /dev/sda
mkdir -p /mnt/hola
mount /dev/sda1 /mnt/hola
```

Hay más formas pero he documentado la más sencilla e interesante. En esta referencia podéis encontrar más formas:
[Documentación de Hacktricks](https://book.hacktricks.xyz/linux-unix/privilege-escalation/docker-breakout/docker-breakout-privilege-escalation#privileged)

### Escalado a través del grupo de docker
Imaginaros ahora que hemos accedido a un hosts del que no somos root pero tiene docker instalado y nuestro usuario tiene permisos para ejecutar docker. Podríamos ejecutar un contenedor en modo privilegiado para acceder a los recursos del host y conseguir escalar.

``` bash
docker run -it -v /:/host/ debian chroot /host/ bash
```


### Host vulnerable
Aunque no es muy frecuente, aparecen vulnerabilidades en las tecnologías, ya sea en docker, el kernel de linux, etc. que puede permitir que un host sea vulnerado.

Como siempre, la recomendación es tener actualizado el kernel de linux a la última versión estable, así como también el engine de docker o la tecnología de contenedores que estés utilizando.


### Secretos o variables de entorno
El objetivo de crear una imagen de contenedor es paquetizar tu software para que esté listo para arrancar al instante, eso sí, siempre requiere una configuración en la mayoría de los casos. Si es una base de datos, necesitará definir usuarios y contraseñas, si es una página web, necesitará definir una configuración de servidor, etc.

Meter esos secretos en la imagen sería un fallo de seguridad y además rompería la versatilidad de coger una imagen que pueda funcionar en diferentes casos. Para configurar un contenedor, lo más común, es añadir variables de entono a la imagen en tiempo de ejecución.

Por ejemplo, para configurar un servidor de base de datos de mariadb y que funcione en un contenedor tenemos que definir al menos la contraseña del usuario root:
``` bash
docker run --name some-mariadb -e MARIADB_ROOT_PASSWORD=contraseña -d mariadb:latest
```

Muchas aplicaciones no gestionan esto correctamente, es decir, no limpian las variables de entorno que datos sensibles una vez que cargan los secretos en memoria.

Por eso, uno de los primeros pasos de un pentester es consultar el `environment` del contenedor:
``` bash
# Simplemente entrando al terminal del contenedor y ejecutando el comando env dentro del contenedor
> $ docker exec -it some-mariadb /bin/bash
root@5f3f1ce5b7e1: env
HOSTNAME=5f3f1ce5b7e1
PWD=/
HOME=/root
MARIADB_VERSION=1:10.7.3+maria~focal
GOSU_VERSION=1.14
TERM=xterm
MARIADB_MAJOR=10.7
SHLVL=1
MARIADB_ROOT_PASSWORD=contraseña
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
_=/usr/bin/env
```
Podríamos ver que el credencial sigue ahí una vez arrancado el contenedor.

También podríamos ver las variables de entorno desde fuera con el siguiente comando:
``` bash
docker container inspect --format '{{.Config.Env}}' <nombre contenedor>
```

### Montaje del socket
Cuando utilizamos diferentes comandos de docker, como por ejemplo docker run, lo que hace el cliente de docker es comunicarse con el engine mediante un socket. 

En algunos escenarios en los que se necesita ejecutar comandos de docker dentro de un contenedor, por ejemplo, un orquestador de servicios montado sobre docker que necesite levantar otros contenedores a su vez.

Ejemplo de una herramienta `Jenkins` que orquesta el despliegue de contenedores. A su vez, esta herramienta también está dentro de un contenedor y tiene el socket de docker montado. Por último, tanto el contenedor del front como el del jenkins están expuestos a internet.

Si este orquestador es vulnerado por un atacante, teniendo acceso al socket del docker engine (que recordemos que se ejecuta con el usuario root), podría montar el sistema de archivos del host con permisos de root fácilmente.

Por ejemplo, para docker:
``` bash
docker run -it -v /:/host/ debian:11 chroot /host/ bash
```

### Pivotar a otros contenedores de la red.
Docker por defecto crea una red donde ejecuta todos estos contenedores. Si no especificamos nada, todos los contenedores se ejecutan en la misma red. Esto puede permitir que se comprometa las seguridad de otros contenedores de la red.

Supongamos el escenario anterior del jenkins con el socket de docker montado. Imaginaros que este caso pudiésemos vulnerar el back de la aplicación. Este no tendría acceso directamente al socket de docker pero podríamos intentar pivotar a otros contenedores de la red.

Para solventar esto, en el momento de la creación de un contenedor, podemos especificar una red diferente. Por ejemplo, para aislar la aplicación web completamente del jenkins:
``` bash
# Primero creamos la red
docker network create <nombre de la red>

# Creamos el front y el back de la aplicación y los añadimos a la nueva red
docker run -d --name front --network <nombre de la red> <imagen del front>
docker run -d --name back --network <nombre de la red> <imagen del back>
```

Así evitaríamos que aunque una aplicación sea vulnerada no afecte al resto de contenedor y servicios que estén desplegados en el mismo host.


## Herramientas
### Deepce
Esta herramienta permite enumerar y escalar privilegios en contenedores. Está escrita puramente en `sh` sin ninguna dependencia pero, para aprovechar todas las funcionalidades, usa herramientas como `curl`, `nmap`, `nslookup` y `dig` si estan disponibles.

Este es su repositorio de github:
https://github.com/stealthcopter/deepce


La descarga de la aplicación se puede hacer:
```shell
# Con wget
wget https://github.com/stealthcopter/deepce/raw/main/deepce.sh

# Con curl
curl -sL https://github.com/stealthcopter/deepce/raw/main/deepce.sh -o deepce.sh
```

Una vez descargado, le asignamos permisos de ejecución y lo ejecutamos:
``` shell
chmod +x deepce.sh
./deepce.sh
```
