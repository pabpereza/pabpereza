---
slug: hadolint-verificar-mejorar-dockerfile
title: Verifica y mejora tus dockerfiles 
tags: [ dockerfile, docker, contenedores]
authors: pabpereza
date: 2023-09-16
---

# Uso de Hadolint para Revisar Buenas Prácticas

Aunque es posible seguir las buenas prácticas manualmente, una herramienta que te ayudará a automatizar la revisión de tu Dockerfile es **Hadolint**. Es un linter de Dockerfile que chequea automáticamente si tu archivo cumple con las mejores prácticas recomendadas.

<!-- truncate -->

### Instalación de Hadolint

Hadolint se puede instalar de diferentes maneras, dependiendo de tu sistema operativo. Aquí te mostramos cómo hacerlo usando **Docker**, que es el método más universal:

```bash
docker run --rm -i hadolint/hadolint < Dockerfile
```

Alternativamente, puedes instalarlo localmente en tu sistema (Linux, macOS o Windows) siguiendo las instrucciones en el [repositorio oficial de Hadolint](https://github.com/hadolint/hadolint).

### Cómo Usar Hadolint

Una vez que hayas instalado Hadolint, puedes simplemente ejecutarlo sobre tu Dockerfile para obtener una lista de advertencias y sugerencias.

```bash
hadolint Dockerfile
```

Ejemplo de salida de Hadolint:
```
Dockerfile:5 DL3008 warning: Pin versions in apt-get install. Instead of `apt-get install <package>` use `apt-get install <package>=<version>`
Dockerfile:7 DL3003 warning: Use WORKDIR to switch to a directory instead of `cd`
```

Cada advertencia viene con un código (como `DL3008`), que te indica la regla específica que estás violando. Puedes consultar más sobre estas reglas en la [documentación de Hadolint](https://github.com/hadolint/hadolint#rules).

### Integración con CI/CD

Hadolint puede integrarse fácilmente en tu pipeline de CI/CD para asegurarse de que todos los Dockerfiles se validen antes de ser desplegados. Si estás usando GitHub Actions, puedes añadir Hadolint de la siguiente manera:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Run Hadolint
      run: docker run --rm -i hadolint/hadolint < Dockerfile
```

Esto permitirá que se verifiquen automáticamente las buenas prácticas en cada **pull request** o **push** a tu repositorio.

---

## Conclusión

Escribir Dockerfiles efectivos es una habilidad esencial para cualquier desarrollador o administrador de sistemas que trabaje con contenedores. Al seguir las **buenas prácticas** descritas en este artículo, como usar imágenes ligeras, minimizar capas, limpiar dependencias y aprovechar multi-stage builds, puedes asegurar que tus contenedores sean más seguros, rápidos y fáciles de mantener. Además, herramientas como **Hadolint** automatizan la verificación de estas mejores prácticas, ayudándote a mantener tus Dockerfiles en un estado óptimo de forma constante.

Siguiendo estos principios y utilizando Hadolint, puedes mejorar tanto la calidad de tus Dockerfiles como la eficiencia de tu entorno de desarrollo y producción.

Recuerda visitar mi curso de Docker para más información sobre cómo mejorar tus habilidades con contenedores. [Curso de Docker](https://pabpereza.dev/docs/cursos/docker)