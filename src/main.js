import './style.css';

const menu = document.getElementById('menu');
const appContainer = document.getElementById('app');

const apps = [
  { id: 'saludar', name: 'Mi saludo' },
  { id: 'confeti', name: 'Efecto Confeti' },
  { id: 'r_color', name: 'Generador de Colores Aleatorios' },
  //{ id: 'clock',  name: 'Reloj' },
];

const loaders = {
  saludar: () => import('./apps/saludar/main.js'),
  confeti: () => import('./apps/Confeti/Main.js'),
  r_color: () => import('./apps/r_color/main.js'),
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

apps.forEach(app => {
  const btn = document.createElement('button');
  btn.textContent = app.name;
  btn.addEventListener('click', () => loadApp(app.id));
  menu.appendChild(btn);
});
