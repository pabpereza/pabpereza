---
date: 2022-03-29
title: "Escalar privilegios en docker"
slug: "escalar_privilegios_en_docker"
tags: [docker, privilegios]
authors: pabpereza 
---

# Escalar privilegios en docker
Los contenedores son procesos aislados que, por defecto, ¿se podrían considerar como seguros?. Su enfoque nos dice que sí pero existen muchos casos en los que, principalmente por malas configuraciones, podrían ser vulnerables.
<!-- truncate -->

## Aislados pero no herméticos 
Tecnologías de contenedores como Docker, LXC, LXD, etc.. permiten a los usuarios lanzar un proceso aislado pero, existen múltiples funcionalidades, que podrían comprometer la aplicación en mayor o menor medida.

En este vídeo trato las principales malas configuraciones que permiten a un atacante escapar de un contenedor: [https://youtu.be/XmOsJXA0FU8](https://youtu.be/XmOsJXA0FU8)

![[Escalar privilegios en docker](https://img.youtube.com/vi/XmOsJXA0FU8/maxresdefault.jpg)](https://youtu.be/XmOsJXA0FU8)



## Principales malas configuraciones:
* Montaje de volúmenes
* Ejecución en modo privilegiado
* Escalado a través del grupo de docker
* Host vulnerable
* Secretos o variables de entorno
* Montaje del socket
* Segregación de redes

## Detalles adicionales sobre las vulnerabilidades y configuraciones

### Montaje de volúmenes
El montaje de volúmenes puede exponer archivos sensibles del host al contenedor. Es importante asegurarse de que solo se monten los volúmenes necesarios y que se configuren con los permisos adecuados.

### Ejecución en modo privilegiado
Ejecutar contenedores en modo privilegiado otorga permisos elevados al contenedor, lo que puede permitir a un atacante escapar del contenedor y comprometer el host. Evita ejecutar contenedores en modo privilegiado a menos que sea absolutamente necesario.

### Escalado a través del grupo de docker
Los usuarios que forman parte del grupo de docker pueden ejecutar comandos con permisos elevados. Asegúrate de que solo los usuarios de confianza formen parte de este grupo y considera utilizar alternativas como `sudo` para limitar el acceso.

### Host vulnerable
Un host con vulnerabilidades puede ser comprometido a través de un contenedor. Mantén el host actualizado y aplica parches de seguridad regularmente.

### Secretos o variables de entorno
Almacenar secretos o variables de entorno sensibles en contenedores puede exponer información crítica. Utiliza herramientas como Docker Secrets para gestionar secretos de forma segura.

### Montaje del socket
Montar el socket de Docker dentro de un contenedor puede permitir a un atacante controlar el daemon de Docker y comprometer otros contenedores y el host. Evita montar el socket de Docker a menos que sea absolutamente necesario.

### Segregación de redes
La falta de segregación de redes puede permitir a un atacante moverse lateralmente entre contenedores y comprometer otros servicios. Utiliza redes de Docker para aislar contenedores y limitar la comunicación entre ellos.


Buenos, espero que el vídeo y la entrada por escrito te hayan aportado valor. Nos vemos en el siguiente. ¡Hasta la próxima! 
