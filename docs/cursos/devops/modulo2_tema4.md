---
title: Integración Continua (CI)
---

# Integración Continua (CI)

## Resumen teórico

La Integración Continua (CI) es una práctica de desarrollo de software en la que los desarrolladores integran su código en un repositorio compartido varias veces al día. Cada integración es verificada por una construcción automatizada y pruebas para detectar errores lo antes posible.

### Concepto de CI y SCM

La Integración Continua (CI) se basa en la idea de integrar el trabajo de los desarrolladores frecuentemente para detectar errores rápidamente. El Control de Versiones (SCM) es una parte fundamental de CI, ya que permite a los desarrolladores trabajar en paralelo y mantener un historial de cambios en el código.

### Git, GitHub, GitLab, Bitbucket

Git es un sistema de control de versiones distribuido que permite a los desarrolladores trabajar en paralelo y mantener un historial de cambios en el código. GitHub, GitLab y Bitbucket son plataformas que proporcionan servicios de alojamiento de repositorios Git y herramientas de colaboración.

### Versionado semántico

El versionado semántico es una convención para asignar números de versión a los proyectos de software. Utiliza un formato de tres partes: MAJOR.MINOR.PATCH. Los cambios importantes que rompen la compatibilidad incrementan el número MAJOR, las nuevas funcionalidades que no rompen la compatibilidad incrementan el número MINOR, y las correcciones de errores incrementan el número PATCH.

### Herramientas de CI: Jenkins, GitHub Actions

Jenkins es una herramienta de automatización de código abierto que permite la integración y entrega continua. GitHub Actions es una herramienta de automatización que permite la integración y entrega continua directamente en GitHub.

### Pipelines: Groovy, shared libraries, repos de artefactos

Los pipelines son secuencias de pasos automatizados que se ejecutan para construir, probar y desplegar el código. Groovy es un lenguaje de scripting que se utiliza para definir pipelines en Jenkins. Las shared libraries son bibliotecas de código reutilizable que se pueden compartir entre múltiples pipelines. Los repos de artefactos, como Artifactory y Nexus, se utilizan para almacenar y gestionar los artefactos generados durante el proceso de construcción.

### Herramientas: Artifactory, Nexus

Artifactory y Nexus son herramientas de gestión de artefactos que permiten almacenar, gestionar y distribuir los artefactos generados durante el proceso de construcción. Estas herramientas son esenciales para la gestión de dependencias y la entrega continua.

## Lista de objetivos de aprendizaje

1. Comprender el concepto de Integración Continua (CI) y su relación con el Control de Versiones (SCM).
2. Conocer las plataformas Git, GitHub, GitLab y Bitbucket.
3. Entender el versionado semántico y su importancia en el desarrollo de software.
4. Aprender a utilizar herramientas de CI como Jenkins y GitHub Actions.
5. Conocer los conceptos de pipelines, shared libraries y repos de artefactos.
6. Aprender a utilizar herramientas de gestión de artefactos como Artifactory y Nexus.

## Ejemplos técnicos comentados

### Ejemplo de pipeline en Jenkins

```groovy
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'npm start'
            }
        }
    }
}
```

### Ejemplo de configuración de GitHub Actions

```yaml
name: CI

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

    - name: Deploy
      run: npm start
```

## Casos de uso o buenas prácticas

1. **Integración frecuente**: Integrar el código en el repositorio compartido varias veces al día para detectar errores rápidamente.
2. **Automatización de pruebas**: Automatizar las pruebas para asegurar que el código integrado no introduce errores.
3. **Gestión de dependencias**: Utilizar herramientas de gestión de artefactos como Artifactory y Nexus para gestionar las dependencias y los artefactos generados durante el proceso de construcción.

## Recursos recomendados

1. [Continuous Delivery](https://www.amazon.com/Continuous-Delivery-Deployment-Automation-Addison-Wesley/dp/0321601912) - Un libro sobre la entrega continua y la automatización del despliegue de software.
2. [The DevOps Handbook](https://www.amazon.com/DevOps-Handbook-World-Class-Reliability-Organizations/dp/1942788002) - Un libro que proporciona una guía completa sobre cómo implementar DevOps en una organización.
3. [Jenkins: The Definitive Guide](https://www.amazon.com/Jenkins-Definitive-Guide-John-Ferguson/dp/1449305350) - Un libro sobre cómo utilizar Jenkins para la integración y entrega continua.

## Ideas visuales

1. **Diagrama de flujo de un pipeline de CI**: Un diagrama que muestre el flujo de trabajo de un pipeline de CI, desde la construcción del código hasta el despliegue en producción.
2. **Diagrama de integración continua**: Un diagrama que ilustre cómo los desarrolladores integran su código en un repositorio compartido y cómo se ejecutan las construcciones y pruebas automatizadas.
3. **Animación de un pipeline de CI en acción**: Una animación que muestre el proceso de construcción, prueba y despliegue de una aplicación utilizando un pipeline de CI.

## FAQ o puntos clave a recordar

1. **¿Qué es la Integración Continua (CI)?**: La Integración Continua (CI) es una práctica de desarrollo de software en la que los desarrolladores integran su código en un repositorio compartido varias veces al día.
2. **¿Por qué es importante la Integración Continua (CI)?**: La Integración Continua (CI) permite detectar errores rápidamente y asegurar que el código integrado no introduce errores.
3. **¿Qué es el Control de Versiones (SCM)?**: El Control de Versiones (SCM) es una parte fundamental de CI que permite a los desarrolladores trabajar en paralelo y mantener un historial de cambios en el código.
4. **¿Qué es el versionado semántico?**: El versionado semántico es una convención para asignar números de versión a los proyectos de software utilizando un formato de tres partes: MAJOR.MINOR.PATCH.
5. **¿Qué son los pipelines?**: Los pipelines son secuencias de pasos automatizados que se ejecutan para construir, probar y desplegar el código.
6. **¿Qué son las shared libraries?**: Las shared libraries son bibliotecas de código reutilizable que se pueden compartir entre múltiples pipelines.
7. **¿Qué son los repos de artefactos?**: Los repos de artefactos, como Artifactory y Nexus, se utilizan para almacenar y gestionar los artefactos generados durante el proceso de construcción.
