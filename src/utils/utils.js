export const random = (seed, min = 0, max = 1) => {
    var x = Math.sin(seed) * 10000;
    return parseInt(min + (x - Math.floor(x)) * (max - min));
}

export const getDayOfYear = () => {
    const date = new Date();
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
}

export const getCellResults = (correctWord, currentWord) => {
    const result = [];
    const correctLetters = {};
    correctWord.split("").map(x => correctLetters[x] = (correctLetters[x] ?? 0) + 1);

    currentWord.split("").map((x, index) => {
        if (x === correctWord[index]) {
            result.push(1);
        } else if (x in correctLetters) {
            result.push(0);
        } else {
            result.push(-1);
        }
        return x;
    })

    return result;
}