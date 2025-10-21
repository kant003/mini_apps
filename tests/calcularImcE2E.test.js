import { fireEvent } from "@testing-library/dom";
import '../src/apps/calculadora-imc/main.js';

function mount() {
  document.body.innerHTML = '';
  const el = document.createElement('calculadoraimc-app');
  document.body.appendChild(el);
  return el.shadowRoot;
}

describe('calculadora IMC E2E simplificado', () => {
  it('calcula IMC y muestra resultado', () => {
    const shadow = mount();
    shadow.querySelector('#peso').value = '70';
    shadow.querySelector('#altura').value = '1.75';

    fireEvent.submit(shadow.querySelector('#form'));

    expect(shadow.querySelector('#mensaje').textContent).toBe('');
    expect(shadow.querySelector('#out').textContent).toContain('Tu IMC es');
  });

  it('muestra error para datos inválidos', () => {
    const shadow = mount();
    shadow.querySelector('#peso').value = '-5';
    fireEvent.submit(shadow.querySelector('#form'));

    expect(shadow.querySelector('#mensaje').textContent).toBe('Peso inválido');
  });
});
