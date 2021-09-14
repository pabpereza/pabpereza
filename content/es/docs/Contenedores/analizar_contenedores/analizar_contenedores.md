---
title: "Analizar seguridad"
linkTitle: ""
weight: 4
description: >
    Herramientas que nos permiten analizar la seguridad en nuestros contenedores.
---


## Introducción
Los contenedores nos han permitido la facilidad y comodidad de empaquetar nuestras aplicaciones y servicios, y también nos permiten asegurar que se ejecuten de forma segura. Sin embargo, las imágenes se contruyen con muchos componentes de terceros sobre los que no tenemos visibilidad. Para esta labor tenemos diferentes herramientas que nos ayudan a analizar la seguridad de nuestros contenedores.


## Herramientas

### Snyk - Docker Desktop
Es sin duda una de las más desconocidad dada su reciente implementación en la plataforma de Docker pero dada su integración nativa y que no es necesario realizar instalaciones adicionales es una herramienta adecuada.

Tiene unas limitaciones de uso mensual pero nos podemos logear con una cuenta gratuita para ampliarlo. [Snyk](https://snyk.io/).

Podemos utilizar esta herramienta simplemente escribiendo:

``` bash
docker scan <nombre de la imagen>
```