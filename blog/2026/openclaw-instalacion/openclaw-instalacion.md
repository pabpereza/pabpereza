---
slug: openclaw-instalacion-primeros-pasos
title: "Instala tu propio asistente IA en 10 minutos con OpenClaw"
tags: [openclaw, ia, self-hosted, tutorial, telegram]
authors: pabpereza
date: 2026-03-04
description: "Guía paso a paso para instalar OpenClaw, conectarlo a Telegram y configurar un asistente IA personal que vive en tu máquina, te conoce y puede actuar sobre tus herramientas."
keywords: [openclaw, asistente ia personal, self-hosted, instalar openclaw, telegram bot ia, agente ia local, configuración openclaw]
---

Este post es la guía de instalación de OpenClaw — el gateway self-hosted que convierte cualquier modelo de IA en un asistente que te conoce, vive en tu máquina y puede actuar de verdad.

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
├── SOUL.md         # Personalidad y comportamiento
├── USER.md         # Información sobre ti
├── AGENTS.md       # Reglas de operación
├── TOOLS.md        # Setup local (herramientas, IPs, etc.)
├── HEARTBEAT.md    # Checklist de tareas periódicas
├── MEMORY.md       # Memoria a largo plazo
└── memory/
    ├── 2026-03-04.md   # Diario de hoy
    └── 2026-03-03.md   # Diario de ayer
```

Ninguno es obligatorio para que OpenClaw funcione. Sin ellos tienes un modelo genérico. La inversión de configurarlos se recupera en la primera semana.

### SOUL.md — La personalidad

Define **cómo actúa** el agente, no qué sabe. Sin este fichero, cada respuesta empieza con "¡Claro, estaré encantado de ayudarte!". Con él, le dices exactamente cómo quieres que se comporte:

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

### AGENTS.md — Las reglas de operación

El manual de cómo se comporta el agente: qué hace al inicio de cada sesión, cómo gestiona la memoria, qué requiere confirmación antes de actuar. La distinción más importante:

```markdown
## External vs Internal

**Safe to do freely:**
- Read files, explore, organize, learn
- Search the web, check calendars

**Ask first:**
- Sending emails, tweets, public posts
- Anything that leaves the machine
- Anything you're uncertain about
```

Acciones internas: libres. Acciones externas: confirmación. Esa diferencia separa un agente que ayuda de uno que da sustos.

### TOOLS.md — Tu setup local

Tu cheat sheet de entorno: IPs de servidores, nombres de contenedores Docker, alias de SSH, rutas relevantes. Lo que es específico de tu máquina y no encaja en ningún otro fichero. Lo editas cuando cambia tu infraestructura.

```markdown
### SSH
- home-server → 192.168.1.100, user: admin

### Containers
- nginx-prod → el proxy principal, puerto 8080
```

### HEARTBEAT.md — Tareas periódicas

Si configuras heartbeats en OpenClaw, el agente puede hacer rondas automáticas. `HEARTBEAT.md` define el checklist de cada ronda:

```markdown
# HEARTBEAT.md

- Revisar correo no leído urgente
- Comprobar si hay eventos de calendario en las próximas 2h
- Verificar estado del cluster K3s
```

Si lo dejas vacío, el agente no hace nada por su cuenta. Útil para automatizar revisiones periódicas sin tener que pedirlas cada vez.

### MEMORY.md — Memoria a largo plazo

No es el log de conversaciones — es la destilación. Decisiones importantes, contexto que no quieres repetir, preferencias que el agente debe recordar siempre. Lo que diferencia un agente que te conoce de verdad de uno que empieza de cero cada semana.

```markdown
# MEMORY.md

- La API del cluster de producción está detrás de un VPN — siempre confirmar antes de ejecutar comandos destructivos
- Pablo prefiere respuestas directas, sin preámbulos
- El proyecto X está en pausa hasta abril
```

El agente puede actualizarlo por su cuenta cuando aprende algo relevante.

### memory/ — El diario diario

La carpeta `memory/` contiene un fichero por día: `2026-03-04.md`, `2026-03-05.md`. Son las notas en bruto de cada jornada — qué hizo el agente, qué decidiste, qué ocurrió. El agente los lee al arrancar para tener contexto reciente aunque la sesión sea nueva.

Es cómo mantiene continuidad entre días sin depender de que el modelo recuerde nada entre sesiones.

```
memory/
├── 2026-03-04.md   ← hoy
├── 2026-03-03.md   ← ayer
└── 2026-03-02.md
```

**Mínimo para empezar:** `SOUL.md` + `USER.md`. El resto lo añades según necesites.

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

## Bastionado del VPS (si no es tu portátil)

Esta sección es opcional si estás en local. Si has instalado OpenClaw en un VPS público, lo que sigue es lo mínimo para no dejar la puerta abierta. Los bots de internet escanean puertos constantemente — un servidor mal configurado tiene una vida media de horas.

### SSH — el orden importa

El error más común en tutoriales: cambiar el puerto, reiniciar SSH y perder el acceso porque el firewall no estaba actualizado. El orden correcto:

```bash
# 1. Sube tu clave pública ANTES de cambiar nada
ssh-copy-id -i ~/.ssh/id_ed25519.pub usuario@ip-vps

# 2. Verifica que entras con clave (sin contraseña)
ssh -i ~/.ssh/id_ed25519 usuario@ip-vps

# 3. Ahora edita /etc/ssh/sshd_config
```

En `/etc/ssh/sshd_config`, tres líneas críticas:

```
Port 2222               # cambia el puerto por defecto
PermitRootLogin no      # nadie entra como root
PasswordAuthentication no  # solo clave, nunca contraseña
PubkeyAuthentication yes
MaxAuthTries 3
LoginGraceTime 30
AllowUsers tu_usuario
```

**Regla de oro:** nunca cierres la sesión SSH actual hasta verificar desde otra terminal que el nuevo config funciona.

```bash
# Orden correcto: primero regla en firewall, luego reiniciar SSH
ufw allow 2222/tcp
systemctl restart sshd

# Verifica desde OTRA terminal antes de cerrar la sesión actual
ssh -p 2222 usuario@ip-vps
```

### Firewall (UFW)

```bash
apt install ufw -y
ufw default deny incoming
ufw default allow outgoing
ufw allow 2222/tcp      # SSH — tu nuevo puerto, PRIMERO
ufw allow 80/tcp        # solo si sirves web
ufw allow 443/tcp       # solo si sirves web
ufw enable
ufw status verbose
```

El puerto del gateway OpenClaw (`3737` por defecto) **no debe abrirse al exterior**. Debe escuchar solo en `127.0.0.1`. Verifica tras la instalación:

```bash
ss -ltnup | grep 3737
# Bien:  127.0.0.1:3737  (solo localhost)
# Mal:   0.0.0.0:3737    (expuesto al exterior)
```

Si necesitas acceso remoto al gateway, usa un reverse proxy con TLS (Caddy es el más sencillo) o Tailscale para acceso sin puertos públicos.

### Fail2ban

```bash
apt install fail2ban -y
```

Crea `/etc/fail2ban/jail.local`:

```ini
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5

[sshd]
enabled  = true
port     = 2222
maxretry = 3
bantime  = 24h
```

Tres intentos fallidos → ban de 24 horas. Elimina el 99% del ruido de bots de fuerza bruta.

### Actualizaciones automáticas de seguridad

```bash
apt install unattended-upgrades -y
dpkg-reconfigure --priority=low unattended-upgrades
```

En `/etc/apt/apt.conf.d/50unattended-upgrades`, mantén `Automatic-Reboot "false"` — con servicios activos el reinicio debe ser manual y controlado.

### Permisos de ~/.openclaw

El directorio `~/.openclaw` contiene tus credenciales: la API key, el token de Telegram. Nadie más debería poder leerlas:

```bash
chmod 700 ~/.openclaw
find ~/.openclaw -type f -name '*.json' -exec chmod 600 {} \;
find ~/.openclaw -type d -exec chmod 700 {} \;
```

### Checklist — filmable y copipasteable

```bash
#!/bin/bash
echo '=== OpenClaw VPS Security Checklist ==='

# 1. SSH sin password
grep -q 'PasswordAuthentication no' /etc/ssh/sshd_config \
  && echo '[OK] SSH password auth disabled' \
  || echo '[FAIL] SSH password auth still enabled'

# 2. Root login deshabilitado
grep -q 'PermitRootLogin no' /etc/ssh/sshd_config \
  && echo '[OK] Root login disabled' \
  || echo '[FAIL] Root login enabled'

# 3. Firewall activo
ufw status | grep -q 'Status: active' \
  && echo '[OK] Firewall active' \
  || echo '[FAIL] Firewall not active'

# 4. Fail2ban corriendo
systemctl is-active fail2ban > /dev/null 2>&1 \
  && echo '[OK] Fail2ban running' \
  || echo '[WARN] Fail2ban not running'

# 5. Gateway NO expuesto al exterior
ss -ltnup | grep -q '0.0.0.0:3737' \
  && echo '[FAIL] Gateway exposed on all interfaces!' \
  || echo '[OK] Gateway not exposed publicly'

# 6. OpenClaw no corriendo como root
ps aux | grep openclaw | grep -v grep | grep -q '^root' \
  && echo '[FAIL] OpenClaw running as root!' \
  || echo '[OK] OpenClaw not running as root'

# 7. Permisos ~/.openclaw
PERMS=$(stat -c '%a' ~/.openclaw 2>/dev/null)
[ "$PERMS" = "700" ] \
  && echo '[OK] ~/.openclaw permissions 700' \
  || echo "[WARN] ~/.openclaw permissions: $PERMS (should be 700)"
```

Verde en todos es el objetivo. Rojo es acción inmediata antes de continuar.

## Siguientes pasos

Con esto tienes un agente IA personal funcional en tu infraestructura. El siguiente nivel es **arquitectura multiagente**: varios agentes especializados —uno para infraestructura, otro para contenido, otro para el hogar— coordinándose entre ellos desde un único punto de entrada.

Ese es el tema del siguiente vídeo: [Monté 9 agentes IA personales con OpenClaw — La Compañía del Anillo](/blog/openclaw-agentes-ia-personales).

¡Hasta la próxima!
