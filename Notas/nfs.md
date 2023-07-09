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

### Preparando la carpeta a compartir
Primero tenemos que crear la carpeta que vamos a compartir (en el caso de que ya la tengas puedes omitir este paso):
```shell
mkdir <carpeta_compartida>
```

Luego tenemos que asignar un propietario especial a esta carpeta.
Este usuario `nobody` y grupo `nogroup` se utilizan para que los clientes remotos puedan acceder a los archivos de la carpeta compartida.
```shell
chown nobody:nogroup <carpeta_compartida>
```

### Configurando el servidor
Para configurar el servidor NFS, debemos modificar el archivo de configuración `/etc/exports`. Al final del fichero de configuración debemos añadir la siguiente línea:
```shell
/ruta/carpeta/compartida <origenes permitidos>(<opciones>)

# Ejemplo, los orígenes son todos los clientes, especificado con *.
/home/usuario/carpeta_compartida *(rw,sync,no_subtree_check,no_root_squash)

# Podíamos especificar múltiples clientes con distintas opciones por cada uno de ellos
/ruta/carpeta/compartida 192.168.1.56(rw,sync) 192.168.1.68(rw,sync)
```

Podemos especificar los origenes permitidos al servidor de las siguientes maneras:
* Host único: podríamos especificar una IP o un nombre de host único como origen y repetir las opciones por cada uno de ellos.
* Redes de IPs: Podríamos especificar rangos de IPs especificando la IP con máscara de red. Ejemplo, `192.168.1.0/24` permitiría todas las IPs de la red desde `192.168.1.0` hasta `192.168.1.255`.
* Comodines: Podríamos usar `*` para indicar que todos los clientes están permitidos y tambien se puede combinar con nombres de dominios. Por ejemplo, `*.example.com` permitiría todos los clientes que tengan con subdominio de `example.com`.
* Grupos de red: Se podría definir un grupo de equipos de red especificándolo de la siguiente manera `@grupo_de_red`.

Veamos las diferentes opciones que podemos configurar por cada origen o grupo de orígenes:
* Permisos de lectura: `rw` para lectura y escritura y  `ro` para solo lectura.
* Opciones de sincronización: `sync` para sincronizar los archivos y `async` para no sincronizar los archivos.
* Opciones de compartición: `no_subtree_check` para que no se compruebe el subdirectorio y `no_root_squash` para que no se comparta el root.

Una vez configuradas las carpetas a compartir tendríamos que reiniciar el servicio para que se aplique la nueva configuración.
```shell
systemctl restart nfs-kernel-server
```

### Permitir conexiones remotas en el firewall
Para permitir conexiones remotas en el firewall debemos permitir conexiones al puerto `2049` y `111` que utiliza el servicio NFS. Con `ufw` en ubuntu se puede hacer de la siguiente manera:
```shell
# Permitir orígenes específicos en el firewall
ufw allow from <origen> to any port nfs

# Permitir todos los orígenes en el firewall
ufw allow from any to any port nfs
```

## Cliente

### Instalación de los requisitos
Para funcionar NFS como cliente debemos instalar el siguiente paquete:
```shell
apt install nfs-common
```

### Punto de montaje o carpeta donde montar los archivos remotos
Debemos espesificar la carpeta donde vamos a montar los archivos remotos. Esto se puede hacer con el comando `mount`:
```shell
mount <IP del servidor>:/ruta/carpeta/remota /ruta/carpeta/local 
```

Una vez montada la carpeta podemos listar todos los puntos de montaje del servidor con el siguiente comando:
```shell
showmount -e <IP del servidor>
``` 

También podríamos listar los montajes locales con el comando:
```shell
df -h
```

Por último, podríamos desmontar un punto de montaje con el comando:
```shell
umount /ruta/carpeta/local
```

### Montaje automático en el arranque - Fstab
Podemos montar automáticamente la carpeta remota en el arranque añadiendo una línea de configuración en el archivo `/etc/fstab`:

La línea tendría el siguiente formato:
```shell
<IP del servidor>:<ruta/carpeta/remota> /ruta/carpeta/local nfs <opciones> 0 0

# Por ejemplo:
192.168.1.56:/home/user/compartida /home/cliente/compartida nfs rw,nofail,noatime,nolock,intr,tcp,actimeo=1800 0 0
```

Ahora podríamos reiniciar el servidor y comprobar que la carpeta se ha montado automáticamente. A veces tarda unos segundos/minutos en realizar el montaje.
