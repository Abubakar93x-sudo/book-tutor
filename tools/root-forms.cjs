// Find the real Quranic wordforms belonging to a root, by searching the text.
//
// No model is involved: a form is listed because it is in the muṣḥaf, and its
// count is how often it is actually there. That makes the family and the
// frequency facts rather than claims.
//
// The matching is deliberately strict. A loose matcher "finds" ل ق ي inside
// لَقَدْ, ٱلْحَقُّ and خَلَقَ, because those letters do occur in order — so the
// root letters must sit in the word's STEM (after clitics come off) separated
// only by letters a pattern is allowed to insert.
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const load = (f, e) => new Function(fs.readFileSync(path.join(ROOT, f), 'utf8') + '\nreturn ' + e + ';')();
const QURAN_TEXT = load('quran-text.js', 'QURAN_TEXT');

const strip = s => String(s).replace(/[ً-ْٓ-ٰٕۖ-ۭـ]/g, '');
const norm  = s => strip(s).replace(/[آأإٱ]/g, 'ا').replace(/ى/g, 'ي').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/ة/g, 'ه');

// Letters a pattern may add between root consonants: the long vowels, the
// augment consonants of the ten forms (ت ن م س), and hamza seats.
const FILLER = new Set([...'اويتنمسه']);
// Clitics: what attaches in front of a stem, longest first.
const PRE  = ['فبال','ولل','وبال','فال','بال','كال','لل','ال','وا','فا','و','ف','ب','ك','ل','س','ا'];
const SUF  = ['كموهن','تموهم','ناهم','كموه','وهما','تموا','ونها','هما','كما','هم','هن','كم','كن','نا','ها','ني','ون','ين','ات','وا','ان','تم','ت','ه','ك','ي','ا','ن','م'];

function stems(word) {
  const w = norm(word);
  const out = new Set([w]);
  for (const p of PRE) if (w.startsWith(p) && w.length - p.length >= 2) {
    const a = w.slice(p.length); out.add(a);
    for (const s of SUF) if (a.endsWith(s) && a.length - s.length >= 2) out.add(a.slice(0, -s.length));
  }
  for (const s of SUF) if (w.endsWith(s) && w.length - s.length >= 2) out.add(w.slice(0, -s.length));
  return [...out];
}

// The root's letters, in order, inside this stem — with only filler between,
// and no more than one weak letter missing (weak letters genuinely drop:
// قال has no و, يَقُلْ has no ا).
const WEAK = new Set([...'اوي']);
function stemCarries(stem, letters) {
  let i = 0, dropped = 0;
  for (let k = 0; k < letters.length; k++) {
    const L = letters[k];
    let at = -1;
    for (let j = i; j < stem.length; j++) {
      if (stem[j] !== L) continue;
      // every letter skipped over must be one a pattern could have inserted
      let ok = true;
      for (let x = i; x < j; x++) if (!FILLER.has(stem[x])) { ok = false; break; }
      if (ok) { at = j; break; }
    }
    if (at < 0) {
      if (WEAK.has(L) && dropped === 0) { dropped++; continue; }
      return false;
    }
    i = at + 1;
  }
  // Nothing but filler may trail the last root letter, or ملك would match ملائكة
  // by way of a stem that keeps going.
  for (let x = i; x < stem.length; x++) if (!FILLER.has(stem[x])) return false;
  return true;
}

// A doubled final radical surfaces as ONE letter carrying a shadda — ش ر ر is
// written شَرّ, ض ر ر is ضَرّ — so a geminate root is also tried in its
// two-letter shape, or its commonest words are invisible to the search.
const carries = (word, root) => {
  const letters = [...norm(root)];
  const shapes = [letters];
  if (letters.length === 3 && letters[1] === letters[2]) shapes.push(letters.slice(0, 2));
  return stems(word).some(s => shapes.some(sh => stemCarries(s, sh)));
};

const FORMS = new Map();
for (const [ref, text] of Object.entries(QURAN_TEXT)) {
  for (const w of String(text).split(/\s+/)) {
    const clean = w.replace(/[^ء-ْٓ-ٰٕۖ-ۭ]/g, '');
    const key = strip(clean);
    if (!key) continue;
    if (!FORMS.has(key)) FORMS.set(key, { form: clean, n: 0, refs: [] });
    const e = FORMS.get(key);
    e.n++;
    if (e.refs.length < 3) e.refs.push(ref);
  }
}

function formsFor(root, limit = 40) {
  const out = [];
  for (const [, e] of FORMS) if (carries(e.form, root)) out.push(e);
  return out.sort((a, b) => b.n - a.n).slice(0, limit);
}
const total = root => formsFor(root, 1e9).reduce((s, e) => s + e.n, 0);

module.exports = { formsFor, total, FORMS, norm, strip, carries };

if (require.main === module) {
  for (const root of process.argv.slice(2)) {
    const f = formsFor(root, 10);
    console.log(`\n${root} — ${total(root)}x`);
    console.log(f.map(e => `  ${e.form}  ${e.n}x  ${e.refs[0]}`).join('\n'));
  }
}
