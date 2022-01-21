---
title: "Configuración"
linkTitle: "Configuracion"
weight: 4
tags: [git, configuracion]
description: >
    Configuraciones básicas y esenciales
---

## Elegir el editor de commit por defecto
Dependiendo del sistema operativo en el que nos encontremos Git utilizara un editor u otro para los mensajes de commit en el terminal. En algunos por defecto es nano, en otros vim, gedit... etc. Con el siguiente comando puedes elegir el que más se adapte a tus gustos y necesidades.

En mi caso, prefiero Vim y usaría el siguiente comando:
``` shell
git config --global core.editor "vim"
```

También serviría para Neovim usando:
``` shell
git config --global core.editor "nvim"
```

Si quisieras usar nano sería tan fácil como usar el siguiente:
```shell
git config --global core.editor "nano"
```

## Configurar identidad
Si es la primera vez que utilizamos git en un sistema, al hacer un commit, es obligatorio que este quere registrado con el nombre y email de un usuario. Se puede configurar con los siguientes comandos:
``` shell
git config --global user.name "John Doe"
git config --global user.email "johndoe@example.com"
```
