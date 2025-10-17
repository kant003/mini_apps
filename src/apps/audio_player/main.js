import html from './view.html?raw'
import css from './styles.css?raw'

class AudioPlayer extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `<style>${css}</style>${html}`

    this.audio = shadow.getElementById("audio")
    this.playPauseBtn = shadow.getElementById("playPauseBtn")
    this.prevBtn = shadow.getElementById("prevBtn")
    this.nextBtn = shadow.getElementById("nextBtn")
    this.progress = shadow.getElementById("progress")
    this.currentTimeEl = shadow.getElementById("currentTime")
    this.durationEl = shadow.getElementById("duration")
    this.volumeRange = shadow.getElementById("volumeRange")
    this.trackNameEl = shadow.getElementById("trackName")
    this.playlistEl = shadow.getElementById("playlist")

    this.tracks = Array.from(this.playlistEl.querySelectorAll("li")).map((li) => ({
      src: li.dataset.src,
      name: li.textContent.trim(),
      el: li,
    }))
    this.currentIndex = 0
  }

  connectedCallback() {
    this.playPauseBtn.addEventListener("click", this.togglePlay)
    this.prevBtn.addEventListener("click", () => this.loadTrack(this.currentIndex - 1))
    this.nextBtn.addEventListener("click", () => this.loadTrack(this.currentIndex + 1))
    this.progress.addEventListener("input", this.seek)
    this.volumeRange.addEventListener("input", () => {
      this.audio.volume = parseFloat(this.volumeRange.value)
    })
    this.audio.addEventListener("timeupdate", this.updateProgress)
    this.audio.addEventListener("loadedmetadata", () => {
      this.durationEl.textContent = this.formatTime(this.audio.duration)
    })
    this.audio.addEventListener("ended", () => this.loadTrack(this.currentIndex + 1))
    this.audio.addEventListener("play", this.updatePlayButton)
    this.audio.addEventListener("pause", this.updatePlayButton)

    this.tracks.forEach((t, i) => {
      t.el.addEventListener("click", () => this.loadTrack(i))
    })

    this.loadTrack(this.currentIndex)
    this.updatePlayButton()
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return "0:00"
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  togglePlay = () => {
    if (this.audio.src === "") this.loadTrack(this.currentIndex)
    this.audio.paused ? this.audio.play() : this.audio.pause()
  }

  updatePlayButton = () => {
    const playing = !this.audio.paused
    this.playPauseBtn.textContent = playing ? "⏸" : "▶"
    this.playPauseBtn.classList.toggle("playing", playing)
  }

  updateProgress = () => {
    if (!isNaN(this.audio.duration) && this.audio.duration > 0) {
      const pct = (this.audio.currentTime / this.audio.duration) * 100
      this.progress.value = pct
      this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime)
    }
  }

  seek = () => {
    const newTime = (this.progress.value / 100) * this.audio.duration
    this.audio.currentTime = isNaN(newTime) ? 0 : newTime
  }

  loadTrack(index) {
    this.currentIndex = ((index % this.tracks.length) + this.tracks.length) % this.tracks.length
    const track = this.tracks[this.currentIndex]
    this.audio.src = track.src
    this.audio.load()
    this.audio.play()
    this.trackNameEl.textContent = track.name
    this.tracks.forEach((t, i) => t.el.classList.toggle("active", i === this.currentIndex))
    this.updatePlayButton()
  }
}

customElements.define('audio_player-app', AudioPlayer)
