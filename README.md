# crowsfoot

A LaTeX package for drawing entity-relationship diagrams using crow's foot notation.

## Usage
Copy the [crowsfoot.sty](https://github.com/ottowolfenden/crowsfoot/releases/download/1.0.0/crowsfoot.sty) file into the same directory as your LaTeX document and add `\usepackage{crowsfoot}` to the preamble.

Below is an example usage.

```tex
\documentclass[multi=tikzpicture, margin=10pt]{standalone}
\usepackage{crowsfoot}

\begin{document}

\begin{tikzpicture}[every node/.style={entity}]
    \node (A1) at (0,  0) {Entity A1}; \node (A2) at (7,  0) {Entity A2};
    \node (B1) at (0, -2) {Entity B1}; \node (B2) at (7, -2) {Entity B2};
    \node (C1) at (0, -4) {Entity C1}; \node (C2) at (7, -4) {Entity C2};
    \node (D1) at (0, -6) {Entity D1}; \node (D2) at (7, -6) {Entity D2};
    \node (E1) at (0, -8) {Entity E1}; \node (E2) at (7, -8) {Entity E2};
    \node (F1) at (0,-10) {Entity F1}; \node (F2) at (7,-10) {Entity F2};
    \node (G1) at (0,-12) {Entity G1}; \node (G2) at (7,-12) {Entity G2};
    \node (H1) at (0,-14) {Entity H1}; \node (H2) at (7,-14) {Entity H2};

    \draw (A1) to[-]     (A2);
    \draw (B1) to[o-o]   (B2);
    \draw (C1) to[|-|]   (C2);
    \draw (D1) to[>-<]   (D2);
    \draw (E1) to[>|-|<] (E2);
    \draw (F1) to[>o-o<] (F2);
    \draw (G1) to[||-||] (G2);
    \draw (H1) to[|o-o|] (H2);
\end{tikzpicture}

\end{document}
```

<div align="center">
    <picture>
        <source media="(prefers-color-scheme: light)" srcset="svgs/1-black.svg"></source>
        <source media="(prefers-color-scheme: dark)" srcset="svgs/1-white.svg"></source>
        <img width="70%">
    </picture>
</div>
