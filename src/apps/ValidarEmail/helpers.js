/**
 * Valida si un email tiene un formato correcto
 * @param {string} email - El email a validar
 * @returns {boolean} - true si el email es válido, false en caso contrario
 */
export function validarEmail(email) {
    if (typeof email !== 'string' || !email.trim()) {
        return false;
    }

    // Regex más flexible pero segura:
    // - Permite letras, números, puntos, guiones y guiones bajos en el usuario
    // - No permite que empiece o termine con punto, guion o guion bajo
    // - Dominio debe tener al menos un punto y terminar con 2 o más letras
    const emailRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email.trim());
}


/**
 * Valida un email con verificaciones adicionales más estrictas
 * @param {string} email - El email a validar
 * @returns {object} - Objeto con resultado de validación y mensaje
 */
export function validarEmailExtendido(email) {
    if (!email || typeof email !== 'string') {
        return {
            valido: false,
            mensaje: 'El email no puede estar vacío'
        };
    }

    const emailTrimmed = email.trim();

    // Verificar longitud
    if (emailTrimmed.length > 254) {
        return {
            valido: false,
            mensaje: 'El email es demasiado largo'
        };
    }

    // Verificar que no empiece o termine con punto
    if (emailTrimmed.startsWith('.') || emailTrimmed.endsWith('.')) {
        return {
            valido: false,
            mensaje: 'El email no puede empezar o terminar con punto'
        };
    }

    // Verificar que tenga exactamente un @
    const atCount = (emailTrimmed.match(/@/g) || []).length;
    if (atCount !== 1) {
        return {
            valido: false,
            mensaje: 'El email debe contener exactamente un símbolo @'
        };
    }

    const [usuario, dominio] = emailTrimmed.split('@');

    // Verificar que tanto usuario como dominio no estén vacíos
    if (!usuario || !dominio) {
        return {
            valido: false,
            mensaje: 'El email debe tener usuario y dominio'
        };
    }

    // Verificar longitud del usuario
    if (usuario.length > 64) {
        return {
            valido: false,
            mensaje: 'La parte del usuario es demasiado larga'
        };
    }

    // Verificar que el dominio tenga al menos un punto
    if (!dominio.includes('.')) {
        return {
            valido: false,
            mensaje: 'El dominio debe contener al menos un punto'
        };
    }

    // Usar la validación básica con regex
    if (!validarEmail(emailTrimmed)) {
        return {
            valido: false,
            mensaje: 'El formato del email no es válido'
        };
    }

    return {
        valido: true,
        mensaje: 'Email válido'
    };
}