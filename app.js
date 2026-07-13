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
  return paras;
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
  if (samples.length < 3) return READING_DEFAULT_WPM;
  const sorted = [...samples].sort((a, b) => a - b);
  return Math.round(sorted[Math.floor(sorted.length / 2)]);
}

async function recordPaceSample(words, seconds) {
  const book = AppState.selectedBook;
  if (!book) return;
  // Discard obvious outliers: sub-10s skims and >30min walk-aways
  if (seconds < 10 || seconds > 1800) return;
  const wpm = Math.round(words / (seconds / 60));
  if (wpm < 40 || wpm > 900) return;

  const samples = [...(book.paceSamples || []), wpm].slice(-20);
  const updated = { ...book, paceSamples: samples, paceWpm: bookPaceWpm({ paceSamples: samples }) };
  AppState.selectedBook = updated;
  await dbPut('books', updated);
}

function formatReadingTime(minutes) {
  if (!isFinite(minutes) || minutes < 0) return '';
  const m = Math.max(1, Math.round(minutes));
  if (m < 60) return `${m} min`;
  return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`;
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
        state.confidence = val;
        this.startQuestion(card, state);
      });
      row.appendChild(chip);
    });
    card.querySelector('.cp-skip').addEventListener('click', () => this.finish(card, state, 'skipped'));
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
    document.getElementById('btn-back-to-reader').style.display = 'inline-flex';

    const book = AppState.selectedBook;
    document.getElementById('reader-chapter-label').textContent =
      `Ch ${chapter.number} · ${chapter.title}`;

    this.renderColumn();
    this.updateTopbar();
    this.startSegmentTimer();

    // Resume where the reader left off
    const scrollEl = document.getElementById('reader-scroll');
    scrollEl.scrollTop = 0;
    const current = document.getElementById(`segment-${this.segmentsDone}`);
    if (current && this.segmentsDone > 0) current.scrollIntoView({ block: 'start' });
    return true;
  },

  // Switch to the classic tutor split without tearing down reader state
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
  },

  buildSegmentEl(segment, index) {
    const wrap = document.createElement('div');
    wrap.className = 'reader-segment';
    wrap.id = `segment-${index}`;

    segment.paragraphs.forEach(p => {
      const el = document.createElement('p');
      el.textContent = p;
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
    done.innerHTML = `
      <div class="seg-rule">Chapter complete</div>
      <p>You've read the whole chapter. Review it with the tutor, or head back to the library.</p>
    `;
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.textContent = 'Open tutor →';
    btn.addEventListener('click', () => this.showTutor());
    done.appendChild(btn);
    return done;
  },

  async completeSegment(index) {
    if (index !== this.segmentsDone) return; // only the current segment advances

    const segment = this.segments[index];
    const seconds = this.segmentStartedAt ? (Date.now() - this.segmentStartedAt) / 1000 : 0;

    this.segmentsDone = index + 1;
    this.startSegmentTimer();

    // Reveal the next segment (or the completion card) in place
    this.renderColumn();
    const next = document.getElementById(`segment-${this.segmentsDone}`);
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.updateTopbar();

    // Persist progress + pace in the background — reading never blocks on I/O
    const book = AppState.selectedBook;
    recordPaceSample(segment.wordCount, seconds)
      .catch(err => console.warn('Pace save failed:', err.message));
    if (book?.isPdfBook) {
      dbPutChapter(book.id, { chapterNumber: this.chapter.number, segmentsDone: this.segmentsDone })
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

    // Guided reading: chapters with real text open in the reader pane
    if (chapter._chapterText) Reader.open(chapter);
    else Reader.close();
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
  document.getElementById('composer-tools').style.display = 'flex';

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
  const popover    = document.getElementById('selection-popover');
  const saveBtn    = document.getElementById('btn-save-note');
  const explainBtn = document.getElementById('btn-explain-selection');
  let pendingText = '';

  function hidePopover() {
    popover.style.display = 'none';
    pendingText = '';
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
      pendingText = text;
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const popoverWidth = 150; // rough estimate to keep it on-screen
      popover.style.display = 'flex';
      popover.style.top  = Math.max(8, rect.top - 44) + 'px';
      popover.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - popoverWidth)) + 'px';
    }, 200);
  });

  document.addEventListener('mousedown', (e) => {
    if (!popover.contains(e.target)) hidePopover();
  });
  document.addEventListener('scroll', hidePopover, true);

  // Explain: jump into the tutor with the selected passage as a grounded question
  explainBtn.addEventListener('click', () => {
    if (!pendingText || !AppState.selectedChapter) return;
    const quote = pendingText;
    hidePopover();
    window.getSelection().removeAllRanges();
    Reader.showTutor();
    requestDeepDive(quote, AppState.selectedChapter.number, AppState.selectedChapter.title);
  });

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
          Ch. ${n.chapterNumber} — ${n.chapterTitle}
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
function populateSandboxSelectors() {
  const bookSelect = document.getElementById('sandbox-book-select');
  bookSelect.innerHTML = '<option value="">-- Choose a Book --</option>';

  if (AppState.selectedBook) {
    const opt = document.createElement('option');
    opt.value = AppState.selectedBook.id;
    opt.textContent = AppState.selectedBook.title;
    bookSelect.appendChild(opt);
    bookSelect.value = AppState.selectedBook.id;
    populateSandboxConcepts(AppState.selectedBook);
  }
}

async function populateSandboxConcepts(book) {
  const conceptSelect = document.getElementById('sandbox-concept-select');
  conceptSelect.innerHTML = '<option value="">-- Choose a Concept --</option>';
  conceptSelect.disabled = false;

  book.chapters.forEach(ch => {
    ch.concepts.forEach(concept => {
      const opt = document.createElement('option');
      opt.value = JSON.stringify({ concept, chapter: ch.number, summary: ch.summary_15m });
      opt.textContent = `Ch.${ch.number}: ${concept}`;
      conceptSelect.appendChild(opt);
    });
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
async function collectDueCards() {
  const due = [];
  AppState._reviewBookCache = {};
  AppState._reviewChapterCache = {};

  const books = await dbGetAll('books');
  for (const book of books) {
    if (book.isPdfBook) {
      const chapterDocs = await dbGetChaptersForBook(book.id);
      for (const chDoc of chapterDocs) {
        const cards = chDoc.flashcards || [];
        if (cards.length) {
          AppState._reviewChapterCache[`${book.id}_ch_${chDoc.chapterNumber}`] = cards;
        }
        cards.forEach((card, idx) => {
          if (isCardDue(card)) {
            due.push({
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
          if (isCardDue(card)) {
            due.push({
              ...card,
              bookTitle: book.title,
              _src: { type: 'bookDoc', bookId: book.id, chapterNumber: ch.number, index: idx }
            });
          }
        });
      });
    }
  }
  return due;
}

// Persist a rated card's new SM-2 schedule back to its source document.
async function persistCardSchedule(card) {
  const src = card._src;
  if (!src) return;

  // Strip session-only fields before writing
  const clean = { ...card };
  delete clean._src;
  delete clean.bookTitle;

  if (src.type === 'chapterDoc') {
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
  const dueCards = shuffleCards(await collectDueCards());
  updateReviewBadge(dueCards.length);

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
    document.getElementById('review-finished-message').style.display = 'flex';
    return;
  }

  const card = cards[idx];
  const el = document.getElementById('flashcard-element');
  el.classList.remove('flipped');
  document.getElementById('rating-controls').style.visibility = 'hidden';

  document.getElementById('card-book-tag').textContent = card.bookTitle;
  document.getElementById('card-book-tag-back').textContent = card.bookTitle;
  document.getElementById('card-front-text').textContent = card.front;
  document.getElementById('card-back-text').textContent = card.back;
}

function rateCard(score) {
  const card = AppState.flashcardSession[AppState.flashcardIndex];
  if (!card) return;

  const stats = AppState.reviewStats;
  stats[score]++;
  stats.done++;

  // Run SM-2 and persist the new schedule to the card's source document.
  // Fire-and-forget: a failed write shouldn't block the review flow.
  const scheduled = sm2Schedule(card, score);
  persistCardSchedule(scheduled)
    .catch(err => console.warn('Could not save card schedule:', err.message));

  // Update UI stats
  const ratio = `${stats.done} / ${stats.total}`;
  document.getElementById('review-cards-ratio').textContent = ratio;
  document.getElementById('review-progress-fill').style.width = `${(stats.done / stats.total) * 100}%`;
  document.getElementById('review-forgot-count').textContent = stats.forgot;
  document.getElementById('review-hard-count').textContent = stats.hard;
  document.getElementById('review-good-count').textContent = stats.good;
  document.getElementById('review-easy-count').textContent = stats.easy;

  // Update review badge with remaining due cards
  updateReviewBadge(stats.total - stats.done);

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
  document.getElementById('btn-settings').addEventListener('click', () => {
    document.getElementById('modal-settings').style.display = 'flex';
  });
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
  initReader();

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

  document.getElementById('btn-restart-review-mock').addEventListener('click', initReviewSession);
  document.getElementById('btn-seed-review-demo').addEventListener('click', initReviewSession);

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
