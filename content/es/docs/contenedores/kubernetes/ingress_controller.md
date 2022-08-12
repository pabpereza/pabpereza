---
title: "Ingress Controller"
linkTitle: "Ingress Controller"
weight: 55 
tags: [kubernetes]
description:  
---

El `ingress controller` es un servicio que se ejecuta en un pod y que permite observar los objetos `endpoint`. Cuando un nuevo objeto es creado, `ingress controller` lo detecta y aplica las reglas que tenga definidas para enrutar el tráfico (normalmente HTTP).

En resumen, permite enrutar tráfico desde fuera de un cluster a los servicios del mismo.

Cualquier tecnología que sirviera como proxy inverso se puede utilizar como `ingress controller`. Uno de los más comunes es nginx.

[Ejemplos de configuración de nginx para diferentes plataformas ( docker desktop, minikube, AWS, GCP, Azure...)](https://github.com/kubernetes/ingress-nginx/blob/main/docs/deploy/index.md)

## Instalación de un ingress controller
Podemos instalar el ingress controller basado en nginx con helm. En esta página tengo la [documentación sobre Helm](/docs/kubernetes/helm).

Primero añadimos el repositorio de `ingress-nginx` y actualizamos:
``` bash 
 helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
 helm repo update
 ```

Descargamos el chart:
``` bash
helm fetch ingress-nginx/ingress-nginx --untar
```

Modificamos el fichero `values.yaml` y en la línea que pone `kind: Deployment` actualizamos el valor por `DaemonSet` quedando así:
``` yaml
## DaemonSet or Deployment
kind: DaemonSet
```

Instalamos el chart que acabamos de modificar:
``` shell
helm install myingress .
```

Ahora ya podemos añadir objetos de tipo `ingress` en kubernetes.

## Manifiesto de kubernetes
Podemos declarar el objeto del manifiesto de kubernetes como en el siguiente ejemplo:
``` yaml 
apiVersion: networking.k8s.io/v1beta1 
kind: Ingress 
metadata:
rules:
  - host: <hostname> 
    http:
      paths:
      - backend:
          service:
            name: <nombre> 
            port:
              number: <puerto> 
        path: /
        pathType: ImplementationSpecific
```

## Gestión de objetos ingress
Los principales comando de gestión son:
``` bash
kubectl get ingress
kubectl delete ingress <nombre>
kubectl edit ingress <nombre>
```


