---
title: "Trivy"
linkTitle: "Trivy"
weight: 
tags: [contenedores, seguridad]
description:  
---

Trivy es una herramienta de análisis de vulnerabilidades para contenedores y ficheros de imagen. Es una herramienta de código abierto desarrollada por Aqua Security.

[Repositorio oficial](https://github.com/aquasecurity/trivy)


## Uso simple 
El uso simple de trivy nos permite analizar una imagen de docker y obtener un informe con las vulnerabilidades encontradas.
```bash
trivy image <nombre_imagen>

trivy i <nombre_imagen> # Versión corta
```

Parámetros:
- `--exit-code`: Devuelve un código de salida 1 si se encuentra alguna vulnerabilidad.
- `--severity`: Filtro de severidad. Valores: `UNKNOWN`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`.
- `--ignore-unfixed`: Ignora las vulnerabilidades no arregladas.
- `--no-progress`: Desactiva la barra de progreso.
- `-o <formato>`: Formato de salida. Valores: `table`, `json`, `template`, `template-file`.

### Analizar una imagen comprimida
Trivy también puede analizar  un comprimido con la imagen. Para ello, se debe utilizar el parámetro `--input` y especificar el directorio.
```bash
trivy image --input <directorio>
```

### Analizar un sistema de ficheros
Se puede analizar un sistema de ficheros, aunque trivy se limitará a buscar libreías de terceros (declaradas en ficheros `package.json`, `requirements.txt`, etc`):
```bash
trivy filesystem  <directorio>
`` 
```

### Analizar un contenedor en ejecución
Trivy también puede analizar un contenedor en ejecución. Para ello, se debe utilizar el parámetro `--input` y especificar el contenedor.
```bash
trivy image --input <nombre_contenedor>
```

### Analizar un repositorio 
Este comando permite un repositorio de git y analizar ficheros de IaC y de librerías de terceros.
```bash
trivy repo <url_repositorio>
```


## Usos concretos

### Entornos de CI/CD
Trivy puede ser utilizado en entornos de CI/CD para comprobar la seguridad de las imágenes que se van a desplegar. Para ello, se puede utilizar el parámetro `--exit-code` para que devuelva un código de salida 1 si se encuentra alguna vulnerabilidad. 

También podríamos utilizar el parámetro `--severity` para filtrar las vulnerabilidades por severidad. Por ejemplo, si queremos que devuelva un código de salida 1 si se encuentra alguna vulnerabilidad de severidad alta o crítica, podríamos utilizar el siguiente comando:
```bash
trivy image <nombre_imagen> --exit-code 1 --severity HIGH,CRITICAL
```

### Ignorar vulnerabilidades sin parchear
Puede dar el caso de que una vulnerabilidad no tenga parche disponible. En este caso, trivy nos mostrará la vulnerabilidad como si estuviera sin parchear. Para ignorar estas vulnerabilidades, se puede utilizar el parámetro `--ignore-unfixed`.
```bash
trivy image <nombre_imagen> --ignore-unfixed
```

### Tipos de escaneos en imágenes
Por defecto, trivy analiza las imágenes de docker y busca vulnerabilidades en las librerías de terceros. Sin embargo, también es posible analizar las imágenes de docker para buscar vulnerabilidades en los ficheros de IaC (Infrastructure as Code) y en los ficheros de configuración de la imagen. Para ello, se debe utilizar el parámetro `--scan-type` y especificar el tipo de escaneo que queremos realizar. Los valores posibles son: `os`, `library`, `package`, `all`.

Ejemplos:
```bash
trivy image <nombre_imagen> --scan-type os # Solo packages de sistema operativo ignorando librerías de terceros

trivy image <nombre_imagen> --scan-type library # Solo librerías de terceros ignorando packages de sistema operativo

trivy image <nombre_imagen> --scan-type package # Solo packages de sistema operativo y librerías de terceros

trivy image <nombre_imagen> --scan-type all # Todos los tipos de escaneo
```

### Saltar escaneo de secretos 
Por defecto, trivy también busca secretos en la imagen. Esta labor puede sumar mucho tiempo a nuestros procesos de CI y puede ser que en algunas ramas o situaciones queramos desactivarlo. Esto se podría hacer así:
```bash
trivy image --scanners vuln <nombre_imagen>
```

