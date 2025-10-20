import html from './view.html?raw'
import css from './style.css?raw'
import { dniLetter } from './helpers.js'

class DniApp extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `<style>${css}</style>${html}`
    this.$form = shadow.getElementById('form')
    this.$dni = shadow.getElementById('dni')
    this.$out = shadow.getElementById('out')
  }

  connectedCallback() {
    this.$form.addEventListener('submit', this.onSubmit)
  }
  disconnectedCallback() {
    this.$form.removeEventListener('submit', this.onSubmit)
  }

  onSubmit = (e) => {
    e.preventDefault()

    const raw = this.$dni.value || ''
    let digits = ''
    for (let i = 0; i < raw.length; i++) {
      const c = raw[i]
      if (c >= '0' && c <= '9') digits += c
    }

    if (digits.length !== 8) {
      this.$out.textContent = 'Introduce exactamente 8 números'
      return
    }

    const letter = dniLetter(digits)
    this.$out.textContent = letter ? `${digits}${letter}` : 'No válido'
  }
}

customElements.define('dni-app', DniApp)
