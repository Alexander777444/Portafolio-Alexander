export function initReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const selectoresRevelar = [
    '.seccion-titulo',
    '.sobre-texto',
    '.tech-chip',
    '.tiempo-item',
    '.project-card',
    '.extra-card',
  ];

  selectoresRevelar.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('revelar');
      el.style.transitionDelay = `${i * 60}ms`;
    });
  });

  const observadorReveal = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observadorReveal.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.revelar').forEach(el => observadorReveal.observe(el));
}
