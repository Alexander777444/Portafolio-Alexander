# Contexto del Proyecto: Portafolio Personal Alexander Bolaños

Este documento sirve como la "fuente de la verdad" del estado actual del proyecto. Contiene la descripción del proyecto, stack tecnológico, estructura del código, reglas de diseño y áreas de mejora identificadas, con el fin de que otros agentes de IA (como Stich) puedan guiar el refactor, mejoras visuales y despliegue a producción.

---

## 1. Descripción del Proyecto y Estado Actual

- **¿Qué es el proyecto?**
  Es el sitio web del portafolio personal de **Enrique Alexander Bolaños Gutiérrez**, Estudiante de Ciencias Computacionales y Frontend Developer residente en Guadalajara, México. El sitio muestra su biografía corta, tecnologías dominadas, proyectos realizados, formación académica y logros o certificados extra.
- **Fase de desarrollo:**
  Actualmente se encuentra en la fase **"en desarrollo"**. Está estructurado como una aplicación web estática modular con vanilla HTML, CSS y JavaScript (utilizando ES Modules). Cuenta con desacoplamiento de datos y lógica listo para facilitar una migración hacia **React + Vite**.
- **Metas inmediatas del Roadmap:**
  - [x] Unificación de colores oscuros y acentos en rojo (`#cc0000` / `#900000`).
  - [x] Inclusión de iconos SVG personalizados cargados eficientemente mediante CSS.
  - [x] Descarga de currículum en PDF integrada.
  - [x] Diseño responsivo completo y animaciones de scroll (Scroll Reveal).
  - [ ] Rellenar y refinar la información real de proyectos, educación y certificados.
  - [ ] Migración a React + Vite (y opcionalmente Tailwind CSS).
  - [ ] Despliegue en producción (Vercel / GitHub Pages / Netlify).

---

## 2. Stack Tecnológico y Dependencias

- **Tecnologías principales:**
  - **HTML5:** Marcación semántica (uso de `<nav>`, `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - **CSS3 Vanilla:** Uso extensivo de variables personalizadas (`:root`), flexbox, CSS grid, CSS transitions y máscaras CSS (`mask-image` y `backdrop-filter`).
  - **JavaScript Vanilla (ES Modules):** Uso de sintaxis moderna (`import`/`export`, `IntersectionObserver`, delegación de eventos y plantillas literales).
- **Librerías / APIs externas en uso:**
  - **Google Fonts:** Fuentes `Space Mono` (para elementos técnicos, botones y títulos) y `DM Sans` (para el cuerpo de texto).
  - **Iconos (Font Awesome):** No se enlaza la librería completa. En su lugar, se exportaron los iconos como archivos SVG individuales y se consumen en CSS como máscaras de fondo (`mask-image` con `currentColor`), lo que optimiza la carga del sitio.
- **Dependencias del Proyecto (`package.json`):**
  - **No existe `package.json`** en el proyecto en su estado actual. Al tratarse de un sitio web estático puro, no hay dependencias de Node.js instaladas a nivel local. Para el desarrollo local se sugiere utilizar herramientas globales como `npx serve .` o la extensión de VS Code "Live Server".

---

## 3. Estructura de Directorios

El proyecto cuenta con la siguiente estructura física:

```text
PortafolioProyecto/
├── .git/                  # Control de versiones Git
├── Assets/                # Recursos estáticos de la interfaz
│   ├── icons/             # Iconos SVG de Font Awesome en formato individual
│   │   ├── github.svg
│   │   ├── linkedin.svg
│   │   ├── envelope.svg
│   │   ├── file-pdf.svg
│   │   ├── location-dot.svg
│   │   └── laptop-code.svg
│   ├── CV_VERSION1.2.pdf  # Archivo descargable del Curriculum Vitae
│   ├── avatarAlexander.jpg# Imagen de perfil del desarrollador
│   └── monitor-play.png   # Favicon de la página
├── docs/                  # Documentación adicional y capturas del portafolio
│   └── screenshots/       # Capturas para el README.md
├── Pages/                 # Carpeta contenedora de las vistas y estilos
│   ├── CSS/
│   │   └── styles.css     # Archivo CSS de estilos globales y utilidades
│   └── index.html         # Archivo HTML principal del sitio
├── Script/                # Lógica del frontend desacoplada
│   ├── data/              # Base de datos local simulada en arrays de JS
│   │   ├── education.js   # Trayectoria académica e hitos extra
│   │   ├── projects.js    # Proyectos personales a renderizar
│   │   └── skills.js      # Listado de habilidades con sus respectivos SVGs
│   ├── modules/           # Módulos JS reutilizables
│   │   ├── avatar.js      # Manejo del estado de carga e imagen alternativa del avatar
│   │   ├── nav.js         # Comportamiento del menú móvil e IntersectionObserver para links activos
│   │   ├── render.js      # Inyección dinámica de datos en el DOM
│   │   └── reveal.js      # Animaciones de aparición gradual de elementos al hacer scroll
│   ├── Logical.js         # Script obsoleto (Deprecated) que importa main.js por compatibilidad
│   └── main.js            # Punto de entrada de la aplicación (Orquestador de carga)
└── README.md              # Documentación de presentación técnica
```

### Responsabilidades clave de las carpetas:
- **`Assets/`**: Contiene exclusivamente recursos binarios o SVGs inalterables.
- **`Pages/`**: Funciona como la carpeta de distribución del sitio frontend actual (las vistas finales).
- **`Script/`**: Aísla por completo el comportamiento del sitio. La subcarpeta `data/` separa el contenido (el *qué* se muestra) de los componentes de lógica en `modules/` (el *cómo* se renderiza e interactúa).

---

## 4. Arquitectura de la Interfaz de Usuario (UI) y Diseño

### Componentes de UI principales (Estructura lógica)
1. **Navbar (`#navbar`):** Barra de navegación fija superior. Implementa un cambio de apariencia a fondo opaco al hacer scroll down (`.scrolled`) e indicadores dinámicos en los links activos mediante `IntersectionObserver`. Dispone de un menú de tipo hamburguesa (`.nav-burger`) para pantallas móviles.
2. **Hero Section (`#inicio`):** Encabezado con impacto visual. Muestra títulos grandes, localización, enlaces directos de contacto/redes y la foto de perfil enmarcada en un círculo con efecto de resplandor (*glow*) rojo. Cuenta con un indicador animado de scroll.
3. **Sobre mí Section (`#sobre-mi`):** Contenedor sencillo con texto descriptivo del perfil profesional del autor.
4. **Tecnologías Grid (`#tecnologias`):** Contenedor flexible de tarjetas tipo "chips" que representan cada habilidad técnica, mostrando el logo SVG y el nombre con transiciones interactivas.
5. **Proyectos Grid (`#proyectos`):** Cuadrícula responsiva que presenta las tarjetas de proyectos (`.project-card`). Cada tarjeta incluye una imagen o un marcador de texto de respaldo si no hay imagen, título, etiquetas tecnológicas (`.etiqueta`) y dos botones de acción (Demo y Código).
6. **Formación (`#formacion`):** Línea de tiempo que despliega los estudios del autor de manera ordenada, mostrando institución, periodo y grado escolar.
7. **Extra Section (`#extra`):** Espacio de tarjetas secundarias dedicado a certificaciones u otros logros del autor.
8. **Footer (`.pie`):** Pie de página con el nombre del autor, enlaces rápidos a contacto y año dinámico en JS.

### Tokens de Diseño y Estilos Predominantes
Los estilos globales están definidos en variables CSS dentro de [styles.css](file:///c:/Users/pichi/Documents/Programacion2/Web/PortafolioProyecto/Pages/CSS/styles.css):

- **Paleta de Colores (Estilo Dark / Red Accent):**
  - Fondo base: `#080808` (Negro profundo) y `#0f0f0f` para secciones alternas.
  - Superficie / Cards: `#151515` (Gris muy oscuro).
  - Bordes: `#1e1e1e` (Gris oscuro para contornos limpios).
  - Color de Acento: `#cc0000` (Rojo vivo) y `#900000` (Rojo oscuro de transición).
  - Efecto Glow: `#2b0000` (Rojo muy oscuro de fondo para sombras de luz y glows).
- **Tipografías:**
  - Títulos y botones: `'Space Mono', monospace`. Aporta un aspecto tecnológico e ingenieril.
  - Texto base / Párrafos: `'DM Sans', sans-serif`. Aporta legibilidad limpia y moderna.
- **Transiciones y Redondeo:**
  - Bordes redondeados: `10px` para botones y tarjetas.
  - Duración global de animaciones: `0.25s ease`.
- **Efectos dinámicos / Micro-animaciones:**
  - Brillos y elevaciones sutiles (`translateY(-4px)`) al posar el cursor sobre tarjetas y botones.
  - Efectos de carga gradual (*Scroll Reveal*) a través de clases `.revelar` y `.visible` controladas desde JS.
  - Indicador de scroll pulsante e interactividad táctil optimizada en móviles.

---

## 5. Lógica de Datos y Estado

### Flujo de Datos
El flujo de datos está desacoplado del maquetado HTML utilizando JavaScript modular:
1. **Origen de Datos:** Los datos se encuentran estructurados como arreglos JSON nativos en archivos javascript individuales (`Script/data/*.js`).
2. **Importación:** El módulo [render.js](file:///c:/Users/pichi/Documents/Programacion2/Web/PortafolioProyecto/Script/modules/render.js) importa los datos de proyectos, formación, habilidades y extras.
3. **Pintado en Pantalla:** Mediante funciones como `renderProjects()`, `renderSkills()`, etc., se recorren los arreglos utilizando `.map()` y se generan fragmentos HTML que reemplazan el contenido de los nodos vacíos (`#projectsGrid`, `#techGrid`, etc.) vía `.innerHTML`.
4. **Inicio:** [main.js](file:///c:/Users/pichi/Documents/Programacion2/Web/PortafolioProyecto/Script/main.js) ejecuta `renderContent()` al dispararse el evento `DOMContentLoaded`.

### Estado de la Aplicación
Al ser un proyecto del lado del cliente sin almacenamiento persistente ni backend directo, el manejo de estados es **local y efímero**:
- **Menu Hamburguesa Abierto (Mobile):** Almacenado de forma implícita en la lista de clases (`.abierto`) del contenedor `.nav-links`. Controlado en [nav.js](file:///c:/Users/pichi/Documents/Programacion2/Web/PortafolioProyecto/Script/modules/nav.js).
- **Navegación Activa:** La sección visible del viewport activa el enlace correspondiente en el navbar calculando la colisión del scroll a través de la API `IntersectionObserver`.
- **Carga de Avatar/Imágenes:** El script [avatar.js](file:///c:/Users/pichi/Documents/Programacion2/Web/PortafolioProyecto/Script/modules/avatar.js) valida dinámicamente si la imagen del avatar cargó correctamente. Si se produce un error de carga o el atributo `src` está vacío, activa el placeholder con las iniciales `AB`.
- **Scroll del Sitio:** La barra de navegación detecta el scroll vertical (`window.scrollY > 20`) para alternar la clase `.scrolled` y oscurecer el fondo.

---

## 6. Áreas de Mejora y Deuda Técnica (Análisis Crítico)

Tras revisar a detalle la arquitectura actual del portafolio, se identifican las siguientes áreas de mejora indispensables para optimizar la mantenibilidad del código, el despliegue y la experiencia de usuario:

### A. Estructura de Carpetas y Configuración para Despliegues (Vercel)
- **Problema de Enrutamiento:** El archivo principal `index.html` se localiza en la carpeta `Pages/` en lugar de la raíz. La mayoría de los servidores y plataformas como Vercel o Netlify esperan encontrar el archivo `index.html` en la raíz del repositorio. 
- **Acción sugerida:** Mover `index.html` a la raíz del repositorio y ajustar todas las rutas de enlaces internos e importación de scripts y assets (o configurar el ruteo del hosting a través de un archivo `vercel.json`).

### B. Ausencia de Entorno de Paquetes (`package.json`)
- **Problema:** No existe configuración de Node.js ni bundlers (como Vite). Al estar escrito en Vanilla JS puro, no cuenta con un sistema de minificación de archivos JS/CSS ni optimización de assets para producción.
- **Acción sugerida:** Inicializar el proyecto con `npm init` (o migrar directamente a React + Vite como indica la hoja de ruta) para incorporar herramientas de desarrollo y optimizar el empaquetado para Vercel.

### C. Datos en Duro / Placeholders
- **Problema:** En `Script/data/education.js` y `Script/data/projects.js` persisten textos de prueba como *"Nombre de la Institución"*, *"Breve descripción del proyecto"* y rutas vacías para las imágenes de demostración (`imageUrl: ''`).
- **Acción sugerida:** Rellenar la base de datos local con la información real de Alexander Bolaños e incorporar capturas de pantalla optimizadas en formato `.webp` o `.png`.

### D. Uso Excesivo de `innerHTML` en la Renderización
- **Problema:** El módulo `render.js` utiliza interpolación directa de strings HTML e inyecciones a través de `innerHTML` para estructurar la UI. Si bien es adecuado para un sitio pequeño, puede dar lugar a vulnerabilidades XSS (si los datos fuesen de entrada de usuario) y disminuye el rendimiento al forzar repintados completos del DOM.
- **Acción sugerida:** Es el momento ideal para realizar la migración a React, donde la sintaxis JSX resuelve de forma nativa e higiénica esta lógica.

### E. Archivo CSS Extenso y Clases Ad-hoc
- **Problema:** El archivo `styles.css` contiene cerca de 877 líneas de código CSS. Esto dificulta la localización de estilos específicos y su mantenibilidad a largo plazo.
- **Acción sugerida:** Migrar las reglas de diseño hacia componentes de CSS modular o adoptar **Tailwind CSS** para agilizar los cambios visuales, reutilizar componentes y unificar espaciados de manera ágil.

### F. Código Huérfano y Deprecado
- **Problema:** El archivo `Script/Logical.js` está deprecado y solo sirve de puente de importación.
- **Acción sugerida:** Remover `Logical.js` para limpiar el codebase de código obsoleto.
