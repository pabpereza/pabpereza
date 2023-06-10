#!/bin/bash

# This script is used to generate the index diagram for the documentation
# It list all the folders in the documentation and generate a diagram

# Documentation path
docs="content/es/docs"

# Index path
index="content/es/docs/_index.md"

# Generate markmap headers in the index
echo "" >> $index
echo "\`\`\`markmap" >> $index


# Recursively list all the folders in the documentation
list_folders=$(find $docs -type d)

# Order the folders by name
list_folders=$(echo "$list_folders" | sort)

# Remove the first line
list_folders=$(echo "$list_folders" | sed '1d')

for folder in $list_folders; do

  # Remove the first part of the path 
  folder=${folder#"$docs"}


  # Remove the first slash
  folder=${folder#"/"}
  
  # Take last part of the path
  alias=${folder##*/}

  # Capitalize the first letter
  alias="$(tr '[:lower:]' '[:upper:]' <<< ${alias:0:1})${alias:1}"

  # Count the number of slashes
  slashes=$(grep -o "/" <<< "$folder" | wc -l)

  # URL format
  folder="[$alias](/docs/$folder)"
  echo "$folder"
  
  # Add a space in the beginning of the line
  folder=" $folder"

  # Add # in the beginning of the line with the number of slashes
  for ((i=0; i<$slashes +1; i++)); do
	folder="#$folder"
  done

  # Add the folder to the index
  echo "$folder" >> $index

done


# Generate markmap footer in the index
echo "\`\`\`" >> $index