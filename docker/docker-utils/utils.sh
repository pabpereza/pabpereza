#!/bin/bash

# Inputs
if [ -z "$1" ] && [ -z "$2" ]; then
	echo "Usage: ./utils.sh <mode> <path>"
	exit 1
fi

if [ $1 = "export" ]; then
	echo "Exporting all the images"
	docker save $(docker images -q) -o $2
elif [ $1 = "import" ]; then
	echo "Importing all the images"
	docker load -i $2
fi
