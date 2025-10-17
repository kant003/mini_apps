// main.js
import html from './view.html?raw'
import css from './styles.css?raw'
import { lanzarMoneda } from './helpers.js'

class LanzarMoneda extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `<style>${css}</style>${html}`

    // 🏆 CLAVE: Enlazar el método aquí para asegurar 'this'
    this.onLanzar = this.onLanzar.bind(this) 

    this.$boton = shadow.getElementById('boton')
    this.$resultado = shadow.getElementById('resultado')
  }

  connectedCallback() {
    // Para verificar si al menos se conecta al DOM:
    console.log('Componente LanzarMoneda conectado y listo.') 
    
    if (this.$boton) {
      this.$boton.addEventListener('click', this.onLanzar)
    }
  }

  disconnectedCallback() {
    if (this.$boton) {
      this.$boton.removeEventListener('click', this.onLanzar)
    }
  }

  onLanzar() {
    // Para verificar si el evento se dispara:
    console.log('¡Botón pulsado!')
    
    const valor = lanzarMoneda()
    this.$resultado.textContent = `Ha salido: ${valor}`
  }
}

customElements.define('lanzar-moneda-app', LanzarMoneda)