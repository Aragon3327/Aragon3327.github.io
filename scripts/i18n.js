/* Language switch (EN / ES).
   English is whatever is written in the HTML; Spanish lives in the ES table below.
   Any element with data-i18n="key" swaps its inner HTML; data-i18n-aria and data-i18n-alt swap those attributes.
   Strings that scripts.js writes itself (hero pitch, demo log, buttons) are handled there via the "mg-lang" event. */
(function () {
    var root = document.documentElement;

    var ES = {
        /* header + hero */
        'a.logo': 'Miguel Galicia, inicio de la página',
        'a.nav': 'Secciones',
        'a.lens': 'Elige qué destaca la página',
        'a.lang': 'Idioma',
        'a.portrait': 'Retrato de Miguel Galicia',
        'nav.auto': 'Automatización', 'nav.exp': 'Experiencia', 'nav.work': 'Proyectos', 'nav.stack': 'Herramientas', 'nav.contact': 'Contacto',
        'tune': 'Sintoniza', 'lens.all': 'Ambos', 'lens.data': 'Datos',
        'onair': 'Al aire',
        'degree': 'Ingeniería en Computación, Tecnológico de Monterrey',
        'cta.work': 'Ver proyectos', 'cta.contact': 'Contáctame',
        'now.b': 'Ahora', 'now.1': 'Entregando funcionalidades en Ford', 'now.2': 'Conduciendo segmentos al aire en Frecuencia 911',
        'flow.1': 'filas crudas', 'flow.2': 'transformar', 'flow.3': 'cargado', 'flow.hint': 'pasa el cursor sobre las filas para limpiarlas',
        'stat.1': 'días para completar un proceso logístico en Kärcher',
        'stat.2': 'filas procesadas en el pipeline ETL de Thales',
        'stat.3': 'usuarios de la aplicación empresarial de Ford',
        'stat.4': 'años de trabajo en software y datos',

        /* automation */
        'auto.label': '<b>Automatización</b> / Automation',
        'auto.h2': 'Tareas que <span class="hl">se ejecutan solas</span>',
        'auto.lede': 'En Kärcher, un proceso manual de producción y logística tomaba de 3 a 5 días. Python y Google Apps Script, con monitoreo en los pasos clave, lo redujeron a 1. Aquí está la idea en miniatura.',
        'auto.wf': 'Flujo',
        'st.1b': 'Disparador', 'st.1s': 'Un horario o un evento inicia la ejecución',
        'st.2s': 'Valida y transforma las filas',
        'st.3s': 'Actualiza la hoja compartida',
        'st.4b': 'Monitoreo', 'st.4s': 'Revisa los pasos clave',
        'st.5b': 'Listo', 'st.5s': 'El reporte está listo y nadie lo tocó',
        'q.title': 'Cola de tareas', 'q.count': '5 solicitudes',
        'q.1': 'Solicitud 1', 'q.2': 'Solicitud 2', 'q.3': 'Solicitud 3', 'q.4': 'Solicitud 4', 'q.5': 'Solicitud 5',
        'a.queue': 'Cinco solicitudes pasando de en cola a terminadas',
        'auto.run': 'Ejecutar de nuevo', 'auto.runs': 'Ejecuciones de la demo:',
        'auto.note': 'Flujo ilustrativo. Los pasos y tiempos en pantalla son una demostración, no el proceso real de Kärcher.',

        /* experience */
        'exp.label': '<b>Experiencia</b> / Experience',
        'exp.h2': 'Donde lo <span class="hl">entregué</span>',
        'j1.date': 'Oct 2025 — presente', 'j1.pill': 'Actual',
        'j1.h': 'Ingeniero de Software, Programa Champ',
        'j1.1': 'Desarrollo funcionalidades y corrijo errores en una aplicación empresarial <b>Spring Boot / Angular</b> usada por <b class="hl">más de 100 usuarios</b> dentro de un equipo ágil multifuncional, convirtiendo requerimientos de negocio en funcionalidad real.',
        'j1.2': 'Escribo DDL y consultas SQL para mantener la integridad de los datos y depurar problemas en toda la aplicación.',
        'j1.3': 'Entrego mediante pipelines de <b>GitHub Actions y Tekton CI/CD</b> en GCP con escaneo de seguridad de Cycode y 42Crunch, aplicando principios SOLID y revisiones de código para mantener el código sostenible.',
        'j2.date': 'Dic 2024 — Oct 2025',
        'j2.h': 'Becario de TI y Analista de Datos',
        'j2.1': 'Automaticé flujos de producción y logística con Python y Google Apps Script, reduciendo el tiempo de ejecución <b class="hl">de 3-5 días a 1 día</b>, con monitoreo de los procesos clave.',
        'j2.2': 'Diseñé dashboards en <b>Looker Studio</b> que revelaron patrones de ingresos por producto; el equipo de ventas y el director los adoptaron para guiar decisiones de inventario y cadena de suministro de más de 100 productos.',
        'j2.3': 'Construí pipelines de análisis de punta a punta en Python (Polars, Scikit-learn) que generaron hallazgos para decisiones de negocio.',
        'j3.date': 'Dic 2023 — May 2024',
        'j3.h': 'Ingeniero de Software',
        'j3.1': 'Desarrollé una aplicación web en <b>Django</b> para un equipo de <b class="hl">más de 10 usuarios</b> para gestionar y visualizar datos de proyectos, cubriendo base de datos, backend e interfaz.',
        'j3.2': 'Diseñé el esquema relacional en SQLite y desarrollé visualizaciones interactivas en JavaScript para los interesados.',
        'j4.date': 'Abr 2023 — Dic 2023',
        'j4.h': 'Desarrollador Full-Stack',
        'j4.1': 'Desarrollador líder de un <b>administrador financiero de proyectos</b> en Django/SQLite que da seguimiento a presupuestos, pagos y saldos pendientes, con visualizaciones de cada transacción (abr–jun 2023).',
        'j4.2': 'Desarrollador líder de un <b>manual digital interactivo y responsivo hecho con Flutter</b>, que presenta fichas técnicas y videos explicativos en todos los dispositivos (ago–dic 2023).',

        /* work */
        'work.label': '<b>Proyectos destacados</b> / Work',
        'work.h2': '<span class="hl">Proyectos</span> que construí',
        'ft.top1': 'Proyecto integrador universitario, Thales', 'ft.top2': 'Ago 2025 — Dic 2025',
        'ft.h': 'Proyecto de consultoría en ciencia de datos con Thales',
        'ft.1': 'Diseñé <b>pipelines ETL con PostgreSQL y Polars</b> para procesar y transformar <b class="hl">~700,000 filas</b> para análisis posteriores.',
        'ft.2': 'Realicé análisis estadístico con Scikit-learn y entregué dashboards en <b>Tableau</b> (datos predichos) y <b>Power BI</b> (datos reales) que respaldaron las decisiones de negocio del cliente.',
        'ft.3': 'Construí y desplegué un chatbot en <b>n8n</b> para consultar datos por cuenta propia, reduciendo las solicitudes manuales de reportes.',
        'a.dag': 'Pipeline: PostgreSQL a Polars a Scikit-learn a Tableau y Power BI, con un chatbot de n8n que lee los datos',
        'dag.store': 'almacén', 'dag.transform': 'transformar', 'dag.model': 'modelo', 'dag.report': 'reporte', 'dag.self': 'autoservicio',
        'dag.note': 'el chatbot responde preguntas sobre los datos, así se piden menos reportes a mano',
        'a.ba': 'Tiempo de ejecución antes: de 3 a 5 días. Después: 1 día.',
        'ba.before': 'Antes', 'ba.after': 'Después', 'ba.days': 'días',
        'c1.h': 'Automatización de flujo logístico',
        'c1.p': 'Python y Google Apps Script reemplazaron un proceso manual de producción y logística, con monitoreo en los pasos clave.',
        'a.viz1': 'Gráfica de barras de ingresos por producto, con la última barra resaltada',
        'c2.h': 'Dashboards de ventas e inventario',
        'c2.p': 'Dashboards en Looker Studio que mostraron los <b>patrones de ingresos por producto</b>. El equipo de ventas y el director los usaron para guiar decisiones de inventario y cadena de suministro de más de 100 productos.',
        'a.viz2': 'Un dashboard web junto a una app móvil',
        'c3.meta': 'Zazil · Sep — Dic 2024',
        'c3.h': 'App de compras y dashboard web',
        'c3.p': 'Un portal de inventario para el personal de compras y almacén: backend en Django/PostgreSQL, frontend con Tailwind CSS y una <b>app Android en Kotlin</b> complementaria.',
        'a.viz3': 'Tres tablas de base de datos vinculadas',
        'c4.h': 'Administrador de datos de proyectos',
        'c4.p': 'Una app en Django para un equipo de <b>más de 10 usuarios</b> con un esquema relacional en SQLite y visualizaciones interactivas en JavaScript para los interesados.',
        'a.viz4': 'Filas de presupuesto con montos pagados y pendientes',
        'c5.h': 'Administrador financiero y manual digital',
        'c5.p': 'Un administrador financiero de proyectos para presupuestos, pagos y saldos, más un manual responsivo en <b>Flutter</b> que muestra fichas técnicas y videos en cualquier dispositivo.',
        'a.viz5': 'Un anillo de reloj de 24 horas',
        'c6.h': 'Proyecto de hackathon de 24 horas',
        'c6.p': 'Desarrollador full-stack en una app de <b>búsqueda de imágenes con IA</b>. Construí el sistema de manejo y procesamiento de imágenes.',
        'c6.chip': 'Procesamiento de imágenes',

        /* stack */
        'stack.label': '<b>Herramientas</b> / Stack',
        'stack.h2': 'Con qué <span class="hl">trabajo</span>',
        'g1': 'Datos y analítica', 'g2': 'BI y reportes', 'g3': 'Automatización y nube', 'g4': 'Bases de datos', 'g5': 'Lenguajes', 'g6': 'Frameworks y APIs',
        'k.etl': 'Pipelines ETL', 'k.stat': 'Análisis estadístico', 'k.pred': 'Modelado predictivo', 'k.viz': 'Visualización de datos',
        'sp.1': 'Idiomas: <b>Español</b> nativo', 'sp.2': '<b>Inglés</b> B2',

        /* education */
        'edu.label': '<b>Educación y más</b> / Education &amp; beyond',
        'edu.h2': 'Fuera del <span class="hl">horario</span>',
        'edu.date': 'Ago 2022 — Jun 2026',
        'edu.h': 'Licenciatura en Ingeniería en Computación',
        'edu.conc': 'Concentración: Analítica de Datos y Herramientas de Inteligencia Artificial',
        'b1.date': 'Sep 2026 — presente',
        'b1.h': 'Locutor de radio, Frecuencia 911',
        'b1.p': 'Conduzco segmentos al aire en una estación de radio estudiantil, desarrollando habilidades de oratoria, comunicación en vivo y creación de contenido.',
        'b2.date': 'Enero 2026',
        'b2.h': 'Tutor de matemáticas, Jóvenes Ayudando a Niñas y Niños AC',
        'b2.p': 'Impartí matemáticas a jóvenes en situación vulnerable.',

        /* contact */
        'ct.label': '<b>Contacto</b> / Contact',
        'ct.h2': 'Construyamos <span>algo.</span>',
        'ct.sub': 'Hablemos. Inglés o español, ambos funcionan.',
        'ct.email': 'Correo'
    };

    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));
    var ariaNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-aria]'));
    var altNodes = Array.prototype.slice.call(document.querySelectorAll('[data-i18n-alt]'));
    var langBtns = Array.prototype.slice.call(document.querySelectorAll('.langsw button'));

    /* remember the English that is already in the HTML */
    nodes.forEach(function (el) { el._en = el.innerHTML; });
    ariaNodes.forEach(function (el) { el._enAria = el.getAttribute('aria-label'); });
    altNodes.forEach(function (el) { el._enAlt = el.getAttribute('alt'); });

    function apply(lang) {
        var es = lang === 'es';
        root.setAttribute('lang', es ? 'es' : 'en');
        nodes.forEach(function (el) {
            var k = el.getAttribute('data-i18n');
            el.innerHTML = (es && ES[k] !== undefined) ? ES[k] : el._en;
        });
        ariaNodes.forEach(function (el) {
            var k = el.getAttribute('data-i18n-aria');
            el.setAttribute('aria-label', (es && ES[k] !== undefined) ? ES[k] : el._enAria);
        });
        altNodes.forEach(function (el) {
            var k = el.getAttribute('data-i18n-alt');
            el.setAttribute('alt', (es && ES[k] !== undefined) ? ES[k] : el._enAlt);
        });
        langBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false'); });
        document.dispatchEvent(new CustomEvent('mg-lang', { detail: lang }));
    }

    function setLang(lang) {
        if (lang !== 'es') lang = 'en';
        apply(lang);
        try { localStorage.setItem('mg-lang', lang); } catch (e) {}
    }

    langBtns.forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });

    /* first visit: follow the browser language; afterwards: the saved choice */
    var start = null;
    try { start = localStorage.getItem('mg-lang'); } catch (e) {}
    if (start !== 'es' && start !== 'en') {
        start = /^es/i.test(navigator.language || '') ? 'es' : 'en';
    }
    apply(start);
})();
