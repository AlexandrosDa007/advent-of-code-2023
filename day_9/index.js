const { readFileSync, writeFileSync, fsync } = require('fs');
const data = readFileSync(`${__dirname}/puzzle_input.txt`, 'utf-8');

function addDiffsToArray(numberArray) {
    const arraysOfDifferencies = [];
    arraysOfDifferencies.push([...numberArray]);
    let currentArrayOfNumbers = [...numberArray];
    while (!currentArrayOfNumbers.every((item) => item === 0)) {
        const _nums = [...currentArrayOfNumbers];
        const diffs = [];
        for (let i = 1; i < _nums.length; i++) {
            diffs.push(_nums[i] - _nums[i - 1]);
        }
        currentArrayOfNumbers = [...diffs];
        arraysOfDifferencies.push([...diffs]);
    }

    return arraysOfDifferencies;
}

function mutateAndAddRightValues(arraysOfDiffs) {
    arraysOfDiffs.reverse();
    arraysOfDiffs[0].push(0);
    for (let i = 1; i < arraysOfDiffs.length; i++) {
        const _currentArrayOfDiffs = arraysOfDiffs[i];
        const previousLastValue =
            arraysOfDiffs[i - 1][arraysOfDiffs[i - 1].length - 1];
        const newValue =
            previousLastValue +
            _currentArrayOfDiffs[_currentArrayOfDiffs.length - 1];
        _currentArrayOfDiffs.push(newValue);
    }
}

function mutateAndAddLeftValues(arraysOfDiffs) {
    arraysOfDiffs.reverse();
    arraysOfDiffs[0].unshift(0);
    for (let i = 1; i < arraysOfDiffs.length; i++) {
        const _currentArrayOfDiffs = arraysOfDiffs[i];
        const previousFirstValue = arraysOfDiffs[i - 1][0];
        const newValue = _currentArrayOfDiffs[0] - previousFirstValue;
        _currentArrayOfDiffs.unshift(newValue);
    }
}

function solvePuzzleLevel1() {
    try {
        const lines = data.split('\n');

        const newArrays = lines.map((line) => {
            const numbers = line.split(' ').map(Number);
            return addDiffsToArray(numbers);
        });

        return newArrays.reduce((sum, diffs) => {
            mutateAndAddRightValues(diffs);
            const newHistoryValue =
                diffs[diffs.length - 1][diffs[diffs.length - 1].length - 1];
            return sum + newHistoryValue;
        }, 0);
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function solvePuzzleLevel2() {
    try {
        const lines = data.split('\n');

        const newArrays = lines.map((line) => {
            const numbers = line.split(' ').map(Number);
            return addDiffsToArray(numbers);
        });

        return newArrays.reduce((sum, diffs) => {
            mutateAndAddLeftValues(diffs);
            const newHistoryValue = diffs[diffs.length - 1][0];
            return sum + newHistoryValue;
        }, 0);
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function logPuzzleResults({ level1Result, level2Result }) {
    console.log('**************************');
    console.log('[DAY_9] results');
    console.log('Level 1: The sum is ', level1Result);
    console.log('Level 2: The sum is ', level2Result);
    console.log('**************************');
}

const level1Result = solvePuzzleLevel1();
const level2Result = solvePuzzleLevel2();

logPuzzleResults({ level1Result, level2Result });
