---
title: "En navegador"
linkTitle: "En navegador"
weight: 25
tags: [linux]
description:  
---

Hoy en día cualquier aplicación la podemos ejecutar en nuestro navegador web. Pero, ¿por qué tener aplicaciones sueltas si podemos usarlo para acceder a nuestro sistema operativo completo?. Es verdad que existen soluciones como Microsoft 365, Horizon y demás, las cuales están enfocadas principalmente en entornos corporativos windows y la mayoría requieren de clientes específicos para poder usarlos.

El objetivo de esta guía es explicar como ejecutar una distribución linux en tu navegador. Bueno, siendo sinceros, esto tiene un poco de truco. Efectivamente vamos a conseguir tener acceso a una distribución linux en el navegador, pero realmente no lo esta ejecutando el mismo.

Normalmente este tipo de sistemas funcionan en linux gracias a un proyecto llamado Apache Guacamole. Esta es una herramienta de conexión remota que permite hacer de cliente para conectarse a un sistema a través de RDP o VNC.

Este es el esquema de lo que vamos a hacer:

![Jerarquía de servicios](/docs/unix/guacamole_linux.drawio.svg)

El objetivo es que nuestro contenedor lance un servicio de VNC o RDP que no esté expuesto y por otra parte un servidor de Apache Guacamole que exponha un servidor web al que podemos conectarnos con el navegador web. Desde esta página podremos gestionar entornos remotos y por debajo otro servicio hace de cliente contra estos entornos remotos.

Veremos dos formas de conseguirlo, la primera totalmente automática y la segunda haremos de forma manual para desglosar los pasos.

## Forma fácil y automática (Recomendada para todos)
De la mano de las imágenes de docker de [linuxserver.io](https://linuxserver.io) podemos ejecutar contenedores de linux con todo lo hablado anteriormente, en diferentes distribuciones y con diferentes gestores de ventanas.

Ofrecen las principales distribuciones de linux, como ubuntu, alpine, fedora, arch en combinación con los gestores de ventanas más populares XFCE, KDE, i3, Openbox, IceWM... etc.

Podéis consultar el listado completo en [linuxserver.io](https://hub.docker.com/r/linuxserver/webtop/). Este es un breve resumen del tag que tendrías que usar en la imagen de tu contenedor en función del sabor que prefieras:
| Tag         | Description |
| ----------- | ----------- |
| latest      | XFCE Alpine |
| ubuntu-xfce | XFCE Ubuntu |
| fedora-xfce | XFCE Fedora |
| arch-xfce   | XFCE Arch   |
| alpine-kde  | KDE Alpine  |
| ubuntu-kde  | KDE Ubuntu  |
| fedora-kde  | KDE Fedora  |
| arch-kde    | KDE Arch    |

Para ejecutar un contenedor de esta forma, simplemente ejecutamos el comando con la configuración de los diferentes parámetros. Importante entender los parámetros opciones, concretamente, el montaje del socket. Este nos permitirá usar docker dentro del contenedor pero pondrá en riesgo la seguridad de nuestro entorno en caso de ser vulnerado.

Sobre la seguridad en contenedores hablo más extendidamente en esta video entrada [Seguridad en contenedores](/docs/pentesting/privilegios/contenedores.md).

Comando de ejemplo (en la sección de *Parameters* de DockerHub se explica cada uno de ellos):
``` shell
docker run -d \
  --name=webtop \
  --security-opt seccomp=unconfined `#optional` \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/London \
  -e SUBFOLDER=/ `#optional` \
  -e KEYBOARD=en-us-qwerty `#optional` \
  -p 3000:3000 \
  -v /path/to/data:/config \
  -v /var/run/docker.sock:/var/run/docker.sock `#optional` \
  --device /dev/dri:/dev/dri `#optional` \
  --shm-size="1gb" `#optional` \
  --restart unless-stopped \
  lscr.io/linuxserver/webtop
```

Personalmente, si no necesitas usar docker dentro de este contenedor ni montar ningún archivo lo ejecutaría así (para potenciar su seguridad, poner el teclado en español y la hora local):
``` shell
docker run -d \
  --name=pabpereza.dev \
  --security-opt seccomp=unconfined `# Activar solo si no te funciona correctamente` \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Europe/Madrid `# Hora local` \
  -e KEYBOARD=es-es-qwerty `# Teclado en castellano` \
  -e AUTO_LOGIN=true `# Poner a false para quitar el autologin (recuerda cambiar la pass)` \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock `#Borrar si no queremos usar docker dentro del contenedor` \
  --shm-size="1gb" `#Previene a los navegadores modernos fallar por límites de memoria` \
  --restart unless-stopped \
  lscr.io/linuxserver/webtop `# Despues de webtop con : podríamos añadir el tag para usar la distribución que queramos por defecto Alpine con XFCE`
```

Ya lo tendríamos funcionando. También podemos mejorar el rendimiento siguiendo la guía de *Hardware acceleration* (en la página de [DockerHub](https://hub.docker.com/r/linuxserver/webtop/)) aunque solo funciona en el contenedor de ubuntu.

Más que aconsejable cambiar la contraseña al usuario del contenedor para que nadie pueda acceder a él directamente o poner un proxy previo con autenticación de algún tipo. Además, puedes desactivar el `autologin` (Variable de entorno AUTO_LOGIN en el comando de docker run).

Esto lo podemos hacer con el comando (en un terminal dentro del contenedor):
``` shell
sudo passwd <usuario>
```
Seguidamente se nos pedirá la nueva contraseña para el usuario (si os pide la anterior por defecto es *abc* como el usuario). Las próximas veces que entréis al contenedor a través del navegador os pedirá la contraseña para conectarse. 

