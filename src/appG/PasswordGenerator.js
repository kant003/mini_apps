function randomChar(chars) {
    const index = Math.floor(Math.random() * chars.length);
    return chars.charAt(index);
}

function shuffleString(input) {
    const array = input.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

function generatePassword(length) {
    const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWER = "abcdefghijklmnopqrstuvwxyz";
    const DIGITS = "0123456789";
    const SYMBOLS = "!@#$%&*()-_=+[]{};:,.<>?";
    const ALL_CHARS = UPPER + LOWER + DIGITS + SYMBOLS;

    if (length < 4) {
        throw new Error("La longitud debe ser al menos 4 para incluir todos los tipos de caracteres.");
    }

    let password = '';
    password += randomChar(UPPER);
    password += randomChar(LOWER);
    password += randomChar(DIGITS);
    password += randomChar(SYMBOLS);

    for (let i = 4; i < length; i++) {
        password += randomChar(ALL_CHARS);
    }

    return shuffleString(password);
}

// Ejemplo de uso con prompt en entorno Node.js
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Introduce la longitud deseada para la contraseña (mínimo 4): ', (input) => {
    const length = parseInt(input, 10);
    try {
        const password = generatePassword(length);
        console.log("Contraseña generada: " + password);
    } catch (error) {
        console.log("Error: " + error.message);
    }
    readline.close();
});
