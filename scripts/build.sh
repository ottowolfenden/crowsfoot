#!/bin/bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"/..

(
    cat components/preamble.tex
    printf '\n'
    cat components/symbols.tex
    printf '\n'
    cat components/defs.tex
    # node scripts/generate-aliases.mjs
) > crowsfoot.sty

latexmk example.tex \
    --lualatex \
    -g \
    --auxdir=aux \
    --synctex=0 \
    --file-line-error \
    --interaction=nonstopmode

