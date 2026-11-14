#!/bin/bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"/..

(
    cat templates/preamble.tex
    printf '\n'
    node src/merge-symbols.mjs
    node src/generate-aliases.mjs
) > crowsfoot.sty


latexmk example.tex \
    -g \
    --lualatex \
    --auxdir=aux \
    --synctex=0 \
    --file-line-error \
    --interaction=nonstopmode
