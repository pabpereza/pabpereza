---
title: "Fundamentos"
linkTitle: "Fundamentos"
weight: 1
tags: [docker, contenedores ]
description: "Primera entrada del curso de docker hablando sobre sus fundamentos."
---

Docker es un proyecto de código abierto que automatiza el despliegue de aplicaciones dentro de contenedores de software. Comenzó como un proyecto interno dentro de dotCloud, empresa enfocada a una plataforma como un servicio PaaS (Platform as a Service). Fué iniciado por Solomon Hykes con contribuciones de otros ingenieros de la compañia.

Docker fué liberado como código abierto en 2013. El 13 de marzo de 2014, con el lanzamiento de la versión 0.9 se dejó de utilizar LXC como entorno de ejecución por defecto y lo reemplazó con su propia biblioteca, libcontainer, escrito en Go. Para 2015 el proyecto ya tenía más 20.000 estrellas en GitHub y más de 900 colaboradores.


# Pero... ¿Cómo funciona?

Docker se basa en la ejecución de procesos aislados entre sí y empaquetados en "contenedores" con todas las dependencias necesarias para funcionar.

Esto es posible gracias a dos funcionalidades del kernel de linux que se llaman "namespaces" y "cgroups".

El soporte de los namescaces o espacios de nombres aísla la vista que tiene una aplicación de su entorno operativo,​ incluyendo árboles de proceso, red, ID de usuario y sistemas de archivos montados. Por otra parte, los cgroups del kernel proporcionan aislamiento de recursos, incluyendo la CPU, la memoria, el bloque de E/S y de la red. 

Como resumen, se lanza un proceso aislado con todas las dependencias necesarias para que funcione.

# Arquitectura de Docker
Hemos hablado de procesos y contenedores, pero esto es solo una pequeña pieza de todos los objetos que conforman Docker a día de hoy.

![](https://docs.docker.com/engine/images/architecture.svg)