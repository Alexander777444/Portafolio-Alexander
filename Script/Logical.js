/* ═══════════════════════════════════════════════════
   script.js  –  Portafolio Alexander Bolaños
   JavaScript vanilla: navegación, scroll reveal,
   menú burger, año actual y fallback del avatar.
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {


  /* ────────────────────────────────────────────────
     AÑO ACTUAL EN EL FOOTER
     Inserta el año dinámicamente para no tener que
     actualizarlo manualmente cada año.
  ──────────────────────────────────────────────── */
  const elementoAnio = document.getElementById('year');
  if (elementoAnio) elementoAnio.textContent = new Date().getFullYear();


  /* ────────────────────────────────────────────────
     NAVBAR: sombra al hacer scroll
     Agrega la clase .scrolled cuando el usuario
     baja más de 20px, lo que activa el CSS que
     hace el fondo más opaco.
  ──────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });


  /* ────────────────────────────────────────────────
     MENÚ BURGER (MÓVIL)
     Alterna la clase .abierto en la lista de links
     y anima las 3 líneas del botón convirtiéndolas
     en una X cuando el menú está abierto.
  ──────────────────────────────────────────────── */
  const burger   = document.getElementById('navBurger');
  const navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', () => {
    const estaAbierto = navLinks.classList.toggle('abierto');
    burger.setAttribute('aria-expanded', estaAbierto);

    const lineas = burger.querySelectorAll('span');
    if (estaAbierto) {
      lineas[0].style.transform = 'translateY(7px) rotate(45deg)';
      lineas[1].style.opacity   = '0';
      lineas[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      lineas[0].style.transform = '';
      lineas[1].style.opacity   = '';
      lineas[2].style.transform = '';
    }
  });

  // Cerrar el menú al tocar cualquier link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('abierto');
      const lineas = burger.querySelectorAll('span');
      lineas[0].style.transform = '';
      lineas[1].style.opacity   = '';
      lineas[2].style.transform = '';
    });
  });


  /* ────────────────────────────────────────────────
     LINK ACTIVO EN NAVBAR según sección visible
     Usa IntersectionObserver para detectar qué
     sección está en pantalla y marcar su link
     con la clase .activo.
  ──────────────────────────────────────────────── */
  const secciones   = document.querySelectorAll('section[id], header[id]');
  const linksNavega = document.querySelectorAll('.nav-links a[href^="#"]');

  const opcionesObservador = {
    rootMargin: `-${navbar.offsetHeight}px 0px -40% 0px`
  };

  const observadorSecciones = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        linksNavega.forEach(a => a.classList.remove('activo'));
        const activo = document.querySelector(`.nav-links a[href="#${entrada.target.id}"]`);
        if (activo) activo.classList.add('activo');
      }
    });
  }, opcionesObservador);

  secciones.forEach(s => observadorSecciones.observe(s));


  /* ────────────────────────────────────────────────
     SCROLL REVEAL
     Marca los elementos con .revelar al inicio.
     IntersectionObserver agrega .visible cuando
     el elemento entra al viewport, disparando la
     transición CSS que lo hace aparecer desde abajo.
  ──────────────────────────────────────────────── */
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
      // Retraso escalonado: cada elemento aparece un poco después del anterior
      el.style.transitionDelay = `${i * 60}ms`;
    });
  });

  const observadorReveal = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observadorReveal.unobserve(entrada.target); // solo se anima una vez
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.revelar').forEach(el => observadorReveal.observe(el));


  /* ────────────────────────────────────────────────
     AVATAR: fallback a iniciales si no hay foto
     Si el src está vacío o la imagen da error,
     el placeholder con "AB" se mantiene visible.
  ──────────────────────────────────────────────── */
  const imgAvatar    = document.getElementById('avatarImg');
  const placeholder  = document.getElementById('avatarPlaceholder');

  if (imgAvatar) {
    imgAvatar.addEventListener('load', () => {
      if (imgAvatar.naturalWidth > 0) {
        if (placeholder) placeholder.style.display = 'none';
      }
    });
    imgAvatar.addEventListener('error', () => {
      imgAvatar.style.display = 'none';
      if (placeholder) placeholder.style.display = 'flex';
    });
    if (!imgAvatar.src || imgAvatar.src === window.location.href) {
      imgAvatar.style.display = 'none';
    }
  }


  /* ────────────────────────────────────────────────
     BOTÓN DE CV
     Cuando tengas tu PDF listo, descomenta la línea
     de window.open y pon la ruta correcta en cvRuta.
  ──────────────────────────────────────────────── */
  const btnCV = document.getElementById('cvBtn');
  if (btnCV) {
    btnCV.addEventListener('click', (e) => {
      const cvRuta = 'cv.pdf'; // ← cambia esto por tu ruta real
      e.preventDefault();
      // Descomenta cuando tengas el PDF:
      // window.open(cvRuta, '_blank', 'noopener');
      console.info('CV: agrega tu PDF en', cvRuta, 'y descomenta window.open');
    });
  }


});