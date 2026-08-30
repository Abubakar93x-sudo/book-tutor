// ============================================================================
// BookTutor — auditing the 300 roots (tools/audit-roots.cjs)
//
// He found ن و س glossed "people, mankind" and said the word for people is ناس.
// He was right about the part that matters: ن و س IS the root of ٱلنَّاس, but the
// root's own sense is "to sway, move to and fro" — the gloss described the
// derived word instead of the root. That is a class of error, not one entry.
//
// Checking the rest found three more, all measured:
//
//   · 82 family entries were PHRASES (مِنَ ٱلنَّاسِ, لَا تَظْلِمُونَ)
//   · 286 of 1,631 were not a single Qur'anic token at all — dictionary forms
//     like رَحْمَٰنٌ and غَفَّارٌ, where the page has ٱلرَّحْمَٰنِ and غَفُورٌ
//   · 69 roots listed the same word twice under different prefixes
//
// All of it traces to one bug of mine: `occurs()` tested whether a string
// appeared ANYWHERE INSIDE A VERSE. A phrase does. A citation form sitting
// inside a longer word does. That is fixed in the builders — the test is now
// membership of the set of Qur'anic tokens — and this script repairs the data
// that the broken test let through.
//
// THE MODEL PROPOSES, THE CORPUS DECIDES, same as everywhere else here: every
// Arabic string that comes back must be a single token in quran-text.js AND
// carry the root's radicals, or it is dropped.
//
// Usage:  OAI=sk-... node tools/audit-roots.cjs [--batch 6] [--jobs 4] [--fresh]
// ============================================================================

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(__dirname, 'roots300-corrections.json');
const KEY = process.env.OAI;
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const MODEL = arg('model', 'gpt-5.2');
const JOBS  = parseInt(arg('jobs', '4'), 10);
const BATCH = parseInt(arg('batch', '6'), 10);
const FRESH = argv.includes('--fresh');
const TARGET = 6;

if (!KEY) { console.error('Set OAI to an OpenAI key.'); process.exit(1); }

const load = (f, e) =>
  new Function(fs.readFileSync(path.join(ROOT, f), 'utf8') + '\nreturn ' + e + ';')();
const QURAN_TEXT = load('quran-text.js', 'QURAN_TEXT');
const ROOTS = load('quran-roots-data.js', 'QURAN_ROOTS');
const { carries, formsFor } = require('./root-forms.cjs');

const bare = s => String(s)
  .replace(/[ً-ْٓ-ٰٕۖ-ۭـ]/g, '')
  .replace(/[آأإٱ]/g, 'ا')
  .replace(/ى/g, 'ي').replace(/ة/g, 'ه').trim();

const TOKENS = new Set();
for (const text of Object.values(QURAN_TEXT)) {
  for (const w of String(text).split(/\s+/)) {
    const c = bare(w.replace(/[^ء-ٰٟ-ۭ]/g, ''));
    if (c) TOKENS.add(c);
  }
}
const isWord = w => { const n = bare(w); return n.length > 1 && !/\s/.test(n) && TOKENS.has(n); };

// The stem, with clitics off, so ٱلنَّاسِ and لِلنَّاسِ are seen as one word.
const stem = w => bare(w).replace(/^(وبال|فبال|وال|فال|بال|كال|لل|ال|و|ف|ب|ك|ل)/, '');

// ── WHAT IS WRONG WITH EACH ROOT, STATED FOR THE MODEL ───────────────────────
function faultsOf(entry) {
  const out = [];
  const seen = new Set();
  for (const f of entry.family || []) {
    if (/\s/.test(f.word.trim())) out.push(`"${f.word}" is a phrase, not a word`);
    else if (!isWord(f.word)) out.push(`"${f.word}" is not a word the Qur'an contains`);
    else if (!carries(f.word, entry.root)) out.push(`"${f.word}" may not belong to this root`);
    const k = stem(f.word);
    if (seen.has(k)) out.push(`"${f.word}" repeats a word already listed`);
    seen.add(k);
  }
  if (!isWord(entry.headword)) out.push(`headword "${entry.headword}" is not a single Qur'anic word`);
  else if (!carries(entry.headword, entry.root)) out.push(`headword "${entry.headword}" may not belong to this root`);
  return out;
}

function prompt(batch) {
  return `You are auditing a Qur'anic Arabic root list. For each root below,
correct what is wrong and leave alone what is right.

${batch.map(e => {
  const faults = faultsOf(e);
  const real = formsFor(e.root, 14).map(f => f.form).join('، ');
  return `ROOT ${e.root} (${e.translit})
  current meaning: "${e.gloss}"
  current words:   ${(e.family || []).map(f => `${f.word} = ${f.gloss}`).join(' | ')}
  known problems:  ${faults.length ? faults.join('; ') : 'none found automatically'}
  forms found in the text for this root: ${real}`;
}).join('\n\n')}

For each root return:

"gloss" — THE ROOT'S OWN MEANING FIRST, then what it yields in the Qur'an if
  those differ. This is the correction that matters most: ن و س means "to sway,
  move to and fro" and only THEREFORE gives ٱلنَّاس, the people. A gloss that
  names the derived word and stops is wrong. Keep the existing wording when it
  is already the root's sense. One line.
"note" — only if scholars genuinely disagree about the root (ٱلنَّاس is filed
  under ن و س by some and أ ن س by others). Otherwise omit. Do not invent doubt.
"family" — ${TARGET} words built on this root, each { "word", "gloss" }:
  · EVERY word must be a SINGLE WORD EXACTLY AS THE QUR'AN WRITES IT, fully
    vowelled — ٱلرَّحْمَٰنِ, not رَحْمَٰنٌ. Prefer the forms listed above, which
    were taken from the text.
  · no phrases, no two-word expressions
  · no two entries that are the same word with a different prefix
  · every word must really be from THIS root
  · the gloss describes THAT form ("they write", "the Book"), not the root
  Keep existing entries that are already correct; replace only what is wrong.

Return ONLY valid JSON:
{ "roots": [ { "root": "${batch[0].root}", "gloss": "...", "family": [{ "word": "...", "gloss": "..." }] } ] }`;
}

function chat(text, maxTokens = 9000) {
  const body = JSON.stringify({
    model: MODEL,
    messages: [
      { role: 'system', content: 'You are a Quranic Arabic lexicographer. Reply with a single valid json object and nothing else.' },
      { role: 'user', content: text }
    ],
    max_completion_tokens: maxTokens,
    response_format: { type: 'json_object' }
  });
  const out = execFileSync('curl', ['-sS', '-X', 'POST',
    'https://api.openai.com/v1/chat/completions',
    '-H', 'Content-Type: application/json', '-H', `Authorization: Bearer ${KEY}`,
    '--data-binary', '@-'], { input: body, maxBuffer: 1 << 28, timeout: 900000 }).toString();
  const j = JSON.parse(out);
  if (j.error) throw new Error(j.error.message);
  return JSON.parse(j.choices[0].message.content);
}

let fixed = {};
if (!FRESH && fs.existsSync(OUT)) { fixed = JSON.parse(fs.readFileSync(OUT, 'utf8')); delete fixed._comment; }
const save = () => fs.writeFileSync(OUT, JSON.stringify({
  _comment: 'GENERATED by tools/audit-roots.cjs. Corrected root glosses and family ' +
            'words, merged into quran-roots-data.js by build-roots300.cjs. Every ' +
            'Arabic string here is a single token of quran-text.js carrying its root.',
  ...fixed
}, null, 1));

(async () => {
  const targets = ROOTS.filter(e => !fixed[e.root]);
  const withFaults = ROOTS.filter(e => faultsOf(e).length).length;
  console.log(`${ROOTS.length} roots · ${withFaults} have at least one detectable fault · ` +
    `${targets.length} still to audit\n`);
  if (!targets.length) { console.log('Nothing to do.'); process.exit(0); }

  const batches = [];
  for (let i = 0; i < targets.length; i += BATCH) batches.push(targets.slice(i, i + BATCH));

  const stats = { glossChanged: 0, wordsKept: 0, wordsDropped: 0, thin: 0, failed: 0 };
  let cursor = 0, done = 0;
  const t0 = Date.now();

  const worker = async () => {
    while (cursor < batches.length) {
      const b = batches[cursor++];
      let got;
      try { got = chat(prompt(b)); }
      catch (err) { stats.failed++; console.log(`\n  batch failed: ${err.message.slice(0, 90)}`); continue; }

      for (const row of got.roots || []) {
        const entry = b.find(e => bare(e.root) === bare(row.root));
        if (!entry) continue;

        const seen = new Set();
        const family = [];
        for (const f of row.family || []) {
          if (!f?.word || !f?.gloss) continue;
          if (!isWord(f.word)) { stats.wordsDropped++; continue; }
          if (!carries(f.word, entry.root)) { stats.wordsDropped++; continue; }
          const k = stem(f.word);
          if (seen.has(k)) { stats.wordsDropped++; continue; }
          seen.add(k);
          family.push({ word: f.word, gloss: String(f.gloss).trim() });
          stats.wordsKept++;
          if (family.length >= TARGET) break;
        }
        if (!family.length) { stats.thin++; continue; }
        if (family.length < 3) stats.thin++;
        if (row.gloss && row.gloss.trim() !== entry.gloss) stats.glossChanged++;

        fixed[entry.root] = {
          gloss: (row.gloss || entry.gloss).trim(),
          ...(row.note ? { note: String(row.note).trim() } : {}),
          family
        };
      }
      done += b.length;
      save();
      process.stdout.write(`\r  ${done}/${targets.length} roots · ${stats.wordsKept} words kept · ` +
        `${stats.wordsDropped} rejected · ${((Date.now() - t0) / 1000).toFixed(0)}s   `);
    }
  };
  await Promise.all(Array.from({ length: JOBS }, worker));
  save();

  console.log('\n');
  console.log(`  ${stats.glossChanged} root meanings corrected`);
  console.log(`  ${stats.wordsKept} words kept, ${stats.wordsDropped} rejected by the corpus`);
  if (stats.thin) console.log(`  ${stats.thin} root(s) came back with fewer than 3 usable words`);
  if (stats.failed) console.log(`  ${stats.failed} batch(es) failed outright`);
  console.log(`\nWrote ${OUT}. Now re-run: node tools/build-roots300.cjs`);
})();
