---
title: "Index lock"
linkTitle: "Index lock"
weight: 5
tags: [git, errores]
description: >
   Error index lock 
---

Git tiene un sistema de funcionamiento muy estricto para evitar conflictos y ayudarnos a mantener nuestro bien versionado.
Para ello, solo a un proceso realziar cambios a la vez para mantener la integridad de la información.

Cuando realizamos cualquier tarea en git, un commit, push, pull... este genera un archivo llamado "index.lock" y lo guarda
dentro de la carpeta ".git" en la raiz del repositorio.

Este archivo bloquea el repositorio ante cualquier otro acceso o proceso simult�neo que quiera realizar cambios. En algunos casos,
poco frecuentes, puede pasar que una acción o tarea nunca termine ( por fallo del SO u otros) y el repositorio se quede bloqueado.

Si tenemos claro lo que estamos haciendo, podríamos borrar simplemente este archivo con el comando:
``` shell
rm .git/index.lock
```

Así de simple conseguiríamos quitar el bloqueo de git pero *atención* que no tengamos otro proceso ejecutando alguna tarea sobre git
o podríamos corromper datos del repositorio.
