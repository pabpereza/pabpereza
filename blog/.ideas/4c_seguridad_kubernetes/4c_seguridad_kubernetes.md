---
slug: las_4c_de_la_seguridad_en_kubernetes
title: Las 4C de la seguridad en Kubernetes, cloud, cluster, container y code
description: El modelo de las 4C explicado capa a capa, qué proteger en el cloud, en el clúster, en los contenedores y en el código, con ejemplos prácticos para Kubernetes.
tags: [kubernetes, seguridad, devsecops, contenedores]
keywords: [4c seguridad kubernetes, 4c cloud native security, seguridad kubernetes, kubernetes security, cloud cluster container code, hardening kubernetes, pod security admission, rbac kubernetes, network policies, seguridad contenedores, devsecops kubernetes, buenas practicas seguridad kubernetes]
authors: pabpereza
date: 2026-11-16
draft: true
---

Cuando hablamos de seguridad en Kubernetes es muy fácil perderse: RBAC, NetworkPolicies, escaneo de imágenes, secretos, el proveedor cloud… Cada herramienta resuelve un trocito y, si no tienes un mapa, acabas protegiendo muy bien la puerta de casa mientras la ventana de atrás sigue abierta.

Ese mapa es el modelo de las **4C**: **Cloud, Cluster, Container y Code**. En este artículo veremos qué es cada capa, qué fallos típicos hay en cada una y qué podemos hacer para cerrarlos, con ejemplos que puedes probar en tu propio clúster.

<!-- truncate -->

## ¿Qué son las 4C?

Son cuatro capas de seguridad, cada una dentro de la anterior, como unas muñecas rusas. El código vive dentro de un contenedor, el contenedor corre en un clúster y el clúster se apoya en una infraestructura, sea un proveedor cloud o tu propio CPD (centro de procesamiento de datos).

| Capa | Qué protege | Ejemplos |
|---|---|---|
| **Cloud** | La infraestructura donde corre todo | Red, IAM del proveedor, acceso a los nodos |
| **Cluster** | Kubernetes en sí | API server, RBAC, Pod Security, NetworkPolicies |
| **Container** | Las imágenes y cómo se ejecutan | Imágenes mínimas, usuario no root, capabilities |
| **Code** | Nuestra aplicación | Dependencias, secretos, validación de entradas |

La idea clave es que **cada capa depende de la de fuera**. Puedes tener un código impecable, pero si cualquiera puede hablar con tu API server, da igual. Y al revés, un clúster blindado no te salva de una inyección SQL en tu aplicación.

Así que no se trata de elegir una capa, sino de no dejarse ninguna. Vamos con ellas de fuera hacia dentro.

## Cloud, los cimientos

Es la capa sobre la que se apoya todo lo demás. Si alguien consigue acceso a la infraestructura (los nodos, la red, la cuenta del proveedor), el resto de capas pasan a ser decorativas.

Lo más importante aquí:

- **El plano de control no debería estar expuesto a internet.** El API server, y sobre todo etcd, que es donde Kubernetes guarda todo su estado, secretos incluidos. Si usas un servicio gestionado (EKS, AKS, GKE), revisa que el endpoint sea privado o esté limitado por IP.
- **Nodos en redes privadas** y con los puertos justos abiertos. Nada de SSH abierto al mundo "porque es un momento".
- **IAM con mínimo privilegio**: los permisos que tienen los nodos en el proveedor los heredan, en la práctica, todos los pods que corren en ellos.

Este último punto da para un ejemplo. En la mayoría de proveedores cloud, cualquier proceso de una máquina puede preguntar al **servicio de metadatos** (`169.254.169.254`) y, en muchos casos, sacar credenciales temporales del rol del nodo. Si un atacante entra en un pod, es de lo primero que va a probar.

Una forma de cortarlo desde Kubernetes es una NetworkPolicy que deje salir el tráfico de los pods a cualquier sitio menos a esa IP:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: bloquear-metadatos
  namespace: mi-app
spec:
  podSelector: {}
  policyTypes:
    - Egress
  egress:
    - to:
        - ipBlock:
            cidr: 0.0.0.0/0
            except:
              - 169.254.169.254/32
```

Ojo, que las NetworkPolicies solo funcionan si tu plugin de red (CNI) las soporta, como Calico o Cilium. Con uno que no las soporte, el YAML se aplica sin errores y no hace absolutamente nada.

## Cluster, el corazón de Kubernetes

Aquí entra todo lo que configura Kubernetes en sí. Es la capa más grande y donde más se nota la diferencia entre un clúster de pruebas y uno de producción.

### Quién entra y qué puede hacer

Todo en Kubernetes pasa por el API server, así que lo primero es controlar quién habla con él (**autenticación**) y qué puede hacer cada uno (**autorización**, normalmente con RBAC).

La regla de oro es el mínimo privilegio, y una forma rápida de ver si la estamos cumpliendo es preguntarle al propio clúster:

```bash
# ¿Qué puede hacer la service account por defecto de este namespace?
kubectl auth can-i --list --as=system:serviceaccount:mi-app:default
```

Si la respuesta incluye cosas como leer secretos o crear pods, tenemos un problema. Y otro detalle que se suele pasar: si tu aplicación no necesita hablar con la API de Kubernetes, no le montes el token. Basta con `automountServiceAccountToken: false` en el pod o en la service account.

### Qué pods se dejan entrar

**Pod Security Admission** es el mecanismo nativo para decidir qué tipo de pods se aceptan en cada namespace. Tiene tres perfiles (`privileged`, `baseline` y `restricted`) y se activa con una simple etiqueta:

```bash
kubectl label namespace mi-app \
  pod-security.kubernetes.io/enforce=restricted
```

A partir de ahí, cualquier pod que intente correr como root, en modo privilegiado o montando rutas del host, se queda en la puerta. Si te da miedo romper algo, empieza con `warn` o `audit` en lugar de `enforce` y mira qué saltaría.

### Quién habla con quién

Por defecto, **todos los pods de un clúster pueden hablar con todos**. Es cómodo, pero si un atacante compromete un pod, tiene vía libre para moverse por el resto. Las NetworkPolicies, como la que vimos en la capa cloud, sirven para segmentar ese tráfico y aplicar el famoso "denegar por defecto".

### Otros básicos de la capa

- **Cifrar los Secrets en etcd.** Por defecto solo van en base64, que no es cifrado, es una forma de escribir.
- **Activar los logs de auditoría** del API server, para saber quién hizo qué cuando algo vaya mal.
- **Mantener Kubernetes actualizado.** Cada versión menor tiene un soporte de aproximadamente un año, y los parches de seguridad no llegan a versiones antiguas.

## Container, lo que realmente se ejecuta

Un contenedor no es una máquina virtual: comparte el kernel con el nodo. Por eso, cuanto menos pueda hacer un contenedor, menos daño hará si alguien lo compromete.

### Imágenes que no traigan sorpresas

- **Imágenes mínimas** (distroless, Alpine, o una `scratch` si tu binario lo permite). Si la imagen no tiene shell ni gestor de paquetes, el atacante tampoco.
- **Escanear las imágenes** en el pipeline con herramientas como Trivy, para cazar CVEs (vulnerabilidades conocidas) antes de desplegar.
- **Firmarlas y verificarlas**, por ejemplo con cosign, para asegurarte de que lo que corre en el clúster es lo que construiste tú y no otra cosa.
- **Nada de `latest`.** Usa etiquetas concretas o, mejor aún, el digest de la imagen.

### Ejecutarlas con lo justo

Aunque la imagen sea perfecta, la forma de ejecutarla importa. Este `securityContext` es un buen punto de partida para casi cualquier contenedor, y es justo lo que exige el perfil `restricted` que vimos antes:

```yaml
securityContext:
  runAsNonRoot: true
  allowPrivilegeEscalation: false
  readOnlyRootFilesystem: true
  capabilities:
    drop: ["ALL"]
  seccompProfile:
    type: RuntimeDefault
```

En resumen: no corre como root, no puede escalar privilegios, no puede escribir en su propio sistema de ficheros, no tiene capabilities especiales del kernel y tiene un filtro de llamadas al sistema. Si tu aplicación necesita escribir en algún sitio, móntale un `emptyDir` en esa ruta concreta.

Y como ninguna prevención es perfecta, en esta capa también entra la **detección en tiempo de ejecución** con herramientas como Falco, que te avisa si alguien abre una shell dentro de un contenedor que no debería tenerla.

## Code, nuestra aplicación

La capa más interna y la que más controlamos, porque es nuestra. También es, muchas veces, la puerta de entrada: el atacante no empieza rompiendo Kubernetes, empieza explotando un fallo en tu aplicación y desde ahí intenta salir hacia fuera, capa a capa.

- **Dependencias vulnerables**: análisis de dependencias (SCA) con Trivy, Dependabot o Renovate. La mayor parte del código que despliegas no lo has escrito tú.
- **Secretos fuera del código**: nada de contraseñas en el repo ni en la imagen. Para detectarlos antes de que lleguen a Git, Gitleaks con un hook de pre-commit.
- **Análisis estático (SAST)** con Semgrep o SonarQube para pillar inyecciones y malas prácticas antes del despliegue.
- **Cifrar las comunicaciones** con TLS, también entre servicios internos si manejan datos sensibles.

Todo esto encaja de maravilla en un pipeline DevSecOps, de forma que cada cambio pase por los controles automáticamente y no dependa de que alguien se acuerde.

## Cómo usar el modelo en el día a día

Las 4C no son una herramienta ni un estándar que se "cumpla", son una forma de ordenar la cabeza. A mí me resultan muy útiles para dos cosas:

1. **Auditar un clúster**: recorres capa a capa y apuntas qué tienes y qué no. Para la capa cluster, `kube-bench` te compara la configuración con el CIS Benchmark y te ahorra mucho trabajo.
2. **Decidir dónde poner un control**: muchas veces el mismo riesgo se puede atajar en varias capas (el acceso a los metadatos del cloud, por ejemplo, se corta desde la red del proveedor o con una NetworkPolicy). Lo ideal es tenerlo en más de una, por si una falla.

## Conclusiones

Lo que más me gusta de este modelo es que te quita de la cabeza la idea de que la seguridad en Kubernetes es "configurar RBAC y listo". RBAC es una pieza de una capa, y un atacante solo necesita encontrar la capa que te has dejado.

Si estás empezando, no intentes hacerlo todo a la vez. Con Pod Security en `restricted`, un `securityContext` decente, NetworkPolicies de "denegar por defecto" y el escaneo de imágenes en el pipeline ya cierras la mayoría de puertas que se suelen encontrar abiertas.

## Recursos para profundizar

Todas las capas tienen su capítulo en los cursos de la web:

- [Seguridad en Kubernetes, hardening y Pod Security](/docs/cursos/kubernetes/seguridad_en_kubernetes_guia_completa_de_hardening_y_best_practices)
- [RBAC en Kubernetes](/docs/cursos/kubernetes/rbac_en_kubernetes_roles_clusterroles_y_rolebindings)
- [Network Policies en Kubernetes](/docs/cursos/kubernetes/network_policies_en_kubernetes_controlar_el_trafico_entre_pods)
- [CIS Benchmarks con kube-bench](/docs/cursos/kubernetes/cis_benchmarks_en_kubernetes_auditoria_de_seguridad_con_kube_bench)
- [AppArmor y seccomp](/docs/cursos/kubernetes/apparmor_y_seccomp_en_kubernetes_perfiles_de_seguridad_del_kernel)
- [Falco, detección de amenazas en runtime](/docs/cursos/kubernetes/falco_en_kubernetes_deteccion_de_amenazas_en_runtime)
- [Escanear imágenes con Trivy](/docs/cursos/devsecops/escanear_imagenes_de_contenedor_con_trivy_cves_severidades_y_gates)
- [SBOM y firma de imágenes con cosign](/docs/cursos/devsecops/sbom_y_firma_de_imagenes_inventario_con_syft_y_firma_con_cosign)
- [Curso de DevSecOps](/docs/cursos/devsecops) para la capa de código y el pipeline
