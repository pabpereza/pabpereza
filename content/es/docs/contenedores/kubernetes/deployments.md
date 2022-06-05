---
title: "Deployments"
linkTitle: "Deployments"
weight: 40 
tags: [kubernetes, devops]
description: ""
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

## Crear un deployment con comandos
También podemos crear un deployment con una sola instancia con el comando:
```shell
kubectl create deployment nginx --image=nginx
```


## Actualizar un deployment
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

Además, kubernetes gestiona las actualizaciones de los deployment para que sean progresivo entre un cambio de versión y el servicio de que dan los pods no se interrumpa.

Se puede consultar la actualización del deployment en tiempo real con el comando:
```shell
kubectl rollout status deployment nginx-deployment
```

Este comando nos devolvería paso a paso la actualización del deployment:
```yaml
Waiting for deployment "nginx-deployment" rollout to finish: 1 out of 3 new replicas have been updated...
Waiting for deployment "nginx-deployment" rollout to finish: 1 out of 3 new replicas have been updated...
Waiting for deployment "nginx-deployment" rollout to finish: 1 out of 3 new replicas have been updated...
Waiting for deployment "nginx-deployment" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "nginx-deployment" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "nginx-deployment" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "nginx-deployment" rollout to finish: 1 old replicas are pending termination...
Waiting for deployment "nginx-deployment" rollout to finish: 1 old replicas are pending termination...
deployment "nginx-deployment" successfully rolled out
```

Si el despliegue ya ha terminado no se mostrará este proceso de actualización. Aun así, podremos consultarlo
en el registro de eventos usando el comando:
```shell
kubectl describe deployment nginx-deployment
```

```yaml
Events:
  Type    Reason             Age    From                   Message
  ----    ------             ----   ----                   -------
  Normal  ScalingReplicaSet  4m27s  deployment-controller  Scaled up replica set nginx-deployment-59c46f7dff to 3
  Normal  ScalingReplicaSet  4m8s   deployment-controller  Scaled up replica set nginx-deployment-5c4d5dcbf5 to 1
  Normal  ScalingReplicaSet  4m4s   deployment-controller  Scaled down replica set nginx-deployment-59c46f7dff to 2
  Normal  ScalingReplicaSet  4m4s   deployment-controller  Scaled up replica set nginx-deployment-5c4d5dcbf5 to 2
  Normal  ScalingReplicaSet  4m2s   deployment-controller  Scaled down replica set nginx-deployment-59c46f7dff to 1
  Normal  ScalingReplicaSet  4m2s   deployment-controller  Scaled up replica set nginx-deployment-5c4d5dcbf5 to 3
  Normal  ScalingReplicaSet  4m     deployment-controller  Scaled down replica set nginx-deployment-59c46f7dff to 0
  ```

## Escalar un deployment
Podemos escalar el deployment con el comando:
```shell
kubectl scale deployment nginx-deployment --replicas=5
```


## Historial de un deployment
Podemos consultar el historial de un deployment con el comando:
```shell
kubectl rollout history deployment nginx-deployment
```

### Modificar el límite del historial de un deployment
Por defecto, el historial de un deployment muestra las últimas 10 actualizaciones a menos que modifiquemos
el valor 'revisionHistoryLimit' en los spec del deployment. Por ejemplo:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
 revisionHistoryLimit: 3
  replicas: 3
  selector:
    matchLabels:
      app: nginx
...
```

### Hacer un rollback a una versión anterior
Es posible hacer un rollback a una versión anterior de un deployment, ya sea porque el último despliegue no funcione o la aplicación tenga errores inesperados.
Se podría hacer con el comando:
```shell
kubectl rollout undo deployment nginx-deployment
```

Este comando hace un rollback a la versión anterior del deployment. También podríamos especificarle
una versión específica:
```shell
kubectl rollout undo deployment nginx-deployment --to-revision=1
```


## Pausar y reanudar un deployment
Podemos pausar un deployment con el comando:
```shell
kubectl rollout pause deployment nginx-deployment
```

Para reanudar un deployment usaremos el comando:
```shell
kubectl rollout resume deployment nginx-deployment
```
