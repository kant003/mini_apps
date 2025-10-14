import html from './view.html?raw';
import css from './styles.css?raw';
import { getRandomColor } from './helpers.js';

class ColorGeneratorApp extends HTMLElement {
    constructor() {
        super();

        // Crear shadow DOM inmediatamente
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `<style>${css}</style>${html}`;

        // Buscar elementos
        this.$colorBox = shadow.getElementById('colorBox');
        this.$colorCode = shadow.getElementById('colorCode');
        this.$generateBtn = shadow.getElementById('generateBtn');
        this.$copyBtn = shadow.getElementById('copyBtn');
    }

    connectedCallback() {
        if (this.$generateBtn && this.$copyBtn) {
            this.$generateBtn.addEventListener('click', this.generateColor);
            this.$copyBtn.addEventListener('click', this.copyColor);
            this.generateColor();
        }
    }

    disconnectedCallback() {
        if (this.$generateBtn && this.$copyBtn) {
            this.$generateBtn.removeEventListener('click', this.generateColor);
            this.$copyBtn.removeEventListener('click', this.copyColor);
        }
    }

    generateColor = () => {
        const color = getRandomColor();
        if (this.$colorBox) this.$colorBox.style.backgroundColor = color;
        if (this.$colorCode) this.$colorCode.textContent = color;
        document.body.style.backgroundColor = color + '33';
    };

copyColor = () => {
    if (!this.$copyBtn) return;
    
    // Guardar el color original del botón
    const originalBackgroundColor = this.$copyBtn.style.backgroundColor;
    // Cambiar a rojo
    this.$copyBtn.style.backgroundColor = 'red';
    // Volver al color original después de 1.5 segundos
    setTimeout(() => {
        if (this.$copyBtn) {
            this.$copyBtn.style.backgroundColor = originalBackgroundColor;
        }
    }, 500);
};
}

customElements.define('r_color-app', ColorGeneratorApp);