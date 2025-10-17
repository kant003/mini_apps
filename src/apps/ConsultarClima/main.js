import html from './index.html?raw';
import css from './style.css?raw';

class ConsultarClimaApp extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `<style>${css}</style>${html}`;
    }

    connectedCallback() {
        const resultado = this.shadow.getElementById("resultado");
        const buscar = this.shadow.getElementById("buscar");
        const modal = this.shadow.getElementById("modal");
        const cerrarModal = this.shadow.getElementById("cerrarModal");
        const mensajeModal = this.shadow.getElementById("mensajeModal");

        const mostrarMensaje = (mensaje, tipo) => {
            resultado.innerHTML = mensaje;
            resultado.className = tipo;
        };

        const mostrarModal = (mensaje) => {
            mensajeModal.textContent = mensaje;
            modal.style.display = "flex";
        };

        buscar.addEventListener("click", async () => {
            const ciudad = this.shadow.getElementById("ciudad").value.trim();
            resultado.className = "";

            if (ciudad === "") {
                mostrarModal("Por favor, introduce una ciudad.");
                return;
            }

            mostrarMensaje("Cargando datos del clima...");

            try {
                const response = await fetch(`https://wttr.in/${ciudad}?format=j1`);

                // if (!response.ok) throw new Error("No se pudo conectar con el servidor.");

                const data = await response.json();

                if ((data.request[0].type === "City" && data.request[0].query.includes("New Found Out"))
                ) {
                    mostrarModal("Ciudad no encontrada. Verifica el nombre e inténtalo de nuevo.");
                    return;
                }

                const clima = data.current_condition[0];
                const temp = clima.temp_C;
                const estado = clima.lang_es[0].value;
                const viento = clima.windspeedKmph;

                mostrarMensaje(`
          🌍 Ciudad: <b>${ciudad}</b><br>
          🌡️ Temperatura: <b>${temp} °C</b><br>
          ☁️ Estado: <b>${estado}</b><br>
          💨 Viento: <b>${viento} km/h</b>
        `, "success");

            } catch (error) {
                if (error.message.includes("servidor")) {
                    mostrarModal("Error al conectar con el servidor. Intenta más tarde.");
                } else if (error.message.includes("datos")) {
                    mostrarModal("Ciudad no encontrada. Verifica el nombre e inténtalo de nuevo.");
                } else {
                    mostrarModal("Ocurrió un error inesperado. Inténtalo nuevamente.");
                }
            }
        });

        cerrarModal.addEventListener("click", () => (modal.style.display = "none"));
        window.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });
    }
}

customElements.define('consultarclima-app', ConsultarClimaApp);
