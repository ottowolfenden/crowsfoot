import aliases from "../components/aliases.json" with { type: "json" };

const baseSymbols = Object.keys(aliases);
const fullAliases = baseSymbols
    .reduce(
        (acc, start) => [
            ...acc,
            ...baseSymbols.reduce((acc2, end) => [...acc2, [start, end]], [])
        ],
        []
    )
    .map(([start, end]) => [`${start}-${end}`, `${aliases[start][0]}-${aliases[end][1]}`]);
console.log("\\tikzset{");
fullAliases.forEach(([name, abbr]) => console.log(`    ${abbr}/.style={${name}},`));
console.log("}\n");
