---
date: 2023-03-08
title: Aligerar imágenes Docker
slug: aligerar_imagenes_docker
tags: [docker]
authors: pabpereza
image: https://img.youtube.com/vi/QVcLTxmcJ8s/maxresdefault.jpg
---

En el mundo de la infraestructura como código, Docker se ha convertido en una herramienta esencial para desarrolladores y administradores de sistemas. Una de las ventajas de Docker es la capacidad de crear imágenes ligeras, lo que permite un despliegue rápido y eficiente de aplicaciones. 
<!-- truncate -->
Existen casos, ya sea por la complejidad de la aplicación, la cantidad de paquetes instalados o la cantidad de archivos, en los que las imágenes Docker pueden llegar a ser muy pesadas. Esto puede afectar muy negativamente el rendimiento y la eficiencia de los automatismos de construcción, pruebas y despliegue.

En este artículo, vamos a explorar cómo crear imágenes de Docker ligeras para optimizar el rendimiento y la eficiencia en el despliegue de aplicaciones.


Por si lo prefieres, puedes ver el vídeo en YouTube:

[![Aligerar imágenes Docker](https://img.youtube.com/vi/QVcLTxmcJ8s/maxresdefault.jpg)](https://www.youtube.com/watch?v=QVcLTxmcJ8s)


## Paso 1: Utilizar una imagen base pequeña
La primera etapa en la creación de una imagen de Docker ligera es elegir una imagen base pequeña. Esto significa elegir una imagen que tenga el menor tamaño posible y solo contenga los componentes esenciales para ejecutar la aplicación. Por ejemplo, dentro de las imágenes de debian, podemos optar por las versiones con tag "-slim" (debian:11-slim) las cuales traen muchos menos paquetes por defecto.

Otras imágenes que se han vuelto muy populares los últimos años son las de Alpine Linux. Estas tienen un tamaño minúsculo y tienen un sistema de paquetes muy poblado y bien mantenido.


## Paso 2: Eliminar archivos no necesarios
Una vez que tenemos nuestra imagen base, es importante eliminar cualquier archivo o paquete que no sea necesario para la ejecución de la aplicación. Esto puede incluir documentación, archivos de configuración y aplicaciones adicionales.

Un caso práctico, construyo una aplicación Java con Maven y luego utilizo una imagen base de OpenJDK para ejecutar la aplicación. En este caso, Maven no es necesario para la ejecución de la aplicación, por lo que puedo eliminarlo de la imagen. Esto sería extrapolable a npm para aplicaciones Node.js, pip para aplicaciones Python, etc.

Tenemos que pensar que solo tenemos que dejar lo esencial para que la aplicación funcione. Esto no es solo una cuestión de optimización, sino también de seguridad. Si dejamos archivos o paquetes innecesarios en la imagen, podemos estar expuestos a vulnerabilidades debido a aumentar la superficie de ataque.


## Paso 3: Utilizar multi-etapas de construcción
La característica de multi-etapas de construcción de Docker nos permite utilizar varias imágenes en una sola definición de construcción. Esto significa que podemos utilizar una imagen base para compilar nuestra aplicación y luego utilizar otra imagen base más pequeña para desplegar la aplicación. Esto nos permite eliminar cualquier paquete o archivo no necesario utilizado solo en la etapa de compilación.

Tengo una [lista de vídeos en youtube hablando del tema](https://youtube.com/playlist?list=PLQhxXeq1oc2mB6_KY-l_zgWJWZo_ne9MZ) y también [un repositorio con varios ejemplos](https://github.com/pabpereza/multi-stage-containers-examples).

### Detalles adicionales sobre multi-stage builds

#### ¿Qué son las multi-stage builds?
Las multi-stage builds son una técnica avanzada de construcción de imágenes Docker que permite utilizar múltiples etapas en un solo Dockerfile. Cada etapa puede tener su propia imagen base y conjunto de instrucciones, lo que permite optimizar el proceso de construcción y reducir el tamaño de la imagen final.

#### Beneficios de las multi-stage builds
- **Reducción del tamaño de la imagen**: Al utilizar múltiples etapas, puedes eliminar archivos y dependencias innecesarias de la imagen final, lo que reduce su tamaño.
- **Mejora de la seguridad**: Al eliminar herramientas y dependencias de desarrollo de la imagen final, reduces la superficie de ataque y mejoras la seguridad de la aplicación.
- **Facilidad de mantenimiento**: Las multi-stage builds permiten mantener un Dockerfile más limpio y organizado, lo que facilita su mantenimiento y actualización.

#### Ejemplo de multi-stage build
A continuación, se muestra un ejemplo de un Dockerfile que utiliza multi-stage builds para compilar y ejecutar una aplicación Go:

```dockerfile
# Etapa de compilación
FROM golang:1.16 AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp

# Etapa final
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/myapp .
CMD ["./myapp"]
```

En este ejemplo, la primera etapa utiliza la imagen base `golang:1.16` para compilar la aplicación Go. La segunda etapa utiliza la imagen base `alpine:latest` para ejecutar la aplicación, copiando solo el binario compilado desde la primera etapa. Esto reduce el tamaño de la imagen final y elimina las dependencias de desarrollo innecesarias.

## Paso 4: Optimización
La optimización de las imágenes Docker es un proceso continuo. A medida que se desarrollan nuevas versiones de la aplicación, es importante revisar y optimizar las imágenes Docker para asegurarse de que siguen siendo ligeras y eficientes. Esto puede incluir la eliminación de archivos temporales, la compresión de archivos y la eliminación de dependencias no utilizadas.

## Post-paso 1: Monitorizar el rendimiento de la imagen.
Algunos errores de optimización no serán visibles hasta que la imagen se ejecute en un entorno de producción. Por lo tanto, es importante monitorizar el rendimiento de la imagen una vez que se haya desplegado en producción. Esto nos permitirá identificar cualquier problema de rendimiento y optimizar la imagen de forma proactiva. 

Aquí podríamos vigilar que no se escriban demasiados archivos en el disco, que no se consuma demasiada memoria, que no se consuma demasiado ancho de banda, etc.

El comando `docker stats` nos permite realizar esta tarea. Aunque tendremos que ejecutarlo manualmente, también podríamos automatizarlo o utilizar herramientas como [Prometheus](https://prometheus.io/) para monitorizar el rendimiento de la imagen y guardar los datos en un servidor de métricas.

## Post-paso 2: Utilizar herramientas de análisis de imágenes
Algunas herramientas de análisis de imágenes nos permiten analizar las imágenes Docker y obtener información sobre el tamaño de la imagen, los archivos y los paquetes que contiene.

Por ejemplo, la herramienta [Dive](https://github.com/wagoodman/dive), la cual, dispone recientemente de extensión de docker.

Esta extensión nos permite visualizar el tamaño de cada capa de la imagen, así como los archivos y los paquetes que contiene. Esto nos permite identificar archivos y paquetes innecesarios que podemos eliminar de la imagen.

## Bonus: Distroless
Esto me lo guardo para un artículo/vídeo aparte, pero os dejo un enlace a enlace a la documentación de google por si no podéis esperar. [Distroless](https://github.com/GoogleContainerTools/distroless)

Dejaré un enlace aquí cuando lo publique.

## Conclusión
Para generar imágenes Docker ligeras, debemos seguir los siguientes pasos:
* Utilizar una imagen base pequeña, como las versiones slim de debian, las UBI de Red Hat o las imágenes de Alpine.
* Eliminar archivos no necesarios, como componentes de desarrollo, compiladores, documentación.. etc. Para esto, podemos utilizar herramientas como Dive, tanto desde la línea de comandos como desde docker desktop.
* Construir una imagen con multi-etapas de construcción.

