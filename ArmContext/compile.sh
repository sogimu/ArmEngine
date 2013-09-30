#!/bin/bash

NAME="armcontext"
VERSION="0.5.0"
RASHIR="js"

FILE_NAME=$NAME-$VERSION.$RASHIR
FILE_NAME_MIN=$NAME".min"-$VERSION.$RASHIR
FILE_NAME_WITHOUT_VERSION=$NAME.$RASHIR

PATH_TO_COMPILER="../"

COMPILATION_LEVEL="WHITESPACE_ONLY"
# COMPILATION_LEVEL="SIMPLE_OPTIMIZATIONS"
# COMPILATION_LEVEL="ADVANCED_OPTIMIZATIONS"

echo "Building..."
java -jar "$PATH_TO_COMPILER"compiler.jar --js modules/ArmContext/ArmContext.js --js modules/Primitve/InternalRepresentation.js --js modules/Primitve/GlobalRepresentation.js --js modules/Primitve/C2dContextRepresentation.js --js modules/Primitve/MvMatrix.js --js modules/Primitve/Debug.js --js modules/Primitve/BoundingBox.js --js modules/Primitve/TransformQuene.js --js modules/Primitve/Primitive.js --js modules/Primitve/Rect/Rect2dContextRepresentation.js --js modules/Primitve/Rect/RectGlobalRepresentation.js --js modules/Primitve/Rect/RectInternalRepresentation.js --js modules/Primitve/Rect/Rect.js --js modules/Primitve/Image/Image2dContextRepresentation.js --js modules/Primitve/Image/ImageGlobalRepresentation.js --js modules/Primitve/Image/ImageInternalRepresentation.js --js modules/Primitve/Image/Image.js --js modules/Layer/Primitives.js --js modules/Layer/Layer.js --compilation_level "$COMPILATION_LEVEL" --language_in ECMASCRIPT5 --js_output_file ./$FILE_NAME_MIN

echo "$FILE_NAME_MIN"

echo "$FILE_NAME_WITHOUT_VERSION"
cp "$FILE_NAME_MIN" "$FILE_NAME_WITHOUT_VERSION"

echo "$FILE_NAME"
cp "$FILE_NAME_MIN" "$FILE_NAME"