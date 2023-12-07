const { readFileSync, writeFileSync, fsync } = require('fs');
const data = readFileSync(`${__dirname}/puzzle_input.txt`, 'utf-8');

const CARD_STRENGTHS = [
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'J',
    'Q',
    'K',
    'A',
];

const CARD_STRENGTHS_WITH_JOKER_LOWER = [
    'J',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'T',
    'Q',
    'K',
    'A',
];
const CARD_TYPES = Object.freeze({
    FIVE_OF_A_KIND: 7,
    FOUR_OF_A_KIND: 6,
    FULL_HOUSE: 5,
    THREE_OF_A_KIND: 4,
    TWO_PAIR: 3,
    ONE_PAIR: 2,
    HIGH_CARD: 1,
});

function getHandCardMappings(hand) {
    const handCardMappings = {};
    hand.split('').forEach((card) => {
        if (!handCardMappings[card]) {
            handCardMappings[card] = 1;
            return;
        }
        handCardMappings[card]++;
    });

    return handCardMappings;
}

function findHandType(hand) {
    let type = 0;

    const handCardMappings = getHandCardMappings(hand);

    const isFiveOfAKind = Object.values(handCardMappings).some(
        (item) => item === 5
    );
    if (isFiveOfAKind) {
        return CARD_TYPES.FIVE_OF_A_KIND;
    }
    const isFourOfAKind = Object.values(handCardMappings).some(
        (item) => item === 4
    );
    if (isFourOfAKind) {
        return CARD_TYPES.FOUR_OF_A_KIND;
    }
    const isFullHouse = (() => {
        const hasThreeSame = Object.values(handCardMappings).some(
            (item) => item === 3
        );
        if (!hasThreeSame) {
            return false;
        }
        const others = Object.keys(handCardMappings).filter(
            (item) => handCardMappings[item] !== 3
        );
        if (others.length === 1) {
            return true;
        }
        return false;
    })();

    if (isFullHouse) {
        return CARD_TYPES.FULL_HOUSE;
    }

    const isThreeOfAKind = (() => {
        const hasThreeSame = Object.values(handCardMappings).some(
            (item) => item === 3
        );
        if (!hasThreeSame) {
            return false;
        }
        const others = Object.keys(handCardMappings).filter(
            (item) => handCardMappings[item] !== 3
        );
        if (others.length === 2) {
            return true;
        }
        return false;
    })();

    if (isThreeOfAKind) {
        return CARD_TYPES.THREE_OF_A_KIND;
    }

    const isTwoPair = (() => {
        const pairs = Object.keys(handCardMappings).filter(
            (key) => handCardMappings[key] === 2
        );
        return pairs.length === 2;
    })();

    if (isTwoPair) {
        return CARD_TYPES.TWO_PAIR;
    }

    const isOnePair = (() => {
        const pairs = Object.keys(handCardMappings).filter(
            (key) => handCardMappings[key] === 2
        );
        if (pairs.length !== 1) {
            return false;
        }
        return true;
    })();

    if (isOnePair) {
        return CARD_TYPES.ONE_PAIR;
    }

    const isHighCard = (() => {
        return Object.keys(handCardMappings).length === 5;
    })();

    if (isHighCard) {
        return CARD_TYPES.HIGH_CARD;
    }

    throw new Error('Invalid hand');
}

function solvePuzzleLevel1() {
    try {
        const hands = data.split('\n');

        const handsData = hands.map((hand) => {
            const [cards, bid] = hand.split(' ');
            const type = findHandType(cards);
            return {
                cards,
                bid,
                type,
            };
        });
        const strengths = [...CARD_STRENGTHS];
        handsData.sort((a, b) => {
            const aCards = a.cards;
            const bCards = b.cards;
            const aType = a.type;
            const bType = b.type;

            if (a.type > b.type) {
                return -1;
            }

            if (a.type < b.type) {
                return 1;
            }

            for (let i = 0; i < aCards.length; i++) {
                const aCard = aCards[i];
                const bCard = bCards[i];
                if (aCard === bCard) {
                    continue;
                }
                const aI = strengths.indexOf(aCard);
                const bI = strengths.indexOf(bCard);
                if (aI > bI) {
                    return -1;
                }

                if (aI < bI) {
                    return 1;
                }

                throw new Error('Something went wrong here');
            }
        });

        return handsData.reduce((sum, current, index) => {
            const rank = handsData.length - index;
            return sum + Number(current.bid) * rank;
        }, 0);
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function findHandTypeLevel2(hand) {
    let type = 0;

    const _cardArray = hand.split('');
    if (!_cardArray.includes('J')) {
        return findHandType(hand);
    }

    const handCardMappings = getHandCardMappings(hand);

    const sortedHand = Object.keys(handCardMappings).sort((a, b) => {
        const aCardCount = handCardMappings[a];
        const bCardCount = handCardMappings[b];
        if (aCardCount > bCardCount) {
            return -1;
        } else if (aCardCount < bCardCount) {
            return 1;
        }
    });

    const sortedHandWithoutJoker = sortedHand.filter((item) => item !== 'J')[0];
    const sortedHandWithJokerReplaced = hand.replace(
        /J/g,
        sortedHandWithoutJoker
    );
    return findHandType(sortedHandWithJokerReplaced);
}

function solvePuzzleLevel2() {
    try {
        const hands = data.split('\n');

        const handsData = hands.map((hand) => {
            const [cards, bid] = hand.split(' ');
            const type = findHandTypeLevel2(cards);
            return {
                cards,
                bid,
                type,
            };
        });

        handsData.sort((a, b) => {
            const aCards = a.cards;
            const bCards = b.cards;
            const aType = a.type;
            const bType = b.type;

            if (a.type > b.type) {
                return -1;
            }

            if (a.type < b.type) {
                return 1;
            }

            for (let i = 0; i < aCards.length; i++) {
                const aCard = aCards[i];
                const bCard = bCards[i];
                if (aCard === bCard) {
                    continue;
                }

                const aI = CARD_STRENGTHS_WITH_JOKER_LOWER.indexOf(aCard);
                const bI = CARD_STRENGTHS_WITH_JOKER_LOWER.indexOf(bCard);
                if (aI > bI) {
                    return -1;
                }

                if (aI < bI) {
                    return 1;
                }

                throw new Error('Not possible');
            }
        });

        return handsData.reduce((sum, hand, index) => {
            const rank = handsData.length - index;
            return sum + Number(hand.bid) * rank;
        }, 0);
        return result;
    } catch (error) {
        console.error('An error occured, check your code!', error);
    }
}

function logPuzzleResults({ level1Result, level2Result }) {
    console.log('**************************');
    console.log('[DAY_7] results');
    console.log('Level 1: The sum is ', level1Result);
    console.log('Level 2: The sum is ', level2Result);
    console.log('**************************');
}

const level1Result = solvePuzzleLevel1();
const level2Result = solvePuzzleLevel2();

logPuzzleResults({ level1Result, level2Result });
