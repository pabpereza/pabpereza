---
title: "Logging"
linkTitle: "Logging"
weight: 100 
tags: [kubernetes]
description:  
---

Los logs son una de las herramientas más importantes para entender el comportamiento de una aplicación. Esta información nos permite entender qué está pasando en el sistema y nos ayuda a depurar errores. En este apartado vamos a ver cómo consumir los logs de los contenedores que se ejecutan en Kubernetes y como integrarlos con otras herramientas de monitorización.

## Localización de los ficheros logs
Para los cluster  de kubernetes basados en `systemd` podemos ver los logs de cada nodo usando el comando `journalctl`:
```bash
journalctl -u kubelet |less
```

La mayoría de procesos de docker, actualmente, se ejecutan en contenedores. Para encontrar los ficheros de logs del `kube-apiserver` podemos usar el siguiente comando:
```bash
sudo find / -name "*apiserver*log"
```

Luego podemos usar el comando `less` para ver el contenido del fichero:
```bash
sudo less /var/log/containers/kube-apiserver-k8s-master-1_kube-system_kube-apiserver-1.log # Usa las rutas obtenidas en el comando anterior
```

Otras rutas donde podemos encontrar logs en función del tipo de nodo son:
```bash
/var/log/kube-apiserver.log # Api server
/var/log/kube-scheduler.log # Scheduler
/var/log/kube-controller-manager.log # Controller manager
/var/log/containers # Logs de los contenedores
/var/log/pods/ # Logs de los pods
/var/log/kubelet.log # Logs del kubelet
/var/log/kube-proxy.log # Logs del kube-proxy
```

Documentación oficial de kubernetes:
* [Depurar servicios](https://kubernetes.io/docs/tasks/debug/debug-application/debug-service/)
* [Entender errores de un pod](https://kubernetes.io/docs/tasks/debug/debug-application/determine-reason-pod-failure/)


## Logs de kubernetes - kubectl logs
Podemos acceder a los logs de un pod usando el comando `kubectl logs`:
```bash
kubectl -n <namespace> logs <pod> #El comando namespace es opcional, si no se especifica se usa el namespace por defecto
```


## Añadiendo herramientas de monitorización y métricas

### Metric Server - Métricas (kubectl top)
En este apartado vamos a ver cómo añadir herramientas de monitorización y métricas a nuestro cluster de kubernetes. Lo primero será instalar "metrics-server" en nuestro cluster. Para ello vamos a usar el siguiente comando:
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Para entornos de prueba o desarrollo, podemos permitir TLS inseguro. Su certificado es x509 auto firmado y no será válido. Podemos utilizar la flag `--kubelet-insecure-tls` para permitir TLS inseguro. NO RECOMENDADO PARA ENTORNOS DE PRODUCCIÓN.
```bash
kubectl -n kube-system edit deployment metrics-server
```

Añadimos la siguiente línea en la sección `containers`:
```yaml
.....
spec:
  containers:
  - args:
	- --cert-dir=/tmp
	- --secure-port=4443
	- --kubelet-insecure-tls # Añadimos esta línea
	- --kubelet-preferred-address-types=InternalIP,ExternalIP,Hostname
	- --kubelet-use-node-status-port
	image: k8s.gcr.io/metrics-server/metrics-server:v0.3.6
```

A partir de aquí, ya podrímos consultar las métricas de nuestros pods usando el comando `kubectl top`:
```bash
kubectl top pod --all-namespaces # Muestra las métricas de todos los pods
kubectl top pod -n <namespace> # Muestra las métricas de los pods de un namespace
kubectl top node # Muestra las métricas de los nodos
```

### Dashboard
Para instalar el dashboard de kubernetes, podemos usar el siguiente comando (Si no tienes instalado helm te recomiendo que [visites su web para instalarlo](https://helm.sh/docs/intro/install/)):
```bash
helm repo add k8s-dashboard https://kubernetes.github.io/dashboard # Añadimos el repositorio a helm
helm install <nombre que le quieras dar al despliegue> k8s-dashboard/kubernetes-dashboard 
```

La salida de helm nos dará las instrucción para acceder al dashboard. Ejecuta los comandos indicados, deberían ser similares a los siguientes:
```yaml
NAME: kube-dashboard
LAST DEPLOYED: Sat Oct 22 16:04:19 2022
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
*********************************************************************************
*** PLEASE BE PATIENT: kubernetes-dashboard may take a few minutes to install ***
*********************************************************************************

Get the Kubernetes Dashboard URL by running:
  export POD_NAME=$(kubectl get pods -n default -l "app.kubernetes.io/name=kubernetes-dashboard,app.kubernetes.io/instance=kube-dashboard" -o jsonpath="{.items[0].metadata.name}")
  echo https://127.0.0.1:8443/
  kubectl -n default port-forward $POD_NAME 8443:8443
```

Si quisiéramos acceder al dashboard desde fuera del cluster podríamos usar el parámetro `--address`, añadido al comando anterior, para indicar la dirección IP desde la que queremos acceder:
```bash
kubectl -n default port-forward --address 0.0.0.0 $POD_NAME 8443:8443 # Así cualuier usuario de la red podrá acceder al dashboard, ojo si no es lo que queremos
```

Durante la instalación, se crea un usuario de servicio para acceder al dashboard. Este no tiene privilegios por lo que no podremos realizar ciertas acciones desde el dashboard. Podemos asignarle privilegios de administrador usando el siguiente comando:
```bash
kubectl create clusterrolebinding dashaccess --clusterrole=cluster-admin --serviceaccount=default:<nombre del usuario>
```

¡OJO! El nombre de usuario depende del nombre que le hayamos dado al despliegue al dashboard. Ante la duda podemos consultar el nombre de nuestro usuario de servicio usando el siguiente comando:
```bash
kubectl get serviceaccounts 
```
Nuestro usuario debería ser algo similar a `<nombre del despliegue>-kubernetes-dashboard`.

Si accedemos al dashboard, podemos autenticarnos mediante el token de este usuario de servicio ( también podríamos usar el kubeconfig del administrador del cluster). Para obtener el token, ejecutamos el siguiente comando:
```bash
kubectl describe secrets dashboard-kubernetes-dashboard-token-<TAB> # TAB para autocompletar el nombre completo del secret
```