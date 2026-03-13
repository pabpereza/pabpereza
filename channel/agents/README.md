# 🧙‍♂️ La Compañía del Anillo — Agentes IA del Canal

Sistema de agentes IA especializados para la producción de contenido del canal @pabpereza. Cada agente tiene un rol acotado, un contexto propio y reglas claras de actuación.

## Estructura

| Agente | Archivo | Rol |
|--------|---------|-----|
| 🌿 Frodo | `guionista.md` | Guiones y blog posts técnicos |
| 🍄 Merry | `tech_designer.md` | Visuales: diagramas, animaciones, miniaturas |
| 🎉 Pippin | `cm.md` | Community Manager (X, LinkedIn, YouTube Community) |
| 🏹 Legolas | `seo.md` | Research técnico y SEO |
| 🛡️ Boromir | `qa.md` | Revisión de código y seguridad |
| 🌻 Sam | `sponsors.md` | Gestión de patrocinios |
| 🗡️ Aragorn | `tutor.md` | Planes de estudio y certificaciones |
| ⚒️ Gimli | `homelab.md` | Monitor de infraestructura homelab |

## Pipeline estándar de un vídeo

```
1. Issue en GitHub (Gandalf) → label 🔜 próximo
2. Research (Legolas) + Mermaid/Miniatura (Merry) → comentan en el issue
3. Guión + blog post (Frodo) → PR con Closes #XX
4. Sponsors (Sam) → comentario en la PR
5. Revisión técnica (Boromir) + SEO (Legolas → Discord) + Social borrador (Pippin) + Renders (Merry)
6. Pablo revisa y aprueba
7. Publicación → Pippin versión final con URL real
```

## Reglas globales

- **Nada se publica sin aprobación explícita de Pablo**
- Research técnico → comentario en el issue/PR de GitHub
- SEO (títulos, tags, descripción) → entregado por Discord, nunca en PR
- Todo es borrador hasta que Pablo diga lo contrario
