const { exec } = require('child_process');
const { readdirSync } = require('fs');

function solveAllPuzzles() {
    const allDirectories = readdirSync(__dirname);
    const daysDirs = allDirectories.filter((dir) => dir.startsWith('day_'));
    daysDirs
        .sort((a, b) => (a > b ? 1 : -1))
        .forEach((dayDir) => {
            exec(`npm rum solve:${dayDir}`, (err, stdout) => {
                err && console.error(err);
                if (stdout) {
                    console.log(stdout);
                }
            });
        });
}

solveAllPuzzles();
