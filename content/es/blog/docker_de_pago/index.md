---
date: 2021-09-12
title: "¿Docker desktop de pago?"
linkTitle: "Docker desktop de pago"
tags: [docker, noticia]
description: "Analizamos los últimos cambios de Docker Desktop, como afectarán al usuario y las posibles alternativas."
---

La empresa Docker anunció la semana pasada los cambios en su modelo de negocio empresarial y **sus nuevos planes de subscripción para empresas**.

Hasta el momento, la empresa ha sabido posicionarse como una de las más importantes en el mundo de la tecnología pero sin generar ningún tipo de ingreso. 

Las nuevas versiones tendrán ciertas restricciones que forzarán a algunas empresas a utilizar las modalidades de pago.

{{< imgproc docker_desktop_planes Fit "700x450" >}}
Planes de precios de Docker
{{< /imgproc >}}

Con el precio, todo hay que decirlo, ganamos muchas funcionalidades como SSO, escaneos de seguridad, builds en la nube, colaboración entre equipos... etc. Podéis ver una lista completa de las funcionalidades en la [página de Docker](https://www.docker.com/pricing).

### ¿Quién tiene que pagar?
Las empresas que tengan **más de 250 empleados o unos ingresos anuales de 10 millones de dólares** deberán utilizar los planes profesionales, de equipos o de empresa. Para dar margen a medianas y grandes empresas, las principales afectadas, se dará un periodo de gracia hasta el 31 de Enero de 2022.

Seguirá siendo totalmente gratuito en los siguientes casos:

* Pequeñas empresas con menos de 250 empleados y menos de 10 millones de dólares de ingresos anuales.
* Uso personal.
* Instituciones educativas.
* Proyectos no comerciales open-source.


### ¿Qué alternativas tengo?
Estas nuevas políticas solo afecta a la versión de Docker Desktop, es decir, a la versión de Windows y Mac. En linux se utiliza Docker Engine al cuál no se le aplican estas restricciones.

Además, docker no es la única forma de construir contenedores. Existen otras tecnologías como **podman** o **buildah** que también nos permiten construir imágenes sin requerir un docker engine aunque estas también solo estan disponibles en Linux.
