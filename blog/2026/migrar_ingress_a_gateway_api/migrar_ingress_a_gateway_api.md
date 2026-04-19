--- slug: migrar_ingress_a_gateway_api_kubernetes
title: Migrar de Ingress a Gateway API en Kubernetes sin downtime
description: Guía práctica para migrar Ingress a Gateway API en Kubernetes paso a paso con ingress2gateway, NGINX Gateway Fabric y convivencia gradual sin cortes
tags: [kubernetes, gateway-api, ingress, networking, devops, devsecops]
keywords: [kubernetes, gateway api, ingress, migración ingress gateway api, ingress2gateway, nginx gateway fabric, httproute, kubernetes networking, migrar ingress nginx]
authors: pabpereza
date: 2026-04-08
---

# Migrar de Ingress a Gateway API en Kubernetes

Imagina la escena: tienes cinco Ingress en producción, cada uno con un tocho de anotaciones de nginx para rewrites, canary, rate limiting y alguna cosa más. Todo funciona. Y entonces te piden migrar de nginx a Traefik. Adivina qué: ninguna de esas anotaciones sirve. A reescribirlas todas.

Este es el problema real de Ingress: todo lo interesante depende de anotaciones propietarias del controlador. Cambias de controlador, y a empezar de cero.

<!-- truncate -->

En este artículo vamos a ver cómo migrar un Ingress existente a **Gateway API**, el sucesor oficial de Ingress en Kubernetes, paso a paso y con una herramienta que automatiza buena parte del trabajo. Si todavía no tienes clara la teoría de Gateway API, te recomiendo leer antes el capítulo del curso de Kubernetes: [Gateway API en Kubernetes](/docs/cursos/kubernetes/gateway_api_en_kubernetes_configuracion_y_uso).

Si lo prefieres, tienes la entrada en vídeo: https://youtu.be/o8OXJbRTj5Q

[![Vídeo del montaje](https://img.youtube.com/vi/o8OXJbRTj5Q/maxresdefault.jpg)](https://youtu.be/o8OXJbRTj5Q)


## ¿Por qué migrar?

Gateway API no es un "Ingress v2", es un rediseño completo. Y las ventajas frente a Ingress no son cosméticas:

- **Portabilidad real**. Un `HTTPRoute` con traffic splitting, matching por header o rewrites funciona exactamente igual en NGINX Gateway Fabric, Envoy Gateway, Cilium o Traefik. Lo escribes una vez y funciona en cualquier controller conformante. Con Ingress esto es imposible.
- **Separación de roles por diseño**. En Ingress, un desarrollador puede meter una anotación que cambia la configuración global del nginx de todo el clúster. En Gateway API, el equipo de infra define los `Gateway` y el desarrollador solo crea `HTTPRoute` que se enganchan a ellos. Nadie pisa a nadie.
- **Más capacidades en spec estándar**. Routing por headers, query params, método HTTP, traffic splitting con pesos, redirects, rewrites, request mirroring, routing gRPC... todo nativo, sin anotaciones mágicas.
- **Estabilidad**. Las APIs core (`GatewayClass`, `Gateway`, `HTTPRoute`) llevan en GA desde octubre de 2023. No es un experimento.

Si estás empezando un clúster nuevo en 2026, la decisión es fácil: ve directamente con Gateway API. Si ya tienes Ingress en producción, esta guía es para ti.

## El caso práctico: la API de quotes

Vamos a migrar un caso real que uso en el curso: la **API de quotes**, una API REST en FastAPI que sirve citas célebres. Tiene su `Deployment` y su `Service` de toda la vida:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: quotes-deployment
  labels:
    app: quotes
spec:
  replicas: 3
  selector:
    matchLabels:
      app: quotes
  template:
    metadata:
      labels:
        app: quotes
    spec:
      containers:
        - name: quotes
          image: pabpereza/quotes
          ports:
            - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: quotes-service
spec:
  selector:
    app: quotes
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 80
  type: ClusterIP
```

Y este es el `Ingress` que tenemos configurado hoy. Un Ingress clásico, con su `ingressClassName`, su host, su path y su anotación de `rewrite-target`:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: quotes-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: quotes.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: quotes-service
            port:
              number: 8080
```

El objetivo es dejar exactamente lo mismo funcionando, pero con Gateway API.

## Paso 1: instalar los CRDs de Gateway API

Gateway API se instala en dos partes: los **CRDs** (los tipos de recurso) y un **controller** que los reconcilia. Sin el controller, los CRDs son solo formularios sin nadie que los tramite.

Empezamos por los CRDs. Usamos siempre el *Standard Channel* para producción:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.5.1/standard-install.yaml
```

Esto nos da `GatewayClass`, `Gateway`, `HTTPRoute`, `GRPCRoute` y `ReferenceGrant`. Todo lo que está en GA y listo para producción.

## Paso 2: instalar NGINX Gateway Fabric

Como venimos de `ingress-nginx`, la ruta natural es **NGINX Gateway Fabric**. Mismo fabricante, diseñado explícitamente como sucesor. Lo instalamos con Helm:

```bash
helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric \
  --create-namespace -n nginx-gateway
```

Y verificamos que el controller está arriba y que ha registrado su `GatewayClass` automáticamente:

```bash
kubectl get pods -n nginx-gateway
kubectl get gatewayclasses
```

Deberías ver un `GatewayClass` llamado `nginx` con el controller de `nginx-gateway-fabric`. Esta parte es la que correspondería al rol de **Infrastructure Provider**: decidir qué tipos de gateway hay disponibles en el clúster.

## Paso 3: crear el Gateway

Ahora, poniéndonos el sombrero del **Cluster Operator**, creamos el `Gateway`. Aquí es donde definimos el punto de entrada al clúster: qué protocolo escuchamos, en qué puerto y qué hostnames aceptamos.

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: prod-gateway
spec:
  gatewayClassName: nginx
  listeners:
  - name: http
    protocol: HTTP
    port: 80
    hostname: "*.example.com"
```

Fíjate en el wildcard del hostname: con `*.example.com` aceptamos cualquier subdominio. El TLS iría en otro listener con `protocol: HTTPS` y la referencia al secret del certificado, pero para este ejemplo lo dejamos en HTTP plano.

Aplicamos y comprobamos el estado:

```bash
kubectl apply -f gateway.yaml
kubectl get gateways
kubectl describe gateway prod-gateway
```

Busca en el `status` que el Gateway aparece como `Accepted: True` y `Programmed: True`. Eso significa que el controller lo ha recogido y está listo para recibir tráfico.

## Paso 4: crear el HTTPRoute

Y ahora viene la parte del **Application Developer**. El `HTTPRoute` reemplaza nuestro Ingress anterior:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
  name: quotes-route
spec:
  parentRefs:
  - name: prod-gateway
  hostnames:
  - "quotes.example.com"
  rules:
  - matches:
    - path:
        type: PathPrefix
        value: /
    backendRefs:
    - name: quotes-service
      port: 8080
```

La estructura es limpia: en `parentRefs` referenciamos el `Gateway` que acabamos de crear, en `hostnames` ponemos nuestro dominio, y en `rules` definimos el match por path y el backend. **Cero anotaciones propietarias.** Todo en la spec estándar.

Aplicamos y verificamos:

```bash
kubectl apply -f httproute.yaml
kubectl get httproutes
kubectl describe httproute quotes-route
```

El `HTTPRoute` debería aparecer con el parent `Accepted: True`. Probamos la ruta:

```bash
curl http://quotes.example.com/quotes
```

Y ahí tienes la API respondiendo a través de Gateway API. Mismo resultado, mejor arquitectura.

## Ingress vs HTTPRoute, lado a lado

Si comparamos el antes y el después, el cambio estructural se ve enseguida:

- **Ingress**: TLS, hostnames, rules y anotaciones propietarias, todo mezclado en un único objeto gestionado por el desarrollador.
- **Gateway API**: el `Gateway` (operador) se encarga del listener y el TLS; el `HTTPRoute` (desarrollador) solo define las rutas. Más limpio, más portable, más seguro.

Y lo más importante: el `HTTPRoute` que acabas de escribir funcionará igual el día que decidas cambiar de NGINX Gateway Fabric a Envoy Gateway o a Cilium. Eso con Ingress es directamente imposible.

## Automatizar la migración con ingress2gateway

Todo lo anterior está muy bien para entender qué está pasando. Pero si tienes 20, 50 o 100 Ingress en producción, no vas a reescribir cada uno a mano. Para eso existe **ingress2gateway**, un proyecto oficial de la comunidad de Gateway API que lee tus Ingress existentes y genera los `HTTPRoute` equivalentes automáticamente.

La instalación es directa si tienes Go:

```bash
go install github.com/kubernetes-sigs/ingress2gateway@latest
```

Y para ver la conversión basta con ejecutar:

```bash
ingress2gateway print --providers=ingress-nginx
```

Te escupe por stdout los recursos Gateway API equivalentes a tus Ingress: el `Gateway`, los `HTTPRoute`, todo. Lo suyo es guardarlo en un fichero para revisarlo antes de aplicar:

```bash
ingress2gateway print --providers=ingress-nginx > gateway-resources.yml
# Revisar, ajustar lo que haga falta
kubectl apply -f gateway-resources.yaml
```

Lo interesante es que la herramienta traduce las anotaciones más comunes a filtros estándar. Por ejemplo, una anotación `nginx.ingress.kubernetes.io/rewrite-target` se convierte en un filtro `URLRewrite` dentro del `HTTPRoute`. Lo que antes era propietario de nginx, ahora es spec estándar.

Eso sí, no es magia. Si tienes anotaciones muy específicas de tu controller que no tienen equivalente directo en Gateway API, la herramienta te lo indicará y tendrás que resolverlo a mano. Pero para el 80-90% de los casos, te ahorra un montón de trabajo.

## Migración gradual: sin downtime, sin drama

Una de las mejores noticias de esta migración es que **Gateway API e Ingress conviven perfectamente en el mismo clúster**. Son APIs independientes, con controllers independientes. Así que puedes hacer la migración poco a poco, ruta por ruta, sin cortes de servicio.

El flujo que yo recomiendo es:

1. Instalas Gateway API y NGINX Gateway Fabric al lado del `ingress-nginx` existente.
2. Conviertes un Ingress concreto a `HTTPRoute` (con `ingress2gateway` o a mano).
3. Verificas que la nueva ruta funciona correctamente con un `curl` o con tus tests.
4. Borras el Ingress viejo.
5. Repites hasta que no quede ningún Ingress.
6. Cuando ya no queden Ingress, retiras `ingress-nginx`:

```bash
# Ver qué queda de cada lado
kubectl get ingress -A
kubectl get httproutes -A

# Cuando el HTTPRoute funciona bien, borrar el Ingress viejo
kubectl delete ingress quotes-ingress

# Cuando no queden Ingress, retirar ingress-nginx
helm uninstall nginx-ingress -n ingress-nginx
```

Ten en cuenta un detalle operativo: como son dos controllers distintos (dos Deployments, dos Services), **no comparten IP ni puertos automáticamente**. En un cloud con `LoadBalancer` no es ningún problema (cada controller recibe su propia IP externa), pero si usas `NodePort` tendrás que asignarles puertos distintos, y si usas `hostPort`/`hostNetwork` solo uno puede bindear al 80/443 por nodo. Tenlo en consecuencia.

## Conclusión

Gateway API es el presente y el futuro del routing en Kubernetes. Resuelve los problemas estructurales de Ingress con una spec estándar, portable y pensada para equipos reales con roles separados de infraestructura y aplicaciones.

Los tres mensajes clave si tienes que quedarte con algo:

1. **No es un Ingress v2**, es un rediseño completo.
2. **La migración es gradual**, ambos conviven en el mismo clúster y puedes ir ruta a ruta con `ingress2gateway` como apoyo.
3. **Si empiezas un proyecto nuevo**, ve directamente con Gateway API. Ingress sigue funcionando, pero no recibirá features nuevas.


Nos vemos en el siguiente.
