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

Por suerte, para todos ellos hay solución y veremos diferentes comandos que git ofrece para arreglar errores.

Vamos a ir viendo las diferentes opciones agrupadas por comandos:

## Ammend - Enmendar el commit más reciente
Esta opción trabaja en conjunto con el comando commit y es una manera práctica de modificar el commit más
reciente. Te permite combinar los cambios prepados con el commit anterior en en lugar de crear uno nuevo.

Sin embargo, este comando no se limita a alterar el cambio más reciente, sino que lo reemplaza por completo.
Importante tenerlo en cuenta sobre todo en repositorios públicos cuyos commits puedan ser dependencias de otras
ramas o herramientas.

### Uso básico
Supón que acabas de terminar un commit y quieres modificar su mensaje porque has puesto lo que no debías. Podrías ejecutar esto:
``` shell
git commit --amend
```

Tras ejecutarlo se nos mostrará el editor de texto seleccionado en git para editar el menaje del último commit. En [esta entrada](../configurar_editor_commits/#elegir-el-editor-de-commit-por-defecto) puedes
ver como cambiar el editor de texto que git usará para estas labores.


### Añadir archivo al último commit
Podría pasar también, que te hubieras dejado de añadir un archivo al último commit. Es cierto que podrías crear un nuevo commit pero queda más limpio si corriges el anterior.
Para ello añadiríamos el o los archivos que nos hubieramos dejado en el anterior commit usando el comando "add":
``` shell
git add <fichero>
```

Y luego, volveríamos a repetir el "ammend":

``` shell
git commit --amend
```
Esto nos permitiría añadir el archivo los archivos omitidos en el commit anterior y corregir el mensaje si fuera necesario.


## Reset - Revertir cambios de un commit
Que pasaría si hacemos lo contrario que en punto anterior, en vez de añadir un archivo, lo queremos eliminar. Muchas veces por error incluimos en el 
repositorio un archivo que no queríamos dado que contienen secretos o información importante.

### Borrar del stage area
Si solo lo hemos mandado al "stage" area, podríamos quitarlo de ahí con el siguiente comando:
``` shell
git reset <fichero a eliminar>
```
### Revertir un commit
En caso de haberlo añadido al "stage area" y haber hecho un commit, podríamos revertir el cambio con el siguiente comando:
``` shell
git reset --soft HEAD~1 #Revertir el último commit
git reset <archivo a eliminar> #Resturar el archivo del commiteado por error
rm <archivo a eliminar> #Eliminar el archivo del repositorio
git commit #Hacer el commit
```
Esto revertirá el último commit, eliminará el archivo y añadira un nuevo commit en su lugar.


### Volver a un estado anterior tras muchos cambios
Podría pasar, ya en el peor de los casos, que hubieramos hecho muchos cambios mal y quisieramos volver a un estado anterior.
Primero podríamos consultar el historial de commits con el comando "log" o "reflog" y ver la referencia del commit al que queremos volver:
``` shell
git log
git reflog
```

Con la referencia del commit al que queremos volver, podemos revertir el commit con el siguiente comando:
``` shell
git reset HEAD@{Referencia}
```

### Volver al último commit rápidamente
Para volver al último commit sin tener que consultar el historial, podemos usar el comando "reset" con el parámetro "--hard":
``` shell
git reset --hard HEAD
```


## Branch - Errores en ramas 
En este apartado veremos los errores más comunes que pueden ocurrir en las ramas.

### Nombre de rama equivocado
Es frecuente que con las prisas escribamos el nombre de una rama con un nombre equivocado. Aquí la solución es simple, dentro del comando branch esta
el parámetro "-m" que nos permite cambiar el nombre de la rama:
```shell
git branch -m nombre-rama-equivocada nombre-rama-correcta
```

### Commit a la rama principal
Podríamos hacer sin querer un commit en la rama principal, por ejemplo, main cuando nuestro sistema de organización es hacer ramas distintas para 
cada característica nueva que se desarrolla o trabajar primero en develop y luego integrar los cambios en main.

En varios pasos podríamos crear una rama con todos los cambios que acabamos de generar y luego, en el siguiente paso, resetear la rama principal
al commit anterior:
``` shell
git branch nombre-rama-nueva-con-los-cambios #Creamos una rama con los cambios
git reset HEAD~ --hard #Reseteamos la rama principal al commit anterior
git checkout nombre-rama-nueva-con-los-cambios #Cambiamos a la rama nueva
```
En el último paso, nos cambiaríamos a la rama nueva para seguir trabajando con los cambios habiendo dejado limpia la rama principal.

## Eliminar secretos tanto en local como en remoto
En este apartado veremos como eliminar los secretos de un repositorio local o remoto. Es 
muy frecuente sin querer introducir tokens o contraseñas en un repositorio. Aunque los borremos posteriormente,
estos, se mantendrán en el historial de git.

Podemos borrar un archivo de toda la historia con el siguiente comando:
``` shell
 git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch ARCHIVO-SENSIBLE" \
  --prune-empty --tag-name-filter cat -- --all
  git push --force --verbose --dry-run
  git push --force
```



