---
title: "Services"
linkTitle: "Services"
weight: 50 
tags: [kubernetes, devops]
description: "" 
    
---

Los servicios en kubernetes son una forma de agrupar pods mediande sus etiquetas o labels y disponer a los usuarios
el acceso a los recursos que están asociados a ellos.

Los pods en kubernetes son efímeros y cambiaran frecuentemente, con ellos, tambien sus IPs por lo que los servicios entregan una IP
única (también tiene DNS), además de balancear las peticiones entre los pods que están asociados a un servicio.


Partiendo del [deployments](deployments.md) anterior podemos crear un servicio de la misma forma:
```yaml

apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  labels:
    app: nginx
spec:
  selector:
	app: nginx
  ports:
  - port: 8080
	targetPort: 80
```

Es importante destacar que el selector del servicio tiene que igual al label del deployment para que este funcione.

Haciendo foco en la declaración del servicio tambien hay que destacar que, la instrucción `port` indica el puerto al que va a escuchar el servicio, y `targetPort` indica el puerto del pod al que el servicio va a enviar las peticiones.


Podemos consultar el estado del servicio con el comando:
```shell
kubectl get service nginx-service
kubectl get svc nginx-service # Podemos abreviar el comando anterior
```

Podemos describir el servicio con el comando:
```shell
kubectl describe svc nginx-service
```

Esto nos devolvería una salida similar a la siguiente:
```yaml
Name:              nginx-service
Namespace:         default
Labels:            app=front
Annotations:       <none>
Selector:          app=front
Type:              ClusterIP
IP Family Policy:  SingleStack
IP Families:       IPv4
IP:                10.98.234.17
IPs:               10.98.234.17
Port:              <unset>  8080/TCP
TargetPort:        80/TCP
Endpoints:         172.17.0.3:80,172.17.0.4:80,172.17.0.5:80
Session Affinity:  None
Events:            <none>
```

## Endpoints
Uno de los datos más interesantes de la salida anterior en el campo `Endpoints`. Este recoge las IPs de los pods con los que esta conectando el servicio para automatizar que el usuario pueda acceder a ellos.

Además, si algún pod nuevo aparece o desaparece el servicio sabría y actualizaría los endpoints.

También podríamos listar todos los endpoints del namespace con el commando:
```shell
kubectl get endpoints
```

Podríamos abreviar el comando anterior (con `ep`) y a la vez consultar específicamente el endpoint de un servicio:
```shell
kubectl get ep nginx-service
```


## Tipos de servicios

La jerarquía de los servicios es la siguiente:

![Jerarquía de servicios](/docs/contenedores/kubernetes/services.drawio.svg)


###	ClusterIP
Es el servicio por defecto en kubernetes, en caso de que no especifiquemos ningún otro. Su función es crear una conexión a los pods sin exponerlos a la red externa.

Si listamos los servicios podemos ver que, el servicio nginx-service que lanzamos antes, tiene la IP del cluster asignada pero la IP externa se queda con el valor `none`.
```shell
kubectl get service                                                       
```
```yaml
NAME            TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)     AGE
kubernetes      ClusterIP   10.96.0.1      <none>        443/TCP     19d
nginx-service   ClusterIP   10.98.234.17   <none>        38080/TCP   10h
```

### NodePort
Es un servicio que conecta un puerto de nodo (red externa) a un puerto de uno o más pods.

Si no le especificamos un puerto, el servicio utiliza uno en el rango del 30000 al 32767.

Para crear un servicio de tipo NodePort solo tenemos que indicarlo en el `type` dentro del `spec` del servicio:
```yaml
apiVersion: 1                                                                      
kind: Service
metadata:
  name: nginx-service
  labels:
    app: front
spec:
  type: NodePort # Definición del tipo de servicio
  selector:
    app: front
  ports:
  - port: 8080
    targetPort: 80
```

Este tipo también crea una IP del cluster, pero en este caso también abre un puerto a la red externa.

### LoadBalancer
Sirve para exponer servicios a través de la red externa. Podría ser utilizado para exponer servicios web, servicios de bases de datos, etc.

Se podría definir un servicio de tipo LoadBalancer con el siguiente comando para un deployment específico:
```shell
kubectl expose deployment nginx-deployment --type=LoadBalancer
```

## Accediendo a una aplicación con un servicio
Podríamos crear un servicio vía `kubectl`:
``` bash
kubectl expose deployment/nginx --port=80 --type=NodePort
```

Podemos consultar los servicios con los siguientes comandos:
```bash
kubectl get svc # Listar todos los servicios

kubectl get svc nginx -o yaml # Listar un servicio concreto
```


## Borrar endpoints
Podemos borrar un endpoint con el comando:
```shell
kubectl delete endpoint nginx
kubectl delete ep nginx # Podemos abreviar el comando anterior
```
