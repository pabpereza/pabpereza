#!/bin/bash

# Ansible Course Module Validation Script
# Validates all modules (00-10) meet QA criteria

echo "🔍 Validating Ansible Course Modules"
echo "======================================"
echo ""

MODULES=(
    "docs/cursos/ansible/00-introduccion.md"
    "docs/cursos/ansible/01-fundamentos.md"
    "docs/cursos/ansible/02-instalacion.md"
    "docs/cursos/ansible/03-inventarios.md"
    "docs/cursos/ansible/04-playbooks.md"
    "docs/cursos/ansible/05-modulos.md"
    "docs/cursos/ansible/06-variables.md"
    "docs/cursos/ansible/07-roles.md"
    "docs/cursos/ansible/08-templates.md"
    "docs/cursos/ansible/09-ansible-galaxy.md"
    "docs/cursos/ansible/10-buenas-practicas.md"
)

ERRORS=0
WARNINGS=0

validate_module() {
    local file=$1
    local module_num=$(basename "$file" | cut -d'-' -f1)

    echo "📄 Module $module_num: $(basename "$file")"
    echo "   File: $file"

    # Check 1: File exists
    if [ ! -f "$file" ]; then
        echo "   ❌ ERROR: File does not exist"
        ((ERRORS++))
        echo ""
        return
    fi

    # Check 2: Proper frontmatter
    local has_frontmatter=$(head -n 1 "$file" | grep -c "^---$")
    if [ "$has_frontmatter" -eq 0 ]; then
        echo "   ❌ ERROR: Missing frontmatter (no opening ---)"
        ((ERRORS++))
    else
        echo "   ✅ Has frontmatter"

        # Check for required frontmatter fields
        local has_id=$(grep -c "^id:" "$file")
        local has_title=$(grep -c "^title:" "$file")
        local has_sidebar_label=$(grep -c "^sidebar_label:" "$file")
        local has_sidebar_position=$(grep -c "^sidebar_position:" "$file")

        if [ "$has_id" -eq 0 ]; then
            echo "   ⚠️  WARNING: Missing 'id' in frontmatter"
            ((WARNINGS++))
        fi
        if [ "$has_title" -eq 0 ]; then
            echo "   ❌ ERROR: Missing 'title' in frontmatter"
            ((ERRORS++))
        fi
        if [ "$has_sidebar_label" -eq 0 ]; then
            echo "   ⚠️  WARNING: Missing 'sidebar_label' in frontmatter"
            ((WARNINGS++))
        fi
        if [ "$has_sidebar_position" -eq 0 ]; then
            echo "   ❌ ERROR: Missing 'sidebar_position' in frontmatter"
            ((ERRORS++))
        fi
    fi

    # Check 3: Substantial content (500+ words)
    # Count words excluding frontmatter and code blocks
    local word_count=$(sed -n '/^---$/,/^---$/!p' "$file" | \
                       sed '/^```/,/^```$/d' | \
                       wc -w | tr -d ' ')

    echo "   📊 Word count: $word_count words"
    if [ "$word_count" -lt 500 ]; then
        echo "   ❌ ERROR: Insufficient content (< 500 words)"
        ((ERRORS++))
    else
        echo "   ✅ Substantial content (>= 500 words)"
    fi

    # Check 4: At least one practical example (code block)
    local code_blocks=$(grep -c "^```" "$file")
    local yaml_blocks=$(grep -c "^```yaml" "$file")
    local bash_blocks=$(grep -c "^```bash" "$file")

    echo "   💻 Code blocks: $code_blocks total ($yaml_blocks YAML, $bash_blocks Bash)"
    if [ "$code_blocks" -lt 2 ]; then
        echo "   ❌ ERROR: No practical examples (need at least 1 code block)"
        ((ERRORS++))
    else
        echo "   ✅ Has practical examples"
    fi

    # Check 5: Spanish content
    # Check for common Spanish words and patterns
    local spanish_indicators=$(grep -ciE "(es |son |tiene |como |para |con |por |este |esta |los |las |del |más |también|está|están)" "$file")

    if [ "$spanish_indicators" -lt 10 ]; then
        echo "   ⚠️  WARNING: Content may not be in Spanish (few Spanish indicators found)"
        ((WARNINGS++))
    else
        echo "   ✅ Spanish content detected"
    fi

    # Check 6: Proper heading hierarchy
    local h1_count=$(grep -c "^# " "$file")
    local h2_count=$(grep -c "^## " "$file")

    echo "   📑 Headings: H1=$h1_count, H2=$h2_count"
    if [ "$h1_count" -eq 0 ]; then
        echo "   ❌ ERROR: No H1 heading found"
        ((ERRORS++))
    elif [ "$h1_count" -gt 1 ]; then
        echo "   ⚠️  WARNING: Multiple H1 headings (should have only one)"
        ((WARNINGS++))
    fi

    if [ "$h2_count" -eq 0 ]; then
        echo "   ⚠️  WARNING: No H2 headings (content may lack structure)"
        ((WARNINGS++))
    else
        echo "   ✅ Proper heading structure"
    fi

    echo ""
}

# Validate all modules
for module in "${MODULES[@]}"; do
    validate_module "$module"
done

# Summary
echo "======================================"
echo "📊 VALIDATION SUMMARY"
echo "======================================"
echo "Total modules checked: ${#MODULES[@]}"
echo "❌ Errors: $ERRORS"
echo "⚠️  Warnings: $WARNINGS"
echo ""

if [ "$ERRORS" -eq 0 ]; then
    echo "✅ All modules pass validation!"
    exit 0
else
    echo "❌ Validation failed with $ERRORS error(s)"
    exit 1
fi
