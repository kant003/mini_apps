import { describe, it, expect } from "vitest";
import { generarNumeroAleatorio } from '../src/apps/adivinar/helpers.js'; // Ajusta ruta

describe('testeando generarNumeroAleatorio', () => {
  it('debe devolver un número dentro del rango mínimo y máximo', () => { 
    const min = 1;
    const max = 10;
    const resultado = generarNumeroAleatorio(min, max);
    expect(resultado).toBeGreaterThanOrEqual(min);
    expect(resultado).toBeLessThanOrEqual(max); 
  });

  it('debe devolver el mismo número si min y max son iguales', () => {
    const min = 5;
    const max = 5;
    const resultado = generarNumeroAleatorio(min, max);
    expect(resultado).toBe(5);
  });

  it('debe redondear correctamente los límites hacia arriba y hacia abajo', () => {
    const min = 1.2;
    const max = 4.8;
    const resultado = generarNumeroAleatorio(min, max);
    expect(resultado).toBeGreaterThanOrEqual(2);
    expect(resultado).toBeLessThanOrEqual(4);
  });

  it('puede devolver todos los valores posibles en el rango', () => {
    const min = 1;
    const max = 3;
    const resultados = new Set();
    for (let i = 0; i < 100; i++) {
      resultados.add(generarNumeroAleatorio(min, max));
    }
    expect(resultados.has(1)).toBe(true);
    expect(resultados.has(2)).toBe(true);
    expect(resultados.has(3)).toBe(true);
  });
});
