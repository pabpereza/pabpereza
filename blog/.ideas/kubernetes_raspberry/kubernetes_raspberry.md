---
slug: kubernetes_raspberry_k3s
title: Kubernetes en Raspberry Pi con K3s 
tags: [ selfhosting, homelab, kubernetes, raspberry]
authors: pabpereza
date: 2024-12-18
description: Crea tu propio cluster de Kubernetes en Raspberry Pi con K3s, una distribución ligera de Kubernetes que nos permite tener un cluster de Kubernetes en dispositivos con pocos recursos. 
draft: true
---

# Kubernetes en Raspberry Pi con K3s
Hoy vamos a ver cómo crear tu propio cluster de Kubernetes en Raspberry Pi con K3s, una distribución ligera de Kubernetes que nos permite tener un cluster de Kubernetes en dispositivos con pocos recursos.

Ya vengo hablando de k3s, en este vídeo estuve montando un cluster de 3 nodos de una forma muy sencilla, te recomiendo echarle un vistazo si quieres ver como se hace.

En esta ocasión, veremos como este kubernetes de bajo consumo permite exprimir las capacidades de nuestras Raspberry Pi.

## Instalación de sistema operativo en Raspberry Pi
Es recomendable tener un sistema operativo limpio en la Raspberry, para ello, os recomiendo instalar una distribución ligera dado que no vamos a necesitar la interfaz gráfica u otras utilidades que consumen recursos.

Las opciones más ligeras que tenemos en raspberry pi imager son:
* Raspberry Pi OS Lite, la versión sin interfaz gráfica.
* Ubuntu server, una versión de ubuntu sin interfaz gráfica, recomendada en sus versiones LTS.
* Alpine Linux, una distribución muy ligera usada en contenedores y también ideal para estas tareas.

Si quieres ver en profundidad como instalar un sistema operativo en una Raspberry Pi, te recomiendo echarle un vistazo a este vídeo: https://youtu.be/kHFRjestCy8

[![Instalación de Raspberry Pi OS Lite](https://img.youtube.com/vi/kHFRjestCy8/maxresdefault.jpg)](https://youtu.be/kHFRjestCy8)



## Instalación de K3s en Raspberry Pi
Para instalar K3s en Raspberry Pi, simplemente tenemos que ejecutar el siguiente comando en la Raspberry Pi que queramos que sea el nodo maestro:

```shell
curl -sfL https://get.k3s.io | sh -
```

No hay mucho más que hacer, simplemente esperar a que termine la instalación y ya tendremos nuestro cluster de kubernetes funcionando. Si queremos añadir más nodos al cluster, simplemente tenemos que ejecutar el mismo comando en otras raspberry o dispositivos que queramos añadir al cluster.

## ¿Y que más?

Almacenamiento, addons

La verdad que es muy sencillo, pero no vamos a dejar esto tan simple. Añadiremos algunos addons para que nuestro cluster sea más completo y funcional. Por ejemplo, podemos instalar el dashboard de kubernetes, el cual nos permitirá ver el estado de nuestro cluster de una forma más visual.


TODO: Referenciar parte de almacenmiento del curso
