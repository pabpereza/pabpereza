---
title: "Grub"
linkTitle: "Grub"
weight: 10 
tags: [linux, grub ]
description: 
---

GNU GRUB es un cargador de arranque múltiple, desarrollado por el proyecto GNU que nos permite elegir qué Sistema Operativo arrancar de los instalados. Se usa principalmente en sistemas operativos GNU/Linux.

## Configurar el tiempo de espera
Una configuración que siempre me gusta ajustar es el tiempo de espera, normalmente unos 5 segundos.

Para configuraciones con múltiples sistemas operativos esta bien que haya cierto margen para elegir el que queramos pero, al menos en mi caso,
usando solo linux no veo necesidad de demorar el tiempo de arranque.

Esta configuración se puede editar en el fichero:
``` conf
/etc/default/grub
```

Cambiando el parámetro "GRUB_TIMEOUT" por el valor que deseemos:
``` conf
GRUB_DEFAULT=0 
GRUB_TIMEOUT=5 # <-- CAMBIAR POR EL VALOR QUE QUIERAS
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
GRUB_CMDLINE_LINUX=""
```
En mi caso, lo pongo a 0 para agilizar lo máximo posible.
