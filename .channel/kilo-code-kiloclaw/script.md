# Script: Auditoria semanal de k3s con KiloClaw

- **Slug:** kilo-code-kiloclaw
- **Duracion objetivo:** 12-14 min
- **Angulo:** #3 — cron semanal que audita k3s del homelab y manda informe por Telegram
- **Disclosure:** video patrocinado por Kilo Code. Opinion tecnica y codigo 100% mios.
- **Estado:** borrador Frodo v2 (enfoque "API expuesto, kubectl dentro de KiloClaw"), pendiente demo privada y respuestas de Brian antes de grabar

> Notas para Pablo antes de rodar:
> - Cambio importante respecto a v1: ya no hay bastion SSH. Ahora el kubeconfig vive en KiloClaw, `kubectl` corre dentro de la VM de Kilo, y el script de auditoria vive en `/workspace/k3s-audit/`. Eso implica **exponer el kube-apiserver** (o al menos dejarlo alcanzable desde la IP de salida de KiloClaw). El bloque de seguridad es MAS duro que antes, no menos.
> - Todo bloque marcado `<!-- VERIFICAR EN DEMO -->` hay que probarlo en KiloClaw real antes de leerlo en camara. Si algo falla, el guion cambia.
> - El disclosure verbal va en el minuto 0:35 y el disclosure en descripcion ya esta en `seo.md`.
> - Afiliado/URL final es placeholder: `https://kilo.ai/kiloclaw?ref=pabpereza` — cambiar por el real cuando llegue.

---

## Tabla principal

| Tiempo | Visual (Lo que se ve) | Audio (Lo que dice Pablo) |
| ------ | --------------------- | ------------------------- |
| 0:00 | [Screencast] Terminal con `kubectl get pods -A`, se ven 3 pods en CrashLoopBackOff y un Node NotReady. Zoom rapido. | Mi k3s del homelab lleva cuatro dias con tres pods en CrashLoop y un nodo medio muerto. Yo sin enterarme. Porque los domingos no abro el portatil, y porque montar Prometheus, Alertmanager y un receiver de Telegram para un cluster de cacharros de casa me da una pereza bastante razonable. |
| 0:20 | [Camara] Pablo en su sitio habitual. | Asi que este fin de semana he probado otra cosa: que un agente con shell en la nube, cron y Telegram me haga una auditoria semanal del cluster y me mande un informe el domingo por la manana. Sin Prometheus, sin Alertmanager, sin nada corriendo en mi red. |
| 0:35 | [Visual generado] Logo del canal + overlay "Video patrocinado por Kilo Code". | Soy Pablo de pabpereza. Aviso de entrada: este video esta patrocinado por Kilo Code, el producto se llama KiloClaw, y antes del final del video vais a tener tres minutos enteros dedicados a los limites serios de este approach. Incluyendo por que vais a tener que exponer vuestro kube-apiserver a internet y por que eso asusta — con razon. Si eso ya os echa para atras, perfecto, ahorrais doce minutos. A los demas, vamos al grano. |
| 1:05 | [Grafico] Caja "KiloClaw VM" con iconos: shell, cron, kubectl, Telegram, egress -> Internet -> kube-apiserver homelab. | KiloClaw en dos frases: es la version hosted de OpenClaw, un agente autonomo open source. Kilo te alquila una VM por nueve dolares al mes con tres cosas que a un sysadmin le interesan: shell real, cron nativo, y conectores a Telegram, Slack, Discord y cuarenta y pico canales mas. El resto del marketing, lo de "te ordena el correo", lo ignoramos. Yo quiero una cajita Linux con chat, punto. |
| 1:40 | [Screencast] kilo.ai/docs/kiloclaw/overview resaltando "2 vCPU, 3 GB RAM, 10 GB SSD, Beta". | Specs honestas: dos vCPU compartidas, tres gigas de RAM, diez gigas persistentes, y en beta. No es un VPS serio, no es un runner de CI. Es una Raspberry Pi remota con LLM pegado. Con ese modelo mental en la cabeza, el caso cobra sentido. |
| 2:10 | [Camara] | El caso es este: un cron semanal, domingos a las diez, que lanza `kubectl` contra mi k3s con un token de ServiceAccount read-only, saca cuatro cosas criticas, las prioriza con el LLM, y me las manda a un Telegram privado. Todo corre dentro de KiloClaw. El kubeconfig vive alli. El script vive alli. Yo no monto bastion, no monto Prometheus, no abro SSH. Lo unico que abro — y aqui esta el truco sucio del video — es el API del cluster, controlado. |
| 2:45 | [Grafico] Diagrama: KiloClaw VM (cron + kubectl + jq) -> HTTPS 6443 -> kube-apiserver homelab. Al lado, caja roja "FIREWALL + RBAC + audit". | El flujo: cron dispara dentro de KiloClaw, la shell lanza `kubectl` local contra `https://api.midominio.org:6443`, el kube-apiserver valida el token de la ServiceAccount, devuelve JSON, jq lo procesa, el LLM lo prioriza, y el tool `message` lo manda a Telegram. El flujo es saliente desde KiloClaw y entrante a mi API. Esa frase — entrante a mi API — es la que cambia todo el blast radius y la vamos a desmenuzar en el bloque de seguridad. |
| 3:15 | [Screencast] Web UI de KiloClaw, cuenta nueva logueada, chat vacio. <!-- VERIFICAR EN DEMO --> | Esto es la Web UI recien provisionada. El acceso a la VM es solo via chat y CLI de Kilo, no hay SSH entrante. Toda la configuracion la hago pidiendosela al agente en castellano y mirando la traza de lo que ejecuta. |
| 3:35 | [Screencast] Pablo escribe: "Verifica si tienes kubectl y jq instalados. Si no, instalalos en /workspace/bin y anadelo al PATH". <!-- VERIFICAR EN DEMO: KiloClaw permite instalar binarios arbitrarios y persisten en /workspace --> | Primer paso: que la VM tenga `kubectl` y `jq`. No me consta que vengan de serie, asi que le pido al agente que compruebe y, si faltan, los descargue a `/workspace/bin` — que segun los docs es persistente entre reinicios. <!-- VERIFICAR EN DEMO que /workspace/bin sobrevive a redeploy y que el PATH persiste --> Si KiloClaw bloquea descargas de binarios o no permite escribir en el PATH, este video cambia. |
| 4:05 | [Screencast] Pablo escribe: "Crea /workspace/k3s-audit con permisos 700 y dentro kubeconfig.yaml con permisos 600". | Workspace dedicado con permisos restrictivos. El kubeconfig va a vivir aqui. Y si, esto es un LLM manipulando un kubeconfig en una VM compartida. Hablamos de eso en el bloque de limites. |
| 4:25 | [Codigo zoom] Pablo pega el kubeconfig con el server y el token de la SA (todo con datos ficticios en pantalla). | Le paso el kubeconfig. El `server` apunta a mi API expuesto — `api.midominio.org:6443` —, el `token` es el de la ServiceAccount read-only que he creado en el cluster. El certificado CA va en base64. Ese token es lo unico que puede hacer danio si se filtra: read-only, sin secrets, sin exec, sin port-forward. RBAC minimo estricto. Lo vereis en la seccion de codigo de abajo. |
| 5:00 | [Screencast] Pablo pega el script `k3s-audit.sh` y le pide al agente que lo guarde en `/workspace/k3s-audit/k3s-audit.sh` y lo haga ejecutable. | El script de auditoria. No es magia, son cuatro `kubectl` encadenados: pods en CrashLoopBackOff, nodos NotReady, deployments sin requests ni limits — que es como tengo la mitad del cluster —, imagenes con tag `:latest` — que es como tengo la otra mitad —, y el vencimiento del certificado del API server leido por TLS desde el propio endpoint. Nada de `openssl` mirando ficheros locales, porque aqui no hay ficheros locales. |
| 5:50 | [Codigo zoom] Script en pantalla, seccion de `jq`. | Lo importante no es el bash, es que el script devuelve JSON estructurado. Asi el LLM no parsea salida humana de `kubectl`, que es donde los agentes meten la pata. Datos limpios, modelo interpreta. Esa es la linea entre bot que funciona y demo que peta. |
| 6:15 | [Screencast] Pablo: "Ejecuta /workspace/k3s-audit/k3s-audit.sh y ensename la salida". | Prueba en frio. Que el `kubectl` local funcione, que el token sea valido, que el API responda desde la IP de KiloClaw. <!-- VERIFICAR EN DEMO: latencia del kubectl desde KiloClaw a un API publico, y que el firewall del API deja pasar la IP de salida de KiloClaw en ese momento --> |
| 6:40 | [Screencast] JSON en el chat: 3 pods CrashLoop, 1 nodo NotReady, cert en 23 dias. | Y ahi esta. Tres pods rotos, un nodo caido, el certificado del API server en veintitres dias. Cosas que yo no sabia hace cinco minutos. |
| 7:00 | [Camara] | Falta que esto llegue a Telegram los domingos sin que yo mueva un dedo. Ahi entra el cron nativo del agente. |
| 7:15 | [Screencast] Pablo pega el prompt de cron (ver seccion codigo). | Le pego el prompt al agente para que cree el cron. Fijaos: no es crontab, es lenguaje natural. El agente usa su tool `cron` y lo registra en la instancia. Deberia sobrevivir a reinicios porque el workspace es persistente. <!-- VERIFICAR EN DEMO: el cron persiste tras reinicio de la VM — pregunta abierta para Brian --> |
| 7:50 | [Codigo zoom] Respuesta del agente con ID del cron y proxima ejecucion. | Confirma el ID y la proxima ejecucion. Para no esperar una semana, le pido que lo lance manual. |
| 8:10 | [Screencast] Telegram del movil con el mensaje priorizado en Markdown. | Y ahi esta el resultado en mi Telegram. Tres secciones: critico, warning, informativo. El LLM decide que el cert en 23 dias es critico, los pods rotos son warning porque son del namespace de pruebas, y el nodo NotReady es critico porque es el master. Esa priorizacion no la ha hecho el bash, la ha hecho el modelo. |
| 8:45 | [Camara] | Y para mi homelab, esto es suficiente. No necesito Grafana, Alertmanager, ni receiver. Necesito que alguien mire mi cluster una vez por semana y me chille si algo importante se rompe. Por nueve dolares al mes, para uso personal, me compensa. **Ahora el bloque que me tenia preocupado desde que empece a escribir este guion.** |
| 9:10 | [Visual generado] Tarjeta "LIMITES REALES" en rojo, titular grande: "Expones tu kube-apiserver. Punto". | Limites reales. Y esta vez el bloque dura mas de lo normal porque este approach tiene una implicacion gorda que tengo que ponerla yo mismo encima de la mesa: **estas exponiendo tu kube-apiserver a internet, o como minimo a la red publica**. Eso no es una nota al pie. Eso es el titular. |
| 9:35 | [Grafico] Lista en pantalla, punto 1. | Uno. Kube-apiserver expuesto. Para que `kubectl` corra dentro de la VM de KiloClaw, el API de tu cluster tiene que ser alcanzable desde la IP de salida de esa VM. En un homelab normal, eso significa port-forward del 6443 en tu router, DNS publico, y certificado valido. El API server de Kubernetes es uno de los componentes mas atacados del planeta. Si lo dejais abierto a toda internet sin filtro, preparaos a ver en los logs intentos de anonymous auth, enumeracion de paths, y escaneos de CVE desde el primer minuto. |
| 10:10 | [Grafico] Punto 2. | Dos. La IP de salida de KiloClaw **probablemente no es estatica**. <!-- VERIFICAR EN DEMO y con Brian: hay IP de salida fija, pool conocido, o rota? --> Si rota, no podeis poner un firewall de `allow 1.2.3.4` en vuestro router. Quedan dos opciones: o abris el 6443 al mundo con otras mitigaciones, o montais un tunnel saliente desde KiloClaw. Cloudflare Tunnel, Tailscale, WireGuard userspace — son candidatos, pero hay que verificar que KiloClaw permite correr uno de esos clientes dentro de la VM. <!-- VERIFICAR EN DEMO: KiloClaw permite instalar y correr cliente Tailscale/WireGuard userspace en /workspace? Soporta TUN? --> Si la respuesta es si, montad el tunnel y no expongais el 6443. Yo, en la demo real de este video, voy a montar **Tailscale dentro de KiloClaw** si funciona, y caeria en exposicion directa solo como fallback educativo. |
| 11:00 | [Grafico] Punto 3. | Tres. Mitigaciones imprescindibles si acabais exponiendo el API aunque sea detras de tunnel: RBAC minimo absoluto — ClusterRole con `get` y `list` en cuatro recursos y nada mas, sin `secrets`, sin `exec`, sin `portforward`. ServiceAccount token con TTL corto via `kubectl create token --duration=168h` regenerado semanalmente, no el legacy secret de larga duracion que os ensenan en mil blogs. Audit logging activo en el kube-apiserver apuntando a los verbos de esa SA. Y si el API queda expuesto directo, NetworkPolicy o firewall del nodo control-plane que limite el 6443 al rango de salida de KiloClaw si lo teneis documentado. |
| 11:45 | [Grafico] Punto 4. | Cuatro. Blast radius. Aunque todo lo anterior este bien, estais confiando en una VM compartida, operada por terceros, con un LLM que lee todo lo que pasa por ahi. Si la VM se compromete, el atacante tiene un token con capacidad de listar todos los nodos, pods y namespaces de vuestro cluster. Eso no es "game over" — no pueden crear recursos, no pueden leer secrets — pero es **reconocimiento perfecto** para una segunda fase. Asumidlo. Si vuestro cluster tiene datos sensibles en nombres de namespace o labels, esto ya es demasiado. |
| 12:20 | [Grafico] Punto 5. | Cinco, rapidos: VM compartida con ruido de vecinos, producto en beta con bugs esperables, sin SSH entrante para depurar como en un VPS, y privacidad — el LLM ve vuestros comandos y la salida de `kubectl`. Politica de retention de Kilo Gateway en la descripcion del video. <!-- VERIFICAR: pegar respuesta de Brian sobre retention antes de grabar --> Si teneis datos regulados, KiloClaw hosted no es vuestro sitio. Para eso esta OpenClaw self-hosted. |
| 12:50 | [Camara] | Con todos esos asteriscos: para mi caso — homelab, cluster de pruebas, cero datos sensibles, tunnel Tailscale en medio, RBAC minimo, token rotado semanal — me compensa. Para produccion, **ni de coña**. Y si vuestra alternativa es montar n8n en un VPS y hacer un workflow equivalente, tambien es valido, os va a costar mas horas pero el modelo de amenaza es mas sencillo de razonar. Elegid con los ojos abiertos. |
| 13:20 | [Visual generado] Tarjeta con los 3 puntos clave. | Resumen en tres puntos. Uno: KiloClaw es una cajita Linux con chat a nueve dolares, no un asistente personal. Dos: meter `kubectl` dentro de esa cajita te ahorra montar Prometheus pero te obliga a exponer el API — usa tunnel, no exposicion directa. Tres: el riesgo no es cero, asumidlo o no lo useis. |
| 13:45 | [Camara] | Pregunta para los comentarios: vosotros expondriais el API de vuestro cluster a una VM de terceros aunque sea con tunnel y RBAC read-only? O es linea roja? Tengo curiosidad real por donde pone cada uno el corte. |
| 14:00 | [Visual generado] Tarjeta video relacionado: k3s desde cero. | Si quereis ver como monto yo el k3s de homelab desde cero, ese video esta linkado arriba. Y si quereis probar KiloClaw, enlace de afiliado en la descripcion — trial de siete dias sin tarjeta, y ya sabeis donde estan los limites. |
| 14:15 | [Camara] Pablo despide. | Gracias a Kilo Code por la libertad editorial de verdad para decir en camara lo que acabo de decir, que no es poco. Y a vosotros por aguantarme. Hasta la proxima! |

---

## Ejemplos de codigo

### 1. ServiceAccount read-only con RBAC minimo (aplicar en el cluster)

```yaml
# audit-sa.yaml — aplicar con: kubectl apply -f audit-sa.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kiloclaw-audit
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: kiloclaw-audit-reader
rules:
  - apiGroups: [""]
    resources: ["nodes", "pods", "namespaces", "events"]
    verbs: ["get", "list"]
  - apiGroups: ["apps"]
    resources: ["deployments", "daemonsets", "statefulsets"]
    verbs: ["get", "list"]
  # Ojo: NO damos acceso a secrets, pods/exec, pods/portforward, ni a nada write.
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: kiloclaw-audit-reader
subjects:
  - kind: ServiceAccount
    name: kiloclaw-audit
    namespace: kube-system
roleRef:
  kind: ClusterRole
  name: kiloclaw-audit-reader
  apiGroup: rbac.authorization.k8s.io
```

### 2. Generar token con TTL corto (rotar semanal)

```bash
# En tu maquina, NO en KiloClaw. Genera un token valido 7 dias.
# Requiere k8s >= 1.24.
kubectl -n kube-system create token kiloclaw-audit --duration=168h
```

Este token es lo que va a parar al `kubeconfig.yaml` dentro de KiloClaw.
Rotarlo semanal tambien puede automatizarse desde el propio agente pidiendole
que lo regenere — pero ojo: para eso necesitaria credenciales mas potentes
para crear tokens, y eso ya no es read-only. Mejor rotarlo tu desde fuera.

### 3. Kubeconfig que vive en `/workspace/k3s-audit/kubeconfig.yaml`

```yaml
apiVersion: v1
kind: Config
clusters:
  - name: homelab-k3s
    cluster:
      server: https://api.midominio.org:6443   # <-- tu API expuesto (via tunnel preferiblemente)
      certificate-authority-data: <CA_BASE64>
contexts:
  - name: kiloclaw-audit@homelab-k3s
    context:
      cluster: homelab-k3s
      user: kiloclaw-audit
      namespace: kube-system
current-context: kiloclaw-audit@homelab-k3s
users:
  - name: kiloclaw-audit
    user:
      token: <TOKEN_GENERADO_ARRIBA>
```

Permisos: `chmod 600`. Ubicacion: `/workspace/k3s-audit/kubeconfig.yaml` dentro
de la VM de KiloClaw.

### 4. (Recomendado) Tunnel Tailscale dentro de KiloClaw en lugar de exponer 6443

```bash
# <!-- VERIFICAR EN DEMO: KiloClaw permite instalar tailscaled userspace y abrir TUN o modo userspace-networking -->
# Descarga del binario estatico en /workspace/bin
curl -fsSL https://pkgs.tailscale.com/stable/tailscale_latest_amd64.tgz \
  | tar -xz -C /workspace/bin --strip-components=1 \
    tailscale_latest_amd64/tailscale tailscale_latest_amd64/tailscaled

# Modo userspace (no requiere TUN, no requiere root)
/workspace/bin/tailscaled \
  --tun=userspace-networking \
  --socks5-server=localhost:1055 \
  --state=/workspace/k3s-audit/tailscaled.state &

# Login con auth key de un tag dedicado
/workspace/bin/tailscale --socket=/tmp/tailscaled.sock \
  up --authkey="${TS_AUTHKEY}" --hostname=kiloclaw-audit --ssh=false

# kubectl a traves del proxy SOCKS5 -> solo alcanzable dentro de la tailnet
HTTPS_PROXY=socks5://localhost:1055 \
  /workspace/bin/kubectl --kubeconfig=/workspace/k3s-audit/kubeconfig.yaml get nodes
```

Con esto el `server` del kubeconfig puede apuntar a la IP privada del master
dentro de la tailnet (`https://100.x.y.z:6443`) y el API server no queda
expuesto a internet en absoluto.

### 5. Script de auditoria — `/workspace/k3s-audit/k3s-audit.sh`

```bash
#!/usr/bin/env bash
# Corre DENTRO de la VM de KiloClaw. kubectl y jq locales.
# Si usas Tailscale: exporta HTTPS_PROXY antes de llamarlo.
set -euo pipefail

export KUBECONFIG=/workspace/k3s-audit/kubeconfig.yaml
export PATH=/workspace/bin:$PATH

crashloop=$(kubectl get pods -A -o json | jq '[.items[]
  | select(.status.containerStatuses[]?.state.waiting.reason == "CrashLoopBackOff")
  | {ns: .metadata.namespace, pod: .metadata.name,
     restarts: (.status.containerStatuses[0].restartCount // 0)}]')

not_ready=$(kubectl get nodes -o json | jq '[.items[]
  | select(.status.conditions[] | select(.type=="Ready" and .status!="True"))
  | {node: .metadata.name,
     role: (.metadata.labels["node-role.kubernetes.io/control-plane"] // "worker")}]')

no_limits=$(kubectl get deploy -A -o json | jq '[.items[]
  | select(any(.spec.template.spec.containers[];
               .resources.limits == null or .resources.requests == null))
  | {ns: .metadata.namespace, deploy: .metadata.name}]')

latest_tags=$(kubectl get pods -A -o json | jq '[.items[]
  | .spec.containers[] as $c
  | select(($c.image | test(":latest$")) or ($c.image | contains(":") | not))
  | {ns: .metadata.namespace, pod: .metadata.name, image: $c.image}] | unique')

# Cert del API server: lo leemos por TLS desde el propio endpoint, sin acceso a ficheros.
api_host=$(kubectl config view --minify -o jsonpath='{.clusters[0].cluster.server}' \
  | sed -E 's#https?://##; s#/.*##')
cert_end=$(echo | openssl s_client -servername "${api_host%:*}" \
  -connect "$api_host" 2>/dev/null \
  | openssl x509 -noout -enddate | cut -d= -f2)
cert_days=$(( ( $(date -d "$cert_end" +%s) - $(date +%s) ) / 86400 ))

jq -n \
  --argjson crashloop "$crashloop" \
  --argjson not_ready "$not_ready" \
  --argjson no_limits "$no_limits" \
  --argjson latest_tags "$latest_tags" \
  --arg cert_days "$cert_days" \
  '{
    timestamp: (now | todate),
    cluster: "homelab-k3s",
    crashloop: $crashloop,
    not_ready_nodes: $not_ready,
    deployments_without_limits: $no_limits,
    latest_tag_images: $latest_tags,
    apiserver_cert_days_to_expiry: ($cert_days | tonumber)
  }' | tee /workspace/k3s-audit/last-run.json
```

### 6. Instalacion de `kubectl` y `jq` en `/workspace/bin` (si no vienen)

```bash
# <!-- VERIFICAR EN DEMO: KiloClaw permite curl a dl.k8s.io y escribe en /workspace/bin -->
mkdir -p /workspace/bin
curl -fsSL -o /workspace/bin/kubectl \
  "https://dl.k8s.io/release/$(curl -fsSL https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x /workspace/bin/kubectl

curl -fsSL -o /workspace/bin/jq \
  https://github.com/jqlang/jq/releases/latest/download/jq-linux-amd64
chmod +x /workspace/bin/jq

# Persistir PATH para cron
echo 'export PATH=/workspace/bin:$PATH' >> /workspace/.profile
```

### 7. Prompt para registrar el cron en KiloClaw

Esto se escribe literalmente en el chat del agente. No es un fichero.

```text
Registra un cron semanal con estos parametros:
- Horario: domingos a las 10:00 Europe/Madrid
- Accion: ejecutar /workspace/k3s-audit/k3s-audit.sh con
    PATH=/workspace/bin:$PATH y, si existe, HTTPS_PROXY=socks5://localhost:1055
- Leer el JSON que escribe en /workspace/k3s-audit/last-run.json
- Clasifica los hallazgos en tres niveles:
    - CRITICO: nodo control-plane NotReady, cert API server < 30 dias
    - WARNING: pods en CrashLoopBackOff, deployments sin requests/limits
    - INFO: imagenes con tag :latest
- Reporte: manda un resumen priorizado en Markdown a mi Telegram personal
  usando el tool message. Incluye timestamp y cluster.
- Si el script falla o kubectl no responde, mandame un aviso por Telegram
  con el error literal y stderr completo.
Devuelveme el ID del job y la fecha de proxima ejecucion.
```

### 8. Formato esperado del mensaje de Telegram

```markdown
*Auditoria k3s homelab — 2026-04-12 10:00*

*CRITICO*
- Nodo `k3s-master-01` NotReady desde hace 3h
- Cert API server caduca en 23 dias

*WARNING*
- 3 pods en CrashLoopBackOff en `test-apps`
  - `api-7d8f` (47 restarts)
  - `worker-2c1b` (12 restarts)
  - `cron-runner-9aa` (8 restarts)
- 14 deployments sin requests/limits

*INFO*
- 6 imagenes con tag :latest detectadas

Resumen: actua sobre el nodo master y renueva el cert esta semana.
```

---

## Checklist pre-grabacion (para Pablo)

- [ ] Demo privada: KiloClaw permite descargar `kubectl` y `jq` a `/workspace/bin` y ejecutarlos
- [ ] Demo privada: `/workspace/bin` y el PATH persisten tras reinicio/redeploy de la VM
- [ ] Demo privada: `kubectl` desde KiloClaw contra un API publico responde con latencia razonable (<2s)
- [ ] Demo privada: Tailscale userspace (`tailscaled --tun=userspace-networking`) arranca en la VM sin root y sin TUN
- [ ] Demo privada: `kubectl` via `HTTPS_PROXY=socks5://...` contra la IP tailscale del master funciona
- [ ] Demo privada: `cron` nativo de KiloClaw persiste tras reinicio
- [ ] Brian confirma: hay IP (o rango) de salida estable para KiloClaw, o rota
- [ ] Brian confirma: egress a puertos arbitrarios (6443, 41641/udp para Tailscale) permitido
- [ ] Brian confirma: politica de retention de Kilo Gateway (pegarla en descripcion)
- [ ] Brian confirma: libertad editorial del bloque de limites al 100% (incluye frase "para produccion ni de coña")
- [ ] Recibido el link de afiliado real
- [ ] Cluster k3s de pruebas preparado con 3 pods CrashLoop, 1 nodo NotReady y cert cercano a expirar
- [ ] Tailnet de pruebas con tag dedicado `tag:kiloclaw-audit` y ACL que solo permite 6443 al master
