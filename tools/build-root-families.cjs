// ============================================================================
// BookTutor — topping up the root families (tools/build-root-families.cjs)
//
// Every one of the 300 roots ships with the words the Qur'an builds from it,
// but unevenly: some carry six, some carry one. This asks for the ones that are
// missing and writes them to tools/roots300-extra-families.json, which
// build-roots300.cjs then merges when it rebuilds quran-roots-data.js.
//
// THE MODEL PROPOSES, THE CORPUS DECIDES. Every form that comes back is checked
// against quran-text.js and dropped if it does not occur, exactly as in
// build-vocab.cjs. That is why nothing shipped is invented: a wordform is in the
// file because it is in the muṣḥaf, not because a model was confident.
//
// It is also incremental. Roots already at the target are never asked about,
// the forms a root already has are sent along so they are not proposed again,
// and results are checkpointed after every batch — a crash costs one batch.
//
// Usage:  OAI=sk-... node tools/build-root-families.cjs [--target 6] [--jobs 4]
// ============================================================================

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(__dirname, 'roots300-extra-families.json');
const KEY = process.env.OAI;
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(`--${n}`); return i >= 0 ? argv[i + 1] : d; };
const MODEL  = arg('model', 'gpt-5.2');
const TARGET = parseInt(arg('target', '6'), 10);
const JOBS   = parseInt(arg('jobs', '4'), 10);
const BATCH  = parseInt(arg('batch', '10'), 10);
const FRESH  = argv.includes('--fresh');

if (!KEY) { console.error('Set OAI to an OpenAI key.'); process.exit(1); }

const load = (f, e) =>
  new Function(fs.readFileSync(path.join(ROOT, f), 'utf8') + '\nreturn ' + e + ';')();
const QURAN_TEXT = load('quran-text.js', 'QURAN_TEXT');
const ROOTS = load('quran-roots-data.js', 'QURAN_ROOTS');

const bare = s => String(s)
  .replace(/[ً-ْٓ-ٰٕۖ-ۭـ]/g, '').replace(/[آأإٱ]/g, 'ا')
  .replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/\s+/g, ' ').trim();
const FLAT = Object.values(QURAN_TEXT).map(bare);
const occurs = w => { const n = bare(w); return n.length > 1 && FLAT.some(v => v.includes(n)); };

// Already-collected work survives a crash or a second run.
let extra = {};
if (!FRESH && fs.existsSync(OUT)) {
  extra = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  delete extra._comment;
}

const have = (r) => [...(r.family || []).map(f => f.word), ...(extra[r.root] || []).map(f => f.word)];
const targets = ROOTS.filter(r => have(r).length < TARGET);

console.log(`${ROOTS.length} roots · ${targets.length} short of ${TARGET} words · ` +
  `${targets.reduce((s, r) => s + (TARGET - have(r).length), 0)} forms wanted\n`);
if (!targets.length) { console.log('Nothing to do.'); process.exit(0); }

function prompt(batch) {
  return `For each Arabic root below, give the MOST FREQUENT wordforms built on
it that occur in the Qur'an and that are NOT already listed. Frequency in the
Qur'an decides the list — not how classical or how interesting a word is.

${batch.map(r => `  ${r.root} (${r.translit}) — ${r.gloss}
     wanted: ${TARGET - have(r).length} more
     already have: ${have(r).join('، ') || '(none)'}`).join('\n')}

Each wordform must be:
  · written in full Uthmani script WITH its vowel marks, exactly as it appears
    in the muṣḥaf — ٱلْكِتَٰبِ, يَكْتُبُونَ, مَكْتُوبًا
  · a form that GENUINELY OCCURS in the Qur'an. If you are unsure whether a
    form occurs, give a different one you are sure of. Do not pad the list.
  · glossed in 1-4 English words ("they write", "a decree", "the believers")

Show the range of the root where you can: a past verb, a present verb, a verbal
noun, an active participle, a plural. Give FEWER than asked rather than
inventing — a rare root honestly has few forms.

Return ONLY valid JSON:
{ "roots": [ { "root": "${batch[0].root}",
               "family": [ { "word": "...", "gloss": "..." } ] } ] }`;
}

function chat(text, maxTokens = 8000) {
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

const save = () => fs.writeFileSync(OUT, JSON.stringify({
  _comment: 'GENERATED by tools/build-root-families.cjs — extra verified wordforms ' +
            'per root, merged into quran-roots-data.js by build-roots300.cjs. Every ' +
            'form here was checked to occur in quran-text.js before it was written.',
  ...extra
}, null, 1));

(async () => {
  const batches = [];
  for (let i = 0; i < targets.length; i += BATCH) batches.push(targets.slice(i, i + BATCH));

  const stats = { proposed: 0, kept: 0, notInQuran: 0, duplicate: 0, failed: 0 };
  let cursor = 0, done = 0;
  const t0 = Date.now();

  const worker = async () => {
    while (cursor < batches.length) {
      const b = batches[cursor++];
      let got;
      try { got = chat(prompt(b)); }
      catch (err) { stats.failed++; console.log(`\n  batch failed: ${err.message.slice(0, 90)}`); continue; }

      for (const row of got.roots || []) {
        const target = b.find(r => bare(r.root) === bare(row.root));
        if (!target) continue;
        const seen = new Set(have(target).map(bare));
        const kept = [];
        for (const f of row.family || []) {
          if (!f?.word || !f?.gloss) continue;
          stats.proposed++;
          if (seen.has(bare(f.word))) { stats.duplicate++; continue; }
          if (!occurs(f.word)) { stats.notInQuran++; continue; }
          seen.add(bare(f.word));
          kept.push({ word: f.word, gloss: String(f.gloss).trim() });
          stats.kept++;
          if (seen.size >= TARGET) break;
        }
        if (kept.length) extra[target.root] = [...(extra[target.root] || []), ...kept];
      }
      done += b.length;
      save();     // checkpoint every batch
      process.stdout.write(`\r  ${done}/${targets.length} roots · ${stats.kept} forms kept · ` +
        `${stats.notInQuran} rejected · ${((Date.now() - t0) / 1000).toFixed(0)}s   `);
    }
  };
  await Promise.all(Array.from({ length: JOBS }, worker));
  save();

  console.log('\n');
  console.log(`  ${stats.proposed} forms proposed`);
  console.log(`  ${stats.kept} kept`);
  console.log(`  ${stats.notInQuran} rejected — not in the Qur'an`);
  console.log(`  ${stats.duplicate} skipped — already had them`);
  if (stats.failed) console.log(`  ${stats.failed} batch(es) failed outright`);

  const still = ROOTS.filter(r => have(r).length < TARGET);
  console.log(`\n${ROOTS.length - still.length}/${ROOTS.length} roots now have ${TARGET} words.`);
  if (still.length) {
    console.log(`Still short (a rare root honestly has few forms):`);
    console.log('  ' + still.map(r => `${r.root}(${have(r).length})`).join(' '));
  }
  console.log(`\nWrote ${OUT}. Now re-run: node tools/build-roots300.cjs`);
})();
