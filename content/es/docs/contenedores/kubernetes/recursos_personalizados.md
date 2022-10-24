---
title: "Recursos personalizados"
linkTitle: "Recursos personalizados"
weight: 100 
tags: [kubernetes]
description:  
---

La definición de recursos personalizados o (CRD, Custom Resource Definition) es una de las características más potentes de Kubernetes. Nos permite extender la funcionalidad de Kubernetes añadiendo nuevos tipos de recursos. Estos recursos pueden ser usados por los desarrolladores para definir sus propias abstracciones de alto nivel.

## Consultar recursos personalizados
Podemos consultar los recursos personalizados usando el comando `kubectl get`:
```bash
kubectl get crd --all-namespaces
```

Es muy normal que aparecen recursos personalizados que no hemos definido nosotros. Estos recursos son definidos por otros componentes de Kubernetes. Por ejemplo, el componente `metrics-server` define el recurso `pods.metrics.k8s.io`. O por ejemplo, los componentes de `calico` definen el recurso `networkpolicies.crd.projectcalico.org`.

Podemos obtener detalles de un recurso personalizado usando el comando `kubectl describe`:
```bash
kubectl describe crd <nombre del recurso>
```

## Definir un recurso personalizado
Para definir un recurso personalizado, debemos crear un fichero YAML con la definición del recurso. Por ejemplo, para definir un recurso personalizado de ejemplo:
```yaml
apiVersion: apiextensions.k8s.io/v1beta1
kind: CustomResourceDefinition
metadata:
  name: crontab.example.com
spec:
  group: example.com
  versions:
    - name: v1
	  served: true
	  storage: true
	  schema:
	    openAPIV3Schema:
		  type: object
		  properties:
		    spec:
			  type: object
			  properties:
			    cronSpec:
				  type: string
				image:
				  type: string
				replicas:
				  type: integer
  scope: Namespaced
  names:
	plural: crontabs
	singular: crontab
	kind: CronTab
	shortNames:
	  - ct
```

Podemos crear el recurso personalizado usando el comando `kubectl create`:
```bash
kubectl create -f crontab.yaml
```

## Crear un objeto de un recurso personalizado
Para crear un objeto de un recurso personalizado, debemos crear un fichero YAML con la definición del objeto. Por ejemplo, para crear un objeto de ejemplo:
```yaml
apiVersion: "example.com/v1"
kind: CronTab
metadata:
  name: my-new-cron-object
spec:
  cronSpec: "* * * * */5"
  image: my-awesome-cron-image
```

A partir de aquí, podemos usar el recurso personalizado como si fuera un recurso nativo de Kubernetes. Por ejemplo, podemos consultar los objetos de un recurso personalizado usando el comando `kubectl get`:
```bash
kubectl get crontab --all-namespaces # Listar todos los objetos crontab de todos los namespaces
kubectl get crontab -n <namespace> # Listar todos los objetos crontab de un namespace
kubectl get crontab <nombre del objeto> -n <namespace> # Obtener detalles de un objeto crontab
kubectl describe crontab <nombre del objeto> -n <namespace> # Obtener detalles de un objeto crontab
```