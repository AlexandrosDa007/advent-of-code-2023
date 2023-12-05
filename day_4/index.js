const { readFileSync, writeFileSync, fsync } = require('fs');
const data = readFileSync(`${__dirname}/puzzle_input.txt`, 'utf-8');
const numberRegex = new RegExp(/[0-9]{1,3}/, 'g');

function solvePuzzleLevel1() {
    try {
        const cards = data.split('\n');
        return cards.reduce((sum, card) => {
            return sum + solveForCardLevel1(card);
        }, 0);
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function solvePuzzleLevel2() {
    try {
        let cardInstances = {};
        const cards = data.split('\n');
        cards.forEach((card) => {
            solveForCardLevel2({ allCards: cards, card, cardInstances });
        });
        return Object.values(cardInstances).reduce((p, c) => p + c, 0);
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function getCorrectNumbersForCard(card) {
    const cardInfo = card.split(':')[1];
    const [winningNumbersString, cardNumbersString] = cardInfo.split('|');
    const winningNumbers = winningNumbersString
        .trim()
        .split(' ')
        .filter((v) => v !== '');
    const cardNumbers = cardNumbersString
        .trim()
        .split(' ')
        .filter((v) => v !== '');

    const correctNumbers = winningNumbers.filter((num) => {
        if (cardNumbers.includes(num)) {
            return true;
        }
        return false;
    });
    return correctNumbers;
}

function solveForCardLevel1(card) {
    const correctNumbers = getCorrectNumbersForCard(card);
    return correctNumbers.reduce((p, c) => (p === 0 ? 1 : p * 2), 0);
}

function getCardByNumber({ allCards, cardNumber }) {
    return allCards[
        allCards.findIndex((card) => {
            const cardInfo = card.split(':')[0];
            const matches = cardInfo.match(numberRegex);
            if (!matches) {
                return false;
            }
            if (cardNumber === matches[0]) {
                return true;
            }
            return false;
        })
    ];
}

function getNextCards({ allCards, cardIndex, numberNextCards }) {
    if (cardIndex + numberNextCards > allCards.length - 1) {
        return [];
    }
    let _cards = [];

    for (let i = cardIndex + 1; i <= cardIndex + numberNextCards; i++) {
        _cards.push(allCards[i]);
    }
    return _cards;
}

function solveForCardLevel2({ allCards, card, cardInstances }) {
    if (!cardInstances[card]) {
        cardInstances[card] = 0;
    }
    cardInstances[card]++;
    const correctNumbers = getCorrectNumbersForCard(card);
    const correctNumbersLength = correctNumbers.length;
    if (correctNumbersLength === 0) {
        return;
    }

    const cardIndex = allCards.indexOf(card);
    const nextCards = getNextCards({
        allCards,
        cardIndex,
        numberNextCards: correctNumbersLength,
    });

    nextCards.forEach((card) =>
        solveForCardLevel2({ allCards, card, cardInstances })
    );
}

function logPuzzleResults({ level1Result, level2Result }) {
    console.log('**************************');
    console.log('[DAY_4] results');
    console.log('Level 1: The sum is ', level1Result);
    console.log('Level 2: The sum is ', level2Result);
    console.log('**************************');
}

const level1Result = solvePuzzleLevel1();
const level2Result = solvePuzzleLevel2();

logPuzzleResults({ level1Result, level2Result });
