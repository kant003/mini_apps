import { generarNumeroAleatorio } from './helpers.js';

class JuegoAdivinarNumeros extends HTMLElement {
    constructor() {
        super();
        // Crear Shadow DOM y adjuntarlo
        this.attachShadow({ mode: 'open' }); 
        this.numeroSecreto = 0;
        this.intentos = 0;
        this.min = 1;
        this.max = 100;

        // Cargar los estilos en el Shadow DOM
        this.loadStyles();
        // Renderizar la vista
        this.render();
        // Inicializar el juego
        this.iniciarJuego();
    }

  
    loadStyles() {
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        // Asumiendo que styles.css está en la misma carpeta que main.js/view.html
        linkElem.setAttribute('href', 'styles.css');
        this.shadowRoot.appendChild(linkElem);
    }

    
    render() {
        this.shadowRoot.innerHTML += `
            <div class="juego-adivinar-numeros">
                <h1>Adivina el Número</h1>
                <p id="bienvenida"></p>
                <p>Introduce un número entre ${this.min} y ${this.max}:</p>
                
                <div class="controles">
                    <input type="number" id="intentoInput" min="${this.min}" max="${this.max}" required>
                    <button id="adivinarBtn">Adivinar</button>
                </div>

                <p id="intentosContador">Intentos: 0</p>
                <div id="resultado"></div>
            </div>

         <button id="reiniciarBtn" style="display:none; margin-top: 15px; background-color:#007bff;">
                    Volver a jugar
                </button>
            </div>


        `;

        
        this.intentoInput = this.shadowRoot.getElementById('intentoInput');
        this.adivinarBtn = this.shadowRoot.getElementById('adivinarBtn');
        this.resultadoDiv = this.shadowRoot.getElementById('resultado');
        this.bienvenidaP = this.shadowRoot.getElementById('bienvenida');
        this.intentosContadorP = this.shadowRoot.getElementById('intentosContador');

        
        this.adivinarBtn.addEventListener('click', () => this.manejarIntento());
        
        this.intentoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.manejarIntento();
            }
        });
    }

    
    iniciarJuego() {
        
        this.numeroSecreto = generarNumeroAleatorio(this.min, this.max);
        this.intentos = 0;

       
        this.bienvenidaP.textContent = `¡Bienvenido al juego! Tienes que adivinar el número.`;
        this.actualizarContadorIntentos();
        this.limpiarResultado();

       
        this.intentoInput.value = '';
        this.intentoInput.disabled = false;
        this.adivinarBtn.disabled = false;

        
    }

    
    actualizarContadorIntentos() {
        this.intentosContadorP.textContent = `Intentos: ${this.intentos}`;
    }

    
    limpiarResultado() {
        this.resultadoDiv.textContent = '';
        this.resultadoDiv.className = '';
    }

    
    mostrarResultado(mensaje, clase) {
        this.resultadoDiv.textContent = mensaje;
        this.resultadoDiv.className = clase;
    }

    
    manejarIntento() {
        const intento = parseInt(this.intentoInput.value.trim());
        this.intentoInput.value = ''; // Limpiar el input

       
        if (isNaN(intento) || intento < this.min || intento > this.max) {
            this.mostrarResultado(`Por favor, introduce un número válido entre ${this.min} y ${this.max}.`, 'mensaje-bajo');
            return;
        }

        this.intentos++;
        this.actualizarContadorIntentos();

        
        if (intento === this.numeroSecreto) {
           
            this.mostrarResultado(`¡Felicidades! Adivinaste el número ${this.numeroSecreto} en ${this.intentos} intentos. ¡Juego terminado!`, 'mensaje-exito');
            this.finalizarJuego(); 
        } else if (intento > this.numeroSecreto) {
           
            this.mostrarResultado('Demasiado alto. ¡Inténtalo de nuevo!', 'mensaje-alto');
        } else { 
            this.mostrarResultado('Demasiado bajo. ¡Inténtalo de nuevo!', 'mensaje-bajo');
        }
    } 

    
    finalizarJuego() {
        this.intentoInput.disabled = true;
        this.adivinarBtn.disabled = true;
    }
}


customElements.define('adivinar-app', JuegoAdivinarNumeros);
