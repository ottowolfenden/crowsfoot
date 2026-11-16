import aliases from "../components/aliases.json" with { type: "json" };
import { allPairs, linesToStr } from "./utils.js";

const baseSymbols = Object.keys(aliases);
const fullAliases = allPairs(baseSymbols).map(([start, end]) => [
    `${start}-${end}`,
    `${aliases[start][0]}-${aliases[end][1]}`
]);

console.log(
    linesToStr([
        "\\tikzset{",
        ...fullAliases.map(([name, abbr]) => [1, `${abbr}/.style={${name}},`]),
        "}\n"
    ])
);
