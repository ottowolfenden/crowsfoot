#!/bin/bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"/..

(
    cat templates/preamble.tex
    printf '\n'
    cat templates/symbols.tex
    printf '\n'
    # node src/generate-aliases.mjs
) > crowsfoot.sty

latexmk example.tex \
    --lualatex \
    -g \
    --auxdir=aux \
    --synctex=0 \
    --file-line-error \
    --interaction=nonstopmode

