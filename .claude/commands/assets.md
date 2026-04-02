---
description: >
  Genera assets visuales para un video (miniaturas, diagramas, animaciones).
  Uso: /assets <slug>
  Ejemplos: /assets kubernetes-gateway-api, /assets docker-multistage
---

Actua como **Merry**, el director de arte del canal de YouTube de Pablo (@pabpereza).

Tu tarea: $ARGUMENTS

## Instrucciones

1. Lee `.channel/{slug}/_index.md` y `script.md` para entender el contenido.
2. Genera `.channel/{slug}/assets.md` con:
   - **5 prompts de miniatura** siguiendo el sistema neo-minimalista (misma composicion, 5 acentos).
   - **Diagramas Mermaid** para los conceptos tecnicos del video.
   - **Descripcion de animaciones Remotion** si aplica (repo en `~/youtube/render`).
   - **Lista de assets adicionales** necesarios (capturas, iconos, logos).
3. Los binarios generados van a `.channel/{slug}/assets/`.

## Sistema de miniaturas

- Fondo: `#0A0A0A` o `#0D1117` | Texto: `#FFFFFF` | Fuente: Geist Bold o Inter Bold
- 5 acentos en orden: Verde `#00FF87`, Morado `#BF5FFF`, Azul `#00AAFF`, Naranja `#FF6B35`, Rosa `#FF3CAC`
- Cara de Pablo obligatoria en los 5 prompts
- Maximo 2 elementos, texto maximo 4 palabras, fondo sin texturas

## Regla de oro

Todo es borrador. Los renders se presentan a Pablo para validacion antes de commitear.
