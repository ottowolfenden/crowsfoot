export const bases = ["foot", "circ", "line"];

export const getExt = name => name.slice(-1);
export const getBase = name => name.slice(0, -1);

export const pairs = bases
    .reduce((acc, s) => [...acc, s + "A", s + "B"], [])
    .flatMap((a, i, arr) => arr.slice(i + 1).map(b => [a, b]))
    .filter(([name1, name2]) => {
        const [ext1, ext2] = [name1, name2].map(getExt);
        const [base1, base2] = [name1, name2].map(getBase);
        return ext1 === ext2 && base1 !== base2;
    });

export const tab = n => " ".repeat(4 * n);

export const mergeNames = (name1, name2) => {
    const [ext1, ext2] = [name1, name2].map(getExt);
    const [base1, base2] = [name1, name2].map(getBase);
    if (![name1, name2].every(name => pairs.flat().includes(name)))
        throw new Error("name must be one of ");
    if (![ext1, ext2].every(ext => ["A", "B"].includes(ext)))
        throw new Error("ext must be A or B");
    if (ext1 !== ext2) throw new Error("cannot merge A with B");
    if (base1 === base2) throw new Error("cannot merge equal bases");
    return base1 + base2 + ext1;
};

export const getCombos = arr =>
    arr.reduce((acc, a) => [...acc, ...arr.reduce((bcc, b) => [...bcc, [a, b]], [])], []);
