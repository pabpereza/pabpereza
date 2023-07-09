---
title: "Secrets y configmaps"
linkTitle: "Secrets y configmaps"
weight: 85
tags: [kubernetes, secrets]
description:  
---

Kubernetes nos permite compartir información y configuraciones entre el cluster y los distintos recursos de kubernetes.

## Secrets
Los secretos en kubernetes son una forma de almacenar información sensible. Estos se almacenan en una base de datos de forma privada y pueden consumir por otros recursos de kubernetes.

Podemos obtener, crear o eliminar secretos en kubernetes con los siguientes comandos.

Listar secretos:
``` bash
kubectl get secrets
```

Crear secretos:
``` bash
# Create a new secret named my-secret with keys for each file in folder bar
kubectl create secret generic my-secret --from-file=path/to/bar

# Create a new secret named my-secret with specified keys instead of names on disk
kubectl create secret generic my-secret --from-file=ssh-privatekey=path/to/id_rsa --from-file=ssh-publickey=path/to/id_rsa.pub

# Create a new secret named my-secret with key1=supersecret and key2=topsecret
kubectl create secret generic my-secret --from-literal=key1=supersecret --from-literal=key2=topsecret

# Create a new secret named my-secret using a combination of a file and a literal
kubectl create secret generic my-secret --from-file=ssh-privatekey=path/to/id_rsa --from-literal=passphrase=topsecret

# Create a new secret named my-secret from an env file
kubectl create secret generic my-secret --from-env-file=path/to/bar.env
```

Borrar un secreto:
``` bash
kubectl delete secret <nombre>
```

### Usando secretos en un pod
Un secreto se puede usar en un pod. Podríamos pasarlo como una variable de entorno como en el siguiente ejemplo:
```bash
...
spec:
    containers:
    - image: mysql:5.5
      name: dbpod
      env:
      - name: MYSQL_ROOT_PASSWORD
        valueFrom:
            secretKeyRef:
              name: mysql
              key: password 
```


También podríamos montarlo como un volumen en su manifest. Este Requeriría el path donde estamos montando un fichero con el contenido del secreto.
Mounting Secrets as Volumes
You can also mount secrets as files using a volume definition in a pod manifest. The mount path will contain a file whose name will be the key of the secret created with the kubectl create secret step earlier.
``` bash
...
spec:
    containers:
    - image: busybox
      command:
        - sleep
        - "3600"
      volumeMounts:
      - mountPath: /mysqlsecret
        name: mysqlsecret
      name: busy
    volumes:
    - name: mysqlsecret
        secret:
            secretName: mmysql
```

## Crea un configmap
Dado el caracter efímero de un pod en kubernetes necesitamos algún método para compartir ficheros o información entre los contenedores dentro de un pod.

### Crear un configmap con comandos
Para crear un config map usamos el siguiente comando:
``` bash
 kubectl create configmap <nombre> \
 --from-literal=text=<texto> \
 --from-file=<fichero> \
 --from-file=<directorio>
 ```
Este nos permite importar información ya sea text en plano que introduzcamos en el comando (`--from-literal=text=`), el contenido de un fichero (`--from-file=`) o el contenido de un directorio completo (`--from-file=`).


Podemos consultar el contenido de un configmap con el siguiente comando:
``` bash
kubectl get configmap <nombre>
```

Aunque este solo nos mostrará el total de datos y su edad. Podemos obtener el contenido completo especificando la salida en formato yaml:
``` bash
kubectl get configmap <nombre> -o yaml
```

### Crear un configmap con yaml
Podríamos declararlo como un yaml para facilitar el almacenamiento de la configuración como código.
``` yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cars
  namespace: default
data:
  car.make: Opel 
  car.model: Astra 
  car.trim: OPC
```

Para guardar el configmap en el cluster podemos usar el comando:
```bash
kubectl create -f <configmap>.yaml
```


## Usar configmap en un pod

### Utilizar en el entorno de un pod
Podemos configurar el contenido de un configmap en un pod como variable de entorno así:
```bash
apiVersion: v1
kind: Pod
metadata:
  name: demo 
spec:
  containers:
  - name: nginx
    image: nginx
    env:
    - name: <nombre de la variable de entorno> 
      valueFrom:
        configMapKeyRef:
          name: <nombre_configmap> 
          key: <clave a usar> 
```
Esto nos permitiría importar una única clave del configmap.

También podríamos importar todo el contenido del configmap así:
```bash
apiVersion: v1
kind: Pod
metadata:
  name: demo 
spec:
  containers:
  - name: nginx
    image: nginx
    envFrom:
    - configMapRef:
      name: <nombre_configmap> 
```
Cambiaríamos el `configMapKeyRef` por `configMapRef` y `env` por `envFrom`. Por último, borraríamos `key` y `valueFrom` datos que ya no tendríamos que especificar.


### Montar como volumen en un pod
Podemos montar un configmap como un volumen en un pod. Esta sería una configuración de ejemplO:
```bash
apiVersion: v1
kind: Pod
metadata:
  name: shell-demo
spec:
  containers:
  - name: nginx
    image: nginx
    volumeMounts:
    - name: car-vol
      mountPath: /etc/cars
  volumes:
    - name: car-vol
      configMap:
        name: cars
```


## Borrar un configmap
Podemos elimitar este objeto de kubernetes con el comando:
``` bash
kubectl delete
```