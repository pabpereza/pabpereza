#!/bin/bash

# ==============================================================================
# bpic.sh - Banana Prompt Image Creator
# Extrae prompts de Nano Banana de archivos .md y genera imágenes con Gemini CLI
# ==============================================================================

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Directorio base (donde está el script)
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Verificar argumentos
if [ "$#" -lt 1 ]; then
    echo -e "${YELLOW}🍌 Banana Prompt Image Creator${NC}"
    echo ""
    echo -e "Uso: $0 <ruta_al_archivo_markdown> [directorio_salida]"
    echo ""
    echo "Ejemplos:"
    echo "  $0 ../production/mi_video/guionista_response.md"
    echo "  $0 ../production/mi_video/guionista_response.md ./imagenes"
    echo ""
    echo "El script extrae los prompts '🍌 PROMPT NANO BANANA' del archivo .md"
    echo "y genera imágenes usando geminicli /generate para cada uno."
    exit 1
fi

INPUT_FILE="$1"
OUTPUT_DIR="${2:-$(dirname "$INPUT_FILE")}"

# Verificar que el archivo de entrada existe
if [ ! -f "$INPUT_FILE" ]; then
    echo -e "${RED}❌ Error: El archivo '$INPUT_FILE' no existe.${NC}"
    exit 1
fi

# Verificar que geminicli está disponible
if ! command -v gemini &> /dev/null; then
    echo -e "${RED}❌ Error: El comando 'gemini' no está instalado o no está en el PATH.${NC}"
    echo -e "${YELLOW}   Instálalo siguiendo las instrucciones de: https://github.com/google-gemini/gemini-cli${NC}"
    exit 1
fi

# Crear directorio de salida
mkdir -p "$OUTPUT_DIR"
echo -e "${BLUE}📂 Directorio de salida: ${OUTPUT_DIR}${NC}"

# Extraer prompts de Nano Banana del archivo
# Buscamos bloques de código que siguen a "PROMPT NANO BANANA"
echo -e "${CYAN}🔍 Analizando archivo: ${INPUT_FILE}${NC}"

# Usamos awk para extraer los prompts entre ``` después de "PROMPT NANO BANANA"
# El patrón busca líneas con "PROMPT NANO BANANA" y captura el siguiente bloque de código
PROMPTS=$(awk '
    /PROMPT NANO BANANA/ { found=1; next }
    found && /^```/ { 
        if (in_block) { 
            in_block=0; 
            found=0;
            print "---PROMPT_SEPARATOR---"
        } else { 
            in_block=1 
        }
        next 
    }
    in_block { print }
' "$INPUT_FILE")

# Verificar si encontramos prompts
if [ -z "$PROMPTS" ]; then
    echo -e "${YELLOW}⚠️  No se encontraron prompts de Nano Banana en el archivo.${NC}"
    echo -e "   Asegúrate de que el archivo contiene secciones con:"
    echo -e "   ${CYAN}**🍌 PROMPT NANO BANANA:**${NC}"
    echo -e "   seguidas de un bloque de código con el prompt."
    exit 1
fi

# Contador de imágenes
IMAGE_COUNT=0
TOTAL_PROMPTS=$(echo "$PROMPTS" | grep -c "PROMPT_SEPARATOR" || echo "0")
TOTAL_PROMPTS=$((TOTAL_PROMPTS + 1)) # Añadir 1 porque el último prompt no tiene separador al final

echo -e "${GREEN}✅ Encontrados aproximadamente ${TOTAL_PROMPTS} prompts de Nano Banana${NC}"
echo ""

# Procesar cada prompt
CURRENT_PROMPT=""
while IFS= read -r line; do
    if [ "$line" = "---PROMPT_SEPARATOR---" ]; then
        # Procesar el prompt acumulado
        if [ -n "$CURRENT_PROMPT" ]; then
            IMAGE_COUNT=$((IMAGE_COUNT + 1))
            PADDED_COUNT=$(printf "%02d" $IMAGE_COUNT)
            
            # Limpiar el prompt (eliminar espacios en blanco al inicio/final)
            CLEAN_PROMPT=$(echo "$CURRENT_PROMPT" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
            
            # Generar nombre de archivo basado en las primeras palabras del prompt
            FILENAME_BASE=$(echo "$CLEAN_PROMPT" | head -1 | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | cut -c1-30)
            OUTPUT_FILE="${OUTPUT_DIR}/banana_${PADDED_COUNT}_${FILENAME_BASE}.png"
            
            echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo -e "${GREEN}🍌 Generando imagen ${IMAGE_COUNT}/${TOTAL_PROMPTS}...${NC}"
            echo -e "${BLUE}   Prompt: ${CLEAN_PROMPT:0:80}...${NC}"
            echo -e "${BLUE}   Archivo: ${OUTPUT_FILE}${NC}"
            echo ""
            
            # Llamar a gemini con el comando /generate
            # Usamos un archivo temporal para el prompt completo
            TEMP_PROMPT_FILE=$(mktemp)
            echo "/generate ${CLEAN_PROMPT}" > "$TEMP_PROMPT_FILE"
            
            # Ejecutar gemini de forma interactiva
            # Nota: Esto asume que gemini puede recibir comandos por stdin
            if gemini < "$TEMP_PROMPT_FILE" 2>&1 | tee "${OUTPUT_DIR}/banana_${PADDED_COUNT}_log.txt"; then
                echo -e "${GREEN}   ✅ Imagen generada correctamente${NC}"
            else
                echo -e "${YELLOW}   ⚠️  Posible error al generar la imagen (revisa el log)${NC}"
            fi
            
            # Limpiar archivo temporal
            rm -f "$TEMP_PROMPT_FILE"
            
            echo ""
        fi
        CURRENT_PROMPT=""
    else
        # Acumular líneas del prompt
        if [ -z "$CURRENT_PROMPT" ]; then
            CURRENT_PROMPT="$line"
        else
            CURRENT_PROMPT="${CURRENT_PROMPT} ${line}"
        fi
    fi
done <<< "$PROMPTS"

# Procesar el último prompt (si no terminó con separador)
if [ -n "$CURRENT_PROMPT" ]; then
    IMAGE_COUNT=$((IMAGE_COUNT + 1))
    PADDED_COUNT=$(printf "%02d" $IMAGE_COUNT)
    
    CLEAN_PROMPT=$(echo "$CURRENT_PROMPT" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')
    FILENAME_BASE=$(echo "$CLEAN_PROMPT" | head -1 | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | cut -c1-30)
    OUTPUT_FILE="${OUTPUT_DIR}/banana_${PADDED_COUNT}_${FILENAME_BASE}.png"
    
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🍌 Generando imagen ${IMAGE_COUNT}/${TOTAL_PROMPTS}...${NC}"
    echo -e "${BLUE}   Prompt: ${CLEAN_PROMPT:0:80}...${NC}"
    echo -e "${BLUE}   Archivo: ${OUTPUT_FILE}${NC}"
    echo ""
    
    TEMP_PROMPT_FILE=$(mktemp)
    echo "/generate ${CLEAN_PROMPT}" > "$TEMP_PROMPT_FILE"
    
    if gemini < "$TEMP_PROMPT_FILE" 2>&1 | tee "${OUTPUT_DIR}/banana_${PADDED_COUNT}_log.txt"; then
        echo -e "${GREEN}   ✅ Imagen generada correctamente${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Posible error al generar la imagen (revisa el log)${NC}"
    fi
    
    rm -f "$TEMP_PROMPT_FILE"
fi

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🍌 ¡Proceso completado!${NC}"
echo -e "${BLUE}   Total de imágenes procesadas: ${IMAGE_COUNT}${NC}"
echo -e "${BLUE}   Directorio de salida: ${OUTPUT_DIR}${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
