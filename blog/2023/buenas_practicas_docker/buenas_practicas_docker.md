---
slug: verifica_mejora_dockerfiles 
title: Verifica y mejora tus dockerfiles 
tags: [ dockerfile, docker, contenedores]
authors: pabpereza
date: 2023-07-12
---

## Buenas Prácticas para Dockerfiles

Los contenedores han transformado la manera en que desarrollamos, probamos y desplegamos aplicaciones. Docker es una de las tecnologías clave que lidera este cambio, y su componente central, el **Dockerfile**, permite definir cómo se debe construir una imagen de Docker. Sin embargo, como cualquier otro archivo de configuración, los Dockerfiles pueden ser susceptibles a errores o malas prácticas que pueden generar problemas de rendimiento, seguridad y mantenibilidad.

En este artículo, vamos a explorar **las buenas prácticas** para escribir Dockerfiles eficientes, seguros y sostenibles. Además, veremos cómo utilizar **Hadolint**, una herramienta que te ayuda a verificar automáticamente la adherencia de tu Dockerfile a esas buenas prácticas.


<!-- truncate -->

### 1. **Mantén el Dockerfile Simple y Eficiente**
Uno de los principios más importantes es mantener el Dockerfile simple. Un Dockerfile complicado es difícil de leer, mantener y optimizar. Por ello, deberías:

- **Evitar capas innecesarias:** Docker crea una capa intermedia para cada instrucción en el Dockerfile. Cuantas más capas crees, más pesado será el contenedor resultante.
  
  **Mala práctica:**
  ```dockerfile
  RUN apt-get update
  RUN apt-get install -y curl
  ```

  **Buena práctica:**
  ```dockerfile
  RUN apt-get update && apt-get install -y curl
  ```

  De esta forma, ambas operaciones ocurren en una sola capa, haciendo que la imagen sea más ligera.

- **Usar imágenes base ligeras:** Si eliges imágenes base pesadas innecesariamente, aumentarás el tamaño de tu contenedor sin motivo. Imágenes como `alpine` o `ubuntu-slim` son ejemplos de alternativas ligeras.

  **Mala práctica:**
  ```dockerfile
  FROM ubuntu:latest
  ```

  **Buena práctica:**
  ```dockerfile
  FROM alpine:latest
  ```

  La imagen `alpine` es mucho más pequeña que `ubuntu` (menos de 10MB frente a más de 180MB).

### 2. **Optimiza el Uso de Caché**
Docker utiliza un sistema de caché basado en capas. Si un paso del Dockerfile cambia, todas las capas subsiguientes también se regeneran. Esto puede hacer que el tiempo de construcción aumente significativamente. Para optimizar el uso del caché:

- **Coloca las instrucciones más estables primero:** Las instrucciones que cambian con mayor frecuencia (como `COPY` y `ADD`) deberían estar al final del Dockerfile, para que las capas superiores puedan ser reutilizadas en las reconstrucciones.

  **Mala práctica:**
  ```dockerfile
  COPY . /app
  RUN apt-get update && apt-get install -y curl
  ```

  **Buena práctica:**
  ```dockerfile
  RUN apt-get update && apt-get install -y curl
  COPY . /app
  ```

### 3. **Usa `.dockerignore` para Excluir Archivos No Necesarios**
Docker copia todo el contenido del directorio al contexto de la construcción, lo que puede aumentar el tamaño de la imagen final si no se excluyen archivos innecesarios. Usa un archivo `.dockerignore` para evitar copiar archivos como logs, dependencias locales, configuraciones de IDE, etc.

**Ejemplo de un archivo `.dockerignore`:**
```
node_modules
*.log
.git
```

### 4. **Evita Ejecutar como Root**
Ejecutar contenedores con permisos de superusuario (root) puede ser un riesgo de seguridad. Siempre que sea posible, crea un usuario no root para ejecutar la aplicación dentro del contenedor.

**Mala práctica:**
```dockerfile
FROM node:14
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```

**Buena práctica:**
```dockerfile
FROM node:14
WORKDIR /app
COPY . .
RUN npm install
USER node
CMD ["npm", "start"]
```

### 5. **Limpia Dependencias y Archivos Temporales**
Cuando instalas paquetes o dependencias en tu Dockerfile, puede que se generen archivos temporales que aumenten el tamaño de la imagen final. Siempre que instales paquetes, asegúrate de limpiar cualquier archivo o caché temporal.

**Mala práctica:**
```dockerfile
RUN apt-get update && apt-get install -y build-essential
```

**Buena práctica:**
```dockerfile
RUN apt-get update && apt-get install -y build-essential \
  && rm -rf /var/lib/apt/lists/*
```

### 6. **Especifica Versiones de las Dependencias**
Para asegurar que tu Dockerfile sea reproducible, es esencial especificar versiones exactas para las dependencias de software que estés instalando.

**Mala práctica:**
```dockerfile
RUN apt-get install -y nodejs
```

**Buena práctica:**
```dockerfile
RUN apt-get install -y nodejs=12.x
```

Esto ayuda a evitar que la imagen cambie inesperadamente en el futuro si una nueva versión de `nodejs` es lanzada.

### 7. **Aprovecha el Multi-Stage Build**
El uso de **multi-stage builds** es una técnica avanzada que permite tener una etapa para compilar o construir tu aplicación y otra para el contenedor final, manteniendo el contenedor final lo más limpio y ligero posible.

**Mala práctica:**
```dockerfile
FROM golang:1.16
WORKDIR /app
COPY . .
RUN go build -o myapp
CMD ["./myapp"]
```

**Buena práctica:**
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

Con esto, la imagen final sólo incluye el binario `myapp` y no toda la sobrecarga de las herramientas de desarrollo que son necesarias en la etapa de compilación.


## Conclusión
Con estos simples consejos, puedes mejorar significativamente la calidad y eficiencia de tus Dockerfiles. Al seguir las buenas prácticas descritas en este artículo, como mantener el Dockerfile simple, optimizar el uso de caché, usar `.dockerignore`, evitar ejecutar como root, limpiar dependencias y aprovechar multi-stage builds, puedes asegurar que tus contenedores sean más seguros, rápidos y fáciles de mantener.

Recuerda visitar mi curso de Docker para más información sobre cómo mejorar tus habilidades con contenedores. [Curso de Docker](https://pabpereza.dev/docs/cursos/docker)


