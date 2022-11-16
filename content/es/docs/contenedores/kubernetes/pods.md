---
title: "Pods"
linkTitle: "Pods"
weight: 10 
tags: [kubernetes, devops]
description: ""
---

Los pods se son una unidad de ejecución de contenedores, concretamente la unidad más 
pequeña con la que se puede trabajar en kubernetes. Estos son los comandos básicos
para usar un contenedor en Kubernetes.


## Crear un pod
Especificaremos el nombre que le queremos asignar a ese pod y la imagen que utilizaremos.
``` shell
kubectl run <nom_pod> --image=<imagen>
```

## Ver un pod
``` shell
kubectl get pods # Listar todos los pods en el cluster
kubectl get pods -o wide  # Listar los pods en una tabla más amplia
kubectl get pods <nom_pod> # Listar el pod especificado
kubectl describe pods <nom_pod> # Describe el pod nginx
kubectl -n anchore get pods <nom_pod> -o yaml  # Nos devuelve todo el manifiesto del pod
```

Al hacer un describe del pod veríamos la siguiente salida:
``` yaml
Name:         nginx
Namespace:    default
Priority:     0
Node:         minikube/192.168.49.2
Start Time:   Mon, 20 Dec 2021 20:12:08 +0100
Labels:       run=nginx
Annotations:  <none>
Status:       Running
IP:           172.17.0.3
IPs:
  IP:  172.17.0.3
Containers:
  nginx:
    Container ID:   docker://f19cee240b99b737dc71db300dcfe2ad51a1596b35b2861aea274820aa841530
    Image:          nginx
    Image ID:       docker-pullable://nginx@sha256:9522864dd661dcadfd9958f9e0de192a1fdda2c162a35668ab6ac42b465f0603
    Port:           <none>
    Host Port:      <none>
    State:          Running
      Started:      Mon, 20 Dec 2021 20:12:14 +0100
    Ready:          True
    Restart Count:  0
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-58m5c (ro)
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-58m5c:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  43s   default-scheduler  Successfully assigned default/nginx to minikube
  Normal  Pulling    42s   kubelet            Pulling image "nginx"
  Normal  Pulled     37s   kubelet            Successfully pulled image "nginx" in 4.842081346s
  Normal  Created    37s   kubelet            Created container nginx
  Normal  Started    37s   kubelet            Started container nginx
```



## Destruir un pod
``` shell
kubectl delete pod nginx
```

## Problemas de los pods
No saben restaurarse ni replicarse a si mismos. Necesitan de alguien que gestione estos procesos. Para esto se utilizan otro tipo de elementos:
[Replicasets](replicasets.md)
