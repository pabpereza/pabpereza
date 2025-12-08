### 🔄 Resumen del Flujo de Trabajo Automatizado 

Ahora que tienes los 5 agentes, así es como deberías usarlos con tu repositorio para maximizar tu productividad:

1.  **Paso 1 (Blog/Docs):** Tienes una idea o un apunte en `/docs/notas`.
    * *Acción:* Se lo pasas al **Guionista DevOps**.
    * *Resultado:* Tienes el guion con los "Hooks" y la estructura de retención.
2.  **Paso 2 (Validación):** Tomas los bloques de código del guion.
    * *Acción:* Se los pasas al **Code Validator**.
    * *Resultado:* Código limpio, seguro y datos de prueba listos para tu terminal.
3.  **Paso 3 (Visuales):**
    * *Acción:* Le pides al **Visualizador Técnico** la miniatura y diagramas.
    * *Resultado:* Generas la imagen con DALL-E/Midjourney y el diagrama en Mermaid.
4.  **Paso 4 (Grabación):** *Aquí entras tú.* Grabas la voz y la pantalla siguiendo el guion y usando el código validado.
5.  **Paso 5 (Publicación):**
    * *Acción:* Le pasas el guion final al **Experto SEO**.
    * *Resultado:* Tienes título, descripción y tags para subir a YouTube.
6.  **Paso 6 (Promoción):**
    * *Acción:* Le pasas el enlace del vídeo publicado al **Community Manager**.
    * *Resultado:* Tienes el hilo de Twitter, el post de LinkedIn y las ideas para Shorts.


```mermaid
graph TD
    %% Estilos y Definiciones
    classDef gem fill:#f9f,stroke:#333,stroke-width:2px,color:black;
    classDef human fill:#fff,stroke:#333,stroke-width:4px,color:black;
    classDef artifact fill:#e1f5fe,stroke:#0277bd,stroke-width:2px,color:black;
    classDef platform fill:#ffcdd2,stroke:#c62828,stroke-width:2px,color:black;

    subgraph Ideacion ["💡 Fase 1: Ideación (Repositorio)"]
        RepoFile[("📄 Archivo .md en<br/>/docs o /blog")]:::artifact
    end

    subgraph PreProduccion ["⚙️ Fase 2: Pre-Producción (Automática)"]
        Agent1{{🤖 Agente 1:<br/>Guionista}}:::gem
        Agent2{{🤖 Agente 2:<br/>Technical designer}}:::gem
        Agent5{{🤖 Agente 5:<br/>QA Engineering}}:::gem
        
        Guion[("📜 Guion de<br/>Alta Retención")]:::artifact
        VisualAssets[("🖼️ Prompts Miniatura,<br/> prompts del b-roll & Diagramas Mermaid")]:::artifact
        CleanCode[("✅ Código Seguro<br/>& Dummy Data")]:::artifact
    end

    subgraph Produccion ["🎥 Fase 3: Producción (Humana)"]
        Pablo((👤 Pablo /<br/>Grabación)):::human
        VideoFile[("🎬 Archivo de<br/>Vídeo Final")]:::artifact
    end

    subgraph Publicacion ["🚀 Fase 4: Packaging & SEO"]
        Agent3{{🤖 Agente 3:<br/>Experto SEO}}:::gem
        Metadata[("🏷️ Título, Tags<br/>& Descripción")]:::artifact
        YouTube[("🔴 Subida a<br/>YouTube")]:::platform
    end

    subgraph Difusion ["📢 Fase 5: Difusión & Comunidad"]
        Agent4{{🤖 Agente 4:<br/>Community Manager}}:::gem
        SocialContent[("📱 Hilo X, Post LinkedIn<br/>& Shorts Scripts")]:::artifact
    end

    %% Relaciones del Flujo
    RepoFile --> Agent1
    
    Agent1 --> Guion
    
    Guion --> Agent5
    Agent5 --> CleanCode
    
    Guion --> Agent2
    Agent2 --> VisualAssets
    
    %% Inputs para Pablo
    Guion --> Pablo
    CleanCode --> Pablo
    VisualAssets --> Pablo
    
    Pablo --> VideoFile
    
    %% Flujo SEO
    Guion --> Agent3
    Agent3 --> Metadata
    
    VideoFile --> YouTube
    Metadata --> YouTube
    
    %% Flujo Comunidad
    YouTube -- "URL del Vídeo" --> Agent4
    Agent4 --> SocialContent

    %% Leyenda (Opcional, implícita en formas)
```