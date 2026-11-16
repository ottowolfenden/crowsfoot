import { readFileSync } from "node:fs";
import aliases from "../components/aliases.json" with { type: "json" };
import { allPairs, linesToStr } from "./utils.js";

const baseSymbols = Object.keys(aliases);
const definedSymbols = baseSymbols.reduce(
    (acc, val) => [...acc, ...[val + ".start", val + ".end"]],
    []
);
const dualSymbols = allPairs(baseSymbols);
const globalLets = readFileSync("components/auto-anchors.tex", "utf-8").trim().split("\n");

const mergeSymbols = ([start, end]) =>
    linesToStr([
        [1, `${start}-${end}/.style={`],
        [2, `to path={`],
        [3, `let`],
        ...globalLets.map(l => [3, l]),
        [3, "in"],
        [3, "START HERE"],
        [3, "END HERE"],
        [3, "\\tikztonodes"],
        [2, `}`],
        [1, `},`]
    ]);

console.log(linesToStr(["\\tikzset{", ...dualSymbols.map(mergeSymbols), "}"]));
