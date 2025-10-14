import html from './view.html?raw';
import css from './styles.css?raw';
import confetti from 'canvas-confetti';

class ConfetiApp extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<style>${css}</style>${html}`;
    this.$btn = shadow.getElementById('btnConfeti');
  }

  connectedCallback() {
    this.$btn.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.$btn.removeEventListener('click', this.onClick);
  }

  onClick = () => {
    const rect = this.$btn.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { x, y },
    });
  };
}

customElements.define('confeti-app', ConfetiApp);
