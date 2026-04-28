# GitHub Copilot & Gemini CLI Instructions

Esta guía proporciona directrices para los agentes de IA (Copilot, Gemini) que trabajen en este repositorio de contenido educativo de DevSecOps.

## Arquitectura del Proyecto

Este es un sitio **Docusaurus v3** con:
- **Build automatizado**: `npm run prebuild` genera el grafo de contenido antes de cada build.
- **Búsqueda**: `docusaurus-lunr-search`.
- **Mermaid**: Soporte para diagramas.
- **Grafo de contenido**: React Force Graph 2D.

## Especialización de Agentes y Comandos

Gemini CLI utiliza **Subagentes** especializados ubicados en `.gemini/agents/`. Cuando recibas una instrucción que empiece por `/`, o se te pida realizar una de estas tareas, **delega** la ejecución al subagente correspondiente usando `@nombre-del-agente`.

### Comandos y Delegación
- `/research <slug | tema>`: Delega en **@legolas**. Investiga a fondo y genera `research.md` y `seo.md`.
- `/guion <slug | instruccion>`: Delega en **@frodo**. Escribe/revisa `script.md` en formato tabla.
- `/assets <slug>`: Delega en **@merry**. Genera prompts de miniaturas y diagramas Mermaid en `assets.md`.
- `/revision <slug> [tipo]`: Delega en **@boromir**. Auditoría técnica de los ficheros del video.
- `/social <slug | URL>`: Delega en **@pippin**. Genera copies para LinkedIn, X, YT Community y TikTok.
- `/sponsors <slug | tema>`: Delega en **@sam**. Identifica y analiza patrocinadores potenciales.

### Roles Disponibles (Subagentes en `.gemini/agents/`)
- **@boromir**: Riguroso, técnico, enfocado en seguridad. Revisor final.
- **@frodo**: Narrativo, "Senior explicando a Junior", arquitecto de guiones.
- **@legolas**: Basado en datos, cita fuentes oficiales, especialista en SEO.
- **@merry**: Visualmente limpio, experto en Mermaid y diseño de assets.
- **@pippin**: Directo, enfocado en engagement y redes sociales.
- **@sam**: Analítico, enfocado en patrocinios y alineación de marca.

## Estructura de Contenido

### Canal de YouTube (`/.channel/`)
Los proyectos de video viven en `.channel/<slug>/`. No buscar fuera de este repo.
- Estructura: `_index.md` (briefing), `research.md`, `script.md`, `assets.md`, `seo.md`, `social.md`.

### Blog Posts (`/blog/`)
- Borradores en `blog/.ideas/`. Usar archivo `.md` (no `index.md`).
- Formato: Frontmatter con `slug`, `authors: pabpereza`, `tags`, `keywords`.
- Insertar `<!-- truncate -->` tras el primer párrafo.

### Documentación de Cursos (`/docs/cursos/`)
- Sistema de numeración: `100` (básico), `200+` (avanzado).
- Cada curso requiere un `README.md` como índice.

## Estilo de Redacción y Formato

- **Tono**: Conversacional, profesional, humor sutil.
- **Markdown**: `**negrita**` para conceptos, bloques de código con lenguaje específico, Mermaid para diagramas.
- **Imágenes**: Nombres descriptivos en `static/img/`, optimizadas, con alt text.

## Conocimiento Especializado (Skills)

Este repositorio contiene **Skills** avanzados en `.gemini/skills/`. Actívalos usando el comando `activate_skill` antes de trabajar en tareas técnicas específicas:

- `ansible-expert`: Automatización avanzada y gestión de configuración.
- `devops-engineer`: Pipelines CI/CD, principios SRE e infraestructura.
- `docker-expert`: Contenedores, optimización y seguridad.
- `kubernetes-specialist`: Orquestación, redes y patrones cloud-native.
- `neovim`: Optimización del entorno de desarrollo.

---

> **Nota**: Estas instrucciones son mandatos base. Consulta `AGENTS.md` para el detalle exhaustivo de cada flujo de trabajo.
