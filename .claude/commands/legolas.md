# /legolas — Research técnico y SEO para un vídeo

Genera `research.md` y/o `seo.md` para el vídeo indicado, commitea directamente
a `main` en `pabpereza/brain` y reporta en #estrategia.

## Uso

```
/legolas $ARGUMENTS
```

`$ARGUMENTS` puede ser:
- Un slug del vault brain: `kubernetes-gateway-api`
- Una URL de YouTube: `https://youtu.be/XXXXX`
- Un slug + instrucción: `kubernetes-gateway-api seo-only`
- Un slug + instrucción: `nuevo-video-slug research+seo`

## Qué hace

1. Localiza el briefing en `/home/pabpereza/brain/videos/{slug}/{slug}_index.md`
2. Lee el `status` del frontmatter:
   - `pre-produccion` → escribe `research.md` + `seo.md`
   - `publicado` → escribe solo `seo.md` (salvo que se pida research explícitamente)
3. Si se indica URL sin slug conocido, hace fetch para obtener el título y trabaja desde ahí
4. Aplica anti-canibalización revisando `seo.md` de vídeos relacionados en el catálogo
5. Commitea a `main` en `pabpereza/brain`:
   - `feat({slug}): add research.md — Legolas`
   - `feat({slug}): add seo.md — Legolas`
6. Reporta en Discord #estrategia (canal `1476946010474283242`) con link al commit

## Output esperado

- `research.md` (si aplica): investigación técnica estructurada, fuentes con URLs
- `seo.md`: 5 títulos, descripción completa con timestamps, 20 tags en doble formato

## Formato de tags (OBLIGATORIO)

```
#tag1 #tag2 #tag3 ...   ← hashtags para YouTube

tag1, tag2, tag3 ...    ← campo de tags de YouTube
```

## Regla de oro

Nada se entrega por Discord. Todo va al repo. Discord solo recibe el reporte de
que el commit está listo.
