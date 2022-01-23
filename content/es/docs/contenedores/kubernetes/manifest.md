---
title: "Manifiestos y etiquetas"
linkTitle: "Manifiestos y etiquetas"
weight: 20
tags: [kubernetes, devops]
description:  
---

Por debajo de todas las acciones de kubernetes, lo que el motor entiende, son archivos manifiesto que definen el tipo de cada elemento.

Cuando se coge cierta experiencia se dejan de usar comandos para usar manifiestos y poder aplicar varios a la vez, haciendo el proceso menos tedioso.

## Obtener el manifiesto de un pod

```shell
kubectl get pods <nombre pod> -o <formato>
```

Existen varios formatos de salida pero los más comunes son yaml (el usado nativamente por kubernetes), json,  name, go-template (para customizaciones)... [https://kubernetes.io/docs/reference/kubectl/overview/#custom-columns](https://kubernetes.io/docs/reference/kubectl/overview/#custom-columns)

## Definir un pod en un manifiesto

Creamos la definición de un pod de prueba que escribirá “Hello world” cada hora:

```shell
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app: myapp
spec:
  containers:
  - name: myapp-container
    image: busybox
    command: ['sh', '-c', 'echo Hello World!; sleep 3600']
```

Luego podríamos crear el elemento con el comando:

```shell
kubectl apply -f pods.yaml
```

También podríamos eliminarlo usando el manifiesto con el comando:

```shell
kubectl deletec-f pods.yaml
```

## Multiples contenedores en un pod

Podemos definir varios contenedores en un pod. En este ejemplo podemos ver el balanceo que hace kubernetes a nivel de red entre los distintos contenedores de un pod.

<aside>
📢 Importante no usar los mismos puertos en los contenedores o fallará

</aside>

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: doscont
spec:
  containers:
  - name: cont1
    image: python:3.6-alpine
    command: ['sh', '-c', 'echo "cont1 > index.html" && python -m http.server 8082']
  - name: cont2
    image: python:3.6-alpine
    command: ['sh', '-c', 'echo "cont2 > index.html" && python -m http.server 8083']
```

## Labels

Podemos usar etiquetas para filtrar recursos en proyectos de cierto tamaño. Por ejemplo, separando frontend de backend:

``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: podtest2
  labels:
    app: front
    env: dev
spec:
  containers:
  - name: cont1
    image: nginx:alpine
---
apiVersion: v1
kind: Pod
metadata:
  name: podtest3
  labels:
    app: back
    env: dev
spec:
  containers:
  - name: cont1
    image: nginx:alpine
```

Ahora para filtrar desde el cli podríamos usar el parámetro “-l” para ello de la siguiente manera:

``` shell
kubectl get pod -l app=front
```

Podríamos filtrar por cualquier variable que hayamos definido, también “env”:

``` shell
kubectl get pod -l env=dev
```

Incluso multiples labels a la vez:

``` shell
kubectl get pod -l app=front,env=dev
```