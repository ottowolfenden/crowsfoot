import fs from "node:fs";

const tab = n => " ".repeat(4 * n);
const symbolLines = fs.readFileSync(`templates/symbols.tex`, "utf8").split("\n");
const srcLines = symbolLines.slice(0, symbolLines.lastIndexOf(tab(1) + "},") + 1);

const pairs = ["foot", "circ"]
    .reduce((acc, s) => [...acc, s + "A", s + "B"], [])
    .flatMap((a, i, arr) => arr.slice(i + 1).map(b => [a, b]))
    .filter(([name1, name2]) => {
        const [ext1, ext2] = [name1, name2].map(s => s.slice(-1));
        const [base1, base2] = [name1, name2].map(s => s.slice(0, -1));
        return ext1 === ext2 && base1 !== base2;
    });

const getLines = name => {
    const startIndex = symbolLines.findIndex(l => l.startsWith(tab(1) + name)) + 1;
    const endIndex = symbolLines.findIndex((l, i) => i > startIndex && l === tab(1) + "},");
    return symbolLines.slice(startIndex, endIndex);
};

const getMarkLines = name => {
    const lines = getLines(name);
    const startIndex = lines.findIndex(l => l.includes("mark=at position")) + 1;
    const endIndex = lines.findIndex((l, i) => i >= startIndex && l.startsWith(tab(3) + "}"));
    return lines.slice(startIndex, endIndex);
};

const getStyleLines = name => {
    const lines = getLines(name);
    return lines.slice(lines.findIndex(l => l.startsWith(tab(2) + "postaction")) + 1);
};

const combine = (name1, name2) => {
    const [ext1, ext2] = [name1, name2].map(s => s.slice(-1));
    const [base1, base2] = [name1, name2].map(s => s.slice(0, -1));
    if (ext1 !== ext2 || base1 === base2) throw new Error();

    const markPos = ext1 === "A" ? 0 : 1;
    const newName = base1 + base2 + ext1;

    return [
        `    ${newName}/.style={`,
        `        decoration={`,
        `            markings,`,
        `            mark=at position ${markPos} with {`,
        ...getMarkLines(name1),
        ...getMarkLines(name2),
        `            },`,
        `        },`,
        `        postaction={decorate},`,
        ...getStyleLines(name1),
        ...getStyleLines(name2),
        `    },`
    ];
};

console.log([...srcLines, ...pairs.flatMap(p => combine(...p)), "}\n"].join("\n"));
