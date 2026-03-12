---
slug: claude-in-chrome-extension-guia-practica
title: "Claude in Chrome: el agente que ve tu navegador y actúa por ti"
tags: [claude, ia, navegador, chrome, automatizacion, devtools, workflow]
authors: pabpereza
date: 2026-03-12
description: "Guía práctica de Claude in Chrome: qué puede hacer que Claude.ai normal no puede, casos de uso reales demostrables, modos de permiso y las limitaciones honestas que nadie te cuenta."
keywords: [claude chrome extension, claude in chrome, claude navegador, claude browser extension, claude automatizacion, claude devtools, anthropic chrome, claude vs chatgpt navegador]
---

Hay cuatro formas de usar Claude y se confunden constantemente. Claude in Chrome es la única donde Claude ve tu pantalla y actúa: navega, hace clic, rellena formularios, lee la consola de errores — sin que tú toques el teclado. Este post es la guía práctica de cuándo usarla, cómo funciona y cuáles son las limitaciones que hay que conocer antes.

<!-- truncate -->

## Qué es — y qué no es

**Nombre oficial:** Claude in Chrome. Extensión de Chrome que aparece como panel lateral mientras navegas. Claude ve lo que tú ves y puede tomar acciones cuando se lo pides.

**Estado:** beta. Solo Chrome. Requiere plan de pago (Pro, Max, Team o Enterprise).

Lo que lo diferencia del resto de modalidades:

| Modalidad | Actúa en el browser | Memoria persistente | MCP/Projects |
|---|---|---|---|
| **Claude.ai** | ❌ Solo chat | Projects: ✅ | ✅ |
| **Claude in Chrome** | ✅ Navega, clica, rellena | ❌ | ❌ |
| **Claude Desktop** | Con connector | ✅ Projects | ✅ MCP |
| **Claude Code** | ✅ (para dev) | No entre sesiones | ✅ Filesystem/shell |

**La tensión central:** la extensión tiene más autonomía de acción en el navegador, pero menos contexto persistente que Claude.ai. Sin Projects, sin MCP, sin memoria entre sesiones. Cada conversación empieza desde cero.

:::warning Plan Pro = Haiku 4.5
Este dato no aparece destacado en los tutoriales: con el plan Pro, Claude in Chrome funciona con Haiku 4.5 — el modelo más básico. Para usar Sonnet u Opus en el navegador necesitas plan Max, Team o Enterprise. Comprueba tu plan antes de configurar flujos de trabajo serios.
:::

## Qué puede hacer

### Acción real en el navegador
- Navegar a URLs, hacer clic en botones, rellenar formularios
- Gestionar múltiples pestañas simultáneamente
- Leer contenido de páginas via screenshots
- Ejecutar JavaScript (con permiso por dominio)
- Abrir DevTools y leer errores de consola en tiempo real

### Flujos de trabajo
- **Workflows en background:** sigue trabajando aunque cambies de pestaña
- **Grabar un workflow:** le enseñas haciendo — Claude aprende y genera el shortcut automáticamente
- **Tareas programadas:** ejecuta un flujo cada mañana, cada semana, sin intervención manual
- **Shortcuts:** guarda tus mejores prompts como slash commands reutilizables

### Integraciones con plataformas conocidas
Claude tiene conocimiento built-in de navegación en Slack, Google Calendar, Gmail, Google Docs y GitHub. "Agenda una reunión para el martes" o "Actualiza este documento" funcionan sin instrucciones paso a paso.

## Casos de uso reales

### 1. Evaluación de aplicaciones web

El caso de uso más potente para un perfil técnico.

```
Prompt: "Entra en esta app como si fueras un usuario nuevo. Recorre el onboarding
completo, dime qué campos son confusos, qué falta para completar el registro,
y abre la consola — quiero saber si hay errores de JavaScript."
```

Claude se registra, completa el onboarding, llega a la primera acción core, y te da un informe de UX. Simultáneamente abre DevTools y lista los errores de consola con contexto.

Variantes útiles:
- **Accesibilidad básica:** "Navega por esta web usando solo Tab y dime qué funciona y qué no". Coge el 80% de los problemas obvios en dos minutos.
- **Responsive check:** screenshots a diferentes anchos de pantalla
- **Comparación con Figma:** "¿Qué diferencias ves entre esta pantalla y este mockup?" — lista el spacing incorrecto, colores que no coinciden, componentes que faltan.

**Lo que NO puede hacer:** auditorías de seguridad en profundidad, análisis de código fuente sin acceso al repo, testing de carga, análisis de APIs internas sin credenciales.

### 2. Competitive intelligence

```
Prompt: "Visita estas cinco webs y para cada una extrae: plan de pricing,
features principales, cómo se posicionan. Devuélvemelo en tabla."
```

Claude visita cada web, extrae la información, devuelve la tabla estructurada. Sin copiar y pegar entre pestañas, sin perder el hilo de qué miraste en cada web.

La tabla resultante va directo a Notion, PowerPoint o un export. Lo que antes era una hora de trabajo manual: tres minutos.

Variante con scheduling: programa este flujo para que corra cada semana. Sabes en tiempo real si un competidor cambia sus precios.

### 3. Flujos repetitivos + scheduling

```
Prompt: "Ve al dashboard de analytics, extrae los KPIs de la semana pasada
(usuarios activos, conversión, churn), y compílalos en un resumen."
```

Configuras esto como flujo grabado, lo programas para que corra cada lunes a las 8:00. El resumen aparece en Slack antes de que empieces el día. Sin intervención manual.

Más ejemplos de flujos repetitivos:
- Preparación de reuniones: lee el calendario, cruza con hilos de email relevantes, lista qué necesita preparación
- Limpieza de inbox: identifica newsletters y marketing emails, presenta lista para borrado masivo
- Actualización de docs: "Actualiza la sección de pricing en este Notion con los nuevos precios" — ejecuta directamente
- CRM updates: lee el calendario, cruza con contactos, actualiza activity logs

### 4. Claude Code + Chrome (para developers)

El combo más potente para desarrollo frontend:

1. Claude Code escribe el código en el terminal
2. Claude in Chrome verifica el resultado en el browser en tiempo real
3. Si hay regresión visual o el componente no coincide con el mockup, lo detecta sin que tú lo abras

```bash
# Terminal: Claude Code hace un cambio de CSS
# Browser: Claude in Chrome verifica que el resultado visual es correcto
# → "El padding es 8px en lugar de 12px, el color del botón no coincide con el mockup"
```

Elimina el ciclo de hacer cambios en el editor, ir al browser, comparar manualmente, volver al editor.

## Modos de permiso

### Ask before acting (recomendado para empezar)

Claude muestra el plan antes de ejecutar: webs a visitar, acciones a tomar. Apruebas el plan. Ejecuta de forma autónoma dentro de esos límites. Para acciones de alto riesgo — compras, creación de cuentas, descargas — sigue pidiendo permiso aunque ya hayas aprobado el plan general.

### Act without asking

Autonomía casi completa. **Anthropic dice explícitamente en su documentación que no pueden garantizar que Claude pedirá permiso incluso cuando debería.** Solo para flujos muy conocidos y muy supervisados.

### Permisos por dominio

Para ejecutar JavaScript en una web, la extensión pide permiso por dominio la primera vez:
- **"Allow this action"** — solo esta vez
- **"Always allow on this site"** — permiso continuo para ese dominio
- **"Decline"** — no ejecutar

Configuración recomendada: conceder permisos site by site según los vayas necesitando, no de forma global desde el principio.

## Limitaciones — lo que hay que saber antes

**1. Plan Pro = Haiku 4.5.** Ya lo dije arriba pero lo repito. Si esperas calidad de Sonnet para flujos de trabajo complejos, necesitas plan Max o superior.

**2. Sin memoria entre sesiones.** Cada conversación nueva empieza desde cero. Sin Projects, sin historial de conversaciones anteriores. Para contexto persistente: Claude.ai con Projects.

**3. Comportamiento probabilístico.** No es un automatizador determinístico como un script o Zapier. El mismo prompt puede producir resultados distintos en dos ejecuciones distintas. Para tareas críticas donde el resultado tiene que ser idéntico siempre, una herramienta de automatización clásica es más fiable.

**4. Prompt injection.** Anthropic lo reconoce en su documentación de seguridad. Si navegas webs no confiables con la extensión activa, contenido malicioso en esas webs puede intentar manipular las instrucciones del agente. Con Opus el riesgo se reduce significativamente (~1% de éxito), con Haiku es más relevante.

**5. Sitios bloqueados.** Servicios financieros (banca, brokers), contenido adulto, piratería. No está pensada para gestionar dinero.

**6. Solo Chrome.** Firefox, Edge, Safari: no disponibles.

**7. Todavía en beta.** Funcionalidad incompleta, posibles bugs, comportamiento puede cambiar entre versiones.

## Cuándo usar cada modalidad

| Necesito... | Herramienta |
|---|---|
| Navegar y actuar en el browser | Claude in Chrome |
| Flujos repetitivos programables | Claude in Chrome |
| Evaluación de apps o research | Claude in Chrome |
| Contexto persistente entre conversaciones | Claude.ai con Projects |
| MCP / integraciones custom | Claude.ai o Claude Desktop |
| Desarrollo, filesystem, shell | Claude Code |
| Browser + MCP + memoria | Claude Desktop |

## Instalación

1. Instalar desde Chrome Web Store: [claude.com/claude-for-chrome](https://claude.com/claude-for-chrome)
2. Iniciar sesión con tu cuenta de Claude de pago
3. El panel aparece en el lateral — icono de Claude en la barra de Chrome

Primer prompt recomendado: "Abre la DevTools console de esta página y dime si hay errores". Es rápido, visible, y demuestra exactamente lo que diferencia esta extensión del chat normal.

## Referencias

- Página oficial: <https://claude.com/claude-for-chrome>
- Getting started: <https://support.claude.com/en/articles/12012173-getting-started-with-claude-in-chrome>
- Permisos: <https://support.claude.com/en/articles/12902446-claude-in-chrome-permissions-guide>
- Seguridad: <https://support.claude.com/en/articles/12902428-using-claude-in-chrome-safely>

¡Hasta la próxima!
