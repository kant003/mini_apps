import { fireEvent, screen } from "@testing-library/dom";
import '../src/apps/piedra/main.js';

// Mock de Math.random para pruebas predecibles
const mockMath = Object.create(global.Math);
let mockRandomValue = 0.5;
mockMath.random = () => mockRandomValue;
global.Math = mockMath;

function mount() {
    document.body.innerHTML = '';
    const $webComponent = document.createElement('piedra-app');
    document.body.appendChild($webComponent);
    return $webComponent.shadowRoot || $webComponent.attachShadow({ mode: 'open' });
}

describe('Aplicación de Piedra Papel Tijera E2E', () => {
    let shadow;

    beforeEach(() => {
        shadow = mount();
        mockRandomValue = 0.5; // Reiniciar al valor por defecto
    });

    describe('Estado inicial', () => {
        it('debe mostrar las puntuaciones iniciales y el conteo de juegos', () => {
            expect(shadow.querySelector('#userScore').textContent).toBe('0');
            expect(shadow.querySelector('#computerScore').textContent).toBe('0');
            expect(shadow.querySelector('#gamesPlayed').textContent).toBe('0');
            expect(shadow.querySelector('#result').innerHTML).toBe('');
        });

        it('debe tener piedra seleccionado por defecto', () => {
            const select = shadow.querySelector('#options');
            expect(select.value).toBe('piedra');
        });
    });

    describe('Funcionalidad del juego', () => {
        it('debe mostrar el resultado cuando se juega una partida', () => {
            const playBtn = shadow.querySelector('#play');
            fireEvent.click(playBtn);

            const resultDiv = shadow.querySelector('#result');
            expect(resultDiv.innerHTML).not.toBe('');
            expect(resultDiv.querySelector('h1')).toBeTruthy();
        });

        it('debe mostrar la elección del usuario y la computadora en el resultado', () => {
            const playBtn = shadow.querySelector('#play');
            fireEvent.click(playBtn);

            const resultDiv = shadow.querySelector('#result');
            const paragraphs = resultDiv.querySelectorAll('p');

            expect(paragraphs[0]).toBeTruthy(); // Elección del usuario
            expect(paragraphs[1]).toBeTruthy(); // Elección de la computadora
            expect(paragraphs[0].textContent).toContain('Tu elección');
            expect(paragraphs[1].textContent).toContain('Bot');
        });

        it('debe actualizar las puntuaciones cuando gana el usuario', () => {
            // Mock para que la computadora elija tijera (usuario piedra debe ganar)
            mockRandomValue = 0.8; // Esto hará que la computadora elija tijera

            const playBtn = shadow.querySelector('#play');
            fireEvent.click(playBtn);

            expect(shadow.querySelector('#userScore').textContent).toBe('1');
            expect(shadow.querySelector('#computerScore').textContent).toBe('0');
            expect(shadow.querySelector('#gamesPlayed').textContent).toBe('1');
        });

        it('debe actualizar las puntuaciones cuando gana la computadora', () => {
            // Mock para que la computadora elija papel (usuario piedra debe perder)
            mockRandomValue = 0.5; // Esto hará que la computadora elija papel

            const playBtn = shadow.querySelector('#play');
            fireEvent.click(playBtn);

            expect(shadow.querySelector('#userScore').textContent).toBe('0');
            expect(shadow.querySelector('#computerScore').textContent).toBe('1');
            expect(shadow.querySelector('#gamesPlayed').textContent).toBe('1');
        });

        it('no debe actualizar las puntuaciones en caso de empate', () => {
            // Mock para que la computadora elija piedra (igual que el usuario por defecto)
            mockRandomValue = 0.2; // Esto hará que la computadora elija piedra

            const playBtn = shadow.querySelector('#play');
            fireEvent.click(playBtn);

            expect(shadow.querySelector('#userScore').textContent).toBe('0');
            expect(shadow.querySelector('#computerScore').textContent).toBe('0');
            expect(shadow.querySelector('#gamesPlayed').textContent).toBe('1');
        });

        it('debe permitir cambiar la elección del usuario', () => {
            const select = shadow.querySelector('#options');
            select.value = 'papel';
            fireEvent.change(select);

            // Mock para que la computadora elija piedra (usuario papel debe ganar)
            mockRandomValue = 0.2;

            const playBtn = shadow.querySelector('#play');
            fireEvent.click(playBtn);

            expect(shadow.querySelector('#userScore').textContent).toBe('1');
        });
    });

    describe('Funcionalidad de reinicio', () => {
        beforeEach(() => {
            // Jugar algunas partidas primero
            const playBtn = shadow.querySelector('#play');

            // Primera partida - usuario gana
            mockRandomValue = 0.8;
            fireEvent.click(playBtn);

            // Segunda partida - computadora gana
            mockRandomValue = 0.5;
            fireEvent.click(playBtn);
        });

        it('debe reiniciar todas las puntuaciones y el conteo de juegos', () => {
            expect(shadow.querySelector('#userScore').textContent).toBe('1');
            expect(shadow.querySelector('#computerScore').textContent).toBe('1');
            expect(shadow.querySelector('#gamesPlayed').textContent).toBe('2');

            const resetBtn = shadow.querySelector('#reset');
            fireEvent.click(resetBtn);

            expect(shadow.querySelector('#userScore').textContent).toBe('0');
            expect(shadow.querySelector('#computerScore').textContent).toBe('0');
            expect(shadow.querySelector('#gamesPlayed').textContent).toBe('0');
        });

        it('debe limpiar la pantalla de resultados', () => {
            const resetBtn = shadow.querySelector('#reset');
            fireEvent.click(resetBtn);

            expect(shadow.querySelector('#result').innerHTML).toBe('');
        });

        it('debe reiniciar la opción a piedra', () => {
            const select = shadow.querySelector('#options');
            select.value = 'tijera';

            const resetBtn = shadow.querySelector('#reset');
            fireEvent.click(resetBtn);

            expect(select.value).toBe('piedra');
        });
    });
});
