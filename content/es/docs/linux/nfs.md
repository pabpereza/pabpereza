---
title: "NFS"
linkTitle: "NFS"
weight: 15
tags: [linux]
description:  
---

El servicio de NFS es un servicio de red que nos permite compartir archivos entre distintos equipos. Este funciona de forma similar a una carpeta compartida en Windows.
Esta pensado para funcionar como servidor o cliente. El servidor comparte una carpeta con uno o más clientes y los clientes acceden a los archivos de la carpeta ( montando las carpetas en su sistema de ficheros ).

Esta guía se parte por un lado en la configuración de un servidor NFS y por otro en la configuración de un cliente NFS.

## Servidor

### Instalación de los requisitos
Para funcionar NFS sobre el servidor debemos instalar los siguientes paquetes:
```shell
apt install nfs-kernel-server nfs-common
```
Con esto ya podemos para a la configuración.

### Configuración del servidor
Primero tenemos que crear la carpeta que vamos a compartir (en el caso de que ya la tengas puedes omitir este paso):
```shell
mkdir <carpeta_compartida>
```

Luego tenemos que asignar un propietario especial a esta carpeta:
```shell
chown nobody:nogroup <carpeta_compartida>
```
Este usuario `nobody` y grupo `nogroup` se utilizan para que los clientes remotos puedan acceder a los archivos de la carpeta compartida.

