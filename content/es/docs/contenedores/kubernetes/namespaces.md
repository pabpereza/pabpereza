---
title: "Namespaces y context"
linkTitle: "Namespaces y context"
weight: 60
tags: [kubernetes, devops]
description:  
---

## Namespaces
Los namespaces son una forma de agrupar y aislar los recursos de kubernetes. Esto permite que podamos segregar los diferentes recursos de una aplicación ( pod, deployment, service, etc) para establecer unas cuotas recursos, políticas de seguridad y configuraciones específicas.

Por omisión, kubernetes crea un namespace llamado `default` que es el namespace por defecto. 


### Listar namespaces
Podemos listar los namespaces con el comando:
```shell
kubectl get ns
```

Esto nos muestra nuestro namespace por defecto y los namespaces del sistema de kubernetes (no tocar estos namespaces):
```yaml
NAME              STATUS   AGE
default           Active   26d
kube-node-lease   Active   26d
kube-public       Active   26d
kube-system       Active   26d
```

Puede ser interesante listar los namespaces junto con sus `labels``:
```shell
kubectl get ns --show-labels
```

Este comando nos muestra nuestros namespaces de la siguiente forma:
```yaml
NAME              STATUS   AGE   LABELS
default           Active   26d   kubernetes.io/metadata.name=default
kube-node-lease   Active   26d   kubernetes.io/metadata.name=kube-node-lease
kube-public       Active   26d   kubernetes.io/metadata.name=kube-public
kube-system       Active   26d   kubernetes.io/metadata.name=kube-system
```

### Crear un namespace
Podemos crear un namespace simplemente con el comando:
```shell
kubectl create ns <nombre-namespace>
```

Aún así, también también lo podemos crear con un fichero de configuración (este en formato json) para dejarlo definido como código:
```json
{
  "apiVersion": "v1",
  "kind": "Namespace",
  "metadata": {
    "name": "development",
    "labels": {
      "name": "development"
    }
  }
}
```

Para utilizar este json de configuración podemos utilizar el comando:
```shell
kubectl create -f <fichero-json>
```


## Borrar un namespace
Podemos borrar un namespace con el comando:
```shell
kubectl delete ns <nombre-namespace>
```


### Cambiar de namespace y contextos
Podríamos ejecutar comandos en cualquier namespace añadiendo el parámentro `--namespace` o `-n` a cualquier comando, por ejemplo:
```shell
kubectl get pods --namespace development
```

El proceso anterior sería más farragoso, excepto que queramos lanzar un comando puntual en un namespace concreto, es más recomendable utilizar la configuración de contexto de kubectl:
```shell
kubectl config set-context <nombre-context> --namespace=<nombre-namespace>
```
Así estaríamos asociando un namespace a un contexto. 

## Context
Los contextos en kubernetes permiten definir a nuestro cliente diferentes entornos a los que conectarse. Estos entornos puedes ser namespaces o clusters diferentes.

Podemos ver nuestra configuración con el comando:
```shell
kubectl config view
```

Esto nos mostrará nuestra configuración de organizada de la siguiente manera:
```yaml
apiVersion: v1
kind: Config
preferences: {}

clusters:
- cluster:
  name: development
- cluster:
  name: scratch

users:
- name: developer
- name: experimenter

contexts:
- context:
  name: dev-frontend
  user: developer
  cluster: development
- context:
    cluster: scratch
    namespace: develop
    user: experimenter
  name: scratch-frontend

```

Podemos distinguir tres elementros de la configuración:
* Clusters: definen los clusters a los que podemos conectarnos.
* Users: definen los usuarios que podemos utilizar para conectarnos a los clusters.
* Contexts: definen los contextos a los que podemos conectarnos. Estos contextos guardan la relación de usuario, cluster y namespace.

Esta organización nos permite definir clusters y usuarios individualmente y luego ir asociándolos en contexto concretos.

Este fichero de configuración se suele alojar en el directorio `~/.kube/config`. Podemos añadir una nueva configuración editando el fichero o usando el comando:
```shell
kubectl config set-context <nombre del contexto> --namespace=<nombre namespace OPCIONAL> \
  --cluster=<nombre del cluster> \
  --user=<usuario>
```

### Definir usuario
Se puede definir un usuario con el comando en nuestro fichero de configuración con el siguiente comando:
```shell
kubectl config set-credentials <nombre-usuario> --client-certificate=<certificado> --client-key=<clave>
```

### Definir un cluster
También podemos definir por comandos clusters:
```shell
kubectl config set-cluster <nombre-cluster> --server=<url del cluster> --certificate-authority=<certificado-autoridad>
```