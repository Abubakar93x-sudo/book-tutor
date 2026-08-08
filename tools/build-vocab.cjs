// ============================================================================
// BookTutor — the vocabulary builder (tools/build-vocab.cjs)
//
// Writes quran-vocab-data.js: for each of the ~300 roots, the WORD that goes on
// the front of its flashcard and the family of real Quranic forms that goes on
// the back. Like the course builder, this runs on a developer's machine and its
// committed output is what the app reads.
//
// ── WHY THE CARD FRONT CHANGED ──────────────────────────────────────────────
// It used to be the bare root letters — "ك ت ب". That is not a word, and it is
// not what anyone sees when they open the muṣḥaf. They see ٱلْكِتَٰب and
// يَكْتُبُونَ and مَكْتُوبًا. A card fronted with three spaced letters trains
// recognition of something that never appears on the page.
//
// So the front is now ONE REAL QURANIC WORDFORM, fully vowelled, with no
// transliteration and no English on it — both of which turn a recognition drill
// into a recall drill. The root moves to the back, where it belongs: it is what
// UNIFIES the family, not what you meet while reading.
//
// ── VERIFICATION ────────────────────────────────────────────────────────────
// Every wordform this script proposes — the front, and each family member — is
// checked against quran-text.js and dropped if it does not occur. A card that
// teaches a word the Qur'an does not contain is worse than no card. The example
// verse is likewise a real verse, found by search rather than by recall.
//
// Usage:  OAI=sk-... node tools/build-vocab.cjs [--only ktb] [--jobs 4]
// ============================================================================

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'quran-vocab-data.js');
const KEY = process.env.OAI;
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const MODEL = arg('model', 'gpt-5.2');
const ONLY = arg('only', null);
const JOBS = parseInt(arg('jobs', '4'), 10);
const BATCH = parseInt(arg('batch', '10'), 10);

if (!KEY) { console.error('Set OAI to an OpenAI key.'); process.exit(1); }

const load = (file, expr) =>
  new Function(`${fs.readFileSync(path.join(ROOT, file), 'utf8')}\nreturn ${expr};`)();
const QURAN_TEXT = load('quran-text.js', 'QURAN_TEXT');
const QURAN_SURAHS = load('quran-text.js', 'QURAN_SURAHS');
const ROOTS = load('quran-roots-data.js', 'QURAN_ROOTS');

const surahName = (n) => (QURAN_SURAHS.find(s => s[0] === n) || [, `Surah ${n}`])[1];

const bare = (s) => String(s)
  .replace(/[ً-ْٓ-ٰٕۖ-ۭـ]/g, '')
  .replace(/[آأإٱ]/g, 'ا')
  .replace(/ى/g, 'ي')
  .replace(/ة/g, 'ه')
  .replace(/\s+/g, ' ')
  .trim();

// A word occurs in the Qur'an, and here is the shortest verse showing it.
// Searching the corpus is what makes "this word is Quranic" a fact rather than
// a claim — and it hands the card a real verse without anyone recalling one.
const VERSE_INDEX = Object.entries(QURAN_TEXT)
  .map(([ref, text]) => [ref, text, bare(text)]);

function findVerse(word) {
  const needle = bare(word);
  if (needle.length < 2) return null;
  let best = null;
  for (const [ref, text, flat] of VERSE_INDEX) {
    if (!flat.includes(needle)) continue;
    // Short verses make better cards: the word has somewhere to stand.
    if (!best || text.length < best.text.length) {
      if (text.length >= 25) best = { ref, text };
    }
  }
  if (!best) return null;
  return { ref: best.ref, surah: `Sūrat ${surahName(+best.ref.split(':')[0])}`, text: best.text };
}

const occurs = (word) => !!findVerse(word);

// ── THE PROMPT ──────────────────────────────────────────────────────────────
function vocabPrompt(entries) {
  return `For each Arabic root below, give the vocabulary card a learner of
Quranic Arabic should study. Their goal is recognising words while READING the
Qur'an — never speaking, never writing.

${entries.map(e => `  ${e.id}  ${e.root}  (${e.translit})  — ${e.gloss}  · ~${e.count}x in the Qur'an`).join('\n')}

For each root give:

"headword" — THE SINGLE MOST FREQUENT WORDFORM built on this root that actually
  occurs in the Qur'an, written in full Uthmani script WITH all its vowel marks.
  A real word as it appears on the page: ٱلْكِتَٰبُ, not ك ت ب, and not a
  dictionary citation form that never occurs. This goes on the front of the
  card, alone, so it must be a word a reader will genuinely meet.
"headwordGloss" — what THAT wordform means, 1-4 words.
"meaning" — the family's core meaning plus its Quranic sense range, one line.
  e.g. "book; scripture; a written decree — context decides which".
"family" — 4 to 6 OTHER real Quranic wordforms from this root, each as
  { "word": "...", "gloss": "..." }, vowelled, showing the range: a verb, a
  verbal noun, a participle, a plural. Only forms that genuinely occur.

EVERY Arabic string must be a form that really appears in the Qur'an. If you
are unsure whether a form occurs, use a different one you are sure of.

Return ONLY valid JSON:
{ "cards": [ { "id": "${entries[0].id}", "headword": "...", "headwordGloss": "...",
               "meaning": "...", "family": [{ "word": "...", "gloss": "..." }] } ] }`;
}

function chat(prompt, maxTokens = 8000) {
  const body = JSON.stringify({
    model: MODEL,
    messages: [
      { role: 'system', content: 'You are a Quranic Arabic lexicographer. Reply with a single valid json object and nothing else.' },
      { role: 'user', content: prompt }
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

// ── BUILD ───────────────────────────────────────────────────────────────────
(async () => {
  // --only takes a comma list and MERGES back into the existing file, so a
  // handful of roots whose families came back thin can be redone without
  // paying for the other 290.
  const want = ONLY ? new Set(ONLY.split(',').map(s => s.trim())) : null;
  const targets = (want ? ROOTS.filter(r => want.has(r.id)) : ROOTS)
    .filter(r => r.kind === 'root');   // particle groups are already words
  const batches = [];
  for (let i = 0; i < targets.length; i += BATCH) batches.push(targets.slice(i, i + BATCH));

  console.log(`${targets.length} roots in ${batches.length} batches of ${BATCH}, ` +
    `${JOBS} at a time, on ${MODEL}.\n`);

  const cards = {};
  const stats = { headwordDropped: 0, familyDropped: 0, noVerse: 0 };
  let cursor = 0;
  const t0 = Date.now();

  const worker = async () => {
    while (cursor < batches.length) {
      const b = batches[cursor++];
      let got;
      try { got = chat(vocabPrompt(b)); }
      catch (err) { console.log(`  batch failed: ${err.message.slice(0, 80)}`); continue; }

      for (const card of got.cards || []) {
        const entry = b.find(e => e.id === card.id);
        if (!entry || !card.headword) continue;

        // The front must be a word the Qur'an actually contains. If it is not,
        // fall back to the first family member that is — a real word from the
        // right family beats an invented "most frequent form".
        let headword = card.headword;
        let verse = findVerse(headword);
        if (!verse) {
          stats.headwordDropped++;
          const rescue = (card.family || []).find(f => occurs(f.word));
          if (!rescue) { stats.noVerse++; continue; }
          headword = rescue.word;
          card.headwordGloss = rescue.gloss;
          verse = findVerse(headword);
        }

        const family = (card.family || [])
          .filter(f => f.word && bare(f.word) !== bare(headword))
          .filter(f => { const ok = occurs(f.word); if (!ok) stats.familyDropped++; return ok; })
          .slice(0, 6);

        cards[card.id] = {
          id: card.id, root: entry.root, translit: entry.translit,
          count: entry.count, gloss: entry.gloss,
          headword, headwordGloss: card.headwordGloss || '',
          meaning: card.meaning || entry.gloss,
          family, verse
        };
      }
      const done = Object.keys(cards).length;
      process.stdout.write(`\r  ${done}/${targets.length} cards · ` +
        `${((Date.now() - t0) / 1000).toFixed(0)}s   `);
    }
  };
  await Promise.all(Array.from({ length: JOBS }, worker));
  console.log('');

  const list = targets.map(r => cards[r.id]).filter(Boolean);
  console.log(`\n${list.length}/${targets.length} roots have a card`);
  console.log(`  ${stats.headwordDropped} proposed headwords were not in the Qur'an (rescued from the family)`);
  console.log(`  ${stats.familyDropped} family forms dropped for the same reason`);
  console.log(`  ${stats.noVerse} roots produced nothing verifiable at all`);

  if (want) {
    if (!fs.existsSync(OUT)) { console.log(JSON.stringify(list, null, 2)); return; }
    const existing = load(path.basename(OUT), 'QURAN_VOCAB');
    for (const c of list) {
      const at = existing.findIndex(e => e.id === c.id);
      // Only replace when the new card is actually better — a top-up run that
      // came back thinner than what is already there is not an improvement.
      if (at < 0) existing.push(c);
      else if ((c.family || []).length > (existing[at].family || []).length) existing[at] = c;
    }
    const head = fs.readFileSync(OUT, 'utf8').split('const QURAN_VOCAB = ')[0];
    fs.writeFileSync(OUT, head + 'const QURAN_VOCAB = ' + JSON.stringify(existing, null, 1) +
      ';\n\nfunction quranVocabCard(rootId) {\n  return QURAN_VOCAB.find(c => c.id === rootId) || null;\n}\n');
    console.log(`Merged ${list.length} card(s) back in.`);
    return;
  }
  if (list.length < targets.length * 0.9) {
    console.error('Refusing to write: too many roots came back unusable.');
    process.exit(1);
  }

  fs.writeFileSync(OUT,
`// ============================================================================
// BookTutor — the Quranic vocabulary cards (quran-vocab-data.js)
//
// One card per root, ${list.length} of them. GENERATED — do not hand-edit; re-run
// tools/build-vocab.cjs. Written by ${MODEL} on ${new Date().toISOString().slice(0, 10)}.
//
// The FRONT of each card is \`headword\`: a real Quranic wordform in full Uthmani
// script, fully vowelled. Not the root letters — those are three letters that
// never appear as a word, and fronting a card with them trains recognition of
// something the muṣḥaf does not contain.
//
// The root, the family and the verse go on the BACK. The root is what unifies
// the family; it is not what you meet while reading.
//
// Every Arabic string here was checked against quran-text.js before it was
// written: each headword and each family form genuinely occurs, and each verse
// is a real verse found by searching the corpus rather than recalled.
// ============================================================================

const QURAN_VOCAB = ${JSON.stringify(list, null, 1)};

function quranVocabCard(rootId) {
  return QURAN_VOCAB.find(c => c.id === rootId) || null;
}
`);
  console.log(`\nWrote ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(0)}KB)`);
})();
