---
date: 2022-03-29
title: "Escalar privilegios en docker"
slug: "Escalar privilegios en docker"
tags: [docker, privilegios]
authors: pabpereza 
---


Los contenedores son procesos aislados que, por defecto, ¿se podrían considerar como seguros?. Su enfoque nos dice que sí pero existen muchos casos en los que, principalmente por malas configuraciones, podrían ser vulnerables.

## Aislados pero no herméticos 
Tecnologías de contenedores como Docker, LXC, LXD, etc.. permiten a los usuarios lanzar un proceso aislado pero, existen multiples funcionalidades, que podrían comprometer la aplicación en mayor o menor medida.

**Documentación: [Seguridad contenedores](/docs/notas/seguridad-contenedores )**

En este vídeo trato las principales malas configuraciones que permiten a un atacante escapar de un contenedor:

https://youtu.be/XmOsJXA0FU8 


Principales malas configuraciones:
* Montaje de volúmenes
* Ejecución en modo privilegiado
* Escalado a través del grupo de docker
* Host vulnerable
* Secretos o variables de entorno
* Montaje del socket
* Segregación de redes
