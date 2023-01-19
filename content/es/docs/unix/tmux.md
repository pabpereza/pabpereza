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

