---
title: "Búsqueda"
linkTitle: "Búsqueda"
weight: 10
tags: [git, configuracion]
description: >
    Utilidades de búsqueda de información
---

Bash nos ofrece una serie de utilidades para buscar información en ficheros de texto. En este apartado vamos a ver algunas de ellas.

## Find 
El comando `find` nos permite buscar ficheros en un directorio y sus subdirectorios. Para realizar una búsqueda simple, podemos hacerlo de la siguiente forma:

```bash
find / -name fichero
```

En este caso, la búsqueda se realiza en el directorio raíz del sistema. El parámetro `-name` indica el nombre del fichero que queremos buscar. Si queremos buscar un fichero que contenga una cadena de caracteres, podemos usar el parámetro `-iname`:

```bash
find / -iname fichero
```

Para buscar directorios, podemos usar el parámetro `-type d`:
```bash
find / -type d -iname directorio
```

Si queremos buscar ficheros que contengan una cadena de caracteres, podemos usar el parámetro `-exec grep`:
```bash
find / -type f -iname fichero -exec grep "cadena" {} \;
```


## Locate 
La utilidad `locate` nos permite buscar ficheros en el sistema. Para ello, utiliza una base de datos que se actualiza periódicamente. Para buscar un fichero, podemos hacerlo de la siguiente forma:

```bash
locate fichero
```

Para que la base de datos se actualice, podemos usar el comando `updatedb`:
```bash
updatedb
```

Esta utilidad es más rápida que `find`, pero no siempre encuentra los ficheros que buscamos ya que se basa en una base de datos que no siempre está actualizada.


## Which
La utilidad `which` nos permite buscar la localización de un comando en el sistema. Para buscar un comando, podemos hacerlo de la siguiente forma:
```bash
which comando
```

Por ejemplo, imaginemos que queremos saber donde esta instalado el comando `ls`. Podemos hacerlo de la siguiente forma:
```bash
which ls
```

Esto nos devolverá la ruta donde se encuentra el comando `ls`:
```bash
/usr/bin/ls # Habitualmente, el comando ls se encuentra en esta ruta
```

## Grep
El comando `grep` nos permite buscar una cadena de caracteres en un fichero de texto. Para buscar una cadena de caracteres, podemos hacerlo de la siguiente forma:
```bash
grep "cadena" fichero
```

Si queremos buscar una cadena de caracteres en todos los ficheros de un directorio, podemos usar el parámetro `-r`:
```bash
grep -r "cadena" directorio
```

Si queremos buscar una cadena de caracteres en todos los ficheros de un directorio y sus subdirectorios, podemos usar el parámetro `-R`:
```bash
grep -R "cadena" directorio
```

Podríamos filtar el flujo de salida de otro comando. Por ejemplo, si queremos buscar una cadena de caracteres en los ficheros de un directorio, podemos hacerlo de la siguiente forma:
```bash
ls directorio | grep "cadena"
```


