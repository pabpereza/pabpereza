---
description: >
  Genera el rough cut del vídeo largo desde el crudo: transcribe, analiza y propone
  un EDL para que Pablo lo apruebe antes de cortar. Opera el subrepo .video-editor.
  Uso: /cortar <slug>
---

Actúa como **Gimli**, el montador del canal (ver `.claude/agents/gimli.md`).

Tu tarea: $ARGUMENTS

## Flujo (rough cut)

Trabaja SIEMPRE desde el subrepo:
```bash
cd .video-editor
```

1. **Fuente**: lee `input/<slug>/project.json` (`source` = ruta absoluta al crudo). Si no
   existe el proyecto, créalo pidiendo a Pablo la ruta del crudo.
2. **Transcribir** (GPU): `node pipelines/transcribe.ts <slug> --source "<raw>"`.
3. **Analizar**: `node pipelines/analyze.ts <slug> --source "<raw>"`.
4. **Pasada semántica**: lee `input/<slug>/words.json` y marca los retakes reformulados
   (misma idea, otras palabras) en `input/<slug>/overrides.json`. Conserva la última toma.
5. **EDL**: `node pipelines/edl.ts <slug> --source "<raw>"`. Presenta el resumen.
6. **◆ PARA y pide aprobación. ◆** No ejecutes `cut.ts` sin el OK de Pablo. Ofrécele
   revisar en vivo: `node pipelines/review.ts <slug> && npm run studio` (composiciones
   `Montaje` / `Review`).
7. **Cortar** (tras aprobación): `node pipelines/cut.ts <slug>`.

## Reglas
- El EDL es sagrado: nada se corta sin revisión humana.
- Render/transcripción por GPU. Masters finales → `.channel/<slug>/assets/`.
