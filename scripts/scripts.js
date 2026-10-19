(function () {
    var root = document.documentElement;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---- lens: the three CVs as three emphases ---- */
    var LENS = {
        all: { role: 'Full-Stack & Data Engineer',
            pitch: 'Full-Stack and Data Engineer with 3+ years of experience building Spring Boot/Angular applications at Ford and BI dashboards and automation pipelines at Kärcher that cut process turnaround from 3-5 days to 1. Strong in Python, SQL, and CI/CD, with a track record of turning complex data and business requirements into reliable, shipped solutions.' },
        data: { role: 'Data Engineer & Analyst',
            pitch: 'Data Engineer and Analyst with 3+ years of software and data experience building ETL pipelines, BI dashboards, and workflow automations with Python, SQL, and PostgreSQL. Cut a logistics process from 3-5 days to 1 at Kärcher and delivered Tableau and Power BI analytics on a 700,000-row dataset for Thales, backed by production engineering experience at Ford. Computer Engineering graduate (Data Analytics and AI).' },
        fs: { role: 'Full-Stack Software Engineer',
            pitch: 'Full-Stack Software Engineer with 3+ years of experience building web applications with Spring Boot, Angular, and Django, currently extending an enterprise application used by 100+ users at Ford through CI/CD pipelines on GCP. Comfortable from database design and REST APIs to responsive frontends and Android, with added strength in Python automation and data work. Computer Engineering graduate from Tecnológico de Monterrey.' }
    };
    /* Spanish versions of the three emphases */
    LENS.all.es = { role: 'Ingeniero Full-Stack y de Datos',
        pitch: 'Ingeniero Full-Stack y de Datos con más de 3 años de experiencia desarrollando aplicaciones Spring Boot/Angular en Ford y dashboards de BI y pipelines de automatización en Kärcher que redujeron el tiempo de un proceso de 3-5 días a 1. Sólido en Python, SQL y CI/CD, con trayectoria convirtiendo datos complejos y requerimientos de negocio en soluciones confiables y entregadas.' };
    LENS.data.es = { role: 'Ingeniero y Analista de Datos',
        pitch: 'Ingeniero y Analista de Datos con más de 3 años de experiencia en software y datos, construyendo pipelines ETL, dashboards de BI y automatizaciones de flujos con Python, SQL y PostgreSQL. Reduje un proceso logístico de 3-5 días a 1 en Kärcher y entregué analítica en Tableau y Power BI sobre un conjunto de 700,000 filas para Thales, respaldado por experiencia de ingeniería en producción en Ford. Egresado de Ingeniería en Computación (Analítica de Datos e Inteligencia Artificial).' };
    LENS.fs.es = { role: 'Ingeniero de Software Full-Stack',
        pitch: 'Ingeniero de Software Full-Stack con más de 3 años de experiencia desarrollando aplicaciones web con Spring Boot, Angular y Django; actualmente amplío una aplicación empresarial usada por más de 100 usuarios en Ford mediante pipelines de CI/CD en GCP. Me muevo con soltura desde el diseño de bases de datos y APIs REST hasta frontends responsivos y Android, con fortaleza adicional en automatización con Python y trabajo con datos. Egresado de Ingeniería en Computación del Tecnológico de Monterrey.' };

    /* small UI strings that scripts write themselves */
    var STR = {
        en: { autoOn: 'Auto-run: on', autoOff: 'Auto-run: off', copy: 'Copy', copied: 'Copied', selected: 'Selected' },
        es: { autoOn: 'Auto-ejecución: sí', autoOff: 'Auto-ejecución: no', copy: 'Copiar', copied: 'Copiado', selected: 'Seleccionado' }
    };
    function isEs() { return root.getAttribute('lang') === 'es'; }
    function S(k) { return STR[isEs() ? 'es' : 'en'][k]; }
    var curLens = 'all';

    var roleEl = document.getElementById('role');
    var pitchEl = document.getElementById('pitch');
    var lensEl = document.querySelector('.lens');
    var lensBtns = Array.prototype.slice.call(document.querySelectorAll('.lens button'));
    var swapTimer = null;

    /* sliding knob behind the active lens button */
    var knob = document.createElement('span');
    knob.className = 'knob';
    knob.setAttribute('aria-hidden', 'true');
    lensEl.insertBefore(knob, lensEl.firstChild);
    lensEl.classList.add('has-knob');
    function moveKnob() {
        var a = lensEl.querySelector('button[aria-pressed="true"]');
        if (!a) return;
        knob.style.width = a.offsetWidth + 'px';
        knob.style.transform = 'translateX(' + a.offsetLeft + 'px)';
    }

    function setLens(key, animate) {
        if (!LENS[key]) key = 'all';
        curLens = key;
        root.setAttribute('data-lens', key);
        lensBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lens') === key ? 'true' : 'false'); });
        moveKnob();
        var apply = function () {
            var T = (isEs() && LENS[key].es) ? LENS[key].es : LENS[key];
            roleEl.textContent = T.role;
            pitchEl.textContent = T.pitch;
            roleEl.classList.remove('out'); pitchEl.classList.remove('out');
        };
        clearTimeout(swapTimer);
        if (animate && !reduce) {
            roleEl.classList.add('out'); pitchEl.classList.add('out');
            swapTimer = setTimeout(apply, 220);
        } else { apply(); }
        try { localStorage.setItem('mg-lens', key); } catch (e) {}
    }
    lensBtns.forEach(function (b) { b.addEventListener('click', function () { setLens(b.getAttribute('data-lens'), true); }); });
    var saved = 'all';
    try { saved = localStorage.getItem('mg-lens') || 'all'; } catch (e) {}
    setLens(saved, false);
    requestAnimationFrame(function () { knob.classList.add('ready'); });

    /* language change: re-apply the hero text, refit the knob, relabel script-written buttons */
    document.addEventListener('mg-lang', function () {
        clearTimeout(swapTimer);
        setLens(curLens, false);
        requestAnimationFrame(moveKnob);
        Array.prototype.forEach.call(document.querySelectorAll('.copy'), function (b) { b.textContent = S('copy'); });
    });
    window.addEventListener('resize', moveKnob);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveKnob);

    /* ---- scroll reveal: elements below the fold settle in when reached ---- */
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if ('IntersectionObserver' in window && !reduce) {
        var vh0 = window.innerHeight;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.remove('pre'); io.unobserve(en.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        targets.forEach(function (el) {
            if (el.getBoundingClientRect().top > vh0 * 0.92) { el.classList.add('pre'); io.observe(el); }
        });
    }

    /* ---- scroll: the dial needle follows the page, the timeline line fills ---- */
    var tl = document.getElementById('timeline');
    var ticking = false;
    function onScroll() {
        ticking = false;
        var max = root.scrollHeight - window.innerHeight;
        var sp = max > 0 ? window.scrollY / max : 0;
        root.style.setProperty('--sp', Math.min(1, Math.max(0, sp)).toFixed(4));
        if (!reduce && tl) {
            var r = tl.getBoundingClientRect();
            var p = (window.innerHeight * 0.65 - r.top) / r.height;
            tl.style.setProperty('--p', Math.max(0.04, Math.min(1, p)).toFixed(3));
        }
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    /* ---- stat counters ---- */
    if (!reduce) {
        Array.prototype.forEach.call(document.querySelectorAll('[data-count]'), function (el) {
            var end = +el.getAttribute('data-count');
            var t0 = performance.now(), dur = 1100;
            (function step(now) {
                var k = Math.min(1, (now - t0) / dur);
                el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
                if (k < 1) requestAnimationFrame(step);
            })(t0);
        });
    }

    /* ---- copy buttons ---- */
    Array.prototype.forEach.call(document.querySelectorAll('.copy'), function (b) {
        b.addEventListener('click', function () {
            var done = function (ok) {
                b.textContent = ok ? S('copied') : S('selected');
                setTimeout(function () { b.textContent = S('copy'); }, 1800);
            };
            var fallback = function () {
                var el = document.getElementById(b.getAttribute('data-target'));
                if (el) {
                    var rg = document.createRange(); rg.selectNodeContents(el);
                    var s = window.getSelection(); s.removeAllRanges(); s.addRange(rg);
                }
                done(false);
            };
            try {
                navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function () { done(true); }, fallback);
            } catch (e) { fallback(); }
        });
    });

    /* ---- the name breathes: Archivo has a width axis, letters stretch toward the cursor ---- */
    var h1 = document.querySelector('h1.name');
    var letters = [];
    if (h1) {
        h1.setAttribute('aria-label', 'Miguel Galicia');
        Array.prototype.forEach.call(h1.querySelectorAll('.wd'), function (w) {
            var t = w.textContent;
            w.textContent = '';
            w.setAttribute('aria-hidden', 'true');
            for (var i = 0; i < t.length; i++) {
                var s = document.createElement('span');
                s.className = 'ch';
                s.textContent = t.charAt(i);
                w.appendChild(s);
                letters.push(s);
            }
        });
    }
    var BASE = 72, cur = letters.map(function () { return BASE; }), tgt = letters.map(function () { return BASE; });
    var nameRun = false, introT0 = 0, ptr = null;
    var INTRO = 1700;
    function nameLoop(now) {
        var introOn = introT0 && now - introT0 < INTRO;
        var i;
        if (introOn) {
            var pos = (now - introT0) / INTRO * (letters.length + 5) - 2;
            for (i = 0; i < letters.length; i++) tgt[i] = BASE + 36 * Math.exp(-Math.pow(i - pos, 2) / 2.2);
        } else if (ptr) {
            var fs = parseFloat(getComputedStyle(h1).fontSize) || 100;
            for (i = 0; i < letters.length; i++) {
                var r = letters[i].getBoundingClientRect();
                var dx = (ptr.x - (r.left + r.width / 2)) / fs;
                tgt[i] = BASE + 40 * Math.exp(-dx * dx / 0.8);
            }
        } else {
            for (i = 0; i < letters.length; i++) tgt[i] = BASE;
        }
        var moving = false;
        for (i = 0; i < letters.length; i++) {
            cur[i] += (tgt[i] - cur[i]) * 0.18;
            if (Math.abs(tgt[i] - cur[i]) > 0.15) moving = true;
            letters[i].style.setProperty('--w', cur[i].toFixed(1));
        }
        if (introOn || ptr || moving) requestAnimationFrame(nameLoop); else nameRun = false;
    }
    function kickName() { if (!nameRun) { nameRun = true; requestAnimationFrame(nameLoop); } }
    if (h1 && !reduce) {
        if (window.innerWidth >= 700) {
            setTimeout(function () { introT0 = performance.now(); kickName(); }, 500);
        }
        if (fine) {
            h1.addEventListener('pointermove', function (e) { ptr = { x: e.clientX }; kickName(); });
            h1.addEventListener('pointerleave', function () { ptr = null; kickName(); });
        }
    }

    /* ---- portrait: if images/miguel.jpg is missing, the designed placeholder stays ---- */
    var pf = document.getElementById('portrait');
    if (pf) {
        var pim = pf.querySelector('img');
        var miss = function () { pf.classList.add('empty'); };
        if (pim.complete && pim.naturalWidth === 0) miss();
        pim.addEventListener('error', miss);
    }

    /* ---- automation demo: workflow steps light up, the queue clears, the log writes itself ---- */
    (function () {
        var box = document.getElementById('auto');
        if (!box) return;
        var steps = Array.prototype.slice.call(box.querySelectorAll('.steps li'));
        var rows = Array.prototype.slice.call(box.querySelectorAll('.qrow'));
        var logEl = box.querySelector('.log');
        var runBtn = document.getElementById('auto-run');
        var togBtn = document.getElementById('auto-toggle');
        var nEl = document.getElementById('auto-n');
        var LOG_EN = [
            ['00:00', 'trigger', 'new request received'],
            ['00:01', 'python', 'rows validated and transformed'],
            ['00:02', 'script', 'shared sheet updated'],
            ['00:03', 'monitor', 'key steps checked, all clear'],
            ['00:04', 'done', 'report ready, 5 of 5 requests closed']
        ];
        var LOG_ES = [
            ['00:00', 'disparador', 'nueva solicitud recibida'],
            ['00:01', 'python', 'filas validadas y transformadas'],
            ['00:02', 'script', 'hoja compartida actualizada'],
            ['00:03', 'monitoreo', 'pasos clave revisados, todo en orden'],
            ['00:04', 'listo', 'reporte listo, 5 de 5 solicitudes cerradas']
        ];
        function logRow(i) { return (isEs() ? LOG_ES : LOG_EN)[i]; }
        var timers = [], playing = false, autoOn = true, visible = false, runs = 0;

        function at(ms, fn) { timers.push(setTimeout(fn, ms)); }
        function clearAll() { timers.forEach(clearTimeout); timers = []; }
        function fillLine(d, i) {
            var L = logRow(i);
            d.textContent = '';
            var a = document.createElement('i'); a.textContent = '[' + L[0] + ']';
            var b = document.createElement('u'); b.textContent = L[1];
            d.appendChild(a); d.appendChild(b); d.appendChild(document.createTextNode(L[2]));
        }
        function addLine(i) {
            var d = document.createElement('span');
            d.className = 'ln';
            d.setAttribute('data-i', i);
            fillLine(d, i);
            logEl.appendChild(d);
        }
        function reset() {
            clearAll();
            steps.forEach(function (s) { s.classList.remove('run', 'ok'); });
            rows.forEach(function (r) { r.classList.remove('go', 'done'); });
            logEl.textContent = '';
        }
        function showFinal() {
            reset();
            steps.forEach(function (s) { s.classList.add('ok'); });
            rows.forEach(function (r) { r.classList.add('done'); });
            for (var i = 0; i < LOG_EN.length; i++) addLine(i);
            playing = false;
        }
        function run() {
            if (reduce) { showFinal(); runs++; nEl.textContent = runs; return; }
            reset();
            playing = true;
            var t = 250;
            steps.forEach(function (s, i) {
                at(t, function () { s.classList.add('run'); addLine(i); });
                t += 700;
                at(t, function () { s.classList.remove('run'); s.classList.add('ok'); });
                t += 120;
            });
            rows.forEach(function (r, i) {
                at(t + i * 240, function () { r.classList.add('go'); });
                at(t + i * 240 + 520, function () { r.classList.remove('go'); r.classList.add('done'); });
            });
            at(t + rows.length * 240 + 700, function () {
                playing = false; runs++; nEl.textContent = runs;
                at(3800, function () { if (autoOn && visible) run(); });
            });
        }

        showFinal();
        document.addEventListener('mg-lang', function () {
            togBtn.textContent = S(autoOn ? 'autoOn' : 'autoOff');
            Array.prototype.forEach.call(logEl.querySelectorAll('.ln'), function (d) { fillLine(d, +d.getAttribute('data-i')); });
        });
        runBtn.addEventListener('click', run);
        togBtn.addEventListener('click', function () {
            autoOn = !autoOn;
            togBtn.setAttribute('aria-pressed', autoOn ? 'true' : 'false');
            togBtn.textContent = S(autoOn ? 'autoOn' : 'autoOff');
            if (autoOn && visible && !playing) run();
        });
        if ('IntersectionObserver' in window && !reduce) {
            new IntersectionObserver(function (en) {
                visible = en[0].isIntersecting;
                if (visible && autoOn && !playing) run();
                if (!visible && playing) showFinal();
            }, { threshold: 0.35 }).observe(box);
        }
    })();

    /* ---- hero flow: raw rows enter on the left, get aligned in the gate, leave as clean lanes.
           Move the cursor over the rows to clean them by hand. ---- */
    var cv = document.getElementById('flow');
    var ctx = cv.getContext('2d');
    var W = 0, H = 0, lanes = 8, parts = [], col = {}, running = false, last = 0, frame = 0;
    var mx = -999, my = -999, R = 95;

    function readColors() {
        var cs = getComputedStyle(root);
        col.accent = cs.getPropertyValue('--accent').trim() || '#2B3CF0';
        col.muted = cs.getPropertyValue('--muted').trim() || '#454C6B';
        col.line = cs.getPropertyValue('--line').trim() || '#CBD2E6';
    }
    function spawn(p, x) {
        p.x = x; p.w0 = 4 + Math.random() * 20; p.h0 = 2 + Math.random() * 9;
        p.dy = (Math.random() - 0.5) * H * 0.7; p.seed = Math.random() * 6.28; p.sp = 0.6 + Math.random() * 0.5;
        return p;
    }
    function build() {
        lanes = Math.max(6, Math.floor(H / 16));
        var n = Math.round(W / 9);
        parts = [];
        for (var i = 0; i < n; i++) { var p = spawn({ lane: i % lanes }, Math.random() * (W + 60) - 30); parts.push(p); }
    }
    function size() {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = cv.clientWidth; H = cv.clientHeight;
        cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        build(); readColors(); draw(0);
    }
    function smooth(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
    function draw(t) {
        ctx.clearRect(0, 0, W, H);
        var gx1 = W * 0.4, gx2 = W * 0.5;
        ctx.strokeStyle = col.line; ctx.lineWidth = 1; ctx.setLineDash([3, 4]);
        ctx.beginPath(); ctx.moveTo(gx1, 0); ctx.lineTo(gx1, H); ctx.moveTo(gx2, 0); ctx.lineTo(gx2, H); ctx.stroke();
        ctx.setLineDash([]);
        var laneH = H / lanes;
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            var laneY = (p.lane + 0.5) * laneH;
            var A = 1 - smooth((p.x / W - 0.36) / 0.16);
            if (mx > -900) {
                var d = Math.sqrt((p.x - mx) * (p.x - mx) + (laneY - my) * (laneY - my));
                A *= smooth(d / R);
            }
            var y = laneY + (p.dy + Math.sin(t * 0.002 + p.seed) * 10) * A;
            var w = p.w0 * A + 16 * (1 - A);
            var h = Math.min(p.h0 * A + 6 * (1 - A), laneH - 3);
            y = Math.max(h / 2 + 1, Math.min(H - h / 2 - 1, y));
            if (A > 0.02) { ctx.globalAlpha = 0.6 * A; ctx.fillStyle = col.muted; ctx.fillRect(p.x, y - h / 2, w, h); }
            if (A < 0.98) { ctx.globalAlpha = 1 - A; ctx.fillStyle = col.accent; ctx.fillRect(p.x, y - h / 2, w, h); }
        }
        ctx.globalAlpha = 1;
        if (mx > -900) {
            ctx.strokeStyle = col.accent; ctx.globalAlpha = 0.45; ctx.setLineDash([2, 4]);
            ctx.beginPath(); ctx.arc(mx, my, R, 0, 6.2832); ctx.stroke();
            ctx.setLineDash([]); ctx.globalAlpha = 1;
        }
    }
    function loop(now) {
        if (!running) return;
        var dt = Math.min(48, now - last); last = now; frame++;
        if (frame % 40 === 0) readColors();
        for (var i = 0; i < parts.length; i++) {
            var p = parts[i];
            p.x += dt * 0.085 * p.sp;
            if (p.x > W + 30) spawn(p, -34);
        }
        draw(now);
        requestAnimationFrame(loop);
    }
    function start() { if (running || reduce) return; running = true; last = performance.now(); requestAnimationFrame(loop); }
    function stop() { running = false; }

    function setPtr(e) {
        var r = cv.getBoundingClientRect();
        mx = e.clientX - r.left; my = e.clientY - r.top;
        if (reduce) draw(0);
    }
    cv.addEventListener('pointermove', setPtr);
    cv.addEventListener('pointerdown', setPtr);
    cv.addEventListener('pointerleave', function () { mx = -999; my = -999; if (reduce) draw(0); });
    cv.addEventListener('pointercancel', function () { mx = -999; my = -999; });

    size();
    window.addEventListener('resize', size);
    try {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { readColors(); draw(0); });
    } catch (e) {}
    new MutationObserver(function () { readColors(); draw(0); }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { en[0].isIntersecting ? start() : stop(); }).observe(cv);
    } else { start(); }
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
})();