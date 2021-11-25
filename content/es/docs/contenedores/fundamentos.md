---
title: "Fundamentos"
linkTitle: "Fundamentos"
weight: 1
tags: [docker, contenedores, fundamentos]
description:  
---

Docker es un proyecto de código abierto que automatiza el despliegue de aplicaciones dentro de contenedores de software. Comenzó como un proyecto interno dentro de dotCloud, empresa enfocada a una plataforma como un servicio PaaS (Platform as a Service). Fué iniciado por Solomon Hykes con contribuciones de otros ingenieros de la compañia.

Docker fué liberado como código abierto en 2013. El 13 de marzo de 2014, con el lanzamiento de la versión 0.9 se dejó de utilizar LXC como entorno de ejecución por defecto y lo reemplazó con su propia biblioteca, libcontainer, escrito en Go. Para 2015 el proyecto ya tenía más 20.000 estrellas en GitHub y más de 900 colaboradores.


# Pero... ¿Cómo funciona?

El soporte del kernel Linux para los espacios de nombres aísla la vista que tiene una aplicación de su entorno operativo,3​ incluyendo árboles de proceso, red, ID de usuario y sistemas de archivos montados, mientras que los cgroups del kernel proporcionan aislamiento de recursos, incluyendo la CPU, la memoria, el bloque de E/S y de la red. Desde la versión 0.9, Docker incluye la biblioteca libcontainer como su propia manera de utilizar directamente las facilidades de virtualización que ofrece el kernel Linux, además de utilizar las interfaces abstraídas de virtualización mediante libvirt, LXC (Linux Containers) y systemd-nspawn.4​5​6​

De acuerdo con la firma analista de la industria 451 Research, "Docker es una herramienta que puede empaquetar una aplicación y sus dependencias en un contenedor virtual que se puede ejecutar en cualquier servidor Linux. Esto ayuda a permitir la flexibilidad y portabilidad en donde la aplicación se puede ejecutar, ya sea en las instalaciones físicas, la nube pública, nube privada, etc."7​