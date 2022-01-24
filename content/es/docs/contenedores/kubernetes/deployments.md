---
title: "Deployments"
linkTitle: "Deployments"
weight: 40 
tags: [kubernetes, deployments]
description: "Elementos de configuración que permiten la creación de una aplicación de una sola instancia."
---

Los [deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) son elementos de configuración que permiten la creación de una aplicación de una sola instancia.


# Definición de un deployment
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


