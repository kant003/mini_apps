import html from './dice_view.html?raw'
import css from './dice_styles.css?raw'
import { rollDice } from './dice_helpers.js'

class DiceRollerApp extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.innerHTML = `<style>${css}</style>${html}`
        this.$form = shadow.getElementById('form')
        this.$numDice = shadow.getElementById('numDice')
        this.$results = shadow.getElementById('results')
        
        // Vincula el método para mantener el contexto de 'this'
        this.handleSubmit = this.onSubmit.bind(this)
    }

    connectedCallback() {
        this.$form.addEventListener('submit', this.handleSubmit)
    }

    disconnectedCallback() {
        this.$form.removeEventListener('submit', this.handleSubmit)
    }

    onSubmit = (e) => {
        e.preventDefault()
        const num = parseInt(this.$numDice.value) || 1
        const { results, total, error } = rollDice(num)

        if (error) {
            this.$results.textContent = error
            return
        }

        this.$results.textContent = `🎲 ${results.join(' 🎲 ')}`
    }
}

customElements.define('dados-app', DiceRollerApp)