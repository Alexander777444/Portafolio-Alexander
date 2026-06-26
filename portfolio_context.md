# Contexto del proyecto: Portafolio personal de Alexander Bolaños

Este documento refleja el estado real del proyecto tal como está hoy en el repositorio. Sirve como referencia rápida para entender la arquitectura, el contenido mostrado en la web y las tareas pendientes.

---

## 1. Resumen del proyecto

- El proyecto es un portafolio personal estático para **Enrique Alexander Bolaños Gutiérrez**.
- La web muestra una presentación profesional, tecnologías, proyectos, formación académica y una sección extra con logros/certificados.
- El diseño actual está enfocado en un estilo oscuro con acento rojo y animaciones suaves al hacer scroll.
- El proyecto sigue una arquitectura de frontend vanilla con módulos ES para facilitar mantenimiento y futura migración.

### Estado actual
- **Fase:** en desarrollo / versión funcional base.
- **Estructura:** HTML estático + CSS + JavaScript modular.
- **Contenido:** parcialmente completo; todavía hay datos de ejemplo en algunas secciones.
- **Despliegue:** no está configurado aún para producción en la raíz del repositorio.

---

## 2. Stack tecnológico y dependencias

### Tecnologías usadas
- **HTML5** para la estructura semántica del sitio.
- **CSS3** con variables, grid, flexbox y animaciones.
- **JavaScript vanilla con ES Modules**.
- **Google Fonts** para `Space Mono` y `DM Sans`.
- **SVGs locales** para iconos y logotipos.

### Dependencias del proyecto
- No existe `package.json` en el repositorio actual.
- No hay bundler ni compilador configurado.
- Para probar el sitio localmente se recomienda usar un servidor estático como `npx serve .` o la extensión Live Server.

---

## 3. Estructura real del repositorio

```text
PortafolioProyecto/
├── Assets/
│   ├── icons/
│   └── avatarAlexander.jpg
├── Pages/
│   ├── CSS/
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── hero.css
│   │   ├── navigation.css
│   │   └── sections.css
│   └── index.html
├── Script/
│   ├── data/
│   │   ├── education.js
│   │   ├── projects.js
│   │   └── skills.js
│   ├── modules/
│   │   ├── avatar.js
│   │   ├── nav.js
│   │   ├── render.js
│   │   └── reveal.js
│   └── main.js
├── docs/
│   └── screenshots/
├── README.md
└── portfolio_context.md
```

### Qué contiene cada parte
- **Assets/**: recursos visuales del proyecto, incluyendo la imagen de avatar y la carpeta de iconos.
- **Pages/**: la vista principal del portafolio y los estilos organizados en varios archivos CSS por secciones.
- **Script/**: lógica del sitio, datos desacoplados y módulos JavaScript que manejan renderizado, navegación y animaciones.
- **docs/**: capturas de pantalla y recursos de documentación.

---

## 4. Estructura de la interfaz

La página principal está organizada en estas secciones:

1. **Navbar**
   - Barra fija con links a las secciones.
   - Cambia de estilo al hacer scroll.
   - Incluye menú hamburguesa para móviles.

2. **Hero / inicio**
   - Título principal, subtítulo, ubicación y botones de contacto.
   - Avatar con fallback en caso de que la imagen no cargue.
   - Indicador visual de scroll.

3. **Sobre mí**
   - Texto breve de presentación.

4. **Tecnologías**
   - Grid dinámico generado desde datos.

5. **Proyectos**
   - Tarjetas con imagen o placeholder, descripción, etiquetas y enlaces.

6. **Formación**
   - Línea de tiempo con instituciones y periodos.

7. **Extra**
   - Cards para certificados/logros.

8. **Footer**
   - Información de contacto y año actualizado automáticamente.

---

## 5. Lógica y flujo de datos

### Cómo se carga la página
- El archivo principal del sitio es [Pages/index.html](Pages/index.html).
- El script de entrada es [Script/main.js](Script/main.js).
- `DOMContentLoaded` dispara la inicialización de:
  - renderizado del contenido,
  - navegación,
  - animaciones de scroll,
  - validación del avatar.

### Cómo se renderiza la información
- Los datos viven en los archivos de la carpeta [Script/data](Script/data).
- [Script/modules/render.js](Script/modules/render.js) se encarga de inyectar contenido al DOM usando `.innerHTML`.
- Los datos que se usan actualmente son:
  - `skills` para la sección de tecnologías,
  - `projects` para los proyectos,
  - `education` y `extras` para formación y contenido extra.

### Estado visible en la interfaz
- El menú mobile se controla mediante clases CSS.
- El navbar detecta la sección activa usando `IntersectionObserver`.
- El avatar tiene un fallback visual si la imagen falla.
- El año del footer se actualiza dinámicamente.

---

## 6. Estado real de los datos

Desde la revisión del código actual, se observa que:
- La sección de proyectos contiene entradas con información parcial o ejemplo.
- La sección de formación todavía usa textos genéricos o placeholders.
- La sección extra también incluye contenido provisional.
- El sitio está listo para mostrar contenido real, pero aún necesita datos definitivos.

Esto significa que el proyecto funciona visualmente, pero el contenido no está completamente refinado.

---

## 7. Observaciones técnicas importantes

### Aspectos que ya están bien implementados
- Separación clara entre HTML, CSS y JS.
- Lógica modular y reutilizable.
- Animaciones base y comportamiento responsive.
- Integración de SVGs locales para iconos.

### Puntos que conviene mejorar
- Configurar un despliegue correcto (idealmente con el `index.html` en la raíz o una configuración de hosting específica).
- Añadir `package.json` si se quiere usar herramientas modernas de desarrollo.
- Sustituir datos placeholder por contenido real.
- Considerar migración a React/Vite en un futuro si el proyecto crece.

---

## 8. Conclusión

La versión actual del proyecto es una base sólida de portafolio web estático, con interfaz responsive, estilo coherente y lógica modular. La documentación principal debe seguir considerando que el contenido real aún está parcialmente pendiente de completar, mientras que la arquitectura ya está bien organizada para continuar evolucionando.
