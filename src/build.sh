#!/bin/bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"/..

(
    cat templates/preamble.tex
    node src/merge-symbols.mjs 2>/dev/null
    node src/generate-aliases.mjs 2>/dev/null
) > crowsfoot.sty


latexmk example.tex -g --lualatex --auxdir=aux --synctex=0
