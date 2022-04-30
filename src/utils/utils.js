export const random = (seed, min = 0, max = 1) => {
    var x = Math.sin(seed) * 10000;
    return parseInt(min + (x - Math.floor(x)) * (max - min));
}

export const getDayOfYear = () => {
    const date = new Date();
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
}

export const getYear = () => {
    return (new Date()).getFullYear();
}

export const calculateTimeLeftNewWord = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    const diference = tomorrow - today;

    const hoursLeft = parseInt(diference / (1000 * 60 * 60));
    const minutesLeft = parseInt(diference / (1000 * 60) % 60);
    const secondsLeft = parseInt(diference / (1000) % 60);

    return {hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft};
}

export const addZeroIfLower10 = (value) => {
    return "" + (value < 10 ? "0" + value : value);
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