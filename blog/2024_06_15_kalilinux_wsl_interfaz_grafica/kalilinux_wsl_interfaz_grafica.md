---
slug: kalilinux-wsl-interfaz-grafica
title: Ejecutar Kali Linux en WSL con interfaz gráfica 
tags: [hacking, wsl, linux, windows, virtualización]
authors: pabpereza
image: TODO
date: 2024-06-18
draft: true 
---

# Ejecutar Kali Linux en WSL con interfaz gráfica

En este vídeo, vamos a ver como ejecutar KaliLinux con interfaz gráfica, así de simple. Sin necesidad de configurar una máquina virtual ni dual boot.

¡Hola! Kalilinux es una de las distribuciones de Linux más populares para realizar pruebas de seguridad y hacking ético. En este tutorial vamos a ver cómo instalar Kali Linux en Windows 10/11 con WSL y con la posibilidad de usar la interfaz gráfica, gracias a la herramienta `win-kex`, windows terminal y WSL.

<!-- truncate -->

Dentro vídeo: TODO


## Requisitos
Los requisitos para seguir este tutorial:
* Tener Windows Pro 10 o 11 con WSL habilitado.
* Windows terminal (recomendado para la interfaz gráfica)

Si no tienes habilitado WSL, puedes seguir este tutorial para habilitarlo:
[![](https://img.youtube.com/vi/p04dRcQh2VM/maxresdefault.jpg)](https://www.youtube.com/watch?v=p04dRcQh2VM)

## Instalar Kali Linux en WSL
Para instalar Kali Linux en WSL, debemos ir a la tienda de aplicaciones de Windows y buscar Kali Linux. Una vez instalado, lo abrimos y, la primera vez, se nos pedirá un usuario y contraseña.

Ahora, en el terminal de Kalilinux, vamos a instalar el siguiente paquete: `win-kex` que nos permitirá ejecutar la interfaz gráfica de Kali Linux en Windows. 

```bash
sudo apt update
sudo apt install -y kali-win-kex
```


## Ejecutar Kali Linux con interfaz gráfica
Para ejecutar Kali Linux con interfaz gráfica con `win-kex`, y usando distintos modos de ejecución. Los más interesantes son:
* `kex --win -s` para ejecutar una sola ventana.
* `kex --sl -s` para el modo 'seamless' que integra las ventanas de Kali Linux en Windows.
* `kex --esm --ip -s` para el modo 'enhanced session' con soporte de audio y soluciones de errores para AMD.


El modo una sola ventana es seguramente el que más utilices, solo tienes que tener en cuenta que la ventana se abrirá en 'fullscreen' y para salir de ella, puedes usar F8 para montar el menu y luego pulsar en 'fullscreen' para salir.




## Instala todos los paquetes comunes de Kali Linux
Por defecto, KaliLinux en WSL es una instalación mínima que carece de la mayoría de herramientas interesantes. Para instalar todos los paquetes que por defecto trae la distribución, podemos ejecutar el siguiente comando:

```bash
sudo apt install -y kali-linux-default
```

También tiene otras opciones interesantes como `kali-linux-large` o `kali-linux-everything` que instalan más paquetes aunque hará que la instalación sea más pesada.

También trae otras packs de instalaciones de herramientas como `kali-tools-top10` o `kali-tools-web` que instalan las herramientas más comunes de hacking ético, o de hacking web respectivamente.



## Configurar un acceso directo en Windows Terminal
Podemos añadir nuevos perfiles en windows terminal para acceder directamente a Kali Linux con interfaz gráfica. Para ello, abrimos los ajustes del terminal (1) y pulsamos en crear nuevo perfil (2).

![](perfil_windows_terminal.png)

Seguidamente, modificamos el nombre del perfil y añadimos el siguiente comando en el apartado de línea de comandos (yo he configurado la ejecución con una sola ventana, pero puedes usar cualquiera de los comandos anteriores):

![](perfil_nombre_comando.png)

Recuerda guardar y ya solo tendrías que seleccionar el perfil de Kalilinux al crear una nueva pestaña en Windows Terminal.


## Desinstalar o reinstalar Kali Linux en WSL
Lo que más me gusta de las distribuciones WSL es que son muy fáciles de instalar y desinstalar. Puedes el al menu de "Agregar o quitar programas" de Windows y desinstalar Kali Linux como si de cualquier otra aplicación se tratase, también puedes desinstalarlo desde la tienda de aplicaciones.

Para volver a instalarlo, podríamos hacerlo desde la tienda de aplicaciones o desde la terminal de Windows con el siguiente comando:

```bash
wsl --install -d kali-linux
```

Con el método que te sea más cómodo.


## Despedida y fuentes
Eso es todo por hoy, espero que te haya gustado este tutorial. Si es así, no olvides darle a like y suscribirte al canal para más contenido.

Este artículo está basado en la documentación oficial de Kali Linux sobre Win-KeX, la cual puedes encontrar en el siguiente enlace:
[Win-KeX](https://www.kali.org/docs/wsl/win-kex/)

¡Hasta la próxima!