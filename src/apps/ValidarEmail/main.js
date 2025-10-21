
import html from './pagina.html?raw'
import css from './styles.css?raw'
import { validarEmail } from './helpers.js'

class ValidarEmailApp extends HTMLElement{
    constructor(){
        super()
        const shadow = this.attachShadow({mode:'open'})
        shadow.innerHTML = `<style>${css}</style>${html}`
        this.$form = shadow.getElementById('form')
        this.$email = shadow.getElementById('email')
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
        const email = this.$email.value
        const esValido = validarEmail(email)
        this.$out.textContent = esValido ? 'Email válido' : 'Email no válido'
    }
}

customElements.define('validaremail-app', ValidarEmailApp)
