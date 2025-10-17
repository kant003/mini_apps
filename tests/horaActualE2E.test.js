import { fireEvent } from "@testing-library/dom";
import '../src/apps/horaActual/main.js';
function mount() {
    document.body.innerHTML = '';
    const $webComponent = document.createElement('clock-app');
    document.body.appendChild($webComponent);
    return $webComponent.shadowRoot || $webComponent.attachShadow({ mode: 'open' });
}

describe('Testeando ClockApp E2E', () => {

    beforeEach(() => {
        vi.useFakeTimers(); // Activamos timers falsos antes de cada test
    });

    afterEach(() => {
        vi.useRealTimers(); // Restauramos timers reales después de cada test
    });

    it('Renderiza un elemento de tiempo', () => {
        const shadow = mount();
        const $time = shadow.querySelector('#time');
        expect($time).not.toBeNull();
        expect($time.textContent).toMatch(/\d{1,2}:\d{2}:\d{2}/);
    });

    it('Actualiza la hora después de 1 segundo', () => {
        const shadow = mount();
        const $time = shadow.querySelector('#time');
        const initialTime = $time.textContent;

        // Avanzamos 1 segundo
        vi.advanceTimersByTime(1000);

        const updatedTime = $time.textContent;
        expect(updatedTime).not.toBe(initialTime); 
    });

});