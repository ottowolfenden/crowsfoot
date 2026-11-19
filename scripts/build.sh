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

rm -rf svgs
mkdir -p svgs

{
    echo '\AtBeginDocument{\color{white}}'
    cat example.tex
} > "tmp.tex"

latexmk --lualatex --auxdir=aux example.tex
latexmk --latex --auxdir=aux example.tex tmp.tex
dvisvgm --no-fonts --page=1- --exact --output="svgs/%p-black.svg" example.dvi
dvisvgm --no-fonts --page=1- --exact --output="svgs/%p-white.svg" tmp.dvi
rm example.dvi tmp.dvi tmp.tex
