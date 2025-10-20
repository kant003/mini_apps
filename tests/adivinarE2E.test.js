import { fireEvent } from "@testing-library/dom";
import '../src/apps/adivinar/main.js'; // Ajusta la ruta
 
function mount() {
    document.body.innerHTML = '';
    const $webComponent = document.createElement('adivinar-app');
    document.body.appendChild($webComponent);
    return $webComponent.shadowRoot; 
} 

describe('testeando JuegoAdivinarNumeros E2E', () => {

    it('Muestra mensaje de bienvenida al iniciar', () => {
        const shadow = mount();
        const $bienvenida = shadow.querySelector('#bienvenida');
        expect($bienvenida.textContent).toBe('¡Bienvenido al juego! Tienes que adivinar el número.');
    });

    it('Muestra mensaje de intento inválido si se ingresa un número fuera de rango', () => {
        const shadow = mount();
        const $input = shadow.querySelector('#intentoInput');
        const $boton = shadow.querySelector('#adivinarBtn');
        const $resultado = shadow.querySelector('#resultado');

        $input.value = '0';
        fireEvent.click($boton);

        expect($resultado.textContent).toContain('Por favor, introduce un número válido');
    });

    it('Muestra mensaje demasiado alto o bajo según el intento', () => {
        const shadow = mount();
        const $input = shadow.querySelector('#intentoInput');
        const $boton = shadow.querySelector('#adivinarBtn');
        const $resultado = shadow.querySelector('#resultado');
        const numeroSecreto = shadow.host.numeroSecreto;

       
        $input.value = (numeroSecreto - 1).toString();
        fireEvent.click($boton);
        expect($resultado.textContent).toContain('Demasiado bajo');

        
        $input.value = (numeroSecreto + 1).toString();
        fireEvent.click($boton);
        expect($resultado.textContent).toContain('Demasiado alto');
    });

    it('Finaliza el juego al adivinar correctamente', () => {
        const shadow = mount();
        const $input = shadow.querySelector('#intentoInput');
        const $boton = shadow.querySelector('#adivinarBtn');
        const $resultado = shadow.querySelector('#resultado');
        const numeroSecreto = shadow.host.numeroSecreto;

        $input.value = numeroSecreto.toString();
        fireEvent.click($boton);

        expect($resultado.textContent).toContain(`¡Felicidades! Adivinaste el número ${numeroSecreto}`);
        expect($input.disabled).toBe(true);
        expect($boton.disabled).toBe(true);
    });
});
