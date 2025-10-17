import { describe, it, expect } from "vitest";
import { formatTime } from '../src/apps/horaActual/helpers.js';

describe('Testeando ClockApp helpers', () => {

  it('Debe devolver un string con la hora', () => {
    const resultado = formatTime(new Date('2025-10-14T13:45:30'));
    expect(typeof resultado).toBe('string');
    expect(resultado.length).toBeGreaterThan(0);
  });

  it('Debe devolver el formato correcto HH:MM:SS', () => {
    const date = new Date('2025-10-14T08:05:09');
    const resultado = formatTime(date);
    // Debe contener al menos dos ":"
    expect(resultado.split(':').length).toBe(3);
    // Comprobamos que los números sean correctos
    const [hh, mm, ss] = resultado.split(':').map(Number);
    expect(hh).toBe(8);
    expect(mm).toBe(5);
    expect(ss).toBe(9);
  });

  it('Debe actualizar los segundos correctamente', () => {
    const date1 = new Date('2025-10-14T10:00:00');
    const date2 = new Date('2025-10-14T10:00:01');
    expect(formatTime(date1)).not.toBe(formatTime(date2));
  });

});
