import aliases from "../components/aliases.json" with { type: "json" };

const getExt = name => name.slice(-1);
const getBase = name => name.slice(0, -1);

const tab = " ".repeat(4);

const getCombos = arr =>
    arr.reduce((acc, a) => [...acc, ...arr.reduce((bcc, b) => [...bcc, [a, b]], [])], []);

const names = [...new Set(Object.keys(aliases).map(getBase))];

console.log("\\tikzset{");
Object.entries(aliases).forEach(([k, v]) =>
    console.log(tab + (getExt(k) == "A" ? `${v}-` : `-${v}`) + `/.style={${k}},`)
);
getCombos(names)
    .map(([a, b]) => [a + "A", b + "B"])
    .forEach(([a, b]) =>
        console.log(`${tab}${aliases[a]}-${aliases[b]}/.style={${[a, b].join(", ")}},`)
    );
console.log("}");
