export const allPairs = arr =>
    arr.reduce(
        (acc, start) => [...acc, ...arr.reduce((acc, end) => [...acc, [start, end]], [])],
        []
    );

export const printLines = lines => lines.forEach(l => console.log(l));
