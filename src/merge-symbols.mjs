import fs from "node:fs";
import { pairs, mergeNames, tab } from "./utils.js";

const symbolLines = fs.readFileSync(`templates/symbols.tex`, "utf8").split("\n");
const srcLines = symbolLines.slice(0, symbolLines.lastIndexOf(tab(1) + "},") + 1);

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
    const newName = mergeNames(name1, name2);
    const markPos = newName.slice(-1) === "A" ? 0 : 1;
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
