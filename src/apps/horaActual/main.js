import html from './view.html?raw'
import css from './styles.css?raw'
import { formatTime } from './helpers.js'

class ClockApp extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `<style>${css}</style>${html}`
    this.$time = shadow.getElementById('time')
  }

  connectedCallback() {
    this.startClock()
  }

  disconnectedCallback() {
    clearInterval(this._interval)
  }

  startClock() {
    const updateTime = () => {
      const now = new Date()
      this.$time.textContent = formatTime(now)
    }

    updateTime()
    this._interval = setInterval(updateTime, 1000)
  }
}

customElements.define('clock-app', ClockApp)
