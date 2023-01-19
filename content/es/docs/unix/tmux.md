---
title: "Tmux"
linkTitle: "Tmux"
weight: 35 
tags: [terminal, unix]
description:  
---

En este entrada vamos a ver cómo utilizar [tmux](https://github.com/tmux/tmux/wiki). Tmux es un multiplexor de terminales que nos permite crear sesiones de terminal, dividirlas en paneles y ventanas, y acceder a ellas desde cualquier terminal.

{{< imgproc tmux Fill "700x450"  >}}
Tmux en acción
{{< /imgproc >}}

## Instalación
En la mayoría de distribuciones podemos instalar tmux con el gestor de paquetes de la distribución. Por ejemplo, en Ubuntu:
```bash
sudo apt install tmux
```

En macOS podemos instalarlo con [brew](https://brew.sh/):
```bash
brew install tmux
```

## Sesiones 
Para crear una nueva sesión de tmux, ejecutamos el comando `tmux`:
```bash
tmux
```

Si queremos crear una sesión con un nombre, podemos usar el parámetro `-s`:
```bash
tmux -s my_session
```

Para listar las sesiones que tenemos abiertas, podemos usar el comando `tmux ls`:
```bash
tmux ls
```

Para reanudar una sesión, podemos usar el comando `tmux attach`:
```bash
tmux attach -t my_session
```

Para reanudar la última sesión, podemos usar el comando `tmux attach` sin parámetros:
```bash
tmux attach
```

Dentro de una sesión, podemos suspenderla con el comando `Ctrl+b d`. Esto nos permite volver a la sesión más tarde con el comando `tmux attach`.



