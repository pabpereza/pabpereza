---
date: 2021-09-19
title: "Analizar la seguridad de las imágenes de Docker"
linkTitle: "Analizar seguridad docker"
description: ""
tags: [docker, seguridad]
---

En anteriores vídeos he hablado acerca de la seguridad a la hora de crear imágenes pero hay un aspecto más crítico y fundamental que se suele obviar al construir imágenes. Estas, contienen software en forma de librerías del sistema que también pueden ser vulnerables. Pero, ¿como podemos revisar esa seguridad?

{{< youtube XmGEMOgI9-g >}}


## ¿Qué riesgos de seguridad hay en las imágenes de Docker?
Cuando construimos imágenes de Docker siempre partimos de una imagen base, que es la que se usa para construir las imágenes que queremos. Esta imagen base puede ser una imagen de una distribución Linux, o de una imagen de una aplicación. Estas imágenes pueden contener código de una aplicación, librerías, paquetes, etc. Todo el código que se encuentre en estas imágenes puede ser vulnerable a ataques de seguridad.

## ¿Que herramientas podemos usar para analizar la seguridad de las imágenes de Docker?
Existen multitud de herramientas que pueden ser útiles para analizar la seguridad de las imágenes de Docker. Las más destacadas son:
* Trivy
* Anchore
* Clair

Para este vídeo y evitar instalar nada, hemos utilizado el escáner que viene incorporado con Docker en las últimas versiones. Se puede ejecutar con el siguiente comando:

``` bash
docker scan <nombre de la imagen>
```

Iré documentando el uso de diferentes herramientas de análisis de seguridad en la siguiente pagína de la documentación:
[Escaneo de seguridad en contenedores](/docs/contenedores/analizar_contenedores/)
