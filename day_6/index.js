const { readFileSync, writeFileSync, fsync } = require('fs');
const data = readFileSync(`${__dirname}/puzzle_input.txt`, 'utf-8');

function checkPossibleSolution({ time, distance }) {
    let possibleSolutions = [];
    let maxDistance = distance;
    let _traveledDistance = 0;
    for (let speed = 1; speed <= time; speed++) {
        _traveledDistance = (time - speed) * speed;
        if (_traveledDistance > maxDistance) {
            possibleSolutions.push({
                time: speed,
                distance: _traveledDistance,
            });
        }
    }
    return possibleSolutions;
}

function solvePuzzleLevel1() {
    try {
        const [timesString, distancesString] = data.split('\n');
        const times = timesString
            .split(':')[1]
            .trim()
            .split('  ')
            .map((v) => Number(v.trim()))
            .filter((v) => v !== 0);

        const distances = distancesString
            .split(':')[1]
            .trim()
            .split('  ')
            .map((v) => Number(v.trim()))
            .filter((v) => v !== 0);

        let sum = 1;
        for (let i = 0; i < times.length; i++) {
            const time = times[i];
            const distance = distances[i];

            const possibleSolutions = checkPossibleSolution({ time, distance });
            sum *= possibleSolutions.length;
        }
        return sum;
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function solvePuzzleLevel2() {
    try {
        const [timesString, distancesString] = data.split('\n');
        const times = timesString
            .split(':')[1]
            .trim()
            .split('  ')
            .map((v) => Number(v.trim()))
            .filter((v) => v !== 0);

        const distances = distancesString
            .split(':')[1]
            .trim()
            .split('  ')
            .map((v) => Number(v.trim()))
            .filter((v) => v !== 0);

        const time = Number(times.join(''));
        const distance = Number(distances.join(''));

        const possibleSolutions = checkPossibleSolution({ time, distance });
        return possibleSolutions.length;
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function logPuzzleResults({ level1Result, level2Result }) {
    console.log('**************************');
    console.log('[DAY_6] results');
    console.log('Level 1: The sum is ', level1Result);
    console.log('Level 2: The sum is ', level2Result);
    console.log('**************************');
}

const level1Result = solvePuzzleLevel1();
const level2Result = solvePuzzleLevel2();

logPuzzleResults({ level1Result, level2Result });
