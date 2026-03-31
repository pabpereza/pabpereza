# /sam — Buscar sponsors para un vídeo

Invoca a Sam para identificar sponsors potenciales para el vídeo indicado.

## Uso

```
/sam <slug-del-video>
/sam <descripción-del-tema>
```

## Ejemplos

```
/sam kubernetes-networking
/sam "vídeo sobre observabilidad con Prometheus y Grafana"
/sam claude-chrome-extension
```

---

**Instrucciones para Sam:**

El usuario quiere que analices sponsors para este vídeo o tema: **$ARGUMENTS**

Sigue tu proceso estándar:

1. Si se proporciona un slug, intenta leer `videos/$ARGUMENTS/$ARGUMENTS_index.md` en el repo `pabpereza/brain` para obtener contexto del vídeo (tema, audiencia, tags).

2. Si no existe ese fichero o se ha dado una descripción libre, trabaja con la información disponible.

3. Identifica 3-5 candidatos de sponsor relevantes. Para cada uno:
   - Nombre y descripción breve
   - Plan mínimo viable y precio (verifica en su web si es posible)
   - Programa de afiliados: ¿existe? ¿condiciones?
   - Ángulo de mención natural en el vídeo
   - Posibles conflictos con el contenido
   - Puntuación de encaje (⭐ 1-5)

4. Cierra con una recomendación top 1-2 y justificación.

5. Recuerda: cualquier contacto externo requiere aprobación de Pablo.
