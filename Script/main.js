import { renderContent } from './modules/render.js';
import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initAvatar } from './modules/avatar.js';

document.addEventListener('DOMContentLoaded', () => {
  const elementoAnio = document.getElementById('year');
  if (elementoAnio) elementoAnio.textContent = new Date().getFullYear();

  renderContent();
  initNav();
  initReveal();
  initAvatar();
});
