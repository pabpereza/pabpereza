---
title: "Tmux"
linkTitle: "Tmux"
weight: 35 
tags: [terminal, unix]
description:  
---

En este entrada vamos a ver cómo utilizar [tmux](https://github.com/tmux/tmux/wiki). Tmux es un multiplexor de terminales que nos permite crear sesiones de terminal, dividirlas en paneles y ventanas, y acceder a ellas desde cualquier terminal.

![tmux](https://pabpereza.dev/docs/unix/tmux.gif)

## Instalación
En la mayoría de distribuciones podemos instalar tmux con el gestor de paquetes de la distribución. Por ejemplo, en Ubuntu:
```bash
sudo apt install tmux
```

En macOS podemos instalarlo con [brew](https://brew.sh/):
```bash
brew install tmux
```

## Ventanas o pestañas
Dentro de una sesión de tmux, podemos crear pestañas con el comando `Ctrl+b c`:
```bash
Ctrl+b c
```

Para cambiar de pestaña, podemos usar el comando `Ctrl+b n` para ir a la siguiente pestaña, o `Ctrl+b p` para ir a la anterior:
```bash
Ctrl+b n
Ctrl+b p
```

También podemos ir a una pestaña concreta con el comando `Ctrl+b <nombre de la pestaña>`:
```bash
Ctrl+b 1
```

Podemos renombrar una pestaña con el comando `Ctrl+b ,`:
```bash
Ctrl+b ,
```


## Paneles o splits
Dentro de una pestaña, podemos dividir la pantalla de forma vertial con el comando `Ctrl+b %`:
```bash
Ctrl+b %
```

O de forma horizontal con el comando `Ctrl+b "`:
```bash
Ctrl+b "
```

Para cambiar de panel, podemos usar el comando `Ctrl+b` + las flechas de dirección o `Ctrl+b` + `hjkl`:
```bash
Ctrl+b <flecha dirección>
```

Maximizar un panel con el comando `Ctrl+b z` y volver a la distribución original con el comando `Ctrl+b z`:
```bash
Ctrl+b z
```

Alternar la posición de los paneles con el comando `Ctrl+b x`:
```bash
Ctrl+b x
```

Podemos listar todos los paneles con el comando `Ctrl+b w`:
```bash
Ctrl+b w
```

Por último, podríamos rotar la posición de un panel con las teclas `Ctrl+b {` y `Ctrl+b }`. Esto alternaría la posición del panel actual con el siguiente:
```bash
Ctrl+b {
Ctrl+b }
```



## Sesiones 
Para crear una nueva sesión de tmux, ejecutamos el comando `tmux`:
```bash
tmux
```

Si queremos crear una sesión con un nombre, podemos usar el parámetro `-s`:
```bash
tmux new -s my_session
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





