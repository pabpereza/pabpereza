---
title: "Save y Load"
slug: "save_y_load"
weight: 1 
tags: [ docker, containers]
authors: pabpereza >
   "Guía de comandos generales de docker" 
---

Estos comandos nos permiten guardar y cargar imágenes de docker. Aunque lo común es que las imágenes se descarguen de un repositorio, en ocasiones puede ser útil guardarlas en un fichero y cargarlas en otro equipo mediante ficheros tar.

## Guardar una imagen

```bash
docker save -o <nombre_imagen>.tar <nombre_imagen>
```

## Cargar una imagen

```bash
docker load -i <nombre_imagen>.tar
```
