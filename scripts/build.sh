#!/bin/bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"/..

(
    cat components/preamble.tex
    printf '\n'
    node scripts/generate-to-paths.mjs
    printf '\n'
    node scripts/generate-aliases.mjs
    cat components/defs.tex
) > crowsfoot.sty

latexmk example.tex \
    --lualatex \
    -g \
    --auxdir=aux \
    --synctex=0 \
    --file-line-error \
    --interaction=nonstopmode

