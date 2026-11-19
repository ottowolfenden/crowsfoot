#!/bin/bash

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"/..

{
    cat components/preamble.tex
    printf '\n'
    node scripts/merge-to-paths.mjs
    printf '\n'
    node scripts/generate-aliases.mjs
    cat components/defs.tex
} > "crowsfoot.sty"

tex-fmt crowsfoot.sty --noconfig --nowrap --tabsize 4

{
    echo '\AtBeginDocument{\color{white}}'
    cat examples.tex
} > "tmp.tex"

rm -rf svgs
mkdir -p svgs

latexmk --lualatex --auxdir=aux examples.tex
latexmk --latex --auxdir=aux examples.tex tmp.tex

rm tmp.tex

dvisvgm --no-fonts --page=1- --exact --output="svgs/%p-black.svg" examples.dvi
dvisvgm --no-fonts --page=1- --exact --output="svgs/%p-white.svg" tmp.dvi

rm examples.dvi tmp.dvi
