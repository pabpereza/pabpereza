---
slug: openclaw-instalacion-primeros-pasos
title: "Instala tu propio asistente IA en 10 minutos con OpenClaw"
tags: [openclaw, ia, self-hosted, tutorial, telegram]
authors: pabpereza
date: 2026-03-04
description: "Guía paso a paso para instalar OpenClaw, conectarlo a Telegram y configurar un asistente IA personal que vive en tu máquina, te conoce y puede actuar sobre tus herramientas."
keywords: [openclaw, asistente ia personal, self-hosted, instalar openclaw, telegram bot ia, agente ia local, configuración openclaw]
---

Cada día abres ChatGPT, le explicas quién eres, qué haces, qué necesitas. Al día siguiente, vuelta a empezar. Eso tiene nombre: una relación sin memoria. Este post es la guía de instalación de OpenClaw — el gateway self-hosted que convierte cualquier modelo de IA en un asistente que te conoce, vive en tu máquina y puede actuar de verdad.

<!-- truncate -->

## ¿Qué es OpenClaw y por qué no es solo otro chatbot?

OpenClaw es un **gateway self-hosted open source** (licencia MIT) que se sienta entre tus aplicaciones de mensajería —Telegram, WhatsApp, Discord— y el modelo de IA que elijas. Eres tú quien controla el modelo, el contexto y las herramientas disponibles.

Tres diferencias estructurales respecto a usar la IA en el navegador:

**1. Self-hosted.** Los datos no salen de tu máquina salvo la llamada a la API del modelo. Sin suscripción a OpenClaw. Sin que tu historial de conversaciones viva en servidores de terceros.

**2. Memoria persistente.** No en el modelo, sino en ficheros de texto planos que el agente lee al inicio de cada sesión. Tu contexto, tus proyectos, tus preferencias — el agente lo carga cada vez sin que tengas que repetirlo.

**3. Puede actuar.** No solo responde. Puede ejecutar comandos, leer ficheros de tu sistema, hacer búsquedas en la web, interactuar con GitHub. La diferencia entre un chatbot que habla y un agente que actúa.

| | OpenClaw | ChatGPT / Claude.ai |
|---|---|---|
| Self-hosted | ✅ | ❌ |
| Open source (MIT) | ✅ | ❌ |
| Memoria persistente (tus ficheros) | ✅ | ❌ |
| Multi-canal (Telegram, Discord…) | ✅ | ❌ Solo su interfaz |
| Control total de datos | ✅ | ❌ |
| Acceso a herramientas reales | ✅ CLI, filesystem, GitHub | Limitado |
| Coste | API key propia, pay-per-use | Suscripción fija |

**Cuándo NO usarlo:** para brainstorming puntual o redactar un email suelto, Claude o ChatGPT directamente es más rápido. OpenClaw brilla en automatización, contexto persistente y acciones sobre herramientas reales.

## Requisitos

Tres cosas:

**Node.js ≥ 22.** Si usas `nvm`:

```bash
nvm install 22
nvm use 22
node --version  # v22.x.x o superior
```

**API key de tu proveedor de IA.** OpenClaw funciona con Anthropic (Claude), OpenAI, Google Gemini, y modelos locales vía Ollama. Yo uso Claude. El coste es pay-per-use con tu propia key — no hay suscripción a OpenClaw.

:::warning Configura un límite de gasto antes de seguir
Antes de pegar tu API key en ningún sitio: entra en la consola de tu proveedor y configura un **spending limit mensual** y una alerta de uso. En Anthropic es [console.anthropic.com → Settings → Limits](https://console.anthropic.com). OpenAI y Google tienen el equivalente en sus dashboards.

Si tu máquina se compromete y alguien usa tu key sin control, lo que tienes es una factura de miles de euros. Cinco segundos de configuración para evitar un problema real. Este es el punto que más se ignora en tutoriales.
:::

**Un canal de mensajería.** El más fácil para empezar es Telegram. Abre BotFather, escribe `/newbot`, sigue los pasos, guarda el token. Dos minutos.

No necesitas Docker, Kubernetes ni servidor dedicado. Tu portátil vale perfectamente.

## Instalación

Dos opciones equivalentes:

```bash
# Opción 1: script de instalación
curl -fsSL https://openclaw.ai/install.sh | bash

# Opción 2: npm global (más trazable)
npm install -g openclaw@latest
```

:::tip curl | bash — revisa antes de ejecutar
Si usas la opción 1, puedes (y deberías) inspeccionar el script antes de ejecutarlo:
```bash
curl -fsSL https://openclaw.ai/install.sh  # sin el pipe, solo lo muestra
```
El script es open source en GitHub. Si prefieres no ejecutar nada sin revisarlo, usa directamente `npm install`.
:::

Verificación:

```bash
openclaw --version
# 2026.2.24
```

## Configuración inicial: el onboarding

```bash
openclaw onboard --install-daemon
```

Este comando lanza un wizard interactivo y hace tres cosas: configura el modelo de IA, conecta el canal de mensajería, y registra OpenClaw como servicio del sistema para que arranque automáticamente.

El wizard pregunta:

1. **Proveedor de IA y API key** — elige tu proveedor y pega la key
2. **Canal de mensajería** — elige Telegram y pega el token de BotFather
3. **Nombre del agente** — el nombre que verás en Telegram

Tras el wizard:

```bash
openclaw gateway status
# ● openclaw-gateway.service - OpenClaw Gateway
#    Active: active (running)
```

Si vas a Telegram y mandas un mensaje al bot, responde. En diez minutos, de cero a agente IA funcional.

Ahora mismo es un agente genérico. No te conoce. Lo arreglamos con el workspace.

## El workspace: memoria y personalidad

El workspace es `~/.openclaw/workspace/` — una carpeta con ficheros markdown que el agente carga al inicio de cada sesión. No hay que tocar código, solo editar texto.

```
~/.openclaw/workspace/
├── SOUL.md       # Personalidad y comportamiento
├── USER.md       # Información sobre ti
├── AGENTS.md     # Reglas de operación
└── TOOLS.md      # Setup local (herramientas, IPs, etc.)
```

### SOUL.md — La personalidad

Define **cómo actúa** el agente. Sin este fichero, cada respuesta empieza con "¡Claro, estaré encantado de ayudarte!". Con él, le dices exactamente cómo quieres que se comporte:

```markdown
## Core Truths

**Be genuinely helpful, not performatively helpful.**
Skip the "Great question!" — just help. Actions speak louder than filler words.

**Have opinions.** You're allowed to disagree, prefer things, find stuff amusing or boring.

**Be resourceful before asking.** Try to figure it out. Read the file.
Check the context. Search for it. Then ask if stuck.
```

Una línea cambia el 80% de la experiencia diaria.

### USER.md — Quién eres tú

El agente lo lee al arrancar para no preguntarte lo básico en cada conversación:

```markdown
# USER.md - About Your Human
- **Name:** Pablo
- **Timezone:** Europe/Madrid
- **Work:** DevOps, seguridad, Kubernetes
- **Homelab:** cluster K3s en casa, 6 Raspberry Pi
- **Canal YouTube:** @pabpereza — DevOps, seguridad, infraestructura, IA
```

Cuanto más concreto, mejor. El agente tiene contexto desde la primera pregunta.

## Primeras conversaciones

Con el workspace configurado, algunos casos de uso del día a día:

**Consultas con contexto persistente:**

```
Tú: ¿Cuántos nodos tiene mi cluster?
Agente: Según tu USER.md, tienes 6 nodos Raspberry Pi en el cluster K3s de casa.
```

No tienes que repetir tu setup en cada conversación.

**Investigación con búsqueda web:**

```
Tú: ¿Hay alguna CVE reciente en nginx:1.25?
Agente: [busca en la web] Sí, CVE-2025-XXXX afecta a versiones < 1.26.1...
```

**Acceso al filesystem:**

```
Tú: Lee /var/log/syslog y dime si hay errores en las últimas 50 líneas
Agente: [lee el fichero] Encuentro 3 errores: [detalle]
```

Sin copiar y pegar. Sin abrir el fichero tú.

## Gestión del daemon

Comandos básicos:

```bash
# Estado del servicio
openclaw gateway status

# Reiniciar (tras cambios de configuración)
openclaw gateway restart

# Parar / arrancar
openclaw gateway stop
openclaw gateway start
```

Los cambios en los ficheros del workspace se recogen en la siguiente sesión. Para forzar reload inmediato: `openclaw gateway restart`.

## Siguientes pasos

Con esto tienes un agente IA personal funcional en tu infraestructura. El siguiente nivel es **arquitectura multiagente**: varios agentes especializados —uno para infraestructura, otro para contenido, otro para el hogar— coordinándose entre ellos desde un único punto de entrada.

Ese es el tema del siguiente vídeo: [Monté 8 agentes IA personales con OpenClaw — La Compañía del Anillo](/blog/openclaw-agentes-ia-personales).

¡Hasta la próxima!
