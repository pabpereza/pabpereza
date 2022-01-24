---
title: "Deployments"
linkTitle: "Deployments"
weight: 40 
tags: [kubernetes, deployments]
description: "Elementos de configuración que permiten la creación de una aplicación de una sola instancia."
---

Los [deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) son elementos de configuración que permiten la creación de una aplicación de una sola instancia.

El deployment gestiona uno o varios objetos replicaset y estos a su vez gestionan uno o más pods.

## Definición de un deployment
Este es un ejemplo de su estructura básica:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80
```

Aplicaría la configuración anterior con el comando:
```shell
kubectl apply -f deployment.yaml
```

Este deployment gestionaría los servicios de replicaset y los contenedores 
de nginx definidos.

Podríamos consultar el estado del deployment con el comando:
```shell
kubectl get deployment nginx-deployment
```

El cual nos devolvería una salida similar a la siguiente:
```shell
NAME                            READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment                3       3            3           2m
```

## Actulizar un deployment
Supongamos que queremos actualizar el deployment para que gestione una nueva imagen, concretamente, las de nginx basadas en alpine. El yaml de configuración quedaría así:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80
```

Aplicamos los cambios de nuevo con el comando 'kubectl apply -f deployment.yaml' y esta vez nos devuelve que se ha configurado, en vez de crearse:
```shell
kubectl apply -f deployment.yaml
deployment.apps/deployment-test configured #Salida del comando
```

Además, kubernetes gestiona las actulizaciones de los deployment para que sean progresivo entre un cambio de versión y el servicio de que dan los pods no se interrumpa.
