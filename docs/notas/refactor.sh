#!/bin/bash

# Recorre todos los archivos en el directorio actual
for file in *; do
  # Solo procesa si es un archivo regular
  if [[ -f "$file" ]]; then
    # Convierte el nombre del archivo a minúsculas
    new_name=$(echo "$file" | tr '[:upper:]' '[:lower:]')

    # Renombra con un nombre temporal si es necesario
    if [[ "$file" == "$new_name" ]]; then
      temp_name="${file}_temp"
      mv "$file" "$temp_name"
      mv "$temp_name" "$new_name"
      echo "Renombrado temporal: $file -> $temp_name -> $new_name"
    else
      mv "$file" "$new_name"
      echo "Renombrado: $file -> $new_name"
    fi
  fi
done

