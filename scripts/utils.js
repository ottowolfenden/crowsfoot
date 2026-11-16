export const allPairs = arr =>
    arr.reduce(
        (acc, start) => [...acc, ...arr.reduce((acc, end) => [...acc, [start, end]], [])],
        []
    );

export const linesToStr = lines =>
    lines.reduce((acc, lineOrArr) => {
        const tabs = Array.isArray(lineOrArr) ? " ".repeat(lineOrArr[0] * 4) : "";
        const line = Array.isArray(lineOrArr) ? lineOrArr[1] : lineOrArr;
        const newlinesRemoved = line.replace(/^\n+|\n+$/g, "");
        return `${acc}${tabs}${newlinesRemoved}\n`;
    }, "");
