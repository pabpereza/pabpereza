---
slug: ingress-nginx-se-retira-migracion-gateway-api
title: Ingress NGINX se retira en marzo 2026 — guía de migración a Gateway API
tags: [kubernetes, ingress, gateway-api, nginx, devops, seguridad]
authors: pabpereza
date: 2026-02-27
description: Ingress NGINX pasa a read-only en marzo 2026. Si tu cluster Kubernetes lo usa, necesitas migrar a Gateway API. En esta guía encontrarás el proceso completo paso a paso.
keywords: [ingress nginx deprecated, gateway api kubernetes, migrar ingress nginx, kubernetes ingress alternativa, nginx gateway fabric, gateway api v1.5]
---

El controlador de ingress más usado de Kubernetes llega a su fin. **Ingress NGINX se retira en marzo de 2026** — sin parches de seguridad, sin bugfixes, sin actualizaciones. Y afecta aproximadamente al 50% de todos los clusters en producción.

Si tu cluster depende de Ingress NGINX, este artículo es para ti.

<!-- truncate -->

## Por qué desaparece Ingress NGINX

Ingress NGINX ha sido durante años el controlador de ingress de facto en Kubernetes. Fácil de instalar, bien documentado, compatible con la práctica totalidad de los entornos. El problema es estructural: el proyecto lo sostenían una o dos personas en su tiempo libre.

La flexibilidad extrema del proyecto, que permitía inyectar configuración arbitraria de NGINX mediante anotaciones como `nginx.ingress.kubernetes.io/configuration-snippet`, se convirtió en deuda técnica insalvable. Hubo CVEs documentados donde esos snippets se utilizaron para exfiltrar secretos entre namespaces. Parchear el modelo sin romper compatibilidad resulta inviable.

**A partir de marzo 2026, el repositorio pasa a read-only:**
- Sin parches de seguridad
- Sin corrección de bugs
- Sin nuevas funcionalidades

No es una deprecación gradual. Es el fin.

## La alternativa oficial: Gateway API

Gateway API es la respuesta de la comunidad de Kubernetes a las limitaciones del recurso `Ingress`. Actualmente en **versión GA (v1.5.0)**, es el estándar adoptado por todos los proyectos relevantes del ecosistema: Cilium, Istio, Traefik, HAProxy y NGINX Gateway Fabric.

### La diferencia conceptual clave

Con `Ingress`, toda la configuración reside en un único objeto. Con Gateway API, la responsabilidad se separa en tres capas:

| Objeto          | Quién lo gestiona         | Qué define                                      |
|-----------------|---------------------------|-------------------------------------------------|
| `GatewayClass`  | Equipo de infraestructura | Tipo de gateway (qué controlador usar)          |
| `Gateway`       | Equipo de plataforma      | Listeners: puertos, protocolos, TLS             |
| `HTTPRoute`     | Equipo de desarrollo      | Rutas, hostnames, backends                      |

Esta separación de roles resuelve uno de los problemas históricos de Ingress: que los desarrolladores de aplicaciones y los administradores de infraestructura compartían el mismo objeto con implicaciones de seguridad y operativas muy diferentes.

## ¿Está tu cluster afectado?

Antes de planificar la migración, conviene hacer un inventario. Estos comandos te darán una imagen clara:

```bash
# Verificar si Ingress NGINX está corriendo
kubectl get pods -A | grep ingress

# Ver qué IngressClasses tienes definidas
kubectl get ingressclass

# Listar todos los Ingress del cluster
kubectl get ingress -A

# Contar el número total de recursos Ingress
kubectl get ingress -A -o json | jq '.items | length'
```

Si el último comando devuelve un número bajo (menos de 20), la migración puede hacerse en pocas horas. Si son cientos, conviene planificar una estrategia de migración progresiva por namespace o por servicio.

## Migración paso a paso sin downtime

La estrategia recomendada es ejecutar **ambos sistemas en paralelo** durante la transición. Ingress NGINX sigue funcionando mientras vas migrando recurso a recurso. Solo lo retiras cuando todo está validado.

### Paso 1 — Instalar los CRDs de Gateway API

```bash
kubectl apply --server-side -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.5.0/standard-install.yaml
```

Verifica que los CRDs están disponibles:

```bash
kubectl get crd | grep gateway
```

Deberías ver: `gatewayclasses.gateway.networking.k8s.io`, `gateways.gateway.networking.k8s.io`, `httproutes.gateway.networking.k8s.io`, entre otros.

### Paso 2 — Instalar un controlador de Gateway API

Existen múltiples implementaciones. Para una migración desde Ingress NGINX, **NGINX Gateway Fabric** (el sucesor oficial de F5/NGINX) es la opción más directa por compatibilidad conceptual:

```bash
helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric \
  --create-namespace \
  -n nginx-gateway
```

Este paso despliega el nuevo controlador sin modificar el Ingress NGINX existente.

### Paso 3 — Crear GatewayClass y Gateway

**GatewayClass** (la define el equipo de infraestructura):

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata:
  name: nginx
spec:
  controllerName: gateway.nginx.org/nginx-gateway-controller
```

**Gateway** (la define el equipo de plataforma):

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: prod-gateway
  namespace: nginx-gateway
spec:
  gatewayClassName: nginx
  listeners:
  - name: http
    protocol: HTTP
    port: 80
  - name: https
    protocol: HTTPS
    port: 443
    tls:
      certificateRefs:
      - kind: Secret
        name: tls-secret
        namespace: nginx-gateway
```

### Paso 4 — Migrar recursos Ingress a HTTPRoute

Este es el núcleo de la migración. Toma cada `Ingress` existente y crea su `HTTPRoute` equivalente.

**Ingress original:**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mi-app
  namespace: produccion
spec:
  ingressClassName: nginx
  rules:
  - host: mi-app.ejemplo.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: mi-app-svc
            port:
              number: 80
```

**HTTPRoute equivalente:**

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: mi-app
  namespace: produccion
spec:
  parentRefs:
  - name: prod-gateway
    namespace: nginx-gateway
  hostnames:
  - "mi-app.ejemplo.com"
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /
    backendRefs:
    - name: mi-app-svc
      port: 80
```

Los cambios más relevantes:

- `spec.rules[].host` → `spec.hostnames[]`
- `spec.rules[].http.paths` → `spec.rules[].matches`
- **`spec.parentRefs`** es nuevo y obligatorio — conecta el HTTPRoute con el Gateway

Aplica el HTTPRoute y verifica el estado:

```bash
kubectl apply -f mi-app-httproute.yaml
kubectl get httproute -A
```

El campo `STATUS` debe mostrar `Accepted` y `Programmed`.

### Paso 5 — Validar y retirar el Ingress antiguo

Con el HTTPRoute funcionando, verifica que el servicio responde correctamente:

```bash
curl -H "Host: mi-app.ejemplo.com" http://<IP-del-nuevo-gateway>/
```

Si la respuesta es correcta, elimina el Ingress antiguo:

```bash
kubectl delete ingress mi-app -n produccion
```

Repite el proceso para cada Ingress del cluster.

### Paso 6 — Retirar Ingress NGINX

Solo cuando hayas migrado y validado todos los recursos:

```bash
helm uninstall ingress-nginx -n ingress-nginx
```

## Casos especiales: anotaciones de Ingress NGINX

Si utilizabas anotaciones específicas de Ingress NGINX, la mayoría tienen equivalente en Gateway API mediante **HTTPRoute filters**:

| Anotación Ingress NGINX                                  | Equivalente Gateway API               |
|----------------------------------------------------------|---------------------------------------|
| `nginx.ingress.kubernetes.io/rewrite-target`            | `HTTPURLRewriteFilter`                |
| `nginx.ingress.kubernetes.io/ssl-redirect`              | `HTTPRequestRedirectFilter` (HTTPS)   |
| `nginx.ingress.kubernetes.io/proxy-set-headers`         | `HTTPRequestHeaderFilter`             |
| `nginx.ingress.kubernetes.io/limit-rps`                 | Depende del controlador               |
| `nginx.ingress.kubernetes.io/configuration-snippet`     | ❌ Sin equivalente directo             |

Los `configuration-snippet` y `server-snippet` son el caso más complicado: Gateway API los elimina deliberadamente por razones de seguridad. Si los usas, tendrás que repensar esa lógica — puede que necesites moverla a nivel de configuración del controlador o usar una solución a medida.

La guía oficial de migración tiene la referencia completa: [gateway-api.sigs.k8s.io/guides/migrating-from-ingress-nginx](https://gateway-api.sigs.k8s.io/guides/migrating-from-ingress-nginx/)

## Conclusión

Ingress NGINX no va a actualizarse solo. La fecha límite es concreta — marzo 2026 — y no hay extensiones. Si tu cluster lo usa, la ventana para migrar de forma ordenada y sin presión es ahora.

Gateway API no es un parche de emergencia. Es una API mejor diseñada, con separación real de responsabilidades, adoptada por todo el ecosistema. Vale la pena invertir el tiempo en entenderla bien.

La estrategia recomendada: inventaría tus Ingress, instala Gateway API en paralelo, migra recurso a recurso, valida en staging antes de tocar producción y retira Ingress NGINX solo cuando todo esté listo.

Cualquier duda sobre la migración, déjala en los comentarios. Si te has encontrado con un caso particular complicado, cuéntalo — seguramente le interesa a más gente.

¡Hasta la próxima!

---

## Recursos

- [Documentación oficial Gateway API](https://gateway-api.sigs.k8s.io/guides/)
- [Guía de migración desde Ingress NGINX](https://gateway-api.sigs.k8s.io/guides/migrating-from-ingress-nginx/)
- [NGINX Gateway Fabric](https://github.com/nginx/nginx-gateway-fabric)
