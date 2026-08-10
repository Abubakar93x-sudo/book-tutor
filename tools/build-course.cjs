// ============================================================================
// BookTutor — the course builder (tools/build-course.cjs)
//
// Writes quran-course-data.js: all twenty-eight Quranic Arabic lessons, in
// full, as static data. NOT shipped to the browser and never loaded by the app
// — it runs on a developer's machine, costs API credit, and its output is what
// the app reads.
//
// Why pre-generate at all: a lesson written at runtime is a lesson the learner
// waits for, every time, and a lesson that can fail to appear. Generated once
// and committed, opening a lesson is a property lookup.
//
// ── THE PROBLEM THIS SCRIPT EXISTS TO SOLVE ─────────────────────────────────
// Models misquote the Qur'an. Not occasionally — measurably. A probe run of one
// lesson through gpt-5.2 produced five examples of which THREE cited a verse
// that actually contains the quoted Arabic. The other two attached real Arabic
// to a reference that does not hold it.
//
// That is unacceptable in a religious text and it is not fixable by asking
// nicely. So this script does two things instead:
//
//   1. GROUNDS. Before generating, it searches the bundled Uthmani text for
//      verses that genuinely contain the pattern being taught, and hands those
//      verses to the model. Picking from a supplied list is a different task
//      from recalling, and models are far better at it.
//
//   2. VERIFIES. Afterwards, every example must survive two checks: the Arabic
//      must actually occur at the reference cited, and the coloured segments
//      must concatenate back into the snippet exactly. Lessons with failures
//      are regenerated; examples that still fail are dropped rather than
//      shipped. A lesson with three verified examples beats one with five of
//      which two are false.
//
// Usage:  OAI=sk-... node tools/build-course.cjs [--only 7,9] [--fresh]
//         Progress is checkpointed per lesson, so a re-run resumes.
// ============================================================================

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'quran-course-data.js');
const KEY = process.env.OAI;
const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : fallback;
};
const MODEL = arg('model', 'gpt-5.2');
const ONLY = arg('only', null);
const CONCURRENCY = parseInt(arg('jobs', '5'), 10);
const ATTEMPTS = 3;

if (!KEY) { console.error('Set OAI to an OpenAI key.'); process.exit(1); }

// ── The corpus and the syllabus, read straight out of the shipped files ─────
const load = (file, expr) => {
  const src = fs.readFileSync(path.join(ROOT, file), 'utf8');
  return new Function(`${src}\nreturn ${expr};`)();
};
const QURAN_TEXT = load('quran-text.js', 'QURAN_TEXT');
const QURAN_SURAHS = load('quran-text.js', 'QURAN_SURAHS');
const UNITS = load('quran-grammar-data.js', 'QURAN_GRAMMAR_UNITS');

const surahName = (n) => (QURAN_SURAHS.find(s => s[0] === n) || [, `Surah ${n}`])[1];

// Comparing Arabic means ignoring what the two texts disagree about but a
// reader does not: vowel marks, recitation symbols, the several alif forms,
// and the tatweel. The consonantal skeleton is what has to match.
const bare = (s) => String(s)
  .replace(/[ً-ْٓ-ٰٕۖ-ۭـ]/g, '')
  .replace(/[آأإٱ]/g, 'ا')
  .replace(/ى/g, 'ي')
  .replace(/ة/g, 'ه')
  .replace(/\s+/g, ' ')
  .trim();

// ── GROUNDING: real verses that actually contain the pattern ────────────────
// Each lesson names the Arabic strings its topic is made of. Verses containing
// them are found here, in the real text, and handed to the model — so the
// examples it writes are drawn from verses that demonstrably exist.
const PROBES = {
  // What a word is
  'word-types':            ['قَالَ', 'ٱلْكِتَٰب', 'فِى', 'إِنَّ'],
  'lemma-vs-form':         ['قَالُوا', 'يَقُولُونَ', 'قُلْ', 'قِيلَ'],
  'root-lemma-wordform':   ['ٱلْكِتَٰب', 'كَتَبَ', 'كُتِبَ', 'كِتَٰبًا'],

  // How to go about it
  'the-80-20-plan':        ['ٱلَّذِينَ', 'مِنْ', 'ٱللَّهِ', 'فِى'],

  // The roots
  // كَاتِب and مَكْتُوب are real Quranic words but occur only inside verses
  // longer than the teaching window, so they cannot serve as grounding.
  'why-roots':             ['ٱلْكِتَٰب', 'كَتَبْنَا', 'كُتِبَ', 'يَكْتُبُون'],
  'roots-in-chunks':       ['ٱللَّهُ', 'رَبِّ', 'قَالَ', 'ءَامَنُوا'],
  'bare-roots':            ['كَتَبَ', 'كُتِبَ', 'ٱلْكِتَٰب'],

  // The patterns
  'what-is-a-pattern':     ['عَلَّمَ', 'أَنزَلَ', 'ٱسْتَغْفِرْ', 'عَلِمَ'],
  'forms-in-english':      ['عَلِمَ', 'عَلَّمَ', 'جَٰهَدُوا', 'أَنزَلَ'],
  'form-markers-english':  ['عَلَّمَ', 'تَذَكَّرُون', 'ٱنشَقَّ', 'ٱسْتَكْبَرُوا'],
  'form-markers-arabic':   ['أَنزَلَ', 'تَسَآءَلُون', 'ٱخْتَلَفَ', 'ٱسْتَغْفِرْ', 'نَزَّلَ'],
  'forms-master-table':    ['عَلَّمَ', 'أَنزَلَ', 'ٱسْتَغْفِرْ', 'ٱخْتَلَفَ'],
  'one-root-ten-forms':    ['كَتَبَ', 'ٱلْكِتَٰب', 'كُتِبَ', 'يَكْتُبُون'],
  'blank-table-practice':  ['نَزَّلَ', 'أَنزَلَ', 'تَنَزَّلُ', 'نَزَلَ'],
  'nazala-case-study':     ['نَزَّلَ', 'أَنزَلْنَا', 'تَنَزَّلُ', 'أَنزَلَ'],
  'why-meanings-drift':    ['جَٰهَدُوا', 'يَتَسَآءَلُون', 'قَٰتَلُوا', 'تَسَآءَلُون'],
  'hollow-verbs':          ['قَالَ', 'قُلْ', 'كَانَ', 'قِيلَ', 'يَقُولُ'],
  'form-2-teach-or-intensify': ['عَلَّمَ', 'كَذَّبُوا', 'يُسَبِّحُ', 'نَزَّلَ'],

  // Who does what to whom
  'transitive-intransitive': ['خَلَقَ', 'جَآءَ', 'دَخَلُوا', 'تَقْرَأُ'],
  'two-objects':           ['عَلَّمَ ءَادَمَ', 'ءَاتَيْنَا', 'ءَاتَىٰ', 'عَلَّمَكُم'],

  // Nouns from roots
  'noun-patterns':         ['ٱلْمُؤْمِنُون', 'مُّبِين', 'عَلِيم', 'غَفَّار', 'ٱلْمَسْجِد'],

  // How a sentence works
  'the-40-particles':      ['فِى', 'مِنْ', 'إِنَّ', 'لَمْ', 'إِلَّا', 'ٱلَّذِينَ'],
  'nominal-and-verbal':    ['ٱللَّهُ غَفُور', 'خَلَقَ ٱللَّهُ', 'وَٱللَّهُ', 'إِنَّ ٱللَّهَ'],
  'just-enough-irab':      ['ٱللَّهُ', 'ٱللَّهَ', 'ٱللَّهِ', 'إِنَّ ٱللَّهَ'],

  // Reading
  'the-parsing-routine':   ['ٱلْحَمْدُ لِلَّهِ', 'إِنَّ ٱلَّذِينَ', 'يَٰٓأَيُّهَا'],
  'reading-path':          ['قُلْ هُوَ ٱللَّهُ', 'ٱلْحَمْدُ لِلَّهِ', 'تَبَٰرَكَ'],
  'why-this-form-here':    ['نَزَّلَ', 'أَنزَلَ', 'كُتِبَ', 'يُسَبِّحُ'],
  'reading-unaided':       ['إِنَّ ٱلَّذِينَ', 'وَٱلَّذِينَ', 'يَٰٓأَيُّهَا ٱلَّذِينَ']
};

const REFS = Object.keys(QURAN_TEXT);

// Verses containing a probe, spread across the whole muṣḥaf rather than
// clustered — the model should not be handed twenty verses from al-Baqarah and
// then be blamed for a course that only ever quotes al-Baqarah.
function groundingVerses(unitId, want = 14) {
  const probes = PROBES[unitId] || [];
  const picked = new Map();
  for (const probe of probes) {
    const needle = bare(probe);
    if (!needle) continue;
    const hits = [];
    for (const ref of REFS) {
      const verse = QURAN_TEXT[ref];
      // Short verses teach badly and long ones bury the point.
      if (verse.length < 40 || verse.length > 260) continue;
      if (bare(verse).includes(needle)) hits.push(ref);
    }
    // Spread across the hits rather than taking the first few, which would be
    // the opening of al-Baqarah every single time.
    const step = Math.max(1, Math.floor(hits.length / 6));
    for (let i = 0; i < hits.length && picked.size < want * 2; i += step) {
      picked.set(hits[i], probe);
    }
  }
  // Insertion order already interleaves the probes, so no sort is wanted here.
  const refs = [...picked.keys()].slice(0, want);
  return refs.map(ref => {
    const [s] = ref.split(':');
    return { ref, surah: `Sūrat ${surahName(+s)}`, text: QURAN_TEXT[ref] };
  });
}

// ── THE PROMPT ──────────────────────────────────────────────────────────────
const ROLES = ['particle', 'preposition', 'attachedPronoun', 'verbPrefix',
               'verbSuffix', 'root', 'nounEnding', 'plain'];

function lessonPrompt(unit, n, total, prior, verses) {
  const priorList = prior.length
    ? prior.map((u, i) => `${i + 1}. ${u.title}`).join('\n      ')
    : '(this is the first lesson)';

  return `Write lesson ${n} of a ${total}-lesson Quranic Arabic course for adult
English speakers whose ONLY goal is understanding the Qur'an as they read it.
Recognition and comprehension. Never production, never speaking, never exams.

THIS LESSON
  Title: ${unit.title}
  The one thing it teaches: ${unit.structure}
  Why it matters: ${unit.whyItMatters}

ALREADY TAUGHT — you may build on these freely and must not re-teach them:
      ${priorList}

The learner READS this page; they cannot interact with it. A tutor sits beside
it and answers questions if they ask one. A separate quiz tests them after.

LENGTH: 700-1100 words of English across all fields combined. This is a
substantial page, not a summary. Do not pad it and do not cut it short.

═══ THE VERSES ═══
Your examples come from THIS LIST and nowhere else. This is the exact Uthmani
text with its exact reference. Copy the Arabic character for character and cite
the reference as given. Do NOT quote from memory — a verse you remember is a
verse you may misattribute, and a wrong reference in a religious text is worse
than a plainer example.

${verses.map(v => `${v.ref} · ${v.surah}\n  ${v.text}`).join('\n')}

Take a SHORT snippet from inside a verse — 2 to 7 words is right. You need not
use the whole ayah. The Arabic you show must appear character for character
inside the verse you cite.

═══ SEGMENTS ═══
Split each snippet into consecutive pieces that concatenate back to EXACTLY the
snippet, including its spaces, each tagged with what it is so the app can
colour it. Roles: ${ROLES.join(' | ')}

MARK WHAT THE LESSON IS ABOUT. Every example must carry AT LEAST TWO non-plain
segments — an example where everything is "plain" is an example the learner is
shown without being shown anything. If this lesson is about a relationship
between whole words rather than a piece inside one, mark the parts that SIGNAL
that relationship: the case ending that makes it an iḍāfa, the definite article
that makes an adjective agree, the particle that governs the clause. Split a
word to do it — "root" for the letters carrying the meaning, "nounEnding" for
the vowel doing the grammar. Use "plain" only for words genuinely beside the
point.

Return ONLY valid JSON:
{
  "canDo": "one sentence beginning 'After this lesson you can'",
  "rule": "the single idea stated bluntly, 2-4 sentences — what they should still remember in three days",
  "whyItMatters": ["2-4 bullets, each naming a specific comprehension failure this prevents"],
  "pattern": { "caption": "...", "columns": ["...","...","..."], "rows": [["...","...","..."]] },
  "anatomy": [ { "word": "one whole written Arabic word",
                 "blocks": [{ "text": "Arabic piece", "role": "a role", "gloss": "2-3 words" }],
                 "note": "one line on where the boundary falls" } ],
  "examples": [ { "arabic": "the snippet exactly as in the verse above",
                  "ref": "surah:ayah", "surah": "Sūrat al-...",
                  "segments": [{ "text": "...", "role": "..." }],
                  "literal": "word-by-word gloss",
                  "smooth": "natural English, one line",
                  "whatChanged": "one sentence: what this example shows that the previous one did not" } ],
  "traps": [ { "claim": "Don't confuse X with Y", "example": "minimal Arabic", "note": "2-3 lines" } ],
  "checklist": ["4-7 bullets: a mechanical procedure for spotting this in the mushaf"],
  "summary": ["the rule", "what it looks like", "what you can now do"],
  "quizBridge": "one line telling them what the quiz will ask"
}

3-6 pattern rows. 3-5 anatomy words. 4-6 examples. 2-4 traps.`;
}

// ── THE CALL ────────────────────────────────────────────────────────────────
// NOTE: execFileSync blocks the event loop, so the worker pool below is
// cosmetic — the calls run one after another regardless of --jobs. Forty
// lessons take roughly forty minutes rather than the four the pool implies.
// It is left synchronous because this is a build script run a handful of
// times, and the simpler code is worth more here than the wall clock.
function chat(prompt, maxTokens = 9000) {
  const body = JSON.stringify({
    model: MODEL,
    messages: [
      { role: 'system', content: 'You are a Quranic Arabic curriculum writer. Reply with a single valid json object and nothing else.' },
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
  return { text: j.choices[0].message.content, tokens: j.usage.completion_tokens };
}

// ── VERIFICATION ────────────────────────────────────────────────────────────
// An example survives only if the Arabic really is at that reference AND the
// segments really do rebuild it. Both, every time.
function checkExample(ex) {
  if (!ex?.arabic || !ex?.ref) return 'missing arabic or reference';
  const verse = QURAN_TEXT[ex.ref];
  if (!verse) return `${ex.ref} is not an ayah`;
  if (!bare(verse).includes(bare(ex.arabic))) return `not in ${ex.ref}`;
  const rebuilt = (ex.segments || []).map(s => s.text).join('');
  if (!rebuilt) return 'no segments';
  if (bare(rebuilt) !== bare(ex.arabic)) return 'segments do not rebuild the snippet';
  const bad = (ex.segments || []).find(s => !ROLES.includes(s.role));
  if (bad) return `unknown role "${bad.role}"`;
  return null;
}

function verify(lesson) {
  const kept = [];
  const dropped = [];
  for (const ex of lesson.examples || []) {
    const why = checkExample(ex);
    if (why) dropped.push(`${ex.ref || '?'} ${why}`);
    else kept.push({ ...ex, surah: `Sūrat ${surahName(+String(ex.ref).split(':')[0])}` });
  }
  return { kept, dropped };
}

// ── BUILDING ONE LESSON ─────────────────────────────────────────────────────
async function buildLesson(unit, i, total) {
  const n = i + 1;
  const prior = UNITS.slice(0, i);
  const started = Date.now();

  let best = null;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    // A different slice of grounding verses each attempt, so a retry is a real
    // second try rather than the same prompt hoping for a better mood.
    const verses = groundingVerses(unit.id, 14).slice(attempt > 1 ? 2 : 0);
    let lesson;
    try {
      const { text, tokens } = chat(lessonPrompt(unit, n, total, prior, verses));
      lesson = JSON.parse(text);
      lesson._tokens = tokens;
    } catch (err) {
      console.log(`  ${n}. attempt ${attempt} failed: ${err.message.slice(0, 90)}`);
      continue;
    }

    const { kept, dropped } = verify(lesson);
    lesson.examples = kept;
    if (!best || kept.length > best.examples.length) best = lesson;

    // An example with nothing marked is an example that shows the learner
    // nothing. Three lessons came back that way on the first build — all of
    // them about relationships BETWEEN words, where the model read "the thing
    // being taught" as belonging to no single piece.
    const marked = kept.reduce((n, ex) =>
      n + (ex.segments || []).filter(s => s.role && s.role !== 'plain').length, 0);
    if (kept.length >= 4 && dropped.length === 0 && marked >= kept.length * 2) break;
    if (attempt < ATTEMPTS && marked < kept.length * 2) {
      console.log(`  ${n}. attempt ${attempt}: only ${marked} coloured segments across ` +
        `${kept.length} examples — retrying`);
      continue;
    }
    if (attempt < ATTEMPTS) {
      console.log(`  ${n}. attempt ${attempt}: ${kept.length} kept, ${dropped.length} rejected ` +
        `(${dropped.slice(0, 2).join('; ')}) — retrying`);
    }
  }

  if (!best) throw new Error(`lesson ${n} (${unit.id}) produced nothing usable`);
  if (!best.examples.length) throw new Error(`lesson ${n} (${unit.id}) had no verifiable examples`);

  const words = JSON.stringify(best).replace(/[؀-ۿ]/g, '').split(/\s+/).length;
  console.log(`  ${String(n).padStart(2)}. ${unit.title.slice(0, 46).padEnd(48)} ` +
    `${((Date.now() - started) / 1000).toFixed(0).padStart(3)}s  ` +
    `${String(words).padStart(4)}w  ${best.examples.length} verified examples`);

  return {
    id: unit.id, n, title: unit.title, stage: unit.stage, level: unit.level,
    structure: unit.structure, whyItMatters: unit.whyItMatters,
    canDo: best.canDo || '', rule: best.rule || '',
    why: best.whyItMatters || [], pattern: best.pattern || null,
    anatomy: best.anatomy || [], examples: best.examples,
    traps: best.traps || [], checklist: best.checklist || [],
    summary: best.summary || [], quizBridge: best.quizBridge || ''
  };
}

// ── RUN ─────────────────────────────────────────────────────────────────────
// ── CHECKPOINTING ───────────────────────────────────────────────────────────
// A full run takes about twenty-two minutes and used to keep everything in
// memory until the end. A container restart nine lessons in threw away all
// nine — seven minutes and real API credit for nothing. So each lesson is
// written down the moment it is verified, and a re-run picks up what is
// already there. A crash now costs one lesson.
//
// The save lags a few lessons behind the log. execFileSync blocks the event
// loop, so a worker's continuation — the line that writes the checkpoint — sits
// in the microtask queue behind the NEXT worker's synchronous API call. Losing
// the last three or four is still worth having; making it exact would mean
// --jobs 1, and the pool is already only cosmetic for the same reason.
//
// Deleted once the course is written, so it never goes stale behind a syllabus
// change. --fresh ignores it outright.
const PROGRESS = path.join(__dirname, '.course-progress.json');

function readProgress() {
  if (argv.includes('--fresh') || !fs.existsSync(PROGRESS)) return {};
  try { return JSON.parse(fs.readFileSync(PROGRESS, 'utf8')); }
  catch { return {}; }
}

function saveProgress(done) {
  try { fs.writeFileSync(PROGRESS, JSON.stringify(done)); }
  catch (err) { console.warn(`  (could not checkpoint: ${err.message})`); }
}

(async () => {
  const want = ONLY ? new Set(ONLY.split(',').map(s => s.trim())) : null;
  const targets = want
    ? UNITS.map((u, i) => [u, i]).filter(([, i]) => want.has(String(i + 1)))
    : UNITS.map((u, i) => [u, i]);

  // Anything already verified in an earlier run of THIS syllabus. Ids are the
  // key, so a lesson that has been renamed or removed simply is not found.
  const done = ONLY ? {} : readProgress();
  const resuming = targets.filter(([u]) => done[u.id]).length;

  console.log(`Building ${targets.length} lesson(s) on ${MODEL}, ${CONCURRENCY} at a time.`);
  if (resuming) console.log(`Resuming: ${resuming} already verified, ${targets.length - resuming} to go.`);
  console.log('');
  const t0 = Date.now();
  const lessons = new Array(UNITS.length);
  const failures = [];

  // Seed from the checkpoint before any work starts.
  UNITS.forEach((u, i) => { if (done[u.id]) lessons[i] = done[u.id]; });

  let cursor = 0;
  const worker = async () => {
    while (cursor < targets.length) {
      const [unit, i] = targets[cursor++];
      if (lessons[i]) continue;                       // already have it
      try {
        lessons[i] = await buildLesson(unit, i, UNITS.length);
        if (!ONLY) { done[unit.id] = lessons[i]; saveProgress(done); }
      }
      catch (err) { failures.push(`${i + 1} ${unit.id}: ${err.message}`); }
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const built = lessons.filter(Boolean);
  if (failures.length) {
    console.log(`\n${failures.length} lesson(s) failed:\n  ${failures.join('\n  ')}`);
  }
  // --only regenerates named lessons and merges them into the existing course,
  // so a lesson that came back weak can be redone without paying for the other
  // thirty-nine. Comma-separated: --only 14,15,20
  if (ONLY) {
    if (!fs.existsSync(OUT)) { console.log(JSON.stringify(built, null, 2)); return; }
    const existing = load(path.basename(OUT), 'QURAN_COURSE');
    for (const l of built) {
      const at = existing.findIndex(e => e.id === l.id);
      if (at >= 0) existing[at] = l; else existing.push(l);
    }
    const head = fs.readFileSync(OUT, 'utf8').split('const QURAN_COURSE = ')[0];
    fs.writeFileSync(OUT, head + 'const QURAN_COURSE = ' + JSON.stringify(existing, null, 1) +
      ';\n\nfunction quranLesson(unitId) {\n  return QURAN_COURSE.find(l => l.id === unitId) || null;\n}\n');
    console.log(`\nMerged ${built.length} lesson(s) back into the course.`);
    return;
  }
  if (built.length !== UNITS.length) {
    console.error(`\nRefusing to write a partial course (${built.length}/${UNITS.length}).`);
    process.exit(1);
  }

  const verified = built.reduce((n, l) => n + l.examples.length, 0);
  const banner = `// ============================================================================
// BookTutor — the Quranic Arabic course, written out (quran-course-data.js)
//
// All ${built.length} lessons, in full. GENERATED — do not hand-edit; edit the syllabus in
// quran-grammar-data.js and re-run tools/build-course.cjs.
//
// Written by ${MODEL} on ${new Date().toISOString().slice(0, 10)}.
//
// Every one of the ${verified} Arabic examples below was checked against
// quran-text.js before it was written here: the snippet occurs at the ayah it
// cites, and its coloured segments concatenate back into it exactly. Examples
// that failed either check were regenerated, and dropped if they failed again.
// Models misquote the Qur'an often enough that this is not optional — an early
// probe had two of five references wrong.
//
// The app reads this synchronously. No lesson is ever generated at runtime, so
// opening one is a property lookup rather than a wait.
// ============================================================================

const QURAN_COURSE = `;

  fs.writeFileSync(OUT,
    banner + JSON.stringify(built, null, 1) + ';\n\n' +
    'function quranLesson(unitId) {\n' +
    '  return QURAN_COURSE.find(l => l.id === unitId) || null;\n' +
    '}\n');

  // The course is on disk; the checkpoint has done its job and would only go
  // stale behind the next syllabus change.
  try { fs.unlinkSync(PROGRESS); } catch { /* never existed */ }

  const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
  console.log(`\nWrote ${OUT}`);
  console.log(`${built.length} lessons · ${verified} verified examples · ${kb}KB · ` +
    `${((Date.now() - t0) / 1000 / 60).toFixed(1)} min`);
})();
