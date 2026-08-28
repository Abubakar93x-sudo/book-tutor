// ============================================================================
// BookTutor — the 300-root list (tools/build-roots300.cjs)
//
// Writes quran-roots-data.js from the learner's own list of 300 roots, the one
// he built in his ChatGPT session and pasted in: five sets of sixty, each row
// `# / root / core meaning`.
//
// It is his list, so the order is his and the meanings are his. Three things
// are done to it, each because he asked for them:
//
//   1. EVERY ROW BECOMES A ROOT. He wrote some rows as words — قال is a form of
//      ق و ل, سماء of س م و, رحمة of ر ح م — and said the main thing is that
//      each entry be a root. tools/roots300-map.json resolves each written form
//      to the root behind it.
//
//   2. NO ROW APPEARS TWICE. 92 of the 300 rows repeated an earlier root; ظلم
//      was there five times. A repeat keeps nothing but its MEANING, which is
//      folded into the first row's gloss so none of his wording is lost, and
//      the row itself is refilled with the highest-frequency root from the
//      corpus data that his list never reached.
//
//   3. EVERY ROOT CARRIES ITS WORDS. The family and the example verse come from
//      quran-vocab-data.js where it has them, and from
//      tools/roots300-new-families.json for the roots his list added. Every
//      Arabic string in both is checked against quran-text.js here, at build
//      time, and dropped if it does not occur — so a card cannot teach a word
//      the Qur'an does not contain.
//
// Usage:  node tools/build-roots300.cjs [--dry]
// ============================================================================

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'quran-roots-data.js');
const DRY = process.argv.includes('--dry');

const load = (f, e) =>
  new Function(fs.readFileSync(path.join(ROOT, f), 'utf8') + '\nreturn ' + e + ';')();

const QURAN_TEXT   = load('quran-text.js', 'QURAN_TEXT');
const QURAN_SURAHS = load('quran-text.js', 'QURAN_SURAHS');
const OLD_ROOTS    = load('quran-roots-data.js', 'QURAN_ROOTS').filter(r => r.kind === 'root');
const VOCAB        = load('quran-vocab-data.js', 'QURAN_VOCAB');

const MAP      = JSON.parse(fs.readFileSync(path.join(__dirname, 'roots300-map.json'), 'utf8'));
const NEW_FAM  = JSON.parse(fs.readFileSync(path.join(__dirname, 'roots300-new-families.json'), 'utf8'));
// The top-up layer, written by build-root-families.cjs: extra wordforms for the
// roots whose families came back thin. Optional — the build works without it,
// it just ships fewer words per root.
const EXTRA_PATH = path.join(__dirname, 'roots300-extra-families.json');
const EXTRA = fs.existsSync(EXTRA_PATH)
  ? JSON.parse(fs.readFileSync(EXTRA_PATH, 'utf8')) : {};
delete MAP._comment; delete NEW_FAM._comment; delete EXTRA._comment;

const SOURCE = fs.readFileSync(path.join(__dirname, 'roots300-source.txt'), 'utf8')
  .trim().split('\n').map(line => {
    const [n, written, meaning] = line.split('\t');
    return { n: +n, written: written.trim(), meaning: meaning.trim() };
  });

// ── THE CORPUS ──────────────────────────────────────────────────────────────
const bare = s => String(s)
  .replace(/[ً-ْٓ-ٰٕۖ-ۭـ]/g, '').replace(/[آأإٱ]/g, 'ا')
  .replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim();

const VERSES = Object.entries(QURAN_TEXT).map(([ref, text]) => [ref, text, bare(text)]);
const surahName = n => (QURAN_SURAHS.find(s => s[0] === n) || [, `Surah ${n}`])[1];

// A word occurs, and here is the shortest verse that shows it doing so. Short
// verses make better examples: the word has somewhere to stand.
function findVerse(word) {
  const needle = bare(word);
  if (needle.length < 2) return null;
  let best = null;
  for (const [ref, text, flat] of VERSES) {
    if (!flat.includes(needle) || text.length < 25) continue;
    if (!best || text.length < best.text.length) best = { ref, text };
  }
  return best && { ref: best.ref, surah: `Sūrat ${surahName(+best.ref.split(':')[0])}`, text: best.text };
}
const occurs = w => VERSES.some(([, , flat]) => flat.includes(bare(w)));

// How often the family's forms are actually in the text. An undercount rather
// than a guess: it counts the forms this root ships with, not every form it
// could have, and coverage reading low is the safe direction to be wrong in.
function countForms(family) {
  let n = 0;
  for (const f of family) {
    const needle = bare(f.word);
    for (const [, , flat] of VERSES) {
      let at = flat.indexOf(needle);
      while (at >= 0) { n++; at = flat.indexOf(needle, at + 1); }
    }
  }
  return n;
}

// ── RESOLVE, DEDUPE, BACKFILL ───────────────────────────────────────────────
const byLetters = new Map(OLD_ROOTS.map(r => [r.root.replace(/ /g, ''), r]));
const stats = { repeats: 0, unresolved: 0, dropped: 0, newRoots: 0 };

// Pass one: resolve every row to a root, and note which rows are repeats. A
// repeat's MEANING still counts — he wrote five different glosses for ظلم and
// they are five real facets of it — so it is merged into the row that keeps it.
const firstAt = new Map();
const extraMeanings = new Map();
const rows = SOURCE.map(row => {
  const root = MAP[row.written] ?? null;
  if (!root) { stats.unresolved++; return { ...row, root: null }; }
  if (firstAt.has(root)) {
    stats.repeats++;
    if (!extraMeanings.has(root)) extraMeanings.set(root, []);
    extraMeanings.get(root).push(row.meaning);
    return { ...row, root: null, wasRepeatOf: root };
  }
  firstAt.set(root, row.n);
  return { ...row, root };
});

// Merge the repeats' wording into the row that survives, without repeating a
// word he already used there.
function mergedMeaning(root, base) {
  const extra = extraMeanings.get(root) || [];
  const seen = new Set(base.toLowerCase().split(/[,;]\s*/).map(s => s.trim()));
  const add = [];
  for (const m of extra) {
    for (const part of m.split(/[,;]\s*/).map(s => s.trim())) {
      const k = part.toLowerCase();
      if (!k || seen.has(k)) continue;
      seen.add(k); add.push(part);
    }
  }
  return [base, ...add].join(', ');
}

// Pass two: the emptied rows take the highest-frequency roots his list never
// reached, in place, so his ordering and his set boundaries survive.
const used = new Set(rows.filter(r => r.root).map(r => r.root));
const spare = OLD_ROOTS
  .filter(r => !used.has(r.root.replace(/ /g, '')))
  .sort((a, b) => b.count - a.count);
let spareAt = 0;

for (const row of rows) {
  if (row.root) continue;
  const fill = spare[spareAt++];
  if (!fill) { stats.dropped++; continue; }
  row.root = fill.root.replace(/ /g, '');
  row.meaning = fill.gloss;
  row.backfilled = true;
  used.add(row.root);
}

// ── ATTACH THE WORDS ────────────────────────────────────────────────────────
const vocabByRoot = new Map(VOCAB.map(c => [String(c.root).replace(/ /g, ''), c]));
const asciiId = s => s.replace(/[^a-z]/gi, '').toLowerCase();
// Ids have to be unique — they key progress, the lemma cache and every card
// already in a deck — so a collision takes a suffix rather than silently
// merging two roots into one.
const takenIds = new Set();
function mintId(preferred, root, n) {
  let id = preferred || asciiId(root) || `r${n}`;
  if (!takenIds.has(id)) { takenIds.add(id); return id; }
  for (let k = 2; ; k++) { const t = `${id}${k}`; if (!takenIds.has(t)) { takenIds.add(t); return t; } }
}

const entries = rows.filter(r => r.root).map((row, i) => {
  const n = i + 1;
  const old = byLetters.get(row.root);
  const card = vocabByRoot.get(row.root);
  const fresh = NEW_FAM[row.root];
  if (fresh) stats.newRoots++;

  // The family, verified here rather than trusted. Anything the corpus does not
  // contain is dropped, whoever proposed it.
  // A card that exists but ships an EMPTY family must still fall through to the
  // written one — `[] || fallback` keeps the empty array, which is how كرس lost
  // its only word.
  const proposed = card?.family?.length ? card.family
    : (fresh?.family?.map(([word, gloss]) => ({ word, gloss })) || []);
  // The card's family first, then the top-up, deduplicated on the bare form so
  // the same word written two ways cannot appear twice.
  const seenForm = new Set();
  let family = [...proposed, ...(EXTRA[row.root] || [])]
    .filter(f => f.word && occurs(f.word))
    .filter(f => { const k = bare(f.word); if (seenForm.has(k)) return false; seenForm.add(k); return true; })
    .slice(0, 6);

  // The card front stays a real vowelled wordform — never the bare letters,
  // which are not a word and appear nowhere in the muṣḥaf.
  const headword = (card?.headword && occurs(card.headword)) ? card.headword : (family[0]?.word || '');
  const headwordGloss = card?.headword === headword
    ? (card.headwordGloss || '') : (family[0]?.gloss || '');

  const verse = card?.verse || (headword ? findVerse(headword) : null);

  return {
    id: mintId(old?.id || asciiId(fresh?.translit || ''), row.root, n),
    n, set: Math.ceil(n / 60),
    kind: 'root',
    root: row.root,                                   // joined, as he wrote it
    translit: old?.translit || fresh?.translit || '',
    gloss: row.backfilled ? row.meaning : mergedMeaning(row.root, row.meaning),
    count: old?.count || countForms(family),
    headword, headwordGloss,
    family, verse
  };
});

// ── REPORT AND WRITE ────────────────────────────────────────────────────────
const ids = new Set(entries.map(e => e.id));
const roots = new Set(entries.map(e => e.root));
console.log(`${entries.length} roots · ${roots.size} distinct · ${ids.size} distinct ids`);
console.log(`  ${stats.repeats} repeated rows refilled from the corpus`);
console.log(`  ${stats.unresolved} row(s) had no root behind them and were refilled too`);
console.log(`  ${stats.newRoots} roots came from his list rather than the old data`);
console.log(`  ${entries.filter(e => !e.family.length).length} without a family`);
console.log(`  ${entries.filter(e => !e.verse).length} without a verse`);
console.log(`  ${entries.filter(e => !e.headword).length} without a headword`);
if (stats.dropped) console.log(`  ${stats.dropped} row(s) could not be filled — ran out of spare roots`);

const problems = entries.filter(e => !e.family.length || !e.headword || !e.verse);
if (problems.length) console.log('  incomplete: ' + problems.map(e => e.root).join(' '));
if (roots.size !== entries.length) { console.error('REFUSING: duplicate roots survived'); process.exit(1); }
if (ids.size !== entries.length)   { console.error('REFUSING: duplicate ids'); process.exit(1); }
if (entries.length !== 300)        { console.error(`REFUSING: ${entries.length} roots, expected 300`); process.exit(1); }
if (DRY) { console.log('\n--dry: nothing written'); process.exit(0); }

const total = entries.reduce((s, e) => s + e.count, 0);
fs.writeFileSync(OUT,
`// ============================================================================
// BookTutor — the 300 Qur'anic roots (quran-roots-data.js)
//
// GENERATED — do not hand-edit. Re-run tools/build-roots300.cjs, which builds
// this from tools/roots300-source.txt: the learner's own list of 300 roots,
// written in his ChatGPT session, in five sets of sixty.
//
// The order is his. The meanings are his words, with the wording from his
// repeated rows merged in rather than thrown away. Roots are written JOINED —
// كتب, not ك ت ب — because that is how a root list is written and how he wrote
// it; the spaced form was never a word anyone meets on the page.
//
// Where his list repeated a root, the row was refilled with the highest-
// frequency root his list never reached, so there are 300 DISTINCT roots and
// none of the sixty-slots are spent twice on the same one.
//
// Every Arabic string below occurs in quran-text.js — checked at build time,
// form by form. \`headword\` is a real vowelled wordform and stays the front of
// the flashcard; \`root\` is what unifies the family and is what the list shows.
//
// \`count\` is approximate: for roots carried over from the corpus data it is
// that data's frequency, and for roots this list added it is how often the
// forms shipped here actually occur — an undercount rather than a guess. It
// sets the coverage estimate only; nothing is ordered by it.
// ============================================================================

const QURAN_TOTAL_WORDS = 77430;

// Sixty at a time, which is the way the course teaches them: five sets you can
// finish, not one list of 300 you abandon at forty.
const QURAN_ROOT_SETS = [
  { set: 1, from: 1,   to: 60,  title: 'Top Qurʾānic Roots' },
  { set: 2, from: 61,  to: 120, title: 'Qurʾānic Roots' },
  { set: 3, from: 121, to: 180, title: 'Qurʾānic Roots' },
  { set: 4, from: 181, to: 240, title: 'Qurʾānic Roots' },
  { set: 5, from: 241, to: 300, title: 'Qurʾānic Roots' }
];

const QURAN_ROOTS = ${JSON.stringify(entries, null, 1)};

// The list is already in the order it is taught in — his order — so the
// sequence is the list. Kept as its own name because the rest of the app asks
// for it by this one.
const QURAN_SEQUENCE = QURAN_ROOTS;

// Fraction of the Quran's tokens covered by the learned entries (0..1)
function quranCoverage(learnedIds = []) {
  const set = new Set(learnedIds);
  const covered = QURAN_ROOTS.reduce((sum, e) => sum + (set.has(e.id) ? e.count : 0), 0);
  return Math.min(1, covered / QURAN_TOTAL_WORDS);
}

// The next entry to teach, in list order
function nextQuranRoot(learnedIds = []) {
  const set = new Set(learnedIds);
  return QURAN_SEQUENCE.find(e => !set.has(e.id)) || null;
}

// The set a root belongs to, and the roots in a set.
function quranRootSet(n) { return QURAN_ROOT_SETS.find(s => n >= s.from && n <= s.to) || null; }
function quranRootsInSet(set) { return QURAN_ROOTS.filter(e => e.set === set); }
`);
console.log(`\nWrote ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(0)}KB), ` +
  `${total.toLocaleString()} tokens covered of ${(77430).toLocaleString()}`);
