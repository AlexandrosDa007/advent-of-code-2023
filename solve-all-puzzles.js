const { exec, execSync } = require('child_process');
const { readdirSync } = require('fs');

function solveAllPuzzles() {
    const allDirectories = readdirSync(__dirname);
    const daysDirs = allDirectories.filter((dir) => dir.startsWith('day_'));
    daysDirs.reverse().forEach((dayDir) => {
        try {
            const result = execSync(`npm rum solve:${dayDir}`);
            console.log(result.toString());
        } catch (error) {
            throw new Error('An error occured when solving all puzzles');
        }
    });
}

solveAllPuzzles();
