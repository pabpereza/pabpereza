---
title: "Seguridad"
linkTitle: "Seguridad"
weight: 105
tags: [kubernetes]
description:  
---

La seguridad en Kubernetes es un tema muy amplio. Podemos agruparlo en varias categorías:
* Seguridad de accesos e identidades (Autenticación y Autorización)
* Contexto de seguridad (Security Context)
* Políticas de seguridad para Pods (Pod Security Policy)
* Políticas de red (Network Security Policies)

## Autenticación, autorización y control de admisión
Cada llamada que hacemos al API de kubernetes es autenticada y autorizada. Además, podemos configurar un control de admisión para rechazar llamadas que no cumplan ciertas condiciones.

Este diagrama ilustra este proceso:
![Diagrama de autenticación, autorización y control de admisión](https://kubernetes.io/images/docs/admin/access-control-overview.svg)

### Autenticación
La autenticación es el proceso de identificación de un usuario. Kubernetes soporta varios métodos de autenticación. Por ejemplo, podemos usar certificados, tokens, contraseñas, etc.

### Autorización
La autorización es el proceso de determinar si un usuario tiene permisos para realizar una acción. Kubernetes soporta varios métodos de autorización. Por ejemplo, podemos usar roles y permisos, políticas de RBAC, etc.

Para esta sección, consulta la documentación sobre [usuarios, cuentas y permisos](/docs/contenedores/kubernetes/usuarios_roles)

#### RBAC (Role Based Access Control)
RBAC es un método de autorización basado en roles. En este método, definimos roles y permisos. Luego, asignamos los roles a los usuarios. Por ejemplo, podemos definir un rol `admin` con permisos de lectura y escritura. Luego, podemos asignar este rol a un usuario `admin`.

Para conseguir esta granularidad, se definen operaciones CRUD (Create, Read, Update, Delete) sobre recursos. Por ejemplo, podemos definir permisos para crear, leer, actualizar y borrar pods. Luego, podemos asignar estos permisos a un rol. Por ejemplo, podemos definir un rol `admin` con permisos para crear, leer, actualizar y borrar pods. Luego, podemos asignar este rol a un usuario `admin`.

Esto nos permite definir roles con permisos muy específicos. Por ejemplo, podemos definir un rol `pod-reader` con permisos para leer pods. Luego, podemos asignar este rol a un usuario `reader`.

### Controlador de admisión (Admission Controller)
El controlador de admisión es un componente que se ejecuta antes de que se realice una acción en el API de kubernetes. Podemos configurar varios controladores de admisión. 

Podemos ver las configuraciones de los controladores de admisión en el fichero `/etc/kubernetes/manifests/kube-apiserver.yaml` en el nodo maestro. Por ejemplo:
```bash
sudo grep admission /etc/kubernetes/manifests/kube-apiserver.yaml
```

## Security Context
Los pods y contenedores en kubernetes pueden ejecutarse con un contexto de seguridad. Este contexto de seguridad define los permisos que tiene el contenedor, sus capacidades y limitaciones, etc.

Por ejemplo, podemos configurar un contexto de seguridad para que un contenedor no pueda ejecutar comandos como `sudo` o `su`. También podemos configurar un contexto de seguridad para que un contenedor no pueda ejecutar comandos como `mount` o `umount`.

Estos contextos se definen dentro de los `spec` de los pods. Por ejemplo, podemos definir un contexto de seguridad para un pod de la siguiente forma:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  securityContext:
	runAsUser: 1000
	runAsGroup: 3000
	fsGroup: 2000
  containers:
  - name: nginx
	image: nginx
	ports:
	- containerPort: 80
```

Si una de las propiedades del contexto de seguridad se incumple, el contenedor no se ejecutará. Se quedará en un estado de error y en su mensaje de estado se mostrará el motivo del error.


## Pod Security Policy
DEPRECADO: Pod Security Policy está deprecado en Kubernetes 1.21 y se eliminará en Kubernetes 1.25. En su lugar, se recomienda usar [Admission Controller de Pod Security](https://kubernetes.io/docs/concepts/security/pod-security-admission/).

Las Pod Security Policies (PSP) sos permiten definir políticas de seguridad para todos los pods, a diferencia de la aproximación anterior, la cuál requeria definir el contexto de seguridad en cada pod.

Podemos definir una PSP para que los pods no puedan ejecutar comandos como `sudo` o `su`, no puedan ejecutar ciertos comandos, sean incapaz de montar volúmenes, etc.

## Network Security Policies
Por defecto, los pods en kubernetes pueden comunicarse con cualquier otro pod y todo tipo de tráfico es permitido. Podemos configurar políticas de red para restringir este tráfico.

Cuando aplicamos una política, por defecto, se restringe todo el tráfico de entrada y salida. Luego debemos configurar manualmente las excepciones.

Por ejemplo, podemos configurar una política de red para que un pod solo pueda comunicarse con otros pods que tengan un label `app=nginx`. También podemos configurar una política de red para que un pod solo pueda comunicarse con otros pods que tengan un label `app=nginx` y que estén en el mismo namespace.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ingress-egress-policy
  namespace: default
spec:
  podSelector:
    matchLabels:
      role: db
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - ipBlock:
        cidr: 172.17.0.0/16
            except:
              - 172.17.1.0/24
        - namespaceSelector:
            matchLabels:
              project: myproject
        - podSelector:
            matchLabels:
              role: frontend
      ports:
        - protocol: TCP
          port: 6379
  egress:
    - to:
        - ipBlock:
            cidr: 10.0.0.0/24
      ports:
        - protocol: TCP
          port: 5978
```
En este ejemplo, restringimos el tráfico entrante a un rango de IPs (con una excepción), en un namespace concreto y en los pods con el label 'frontend'. También limitamos este tráfico a un puerto concreto.

También restringimos el tráfico saliente a un rango de IPs y a un puerto concreto.

Podemos usar `{}` para seleccionar todos los pods y no permitir ningún tráfico. Por ejemplo, para todo el tráfico de entrada:
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ingress-egress-policy
  namespace: default
spec:
  podSelector: {}
  policyTypes:
	- Ingress
```
Si no especificamos el tráfico de salida `egress`, no se verá afectado por esta política.