const { readFileSync, writeFileSync, fsync } = require('fs');
const data = readFileSync(`${__dirname}/puzzle_input.txt`, 'utf-8');

function solvePuzzleLevel1() {
    try {
        const lines = data.split('\n');
        const nodes = {};

        for (let i = 2; i < lines.length; i++) {
            const line = lines[i];

            nodes[line.substring(0, 3)] = {
                L: line.substring(7, 10),
                R: line.substring(12, 15),
            };
        }
        const instructions = lines[0].split('');

        const START_NODE = 'AAA';
        const END_NODE = 'ZZZ';

        let currentNode = START_NODE;
        let steps = 0;
        let instructionIndex = 0;
        while (!currentNode.endsWith('Z')) {
            const instruction = instructions[instructionIndex];
            const newDestination = nodes[currentNode][instruction];
            currentNode = newDestination;
            steps++;
            instructionIndex++;
            if (instructionIndex > instructions.length - 1) {
                instructionIndex = 0;
            }
        }

        return steps;
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function getGreaterCommonDivisor(num1, num2) {
    while (num2 > 0) {
        const [newNum1, newNum2] = [num2, num1 % num2];
        num1 = newNum1;
        num2 = newNum2;
    }

    return num1;
}

function getLeastCommonMultiple(num1, num2) {
    return (num1 * num2) / getGreaterCommonDivisor(num1, num2);
}

function solvePuzzleLevel2() {
    try {
        const lines = data.split('\n');
        const nodes = {};

        for (let i = 2; i < lines.length; i++) {
            const line = lines[i];

            nodes[line.substring(0, 3)] = {
                L: line.substring(7, 10),
                R: line.substring(12, 15),
            };
        }
        const instructions = lines[0].split('');

        const startNodes = Object.keys(nodes).filter((key) =>
            key.endsWith('A')
        );

        const neededStepsForNodes = startNodes.map((start) => {
            let steps = 0;
            let currentNode = start;
            let instructionIndex = 0;
            while (!currentNode.endsWith('Z')) {
                steps++;
                currentNode =
                    nodes[currentNode][instructions[instructionIndex]];
                instructionIndex = instructionIndex + 1;
                if (instructionIndex > instructions.length - 1) {
                    instructionIndex = 0;
                }
            }

            return steps;
        });

        return neededStepsForNodes.reduce(
            (leastCommonMultiple, stepsForNod) => {
                const res = getLeastCommonMultiple(
                    stepsForNod,
                    leastCommonMultiple
                );
                return res;
            },
            1
        );
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function logPuzzleResults({ level1Result, level2Result }) {
    console.log('**************************');
    console.log('[DAY_8] results');
    console.log('Level 1: The sum is ', level1Result);
    console.log('Level 2: The sum is ', level2Result);
    console.log('**************************');
}

const level1Result = solvePuzzleLevel1();
const level2Result = solvePuzzleLevel2();

logPuzzleResults({ level1Result, level2Result });
