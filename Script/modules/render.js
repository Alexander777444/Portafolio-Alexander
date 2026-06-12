import { skills } from '../data/skills.js';
import { projects } from '../data/projects.js';
import { education, extras } from '../data/education.js';

function renderSkills() {
  const grid = document.getElementById('techGrid');
  if (!grid) return;

  grid.innerHTML = skills.map(skill => `
    <div class="tech-chip" data-tech="${skill.id}">
      ${skill.svg}
      <span class="tech-nombre">${skill.name}</span>
    </div>
  `).join('');
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  grid.innerHTML = projects.map(project => `
    <article class="project-card">
      <div class="project-img-wrap">
        <img src="${project.imageUrl}" alt="${project.imageAlt}" class="project-img" />
        <div class="project-img-placeholder">${project.placeholder}</div>
      </div>
      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-sub">${project.subtitle}</p>
        <p class="project-desc">${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="etiqueta">${tag}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${project.demoUrl}" class="btn btn-sm">Demo</a>
          <a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-contorno">Código</a>
        </div>
      </div>
    </article>
  `).join('');
}

function renderEducation() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  timeline.innerHTML = education.map(item => `
    <article class="tiempo-item">
      <div class="tiempo-punto"></div>
      <div class="tiempo-contenido">
        <div class="tiempo-cabecera">
          <div>
            <h3 class="tiempo-titulo">${item.institution}</h3>
            <p class="tiempo-sub">${item.degree}</p>
            ${item.description ? `<p class="tiempo-desc">${item.description}</p>` : ''}
          </div>
          <span class="tiempo-badge">${item.period}</span>
        </div>
      </div>
    </article>
  `).join('');
}

function renderExtras() {
  const grid = document.getElementById('extraGrid');
  if (!grid) return;

  grid.innerHTML = extras.map(item => `
    <article class="extra-card">
      <div class="extra-img-wrap">
        <img src="${item.imageUrl}" alt="${item.imageAlt}" class="extra-img" />
        <div class="extra-img-placeholder">${item.placeholder}</div>
      </div>
      <div class="extra-cuerpo">
        <h3 class="extra-titulo">${item.title}</h3>
        <p class="extra-desc">${item.description}</p>
      </div>
    </article>
  `).join('');
}

export function renderContent() {
  renderSkills();
  renderProjects();
  renderEducation();
  renderExtras();
}
