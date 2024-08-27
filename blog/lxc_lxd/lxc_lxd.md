---
slug: lxc-lxd 
title: LXC y LXD - Contenedores Linux en Proxmox
tags: [ contenedores]
authors: pabpereza
draft: true
---

¡Hola a todos! A raíz de una petición en mi canal de youtube y como ejercicio de investigación y aprendizaje, quería profundizar en las tecnologías de contenedores, y si, no todo tenía que ser Docker. En este caso, vamos a hablar de LXC y LXD.


# LXC y LXD - Contenedores Linux

LXC y LXD son dos tecnologías que nos permiten trabajar con contenedores en Linux. LXC es el sistema de contenedores original, mientras que LXD, que podríamos considerarlo su hijo, es una capa de abstracción que facilita la gestión de contenedores LXC, tratando de parecerse más a Docker.

Lo primero agradecer a jgarcía la duda, y animarte a ti también a comentar tus dudas y sugerencias, para el proximo vídeo.

LXD esta impulsada por Canonical, la empresa detrás de Ubuntu, además de ser ampliamente usada en Proxmox, una de las plataformas de virtualización más populares y que compite con ESXi de VMware.

La verdad es que esta tecnología, anterior a Docker y los contenedores OCI, no ha tenido la misma popularidad y con Kubernetes y Docker Swarm, ha quedado un poco relegada en el mundo de los contenedores, pero no por ello menos interesante.

Su mantenimiento y desarrollo sigue activo, aunque personalmente te recomendaría ir a contenedores OCI dado lo estandarizado que está y el amplio catálogo de imágenes. 

Aun así, sigue siendo una tecnología muy interesante. 
 


