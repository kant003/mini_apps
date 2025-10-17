import html from './view.html?raw'
import css from './styles.css?raw'
import { convert, formatCurrency } from './helpers.js'

const API_URL = 'https://api.fxratesapi.com/latest?currencies=usd,%20eur&base=usd'

class FxConverterApp extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<style>${css}</style>${html}`;

    this.$form = shadow.getElementById('form');
    this.$amount = shadow.getElementById('amount');
    this.$from = shadow.getElementById('from');
    this.$to = shadow.getElementById('to');
    this.$swap = shadow.getElementById('swap');
    this.$out = shadow.getElementById('out');
    this.$meta = shadow.getElementById('meta');

    this.rates = { USD: 1, EUR: NaN, base: 'USD' };
  }

  connectedCallback() {
    this.$form.addEventListener('submit', this.onSubmit);
    this.$swap.addEventListener('click', this.onSwap);
    this.fetchRates();
  }

  disconnectedCallback() {
    this.$form.removeEventListener('submit', this.onSubmit);
    this.$swap.removeEventListener('click', this.onSwap);
  }

  onSwap = () => {
    const from = this.$from.value;
    this.$from.value = this.$to.value;
    this.$to.value = from;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(this.$amount.value);
    const from = this.$from.value;
    const to = this.$to.value;

    if (!isFinite(amount) || amount < 0) {
      this.$out.innerHTML = '<span class="error">Introduce una cantidad válida.</span>';
      return;
    }
    try {
      const value = convert(amount, from, to, this.rates);
      const pretty = formatCurrency(value, to);
      this.$out.innerHTML = `${formatCurrency(amount, from)} = <span class="success">${pretty}</span>`;
    } catch {
      this.$out.innerHTML = '<span class="error">No se pudo convertir. Intenta de nuevo.</span>';
    }
  };

  async fetchRates() {
    this.$meta.textContent = 'Cargando tasas…';
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const eur = data?.rates?.eur ?? data?.rates?.EUR;
      this.rates = { USD: 1, EUR: Number(eur), base: 'USD' };
      const date = data?.date || data?.timestamp || '';
      this.$meta.textContent = `Base: USD · EUR por USD: ${eur} ${date ? '· Fecha: ' + date : ''}`;
    } catch {
      this.$meta.innerHTML = '<span class="error">No se pudieron obtener las tasas actuales. Usaré 1:1 hasta que funcione.</span>';
      this.rates = { USD: 1, EUR: 1, base: 'USD' };
    }
  }
}

customElements.define('conversor-divisas-app', FxConverterApp);
