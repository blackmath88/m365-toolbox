// Validates worlds.js (schema v2). Usage: node check-worlds.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), 'worlds.js');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(file, 'utf8'), ctx, { filename: file });
const D = ctx.window.HE_WORLDS;

const errors = [], warns = [];
const err = m => errors.push(m), warn = m => warns.push(m);
const isArr = Array.isArray;
const isObj = v => v && typeof v === 'object' && !isArr(v);
const need = (o, keys, where) => {
  if (!isObj(o)) return err(`${where}: not an object`);
  for (const k of keys) if (!(k in o)) err(`${where}: missing key "${k}"`);
};
const uniq = (ids, where) => {
  const seen = new Set();
  for (const id of ids) {
    if (typeof id !== 'string' || !id) err(`${where}: invalid id ${JSON.stringify(id)}`);
    else if (seen.has(id)) err(`${where}: duplicate id "${id}"`);
    seen.add(id);
  }
  return seen;
};
let nulls = 0;
const countNulls = v => {
  if (v === null) nulls++;
  else if (isArr(v)) v.forEach(countNulls);
  else if (isObj(v)) Object.values(v).forEach(countNulls);
};

if (!isObj(D)) { console.error('window.HE_WORLDS missing'); process.exit(1); }
need(D, ['schema', 'status', 'fictional', 'locale', 'purpose', 'sources', 'modules', 'worlds'], 'root');
if (D.schema !== 'm365-toolbox.higher-education-worlds/v2') err(`root: unexpected schema "${D.schema}"`);
const SRC = new Set(Object.keys(D.sources || {}));
for (const k of ['MS', 'P', 'S']) if (!SRC.has(k)) err(`sources: missing "${k}"`);
const STATES = new Set(['personal', 'shared', 'institutional', null]);

const mods = isArr(D.modules) ? D.modules : [];
mods.forEach((m, i) => need(m, ['id', 'nr', 'title', 'question'], `modules[${i}]`));
const modIds = uniq(mods.map(m => m.id), 'modules');

const WKEYS = ['id', 'type', 'name', 'tagline', 'tension', 'unit_type', 'rhythm', 'lifecycle', 'size', 'people',
  'collaboration', 'work_mix', 'personal_vs_shared', 'artefacts', 'scenarios', 'consulting_questions', 'boundary', 'training_hooks'];
const worlds = isArr(D.worlds) ? D.worlds : [];
uniq(worlds.map(w => w.id), 'worlds');
const surnames = new Map();
let nPeople = 0, nArt = 0, nSc = 0, nDp = 0;

for (const w of worlds) {
  const W = `world "${w.id}"`;
  need(w, WKEYS, W);
  countNulls(w);
  const people = isArr(w.people) ? w.people : [];
  people.forEach((p, i) => need(p, ['id', 'name', 'role', 'focus', 'stays_personal', 'shares'], `${W} people[${i}]`));
  const pIds = uniq(people.map(p => p.id), `${W} people`);
  nPeople += people.length;
  for (const p of people) {
    const sn = String(p.name).replace(/^((Prof|Dr)\.\s*)+/, '').trim().split(/\s+/).pop();
    if (!surnames.has(sn)) surnames.set(sn, []);
    surnames.get(sn).push(`${p.name} (${w.id})`);
  }
  need(w.collaboration, ['close_internal', 'occasional_internal', 'external'], `${W} collaboration`);
  if (w.work_mix !== null) need(w.work_mix, ['individual_percent', 'examples'], `${W} work_mix`);
  need(w.personal_vs_shared, ['stays_personal', 'shared', 'moves_to_shared'], `${W} personal_vs_shared`);
  (w.personal_vs_shared?.moves_to_shared || []).forEach((m, i) => need(m, ['when', 'why'], `${W} moves_to_shared[${i}]`));

  const arts = isArr(w.artefacts) ? w.artefacts : [];
  nArt += arts.length;
  arts.forEach((a, i) => need(a, ['id', 'name', 'owner', 'state', 'lifespan', 'sensitivity', 'where_now', 'where_better'], `${W} artefacts[${i}]`));
  uniq(arts.map(a => a.id), `${W} artefacts`);
  for (const a of arts) {
    if (a.owner !== null && !pIds.has(a.owner)) err(`${W} artefact "${a.id}": unknown owner "${a.owner}"`);
    if (!STATES.has(a.state)) err(`${W} artefact "${a.id}": invalid state "${a.state}"`);
  }

  const scs = isArr(w.scenarios) ? w.scenarios : [];
  nSc += scs.length;
  uniq(scs.map(s => s.id), `${W} scenarios`);
  for (const s of scs) {
    const S = `${W} scenario "${s.id}"`;
    need(s, ['id', 'name', 'trigger', 'description', 'stakes', 'stages', 'current_state', 'decision_points', 'm365_model'], S);
    need(s.current_state, ['frictions'], `${S} current_state`);
    (s.stages || []).forEach((g, i) => need(g, ['id', 'stage', 'question'], `${S} stages[${i}]`));
    uniq((s.stages || []).map(g => g.id), `${S} stages`);
    if (s.m365_model !== null) need(s.m365_model, ['team', 'channels', 'planner_buckets', 'notes'], `${S} m365_model`);
    const dps = s.decision_points || [];
    nDp += dps.length;
    uniq(dps.map(d => d.id), `${S} decision_points`);
    dps.forEach((d, i) => {
      const D_ = `${S} decision_points[${i}]`;
      need(d, ['id', 'question', 'modules', 'options', 'pick', 'not_do', 'source'], D_);
      for (const m of d.modules || []) if (!modIds.has(m)) err(`${D_}: unknown module "${m}"`);
      if (!SRC.has(d.source)) err(`${D_}: invalid source "${d.source}"`);
      (d.options || []).forEach((o, j) => need(o, ['label', 'fits_when', 'tradeoff'], `${D_} options[${j}]`));
      need(d.pick, ['label', 'why'], `${D_} pick`);
    });
  }

  const th = w.training_hooks || {};
  for (const m of modIds) {
    if (!(m in th)) err(`${W} training_hooks: missing module "${m}"`);
    else need(th[m], ['prompt', 'decisions'], `${W} training_hooks.${m}`);
  }
  for (const k of Object.keys(th)) if (!modIds.has(k)) err(`${W} training_hooks: unknown module "${k}"`);
}

for (const [sn, list] of surnames) if (list.length > 1) warn(`surname "${sn}" used ${list.length}x: ${list.join(', ')}`);

console.log(`worlds: ${worlds.length}, people: ${nPeople}, artefacts: ${nArt}, scenarios: ${nSc}, decision points: ${nDp}, null fields: ${nulls}`);
warns.forEach(m => console.log('WARN  ' + m));
errors.forEach(m => console.log('ERROR ' + m));
console.log(`${errors.length} error(s), ${warns.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
