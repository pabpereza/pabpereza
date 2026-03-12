# Guión de rodaje — OpenClaw + Agentes IA personales

**PR:** #257
**Blog post base:** `blog/2026/openclaw_agentes/openclaw_agentes.md` (rama `draft/openclaw-agentes-v2`)
**Duración estimada:** 16–17 min

---

## Instrucciones de uso

Documento de referencia para el rodaje. Cada bloque incluye:
- `[MM:SS]` — tiempo estimado en pantalla
- 🎙️ **Narración** — puntos clave (no texto literal; habla natural)
- 🖥️ **Pantalla** — qué se ve en cada momento
- 📌 **Notas de rodaje** — comandos exactos, ficheros, refs a renders de Merry

---

## 🎬 Sección 1 — Hook `[0:00–0:45]`

### `[0:00–0:20]`

🎙️ **Narración:**
- Abro Telegram y escribo una orden a Gandalf (el orquestador)
- Gandalf delega a Frodo: clona el repo, escribe el borrador, abre el PR en GitHub
- Todo mientras yo estaba haciendo otra cosa

🖥️ **Pantalla:**
- Screencast Telegram Desktop (o móvil): conversación con el bot → orden delegada
- Corte: GitHub → PR abierto por Frodo, rama `draft/`, fichero del post escrito

📌 **Notas de rodaje:**
- Grabar esta demo EN VIVO antes de grabar el resto del vídeo, con el sistema real
- El PR puede ser este mismo (rompe la cuarta pared — funciona muy bien)
- Tener screen recording de backup por si la demo en vivo falla

---

### `[0:20–0:45]`

🎙️ **Narración:**
- "Eso que acabas de ver lo monta cualquiera en una tarde"
- El nombre: La Compañía del Anillo — ocho agentes IA especializados, corriendo en mi homelab
- Hoy te explico cómo funciona, cómo lo monté y cómo puedes hacerlo tú
- "Soy Pablo de pabpereza"

🖥️ **Pantalla:**
- `openclaw-fellowship-reveal.mp4` — los ocho agentes apareciendo uno a uno, organizados en tres grupos
- [Visual generado] Logo pabpereza / intro

📌 **Notas de rodaje (Merry):**
- Fichero: `blog/2026/openclaw_agentes/renders/openclaw-fellowship-reveal.mp4`
- El orden de aparición: Gandalf primero, luego La Comarca, Los Guardianes, El Concilio Privado

---

## 🎬 Sección 2 — El problema con los asistentes SaaS `[0:45–2:30]`

### `[0:45–1:25]`

🎙️ **Narración:**
- ChatGPT y Claude son buenos — pero tienen un límite estructural: son SaaS
- Tus datos en sus servidores, sin acceso directo a tu infra, sin capacidad de actuar sobre herramientas reales
- Lo que yo necesitaba era diferente. Cuatro ejemplos concretos:
  1. `kubectl get nodes` en mi cluster y que me diga si algo está mal
  2. Clonar mi repo, escribir el borrador del post y abrirme un PR
  3. Respetar las restricciones alimentarias del menú familiar sin que yo se lo recuerde cada vez
  4. Todo desde Telegram. Todo en mi servidor.

🖥️ **Pantalla:**
- Cámara: Pablo hablando, tono de problema real que tiene solución
- Overlay de texto con los cuatro ejemplos mientras los lista

📌 **Notas de rodaje:**
- El tercer ejemplo (restricciones alimentarias) es el más humano — darle un segundo de pausa
- Tono: "esto no existía, lo construí" — no dramatizar

---

### `[1:25–2:00]`

🎙️ **Narración:**
- Eso no es un chatbot — es un sistema de agentes
- La diferencia clave: un chatbot contesta, un agente **hace**
- Tres olas de IA: Ola 1 (modelos), Ola 2 (chatbots con UX), Ola 3 (agentes que actúan)
- Estamos en la Ola 3

🖥️ **Pantalla:**
- `openclaw-tres-olas.mp4` — las tres olas de IA, animación

📌 **Notas de rodaje (Merry):**
- Fichero: `blog/2026/openclaw_agentes/renders/openclaw-tres-olas.mp4`
- Pablo narra encima mientras se ve la animación

---

### `[2:00–2:30]`

🎙️ **Narración:**
- El modelo centralizado tiene ventajas. Pero hay una pregunta que vale la pena hacerse: ¿quieres que tu contexto personal, tu infra, tus rutinas vivan en servidores de una empresa cuya prioridad no eres tú?
- No es paranoico. Es una decisión consciente.
- La herramienta: OpenClaw

🖥️ **Pantalla:**
- Cámara: Pablo, tono reflexivo

---

## 🎬 Sección 3 — ¿Qué es OpenClaw? `[2:30–4:00]`

### `[2:30–3:05]`

🎙️ **Narración:**
- Gateway self-hosted open source, licencia MIT
- La metáfora: "como un nginx, pero para agentes IA"
- Se sienta entre tus apps de mensajería (Telegram, WhatsApp, Discord) y el modelo de IA que elijas
- No tienes que escribir código — configuración en ficheros markdown

🖥️ **Pantalla:**
- `openclaw-gateway-flow.mp4` — flujo: Telegram/Discord → OpenClaw Gateway → modelo IA

📌 **Notas de rodaje (Merry):**
- Fichero: `blog/2026/openclaw_agentes/renders/openclaw-gateway-flow.mp4`
- Narrar encima del flujo mientras se anima de izquierda a derecha

---

### `[3:05–3:45]`

🎙️ **Narración:**
- Tabla comparativa: OpenClaw vs ChatGPT / Claude.ai
- Puntos clave: self-hosted ✅, open source MIT ✅, multi-canal ✅, multi-agente con routing ✅, control de datos ✅, coste pay-per-use ✅
- **Cuándo NO usar:** brainstorming rápido o email suelto → Claude directo es más rápido. OpenClaw brilla en automatización, contexto persistente, acciones reales.

🖥️ **Pantalla:**
- Tabla del blog post en pantalla completa (o render de Merry equivalente)

📌 **Notas de rodaje:**
- El punto de "cuándo NO usar" es importante para credibilidad — no saltarlo

---

### `[3:45–4:00]`

🎙️ **Narración:**
- El "Anillo Único": OpenClaw como el hub que conecta a todos los agentes
- Transición visual hacia la instalación

🖥️ **Pantalla:**
- `openclaw-one-ring-ia.mp4` — beat visual de transición

📌 **Notas de rodaje (Merry):**
- Fichero: `blog/2026/openclaw_agentes/renders/openclaw-one-ring-ia.mp4`
- Breve — 15 segundos máximo, es solo un beat de transición

---

## 🎬 Sección 4 — Instalación y onboarding `[4:00–6:00]`

### `[4:00–4:35]`

🎙️ **Narración:**
- Tres requisitos: Node.js ≥ 22, API key del proveedor de IA, bot de Telegram
- Tiempo real con los requisitos: 10 minutos

🖥️ **Pantalla:**
- Terminal limpio: `node --version` → v22.x.x
- BotFather en Telegram: flujo `/newbot` rápido

📌 **Notas de rodaje:**
- Terminal sin historial visible — usar entorno limpio
- BotFather: censurar el token real en post-producción

---

### `[4:35–5:15]`

🎙️ **Narración:**
- Instalación: dos opciones equivalentes
- `curl -fsSL https://openclaw.ai/install.sh | bash` (revisar el script antes si no ejecutas curl-pipe-bash a ciegas)
- O `npm install -g openclaw@latest`
- Verificación: `openclaw --version`

🖥️ **Pantalla:**
- Terminal: `npm install -g openclaw@latest` (más limpio para el vídeo)
- `openclaw --version` → número de versión

📌 **Notas de rodaje:**
- Grabar en entorno limpio — VM o usuario nuevo
- Jump cut sobre los segundos de instalación: no necesario ver todo el output

---

### `[5:15–5:50]`

🎙️ **Narración:**
- `openclaw onboard --install-daemon` — el comando que lo conecta todo
- Wizard interactivo: proveedor + API key, canal de mensajería (Telegram), nombre del agente
- Al terminar: `openclaw gateway status` — servicio activo

🖥️ **Pantalla:**
- Terminal: wizard de onboarding completo, los tres pasos visibles
- `openclaw gateway status` → `Active: active (running)` en verde

📌 **Notas de rodaje:**
- Censurar la API key durante el wizard — blur o corte en montaje
- Censurar el token de Telegram
- Pausa en el `Active: active (running)` — primer momento de "funciona"

---

### `[5:50–6:00]`

🎙️ **Narración:**
- Ir a Telegram y mandar "hola" al bot → responde
- "Diez minutos, de cero a agente funcional. Pero ahora mismo es genérico — vamos a darle personalidad"

🖥️ **Pantalla:**
- Telegram Desktop: el bot responde al primer mensaje

---

## 🎬 Sección 5 — El workspace `[6:00–9:00]`

### `[6:00–6:20]`

🎙️ **Narración:**
- El workspace: `~/.openclaw/workspace/` — carpeta con ficheros markdown que el agente carga al inicio de cada sesión
- Árbol de ficheros: SOUL.md, USER.md, AGENTS.md, IDENTITY.md, TOOLS.md (+ MEMORY y HEARTBEAT que veremos al final)
- No tienes que tocar código — todo es texto plano

🖥️ **Pantalla:**
- Terminal: `ls ~/.openclaw/workspace/` → árbol de ficheros
- `openclaw-workspace-files.mp4` — los ficheros con descripción visual animada

📌 **Notas de rodaje (Merry):**
- Fichero: `blog/2026/openclaw_agentes/renders/openclaw-workspace-files.mp4`

---

### `[6:20–7:10]` — SOUL.md y USER.md

🎙️ **Narración:**
- **SOUL.md** — cómo actúa el agente, no qué sabe. La diferencia práctica: sin SOUL.md el agente empieza con "¡Claro, estaré encantado de ayudarte!". Con él, va al grano. En cien interacciones diarias, eso importa.
- Líneas clave de mi config: `"Be genuinely helpful, not performatively helpful. Skip the 'Great question!' — just help."` + las restricciones (privacidad, confirmación antes de actuar externo)
- **USER.md** — quién eres tú. El agente lo lee al arrancar. Ejemplo real: "Pareja embarazada → restricciones alimentarias activas". Sam las lee automáticamente al generar el menú semanal. Sin recordárselas cada vez.

🖥️ **Pantalla:**
- Editor abierto: SOUL.md — zoom en las líneas clave
- Editor: USER.md — con los campos reales (no sensibles)

📌 **Notas de rodaje:**
- Mostrar el SOUL.md real del sistema — es producción, no demo
- En USER.md: censurar datos personales sensibles si los hay

---

### `[7:10–7:55]` — AGENTS.md e IDENTITY.md

🎙️ **Narración:**
- **AGENTS.md** — manual de operaciones. La distinción más importante: External vs Internal. Acciones internas (leer ficheros, buscar en web, explorar) son libres. Acciones externas (emails, tweets, publicar) requieren confirmación. Esa línea separa un agente que ayuda de uno que da sustos.
- **IDENTITY.md** — el nombre y el personaje. Por qué Tolkien: si vas a pasar horas diseñando un sistema de agentes, que sea entretenido. Y la coherencia de personalidad tiene valor real — el agente responde de forma predecible.

🖥️ **Pantalla:**
- Editor: AGENTS.md — sección External vs Internal
- Editor: IDENTITY.md — nombre, criatura, vibe, emoji (ejemplo de Gandalf)

---

### `[7:55–8:40]` — TOOLS.md y demo workspace en acción

🎙️ **Narración:**
- **TOOLS.md** — setup local. IPs de servidores, repos clave, herramientas en el PATH. Lo que es específico de tu entorno y no encaja en ningún otro fichero.
- Demo en vivo: pregunto a Gandalf algo que requiere contexto del workspace. El agente responde sin que yo le explique — "tu cluster tiene 6 nodos Pi en K3s". No tengo que presentarme en cada conversación.

🖥️ **Pantalla:**
- Editor: TOOLS.md — tabla de repos y homelab
- Telegram: conversación donde el agente usa contexto de USER.md o TOOLS.md sin pedírselo

📌 **Notas de rodaje:**
- Preparar una pregunta que demuestre claramente el uso del workspace: "¿Cuántos nodos tiene mi cluster?" → respuesta directa con el dato del fichero

---

### `[8:40–9:00]` — Mínimo viable y transición

🎙️ **Narración:**
- SOUL.md + USER.md: diez minutos de configuración, impacto desde el primer día
- No intentar montar los ocho agentes desde el día uno — un agente bien configurado vale más que ocho a medias
- Hay dos ficheros más — MEMORY.md y HEARTBEAT.md — que cubriré en el bloque de la Compañía porque encajan mejor en contexto multi-agente

🖥️ **Pantalla:**
- Cámara: Pablo, tono de consejo práctico

---

## 🎬 Sección 6 — La Compañía del Anillo: arquitectura multi-agente `[9:00–13:00]`

### `[9:00–9:25]`

🎙️ **Narración:**
- OpenClaw permite múltiples agentes, cada uno con workspace propio, herramientas específicas y dominio de responsabilidad
- Los organicé en tres grupos: La Comarca (contenido), Los Guardianes (infra), El Concilio Privado (personal)
- Por qué tres dominios: seguridad (Sam no necesita acceso al K3s), rendimiento (contexto específico → mejor respuesta), claridad (sé exactamente a quién preguntarle qué)

🖥️ **Pantalla:**
- `openclaw-fellowship-reveal.mp4` si queda tiempo del hook, o diagrama estático de los tres grupos

---

### `[9:25–10:20]` — La Comarca (Frodo, Merry, Pippin)

🎙️ **Narración:**
- **Frodo** — guiones y blog posts. Repo `pabpereza/pabpereza`. Regla: solo ramas `draft/`, nunca merge a main sin aprobación mía.
- **Merry** — visuales: thumbnails, diagramas, animaciones Remotion. Lo que estás viendo ahora mismo es trabajo de Merry.
- **Pippin** — redes sociales: X, LinkedIn, YouTube Community. Lo que escribe Frodo, Pippin lo adapta para cada plataforma.
- Pipeline completo: Telegram → Gandalf → Frodo → PR en GitHub → Pablo revisa → merge → publicación automática

🖥️ **Pantalla:**
- Diagrama del pipeline del blog post (Mermaid flowchart)
- GitHub: PR real abierto por Frodo con rama `draft/`

📌 **Notas de rodaje:**
- Mostrar el PR real de este mismo vídeo si existe — rompe la cuarta pared, muy efectivo
- El pipeline Frodo → PR → revisión → publicación es el flujo más visual de todo el vídeo

---

### `[10:20–11:15]` — Los Guardianes (Gimli, Legolas, Boromir)

🎙️ **Narración:**
- **Gimli** — homelab. `kubectl`, `docker`, `ansible`. Heartbeat cada 30 minutos: estado del cluster, uso de recursos. Si algo está mal, me lo dice antes de que yo lo note.
- **Legolas** — research y SEO. Los datos de keywords y fuentes detrás de este vídeo los encontró Legolas.
- **Boromir** — revisión de código y PRs. Análisis estático, linters.

🖥️ **Pantalla:**
- `openclaw-homelab-map.mp4` — arquitectura del homelab: castle (x86_64) + cluster K3s

📌 **Notas de rodaje (Merry):**
- Fichero: `blog/2026/openclaw_agentes/renders/openclaw-homelab-map.mp4`
- Narrar encima de la animación

---

### `[11:15–11:55]` — El Concilio Privado (Sam, Aragorn)

🎙️ **Narración:**
- **Sam** — nutrición, menú semanal familiar. La línea de USER.md con las restricciones alimentarias: Sam la lee cada vez que genera el menú. Sin recordárselo. Nunca.
- **Aragorn** — estudios (UNIR) y certificaciones. Contexto académico que ningún otro agente necesita.
- La separación es seguridad: Sam no tiene acceso a la infra. Gimli no tiene las restricciones dietéticas de mi pareja.

🖥️ **Pantalla:**
- Cámara: Pablo explicando la separación de dominios
- Diagrama de los tres grupos con el scope de acceso de cada uno (overlay o imagen estática)

---

### `[11:55–12:30]` — MEMORY.md y HEARTBEAT.md en contexto multi-agente

🎙️ **Narración:**
- **MEMORY.md** — memoria curada a largo plazo. Solo se carga en sesión principal (seguridad: no se filtra en chats grupales). El agente puede leerla y actualizarla.
- **HEARTBEAT.md** — checklist periódico. Gimli lo usa para los checks de cluster cada 30 min. Sam para revisar el inventario de la nevera. Si hay algo que comunicar, lo hace. Si no, silencio.

🖥️ **Pantalla:**
- Editor: MEMORY.md de Gandalf — entradas de ejemplo
- Editor: HEARTBEAT.md de Gimli — checklist de infra

---

### `[12:30–13:00]` — Routing entre agentes

🎙️ **Narración:**
- Gandalf es el orquestador. Le hablo a él, él decide qué agente gestiona la tarea — sin que yo lo especifique cada vez.
- El contexto de la conversación guía el routing: si hablo de un PR → Frodo. Si hablo del cluster → Gimli.
- Demo: dos órdenes diferentes, dos agentes diferentes respondiendo

🖥️ **Pantalla:**
- Telegram: conversaciones con diferentes agentes desde el mismo canal — el routing visible

📌 **Notas de rodaje:**
- Preparar dos mensajes de demo: uno de contenido (para Frodo), otro de infra (para Gimli)

---

## 🎬 Sección 7 — Integración real con GitHub `[13:00–15:00]`

### `[13:00–13:50]`

🎙️ **Narración:**
- Este es el diferenciador que más me importa: los agentes no usan GitHub para leer documentación — actúan sobre él
- Frodo tiene acceso read-write a `pabpereza/pabpereza`. Regla explícita en AGENTS.md: crear ramas con prefijo `draft/`, nunca hacer merge a main sin aprobación mía
- El control final siempre está en mis manos. Los agentes proponen, yo decido.

🖥️ **Pantalla:**
- GitHub: PR real abierto por Frodo — rama `draft/nombre-video`, body estándar, diff con el fichero markdown escrito por el agente

📌 **Notas de rodaje:**
- Usar el PR real de este vídeo si está disponible
- Mostrar el diff — ver el texto del post escrito por el agente es el momento más impactante

---

### `[13:50–14:30]`

🎙️ **Narración:**
- Para Gimli las restricciones son más estrictas: puede leer el repo de homelab y hacer commits en feature branches, pero cualquier cambio en infraestructura de producción requiere confirmación explícita
- No hay accidentes con `kubectl delete` porque el agente lo decide solo
- La capa de seguridad más importante: las restricciones en AGENTS.md, no la confianza ciega en el modelo

🖥️ **Pantalla:**
- Editor: AGENTS.md de Gimli — sección de confirmaciones requeridas para acciones de producción

---

### `[14:30–15:00]`

🎙️ **Narración:**
- El pipeline completo: Pablo → Telegram → Gandalf → agente especializado → herramienta real → resultado
- Sin fricción manual en el proceso de publicación
- Sin accidentes en infra porque las restricciones están bien configuradas

🖥️ **Pantalla:**
- Diagrama del pipeline completo animado (del blog post o render de Merry)

---

## 🎬 Sección 8 — Cierre: Ola 3 de IA y cómo empezar `[15:00–17:00]`

### `[15:00–15:45]`

🎙️ **Narración:**
- Ola 3: los agentes no solo responden, actúan. La diferencia es cualitativa, no cuantitativa.
- OpenClaw es infraestructura de producción para esta ola — no un framework donde construyes todo desde cero
- Mi visión a 6 meses: Gimli gestionando alertas solo, Frodo abriendo PRs de forma proactiva, Sam ajustando el menú según el inventario. Todo técnicamente posible hoy.
- El modelo SaaS en la nube vs self-hosted: no es una posición de paranoia, es una elección consciente sobre dónde viven tus datos

🖥️ **Pantalla:**
- Cámara: Pablo, tono de conclusión con visión de futuro

---

### `[15:45–16:20]`

🎙️ **Narración:**
- Cómo empezar hoy — cinco pasos en orden:
  1. Instala OpenClaw, configura Telegram
  2. Escribe SOUL.md y USER.md (10 min, impacto inmediato)
  3. Configura AGENTS.md con las restricciones que te importan
  4. Añade el primer agente especializado — el que más valor te aporte primero
  5. Itera. Los workspace files evolucionan con el uso.
- "No intentes montar los ocho agentes desde el día uno"

🖥️ **Pantalla:**
- Overlay: lista de los 5 pasos
- Cámara: Pablo

---

### `[16:20–16:45]`

🎙️ **Narración:**
- Pregunta para los comentarios: ¿qué agente montarías primero?
- Links en la descripción: repositorio OpenClaw, documentación, repo de homelab

🖥️ **Pantalla:**
- Cámara

---

### `[16:45–17:00]`

🎙️ **Narración:**
- "Si quieres empezar desde cero con la instalación, el vídeo está aquí arriba"
- "¡Hasta la próxima!"

🖥️ **Pantalla:**
- [Cámara / Screencast] Thumbnail del vídeo de instalación (PR #259)

---

## 📋 Checklist de rodaje

### Antes de grabar
- [ ] Demo del hook grabada en vivo (Telegram → PR abierto) — o screen recording de backup
- [ ] Entorno de instalación limpio: VM o usuario nuevo sin Node
- [ ] API key de prueba (sin créditos reales) para el wizard de onboarding
- [ ] Token de BotFather de prueba (censurar en post)
- [ ] Workspace files reales preparados para mostrar (SOUL, USER, AGENTS, IDENTITY, TOOLS de Gandalf)
- [ ] PR real de Frodo disponible para el bloque 7

### Renders de Merry — todos necesarios para este vídeo
| Render | Sección | Fichero |
|--------|---------|---------|
| `openclaw-fellowship-reveal.mp4` | Hook 0:20 | `blog/2026/openclaw_agentes/renders/` |
| `openclaw-tres-olas.mp4` | Bloque 2 — 1:25 | ídem |
| `openclaw-gateway-flow.mp4` | Bloque 3 — 2:30 | ídem |
| `openclaw-one-ring-ia.mp4` | Bloque 3 — 3:45 | ídem |
| `openclaw-workspace-files.mp4` | Bloque 5 — 6:00 | ídem |
| `openclaw-homelab-map.mp4` | Bloque 6 — 10:20 | ídem |

### Censurar en post-producción
- [ ] API key en el wizard de onboarding
- [ ] Token de Telegram (BotFather + wizard)
- [ ] Datos personales sensibles en USER.md si se muestran
