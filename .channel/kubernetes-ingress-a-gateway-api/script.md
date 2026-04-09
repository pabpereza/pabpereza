# Migrar de Ingress a Gateway API en Kubernetes

**Duracion estimada:** 12-15 min
**Tipo:** Tutorial con demo practica
**Prerequisito:** El espectador conoce Ingress (video #11 del curso)

---

## Guion

| Tiempo | Visual (Lo que se ve) | Audio (Lo que dice Pablo) |
| ------ | --------------------- | ------------------------- |
| 0:00 | [Screencast] Terminal con un `kubectl get ingress` mostrando varios Ingress con anotaciones largas de nginx | Mira esto. Tengo cinco Ingress en produccion, cada uno con sus anotaciones de nginx para rewrites, canary, rate limiting... Y ahora me piden migrar de nginx a Traefik. Adivina que... ninguna de esas anotaciones sirve. Hay que reescribirlas todas. |
| 0:15 | [Camara] Pablo con cara de "lo he vivido" | Este es el problema real de Ingress: todo lo interesante depende de anotaciones propietarias del controlador. Cambias de controlador, y a reescribir. Y esto es solo la punta del iceberg. |
| 0:30 | [Visual generado] Titulo del video: "Migrar de Ingress a Gateway API" con logos de Kubernetes y Gateway API | Hoy vamos a ver Gateway API, el sucesor oficial de Ingress en Kubernetes. Que problemas resuelve, como migrar un Ingress existente paso a paso, y una herramienta que te automatiza la conversion. Soy Pablo de pabpereza, vamos al lio. |
| 0:45 | [Grafico] Tabla comparativa lado a lado: Ingress vs Gateway API con iconos de check/cross | Antes de tocar YAML, vamos a entender por que Gateway API existe. No es un Ingress v2, es un rediseno completo. Mira esta comparativa. |
| 1:00 | [Grafico] Zoom en la fila "Header routing" | En Ingress, si quieres enrutar por headers necesitas anotaciones propietarias. En Gateway API, es spec estandar. Lo defines una vez y funciona en nginx, envoy, traefik, cilium... lo que quieras. |
| 1:15 | [Grafico] Zoom en la fila "Traffic splitting" | Traffic splitting, lo mismo. En Ingress necesitas el hack del canary con anotaciones. En Gateway API son pesos nativos en los backendRefs. Limpio, portable, sin magia negra. |
| 1:30 | [Grafico] Zoom en filas "Redirects", "TCP/UDP", "Cross-namespace" | Redirects, rewrites, routing TCP y UDP, cross-namespace routing... todo esto que en Ingress o no se puede hacer o depende del controlador, en Gateway API es parte de la especificacion. |
| 1:50 | [Grafico] Zoom en la fila "Portabilidad" | Pero para mi, la ventaja mas importante es la portabilidad. Un HTTPRoute con traffic splitting funciona exactamente igual en NGINX Gateway Fabric, Envoy Gateway, Cilium o Traefik. Escribes una vez, funciona en todos. Esto con Ingress es imposible. |
| 2:10 | [Camara] Pablo | Y hay otro cambio conceptual muy potente que Ingress no tiene: la separacion de roles. Dejame explicartelo rapido porque es clave para entender la arquitectura. |
| 2:20 | [Grafico] Diagrama con 3 personas: Ian (Infrastructure Provider), Chihiro (Cluster Operator), Ana (Application Developer). Cada uno con su recurso asociado: GatewayClass, Gateway, HTTPRoute | Gateway API esta disenado alrededor de tres roles que existen en cualquier organizacion real. Primero, Ian, el que gestiona la infraestructura. El define las GatewayClasses, es decir, que tipos de gateways hay disponibles en el cluster. |
| 2:40 | [Grafico] Highlight en Chihiro y Gateway | Luego esta Chihiro, la operadora del cluster. Ella crea los Gateways: decide que puertos escuchar, que protocolos, donde terminar TLS. Piensa en el Gateway como la definicion del load balancer. |
| 2:55 | [Grafico] Highlight en Ana y HTTPRoute | Y finalmente Ana, la desarrolladora. Ella solo crea HTTPRoutes para enrutar trafico a sus servicios. No toca configuracion del load balancer, no toca TLS, no puede romper nada de infraestructura. Solo define sus rutas. |
| 3:10 | [Camara] Pablo | En Ingress esto no existe. Un developer puede meter una anotacion que cambie la configuracion global del nginx de todo el cluster. Con Gateway API, cada uno toca solo lo que le corresponde. Es un cambio brutal en equipos grandes. |
| 3:30 | [Grafico] Diagrama de objetos: GatewayClass -> Gateway -> HTTPRoute -> Service -> Pods. Con flechas de "attach" | Veamos como se conectan estos objetos. El GatewayClass es cluster-scoped, define el controlador. El Gateway referencia a una GatewayClass y define listeners con puertos y protocolos. Y el HTTPRoute se adjunta a un Gateway mediante parentRefs. Es un modelo de attach, no un objeto monolitico como Ingress. |
| 3:55 | [Camara] Pablo | Vale, teoria suficiente. Vamos a la practica. Voy a coger un Ingress real del curso, el que usamos con la API de quotes, y lo vamos a migrar a Gateway API paso a paso. |
| 4:10 | [Screencast] Terminal. Mostrar el deployment de quotes ya corriendo con `kubectl get pods,svc` | Aqui tengo corriendo la API de quotes, la aplicacion que hemos usado en otros videos del curso. Es una API REST con FastAPI que sirve citas celebres. Tengo el deployment y el servicio ya levantados. |
| 4:25 | [Codigo zoom] YAML del Ingress actual de quotes | Y este es el Ingress que le tengo configurado. Un Ingress clasico con ingressClassName nginx, host quotes.example.com, path barra, apuntando al servicio quotes-service en el puerto 8080. Con su anotacion de rewrite-target. Nada raro. |
| 4:45 | [Screencast] Terminal ejecutando los comandos de instalacion de CRDs | Primer paso de la migracion: instalar los CRDs de Gateway API. Son las definiciones de los nuevos recursos. Sin esto, Kubernetes no sabe que es un Gateway o un HTTPRoute. |
| 5:00 | [Codigo zoom] Comando de instalacion de CRDs | Ejecutamos kubectl apply con el YAML del standard channel. Esto nos da GatewayClass, Gateway, HTTPRoute, GRPCRoute y ReferenceGrant. Todo lo que esta en GA y listo para produccion. |
| 5:15 | [Screencast] Terminal ejecutando la instalacion de NGINX Gateway Fabric con Helm | Segundo paso: instalar un controller que implemente Gateway API. Como venimos de ingress-nginx, la ruta natural es NGINX Gateway Fabric. Mismo fabricante, disenado como sucesor. Lo instalamos con helm. |
| 5:35 | [Screencast] Terminal mostrando `kubectl get pods -n nginx-gateway` y `kubectl get gatewayclasses` | Verificamos que el controller esta corriendo y que ha creado la GatewayClass automaticamente. Ahi la tienes: GatewayClass nginx con el controller de nginx-gateway-fabric. Esto es lo que haria Ian, el de infraestructura. |
| 5:55 | [Screencast] Terminal con editor mostrando el YAML del Gateway | Ahora, como Chihiro la operadora del cluster, voy a crear el Gateway. Esto define el punto de entrada al cluster: que protocolo, que puerto, que hostnames acepta. |
| 6:10 | [Codigo zoom] YAML del Gateway con highlight en listeners | Fijate que el Gateway tiene un listener en el puerto 80 con protocolo HTTP. Y le he puesto un hostname con wildcard para aceptar cualquier subdominio de example.com. El TLS lo dejamos para otro video, pero iria aqui mismo, en otro listener. |
| 6:30 | [Screencast] `kubectl apply` del Gateway y `kubectl get gateways` | Aplicamos y verificamos. El Gateway aparece como Accepted y Programmed, eso significa que el controller lo ha recogido y esta listo para recibir trafico. |
| 6:50 | [Screencast] Editor mostrando el YAML del HTTPRoute | Y ahora viene la parte de Ana, la desarrolladora. Creamos un HTTPRoute que reemplaza nuestro Ingress anterior. |
| 7:05 | [Codigo zoom] YAML del HTTPRoute con highlights en parentRefs y backendRefs | Fijate en la estructura. En parentRefs referenciamos el Gateway que acabamos de crear. En hostnames ponemos quotes.example.com. Y en rules definimos el match por path y el backendRef al servicio. Sin anotaciones propietarias, todo en la spec estandar. |
| 7:30 | [Screencast] Split screen: Ingress YAML a la izquierda, HTTPRoute YAML a la derecha | Comparemos lado a lado. El Ingress tiene anotaciones propietarias, el TLS mezclado con las rules, y todo en un solo objeto. El HTTPRoute separa responsabilidades: el Gateway gestiona el listener y TLS, el HTTPRoute solo define las rutas. Mas limpio, mas portable, mas seguro. |
| 7:55 | [Screencast] `kubectl apply` del HTTPRoute y `kubectl get httproutes` | Aplicamos el HTTPRoute y verificamos. Aparece con el parent accepted. Vamos a probarlo. |
| 8:10 | [Screencast] Terminal ejecutando `curl` contra quotes.example.com mostrando la respuesta JSON | Un curl a quotes.example.com y ahi lo tienes, la API de quotes respondiendo a traves de Gateway API. Mismo resultado, mejor arquitectura. |
| 8:30 | [Camara] Pablo | Vale, eso fue la migracion manual, que esta bien para entenderlo. Pero si tienes 20, 50 o 100 Ingress resources, no vas a reescribir cada uno a mano. Para eso existe una herramienta que te va a encantar. |
| 8:50 | [Screencast] Terminal mostrando la instalacion de ingress2gateway | Se llama ingress2gateway y es un proyecto oficial de la comunidad de Gateway API. Lo que hace es leer tus Ingress existentes y generar los HTTPRoutes equivalentes automaticamente. |
| 9:10 | [Screencast] Terminal ejecutando `ingress2gateway print` mostrando la salida YAML | Le pasas el flag print y te escupe los recursos Gateway API equivalentes a tus Ingress. Mira, ha generado el Gateway, el HTTPRoute, todo. Lo revisas, ajustas lo que necesites, y aplicas. |
| 9:30 | [Codigo zoom] Output de ingress2gateway con highlights en las partes generadas | Fijate que ha convertido las anotaciones de rewrite-target a un filter de URLRewrite en el HTTPRoute. Eso antes era propietario de nginx, ahora es spec estandar. La herramienta te hace la traduccion. |
| 9:50 | [Camara] Pablo | Eso si, no es magia. Si tienes anotaciones muy especificas de tu controlador que no tienen equivalente en Gateway API, la herramienta te lo indica y tendras que resolverlo manualmente. Pero para el 80-90% de los casos, te ahorra un monton de trabajo. |
| 10:15 | [Grafico] Diagrama de convivencia: ingress-nginx y NGINX Gateway Fabric corriendo en paralelo con flechas mostrando migracion gradual | Y lo mejor es que puedes hacer la migracion gradual. Gateway API e Ingress conviven perfectamente en el mismo cluster. Son APIs independientes, controllers independientes. Asi que puedes ir migrando ruta a ruta, sin downtime, sin riesgo. |
| 10:35 | [Screencast] Terminal mostrando ambos recursos: `kubectl get ingress` y `kubectl get httproutes` | Mira, aqui tengo ambos corriendo a la vez. El Ingress viejo y el HTTPRoute nuevo. Cuando verificas que el HTTPRoute funciona correctamente, borras el Ingress. Y cuando ya no queden Ingress, retiras ingress-nginx. Migracion sin dramas. |
| 11:00 | [Camara] Pablo | Recapitulemos. |
| 11:05 | [Grafico] Slide con 3 puntos de resumen | Primero: Gateway API no es un Ingress v2, es un rediseno completo que resuelve los problemas de portabilidad, separacion de roles y funcionalidades que Ingress arrastra desde siempre. |
| 11:20 | [Grafico] Segundo punto highlight | Segundo: la migracion es gradual. Ambos conviven en el mismo cluster. Puedes ir migrando ruta a ruta con ingress2gateway como herramienta de apoyo. |
| 11:35 | [Grafico] Tercer punto highlight | Y tercero: si estas empezando un proyecto nuevo, ve directamente con Gateway API. Ingress sigue funcionando, pero Gateway API es el presente y el futuro del routing en Kubernetes. Las APIs core llevan en GA desde octubre de 2023. |
| 11:55 | [Camara] Pablo, tono cercano | Si quieres profundizar mas, en el articulo del blog del curso de Kubernetes tienes toda la referencia: comparativa detallada, todos los recursos explicados, ejemplos de GRPCRoute, TLSRoute, ReferenceGrant... el enlace lo tienes en la descripcion. |
| 12:10 | [Camara] Pablo | Pregunta para los comentarios: tu cluster todavia esta en Ingress puro o ya has empezado a migrar a Gateway API? Contame como te esta yendo. Y si este video te ha servido, ya sabes, dale al like que me ayuda un monton. Nos vemos en el siguiente. Hasta la proxima! |
| 12:30 | [Visual generado] Pantalla final con tarjeta del video de Ingress (video anterior) y boton de suscripcion | |

---

## Ejemplos de codigo

### Deployment y Service de quotes (prerequisito)

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
          livenessProbe:
            httpGet:
              path: /probes/health
              port: 80
            initialDelaySeconds: 10
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /probes/ready
              port: 80
            initialDelaySeconds: 5
            periodSeconds: 5
          resources:
            requests:
              cpu: "100m"
              memory: "256Mi"
            limits:
              memory: "1024Mi"
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

### Ingress existente (ANTES de migrar)

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

### Paso 1 - Instalar CRDs de Gateway API

```bash
# Instalar Standard Channel (produccion)
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/download/v1.5.1/standard-install.yaml
```

### Paso 2 - Instalar NGINX Gateway Fabric

```bash
# Instalar con Helm
helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric \
  --create-namespace -n nginx-gateway

# Verificar instalacion
kubectl get pods -n nginx-gateway
kubectl get gatewayclasses
```

### Paso 3 - Crear el Gateway (rol: Cluster Operator)

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

### Paso 4 - Crear el HTTPRoute (rol: Application Developer)

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

### Paso 5 - Verificar la migracion

```bash
# Ver estado del Gateway
kubectl get gateways
kubectl describe gateway prod-gateway

# Ver estado del HTTPRoute
kubectl get httproutes
kubectl describe httproute quotes-route

# Probar la ruta
curl http://quotes.example.com/quotes
```

### Bonus - ingress2gateway (migracion automatizada)

```bash
# Instalar ingress2gateway
go install github.com/kubernetes-sigs/ingress2gateway@latest

# Mostrar los recursos Gateway API equivalentes a tus Ingress
ingress2gateway print

# Generar y guardar en fichero para revisar
ingress2gateway print > gateway-resources.yaml

# Revisar, ajustar y aplicar
kubectl apply -f gateway-resources.yaml
```

### Comandos de convivencia (migracion gradual)

```bash
# Ver Ingress existentes
kubectl get ingress

# Ver HTTPRoutes nuevos
kubectl get httproutes

# Cuando el HTTPRoute funciona, borrar el Ingress viejo
kubectl delete ingress quotes-ingress

# Cuando no queden Ingress, retirar ingress-nginx
helm uninstall nginx-ingress -n ingress-nginx
```
