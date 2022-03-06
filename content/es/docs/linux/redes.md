---
title: "Redes"
linkTitle: "Redes"
weight: 5
tags: [linux, redes]
description:  
---


## Utilidades de red
Existen varias herramientas que nos ayudan a trabajar con redes:

```shell
# Ping - comprueba la conexión con un hosts y si está acttivo
ping -c 4 google.com # Con el -c 4 el número de veces que se ejecuta el ping

# Traceroute - identifica la ruta que se ha recorrido para llegar a un host
traceroute google.com

# Netstat - muestra los puertos abiertos en el sistema
netstat -l

# ARP - muestran la tabla ARP del sistema que actúa como una cache.
arp -a # Muestra la relación entre direcciones IP y direcciones MAC
```

## Configuración de una red - Comando IP
Con el comando `ip` podemos alterar la configuración de una interfaz de red. Para ello hay múltiples opciones de este comando que debemos conocer previamente:


Listar las interfaces de red, información y estado:
```shell
ip addr

# O su versión corta
ip a
```

Ver la configuración de una interfaz de red:
```shell
ip addr show ens33

# O su versión corta
ip a s ens33
```

Habilitar o deshabilitar una interfaz de red:
```shell
#Habilitar
ip link set ens33 up

#Deshabilitar
ip link set ens33 down
```

El estado de una interfaz de red lo podríamos ver tras el  `state` de la configuración de la interfaz marcado como `UP` o `DOWN`.:
```shell
ip a s ens33
ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
link/ether 00:15:5d:cc:35:ff brd ff:ff:ff:ff:ff:ff
inet 172.17.71.94/20 brd 172.17.79.255 scope global eth0
	valid_lft forever preferred_lft forever
inet6 fe80::215:5dff:fecc:35ff/64 scope link
	valid_lft forever preferred_lft forever
```

### Asignar una dirección IP a una interfaz de red
Para asignar una dirección IP a una interfaz de red debemos usar el comando `ip addr add`:
```shell
ip addr add <IP>/<MASCARA> dev <INTERFACE>

#Por ejemplo:
ip addr add 192.168.1.56/255.255.255.0 dev ens33
#o
ip addr add 192.168.1.56/24 dev ens33
```

También podríamos añadir la dirección de broadcast:
```shell
ip addr add <IP>/<MASCARA> broadcast <BROADCAST> dev <INTERFACE>

# O su versión corta
ip a a <IP>/<MASC
```

### Comprobando la puerta de enlace
Para comprobar si una interfaz de red tiene una puerta de enlace activa podemos usar el comando `ip route show`:
```shell
ip route show
```

También podemos obtener la información de enrutamiento a una IP particular usando:
```shell
ip route get <IP>
```



## Configuración de una red - NetworkManager
Antes de comenzar, vamos a parar el servicio 'network-manager' para que no interfiera con nuestra configuración. Este servicio es el encargado de gestionar las redes.
Esto lo podemos hacer con el comando:
```shell
systemctl stop network-manager
```

Para configurar una red en Ubuntu Server tendremos que crear un fichero llamado `01-netcfg.yaml` en la carpeta `/etc/netplan`.
El fichero especifica por cada red si queremos utilizar DHCP, dirección IP manual (en caso de no usar DHCP), gateays y servidores DNS `nameservers`.
Ejemplo (obviar las líneas que comienzan por `#` ya que son comentarios para explicar el fichero):
```yaml
network:
  version: 2
  renderer: NetworkManager
  # Se especifiaca cada una de las redes que queremos configurar
  ethernets:
    # Ejemplo de red con DHCP que recibirá la dirección IP automáticamente
	ens33:
	  dhcp4: yes
	  dhcp6: yes
	  nameservers:
		addresses: [8.8.8.8, 8.8.4.4]
	# Ejemplo de una red con IP manual
	ens38:
	  dhcp4: no
	  dhcp6: no
	  addresses: [192.168.1.120/24]
	  # Se especifica la puerta de enlace. IP del router.
	  gateway4: 192.168.1.1
	  nameservers:
	    addresses: [8.8.8.8, 8.8.4.4]
```

Una vez terminado de editar el fichero, tenemos que aplicar los cambios con el comando:
```shell
netplan apply
```

Finalmente, volveríamos a arrancar el servicio 'network-manager' para que los cambios surjan efecto:
```shell
systemctl start network-manager
```