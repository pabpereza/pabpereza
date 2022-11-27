---
title: "Usuarios y roles"
linkTitle: "Usuarios y roles"
weight: 110 
tags: [kubernetes]
description:  
---

Por defecto, Kubernetes no tiene usuarios ni roles. Sin embargo, podemos definir usuarios y roles para controlar el acceso a los recursos de Kubernetes.

## Usuarios
Normalmente los usuarios se definen en un sistema de autenticación externo, como LDAP, Active Directory, etc. Kubernetes no tiene un sistema de autenticación propio, pero puede integrarse con sistemas de autenticación externos mediante [plugins de autenticación](https://kubernetes.io/docs/reference/access-authn-authz/authentication/#authentication-strategies).

Se pueden definir usuarios de forma manual mediante certificados x509.

### Crear usuario mediante Certificado x509
Estos pasos se tienen que realizar en un `control plane` de Kubernetes, el cuál, ejecuta el API y es el encargado de validar los certificados x509.

Primero tendremos que crear un par de claves privada y pública. Para ello, ejecutamos el siguiente comando:

```bash
openssl genrsa -out user.key 2048
```

A continuación, generamos el certificado x509:
```bash
openssl req -new -key user.key -out user.csr -subj "/CN=user/O=group"
```

Finalmente, firmamos el certificado x509 con la clave privada del `control plane`:
```bash
openssl x509 -req -in user.csr -CA /etc/kubernetes/pki/ca.crt -CAkey /etc/kubernetes/pki/ca.key -CAcreateserial -out user.crt -days 500
```

Una vez generado el certificado x509, podemos añadirlo al API de Kubernetes. Para ello, ejecutamos el siguiente comando:
```bash
kubectl config set-credentials user --client-certificate=user.crt --client-key=user.key --embed-certs=true
```

Por defecto, este usuario carecerá de permisos para realizar ninguna acción en el cluster. Para asignarle permisos, tendremos que crear asignarle un rol ( a nivel de namespace) o un clusterrole (a nivel de cluster).

Esta asignación de un rol, se realiza mediante rolesbindings ( a nivel de namespace) o clusterrolebindings (a nivel de rol).


## Service Accounts - Cuentas de servicio
Kubernetes crea una cuenta de servicio por defecto para cada namespace. Esta cuenta de servicio se utiliza para acceder a la API de Kubernetes. Podemos crear cuentas de servicio adicionales para acceder a la API de Kubernetes.

```bash
kubectl create serviceaccount <nombre>
```

Estas cuentas podríamos asocialas a un `role` mediante objetos `RoleBinding` o `ClusterRoleBinding` como se explica en los siguientes pasos.


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