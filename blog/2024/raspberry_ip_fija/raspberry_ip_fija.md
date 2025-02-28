---
slug: raspberry-ip-fija
title: Raspberry Pi con IP fija
tags: [ raspberry, redes]
authors: pabpereza
date: 2024-12-18
---

# Raspberry Pi con IP fija
Puedes evitar perder la conexión con tu Raspberry Pi si le asignas una IP fija. Normalmente, los dispositivos se conectan a la red local mediante un router que les asigna una IP dinámica. Si la Raspberry Pi se reinicia o se apaga, es posible que el router le asigne una IP diferente, lo que puede ser un problema si estás accediendo a ella de forma remota. Para evitarlo, puedes asignarle una IP fija siguiendo estos pasos.

Vamos a ver trés formas de hacerlo:
* nmtui
* dhcpcd
* Vía interfaz gráfica

<!-- truncate -->
---
Se ve mejor en video:

[![Raspberry Pi con IP fija](https://img.youtube.com/vi/AjPUraHm1rw/maxresdefault.jpg)](https://www.youtube.com/watch?v=AjPUraHm1rw)


## Vía nmtui
1. Abre una terminal en tu Raspberry Pi.
2. Escribe el siguiente comando para abrir la interfaz de configuración de red:
```bash
sudo nmtui
```
3. Selecciona la opción **Edit a connection** y pulsa Enter.
4. Selecciona la conexión que quieres editar y pulsa Enter.
5. Selecciona la opción **IPv4 CONFIGURATION** y pulsa Enter.
6. Cambia la opción **Automatic** a **Manual** y pulsa Enter.
7. Introduce la dirección IP que quieres asignarle a tu Raspberry Pi, así como la máscara de red y la puerta de enlace.
8. Pulsa **OK** para guardar los cambios.
9. Pulsa **Back** para salir de la configuración de red.
10. Reinicia tu Raspberry Pi para que los cambios surtan efecto.

## Vía dhcpcd
1. Abre una terminal en tu Raspberry Pi.
2. Escribe el siguiente comando para abrir el archivo de configuración de dhcpcd:
```bash
sudo nano /etc/dhcpcd.conf
```
3. Ve al final del archivo y añade las siguientes líneas:
```bash
interface eth0
static ip_address=TUIP/24
static routers=TUGATEWAY
static domain_name_servers=TUDNS
```
4. Reemplaza TUIP por la dirección IP que quieres asignarle a tu Raspberry Pi, TUGATEWAY por la puerta de enlace y TUDNS por el servidor DNS.
5. Guarda los cambios pulsando **Ctrl + X**, **Y** y **Enter**.
6. Reinicia tu Raspberry Pi para que los cambios surtan efecto.

## Vía interfaz gráfica
1. Despliega el menú de conexiones de red en la barra de tareas de tu Raspberry Pi.
2. Selecciona **Wireless & Wired Network Settings**.
3. Selecciona la conexión que quieres editar y pulsa **Edit**.
4. Introduce la dirección IP que quieres asignarle a tu Raspberry Pi, así como la máscara de red y la puerta de enlace.
5. Pulsa **Apply** para guardar los cambios.