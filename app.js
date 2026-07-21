// ============================================================================
// BookTutor — Application Core (app.js)
// Manages all UI state, user events, IndexedDB persistence, and orchestrates
// the AI agent calls. This is the main brain of the front-end application.
// ============================================================================

// ── 1. GLOBAL APP STATE ───────────────────────────────────────────────────────
// A single source of truth for all runtime state.
const AppState = {
  mode: 'demo',             // 'live' or 'demo'
  currentView: 'library',   // library | tutor | sandbox | review
  currentChatMode: 'teach', // 'teach' or 'quiz'
  tutorMode: 'read',        // 'read' | 'listen' | 'visuals' — how the tutor delivers each lesson
  selectedBook: null,       // The full book object currently being studied
  selectedChapter: null,    // The full chapter object currently being studied
  activeChatHistory: [],    // Array of { role, content, mode } message objects
  masteredConcepts: [],     // Array of concept strings mastered in this session
  shakyConcepts: [],        // Concepts that failed their checkpoint (extra review)
  flashcardSession: [],     // Array of flashcard objects for daily review
  flashcardIndex: 0,        // Current flashcard position
  reviewFilter: 'all',      // 'all' | 'book:{id}' | 'lang:{id}' — deck source filter
  practiceMode: false,      // random-practice session: ratings don't touch SM-2
  reviewStats: { forgot: 0, hard: 0, good: 0, easy: 0, total: 0, done: 0 },
  currentUser: null,        // Firebase Auth user object (null = not signed in)
  settings: {
    apiKey: '',
    model: 'gemini-2.5-flash',   // default Gemini model for all calls
    highQualityGrading: false    // route 'deep' grading tasks to Pro when true
  }
};

// Metadata extracted from a locally-selected PDF (page count, title, author).
// Set by showSelectedFile(); read by generateCurriculum() for the log message.
let _pdfMeta = { pageCount: null, title: null, author: null };

// Full text extracted from a large PDF (>1000 pages) via PDF.js client-side.
// Used instead of the Gemini File API when the page limit would be exceeded.
let _extractedPdfText = null;

// ── NARRATION ENGINE ──────────────────────────────────────────────────────────
// Uses the browser's built-in Web Speech API to narrate tutor responses
// in a UK English voice. Falls back gracefully if speech is unsupported.
const NarrationEngine = {
  enabled: true,
  synth: window.speechSynthesis || null,
  ukVoice: null,

  init() {
    if (!this.synth) return;
    const loadVoice = () => {
      const voices = this.synth.getVoices();
      // Prefer Google UK English, then any en-GB, then any en-*, then first available
      this.ukVoice =
        voices.find(v => v.name.includes('Google UK English Female')) ||
        voices.find(v => v.name.includes('Google UK English Male')) ||
        voices.find(v => v.lang === 'en-GB') ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0] || null;
    };
    loadVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoice;
    }
  },

  speak(text) {
    if (!this.enabled || !this.synth) return;
    this.synth.cancel();
    // Strip markdown, HTML tags and mastery tags before speaking
    const clean = text
      .replace(/\[MASTERED:.*?\]/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/#{1,4} /g, '')
      .replace(/<br\s*\/?>/gi, '. ')
      .replace(/<[^>]+>/g, '')
      .trim();
    if (!clean) return;
    const utt = new SpeechSynthesisUtterance(clean);
    if (this.ukVoice) utt.voice = this.ukVoice;
    utt.rate  = 0.92;
    utt.pitch = 1.0;
    utt.volume = 1.0;
    this.synth.speak(utt);
  },

  stop() {
    if (this.synth) this.synth.cancel();
  },

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) this.stop();
    return this.enabled;
  },

  // ── Language-learning TTS ──
  // Speaks text in an arbitrary language, picking the best matching system
  // voice (exact BCP-47 match, then language-prefix match). Returns false if
  // the device has no voice for that language — callers degrade gracefully.
  voiceFor(langCode) {
    if (!this.synth || !langCode) return null;
    const voices = this.synth.getVoices();
    const want = langCode.toLowerCase();
    const prefix = want.split('-')[0];
    return voices.find(v => v.lang?.toLowerCase() === want)
        || voices.find(v => v.lang?.toLowerCase().replace('_', '-').startsWith(prefix))
        || null;
  },

  speakLang(text, langCode, rate = 0.95) {
    const voice = this.voiceFor(langCode);
    if (!voice || !text) return false;
    this.synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.voice = voice;
    utt.lang = voice.lang;
    utt.rate = rate;
    utt.pitch = 1.0;
    this.synth.speak(utt);
    return true;
  }
};

// ── 2. INDEXEDDB SETUP (settings only) ───────────────────────────────────────
// IndexedDB is kept only for the 'settings' store (API key etc.) because
// those are sensitive and should never leave the device.
let db;
const DB_NAME = 'BookTutorDB';
const DB_VERSION = 1;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains('books')) {
        database.createObjectStore('books', { keyPath: 'id' });
      }
      if (!database.objectStoreNames.contains('chatHistory')) {
        const store = database.createObjectStore('chatHistory', { keyPath: 'id', autoIncrement: true });
        store.createIndex('chapterKey', 'chapterKey', { unique: false });
      }
      if (!database.objectStoreNames.contains('settings')) {
        database.createObjectStore('settings', { keyPath: 'key' });
      }
    };

    request.onsuccess = () => { db = request.result; resolve(db); };
    request.onerror  = () => reject(request.error);
  });
}

// ── RAW INDEXEDDB HELPERS (settings only) ────────────────────────────────────
function idbPut(storeName, data) {
  return new Promise((resolve, reject) => {
    const tx  = db.transaction([storeName], 'readwrite');
    const req = tx.objectStore(storeName).put(data);
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

function idbGet(storeName, key) {
  return new Promise((resolve, reject) => {
    const tx  = db.transaction([storeName], 'readonly');
    const req = tx.objectStore(storeName).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

function idbGetAll(storeName) {
  return new Promise((resolve, reject) => {
    const tx  = db.transaction([storeName], 'readonly');
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

function idbClearStore(storeName) {
  return new Promise((resolve, reject) => {
    const tx  = db.transaction([storeName], 'readwrite');
    const req = tx.objectStore(storeName).clear();
    req.onsuccess = () => resolve();
    req.onerror   = () => reject(req.error);
  });
}

// ── SMART DB ROUTER ───────────────────────────────────────────────────────────
// books / chatHistory → Firestore (cloud, synced across devices)
// settings           → IndexedDB  (local only, API key stays private)

function userCol(collectionName) {
  const uid = AppState.currentUser?.uid;
  if (!uid) return null; // Not signed in — callers handle null gracefully
  return firestoreDB.collection('users').doc(uid).collection(collectionName);
}

async function dbPut(storeName, data) {
  if (storeName === 'settings') return idbPut(storeName, data);
  if (storeName === 'books') {
    const col = userCol('books');
    if (!col) return;
    await col.doc(String(data.id)).set(data);
    return data.id;
  }
  if (storeName === 'chatHistory') {
    const col = userCol('chat');
    if (!col) return;
    await col.add(data);
    return;
  }
  if (storeName === 'notes') {
    const col = userCol('notes');
    if (!col) return;
    await col.add(data);
    return;
  }
}

async function dbGet(storeName, key) {
  if (storeName === 'settings') return idbGet(storeName, key);
  if (storeName === 'books') {
    const col = userCol('books');
    if (!col) return undefined;
    const doc = await col.doc(String(key)).get();
    return doc.exists ? doc.data() : undefined;
  }
}

async function dbGetAll(storeName) {
  if (storeName === 'settings') return idbGetAll(storeName);
  if (storeName === 'books') {
    const col = userCol('books');
    if (!col) return [];
    const snap = await col.get();
    return snap.docs.map(d => d.data());
  }
  if (storeName === 'chatHistory') {
    const col = userCol('chat');
    if (!col) return [];
    const snap = await col.orderBy('timestamp').get();
    return snap.docs.map(d => d.data());
  }
  if (storeName === 'notes') {
    const col = userCol('notes');
    if (!col) return [];
    const snap = await col.orderBy('timestamp', 'desc').get();
    return snap.docs.map(d => d.data());
  }
  return [];
}

async function dbDelete(storeName, key) {
  if (storeName === 'books') {
    const col = userCol('books');
    if (!col) return;
    await col.doc(String(key)).delete();
  }
}

async function dbClearStore(storeName) {
  if (storeName === 'settings') return idbClearStore(storeName);
  const col = userCol(storeName === 'chatHistory' ? 'chat' : storeName);
  if (!col) return;
  const snap = await col.get();
  const batch = firestoreDB.batch();
  snap.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
}

// ── CHAPTER CONTENT DB (Firestore) ────────────────────────────────────────────
// Each PDF book's chapters are stored as individual Firestore documents under
// users/{uid}/bookChapters/{bookId}_ch_{N}, containing both the raw extracted
// text (for tutor quoting) and the AI-generated curriculum (generated on demand).

async function dbPutChapter(bookId, chapterData) {
  const col = userCol('bookChapters');
  if (!col) return;
  const key = `${bookId}_ch_${chapterData.chapterNumber}`;
  await col.doc(key).set({ ...chapterData, bookId, updatedAt: Date.now() }, { merge: true });
}

async function dbGetChapter(bookId, chapterNumber) {
  const col = userCol('bookChapters');
  if (!col) return null;
  const key = `${bookId}_ch_${chapterNumber}`;
  const snap = await col.doc(key).get();
  return snap.exists ? snap.data() : null;
}

async function dbGetChaptersForBook(bookId) {
  const col = userCol('bookChapters');
  if (!col) return [];
  const snap = await col.where('bookId', '==', bookId).get();
  return snap.docs.map(d => d.data());
}

async function dbDeleteBookChapters(bookId) {
  const col = userCol('bookChapters');
  if (!col) return;
  const snap = await col.where('bookId', '==', bookId).get();
  if (snap.empty) return;
  const batch = firestoreDB.batch();
  snap.docs.forEach(d => batch.delete(d.ref));
  await batch.commit();
}

// ── LANGUAGE LEARNING DB (Firestore) ─────────────────────────────────────────
// languages/{langId}                — one profile doc per language
// langCards/{langId}_batch_{n}     — sentence-card batches (≤100 cards/doc,
//                                    same chunking pattern as bookChapters)

const LANG_CARDS_PER_BATCH = 100;

async function dbPutLanguage(lang) {
  const col = userCol('languages');
  if (!col) return;
  await col.doc(lang.id).set({ ...lang, updatedAt: Date.now() }, { merge: true });
}

async function dbGetAllLanguages() {
  const col = userCol('languages');
  if (!col) return [];
  const snap = await col.get();
  return snap.docs.map(d => d.data());
}

async function dbGetLangCardBatches(langId) {
  const col = userCol('langCards');
  if (!col) return [];
  const snap = await col.where('langId', '==', langId).get();
  return snap.docs
    .map(d => d.data())
    .sort((a, b) => (a.batch || 0) - (b.batch || 0));
}

async function dbPutLangCardBatch(langId, batchNum, cards) {
  const col = userCol('langCards');
  if (!col) return;
  await col.doc(`${langId}_batch_${batchNum}`).set(
    { langId, batch: batchNum, flashcards: cards, updatedAt: Date.now() }, { merge: true }
  );
}

// Append new cards, filling the last partial batch before starting a new one.
async function dbAppendLangCards(langId, newCards) {
  const batches = await dbGetLangCardBatches(langId);
  let queue = [...newCards];

  const last = batches[batches.length - 1];
  if (last && (last.flashcards || []).length < LANG_CARDS_PER_BATCH) {
    const room = LANG_CARDS_PER_BATCH - last.flashcards.length;
    const fill = queue.splice(0, room);
    await dbPutLangCardBatch(langId, last.batch, [...last.flashcards, ...fill]);
  }
  let nextBatch = last ? last.batch + 1 : 0;
  while (queue.length) {
    await dbPutLangCardBatch(langId, nextBatch, queue.splice(0, LANG_CARDS_PER_BATCH));
    nextBatch += 1;
  }
}

// langLessons/{langId}_{YYYY-MM-DD} — one generated lesson per language per
// day, cached so reopening the session replays the same content (cost control).
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

async function dbGetLangLesson(langId, dateKey) {
  const col = userCol('langLessons');
  if (!col) return null;
  const snap = await col.doc(`${langId}_${dateKey}`).get();
  return snap.exists ? snap.data() : null;
}

async function dbPutLangLesson(langId, dateKey, lesson) {
  const col = userCol('langLessons');
  if (!col) return;
  await col.doc(`${langId}_${dateKey}`).set({ ...lesson, langId, dateKey, updatedAt: Date.now() }, { merge: true });
}

// Update readyChapters / studiedChapters arrays stored on the book doc.
async function dbUpdateBookProgress(bookId, type, chapterNumber) {
  const book = await dbGet('books', bookId);
  if (!book) return;
  const field = type === 'ready' ? 'readyChapters' : 'studiedChapters';
  const current = book[field] || [];
  if (current.includes(chapterNumber)) return; // already recorded
  const updated = { ...book, [field]: [...current, chapterNumber] };
  await dbPut('books', updated);
  // Keep AppState in sync
  if (AppState.selectedBook?.id === bookId) {
    AppState.selectedBook = updated;
  }
  return updated;
}

// ── PDF CHAPTER SPLITTER ──────────────────────────────────────────────────────
// Detects chapter headings in extracted PDF text and splits the full text into
// an array of { number, title, text } chapter objects.
// Supports: "Chapter N", "Law N", "Part N", ALL-CAPS headings, Roman numerals,
// numbered sections like "1. Title", and common book structures.
function splitPdfIntoChapters(rawText) {
  const lines = rawText.split('\n');

  function isHeading(line) {
    const t = line.trim();
    if (!t || t.length < 3 || t.length > 120) return false;
    return (
      /^(chapter|law|part|section|rule|lesson|principle|habit|step|day|week|element|pillar|key|secret)\s+\d+/i.test(t) ||
      /^(chapter|law|part|section|rule|lesson|principle|habit|step)\s+(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)/i.test(t) ||
      /^\d{1,2}[.:)]\s+[A-Z]/.test(t) ||
      /^[IVXLC]{1,6}[.:)]\s+[A-Z]/.test(t) ||
      // ALL-CAPS heading: 4–80 chars, contains at least 3 capital letters, not pure numbers/symbols
      (t === t.toUpperCase() && t.length >= 4 && t.length <= 80 && /[A-Z]{3}/.test(t) && !/^\d+$/.test(t) && !/^[^\w]+$/.test(t))
    );
  }

  const chapters = [];
  let currentTitle = null;
  let currentLines = [];

  for (const line of lines) {
    if (isHeading(line)) {
      if (currentTitle !== null) {
        chapters.push({ title: currentTitle, text: currentLines.join('\n').trim() });
      }
      currentTitle = line.trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  // Include final chapter
  if (currentTitle !== null) {
    chapters.push({ title: currentTitle, text: currentLines.join('\n').trim() });
  }

  // Fallback: no headings detected — treat whole book as one chapter
  if (chapters.length === 0) {
    return [{ number: 1, title: 'Full Book Content', text: rawText.trim() }];
  }

  // Filter out noise (very short "chapters" that are just page numbers, headers, etc.)
  const meaningful = chapters.filter(ch => ch.text.length > 200 || chapters.length <= 3);

  // Number them
  return meaningful.map((ch, i) => ({ number: i + 1, title: ch.title, text: ch.text }));
}

// ── CHAPTER SEGMENTATION (guided reading) ────────────────────────────────────
// Splits a chapter's raw text into reading segments of ~1,000–1,500 words,
// breaking only at paragraph boundaries. Segments are derived deterministically
// from the stored chapter text, so only `segmentsDone` needs persisting.

// Some PDFs extract with no blank-line breaks at all and hard-wrap lines
// mid-sentence, so no line ever happens to end on sentence punctuation —
// the loop above then never flushes, and the entire chapter (tens of
// thousands of words) collapses into a single "paragraph." That single
// giant paragraph then becomes a single reading segment with a single
// checkpoint at the very end of the chapter, so no progress registers no
// matter how far the reader actually gets before backing out. Re-split any
// oversized paragraph by sentence boundaries as a fallback.
function splitLongParagraphBySentences(text, maxWords) {
  const sentences = text.match(/[^.!?]+[.!?]+["'”’]?\s*/g) || [text];
  const chunks = [];
  let cur = '';
  let curWords = 0;
  for (const s of sentences) {
    cur += s;
    curWords += s.trim().split(/\s+/).length;
    if (curWords >= maxWords) {
      chunks.push(cur.trim());
      cur = '';
      curWords = 0;
    }
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks;
}

// PDF.js gives us a stream of lines, not paragraphs. Group lines into readable
// paragraph blocks: break on blank lines, or once a block has real length and
// the line ends a sentence.
function groupLinesIntoParagraphs(text) {
  const lines = text.split('\n');
  const paras = [];
  let cur = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      if (cur.length) { paras.push(cur.join(' ')); cur = []; }
      continue;
    }
    cur.push(line);
    const joined = cur.join(' ');
    if (joined.length > 350 && /[.!?"'”’]$/.test(line)) {
      paras.push(joined);
      cur = [];
    }
  }
  if (cur.length) paras.push(cur.join(' '));

  const MAX_PARA_WORDS = 250;
  const expanded = [];
  for (const p of paras) {
    if (p.split(/\s+/).length > MAX_PARA_WORDS) {
      expanded.push(...splitLongParagraphBySentences(p, MAX_PARA_WORDS));
    } else {
      expanded.push(p);
    }
  }
  return expanded;
}

function splitChapterIntoSegments(rawText) {
  const TARGET_WORDS = 1200;
  const paras = groupLinesIntoParagraphs(rawText);

  const segments = [];
  let curParas = [];
  let curWords = 0;

  for (const p of paras) {
    const w = p.split(/\s+/).length;
    curParas.push(p);
    curWords += w;
    if (curWords >= TARGET_WORDS) {
      segments.push({ paragraphs: curParas, wordCount: curWords });
      curParas = [];
      curWords = 0;
    }
  }
  if (curParas.length) {
    // A tiny tail reads better merged into the previous segment
    if (segments.length && curWords < TARGET_WORDS * 0.3) {
      const last = segments[segments.length - 1];
      last.paragraphs.push(...curParas);
      last.wordCount += curWords;
    } else {
      segments.push({ paragraphs: curParas, wordCount: curWords });
    }
  }
  return segments.map((s, i) => ({ index: i, ...s }));
}

// ── READING PACE TRACKING ─────────────────────────────────────────────────────
// Personal pace = rolling median of per-segment words-per-minute samples,
// stored on the book doc. Dense books legitimately read slower, so pace is
// per-book. Cold start uses a conservative default until 3 samples exist.

const READING_DEFAULT_WPM = 200;

function bookPaceWpm(book) {
  const samples = book?.paceSamples || [];
  if (!samples.length) return READING_DEFAULT_WPM;
  const sorted = [...samples].sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  // Blend from the cold-start default toward the measured median so time
  // estimates converge smoothly instead of lurching the moment enough
  // samples exist (the user watched 5h30 jump to 8h from that cliff).
  const w = Math.min(1, samples.length / 6);
  return Math.round(READING_DEFAULT_WPM * (1 - w) + median * w);
}

// One write per completed segment: pace sample (when plausible), cumulative
// words read, and the resume point that powers the library's Continue row.
async function updateBookReadingProgress(words, seconds, chapterNumber) {
  const book = AppState.selectedBook;
  if (!book) return;

  const updated = { ...book };
  // Pace sample only when plausible: discard sub-10s skims, >30min walk-aways
  if (seconds >= 10 && seconds <= 1800) {
    const wpm = Math.round(words / (seconds / 60));
    if (wpm >= 40 && wpm <= 900) {
      updated.paceSamples = [...(book.paceSamples || []), wpm].slice(-20);
      updated.paceWpm = bookPaceWpm(updated);
    }
  }
  updated.wordsRead = (book.wordsRead || 0) + words;
  updated.lastRead = { chapterNumber, at: Date.now() };

  AppState.selectedBook = updated;
  await dbPut('books', updated);
}

// Minutes left in a whole book at the reader's personal pace, or null when
// the book has no word-count data (pre-existing books, knowledge books).
function bookTimeLeftMinutes(book) {
  if (!book?.wordsTotal) return null;
  const remaining = Math.max(0, book.wordsTotal - (book.wordsRead || 0));
  return remaining / bookPaceWpm(book);
}

// Focus mode: reading surfaces hide the app chrome (sidebar, mobile nav)
function setFocusMode(on) {
  document.body.classList.toggle('focus-mode', on);
}

function formatReadingTime(minutes) {
  if (!isFinite(minutes) || minutes < 0) return '';
  const m = Math.max(1, Math.round(minutes));
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;
}

// ── PRIME CONTROLLER ──────────────────────────────────────────────────────────
// The ~3-minute pre-reading sequence, shown once per chapter: the chapter's
// driving question, the concept skeleton the reader will fill in, and a
// prediction prompt (pretesting effect — a committed guess before reading
// measurably strengthens encoding, even when wrong). Predictions persist to
// the chapter doc and are surfaced back during consolidation.

const Prime = {
  chapter: null,
  step: 0,
  prediction: '',

  open(chapter) {
    this.chapter = chapter;
    this.step = 0;
    this.prediction = '';
    document.getElementById('prime-kicker').textContent =
      `Before you read · Chapter ${chapter.number}`;
    document.getElementById('prime-overlay').style.display = 'flex';
    this.renderStep();
  },

  steps() {
    return ['driving', 'skeleton', 'prediction'];
  },

  renderStep() {
    const steps = this.steps();
    const kind = steps[this.step];
    const card = document.getElementById('prime-card-content');
    const chapter = this.chapter;

    if (kind === 'driving') {
      const words = splitChapterIntoSegments(chapter._chapterText || '')
        .reduce((n, s) => n + s.wordCount, 0);
      const minutes = words / bookPaceWpm(AppState.selectedBook);
      card.innerHTML = `
        <div class="prime-driving">${chapter.summary_10s || chapter.title}</div>
        <div class="prime-est">This chapter: about ${formatReadingTime(minutes)} at your pace</div>
      `;
    } else if (kind === 'skeleton') {
      const nodes = (chapter.concepts || [])
        .map(c => `<span class="prime-node">${c}</span>`).join('');
      card.innerHTML = `
        <div class="prime-subhead">You'll be collecting these ideas — they turn green as you prove them at checkpoints.</div>
        <div class="prime-skeleton">${nodes || '<em>No concepts listed yet.</em>'}</div>
      `;
    } else {
      const concept = (chapter.concepts || [])[0] || chapter.title;
      card.innerHTML = `
        <div class="prime-subhead">Commit a guess — being wrong now makes the real answer stick harder.</div>
        <div class="prime-pred-q">Before reading: what do you think “${concept}” means in this chapter — and why might it matter?</div>
        <textarea class="prime-pred-input" id="prime-pred-input" rows="3" placeholder="Type a quick prediction — no wrong answers here…"></textarea>
      `;
      document.getElementById('prime-pred-input').focus();
    }

    // Progress dots
    const dots = document.getElementById('prime-dots');
    dots.innerHTML = steps
      .map((_, i) => `<i class="${i === this.step ? 'on' : ''}"></i>`).join('');

    document.getElementById('btn-prime-next').textContent =
      this.step === steps.length - 1 ? 'Start reading →' : 'Continue →';
  },

  next() {
    const steps = this.steps();
    if (steps[this.step] === 'prediction') {
      this.prediction = document.getElementById('prime-pred-input')?.value.trim() || '';
    }
    if (this.step < steps.length - 1) {
      this.step += 1;
      this.renderStep();
    } else {
      this.finish(false);
    }
  },

  finish(skipped) {
    document.getElementById('prime-overlay').style.display = 'none';
    const chapter = this.chapter;
    const book = AppState.selectedBook;
    if (!chapter) return;

    chapter.primed = true;
    if (this.prediction) {
      chapter.predictions = [...(chapter.predictions || []), {
        prompt: `What do you think “${(chapter.concepts || [])[0] || chapter.title}” means in this chapter?`,
        answer: this.prediction,
        at: Date.now()
      }];
    }
    if (book?.isPdfBook) {
      dbPutChapter(book.id, {
        chapterNumber: chapter.number,
        primed: true,
        ...(chapter.predictions ? { predictions: chapter.predictions } : {})
      }).catch(err => console.warn('Prime save failed:', err.message));
    }

    Reader.open(chapter);
    this.chapter = null;
  }
};

function initPrime() {
  document.getElementById('btn-prime-next').addEventListener('click', () => Prime.next());
  document.getElementById('btn-prime-close').addEventListener('click', () => Prime.finish(true));
}

// ── CHECKPOINT CONTROLLER ─────────────────────────────────────────────────────
// Retrieval checkpoint at each segment boundary: rate confidence → answer one
// question generated from the segment text → graded against that text only.
// Pass marks the covered concepts mastered; two failed hints marks them shaky.
// Reading is never blocked: AI failures fall back to a plain continue button,
// and Skip is always available.

const Checkpoint = {
  MAX_HINTS: 2,

  build(segment, index) {
    const card = document.createElement('div');
    card.className = 'checkpoint-card';

    const state = {
      segment, index,
      confidence: null,
      hintRound: 0,
      question: null,
      concepts: [],
      questionPromise: null
    };

    this.renderConfidence(card, state);
    return card;
  },

  segmentText(segment) {
    return segment.paragraphs.join('\n\n');
  },

  // Phase 1 — confidence first (calibration data must precede the answer)
  renderConfidence(card, state) {
    card.innerHTML = `
      <div class="cp-conf-label">How well did you follow that?</div>
      <div class="cp-conf-row"></div>
      <button class="cp-skip" type="button">Skip check →</button>
    `;
    const row = card.querySelector('.cp-conf-row');
    [['shaky', 'Shaky'], ['ok', 'OK'], ['solid', 'Solid']].forEach(([val, label]) => {
      const chip = document.createElement('button');
      chip.className = 'cp-chip';
      chip.type = 'button';
      chip.textContent = label;
      chip.addEventListener('click', () => {
        Reader.markReadingEnd(); // answering starts — stop the reading clock
        state.confidence = val;
        this.startQuestion(card, state);
      });
      row.appendChild(chip);
    });
    card.querySelector('.cp-skip').addEventListener('click', () => {
      Reader.markReadingEnd();
      this.finish(card, state, 'skipped');
    });
  },

  // Phase 2 — generate the question (kicked off only after confidence is set)
  async startQuestion(card, state) {
    card.innerHTML = `
      <div class="cp-loading">
        <span class="cp-spinner"></span> Preparing your check question…
      </div>
      <button class="cp-skip" type="button">Skip check →</button>
    `;
    card.querySelector('.cp-skip').addEventListener('click', () => this.finish(card, state, 'skipped'));

    try {
      const chapter = Reader.chapter;
      const book = AppState.selectedBook;
      let result;
      if (AppState.mode === 'demo') {
        result = {
          question: 'In one or two sentences: what was the key idea of the passage you just read?',
          concepts: (chapter.concepts || []).slice(0, 1)
        };
      } else {
        result = await callCheckpointGenerator(
          this.segmentText(state.segment), chapter.title, book.title, chapter.concepts || []
        );
      }
      state.question = result.question;
      state.concepts = result.concepts;
      this.renderQuestion(card, state);
    } catch (err) {
      console.warn('Checkpoint generation failed, falling back to continue:', err.message);
      this.renderFallback(card, state);
    }
  },

  // Phase 3 — question + answer box
  renderQuestion(card, state, verdictHtml = '') {
    card.innerHTML = `
      <div class="cp-question">${state.question}</div>
      ${verdictHtml}
      <textarea class="cp-answer" rows="2" placeholder="Answer in your own words…"></textarea>
      <div class="cp-actions">
        <button class="btn btn-primary cp-check" type="button">Check</button>
        <button class="cp-skip" type="button">Skip →</button>
        <span class="cp-hint-key">Enter to submit</span>
      </div>
    `;
    const answerEl = card.querySelector('.cp-answer');
    const checkBtn = card.querySelector('.cp-check');

    const submit = () => {
      const answer = answerEl.value.trim();
      if (!answer) { answerEl.focus(); return; }
      this.grade(card, state, answer);
    };
    checkBtn.addEventListener('click', submit);
    answerEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
    });
    card.querySelector('.cp-skip').addEventListener('click', () => this.finish(card, state, 'skipped'));
    answerEl.focus();
  },

  // Phase 4 — grade against the segment text
  async grade(card, state, answer) {
    const answerEl = card.querySelector('.cp-answer');
    const checkBtn = card.querySelector('.cp-check');
    answerEl.disabled = true;
    checkBtn.disabled = true;
    checkBtn.textContent = 'Checking…';

    try {
      let result;
      if (AppState.mode === 'demo') {
        result = answer.length >= 15
          ? { verdict: 'pass', feedback: 'That captures the core idea well.', sourceQuote: '' }
          : { verdict: 'gap', feedback: 'Look again at the main claim of the passage — what is the author really arguing?', sourceQuote: '' };
      } else {
        result = await callCheckpointGrader(this.segmentText(state.segment), state.question, answer, state.hintRound);
      }

      if (result.verdict === 'pass') {
        this.showPass(card, state, result);
      } else {
        state.hintRound += 1;
        if (state.hintRound > this.MAX_HINTS) {
          this.showReveal(card, state, result);
        } else {
          this.showHint(card, state, result);
        }
      }
    } catch (err) {
      console.warn('Checkpoint grading failed, falling back to continue:', err.message);
      this.renderFallback(card, state);
    }
  },

  showPass(card, state, result) {
    const conceptNote = state.concepts.length
      ? ` <strong>${state.concepts.join(', ')}</strong> mastered.`
      : '';
    card.innerHTML = `
      <div class="cp-verdict cp-pass">✓ ${result.feedback}${conceptNote}</div>
    `;
    this.markConcepts(state.concepts, 'mastered');
    this.appendContinue(card, state, 'pass');
  },

  showHint(card, state, result) {
    const quote = result.sourceQuote
      ? `<blockquote class="cp-quote">“${result.sourceQuote}”</blockquote>`
      : '';
    const verdictHtml = `
      <div class="cp-verdict cp-gap">${result.feedback}${quote}</div>
    `;
    this.renderQuestion(card, state, verdictHtml);
  },

  showReveal(card, state, result) {
    const quote = result.sourceQuote
      ? `<blockquote class="cp-quote">“${result.sourceQuote}”</blockquote>`
      : '';
    card.innerHTML = `
      <div class="cp-verdict cp-gap">Here's the key passage — worth a re-read before moving on:${quote}
      <span class="cp-shaky-note">Marked as shaky — it'll get extra review cards.</span></div>
    `;
    this.markConcepts(state.concepts, 'shaky');
    this.appendContinue(card, state, 'shaky');
  },

  // AI unavailable → plain continue, reading never blocks
  renderFallback(card, state) {
    card.innerHTML = `<div class="cp-fallback">Check unavailable right now.</div>`;
    this.appendContinue(card, state, 'skipped');
  },

  appendContinue(card, state, result) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary btn-continue-segment';
    btn.textContent = state.index + 1 === Reader.segments.length
      ? 'Finish chapter →'
      : 'Continue reading →';
    btn.addEventListener('click', () => {
      this.record(state, result);
      Reader.completeSegment(state.index);
    });
    card.appendChild(btn);
    btn.focus();
  },

  finish(card, state, result) {
    this.record(state, result);
    Reader.completeSegment(state.index);
  },

  // Calibration + concept-state persistence on the chapter doc
  record(state, result) {
    const chapter = Reader.chapter;
    const book = AppState.selectedBook;
    if (!chapter || !book?.isPdfBook) return;

    chapter._checkpoints = chapter._checkpoints || [];
    chapter._checkpoints.push({
      segment: state.index,
      confidence: state.confidence,
      result,
      hints: state.hintRound,
      at: Date.now()
    });
    dbPutChapter(book.id, {
      chapterNumber: chapter.number,
      checkpoints: chapter._checkpoints,
      shakyConcepts: AppState.shakyConcepts
    }).catch(err => console.warn('Checkpoint save failed:', err.message));
  },

  markConcepts(concepts, status) {
    if (!concepts.length) return;
    if (status === 'mastered') {
      concepts.forEach(c => {
        if (!AppState.masteredConcepts.includes(c)) AppState.masteredConcepts.push(c);
        AppState.shakyConcepts = (AppState.shakyConcepts || []).filter(s => s !== c);
      });
      showToast(`✓ Mastered: ${concepts.join(', ')}`, 'success');
      saveMasteryProgress().catch(() => {});
    } else {
      AppState.shakyConcepts = AppState.shakyConcepts || [];
      concepts.forEach(c => {
        if (!AppState.shakyConcepts.includes(c) && !AppState.masteredConcepts.includes(c)) {
          AppState.shakyConcepts.push(c);
        }
      });
    }
    if (AppState.selectedChapter) renderConceptMap(AppState.selectedChapter);
  }
};

// ── CONSOLIDATE CONTROLLER ────────────────────────────────────────────────────
// End-of-chapter consolidation: one free-recall brain dump, diffed against
// the chapter's concepts (grounded in the text), then review cards generated
// from the student's actual gaps. Also surfaces the Prime prediction and the
// chapter's confidence-vs-accuracy calibration line.

const Consolidate = {
  chapter: null,
  diff: null,

  open(chapter) {
    this.chapter = chapter;
    this.diff = null;
    document.getElementById('consolidate-overlay').style.display = 'flex';
    this.renderDump();
  },

  close() {
    document.getElementById('consolidate-overlay').style.display = 'none';
    this.chapter = null;
    this.diff = null;
  },

  renderDump() {
    const body = document.getElementById('consolidate-body');
    body.innerHTML = `
      <div class="prime-kicker">Brain dump · Chapter ${this.chapter.number}</div>
      <h3 class="consolidate-title">Write everything you remember.<br>Don't look back.</h3>
      <textarea class="consolidate-canvas" id="consolidate-canvas" rows="7"
        placeholder="Concepts, arguments, examples — in any order, in your own words…"></textarea>
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-consolidate-submit">Check my recall →</button>
      </div>
    `;
    document.getElementById('btn-consolidate-submit')
      .addEventListener('click', () => this.submitDump());
    document.getElementById('consolidate-canvas').focus();
  },

  async submitDump() {
    const dump = document.getElementById('consolidate-canvas').value.trim();
    if (dump.length < 20) {
      showToast('Give it a real attempt — write at least a sentence or two.', 'info');
      return;
    }

    const body = document.getElementById('consolidate-body');
    body.innerHTML = `
      <div class="cp-loading" style="justify-content:center; padding:3rem 0;">
        <span class="cp-spinner"></span> Comparing your recall against the chapter…
      </div>
    `;

    const chapter = this.chapter;
    const book = AppState.selectedBook;

    try {
      let diff;
      if (AppState.mode === 'demo') {
        const cs = chapter.concepts || [];
        diff = { recalled: cs.slice(0, 1), missed: cs.slice(1, 2), mixedUp: [] };
      } else {
        diff = await callRecallDiff(
          dump, chapter.concepts || [], chapter._chapterText || chapter.summary_15m || '',
          chapter.title, book.title
        );
      }
      this.diff = diff;

      // Persist the dump + diff (background)
      if (book?.isPdfBook) {
        dbPutChapter(book.id, {
          chapterNumber: chapter.number,
          brainDump: dump,
          recallDiff: diff
        }).catch(err => console.warn('Brain dump save failed:', err.message));
      }

      this.renderResults();
    } catch (err) {
      console.warn('Recall diff failed:', err.message);
      body.innerHTML = `
        <div class="cp-fallback" style="text-align:center; padding:2rem 0;">
          Couldn't grade your recall right now — your brain dump still did its job.
        </div>
        <div class="consolidate-actions">
          <button class="btn btn-primary" id="btn-consolidate-done">Done</button>
        </div>
      `;
      document.getElementById('btn-consolidate-done')
        .addEventListener('click', () => this.finish(false));
    }
  },

  renderResults() {
    const { recalled, missed, mixedUp } = this.diff;
    const chapter = this.chapter;
    const body = document.getElementById('consolidate-body');

    const bucket = (title, cls, items) => items.length ? `
      <div class="recall-col ${cls}">
        <div class="recall-col-head"><i></i>${title}</div>
        ${items.join('')}
      </div>` : '';

    const recalledHtml = bucket('Recalled', 'recalled',
      recalled.map(c => `<span class="recall-memo">${c}</span>`));
    const missedHtml = bucket('Missed', 'missed',
      missed.map(c => `<span class="recall-memo">${c}</span>`));
    const mixedHtml = bucket('Mixed up', 'mixed',
      mixedUp.map(m => `<span class="recall-memo">${m.note}${m.quote ? `<blockquote class="cp-quote">“${m.quote}”</blockquote>` : ''}</span>`));

    // Calibration line from this chapter's checkpoints
    const cps = (chapter._checkpoints || []).filter(c => c.confidence);
    let calibrationHtml = '';
    if (cps.length) {
      const confident = cps.filter(c => c.confidence !== 'shaky');
      const confidentRight = confident.filter(c => c.result === 'pass');
      calibrationHtml = `<div class="consolidate-calibration">
        You felt confident on <strong>${confident.length}</strong> check${confident.length === 1 ? '' : 's'}
        and were right on <strong>${confidentRight.length}</strong>.
      </div>`;
    }

    // Prime prediction, shown back against reality
    const pred = (chapter.predictions || [])[0];
    const predHtml = pred ? `
      <div class="consolidate-prediction">
        <span class="recall-col-head" style="color:var(--indigo)"><i style="background:var(--indigo)"></i>Your prediction, before reading</span>
        <span class="recall-memo">“${pred.answer}”</span>
      </div>` : '';

    const gapCount = missed.length + mixedUp.length;
    const cta = gapCount
      ? `Create my review cards →`
      : `Finish chapter →`;

    body.innerHTML = `
      <div class="prime-kicker">Recall check · Chapter ${chapter.number}</div>
      <div class="recall-buckets">
        ${recalledHtml}${missedHtml}${mixedHtml}
      </div>
      ${predHtml}
      ${calibrationHtml}
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-consolidate-cards">${cta}</button>
      </div>
    `;
    document.getElementById('btn-consolidate-cards')
      .addEventListener('click', () => this.generateCards());
  },

  async generateCards() {
    const chapter = this.chapter;
    const book = AppState.selectedBook;
    const btn = document.getElementById('btn-consolidate-cards');
    btn.disabled = true;
    btn.textContent = 'Writing your cards…';

    try {
      let cards;
      if (AppState.mode === 'demo') {
        cards = (this.diff.missed || []).map(c => ({
          front: `What does the chapter say about "${c}"?`,
          back: chapter.summary_10s || 'See the chapter text.',
          concept: c
        }));
      } else if (this.diff.missed.length + this.diff.mixedUp.length + this.diff.recalled.length === 0) {
        cards = [];
      } else {
        cards = await callGapCardGenerator(
          this.diff, chapter._chapterText || chapter.summary_15m || '',
          chapter.title, book.title
        );
      }

      if (cards.length) {
        // Tag provenance so reviews can point back to this chapter
        const stamped = cards.map(c => ({ ...c, source: 'consolidation', chapterNumber: chapter.number }));
        chapter.flashcards = [...(chapter.flashcards || []), ...stamped];
        if (book?.isPdfBook) {
          await dbPutChapter(book.id, { chapterNumber: chapter.number, flashcards: chapter.flashcards });
        }
        showToast(`${stamped.length} review card${stamped.length === 1 ? '' : 's'} added to your deck.`, 'success');
      }
      this.finish(true);
    } catch (err) {
      console.warn('Gap card generation failed:', err.message);
      showToast('Could not create cards right now — the recall check still counts.', 'info');
      this.finish(true);
    }
  },

  finish(consolidated) {
    const chapter = this.chapter;
    const book = AppState.selectedBook;
    if (chapter && book?.isPdfBook && consolidated) {
      chapter.consolidated = true;
      dbPutChapter(book.id, { chapterNumber: chapter.number, consolidated: true })
        .catch(() => {});
    }
    this.close();
    if (Reader.active) Reader.renderColumn();
  }
};

function initConsolidate() {
  document.getElementById('btn-consolidate-close')
    .addEventListener('click', () => Consolidate.close());
}

// ════════════════════════════════════════════════════════════════════════════
// LANGUAGES SECTION
// ════════════════════════════════════════════════════════════════════════════

// ── DEMO MOCKS (keyless path) ─────────────────────────────────────────────────
function demoLanguageProfile(name) {
  const n = name.toLowerCase();
  if (n.includes('japan') || n.includes('日本')) {
    return {
      name: 'Japanese', nativeName: '日本語', code: 'ja', ttsLangCode: 'ja-JP',
      script: 'kana-kanji', scriptName: 'Kana + Kanji', romanizationName: 'Rōmaji',
      notes: 'Two phonetic alphabets plus kanji characters; pitch accent instead of stress.',
      altScripts: []
    };
  }
  if (n.includes('urdu')) {
    return {
      name: 'Urdu', nativeName: 'اردو', code: 'ur', ttsLangCode: 'ur-PK',
      script: 'arabic', scriptName: 'Nastaliq (Perso-Arabic)', romanizationName: 'Roman Urdu',
      notes: 'Written right-to-left in flowing Nastaliq; short vowels are usually unwritten — much easier if you already speak it.',
      altScripts: []
    };
  }
  if (n.includes('punjab')) {
    return {
      name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', code: 'pa', ttsLangCode: 'pa-IN',
      script: 'other', scriptName: 'Gurmukhi', romanizationName: 'romanization',
      notes: 'Spoken across India and Pakistan — but written in two different scripts depending on where.',
      altScripts: [
        { script: 'other', scriptName: 'Gurmukhi', romanizationName: 'romanization',
          note: 'Used in Indian Punjab — the script of the Guru Granth Sahib' },
        { script: 'arabic', scriptName: 'Shahmukhi', romanizationName: 'Roman Punjabi',
          note: 'Used in Pakistani Punjab — if you read Urdu script you nearly have it already' }
      ]
    };
  }
  return {
    name: 'Spanish', nativeName: 'Español', code: 'es', ttsLangCode: 'es-ES',
    script: 'latin', scriptName: 'Latin alphabet', romanizationName: null,
    notes: 'Highly phonetic spelling — words sound the way they are written.',
    altScripts: []
  };
}

function demoSeedCards(profile) {
  if (profile.script !== 'latin') {
    return [
      { front: 'こんにちは', back: 'Hello', word: 'こんにちは', romanization: 'konnichiwa', type: 'vocab' },
      { front: 'ありがとう', back: 'Thank you', word: 'ありがとう', romanization: 'arigatou', type: 'vocab' },
      { front: 'はい、そうです', back: 'Yes, that\'s right', word: 'はい', romanization: 'hai, sou desu', type: 'vocab' },
      { front: 'あ', back: 'The sound "a" — like the a in "father"', word: 'あ', romanization: 'a', type: 'script' },
      { front: 'い', back: 'The sound "i" — like the ee in "see"', word: 'い', romanization: 'i', type: 'script' },
      { front: 'う', back: 'The sound "u" — like the oo in "food"', word: 'う', romanization: 'u', type: 'script' }
    ];
  }
  return [
    { front: 'Hola, ¿cómo estás?', back: 'Hello, how are you?', word: 'hola', romanization: null, type: 'vocab' },
    { front: 'Muchas gracias', back: 'Thank you very much', word: 'gracias', romanization: null, type: 'vocab' },
    { front: 'Sí, por favor', back: 'Yes, please', word: 'por favor', romanization: null, type: 'vocab' },
    { front: 'Yo tengo un libro', back: 'I have a book', word: 'tener', romanization: null, type: 'vocab' },
    { front: 'No entiendo', back: 'I don\'t understand', word: 'entender', romanization: null, type: 'vocab' },
    { front: '¿Dónde está el baño?', back: 'Where is the bathroom?', word: 'dónde', romanization: null, type: 'vocab' }
  ];
}

// ── LANGUAGES VIEW ────────────────────────────────────────────────────────────
async function renderLanguages() {
  const grid = document.getElementById('lang-grid');
  if (!grid) return;

  grid.querySelectorAll('.lang-card').forEach(c => c.remove());
  const languages = await dbGetAllLanguages();

  // Keep the reader's "Add to vocab" harvest target fresh
  AppState._harvestLang = languages.find(l => getRecipe(l).id === 'vocabExpand') || null;

  for (const lang of languages) {
    // Due count across this language's card batches
    let due = 0;
    try {
      const batches = await dbGetLangCardBatches(lang.id);
      batches.forEach(b => (b.flashcards || []).forEach(c => { if (isCardDue(c)) due++; }));
    } catch (_) { /* card count is decorative — never block the view */ }

    const recipe = getRecipe(lang);
    const coverageHtml = recipe.ui?.coverageMeter ? (() => {
      const pct = (quranCoverage(lang.rootsLearned || []) * 100).toFixed(1);
      return `<div class="lang-coverage">
        <div class="lang-coverage-track"><div class="lang-coverage-fill" style="width:${pct}%"></div></div>
        <span class="lang-coverage-label">${pct}% of the Quran readable</span>
      </div>`;
    })() : '';

    const card = document.createElement('div');
    card.className = 'lang-card';
    card.innerHTML = `
      <div class="lang-card-head">
        <span class="lang-native">${lang.nativeName}</span>
        <span class="lang-level-chip">${lang.level}</span>
      </div>
      <div class="lang-card-name">${lang.name}</div>
      <div class="lang-card-meta">
        <span>${lang.scriptName}</span>
        <span>·</span>
        <span>${due} card${due === 1 ? '' : 's'} due</span>
        ${lang.streak ? `<span>·</span><span>${lang.streak}-day streak</span>` : ''}
      </div>
      ${coverageHtml}
      <button class="btn btn-primary lang-card-cta">Start today's session →</button>
    `;
    card.querySelector('.lang-card-cta').addEventListener('click', () => LangSession.start(lang));

    // Script bootcamp: non-Latin languages can pull the next unit of their
    // writing system into the deck (kana rows, letter groups, hanzi by
    // frequency). Fades out once the learner is past A1 — except for the
    // literacy recipe, where the script IS the course and it always shows.
    if (lang.script && lang.script !== 'latin'
        && (['A0', 'A1'].includes(lang.level) || recipe.id === 'literacy')) {
      const scriptBtn = document.createElement('button');
      scriptBtn.className = 'btn btn-ghost lang-script-btn';
      scriptBtn.textContent = `Script bootcamp · unit ${(lang.scriptUnit || 0) + 1} →`;
      scriptBtn.addEventListener('click', () => startScriptUnit(lang, scriptBtn));
      card.appendChild(scriptBtn);
    }
    grid.insertBefore(card, document.getElementById('btn-add-language'));
  }
}

// ── DAILY SESSION PLAYER ──────────────────────────────────────────────────────
// One overlay, one activity at a time. Currently: Story (input strand) → Wrap.
// Review lives in the Flashcards deck; Converse and Shadow strands join the
// player in the next build steps.

function demoLangLesson(lang) {
  if (lang.script && lang.script !== 'latin') {
    return {
      title: 'ねこと さかな', titleGloss: 'The Cat and the Fish',
      sentences: [
        { text: 'ねこが います。', romanization: 'neko ga imasu.', gloss: 'There is a cat.' },
        { text: 'ねこは さかなが すきです。', romanization: 'neko wa sakana ga suki desu.', gloss: 'The cat likes fish.' },
        { text: 'でも、さかなは いません。', romanization: 'demo, sakana wa imasen.', gloss: 'But there is no fish.' },
        { text: 'ねこは かなしいです。', romanization: 'neko wa kanashii desu.', gloss: 'The cat is sad.' }
      ],
      newWords: [
        { word: 'ねこ', romanization: 'neko', meaning: 'cat', exampleSentence: 'ねこが います。' },
        { word: 'さかな', romanization: 'sakana', meaning: 'fish', exampleSentence: 'ねこは さかなが すきです。' },
        { word: 'かなしい', romanization: 'kanashii', meaning: 'sad', exampleSentence: 'ねこは かなしいです。' }
      ],
      checkpoints: [{ question: 'What does the cat like?' }, { question: 'Why is the cat sad at the end?' }],
      shadowSentences: ['ねこが います。', 'ねこは さかなが すきです。'],
      chatTopic: 'Do you have a pet? What does it like?'
    };
  }
  return {
    title: 'El gato y el pescado', titleGloss: 'The Cat and the Fish',
    sentences: [
      { text: 'Hay un gato.', romanization: null, gloss: 'There is a cat.' },
      { text: 'El gato quiere pescado.', romanization: null, gloss: 'The cat wants fish.' },
      { text: 'Pero no hay pescado en la casa.', romanization: null, gloss: 'But there is no fish in the house.' },
      { text: 'El gato está triste.', romanization: null, gloss: 'The cat is sad.' }
    ],
    newWords: [
      { word: 'gato', romanization: null, meaning: 'cat', exampleSentence: 'Hay un gato.' },
      { word: 'pescado', romanization: null, meaning: 'fish', exampleSentence: 'El gato quiere pescado.' },
      { word: 'triste', romanization: null, meaning: 'sad', exampleSentence: 'El gato está triste.' }
    ],
    checkpoints: [{ question: 'What does the cat want?' }, { question: 'Why is the cat sad at the end?' }],
    shadowSentences: ['Hay un gato.', 'El gato quiere pescado.'],
    chatTopic: 'Do you have a pet? What does it like?'
  };
}

// ── QURANIC ROOT LESSONS ──────────────────────────────────────────────────────
// One root family (or function-word group) per session, in corpus-frequency
// order from quran-roots-data.js. The static file owns WHICH root and its
// frequency; the LLM writes the teaching content around it.

function demoRootLesson(entry) {
  return {
    waznExplanation: 'The pattern faʿīl turns a root into an intensive "doer" word — raḥīm (ever-merciful) grows from r-ḥ-m the way karīm (ever-generous) grows from k-r-m.',
    derivedWords: [
      { word: 'رَحْمَة', romanization: 'raḥmah', meaning: 'mercy', pattern: 'faʿlah' },
      { word: 'رَحِيم', romanization: 'raḥīm', meaning: 'most merciful', pattern: 'faʿīl' },
      { word: 'رَحْمَٰن', romanization: 'raḥmān', meaning: 'the Most Gracious', pattern: 'faʿlān' }
    ],
    verses: [
      { arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', reference: 'Al-Fātiḥah 1:1',
        romanization: 'bismi llāhi r-raḥmāni r-raḥīm',
        gloss: 'In the name of Allah, the Most Gracious, the Most Merciful.',
        wordGlosses: [
          { word: 'بِسْمِ', gloss: 'in the name of' }, { word: 'اللَّهِ', gloss: 'Allah' },
          { word: 'الرَّحْمَٰنِ', gloss: 'the Most Gracious' }, { word: 'الرَّحِيمِ', gloss: 'the Most Merciful' }
        ] }
    ],
    checkpoints: [
      { question: 'Which two words in this verse come from the same root family?' },
      { question: 'What is the core meaning shared by the whole r-ḥ-m family?' }
    ]
  };
}

async function generateQuranicLesson(lang) {
  const entry = nextQuranRoot(lang.rootsLearned || []);
  if (!entry) {
    // Whole curriculum finished — a review-only session
    return { kind: 'quranic', complete: true, rootId: null, derivedWords: [], verses: [],
             checkpoints: [], shadowSentences: [], newWords: [], chatTopic: '' };
  }

  const learnedTranslits = (lang.rootsLearned || [])
    .map(id => QURAN_ROOTS.find(r => r.id === id)?.translit)
    .filter(Boolean);

  const core = AppState.mode === 'demo'
    ? demoRootLesson(entry)
    : await callRootLessonGenerator(entry, learnedTranslits);

  return {
    kind: 'quranic',
    rootId: entry.id,
    root: entry.root,
    translit: entry.translit,
    rootGloss: entry.gloss,
    rootKind: entry.kind,
    rootCount: entry.count,
    waznExplanation: core.waznExplanation,
    derivedWords: core.derivedWords,
    verses: core.verses,
    checkpoints: core.checkpoints,
    shadowSentences: core.verses.map(v => v.arabic).slice(0, 3),
    newWords: core.derivedWords.map(w => ({
      word: w.word,
      romanization: w.romanization || null,
      meaning: w.meaning,
      exampleSentence: core.verses[0]?.arabic || ''
    })),
    chatTopic: ''
  };
}

registerRecipeLessonGenerator('quranic', generateQuranicLesson);

// ── LITERACY LESSONS (heritage speakers: script is the course) ───────────────

function demoLiteracyLesson(lang) {
  return {
    kind: 'literacy',
    drills: [
      { written: 'پانی', romanization: 'paani', meaning: 'water', distractors: ['bread', 'door'] },
      { written: 'گھر', romanization: 'ghar', meaning: 'house/home', distractors: ['street', 'tree'] },
      { written: 'کتاب', romanization: 'kitaab', meaning: 'book', distractors: ['pen', 'table'] }
    ],
    shadowSentences: ['پانی', 'گھر', 'کتاب'],
    newWords: [
      { word: 'پانی', romanization: 'paani', meaning: 'water', exampleSentence: 'پانی' },
      { word: 'گھر', romanization: 'ghar', meaning: 'house/home', exampleSentence: 'گھر' },
      { word: 'کتاب', romanization: 'kitaab', meaning: 'book', exampleSentence: 'کتاب' }
    ],
    checkpoints: [],
    chatTopic: ''
  };
}

async function generateLiteracyLesson(lang) {
  const drills = AppState.mode === 'demo'
    ? demoLiteracyLesson(lang).drills
    : await callDecodeDrillGenerator(lang, lang.learnedChars || [], lang.knownWords || []);

  return {
    kind: 'literacy',
    drills,
    // Recite the words you just decoded — hearing them closes the loop
    shadowSentences: drills.map(d => d.written).slice(0, 4),
    newWords: drills.map(d => ({
      word: d.written,
      romanization: d.romanization || null,
      meaning: d.meaning,
      exampleSentence: d.written
    })),
    checkpoints: [],
    chatTopic: ''
  };
}

registerRecipeLessonGenerator('literacy', generateLiteracyLesson);

// ── VOCAB-EXPANSION LESSONS (fluent speakers: the long tail) ─────────────────

function demoVocabLesson(lang) {
  return {
    kind: 'vocabExpand',
    precisionWords: [
      { word: 'parsimonious', meaning: 'extremely unwilling to spend resources; stingy in a principled way',
        example: 'The committee was parsimonious with its praise, granting it only when truly earned.',
        cloze: 'The committee was _____ with its praise, granting it only when truly earned.',
        contrast: 'Unlike "frugal" (a virtue of thrift), it implies a withholding nature.' },
      { word: 'perfunctory', meaning: 'done as a routine duty, without real interest or care',
        example: 'He gave the report a perfunctory glance and signed it.',
        cloze: 'He gave the report a _____ glance and signed it.',
        contrast: 'Unlike "careless", it implies going through the motions of an obligation.' }
    ],
    checkpoints: [],
    shadowSentences: [],
    chatTopic: '',
    newWords: [
      { word: 'parsimonious', romanization: null, meaning: 'extremely unwilling to spend; stingy',
        exampleSentence: 'The committee was _____ with its praise, granting it only when truly earned.' },
      { word: 'perfunctory', romanization: null, meaning: 'done as routine duty, without care',
        exampleSentence: 'He gave the report a _____ glance and signed it.' }
    ]
  };
}

async function generateVocabExpandLesson(lang) {
  if (AppState.mode === 'demo') return demoVocabLesson(lang);

  const words = await callPrecisionWords(lang, lang.frontierBand || 4, lang.knownWords || []);
  return {
    kind: 'vocabExpand',
    precisionWords: words,
    checkpoints: [],
    shadowSentences: [],
    chatTopic: '',
    // Cards: front = cloze sentence, back = word + meaning (precision, not translation)
    newWords: words.map(w => ({
      word: w.word,
      romanization: null,
      meaning: w.meaning,
      exampleSentence: w.cloze
    }))
  };
}

registerRecipeLessonGenerator('vocabExpand', generateVocabExpandLesson);

// ── CONTINUOUS LEVEL RECALIBRATION ───────────────────────────────────────────
// levelScore (0-100) is the running estimate of the learner's level; the CEFR
// string is DERIVED from it (never set independently — the romanization fade
// and level chips key off the string). Every real interaction is evidence:
// story checkpoints, card grades, shadow self-rates, conversation turns.
// Deltas accumulate per language and flush to Firestore debounced, with a
// ±3-points-per-day movement cap so no single session swings the level.

function levelFromScore(score) {
  if (score < 15) return 'A0';
  if (score < 35) return 'A1';
  if (score < 55) return 'A2';
  if (score < 75) return 'B1';
  return 'B2';
}

const _levelFlushTimers = {};

function updateLevelEstimate(langId, delta) {
  if (!langId || !delta) return;
  if (!AppState._langLevelDeltas) AppState._langLevelDeltas = {};
  AppState._langLevelDeltas[langId] = (AppState._langLevelDeltas[langId] || 0) + delta;
  clearTimeout(_levelFlushTimers[langId]);
  _levelFlushTimers[langId] = setTimeout(() => flushLevelEstimate(langId), 4000);
}

async function flushLevelEstimate(langId) {
  const delta = AppState._langLevelDeltas?.[langId] || 0;
  if (!delta) return;
  AppState._langLevelDeltas[langId] = 0;

  try {
    const col = userCol('languages');
    if (!col) return;
    const snap = await col.doc(langId).get();
    if (!snap.exists) return;
    const lang = snap.data();

    // Daily movement budget: |total movement today| ≤ 3 points
    const today = todayKey();
    const movedToday = lang.levelMoveDay === today ? (lang.levelMovedToday || 0) : 0;
    const applied = Math.max(-3 - movedToday, Math.min(3 - movedToday, delta));
    if (!applied) return;

    const levelScore = Math.max(0, Math.min(100, (lang.levelScore ?? 8) + applied));
    const level = levelFromScore(levelScore);
    const levelEvidence = [...(lang.levelEvidence || []), { at: Date.now(), delta: Math.round(applied * 10) / 10 }].slice(-20);

    await col.doc(langId).set({
      levelScore, level, levelEvidence,
      levelMoveDay: today, levelMovedToday: movedToday + applied
    }, { merge: true });

    // Keep any live in-memory copy coherent with what was just written
    if (LangSession.lang?.id === langId) {
      LangSession.lang.levelScore = levelScore;
      LangSession.lang.level = level;
    }
  } catch (err) {
    console.warn('Level estimate flush failed:', err.message);
  }
}

// Card grades in the unified SM-2 deck are level evidence for language cards
function signalCardGrade(card, score) {
  if (card._src?.type !== 'langCards') return;
  const delta = { easy: 0.3, good: 0.3, hard: -0.1, forgot: -0.4 }[score] || 0;
  if (delta) updateLevelEstimate(card._src.langId, delta);
}

const LangSession = {
  lang: null,
  lesson: null,
  recipe: null,
  activityIdx: 0,
  activities: ['review', 'story', 'converse', 'shadow', 'wrap'],
  checkpointsPassed: 0,
  chatHistory: [],
  reviewQueue: [],
  shadowRatings: {},

  async start(lang) {
    this.lang = lang;
    this.recipe = getRecipe(lang);
    this.activities = [...this.recipe.strands];
    this.activityIdx = 0;
    this.checkpointsPassed = 0;
    this.chatHistory = [];
    this.reviewQueue = [];
    this.shadowRatings = {};

    const overlay = document.getElementById('lang-session-overlay');
    const body = document.getElementById('lang-session-body');
    overlay.style.display = 'flex';
    body.innerHTML = `
      <div class="cp-loading" style="justify-content:center; padding:3rem 0;">
        <span class="cp-spinner"></span> ${this.recipe.loadingCopy(lang)}
      </div>
    `;

    try {
      const dateKey = todayKey();
      let lesson = await dbGetLangLesson(lang.id, dateKey);
      if (!lesson) {
        lesson = await getLessonGenerator(this.recipe.id)(lang);
        await dbPutLangLesson(lang.id, dateKey, lesson);
      }
      // Rough shadow sentences from the previous session come back for redo
      if (Array.isArray(lang.roughShadow) && lang.roughShadow.length) {
        lesson.shadowSentences = [...new Set([...lang.roughShadow, ...(lesson.shadowSentences || [])])].slice(0, 6);
      }

      this.lesson = lesson;
      this.renderActivity();
    } catch (err) {
      console.warn('Lesson generation failed:', err.message);
      body.innerHTML = `
        <div class="cp-fallback" style="text-align:center; padding:2rem 0;">
          Couldn't build today's lesson: ${err.message}
        </div>
        <div class="consolidate-actions"><button class="btn btn-ghost" onclick="LangSession.close()">Close</button></div>
      `;
    }
  },

  close() {
    document.getElementById('lang-session-overlay').style.display = 'none';
    this.lang = null;
    this.lesson = null;
  },

  dotsHtml() {
    return `<div class="prime-dots lang-session-dots">${this.activities
      .map((_, i) => `<i class="${i === this.activityIdx ? 'on' : ''}"></i>`).join('')}</div>`;
  },

  next() {
    if (this.activityIdx < this.activities.length - 1) {
      this.activityIdx += 1;
      this.renderActivity();
      document.getElementById('lang-session-overlay').scrollTop = 0;
    }
  },

  renderActivity() {
    const kind = this.activities[this.activityIdx];
    const recipeMethod = RECIPE_ACTIVITY_RENDERERS[kind];
    if (kind === 'review') this.renderReview();
    else if (kind === 'story') this.renderStory();
    else if (kind === 'converse') this.renderConverse();
    else if (kind === 'shadow') this.renderShadow();
    // Recipe-specific strands (decode, rootLesson, verses, recite, precision)
    // must dispatch BEFORE the wrap catch-all below.
    else if (recipeMethod && typeof this[recipeMethod] === 'function') this[recipeMethod]();
    else this.renderWrap();
  },

  // ── REVIEW (vocab strand) ──
  // Due cards for THIS language, inline (capped at 10 — the full unified deck
  // lives in the Flashcards tab). Ratings run the same SM-2 persistence path.
  async renderReview() {
    const { lang } = this;
    const body = document.getElementById('lang-session-body');
    body.innerHTML = `
      <div class="cp-loading" style="justify-content:center; padding:2rem 0;">
        <span class="cp-spinner"></span> Checking what's due…
      </div>
    `;

    try {
      const allDue = await collectDueCards();
      this.reviewQueue = allDue.filter(c => c._src?.type === 'langCards' && c._src.langId === lang.id).slice(0, 10);
    } catch (err) {
      console.warn('Review collection failed:', err.message);
      this.reviewQueue = [];
    }

    if (!this.reviewQueue.length) {
      this.next(); // nothing due — straight to the story
      return;
    }
    this.renderReviewCard(0);
  },

  renderReviewCard(idx) {
    const { lang } = this;
    const body = document.getElementById('lang-session-body');

    if (idx >= this.reviewQueue.length) { this.next(); return; }
    const card = this.reviewQueue[idx];
    const earlyLevel = ['A0', 'A1'].includes(lang.level);

    body.innerHTML = `
      <div class="prime-kicker">Review · ${lang.name}</div>
      ${this.dotsHtml()}
      <p class="story-title-gloss">${idx + 1} of ${this.reviewQueue.length} due</p>
      <div class="session-card" id="session-review-card">
        <div class="session-card-front">
          <span class="session-card-text">${card.front}</span>
          ${card.romanization && earlyLevel ? `<span class="story-rom">${card.romanization}</span>` : ''}
        </div>
        <div class="session-card-back" style="display:none;">
          <span class="session-card-answer">${card.back}</span>
          ${card.romanization && !earlyLevel ? `<span class="story-rom">${card.romanization}</span>` : ''}
        </div>
        <span class="card-flip-hint" id="session-flip-hint">Tap to reveal</span>
      </div>
      <div class="session-rate-row" id="session-rate-row" style="visibility:hidden;">
        <button class="session-rate-btn" data-score="forgot">Forgot</button>
        <button class="session-rate-btn" data-score="hard">Hard</button>
        <button class="session-rate-btn" data-score="good">Good</button>
        <button class="session-rate-btn" data-score="easy">Easy</button>
      </div>
      <div class="consolidate-actions" style="gap:0.8rem;">
        <button class="btn btn-ghost" id="btn-review-speak">🔊 Hear it</button>
        <button class="cp-skip" id="btn-review-skip">Skip review →</button>
      </div>
    `;

    const cardEl = document.getElementById('session-review-card');
    cardEl.addEventListener('click', () => {
      cardEl.querySelector('.session-card-back').style.display = 'block';
      document.getElementById('session-flip-hint').style.display = 'none';
      document.getElementById('session-rate-row').style.visibility = 'visible';
    });

    document.getElementById('btn-review-speak').addEventListener('click', (e) => {
      e.stopPropagation();
      if (!NarrationEngine.speakLang(card.front, lang.ttsLangCode || lang.code)) {
        showToast(`No ${lang.name} voice on this device.`, 'info', 3000);
      }
    });

    body.querySelectorAll('.session-rate-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const scheduled = sm2Schedule(card, btn.dataset.score);
        signalCardGrade(card, btn.dataset.score);
        persistCardSchedule(scheduled).catch(err => console.warn('Card save failed:', err.message));
        this.renderReviewCard(idx + 1);
      });
    });

    document.getElementById('btn-review-skip').addEventListener('click', () => this.next());
  },

  // ── STORY (input strand) ──
  renderStory() {
    const { lang, lesson } = this;
    const earlyLevel = ['A0', 'A1'].includes(lang.level);
    const body = document.getElementById('lang-session-body');

    const sentencesHtml = lesson.sentences.map((s, i) => `
      <div class="story-sentence" data-idx="${i}">
        <button class="story-play" data-idx="${i}" title="Hear it">
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M6 4l10 6-10 6V4z"/></svg>
        </button>
        <div class="story-sentence-text">
          <span class="story-target">${s.text}</span>
          ${s.romanization && earlyLevel ? `<span class="story-rom">${s.romanization}</span>` : ''}
          <span class="story-gloss" style="display:none;">${s.gloss}${s.romanization && !earlyLevel ? ` · ${s.romanization}` : ''}</span>
        </div>
      </div>
    `).join('');

    const checkpointsHtml = lesson.checkpoints.map((c, i) => `
      <div class="lang-checkpoint" data-idx="${i}">
        <div class="cp-question">${c.question}</div>
        <textarea class="cp-answer" rows="2" placeholder="Answer in English — show you followed the story…"></textarea>
        <div class="cp-actions">
          <button class="btn btn-primary lang-cp-check" data-idx="${i}">Check</button>
        </div>
        <div class="lang-cp-verdict"></div>
      </div>
    `).join('');

    body.innerHTML = `
      <div class="prime-kicker">Today's story · ${lang.name}</div>
      ${this.dotsHtml()}
      <h3 class="consolidate-title story-title">${lesson.title}</h3>
      <p class="story-title-gloss">${lesson.titleGloss} · tap a sentence for its meaning</p>
      <div class="story-body">${sentencesHtml}</div>
      <div class="story-checkpoints">
        <div class="recall-col-head" style="color:var(--purple)"><i style="background:var(--purple)"></i>Did you follow it?</div>
        ${checkpointsHtml}
      </div>
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-story-continue">Continue →</button>
      </div>
    `;

    // Tap a sentence → toggle its gloss
    body.querySelectorAll('.story-sentence-text').forEach(el => {
      el.addEventListener('click', () => {
        const gloss = el.querySelector('.story-gloss');
        gloss.style.display = gloss.style.display === 'none' ? 'block' : 'none';
      });
    });

    // ▶ speaks the sentence
    body.querySelectorAll('.story-play').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const s = lesson.sentences[parseInt(btn.dataset.idx)];
        if (!NarrationEngine.speakLang(s.text, lang.ttsLangCode || lang.code, 0.85)) {
          showToast(`No ${lang.name} voice on this device — audio unavailable.`, 'info', 3500);
        }
      });
    });

    // Comprehension checks, graded against the story + glosses
    const storyGroundTruth = lesson.sentences.map(s => `${s.text} (${s.gloss})`).join('\n');
    body.querySelectorAll('.lang-cp-check').forEach(btn => {
      btn.addEventListener('click', async () => {
        const wrap = btn.closest('.lang-checkpoint');
        const answerEl = wrap.querySelector('.cp-answer');
        const verdictEl = wrap.querySelector('.lang-cp-verdict');
        const answer = answerEl.value.trim();
        if (!answer) { answerEl.focus(); return; }

        btn.disabled = true;
        btn.textContent = 'Checking…';
        try {
          const q = lesson.checkpoints[parseInt(wrap.dataset.idx)].question;
          const result = AppState.mode === 'demo'
            ? (answer.length >= 10
                ? { verdict: 'pass', feedback: 'Right — you followed the story.', sourceQuote: '' }
                : { verdict: 'gap', feedback: 'Look at the story again — what happens to the fish?', sourceQuote: '' })
            : await callCheckpointGrader(storyGroundTruth, q, answer, 0);

          verdictEl.innerHTML = result.verdict === 'pass'
            ? `<div class="cp-verdict cp-pass">✓ ${result.feedback}</div>`
            : `<div class="cp-verdict cp-gap">${result.feedback}</div>`;
          if (result.verdict === 'pass') {
            this.checkpointsPassed += 1;
            updateLevelEstimate(lang.id, 1.5);
            btn.style.display = 'none';
            answerEl.disabled = true;
          } else {
            updateLevelEstimate(lang.id, -1.5);
            btn.disabled = false;
            btn.textContent = 'Check again';
          }
        } catch (err) {
          verdictEl.innerHTML = `<div class="cp-fallback">Check unavailable — keep going.</div>`;
          btn.style.display = 'none';
        }
      });
    });

    document.getElementById('btn-story-continue').addEventListener('click', () => this.next());
  },

  // ── CONVERSE (output strand) ──
  // Chat with the partner about the story's topic. Corrections arrive as
  // ✏️ recast lines, each offering a one-tap "+ Card" into the review deck.
  renderConverse() {
    const { lang, lesson } = this;
    const body = document.getElementById('lang-session-body');

    body.innerHTML = `
      <div class="prime-kicker">Talk about it · ${lang.name}</div>
      ${this.dotsHtml()}
      <h3 class="consolidate-title lang-chat-topic">${lesson.chatTopic || 'Tell me about the story.'}</h3>
      <p class="story-title-gloss">Answer in ${lang.name} as best you can — broken sentences are welcome. Mistakes come back as corrections you can keep.</p>
      <div class="lang-chat" id="lang-chat"></div>
      <div class="lang-chat-input-row">
        <textarea id="lang-chat-input" class="cp-answer" rows="2" placeholder="Reply in ${lang.name}…"></textarea>
        <button class="btn btn-primary" id="btn-lang-chat-send">Send</button>
      </div>
      <div class="consolidate-actions">
        <button class="btn btn-ghost" id="btn-converse-continue">Continue →</button>
      </div>
    `;

    const chatEl = document.getElementById('lang-chat');
    const inputEl = document.getElementById('lang-chat-input');
    const sendBtn = document.getElementById('btn-lang-chat-send');

    const addBubble = (role, content) => {
      const div = document.createElement('div');
      div.className = `lang-bubble ${role}`;
      div.textContent = content;
      chatEl.appendChild(div);
      this.renderCorrections(div, content);
      chatEl.scrollTop = chatEl.scrollHeight;
      return div;
    };

    // Restore a same-day conversation, or have the partner open
    if (Array.isArray(lesson.chat) && lesson.chat.length) {
      this.chatHistory = [...lesson.chat];
      this.chatHistory.forEach(m => addBubble(m.role, m.content));
    } else {
      this.partnerTurn('(start the conversation)', addBubble, true);
    }

    const send = () => {
      const text = inputEl.value.trim();
      if (!text) return;
      inputEl.value = '';
      addBubble('user', text);
      this.chatHistory.push({ role: 'user', content: text });
      updateLevelEstimate(lang.id, 0.2); // producing output at all is evidence
      this.partnerTurn(text, addBubble);
    };
    sendBtn.addEventListener('click', send);
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });

    document.getElementById('btn-converse-continue').addEventListener('click', () => this.next());
    inputEl.focus();
  },

  async partnerTurn(userMessage, addBubble, isOpener = false) {
    const { lang, lesson } = this;
    const sendBtn = document.getElementById('btn-lang-chat-send');
    if (sendBtn) sendBtn.disabled = true;

    try {
      let reply;
      if (AppState.mode === 'demo') {
        const turn = this.chatHistory.filter(m => m.role === 'partner').length;
        const demoTurns = lang.script && lang.script !== 'latin'
          ? [
              'こんにちは！ (Hello!) ねこが すきですか。 (Do you like cats?)',
              'そうですか！ (I see!) わたしも ねこが すきです。 (I like cats too.) いぬは？ (What about dogs?)\n✏️ ねこが すきです — "suki" needs が, not を',
              'いいですね！ (Nice!) また あした はなしましょう。 (Let\'s talk again tomorrow.)'
            ]
          : [
              '¡Hola! (Hello!) ¿Te gustan los gatos? (Do you like cats?)',
              '¡Qué bien! (Great!) A mí también me gustan. (I like them too.) ¿Tienes un gato? (Do you have a cat?)\n✏️ Me gustan los gatos — "gustar" agrees with the thing liked',
              '¡Perfecto! Hablamos mañana. (We\'ll talk tomorrow.)'
            ];
        reply = demoTurns[Math.min(turn, demoTurns.length - 1)];
      } else {
        reply = await callLangPartner(lang, lang.level, lesson.chatTopic || '', this.chatHistory, userMessage);
      }

      addBubble('partner', reply);
      this.chatHistory.push({ role: 'partner', content: reply });

      // Cache the conversation so a same-day reopen restores it
      dbPutLangLesson(lang.id, todayKey(), { chat: this.chatHistory }).catch(() => {});
    } catch (err) {
      console.warn('Partner reply failed:', err.message);
      addBubble('partner', `(Connection hiccup — try again.)`);
    } finally {
      if (sendBtn) sendBtn.disabled = false;
    }
  },

  // Parse ✏️ recast lines out of a partner bubble into "+ Card" chips
  renderCorrections(bubbleEl, content) {
    if (bubbleEl.classList.contains('user')) return;
    const corrections = [...content.matchAll(/✏️\s*(.+?)(?:\s+—\s+(.+))?$/gm)];
    if (!corrections.length) return;

    // Remove the raw ✏️ lines from the visible bubble; re-render them as chips
    bubbleEl.textContent = content.replace(/^✏️.*$/gm, '').trim();

    corrections.forEach(m => {
      const sentence = (m[1] || '').trim();
      const reason = (m[2] || '').trim();
      if (!sentence) return;
      const chip = document.createElement('div');
      chip.className = 'correction-chip';
      chip.innerHTML = `
        <span class="correction-text">✏️ ${sentence}${reason ? ` <em>— ${reason}</em>` : ''}</span>
        <button class="correction-add" type="button">+ Card</button>
      `;
      chip.querySelector('.correction-add').addEventListener('click', async (e) => {
        const btn = e.currentTarget;
        btn.disabled = true;
        try {
          await dbAppendLangCards(this.lang.id, [{
            front: sentence,
            back: reason || 'Correction from conversation',
            word: '',
            romanization: null,
            type: 'correction'
          }]);
          btn.textContent = '✓ In deck';
        } catch (err) {
          btn.disabled = false;
          showToast('Could not save the card: ' + err.message, 'error');
        }
      });
      bubbleEl.insertAdjacentElement('afterend', chip);
    });
  },

  // ── SHADOW (fluency strand) ──
  // Hear a sentence at normal or slow speed, echo it out loud, self-rate.
  // Rough sentences come back at the start of tomorrow's shadow round.
  renderShadow() {
    const { lang, lesson } = this;
    const body = document.getElementById('lang-session-body');
    const sentences = lesson.shadowSentences || [];
    const earlyLevel = ['A0', 'A1'].includes(lang.level);

    if (!sentences.length) { this.next(); return; }

    // Sentence text → romanization, when the story (or the verses) carry it
    const romFor = (text) =>
      lesson.sentences?.find(s => s.text === text)?.romanization
      || lesson.verses?.find(v => v.arabic === text)?.romanization
      || null;

    const rows = sentences.map((text, i) => `
      <div class="shadow-row" data-idx="${i}">
        <div class="shadow-sentence">
          <span class="session-card-text">${text}</span>
          ${romFor(text) && earlyLevel ? `<span class="story-rom">${romFor(text)}</span>` : ''}
        </div>
        <div class="shadow-controls">
          <button class="btn btn-ghost shadow-play" data-idx="${i}" data-rate="0.85">▶ Normal</button>
          <button class="btn btn-ghost shadow-play" data-idx="${i}" data-rate="0.6">🐢 Slow</button>
        </div>
        <div class="shadow-rate">
          <span class="cp-conf-label">How did it feel out loud?</span>
          <button class="cp-chip shadow-self" data-idx="${i}" data-r="rough">Rough</button>
          <button class="cp-chip shadow-self" data-idx="${i}" data-r="ok">OK</button>
          <button class="cp-chip shadow-self" data-idx="${i}" data-r="smooth">Smooth</button>
        </div>
      </div>
    `).join('');

    const isRecite = this.activities[this.activityIdx] === 'recite';
    body.innerHTML = `
      <div class="prime-kicker">${isRecite ? 'Recite' : 'Shadow'} · ${lang.name}</div>
      ${this.dotsHtml()}
      <h3 class="consolidate-title">${isRecite ? 'Recite the verses, out loud.' : 'Say it with the voice, out loud.'}</h3>
      <p class="story-title-gloss">${isRecite
        ? 'Play a verse, recite along with the voice — match the rhythm of the recitation. Rate yourself honestly; rough ones return tomorrow.'
        : 'Play a sentence, speak along with it — match the rhythm, not just the words. Rate yourself honestly; rough ones return tomorrow.'}</p>
      <div class="shadow-list">${rows}</div>
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-shadow-continue">Continue →</button>
      </div>
    `;

    body.querySelectorAll('.shadow-play').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = sentences[parseInt(btn.dataset.idx)];
        if (!NarrationEngine.speakLang(text, lang.ttsLangCode || lang.code, parseFloat(btn.dataset.rate))) {
          showToast(`No ${lang.name} voice on this device — read it aloud from the text instead.`, 'info', 3500);
        }
      });
    });

    body.querySelectorAll('.shadow-self').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.idx;
        this.shadowRatings[idx] = btn.dataset.r;
        btn.closest('.shadow-rate').querySelectorAll('.cp-chip').forEach(c => c.classList.remove('sel'));
        btn.classList.add('sel');
      });
    });

    document.getElementById('btn-shadow-continue').addEventListener('click', async () => {
      // Rough sentences re-queue into tomorrow's shadow round
      const rough = sentences.filter((_, i) => this.shadowRatings[i] === 'rough');
      this.lang.roughShadow = rough.slice(0, 4);
      // Self-rated fluency is level evidence too
      Object.values(this.shadowRatings).forEach(r => {
        if (r === 'smooth') updateLevelEstimate(lang.id, 0.5);
        else if (r === 'rough') updateLevelEstimate(lang.id, -0.5);
      });
      dbPutLanguage(this.lang).catch(() => {});
      this.next();
    });
  },

  // ── ROOT LESSON (quranic input strand): one root family per session ──
  renderRootLesson() {
    const { lang, lesson } = this;
    const body = document.getElementById('lang-session-body');

    if (lesson.complete) {
      body.innerHTML = `
        <div class="prime-kicker">Quranic Arabic</div>
        ${this.dotsHtml()}
        <h3 class="consolidate-title">Every root in the curriculum is yours.</h3>
        <p class="story-title-gloss">Keep the review deck warm — your cards still come due on schedule.</p>
        <div class="consolidate-actions"><button class="btn btn-primary" id="btn-roots-done">Close →</button></div>
      `;
      document.getElementById('btn-roots-done').addEventListener('click', () => this.close());
      return;
    }

    const isParticles = lesson.rootKind === 'particles';
    const familyHtml = lesson.derivedWords.map((w, i) => `
      <div class="root-word-row">
        <button class="story-play root-word-play" data-idx="${i}" title="Hear it">
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M6 4l10 6-10 6V4z"/></svg>
        </button>
        <span class="root-word-ar">${w.word}</span>
        <span class="root-word-body">
          <span class="root-word-rom">${w.romanization || ''}</span>
          <span class="root-word-meaning">${w.meaning}</span>
        </span>
        ${w.pattern && !isParticles ? `<span class="root-word-pattern">${w.pattern}</span>` : ''}
      </div>
    `).join('');

    body.innerHTML = `
      <div class="prime-kicker">${isParticles ? 'Function words' : 'Root family'} · ${lang.name}</div>
      ${this.dotsHtml()}
      <div class="root-hero">
        <span class="root-hero-ar">${lesson.root}</span>
        <span class="root-hero-translit">${lesson.translit}</span>
        <span class="root-hero-gloss">${lesson.rootGloss}</span>
      </div>
      <p class="story-title-gloss">~${lesson.rootCount.toLocaleString()} appearances in the Quran — ${isParticles ? 'these words are the connective tissue of every verse.' : 'every word below grows from this one root.'}</p>
      <div class="root-wazn">${lesson.waznExplanation}</div>
      <div class="root-family">${familyHtml}</div>
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-root-continue">See it in the verses →</button>
      </div>
    `;

    body.querySelectorAll('.root-word-play').forEach(btn => {
      btn.addEventListener('click', () => {
        const w = lesson.derivedWords[parseInt(btn.dataset.idx)];
        if (!NarrationEngine.speakLang(w.word, lang.ttsLangCode || 'ar', 0.8)) {
          showToast('No Arabic voice on this device.', 'info', 3000);
        }
      });
    });
    document.getElementById('btn-root-continue').addEventListener('click', () => this.next());
  },

  // ── VERSES (quranic comprehension strand): the family in its real context ──
  renderVerses() {
    const { lang, lesson } = this;
    const body = document.getElementById('lang-session-body');

    if (!lesson.verses?.length) { this.next(); return; }

    const versesHtml = lesson.verses.map((v, i) => `
      <div class="story-sentence verse-block" data-idx="${i}">
        <button class="story-play" data-idx="${i}" title="Hear it">
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M6 4l10 6-10 6V4z"/></svg>
        </button>
        <div class="story-sentence-text">
          <span class="story-target verse-ar">${v.arabic}</span>
          <span class="verse-ref">${v.reference}</span>
          ${v.romanization ? `<span class="story-rom">${v.romanization}</span>` : ''}
          <span class="story-gloss" style="display:none;">
            ${v.gloss}
            ${v.wordGlosses?.length ? `<span class="verse-word-glosses">${v.wordGlosses.map(g => `<span class="verse-wg"><b>${g.word}</b> ${g.gloss}</span>`).join('')}</span>` : ''}
          </span>
        </div>
      </div>
    `).join('');

    const checkpointsHtml = (lesson.checkpoints || []).map((c, i) => `
      <div class="lang-checkpoint" data-idx="${i}">
        <div class="cp-question">${c.question}</div>
        <textarea class="cp-answer" rows="2" placeholder="Answer in English — show you followed the verses…"></textarea>
        <div class="cp-actions">
          <button class="btn btn-primary lang-cp-check" data-idx="${i}">Check</button>
        </div>
        <div class="lang-cp-verdict"></div>
      </div>
    `).join('');

    body.innerHTML = `
      <div class="prime-kicker">In the Quran · ${lang.name}</div>
      ${this.dotsHtml()}
      <h3 class="consolidate-title">The family, in its own verses.</h3>
      <p class="story-title-gloss">Tap a verse for its meaning — today's words are working inside real revelation, not example sentences.</p>
      <div class="story-body">${versesHtml}</div>
      <div class="story-checkpoints">
        <div class="recall-col-head" style="color:var(--purple)"><i style="background:var(--purple)"></i>Did you follow them?</div>
        ${checkpointsHtml}
      </div>
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-verses-continue">Continue →</button>
      </div>
    `;

    body.querySelectorAll('.story-sentence-text').forEach(el => {
      el.addEventListener('click', () => {
        const gloss = el.querySelector('.story-gloss');
        gloss.style.display = gloss.style.display === 'none' ? 'block' : 'none';
      });
    });

    body.querySelectorAll('.story-play').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const v = lesson.verses[parseInt(btn.dataset.idx)];
        if (!NarrationEngine.speakLang(v.arabic, lang.ttsLangCode || 'ar', 0.75)) {
          showToast('No Arabic voice on this device — audio unavailable.', 'info', 3500);
        }
      });
    });

    // Comprehension checks graded against the verses + glosses
    const groundTruth = lesson.verses
      .map(v => `${v.arabic} (${v.reference}: ${v.gloss})`).join('\n');
    body.querySelectorAll('.lang-cp-check').forEach(btn => {
      btn.addEventListener('click', async () => {
        const wrap = btn.closest('.lang-checkpoint');
        const answerEl = wrap.querySelector('.cp-answer');
        const verdictEl = wrap.querySelector('.lang-cp-verdict');
        const answer = answerEl.value.trim();
        if (!answer) { answerEl.focus(); return; }

        btn.disabled = true;
        btn.textContent = 'Checking…';
        try {
          const q = lesson.checkpoints[parseInt(wrap.dataset.idx)].question;
          const result = AppState.mode === 'demo'
            ? (answer.length >= 10
                ? { verdict: 'pass', feedback: 'Right — you followed the verses.', sourceQuote: '' }
                : { verdict: 'gap', feedback: 'Look at the glosses again — which words share the root?', sourceQuote: '' })
            : await callCheckpointGrader(groundTruth, q, answer, 0);

          verdictEl.innerHTML = result.verdict === 'pass'
            ? `<div class="cp-verdict cp-pass">✓ ${result.feedback}</div>`
            : `<div class="cp-verdict cp-gap">${result.feedback}</div>`;
          if (result.verdict === 'pass') {
            this.checkpointsPassed += 1;
            updateLevelEstimate(lang.id, 1.5);
            btn.style.display = 'none';
            answerEl.disabled = true;
          } else {
            updateLevelEstimate(lang.id, -1.5);
            btn.disabled = false;
            btn.textContent = 'Check again';
          }
        } catch (err) {
          verdictEl.innerHTML = `<div class="cp-fallback">Check unavailable — keep going.</div>`;
          btn.style.display = 'none';
        }
      });
    });

    document.getElementById('btn-verses-continue').addEventListener('click', () => this.next());
  },

  // ── RECITE (quranic fluency strand): shadowing, but with the verses ──
  renderRecite() {
    this.renderShadow(); // copy adapts via the active strand kind
  },

  // ── DECODE (literacy strand): sound out a word you already know orally ──
  renderDecode() {
    const { lang, lesson } = this;
    const body = document.getElementById('lang-session-body');
    const drills = lesson.drills || [];

    if (!drills.length) { this.next(); return; }

    const drillsHtml = drills.map((d, i) => {
      // Shuffle the correct meaning in among the distractors (Fisher-Yates) so
      // the answer's position is genuinely random, not guessable by position.
      const options = [d.meaning, ...d.distractors];
      const order = options.map((_, oi) => oi);
      for (let k = order.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [order[k], order[j]] = [order[j], order[k]];
      }
      return `
        <div class="decode-drill" data-idx="${i}">
          <div class="decode-word">${d.written}</div>
          <div class="decode-options">
            ${order.map(oi => `<button class="cp-chip decode-opt" data-drill="${i}" data-correct="${oi === 0}">${options[oi]}</button>`).join('')}
          </div>
          <div class="decode-reveal" style="display:none;">
            <span class="decode-rom">${d.romanization || ''}</span>
            <span class="decode-meaning">— ${d.meaning}</span>
          </div>
        </div>
      `;
    }).join('');

    body.innerHTML = `
      <div class="prime-kicker">Decode · ${lang.name}</div>
      ${this.dotsHtml()}
      <h3 class="consolidate-title">Sound it out — you already know these words.</h3>
      <p class="story-title-gloss">Read each word letter by letter, out loud if you can. When it clicks, tap what it means.</p>
      <div class="decode-list">${drillsHtml}</div>
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-decode-continue">Continue →</button>
      </div>
    `;

    body.querySelectorAll('.decode-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const drillEl = btn.closest('.decode-drill');
        const idx = parseInt(drillEl.dataset.idx);
        const correct = btn.dataset.correct === 'true';

        drillEl.querySelectorAll('.decode-opt').forEach(b => {
          b.disabled = true;
          if (b.dataset.correct === 'true') b.classList.add('assess-right');
          else if (b === btn) b.classList.add('assess-wrong');
        });
        drillEl.querySelector('.decode-reveal').style.display = 'flex';

        updateLevelEstimate(lang.id, correct ? 0.3 : -0.3);
        // Hearing it right after decoding closes the sound-symbol loop
        NarrationEngine.speakLang(drills[idx].written, lang.ttsLangCode || lang.code, 0.85);
      });
    });

    document.getElementById('btn-decode-continue').addEventListener('click', () => this.next());
  },

  // ── PRECISION (vocab-expansion strand): frontier words, precisely ──
  renderPrecision() {
    const { lang, lesson } = this;
    const body = document.getElementById('lang-session-body');
    const words = lesson.precisionWords || [];

    if (!words.length) { this.next(); return; }

    const wordsHtml = words.map((w, i) => `
      <div class="precision-block" data-idx="${i}">
        <div class="precision-cloze">${w.cloze}</div>
        <button class="cp-skip precision-reveal-btn" data-idx="${i}">Reveal the word →</button>
        <div class="precision-answer" style="display:none;">
          <span class="precision-word">${w.word}</span>
          <span class="precision-meaning">${w.meaning}</span>
          ${w.contrast ? `<span class="precision-contrast">${w.contrast}</span>` : ''}
        </div>
      </div>
    `).join('');

    body.innerHTML = `
      <div class="prime-kicker">Frontier words · ${lang.name}</div>
      ${this.dotsHtml()}
      <h3 class="consolidate-title">Five words from just past your edge.</h3>
      <p class="story-title-gloss">Read the sentence, guess the missing word — then see how close you were. The distinction lines are the real lesson.</p>
      <div class="precision-list">${wordsHtml}</div>
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-precision-continue">Continue →</button>
      </div>
    `;

    body.querySelectorAll('.precision-reveal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const block = btn.closest('.precision-block');
        block.querySelector('.precision-answer').style.display = 'flex';
        btn.style.display = 'none';
      });
    });

    document.getElementById('btn-precision-continue').addEventListener('click', () => this.next());
  },

  // ── WRAP: new words → cards, streak, done ──
  async renderWrap() {
    const { lang, lesson } = this;
    const body = document.getElementById('lang-session-body');
    const words = lesson.newWords || [];

    const wordsHtml = words.map(w => `
      <div class="new-word-row">
        <span class="new-word">${w.word}${w.romanization ? ` <em>${w.romanization}</em>` : ''}</span>
        <span class="new-word-meaning">${w.meaning}</span>
      </div>
    `).join('');

    body.innerHTML = `
      <div class="prime-kicker">Session wrap · ${lang.name}</div>
      ${this.dotsHtml()}
      <h3 class="consolidate-title">${words.length ? `${words.length} new word${words.length === 1 ? '' : 's'} joined your deck` : 'Nice work today'}</h3>
      <div class="new-words-list">${wordsHtml}</div>
      <div class="consolidate-calibration">${this.checkpointsPassed}/${(lesson.checkpoints || []).length} comprehension checks passed · they'll come due for review tomorrow</div>
      ${this.recipe?.ui?.coverageMeter ? (() => {
        const learned = [...(lang.rootsLearned || [])];
        if (lesson.rootId && !learned.includes(lesson.rootId)) learned.push(lesson.rootId);
        const pct = (quranCoverage(learned) * 100).toFixed(1);
        return `<div class="lang-coverage wrap-coverage">
          <div class="lang-coverage-track"><div class="lang-coverage-fill" style="width:${pct}%"></div></div>
          <span class="lang-coverage-label">You can now read ~${pct}% of the Quran's words</span>
        </div>`;
      })() : ''}
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-session-done">Done for today →</button>
      </div>
    `;

    // Add new words as sentence cards + update the language profile — once per lesson
    if (words.length && !lesson.cardsAdded) {
      lesson.cardsAdded = true;
      const cards = words.map(w => ({
        front: w.exampleSentence || w.word,
        back: `${w.meaning}${w.exampleSentence ? ` — "${w.word}"` : ''}`,
        word: w.word,
        romanization: w.romanization || null,
        type: 'vocab'
      }));
      try {
        await dbAppendLangCards(lang.id, cards);
        await dbPutLangLesson(lang.id, todayKey(), { cardsAdded: true });

        // Streak: bump once per calendar day
        const today = todayKey();
        const last = lang.lastSessionAt ? new Date(lang.lastSessionAt) : null;
        const lastKey = last ? `${last.getFullYear()}-${String(last.getMonth() + 1).padStart(2, '0')}-${String(last.getDate()).padStart(2, '0')}` : null;
        if (lastKey !== today) {
          const yesterday = new Date(Date.now() - 86400000);
          const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
          lang.streak = lastKey === yKey ? (lang.streak || 0) + 1 : 1;
          lang.sessionNumber = (lang.sessionNumber || 0) + 1;
          lang.lastSessionAt = Date.now();
        }
        lang.knownWords = [...(lang.knownWords || []), ...words.map(w => w.word)].slice(-500);
        lang.wordsLearned = (lang.wordsLearned || 0) + words.length;
        // Quranic recipe: today's root joins the learned list → coverage grows
        if (this.recipe?.id === 'quranic' && lesson.rootId && !(lang.rootsLearned || []).includes(lesson.rootId)) {
          lang.rootsLearned = [...(lang.rootsLearned || []), lesson.rootId];
        }
        await dbPutLanguage(lang);
      } catch (err) {
        console.warn('Session wrap persistence failed:', err.message);
      }
    }

    document.getElementById('btn-session-done').addEventListener('click', async () => {
      this.close();
      await renderLanguages();
    });
  }
};

// ── SCRIPT BOOTCAMP ───────────────────────────────────────────────────────────
// Pulls the next ~10 characters of a non-Latin writing system into the SM-2
// deck. Tracks which characters have been issued so units never repeat.
async function startScriptUnit(lang, triggerBtn) {
  const unit = (lang.scriptUnit || 0) + 1;
  if (triggerBtn) { triggerBtn.disabled = true; triggerBtn.textContent = 'Building the unit…'; }

  try {
    let cards;
    if (AppState.mode === 'demo') {
      const demoUnits = [
        [{ front: 'か', back: 'The sound "ka" — a Kite (ka!) with a loose string', romanization: 'ka' },
         { front: 'き', back: 'The sound "ki" — a Key with two teeth', romanization: 'ki' },
         { front: 'く', back: 'The sound "ku" — a bird\'s beak going "coo"', romanization: 'ku' }],
        [{ front: 'さ', back: 'The sound "sa" — a fish hook catching Salmon', romanization: 'sa' },
         { front: 'し', back: 'The sound "shi" — a fishing line, "she" caught it', romanization: 'shi' }]
      ];
      cards = (demoUnits[Math.min(unit - 1, demoUnits.length - 1)] || demoUnits[0])
        .map(c => ({ ...c, word: c.front, type: 'script' }));
    } else {
      cards = await callScriptUnitGenerator(lang, unit, lang.learnedChars || []);
    }

    await dbAppendLangCards(lang.id, cards);
    lang.scriptUnit = unit;
    lang.learnedChars = [...(lang.learnedChars || []), ...cards.map(c => c.front)].slice(-300);
    await dbPutLanguage(lang);

    showToast(`${cards.length} ${lang.scriptName} characters added to your deck.`, 'success');
    await renderLanguages();
  } catch (err) {
    console.warn('Script unit failed:', err.message);
    showToast('Could not build the script unit: ' + err.message, 'error', 6000);
    if (triggerBtn) { triggerBtn.disabled = false; triggerBtn.textContent = `Script bootcamp · unit ${unit} →`; }
  }
}

// ── LANGUAGE ONBOARDING ───────────────────────────────────────────────────────
// Steps: name → profile confirmation (script auto-detection) → level → seed
// deck generation. Reuses the Prime overlay pattern and styles.
// ── ADAPTIVE PLACEMENT (LangAssess) ──────────────────────────────────────────
// A short item ladder instead of one big exam: 4 multiple-choice items per
// round, band moves up on ≥3 correct, down on ≤1, stops on a middling round,
// two direction reversals, or 6 rounds (~5-8 minutes). True beginners never
// see it — the fresh persona keeps the quick self-report picker, and every
// ladder is skippable. The result is only the STARTING point; continuous
// recalibration (updateLevelEstimate) owns the level from then on.

function demoAssessItems(type, band) {
  const verseSnippets = [
    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    'قُلْ هُوَ اللَّهُ أَحَدٌ', 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
    'وَالْعَصْرِ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ', 'لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ'
  ];
  return [1, 2, 3, 4].map(i => ({
    prompt: type === 'verse-ladder'
      ? `"${verseSnippets[band - 1] || verseSnippets[0]}" — what is this saying? (demo ${i})`
      : type === 'listening-check'
        ? `What did the sentence mean? (demo ${i})`
        : `[demo · band ${band}] Which is the closest meaning of "specimen-${band}${i}"?`,
    ttsText: type === 'listening-check' ? 'پانی گرم ہے' : null,
    options: ['The correct answer', 'A wrong answer', 'Another wrong one', 'Not this either'],
    answerIdx: 0
  }));
}

const LangAssess = {
  onboard: null,
  type: 'placement',
  band: 4,
  round: 0,
  reversals: 0,
  lastDir: null,
  history: [],
  answers: {},

  maxBand() { return this.type === 'verse-ladder' ? 6 : 8; },

  start(onboard) {
    this.onboard = onboard;
    this.type = onboard.preset === 'quranic'
      ? 'verse-ladder'
      : (RECIPES[onboard.recipeId]?.assessment || 'placement');

    if (!['placement', 'frontier', 'verse-ladder', 'listening-check'].includes(this.type)) return this.skip();

    this.band = this.type === 'verse-ladder' ? 2 : 4;
    this.round = 0;
    this.reversals = 0;
    this.lastDir = null;
    this.history = [];
    this.renderIntro();
  },

  renderIntro() {
    const copy = {
      frontier: ['Find your frontier', 'A few quick rounds of word recognition — they get rarer until we find the edge of your vocabulary. That edge is where your new words will come from.'],
      'verse-ladder': ['Where do we start?', 'A few short verse snippets with comprehension questions — they get harder until we find your level. Total beginners: just skip.'],
      'listening-check': ['Quick listening check', 'A few spoken sentences — tap what each one meant. This just confirms your ear; your reading starts from the script itself.'],
      placement: ['Quick placement', 'A few rounds of questions that adapt to your answers — about five minutes, and your level keeps adjusting as you learn anyway.']
    }[this.type];
    document.getElementById('lang-onboard-content').innerHTML = `
      <div class="prime-subhead"><strong>${copy[0]}</strong></div>
      <p class="lang-assess-intro">${copy[1]}</p>
      <div class="lang-level-options">
        <button class="lang-level-btn" id="btn-assess-start"><strong>Start (~5 min)</strong><span>Adapts to your answers as you go</span></button>
        <button class="lang-level-btn" id="btn-assess-skip"><strong>Skip — start from zero</strong><span>You can always let the app recalibrate later</span></button>
      </div>
    `;
    document.getElementById('btn-assess-start').addEventListener('click', () => this.runRound());
    document.getElementById('btn-assess-skip').addEventListener('click', () => this.skip());
  },

  async fetchItems() {
    if (AppState.mode === 'demo') return demoAssessItems(this.type, this.band);
    if (this.type === 'frontier') return callFrontierItems(this.onboard.profile, this.band);
    if (this.type === 'verse-ladder') return callVerseLadderItems(this.band);
    if (this.type === 'listening-check') return callListeningCheckItems(this.onboard.profile, this.band);
    return callPlacementItems(this.onboard.profile, this.band);
  },

  async runRound() {
    this.round += 1;
    this.answers = {};
    const content = document.getElementById('lang-onboard-content');
    content.innerHTML = `
      <div class="cp-loading" style="justify-content:center; padding:2rem 0;">
        <span class="cp-spinner"></span> Round ${this.round} — building your questions…
      </div>
    `;

    let items;
    try {
      items = await this.fetchItems();
    } catch (err) {
      console.warn('Assessment items failed:', err.message);
      showToast('Placement unavailable right now — starting from a default level.', 'info', 5000);
      return this.skip();
    }

    content.innerHTML = `
      <div class="prime-subhead">Round ${this.round}</div>
      <div class="lang-assess-items">
        ${items.map((item, i) => `
          <div class="lang-assess-item" data-idx="${i}">
            <div class="cp-question">${item.prompt}</div>
            ${item.ttsText ? `<button class="btn btn-ghost assess-play" data-idx="${i}">▶ Play the sentence</button>` : ''}
            <div class="lang-assess-options">
              ${item.options.map((opt, oi) => `<button class="cp-chip assess-opt" data-item="${i}" data-opt="${oi}">${opt}</button>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-assess-check" disabled>Check answers</button>
        <button class="cp-skip" id="btn-assess-skip2">Stop here — use my answers so far</button>
      </div>
    `;

    const checkBtn = document.getElementById('btn-assess-check');
    content.querySelectorAll('.assess-play').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = items[parseInt(btn.dataset.idx)];
        const p = this.onboard.profile;
        if (!NarrationEngine.speakLang(item.ttsText, p.ttsLangCode || p.code, 0.85)) {
          showToast(`No ${p.name} voice on this device — listening check unavailable.`, 'info', 4000);
        }
      });
    });
    content.querySelectorAll('.assess-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.dataset.item;
        this.answers[item] = parseInt(btn.dataset.opt);
        content.querySelectorAll(`.assess-opt[data-item="${item}"]`).forEach(b => b.classList.remove('sel'));
        btn.classList.add('sel');
        checkBtn.disabled = Object.keys(this.answers).length < items.length;
      });
    });

    checkBtn.addEventListener('click', () => {
      let correct = 0;
      items.forEach((item, i) => {
        const right = this.answers[i] === item.answerIdx;
        if (right) correct += 1;
        content.querySelectorAll(`.assess-opt[data-item="${i}"]`).forEach(b => {
          const oi = parseInt(b.dataset.opt);
          if (oi === item.answerIdx) b.classList.add('assess-right');
          else if (oi === this.answers[i]) b.classList.add('assess-wrong');
          b.disabled = true;
        });
      });
      checkBtn.disabled = true;
      setTimeout(() => this.scoreRound(correct), 1100);
    });

    document.getElementById('btn-assess-skip2').addEventListener('click', () => this.finish());
  },

  scoreRound(correct) {
    this.history.push({ band: this.band, correct });
    const dir = correct >= 3 ? 'up' : correct <= 1 ? 'down' : 'stay';

    if (dir === 'stay' || this.round >= 6) return this.finish();
    if (this.lastDir && dir !== this.lastDir) this.reversals += 1;
    if (this.reversals >= 2) return this.finish();
    this.lastDir = dir;
    this.band = Math.max(1, Math.min(this.maxBand(), this.band + (dir === 'up' ? 1 : -1)));
    this.runRound();
  },

  finish() {
    const o = this.onboard;
    o.assessResult = { type: this.type, band: this.band, history: this.history };

    if (this.type === 'frontier') {
      // Fluent speaker — the CEFR level is high by definition; the band IS
      // the finding: where their vocabulary gets spotty.
      o.levelScore = 80;
      o.level = 'B2';
      o.frontierBand = this.band;
    } else if (this.type === 'listening-check') {
      // Heritage speaker: the ear is confirmed, but levelScore tracks
      // READING — it starts near zero so the romanization bridge stays on.
      o.levelScore = 8;
      o.level = 'A0';
      o.listeningBand = this.band;
    } else if (this.type === 'verse-ladder') {
      o.levelScore = [8, 18, 30, 45, 60, 75][this.band - 1] ?? 8;
      o.level = levelFromScore(o.levelScore);
    } else {
      o.levelScore = [8, 18, 28, 40, 52, 64, 76, 85][this.band - 1] ?? 8;
      o.level = levelFromScore(o.levelScore);
    }
    o.advanceFrom('assess');
  },

  skip() {
    this.onboard.applyDefaultPlacement();
    this.onboard.advanceFrom('assess');
  }
};

// Quranic Arabic ships pre-configured — one tap on the featured card, no
// typing, no profiler call. Its own langId so standard Arabic can coexist.
const QURANIC_PRESET_PROFILE = {
  name: 'Quranic Arabic',
  nativeName: 'العربية الفصحى',
  code: 'ar-quran',
  ttsLangCode: 'ar-SA',
  script: 'arabic',
  scriptName: 'Arabic script',
  romanizationName: 'transliteration',
  notes: 'The classical Arabic of the Quran — a closed text of ~77,000 words built from ~1,700 root families. You learn roots, not isolated words, so every root unlocks a whole word family.',
  altScripts: []
};

const LangOnboard = {
  step: 'start',
  profile: null,
  level: 'A0',
  recipeId: 'fresh',
  preset: null,
  chosenScript: null,
  levelScore: null,
  frontierBand: null,
  assessResult: null,

  open() {
    this.step = 'start';
    this.profile = null;
    this.level = 'A0';
    this.recipeId = 'fresh';
    this.preset = null;
    this.chosenScript = null;
    this.levelScore = null;
    this.frontierBand = null;
    this.listeningBand = null;
    this.assessResult = null;
    document.getElementById('lang-onboard-overlay').style.display = 'flex';
    this.render();
  },

  close() {
    document.getElementById('lang-onboard-overlay').style.display = 'none';
  },

  // The step sequence depends on choices along the way: the preset skips the
  // persona question; multi-script languages insert a script choice; non-fresh
  // personas get a placement step instead of the self-report level picker.
  stepOrder() {
    if (this.preset === 'quranic') return ['start', 'profile', 'assess', 'seed'];
    const order = ['start', 'profile', 'persona'];
    if (this.profile?.altScripts?.length) order.push('script');
    order.push(this.recipeId === 'fresh' ? 'level' : 'assess');
    order.push('seed');
    return order;
  },

  // Advance to whatever follows `current` in the computed order.
  // Decide on generateSeed from the step WE set, not this.step — render()
  // can advance further (assess fallback) and would double-fire the seed.
  advanceFrom(current) {
    const order = this.stepOrder();
    const nextStep = order[order.indexOf(current) + 1] || 'seed';
    this.step = nextStep;
    this.render();
    if (nextStep === 'seed') this.generateSeed();
  },

  dots() {
    const order = this.stepOrder();
    const idx = order.indexOf(this.step);
    document.getElementById('lang-onboard-dots').innerHTML = order
      .map((_, i) => `<i class="${i === idx ? 'on' : ''}"></i>`).join('');
  },

  render() {
    const content = document.getElementById('lang-onboard-content');
    const nextBtn = document.getElementById('btn-lang-onboard-next');
    nextBtn.disabled = false;
    nextBtn.style.display = '';
    this.dots();

    if (this.step === 'start') {
      content.innerHTML = `
        <button class="lang-preset-card" id="lang-preset-quranic" type="button">
          <span class="lang-preset-native">${QURANIC_PRESET_PROFILE.nativeName}</span>
          <span class="lang-preset-name">Quranic Arabic</span>
          <span class="lang-preset-desc">Ready-made track: root families in frequency order, anchored in real verses — with a live "% of the Quran you can read" meter.</span>
        </button>
        <div class="lang-preset-divider"><span>or add any other language</span></div>
        <input type="text" id="lang-name-input" class="form-input lang-name-input"
               placeholder="e.g. Spanish, Japanese, Urdu, Punjabi…" autocomplete="off">
      `;
      nextBtn.textContent = 'Continue →';
      document.getElementById('lang-preset-quranic').addEventListener('click', () => {
        this.preset = 'quranic';
        this.recipeId = 'quranic';
        this.profile = { ...QURANIC_PRESET_PROFILE };
        this.step = 'profile';
        this.render();
      });
      const input = document.getElementById('lang-name-input');
      input.focus();
      input.addEventListener('keydown', e => { if (e.key === 'Enter') this.next(); });

    } else if (this.step === 'profile') {
      const p = this.profile;
      const scriptNote = p.script === 'latin'
        ? `<p>${p.name} uses the Latin alphabet, so you can start reading immediately.</p>`
        : `<p>${p.name} is written in <strong>${p.scriptName}</strong> — so alongside vocabulary you'll learn the script itself, and everything shows <strong>${p.romanizationName}</strong> underneath until you don't need it anymore.</p>`;
      content.innerHTML = `
        <div class="prime-driving">${p.nativeName}</div>
        <div class="prime-est">${p.name} · ${p.scriptName}</div>
        <div class="prime-subhead lang-profile-notes">${scriptNote}<p class="lang-notes-line">${p.notes}</p></div>
      `;
      nextBtn.textContent = 'Looks right →';

    } else if (this.step === 'persona') {
      const p = this.profile;
      // "Can't read it" only exists for scripts the learner can't already read
      const literacyBtn = p.script !== 'latin' ? `
          <button class="lang-level-btn" data-persona="literacy"><strong>I speak it, but can't read it</strong><span>Learn the ${p.scriptName} script — the words are already yours</span></button>` : '';
      content.innerHTML = `
        <div class="prime-subhead">What's your relationship with ${p.name}? This decides how your course is built.</div>
        <div class="lang-level-options">
          <button class="lang-level-btn" data-persona="fresh"><strong>Starting fresh</strong><span>Learn it from the ground up</span></button>
          ${literacyBtn}
          <button class="lang-level-btn" data-persona="vocabExpand"><strong>I'm fluent — grow my vocabulary</strong><span>Precise, rarer words from just past what you know</span></button>
        </div>
      `;
      nextBtn.style.display = 'none';
      content.querySelectorAll('[data-persona]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.recipeId = btn.dataset.persona;
          this.advanceFrom('persona');
        });
      });

    } else if (this.step === 'script') {
      const p = this.profile;
      content.innerHTML = `
        <div class="prime-subhead">${p.name} is written in more than one script. Which one do you want to learn?</div>
        <div class="lang-level-options">
          ${p.altScripts.map((s, i) => `
            <button class="lang-level-btn" data-script-idx="${i}"><strong>${s.scriptName}</strong><span>${s.note || ''}</span></button>
          `).join('')}
        </div>
      `;
      nextBtn.style.display = 'none';
      content.querySelectorAll('[data-script-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          const s = p.altScripts[parseInt(btn.dataset.scriptIdx)];
          this.chosenScript = s.scriptName;
          if (s.script) p.script = s.script;
          p.scriptName = s.scriptName;
          if (s.romanizationName) p.romanizationName = s.romanizationName;
          this.advanceFrom('script');
        });
      });

    } else if (this.step === 'level') {
      content.innerHTML = `
        <div class="prime-subhead">How much ${this.profile.name} do you already have? This sets your starting point — the app recalibrates as you go.</div>
        <div class="lang-level-options">
          <button class="lang-level-btn" data-level="A0"><strong>Brand new</strong><span>Starting from zero</span></button>
          <button class="lang-level-btn" data-level="A1"><strong>Know some words</strong><span>Greetings, numbers, scattered vocabulary</span></button>
          <button class="lang-level-btn" data-level="A2"><strong>Can get by</strong><span>Simple conversations with effort</span></button>
        </div>
      `;
      nextBtn.style.display = 'none'; // level buttons advance directly
      content.querySelectorAll('.lang-level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.level = btn.dataset.level;
          this.advanceFrom('level');
        });
      });

    } else if (this.step === 'assess') {
      nextBtn.style.display = 'none';
      if (typeof LangAssess !== 'undefined') {
        LangAssess.start(this); // renders its ladder into the onboarding card
      } else {
        // Placement not available — fall back to a sensible starting point
        this.applyDefaultPlacement();
        this.advanceFrom('assess');
      }

    } else if (this.step === 'seed') {
      const copy = {
        fresh: 'Building your starter deck — the most frequent words first…',
        literacy: `Building your first ${this.profile.scriptName} unit…`,
        vocabExpand: 'Setting up — your cards will come from your reading and your frontier…',
        quranic: 'Setting up your root curriculum…'
      }[this.recipeId] || 'Setting up…';
      content.innerHTML = `
        <div class="cp-loading" style="justify-content:center;">
          <span class="cp-spinner"></span> ${copy}
        </div>
      `;
      nextBtn.style.display = 'none';
    }
  },

  // Starting point when placement is skipped or unavailable
  applyDefaultPlacement() {
    if (this.recipeId === 'vocabExpand') {
      this.level = 'B2'; this.levelScore = 80; this.frontierBand = 4;
    } else {
      this.level = 'A0'; this.levelScore = 8;
    }
  },

  async next() {
    if (this.step === 'start') {
      const name = document.getElementById('lang-name-input')?.value.trim();
      if (!name) return;
      const content = document.getElementById('lang-onboard-content');
      content.innerHTML = `
        <div class="cp-loading" style="justify-content:center;">
          <span class="cp-spinner"></span> Looking at ${name}'s writing system…
        </div>
      `;
      document.getElementById('btn-lang-onboard-next').disabled = true;
      try {
        this.profile = AppState.mode === 'demo'
          ? demoLanguageProfile(name)
          : await callLanguageProfiler(name);
        this.step = 'profile';
        this.render();
      } catch (err) {
        showToast(err.message, 'error', 6000);
        this.step = 'start';
        this.render();
      }
    } else if (this.step === 'profile') {
      this.advanceFrom('profile');
    }
  },

  async generateSeed() {
    const p = this.profile;
    const recipeId = this.recipeId;
    try {
      let cards = [];
      if (recipeId === 'fresh') {
        cards = AppState.mode === 'demo'
          ? demoSeedCards(p)
          : await callSeedDeckGenerator(p, this.level);
      } else if (recipeId === 'literacy') {
        // The script IS the course — seed unit 1 of the writing system only
        cards = AppState.mode === 'demo'
          ? demoSeedCards({ ...p, script: 'kana-kanji' }).filter(c => c.type === 'script')
          : await callScriptUnitGenerator(p, 1, []);
      }
      // vocabExpand: cards come from the frontier test and book harvesting.
      // quranic: cards come from root lessons in the daily sessions.

      const lang = {
        id: p.code,
        ...p,
        recipeId,
        level: this.level,
        levelScore: this.levelScore ?? (this.level === 'A2' ? 40 : this.level === 'A1' ? 22 : 8),
        knownWords: cards.filter(c => c.type === 'vocab').map(c => c.word).filter(Boolean),
        learnedChars: cards.filter(c => c.type === 'script').map(c => c.front),
        scriptUnit: recipeId === 'literacy' && cards.length ? 1 : 0,
        rootsLearned: [],
        chosenScript: this.chosenScript || null,
        frontierBand: this.frontierBand ?? null,
        listeningBand: this.listeningBand ?? null,
        assessedAt: this.assessResult ? Date.now() : null,
        wordsLearned: 0,
        streak: 0,
        sessionNumber: 0,
        lastSessionAt: null,
        createdAt: Date.now()
      };
      await dbPutLanguage(lang);
      if (cards.length) await dbAppendLangCards(lang.id, cards);

      this.close();
      const doneMsg = {
        fresh: `${p.name} added — ${cards.length} starter cards are in your deck.`,
        literacy: `${p.name} added — your first ${p.scriptName} unit is in your deck.`,
        vocabExpand: `${p.name} added — highlight words while you read and they'll become cards.`,
        quranic: `Quranic Arabic added — your first root family arrives in your first session.`
      }[recipeId];
      showToast(doneMsg, 'success');
      await renderLanguages();
    } catch (err) {
      console.warn('Seed deck failed:', err.message);
      showToast('Could not build the starter deck: ' + err.message, 'error', 7000);
      this.step = recipeId === 'fresh' ? 'level' : 'persona';
      this.render();
    }
  }
};

function initLanguages() {
  document.getElementById('btn-add-language').addEventListener('click', () => LangOnboard.open());
  document.getElementById('btn-lang-onboard-next').addEventListener('click', () => LangOnboard.next());
  document.getElementById('btn-lang-onboard-close').addEventListener('click', () => LangOnboard.close());
  document.getElementById('btn-lang-session-close').addEventListener('click', () => LangSession.close());
}

// ── TRANSFER PROBLEM ──────────────────────────────────────────────────────────
// One application scenario per chapter, dropped into the quiz tab where the
// existing Socratic quiz loop grades the student's answer.
async function startTransferProblem(triggerBtn) {
  const chapter = AppState.selectedChapter;
  const book = AppState.selectedBook;
  if (!chapter || !book) return;

  if (triggerBtn) { triggerBtn.disabled = true; triggerBtn.textContent = 'Building your scenario…'; }

  let problem;
  try {
    if (AppState.mode === 'demo') {
      problem = `Here's your application challenge:\n\nA colleague asks you to explain "${(chapter.concepts || [])[0] || chapter.title}" and how they should use it this week. What would you tell them to do, and why?`;
    } else {
      problem = await callTransferProblem(
        chapter._chapterText || chapter.summary_15m || '',
        chapter.concepts || [], chapter.title, book.title
      );
      problem = `Here's your application challenge:\n\n${problem}`;
    }
  } catch (err) {
    console.warn('Transfer problem generation failed:', err.message);
    showToast('Could not build an application problem right now.', 'error');
    if (triggerBtn) { triggerBtn.disabled = false; triggerBtn.textContent = 'Try an application problem →'; }
    return;
  }

  if (triggerBtn) { triggerBtn.disabled = false; triggerBtn.textContent = 'Try an application problem →'; }

  // Hand off to the quiz tab — its Socratic loop grades the answer
  Reader.showTutor();
  switchChatTab('quiz');
  appendChatMessage('tutor', problem, 'quiz');
  AppState.activeChatHistory.push({ role: 'tutor', content: problem, mode: 'quiz' });
  saveChatMessageToDB('tutor', problem, 'quiz');
}

// ── READER ENGINE ─────────────────────────────────────────────────────────────
// Drives the guided-reading surface: reveals segments progressively, records
// reading time per segment, persists progress, and shows time-left estimates.
// Segment boundaries are the hook point where checkpoints attach.

const Reader = {
  active: false,
  chapter: null,
  segments: [],
  segmentsDone: 0,
  segmentStartedAt: null,
  _lastScrollY: 0,

  wordsTotal() { return this.segments.reduce((n, s) => n + s.wordCount, 0); },
  wordsDone()  { return this.segments.slice(0, this.segmentsDone).reduce((n, s) => n + s.wordCount, 0); },

  open(chapter) {
    const text = chapter._chapterText || '';
    if (!text) return false;

    this.chapter = chapter;
    this.segments = splitChapterIntoSegments(text);
    this.segmentsDone = Math.min(chapter.segmentsDone || 0, this.segments.length);
    this.active = true;

    document.getElementById('reader-pane').style.display = 'flex';
    document.querySelector('#view-tutor .tutor-split').style.display = 'none';
    document.getElementById('btn-back-to-reader').style.display = 'flex';
    setFocusMode(true);

    const book = AppState.selectedBook;
    document.getElementById('reader-chapter-label').textContent =
      `Ch ${chapter.number} · ${chapter.title}`;

    this.renderColumn();
    this.updateTopbar();
    this.startSegmentTimer();
    this.ensureAttentionLabels();

    // Resume where the reader left off: a highlight-set bookmark wins over
    // the coarser last-completed-checkpoint position.
    const scrollEl = document.getElementById('reader-scroll');
    scrollEl.scrollTop = 0;
    const bookmarked = chapter.bookmarkPidx != null
      ? this.markBookmarkedParagraph(chapter.bookmarkPidx)
      : null;
    if (bookmarked) {
      bookmarked.scrollIntoView({ block: 'center' });
    } else {
      const current = document.getElementById(`segment-${this.segmentsDone}`);
      if (current && this.segmentsDone > 0) current.scrollIntoView({ block: 'start' });
    }
    return true;
  },

  // Tag the bookmarked paragraph (clearing any previous one) and return it
  markBookmarkedParagraph(pidx) {
    document.querySelectorAll('#reader-column p.bookmarked').forEach(p => p.classList.remove('bookmarked'));
    const el = document.querySelector(`#reader-column p[data-pidx="${pidx}"]`);
    if (el) el.classList.add('bookmarked');
    return el;
  },

  // ── Attention layer: classify paragraphs core/support/skim, once per
  //    chapter, in the background — the text is readable immediately and
  //    dims its skim paragraphs when the labels arrive.
  ensureAttentionLabels() {
    const chapter = this.chapter;
    const book = AppState.selectedBook;
    if (!chapter || chapter.attentionLabels || AppState.mode === 'demo') {
      this.applyAttentionLabels();
      return;
    }
    if (!AppState.settings.apiKey) return;

    const paragraphs = this.segments.flatMap(s => s.paragraphs);
    callSegmentClassifier(paragraphs, chapter.title, book?.title || '')
      .then(labels => {
        if (this.chapter !== chapter) return; // user moved on to another chapter
        chapter.attentionLabels = labels;
        this.applyAttentionLabels();
        if (book?.isPdfBook) {
          dbPutChapter(book.id, { chapterNumber: chapter.number, attentionLabels: labels })
            .catch(err => console.warn('Attention labels save failed:', err.message));
        }
      })
      .catch(err => console.warn('Attention classification failed (text stays full-contrast):', err.message));
  },

  applyAttentionLabels() {
    const labels = this.chapter?.attentionLabels;
    if (!labels) return;
    document.querySelectorAll('#reader-column p[data-pidx]').forEach(p => {
      const label = labels[parseInt(p.dataset.pidx)];
      p.classList.toggle('skim', label === 'skim');
      if (label === 'skim') p.title = 'Skim-classified — tap to read at full contrast';
    });
  },

  // Switch to the classic tutor split without tearing down reader state.
  // Focus mode itself stays on — the whole Tutor Arena runs full-screen
  // now (navigateTo sets it), whether showing the reader or the chat.
  showTutor() {
    document.getElementById('reader-pane').style.display = 'none';
    document.querySelector('#view-tutor .tutor-split').style.display = '';
  },

  showReader() {
    if (!this.active) return;
    document.querySelector('#view-tutor .tutor-split').style.display = 'none';
    document.getElementById('reader-pane').style.display = 'flex';
    this.startSegmentTimer(); // reading clock restarts when the text returns
  },

  close() {
    this.active = false;
    this.chapter = null;
    this.segments = [];
    this.segmentStartedAt = null;
    document.getElementById('reader-pane').style.display = 'none';
    document.querySelector('#view-tutor .tutor-split').style.display = '';
    document.getElementById('btn-back-to-reader').style.display = 'none';
  },

  startSegmentTimer() {
    this.segmentStartedAt = Date.now();
    this.frozenReadSeconds = null;
  },

  // Called at the first checkpoint interaction: reading is over, answering
  // begins — checkpoint time must not count against reading pace (it was
  // silently deflating measured WPM and inflating the time-left estimates).
  markReadingEnd() {
    if (this.frozenReadSeconds == null && this.segmentStartedAt) {
      this.frozenReadSeconds = (Date.now() - this.segmentStartedAt) / 1000;
    }
  },

  renderColumn() {
    const col = document.getElementById('reader-column');
    col.innerHTML = '';
    const visibleCount = Math.min(this.segmentsDone + 1, this.segments.length);

    for (let i = 0; i < visibleCount; i++) {
      col.appendChild(this.buildSegmentEl(this.segments[i], i));
    }

    if (this.segmentsDone >= this.segments.length) {
      col.appendChild(this.buildChapterCompleteEl());
    }

    this.applyAttentionLabels();
    if (this.chapter?.bookmarkPidx != null) {
      this.markBookmarkedParagraph(this.chapter.bookmarkPidx);
    }
  },

  buildSegmentEl(segment, index) {
    const wrap = document.createElement('div');
    wrap.className = 'reader-segment';
    wrap.id = `segment-${index}`;

    // Global paragraph index across all segments — attention labels align to it
    const offset = this.segments.slice(0, index).reduce((n, s) => n + s.paragraphs.length, 0);

    segment.paragraphs.forEach((p, i) => {
      const el = document.createElement('p');
      el.textContent = p;
      el.dataset.pidx = offset + i;
      wrap.appendChild(el);
    });

    // Boundary after the segment: done segments get a quiet rule; the current
    // segment gets the continue affordance (replaced by checkpoints in v2.3).
    const boundary = document.createElement('div');
    boundary.className = 'segment-boundary';

    const rule = document.createElement('div');
    rule.className = 'seg-rule';
    rule.textContent = `Segment ${index + 1} of ${this.segments.length}`;
    boundary.appendChild(rule);

    if (index === this.segmentsDone) {
      boundary.appendChild(Checkpoint.build(segment, index));
    } else {
      rule.textContent += ' ✓';
      rule.classList.add('seg-done');
    }

    wrap.appendChild(boundary);
    return wrap;
  },

  buildChapterCompleteEl() {
    const done = document.createElement('div');
    done.className = 'reader-chapter-done';

    if (this.chapter.consolidated) {
      done.innerHTML = `
        <div class="seg-rule">Chapter consolidated ✓</div>
        <p>Recall checked and review cards scheduled. Prove it in the field — or talk it through with the tutor.</p>
      `;
      const transferBtn = document.createElement('button');
      transferBtn.className = 'btn btn-primary';
      transferBtn.textContent = 'Try an application problem →';
      transferBtn.addEventListener('click', () => startTransferProblem(transferBtn));
      done.appendChild(transferBtn);

      const btn = document.createElement('button');
      btn.className = 'cp-skip';
      btn.textContent = 'Open tutor instead';
      btn.addEventListener('click', () => this.showTutor());
      done.appendChild(btn);
      return done;
    }

    done.innerHTML = `
      <div class="seg-rule">Chapter complete</div>
      <p>One last step locks it in: write down everything you remember, and your review cards get built from whatever you miss.</p>
    `;
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Brain dump →';
    btn.addEventListener('click', () => Consolidate.open(this.chapter));
    done.appendChild(btn);

    const tutorBtn = document.createElement('button');
    tutorBtn.className = 'cp-skip';
    tutorBtn.textContent = 'Open tutor instead';
    tutorBtn.addEventListener('click', () => this.showTutor());
    done.appendChild(tutorBtn);
    return done;
  },

  async completeSegment(index) {
    if (index !== this.segmentsDone) return; // only the current segment advances

    const segment = this.segments[index];
    // Prefer the duration frozen at first checkpoint interaction — answering
    // time is not reading time
    const seconds = this.frozenReadSeconds
      ?? (this.segmentStartedAt ? (Date.now() - this.segmentStartedAt) / 1000 : 0);

    this.segmentsDone = index + 1;
    this.startSegmentTimer();

    // A checkpoint past the bookmark supersedes it — don't drag the reader
    // backwards on the next open.
    let clearedBookmark = false;
    if (this.chapter.bookmarkPidx != null) {
      const parasCompleted = this.segments.slice(0, this.segmentsDone)
        .reduce((n, s) => n + s.paragraphs.length, 0);
      if (this.chapter.bookmarkPidx < parasCompleted) {
        this.chapter.bookmarkPidx = null;
        clearedBookmark = true;
      }
    }

    // Reveal the next segment (or the completion card) in place
    this.renderColumn();
    const next = document.getElementById(`segment-${this.segmentsDone}`);
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.updateTopbar();

    // Persist progress + pace in the background — reading never blocks on I/O
    const book = AppState.selectedBook;
    updateBookReadingProgress(segment.wordCount, seconds, this.chapter.number)
      .catch(err => console.warn('Reading progress save failed:', err.message));
    if (book?.isPdfBook) {
      const progress = { chapterNumber: this.chapter.number, segmentsDone: this.segmentsDone };
      if (clearedBookmark) progress.bookmarkPidx = null;
      dbPutChapter(book.id, progress)
        .catch(err => console.warn('Progress save failed:', err.message));
      if (this.segmentsDone >= this.segments.length) {
        dbUpdateBookProgress(book.id, 'studied', this.chapter.number)
          .catch(() => {});
        showToast('Chapter finished — nice work.', 'success');
      }
    }
  },

  updateTopbar() {
    const total = this.wordsTotal();
    const done = this.wordsDone();
    const pct = total ? Math.round((done / total) * 100) : 0;
    document.getElementById('reader-progress-fill').style.width = `${pct}%`;

    const wpm = bookPaceWpm(AppState.selectedBook);
    const minutesLeft = (total - done) / wpm;
    document.getElementById('reader-time-left').textContent =
      done >= total ? 'Done' : `${formatReadingTime(minutesLeft)} left`;
  },

  // Top bar hides while scrolling down, returns on scroll-up
  handleScroll(scrollEl) {
    const y = scrollEl.scrollTop;
    const topbar = document.getElementById('reader-topbar');
    topbar.classList.toggle('topbar-hidden', y > this._lastScrollY && y > 64);
    this._lastScrollY = y;
  }
};

function initReader() {
  document.getElementById('btn-reader-exit').addEventListener('click', () => {
    Reader.close();
    navigateTo('library');
  });
  document.getElementById('btn-reader-tutor').addEventListener('click', () => Reader.showTutor());
  document.getElementById('btn-back-to-reader').addEventListener('click', () => Reader.showReader());
  const scrollEl = document.getElementById('reader-scroll');
  scrollEl.addEventListener('scroll', () => Reader.handleScroll(scrollEl), { passive: true });

  // Skim paragraphs expand to full contrast on tap/click
  document.getElementById('reader-column').addEventListener('click', (e) => {
    const p = e.target.closest?.('p.skim');
    if (p) p.classList.toggle('expanded');
  });
}



// ── FIREBASE AUTH ─────────────────────────────────────────────────────────────
// Manages the sign-in overlay and user session lifecycle.

async function signInWithGoogle() {
  try {
    await firebaseAuth.signInWithPopup(googleProvider);
  } catch (e) {
    showToast('Sign-in failed: ' + e.message, 'error');
  }
}

async function signOutUser() {
  if (!confirm('Sign out? Your library is safely saved to the cloud.')) return;
  await firebaseAuth.signOut();
}

function initAuth() {
  firebaseAuth.onAuthStateChanged(async (user) => {
    const overlay     = document.getElementById('signin-overlay');
    const sidebarUser = document.getElementById('sidebar-user');

    if (user) {
      // ── User is signed in ──
      AppState.currentUser = user;
      overlay.style.display = 'none';
      sidebarUser.style.display = 'flex';

      // Update avatar + name in sidebar
      const avatar = document.getElementById('user-avatar');
      if (user.photoURL) avatar.src = user.photoURL;
      document.getElementById('user-name').textContent =
        user.displayName?.split(' ')[0] || user.email;

      // Load settings, library, and tutor selectors now that we have a user
      await loadSettings();
      await renderLibrary();
      await initTutorSelectors();

    } else {
      // ── User is signed out ──
      AppState.currentUser = null;
      overlay.style.display = 'flex';
      sidebarUser.style.display = 'none';
    }
  });
}

// ── 3. DEMO DATA ──────────────────────────────────────────────────────────────
// A full pre-built book used in Demo Mode, so the app works without an API key.
const DEMO_BOOK = {
  id: 'demo-chase-6sg',
  title: 'The Behavior Operational Manual',
  author: 'Chase Hughes',
  level: 'ref',
  chapters: [
    {
      number: 1,
      title: 'Reading the Baseline',
      summary_10s: 'Everyone displays a personal behavioral "idle state" — deviations from this baseline are the only reliable signals of deception, stress, or concealed emotion.',
      summary_3m: [
        '**Behavioral Baseline:** Every person has a unique resting pattern of gestures, posture, and speech. You cannot interpret deviations without first establishing this norm.',
        '**Calibration Window:** The first 5 minutes of interaction is purely for observation — not rapport-building. You are recording default patterns.',
        '**Clusters, Not Singles:** A single gesture (e.g. touching the nose) means nothing. Only clusters of 3+ simultaneous changes signal a meaningful shift.',
        '**Pacifying Behaviors:** Self-soothing gestures (neck-touch, lip-press, hair-stroke) are among the most reliable stress indicators in the human body.'
      ],
      summary_15m: `### The Foundation of Behavioral Analysis\n\nThe most common mistake practitioners make is trying to interpret behavior without first establishing a baseline. A baseline is the individual's natural, unstressed behavioral repertoire — how they gesture, breathe, stand, and speak when nothing is at stake. Without this reference point, everything you observe is meaningless noise.\n\n### The Calibration Window\n\nChase Hughes argues that the first 5 minutes of any interaction should be devoted entirely to calibration. Ask neutral, low-stakes questions ("How long have you been with the company?", "How was your commute?") and simply watch. You are building a mental model of this person's idle state: Are they a big gesturer or a still person? Do they maintain eye contact or look away when thinking? Do they breathe high in the chest or deep from the abdomen?\n\n### Clusters Are Everything\n\nOnce baseline is set, you look for deviations. But a single deviation is never enough. The human body is a messy, imperfect signaling system. A nose-touch could mean anything. A cluster — nose-touch, crossed arms, micro-expression of contempt, and a pause in speech — means something specific. Hughes' rule of three: any behavior that appears three times in three different channels simultaneously is a signal worth investigating.\n\n### The Pacifying Behavior Hierarchy\n\nThe most reliable stress indicators are self-pacifying behaviors — actions the body uses to self-soothe under cognitive or emotional load. In order of reliability: neck-touching, lip-pressing, nose-rubbing, hair-stroking, and leg-bouncing. These are evolutionarily hardwired and extremely difficult to consciously suppress.`,
      concepts: ['Behavioral Baseline', 'Calibration Window', 'Behavioral Clusters'],
      flashcards: [
        { front: 'What is a behavioral baseline and why must it be established first?', back: 'The baseline is a person\'s unique resting pattern of gestures, speech, and posture when nothing is at stake. Without it, you have no reference point to measure deviations against.' },
        { front: 'What is Hughes\' rule of three for behavioral clusters?', back: 'Any behavior appearing three times across three different channels simultaneously (e.g. voice change + posture shift + micro-expression) is a signal worth investigating.' }
      ]
    },
    {
      number: 2,
      title: 'The Compliance Stack',
      summary_10s: 'Micro-compliance behaviors are the rungs of a social ladder — by engineering a sequence of small yeses, you reprogram the subject\'s perceived relationship with you before they are aware of it.',
      summary_3m: [
        '**The Compliance Ladder:** Every small "yes" physically lowers resistance to the next request. Start micro (eye contact) and escalate gradually.',
        '**Foot-in-the-Door Technique:** Getting agreement on a trivial request dramatically increases compliance with a larger subsequent request.',
        '**Cognitive Dissonance Engine:** When someone acts in accordance with a belief (even a small one), they will modify their self-image to match that behavior.',
        '**Framing the Frame:** The context you build in the first 60 seconds determines what role the other person assigns you — expert, peer, authority, or subordinate.'
      ],
      summary_15m: `### The Architecture of Influence\n\nThe compliance stack is a systematic method for building behavioral agreement incrementally. Rather than making a single high-stakes persuasion attempt, you layer micro-agreements over time, each one slightly larger than the last. The psychological mechanism underlying this is cognitive dissonance: the human mind desperately wants its actions to be consistent with its self-image.\n\n### Foot in the Door\n\nThe classic "foot in the door" (FITD) technique demonstrates this elegantly. Studies show that getting someone to agree to a tiny request (signing a small petition) makes them 3-4x more likely to agree to a much larger request weeks later. Each small compliance updates their self-concept: "I am the kind of person who agrees with these people."\n\n### Engineering the Compliance Ladder\n\nHughes maps this to a practical ladder. Start with zero-cost compliance: hold eye contact for 3 seconds, then thank them for it. Progress to low-cost: ask a preference question ("Which of these two would work better for you?"). Then medium-cost: request a small favor. By the time you reach your target ask, the relationship script has already been written.\n\n### The 60-Second Frame\n\nThe first 60 seconds of interaction are disproportionately powerful. In this window, the other person is running a rapid assessment: "Who is this person? What is their status? How should I categorize this interaction?" You can deliberately engineer this assessment by controlling your entry, vocal tone, posture, and first words.`,
      concepts: ['Compliance Ladder', 'Foot-in-the-Door', 'Frame Control'],
      flashcards: [
        { front: 'Why does micro-compliance escalation work psychologically?', back: 'Each small "yes" updates the person\'s self-concept via cognitive dissonance. They begin to see themselves as someone who agrees with you, making larger requests feel consistent with their identity.' },
        { front: 'What is the significance of the first 60 seconds of an interaction?', back: 'The other person is rapidly assigning you a social role (expert, peer, authority). Deliberately controlling your posture, tone, and first words lets you engineer how they categorize the relationship.' }
      ]
    },
    {
      number: 3,
      title: 'Elicitation Frameworks',
      summary_10s: 'Elicitation is the art of extracting high-value information without ever asking a direct question, using conversational triggers that cause people to fill silence and volunteer data.',
      summary_3m: [
        '**The Deliberate Pause:** Silence is one of the most powerful elicitation tools. After a statement, pause 3-5 seconds. Most people will fill the void with unguarded information.',
        '**Bracketing:** Instead of asking "How much does this contract pay?", say "I heard it\'s either $50k or $120k." The person will correct you with the real number.',
        '**Flattery & Expertise Bait:** People reveal significantly more when framed as the expert. "I\'d love your professional take on how that process works."',
        '**False Disbelief:** Express mild skepticism ("Surely that\'s not how it actually works?") and people rush to prove you wrong with accurate details.'
      ],
      summary_15m: `### The Intelligence Framework\n\nElicitation is distinct from interrogation. Interrogation is an adversarial information-extraction method that requires institutional power. Elicitation is a conversational information-extraction method that requires social skill. The goal is to make the source feel like the conversation is casual and mutual while systematically guiding them toward target information.\n\n### Silence as a Weapon\n\nThe deliberate pause is beginner-level but devastatingly effective. After someone finishes speaking, hold silent eye contact for 3-5 seconds instead of immediately responding. The social pressure of silence is so discomforting that most people will immediately continue talking, often revealing much more than they intended. Hughes calls this the "empty bucket" — you hold it out and they fill it.\n\n### Bracketing and Framing\n\nBracketing exploits the correction instinct. Instead of asking a direct question (which triggers guarded responses), you make a statement with deliberately incorrect information. "I heard the team is around 15 people." If the real number is 47, they will automatically correct you — and in doing so, hand you the data you needed. The correction feels benign to them because they initiated it.\n\n### The Expert Elicitation Frame\n\nFlattery combined with an expert frame is one of the highest-yield elicitation techniques. Most professionals have a deep need to be seen as competent in their domain. By positioning yourself as a curious student and them as the authority, you create a psychological context where withholding information feels like failing their new role. They reveal far more than they normally would.`,
      concepts: ['Deliberate Pause', 'Bracketing', 'Expert Elicitation Frame'],
      flashcards: [
        { front: 'What is the "Bracketing" elicitation technique and why does it work?', back: 'You state a deliberately incorrect range or number. The person\'s natural correction instinct causes them to give you the real figure. The correction feels benign to them because they volunteered it.' },
        { front: 'Why is silence a powerful elicitation tool?', back: 'Social pressure makes silence deeply uncomfortable. Most people will fill a 3-5 second pause with unguarded, additional information rather than endure awkwardness.' }
      ]
    }
  ]
};

// ── 4. TOAST NOTIFICATION SYSTEM ─────────────────────────────────────────────
// Creates brief pop-up messages to give the user feedback on actions.
function showToast(message, type = 'info', duration = 4000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { info: 'ℹ️', success: '✅', error: '❌' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  // Auto-remove after duration.
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ── 5. VIEW NAVIGATION ────────────────────────────────────────────────────────
// Hides all views and shows only the one matching the given viewId.
function navigateTo(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.mobile-nav-item').forEach(l => l.classList.remove('active'));

  const targetView    = document.getElementById(`view-${viewId}`);
  const targetNav     = document.getElementById(`nav-${viewId}`);
  const targetMobNav  = document.getElementById(`mobile-nav-${viewId}`);

  if (targetView)   targetView.classList.add('active');
  if (targetNav)    targetNav.classList.add('active');
  if (targetMobNav) targetMobNav.classList.add('active');

  AppState.currentView = viewId;

  // Tutor Arena runs full-screen (chat or reader, whichever is showing) —
  // the sidebar/mobile nav only make sense outside of it.
  setFocusMode(viewId === 'tutor');
  // Any navigation collapses a summoned nav back into focus
  document.body.classList.remove('nav-revealed');
}

// The floating menu button: while focus mode hides the phone's bottom nav,
// this summons it back in place — no rotating the device required.
function initNavReveal() {
  document.getElementById('btn-nav-reveal').addEventListener('click', () => {
    document.body.classList.toggle('nav-revealed');
  });
}

// ── 6. SETTINGS LOAD/SAVE ─────────────────────────────────────────────────────
async function loadSettings() {
  const apiKeyRecord = await dbGet('settings', 'apiKey');
  const demoRecord   = await dbGet('settings', 'demoMode');
  const modelRecord  = await dbGet('settings', 'model');
  const hqRecord     = await dbGet('settings', 'highQualityGrading');

  // ── AUTO-CONFIGURE ON FIRST LAUNCH ──────────────────────────────
  // API key must be entered via Settings — never hardcode it here
  // as it would be exposed in the public GitHub repository.
  const USER_API_KEY = ''; // Enter your key in Settings (⚙️ bottom-left)
  if (!apiKeyRecord || !apiKeyRecord.value) {
    await dbPut('settings', { key: 'apiKey',   value: USER_API_KEY });
    await dbPut('settings', { key: 'demoMode', value: false });
    AppState.settings.apiKey = USER_API_KEY;
    AppState.mode = 'live';
  } else {
    AppState.settings.apiKey = apiKeyRecord.value;
    const isDemoMode = demoRecord ? demoRecord.value : false;
    AppState.mode = isDemoMode ? 'demo' : 'live';
  }

  // Model preferences (local-only, like the API key)
  AppState.settings.model = modelRecord?.value || 'gemini-2.5-flash';
  AppState.settings.highQualityGrading = hqRecord?.value || false;

  const isDemoMode = AppState.mode === 'demo';

  // Sync the settings UI
  if (document.getElementById('input-api-key'))
    document.getElementById('input-api-key').value = AppState.settings.apiKey;
  if (document.getElementById('toggle-demo-mode'))
    document.getElementById('toggle-demo-mode').checked = isDemoMode;
  if (document.getElementById('select-model'))
    document.getElementById('select-model').value = AppState.settings.model;
  if (document.getElementById('toggle-hq-grading'))
    document.getElementById('toggle-hq-grading').checked = AppState.settings.highQualityGrading;

  if (isDemoMode) {
    document.getElementById('btn-demo-banner').style.display = 'inline-flex';
  }
}

async function saveSettings() {
  const apiKey = document.getElementById('input-api-key').value.trim();
  const isDemoMode = document.getElementById('toggle-demo-mode').checked;
  const model = document.getElementById('select-model')?.value || 'gemini-2.5-flash';
  const hqGrading = document.getElementById('toggle-hq-grading')?.checked || false;

  AppState.settings.apiKey = apiKey;
  AppState.settings.model = model;
  AppState.settings.highQualityGrading = hqGrading;
  AppState.mode = isDemoMode ? 'demo' : 'live';

  await dbPut('settings', { key: 'apiKey', value: apiKey });
  await dbPut('settings', { key: 'demoMode', value: isDemoMode });
  await dbPut('settings', { key: 'model', value: model });
  await dbPut('settings', { key: 'highQualityGrading', value: hqGrading });

  document.getElementById('modal-settings').style.display = 'none';
  document.getElementById('btn-demo-banner').style.display = isDemoMode ? 'inline-flex' : 'none';
  showToast('Settings saved.', 'success');
  await renderLibrary();
}

// ── 7. LIBRARY RENDERING ──────────────────────────────────────────────────────
// Reads all books from IndexedDB and renders book cards on the homepage.
async function renderLibrary() {
  const grid = document.getElementById('book-grid');
  const emptyShelf = document.getElementById('empty-shelf');

  let books = await dbGetAll('books');

  // In demo mode, always include the demo book.
  if (AppState.mode === 'demo') {
    const alreadyHasDemo = books.some(b => b.id === DEMO_BOOK.id);
    if (!alreadyHasDemo) {
      await dbPut('books', DEMO_BOOK);
      books = await dbGetAll('books');
    }
  }

  // Clear existing cards (but keep the empty state element)
  const existingCards = grid.querySelectorAll('.book-card');
  existingCards.forEach(c => c.remove());

  if (books.length === 0) {
    emptyShelf.style.display = 'block';
    return;
  }

  emptyShelf.style.display = 'none';

  // ── Continue hero: most recently read book, one tap to resume ──
  const heroSlot = document.getElementById('continue-hero-slot');
  if (heroSlot) {
    heroSlot.innerHTML = '';
    const lastBook = books
      .filter(b => b.lastRead?.at)
      .sort((a, b) => b.lastRead.at - a.lastRead.at)[0];
    if (lastBook) {
      const minsLeft = bookTimeLeftMinutes(lastBook);
      const hero = document.createElement('div');
      hero.className = 'continue-hero';
      hero.innerHTML = `
        <div class="continue-hero-body">
          <div class="continue-hero-label">Continue</div>
          <div class="continue-hero-title">${lastBook.title}</div>
          <div class="continue-hero-where">Chapter ${lastBook.lastRead.chapterNumber}${
            minsLeft != null ? ` · ≈ ${formatReadingTime(minsLeft)} left in the book` : ''}</div>
        </div>
        <button class="btn btn-primary" id="btn-continue-resume">Resume →</button>
      `;
      hero.querySelector('#btn-continue-resume').addEventListener('click', async (e) => {
        e.stopPropagation();
        await openBook(lastBook.id);
        await loadChapter(lastBook.lastRead.chapterNumber);
      });
      heroSlot.appendChild(hero);
    }
  }

  // Render a card for each book
  books.forEach(book => {
    const totalChapters   = book.chapters.length;
    const studiedCount    = book.isPdfBook
      ? (book.studiedChapters?.length || 0)
      : book.chapters.filter(c => c._mastered).length;
    const readyCount      = book.isPdfBook
      ? (book.readyChapters?.length || 0)
      : studiedCount;

    const card = document.createElement('div');
    card.className = 'book-card';
    card.dataset.bookId = book.id;

    // Color-themed covers using book ID for variety
    const coverColors = [
      ['#234a34', '#152e20'],
      ['#6d2530', '#3f1119'],
      ['#3d2b1a', '#211609'],
      ['#8a6229', '#5c4018'],
      ['#4f7a6c', '#2b453c'],
    ];
    const colorIndex = book.id.charCodeAt(4) % coverColors.length;
    const [c1, c2] = coverColors[colorIndex];

    const pct = totalChapters > 0 ? Math.round((studiedCount / totalChapters) * 100) : 0;
    
    // Create tags array, each paired with a theme class
    const tags = [];
    if (pct === 100) tags.push(['#Completed', '']);
    else if (pct > 0) tags.push(['#Read', '']);
    else tags.push(['#New', 'tag-brass']);

    if (book.isPdfBook) tags.push(['#PDF', 'tag-burgundy']);
    if (book.level === 'deep') tags.push(['#DeepStudy', 'tag-brass']);

    const tagsHtml = tags.map(([label, cls]) => `<span class="book-tag ${cls}">${label}</span>`).join('');

    const coverHtml = book.coverUrl
      ? `<div class="book-card-cover-placeholder" style="height: 100%; border-radius: 4px; overflow: hidden;"><img src="${book.coverUrl}" class="book-card-cover-image" alt="Cover" /></div>`
      : `<div class="book-card-cover-placeholder" style="background: linear-gradient(155deg, ${c1}, ${c2}); height: 100%; border-radius: 4px;"></div>`;

    const minsLeft = bookTimeLeftMinutes(book);
    const timeLeftHtml = minsLeft != null && pct < 100
      ? `<div class="book-card-timeleft">≈ ${formatReadingTime(minsLeft)} left</div>`
      : '';

    card.innerHTML = `
      <div class="book-card-cover">
        ${coverHtml}
      </div>
      <div class="book-card-title">${book.title}</div>
      <div class="book-card-author">${book.author}</div>
      <div class="book-card-progress-wrapper">
        <div class="book-card-progress-track">
          <div class="book-card-progress-fill" style="width:${pct}%"></div>
        </div>
      </div>
      ${timeLeftHtml}
      <div class="book-card-tags">
        ${tagsHtml}
      </div>

    `;

    card.addEventListener('click', () => openBook(book.id));
    grid.appendChild(card);
  });

  // Update stats
  const totalCards = books.reduce((sum, b) => sum + b.chapters.reduce((s, c) => s + (c.flashcards?.length || 0), 0), 0);
  document.getElementById('stat-total-books').textContent = books.length;
  document.getElementById('stat-mastered-chapters').textContent = books.reduce((sum, b) => {
    if (b.isPdfBook) return sum + (b.studiedChapters?.length || 0);
    return sum + b.chapters.filter(c => c._mastered).length;
  }, 0);
  document.getElementById('stat-cards-due').textContent = totalCards;
}

// ── 8. OPEN A BOOK → NAVIGATE TO TUTOR ───────────────────────────────────────
async function openBook(bookId) {
  const book = await dbGet('books', bookId);
  if (!book) return;

  AppState.selectedBook = book;
  AppState.selectedChapter = null;

  // Populate the Tutor Arena book selector
  const bookSelect = document.getElementById('tutor-book-select');
  bookSelect.value = bookId;
  if (!bookSelect.querySelector(`option[value="${bookId}"]`)) {
    const opt = document.createElement('option');
    opt.value = bookId;
    opt.textContent = book.title;
    bookSelect.appendChild(opt);
  }
  bookSelect.value = bookId;

  populateChapterSelect(book);
  navigateTo('tutor');

  // Resume where you left off: the last-read chapter loads automatically.
  // (Within the chapter, the reader then restores the exact bookmark spot.)
  const resumeChapter = book.lastRead?.chapterNumber;
  if (resumeChapter && book.chapters.some(c => c.number === resumeChapter)) {
    document.getElementById('tutor-chapter-select').value = resumeChapter;
    await loadChapter(resumeChapter);
  }
}

// Remember the last-opened chapter on the book doc — powers both the library
// Continue hero and the click-a-book auto-resume. Fire-and-forget write.
function rememberLastRead(chapterNumber) {
  const book = AppState.selectedBook;
  if (!book) return;
  const updated = { ...book, lastRead: { chapterNumber, at: Date.now() } };
  AppState.selectedBook = updated;
  dbPut('books', updated).catch(() => {});
}

// ── 9. POPULATE CHAPTER SELECT ────────────────────────────────────────────────
function populateChapterSelect(book) {
  const select = document.getElementById('tutor-chapter-select');
  select.innerHTML = '<option value="">-- Choose a Chapter --</option>';
  select.disabled = false;

  const readySet   = new Set(book.readyChapters   || []);
  const studiedSet = new Set(book.studiedChapters  || []);

  book.chapters.forEach(ch => {
    const opt = document.createElement('option');
    opt.value = ch.number;
    let badge = '';
    if (book.isPdfBook) {
      if (studiedSet.has(ch.number)) badge = ' ✓';
      else if (readySet.has(ch.number)) badge = ' ✨';
    } else {
      if (ch._mastered) badge = ' ✓';
    }
    opt.textContent = `Ch. ${ch.number}: ${ch.title}${badge}`;
    select.appendChild(opt);
  });
}

// ── 10. LOAD CHAPTER INTO TUTOR ───────────────────────────────────────────────
async function loadChapter(chapterNumber) {
  const book = AppState.selectedBook;
  if (!book) return;

  const chapterNum = parseInt(chapterNumber);
  const chapterSkeleton = book.chapters.find(c => c.number === chapterNum);
  if (!chapterSkeleton) return;

  // ── PDF BOOK: on-demand curriculum generation ─────────────────────────────
  if (book.isPdfBook) {
    let chapterData = await dbGetChapter(book.id, chapterNum);

    // Check if curriculum has already been generated
    if (!chapterData?.summary_10s) {
      // Show generating overlay
      const overlay = document.getElementById('chapter-generating-overlay');
      const overlayTitle = document.getElementById('chapter-gen-title');
      const overlayStatus = document.getElementById('chapter-gen-status');
      if (overlay) {
        overlayTitle.textContent = chapterSkeleton.title;
        overlayStatus.textContent = 'Analysing chapter with Gemini AI…';
        overlay.style.display = 'flex';
      }

      try {
        const chapterText = chapterData?.text || '';
        if (!chapterText) {
          throw new Error('Chapter text not found. The book may need to be re-uploaded.');
        }
        overlayStatus && (overlayStatus.textContent = 'Applying 80/20 principle…');
        const curriculum = await callChapterCurriculumGenerator(
          chapterSkeleton.title,
          book.title,
          book.author,
          chapterText
        );

        // Save curriculum back to Firestore (merge so we keep the text)
        await dbPutChapter(book.id, {
          chapterNumber: chapterNum,
          title: chapterSkeleton.title,
          ...curriculum
        });

        // Mark chapter as ready in book doc
        await dbUpdateBookProgress(book.id, 'ready', chapterNum);
        populateChapterSelect(AppState.selectedBook); // refresh badges

        // Reload from Firestore to get merged data (text + curriculum)
        chapterData = await dbGetChapter(book.id, chapterNum);
      } catch (err) {
        if (overlay) overlay.style.display = 'none';
        showToast('Could not generate chapter: ' + err.message, 'error', 8000);
        return;
      }
      if (overlay) overlay.style.display = 'none';
    }

    // Build the chapter object the rest of the function expects
    const chapter = {
      ...chapterSkeleton,
      ...chapterData,
      _chapterText: chapterData?.text || '', // for tutor quoting
      _checkpoints: chapterData?.checkpoints || []
    };
    AppState.selectedChapter = chapter;
    AppState.masteredConcepts = chapter._masteredConcepts || [];
    AppState.shakyConcepts = chapterData?.shakyConcepts || [];
    AppState.currentChatMode  = 'teach';

    const chapterKey = `${book.id}-ch${chapterNum}`;
    await loadChatHistoryFromDB(chapterKey);
    renderChapterUI(chapter);
    rememberLastRead(chapterNum);

    // Guided reading: chapters with real text open in the reader pane,
    // preceded by the Prime sequence on first open
    if (chapter._chapterText) {
      if (chapter.primed) Reader.open(chapter);
      else Prime.open(chapter);
    } else {
      Reader.close();
    }
    return;
  }

  // ── KNOWLEDGE BOOK: existing flow ────────────────────────────────────────
  const chapter = chapterSkeleton;
  AppState.selectedChapter  = chapter;
  AppState.masteredConcepts = chapter._masteredConcepts || [];
  AppState.shakyConcepts    = [];
  AppState.currentChatMode  = 'teach';

  const chapterKey = `${book.id}-ch${chapter.number}`;
  await loadChatHistoryFromDB(chapterKey);
  renderChapterUI(chapter);
  rememberLastRead(chapter.number);
  Reader.close(); // knowledge books have no text to read — chat is the surface
}

// ── 10a2. CHAT EMPTY STATE ───────────────────────────────────────────────────
// Shown instead of a plain greeting bubble when a chapter has no history yet.
// Built dynamically (like the resume-card) rather than sitting static in the
// HTML, since loadChatHistoryFromDB clears #chat-history-teach's innerHTML on
// every chapter load — a static element there would be destroyed immediately.
function showChatEmptyState(chapter, book) {
  hideChatEmptyState();

  const prompts = [
    "Yes, let's begin",
    'Give me the 10-second summary first',
    "What's the most important idea in this chapter?"
  ];

  const el = document.createElement('div');
  el.className = 'empty-state';
  el.id = 'chat-empty-state';
  el.innerHTML = `
    <div class="empty-mark">${TUTOR_AVATAR_SVG}</div>
    <h3>Ready to start ${chapter.title}?</h3>
    <p>${chapter.summary_10s || `Chapter ${chapter.number} of ${book.title}.`} Say the word and we'll take it page by page.</p>
    <div class="prompt-chips">
      ${prompts.map(p => `<button class="prompt-chip">${p}</button>`).join('')}
    </div>
  `;

  el.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      hideChatEmptyState();
      const input = document.getElementById('chat-input');
      input.value = chip.textContent;
      sendChatMessage();
    });
  });

  document.getElementById('chat-history-teach').appendChild(el);
}

function hideChatEmptyState() {
  document.getElementById('chat-empty-state')?.remove();
}

// ── 10b. RENDER CHAPTER UI ───────────────────────────────────────────────────
// Shared renderer — called by both PDF on-demand path and knowledge-book path.
function renderChapterUI(chapter) {
  const book = AppState.selectedBook;

  document.getElementById('summary-text-10s').textContent = chapter.summary_10s || '';
  document.getElementById('summary-text-3m').innerHTML = (chapter.summary_3m || [])
    .map(p => `<p style="margin-bottom:10px;">${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`)
    .join('');
  document.getElementById('summary-text-15m').innerHTML = renderMarkdown(chapter.summary_15m || '');

  renderConceptMap(chapter);

  document.getElementById('chat-tabs-container').style.display = 'flex';
  document.getElementById('chat-input').disabled = false;
  document.getElementById('btn-chat-send').disabled = false;
  document.getElementById('chat-mode-label').textContent = `Ch. ${chapter.number}: ${chapter.title}`;
  document.getElementById('tutor-status-dot').className = 'switcher-dot green';
  document.getElementById('chapter-switcher-trigger').title = `${book.title} — Ch. ${chapter.number}: ${chapter.title}`;
  closeChapterSwitcher();

  // New chapter, new visuals — the previous chapter's image/diagram no longer applies
  document.getElementById('visual-panel').style.display = 'none';
  document.getElementById('composer-tools-trigger').style.display = 'flex';

  switchChatTab('teach');

  const teachHistory = AppState.activeChatHistory.filter(m => m.mode === 'teach');
  if (teachHistory.length === 0) {
    showChatEmptyState(chapter, book);
  } else {
    hideChatEmptyState();
    const masteredCount = AppState.masteredConcepts.length;
    const totalCount = chapter.concepts.length;
    const teachContainer = document.getElementById('chat-history-teach');
    const card = document.createElement('div');
    card.className = 'resume-card';
    card.innerHTML = `
      <div class="rc-label">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 10a6 6 0 1 1 2 4.5"/><path d="M4 14v-3.5H7.5"/></svg>
        Picking up where you left off
      </div>
      <p>You've mastered <b>${masteredCount} of ${totalCount}</b> concepts in this chapter. Want a quick recap, or jump straight back in?</p>
      <div class="resume-actions">
        <button class="rc-btn primary" id="btn-resume-recap">Recap last lesson</button>
        <button class="rc-btn ghost" id="btn-resume-continue">Jump back in</button>
      </div>
    `;
    teachContainer.prepend(card);
    card.querySelector('#btn-resume-recap').addEventListener('click', () => { card.remove(); requestRecap(); });
    card.querySelector('#btn-resume-continue').addEventListener('click', () => card.remove());
  }

  renderNotesTab();
  populateSandboxSelectors();
}



// ── 11. RENDER MARKDOWN (simple parser) ───────────────────────────────────────
// Converts a basic subset of Markdown to HTML for rendering in the UI.
function renderMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return match;
    })
    .replace(/\n/g, '<br>');
}

// ── 12. CONCEPT MAP RENDERING ────────────────────────────────────────────────
function renderConceptMap(chapter) {
  const container = document.getElementById('concept-map-container');
  container.innerHTML = '';

  chapter.concepts.forEach(concept => {
    const node = document.createElement('div');
    const isMastered = AppState.masteredConcepts.includes(concept);
    const isShaky = !isMastered && (AppState.shakyConcepts || []).includes(concept);
    node.className = 'concept-node';
    if (isMastered) node.classList.add('mastered');
    else if (isShaky) node.classList.add('shaky');
    node.textContent = isMastered ? `${concept} ✓` : isShaky ? `${concept} ⟳` : concept;
    if (isShaky) node.title = 'Shaky — failed its checkpoint, will get extra review';
    container.appendChild(node);
  });
}

// ── 13. CHAT HISTORY — DB PERSISTENCE ────────────────────────────────────────
async function loadChatHistoryFromDB(chapterKey) {
  AppState.activeChatHistory = [];

  // Retrieve all messages for this chapter from IndexedDB.
  const allRecords = await dbGetAll('chatHistory');
  const chapterMessages = allRecords.filter(r => r.chapterKey === chapterKey);

  AppState.activeChatHistory = chapterMessages;

  // Clear and re-render both chat histories
  const teachContainer = document.getElementById('chat-history-teach');
  const quizContainer = document.getElementById('chat-history-quiz');
  teachContainer.innerHTML = '';
  quizContainer.innerHTML = '';

  // Re-render each saved message into the correct container
  chapterMessages.forEach(msg => {
    renderMessageBubble(msg.role, msg.content, msg.mode === 'teach' ? teachContainer : quizContainer);
  });
}

async function saveChatMessageToDB(role, content, mode) {
  const book = AppState.selectedBook;
  const chapter = AppState.selectedChapter;
  if (!book || !chapter) return;

  const chapterKey = `${book.id}-ch${chapter.number}`;
  await dbPut('chatHistory', { chapterKey, role, content, mode, timestamp: Date.now() });
}

// ── 14. CHAT RENDERING ────────────────────────────────────────────────────────
// Appends a message to the active chat AND saves it to IndexedDB.
function appendChatMessage(role, content, mode) {
  const containerId = mode === 'teach' ? 'chat-history-teach' : 'chat-history-quiz';
  const container = document.getElementById(containerId);
  renderMessageBubble(role, content, container);

  // Store in runtime state
  AppState.activeChatHistory.push({ role, content, mode });

  // Persist to DB
  saveChatMessageToDB(role, content, mode);

  // Auto-scroll to the bottom
  container.scrollTop = container.scrollHeight;
}

const TUTOR_AVATAR_SVG = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 4.5c1.8-.9 3.6-1.3 5.5-1.1 1 .1 1.9.4 2.5.9v11c-.6-.5-1.5-.8-2.5-.9-1.9-.2-3.7.2-5.5 1.1v-11z"/><path d="M18 4.5c-1.8-.9-3.6-1.3-5.5-1.1-1 .1-1.9.4-2.5.9v11c.6-.5 1.5-.8 2.5-.9 1.9-.2 3.7.2 5.5 1.1v-11z"/></svg>`;
const CHECK_ICON_SVG = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10l4 4 8-8"/></svg>`;

function renderMessageBubble(role, content, container) {
  const msg = document.createElement('div');

  // Mastery tags get their own chip rather than being silently stripped
  const masteredConcepts = [...content.matchAll(/\[MASTERED: (.*?)\]/g)].map(m => m[1]);
  const cleanContent = content.replace(/\[MASTERED:.*?\]/g, '').trim();

  if (role === 'tutor') {
    msg.className = 'turn tutor';
    const prose = renderMarkdown(cleanContent);
    const chips = masteredConcepts
      .map(c => `<span class="mastery-chip">${CHECK_ICON_SVG}Mastered: ${c}</span>`)
      .join('');
    msg.innerHTML = `
      <div class="avatar tutor">${TUTOR_AVATAR_SVG}</div>
      <div class="turn-body">
        <div class="turn-name">Tutor</div>
        <div class="prose">${prose}</div>
        ${chips}
      </div>
    `;
  } else {
    msg.className = 'turn user';
    const initial = (AppState.currentUser?.displayName || AppState.currentUser?.email || 'You').charAt(0).toUpperCase();
    msg.innerHTML = `
      <div class="avatar user">${initial}</div>
      <div class="turn-body">
        <div class="turn-name">You</div>
        <span class="user-bubble">${cleanContent}</span>
      </div>
    `;
  }
  container.appendChild(msg);
}

// ── 14b. STREAMING TUTOR RESPONSES ──────────────────────────────────────────
// Live mode streams real Gemini output via SSE; demo mode simulates the same
// progressive reveal so both feel consistent. Raw text only during streaming
// (no markdown parsing) to avoid rendering a broken half-open tag mid-stream;
// finalizeStreamingTutorTurn does the real markdown + mastery-chip pass once
// the full response is in.
function createStreamingTutorTurn(container) {
  const msg = document.createElement('div');
  msg.className = 'turn tutor';
  msg.innerHTML = `
    <div class="avatar tutor">${TUTOR_AVATAR_SVG}</div>
    <div class="turn-body">
      <div class="turn-name">Tutor</div>
      <div class="prose streaming-prose"></div>
    </div>
  `;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
  return msg.querySelector('.prose');
}

function updateStreamingTutorTurn(proseEl, rawText) {
  proseEl.textContent = rawText.replace(/\[MASTERED:.*?\]/g, '');
  const container = proseEl.closest('.chat-history');
  if (container) container.scrollTop = container.scrollHeight;
}

function finalizeStreamingTutorTurn(proseEl, fullText) {
  const masteredConcepts = [...fullText.matchAll(/\[MASTERED: (.*?)\]/g)].map(m => m[1]);
  const cleanContent = fullText.replace(/\[MASTERED:.*?\]/g, '').trim();
  proseEl.innerHTML = renderMarkdown(cleanContent);
  proseEl.classList.remove('streaming-prose');
  const chips = masteredConcepts
    .map(c => `<span class="mastery-chip">${CHECK_ICON_SVG}Mastered: ${c}</span>`)
    .join('');
  if (chips) proseEl.insertAdjacentHTML('afterend', chips);
}

// Demo mode has no real network stream to piggyback on, so this simulates
// the same word-by-word reveal client-side against the already-generated text.
function simulateStreamReveal(fullText, proseEl) {
  return new Promise(resolve => {
    const tokens = fullText.split(/(\s+)/); // keep whitespace so spacing looks natural
    let i = 0;
    const CHUNK = 3;
    const timer = setInterval(() => {
      i += CHUNK;
      updateStreamingTutorTurn(proseEl, tokens.slice(0, i).join(''));
      if (i >= tokens.length) {
        clearInterval(timer);
        resolve(fullText);
      }
    }, 35);
  });
}

// ── 15. CHAT TAB SWITCHING ────────────────────────────────────────────────────
function switchChatTab(mode) {
  AppState.currentChatMode = mode;

  document.querySelectorAll('.chat-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${mode}`).classList.add('active');

  document.getElementById('chat-history-teach').style.display = mode === 'teach' ? 'flex' : 'none';
  document.getElementById('chat-history-quiz').style.display = mode === 'quiz' ? 'flex' : 'none';

  // Update placeholder text based on mode
  document.getElementById('chat-input').placeholder = mode === 'teach'
    ? 'Reply to the tutor... (Enter to send)'
    : 'Answer the quiz question... (Enter to send)';

  // Auto-greet if entering quiz tab with no history
  const quizHistory = AppState.activeChatHistory.filter(m => m.mode === 'quiz');
  if (mode === 'quiz' && quizHistory.length === 0) {
    const quizGreeting = `Ready to test your knowledge of **Chapter ${AppState.selectedChapter.number}: ${AppState.selectedChapter.title}**?\n\nLet's begin the quiz! I'll ask you questions across all the core concepts we covered.`;
    appendChatMessage('tutor', quizGreeting, 'quiz');
  }

  // Scroll to bottom
  const activeHistory = document.getElementById(mode === 'teach' ? 'chat-history-teach' : 'chat-history-quiz');
  activeHistory.scrollTop = activeHistory.scrollHeight;
}

// ── 16. SEND CHAT MESSAGE ─────────────────────────────────────────────────────
async function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();

  if (!message || !AppState.selectedChapter) return;
  if (document.getElementById('btn-chat-send').disabled) return;

  if (AppState.currentChatMode === 'teach') hideChatEmptyState();

  input.value = '';
  input.style.height = 'auto';

  // Show the user's message
  appendChatMessage('user', message, AppState.currentChatMode);

  // Disable input while the response streams in
  input.disabled = true;
  document.getElementById('btn-chat-send').disabled = true;

  const targetContainer = document.getElementById(
    AppState.currentChatMode === 'teach' ? 'chat-history-teach' : 'chat-history-quiz'
  );

  // A live turn that fills in as text arrives, instead of a "Thinking..." bubble
  // followed by the whole response dropping in at once.
  const streamEl = createStreamingTutorTurn(targetContainer);

  let response = '';

  try {
    if (AppState.mode === 'demo') {
      // Demo mode: generate contextual mock response, revealed the same way live text streams in
      const full = generateDemoResponse(message, AppState.currentChatMode);
      response = await simulateStreamReveal(full, streamEl);
    } else {
      // Live mode: fire tutor agent and (only in "+ Visuals" mode) the visual director in parallel.
      const chapter  = AppState.selectedChapter;
      const book     = AppState.selectedBook;
      const wantsVisuals = AppState.tutorMode === 'visuals' && AppState.currentChatMode === 'teach';

      // Determine current active concept for the visual director
      const activeConcept = chapter.concepts
        .filter(c => !AppState.masteredConcepts.includes(c))[0] || chapter.title;
      const visualContext = `${activeConcept}. ${chapter.summary_15m.substring(0, 500)}`;

      const [tutorReply, visualData] = await Promise.all([
        callLiveTutorAgent(
          message, AppState.currentChatMode, AppState.masteredConcepts, chapter._chapterText || '',
          (piece, fullSoFar) => updateStreamingTutorTurn(streamEl, fullSoFar)
        ),
        wantsVisuals
          ? callVisualDirectorAgent(visualContext, book.title, chapter.title)
          : Promise.resolve(null)
      ]);

      response = tutorReply;

      // Update visual panel with image + diagram (non-blocking)
      if (visualData) {
        updateVisualPanel(visualData.imagePrompt, visualData.diagram);
      }
    }
  } catch (err) {
    response = `Connection Error: ${err.message}`;
  }

  // Check for mastery tags in the response (only in teach mode)
  if (AppState.currentChatMode === 'teach') {
    const masteryMatches = response.match(/\[MASTERED: (.*?)\]/g) || [];
    masteryMatches.forEach(match => {
      const concept = match.replace('[MASTERED: ', '').replace(']', '').trim();
      if (!AppState.masteredConcepts.includes(concept)) {
        AppState.masteredConcepts.push(concept);
        showToast(`✓ Mastered: ${concept}`, 'success');
        // Save mastery to DB
        saveMasteryProgress();
      }
    });
    renderConceptMap(AppState.selectedChapter);
  }

  // Replace the raw streamed text with the properly rendered version + mastery chips
  finalizeStreamingTutorTurn(streamEl, response);
  AppState.activeChatHistory.push({ role: 'tutor', content: response, mode: AppState.currentChatMode });
  saveChatMessageToDB('tutor', response, AppState.currentChatMode);

  // Narrate the response, only in "+ Listen" mode
  if (AppState.tutorMode === 'listen') {
    NarrationEngine.speak(response);
  }

  // Re-enable input
  input.disabled = false;
  document.getElementById('btn-chat-send').disabled = false;
  input.focus();
}

// ── 17. DEMO RESPONSE GENERATOR ───────────────────────────────────────────────
// Returns a realistic but hardcoded response for demo mode (no API key needed).
function generateDemoResponse(message, mode) {
  const chapter = AppState.selectedChapter;
  const msg = message.toLowerCase();

  if (mode === 'teach') {
    const isReady = ['yes', 'ready', 'begin', 'start', 'sure', 'ok', 'go', 'yep', 'yeah'].some(w => msg.includes(w));
    const isNext = ['next', 'continue', 'got it', 'no questions', 'understood', 'makes sense', 'move on'].some(w => msg.includes(w));
    const unmastered = chapter.concepts.filter(c => !AppState.masteredConcepts.includes(c));

    if (isReady || (AppState.activeChatHistory.filter(m => m.mode === 'teach').length <= 2)) {
      return `Perfect! Let's start with the first concept: **${unmastered[0] || chapter.concepts[0]}**.\n\n${chapter.summary_15m.split('###')[1] || chapter.summary_10s}\n\n**Key takeaway:** ${chapter.summary_3m[0]}\n\nDo you have any questions about this, or are you ready to turn the page?`;
    }

    if (isNext && unmastered.length > 0) {
      const prevConcept = unmastered[0];
      const remaining = chapter.concepts.filter(c => !AppState.masteredConcepts.includes(c) && c !== prevConcept);

      if (remaining.length > 0) {
        return `[MASTERED: ${prevConcept}]\n\nExcellent! Moving on to: **${remaining[0]}**.\n\n${chapter.summary_3m[1] || chapter.summary_10s}\n\n**Real-world application:** ${chapter.summary_3m[2] || 'This concept directly impacts how people perceive social situations in real time.'}\n\nAny questions before we move on?`;
      } else {
        return `[MASTERED: ${prevConcept}]\n\n🎉 Outstanding! You've completed all the core concepts for this chapter!\n\n**Summary of what you learned:**\n${chapter.concepts.map(c => `• ${c}`).join('\n')}\n\nSwitch to the **Quiz & Review** tab to test your retention!`;
      }
    }

    return `That's a great question. Let me break this down further.\n\n${chapter.summary_3m[0]}\n\nIn practical terms: ${chapter.summary_3m[1] || 'This is a foundational skill that underpins all the advanced techniques in later chapters.'}\n\nDoes that clarify things? Ready to continue?`;
  }

  // Quiz mode responses
  const quizQuestions = [
    `Let's test your retention. Here's your first question:\n\n**${chapter.flashcards[0].front}**`,
    `Correct! Well done. Now a harder one:\n\n**${chapter.flashcards[1]?.front || 'What is the most important practical takeaway from this chapter?'}**`,
    `Excellent work. Final question: In your own words, what is the core principle of "${chapter.concepts[0]}" and how would you apply it in a real scenario?`
  ];

  const quizCount = AppState.activeChatHistory.filter(m => m.mode === 'quiz').length;
  const questionIndex = Math.floor(quizCount / 2);
  return quizQuestions[questionIndex] || `Great answer! You have a solid grasp of this chapter. Overall performance: **Excellent** 🎯\n\nTry the **Feynman Sandbox** to deepen your understanding even further.`;
}

// ── 18. SAVE MASTERY PROGRESS ─────────────────────────────────────────────────
async function saveMasteryProgress() {
  const book = AppState.selectedBook;
  const chapter = AppState.selectedChapter;
  if (!book || !chapter) return;

  // Update the chapter in-memory
  chapter._masteredConcepts = AppState.masteredConcepts;
  if (AppState.masteredConcepts.length >= chapter.concepts.length) {
    chapter._mastered = true;
  }

  // Update the book in DB
  await dbPut('books', book);
  await renderLibrary();
}

// ── 18b. VISUAL PANEL ─────────────────────────────────────────────────────────
// Updates the visual panel with a Pollinations.ai image and a Mermaid diagram.
// Both are loaded asynchronously — image via <img> src, diagram via mermaid.run().
async function updateVisualPanel(imagePrompt, diagramDef) {
  const panel     = document.getElementById('visual-panel');
  const imageEl   = document.getElementById('visual-image');
  const loaderEl  = document.getElementById('visual-image-loader');
  const diagramEl = document.getElementById('visual-diagram');

  // Show the panel
  panel.style.display = 'flex';
  panel.classList.remove('visual-panel-fresh');
  void panel.offsetWidth; // reflow to restart animation
  panel.classList.add('visual-panel-fresh');

  // ── Image via Pollinations.ai (free, no API key) ──
  if (imagePrompt) {
    const fullPrompt = imagePrompt + ', cartoon illustration, flat design, bright colors, simple, no text, educational';
    const imageUrl   = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=800&height=350&nologo=true&seed=${Date.now()}`;

    loaderEl.style.display = 'flex';
    imageEl.style.display  = 'none';

    imageEl.onload = () => {
      loaderEl.style.display = 'none';
      imageEl.style.display  = 'block';
      imageEl.classList.remove('visual-img-in');
      void imageEl.offsetWidth;
      imageEl.classList.add('visual-img-in');
    };
    imageEl.onerror = () => {
      loaderEl.style.display = 'none';
    };
    imageEl.src = imageUrl;
  }

  // ── Mermaid diagram ──
  if (diagramDef && window.mermaid) {
    try {
      // Reset the element so mermaid will re-render it
      diagramEl.removeAttribute('data-processed');
      diagramEl.innerHTML = '';

      // Generate unique ID to avoid conflicts
      const uid = 'mmd-' + Date.now();
      const { svg } = await mermaid.render(uid, diagramDef);
      diagramEl.innerHTML = svg;
    } catch (e) {
      console.warn('Mermaid render error:', e.message);
      diagramEl.innerHTML = '';
    }
  } else {
    diagramEl.innerHTML = '';
  }
}

// ── 18c. TUTOR ARENA v2 — MODE SELECT ───────────────────────────────────────
// Controls how the tutor delivers each response: silent text, narrated text,
// or text with generated visuals. Chat is the primary surface by default now,
// so this replaces the old auto-triggered "immersive mode" fullscreen hack.
function initTutorModeSelect() {
  document.querySelectorAll('.tool-chip[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      AppState.tutorMode = mode;
      document.querySelectorAll('.tool-chip[data-mode]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (mode !== 'listen') NarrationEngine.stop();
      if (mode !== 'visuals') {
        document.getElementById('visual-panel').style.display = 'none';
      }

      // "Read" doubles as the way back to the book text from the chat —
      // reading silently means reading the chapter, not staring at the tutor.
      if (mode === 'read' && Reader.active) {
        Reader.showReader();
      }
    });
  });
}

// ── 18d. TUTOR ARENA v2 — STUDY NOTES DRAWER ────────────────────────────────
function initStudyDrawer() {
  const drawer   = document.getElementById('study-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const toggle   = document.getElementById('btn-study-drawer-toggle');

  const openDrawer = () => {
    drawer.classList.add('drawer-open');
    backdrop.classList.add('visible');
    toggle.classList.add('active');
  };
  const closeDrawer = () => {
    drawer.classList.remove('drawer-open');
    backdrop.classList.remove('visible');
    toggle.classList.remove('active');
  };

  toggle.addEventListener('click', () => {
    drawer.classList.contains('drawer-open') ? closeDrawer() : openDrawer();
  });
  document.getElementById('btn-close-drawer').addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Exposed so JS elsewhere (deep dive) can close the drawer programmatically
  window._closeStudyDrawer = closeDrawer;
  window._openStudyDrawer = openDrawer;
}

// ── 18e. TUTOR ARENA v2 — RECAP ON DEMAND ───────────────────────────────────
// Reuses the existing Socratic Tutor agent (which already receives full chat
// history + mastery state) with a synthetic recap request — no new agent needed.
function showRecapMarker(label) {
  const containerId = AppState.currentChatMode === 'teach' ? 'chat-history-teach' : 'chat-history-quiz';
  const container = document.getElementById(containerId);
  const marker = document.createElement('div');
  marker.className = 'recap-marker';
  marker.textContent = label;
  container.appendChild(marker);
  container.scrollTop = container.scrollHeight;
}

function requestRecap() {
  if (!AppState.selectedChapter) return;
  if (AppState.currentChatMode !== 'teach') switchChatTab('teach');
  showRecapMarker(`Recapping Chapter ${AppState.selectedChapter.number} so far`);
  const input = document.getElementById('chat-input');
  input.value = 'Can you give me a quick recap of everything we\'ve covered in this chapter so far?';
  sendChatMessage();
}

function requestDeepDive(quote, chapterNumber, chapterTitle) {
  if (!AppState.selectedChapter) return;
  window._closeStudyDrawer && window._closeStudyDrawer();
  if (AppState.currentChatMode !== 'teach') switchChatTab('teach');
  showRecapMarker(`Deep-diving: "${quote.length > 60 ? quote.slice(0, 60) + '…' : quote}"`);
  const input = document.getElementById('chat-input');
  const fromOtherChapter = chapterNumber !== AppState.selectedChapter.number;
  input.value = fromOtherChapter
    ? `Can you go deeper on this idea from Chapter ${chapterNumber} ("${chapterTitle}"): "${quote}"?`
    : `Can you go deeper on this: "${quote}"?`;
  sendChatMessage();
}

// ── 18f. TUTOR ARENA v2 — HIGHLIGHT-TO-NOTE CAPTURE ─────────────────────────
function initNoteCapture() {
  const popover     = document.getElementById('selection-popover');
  const saveBtn     = document.getElementById('btn-save-note');
  const explainBtn  = document.getElementById('btn-explain-selection');
  const bookmarkBtn = document.getElementById('btn-bookmark-selection');
  const vocabBtn    = document.getElementById('btn-add-vocab');
  let pendingText = '';
  let pendingPidx = null;     // reader paragraph index the selection starts in
  let pendingSentence = '';   // surrounding paragraph, for vocab-harvest cloze

  function hidePopover() {
    popover.style.display = 'none';
    document.body.classList.remove('sel-active');
    pendingText = '';
    pendingPidx = null;
    pendingSentence = '';
  }

  // selectionchange (not mouseup) so this works consistently for both mouse
  // drag-selection on desktop and press-and-hold selection on touch devices.
  let selTimer = null;
  document.addEventListener('selectionchange', () => {
    clearTimeout(selTimer);
    selTimer = setTimeout(() => {
      const sel = window.getSelection();
      const text = sel && sel.toString().trim();

      if (!text || !AppState.selectedChapter) { hidePopover(); return; }

      // Selections inside a tutor bubble get Save-to-Notes; selections in the
      // reader column additionally get Explain (grounded tutor remediation)
      const anchorEl = sel.anchorNode?.nodeType === 3 ? sel.anchorNode.parentElement : sel.anchorNode;
      const bubble = anchorEl?.closest?.('.chat-msg.tutor .msg-bubble');
      const inReader = anchorEl?.closest?.('#reader-column');
      if (!bubble && !inReader) { hidePopover(); return; }

      explainBtn.style.display = inReader ? 'flex' : 'none';
      bookmarkBtn.style.display = inReader ? 'flex' : 'none';
      pendingPidx = inReader ? parseInt(anchorEl.closest('p[data-pidx]')?.dataset.pidx ?? 'NaN') : null;
      if (Number.isNaN(pendingPidx)) pendingPidx = null;
      pendingText = text;
      pendingSentence = inReader ? (anchorEl.closest('p')?.textContent || '').slice(0, 400) : '';

      // Book-harvest: short reader selections can become vocab cards when a
      // vocab-expansion language exists. Lazily cache which one that is.
      if (AppState._harvestLang === undefined && AppState.currentUser) {
        AppState._harvestLang = null;
        dbGetAllLanguages()
          .then(ls => { AppState._harvestLang = ls.find(l => getRecipe(l).id === 'vocabExpand') || null; })
          .catch(() => {});
      }
      vocabBtn.style.display = (inReader && AppState._harvestLang && text.length <= 60) ? 'flex' : 'none';

      // Touch devices: dock the bar at the bottom of the screen. iOS draws
      // its own Copy/Look Up menu right next to the selection and web pages
      // cannot suppress it — floating ours there guarantees a collision.
      // Bottom-docked, the two can never overlap (and it's thumb-reachable).
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      popover.classList.toggle('sp-dock', isTouch);
      popover.style.display = 'flex';
      document.body.classList.add('sel-active'); // FAB yields to the docked bar
      if (isTouch) {
        popover.style.top = '';
        popover.style.left = '';
      } else {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const popoverWidth = 150; // rough estimate to keep it on-screen
        popover.style.top  = Math.max(8, rect.top - 44) + 'px';
        popover.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - popoverWidth)) + 'px';
      }
    }, 200);
  });

  document.addEventListener('mousedown', (e) => {
    if (!popover.contains(e.target)) hidePopover();
  });
  document.addEventListener('scroll', hidePopover, true);

  // Resume here: bookmark the selected paragraph so reopening the book lands
  // exactly on it — progress no longer depends on finishing a checkpoint.
  bookmarkBtn.addEventListener('click', async () => {
    if (pendingPidx === null || !AppState.selectedBook || !AppState.selectedChapter) return;
    const book = AppState.selectedBook;
    const chapter = AppState.selectedChapter;
    const pidx = pendingPidx;

    chapter.bookmarkPidx = pidx;
    if (Reader.chapter && Reader.chapter.number === chapter.number) {
      Reader.chapter.bookmarkPidx = pidx;
    }
    Reader.markBookmarkedParagraph(pidx);

    hidePopover();
    window.getSelection().removeAllRanges();
    showToast('Bookmarked — you\'ll resume here', 'success', 2200);

    if (book.isPdfBook) {
      await dbPutChapter(book.id, { chapterNumber: chapter.number, bookmarkPidx: pidx, bookmarkAt: Date.now() });
    }
    // Refresh the book's resume point so the library Continue card points here
    await updateBookReadingProgress(0, 0, chapter.number);
  });

  // Add to vocab: a highlighted word from the user's own reading becomes
  // precision cards in their vocab-expansion language deck.
  vocabBtn.addEventListener('click', async () => {
    const hl = AppState._harvestLang;
    if (!pendingText || !hl) return;
    const selection = pendingText.slice(0, 60);
    const sentence = pendingSentence || selection;
    const bookTitle = AppState.selectedBook?.title || '';

    hidePopover();
    window.getSelection().removeAllRanges();
    showToast(`Building cards for “${selection}”…`, 'info', 2500);

    try {
      const cards = AppState.mode === 'demo'
        ? [{
            front: `${sentence.replace(selection, '_____')} (from ${bookTitle || 'your reading'})`,
            back: `${selection} — (demo) the precise meaning goes here`,
            word: selection, romanization: null, type: 'precision', sourceBook: bookTitle || null
          }]
        : await callPrecisionCards(hl, selection, sentence, bookTitle);
      await dbAppendLangCards(hl.id, cards);
      showToast(`“${selection}” added to your ${hl.name} deck (${cards.length} card${cards.length === 1 ? '' : 's'}).`, 'success');
    } catch (err) {
      showToast('Could not build vocab cards: ' + err.message, 'error', 6000);
    }
  });

  // Explain: jump into the tutor with the selected passage as a grounded question
  explainBtn.addEventListener('click', () => {
    if (!pendingText || !AppState.selectedChapter) return;
    const quote = pendingText;
    hidePopover();
    window.getSelection().removeAllRanges();
    Reader.showTutor();
    requestDeepDive(quote, AppState.selectedChapter.number, AppState.selectedChapter.title);
  });

  // Manual note composer: paste or type straight into the Notes tab
  const composerInput = document.getElementById('note-composer-input');
  const composerAdd = document.getElementById('btn-add-note');
  if (composerAdd) {
    composerAdd.addEventListener('click', async () => {
      const text = composerInput.value.trim();
      if (!text) { composerInput.focus(); return; }
      const book = AppState.selectedBook;
      if (!book) { showToast('Open a book first — notes are tagged to their book.', 'info'); return; }
      const chapter = AppState.selectedChapter;
      await dbPut('notes', {
        bookId: book.id,
        bookTitle: book.title,
        chapterNumber: chapter?.number ?? 0,
        chapterTitle: chapter?.title ?? '',
        quote: text,
        manual: true,
        timestamp: Date.now()
      });
      composerInput.value = '';
      showToast('Note added', 'success', 1600);
      await renderNotesTab();
    });
  }

  saveBtn.addEventListener('click', async () => {
    if (!pendingText || !AppState.selectedBook || !AppState.selectedChapter) return;
    const book = AppState.selectedBook;
    const chapter = AppState.selectedChapter;
    await dbPut('notes', {
      bookId: book.id,
      bookTitle: book.title,
      chapterNumber: chapter.number,
      chapterTitle: chapter.title,
      quote: pendingText,
      timestamp: Date.now()
    });
    showToast('Saved to Notes', 'success', 1800);
    hidePopover();
    window.getSelection().removeAllRanges();
    await renderNotesTab();
  });
}

// ── 18g. TUTOR ARENA v2 — NOTES TAB ─────────────────────────────────────────
function relativeTime(ts) {
  const diffMs = Date.now() - ts;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return 'Yesterday';
  return `${days}d ago`;
}

async function renderNotesTab() {
  const book = AppState.selectedBook;
  const container = document.getElementById('notes-list-container');
  const badge = document.getElementById('note-count-badge');
  const tabCount = document.getElementById('notes-tab-count');
  if (!book || !container) return;

  const allNotes = await dbGetAll('notes');
  const notes = allNotes.filter(n => n.bookId === book.id);

  if (notes.length === 0) {
    container.innerHTML = `<p class="notes-empty-hint">Select any text in the tutor's messages to save it here, tagged with its chapter. Click a note to deep-dive into it.</p>`;
  } else {
    container.innerHTML = notes.map(n => `
      <div class="note-card">
        <div class="note-meta">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M2 4.5c1.8-.9 3.6-1.3 5.5-1.1 1 .1 1.9.4 2.5.9v11c-.6-.5-1.5-.8-2.5-.9-1.9-.2-3.7.2-5.5 1.1v-11z"/><path d="M18 4.5c-1.8-.9-3.6-1.3-5.5-1.1-1 .1-1.9.4-2.5.9v11c.6-.5 1.5-.8 2.5-.9 1.9-.2 3.7.2 5.5 1.1v-11z"/></svg>
          ${n.chapterNumber ? `Ch. ${n.chapterNumber} — ${n.chapterTitle}` : 'General note'}
        </div>
        <p class="note-quote">"${n.quote}"</p>
        <div class="note-actions">
          <span class="note-deepdive" data-quote="${encodeURIComponent(n.quote)}" data-chapter="${n.chapterNumber}" data-chapter-title="${encodeURIComponent(n.chapterTitle)}">
            Deep dive into this
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4l6 6-6 6"/></svg>
          </span>
          <span class="note-date">${relativeTime(n.timestamp)}</span>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.note-deepdive').forEach(el => {
      el.addEventListener('click', () => {
        requestDeepDive(
          decodeURIComponent(el.dataset.quote),
          parseInt(el.dataset.chapter),
          decodeURIComponent(el.dataset.chapterTitle)
        );
      });
    });
  }

  if (tabCount) tabCount.textContent = notes.length > 0 ? ` (${notes.length})` : '';
  if (badge) {
    if (notes.length > 0) { badge.style.display = 'flex'; badge.textContent = notes.length; }
    else badge.style.display = 'none';
  }
  const menuBadge = document.getElementById('notes-menu-count');
  if (menuBadge) {
    if (notes.length > 0) { menuBadge.style.display = 'inline-block'; menuBadge.textContent = notes.length; }
    else menuBadge.style.display = 'none';
  }
}

// ── 19. ADD BOOK MODAL FLOW ───────────────────────────────────────────────────
function openAddBookModal() {
  document.getElementById('modal-add-book').style.display = 'flex';
  document.getElementById('add-book-step-1').style.display = 'block';
  document.getElementById('add-book-step-2').style.display = 'none';
  document.getElementById('add-book-step-3').style.display = 'none';
  document.getElementById('input-book-title').value = '';
  document.getElementById('input-book-author').value = '';
  document.getElementById('input-book-reference').value = '';

  // Show the demo-mode warning banner immediately if demo mode is active.
  // This lets users see what they need to do without having to click through first.
  const isDemo = AppState.mode === 'demo';
  document.getElementById('demo-mode-warning').style.display = isDemo ? 'flex' : 'none';

  // Disable the form fields in demo mode
  const fields = ['input-book-title', 'input-book-author', 'input-book-reference'];
  fields.forEach(id => {
    const el = document.getElementById(id);
    el.disabled = isDemo;
    el.style.opacity = isDemo ? '0.4' : '1';
  });
  document.getElementById('btn-check-book').disabled = isDemo;
  document.getElementById('btn-check-book').style.opacity = isDemo ? '0.4' : '1';

  // Reset source toggle + drop zone
  document.getElementById('source-knowledge').checked              = true;
  document.getElementById('source-knowledge-zone').style.display   = 'block';
  document.getElementById('source-pdf-zone').style.display         = 'none';
  document.getElementById('title-author-group').style.display      = 'block';
  document.getElementById('pdf-autodetect-note').style.display     = 'none';
  document.getElementById('input-pdf-file').value                  = '';
  document.getElementById('drop-zone-idle').style.display          = 'flex';
  document.getElementById('drop-zone-selected').style.display      = 'none';
  _pdfMeta = { pageCount: null, title: null, author: null };
  _extractedPdfText = null;
}

async function checkBookCoverage() {
  const title  = document.getElementById('input-book-title').value.trim();
  const author = document.getElementById('input-book-author').value.trim();
  const sourceMode = document.querySelector('input[name="book-source"]:checked')?.value || 'knowledge';

  // PDF mode auto-extracts title from the document — don't require manual entry
  if (sourceMode !== 'pdf' && !title) {
    showToast('Please enter a book title.', 'error');
    return;
  }

  if (AppState.mode === 'demo') {
    document.getElementById('add-book-step-1').style.display = 'none';
    document.getElementById('add-book-step-2').style.display = 'block';
    document.getElementById('diagnostic-result').innerHTML = `
      <strong>Demo Mode Active</strong><br><br>
      In Demo Mode, the app uses the built-in Chase Hughes demo library.<br>
      To add real books, enter a valid Gemini API key in Settings and disable Demo Mode.
    `;
    return;
  }

  // ── PDF MODE: skip diagnostic, go straight to Step 2 ──
  if (sourceMode === 'pdf') {
    const fileInput = document.getElementById('input-pdf-file');
    if (!fileInput.files.length) {
      showToast('Please select a PDF or TXT file first.', 'error');
      return;
    }
    const file = fileInput.files[0];
    if (file.size > 50 * 1024 * 1024) {
      showToast('File is too large. Please use a PDF under 50 MB.', 'error');
      return;
    }
    document.getElementById('add-book-step-1').style.display = 'none';
    document.getElementById('add-book-step-2').style.display = 'block';
    document.getElementById('diagnostic-result').innerHTML = `
      <strong style="color:#b8863f">📄 PDF Ready: "${file.name}"</strong><br><br>
      The AI will read your uploaded book directly — no prior knowledge used.
      It will extract every chapter in the exact order it appears in the PDF.
    `;
    document.getElementById('btn-generate-book').dataset.level = 'ref';
    return;
  }

  // ── KNOWLEDGE MODE: run diagnostic as before ──
  document.getElementById('btn-check-book').disabled = true;
  document.getElementById('btn-check-book').textContent = 'Checking...';

  try {
    const result = await callLiveDiagnosticCheck(title, author);
    document.getElementById('add-book-step-1').style.display = 'none';
    document.getElementById('add-book-step-2').style.display = 'block';
    document.getElementById('diagnostic-result').innerHTML = result.desc;
    document.getElementById('btn-generate-book').dataset.level = result.level;
  } catch (error) {
    showToast(`Diagnostic failed: ${error.message}`, 'error');
  } finally {
    document.getElementById('btn-check-book').disabled = false;
    document.getElementById('btn-check-book').textContent = 'Check Book Coverage →';
  }
}

async function fetchGoogleBooksCover(title, author) {
  try {
    const q = encodeURIComponent(`${title} ${author}`);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      const volInfo = data.items[0].volumeInfo;
      if (volInfo && volInfo.imageLinks && volInfo.imageLinks.thumbnail) {
        return volInfo.imageLinks.thumbnail.replace('http:', 'https:');
      }
    }
  } catch (e) {
    console.error('Failed to fetch cover from Google Books API:', e);
  }
  return null;
}

async function generateCurriculum() {
  const title     = document.getElementById('input-book-title').value.trim();
  const author    = document.getElementById('input-book-author').value.trim();
  const reference = document.getElementById('input-book-reference').value.trim();
  const level     = document.getElementById('btn-generate-book').dataset.level || 'ref';
  const sourceMode = document.querySelector('input[name="book-source"]:checked')?.value || 'knowledge';

  document.getElementById('add-book-step-2').style.display = 'none';
  document.getElementById('add-book-step-3').style.display = 'block';

  const log = document.getElementById('loading-agent-log');
  const logStep = (msg) => {
    const div = document.createElement('div');
    div.className = 'agent-log-step';
    div.textContent = msg;
    log.appendChild(div);
  };

  if (AppState.mode === 'demo') {
    logStep('🔍 Demo Mode: Using pre-built curriculum...');
    await new Promise(r => setTimeout(r, 1500));
    document.getElementById('modal-add-book').style.display = 'none';
    showToast('Demo mode: Chase Hughes book already in library.', 'info');
    await renderLibrary();
    return;
  }

  // ── API KEY GUARD ──
  // Check before any upload or generation so the user gets a clear redirect,
  // not a confusing "Upload Error" deep inside the agent log.
  const resolvedKey = AppState.settings.apiKey
    || document.getElementById('input-api-key')?.value?.trim();
  if (!resolvedKey) {
    document.getElementById('modal-add-book').style.display = 'none';
    document.getElementById('modal-settings').style.display = 'flex';
    showToast('Please add your Gemini API key in Settings first.', 'error');
    return;
  }
  // Ensure AppState is in sync in case loadSettings() was slow
  AppState.settings.apiKey = resolvedKey;

  let fileUri = null;

  // ── PDF MODE: chapter-by-chapter approach ─────────────────────────────────
  // Instead of generating the entire curriculum at once (which hits Gemini's
  // output token limit for large books), we:
  // 1. Extract all text from the PDF via PDF.js (no page limit)
  // 2. Split into chapters by heading detection
  // 3. Store skeleton book + each chapter's raw text in Firestore
  // 4. Let curriculum be generated per-chapter on demand when opened
  if (sourceMode === 'pdf') {
    const fileInput = document.getElementById('input-pdf-file');
    const pdfFile   = fileInput.files[0];
    if (!pdfFile) { showToast('No file selected.', 'error'); return; }

    const progressWrap = document.getElementById('upload-progress-wrap');
    const progressFill = document.getElementById('upload-progress-fill');
    const progressPct  = document.getElementById('upload-progress-pct');
    progressWrap.style.display = 'block';

    try {
      // Load PDF.js if needed
      if (!window.pdfjsLib) {
        logStep('⚙️ Loading PDF reader…');
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          s.onload = res;
          s.onerror = () => rej(new Error('Could not load PDF reader. Check your internet connection.'));
          document.head.appendChild(s);
        });
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }

      // ── STEP 1: Extract all text ──
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc      = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages  = pdfDoc.numPages;
      logStep(`📖 Reading ${totalPages.toLocaleString()} pages from your PDF…`);

      let fullText = '';
      for (let p = 1; p <= totalPages; p++) {
        const page    = await pdfDoc.getPage(p);
        const content = await page.getTextContent();
        fullText += content.items.map(i => i.str).join(' ') + '\n';
        if (p % 40 === 0 || p === totalPages) {
          const pct = Math.round((p / totalPages) * 70); // 70% for extraction
          progressFill.style.width = pct + '%';
          progressPct.textContent  = `Reading… ${pct}%`;
        }
      }

      // ── STEP 2: Split into chapters ──
      logStep('📚 Identifying chapter structure…');
      const chapters = splitPdfIntoChapters(fullText);
      logStep(`✅ Found ${chapters.length} chapter${chapters.length !== 1 ? 's' : ''}. Identifying title & author…`);

      // ── STEP 3: Auto-detect title & author from first pages ──
      progressFill.style.width = '75%';
      progressPct.textContent  = 'Detecting title & author…';
      const bookInfo = await callBookIdentifier(fullText.substring(0, 5000));
      const finalTitle  = bookInfo.title  || _pdfMeta?.title  || pdfFile.name.replace(/\.pdf$/i, '');
      const finalAuthor = bookInfo.author || _pdfMeta?.author || 'Unknown Author';

      progressPct.textContent  = 'Fetching cover image…';
      const coverUrl = await fetchGoogleBooksCover(finalTitle, finalAuthor);

      // ── STEP 4: Store skeleton book in Firestore ──
      progressFill.style.width = '80%';
      progressPct.textContent  = 'Saving to your library…';
      const bookId = `book-${Date.now()}`;
      const newBook = {
        id: bookId,
        title:         finalTitle,
        author:        finalAuthor,
        coverUrl:      coverUrl,
        level:         'ref',
        isPdfBook:     true,
        totalPages,
        totalChapters: chapters.length,
        // Total word count feeds the library's personalized time-left estimate
        wordsTotal:    chapters.reduce((n, ch) => n + (ch.text ? ch.text.split(/\s+/).length : 0), 0),
        wordsRead:     0,
        chapters:      chapters.map(ch => ({ number: ch.number, title: ch.title })),
        readyChapters:   [],
        studiedChapters: [],
        createdAt: Date.now()
      };
      await dbPut('books', newBook);

      // ── STEP 5: Store each chapter's text in Firestore ──
      logStep(`💾 Saving ${chapters.length} chapters to your library…`);
      for (let i = 0; i < chapters.length; i++) {
        const ch = chapters[i];
        const pct = 80 + Math.round(((i + 1) / chapters.length) * 18);
        progressFill.style.width = pct + '%';
        progressPct.textContent  = `Saving ch. ${i + 1} / ${chapters.length}`;
        await dbPutChapter(bookId, {
          chapterNumber: ch.number,
          title:         ch.title,
          text:          ch.text.substring(0, 200000), // Firestore 1 MB doc limit safety
          // AI curriculum fields — generated on demand when chapter is opened:
          summary_10s: null,
          summary_3m:  null,
          summary_15m: null,
          concepts:    null,
          flashcards:  null,
          studiedAt:   null
        });
      }

      progressFill.style.width = '100%';
      progressPct.textContent  = '100%';
      progressWrap.style.display = 'none';
      document.getElementById('modal-add-book').style.display = 'none';
      showToast(`"${finalTitle}" added! Open any chapter to start studying.`, 'success');
      await renderLibrary();

    } catch (pdfErr) {
      progressWrap.style.display = 'none';
      document.getElementById('add-book-step-3').style.display = 'none';
      document.getElementById('add-book-step-2').style.display = 'block';
      document.getElementById('diagnostic-result').innerHTML =
        `<strong style="color:#f87171;">PDF Error:</strong> ${pdfErr.message}`;
      showToast(`Error: ${pdfErr.message}`, 'error', 10000);
      console.error('PDF processing error:', pdfErr);
    }
    return; // PDF mode is complete — do NOT fall through to knowledge-mode curriculum generation
  }

  // ── KNOWLEDGE MODE: generate full curriculum from AI knowledge ─────────────
  logStep('🔍 Agent 1: Curriculum Designer analyzing book structure...');
  await new Promise(r => setTimeout(r, 400));
  logStep('📋 Mapping chapters to 80/20 core concepts...');

  try {
    const curriculum = await callLiveCurriculumGenerator(title, author, reference, null, false);
    const finalTitle  = curriculum.title  || title;
    const finalAuthor = curriculum.author || author;
    logStep('✅ Agent 2: QA Verifier auditing for hallucinations...');
    await new Promise(r => setTimeout(r, 600));
    logStep('🃏 Generating flashcard decks...');
    await new Promise(r => setTimeout(r, 400));

    logStep('🖼️ Fetching cover image...');
    const coverUrl = await fetchGoogleBooksCover(finalTitle, finalAuthor);

    const bookId = `book-${Date.now()}`;
    const newBook = {
      id: bookId,
      title: finalTitle, author: finalAuthor, level,
      coverUrl: coverUrl,
      chapters: curriculum.chapters
    };

    await dbPut('books', newBook);
    document.getElementById('modal-add-book').style.display = 'none';
    showToast(`"${finalTitle || 'Book'}" added to your library!`, 'success');
    await renderLibrary();

  } catch (error) {
    document.getElementById('add-book-step-3').style.display = 'none';
    document.getElementById('add-book-step-2').style.display = 'block';
    document.getElementById('diagnostic-result').innerHTML =
      `<strong style="color:#f87171;">Error:</strong> ${error.message}`;
    showToast(`Error: ${error.message}`, 'error', 10000);
    console.error('generateCurriculum error:', error);
  }
}




// ── 20. FEYNMAN SANDBOX ────────────────────────────────────────────────────────
async function populateSandboxSelectors() {
  const bookSelect = document.getElementById('sandbox-book-select');
  bookSelect.innerHTML = '<option value="">-- Choose a Book --</option>';

  // Every book is explorable here, not just the one currently open
  const books = await dbGetAll('books').catch(() => []);
  books.forEach(book => {
    const opt = document.createElement('option');
    opt.value = book.id;
    opt.textContent = book.title;
    bookSelect.appendChild(opt);
  });

  if (AppState.selectedBook && books.some(b => b.id === AppState.selectedBook.id)) {
    bookSelect.value = AppState.selectedBook.id;
    populateSandboxConcepts(AppState.selectedBook);
  }
}

async function populateSandboxConcepts(book) {
  const conceptSelect = document.getElementById('sandbox-concept-select');
  conceptSelect.innerHTML = '<option value="">Loading concepts…</option>';
  conceptSelect.disabled = true;

  // PDF books keep their concepts on the per-chapter docs (generated on
  // demand), not on the book skeleton — read them from there.
  const entries = [];
  try {
    if (book.isPdfBook) {
      const chapterDocs = await dbGetChaptersForBook(book.id);
      chapterDocs
        .filter(ch => Array.isArray(ch.concepts) && ch.concepts.length)
        .sort((a, b) => (a.chapterNumber || 0) - (b.chapterNumber || 0))
        .forEach(ch => ch.concepts.forEach(concept =>
          entries.push({ concept, chapter: ch.chapterNumber, summary: ch.summary_15m || '' })));
    } else {
      (book.chapters || []).forEach(ch =>
        (ch.concepts || []).forEach(concept =>
          entries.push({ concept, chapter: ch.number, summary: ch.summary_15m || '' })));
    }
  } catch (err) {
    console.warn('Sandbox concepts unavailable:', err.message);
  }

  if (!entries.length) {
    conceptSelect.innerHTML = '<option value="">No concepts yet — open one of this book\'s chapters first</option>';
    conceptSelect.disabled = true;
    return;
  }

  conceptSelect.innerHTML = '<option value="">-- Choose a Concept --</option>';
  conceptSelect.disabled = false;
  entries.forEach(e => {
    const opt = document.createElement('option');
    opt.value = JSON.stringify(e);
    opt.textContent = `Ch.${e.chapter}: ${e.concept}`;
    conceptSelect.appendChild(opt);
  });
}

async function loadSandboxConcept(valueStr) {
  if (!valueStr) return;
  const { concept, chapter, summary } = JSON.parse(valueStr);

  document.getElementById('sandbox-select-prompt').style.display = 'none';
  document.getElementById('sandbox-workspace').style.display = 'grid';
  document.getElementById('sandbox-concept-title').textContent = concept;
  document.getElementById('sandbox-concept-desc').textContent = `Chapter ${chapter} concept. Explain it in your own words below.`;
  document.getElementById('sandbox-textarea').value = '';
  document.getElementById('sandbox-feedback-panel').style.display = 'none';
  document.getElementById('sandbox-workspace').dataset.concept = concept;
  document.getElementById('sandbox-workspace').dataset.summary = summary;
}

async function submitSandboxExplanation() {
  const concept = document.getElementById('sandbox-workspace').dataset.concept;
  const explanation = document.getElementById('sandbox-textarea').value.trim();

  if (!explanation) { showToast('Please write your explanation first.', 'error'); return; }

  document.getElementById('btn-submit-sandbox').disabled = true;
  document.getElementById('btn-submit-sandbox').textContent = 'Analyzing...';

  let result;
  if (AppState.mode === 'demo') {
    await new Promise(r => setTimeout(r, 2000));
    result = {
      score: 72,
      right: 'You correctly identified the core mechanism and provided a reasonable analogy. Your explanation shows you understand the fundamental principle.',
      gaps: 'You missed the nuance about behavioral clusters and the "rule of three." Your example could be more concrete and specific.',
      refined: `Imagine ${concept} like a weather forecast. Instead of one cloud predicting rain, you need a combination of low pressure, humidity, and temperature — only when all three appear together do you have a reliable signal. Similarly, ${concept} requires multiple simultaneous cues before you can draw a confident conclusion.`
    };
  } else {
    result = await callLiveSandboxAssessor(concept, explanation);
  }

  // Show results
  document.getElementById('sandbox-feedback-panel').style.display = 'block';
  document.getElementById('sandbox-score-badge').textContent = `${result.score}%`;
  document.getElementById('sandbox-feedback-right').textContent = result.right;
  document.getElementById('sandbox-feedback-gaps').textContent = result.gaps;
  document.getElementById('sandbox-refined-explanation').textContent = result.refined;

  if (result.score >= 80) {
    document.getElementById('btn-apply-sandbox-progress').style.display = 'inline-flex';
  }

  document.getElementById('btn-submit-sandbox').disabled = false;
  document.getElementById('btn-submit-sandbox').textContent = 'Submit for Review';

  showToast(`Score: ${result.score}% — Assessment complete.`, result.score >= 70 ? 'success' : 'info');
}

// ── 21. FLASHCARD REVIEW SYSTEM ───────────────────────────────────────────────
// ── SM-2 SPACED REPETITION SCHEDULER ──────────────────────────────────────────
// Each flashcard carries { interval (days), repetitionCount, efactor,
// nextDueDate (epoch ms), lastRating, lastReviewedAt }. Cards with no
// nextDueDate have never been reviewed and are due immediately.

const SM2_QUALITY = { forgot: 1, hard: 3, good: 4, easy: 5 };

function sm2Schedule(card, score) {
  const q = SM2_QUALITY[score] ?? 3;
  let ef       = card.efactor ?? 2.5;
  let reps     = card.repetitionCount ?? 0;
  let interval = card.interval ?? 0;

  if (q < 3) {
    // Failed recall: restart repetitions, see the card again tomorrow.
    reps = 0;
    interval = 1;
  } else {
    reps += 1;
    if (reps === 1)      interval = 1;
    else if (reps === 2) interval = 6;
    else                 interval = Math.round(interval * ef);
    ef = Math.max(1.3, ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  }

  return {
    ...card,
    efactor: ef,
    repetitionCount: reps,
    interval,
    nextDueDate: Date.now() + interval * 24 * 60 * 60 * 1000,
    lastRating: score,
    lastReviewedAt: Date.now()
  };
}

function isCardDue(card) {
  if (!card.nextDueDate) return true; // never reviewed — due now
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  return card.nextDueDate <= endOfToday.getTime();
}

// Fisher–Yates shuffle: interleaves due cards across books and chapters,
// which improves retention vs. reviewing one book's cards in a run.
function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

// Collect every DUE flashcard across all books. Cards from AI-knowledge books
// live on the book doc (book.chapters[].flashcards); cards from PDF books live
// on their bookChapters docs. Each card is tagged with _src so a rating can be
// persisted back to the exact document + array slot it came from, and source
// docs are cached for the session so persistence is read-free.
// Collect flashcards from every source (books + languages), tagged with _src
// so ratings persist to the exact document slot. dueOnly=false powers the
// random-practice deck and the source filter list.
async function collectCards({ dueOnly = true } = {}) {
  const out = [];
  AppState._reviewBookCache = {};
  AppState._reviewChapterCache = {};
  AppState._reviewLangCache = {};

  // All Firestore reads happen in parallel — chapter docs are heavy (they
  // carry the raw chapter text), so sequential awaits made this crawl.
  const [languages, books] = await Promise.all([
    dbGetAllLanguages().catch(err => {
      console.warn('Language cards unavailable for review:', err.message);
      return [];
    }),
    dbGetAll('books')
  ]);

  const [langBatchSets, pdfChapterSets] = await Promise.all([
    Promise.all(languages.map(lang =>
      dbGetLangCardBatches(lang.id).then(batches => ({ lang, batches })).catch(() => ({ lang, batches: [] }))
    )),
    Promise.all(books.filter(b => b.isPdfBook).map(book =>
      dbGetChaptersForBook(book.id).then(chapterDocs => ({ book, chapterDocs })).catch(() => ({ book, chapterDocs: [] }))
    ))
  ]);

  // Language sentence cards share the deck with book cards — interleaving
  // review across subjects is itself a retention win.
  try {
    for (const { lang, batches } of langBatchSets) {
      for (const batch of batches) {
        const cards = batch.flashcards || [];
        if (cards.length) {
          AppState._reviewLangCache[`${lang.id}_batch_${batch.batch}`] = cards;
        }
        cards.forEach((card, idx) => {
          if (!dueOnly || isCardDue(card)) {
            out.push({
              ...card,
              bookTitle: lang.name,                 // deck tag shows the language
              _langLevel: lang.level,               // drives the romanization fade
              _ttsLang: lang.ttsLangCode || lang.code,
              _src: { type: 'langCards', langId: lang.id, batch: batch.batch, index: idx }
            });
          }
        });
      }
    }
  } catch (err) {
    console.warn('Language cards unavailable for review:', err.message);
  }

  const pdfChaptersByBook = new Map(pdfChapterSets.map(s => [s.book.id, s.chapterDocs]));
  for (const book of books) {
    if (book.isPdfBook) {
      const chapterDocs = pdfChaptersByBook.get(book.id) || [];
      for (const chDoc of chapterDocs) {
        const cards = chDoc.flashcards || [];
        if (cards.length) {
          AppState._reviewChapterCache[`${book.id}_ch_${chDoc.chapterNumber}`] = cards;
        }
        cards.forEach((card, idx) => {
          if (!dueOnly || isCardDue(card)) {
            out.push({
              ...card,
              bookTitle: book.title,
              _src: { type: 'chapterDoc', bookId: book.id, chapterNumber: chDoc.chapterNumber, index: idx }
            });
          }
        });
      }
    } else {
      AppState._reviewBookCache[book.id] = book;
      (book.chapters || []).forEach(ch => {
        (ch.flashcards || []).forEach((card, idx) => {
          if (!dueOnly || isCardDue(card)) {
            out.push({
              ...card,
              bookTitle: book.title,
              _src: { type: 'bookDoc', bookId: book.id, chapterNumber: ch.number, index: idx }
            });
          }
        });
      });
    }
  }
  return out;
}

// Kept for existing callers (badge refresh, session review activity)
async function collectDueCards() {
  return collectCards({ dueOnly: true });
}

// ── SOURCE FILTER + RANDOM PRACTICE ──────────────────────────────────────────

function reviewSourceKey(card) {
  const src = card._src || {};
  return src.type === 'langCards' ? `lang:${src.langId}` : `book:${src.bookId}`;
}

function matchesReviewFilter(card) {
  const filter = AppState.reviewFilter || 'all';
  return filter === 'all' || reviewSourceKey(card) === filter;
}

// Build the source dropdown from lightweight metadata (book + language
// titles — two small reads), NOT from the full card traversal, so it appears
// instantly. Books and Languages sit in separate groups; "Random" is the
// explicit everything-mixed option. The choice persists across sessions.
async function populateReviewFilterFromMeta() {
  const select = document.getElementById('review-source-filter');
  if (!select) return;

  const [books, languages] = await Promise.all([
    dbGetAll('books').catch(() => []),
    dbGetAllLanguages().catch(() => [])
  ]);

  const bookOpts = books
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(b => `<option value="book:${b.id}">${b.title}</option>`).join('');
  const langOpts = languages
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(l => `<option value="lang:${l.id}">${l.name}</option>`).join('');

  select.innerHTML =
    '<option value="all">Random — everything mixed</option>' +
    (bookOpts ? `<optgroup label="Books">${bookOpts}</optgroup>` : '') +
    (langOpts ? `<optgroup label="Languages">${langOpts}</optgroup>` : '');

  // Restore the persisted choice once per app load
  if (!AppState._reviewFilterLoaded) {
    AppState._reviewFilterLoaded = true;
    try {
      const rec = await dbGet('settings', 'reviewFilter');
      if (rec?.value) AppState.reviewFilter = rec.value;
    } catch (_) { /* default stands */ }
  }
  const exists = [...select.options].some(o => o.value === AppState.reviewFilter);
  select.value = exists ? AppState.reviewFilter : 'all';
  AppState.reviewFilter = select.value;
}

// Practice deck: up to 20 random cards from the selected source, due or not.
// Ratings in practice mode never touch SM-2 schedules — the scheduled reviews
// stay the source of truth; practice is extra reps.
async function startRandomPractice() {
  const loadingEl = document.getElementById('review-loading');
  document.getElementById('review-empty-message').style.display = 'none';
  document.getElementById('flashcard-deck').style.display = 'none';
  if (loadingEl) loadingEl.style.display = 'flex';
  const all = await collectCards({ dueOnly: false });
  if (loadingEl) loadingEl.style.display = 'none';
  const pool = shuffleCards(all.filter(matchesReviewFilter)).slice(0, 20);

  if (!pool.length) {
    showToast('No cards in this source yet — study a chapter or add a language first.', 'info');
    document.getElementById('review-empty-message').style.display = 'flex';
    return;
  }

  AppState.practiceMode = true;
  AppState.flashcardSession = pool;
  AppState.flashcardIndex = 0;
  AppState.reviewStats = { forgot: 0, hard: 0, good: 0, easy: 0, total: pool.length, done: 0 };

  const subtitle = document.querySelector('#view-review .page-subtitle');
  if (subtitle) subtitle.textContent =
    `Practice deck — ${pool.length} random card${pool.length === 1 ? '' : 's'}, schedules untouched · keys 1–4 rate, Space flips`;

  document.getElementById('review-cards-ratio').textContent = `0 / ${pool.length}`;
  document.getElementById('review-empty-message').style.display = 'none';
  document.getElementById('review-finished-message').style.display = 'none';
  document.getElementById('flashcard-deck').style.display = 'block';
  showNextCard();
}

// Persist a rated card's new SM-2 schedule back to its source document.
async function persistCardSchedule(card) {
  const src = card._src;
  if (!src) return;

  // Strip session-only fields before writing
  const clean = { ...card };
  delete clean._src;
  delete clean.bookTitle;
  delete clean._langLevel;
  delete clean._ttsLang;

  if (src.type === 'langCards') {
    const cards = AppState._reviewLangCache[`${src.langId}_batch_${src.batch}`];
    if (!cards || !cards[src.index]) return;
    cards[src.index] = clean;
    await dbPutLangCardBatch(src.langId, src.batch, cards);
  } else if (src.type === 'chapterDoc') {
    const cards = AppState._reviewChapterCache[`${src.bookId}_ch_${src.chapterNumber}`];
    if (!cards || !cards[src.index]) return;
    cards[src.index] = clean;
    await dbPutChapter(src.bookId, { chapterNumber: src.chapterNumber, flashcards: cards });
  } else {
    const book = AppState._reviewBookCache[src.bookId];
    if (!book) return;
    const ch = (book.chapters || []).find(c => c.number === src.chapterNumber);
    if (!ch || !ch.flashcards?.[src.index]) return;
    ch.flashcards[src.index] = clean;
    await dbPut('books', book);
  }
}

function updateReviewBadge(count) {
  [document.getElementById('review-badge'), document.getElementById('mobile-review-badge')]
    .forEach(badge => {
      if (!badge) return;
      badge.style.display = count > 0 ? 'flex' : 'none';
      badge.textContent = count;
    });
}

async function initReviewSession() {
  AppState.practiceMode = false;

  // Dropdown appears instantly from metadata; the deck loads behind a spinner
  await populateReviewFilterFromMeta();
  document.getElementById('review-empty-message').style.display = 'none';
  document.getElementById('review-finished-message').style.display = 'none';
  document.getElementById('flashcard-deck').style.display = 'none';
  const loadingEl = document.getElementById('review-loading');
  if (loadingEl) loadingEl.style.display = 'flex';

  const allCards = await collectCards({ dueOnly: false });
  if (loadingEl) loadingEl.style.display = 'none';

  const allDue = allCards.filter(isCardDue);
  updateReviewBadge(allDue.length); // nav badge always shows the global due count
  const dueCards = shuffleCards(allDue.filter(matchesReviewFilter));

  // Honest session estimate: ~30s per card
  const filterLabel = AppState.reviewFilter === 'all' ? '' : ' in this source';
  const subtitle = document.querySelector('#view-review .page-subtitle');
  if (subtitle) {
    subtitle.textContent = dueCards.length
      ? `${dueCards.length} due today${filterLabel} · about ${formatReadingTime(dueCards.length * 0.5)} · keys 1–4 rate, Space flips`
      : `Nothing due${filterLabel} — spaced repetition schedules cards right before your brain would forget them.`;
  }

  if (dueCards.length === 0) {
    document.getElementById('review-empty-message').style.display = 'flex';
    document.getElementById('flashcard-deck').style.display = 'none';
    document.getElementById('review-finished-message').style.display = 'none';
    return;
  }

  AppState.flashcardSession = dueCards;
  AppState.flashcardIndex = 0;
  AppState.reviewStats = { forgot: 0, hard: 0, good: 0, easy: 0, total: dueCards.length, done: 0 };

  document.getElementById('review-cards-ratio').textContent = `0 / ${dueCards.length}`;
  document.getElementById('review-empty-message').style.display = 'none';
  document.getElementById('review-finished-message').style.display = 'none';
  document.getElementById('flashcard-deck').style.display = 'block';

  showNextCard();
}

function showNextCard() {
  const cards = AppState.flashcardSession;
  const idx = AppState.flashcardIndex;

  if (idx >= cards.length) {
    // Session complete
    document.getElementById('flashcard-deck').style.display = 'none';
    const finished = document.getElementById('review-finished-message');
    finished.style.display = 'flex';
    const finishedText = finished.querySelector('p');
    if (finishedText) {
      finishedText.textContent = AppState.practiceMode
        ? 'Practice round done — extra reps never hurt, and your scheduled reviews are untouched.'
        : "You've reviewed all cards due today. Come back tomorrow for your next session.";
    }
    return;
  }

  const card = cards[idx];
  const el = document.getElementById('flashcard-element');
  el.classList.remove('flipped');
  document.getElementById('rating-controls').style.visibility = 'hidden';

  document.getElementById('card-book-tag').textContent = card.bookTitle;
  document.getElementById('card-book-tag-back').textContent = card.bookTitle;
  const frontText = document.getElementById('card-front-text');
  const backText  = document.getElementById('card-back-text');
  frontText.textContent = card.front;
  backText.textContent = card.back;

  // Long text steps down in size and scrolls inside the card instead of
  // overflowing onto the rating buttons below it
  frontText.classList.toggle('long', (card.front || '').length > 220);
  backText.classList.toggle('long', (card.back || '').length > 220);
  document.querySelectorAll('#flashcard-element .card-body').forEach(b => { b.scrollTop = 0; });

  // ── Language cards: TTS button + romanization fade ──
  const isLangCard = card._src?.type === 'langCards';
  const speakBtn = document.getElementById('card-speak-btn');
  const frontRom = document.getElementById('card-front-romanization');
  const backRom  = document.getElementById('card-back-romanization');

  speakBtn.style.display = isLangCard ? 'inline-flex' : 'none';
  speakBtn.onclick = isLangCard ? (e) => {
    e.stopPropagation(); // don't flip the card
    if (!NarrationEngine.speakLang(card.front, card._ttsLang)) {
      showToast(`No ${card.bookTitle} voice on this device — audio unavailable.`, 'info', 3500);
    }
  } : null;

  // Romanization fade: fully shown at A0-A1, hidden from A2 up (learners
  // should be reading the script itself by then). Front shows it while
  // learning; the back always carries it as the answer's pronunciation.
  const showRom = isLangCard && !!card.romanization;
  const earlyLevel = ['A0', 'A1'].includes(card._langLevel);
  frontRom.style.display = showRom && earlyLevel ? 'block' : 'none';
  frontRom.textContent = showRom ? card.romanization : '';
  backRom.style.display = showRom ? 'block' : 'none';
  backRom.textContent = showRom ? card.romanization : '';
}

function rateCard(score) {
  const card = AppState.flashcardSession[AppState.flashcardIndex];
  if (!card) return;

  const stats = AppState.reviewStats;
  stats[score]++;
  stats.done++;

  // Run SM-2 and persist the new schedule to the card's source document.
  // Fire-and-forget: a failed write shouldn't block the review flow.
  // Practice mode is the exception: random-shuffle reps must not rewrite the
  // spaced-repetition schedule, or casual practice would break the spacing.
  if (!AppState.practiceMode) {
    const scheduled = sm2Schedule(card, score);
    signalCardGrade(card, score);
    persistCardSchedule(scheduled)
      .catch(err => console.warn('Could not save card schedule:', err.message));
  }

  // Update UI stats
  const ratio = `${stats.done} / ${stats.total}`;
  document.getElementById('review-cards-ratio').textContent = ratio;
  document.getElementById('review-progress-fill').style.width = `${(stats.done / stats.total) * 100}%`;
  document.getElementById('review-forgot-count').textContent = stats.forgot;
  document.getElementById('review-hard-count').textContent = stats.hard;
  document.getElementById('review-good-count').textContent = stats.good;
  document.getElementById('review-easy-count').textContent = stats.easy;

  // Update review badge with remaining due cards (practice doesn't change it)
  if (!AppState.practiceMode) updateReviewBadge(stats.total - stats.done);

  AppState.flashcardIndex++;
  showNextCard();
}

// ── 22. STUDY PANEL TAB SWITCHING ─────────────────────────────────────────────
function initStudyTabs() {
  document.querySelectorAll('.pane-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      document.querySelectorAll('.pane-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

// ── 23. TUTOR BOOK/CHAPTER SELECTORS ──────────────────────────────────────────
async function initTutorSelectors() {
  const bookSelect = document.getElementById('tutor-book-select');
  const chapterSelect = document.getElementById('tutor-chapter-select');

  // Populate book options
  const books = await dbGetAll('books');
  books.forEach(book => {
    const exists = bookSelect.querySelector(`option[value="${book.id}"]`);
    if (!exists) {
      const opt = document.createElement('option');
      opt.value = book.id;
      opt.textContent = book.title;
      bookSelect.appendChild(opt);
    }
  });

  bookSelect.addEventListener('change', async (e) => {
    const bookId = e.target.value;
    if (!bookId) return;
    const book = await dbGet('books', bookId);
    AppState.selectedBook = book;
    chapterSelect.disabled = false;
    populateChapterSelect(book);
    document.getElementById('chat-mode-label').textContent = `${book.title} — choose a chapter`;
  });

  chapterSelect.addEventListener('change', (e) => {
    if (e.target.value) loadChapter(parseInt(e.target.value));
  });

  initChapterSwitcher();
}

// ── 23b. CHAPTER SWITCHER POPOVER ───────────────────────────────────────────
// Collapses the book/chapter pickers behind one compact header trigger,
// instead of a permanent full-width bar, so the chat can run full height.
function closeChapterSwitcher() {
  document.getElementById('chapter-switcher-trigger')?.classList.remove('open');
  document.getElementById('chapter-switcher-popover')?.classList.remove('open');
}

function initChapterSwitcher() {
  const trigger = document.getElementById('chapter-switcher-trigger');
  const popover = document.getElementById('chapter-switcher-popover');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = popover.classList.toggle('open');
    trigger.classList.toggle('open', isOpen);
  });

  popover.addEventListener('click', (e) => e.stopPropagation());

  document.addEventListener('click', closeChapterSwitcher);
}

// ── 23c. COMPOSER TOOLS POPOVER ─────────────────────────────────────────────
// Mode switch, Recap, and Study Notes collapse behind one icon button in the
// composer, instead of a permanent row eating vertical space from the chat.
function closeComposerTools() {
  document.getElementById('composer-tools-trigger')?.classList.remove('open');
  document.getElementById('composer-tools')?.classList.remove('open');
}

function initComposerToolsPopover() {
  const trigger = document.getElementById('composer-tools-trigger');
  const popover = document.getElementById('composer-tools');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = popover.classList.toggle('open');
    trigger.classList.toggle('open', isOpen);
  });

  popover.addEventListener('click', (e) => {
    e.stopPropagation();
    // Any actual action inside (mode pick, Recap, Notes, back-to-reader)
    // is a one-shot choice — close the menu once it's made.
    if (e.target.closest('button')) closeComposerTools();
  });

  document.addEventListener('click', closeComposerTools);
}

// ── 24. RESET DATABASE ────────────────────────────────────────────────────────
async function resetDatabase() {
  if (!confirm('This will permanently delete all books, chat history, and progress. Are you sure?')) return;
  await dbClearStore('books');
  await dbClearStore('chatHistory');
  await dbClearStore('settings');
  AppState.selectedBook = null;
  AppState.selectedChapter = null;
  AppState.settings.apiKey = '';
  document.getElementById('modal-settings').style.display = 'none';
  showToast('All data has been reset.', 'info');
  await renderLibrary();
}

// ── 25. APP INITIALIZATION ────────────────────────────────────────────────────
// This runs once the page HTML is fully loaded ("DOMContentLoaded" event).
document.addEventListener('DOMContentLoaded', async () => {

  // Open IndexedDB (settings only — books/chat use Firestore)
  await openDatabase();

  // Init Firebase Auth (shows sign-in overlay if not logged in).
  // Guarded: if the Firebase CDN failed to load (offline or blocked network),
  // keep the rest of the UI alive instead of dying mid-init with every
  // event listener below left unwired.
  try {
    initAuth();
  } catch (err) {
    console.error('Firebase unavailable — cloud sync disabled:', err);
    showToast('Cloud sync unavailable. Check your connection and reload.', 'error', 8000);
  }

  // Wire up sign-in / sign-out buttons
  document.getElementById('btn-google-signin').addEventListener('click', signInWithGoogle);
  document.getElementById('btn-signout').addEventListener('click', signOutUser);

  // Init study tabs (tutor selectors are initialised in initAuth after sign-in)
  initStudyTabs();

  // ── NAVIGATION LINKS (desktop sidebar) ──
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.dataset.view;
      navigateTo(view);
      if (view === 'review') initReviewSession();
      if (view === 'languages') renderLanguages();
      if (view === 'sandbox') populateSandboxSelectors();
    });
  });

  // ── MOBILE BOTTOM NAV ──
  document.querySelectorAll('.mobile-nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.dataset.view;
      navigateTo(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (view === 'review') initReviewSession();
      if (view === 'languages') renderLanguages();
      if (view === 'sandbox') populateSandboxSelectors();
    });
  });

  // ── LIBRARY SEARCH ──
  document.getElementById('library-search-input').addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    document.querySelectorAll('#book-grid .book-card').forEach(card => {
      const title = card.querySelector('.book-card-title')?.textContent.toLowerCase() || '';
      const author = card.querySelector('.book-card-author')?.textContent.toLowerCase() || '';
      card.style.display = (!query || title.includes(query) || author.includes(query)) ? '' : 'none';
    });
  });

  // ── ADD BOOK BUTTONS ──
  ['btn-add-book-hero', 'btn-add-book-trigger', 'btn-add-book-empty'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.addEventListener('click', openAddBookModal);
  });

  document.getElementById('btn-close-add-book').addEventListener('click', () => {
    document.getElementById('modal-add-book').style.display = 'none';
  });

  // "Open Settings" shortcut button inside the Add Book modal.
  // Closes the book modal and opens the Settings modal in one click.
  document.getElementById('btn-open-settings-from-modal').addEventListener('click', () => {
    document.getElementById('modal-add-book').style.display = 'none';
    document.getElementById('modal-settings').style.display = 'flex';
  });

  document.getElementById('btn-check-book').addEventListener('click', checkBookCoverage);

  // ── SOURCE TOGGLE (AI knowledge vs. PDF upload) ──
  document.querySelectorAll('input[name="book-source"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const isPdf = document.getElementById('source-pdf').checked;
      document.getElementById('source-knowledge-zone').style.display  = isPdf ? 'none'  : 'block';
      document.getElementById('source-pdf-zone').style.display        = isPdf ? 'block' : 'none';
      document.getElementById('title-author-group').style.display     = isPdf ? 'none'  : 'block';
      document.getElementById('pdf-autodetect-note').style.display    = isPdf ? 'block' : 'none';
    });
  });

  // ── PDF DROP ZONE ──

  // (_pdfMeta is declared at module scope — see top of file)

  // Reads just the first 64KB and last 32KB of the PDF binary to extract
  // page count (/Count), title (/Title) and author (/Author) without a full load.
  async function extractPdfMetadata(file) {
    try {
      const CHUNK = 65536;
      const size  = file.size;
      const startBuf = await file.slice(0, Math.min(CHUNK, size)).arrayBuffer();
      const endBuf   = await file.slice(Math.max(0, size - CHUNK), size).arrayBuffer();
      const dec  = buf => new TextDecoder('latin1').decode(buf);
      const text = dec(startBuf) + dec(endBuf);

      // Page count — largest /Count N found in the page tree
      let pageCount = null;
      const countMatches = [...text.matchAll(/\/Count\s+(\d+)/g)];
      if (countMatches.length > 0)
        pageCount = Math.max(...countMatches.map(m => parseInt(m[1])));

      // Title — /Title (text) pattern
      let title = null;
      const tm = text.match(/\/Title\s*\(([^)]+)\)/);
      if (tm && tm[1].trim()) title = tm[1].trim().replace(/\\(.)/g, '$1');

      // Author — /Author (text) pattern
      let author = null;
      const am = text.match(/\/Author\s*\(([^)]+)\)/);
      if (am && am[1].trim()) author = am[1].trim().replace(/\\(.)/g, '$1');

      return { pageCount, title, author };
    } catch (e) {
      console.warn('PDF metadata extraction failed:', e);
      return { pageCount: null, title: null, author: null };
    }
  }

  function showSelectedFile(file) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(1);
    document.getElementById('pdf-filename').textContent         = file.name;
    document.getElementById('pdf-filesize').textContent        = sizeMB + ' MB';
    document.getElementById('pdf-pagecount').style.display     = 'none';
    document.getElementById('pdf-detected-title').style.display  = 'none';
    document.getElementById('pdf-detected-author').style.display = 'none';
    document.getElementById('pdf-detecting').style.display      = 'block';
    document.getElementById('drop-zone-idle').style.display     = 'none';
    document.getElementById('drop-zone-selected').style.display = 'flex';

    // Extract metadata in background — updates card when ready
    extractPdfMetadata(file).then(meta => {
      _pdfMeta = meta;
      document.getElementById('pdf-detecting').style.display = 'none';

      if (meta.pageCount) {
        document.getElementById('pdf-pages-num').textContent   = meta.pageCount.toLocaleString();
        document.getElementById('pdf-pagecount').style.display = 'inline';
      }
      if (meta.title) {
        document.getElementById('pdf-det-title').textContent     = meta.title;
        document.getElementById('pdf-detected-title').style.display = 'block';
      }
      if (meta.author) {
        document.getElementById('pdf-det-author').textContent     = meta.author;
        document.getElementById('pdf-detected-author').style.display = 'block';
      }
    });
  }

  // Clicking anywhere on the drop zone opens the file picker
  document.getElementById('pdf-drop-zone').addEventListener('click', (e) => {
    if (e.target.closest('#btn-remove-pdf')) return;
    document.getElementById('input-pdf-file').click();
  });

  document.getElementById('input-pdf-file').addEventListener('change', (e) => {
    if (e.target.files[0]) showSelectedFile(e.target.files[0]);
  });

  document.getElementById('btn-remove-pdf').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('input-pdf-file').value             = '';
    document.getElementById('drop-zone-idle').style.display     = 'flex';
    document.getElementById('drop-zone-selected').style.display = 'none';
  });

  const dropZone = document.getElementById('pdf-drop-zone');
  dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const ok = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.txt');
    if (!ok) { showToast('Please drop a PDF or TXT file.', 'error'); return; }
    const dt = new DataTransfer();
    dt.items.add(file);
    document.getElementById('input-pdf-file').files = dt.files;
    showSelectedFile(file);
  });

  document.getElementById('btn-back-step-1').addEventListener('click', () => {
    document.getElementById('add-book-step-2').style.display = 'none';
    document.getElementById('add-book-step-1').style.display = 'block';
  });
  document.getElementById('btn-generate-book').addEventListener('click', generateCurriculum);

  // ── SETTINGS MODAL ──
  // Two ways in: sidebar button (desktop) and library top-bar gear (the
  // sidebar is hidden on mobile, so the gear is the phone's only entry).
  const openSettings = () => {
    document.getElementById('modal-settings').style.display = 'flex';
  };
  document.getElementById('btn-settings').addEventListener('click', openSettings);
  document.getElementById('btn-settings-topbar')?.addEventListener('click', openSettings);
  document.getElementById('btn-close-settings').addEventListener('click', () => {
    document.getElementById('modal-settings').style.display = 'none';
  });
  document.getElementById('btn-save-settings').addEventListener('click', saveSettings);
  document.getElementById('btn-reset-db').addEventListener('click', resetDatabase);

  // ── CHAT TABS ──
  document.getElementById('tab-teach').addEventListener('click', () => switchChatTab('teach'));
  document.getElementById('tab-quiz').addEventListener('click', () => switchChatTab('quiz'));

  // ── CHAT SEND ──
  document.getElementById('btn-chat-send').addEventListener('click', sendChatMessage);
  document.getElementById('chat-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  });

  // ── NARRATION ENGINE INIT ──
  NarrationEngine.init();

  // ── TUTOR ARENA v2: mode select, study drawer, recap, note capture ──
  initTutorModeSelect();
  initStudyDrawer();
  initNoteCapture();
  initComposerToolsPopover();
  document.getElementById('btn-chat-home').addEventListener('click', () => navigateTo('library'));
  initReader();
  initPrime();
  initConsolidate();
  initLanguages();
  initNavReveal();

  document.getElementById('btn-recap').addEventListener('click', requestRecap);

  // Stop narration when user starts typing a reply
  document.getElementById('chat-input').addEventListener('input', function () {
    NarrationEngine.stop();
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });

  // ── MERMAID INIT ──
  if (window.mermaid) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
        primaryColor: '#7c3aed',
        primaryTextColor: '#e2e8f0',
        primaryBorderColor: '#5b21b6',
        lineColor:    '#7c3aed',
        background:   '#1a1a2e',
        nodeBorder:   '#7c3aed',
        fontSize:     '14px'
      }
    });
  }

  // ── SANDBOX ──
  document.getElementById('sandbox-book-select').addEventListener('change', async (e) => {
    const bookId = e.target.value;
    if (!bookId) return;
    const book = await dbGet('books', bookId);
    AppState.selectedBook = book;
    populateSandboxConcepts(book);
  });

  document.getElementById('sandbox-concept-select').addEventListener('change', (e) => {
    loadSandboxConcept(e.target.value);
  });

  document.getElementById('btn-submit-sandbox').addEventListener('click', submitSandboxExplanation);
  document.getElementById('btn-clear-sandbox').addEventListener('click', () => {
    document.getElementById('sandbox-textarea').value = '';
    document.getElementById('sandbox-feedback-panel').style.display = 'none';
  });

  document.getElementById('btn-apply-sandbox-progress').addEventListener('click', () => {
    const concept = document.getElementById('sandbox-workspace').dataset.concept;
    if (!AppState.masteredConcepts.includes(concept)) {
      AppState.masteredConcepts.push(concept);
    }
    saveMasteryProgress();
    showToast(`"${concept}" marked as mastered!`, 'success');
    document.getElementById('btn-apply-sandbox-progress').style.display = 'none';
  });

  // ── FLASHCARD REVIEW ──
  document.getElementById('flashcard-element').addEventListener('click', () => {
    document.getElementById('flashcard-element').classList.toggle('flipped');
    const isFlipped = document.getElementById('flashcard-element').classList.contains('flipped');
    document.getElementById('rating-controls').style.visibility = isFlipped ? 'visible' : 'hidden';
  });

  document.querySelectorAll('.rate-btn').forEach(btn => {
    btn.addEventListener('click', () => rateCard(btn.dataset.score));
  });

  // Keyboard-first review: 1–4 rate the card, Space/Enter flips it
  document.addEventListener('keydown', (e) => {
    if (AppState.currentView !== 'review') return;
    if (e.target.matches('input, textarea, select')) return;
    const deck = document.getElementById('flashcard-deck');
    if (!deck || deck.style.display === 'none') return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('flashcard-element').click();
      return;
    }
    const scores = { '1': 'forgot', '2': 'hard', '3': 'good', '4': 'easy' };
    if (scores[e.key] &&
        document.getElementById('rating-controls').style.visibility === 'visible') {
      rateCard(scores[e.key]);
    }
  });

  document.getElementById('btn-restart-review-mock').addEventListener('click', initReviewSession);
  document.getElementById('btn-seed-review-demo').addEventListener('click', initReviewSession);

  // Source filter + random practice
  document.getElementById('review-source-filter').addEventListener('change', (e) => {
    AppState.reviewFilter = e.target.value;
    // Remember the chosen topic across sessions (local-only, like other settings)
    dbPut('settings', { key: 'reviewFilter', value: e.target.value }).catch(() => {});
    initReviewSession();
  });
  document.getElementById('btn-random-practice').addEventListener('click', startRandomPractice);
  document.getElementById('btn-random-practice-empty').addEventListener('click', startRandomPractice);

  // ── CLOSE MODALS BY CLICKING OVERLAY ──
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.style.display = 'none';
    });
  });

  // Show welcome toast
  const isDemoMode = (await dbGet('settings', 'demoMode'))?.value !== false;
  if (isDemoMode) {
    showToast('Demo Mode active — try clicking on the Chase Hughes book!', 'info', 6000);
  }

});
