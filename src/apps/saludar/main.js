
import html from './view.html?raw'
import css from './styles.css?raw'
import {greet} from './helpers.js'

class SaludarApp extends HTMLElement{
    constructor(){
        super()
        const shadow = this.attachShadow({mode:'open'})
        shadow.innerHTML = `<style>${css}</style>${html}`
        this.$form = shadow.getElementById('form')
        this.$name = shadow.getElementById('name')
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
        //this.$out.textContent = "Hola que tal "  +  this.$name.value
        this.$out.textContent = greet(this.$name.value)
    }
}

customElements.define('saludar-app', SaludarApp)
