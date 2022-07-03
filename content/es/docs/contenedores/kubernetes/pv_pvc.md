---
title: "Volúmenes y cuotas"
linkTitle: "Volúmenes y cuotas"
weight: 90
tags: [kubernetes]
description:  
---

En kubernetes existe la posibilidad de crear volumenes para persistir los datos de los pods. Estos se agrupan en dos objetos:
* PV: "Persistent Volume", es la declaración de un espacio del host que el cluster va a reservar para su uso.
* PVC: "Persistent Volume Claim" es la petición de reserva de espacio de un PV para un uso más especifico, por ejemplo, para un único proyecto.

Esta asiganación de espacio se realiza a dos niveles para reservar espacio para el cluster por un lado (PV) y luego se utilizan los objetos (PVC) para repartir ese espacio entre diferentes proyectos (namespaces) u objetos.

## Persistent Volume (PV)
Estos permiten múltiples configuraciones en función del tipo de cluster. En entornos de nube lo normal suele ser usar almacenamiento nativo del proveedor. En este ejemplo lo haremos utilizando un volumen NFS totalmente válido para infraestructura no gestionada por un proveedor cloud.

En esta entrada explico como trabajar con NFS (solo es necesaria la parte de servidor). [NFS en Linux](/docs/linux/nfs)

Una vez que tenemos configurado el volumen NFS podemos configurarlo como volumen persistente en kubernetes con una configuración como la siguiente:
``` yaml 
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pvvol
spec:
  capacity:
    storage: 40Gi
  accessModes:
    - ReadWriteMany
  persistentVolumeReclaimPolicy: Retain
  nfs:
    path: /ruta/carpeta/nfs
    server: <host>   #Puede ser un disco local o remoto
    readOnly: false
```

## Persistent Volume Claim
Los claim sirve para hacer peticiones de espacio al cluster para que pueda ser consumido por un pod.

Podemos consular los PVC existentes con el comando:
``` bash
kubectl get pvc
```

Para crear un objeto PVC podemos usar un fichero de configuración como el siguiente:
``` yaml 
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc-test
spec:
  accessModes:
  - ReadWriteMany
  resources:
     requests:
       storage: 200Mi
```

Aplicaríamos la configuración anterior con el comando `create`:
``` bash
kubectl create -f config_anterior.yaml
```

Ya tendríamos nuestro PVC. Este ahora podría ser consumido por un pod. Lo veremos en el siguiente punto.

### Usar un PVC Persistent Volume Claim en un pod
Podríamos hacer que cualquier pod tuviera acceso a este PVC o volumen con una configuración como la siguiente:
``` yaml
...
spec:
	containers:
	- image: nginx
	imagePullPolicy: Always
	name: nginx
	volumeMounts:
	- name: nfs-vol
		mountPath: /opt
	ports:
	- containerPort: 80
		protocol: TCP
	resources: {}
	volumes:  # Concretamente todo lo del grupo volumes 
	- name: nfs-vol
	  persistentVolumeClaim:
		claimName: pvc-test # Importante usar el mismo nombre que la declaración del PVC
...
```

Una vez terminada la configuración del pod, aplicamos el yaml con el comando create:
``` bash
kubectl create -f nfs-pod.yaml
```

Si hacemos un describe del pod podemos ver el montaje de este volumen:
```yaml
...
Volumes:
  nfs-vol:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  pvc-test
    ReadOnly:   false
...
```

## ResourceQuota para limitar el uso de un PVC
El objeto encargado de crear cuotas de recursos es `ResourceQuota`. Este nos permite limitar el tamaño y número de PVC 

TODO