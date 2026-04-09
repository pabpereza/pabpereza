# Research: KiloClaw para DevSecOps

## Resumen ejecutivo
KiloClaw es la version hosted de OpenClaw (agente personal autonomo open
source). Por 9 USD al mes Kilo te provisiona una VM dedicada (2 vCPU
compartidas, 3 GB RAM, 10 GB SSD) con un agente que tiene shell, cron,
navegador headless, filesystem persistente y conectores a mas de 50 canales
de chat (Telegram, Slack, Discord, WhatsApp, Matrix, Signal, Teams...).
Marketing lo vende como "asistente personal" que te pide la compra y te ordena
el correo, pero tecnicamente es una caja Linux con LLM pegado y webhooks de
chat — y eso es exactamente lo que un sysadmin puede usar de forma creativa.
Ese es el angulo del video.

## Que es KiloClaw exactamente
- **Upstream**: OpenClaw, proyecto open source de Peter Steinberger lanzado en
  noviembre 2025.
- **KiloClaw**: despliegue hosted operado por Kilo, anunciado 24 de febrero de
  2026. Beta publica. 9 USD/mes (primer mes 4 USD, trial 7 dias sin tarjeta).
- **Unificacion**: usa Kilo Gateway para inferencia (500+ modelos, 0% markup)
  y billing compartido con Kilo Code.
- **No es Kilo Code**. Kilo Code es el agente de coding VS Code/JetBrains.
  KiloClaw no hace coding asistido en tu repo — es otro producto totalmente.

## Specs reales del sandbox hosted
Documentado en kilo.ai/docs/kiloclaw/overview:
- 2 vCPU compartidas
- 3 GB RAM
- 10 GB SSD persistente
- Instancia "dedicada" (pero con vCPU compartidas — asumir ruido)
- Navegador headless Chromium preinstalado
- Perfil de herramientas "full" por defecto: filesystem, shell, browser,
  web search, generacion multimedia
- Estado: Beta

No hay informacion publica sobre la base de imagen (probablemente Linux, Node
24 segun requisitos del upstream OpenClaw). No hay SLAs documentados.

## Herramientas (tools) del agente — lista verificada
Documentado en docs.openclaw.ai/tools:
- `exec` / `process`: shell commands y procesos en background
- `code_execution`: Python remoto sandboxed
- `browser`: Chromium headless (navegar, click, screenshot)
- `web_search` / `web_fetch` / `x_search`: busqueda y scraping
- `read` / `write` / `edit` / `apply_patch`: filesystem en workspace
- `message`: enviar a cualquier canal conectado
- `cron`: jobs programados
- `gateway`: gestionar la propia instancia
- `sessions_*` / `subagents` / `agents_list`: subagentes
- `image_*` / `music_generate` / `video_generate` / `tts`: multimedia

**Lo que NO aparece explicitamente en los docs**:
- **MCP**: no esta listado como tool built-in. Puede estar soportado via plugin
  pero no esta documentado. **Pendiente verificar con Brian.**
- **Webhooks HTTP nativos (inbound/outbound)**: no hay un tool "webhook". Los
  outbound se hacen via `exec` (curl) o `web_fetch`. Los inbound dependen del
  canal de chat o de que la instancia expone algun puerto — **no documentado**.
- **SSH entrante**: no documentado. Tu no entras por SSH a la VM. Acceso via
  Web UI y CLI de Kilo.
- **SSH saliente**: no listado como tool, pero al tener shell real y Node/
  binarios estandar, lanzar `ssh` como `exec` es posible. **A verificar en
  la demo antes de afirmarlo en camara.**

## Canales de mensajeria soportados
Verificado en docs.openclaw.ai:
Discord, Google Chat, iMessage, Matrix, Microsoft Teams, Signal, Slack,
Telegram, WhatsApp, Zalo, WebChat, Nostr, Twitch, Feishu. Plus plugins de
canal externos.

Blog launch de KiloClaw menciona "50+ chat platforms". En la landing de
KiloClaw los destacados son Telegram, Slack, Discord y email.

## Como funciona (modelo mental DevOps)
Piensa en KiloClaw como un **VPS enano manejado por un LLM**:

```
     Telegram/Slack/Discord (inbound)
              |
     [  KiloClaw VM en la nube de Kilo  ]
     [  LLM (Claude/GPT/Gemini) + tools ]
     [  shell, cron, chromium, fs 10GB  ]
              |
        egress salida a Internet
              |
     APIs publicas | tu API privada con token | webhook | SSH saliente
```

El agente es el operador. Tu le hablas por chat. El ejecuta `curl`, `ssh`,
`kubectl`, lo que sea, desde su shell. El reporte te vuelve por el mismo chat
o por otro canal. Cron permite disparos sin que tu hables.

## Casos de uso reales para perfil DevSecOps / sysadmin
Los 3-4 angulos de integracion organica con el canal:

### 1. Bot de chat que lanza runbooks Ansible bajo demanda
**Idea**: tienes un grupo de Telegram del curro. Escribes `@bot reinicia
nginx en prod`. KiloClaw lo recibe, valida el comando contra una whitelist
escrita en su filesystem, y ejecuta `ansible-playbook` via SSH saliente
contra tu bastion publico (o un endpoint que tu ya expones). Reporta
resultado por el mismo grupo.

- **Realizable con**: `exec` (ssh + ansible), `message` (respuesta Telegram)
- **Riesgos**: credenciales SSH en la VM de Kilo. Usar cuenta de servicio con
  permisos minimos y comandos restringidos (ForceCommand en sshd).
- **Verificable**: si `ansible` esta disponible o hay que instalarlo via
  `exec`. Si el workspace persiste entre reinicios, que los docs dicen que si.

### 2. Triage de alertas Prometheus/Alertmanager
**Idea**: Alertmanager envia webhooks a un canal de chat publico (Discord,
Slack) donde KiloClaw escucha. Cuando llega una alerta, el agente la lee,
correlaciona con logs via `curl` al endpoint Loki publico, decide severidad,
y responde en el hilo con un resumen o un comando propuesto. Para alertas
criticas, llama tambien a tu WhatsApp.

- **Realizable con**: canal Slack/Discord como trigger, `web_fetch`/`exec
  curl` contra Loki o Grafana API, `message` multicanal.
- **Riesgos**: token de Grafana/Loki en la VM. Scope read-only.
- **Por validar**: si el agente puede reaccionar en tiempo real al webhook
  o solo cuando el LLM procesa el mensaje del canal. Latencia esperada
  segundos, no milisegundos.

### 3. Auditoria semanal de cluster k3s / homelab + reporte
**Idea**: `cron` semanal domingo 10:00. El agente lanza via SSH saliente
`kubectl get events`, `kubectl top nodes`, `docker system df`, revisa
certs proximos a expirar, mira uso de disco en el NAS, genera un resumen
en lenguaje natural y lo manda a tu Telegram personal.

- **Realizable con**: `cron`, `exec`, `message`.
- **Riesgos**: kubeconfig en VM ajena. Usar SA read-only con RBAC minimo.
- **Valor**: este caso es **100% verificable en el video** sin demo de
  nada privado porque se puede rodar contra un k3s de test.

### 4. "Segundo par de ojos" para PRs de IaC y supply chain
**Idea**: cuando alguien abre un PR en un repo de Terraform/Ansible, un
webhook de GitHub avisa a un canal. KiloClaw lee el diff via `web_fetch`
a la API publica de GitHub, corre checks (regex de secretos, tflint si lo
instala en /workspace, politicas custom), y deja un comentario.

- **Realizable con**: `web_fetch` (GitHub API), `exec` (tflint, gitleaks),
  `message`.
- **Observacion**: esto lo hace mejor una action de CI. Pero si eres un
  homelabber sin runner propio, KiloClaw puede ser un runner barato-ish.
  **Hay que enmarcarlo honestamente** — no estamos sustituyendo CI serio.

### 5. (Stretch) Recepcionista de notificaciones y filtro
**Idea**: todas las alertas de servicios personales (UptimeKuma, Uptime
Robot, Healthchecks.io, Sentry) entran a un canal. KiloClaw deduplica,
agrupa, distingue ruido de senal, y solo te escribe en WhatsApp lo
realmente urgente. El resto queda en el canal como log.

- **Realizable con**: canal de chat como bus, `message` al canal ruidoso
  vs WhatsApp personal con priorizacion.
- **Este caso probablemente es el mas honesto del video** porque aprovecha
  lo unico donde un LLM anade valor real: filtrar ruido.

## Limites reales del producto (la parte honesta)
**Escribirlos en el video sin suavizarlos.**

1. **Sandbox en la nube de Kilo**: el agente NO corre en tu maquina.
   Cualquier acceso a tu infra es outbound (SSH, API, VPN saliente).
   No puedes meter la VM de KiloClaw dentro de tu red privada sin abrir
   algo hacia fuera.
2. **2 vCPU / 3 GB RAM**: suficiente para scripts y shell, insuficiente para
   compilar imagenes, correr builds, o cargas pesadas. No es un runner de CI.
3. **10 GB SSD**: espacio para logs, binarios auxiliares, workspace. No para
   backups.
4. **vCPU compartidas**: esperar ruido de vecinos. No apto para tareas
   sensibles a latencia.
5. **Beta**: producto de semanas. Esperar bugs, downtime, cambios de API.
6. **Sin SSH entrante**: no puedes pushear codigo ni meter ficheros por scp
   como en un VPS normal. Todo entra por Web UI / CLI de Kilo o por el
   propio agente via `web_fetch` / `exec curl`.
7. **MCP no documentado como built-in**: si contabas con MCP para conectar
   herramientas, hay que verificar. Puede venir por plugin.
8. **Webhooks HTTP inbound no documentados**: la instancia no expone puerto
   publico documentado para recibir webhooks arbitrarios. Los triggers son
   los canales de chat y el cron. Si necesitas recibir un webhook de
   Alertmanager o GitHub, lo enruta un canal intermedio (Slack, Discord) o
   un servicio tipo ntfy/Pipedream que lo convierta a mensaje.
9. **Privacidad**: el LLM lee todo lo que pasa por ahi. Tus comandos,
   tus logs, tus tokens si no los gestionas con cuidado. Politica de
   retention de Kilo Gateway **no verificada**, pedir a Brian.
10. **Credenciales**: la VM es un blast radius. Si se compromete, tus
    tokens SSH/k8s/API estan expuestos. Usar siempre cuentas de servicio
    con scope minimo y rotacion corta.
11. **Compliance**: para empresa con datos regulados, este modelo hosted
    compartido no va a pasar una auditoria. Para eso existe KiloClaw for
    Organizations o OpenClaw self-hosted. Mencion en el video de 30s.

## Veredicto del investigador
**Encaja con el canal? Si, con condiciones.**

Tratado como "asistente personal que ordena el correo", el video no encaja.
Es contenido B2C genericos que se ha visto mil veces.

Tratado como "caja Linux con LLM y chat bot a 9 USD/mes para automatizar
tu homelab y tu guardia", encaja perfectamente con la audiencia de DevOps.
Es un contenido que **nadie esta haciendo en espanol**, el producto es
real, las tools estan documentadas, y hay 3-4 casos de uso honestos que
se pueden rodar.

**Condicion dura**: el video tiene que dedicar minimo 3 minutos a los
limites reales y a seguridad. Si el patrocinador no acepta eso, matar
el video. Un patrocinio que te obliga a vender algo que no es adecuado
para tu audiencia quema mas credibilidad de la que compra.

**Segunda condicion**: antes del rodaje hay que hacer una demo privada
verificando: (a) que `ssh` y `ansible` se pueden lanzar desde `exec`
hacia un bastion publico, (b) latencia de reaccion a mensajes de canal,
(c) que `cron` dispara sin intervencion, (d) persistencia del workspace
entre reinicios. Si alguno de esos cuatro falla, el guion cambia.

## Preguntas pendientes para Brian (sponsor)
1. MCP: soportado en KiloClaw hosted? Via plugin? Que plugins vienen
   instalados por defecto?
2. Webhooks inbound: hay forma oficial de enviar un HTTP POST a la
   instancia, o el unico trigger externo es un canal de chat + cron?
3. Network egress: hay restricciones de puertos salientes? SSH saliente
   (22) esta permitido? Conexiones UDP? Wireguard userspace?
4. Persistencia: el workspace de 10 GB sobrevive a reinicios y redeploys?
   Hay snapshot/backup?
5. Retention de logs y de prompts en Kilo Gateway. Politica para KiloClaw.
6. SLA, uptime historico del beta, plan de GA.
7. Tiene terminal interactiva en Web UI para yo depurar, o solo chat
   con el agente?
8. Precio real del upgrade — los "creditos mensuales" que ofrecen en el
   pitch que cubren exactamente.
9. Libertad editorial: puedo decir en camara que para CI serio esto no
   sirve y que n8n puede ser mas flexible?
10. Terminos del afiliado y disclosure.

## Fuentes
- Landing KiloClaw: https://kilo.ai/kiloclaw
- Docs KiloClaw overview: https://kilo.ai/docs/kiloclaw/overview
- Blog launch KiloClaw: https://blog.kilo.ai/p/hosted-openclaw-in-60-seconds
- Docs OpenClaw: https://docs.openclaw.ai/
- Docs OpenClaw tools: https://docs.openclaw.ai/tools
- Repo OpenClaw: https://github.com/openclaw/openclaw
- VentureBeat launch: https://venturebeat.com/orchestration/kilo-launches-kiloclaw-allowing-anyone-to-deploy-hosted-openclaw-agents-into
- VentureBeat Organizations: https://venturebeat.com/orchestration/the-end-of-shadow-ai-at-enterprises-kilo-launches-kiloclaw-for-organizations
- HackerNoon: https://hackernoon.com/openclaw-changed-how-we-use-ai-kiloclaw-made-it-effortless-to-get-started

## Notas de verificacion
- Specs 2vCPU/3GB/10GB: **verificado** en kilo.ai/docs/kiloclaw/overview.
- Tools list (exec, cron, browser, message, etc): **verificado** en
  docs.openclaw.ai/tools.
- Canales de chat (50+ listados): **verificado** en docs.openclaw.ai.
- Pricing 9 USD/mes + trial: **verificado** landing.
- MCP / webhooks inbound / SSH saliente: **NO verificado**, son el bloque
  de preguntas criticas para Brian antes de rodar.
- Los 5 casos de uso propuestos: **plausibles segun tools documentadas**,
  pero ninguno rodado todavia. Hay que validar en demo privada antes
  de prometer nada en camara.
