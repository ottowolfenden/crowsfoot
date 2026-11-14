#!/bin/bash

latexmk crowsfoot.tex \
    --lualatex \
    --auxdir=aux \
    --synctex=0 \
    --file-line-error \
    --interaction=nonstopmode \
