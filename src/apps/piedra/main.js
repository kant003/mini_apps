// main.js

import html from './view.html?raw';
import css from './styles.css?raw';
import { rockPaperScissors, determineWinner } from './helpers.js';

class RockPaperScissorsApp extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `<style>${css}</style>${html}`;

        this.userScore = 0;
        this.computerScore = 0;
        this.gamesPlayed = 0;

        this.$userScore = shadow.getElementById('userScore');
        this.$computerScore = shadow.getElementById('computerScore');
        this.$options = shadow.getElementById('options');
        this.$playBtn = shadow.getElementById('play');
        this.$resetBtn = shadow.getElementById('reset');
        this.$result = shadow.getElementById('result');
        this.$gamesPlayed = shadow.getElementById('gamesPlayed');
    }

    connectedCallback() {
        this.$playBtn.addEventListener('click', this.playGame);
        this.$resetBtn.addEventListener('click', this.resetGame);
    }

    disconnectedCallback() {
        this.$playBtn.removeEventListener('click', this.playGame);
        this.$resetBtn.removeEventListener('click', this.resetGame);
    }

    playGame = () => {
        const userOption = this.$options.value;
        const computerOption = rockPaperScissors();
        const result = determineWinner(userOption, computerOption);

        this.$result.innerHTML = `
            <p>Tu elección: ${userOption}</p>
            <p>Bot: ${computerOption}</p>
            <h1>${result}</h1>
        `;

        if (result === 'Ganó el usuario') {
            this.userScore++;
            this.$userScore.textContent = this.userScore;
        } else if (result === 'Ganó el bot') {
            this.computerScore++;
            this.$computerScore.textContent = this.computerScore;
        }
        this.gamesPlayed++;
        this.$gamesPlayed.textContent = this.gamesPlayed;
    }

    resetGame = () => {
        this.userScore = 0;
        this.computerScore = 0;
        this.$userScore.textContent = this.userScore;
        this.$computerScore.textContent = this.computerScore;
        this.$result.innerHTML = '';
        this.$options.value = 'piedra';
        this.gamesPlayed = 0;
        this.$gamesPlayed.textContent = this.gamesPlayed;
    }
}

customElements.define('piedra-app', RockPaperScissorsApp);