#!/bin/bash

latexmk \
    --lualatex \
    --auxdir=aux \
    --synctex=0 \
    --file-line-error \
    --interaction=nonstopmode \
    crowfoot.tex
