import { describe, it, expect, vi } from "vitest";
import { lanzarMoneda } from "../src/apps/lanzarMoneda/helpers.js"; // Ajusta la ruta


describe('testeando lanzarMoneda', () => {

    it('debe devolver "Cara" cuando Math.random() retorna 0.4', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.4);

        const resultado = lanzarMoneda();
        expect(resultado).toBe('Cara');

        vi.restoreAllMocks();
    });

    it('debe devolver "Cruz" cuando Math.random() retorna 0.7', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.7);

        const resultado = lanzarMoneda();
        expect(resultado).toBe('Cruz');

        vi.restoreAllMocks();
    });
});