import html from './view.html?raw';
import css from './styles.css?raw';
import { calcularIMC, calcularPesoIdeal, validarDatos } from './helpers.js';

class CalculadoraIMC extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<style>${css}</style>${html}`;
    this.$form = shadow.getElementById('form');
    this.$peso = shadow.getElementById('peso');
    this.$altura = shadow.getElementById('altura');
    this.$mensaje = shadow.getElementById('mensaje');
    this.$out = shadow.getElementById('out');
  }

  connectedCallback() {
    this.$form.addEventListener('submit', this.onSubmit);
  }

  disconnectedCallback() {
    this.$form.removeEventListener('submit', this.onSubmit);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.$mensaje.textContent = '';
    this.$out.textContent = '';

    const peso = parseFloat(this.$peso.value);
    const altura = parseFloat(this.$altura.value);

    const error = validarDatos(peso, altura);
    if (error) {
      this.$mensaje.textContent = error;
      return;
    }

    const imc = calcularIMC(peso, altura);
    const pesoIdeal = calcularPesoIdeal(altura);

    this.$out.textContent = `Tu IMC es ${imc.toFixed(2)}. Tu peso ideal es ${pesoIdeal.toFixed(2)} kg.`;
  };
}

customElements.define('calculadoraimc-app', CalculadoraIMC);
