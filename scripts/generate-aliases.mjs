import aliases from "../components/aliases.json" with { type: "json" };
import { allPairs, printLines, tab } from "./utils.js";

const baseSymbols = Object.keys(aliases);
const fullAliases = allPairs(baseSymbols).map(([start, end]) => [
    `${start}-${end}`,
    `${aliases[start][0]}-${aliases[end][1]}`
]);

printLines([
    "\\tikzset{",
    ...fullAliases.map(([name, abbr]) => `${tab(1)}${abbr}/.style={${name}},`),
    "}\n"
]);
