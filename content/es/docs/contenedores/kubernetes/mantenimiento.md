---
title: "Mantenimiento Y actualización"
linkTitle: "Mantenimiento y actualización"
weight: 200
tags: [kubernetes]
description:  
---

El mantenimiento de kubernetes es una tarea que se realiza con frecuencia.

## Backup base de datos etcd
Durante los procesos de actualización, por muy estables que sean, siempre es
buena idea crear una copia de seguridad de la base de datos del cluster.

1. Lo primero que tenemos que hacer es buscar el directorio de los datos de etcd:
```bash
sudo grep data-dir /etc/kubernetes/manifests/etcd.yaml
```

Toda esta parte se realiza ejecutando comandos dentro del contenedor de etcd. Se llama `etcd-<nombre nodo>`
, aunque podrías listar los pods del sistema para encontrarlo con `kubectl -n kube-system get pods`.

2. Comprobamos el estado de la base de datos de etcd:
```bash
kubectl -n kube-system exec -it etcd-<nombre_pod> -- sh -c "ETCDCTL_API=3 \
ETCDCTL_CACERT=/etc/kubernetes/pki/etcd/ca.crt \
ETCDCTL_CERT=/etc/kubernetes/pki/etcd/server.crt \
ETCDCTL_KEY=/etc/kubernetes/pki/etcd/server.key \
etcdctl endpoint health"
```

3. Comprobamos el estado del cluster:
```bash 
kubectl -n kube-system exec -it etcd-kube-master -- sh -c "ETCDCTL_API=3 \
ETCDCTL_CACERT=/etc/kubernetes/pki/etcd/ca.crt \
ETCDCTL_CERT=/etc/kubernetes/pki/etcd/server.crt \
ETCDCTL_KEY=/etc/kubernetes/pki/etcd/server.key \
etcdctl --endpoints=https://127.0.0.1:2379 member list -w table"
```

4. Por último, hacemos la copia de seguridad con el comando `snapshot`:
```bash
kubectl -n kube-system exec -it etcd-kube-master -- sh -c "ETCDCTL_API=3 \
ETCDCTL_CACERT=/etc/kubernetes/pki/etcd/ca.crt \
ETCDCTL_CERT=/etc/kubernetes/pki/etcd/server.crt \
ETCDCTL_KEY=/etc/kubernetes/pki/etcd/server.key \
etcdctl --endpoints=https://127.0.0.1:2379 snapshot save /var/lib/etcd/snapshot.db"
```

Si hacemos un ls en directorio del paso 1 (normalmente /var/lib/etcd)
podremos ver el la base de datos que acabamos de extraer:
```bash
sudo ls -l /var/lib/etcd
```

## Actualizar el cluster
Lo primero es actualizar la herramienta kubeadm, la cuál, nos ayudará a
actualizar el cluster.

1. Actualizamos los metadatos de los paquetes del sistema con:
```bash
sudo apt update
```

2. Podemos consultar las versiones disponibles con la herramienta `madison` las versiones disponibles con la herramienta `madison`:
```bash
sudo apt-cache madison kubeadm
```

3. Si teníamos bloqueado el paquete kubeadm para que no se actualizara
automáticamente, lo desbloqueamos:
```bash
sudo apt-mark unhold kubeadm
```

4. Instalamos la versión deseada:
```bash
sudo apt install -y kubeadm=1.23.1-00
``` 

5. Volvemos a bloquear la actualización del paquete:
```bash
sudo apt-mark hold kubeadm
```

6. Podemos comprobar la versión que accabamos de instalar:
```bash
sudo kubeadm version
```

7. Para preparar el nodo para la actualización, tenemos que desalojar
a todos los pods como sea posible (si estuvieramos actualizando un nodo
trabajador el drain tendríamos que hacerlo desde el maestro). 
Se puede realizar así:
```bash
kubectl drain <nombre_nodo> --ignore-daemonsets
```

8. El comando `kubeadm` nos permite previsualizar los cambios que va a 
generar la actualización con el comando `plan`:
```
sudo kubeadm upgrade plan
```

9. Podemos realizar la actualización del nodo con el comando `apply`:
```bash
sudo kubeadm upgrade plan
```

10. Actualizamos el resto de paquetes a la misma version:
```bash
sudo apt-mark unhold kubelet kubectl
sudo apt-get install -y kubelet=1.23.1-00 kubectl=1.23.1-00
sudo apt-mark hold kubelet kubectl
```

11. Aunque hemos actualizado correctamente, si ejecutamos `kubectl get nodes`
nos seguirá mostrando la versión anterior. La actualización se hará
efectiva hasta que reiniciemos los servicios:
```bash
sudo systemctl daemon-reload
sudo systemctl restart kubelet
```

12. Por último, en el proceso de actualización de un nodo, este desactiva
el planificador de tareas. Podemos desbloquearlo así:
```bash
kubectl uncordon <nombre_nodo>
```

Se puede verificar el estado con el comando:
```bash
kubectl get nodes
```
