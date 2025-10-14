// helpers.js

export const rockPaperScissors = () => {
    const random = Math.random();
    if (random < 0.34) return 'piedra';
    if (random < 0.67) return 'papel';
    return 'tijera';
};

export const determineWinner = (user, computer) => {
    if (user === computer) return 'Empate';

    const winConditions = {
        'piedra': 'tijera',
        'papel': 'piedra',
        'tijera': 'papel'
    };

    return winConditions[user] === computer ? 'Ganó el usuario' : 'Ganó el bot';
};