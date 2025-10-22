---
slug: debug_docker_build_vscode
title: Depurar builds de Docker en VS Code como un profesional
tags: [docker, vscode, debugging, devops, buildx]
keywords: [docker, vscode, debugging, depuración, buildx, dockerfile, contenedores, desarrollo]
authors: pabpereza
date: 2025-10-21
draft: true
---

# Depurar builds de Docker en VS Code como un profesional

Construir imágenes de Docker es fundamental en el pipeline de entrega de software para aplicaciones modernas. Es la forma en la que empaquetamos nuestras aplicaciones y servicios para que puedan distribuirse y desplegarse en producción. Aunque el Dockerfile ha sido durante mucho tiempo el estándar para definir imágenes de contenedores, todos sabemos que puede ser un **auténtico quebradero de cabeza** cuando algo falla.

¿Te suena familiar esa frustración de no entender qué está pasando durante las diferentes etapas del build? ¿Cuál era el valor de ese ARG? ¿Qué archivos se copiaron realmente en la imagen? Si has trabajado con Docker, seguro que has pasado por esto más de una vez.

La buena noticia es que Docker ha estado mejorando la experiencia de desarrollo con actualizaciones en **Docker Build** (Buildx) y la extensión de **VS Code** (Docker DX). Hoy te voy a mostrar cómo usar la nueva funcionalidad de **Build Debugging** que va a cambiar completamente tu forma de trabajar con Dockerfiles.

Con esta nueva característica de depuración en Buildx, vas a reducir drásticamente el tiempo que pasas arreglando tus builds de Docker. En este artículo aprenderás a configurar el debugger de Buildx en Visual Studio Code, ejecutar paso a paso un build, inspeccionar variables y el sistema de archivos de la imagen, y abrir una shell dentro de la imagen mientras se está construyendo.

## Configurando Visual Studio Code

Para empezar a depurar Dockerfiles en Visual Studio Code necesitas:

1. **Instalar la última versión** de la extensión Docker DX
2. **Actualizar a la última versión** de Docker Desktop para tener las herramientas de build más recientes
3. **Verificar tu versión de Buildx** ejecutando `docker buildx version` - asegúrate de tener al menos la versión 0.29.x

## Creando una configuración de lanzamiento

Abre tu Dockerfile y luego abre la vista de "Run and Debug" (Ejecutar y depurar) en Visual Studio Code. Si no tienes ninguna configuración de lanzamiento todavía, verás algo similar a la siguiente imagen.

*Contenido del artículo*
Figura 1: Vista de Run and Debug en Visual Studio Code sin configuraciones definidas.

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

*Contenido del artículo*
Figura 2: Build de Docker suspendido por un breakpoint en Visual Studio Code.

## Funcionalidades de depuración

Ahora te voy a mostrar las tres características principales que proporciona el Buildx Debugger.

### Inspección de variables

Cuando un build está en estado suspendido, puedes examinar cualquier variable que se haya definido. En este ejemplo, al observar el valor de `workdir` del comando ejecutado en el panel izquierdo, podemos ver que el comando no se está ejecutando en la carpeta correcta, ya que habíamos copiado el contenido en `/app`. Podemos arreglar esto añadiendo `WORKDIR /app` antes de la línea `RUN`. También puedes ver variables que han sido definidas tanto por tu imagen como por la imagen base, como `VAR` y `NODE_VERSION`.

*Contenido del artículo*
Figura 3: El build de Docker encuentra un error y queda suspendido por el depurador en lugar de terminar.

### Explorador de archivos

Además de inspeccionar variables, también puedes examinar la estructura del sistema de archivos para ver qué ya está ahí y qué has copiado. Para archivos de texto, incluso puedes ver su contenido en el campo `data`.

*Contenido del artículo*
Figura 4: Vista del sistema de archivos de la imagen Docker que se está construyendo.

### Depuración interactiva

Crear el Dockerfile correcto es casi siempre un proceso iterativo. Esto sucede frecuentemente porque el sistema host en el que estás desarrollando tiene pocas similitudes con la imagen que estás construyendo. Piensa en las diferencias entre ejecutar Ubuntu localmente pero intentar construir una imagen de Alpine Linux. Las pequeñas diferencias en los nombres de paquetes generan un montón de idas y venidas entre tu editor y el navegador buscando el nombre correcto. Añades una línea aquí, comentas otra línea allá, ejecutas `docker build` otra vez y cruzas los dedos.

Este proceso iterativo ahora se puede **optimizar enormemente** con la ayuda del depurador. Cuando tu build está en estado suspendido, abre la vista Debug Console y coloca el cursor en el campo de entrada en la parte inferior. Escribe `exec` y pulsa Enter. La vista de Terminal debería abrirse con una shell conectada a la imagen que se está construyendo.

*Contenido del artículo*
Figura 5: Usa la Debug Console para abrir una shell en la imagen Docker que se está construyendo ejecutando exec.

*Contenido del artículo*
Figura 6: Ahora puedes acceder e inspeccionar la imagen Docker que se está construyendo con una terminal.

Esta funcionalidad es un **cambio radical** porque ahora puedes abrir fácilmente la imagen de un Dockerfile en cualquier paso dado e inspeccionar su contenido y ejecutar comandos para hacer pruebas. Antes teníamos que comentar todo lo que venía después de la línea problemática, construir la imagen Docker, y luego ejecutarla manualmente y abrir una shell dentro de la imagen. ¡Todo eso ahora se condensa en añadir un breakpoint en tu editor e iniciar una sesión de depuración! 

Ten en cuenta que ninguno de los cambios que hagas en la terminal se persiste, esto es puramente para experimentación. En la siguiente figura puedes ver que se creó un archivo cuando el depurador estaba pausado en la línea 3. Cuando el depurador avanzó a la línea 4, el archivo desapareció.

*Contenido del artículo*
Figura 7: Los cambios en la imagen Docker dentro del terminal exec se reiniciarán cuando el depurador avance a otra línea.

## Integraciones basadas en especificaciones abiertas

Al igual que nuestro trabajo con el Docker Language Server que implementa el Language Server Protocol, el depurador de Buildx está construido sobre **estándares abiertos** ya que implementa el **Debug Adapter Protocol**. Esto significa que puedes depurar builds de Dockerfile con cualquier editor que soporte el protocolo. Además de Visual Studio Code, también hay un plugin oficial para **Neovim**. Para los usuarios de JetBrains, hemos verificado que se integra bien con el plugin LSP4IJ. Si tu editor favorito soporta el Debug Adapter Protocol, debería haber una forma de que el depurador de Buildx se integre con él.

## Conclusiones

La nueva funcionalidad de depuración para Docker builds en VS Code es una herramienta que realmente marca la diferencia en tu día a día. Ya no tendrás que hacer ese ciclo interminable de editar → construir → fallar → repetir. Ahora puedes **pausar la construcción**, inspeccionar el estado, abrir una shell y probar comandos directamente en el entorno real.

Si trabajas con Docker de forma habitual, te recomiendo que actualices tus herramientas y pruebes esta funcionalidad. Te va a ahorrar mucho tiempo y frustración.

## Recursos adicionales

- [Documentación oficial de Docker Buildx](https://docs.docker.com/build/buildx/)
- [Extensión Docker para VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- [Debug Adapter Protocol](https://microsoft.github.io/debug-adapter-protocol/)

Configuring Visual Studio Code

To start debugging Dockerfiles in Visual Studio Code:

Install the latest version of the Docker DX extension.
Update to the latest version of Docker Desktop to ensure you have the latest Docker build tooling.
Run docker buildx version and verify that your Buildx is at least version 0.29.x.

Creating a Launch Configuration

Open up your Dockerfile and open the Run and Debug view in Visual Studio Code. If you do not have any launch configurations, you will see something like the following.

Contenido del artículo
Figure 1: Run and Debug view opened in Visual Studio Code with no launch configurations defined.

Click on the “create a launch.json file” hyperlink. If you have launch configurations, open up your launch.json file by clicking on the cog icon in the top right hand corner of the Run and Debug view.

In your launch.json file, create a new launch configuration for debugging your Docker build. You can use the sample below to get started. For a full description of the various attributes in a launch configuration, see here.

{
  "name": "Docker: Build",
  "type": "dockerfile",
  "request": "launch",
  "dockerfile": "Dockerfile",
  "contextPath": "${workspaceFolder}"
}
Adding a Breakpoint

Now that you have completed setting up your launch configuration, let’s add a breakpoint to our Dockerfile. Place a breakpoint next to one of your RUN instructions by clicking in the editor’s left margin or by pressing F9. A circle should appear to indicate that a breakpoint has been added.

Launching the Debugger

We are now ready to start the debugger. Select the launch configuration you created and then hit F5. The build should pause at the RUN line where you placed the breakpoint.

Contenido del artículo
Figure 2: Docker build suspended by a breakpoint in Visual Studio Code.

Debugging Features

We will now walk you through the three different features that the Buildx Debugger provides.

Inspecting Variables

When a build is in a suspended state, you can look at any variables that may have been defined. In this example, by looking at the executed command’s workdir value on the left-hand side, we can now see that the command is not being run in the right folder as we had copied the contents into /app. We can fix this by adding WORKDIR /app before the RUN line. Also note that we can view variables that have been defined by our image and the base image as seen by VAR and NODE_VERSION.

Contenido del artículo
Figure 3: Docker build encounters an error and is suspended by the debugger instead of terminating.

File Explorer

In addition to inspecting variables, you can also look at the structure of the file system to see what is already there and what you have copied in. For text files, you can also see its file content as shown in the file’s data field.

Contenido del artículo
Figure 4: View the file system of the Docker image being built.

Interactive Debugging

Creating the right Dockerfile is often an iterative process. Part of this is usually because the host system you are developing on shares few similarities with the image you are building. Consider the differences between running Ubuntu locally but trying to build an Alpine Linux image. The small differences in package names creates a lot of back and forth between your editor and your browser as you search for the right name. You add a line here and then maybe comment another line somewhere else before running docker build again to just hope for the best.

This iterative process can now be streamlined with the help of the debugger. When your build is in a suspended state, open the Debug Console view and then place your cursor in the input field at the bottom. Type in exec and then hit the enter key. The Terminal view should now open with a shell that is attached to the image that is being built.

Contenido del artículo
Figure 5: Use the Debug Console to open a shell into the Docker image being built by running exec.

Contenido del artículo
Figure 6: The Docker image that is being built can now be accessed and inspected with a terminal.

This feature is a game changer as you can now easily open the image of a Dockerfile at any given step and inspect its content and run commands for testing. Previously, we would have to comment everything after the buggy line, build the Docker image, and then manually run and open a shell into the image. All of that is now condensed into adding a breakpoint in your editor and starting a debug session! Keep in mind that none of the changes you make in the terminal are persisted so this is purely for experimentation. In the figure below, we can see that a file was created when the debugger was paused at line 3. When the debugger was advanced to line 4, the file disappeared.

Contenido del artículo
Figure 7: Changes to the Docker image inside the exec terminal will be reset when the debugger steps to another line.

Integrations powered by an Open Specification

Just like our work with the Docker Language Server that implements the Language Server Protocol, the Buildx debugger is built on open standards as it implements the Debug Adapter Protocol which means that you can debug Dockerfile builds with any editor that supports the protocol. Besides Visual Studio Code, we also provide an official plugin for Neovim. For the JetBrains users out there, we have verified that it integrates well with the LSP4IJ plugin. If your favourite editor supports the Debug Adapter Protocol, there should be a way for the Buildx debugger to integrate with it.

