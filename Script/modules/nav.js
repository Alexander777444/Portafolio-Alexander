export function initNav() {
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('navBurger');
  const navLinks = document.querySelector('.nav-links');

  if (!navbar || !burger || !navLinks) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const resetBurger = () => {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
    const lineas = burger.querySelectorAll('span');
    lineas.forEach(l => {
      l.style.transform = '';
      l.style.opacity = '';
    });
  };

  burger.addEventListener('click', () => {
    const estaAbierto = navLinks.classList.toggle('abierto');
    burger.setAttribute('aria-expanded', String(estaAbierto));
    burger.setAttribute('aria-label', estaAbierto ? 'Cerrar menú' : 'Abrir menú');

    const lineas = burger.querySelectorAll('span');
    if (estaAbierto) {
      lineas[0].style.transform = 'translateY(7px) rotate(45deg)';
      lineas[1].style.opacity = '0';
      lineas[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      resetBurger();
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('abierto');
      resetBurger();
    });
  });

  const secciones = document.querySelectorAll('section[id], header[id]');
  const linksNavega = document.querySelectorAll('.nav-links a[href^="#"]');

  const observadorSecciones = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        linksNavega.forEach(a => a.classList.remove('activo'));
        const activo = document.querySelector(`.nav-links a[href="#${entrada.target.id}"]`);
        if (activo) activo.classList.add('activo');
      }
    });
  }, { rootMargin: `-${navbar.offsetHeight}px 0px -40% 0px` });

  secciones.forEach(s => observadorSecciones.observe(s));
}
