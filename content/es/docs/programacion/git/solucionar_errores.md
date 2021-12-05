---
title: "Solucionar errores"
linkTitle: "Solucionar errores"
weight: 1 
tags: [git, errores, restaurar]
description:  "En git es muy común equivocarse y, dada su funcionamiento, puede ser tedioso corregir ciertos descuidos. En este artículo trataremos los errores más comunes"
---


Git es un sistema muy estricto y metódico diseñado para garantizar la integridad de nuestro
código a lo largo de infinidad de versiones y cambios generados por múltiples programadores.

Es normal y frecuente en estos procesos equivocarnos, como por ejemplo, escribir el mensaje
que no era en un commit, olvidarse de añadir algún archivo en un commit o añadir el que no querías... etc.

Por suerte, para todos ellos hay solución y veremos diferentes comandos que git ofrece para rreglar errores.


## Ammend - Enmendar el commit más reciente
Esta opción trabaja en conjunto con el comando commit y es una manera práctica de modificar el commit más
reciente. Te permite combinar los cambios prepados con el commit anterior en en lugar de crear uno nuevo.

Sin embargo, este comando no se limita a alterar el cambio más reciente, sino que lo reemplaza por completo.
Importante tenerlo en cuenta sobre todo en repositorios públicos cuyos commits puedan ser dependencias de otras
ramas o herramientas.

### Uso básico
Supón que acabas de terminar un commit y quieres modificar su mensaje porque has puesto lo que no debías. Podrías ejecutar esto:
``` bash
git commit --amend
```

Tras ejecutarlo se nos mostrará el editor de texto seleccionado en git para editar el menaje del último commit. En [esta entrada](../configurar_editor_commits/#elegir-el-editor-de-commit-por-defecto) puedes
ver como cambiar el editor de texto que git usará para estas labores.


### Añadir archivo al último commit
Podría pasar también, que te hubieras dejado de añadir un archivo al último commit. Es cierto que podrías crear un nuevo commit pero queda más limpio si corriges el anterior.
Para ello

WIP (WORK IN PROGRESS)


