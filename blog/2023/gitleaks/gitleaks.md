---
date: 2023-10-07
title: Gitleaks, detecta secretos en tu repositorio de git 
slug: gitleaks_secretos_git_repositorio_detectar 
tags: [git,seguridad]
authors: pabpereza
image: https://img.youtube.com/vi/zHJdDT7XWkc/maxresdefault.jpg
---

# Evita Exponer Secretos en Git y Protege tu Código con Gitleaks

En el desarrollo de software moderno, **Git** se ha convertido en la herramienta fundamental para la gestión de versiones de código. Sin embargo, con su uso, surge un problema crítico de seguridad: la **exposición accidental de secretos** como tokens, claves API, contraseñas o claves SSH dentro de los repositorios. Esto puede abrir la puerta a ataques graves si estos secretos son filtrados y accedidos públicamente. Afortunadamente, herramientas como **Gitleaks** pueden ayudarnos a prevenir esta situación, ofreciendo una capa adicional de seguridad, tanto en entornos locales como en los procesos de CI/CD (integración y entrega continua).

[![Gitleaks, detecta secretos en tu repositorio de git](https://img.youtube.com/vi/zHJdDT7XWkc/maxresdefault.jpg)](https://youtu.be/zHJdDT7XWkc)

<!-- truncate -->

Dentro vídeo: https://youtu.be/zHJdDT7XWkc

## ¿Por qué es peligroso almacenar secretos en Git?

Cuando hablamos de **secretos**, nos referimos a cualquier información sensible que podría comprometer la seguridad de una aplicación si cae en manos equivocadas. Esto incluye:
- **Tokens de acceso** para servicios de terceros (por ejemplo, APIs como Twitter, GitHub, Google Cloud, AWS).
- **Claves SSH** para acceder a servidores o servicios remotos.
- **Contraseñas** para bases de datos, aplicaciones o cualquier tipo de autenticación.
- **Certificados** o claves privadas para cifrado.

Una de las razones más comunes por las que estos secretos terminan expuestos es porque los desarrolladores los incluyen accidentalmente en los archivos de configuración o código. Estos archivos luego son **commiteados a Git** y pueden ser visualizados por cualquier persona con acceso al repositorio. Si el repositorio es público, la exposición es masiva y puede ser rastreada fácilmente.

Lo más preocupante es que, incluso si un secreto es removido en un commit posterior, este puede seguir siendo accesible en el historial de Git, ya que Git almacena todo el historial de cambios. Por lo tanto, el riesgo no desaparece simplemente al eliminar el código sensible en futuros commits.

## ¿Qué es Gitleaks y cómo nos ayuda?

**Gitleaks** es una herramienta de código abierto diseñada para **detectar secretos** que puedan haberse colado en un repositorio de Git. Utiliza una serie de patrones predefinidos y configurables que le permiten buscar tokens, contraseñas, claves privadas y otros tipos de información sensible dentro del historial de Git.

## Funcionalidades principales de Gitleaks:
1. **Escaneo de repositorios locales**: Puedes ejecutar Gitleaks en tu máquina local para analizar un repositorio y detectar secretos antes de hacer un push a un repositorio remoto.
2. **Integración con pipelines de CI/CD**: Gitleaks puede integrarse en tus procesos de integración continua para que cualquier pull request o commit que contenga secretos sea automáticamente bloqueado.
3. **Escaneo de historiales**: Además de escanear los archivos actuales, Gitleaks también puede revisar el historial completo de Git para identificar secretos que hayan sido introducidos y posteriormente eliminados.
4. **Soporte para configuraciones personalizadas**: Aunque Gitleaks viene con una serie de patrones predefinidos, también puedes personalizar qué tipo de información debe buscar según las necesidades de tu proyecto.

## Cómo funciona Gitleaks en un flujo de trabajo típico

Imagina un escenario en el que un desarrollador, por accidente, introduce una **clave API** de AWS en un archivo de configuración y lo sube al repositorio. Este tipo de errores es más común de lo que se cree, y puede pasar inadvertido si no se tienen controles adecuados.

Con **Gitleaks** configurado en tu flujo de trabajo de CI/CD, cada vez que se haga un **pull request** o se añadan nuevos commits al repositorio, la herramienta realizará un escaneo automático para detectar posibles secretos. Si encuentra algún problema, el pipeline puede ser bloqueado hasta que se corrija la situación, lo que evita que el código llegue a producción con información sensible.

## Implementación de Gitleaks

A continuación, te explicamos cómo puedes empezar a usar Gitleaks en tu proyecto.

### 1. Instalación

Gitleaks es fácil de instalar y puedes utilizarlo en varias plataformas. Para instalarlo de manera local, puedes usar el siguiente comando si estás en Linux o macOS:

```bash
brew install gitleaks
```

En Windows, puedes instalarlo utilizando `choco` (Chocolatey):

```bash
choco install gitleaks
```

Alternativamente, puedes descargar los binarios directamente desde su [repositorio de GitHub](https://github.com/zricethezav/gitleaks).

### 2. Ejecución de un análisis en tu repositorio

Una vez instalado, puedes ejecutar Gitleaks para escanear tu repositorio local con el siguiente comando:

```bash
gitleaks detect -v
```

Este comando analizará todos los archivos del repositorio actual y el historial de Git, buscando patrones predefinidos de secretos.

### 3. Integración con CI/CD

Para integrarlo en un pipeline de CI/CD, debes agregar un paso en tu configuración de CI que ejecute el análisis de Gitleaks. Por ejemplo, en un pipeline de GitLab CI, podrías añadir algo como lo siguiente en tu archivo `.gitlab-ci.yml`:

```yaml
gitleaks_scan:
  stage: security
  script:
    - gitleaks detect --source .
  allow_failure: false
```

Esto asegura que si se detectan secretos en cualquier commit, el pipeline fallará y el código no podrá ser fusionado hasta que se solucione el problema.

## Buenas prácticas para evitar la exposición de secretos

Además de utilizar herramientas como Gitleaks, es importante seguir algunas **buenas prácticas** para reducir la posibilidad de filtrar información sensible:

1. **Usa archivos de configuración separados**: Guarda tus secretos en archivos de configuración que no estén incluidos en el repositorio y añádelos a tu archivo `.gitignore`.
2. **Variables de entorno**: Siempre que sea posible, utiliza **variables de entorno** para manejar tus claves y tokens en lugar de incluirlas directamente en el código.
3. **Rotación de claves**: Si accidentalmente se expone una clave, asegúrate de rotarla de inmediato y actualizar cualquier sistema que dependa de ella.
4. **Auditoría de seguridad regular**: Realiza auditorías periódicas para asegurarte de que no se han filtrado secretos en tus repositorios.

## Conclusión

La gestión de secretos es una parte crítica de la seguridad en el desarrollo de software, y la exposición de información sensible puede tener consecuencias catastróficas. Herramientas como **Gitleaks** no solo te permiten detectar estos secretos antes de que lleguen a producción, sino que también pueden integrarse en tu flujo de trabajo de CI/CD para prevenir errores humanos. Si aún no estás utilizando una herramienta como Gitleaks en tus repositorios de Git, ¡es hora de empezar!

