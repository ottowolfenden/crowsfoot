import fs from "node:fs";

const [preamble, markings, abbrs] = ["preamble", "markings", "abbrs"].map(f =>
    fs.readFileSync(`src/${f}.tex`, "utf8")
);

fs.writeFileSync("crowsfoot.sty", [preamble, markings, abbrs].join("\n"));
