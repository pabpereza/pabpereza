---
title: 🛡️ Curso DevSecOps gratuito - seguridad en el ciclo de desarrollo desde cero
description: >-
  Curso completo de DevSecOps gratuito en español. Aprende a integrar seguridad
  en tu pipeline con gitleaks, Semgrep, Trivy, Checkov, Cosign, Vault y OWASP ZAP,
  con laboratorios sencillos que puedes reproducir en tu propia máquina.
image: 'https://pabpereza.dev/img/banner_devsecops.png'
keywords:
  - devsecops
  - curso devsecops desde cero
  - tutorial devsecops completo
  - aprender devsecops en español
  - seguridad en el pipeline ci cd
  - shift left security
  - devsecops gratis
  - devsecops para principiantes
  - sast dast sca
  - seguridad de contenedores
  - pipeline seguro github actions
  - devops vs devsecops
  - herramientas devsecops
  - devsecops paso a paso
tags:
  - devsecops
  - seguridad
  - devops
  - ci-cd
  - cursos
sidebar_label: 🛡️ DevSecOps
---

# Curso DevSecOps

**¡Este curso está en desarrollo! Puedes seguirme aquí o en YouTube para ver las actualizaciones semanales.**

Bienvenido al curso de DevSecOps gratuito y en español. La idea es sencilla: coger un pipeline normal y corriente e ir metiéndole seguridad en cada etapa, sin convertirlo en un infierno de burocracia que el equipo acabe saltándose.

No vamos a hablar de seguridad en abstracto. En cada capítulo hay una herramienta, un comando y un fallo real que encontrar. Todos los laboratorios se ejecutan en nuestra máquina con un `docker run` de una línea: no necesitamos cluster, ni cuenta de cloud, ni credenciales de nada.

:::tip ¿Necesitamos conocimientos previos?

El curso es autocontenido: se explica lo que hace falta según aparece. Pero si venimos completamente de nuevo, recomendamos mucho hacer antes el [curso de DevOps](../devops/README.md). DevSecOps es, literalmente, lo que pasa cuando le añadimos seguridad a DevOps — cuesta bastante menos si ya tenemos el pipeline en la cabeza.

:::

**⭐ Apoya este contenido gratuito [suscribiéndote en YouTube](https://www.youtube.com/@Pabpereza) y dando una estrella a [este repositorio](https://github.com/pabpereza/pabpereza).**

## El laboratorio del curso

Todos los capítulos giran alrededor del mismo repositorio de prácticas, una aplicación pequeña con **cinco fallos plantados a propósito**:

```bash
git clone https://github.com/pabpereza/devsecops-demo
cd devsecops-demo
```

Una clave API escrita en el código, una dependencia con un CVE conocido, una inyección SQL, un `Dockerfile` que corre como root y un Terraform que abre un bucket al mundo. En cada capítulo, una herramienta distinta encuentra el suyo.

No hace falta seguir el curso en orden: cada capítulo funciona por su cuenta.

## Índice del curso

### Fundamentos
* [Qué es DevSecOps](101.Introduccion.md) — shift-left, cultura y el pipeline seguro

### Seguridad en el código
* [Secretos en el código](102.Secretos_en_codigo.md) — gitleaks, pre-commit e historial
* [Dependencias y SCA](103.Dependencias_sca.md) — Trivy, Dependabot y Renovate
* [SAST](104.Sast.md) — análisis estático con Semgrep y SonarQube

### Seguridad en el artefacto
* [Imágenes de contenedor](105.Seguridad_imagenes.md) — escaneo con Trivy y gates en CI
* [SBOM y firma](106.Sbom_firma.md) — inventario con Syft y firma con Cosign

### Seguridad en la infraestructura
* [Seguridad en IaC](107.Seguridad_iac.md) — Checkov, tfsec y Policy as Code con OPA
* [Secretos en producción](108.Gestion_secretos.md) — HashiCorp Vault y External Secrets

### Seguridad en ejecución
* [DAST](109.Dast.md) — escanear la aplicación en marcha con OWASP ZAP
* [Pipeline completo](110.Pipeline_completo.md) — juntarlo todo en GitHub Actions

### Referencia
* [Cheatsheet DevSecOps](cheatsheet_devsecops.md) — todos los comandos en una página

## ¿Qué aprenderás?

Al terminar el curso seremos capaces de:

- ✅ Explicar qué aporta DevSecOps sobre DevOps, y qué **no** es
- ✅ Encontrar secretos filtrados en un repositorio, incluido el historial
- ✅ Detectar dependencias vulnerables y automatizar su actualización
- ✅ Analizar nuestro código en busca de fallos sin llegar a ejecutarlo
- ✅ Escanear imágenes de contenedor y romper el pipeline cuando aparece un CVE crítico
- ✅ Generar un SBOM y firmar nuestras imágenes para que nadie las suplante
- ✅ Auditar nuestro Terraform antes de aplicarlo
- ✅ Sacar los secretos del código y llevarlos a un gestor decente
- ✅ Montar un pipeline con security gates de principio a fin

## Requisitos previos

- Linux o macOS a nivel de usuario (o WSL si estamos en Windows)
- Git básico: clonar, hacer commits
- **Docker instalado** — es lo único imprescindible, porque casi todas las herramientas se ejecutan como contenedor
- Ganas de romper cosas antes de que las rompa otro

## Rutas de aprendizaje

Este curso toca muchas tecnologías por encima. Si queremos profundizar en alguna:

- **♾️ DevOps** — el curso previo recomendado: [Curso DevOps](../devops/README.md)
- **🐳 Docker** — contenedores desde cero: [Curso Docker](../docker/README.md)
- **⚓️ Kubernetes** — incluye toda la seguridad a nivel CKS: [Curso Kubernetes](../kubernetes/README.md)
- **⚙️ Ansible** — automatización y gestión de secretos: [Curso Ansible](../ansible/README.md)

## Contribuir

¿Has encontrado un error o quieres sugerir una mejora? Las contribuciones son bienvenidas:

1. Abre un [issue](https://github.com/pabpereza/pabpereza/issues)
2. Propón cambios mediante pull requests

---

**Vamos a ello. La seguridad no es un checkpoint al final, es algo que se hace en cada commit. 🛡️**
