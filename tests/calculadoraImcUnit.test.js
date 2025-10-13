import { describe, it, expect } from 'vitest';
import { calcularIMC, calcularPesoIdeal, validarDatos } from '../src/apps/calculadora-imc/helpers.js';

describe('Funciones helpers de calculadora IMC', () => {
  it('calcular IMC correctamente', () => {
    const imc = calcularIMC(70, 1.75);
    expect(imc).toBeCloseTo(22.86, 2);
  });

  it('calcular peso ideal correctamente', () => {
    const pesoIdeal = calcularPesoIdeal(1.75);
    expect(pesoIdeal).toBeCloseTo(22 * 1.75 * 1.75, 2);
  });

  it('validar datos correctamente', () => {
    expect(validarDatos(70, 1.75)).toBe('');
    expect(validarDatos(0, 1.75)).toBe('Peso inválido');
    expect(validarDatos(70, 0)).toBe('Altura inválida');
    expect(validarDatos(-5, 1.75)).toBe('Peso inválido');
    expect(validarDatos(70, -1.75)).toBe('Altura inválida');
    expect(validarDatos(NaN, 1.75)).toBe('Peso inválido');
    expect(validarDatos(70, NaN)).toBe('Altura inválida');
  });
});
