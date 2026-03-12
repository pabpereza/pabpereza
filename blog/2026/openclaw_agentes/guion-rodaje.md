# Guión de rodaje — OpenClaw + Agentes IA personales

**PR:** #257 | **Issue:** referenciado en PR
**Blog post base:** `blog/2026/openclaw_agentes/openclaw_agentes.md`
**Duración estimada:** 16–18 min (deep dive)

---

## Instrucciones de uso

Este documento es el guión de rodaje para grabar el vídeo en orden. Cada bloque tiene:
- **Tiempo estimado** en pantalla
- **Narración** — puntos clave a cubrir (no texto literal; habla natural)
- **Pantalla** — qué debe verse en cada momento
- **Notas de rodaje** — comandos exactos, ficheros, o instrucciones para Merry

---

## 🎬 BLOQUE 0 — Hook `[0:00–0:45]`

---

### `[0:00–0:15]`
**🎙️ Narración:**
- Abro Telegram en el móvil y escribo una orden a Gandalf (mi agente orquestador)
- Gandalf delega a Frodo, que clona el repo, escribe el borrador y abre un PR en GitHub
- Todo mientras yo estaba haciendo otra cosa

**🖥️ Pantalla:**
- Screencast del móvil (o Telegram Desktop): conversación con el bot
- Corte a: GitHub — PR abierto por Frodo con la rama `draft/openclaw-agentes`
- Corte a: El blog post ya escrito en el PR

**📌 Notas de rodaje:**
- Grabar esta demo EN VIVO antes de grabar el resto del vídeo, con el sistema real
- El PR que aparece puede ser este mismo — rompe la cuarta pared de forma natural
- Si la demo en vivo no funciona a la primera, tener un screen recording preparado como backup

---

### `[0:15–0:32]`
**🎙️ Narración:**
- "Eso que acabas de ver lo monta cualquiera en una tarde"
- El nombre: La Compañía del Anillo — ocho agentes IA especializados corriendo en mi homelab
- Hoy te explico cómo funciona, cómo lo monté y cómo puedes hacerlo tú

**🖥️ Pantalla:**
- Render de Merry: diagrama de La Compañía — los ocho agentes organizados en tres grupos
- Ver nota Merry ↓

**📌 Notas de rodaje (Merry):**
- Render: `openclaw-fellowship-reveal` — animación del diagrama de la Compañía apareciendo agente a agente
- Usar el render ya existente en `blog/2026/openclaw_agentes/renders/openclaw-fellowship-reveal.gif`
- El orden de aparición: Gandalf primero, luego los grupos

---

### `[0:32–0:45]`
**🎙️ Narración:**
- "Soy Pablo de pabpereza"
- Breve contexto: canal de DevOps y seguridad, y este vídeo es el tutorial técnico completo

**🖥️ Pantalla:**
- [Visual generado] Logo pabpereza / intro

---

## 🎬 BLOQUE 1 — El problema con los asistentes SaaS `[0:45–2:30]`

---

### `[0:45–1:20]`
**🎙️ Narración:**
- ChatGPT y Claude son buenos. Pero tienen un límite estructural
- Son SaaS: tus datos en sus servidores, sin acceso a tu infra, sin capacidad de actuar
- Yo necesitaba algo diferente — cuatro ejemplos concretos:
  1. `kubectl get nodes` y que me diga si algo está mal
  2. Clonar el repo, escribir el borrador y abrir un PR
  3. Respetar las restricciones alimentarias al generar el menú, sin recordárselo cada vez
  4. Todo desde Telegram, todo en mi servidor

**🖥️ Pantalla:**
- Cámara: Pablo hablando, tono de problema real que tiene solución
- Cuando lista los cuatro ejemplos: texto en pantalla con cada punto (overlay)

**📌 Notas de rodaje:**
- El tercer ejemplo (restricciones alimentarias) es el más "humano" — darle un segundo más de pausa para que aterrice
- No hace falta dramatizar el "problema"; el tono es "esto no existía, lo construí"

---

### `[1:20–2:00]`
**🎙️ Narración:**
- Eso no es un chatbot. Es un sistema de agentes
- La diferencia clave: un chatbot contesta, un agente **hace**
- Ola 3 de IA — breve introducción al concepto

**🖥️ Pantalla:**
- Render de Merry: `openclaw-tres-olas` — las tres olas de IA (Ola 1: modelos, Ola 2: chatbots UX, Ola 3: agentes que actúan)

**📌 Notas de rodaje (Merry):**
- Render existente: `blog/2026/openclaw_agentes/renders/openclaw-tres-olas.gif`
- Narrar encima del render mientras se ve la animación

---

### `[2:00–2:30]`
**🎙️ Narración:**
- El modelo centralizado en la nube tiene ventajas — no estoy en contra
- Pero hay una pregunta que vale la pena hacerse: ¿quieres que tu contexto personal, tu infraestructura, tus rutinas vivan en servidores de una empresa cuya prioridad no eres tú?
- No es paranoico. Es una decisión consciente
- La herramienta que lo habilita: OpenClaw

**🖥️ Pantalla:**
- Cámara: Pablo, tono reflexivo pero no alarmista

---

## 🎬 BLOQUE 2 — ¿Qué es OpenClaw? `[2:30–4:00]`

---

### `[2:30–3:00]`
**🎙️ Narración:**
- Gateway self-hosted open source, licencia MIT
- La metáfora: "como un nginx, pero para agentes IA"
- Se sienta entre tus apps de mensajería y el modelo de IA que elijas
- No tienes que escribir código — configuración en ficheros markdown

**🖥️ Pantalla:**
- Render de Merry: `openclaw-gateway-flow` — diagrama del flujo: Telegram/Discord → OpenClaw Gateway → modelo IA

**📌 Notas de rodaje (Merry):**
- Render existente: `blog/2026/openclaw_agentes/renders/openclaw-gateway-flow.gif`
- Mostrar el flujo de izquierda a derecha mientras Pablo narra

---

### `[3:00–3:40]`
**🎙️ Narración:**
- Tabla comparativa: OpenClaw vs ChatGPT / Claude.ai
- Recorrer los puntos clave: self-hosted, open source, multi-canal, multi-agente con routing, control total de datos, coste pay-per-use
- **Cuándo NO usar OpenClaw:** brainstorming rápido, email suelto — Claude directo es más rápido

**🖥️ Pantalla:**
- Render de Merry: tabla comparativa (o mostrar directamente desde el blog post)
- Alternativamente: pantalla con la tabla del post en el blog

**📌 Notas de rodaje:**
- El punto de "cuándo NO usar" es importante para credibilidad — no vender como la solución a todo

---

### `[3:40–4:00]`
**🎙️ Narración:**
- Rápido: el one-ring visual — OpenClaw como el "Anillo Único" que conecta a todos los agentes
- Transición a instalación

**🖥️ Pantalla:**
- Render de Merry: `openclaw-one-ring-ia`

**📌 Notas de rodaje (Merry):**
- Render existente: `blog/2026/openclaw_agentes/renders/openclaw-one-ring-ia.gif`
- Breve, 15-20 segundos máximo — es un beat visual de transición, no un bloque informativo

---

## 🎬 BLOQUE 3 — Instalación y onboarding `[4:00–6:00]`

---

### `[4:00–4:30]`
**🎙️ Narración:**
- Requisitos: Node.js ≥ 22, API key (Anthropic/OpenAI/etc.), bot de Telegram
- Tiempo real con los requisitos: 10 minutos

**🖥️ Pantalla:**
- Terminal limpio: `node --version` → v22.x.x
- BotFather en Telegram: flujo `/newbot` rápido (grabado previamente)

**📌 Notas de rodaje:**
- Terminal sin historial visible
- Para BotFather: censurar el token real en post-producción

---

### `[4:30–5:10]`
**🎙️ Narración:**
- Instalación: dos opciones
- Opción 1: `curl -fsSL https://openclaw.ai/install.sh | bash`
- Opción 2: `npm install -g openclaw@latest`
- Verificación: `openclaw --version`

**🖥️ Pantalla:**
- Terminal: ejecutar la instalación (npm preferido para el vídeo — más limpio)
- `openclaw --version` mostrando la versión

**📌 Notas de rodaje:**
- Grabar en entorno limpio (máquina virtual o usuario nuevo) para que el output sea el esperado
- No hace falta grabar los 30-60 segundos completos de instalación — cortar con jump cut

---

### `[5:10–5:50]`
**🎙️ Narración:**
- `openclaw onboard --install-daemon` — el comando que lo conecta todo
- Wizard: tres preguntas (proveedor + API key, canal de mensajería, nombre del agente)
- Al terminar: `openclaw gateway status` — servicio activo

**🖥️ Pantalla:**
- Terminal: wizard de onboarding completo, paso a paso
- `openclaw gateway status` → `Active: active (running)` en verde

**📌 Notas de rodaje:**
- Censurar la API key durante el wizard — blur o saltar ese frame en montaje
- El token de Telegram también censurar
- Pausa en el `Active: active (running)` — primer momento de "funciona"

---

### `[5:50–6:00]`
**🎙️ Narración:**
- Ir a Telegram y mandar un mensaje al bot
- Responde. En diez minutos, de cero a agente IA funcional
- "Pero ahora mismo es genérico — vamos a darle personalidad"

**🖥️ Pantalla:**
- Telegram Desktop o móvil: el bot responde a "hola"

---

## 🎬 BLOQUE 4 — El workspace: los ficheros que dan vida al agente `[6:00–10:00]`

---

### `[6:00–6:20]`
**🎙️ Narración:**
- El workspace: `~/.openclaw/workspace/` — carpeta con ficheros markdown
- El agente los carga al inicio de cada sesión
- Árbol de ficheros: SOUL, USER, AGENTS, IDENTITY, TOOLS, MEMORY, HEARTBEAT

**🖥️ Pantalla:**
- Terminal: `ls ~/.openclaw/workspace/` → árbol de ficheros
- Render de Merry: `openclaw-workspace-files` — los ficheros con descripción visual

**📌 Notas de rodaje (Merry):**
- Render existente: `blog/2026/openclaw_agentes/renders/openclaw-workspace-files.gif`

---

### `[6:20–7:10]` — SOUL.md y USER.md
**🎙️ Narración:**
- **SOUL.md:** cómo actúa el agente, no qué sabe. Mostrar las líneas clave: "Skip the Great question! — just help", y las restricciones (privacidad, confirmación antes de actuar)
- La diferencia práctica: sin SOUL.md, "¡Claro, estaré encantado de ayudarte!". Con él, va al grano. En cien interacciones diarias, importa.
- **USER.md:** quién eres tú. El ejemplo real: "Pareja embarazada → restricciones alimentarias activas". Sin USER.md esa línea no existe. Con ella, Sam la lee automáticamente cada vez que genera el menú.

**🖥️ Pantalla:**
- Editor abierto: SOUL.md — zoom en las líneas clave
- Editor: USER.md — con los campos reales (no sensibles)

**📌 Notas de rodaje:**
- Mostrar el fichero real de SOUL.md del sistema — es un momento de "esto no es demo, es producción"
- En USER.md: censurar datos personales sensibles si los hay, mantener los que ilustran el punto

---

### `[7:10–7:50]` — AGENTS.md e IDENTITY.md
**🎙️ Narración:**
- **AGENTS.md:** manual de operaciones. La distinción External vs Internal — acciones libres vs confirmación obligatoria. La diferencia entre un agente que ayuda y uno que da sustos.
- **IDENTITY.md:** el nombre y el personaje. Tolkien porque si vas a pasar horas diseñando esto, que sea entretenido. Y la coherencia de personalidad tiene valor real: el agente responde de forma predecible.

**🖥️ Pantalla:**
- Editor: AGENTS.md — sección External vs Internal
- Editor: IDENTITY.md — nombre, criatura, vibe, emoji

**📌 Notas de rodaje:**
- El ejemplo de IDENTITY.md de Gandalf es el más ilustrativo — usarlo directamente

---

### `[7:50–8:30]` — TOOLS.md, MEMORY.md, HEARTBEAT.md
**🎙️ Narración:**
- **TOOLS.md:** setup local. IPs, repos clave, herramientas en el PATH. Lo que es específico de tu entorno.
- **MEMORY.md:** memoria curada a largo plazo. Solo en sesión principal (seguridad: no se filtra en grupos). El agente puede leerla y actualizarla.
- **HEARTBEAT.md:** checklist periódico. Gimli lo usa cada 30 min para chequear el cluster. Si algo está mal, me lo dice antes de que yo lo note.

**🖥️ Pantalla:**
- Editor: TOOLS.md con la tabla de repos y homelab
- Editor: MEMORY.md — ejemplo de entradas
- Editor: HEARTBEAT.md — checklist de Gimli

---

### `[8:30–9:10]` — Demo workspace en acción
**🎙️ Narración:**
- Demostración: pregunto a Gandalf algo que requiere contexto del workspace
- El agente lo sabe sin que yo lo explique: "tu cluster tiene 6 nodos Pi en K3s"
- Esto es lo que cambia la experiencia — no tener que presentarte cada vez

**🖥️ Pantalla:**
- Telegram: conversación real donde el agente usa contexto del workspace sin pedírselo

**📌 Notas de rodaje:**
- Preparar una pregunta que demuestre claramente que el agente usa USER.md o TOOLS.md
- Ejemplo: "¿Cuántos nodos tiene mi cluster?" → respuesta directa con el dato del fichero

---

### `[9:10–10:00]` — Cómo empezar (mínimo viable)
**🎙️ Narración:**
- No intentar montar los ocho agentes desde el día uno
- Un agente bien configurado vale más que ocho a medias
- Orden recomendado: SOUL.md + USER.md primero (10 min, impacto inmediato)
- Luego AGENTS.md con las restricciones importantes

**🖥️ Pantalla:**
- Cámara: Pablo, tono de consejo práctico

---

## 🎬 BLOQUE 5 — La Compañía: arquitectura multi-agente `[10:00–14:00]`

---

### `[10:00–10:30]`
**🎙️ Narración:**
- OpenClaw permite múltiples agentes, cada uno con workspace propio, herramientas específicas y dominio de responsabilidad
- Presentar los tres grupos: La Comarca (contenido), Los Guardianes (infra), El Concilio Privado (personal)

**🖥️ Pantalla:**
- Render de Merry: `openclaw-homelab-map` o el diagrama completo de la Compañía

**📌 Notas de rodaje (Merry):**
- Render existente: `blog/2026/openclaw_agentes/renders/openclaw-homelab-map.gif`

---

### `[10:30–11:30]` — La Comarca (Frodo, Merry, Pippin)
**🎙️ Narración:**
- **Frodo:** guiones y blog posts. Tiene acceso a `pabpereza/pabpereza`. Regla: solo ramas `draft/`, nunca push a main sin aprobación mía.
- **Merry:** visuales — thumbnails, diagramas Mermaid, animaciones Remotion. Lo que está viendo ahora mismo es trabajo de Merry.
- **Pippin:** publicaciones en redes. Lo que pone en texto Frodo, Pippin lo adapta para X, LinkedIn, YouTube Community.

**🖥️ Pantalla:**
- Screencast: diagrama Mermaid del pipeline de contenido (del blog post)
- GitHub: ejemplo de PR abierto por Frodo con rama `draft/`

**📌 Notas de rodaje:**
- Mostrar el PR real si existe — rompe la cuarta pared
- El pipeline de Frodo → PR → revisión → publicación es el flujo más visual

---

### `[11:30–12:30]` — Los Guardianes (Gimli, Legolas, Boromir)
**🎙️ Narración:**
- **Gimli:** homelab. `kubectl`, `docker`, `ansible`. Check de heartbeat cada 30 min. Si algo está mal en el cluster, me lo dice antes de que yo lo note.
- **Legolas:** research y SEO. Los datos de keywords y fuentes que hay detrás de este vídeo los encontró Legolas.
- **Boromir:** revisión de código y PRs. Análisis estático, linters, code review.

**🖥️ Pantalla:**
- Render de Merry: diagrama del homelab — castle (x86_64) + cluster K3s
- Terminal (opcional): ejemplo de Gimli ejecutando `kubectl get nodes` desde Telegram

**📌 Notas de rodaje (Merry):**
- Render existente: `blog/2026/openclaw_agentes/renders/openclaw-homelab-map.gif`
- Si hay demo de Gimli en vivo: grabar con el cluster real. Si no, puede ser captura estática.

---

### `[12:30–13:15]` — El Concilio Privado (Sam, Aragorn)
**🎙️ Narración:**
- **Sam:** nutrición, menú semanal familiar. La línea de USER.md con las restricciones alimentarias — Sam la lee automáticamente. Sin recordárselo nunca.
- **Aragorn:** estudios y certificaciones. Contexto académico que no necesita ningún otro agente.
- Por qué los separo: seguridad (Sam no necesita saber nada del K3s), rendimiento (contexto específico → mejor respuesta), claridad (sé exactamente a quién preguntarle qué).

**🖥️ Pantalla:**
- Cámara: Pablo explicando la separación de dominios
- Diagrama de los tres grupos con el ámbito de acceso de cada uno (overlay o render de Merry)

---

### `[13:15–14:00]` — Routing entre agentes
**🎙️ Narración:**
- Gandalf es el orquestador. Le hablo a él, él decide qué agente gestiona la tarea.
- No tengo que especificar el agente en cada mensaje — el contexto de la conversación guía el routing.
- Demo: "Gimli, ¿cuántos nodos tiene el cluster?" vs "Frodo, escríbeme el borrador del post sobre Gateway API"

**🖥️ Pantalla:**
- Telegram: conversaciones con diferentes agentes desde el mismo canal
- Render de Merry: `openclaw-fellowship-reveal` si no se usó completo en el hook

---

## 🎬 BLOQUE 6 — Integración con GitHub `[14:00–15:30]`

---

### `[14:00–14:45]`
**🎙️ Narración:**
- Este es el diferenciador que más me importa: los agentes no usan GitHub para leer documentación, actúan sobre él
- Frodo tiene acceso rw a `pabpereza/pabpereza`. Regla explícita: ramas `draft/`, nunca merge a main sin aprobación mía.
- El control final siempre está en mis manos. Los agentes proponen, yo decido.

**🖥️ Pantalla:**
- GitHub: un PR real de Frodo — rama `draft/nombre-video`, descripción estándar
- Mostrar el diff: el fichero markdown del blog post escrito por el agente

**📌 Notas de rodaje:**
- Usar un PR real existente (como este mismo) — más impactante que un ejemplo
- Destacar la rama `draft/` y el body del PR

---

### `[14:45–15:30]`
**🎙️ Narración:**
- Para Gimli las restricciones son más estrictas: puede leer y hacer commits en feature branches, pero cualquier cambio en infra de producción requiere confirmación explícita
- No hay accidentes con `kubectl delete` porque el agente lo decide solo
- La capa de seguridad más importante: las restricciones en AGENTS.md, no la confianza ciega en el modelo

**🖥️ Pantalla:**
- Editor: AGENTS.md de Gimli — sección de confirmaciones requeridas
- (Opcional) Telegram: Gimli pidiendo confirmación antes de un cambio de infra

---

## 🎬 CIERRE `[15:30–16:30]`

---

### `[15:30–16:00]`
**🎙️ Narración:**
- Resumen: OpenClaw + workspace files + La Compañía = sistema de agentes que actúa sobre herramientas reales, desde Telegram, en tu propia infraestructura
- Tres pasos para empezar hoy: instalar, SOUL.md + USER.md, primer agente especializado
- No intentar los ocho desde el día uno

**🖥️ Pantalla:**
- Cámara: Pablo, tono de "ya tienes todo para empezar"

---

### `[16:00–16:20]`
**🎙️ Narración:**
- Pregunta para los comentarios: ¿qué agente montarías primero?
- Link a la documentación de OpenClaw y al repo de homelab en la descripción

**🖥️ Pantalla:**
- Cámara

---

### `[16:20–16:30]`
**🎙️ Narración:**
- "Si quieres empezar desde cero, el vídeo de instalación está aquí arriba"
- "¡Hasta la próxima!"

**🖥️ Pantalla:**
- [Cámara / Screencast] Thumbnail del vídeo de instalación (PR #259)

---

## 📋 Checklist de rodaje

### Antes de grabar
- [ ] Demo del hook grabada en vivo (o screen recording de backup preparado)
- [ ] Entorno de instalación limpio listo (VM o usuario nuevo)
- [ ] API key de prueba sin créditos reales (para el wizard de onboarding)
- [ ] Token de BotFather de prueba (censurar en post)
- [ ] Workspace files reales listos para mostrar
- [ ] PR real de Frodo para mostrar en bloque 6

### Renders de Merry — todos necesarios
- [ ] `openclaw-fellowship-reveal` — Hook (0:32) y cierre multi-agente si hace falta
- [ ] `openclaw-tres-olas` — Bloque 1 (1:20)
- [ ] `openclaw-gateway-flow` — Bloque 2 (2:30)
- [ ] `openclaw-one-ring-ia` — Bloque 2 (3:40)
- [ ] `openclaw-workspace-files` — Bloque 4 (6:00)
- [ ] `openclaw-homelab-map` — Bloque 5 (11:30)

### Censurar en post-producción
- API key en el wizard de onboarding
- Token de Telegram en BotFather y en el wizard
- Datos personales sensibles en USER.md si se muestran
