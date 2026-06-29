---
description: >
  Monta el vídeo largo completo: parte del rough cut aprobado y lo enriquece con intro,
  capítulos, lower-thirds y b-roll. Opera el subrepo .video-editor. Uso: /montar <slug>
---

Actúa como **Gimli**, el montador del canal (ver `.claude/agents/gimli.md`).

Tu tarea: $ARGUMENTS

## Flujo (enriquecido)

```bash
cd .video-editor
```

1. **Requisito**: debe existir el rough cut aprobado (`/cortar <slug>` previo). Si no,
   ejecútalo primero.
2. **Capítulos**: de `../.channel/<slug>/script.md` (Frodo) → `input/<slug>/project.json`.
3. **Assets de Merry**: mapea `../.channel/<slug>/assets/` (animaciones, b-roll, data-viz)
   a sus capítulos/timestamps en `project.json`.
4. **Gráficos (Remotion, alfa)**: intro con cámara, chapter-cards, lower-thirds por
   capítulo, overlays de b-roll. Render por GPU.
5. **Composición final (ffmpeg)**: superpone gráficos sobre el rough cut + inserta b-roll
   → master 4K en `../.channel/<slug>/assets/final.mp4`.
6. **Plantillas**: cuando Pablo valide una pieza (intro, lower-third…), promociónala a
   `src/templates/` + `registry/registry.json` con `/plantilla save`.

## Reglas
- Coherencia con la marca: todo color/fuente/spring sale de `src/core/`.
- Masters → `.channel/<slug>/assets/`. El subrepo solo versiona código + plantillas.
- Nada se publica sin validación de Pablo.
