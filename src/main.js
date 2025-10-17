import './style.css';

const menu = document.getElementById('menu');
const appContainer = document.getElementById('app');

const apps = [
  { id: 'saludar', name: 'Mi saludo' },
  { id: 'dados', name: 'Lanzador de Dados' },
  { id: 'contador', name: 'Contador de Clicks' },
  { id: 'confeti', name: 'Efecto Confeti' },
  { id: 'clock', name: 'Reloj' },
  { id: 'audio_player', name: 'music' },
  { id: 'piedra', name: 'Piedra, papel o tijera' },
  { id: 'conversor-divisas', name: 'Conversor de Divisas' },
  { id: 'lanzar-moneda', name: 'Lanzador de moneda' }
  //{ id: 'clock',  name: 'Reloj' },


];

const loaders = {
  saludar: () => import('./apps/saludar/main.js'),
  dados: () => import('./apps/dados/dice_main.js'),
  contador: () => import('./apps/contadorClicks/main.js'),
  confeti: () => import('./apps/Confeti/Main.js'),
  clock: () => import('./apps/horaActual/main.js'),
  audio_player: () => import('./apps/audio_player/main.js'),
  piedra: () => import('./apps/piedra/main.js'),
  'conversor-divisas': () => import('./apps/conversorDivisas/main.js'),
  'lanzar-moneda': () => import('./apps/lanzarMoneda/main.js'),
  //clock:  () => import('./apps/clock/main.js'),
};

async function loadApp(id) {
  const loader = loaders[id];
  if (!loader) {
    appContainer.innerHTML = `<p>No se encontró la app <strong>${id}</strong></p>`;
    return;
  }
  await loader();
  appContainer.innerHTML = '';
  appContainer.appendChild(document.createElement(`${id}-app`));
}

apps.forEach((app) => {
  const btn = document.createElement('button');
  btn.textContent = app.name;
  btn.addEventListener('click', () => loadApp(app.id));
  menu.appendChild(btn);
});
