# /boromir — Revisión técnica de un vídeo

Ejecuta una revisión técnica completa del vídeo indicado: verifica precisión
factual, comandos, versiones, URLs y riesgos de seguridad. Reporta en
#estrategia con hallazgos clasificados por criticidad.

## Uso

```
/boromir $ARGUMENTS
```

`$ARGUMENTS` puede ser:
- Un slug del vault brain: `kubernetes-gateway-api`
- Un slug + archivo concreto: `kubernetes-gateway-api research`
- Un slug + varios archivos: `kubernetes-gateway-api research script`
- Sin argumentos: revisa el vídeo más reciente con status `en-revision`

## Qué hace

1. Localiza el briefing en `/home/pabpereza/brain/videos/{slug}/{slug}_index.md`
2. Identifica qué archivos revisar según el argumento:
   - Sin especificar → revisa `research.md`, `script.md` y `assets.md` (todos los disponibles)
   - `research` → solo `research.md`
   - `script` → solo `script.md`
   - `assets` → solo `assets.md`
3. Lee cada archivo en su totalidad antes de emitir juicio
4. Para afirmaciones técnicas relevantes, verifica contra fuentes primarias con `WebFetch`
5. Clasifica los hallazgos:
   - 🔴 Crítico — bloquea el pipeline
   - ⚠️ Mejora — imprecisión o desactualización
   - 💡 Sugerencia — información que añadiría valor
6. Reporta en Discord #estrategia (canal `1476946010474283242`) con formato estándar

## Output esperado

Mensaje en Discord #estrategia con:
- Veredicto general (una línea)
- Hallazgos clasificados por categoría
- Resumen de acciones para el agente responsable (Legolas, Frodo o Merry)
- Conclusión: listo para continuar / bloqueado

Si el reporte supera 1800 caracteres, divide en partes numeradas e indica
cuántas antes de empezar.

## Qué NO revisa

- Estilo narrativo o estructura del guion
- SEO y keywords
- Calidad visual de assets

## Regla de oro

El reporte va a Discord. Nada se escribe como archivo en el repo.
