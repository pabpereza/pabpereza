---
date: 2021-11-01
title: "Kali en Docker recopilación"
linkTitle: "Kalilinux en Docker"
tags: [docker,kalilinux,seguridad]
description: "Como crear tus propias imágenes, dockerfiles y usarlo con interfaz gráfica"
---

Unas semanas antes de la creación de esta web había hecho una trilogía de vídeos hablando de como utilizar el sistema operativo Kalilinux en Docker. Por dejarlos aquí archivados de alguna manera y dejar la documentación por escrito he optado por escribir esta entrada.

# Ventajas y desventajas de utilizar Kalilinux en Docker
Bueno, yo creo que si conoces la tecnología docker la respuesta es simple. Puedes tener imágenes ligeras, con las herramientas que necesitas, preparadas para ejecutar muy rápidamente. Tambien puedes gestionarlas con un repositorio remoto y transportarlas fácilmente entre distintos entornos.

Pero como todo, tiene sus grandes inconvenientes. Las imágenes de docker no tienen acceso directo al hardware y eso puede lastrar un poco el rendimiento, concretamente si necesitamos la tarjeta gráfica en operaciones de computación como el cracking de contraseñas. 

En la [propia página](https://www.kali.org/get-kali/) de Kali se puede ver la comparativa completa con todas sus opciones:

{{< imgproc kali_en_docker Fit "700x450" >}}
Comparativa de las distintas opciones de Kalilinux.
{{< /imgproc >}}


# Vídeos explicativos
{{< youtube yvfXt7Ndrvc >}}

{{< youtube qnsi1cnTK3A >}}

{{< youtube sVJ4iocUods >}}
