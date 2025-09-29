# GitHub Copilot Instructions

Esta guía proporciona directrices para GitHub Copilot y otros agentes de IA que trabajen en este repositorio de contenido educativo.

## Principios Generales

- **Claridad**: Prioriza la comprensión sobre la brevedad
- **Pedagogía**: Explica conceptos complejos de forma simple y progresiva
- **Consistencia**: Mantén un estilo consistente en toda la documentación
- **Accesibilidad**: Haz el contenido accesible para diferentes niveles de conocimiento

## Estructura de Contenido

### Blog Posts (`/blog/`)
- Crear una carpeta por artículo con nombre descriptivo (ej: `introduccion-docker`)
- Incluir archivo `index.md` con el contenido principal
- Añadir carpeta `assets/` para imágenes y recursos
- Usar nombres de archivo descriptivos para las imágenes

### Documentación de Cursos (`/docs/cursos/`)
- Organizar por curso y sección (ej: `/docs/cursos/kubernetes/fundamentos/`)
- Usar numeración para orden de lecciones (ej: `01-introduccion.md`)
- Incluir índice navegable en cada sección
- Proporcionar ejemplos prácticos y ejercicios

## Estilo de Redacción

### Principios de Escritura
- Usa un tono conversacional pero profesional
- Explica acrónimos y términos técnicos en su primera aparición
- Incluye analogías para conceptos complejos
- Estructura el contenido con subtítulos claros
- Usa listas y bullets para información concisa

### Progresión Pedagógica
- Comienza con conceptos básicos antes de avanzar
- Incluye ejemplos prácticos después de cada concepto
- Proporciona ejercicios o retos cuando sea apropiado
- Resume puntos clave al final de cada sección

## Formato Markdown

### Estructura de Documentos
```markdown
# Título Principal

## Introducción
Breve descripción del tema y objetivos de aprendizaje.

## Conceptos Fundamentales
### Subtema 1
Explicación clara con ejemplos.

### Subtema 2
Continuación lógica del tema anterior.

## Ejemplos Prácticos
Casos de uso reales y código cuando sea aplicable.

## Conclusiones
Resumen de puntos clave y próximos pasos.

## Recursos Adicionales
Enlaces y referencias para profundizar.
```

### Uso de Elementos Markdown
- **Énfasis**: Usa `**negrita**` para conceptos importantes
- **Código**: Usa `código inline` para comandos y `bloques de código` para ejemplos
- **Citas**: Usa `>` para destacar definiciones o puntos importantes
- **Listas**: Prefiere listas numeradas para pasos secuenciales
- **Enlaces**: Usa texto descriptivo para enlaces, evita "clic aquí"

## Convenciones para Imágenes

### Nomenclatura
- Usa nombres descriptivos: `docker-architecture-diagram.png`
- Incluye alt text descriptivo para accesibilidad
- Organiza en carpetas por tema dentro de `assets/`

### Formato y Calidad
- Prefiere formato PNG para diagramas y capturas
- Usa JPG para fotografías
- Optimiza el tamaño sin perder calidad
- Incluye imágenes en alta resolución cuando sea necesario

## Ejemplos de Contenido de Calidad

### Artículo de Blog
```markdown
# Introducción a Docker: Simplificando el Desarrollo

## ¿Qué es Docker?

Docker es como una **caja mágica** que permite empaquetar aplicaciones junto con todas sus dependencias. Imagina que quieres enviar un regalo frágil por correo: lo empaquetas cuidadosamente en una caja con todo lo necesario para que llegue intacto.

> **Definición**: Docker es una plataforma de contenedores que permite crear, distribuir y ejecutar aplicaciones de forma consistente en cualquier entorno.

## ¿Por qué usar Docker?

### 1. Consistencia entre entornos
- **Problema**: "En mi máquina funciona"
- **Solución**: Docker garantiza que funcione igual en desarrollo, testing y producción

### 2. Aislamiento de aplicaciones
Cada contenedor es independiente, como apartamentos en un edificio.

## Tu primer contenedor

```bash
# Ejecutar tu primer contenedor
docker run hello-world
```

Este command
export const UserCard: React.FC<UserCardProps> = ({ user, onUserClick }) => {
  const handleClick = useCallback(() => {
    onUserClick(user.id);
  }, [user.id, onUserClick]);

  return (
    <div 
      className="user-card" 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <img src={user.avatar} alt={`Avatar de ${user.name}`} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};
```

## Recursos Adicionales

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

> **Nota**: Estas instrucciones deben evolucionar con el proyecto. Actualiza este archivo según las necesidades del equipo y las lecciones aprendidas.
