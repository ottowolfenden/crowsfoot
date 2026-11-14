#!/bin/bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"

node src/merge.mjs
latexmk example.tex \
    -g \
    --lualatex \
    --auxdir=aux \
    --synctex=0 \
    --file-line-error \
    --interaction=nonstopmode
