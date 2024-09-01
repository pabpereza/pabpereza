---
slug: Tu propio registry privado
title: Registros de contenedores y alternativas a Dockerhub 
tags: [ contenedores]
authors: pabpereza
draft: true
---


# ¿Quieres almacenar tus imágenes de contenedor en tu propio repositorio o registry ?

En cuento a los repositorios, tenemos múltiples opciones. Tanto en variantes gestionadas por un proveedor o en formato SaaS o también otras tantas que puedes instalarte en tus servidores. Os dejo este repositorio donde he hecho la tabla comparando las opciones que concozco, pero puedes contribuir con más opciones o detalles.

[Tabla comparativa de registros de contenedores](https://github.com/pabpereza/private-container-registries)

De entre todos estos, destaca Harbor. Este es el más completo, personalizable y escalable. Permite albergar imágenes, analizar su seguridad, despliegue en kubernetes en alta disponibilidad o incluso replicar automáticamente las imágenes de otro registry, actuando como una especie de caché para tu infraestructura. 

Pero si quieres algo más sencillo, CNCF Distribution, es el core tecnológico de la mayoría de registries y se puede montar en docker con una línea de instrucciones.


## Instalación de Harbor
TODO
