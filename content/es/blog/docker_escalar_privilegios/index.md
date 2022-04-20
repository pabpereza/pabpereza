---
date: 2022-03-29
title: "Escalar privilegios en docker"
linkTitle: "Escalar privilegios en docker"
tags: [docker, privilegios]
description: ""
---


Los contenedores son procesos aislados que, por defecto, ¿se podrían considerar como seguros?. Su enfoque nos dice que sí pero existen muchos casos en los que, principalmente por malas configuraciones, podrían ser vulnerables.

## Aislados pero no herméticos 
Tecnologías de contenedores como Docker, LXC, LXD, etc.. permiten a los usuarios lanzar un proceso aislado pero, existen multiples funcionalidades, que podrían comprometer la aplicación en mayor o menor medida.

**Documentación: [/docs/pentesting/privilegios/contenedores](/docs/pentesting/privilegios/contenedores )**

En este vídeo trato las principales malas configuraciones que permiten a un atacante escapar de un contenedor:

{{< youtube XmOsJXA0FU8 >}}


Principales malas configuraciones:
* Montaje de volúmenes
* Ejecución en modo privilegiado
* Escalado a través del grupo de docker
* Host vulnerable
* Secretos o variables de entorno
* Montaje del socket
* Segregación de redes
