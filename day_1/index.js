const { readFileSync, writeFileSync } = require('fs');
const PuzzleLevels = Object.freeze({
    LEVEL_1: 1,
    LEVEL_2: 2,
});
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const numbers_as_strings = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
];
const allWordNumbersJoined = numbers_as_strings.join('|');
const regex = new RegExp(`(${allWordNumbersJoined})`, 'g');

function solvePuzzleLevel2() {
    try {
        const data = readFileSync(`${__dirname}/puzzle_input.txt`, 'utf-8');
        const lines = data.split('\n');

        const sum = lines.reduce((acc, line) => {
            return acc + solveForLine(line, { level: PuzzleLevels.LEVEL_2 });
        }, 0);

        return sum;
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}
function solvePuzzleLevel1() {
    try {
        const data = readFileSync(`${__dirname}/puzzle_input.txt`, 'utf-8');
        const lines = data.split('\n');

        const sum = lines.reduce((acc, line) => {
            return acc + solveForLine(line, { level: PuzzleLevels.LEVEL_1 });
        }, 0);

        return sum;
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}
function solveForLine(line, { level }) {
    const lineWithNoNumberWords =
        level === PuzzleLevels.LEVEL_2
            ? replaceWordsWithNumbersForLine(line)
            : line;
    let first = '';
    let last = '';
    let headIndex = 0;
    let tailIndex = lineWithNoNumberWords.length - 1;
    let head = lineWithNoNumberWords[headIndex];
    let tail = lineWithNoNumberWords[tailIndex];
    while (!first || !last) {
        if (numbers.includes(head)) {
            first = head;
        } else {
            head = lineWithNoNumberWords[++headIndex];
        }

        if (numbers.includes(tail)) {
            last = tail;
        } else {
            tail = lineWithNoNumberWords[--tailIndex];
        }
    }

    return Number(`${first}${last}`);
}

function replaceWordsWithNumbersForLine(line) {
    const matches = line.match(regex);
    if (!matches) {
        return line;
    }
    const firstMatch = matches[0];
    const firstLetter = firstMatch[0];
    const lastLetter = firstMatch[firstMatch.length - 1];
    const stringToReplaceWith =
        firstLetter +
        numbers[numbers_as_strings.indexOf(firstMatch)] +
        lastLetter;
    return replaceWordsWithNumbersForLine(
        line.replace(firstMatch, stringToReplaceWith)
    );
}

function logPuzzleReport({ level1Result, level2Result }) {
    console.log('**************************');
    console.log('[DAY_1] results');
    console.log('Level 1: The sum is ', level1Result);
    console.log('Level 2: The sum is ', level2Result);
    console.log('**************************');
}

const level1Result = solvePuzzleLevel1();
const level2Result = solvePuzzleLevel2();

logPuzzleReport({ level1Result, level2Result });
