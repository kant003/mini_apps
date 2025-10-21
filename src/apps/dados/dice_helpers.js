export const rollDice = (numDice = 1) => {
    if (numDice < 1 || numDice > 10) {
        return { error: "Número de dados debe estar entre 1 y 10" }
    }

    const results = []
    let total = 0

    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * 6) + 1
        results.push(roll)
        total += roll
    }

    return { results, total }
}