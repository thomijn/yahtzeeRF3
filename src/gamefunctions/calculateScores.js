export const calculatePossibleScores = (dices) => {
    const sortedDices = dices.sort(function (a, b) {
        return a - b;
    })


    const scores = {
        aces: addUpDice(sortedDices, 1),
        twos: addUpDice(sortedDices, 2),
        threes: addUpDice(sortedDices, 3),
        fours: addUpDice(sortedDices, 4),
        fives: addUpDice(sortedDices, 5),
        sixes: addUpDice(sortedDices, 6),
        threeOfAKind: calculateThreeOfAKind(sortedDices),
        fourOfAKind: calculateFourOfAKind(sortedDices),
        fullHouse: calculateFullHouse(sortedDices),
        largeStraight: calculateLargeStraight(sortedDices),
        smallStraight: calculateSmallStraight(sortedDices),
        yahtzee: calculateYahtzee(sortedDices),
        chance: calculateChance(sortedDices)

    }

    return scores
}

function addUpDice(sortedDices, diceNumber) {
    let sum = 0

    for (let i = 0; i < 5; i++) {
        if (sortedDices[i] === diceNumber) sum += diceNumber
    }

    return sum === 0 ? 0 : sum
}

function calculateThreeOfAKind(sortedDices) {
    let sum = 0
    let threeOfAKind = false

    for (let i = 0; i < 6; i++) {
        let count = 0

        for (let j = 0; j < 5; j++) {
            if (sortedDices[j] === i) count++
            if (count > 2) threeOfAKind = true
        }
    }

    if (threeOfAKind) {
        for (let k = 0; k < 5; k++) {
            sum += sortedDices[k]
        }
    }

    return sum === 0 ? null : sum
}

function calculateFourOfAKind(sortedDices) {
    let sum = 0
    let fourOfAKind = false

    for (let i = 0; i < 6; i++) {
        let count = 0

        for (let j = 0; j < 5; j++) {
            if (sortedDices[j] === i) count++
            if (count > 3) fourOfAKind = true
        }
    }

    if (fourOfAKind) {
        for (let k = 0; k < 5; k++) {
            sum += sortedDices[k]
        }
    }

    return sum === 0 ? null : sum
}

function calculateFullHouse(sortedDices) {
    let sum = 0
    // console.log(sortedDices)
    // console.log(sortedDices[0])

    // console.log((sortedDices[0] === sortedDices[1]) && (sortedDices[1] === sortedDices[2]) && // Three of a Kind
    //     (sortedDices[3] === sortedDices[4]) && // Two of a Kind
    //     (sortedDices[2] !== sortedDices[3]))


    if ((((sortedDices[0] === sortedDices[1]) && (sortedDices[1] === sortedDices[2])) && // Three of a Kind
        (sortedDices[3] === sortedDices[4]) && // Two of a Kind
        (sortedDices[2] !== sortedDices[3])) ||
        ((sortedDices[0] === sortedDices[1]) && // Two of a Kind
            ((sortedDices[2] === sortedDices[3]) && (sortedDices[3] === sortedDices[4])) && // Three of a Kind
            (sortedDices[1] !== sortedDices[2]))) {
        sum = 25;
    }

    return sum === 0 ? null : sum
}

function calculateLargeStraight(sortedDices) {
    let sum = 0

    if (((sortedDices[0] === 1) &&
        (sortedDices[1] === 2) &&
        (sortedDices[2] === 3) &&
        (sortedDices[3] === 4) &&
        (sortedDices[4] === 5)) ||
        ((sortedDices[0] === 2) &&
            (sortedDices[1] === 3) &&
            (sortedDices[2] === 4) &&
            (sortedDices[3] === 5) &&
            (sortedDices[4] === 6))) {
        sum = 40;
    }

    return sum === 0 ? null : sum
}

function calculateSmallStraight(sortedDices) {
    let sum = 0

    for (let j = 0; j < 4; j++) {
        let temp = 0;
        if (sortedDices[j] === sortedDices[j + 1]) {
            temp = sortedDices[j];

            for (let k = j; k < 4; k++) {
                sortedDices[k] = sortedDices[k + 1];
            }

            sortedDices[4] = temp;
        }
    }

    if (((sortedDices[0] === 1) && (sortedDices[1] === 2) && (sortedDices[2] === 3) && (sortedDices[3] === 4)) ||
        ((sortedDices[0] === 2) && (sortedDices[1] === 3) && (sortedDices[2] === 4) && (sortedDices[3] === 5)) ||
        ((sortedDices[0] === 3) && (sortedDices[1] === 4) && (sortedDices[2] === 5) && (sortedDices[3] === 6)) ||
        ((sortedDices[1] === 1) && (sortedDices[2] === 2) && (sortedDices[3] === 3) && (sortedDices[4] === 4)) ||
        ((sortedDices[1] === 2) && (sortedDices[2] === 3) && (sortedDices[3] === 4) && (sortedDices[4] === 5)) ||
        ((sortedDices[1] === 3) && (sortedDices[2] === 4) && (sortedDices[3] === 5) && (sortedDices[4] === 6))) {
        sum = 30;
    }

    return sum === 0 ? null : sum
}

function calculateYahtzee(sortedDices) {
    let sum = 0

    for (let i = 1; i <= 6; i++) {
        let count = 0;
        for (let j = 0; j < 5; j++) {
            if (sortedDices[j] === i) {
                count++;
            }
            if (count > 4) sum = 50;
        }
    }

    return sum === 0 ? null : sum
}

function calculateChance(sortedDices) {
    let sum = 0

    for (let i = 0; i < 5; i++) {
        sum += sortedDices[i]
    }
    return sum === 0 ? null : sum
}


export function calculateTotal(currentScores) {
    let bonus = 0
    let totalUpper = 0
    let totalLower = 0
    let total = 0

    if (currentScores.aces !== null && currentScores.aces !== 'x') totalUpper += currentScores.aces
    if (currentScores.twos !== null && currentScores.twos !== 'x') totalUpper += currentScores.twos
    if (currentScores.threes !== null && currentScores.threes !== 'x') totalUpper += currentScores.threes
    if (currentScores.fours !== null && currentScores.fours !== 'x') totalUpper += currentScores.fours
    if (currentScores.fives !== null && currentScores.fives !== 'x') totalUpper += currentScores.fives
    if (currentScores.sixes !== null && currentScores.sixes !== 'x') totalUpper += currentScores.sixes


    if (currentScores.threeOfAKind !== null && currentScores.threeOfAKind !== 'x') totalLower += currentScores.threeOfAKind
    if (currentScores.fourOfAKind !== null && currentScores.fourOfAKind !== 'x') totalLower += currentScores.fourOfAKind
    if (currentScores.fullHouse !== null && currentScores.fullHouse !== 'x') totalLower += currentScores.fullHouse
    if (currentScores.smallStraight !== null && currentScores.smallStraight !== 'x') totalLower += currentScores.smallStraight
    if (currentScores.largeStraight !== null && currentScores.largeStraight !== 'x') totalLower += currentScores.largeStraight
    if (currentScores.yahtzee !== null && currentScores.yahtzee !== 'x') totalLower += currentScores.yahtzee
    if (currentScores.chance !== null && currentScores.chance !== 'x') totalLower += currentScores.chance

    if (totalUpper >= 35) bonus = 35
    total = totalUpper + totalLower + bonus

    return {
        totalUpper: totalUpper,
        totalLower: totalLower,
        bonus: bonus,
        total: total
    }
}

export function gameEnd(scoreCount) {
    return scoreCount === 13 ? true : false
}