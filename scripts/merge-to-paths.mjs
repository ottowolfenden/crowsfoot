import { readFileSync } from "node:fs";
import aliases from "../components/aliases.json" with { type: "json" };
import { allPairs, linesToStr } from "./utils.js";

const readLines = path => readFileSync(path, "utf-8").trim().split("\n");
const getSrcToPath = (name, part) => {
    const startIndex = symbolsLines.indexOf(`% ${name} ${part.toUpperCase()}`) + 1;
    const endIndex = symbolsLines.findIndex((l, i) => i > startIndex && l.startsWith("%"));
    return symbolsLines.slice(startIndex, endIndex).filter(l => l.length > 0);
};

const baseSymbols = Object.keys(aliases);
const dualSymbols = allPairs(baseSymbols);
const autoAnchorsLines = readLines("components/auto-anchors.tex");
const symbolsLines = readLines("components/symbols.tex");

console.log(
    linesToStr([
        "\\tikzset{",
        ...dualSymbols.map(([start, end]) =>
            linesToStr([
                [1, `${start}-${end}/.style={`],
                [2, `to path={`],
                [3, `let`],
                ...autoAnchorsLines.map(l => [3, l]),
                [3, "in"],
                ...getSrcToPath(start, "start").map(l => [3, l]),
                ...getSrcToPath(end, "end").map(l => [3, l]),
                [3, "\\tikztonodes"],
                [2, `}`],
                [1, `},`]
            ])
        ),
        "}"
    ])
);
