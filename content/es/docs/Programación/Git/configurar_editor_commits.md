---
title: "Editor de commits por defecto"
linkTitle: "Editor de commits por defecto"
weight: 4
tags: [git, configuracion]
description: >
    Configurar el editor por defecto que Git utiliza para los commits
---

# Elegir el editor de commit por defecto
Dependiendo del sistema operativo en el que nos encontremos Git utilizara un editor u otro para los mensajes de commit en el terminal. En algunos por defecto es nano, en otros vim, gedit... etc. Con el siguiente comando puedes elegir el que más se adapte a tus gustos y necesidades.

En mi caso, prefiero Vim y usaría el siguiente comando:
```bash
git config --global core.editor "vim"
```

Si quisieras usar nano sería tan fácil como usar el siguiente:
```bash
git config --global core.editor "nano"
```
