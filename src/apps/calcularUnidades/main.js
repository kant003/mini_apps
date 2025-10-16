import html from './view.html?raw'
import css from './styles.css?raw'
import { toMilimiters, verifyData,toDestiny } from './helpers.js'

class CalcularUnidadesApp extends HTMLElement{
    constructor(){
        super()
        const shadow = this.attachShadow({mode:'open'})
        shadow.innerHTML = `<style>${css}</style>${html}`
        this.$form = shadow.getElementById('form')
        this.$quantity = shadow.getElementById('quantity')
        this.$originUnit = shadow.getElementById('originUnit')
        this.$destinyUnit = shadow.getElementById('destinyUnit')
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
        if(verifyData(this.$quantity.value)){
        const milimiters = toMilimiters(this.$quantity.value, this.$originUnit.value)
        this.$out.textContent = `Resultado: ${toDestiny(milimiters,this.$destinyUnit.value)}`}
        else {this.$out.textContent = 'Resultado: No valido'}
    }
}

customElements.define('unidades-app', CalcularUnidadesApp)