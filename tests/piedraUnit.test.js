import { describe, it, expect, vi } from "vitest";
import { rockPaperScissors, determineWinner } from '../src/apps/piedra/helpers.js';

// Mock de Math.random para pruebas predecibles
const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

describe('Helpers de Piedra Papel Tijera', () => {
    describe('rockPaperScissors', () => {
        it('debe devolver "piedra" cuando el random es menor que 0.34', () => {
            global.Math.random = () => 0.2;
            const result = rockPaperScissors();
            expect(result).toBe('piedra');
        });

        it('debe devolver "papel" cuando el random está entre 0.34 y 0.67', () => {
            global.Math.random = () => 0.5;
            const result = rockPaperScissors();
            expect(result).toBe('papel');
        });

        it('debe devolver "tijera" cuando el random es mayor o igual a 0.67', () => {
            global.Math.random = () => 0.8;
            const result = rockPaperScissors();
            expect(result).toBe('tijera');
        });

        it('debe devolver una de las tres opciones válidas', () => {
            const validOptions = ['piedra', 'papel', 'tijera'];
            const result = rockPaperScissors();
            expect(validOptions).toContain(result);
        });
    });

    describe('determineWinner', () => {
        it('debe devolver "Empate" cuando ambas elecciones son iguales', () => {
            expect(determineWinner('piedra', 'piedra')).toBe('Empate');
            expect(determineWinner('papel', 'papel')).toBe('Empate');
            expect(determineWinner('tijera', 'tijera')).toBe('Empate');
        });

        it('debe devolver "Ganó el usuario" cuando el usuario gana', () => {
            expect(determineWinner('piedra', 'tijera')).toBe('Ganó el usuario');
            expect(determineWinner('papel', 'piedra')).toBe('Ganó el usuario');
            expect(determineWinner('tijera', 'papel')).toBe('Ganó el usuario');
        });

        it('debe devolver "Ganó el bot" cuando gana la computadora', () => {
            expect(determineWinner('piedra', 'papel')).toBe('Ganó el bot');
            expect(determineWinner('papel', 'tijera')).toBe('Ganó el bot');
            expect(determineWinner('tijera', 'piedra')).toBe('Ganó el bot');
        });

        it('debe manejar correctamente todas las combinaciones ganadoras', () => {
            // Prueba todas las victorias del usuario
            expect(determineWinner('piedra', 'tijera')).toBe('Ganó el usuario');
            expect(determineWinner('papel', 'piedra')).toBe('Ganó el usuario');
            expect(determineWinner('tijera', 'papel')).toBe('Ganó el usuario');

            // Prueba todas las victorias de la computadora
            expect(determineWinner('piedra', 'papel')).toBe('Ganó el bot');
            expect(determineWinner('papel', 'tijera')).toBe('Ganó el bot');
            expect(determineWinner('tijera', 'piedra')).toBe('Ganó el bot');

            // Prueba todos los empates
            expect(determineWinner('piedra', 'piedra')).toBe('Empate');
            expect(determineWinner('papel', 'papel')).toBe('Empate');
            expect(determineWinner('tijera', 'tijera')).toBe('Empate');
        });
    });
});
