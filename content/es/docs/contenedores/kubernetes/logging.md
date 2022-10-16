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
