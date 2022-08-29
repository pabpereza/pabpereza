---
title: "Scheduling"
linkTitle: "Scheduling"
weight: 95 
tags: [kubernetes]
description:  
---

La función de scheduling es la que decide qué podemos ejecutar en un nodo. Por ejemplo, podemos decidir en que nodo se ejecuta un pod en base a varios criterios.

Se pueden utilizar diferentes opciones y etiquetas para esto:
* Labels
* Taints
* Affinity


## Scheduling policies
Permiten definir los criterios de scheduling para un clúster, este establece un conjunto de reglas que se aplican a los nodos.

## Labels
Los labels son una forma de identificar un nodo. Nos permiten agrupar nodos por un criterio, por ejemplo, podemos agrupar los nodos por país o por tipo de hardware.

Para ver la información de un nodo, podemos usar los siguientes comando:
``` shell
kubectl describe node # Para ver el nodo actual
kubectl describe node <nombre_nodo> # Para ver el nodo especificado
kubectl describe nodes # Para ver todos los nodos
```

Podríamos ver concretamente los labels de un nodo:
``` shell
kubectl describe nodes | grep -A5 -i label
```

Esto mejora la organización de los nodos y nos permite filtrar por un criterio determinado. Además, y donde más potencial obtiene esta característica, podemos configurar los pods con estos labels para que se ejecuten en un nodo determinado.

Podemos especificar el nodo en el que queremos que se ejecute un pod con el parámetro `nodeSelector`. Por ejemplo::
``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
	image: busybox
	command:
	- sleep
	- "3600"
  nodeSelector:
	kubernetes.io/hostname: my-node #Para especificar un nodo concreto
```

### Añadir un label a un nodo
Para añadir un label a un nodo, podemos usar el siguiente comando:
``` shell
kubectl label nodes <nombre_nodo> <nombre_label>=<valor_label>
```

### Eliminar un label de un nodo
Para eliminar un label de un nodo, podemos usar el siguiente comando:
``` shell
kubectl label nodes <nombre_nodo> <nombre_label>-
```

### Desplegar pods con nodos específicos con labels personalizados
Siguiendo el ejemplo anterior, podemos añadir un label a un nodo y desplegar un pod en ese nodo.
``` yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
	image: busybox
	command:
	- sleep
	- "3600"
  nodeSelector:
	<label-personalizado>: <valor_label> # Para especificar un nodo concreto 
```

## Taints
Los `taints` nos permiten especificar una restricción a un nodo para controlar donde los pods se están ejecutando y donde tienen permisos de hacerlo.

Existen tres tipos de taints:
* `NoSchedule`: No permite que se ejecuten pods en el nodo.
* `PreferNoSchedule`: Intenta no ejecutar pods en el nodo.
* `NoExecute`: No permite que se ejecuten pods en el nodo y evita que los pods que ya se estén ejecutando en el nodo se muevan a otro nodo.