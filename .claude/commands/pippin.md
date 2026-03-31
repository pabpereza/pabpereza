# /pippin — Genera posts de RRSS para un vídeo

Genera borradores de posts para LinkedIn, X (Twitter), YouTube Community e Instagram/TikTok a partir del vídeo o slug indicado.

## Uso

```
/pippin $ARGUMENTS
```

`$ARGUMENTS` puede ser:
- Un slug del vault brain: `claude-chrome-extension`
- Una URL de YouTube: `https://youtu.be/XXXXX`
- Un título libre si el vídeo aún no tiene slug

## Qué hace

1. Si recibe un slug, busca en `/home/pabpereza/brain/videos/{slug}/` y lee `seo.md` + `script.md`
2. Si recibe una URL, hace fetch para obtener título y descripción
3. Genera borradores por plataforma siguiendo las reglas de formato de Pippin
4. Presenta el output en el canal actual para revisión

## Output esperado

- **LinkedIn**: post completo con hook, cuerpo y pregunta de cierre
- **X**: tweet principal (≤280 chars) + hilo de 3-4 tweets
- **YouTube Community**: post teaser (poll) + post de lanzamiento (poll)
- **Instagram/TikTok**: caption con hook y hashtags

## Regla de oro

Nada se publica sin aprobación explícita de Pablo. Este comando solo genera borradores.
