---
title: "Helm"
linkTitle: "Helm"
weight: 110
tags: [helm, kubernetes]
description:  
---

Helm es una herramienta que nos permite gestionar, versionar y desplegar múltiples recursos de kubernetes.

Los componentes en helm se estructuran de la siguiente manera:
```md
├── Chart.yaml
├── README.md
├── templates
│   ├── NOTES.txt
│   ├── _helpers.tpl
│   ├── configmap.yaml
│   ├── deployment.yaml
│   ├── pvc.yaml
│   ├── secrets.yaml
│   └── svc.yaml
└── values.yaml
```

El fichero `chart.yaml` contiene los metadatos del `chart`, el `values` contiene las claves y atributos a modificar y el templates contienen los manifiestos de kubernetes.

Las templates se generan como un recurso nombre de kubernetes solo que plantillando las variables para que el chart sirva a diferentes propósitos y organizaciones. Por ejemplo:
```yml
apiVersion: v1
kind: Secret
metadata:
    name: {{ template "fullname" . }}
    labels:
        app: {{ template "fullname" . }}
        chart: "{{ .Chart.Name }}-{{ .Chart.Version }}"
        release: "{{ .Release.Name }}"
        heritage: "{{ .Release.Service }}"
type: Opaque
data:
    mariadb-root-password: {{ default "" .Values.mariadbRootPassword | b64enc | quote }}
    mariadb-password: {{ default "" .Values.mariadbPassword | b64enc | quote }}
```

Este elemento de tipo secreto esta plantillado para que todos sus campos se recojan del fichero values. Esto nos permite, centralizar todos los valores en un único fichero (values.yaml) y por otra parte, permitir que nuestros elementos se kubernetes sean reutilizables.


Este conjunto de elementos se llama `chart` y se pueden interactuar con ellos como repositorios de git.

## Repositorios
Por defecto, helm busca `charts` dentro de la web de [Artifactory Hub](https://artifacthub.io/).

Podríamos buscar charts con el comando:
``` bash
helm search hub <nombre del chart> #Buscar repositorios

helm search repo <nomrbre del repositorio> #Buscar dentro del repositorio
```

También podríamos añadir nuevos repositorios, por ejemplo, el de bitnami:
``` bash
helm repo add bitnami ht‌tps://charts.bitnami.com/bitnami
```

Los repositorios que trae por defecto y los que añadimos nosotros manualmente, pueden actualizarse con el comando:
``` bash
helm repo update
```


Si ahora quisieramos buscar `charts` solo dentro de este repositorio podríamos hacerlo así:
``` bash
helm search repo bitnami
```

## Desplegando un chart
Podríamos desplegar un `chart` con el comando `helm install`  pero la mayoría de ellos necesitan una personalización para que funcionen correctamente por lo que primero debemos descargarlos en local para leer su README y modificar los valores pertinentes.

Esto lo podríamos hacer con el comando:
``` bash
helm fetch <nombre repositorio> --untar
```

Tras modificar todo lo que nos resultara necesario, podemos lanzar el siguiente comando en la ruta del repositorio:
``` bash
helm install <nombre del despliegue>
```

Podríamos desinstalarlo con el comando:
``` bash
helm uninstall <nombre del despliegue>
```

También podríamos listar todos los charts desplegados y sus respectivas versiones con el comando:
``` helm 
helm list
```