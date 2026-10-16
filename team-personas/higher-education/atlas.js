/* Higher-education atlas: renders window.HE_WORLDS + window.HE_ATLAS (worlds.js). No dependencies.
 * Routes:  #/  (atlas)   #/w/<world-id>[/heute|m365|vergleich]  */
(function () {
  'use strict';

  var D = window.HE_WORLDS, A = window.HE_ATLAS;
  var app = document.getElementById('app');
  var live = document.getElementById('live');
  var main = document.getElementById('main');
  if (!D || !A || !app) return;

  var VIEWS = ['heute', 'm365', 'vergleich'];
  var VIEW_LABEL = { heute: 'Arbeitswelt heute', m365: 'M365-Arbeitsmodell', vergleich: 'Vergleich' };
  var PATTERN = {
    continuous: 'Laufender Betrieb',
    mixed: 'Gemischt',
    solo: 'Einzelarbeit',
    periodic: 'Periodisch',
    cyclic: 'Wiederkehrend'
  };
  var ROLE = {
    valid: { label: 'Hat weiter seinen Platz', icon: 'i-check', tone: 'ok' },
    wrong: { label: 'Falscher Job', icon: 'i-alert', tone: 'bad' },
    duplicate: { label: 'Doppelte Quelle', icon: 'i-copy', tone: 'bad' },
    dependency: { label: 'Persönlich, aber zur Abhängigkeit geworden', icon: 'i-person', tone: 'bad' },
    specialist: { label: 'Spezialsystem, bleibt ausserhalb', icon: 'i-box', tone: 'out' }
  };
  var STATE = { personal: 'persönlich', shared: 'gemeinsam', institutional: 'institutionell' };
  var CATS = [
    ['communication', 'Kommunikation'],
    ['documents', 'Dokumente'],
    ['tasks', 'Aufgaben'],
    ['knowledge', 'Wissen'],
    ['attention', 'Meetings und Aufmerksamkeit']
  ];
  var lastView = 'heute';
  var wide = window.matchMedia('(min-width: 1000px)');

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function icon(id) { return '<svg class="ic" aria-hidden="true"><use href="#' + id + '"/></svg>'; }
  function worldById(id) { return D.worlds.filter(function (w) { return w.id === id; })[0]; }
  function href(id, view) { return '#/w/' + id + (view && view !== 'heute' ? '/' + view : ''); }
  function personName(n) { return n.replace(/^((Prof|Dr)\.\s*)+/, '').trim(); }
  function initials(n) {
    var p = personName(n).split(/\s+/);
    return (p[0][0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
  }
  function avatar(i, name) {
    return '<span class="av av-' + (i % 6) + '" aria-hidden="true">' + esc(initials(name)) + '</span>';
  }
  function list(items, cls) {
    return '<ul class="' + (cls || 'plain') + '">' + items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
  }
  function sizeLabel(w) { return w.size === 1 ? '1 Person' : w.size + ' Personen'; }
  function stripPrefix(s) { return s.replace(/^Unsere Wahl für diesen Kontext:\s*/, ''); }

  /* One signature glyph per work pattern; this is what makes the worlds look different at a glance. */
  function glyph(p) {
    var g = {
      continuous: '<line x1="6" y1="52" x2="114" y2="52" class="g-base"/><rect x="48" y="30" width="46" height="9" rx="2" class="g-acc"/><line x1="48" y1="39" x2="48" y2="52" class="g-thin"/><line x1="94" y1="39" x2="94" y2="52" class="g-thin"/>',
      mixed: '<line x1="6" y1="20" x2="60" y2="20" class="g-thin"/><line x1="6" y1="36" x2="60" y2="36" class="g-thin"/><line x1="6" y1="52" x2="60" y2="52" class="g-thin"/><line x1="60" y1="14" x2="60" y2="58" class="g-base"/><rect x="60" y="14" width="54" height="44" rx="3" class="g-acc"/>',
      solo: '<circle cx="34" cy="36" r="13" class="g-solid"/><circle cx="100" cy="18" r="4" class="g-dot"/><circle cx="104" cy="56" r="4" class="g-dot"/><path d="M47 36 C70 36 80 24 96 19" class="g-dash"/><path d="M47 38 C70 40 86 50 99 54" class="g-dash"/>',
      periodic: '<line x1="6" y1="54" x2="114" y2="54" class="g-base"/><line x1="16" y1="54" x2="16" y2="22" class="g-tick"/><line x1="36" y1="54" x2="36" y2="22" class="g-tick"/><line x1="56" y1="54" x2="56" y2="22" class="g-tick"/><line x1="76" y1="54" x2="76" y2="22" class="g-tick"/><line x1="96" y1="54" x2="96" y2="22" class="g-tick"/><line x1="112" y1="54" x2="112" y2="22" class="g-tick"/>',
      cyclic: '<path d="M60 12 A24 24 0 1 1 36 36" class="g-base" fill="none"/><path d="M30 28 L36 37 L44 31" class="g-base" fill="none"/><circle cx="60" cy="12" r="5" class="g-acc"/><circle cx="84" cy="36" r="5" class="g-solid"/><circle cx="60" cy="60" r="5" class="g-solid"/><circle cx="36" cy="36" r="5" class="g-solid"/>'
    }[p] || '';
    return '<svg class="glyph" viewBox="0 0 120 72" aria-hidden="true" focusable="false">' + g + '</svg>';
  }

  function people(w, atlas) {
    var out = atlas.map.outside || [], ext = atlas.map.external_people || [];
    return {
      core: w.people.filter(function (p) { return out.indexOf(p.id) < 0 && ext.indexOf(p.id) < 0; }),
      outside: w.people.filter(function (p) { return out.indexOf(p.id) >= 0; }),
      external: w.people.filter(function (p) { return ext.indexOf(p.id) >= 0; })
    };
  }
  function avatarGroup(w, atlas, max) {
    var core = people(w, atlas).core, shown = core.slice(0, max), rest = core.length - shown.length;
    return '<ul class="avs" aria-label="Personen: ' + esc(core.map(function (p) { return personName(p.name); }).join(', ')) + '">' +
      shown.map(function (p) { return '<li>' + avatar(w.people.indexOf(p), p.name) + '<span class="sr-only">' + esc(p.name) + '</span></li>'; }).join('') +
      (rest > 0 ? '<li><span class="av av-more" aria-hidden="true">+' + rest + '</span></li>' : '') + '</ul>';
  }

  /* ---------- atlas ---------- */
  function renderAtlas() {
    var rows = D.worlds.map(function (w) {
      var a = A[w.id], s = w.scenarios[0];
      return '<tr>' +
        '<th scope="row"><a href="' + href(w.id) + '">' + esc(a.label) + '</a><span class="sub">' + esc(w.name) + '</span></th>' +
        '<td data-l="Grösse">' + esc(sizeLabel(w)) + '</td>' +
        '<td data-l="Takt"><span class="tkt">' + glyph(a.pattern) + '<span>' + esc(PATTERN[a.pattern]) + '</span></span></td>' +
        '<td data-l="Einzelarbeit"><span class="meter"><span class="bar" style="--v:' + w.work_mix.individual_percent + '%"></span><span class="num">' + w.work_mix.individual_percent + ' %</span></span></td>' +
        '<td data-l="Passendes M365-Setup" class="fp">' + esc(a.footprint) + '</td></tr>';
    }).join('');

    var worlds = D.worlds.map(function (w, i) {
      var a = A[w.id], s = w.scenarios[0], who = people(w, a);
      return '<article class="world" data-pattern="' + a.pattern + '" aria-labelledby="wh-' + w.id + '">' +
        '<div class="world-sig">' + glyph(a.pattern) + '<p class="kick">' + esc(a.label) + '</p></div>' +
        '<div class="world-main">' +
          '<h2 id="wh-' + w.id + '"><a href="' + href(w.id) + '">' + esc(w.name) + '</a></h2>' +
          '<p class="tag">' + esc(w.tagline) + '</p>' +
          '<blockquote class="tension"><p>' + esc(w.tension) + '</p></blockquote>' +
        '</div>' +
        '<div class="world-side">' +
          avatarGroup(w, a, 6) +
          '<p class="meta"><span class="k">Szenario</span> ' + esc(s.name) + '</p>' +
          '<p class="meta"><span class="k">Takt</span> ' + esc(w.rhythm.split(';')[0]) + '</p>' +
          '<p class="meta"><span class="k">M365-Setup</span> ' + esc(a.footprint) + '</p>' +
          '<a class="go" href="' + href(w.id) + '">Arbeitswelt ansehen' + icon('i-arrow') + '</a>' +
        '</div></article>';
    }).join('');

    app.innerHTML =
      '<div class="wrap">' +
      '<section class="intro" aria-labelledby="t">' +
        '<p class="kick">Fiktive Hochschule · fünf Arbeitswelten</p>' +
        '<h1 id="t">Dieselbe Universität, ganz verschiedene Arbeit.</h1>' +
        '<p class="lede">Eine kleine Verwaltungsstelle, eine Forschungsgruppe, eine einzelne Forscherin, eine Kommission und ein Lehrteam. Schau zuerst, wie sie heute arbeiten. Wechsle dann zum passenden M365-Arbeitsmodell. Es sieht für jede Welt anders aus.</p>' +
      '</section>' +
      '<section class="glance" aria-labelledby="g"><h2 id="g" class="h-sec">Auf einen Blick</h2>' +
        '<table class="cmp"><thead><tr><th scope="col">Arbeitswelt</th><th scope="col">Grösse</th><th scope="col">Takt</th><th scope="col">Anteil Einzelarbeit</th><th scope="col">Passendes M365-Setup</th></tr></thead><tbody>' + rows + '</tbody></table>' +
      '</section>' +
      '<section class="worlds" aria-label="Die Arbeitswelten">' + worlds + '</section>' +
      '</div>';
    document.title = 'Arbeitswelten Hochschule — m365-toolbox';
    setHeading(document.getElementById('t'), 'Übersicht der Arbeitswelten');
  }

  /* ---------- world: side A ---------- */
  function sectionA(w, a) {
    var s = w.scenarios[0], who = people(w, a), c = w.collaboration, mix = w.work_mix.individual_percent;

    var peopleRow = function (p) {
      var i = w.people.indexOf(p);
      return '<li>' + avatar(i, p.name) + '<span class="pn"><strong>' + esc(p.name) + '</strong><span>' + esc(p.role) + '</span><span class="pf">' + esc(p.focus) + '</span></span></li>';
    };
    var ring = function (title, items, cls) {
      if (!items.length) return '';
      return '<div class="ring ' + cls + '"><h4>' + title + '</h4>' + items + '</div>';
    };
    var peopleBlock =
      '<ul class="people">' + who.core.map(peopleRow).join('') + '</ul>' +
      '<div class="rings">' +
        ring('Nicht im Team, aber eng verbunden', who.outside.length ? '<ul class="people">' + who.outside.map(peopleRow).join('') + '</ul>' + (a.map.outside_label ? '<p class="note">' + esc(a.map.outside_label) + '</p>' : '') : '', 'r-near') +
        ring('Eng verbunden', c.close_internal.length ? list(c.close_internal) : '', 'r-near') +
        ring('Gelegentlich, intern', c.occasional_internal.length ? list(c.occasional_internal) : '', 'r-occ') +
        ring('Extern', (who.external.length ? '<ul class="people">' + who.external.map(peopleRow).join('') + '</ul>' : '') + (c.external.length ? list(c.external) : ''), 'r-ext') +
      '</div>';

    var steps = '<ol class="steps">' + a.rhythm_steps.map(function (t) { return '<li><span>' + esc(t) + '</span></li>'; }).join('') + '</ol>';

    var tools = '<ul class="tools">' + a.tools.map(function (t) {
      var r = ROLE[t.role];
      return '<li class="tool tone-' + r.tone + '"><div class="tn"><strong>' + esc(t.name) + '</strong><span>' + esc(t.use) + '</span></div><span class="role">' + icon(r.icon) + esc(r.label) + '</span></li>';
    }).join('') + '</ul>';

    var arts = '<ul class="arts">' + w.artefacts.map(function (x) {
      var owner = w.people.filter(function (p) { return p.id === x.owner; })[0];
      return '<li><div class="an"><strong>' + esc(x.name) + '</strong><span class="st st-' + x.state + '">' + esc(STATE[x.state] || '') + '</span></div><p>' + esc(x.where_now) + '</p></li>';
    }).join('') + '</ul>';

    var pvs = w.personal_vs_shared;
    var moves = '<ul class="moves">' + pvs.moves_to_shared.map(function (m) {
      return '<li><strong>' + esc(m.when) + '</strong><span>' + esc(m.why) + '</span></li>';
    }).join('') + '</ul>';

    return '' +
      sec('Wer arbeitet hier', 'Menschen und Beziehungen', peopleBlock) +
      sec('Wie die Arbeit läuft', 'Takt, Lebenszyklus, Einzelarbeit',
        steps + '<p class="life">' + esc(w.lifecycle) + '</p>' +
        '<div class="mix"><div class="meter big"><span class="bar" style="--v:' + mix + '%"></span></div><p><strong>' + mix + ' % Einzelarbeit</strong>, ' + (100 - mix) + ' % gemeinsam. Typisch: ' + esc(w.work_mix.examples.slice(0, 4).join(', ')) + '.</p></div>' +
        '<div class="scen"><h4>Szenario: ' + esc(s.name) + '</h4><p>' + esc(s.description) + '</p><p class="stakes">' + esc(s.stakes) + '</p>' +
        '<ol class="stages">' + s.stages.map(function (g) { return '<li><strong>' + esc(g.stage) + '</strong><span>' + esc(g.question) + '</span></li>'; }).join('') + '</ol></div>') +
      sec('Wo die Arbeit heute lebt', 'Werkzeuge und Artefakte',
        '<h4 class="sub-h">Werkzeuge</h4>' + tools +
        '<h4 class="sub-h">Dokumente und Unterlagen</h4>' + arts) +
      sec('Was schwierig ist', 'Charakteristische Reibung',
        '<ul class="frictions">' + s.current_state.frictions.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
        '<p class="tens"><span class="k">Kernspannung</span> ' + esc(w.tension) + '</p>') +
      sec('Persönlich oder gemeinsam', 'Was bei wem liegt',
        '<div class="two"><div><h4>Bleibt persönlich</h4>' + list(pvs.stays_personal) + '</div><div><h4>Ist gemeinsam</h4>' + list(pvs.shared) + '</div></div>' +
        '<h4 class="sub-h">Wann etwas von persönlich zu gemeinsam wechselt</h4>' + moves);
  }

  /* ---------- world: side B ---------- */
  function sectionB(w, a) {
    var s = w.scenarios[0], m = s.m365_model, pvs = w.personal_vs_shared;
    var setup = m
      ? '<p class="fp-big">' + esc(a.footprint) + '</p><p class="setup-lead">Team «' + esc(m.team) + '»' + (m.channels.length ? ', Kanäle: ' + esc(m.channels.join(', ')) : '') + '.</p><p>' + esc(m.notes.replace(/\s*\([a-z]+(-[a-z0-9]+)+\)/g, '')) + '</p>'
      : '<p class="fp-big">' + esc(a.footprint) + '</p><p>Kein Team, kein Kanal. Persönliche Arbeit bleibt persönlich, gemeinsame Arbeit entsteht erst, wenn jemand mitschreibt.</p>';

    var cats = CATS.map(function (c) {
      var x = a.model[c[0]];
      var cell = function (k, v, cls) {
        return '<div class="cell ' + cls + '"><h5>' + k + '</h5>' + (v ? '<p>' + esc(v) + '</p>' : '<p class="none"><span aria-hidden="true">—</span><span class="sr-only">nichts</span></p>') + '</div>';
      };
      return '<article class="cat"><h4>' + c[1] + '</h4><div class="cells">' +
        cell('Ändert sich', x.change, 'c-chg') + cell('Bleibt', x.stay, 'c-stay') + cell('M365 trägt', x.m365, 'c-m365') + cell('Bleibt ausserhalb', x.outside, 'c-out') +
        '</div></article>';
    }).join('');

    var track =
      '<div class="track" role="group" aria-label="Von persönlich über gemeinsam zu ausserhalb von M365">' +
        '<div class="zone z-p"><h4>Persönlich</h4><p class="zs">OneDrive, To Do, Entwürfe</p>' + list(pvs.stays_personal) + '</div>' +
        '<div class="zarrow" aria-hidden="true">' + icon('i-arrow') + '</div>' +
        '<div class="zone z-s"><h4>Gemeinsam</h4><p class="zs">Team, Kanal, Planner</p>' + list(pvs.shared) + '</div>' +
        '<div class="zarrow" aria-hidden="true">' + icon('i-arrow') + '</div>' +
        '<div class="zone z-o"><h4>Ausserhalb von M365</h4><p class="zs">Bleibt in anderen Systemen</p>' + list(a.outside) + '</div>' +
      '</div>';

    var dps = s.decision_points.filter(function (d) { return a.picks.indexOf(d.id) >= 0; });
    var picks = '<ul class="picks">' + dps.map(function (d) {
      return '<li><h4>' + esc(d.question) + '</h4><p class="pick"><span class="k">Unsere Wahl</span> <strong>' + esc(d.pick.label) + '</strong></p><p>' + esc(stripPrefix(d.pick.why)) + '</p></li>';
    }).join('') + '</ul>';

    var mods = D.modules.map(function (mod) {
      var th = w.training_hooks[mod.id];
      return '<li><strong>' + mod.nr + '. ' + esc(mod.title) + '</strong><span>' + esc(th ? th.prompt : '') + '</span></li>';
    }).join('');

    return '' +
      sec('Das passende Setup', 'Kein Standard, sondern eine Empfehlung für diesen Kontext', setup, 'setup') +
      sec('Nach Arbeitsmuster', 'Was sich ändert, was bleibt, was ausserhalb liegt', '<div class="cats">' + cats + '</div>') +
      sec('Persönlich → gemeinsam → ausserhalb', 'Wo etwas wohnt', track) +
      sec('Unsere Wahl für diesen Kontext', 'Entscheide, die sich aus dieser Arbeitswelt ergeben', picks) +
      sec('Grenzen', 'Was M365 hier nicht tun soll',
        '<p class="boundary">' + esc(w.boundary) + '</p>' +
        '<h4 class="sub-h">Nicht so</h4><ul class="anti">' + a.anti.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>') +
      '<details class="mods no-print"><summary>Wo diese Welt in den Deep Dives vorkommt</summary><ul>' + mods + '</ul></details>';
  }

  function sec(title, sub, body, cls) {
    return '<section class="sec ' + (cls || '') + '"><header class="sec-h"><h3>' + esc(title) + '</h3><p>' + esc(sub) + '</p></header><div class="sec-b">' + body + '</div></section>';
  }

  /* ---------- world: compare ---------- */
  function sectionC(w, a) {
    var s = w.scenarios[0];
    var left =
      '<h3>Arbeitswelt heute</h3>' +
      '<h4>Werkzeuge</h4><ul class="tools tight">' + a.tools.map(function (t) {
        var r = ROLE[t.role];
        return '<li class="tool tone-' + r.tone + '"><div class="tn"><strong>' + esc(t.name) + '</strong></div><span class="role">' + icon(r.icon) + esc(r.label) + '</span></li>';
      }).join('') + '</ul>' +
      '<h4>Reibung</h4><ul class="frictions">' + s.current_state.frictions.slice(0, 5).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>';
    var right =
      '<h3>M365-Arbeitsmodell</h3>' +
      '<p class="fp-big sm">' + esc(a.footprint) + '</p>' +
      CATS.map(function (c) {
        var x = a.model[c[0]];
        return '<div class="crow"><h4>' + c[1] + '</h4><p>' + esc(x.change || x.stay) + '</p>' + (x.outside ? '<p class="out"><span class="k">Ausserhalb</span> ' + esc(x.outside) + '</p>' : '') + '</div>';
      }).join('');
    return '<div class="compare"><div class="side side-a">' + left + '</div><div class="side side-b">' + right + '</div></div>';
  }

  /* ---------- world page ---------- */
  function renderWorld(id, view) {
    var w = worldById(id);
    if (!w) return renderAtlas();
    var a = A[w.id];
    if (VIEWS.indexOf(view) < 0 || (view === 'vergleich' && !wide.matches)) view = 'heute';
    lastView = view;

    var tabs = VIEWS.map(function (v) {
      return '<button type="button" role="tab" id="tab-' + v + '" class="tab' + (v === 'vergleich' ? ' tab-cmp' : '') + '" aria-selected="' + (v === view) + '" aria-controls="panel-' + v + '" tabindex="' + (v === view ? 0 : -1) + '" data-view="' + v + '">' + VIEW_LABEL[v] + '</button>';
    }).join('');

    var others = D.worlds.filter(function (x) { return x.id !== w.id; }).map(function (x) {
      return '<li><a href="' + href(x.id, view) + '"><span class="ol">' + esc(A[x.id].label) + '</span><span class="on">' + esc(x.name) + '</span><span class="of">' + esc(A[x.id].footprint) + '</span></a></li>';
    }).join('');

    app.innerHTML =
      '<div class="wrap world-page" data-pattern="' + a.pattern + '">' +
      '<nav class="crumbs no-print" aria-label="Brotkrumen"><a href="#/">Alle Arbeitswelten</a><span aria-hidden="true">/</span><span aria-current="page">' + esc(a.label) + '</span></nav>' +
      '<header class="hero">' +
        '<div class="hero-text"><p class="kick">' + esc(a.label) + ' · ' + esc(sizeLabel(w)) + '</p>' +
        '<h1 id="t" tabindex="-1">' + esc(w.name) + '</h1>' +
        '<p class="lede">' + esc(w.tagline) + '</p>' +
        '<blockquote class="tension"><p>' + esc(w.tension) + '</p></blockquote></div>' +
        '<div class="hero-side">' + glyph(a.pattern) +
          '<dl class="facts"><div><dt>Form</dt><dd>' + esc(a.shape) + '</dd></div><div><dt>Takt</dt><dd>' + esc(PATTERN[a.pattern]) + '</dd></div><div><dt>Einzelarbeit</dt><dd>' + w.work_mix.individual_percent + ' %</dd></div><div><dt>M365-Setup</dt><dd>' + esc(a.footprint) + '</dd></div></dl>' +
        '</div>' +
      '</header>' +
      '<div class="switch no-print"><div class="switch-in">' +
        '<div class="tabs" role="tablist" aria-label="Ansicht wählen">' + tabs + '</div>' +
        '<button type="button" class="print" id="print">' + icon('i-print') + 'Drucken</button>' +
      '</div></div>' +
      '<div class="panels">' +
        '<div role="tabpanel" id="panel-heute" class="panel panel-a" aria-labelledby="tab-heute" tabindex="0"' + (view === 'heute' ? '' : ' hidden') + '><p class="side-tag">Arbeitswelt heute</p>' + sectionA(w, a) + '</div>' +
        '<div role="tabpanel" id="panel-m365" class="panel panel-b" aria-labelledby="tab-m365" tabindex="0"' + (view === 'm365' ? '' : ' hidden') + '><p class="side-tag">M365-Arbeitsmodell</p>' + sectionB(w, a) + '</div>' +
        '<div role="tabpanel" id="panel-vergleich" class="panel panel-c" aria-labelledby="tab-vergleich" tabindex="0"' + (view === 'vergleich' ? '' : ' hidden') + '>' + sectionC(w, a) + '</div>' +
      '</div>' +
      '<nav class="others no-print" aria-labelledby="oh"><h2 id="oh" class="h-sec">Andere Arbeitswelten</h2><ul>' + others + '</ul></nav>' +
      '</div>';

    document.title = w.name + ' — Arbeitswelten Hochschule';
    setHeading(document.getElementById('t'), w.name);
    wireTabs();
  }

  function wireTabs() {
    var tabs = [].slice.call(app.querySelectorAll('[role=tab]'));
    var print = document.getElementById('print');
    if (print) print.addEventListener('click', function () { window.print(); });
    function visible() { return tabs.filter(function (t) { return t.offsetParent !== null; }); }
    function select(t, focus) {
      var v = t.getAttribute('data-view');
      lastView = v;
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute('aria-selected', on);
        x.tabIndex = on ? 0 : -1;
        document.getElementById(x.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) t.focus();
      var id = location.hash.split('/')[2];
      history.replaceState(null, '', href(id, v));
      live.textContent = VIEW_LABEL[v] + ' angezeigt';
      var bar = app.querySelector('.switch');
      if (bar && bar.getBoundingClientRect().top <= 0) bar.scrollIntoView({ block: 'start' });
    }
    tabs.forEach(function (t) {
      t.addEventListener('click', function () { select(t, false); });
      t.addEventListener('keydown', function (e) {
        var vis = visible(), i = vis.indexOf(t), n = null;
        if (e.key === 'ArrowRight') n = vis[(i + 1) % vis.length];
        else if (e.key === 'ArrowLeft') n = vis[(i - 1 + vis.length) % vis.length];
        else if (e.key === 'Home') n = vis[0];
        else if (e.key === 'End') n = vis[vis.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  }

  /* ---------- routing / focus ---------- */
  function setHeading(h, announce) {
    live.textContent = announce;
    if (h && !firstRender) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); window.scrollTo(0, 0); }
  }
  var firstRender = true;

  function route() {
    var p = location.hash.replace(/^#\/?/, '').split('/');
    if (p[0] === 'w' && p[1]) renderWorld(p[1], p[2] || 'heute');
    else renderAtlas();
    firstRender = false;
  }

  wide.addEventListener ? wide.addEventListener('change', function (e) {
    if (!e.matches && lastView === 'vergleich') { var id = location.hash.split('/')[2]; if (id) { history.replaceState(null, '', href(id, 'heute')); route(); } }
  }) : null;
  window.addEventListener('hashchange', route);
  route();
})();
