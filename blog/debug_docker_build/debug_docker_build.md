---
slug: debug_docker_build_vscode
title: Depurar builds de Docker en VS Code como un profesional
tags: [docker, vscode, debugging, devops, buildx]
keywords: [docker, vscode, debugging, depuración, buildx, dockerfile, contenedores, desarrollo]
authors: pabpereza
date: 2025-10-28
draft: true
---

# Depurar builds de Docker en VS Code como un profesional
Construir imágenes de Docker es fundamental en el pipeline de entrega de software para aplicaciones modernas. Es la forma en la que empaquetamos nuestras aplicaciones y servicios para que puedan distribuirse y desplegarse en producción. Aunque el Dockerfile ha sido durante mucho tiempo el estándar para definir imágenes de contenedores, todos sabemos que puede ser un **auténtico quebradero de cabeza** cuando algo falla.

¿Te suena familiar esa frustración de no entender qué está pasando durante las diferentes etapas del build? ¿Cuál era el valor de ese ARG? ¿Qué archivos se copiaron realmente en la imagen? Si has trabajado con Docker, seguro que has pasado por esto más de una vez.

<!-- truncate -->

La buena noticia es que Docker ha estado mejorando la experiencia de desarrollo con actualizaciones en **Docker Build** (Buildx) y la extensión de **VS Code** (Docker DX). Hoy te voy a mostrar cómo usar la nueva funcionalidad de **Build Debugging** que va a cambiar completamente tu forma de trabajar con Dockerfiles.

Con esta nueva característica de depuración en Buildx, vas a reducir drásticamente el tiempo que pasas arreglando tus builds de Docker. En este artículo aprenderás a configurar el debugger de Buildx en Visual Studio Code, ejecutar paso a paso un build, inspeccionar variables y el sistema de archivos de la imagen, y abrir una shell dentro de la imagen mientras se está construyendo.

## Configurando Visual Studio Code

Para empezar a depurar Dockerfiles en Visual Studio Code necesitas:

1. **Instalar la última versión** de la extensión Docker DX
2. **Actualizar a la última versión** de Docker Desktop para tener las herramientas de build más recientes
3. **Verificar tu versión de Buildx** ejecutando `docker buildx version` - asegúrate de tener al menos la versión 0.29.x

## Creando una configuración de lanzamiento
Abre tu Dockerfile y luego abre la vista de "Run and Debug" (Ejecutar y depurar) en Visual Studio Code.


Haz clic en el enlace **"create a launch.json file"**. Si ya tienes configuraciones previas, abre tu archivo `launch.json` haciendo clic en el icono de engranaje en la esquina superior derecha de la vista Run and Debug.

En tu archivo `launch.json`, crea una nueva configuración para depurar tu build de Docker. Puedes usar este ejemplo para empezar:

```json
{
  "name": "Docker: Build",
  "type": "dockerfile",
  "request": "launch",
  "dockerfile": "Dockerfile",
  "contextPath": "${workspaceFolder}"
}
```

## Añadiendo un breakpoint
Ahora que has completado la configuración, vamos a añadir un **breakpoint** a nuestro Dockerfile. Coloca un breakpoint junto a una de tus instrucciones `RUN` haciendo clic en el margen izquierdo del editor o presionando **F9**. Debería aparecer un círculo indicando que se ha añadido el breakpoint.

## Lanzando el depurador
Ya estamos listos para arrancar el depurador. Selecciona la configuración que creaste y pulsa **F5**. El build debería pausarse en la línea `RUN` donde colocaste el breakpoint.


## Funcionalidades de depuración
Ahora te voy a mostrar las tres características principales que proporciona el Buildx Debugger.

### Inspección de variables
Cuando un build está en estado suspendido, puedes examinar cualquier variable que se haya definido. En este ejemplo, al observar el valor de `workdir` del comando ejecutado en el panel izquierdo, podemos ver que el comando no se está ejecutando en la carpeta correcta, ya que habíamos copiado el contenido en `/app`. Podemos arreglar esto añadiendo `WORKDIR /app` antes de la línea `RUN`. También puedes ver variables que han sido definidas tanto por tu imagen como por la imagen base, como `VAR` y `NODE_VERSION`.




### Explorador de archivos
Además de inspeccionar variables, también puedes examinar la estructura del sistema de archivos para ver qué ya está ahí y qué has copiado. Para archivos de texto, incluso puedes ver su contenido en el campo `data`.

![Docker Buildx Debug File Explorer](./fileexplorer_docker_build.png)


### Depuración interactiva
Crear el Dockerfile correcto es casi siempre un proceso iterativo. Esto sucede frecuentemente porque el sistema host en el que estás desarrollando tiene pocas similitudes con la imagen que estás construyendo. Piensa en las diferencias entre ejecutar Ubuntu localmente pero intentar construir una imagen de Alpine Linux. Las pequeñas diferencias en los nombres de paquetes generan un montón de idas y venidas entre tu editor y el navegador buscando el nombre correcto. Añades una línea aquí, comentas otra línea allá, ejecutas `docker build` otra vez y cruzas los dedos.

Este proceso iterativo ahora se puede **optimizar enormemente** con la ayuda del depurador. Cuando tu build está en estado suspendido, abre la vista Debug Console y coloca el cursor en el campo de entrada en la parte inferior. Escribe `exec` y pulsa Enter. La vista de Terminal debería abrirse con una shell conectada a la imagen que se está construyendo.

![Docker Buildx Debug Terminal](./dockerbuilddx.png)

Esta funcionalidad es un **cambio radical** porque ahora puedes abrir fácilmente la imagen de un Dockerfile en cualquier paso dado e inspeccionar su contenido y ejecutar comandos para hacer pruebas. Antes teníamos que comentar todo lo que venía después de la línea problemática, construir la imagen Docker, y luego ejecutarla manualmente y abrir una shell dentro de la imagen. ¡Todo eso ahora se condensa en añadir un breakpoint en tu editor e iniciar una sesión de depuración! 

Ten en cuenta que ninguno de los cambios que hagas en la terminal se persiste, esto es puramente para experimentación. En la siguiente figura puedes ver que se creó un archivo cuando el depurador estaba pausado en la línea 3. Cuando el depurador avanzó a la línea 4, el archivo desapareció.


## Compose Outline 
También nos ayuda en los ficheros de Docker Compose, agrupando los servicios y facilitando la navegación entre ellos.

Podemos buscarlos como en cualquier otro fichero con Ctrl+P y escribiendo el nombre del servicio, como si fueran variables o funciones en un fichero de código.

![Compose](./compose.png)

Esta vista también muestra la jerarquía de los servicios, lo que facilita la comprensión de cómo se relacionan entre sí.

Además, podemos ejecutar servicios individualmente y directamente en esta vista, lo que agiliza el proceso de desarrollo y prueba.



## Conclusiones
La nueva funcionalidad de depuración para Docker builds en VS Code es una herramienta que realmente marca la diferencia en tu día a día. Ya no tendrás que hacer ese ciclo interminable de editar → construir → fallar → repetir. Ahora puedes **pausar la construcción**, inspeccionar el estado, abrir una shell y probar comandos directamente en el entorno real.

Si trabajas con Docker de forma habitual, te recomiendo que actualices tus herramientas y pruebes esta funcionalidad. Te va a ahorrar mucho tiempo y frustración.

¡Hasta la próxima!