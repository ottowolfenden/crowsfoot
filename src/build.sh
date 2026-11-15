#!/bin/bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"/..

(
    cat templates/preamble.tex
    node src/generate-aliases.mjs
) > crowsfoot.sty

latexmk example.tex -g --lualatex --auxdir=aux --synctex=0
