#!/bin/bash

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Directorio base (donde está el script)
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AGENTS_DIR="$BASE_DIR"

# Verificar argumentos
if [ "$#" -lt 1 ]; then
    echo -e "${YELLOW}Uso: $0 <entrada> [nombre_salida]${NC}"
    echo ""
    echo "Tipos de entrada soportados:"
    echo "  - Archivo:  $0 ../../blog/2025/mi_articulo.md"
    echo "  - URL:      $0 https://example.com/articulo"
    echo "  - Texto:    $0 \"Tu texto o idea aquí\" mi_proyecto"
    echo ""
    echo "Este script ejecuta el flujo de drafting:"
    echo "  1. Research: Investiga y recopila información"
    echo "  2. Drafter: Genera el borrador basándose en la investigación"
    exit 1
fi

INPUT="$1"
CUSTOM_NAME="$2"
INPUT_CONTENT=""
INPUT_NAME=""

# Detectar tipo de entrada: archivo, URL o texto
if [ -f "$INPUT" ]; then
    # Es un archivo
    INPUT_TYPE="file"
    INPUT_CONTENT=$(cat "$INPUT")
    INPUT_NAME=$(basename "$INPUT" .md)
    echo -e "${BLUE}📄 Tipo de entrada detectado: Archivo${NC}"
elif [[ "$INPUT" =~ ^https?:// ]]; then
    # Es una URL
    INPUT_TYPE="url"
    INPUT_CONTENT="URL para investigar: $INPUT"
    # Extraer nombre de la URL (dominio + path simplificado)
    INPUT_NAME=$(echo "$INPUT" | sed -E 's|https?://||; s|/+|_|g; s|[^a-zA-Z0-9_-]||g' | cut -c1-50)
    echo -e "${BLUE}🌐 Tipo de entrada detectado: URL${NC}"
else
    # Es texto directo
    INPUT_TYPE="text"
    INPUT_CONTENT="$INPUT"
    if [ -n "$CUSTOM_NAME" ]; then
        INPUT_NAME="$CUSTOM_NAME"
    else
        # Generar nombre a partir del texto (primeras palabras)
        INPUT_NAME=$(echo "$INPUT" | tr ' ' '_' | tr -cd '[:alnum:]_-' | cut -c1-30)
        [ -z "$INPUT_NAME" ] && INPUT_NAME="draft"
    fi
    echo -e "${BLUE}📝 Tipo de entrada detectado: Texto${NC}"
fi

# Si se proporciona nombre personalizado, usarlo
[ -n "$CUSTOM_NAME" ] && INPUT_NAME="$CUSTOM_NAME"

# Verificar que gemini CLI está disponible
if ! command -v gemini &> /dev/null; then
    echo -e "${RED}Error: El comando 'gemini' no está instalado o no está en el PATH.${NC}"
    echo "Por favor, instala Gemini CLI para usar este script."
    exit 1
fi

# Verificar que los agentes existen
RESEARCH_AGENT="$AGENTS_DIR/research.md"
DRAFTER_AGENT="$AGENTS_DIR/drafter.md"

if [ ! -f "$RESEARCH_AGENT" ]; then
    echo -e "${RED}Error: No se encontró el agente 'research.md' en $RESEARCH_AGENT${NC}"
    exit 1
fi

if [ ! -f "$DRAFTER_AGENT" ]; then
    echo -e "${RED}Error: No se encontró el agente 'drafter.md' en $DRAFTER_AGENT${NC}"
    exit 1
fi

# Crear directorio de salida (reutilizar si ya existe)
FILENAME="$INPUT_NAME"
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

echo -e "${BLUE}🚀 Iniciando flujo de drafting para: ${FILENAME}${NC}"
echo ""

# ============================================
# PASO 1: Research
# ============================================
echo -e "${GREEN}📚 PASO 1: Ejecutando Research...${NC}"

RESEARCH_OUTPUT="$OUTPUT_DIR/research_response.md"

# Construir el prompt de research
RESEARCH_PROMPT="--- INSTRUCCIONES DEL SISTEMA ---
$(cat "$RESEARCH_AGENT")

--- TAREA: ANALIZA EL SIGUIENTE CONTENIDO ---
$INPUT_CONTENT"

echo -e "${BLUE}   🔍 Investigando contenido con Gemini CLI...${NC}"
printf "%s" "$RESEARCH_PROMPT" | gemini > "$RESEARCH_OUTPUT"

if [ $? -ne 0 ]; then
    echo -e "${RED}   ❌ Error al ejecutar el agente de research${NC}"
    exit 1
fi

echo -e "${GREEN}   ✅ Research completado: $RESEARCH_OUTPUT${NC}"
echo ""

# ============================================
# PASO 2: Drafter
# ============================================
echo -e "${GREEN}✍️  PASO 2: Ejecutando Drafter...${NC}"

DRAFTER_OUTPUT="$OUTPUT_DIR/drafter_response.md"

# Construir el prompt de drafter usando la salida del research
DRAFTER_PROMPT="--- INSTRUCCIONES DEL SISTEMA ---
$(cat "$DRAFTER_AGENT")

--- CONTEXTO: INVESTIGACIÓN PREVIA ---
$(cat "$RESEARCH_OUTPUT")

--- CONTENIDO ORIGINAL ---
$INPUT_CONTENT"

echo -e "${BLUE}   📝 Generando borrador con Gemini CLI...${NC}"
printf "%s" "$DRAFTER_PROMPT" | gemini > "$DRAFTER_OUTPUT"

if [ $? -ne 0 ]; then
    echo -e "${RED}   ❌ Error al ejecutar el agente drafter${NC}"
    exit 1
fi

echo -e "${GREEN}   ✅ Borrador completado: $DRAFTER_OUTPUT${NC}"
echo ""

# ============================================
# Resumen final
# ============================================
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${GREEN}✨ Proceso de drafting finalizado con éxito${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo ""
echo -e "📁 Archivos generados en: ${OUTPUT_DIR}"
echo -e "   📚 Research: research_response.md"
echo -e "   ✍️  Borrador: drafter_response.md"
echo ""
