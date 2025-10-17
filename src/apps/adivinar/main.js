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

    /**
     * Carga los estilos de styles.css dentro del Shadow DOM.
     */
    loadStyles() {
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        // Asumiendo que styles.css está en la misma carpeta que main.js/view.html
        linkElem.setAttribute('href', 'styles.css');
        this.shadowRoot.appendChild(linkElem);
    }

    /**
     * Renderiza la estructura HTML del componente dentro del Shadow DOM.
     */
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

        // Obtener referencias de elementos dentro del Shadow DOM
        this.intentoInput = this.shadowRoot.getElementById('intentoInput');
        this.adivinarBtn = this.shadowRoot.getElementById('adivinarBtn');
        this.resultadoDiv = this.shadowRoot.getElementById('resultado');
        this.bienvenidaP = this.shadowRoot.getElementById('bienvenida');
        this.intentosContadorP = this.shadowRoot.getElementById('intentosContador');

        // Asignar eventos
        this.adivinarBtn.addEventListener('click', () => this.manejarIntento());
        // Permitir adivinar al presionar Enter en el input
        this.intentoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.manejarIntento();
            }
        });
    }

    /**
     * Inicializa o reinicia el juego.
     * Muestra el mensaje de bienvenida y genera el número secreto.
     */
    iniciarJuego() {
        // Generar un número aleatorio entre 1 y 100
        this.numeroSecreto = generarNumeroAleatorio(this.min, this.max);
        this.intentos = 0;

        // Mostrar mensaje de bienvenida (Criterio de Aceptación 1)
        this.bienvenidaP.textContent = `¡Bienvenido al juego! Tienes que adivinar el número.`;
        this.actualizarContadorIntentos();
        this.limpiarResultado();

        // Asegurar que los controles estén habilitados
        this.intentoInput.value = '';
        this.intentoInput.disabled = false;
        this.adivinarBtn.disabled = false;

        // console.log(`Número secreto (SOLO DEV): ${this.numeroSecreto}`); // Para pruebas
    }

    /**
     * Actualiza el contador de intentos en la interfaz.
     */
    actualizarContadorIntentos() {
        this.intentosContadorP.textContent = `Intentos: ${this.intentos}`;
    }

    /**
     * Limpia y oculta el mensaje de resultado.
     */
    limpiarResultado() {
        this.resultadoDiv.textContent = '';
        this.resultadoDiv.className = '';
    }

    
    mostrarResultado(mensaje, clase) {
        this.resultadoDiv.textContent = mensaje;
        this.resultadoDiv.className = clase;
    }

    /**
     * Maneja la lógica de la validación del intento del usuario.
     */
    manejarIntento() {
        const intento = parseInt(this.intentoInput.value.trim());
        this.intentoInput.value = ''; // Limpiar el input

        // 1. Validar que la entrada sea un número válido
        if (isNaN(intento) || intento < this.min || intento > this.max) {
            this.mostrarResultado(`Por favor, introduce un número válido entre ${this.min} y ${this.max}.`, 'mensaje-bajo');
            return;
        }

        this.intentos++;
        this.actualizarContadorIntentos();

        // 2. Comprobar si ha adivinado el número
        if (intento === this.numeroSecreto) {
            // Criterio de Aceptación 4: Acertar
            this.mostrarResultado(`¡Felicidades! Adivinaste el número ${this.numeroSecreto} en ${this.intentos} intentos. ¡Juego terminado!`, 'mensaje-exito');
            this.finalizarJuego(); // Tarea Técnica: Finalizar el juego
        } else if (intento > this.numeroSecreto) {
            // Criterio de Aceptación 2: Intento mayor
            this.mostrarResultado('Demasiado alto. ¡Inténtalo de nuevo!', 'mensaje-alto');
        } else { // intento < this.numeroSecreto
            // Criterio de Aceptación 3: Intento menor
            this.mostrarResultado('Demasiado bajo. ¡Inténtalo de nuevo!', 'mensaje-bajo');
        }
    }

    /**
     * Deshabilita los controles de entrada para terminar el juego.
     */
    finalizarJuego() {
        this.intentoInput.disabled = true;
        this.adivinarBtn.disabled = true;
    }
}


customElements.define('adivinar-app', JuegoAdivinarNumeros);
