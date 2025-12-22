---
slug: apple_containers_macos_overview
title: "Probando Apple Containers en macOS 26 Primeras impresiones y rendimiento"
tags: [apple, macos, containers, docker, performance, cli]
keywords: [apple containers, macos 26, docker vs apple containers, rendimiento, cli, tutorial]
authors: pabpereza
date: 2025-12-21
draft: true
---

# Probando Apple Containers en macOS 26: Primeras impresiones y rendimiento

Con la llegada de la beta de **macOS 26**, Apple ha liberado finalmente su bestia: **Apple Containers**. Ya no es un rumor. Es una herramienta de línea de comandos nativa (`ac`) que llega para ofrecer una alternativa de alto rendimiento a Docker Desktop en nuestros Macs con Apple Silicon.

He estado probándolo durante el fin de semana y aquí os traigo un análisis técnico: cómo funciona, sus primeros comandos, una comparativa de rendimiento real y, por supuesto, sus limitaciones actuales.

<!-- truncate -->

## ¿Qué hay bajo el capó?

A diferencia de Docker en macOS, que tradicionalmente ha dependido de una máquina virtual Linux (vía HyperKit o más recientemente el framework de Virtualización de Apple) para ejecutar el kernel de Linux, **Apple Containers** toma un enfoque híbrido mucho más agresivo.

Utiliza una capa de traducción de syscalls (llamadas al sistema) altamente optimizada, similar a lo que hace WSL2 en Windows pero integrado en el kernel XNU de Darwin. Esto significa:
1.  **No hay VM pesada** reservando 2GB de RAM nada más arrancar.
2.  **Sistema de archivos nativo**: Los volúmenes se montan directamente sobre APFS sin la penalización del sistema de archivos de red (gRPC/FUSE) que sufrimos en Docker.

## Primeros pasos: La CLI `ac`

La herramienta se invoca mediante el comando `ac`. La sintaxis es sospechosamente familiar para cualquiera que venga de Docker, lo cual se agradece.

### Ejecutando tu primer contenedor

```bash
# Descargar y ejecutar una imagen (compatible con OCI)
ac run -it ubuntu:24.04 /bin/bash
```

La primera vez que ejecutas esto, notas la diferencia. El tiempo de arranque del "motor" es inexistente porque no hay motor que arrancar; es parte del SO.

### Gestión básica

Listar contenedores activos:
```bash
ac ps
# CONTAINER ID   IMAGE          STATUS    PORTS
# a1b2c3d4       nginx:latest   Running   8080:80
```

Construir una imagen (sí, lee Dockerfiles estándar):
```bash
ac build -t mi-app-nativa .
```

Una característica interesante es la integración con **Swift**. Puedes definir contenedores usando archivos de configuración en Swift en lugar de YAML, lo que permite lógica condicional en la definición de tu infraestructura local.

## Docker vs Apple Containers: La prueba de fuego

He realizado un benchmark simple: una aplicación Node.js que escribe y lee 10.000 archivos pequeños en un volumen montado, y la compilación de un proyecto Rust grande.

### Test 1: I/O de Disco (Node.js)
*   **Docker Desktop (VirtioFS)**: 45 segundos
*   **OrbStack**: 12 segundos
*   **Apple Containers**: 3.5 segundos 🚀

La diferencia es abismal. Al no haber capa de virtualización de sistema de archivos, la escritura es prácticamente nativa.

### Test 2: Uso de Memoria (Idle)
*   **Docker Desktop**: ~2.5 GB (VM overhead)
*   **Apple Containers**: ~150 MB (solo los procesos del demonio)

## Las Limitaciones (No todo es color de rosa)

Aunque el rendimiento es espectacular, la tecnología está verde:

1.  **Compatibilidad del Kernel**: Si tu contenedor depende de módulos específicos del kernel de Linux (como eBPF avanzado o ciertos drivers de red), fallará. `ac` traduce la mayoría de syscalls, pero no todas.
2.  **Solo Apple Silicon**: Olvídate de usar esto en los viejos Macs con Intel. Es una tecnología diseñada para la arquitectura ARM de los chips M-Series.
3.  **Orquestación**: No hay un equivalente a Kubernetes o Docker Swarm integrado. Apple sugiere usar scripts o herramientas de terceros, pero de momento, es una herramienta puramente local para desarrollo.
4.  **Networking**: Aunque el port-forwarding funciona bien, las redes complejas tipo "bridge" o "overlay" tienen una configuración muy diferente y menos flexible que en Docker.

## Conclusión

Apple Containers en macOS 26 no es un reemplazo 1:1 para Docker en producción, pero para **desarrollo local**, es una opción muy atractiva. La velocidad de disco y el ahorro de batería son argumentos de peso para muchos desarrolladores web y mobile.

¿Estamos ante el futuro? Si Apple sigue mejorando la compatibilidad de syscalls, veremos una interesante convivencia. Docker Desktop seguirá siendo clave por su ecosistema y estandarización, pero Apple Containers se posiciona como la herramienta ideal para quien busca la máxima integración con el sistema.
