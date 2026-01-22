---
slug: windows-en-docker-kvm
title: "Windows en Docker: Cómo ejecutar Windows 11 dentro de un contenedor"
authors: [pabpereza]
tags: [docker, windows, kvm, devops, laboratorio]
date: 2026-01-22
---

¿Ejecutar Windows completo dentro de un contenedor Docker? Suena a contradicción. Nos han enseñado que Docker es para microservicios y que, si quieres Windows, usas una máquina virtual tradicional. Pero, ¿y si te dijera que puedes desplegar un Windows 11, limpio, desechable y accesible vía web en menos de dos minutos con un simple `docker compose up`?

En este artículo vamos a explorar el proyecto **dockur/windows**, una solución increíble para levantar entornos de escritorio Windows desechables o persistentes utilizando la magia de los contenedores.

<!--truncate-->

## ¿Cómo funciona realmente?

Antes de ir al código, entendamos la magia. Docker comparte el kernel con el host, por lo que ejecutar un sistema operativo con un kernel completamente diferente (como Windows sobre Linux) no debería ser posible de forma nativa como lo hace un contenedor de aplicación estándar.

Este proyecto utiliza **KVM (Kernel-based Virtual Machine)** para la aceleración. Básicamente, el contenedor actúa como un envoltorio inteligente para QEMU/KVM. No es una imagen de "Windows Server Core" sin interfaz; es un Windows real con interfaz gráfica completa corriendo dentro de un entorno Dockerizado.

### ¿Por qué hacer esto?

1.  **Infraestructura como Código (IaC):** Defines tu máquina Windows en un archivo YAML. Es reproducible y versionable.
2.  **Automatización:** El contenedor descarga la ISO automáticamente, instala Windows y lo deja listo sin intervención manual.
3.  **Portabilidad:** Te llevas el contenedor a cualquier servidor Linux con soporte KVM.
4.  **Sandbox Perfecto:** Ideal para análisis de malware, pruebas de software peligrosas o entornos de CI/CD que requieren Windows.

## Requisitos Previos

Para que el rendimiento sea aceptable y no una presentación de diapositivas, necesitas que tu host soporte virtualización **KVM**.

Si estás en Linux, puedes verificarlo rápidamente:

```bash
sudo apt install cpu-checker
sudo kvm-ok

```

Si recibes un error indicando que KVM no se puede usar, verifica que la virtualización (Intel VT-x o AMD SVM) esté habilitada en tu BIOS.

## Guía Paso a Paso

Vamos a desplegar un Windows 11. Crea un archivo `compose.yml` en una carpeta nueva y pega la siguiente configuración:

```yaml
services:
  windows:
    image: dockurr/windows
    container_name: windows
    environment:
      VERSION: "11"
    devices:
      - /dev/kvm
      - /dev/net/tun
    cap_add:
      - NET_ADMIN
    ports:
      - 8006:8006
      - 3389:3389/tcp
      - 3389:3389/udp
    volumes:
      - ./windows:/storage
    restart: always
    stop_grace_period: 2m

```

### Desglosando la configuración

* **`VERSION: "11"`**: Por defecto instala Windows 11 Pro. Puedes cambiarlo por `"10"`, `"win7"`, `"xp"` o incluso versiones de Server como `"2022"`.
* **Devices**: Pasamos `/dev/kvm` para la aceleración de hardware y `/dev/net/tun` para la red.
* **Persistencia**: El volumen `./windows:/storage` es crítico. Aquí es donde se guardará el disco virtual de Windows. Si omites esto, cada vez que reinicies el contenedor, la instalación comenzará de cero.

### Lanzando el contenedor

Ejecuta el siguiente comando en tu terminal:

```bash
docker compose up -d

```

Ahora, abre tu navegador y ve a `http://localhost:8006`.

Verás la "magia" en acción: el contenedor descargará la ISO de Microsoft y comenzará la instalación de Windows de forma totalmente desatendida. No tienes que hacer clic en "Siguiente". Simplemente espera a que aparezca el escritorio.

## Consejos Pro para una Mejor Experiencia

### 1. Aumentar Potencia (CPU y RAM)

Por defecto, se asignan 2 núcleos y 4GB de RAM. Para Windows 11, esto puede quedarse corto. Puedes ajustarlo con variables de entorno:

```yaml
environment:
  VERSION: "11"
  RAM_SIZE: "8G"
  CPU_CORES: "4"

```

### 2. Usar Escritorio Remoto (RDP)

El visor web (puerto 8006) es excelente para la instalación y el acceso de emergencia, pero para trabajar cómodamente, RDP es superior.

Una vez instalado Windows, conéctate a `localhost:3389` usando tu cliente RDP favorito:

* **Usuario:** `Docker`
* **Contraseña:** `admin`


### 3. Compartir Archivos con el Host

Para pasar scripts o instaladores desde tu Linux a la máquina Windows, monta un volumen adicional en `/shared`:

```yaml
volumes:
  - ./windows:/storage
  - ./mis_archivos:/shared

```

Aparecerá una carpeta llamada "Shared" en el escritorio de Windows con el contenido de tu carpeta local.

## Conclusión

Este proyecto demuestra la flexibilidad de Docker más allá de los microservicios. Ya sea para laboratorios de seguridad, pruebas de compatibilidad o simplemente porque necesitas abrir ese único programa de Windows que no corre en Wine, **dockur/windows** es una herramienta imprescindible en tu cinturón de utilidades DevOps.

¡Nos vemos en el siguiente despliegue!

