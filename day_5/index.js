const { readFileSync, writeFileSync, fsync } = require('fs');
const data = readFileSync(`${__dirname}/puzzle_input.txt`, 'utf-8');

function solvePuzzleLevel1() {
    try {
        const [seedMap, ...maps] = data.split('\n\n');
        const _seedNumbers = seedMap
            .split(':')[1]
            .trim()
            .split(' ')
            .map(Number);

        const getMapNumbers = (mapString) => {
            return mapString
                .split(':')[1]
                .split('\n')
                .filter((v) => v !== '');
        };
        let currentMappings = [..._seedNumbers];
        for (const mapString of maps) {
            const ranges = getMapNumbers(mapString).map((line) =>
                line.split(' ').map(Number)
            );

            const destinations = [];

            for (const currentMappingNumber of currentMappings) {
                let found = false;
                for (const range of ranges) {
                    const [destinationStart, sourceStart, rangeLength] = range;
                    if (
                        currentMappingNumber >= sourceStart &&
                        currentMappingNumber < sourceStart + rangeLength
                    ) {
                        destinations.push(
                            currentMappingNumber -
                                sourceStart +
                                destinationStart
                        );
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    destinations.push(currentMappingNumber);
                }
            }

            currentMappings = destinations;
        }
        return Math.min(...currentMappings);
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function solvePuzzleLevel2() {
    try {
        const [seedMap, ...maps] = data.split('\n\n');
        const _seedNumberRanges = seedMap
            .split(':')[1]
            .trim()
            .split(' ')
            .map(Number);

        const getMapNumbers = (mapString) => {
            return mapString
                .split(':')[1]
                .split('\n')
                .filter((v) => v !== '');
        };

        let _currentMappingRanges = [];
        for (let i = 0; i < _seedNumberRanges.length; i += 2) {
            _currentMappingRanges.push([
                _seedNumberRanges[i],
                _seedNumberRanges[i] + _seedNumberRanges[i + 1],
            ]);
        }

        let currentMappings = [..._currentMappingRanges];
        for (const mapString of maps) {
            const ranges = getMapNumbers(mapString).map((line) =>
                line.split(' ').map(Number)
            );

            const destinations = [];

            while (currentMappings.length > 0) {
                let found = false;
                const [start, end] = currentMappings.pop();
                for (const range of ranges) {
                    const [destinationStart, sourceStart, rangeLength] = range;
                    const overflowStart = Math.max(start, sourceStart);
                    const overflowEnd = Math.min(
                        end,
                        sourceStart + rangeLength
                    );
                    if (overflowStart < overflowEnd) {
                        found = true;
                        destinations.push([
                            overflowStart - sourceStart + destinationStart,
                            overflowEnd - sourceStart + destinationStart,
                        ]);

                        if (overflowStart > start) {
                            currentMappings.push([start, overflowStart]);
                        }

                        if (end > overflowEnd) {
                            currentMappings.push([overflowEnd, end]);
                        }
                        break;
                    }
                }

                if (!found) {
                    destinations.push([start, end]);
                }
            }

            currentMappings = [...destinations];
        }

        const currentMappingStarts = currentMappings.map((value) => value[0]);

        return Math.min(...currentMappingStarts);
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function logPuzzleResults({ level1Result, level2Result }) {
    console.log('**************************');
    console.log('[DAY_5] results');
    console.log('Level 1: The sum is ', level1Result);
    console.log('Level 2: The sum is ', level2Result);
    console.log('**************************');
}

const level1Result = solvePuzzleLevel1();
const level2Result = solvePuzzleLevel2();

logPuzzleResults({ level1Result, level2Result });
