import { fireEvent } from '@testing-library/dom';
import confetti from 'canvas-confetti';
import '../src/apps/Confeti/Main.js';

vi.mock('canvas-confetti', () => ({
  // Por defecto la librería exporta "default"
  default: vi.fn(),
}));

function mount() {
  document.body.innerHTML = '';
  const $webComponent = document.createElement('confeti-app');
  document.body.appendChild($webComponent);
  return (
    $webComponent.shadowRoot || $webComponent.attachShadow({ mode: 'open' })
  );
}

describe('testeando confeti E2E', () => {
  it('Muestra el botón y dispara confeti al hacer clic', () => {
    const shadow = mount();
    const $btn = shadow.querySelector('#btnConfeti');

    expect($btn).toBeTruthy();
    expect($btn.textContent).toBe('Celebrar');

    fireEvent.click($btn);

    // Ahora el mock de confetti es controlado por Vitest
    expect(confetti).toHaveBeenCalled();
  });
});
