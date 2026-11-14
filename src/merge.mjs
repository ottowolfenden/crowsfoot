import fs from "node:fs";

const [preamble, symbols, abbrs] = ["preamble", "symbols", "abbrs"].map(f =>
    fs.readFileSync(`src/${f}.tex`, "utf8")
);

const symbolNames = ["foot", "circ"];
const lines = symbols.split("\n");

const tab = n => " ".repeat(4 * n);

const getLines = name => {
    const startIndex = lines.findIndex(l => l.startsWith(tab(1) + name)) + 1;
    const endIndex = lines.findIndex((l, i) => i > startIndex && l == tab(1) + "},");
    return [startIndex, endIndex];
};

const getMarkLines = name => {
    const [start, end] = getLines(name);
    const startIndex =
        lines.findIndex((l, i) => i >= start && i <= end && l.includes("mark=at position")) +
        1;
    const endIndex = lines.findIndex(
        (l, i) => i >= startIndex && i <= end && l.startsWith(tab(3) + "}")
    );
    return [startIndex, endIndex];
};

const getStyleLines = name => {
    const [start, end] = getLines(name);
    const startIndex =
        lines.findIndex(
            (l, i) => i >= start && i <= end && l.startsWith(tab(2) + "postaction={decorate}")
        ) + 1;
    const endIndex = end;
    return [startIndex, endIndex];
};

const addMarkLines = (name, toAdd) => {
    const [_, end] = getMarkLines(name);
    return [...lines.slice(0, end), ...toAdd.map(l => tab(4) + l), ...lines.slice(end)];
};

const addStyleLines = (name, toAdd) => {
    const [_, end] = getStyleLines(name);
    return [...lines.slice(0, end), ...toAdd.map(l => tab(2) + l), ...lines.slice(end)];
};

fs.writeFileSync("crowsfoot.sty", [preamble, symbols, abbrs].join("\n"));
