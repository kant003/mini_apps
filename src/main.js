import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'



console.log('🚀 Proyecto Mini-Apps listo.');

// Ejemplo: inyectar menú de apps
const menu = document.getElementById('menu');
const appContainer = document.getElementById('app');

// Lista inicial de apps (se irá ampliando)
const apps = [
  { id: 'clock', name: 'Reloj' },
  { id: 'stopwatch', name: 'Cronómetro' },
  // ...
];

apps.forEach((app) => {
  const btn = document.createElement('button');
  btn.textContent = app.name;
  btn.addEventListener('click', () => {
    appContainer.innerHTML = `<h2>${app.name}</h2><p>Aquí irá la app ${app.id}</p>`;
  });
  menu.appendChild(btn);
});

