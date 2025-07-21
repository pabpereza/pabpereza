---
slug: kubectx_kubens_kubernetes_context 
title: "Kubectx y Kubens: Cambia de contexto y namespace en Kubernetes fácilmente" 
tags: [selfhosting, kubernetes, kubectx, kubens]
authors: pabpereza
date: 2025-07-18
description: "Aprende a usar Kubectx y Kubens para cambiar de contexto y namespace en Kubernetes de forma rápida y sencilla. Mejora tu flujo de trabajo con estos comandos útiles." 
---

# Kubectx y Kubens: Cambia de contexto y namespace en Kubernetes fácilmente
En este artículo, vamos a ver cómo usar Kubectx y Kubens para cambiar de contexto y namespace en Kubernetes de forma rápida y sencilla. Estos comandos son muy útiles para mejorar nuestro flujo de trabajo y evitar errores al trabajar con múltiples clusters y namespaces.

Si lo prefieres en vídeo, aquí lo tienes en mi canal de Youtube: https://youtu.be/6lpkb9DM7tk

[![Kubectx y Kubens](https://i.ytimg.com/vi/6lpkb9DM7tk/maxresdefault.jpg)](https://youtu.be/6lpkb9DM7tk)


## ¿Qué son Kubectx y Kubens?
Kubectx y Kubens son dos herramientas de línea de comandos que nos permiten cambiar rápidamente entre contextos y namespaces en Kubernetes. Kubectx nos permite cambiar entre diferentes clusters de Kubernetes, mientras que Kubens nos permite cambiar entre diferentes namespaces dentro de un cluster.

## Instalación de Kubectx y Kubens
Para instalar Kubectx y Kubens, simplemente tenemos que clonar el repositorio de GitHub y mover los archivos a una ubicación en nuestro PATH. Tambien tenemos la guia de instalarlo vía gestor de paquetes. 

Toda la documentación oficial la puedes encontrar en el repositorio de GitHub: [Kubectx](https://github.com/ahmetb/kubectx).

## Cambiar de contexto con Kubectx
Para cambiar de contexto con Kubectx, simplemente tenemos que ejecutar el comando `kubectx` seguido del nombre del contexto al que queremos cambiar. Por ejemplo, si queremos cambiar al contexto `my-cluster`, simplemente tenemos que ejecutar:
```bash
kubectx my-cluster
```

Si queremos ver los contextos disponibles, simplemente tenemos que ejecutar el comando `kubectx` sin ningún argumento:
```bash
kubectx
```

Esto nos mostrará una lista de todos los contextos disponibles en nuestro cluster de Kubernetes.

## Cambiar de namespace con Kubens
Para cambiar de namespace con Kubens, simplemente tenemos que ejecutar el comando `kubens` seguido del nombre del namespace al que queremos cambiar. Por ejemplo, si queremos cambiar al namespace `my-namespace`, simplemente tenemos que ejecutar:
```bash
kubens my-namespace
```

Si queremos ver los namespaces disponibles, simplemente tenemos que ejecutar el comando `kubens` sin ningún argumento:
```bash
kubens
```
Esto nos mostrará una lista de todos los namespaces disponibles en nuestro cluster de Kubernetes.

## Conclusión
Kubectx y Kubens son herramientas muy útiles para mejorar nuestro flujo de trabajo al trabajar con Kubernetes. Nos permiten cambiar rápidamente entre contextos y namespaces, evitando errores y ahorrando tiempo.

Si trabajas con múltiples clusters y namespaces, te recomiendo que las instales y las uses en tu día a día. 


