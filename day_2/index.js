const { readFileSync, writeFileSync } = require('fs');
const data = readFileSync(`${__dirname}/puzzle_input.txt`, 'utf-8');
const lines = data.split('\n');

const colors = ['green', 'blue', 'red'];

const colorRegexString = `(${colors.join('|')})`;
const colorRegex = new RegExp(colorRegexString, 'g');

const numberRegex = new RegExp(/[0-9]{1,3}/, 'g');
function solvePuzzleLevel1() {
    try {
        const sum = lines.reduce((acc, game) => {
            return (
                acc +
                solveForGameLevel1(game, {
                    maxRedBalls: 12,
                    maxGreenBalls: 13,
                    maxBlueBalls: 14,
                })
            );
        }, 0);
        return sum;
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function solvePuzzleLevel2() {
    try {
        const sum = lines.reduce((acc, game) => {
            return acc + solveForGameLevel2(game);
        }, 0);
        return sum;
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function solveForGameLevel1(
    game,
    { maxRedBalls, maxGreenBalls, maxBlueBalls }
) {
    let isGameValid = false;
    const [gameNo, allGameTurns] = game.split(': ');
    const gameTurns = allGameTurns.split(';');
    for (const gameTurn of gameTurns) {
        let redCount = 0;
        let blueCount = 0;
        let greenCount = 0;
        const balls = gameTurn.split(', ');
        balls.forEach((ball) => {
            const matches = ball.match(colorRegex);
            if (!matches) {
                throw new Error('Something is wrong with the data set');
            }
            const ballColor = matches[0];
            const numberOfBallMatches = ball.match(numberRegex);
            if (!numberOfBallMatches) {
                throw new Error('Something is wrong with the data set');
            }
            const numberOfBalls = Number(numberOfBallMatches[0]);
            switch (ballColor) {
                case 'red': {
                    redCount += numberOfBalls;
                    break;
                }
                case 'blue': {
                    blueCount += numberOfBalls;
                    break;
                }
                case 'green': {
                    greenCount += numberOfBalls;
                    break;
                }
                default:
                    throw new Error('Something is wrong with the data set');
            }
        });
        if (
            redCount <= maxRedBalls &&
            blueCount <= maxBlueBalls &&
            greenCount <= maxGreenBalls
        ) {
            isGameValid = true;
        } else {
            isGameValid = false;
            break;
        }
    }
    return isGameValid ? Number(gameNo.split('Game ')[1]) : 0;
}

function solveForGameLevel2(game) {
    let minRedCount = 0;
    let minBlueCount = 0;
    let minGreenCount = 0;

    const [gameNo, allGameTurns] = game.split(': ');
    const gameTurns = allGameTurns.split(';');

    for (const gameTurn of gameTurns) {
        const balls = gameTurn.split(', ');
        balls.forEach((ball) => {
            const matches = ball.match(colorRegex);
            if (!matches) {
                throw new Error('Something is wrong with the data set');
            }
            const ballColor = matches[0];
            const numberOfBallMatches = ball.match(numberRegex);
            if (!numberOfBallMatches) {
                throw new Error('Something is wrong with the data set');
            }
            const numberOfBalls = Number(numberOfBallMatches[0]);
            switch (ballColor) {
                case 'red': {
                    if (numberOfBalls > minRedCount) {
                        minRedCount = numberOfBalls;
                    }
                    break;
                }
                case 'blue': {
                    if (numberOfBalls > minBlueCount) {
                        minBlueCount = numberOfBalls;
                    }
                    break;
                }
                case 'green': {
                    if (numberOfBalls > minGreenCount) {
                        minGreenCount = numberOfBalls;
                    }
                    break;
                }
                default:
                    throw new Error('Something is wrong with the data set');
            }
        });
    }
    return minRedCount * minBlueCount * minGreenCount;
}

function logPuzzleResults({ level1Result, level2Result }) {
    console.log('**************************');
    console.log('[DAY_2] results');
    console.log('Level 1: The sum is ', level1Result);
    console.log('Level 2: The sum is ', level2Result);
    console.log('**************************');
}

const level1Result = solvePuzzleLevel1();
const level2Result = solvePuzzleLevel2();

logPuzzleResults({ level1Result, level2Result });
