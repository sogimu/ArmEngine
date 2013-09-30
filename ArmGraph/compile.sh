#!/bin/bash

NAME="armgraph"
VERSION="0.1.0"
RASHIR="js"

FILE_NAME=$NAME-$VERSION.$RASHIR
FILE_NAME_MIN=$NAME".min"-$VERSION.$RASHIR
FILE_NAME_WITHOUT_VERSION=$NAME.$RASHIR

PATH_TO_COMPILER="../"

COMPILATION_LEVEL="WHITESPACE_ONLY"
# COMPILATION_LEVEL="SIMPLE_OPTIMIZATIONS"
# COMPILATION_LEVEL="ADVANCED_OPTIMIZATIONS"

echo "Building..."
java -jar "$PATH_TO_COMPILER"compiler.jar --js modules/ArmGraph/ArmGraph.js --js modules/ArmObject/ArmObject.js --js modules/Root/EventStack.js --js modules/Root/Root.js --compilation_level "$COMPILATION_LEVEL" --language_in ECMASCRIPT5 --js_output_file ./$FILE_NAME_MIN

echo "$FILE_NAME_MIN"

echo "$FILE_NAME_WITHOUT_VERSION"
cp "$FILE_NAME_MIN" "$FILE_NAME_WITHOUT_VERSION"

echo "$FILE_NAME"
cp "$FILE_NAME_MIN" "$FILE_NAME"