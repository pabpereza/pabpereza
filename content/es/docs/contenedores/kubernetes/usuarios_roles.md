---
title: "Usuarios y roles"
linkTitle: "Usuarios y roles"
weight: 110 
tags: [kubernetes]
description:  
---

Por defecto, Kubernetes no tiene usuarios ni roles. Sin embargo, podemos definir usuarios y roles para controlar el acceso a los recursos de Kubernetes.

## Usuarios


## Roles
Podemos definir roles en kubebernetes creando objetos de tile `Role`. Por ejemplo:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: default
  name: pod-admin
rules:
- apiGroups: ["","extensions","apps"] # "" indica el core API group
  resources: ["pods"]
  verbs: ["get", "watch", "list", "delete", "create", "update", "patch"] # Podríamos usar * para indicar todos los verbos
```

Estos nos permiten granularizar el acceso a cada uno de los recursos y los permisos específicos que les queremos otorgar.

Crear un rol solo es el primer paso. Para usarlo, tenemos que asignarlo a un usuario o grupo de usuarios. Para ello, podemos usar un objeto de tipo `RoleBinding`. Por ejemplo:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: default
subjects:
- kind: User
  name: jdoe # Nombre del usuario
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role # Este debe ser Role o ClusterRole
  name: pod-reader # Este debe ser el nombre del rol que queremos asignar
  apiGroup: rbac.authorization.k8s.io
```
Con esto, creamos la relación entre el rol `pod-reader` y el usuario `jdoe`.

Podemos consultar los roles y los bindings usando los comandos `kubectl get roles` y `kubectl get rolebindings`. Estos comandos nos devolverán los roles y los bindings de todos los namespaces. Si queremos consultar los roles y los bindings de un namespace en concreto, podemos usar el flag `-n` o `--namespace`.

Por ejemplo:

```bash
kubectl get roles -n default
kubectl get rolebindings -n default
```

Estos nos mostrarían una salida similar a la siguiente:
```bash
Name:         pod-admin
Labels:       <none>
Annotations:  <none>
PolicyRule:
  Resources               Non-Resource URLs  Resource Names  Verbs
  ---------               -----------------  --------------  -----
  deployments             []                 []              [list get watch create update patch delete]
  pods                    []                 []              [list get watch create update patch delete]
  replicasets             []                 []              [list get watch create update patch delete]
  deployments.apps        []                 []              [list get watch create update patch delete]
  pods.apps               []                 []              [list get watch create update patch delete]
  replicasets.apps        []                 []              [list get watch create update patch delete]
  deployments.extensions  []                 []              [list get watch create update patch delete]
  pods.extensions         []                 []              [list get watch create update patch delete]
  replicasets.extensions  []                 []              [list get watch create update patch delete]
```
En el caso de los bindings, la salida sería similar a la siguiente:
```bash
Name:         read-pods
Labels:       <none>
Annotations:  <none>
Role:
  Kind:  Role
  Name:  dev-prod
Subjects:
  Kind  Name    Namespace
  ----  ----    ---------
  User  jdoe