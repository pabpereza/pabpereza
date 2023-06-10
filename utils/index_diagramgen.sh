#!/bin/bash

# This script is used to generate the index diagram for the documentation
# It list all the folders in the documentation and generate a diagram

# Index path
index="../content/es/docs/_index.md"

# Documentation path
docs="../content/es/docs"

# Generate markmap headers in the index
echo "" >> $index
echo "\`\`\`markmap" >> $index
echo "# Mapa web"  >> $index


# Recursively list all the folders in the documentation
list_folders=$(find $docs -type d)

# Order the folders by name
list_folders=$(echo "$list_folders" | sort)

for folder in $list_folders; do
  # Remove the first part of the path
  folder=${folder#"$docs"}

  # Count the number of slashes
  slashes=$(grep -o "/" <<< "$folder" | wc -l)

  # Take the last part of the path
  folder=${folder##*/}

  # Add a space in the beginning of the line
  folder=" $folder"

  # Add # in the beginning of the line with the number of slashes
  for ((i=0; i<$slashes; i++)); do
	folder="#$folder"
  done

  # Add the folder to the index
  echo "$folder" >> $index

done


# Generate markmap footer in the index
echo "\`\`\`" >> $index