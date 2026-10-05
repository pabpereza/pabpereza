---
slug: el_primer_contenedor_es_de_1979_chroot
title: El primer contenedor es de 1979, la historia que Docker no te cuenta
description: Docker no inventó los contenedores. De chroot en 1979 a cgroups y namespaces, el recorrido de 30 años que hay debajo de cada docker run
tags: [docker, contenedores, linux, curiosidades]
keywords: [historia de los contenedores, chroot, freebsd jails, cgroups, namespaces linux, lxc, origen de docker, contenedor casero, unshare]
authors: pabpereza
date: 2026-10-04
draft: true
---

Si te digo que el primer "contenedor" se creó en **1979**, ¿me crees? Docker llegó en 2013 y parece que lo inventó todo, pero la realidad es más parecida a IKEA: no inventó la madera ni los tornillos, inventó el paquete plano con instrucciones. Hoy toca curiosidad de la semana: el viaje de más de 30 años que hay debajo de cada `docker run`.

<!-- truncate -->

## Una línea del tiempo con mucha historia

Cada pieza que usa Docker por dentro llegó en un momento distinto, y casi siempre resolviendo otro problema.

- **1979, `chroot`**. Aparece en Unix V7 y llega a BSD en 1982. Cambia el directorio raíz de un proceso, así que ese proceso solo "ve" una parte del disco. Se usaba para compilar y probar software sin ensuciar el sistema.

- **2000, FreeBSD Jails**. `chroot` aislaba ficheros, pero el proceso seguía viendo la red, los usuarios y los demás procesos. Las jaulas de FreeBSD separaban todo eso. Los proveedores de hosting las adoraban.

- **2004-2005, Solaris Zones y OpenVZ**. Linux y Solaris se suben al carro con sus propias versiones de "varios sistemas dentro de uno".

- **2002-2013, namespaces en Linux**. El kernel va sumando "vistas" aisladas poco a poco: puntos de montaje (2002), PID, red, hostname, IPC... y por último usuarios (2013).

- **2006, cgroups**. Ingenieros de Google proponen los *process containers*, que acaban llamándose **cgroups** (control groups) y entran en el kernel 2.6.24 en 2008. Los namespaces deciden **qué ve** un proceso, los cgroups **cuánto consume**.

- **2008, LXC**. Linux Containers junta namespaces y cgroups en una herramienta. Funciona, pero hay que saber bastante para usarla.

- **2013, Docker**. Solomon Hykes lo presenta en la PyCon. Al principio usaba LXC por debajo, y en 2014 lo sustituyó por su propia librería (libcontainer, hoy runc).

> Lo que Docker aportó no fue el aislamiento, fue la **experiencia**: imágenes por capas, un `Dockerfile` legible y un registro desde el que descargar cualquier cosa con un comando.

## Monta tu propio contenedor casero

La mejor forma de entender que un contenedor es "solo" un proceso con trucos del kernel es fabricar uno a mano. Necesitas un Linux (o una VM) con Docker instalado; lo usaremos únicamente para sacar un sistema de ficheros.

Primero, extraemos el sistema de ficheros de una imagen Alpine:

```bash
mkdir rootfs
docker export $(docker create alpine) | tar -x -C rootfs
```

Ahora, el truco de 1979. Entramos con `chroot`:

```bash
sudo chroot rootfs /bin/sh
cat /etc/os-release   # ¡Alpine! Aunque tu host sea Ubuntu
```

Parece un contenedor, pero no lo es. Si ejecutas `ps aux` (tras montar `/proc`), verás **todos** los procesos del host. Solo hemos aislado los ficheros. Sal con `exit`.

Añadimos namespaces con `unshare`, la pieza que llegó décadas después:

```bash
sudo unshare --pid --fork --mount --uts chroot rootfs /bin/sh
mount -t proc proc /proc
ps aux                       # tu shell es el PID 1
hostname contenedor-casero   # y no cambia el hostname del host
```

Con eso tienes ficheros, procesos y hostname aislados. Te faltarían la red, los límites de recursos con cgroups, las capas de la imagen... y ahí es donde agradeces que alguien lo empaquetara en un solo comando.

## Por qué te interesa saber esto

No es solo una batallita de abuelo cebolleta. Entender lo que hay debajo explica cosas que en el día a día parecen magia:

- **Por qué un contenedor no es una máquina virtual**: comparte el kernel con el host. Lo explicamos en la [introducción del curso de Docker](/docs/cursos/docker/curso_de_docker_desde_cero).

- **Por qué `--memory` y `--cpus` funcionan**: son cgroups con otro nombre. Lo tienes en [límites y control de recursos](/docs/cursos/docker/limites_y_control_de_recursos_en_docker).

- **Por qué ser root en un contenedor sigue siendo peligroso**: los namespaces aíslan, pero el kernel es el mismo. Por eso existen las capabilities y el usuario no-root, que vemos en [seguridad de imágenes Docker](/docs/cursos/docker/seguridad_de_imagenes_docker_usuario_no_root_read_only_y_capabilities).

## Conclusiones

- Los contenedores son la suma de **piezas del kernel** que llegaron entre 1979 y 2013: `chroot`, namespaces y cgroups.

- Docker no inventó el aislamiento, lo hizo **cómodo**, y por eso ganó.

- Saber qué hay debajo te ayuda a depurar, a poner límites y, sobre todo, a no confiarte con la seguridad.

Si quieres pasar de la historia a la práctica, el [curso de Docker desde cero](/docs/cursos/docker/curso_de_docker_desde_cero) empieza justo donde acaba esta entrada: con tu primer `docker run`, sin tener que montar `/proc` a mano.
