---
title: Curso de Ansible desde cero - gratis y en español
description: >-
  Curso de Ansible gratuito y en español, de cero a producción. 11 capítulos
  con inventarios, playbooks, roles, Vault, Docker, Kubernetes y CI/CD, con
  vídeo.
image: 'https://pabpereza.dev/img/banner_ansible.jpg'
keywords:
  - ansible
  - curso ansible
  - curso de ansible
  - curso ansible desde cero
  - curso ansible gratis
  - tutorial ansible completo
  - aprender ansible español
  - automatización IT ansible
  - infraestructura como código
  - iac ansible
  - devops ansible
  - ansible para principiantes
  - ansible playbooks tutorial
tags:
  - ansible
  - devops
  - automatizacion
  - iac
  - cursos
sidebar_label: ⚙️ Ansible
---

# Curso de Ansible desde cero

Este es un **curso de Ansible gratuito y en español**, pensado para llevarte de cero a usar Ansible en producción. Son **11 capítulos** que puedes seguir por escrito en esta web o en **vídeo, un capítulo por vídeo**, con un laboratorio de prácticas basado en contenedores para que ejecutes todo en tu propia máquina sin necesidad de servidores.

![Banner del curso de Ansible gratuito en español](img/banner_ansible.webp)

**⭐ Apoya el curso [dando una estrella al repositorio](https://github.com/pabpereza/pabpereza) y [suscribiéndote al canal de YouTube](https://www.youtube.com/@Pabpereza?sub_confirmation=1).**

## ¿Qué es Ansible y por qué aprenderlo?

**Ansible** es una herramienta open source de **automatización IT e infraestructura como código (IaC)**: describe en ficheros YAML el estado en que quieres tus servidores (paquetes, configuración, servicios, despliegues) y Ansible se encarga de aplicarlo por SSH, sin instalar agentes en las máquinas.

¿Por qué aprenderlo? Porque es el estándar de facto de la gestión de configuración: la alternativa moderna a los scripts de bash frágiles y una de las herramientas más pedidas en ofertas de DevOps, SRE y administración de sistemas. Si gestionas más de un servidor —o quieres dejar de hacer las cosas a mano en el único que tienes— Ansible es probablemente la herramienta con mejor relación esfuerzo/beneficio que puedes aprender. En el [primer capítulo](./101.Introduccion.mdx) lo vemos en detalle: qué es, cómo funciona por dentro y cómo instalarlo.

## ¿Para quién es este curso?

Este curso te lleva desde **cero conocimiento** hasta dominar la automatización con Ansible en entornos reales. Está diseñado para:

- **Administradores de sistemas** que quieren dejar de hacer tareas a mano
- **Desarrolladores** que necesitan provisionar entornos repetibles
- **Profesionales DevOps** que buscan integrar Ansible en su CI/CD
- **Estudiantes** que empiezan con Infraestructura como Código (IaC)

## Qué vas a aprender

Al terminar serás capaz de:

- Diseñar inventarios estáticos y dinámicos para cualquier infraestructura
- Escribir playbooks idempotentes y reutilizables con roles
- Gestionar secretos de forma segura con Ansible Vault
- Desplegar aplicaciones, contenedores y clústeres Kubernetes
- Integrar Ansible en pipelines de Jenkins y GitHub Actions
- Aplicar estrategias de despliegue (rolling, blue-green, canary)

## Requisitos previos

No necesitas experiencia previa con Ansible ni saber programar. Con esto basta:

- **Linux básico**: moverte por la terminal y editar ficheros
- **SSH**: saber qué es y haberte conectado alguna vez a una máquina remota
- **Docker** instalado, para el [laboratorio de prácticas](https://github.com/pabpereza/ansible-laboratory) (si no lo tienes, pásate antes por el [curso de Docker](/docs/cursos/docker))
- **YAML y Python no son requisitos**: la sintaxis YAML se aprende en el capítulo 3, y de Python solo hace falta que esté instalado

## Índice del curso

### 🟢 Bloque I — Fundamentos

*Pon en marcha tu entorno y comprende la filosofía de Ansible.*

* [🚀 1. Introducción, Fundamentos e Instalación](./101.Introduccion.mdx) — Qué es Ansible, arquitectura sin agentes e instalación paso a paso · [vídeo](https://youtu.be/URK1t98tNEU)
* [📋 2. Inventarios y Hosts](./102.Inventarios.md) — Inventarios estáticos, dinámicos (AWS/Azure/GCP) y comandos ad-hoc · [vídeo](https://youtu.be/31gWvg81qGU)
* [📜 3. Playbooks y YAML](./103.Playbooks.md) — Tu primer playbook de Ansible: sintaxis, estructura y ejecución · [vídeo](https://youtu.be/F1GwuMWBKzo)
* [🧩 4. Módulos e Idempotencia](./104.Modulos_idempotencia.md) — Módulos esenciales, template con Jinja2 y por qué la idempotencia importa · [vídeo](https://youtu.be/U7a61YZoqB0)
* [🐳 5. Ansible y Contenedores](./105.Contenedores.md) — Automatiza Docker y Kubernetes con Ansible · [vídeo](https://youtu.be/7IoboMNhEYc)

### 🔵 Bloque II — Modularidad, seguridad y Ansible en producción

*Estructura tu código y protege tus secretos, desplegando servicios en contenedores.*

* [🔀 6. Variables y Control de Flujo](./106.Variables_control_flujo.md) — Variables, facts, condicionales, bucles y handlers · vídeo próximamente
* [🎭 7. Roles, Templates y Galaxy](./107.Roles.md) — Roles reutilizables y Ansible Galaxy · vídeo próximamente
* [🔐 8. Seguridad y Credenciales](./108.Seguridad.md) — Ansible Vault, claves SSH y variables sensibles · vídeo próximamente
* [🔧 9. Errores y depuración](./109.Errores_depuracion.md) — block/rescue/always, failed_when y troubleshooting de playbooks · vídeo próximamente
* [🏗️ 10. Proyecto Final](./110.Proyecto_final.md) — Despliega una app real en tres servidores con balanceo Nginx, roles, Vault y firewall · vídeo próximamente

### 🟣 Bloque III — Ansible Intermedio

*Fuera del núcleo introductorio de 10 vídeos: contenido de nivel avanzado que se irá ampliando.*

* [🚀 21. Ansible en CI/CD](./201.CICD.md) — Jenkins, GitHub Actions y estrategias de despliegue · vídeo próximamente

## El curso en vídeo

Cada capítulo de este curso corresponde a **un vídeo** de la [lista de reproducción del Curso de Ansible en YouTube](https://www.youtube.com/playlist?list=PLYBkVGIKe6Nk). Puedes seguirlo leyendo, viendo los vídeos o combinando ambos: el contenido es el mismo y está pensado para saltar a cualquier tema sin perder el hilo.

| Capítulo | Vídeo |
|---|---|
| 1. Introducción, fundamentos e instalación | [¿Qué es Ansible y cómo funciona?](https://youtu.be/URK1t98tNEU) |
| 2. Inventarios y hosts | [Inventarios en Ansible](https://youtu.be/31gWvg81qGU) |
| 3. Playbooks y YAML | [Playbooks en Ansible](https://youtu.be/F1GwuMWBKzo) |
| 4. Módulos e idempotencia | [Idempotencia y módulos avanzados](https://youtu.be/U7a61YZoqB0) |
| 5. Ansible y contenedores | [Ansible + Docker + Kubernetes](https://youtu.be/7IoboMNhEYc) |
| 6 a 10 y 21 | En grabación — publicación semanal |

> 🔔 El curso está en publicación activa: [suscríbete al canal](https://www.youtube.com/@Pabpereza?sub_confirmation=1) para recibir cada capítulo nuevo.

## Laboratorio de prácticas

Todo el curso se practica sobre [**ansible-laboratory**](https://github.com/pabpereza/ansible-laboratory), un laboratorio con contenedores Docker que simula varios servidores en tu propia máquina: un nodo de control y varios nodos gestionados accesibles por SSH. Sin necesidad de máquinas virtuales, sin gastar en cloud y sin miedo a romper nada — se destruye y se levanta de nuevo en segundos. En el [capítulo 1](./101.Introduccion.mdx) lo dejamos montado.

## Preguntas frecuentes

### ¿Qué es Ansible y para qué sirve?

Ansible es una plataforma open source de automatización IT. Sirve para gestionar la configuración de servidores, desplegar aplicaciones y orquestar tareas en muchas máquinas a la vez, describiendo el estado deseado en YAML y aplicándolo por SSH sin agentes. Se usa desde para un homelab de una máquina hasta para flotas de miles de servidores.

### ¿Este curso de Ansible es gratis?

Sí, completamente. Todo el contenido escrito está en esta web, los vídeos en YouTube y el laboratorio en GitHub, sin registro ni pago. Es contenido abierto: si encuentras un error o quieres mejorar algo, puedes [abrir un pull request](https://github.com/pabpereza/pabpereza). La forma de apoyarlo es una estrella en el repositorio y una suscripción al canal.

### ¿Cómo instalo Ansible en Linux, macOS o Windows?

En Linux y macOS se instala con el gestor de paquetes o con `pipx install ansible`; en Windows no funciona como nodo de control de forma nativa, pero puedes usar WSL2 y instalarlo dentro exactamente igual que en Linux. La instalación paso a paso, con sus requisitos y la configuración inicial, está en el [capítulo 1](./101.Introduccion.mdx).

### ¿Qué necesito saber antes de empezar?

Linux básico de terminal y saber qué es SSH. Nada más: la sintaxis YAML se explica en el [capítulo de playbooks](./103.Playbooks.md) y no hace falta saber programar en Python. Para el laboratorio necesitas Docker instalado.

### ¿Este curso equivale a "Ansible for the Absolute Beginners"?

Cubre el mismo terreno que los cursos introductorios de pago tipo "Ansible for the Absolute Beginner" —instalación, inventarios, playbooks, variables, roles, Vault— y añade bloques que esos no suelen tocar: integración con Docker y Kubernetes, CI/CD con Jenkins y GitHub Actions y un proyecto final multi-servidor. En español y gratis.

### ¿Qué diferencia hay entre Ansible y Ansible Automation Platform?

Ansible (el proyecto community, lo que se instala con `pipx install ansible`) es gratuito y open source, y es lo que usamos en este curso. **Ansible Automation Platform (AAP)** es el producto comercial de Red Hat que lo empaqueta con interfaz web, RBAC, ejecución centralizada y soporte de pago. Todo lo que aprendas aquí aplica igualmente a AAP.

## Cursos relacionados

* [🐳 Curso de Docker](/docs/cursos/docker) — la base de contenedores que usa el laboratorio y el capítulo 5
* [☸️ Curso de Kubernetes](/docs/cursos/kubernetes) — orquestación de contenedores, automatizable desde Ansible con `kubernetes.core`
* [♾️ Curso de DevOps](/docs/cursos/devops) — la cultura y las prácticas donde encaja todo esto

## 🤝 Contribuir

Si quieres contribuir a este repositorio, puedes hacerlo de varias formas:

* Reportando errores
* Proponiendo mejoras
* Añadiendo contenido
* Compartiendo y difundiendo el contenido
* Dejando una estrella para apoyar el proyecto

Siéntete libre de abrir una issue o un pull request con tus propuestas. **Apoya mi contenido siguiéndome en YouTube y GitHub, dando likes a los vídeos y dejando una estrella en el repositorio.**
