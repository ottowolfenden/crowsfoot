import aliases from "../templates/aliases.json" with { type: "json" };
import { tab, getExt, getBase, getCombos } from "./utils.js";

const names = [...new Set(Object.keys(aliases).map(getBase))];

console.log("\\tikzset{");
Object.entries(aliases).forEach(([k, v]) =>
    console.log(tab(1) + (getExt(k) == "A" ? `${v}-` : `-${v}`) + `/.style={${k}},`)
);
getCombos(names)
    .map(([a, b]) => [a + "A", b + "B"])
    .forEach(([a, b]) =>
        console.log(`${tab(1)}${aliases[a]}-${aliases[b]}/.style={${[a, b].join(", ")}},`)
    );
console.log("}");
