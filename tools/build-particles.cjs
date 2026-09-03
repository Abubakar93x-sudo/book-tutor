// Build quran-particles-data.js — the prefixes, suffixes and pronouns that get
// attached to the 300 roots.
//
// THE ARABIC IS NEVER TYPED HERE. The source file gives a consonantal skeleton
// (كتبه) and an English gloss; this looks the skeleton up in quran-text.js and
// writes back the exact vowelled token the muṣḥaf uses, with how often it
// occurs. Every verse is likewise pulled from the corpus by searching for one
// of the entry's own example words — never quoted from memory.
//
// That is the whole point of the file: the same discipline as
// tools/build-roots300.cjs, after an audit found hand-typed forms that were not
// in the corpus at all.
//
//   node tools/build-particles.cjs           # write the data file
//   node tools/build-particles.cjs --check   # report only, write nothing
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const load = (f, e) => new Function(fs.readFileSync(path.join(ROOT, f), 'utf8') + '\nreturn ' + e + ';')();
const { QURAN_TEXT, QURAN_SURAHS } = load('quran-text.js', '{ QURAN_TEXT, QURAN_SURAHS }');
const SOURCE = JSON.parse(fs.readFileSync(path.join(__dirname, 'particles-source.json'), 'utf8'));

// Same normalisation as tools/root-forms.cjs, so "the same word" means the same
// thing in both builders.
const strip = s => String(s).replace(/[ً-ْٓ-ٰٕۖ-ۭـ]/g, '');
const norm  = s => strip(s).replace(/[آأإٱ]/g, 'ا')
                           .replace(/ى/g, 'ي').replace(/ؤ/g, 'و')
                           .replace(/ئ/g, 'ي').replace(/ة/g, 'ه');

const surahName = n => (QURAN_SURAHS.find(s => s[0] === n) || [, `Surah ${n}`])[1];

// ── THE INDEX: every distinct wordform, keyed by its bare skeleton ───────────
const BY_BARE = new Map();      // skeleton → Map(vowelled form → count)
const WHERE   = new Map();      // vowelled form → [refs]
for (const [ref, text] of Object.entries(QURAN_TEXT)) {
  for (const raw of String(text).split(/\s+/)) {
    const word = raw.replace(/[۝۞۩࣢]/g, '').trim();
    if (!word) continue;
    const bare = norm(word);
    if (!bare) continue;
    if (!BY_BARE.has(bare)) BY_BARE.set(bare, new Map());
    const forms = BY_BARE.get(bare);
    forms.set(word, (forms.get(word) || 0) + 1);
    if (!WHERE.has(word)) WHERE.set(word, []);
    if (WHERE.get(word).length < 40) WHERE.get(word).push(ref);
  }
}

// The commonest spelling of a skeleton, unless the entry asked for one that
// matches a pattern (two words can share a skeleton — كَتَبَهُ and كِتَٰبَهُۥ both
// bare down to كتبه — and only the entry knows which one its gloss describes).
function pickForm(bare, prefer) {
  const forms = BY_BARE.get(norm(bare));
  if (!forms) return null;
  let rows = [...forms.entries()].map(([word, count]) => ({ word, count }));
  if (prefer) {
    const re = new RegExp(prefer);
    const hit = rows.filter(r => re.test(r.word));
    if (!hit.length) return { missingPrefer: true, rows };
    rows = hit;
  }
  rows.sort((a, b) => b.count - a.count);
  return { ...rows[0], alternatives: rows.slice(1, 4) };
}

// A verse the learner can meet the form in: the shortest ayah that actually
// contains one of this entry's own examples. Short, because a card is read at a
// glance and a forty-word ayah is not.
function verseFor(words) {
  let best = null;
  for (const w of words) {
    for (const ref of (WHERE.get(w) || [])) {
      const text = QURAN_TEXT[ref];
      const len = text.split(/\s+/).length;
      if (len < 4 || len > 14) continue;      // long enough to be a sentence
      if (!best || len < best.len) best = { ref, text, len };
    }
  }
  if (!best) {                                 // nothing short: take anything
    for (const w of words) {
      const ref = (WHERE.get(w) || [])[0];
      if (ref) { best = { ref, text: QURAN_TEXT[ref], len: 0 }; break; }
    }
  }
  return best && { ref: best.ref, surah: `Sūrat ${surahName(+best.ref.split(':')[0])}`,
                   text: best.text };
}

// ── BUILD ────────────────────────────────────────────────────────────────────
const problems = [];
const thin = [];
const entries = [];
const seenId = new Set();
let n = 0;

for (const group of SOURCE.groups) {
  for (const src of group.entries) {
    if (seenId.has(src.id)) problems.push(`duplicate id ${src.id}`);
    seenId.add(src.id);

    const examples = [];
    for (const ex of src.seek) {
      const found = pickForm(ex.bare, ex.prefer);
      if (!found) { problems.push(`${src.id}: no Qur'anic word matches «${ex.bare}»`); continue; }
      if (found.missingPrefer) {
        problems.push(`${src.id}: «${ex.bare}» has no form matching /${ex.prefer}/ — ` +
          `saw ${found.rows.map(r => r.word).join(', ')}`);
        continue;
      }
      examples.push({ word: found.word, gloss: ex.gloss, count: found.count });
      if (found.alternatives.length && process.env.VERBOSE) {
        console.log(`  note ${src.id} «${ex.bare}» → ${found.word} (${found.count}×), ` +
          `also ${found.alternatives.map(a => `${a.word} ${a.count}×`).join(', ')}`);
      }
    }
    // One example is fine for a word that IS the entry — أَنتُمَا is not
    // illustrated by a second أَنتُمَا. Zero is a real problem.
    if (!examples.length) problems.push(`${src.id}: no verified example words`);
    else if (examples.length < 2) thin.push(src.id);

    const verse = verseFor(examples.map(e => e.word));
    if (!verse) problems.push(`${src.id}: no verse found`);

    entries.push({
      id: src.id, n: ++n, group: group.id, form: src.form, translit: src.translit,
      gloss: src.gloss, role: src.role, attaches: src.attaches || '',
      note: src.note || '',
      examples: examples.map(({ word, gloss }) => ({ word, gloss })),
      count: examples.reduce((a, e) => a + e.count, 0),
      verse
    });
  }
}

console.log(`${entries.length} entries across ${SOURCE.groups.length} groups, ` +
  `${entries.reduce((a, e) => a + e.examples.length, 0)} verified example words.`);
if (thin.length) console.log(`${thin.length} entry(ies) with a single example: ${thin.join(', ')}`);
if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  for (const p of problems) console.log('  ' + p);
}
if (process.argv.includes('--check')) process.exit(problems.length ? 1 : 0);
if (problems.length) { console.log('\nNot written — fix the source first.'); process.exit(1); }

const groups = SOURCE.groups.map(g => ({
  id: g.id, title: g.title, blurb: g.blurb,
  from: entries.find(e => e.group === g.id).n,
  to: [...entries].reverse().find(e => e.group === g.id).n
}));

const out = `// ============================================================================
// BookTutor — the Qur'anic prefixes, suffixes and pronouns (quran-particles-data.js)
//
// The second Qur'anic vocabulary section. The 300 roots in quran-roots-data.js
// are the meanings; this is the machinery that gets attached to them — the
// prefixes on the front, the endings on the back, and the pronouns that stand
// alone or cling to a word.
//
// GENERATED — do not hand-edit. Re-run tools/build-particles.cjs, which reads
// tools/particles-source.json.
//
// EVERY ARABIC STRING HERE CAME OUT OF THE CORPUS. The source file gives only a
// consonantal skeleton and an English gloss; the builder looks it up in
// quran-text.js and writes back the exact vowelled spelling the muṣḥaf uses,
// with how often it occurs. Verses are found by searching for the entry's own
// example words. Nothing was typed from memory, which is the one way a form
// that is not in the Qur'an gets onto a card.
//
// ${entries.length} entries · ${groups.length} groups · ${entries.reduce((a, e) => a + e.examples.length, 0)} example words
// ============================================================================

const QURAN_PARTICLE_GROUPS = ${JSON.stringify(groups, null, 1)};

const QURAN_PARTICLES = ${JSON.stringify(entries, null, 1)};

// Every entry of one group, in order.
function quranParticlesInGroup(id) {
  return QURAN_PARTICLES.filter(p => p.group === id);
}
`;

fs.writeFileSync(path.join(ROOT, 'quran-particles-data.js'), out);
console.log(`\nWrote quran-particles-data.js (${(out.length / 1024).toFixed(0)} KB).`);
