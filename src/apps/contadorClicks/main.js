class ContadorClicks extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.count = 0;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    const estilos = document.createElement('style');

    const contenedor = document.createElement('div');
    const texto = document.createElement('p');

    texto.textContent = 'Clicks hechos: ';
    this.countDisplay = document.createElement('span');
    this.countDisplay.textContent = this.count;

    const botonReinicio = document.createElement('button');
    botonReinicio.textContent = 'Reset';

    botonReinicio.addEventListener('click', (event) => {
      event.stopPropagation();
      this.count = 0;
      this.actualizarPantalla();
    });

    texto.appendChild(this.countDisplay);
    contenedor.appendChild(texto);
    contenedor.appendChild(botonReinicio);

    this.shadowRoot.appendChild(estilos);
    this.shadowRoot.appendChild(contenedor);
  }

  actualizarPantalla() {
    this.countDisplay.textContent = this.count;
  }

  handleDocumentClick(event) {
    if (event.composedPath().includes(this)) {
      return;
    }
    this.count++;
    this.actualizarPantalla();
  }

  connectedCallback() {
    setTimeout(() => {
      document.addEventListener('click', this.handleDocumentClick, true);
    }, 0);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleDocumentClick, true);
  }
}
customElements.define('contador-app', ContadorClicks);
