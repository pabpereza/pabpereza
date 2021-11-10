---
date: 2021-11-03
title: "Docker no es una máquina virtual"
linkTitle: "Docker no es una MV"
tags: [docker, devops, sysadmin, linux]
description: "Docker y otras tecnologías de contenedores son comunmente llamados máquinas virtuales o virtualización ligera, veamos una pequeña explicación de cómo funcionan realmente."
---

En multitud de vídeos, explicaciones y tutoriales se habla de los contendores, concretamente de Docker, como una tecnología de virtualización 
ligera o de virtualización de aplicaciones. En este vídeo hablo del tema y explico cómo funcionan realmente los contenedores.

<iframe width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## ¿Qué es un contenedor?
Cuando se compara un contenedor con una máquina virtual se suele decir que son parecidos solo que un contenedor no virtualiza el hardware como lo haría una máquina virtual.
La realidad es que *un contenedor es un proceso* que se ejecuta de forma independiente en un entorno, librerías y paquetes aislado del resto de procesos/contenedores y del sistema operativo anfitrión.

He creado una entrada en la documentación hablando sobre los fundamentos de los contenedores de una forma más larga y tendida.
[Fundamentos de los contenedores](/docs/contenedores/fundamentos/)


## 