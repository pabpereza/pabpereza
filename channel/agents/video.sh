#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Directorio base (donde está el script)
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AGENTS_DIR="$BASE_DIR"

# Verificar argumentos
if [ "$#" -lt 1 ]; then
    echo -e "${YELLOW}Uso: $0 <ruta_al_archivo_markdown> [agente1 agente2 ...]${NC}"
    echo "Ejemplo: $0 ../../blog/2025/mi_articulo.md"
    echo "Ejemplo: $0 ../../blog/2025/mi_articulo.md seo guionista"
    exit 1
fi

INPUT_FILE="$1"
shift # Desplazar argumentos para dejar solo los agentes (si los hay)

# Verificar que el archivo de entrada existe
if [ ! -f "$INPUT_FILE" ]; then
    echo -e "${YELLOW}Error: El archivo '$INPUT_FILE' no existe.${NC}"
    exit 1
fi

# Crear directorio de salida (reutilizar si ya existe)
FILENAME=$(basename "$INPUT_FILE" .md)
PRODUCTION_DIR="$BASE_DIR/../production"

# Buscar si ya existe una carpeta para este archivo
EXISTING_DIR=$(find "$PRODUCTION_DIR" -maxdepth 1 -type d -name "${FILENAME}_*" 2>/dev/null | head -1)

if [ -n "$EXISTING_DIR" ]; then
    OUTPUT_DIR="$EXISTING_DIR"
    echo -e "${BLUE}📂 Reutilizando carpeta existente: ${OUTPUT_DIR}${NC}"
else
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    OUTPUT_DIR="$PRODUCTION_DIR/${FILENAME}_${TIMESTAMP}"
    mkdir -p "$OUTPUT_DIR"
    echo -e "${BLUE}📂 Creando nueva carpeta: ${OUTPUT_DIR}${NC}"
fi

echo -e "${BLUE}🚀 Iniciando flujo de trabajo para: ${FILENAME}${NC}"

# Función para generar el prompt combinado
generate_prompt() {
    local agent_name="$1"
    local agent_file="$AGENTS_DIR/${agent_name}.md"
    local output_prompt="$OUTPUT_DIR/${agent_name}_prompt.txt"
    local output_response="$OUTPUT_DIR/${agent_name}_response.md"
    
    if [ ! -f "$agent_file" ]; then
        echo -e "${YELLOW}⚠️  Advertencia: No se encontró el agente '$agent_name' en $agent_file${NC}"
        return
    fi

    echo -e "${GREEN}🤖 Preparando agente: ${agent_name}...${NC}"

    # Construir el prompt en memoria
    local prompt_content
    prompt_content="--- INSTRUCCIONES DEL SISTEMA ---
$(cat "$agent_file")

--- TAREA: ANALIZA EL SIGUIENTE CONTENIDO ---
$(cat "$INPUT_FILE")"

    # Ejecutar con Gemini CLI
    if command -v gemini &> /dev/null; then
        echo -e "${BLUE}   🚀 Ejecutando prompt con Gemini CLI...${NC}"
        printf "%s" "$prompt_content" | gemini > "$output_response"
        echo -e "${GREEN}   ✨ Respuesta guardada en: $output_response${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Comando 'gemini' no encontrado. Guardando prompt en disco.${NC}"
        printf "%s" "$prompt_content" > "$output_prompt"
        echo "   ✅ Prompt guardado en: $output_prompt"
    fi
}

# Determinar qué agentes ejecutar
if [ "$#" -gt 0 ]; then
    AGENTS=("$@")
else
    AGENTS=("seo" "guionista" "tech_designer" "qa" "cm")
fi

# Iterar sobre los agentes
for agent in "${AGENTS[@]}"; do
    generate_prompt "$agent"
done

echo -e "\n${BLUE}✨ Proceso finalizado.${NC}"
echo "Los resultados se encuentran en: $OUTPUT_DIR"
