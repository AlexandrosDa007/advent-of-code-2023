const { readFileSync, writeFileSync } = require('fs');
const data = readFileSync(`${__dirname}/puzzle_input.txt`, 'utf-8');
const numberRegex = new RegExp(/[0-9]{1,3}/, 'g');

var regex = /^[^0-9.]+$/;
function isSymbol(letter) {
    return regex.test(letter);
}

function findAdjacentSymbol({ col, row, lineLength, lines }) {
    const checkTop = row !== 0;
    const checkBottom = row !== lines.length - 1;
    const checkLeft = col !== 0;
    const checkRight = col !== lineLength - 1;
    const checkLeftTop = checkTop && checkLeft;
    const checkRightTop = checkTop && checkRight;
    const checkLeftBottom = checkBottom && checkLeft;
    const checkRightBottom = checkBottom && checkRight;

    if (checkTop) {
        const _topdigit = lines[row - 1][col];
        if (isSymbol(_topdigit)) {
            return {
                symbol: _topdigit,
                row: row - 1,
                col: col,
            };
        }
    }

    if (checkLeft) {
        const _leftDigit = lines[row][col - 1];
        if (isSymbol(_leftDigit)) {
            return {
                symbol: _leftDigit,
                row: row,
                col: col - 1,
            };
        }
    }

    if (checkRight) {
        const _rightDigit = lines[row][col + 1];
        if (isSymbol(_rightDigit)) {
            return {
                symbol: _rightDigit,
                row: row,
                col: col + 1,
            };
        }
    }

    if (checkBottom) {
        const _bottomDigit = lines[row + 1][col];
        if (isSymbol(_bottomDigit)) {
            return {
                symbol: _bottomDigit,
                row: row + 1,
                col: col,
            };
        }
    }

    if (checkLeftTop) {
        const _leftTopDigit = lines[row - 1][col - 1];
        if (isSymbol(_leftTopDigit)) {
            return {
                symbol: _leftTopDigit,
                row: row - 1,
                col: col - 1,
            };
        }
    }

    if (checkRightTop) {
        const _rightTopDigit = lines[row - 1][col + 1];
        if (isSymbol(_rightTopDigit)) {
            return {
                symbol: _rightTopDigit,
                row: row - 1,
                col: col + 1,
            };
        }
    }

    if (checkLeftBottom) {
        const _leftBottomDigit = lines[row + 1][col - 1];
        if (isSymbol(_leftBottomDigit)) {
            return {
                symbol: _leftBottomDigit,
                row: row + 1,
                col: col - 1,
            };
        }
    }

    if (checkRightBottom) {
        const _rightBottomDigit = lines[row + 1][col + 1];
        if (isSymbol(_rightBottomDigit)) {
            return {
                symbol: _rightBottomDigit,
                row: row + 1,
                col: col + 1,
            };
        }
    }
}

function solvePuzzleLevel1() {
    try {
        let sum = 0;
        const lines = data.split('\n');

        const numbers = [];
        lines.forEach((line, digitLine) => {
            while ((match = numberRegex.exec(line)) !== null) {
                for (let i = 0; i < match[0].length; i++) {
                    const digitIndex = match.index + i;
                    const hasAdjacentSymbol = !!findAdjacentSymbol({
                        col: digitIndex,
                        row: digitLine,
                        lineLength: line.length,
                        lines,
                    });
                    if (hasAdjacentSymbol) {
                        numbers.push(Number(match));
                        break;
                    }
                }
            }
        });
        return numbers.reduce((sum, num) => sum + num, 0);
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function solvePuzzleLevel2() {
    try {
        const lines = data.split('\n');

        const numbers = [];
        lines.forEach((line, digitLine) => {
            while ((match = numberRegex.exec(line)) !== null) {
                for (let i = 0; i < match[0].length; i++) {
                    const digitIndex = match.index + i;
                    const symbolInfo = findAdjacentSymbol({
                        col: digitIndex,
                        row: digitLine,
                        lineLength: line.length,
                        lines,
                    });

                    if (symbolInfo?.symbol === '*') {
                        numbers.push({ match: Number(match[0]), symbolInfo });
                        break;
                    }
                }
            }
        });
        const gearsInfo = {};
        numbers.forEach((item) => {
            const key = `${item.symbolInfo.row}_${item.symbolInfo.col}`;
            if (!gearsInfo[key]) {
                gearsInfo[key] = [];
            }
            gearsInfo[key].push(Number(item.match));
        });
        return Object.values(gearsInfo).reduce((sum, numberArray) => {
            if (numberArray.length <= 1) {
                return sum;
            }
            return (
                sum + numberArray.reduce((numberSum, no) => numberSum * no, 1)
            );
        }, 0);
        return sum;
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function logPuzzleResults({ level1Result, level2Result }) {
    console.log('**************************');
    console.log('[DAY_3] results');
    console.log('Level 1: The sum is ', level1Result);
    console.log('Level 2: The sum is ', level2Result);
    console.log('**************************');
}

const level1Result = solvePuzzleLevel1();
const level2Result = solvePuzzleLevel2();

logPuzzleResults({ level1Result, level2Result });
