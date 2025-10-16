import './style.css';

const menu = document.getElementById('menu');
const appContainer = document.getElementById('app');

const apps = [
  { id: 'saludar', name: 'Mi saludo' },
  { id: 'unidades', name: 'Calculadora de Unidades'}
  //{ id: 'clock',  name: 'Reloj' },
];

const loaders = {
  saludar: () => import('./apps/saludar/main.js'),
  unidades: () => import('./apps/calcularUnidades/main.js')
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
