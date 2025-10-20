import { describe, it, expect, vi } from "vitest";
import '../src/apps/lanzarMoneda/main.js';
import { lanzarMoneda } from "../src/apps/lanzarMoneda/helpers.js";

vi.mock('../src/apps/lanzarMoneda/helpers.js', () => ({
    lanzarMoneda: vi.fn(),
}));

describe('E2E: Flujo de usuario en el componente LanzarMoneda', () => {

    let componente;

    beforeEach(() => {
        componente = document.createElement('lanzar-moneda-app');
        document.body.appendChild(componente);
    });

    afterEach(() => {
        document.body.removeChild(componente);
        componente = null;
        vi.clearAllMocks();
    });

    it('debe actualizar el resultado del párrafo tras simular el clic en el botón', () => {
        lanzarMoneda.mockReturnValue('Cara');

        const boton = componente.shadowRoot.getElementById('boton');
        const resultadoElement = componente.shadowRoot.getElementById('resultado');

        expect(resultadoElement.textContent).toBe('Pulsa el botón para lanzar');

        boton.click();

        expect(lanzarMoneda).toHaveBeenCalledTimes(1);

        expect(resultadoElement.textContent).toBe('Ha salido: Cara');
    });

    it('debe reflejar el resultado "Cruz" si el helper lo indica', () => {
        lanzarMoneda.mockReturnValue('Cruz');

        const boton = componente.shadowRoot.getElementById('boton');
        const resultadoElement = componente.shadowRoot.getElementById('resultado');

        boton.click();

        expect(lanzarMoneda).toHaveBeenCalledTimes(1);
        expect(resultadoElement.textContent).toBe('Ha salido: Cruz');
    });
});