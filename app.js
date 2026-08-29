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
    provider: 'deepseek',        // 'deepseek' | 'openai' — which one runs the app
    apiKey: '',                  // DeepSeek
    openaiKey: '',               // OpenAI (ChatGPT)
    openaiModel: '',             // discovered from the account, not assumed
    openaiModelChoice: '',       // typed in Settings; overrides the discovery
    geminiKey: ''                // optional; only for attachments (video, PDF)
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

// Deleted items are filtered out HERE rather than at each call site, so the
// library, the tutor's selects, the Feynman picker, the flashcard deck and the
// notes tab all forget a deleted book without any of them having to know that
// trash exists. Pass { includeDeleted: true } to see inside the bin.
async function dbGetAll(storeName, opts = {}) {
  if (storeName === 'settings') return idbGetAll(storeName);
  if (storeName === 'books') {
    const col = userCol('books');
    if (!col) return [];
    const snap = await col.get();
    const all = snap.docs.map(d => d.data());
    return opts.includeDeleted ? all : all.filter(b => !b.deletedAt);
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

// The chapter's TEXT lives apart from everything else about the chapter, in
// bookChapterText/{bookId}_ch_{n}. It is up to 200,000 characters — the single
// biggest thing this app stores — and almost nothing that reads a chapter wants
// it. Opening a chapter used to pull every OTHER chapter's text as well (to
// build the tutor's prior-chapters context), and opening Flashcards pulled the
// text of every chapter of every book to get at the cards inside them. That is
// megabytes over the wire before anything appears, and it is why both were slow.
//
// Only the reader wants the text, and only for the one chapter it is showing.
const chapterDocId = (bookId, n) => `${bookId}_ch_${n}`;

async function dbPutChapter(bookId, chapterData) {
  const col = userCol('bookChapters');
  if (!col) return;
  const key = chapterDocId(bookId, chapterData.chapterNumber);
  const { text, ...light } = chapterData;

  const jobs = [col.doc(key).set({ ...light, bookId, updatedAt: Date.now() }, { merge: true })];
  if (text !== undefined) {
    const textCol = userCol('bookChapterText');
    if (textCol) {
      jobs.push(textCol.doc(key).set(
        { bookId, chapterNumber: chapterData.chapterNumber, text, updatedAt: Date.now() },
        { merge: true }
      ));
    }
  }
  await Promise.all(jobs);
}

async function dbGetChapterText(bookId, chapterNumber) {
  const col = userCol('bookChapterText');
  if (!col) return null;
  const snap = await col.doc(chapterDocId(bookId, chapterNumber)).get();
  return snap.exists ? (snap.data().text || '') : null;
}

// Chapters written before the split still carry `text` on the light document.
// Moving it costs one extra write, once, on a read we were making anyway — and
// the field is only removed after the copy is safely stored.
async function migrateChapterText(bookId, chapterNumber, text) {
  const col = userCol('bookChapters');
  const textCol = userCol('bookChapterText');
  if (!col || !textCol || !text) return;
  try {
    await textCol.doc(chapterDocId(bookId, chapterNumber)).set(
      { bookId, chapterNumber, text, updatedAt: Date.now() }, { merge: true });
    await col.doc(chapterDocId(bookId, chapterNumber)).set(
      { text: firebase.firestore.FieldValue.delete() }, { merge: true });
  } catch (err) {
    console.warn(`Chapter text move failed for ${bookId} ch${chapterNumber}:`, err.message);
  }
}

// `withText` is for the reader, which is the only caller that needs it.
async function dbGetChapter(bookId, chapterNumber, { withText = true } = {}) {
  const col = userCol('bookChapters');
  if (!col) return null;
  const snap = await col.doc(chapterDocId(bookId, chapterNumber)).get();
  if (!snap.exists) return null;
  const data = snap.data();
  if (!withText) return data;

  if (data.text) {                       // pre-split document: move it as we go
    migrateChapterText(bookId, chapterNumber, data.text);
    return data;
  }
  const text = await dbGetChapterText(bookId, chapterNumber);
  return text == null ? data : { ...data, text };
}

// Deliberately light: summaries, concepts, cards and progress, never the text.
// Any document still carrying text is moved here too, so a library heals itself
// the first time each of these paths runs.
async function dbGetChaptersForBook(bookId) {
  const col = userCol('bookChapters');
  if (!col) return [];
  const snap = await col.where('bookId', '==', bookId).get();
  return snap.docs.map(d => {
    const data = d.data();
    if (data.text) {
      migrateChapterText(bookId, data.chapterNumber, data.text);
      const { text, ...light } = data;
      return light;
    }
    return data;
  });
}

async function dbDeleteBookChapters(bookId) {
  for (const name of ['bookChapters', 'bookChapterText']) {
    const col = userCol(name);
    if (!col) continue;
    const snap = await col.where('bookId', '==', bookId).get();
    if (snap.empty) continue;
    for (let i = 0; i < snap.docs.length; i += 400) {
      const batch = firestoreDB.batch();
      snap.docs.slice(i, i + 400).forEach(d => batch.delete(d.ref));
      await batch.commit();
    }
  }
}

// ── CUMULATIVE TUTOR CONTEXT ─────────────────────────────────────────────────
// A book is one argument, not a stack of unrelated chapters. By chapter nine
// the useful question is "how does this rest on chapter three", which a tutor
// that only ever sees the open chapter can never ask. So both the tutor and the
// quiz get everything studied SO FAR by default — earlier chapters compactly,
// as their summaries and concepts, with the open chapter's full text reserved
// for exact quoting. A per-chapter scope remains one tap away.

const PRIOR_CONTEXT_MAX_CHARS = 14000;

async function buildPriorChaptersContext(book, currentNumber) {
  if (!book || !currentNumber || currentNumber <= 1) return '';

  let chapters = [];
  try {
    if (book.isPdfBook) {
      // Curriculum lives in bookChapters docs, generated on demand — only
      // chapters actually studied have anything worth carrying forward.
      const all = await dbGetChaptersForBook(book.id);
      chapters = all
        .filter(c => c.chapterNumber < currentNumber && c.summary_10s)
        .sort((a, b) => a.chapterNumber - b.chapterNumber)
        .map(c => ({
          number: c.chapterNumber, title: c.title,
          summary: c.summary_3m || c.summary_10s || '',
          concepts: (c.concepts || []).map(x => x.name || x).filter(Boolean)
        }));
    } else {
      chapters = (book.chapters || [])
        .filter(c => c.number < currentNumber && (c.summary_3m || c.summary_10s))
        .sort((a, b) => a.number - b.number)
        .map(c => ({
          number: c.number, title: c.title,
          summary: c.summary_3m || c.summary_10s || '',
          concepts: (c.concepts || []).map(x => x.name || x).filter(Boolean)
        }));
    }
  } catch (err) {
    console.warn('Prior-chapter context unavailable:', err.message);
    return '';
  }

  if (!chapters.length) return '';

  const block = (c) => `Chapter ${c.number}: ${c.title}\n`
    + `${stripPageMarkers(c.summary).trim()}\n`
    + (c.concepts.length ? `Key concepts: ${c.concepts.join(', ')}\n` : '');

  // If the whole history doesn't fit, EVERY chapter still gets a line — a
  // chapter dropped completely is one the tutor stops knowing exists, which is
  // worse than one it knows only by name. So lay down the thin version of all
  // of them first, then spend what budget remains upgrading the most recent
  // back to full detail, working backwards.
  let out = chapters.map(block).join('\n');
  if (out.length > PRIOR_CONTEXT_MAX_CHARS) {
    const thin = (c) => `Chapter ${c.number}: ${c.title}`
      + (c.concepts.length ? ` — ${c.concepts.join(', ')}` : '') + '\n';

    const lines = chapters.map(thin);
    let budget = PRIOR_CONTEXT_MAX_CHARS - lines.join('\n').length;

    for (let i = chapters.length - 1; i >= 0 && budget > 0; i--) {
      const full = block(chapters[i]);
      const extra = full.length - lines[i].length;
      if (extra > 0 && extra <= budget) { lines[i] = full; budget -= extra; }
    }
    out = lines.join('\n');
  }
  return out;
}

// ── TRASH ────────────────────────────────────────────────────────────────────
// Deleting is a two-stage business. Stage one marks `deletedAt` and the item
// disappears from every list — library, languages, the flashcard deck, notes.
// Stage two, after the grace period, actually destroys it and everything it
// owns. Nothing is unrecoverable until the window closes, because "I deleted
// the wrong book" should never be the end of the story.
const TRASH_DAYS = 30;
const TRASH_MS = TRASH_DAYS * 24 * 60 * 60 * 1000;

function isDeleted(item) {
  return !!item?.deletedAt;
}

function trashDaysLeft(item) {
  if (!item?.deletedAt) return null;
  return Math.max(0, Math.ceil((item.deletedAt + TRASH_MS - Date.now()) / (24 * 60 * 60 * 1000)));
}

async function dbSoftDeleteBook(bookId) {
  const col = userCol('books');
  if (!col) return;
  await col.doc(String(bookId)).set({ deletedAt: Date.now() }, { merge: true });
}

async function dbRestoreBook(bookId) {
  const col = userCol('books');
  if (!col) return;
  await col.doc(String(bookId)).set(
    { deletedAt: firebase.firestore.FieldValue.delete() }, { merge: true }
  );
}

// Deletes every document belonging to a query, in batches Firestore accepts.
async function deleteQueryDocs(col, field, value) {
  if (!col) return 0;
  const snap = await col.where(field, '==', value).get();
  if (snap.empty) return 0;
  let done = 0;
  for (let i = 0; i < snap.docs.length; i += 400) {
    const batch = firestoreDB.batch();
    snap.docs.slice(i, i + 400).forEach(d => batch.delete(d.ref));
    await batch.commit();
    done += Math.min(400, snap.docs.length - i);
  }
  return done;
}

// Everything a book owns: its chapters, the notes taken in it, and the chat
// history of every chapter. Cards live inside the chapter docs, so they go with
// them. Called only once the grace period has passed, or on an explicit
// "delete permanently".
async function dbPurgeBook(bookId) {
  const chapters = userCol('bookChapters');
  const notes = userCol('notes');
  const chat = userCol('chat');
  const books = userCol('books');
  if (!books) return;

  await deleteQueryDocs(chapters, 'bookId', bookId);
  await deleteQueryDocs(userCol('bookChapterText'), 'bookId', bookId);
  await deleteQueryDocs(notes, 'bookId', bookId);

  // Chat is keyed `{bookId}-ch{n}`, so it needs a prefix sweep rather than a
  // field match.
  if (chat) {
    const snap = await chat
      .where('chapterKey', '>=', `${bookId}-ch`)
      .where('chapterKey', '<=', `${bookId}-ch`)
      .get()
      .catch(() => null);
    if (snap && !snap.empty) {
      for (let i = 0; i < snap.docs.length; i += 400) {
        const batch = firestoreDB.batch();
        snap.docs.slice(i, i + 400).forEach(d => batch.delete(d.ref));
        await batch.commit();
      }
    }
  }

  await books.doc(String(bookId)).delete();
}

async function dbSoftDeleteLanguage(langId) {
  await dbPatchLanguage(langId, { deletedAt: Date.now() });
}

async function dbRestoreLanguage(langId) {
  const col = userCol('languages');
  if (!col) return;
  await col.doc(langId).set(
    { deletedAt: firebase.firestore.FieldValue.delete() }, { merge: true }
  );
}

// A language owns rather a lot: its cards, its cached lessons, its syllabus,
// its gloss cache and its vocabulary sets.
async function dbPurgeLanguage(langId) {
  const languages = userCol('languages');
  if (!languages) return;

  await deleteQueryDocs(userCol('langCards'), 'langId', langId);
  await deleteQueryDocs(userCol('langLessons'), 'langId', langId);
  await deleteQueryDocs(userCol('vocabSets'), 'langId', langId);

  for (const [name, docId] of [['langSyllabus', langId], ['langGloss', langId]]) {
    const col = userCol(name);
    if (col) await col.doc(docId).delete().catch(() => {});
  }

  await languages.doc(langId).delete();
  delete _glossCache[langId];
}

// ── DECKS ────────────────────────────────────────────────────────────────────
// A deck is not a language. Emptying the Quranic root deck must not take the
// course's progress with it, so deletion is marked on the language document
// with its own field and only ever destroys the cards.
async function dbSoftDeleteDeck(langId) {
  await dbPatchLanguage(langId, { deckDeletedAt: Date.now() });
}

async function dbRestoreDeck(langId) {
  const col = userCol('languages');
  if (!col) return;
  await col.doc(langId).set(
    { deckDeletedAt: firebase.firestore.FieldValue.delete() }, { merge: true }
  );
}

// The cards, and nothing else. rootDeckSeeded goes back to false so the root
// track offers to rebuild rather than assuming the deck is still there.
async function dbPurgeDeck(langId) {
  await deleteQueryDocs(userCol('langCards'), 'langId', langId);
  const col = userCol('languages');
  if (!col) return;
  await col.doc(langId).set({
    cardCount: 0,
    rootDeckSeeded: false,
    deckDeletedAt: firebase.firestore.FieldValue.delete(),
    updatedAt: Date.now()
  }, { merge: true });
}

async function deleteDeckFlow(lang) {
  const ok = await confirmAction({
    title: `Delete the ${escapeAttr(deckLabel(lang))} deck?`,
    body: `Its ${lang.cardCount || 0} flashcards go. Your progress through the
      course itself stays exactly where it is.
      <br><br>You can restore the deck from <strong>Recently deleted decks</strong>
      for the next ${TRASH_DAYS} days, after which the cards are gone for good.`,
    confirmLabel: 'Delete deck'
  });
  if (!ok) return false;

  try {
    await dbSoftDeleteDeck(lang.id);
    AppState._reviewLangCache = null;
    if (AppState.reviewFilter === `lang:${lang.id}`) AppState.reviewFilter = 'all';
    showToast(`${deckLabel(lang)} deck deleted — restorable for ${TRASH_DAYS} days.`, 'success', 5000);
    await initReviewSession();
    return true;
  } catch (err) {
    showToast('Could not delete that deck: ' + err.message, 'error', 7000);
    return false;
  }
}

// The deck bin, in the Flashcards view. Same shape as renderTrashSection, but
// its items are languages filtered on a different field.
async function renderDeckTrash() {
  const wrap = document.getElementById('trash-decks');
  const list = document.getElementById('trash-decks-list');
  const count = document.getElementById('trash-decks-count');
  if (!wrap || !list) return;

  const items = (await dbGetAllLanguages().catch(() => [])).filter(l => l.deckDeletedAt);
  if (!items.length) { wrap.style.display = 'none'; list.innerHTML = ''; return; }

  items.sort((a, b) => b.deckDeletedAt - a.deckDeletedAt);
  if (count) count.textContent = items.length;

  list.innerHTML = items.map(l => {
    const left = trashDaysLeft({ deletedAt: l.deckDeletedAt });
    return `
      <div class="trash-item" data-id="${escapeAttr(l.id)}">
        <div class="trash-item-body">
          <span class="trash-item-name">${escapeAttr(deckLabel(l))} deck</span>
          <span class="trash-item-meta">${l.cardCount || 0} cards · ${left > 0
            ? `${left} day${left === 1 ? '' : 's'} left to restore`
            : 'will be removed shortly'}</span>
        </div>
        <button class="trash-btn trash-restore" data-id="${escapeAttr(l.id)}">Restore</button>
        <button class="trash-btn trash-purge" data-id="${escapeAttr(l.id)}">Delete now</button>
      </div>`;
  }).join('');

  list.querySelectorAll('.trash-restore').forEach(btn => {
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      try {
        await dbRestoreDeck(btn.dataset.id);
        AppState._reviewLangCache = null;
        showToast('Deck restored.', 'success', 3000);
        await initReviewSession();
      } catch (err) {
        showToast('Could not restore: ' + err.message, 'error', 6000);
        btn.disabled = false;
      }
    });
  });

  list.querySelectorAll('.trash-purge').forEach(btn => {
    btn.addEventListener('click', async () => {
      const lang = items.find(l => l.id === btn.dataset.id);
      const ok = await confirmAction({
        title: `Permanently delete the ${escapeAttr(deckLabel(lang))} deck?`,
        body: 'This cannot be undone. The cards are destroyed immediately — your course progress is untouched.',
        confirmLabel: 'Delete permanently'
      });
      if (!ok) return;
      btn.disabled = true;
      try {
        await dbPurgeDeck(lang.id);
        AppState._reviewLangCache = null;
        showToast('Deck permanently deleted.', 'success', 3000);
        await initReviewSession();
      } catch (err) {
        showToast('Could not delete: ' + err.message, 'error', 6000);
        btn.disabled = false;
      }
    });
  });

  wrap.style.display = 'block';
}

// Anything past its grace period is destroyed for good. Runs once on load —
// quietly, and never blocking what the learner is trying to do.
async function purgeExpiredTrash() {
  try {
    const cutoff = Date.now() - TRASH_MS;
    const [books, langs] = await Promise.all([
      dbGetAll('books', { includeDeleted: true }).catch(() => []),
      dbGetAllLanguages({ includeDeleted: true }).catch(() => [])
    ]);
    const staleBooks = books.filter(b => b.deletedAt && b.deletedAt < cutoff);
    const staleLangs = langs.filter(l => l.deletedAt && l.deletedAt < cutoff);
    // A deck whose language is itself being purged needs no separate sweep.
    const staleDecks = langs.filter(l =>
      l.deckDeletedAt && l.deckDeletedAt < cutoff && !staleLangs.includes(l));
    for (const b of staleBooks) await dbPurgeBook(b.id).catch(() => {});
    for (const l of staleLangs) await dbPurgeLanguage(l.id).catch(() => {});
    for (const l of staleDecks) await dbPurgeDeck(l.id).catch(() => {});
    if (staleBooks.length || staleLangs.length || staleDecks.length) {
      console.log(`Trash: purged ${staleBooks.length} book(s), ${staleLangs.length} language(s), ${staleDecks.length} deck(s) past ${TRASH_DAYS} days.`);
    }
  } catch (err) {
    console.warn('Trash purge failed:', err.message);
  }
}

async function deleteBookFlow(book) {
  const ok = await confirmAction({
    title: `Delete "${escapeAttr(book.title)}"?`,
    body: `Its chapters, flashcards, notes and tutor conversations go with it.
      <br><br>You can restore it from <strong>Recently deleted</strong> for the next
      ${TRASH_DAYS} days, after which it's gone for good.`,
    confirmLabel: 'Delete book'
  });
  if (!ok) return false;

  try {
    await dbSoftDeleteBook(book.id);
    // A deleted book can't stay open in the tutor behind you
    if (AppState.selectedBook?.id === book.id) {
      AppState.selectedBook = null;
      AppState.selectedChapter = null;
      navigateTo('library');
    }
    AppState._reviewLangCache = null;
    showToast(`"${book.title}" deleted — restorable for ${TRASH_DAYS} days.`, 'success', 5000);
    await renderLibrary();
    return true;
  } catch (err) {
    showToast('Could not delete that book: ' + err.message, 'error', 7000);
    return false;
  }
}

async function deleteLanguageFlow(lang) {
  const ok = await confirmAction({
    title: `Delete ${escapeAttr(lang.name)}?`,
    body: `Its cards, lessons, syllabus and vocabulary sets go with it.
      <br><br>You can restore it from <strong>Recently deleted</strong> for the next
      ${TRASH_DAYS} days, after which it's gone for good.`,
    confirmLabel: 'Delete language'
  });
  if (!ok) return false;

  try {
    await dbSoftDeleteLanguage(lang.id);
    if (LangSession.lang?.id === lang.id) LangSession.close();
    AppState._reviewLangCache = null;
    AppState._harvestLang = undefined;
    showToast(`${lang.name} deleted — restorable for ${TRASH_DAYS} days.`, 'success', 5000);
    await renderLanguages();
    if (typeof VocabBuilder !== 'undefined' && VocabBuilder.lang?.id === lang.id) {
      VocabBuilder.words = []; VocabBuilder.quiz = null; VocabBuilder.lang = null;
    }
    return true;
  } catch (err) {
    showToast('Could not delete that language: ' + err.message, 'error', 7000);
    return false;
  }
}

// Renders the "Recently deleted" strip for whichever kind it's given. Hidden
// entirely when the bin is empty, so it never becomes furniture.
async function renderTrashSection(kind) {
  const wrap = document.getElementById(`trash-${kind}`);
  const list = document.getElementById(`trash-${kind}-list`);
  const count = document.getElementById(`trash-${kind}-count`);
  if (!wrap || !list) return;

  const items = kind === 'books'
    ? (await dbGetAll('books', { includeDeleted: true }).catch(() => [])).filter(isDeleted)
    : (await dbGetAllLanguages({ includeDeleted: true }).catch(() => [])).filter(isDeleted);

  if (!items.length) { wrap.style.display = 'none'; list.innerHTML = ''; return; }

  items.sort((a, b) => b.deletedAt - a.deletedAt);
  if (count) count.textContent = items.length;

  list.innerHTML = items.map(it => {
    const name = kind === 'books' ? it.title : it.name;
    const left = trashDaysLeft(it);
    return `
      <div class="trash-item" data-id="${escapeAttr(it.id)}">
        <div class="trash-item-body">
          <span class="trash-item-name">${escapeAttr(name)}</span>
          <span class="trash-item-meta">${left > 0
            ? `${left} day${left === 1 ? '' : 's'} left to restore`
            : 'will be removed shortly'}</span>
        </div>
        <button class="trash-btn trash-restore" data-id="${escapeAttr(it.id)}">Restore</button>
        <button class="trash-btn trash-purge" data-id="${escapeAttr(it.id)}">Delete now</button>
      </div>`;
  }).join('');

  list.querySelectorAll('.trash-restore').forEach(btn => {
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      try {
        if (kind === 'books') await dbRestoreBook(btn.dataset.id);
        else await dbRestoreLanguage(btn.dataset.id);
        AppState._reviewLangCache = null;
        AppState._harvestLang = undefined;
        showToast('Restored.', 'success', 3000);
        if (kind === 'books') await renderLibrary(); else await renderLanguages();
      } catch (err) {
        showToast('Could not restore: ' + err.message, 'error', 6000);
        btn.disabled = false;
      }
    });
  });

  list.querySelectorAll('.trash-purge').forEach(btn => {
    btn.addEventListener('click', async () => {
      const item = items.find(i => String(i.id) === btn.dataset.id);
      const name = kind === 'books' ? item.title : item.name;
      const ok = await confirmAction({
        title: `Permanently delete "${escapeAttr(name)}"?`,
        body: 'This cannot be undone. Everything it owns is destroyed immediately.',
        confirmLabel: 'Delete permanently'
      });
      if (!ok) return;
      btn.disabled = true;
      try {
        if (kind === 'books') await dbPurgeBook(item.id);
        else await dbPurgeLanguage(item.id);
        showToast('Permanently deleted.', 'success', 3000);
        if (kind === 'books') await renderLibrary(); else await renderLanguages();
      } catch (err) {
        showToast('Could not delete: ' + err.message, 'error', 6000);
        btn.disabled = false;
      }
    });
  });

  wrap.style.display = 'block';
}

// A real confirm step before anything destructive. Resolves true/false, so
// callers read as `if (await confirmAction(...))`.
function confirmAction({ title, body, confirmLabel = 'Delete', danger = true }) {
  return new Promise(resolve => {
    const overlay = document.getElementById('confirm-overlay');
    const okBtn = document.getElementById('btn-confirm-ok');
    const cancelBtn = document.getElementById('btn-confirm-cancel');
    if (!overlay) return resolve(window.confirm(`${title}\n\n${body}`));

    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-body').innerHTML = body;
    okBtn.textContent = confirmLabel;
    okBtn.className = danger ? 'btn btn-danger' : 'btn btn-primary';
    overlay.style.display = 'flex';

    const done = (result) => {
      overlay.style.display = 'none';
      okBtn.removeEventListener('click', onOk);
      cancelBtn.removeEventListener('click', onCancel);
      overlay.removeEventListener('click', onBackdrop);
      document.removeEventListener('keydown', onKey);
      resolve(result);
    };
    const onOk = () => done(true);
    const onCancel = () => done(false);
    const onBackdrop = (e) => { if (e.target === overlay) done(false); };
    const onKey = (e) => { if (e.key === 'Escape') done(false); };

    okBtn.addEventListener('click', onOk);
    cancelBtn.addEventListener('click', onCancel);
    overlay.addEventListener('click', onBackdrop);
    document.addEventListener('keydown', onKey);
    okBtn.focus();
  });
}

// ── LANGUAGE LEARNING DB (Firestore) ─────────────────────────────────────────
// languages/{langId}                — one profile doc per language
// langCards/{langId}_batch_{n}     — sentence-card batches (≤100 cards/doc,
//                                    same chunking pattern as bookChapters)

const LANG_CARDS_PER_BATCH = 100;
// How many cards go out per write. Smaller than a batch so a long file shows
// progress the whole way through and a failure loses a chunk, not a batch.
const LANG_CARDS_PER_WRITE = 25;

async function dbPutLanguage(lang) {
  const col = userCol('languages');
  if (!col) return;
  await col.doc(lang.id).set({ ...lang, updatedAt: Date.now() }, { merge: true });
}

// Merge a few fields onto a language without shipping the whole in-memory
// object. dbPutLanguage writes every field it holds, which can clobber a
// levelScore that flushLevelEstimate wrote while the session was open — so any
// targeted update should come through here instead.
async function dbPatchLanguage(langId, fields) {
  const col = userCol('languages');
  if (!col) return;
  await col.doc(langId).set({ ...fields, updatedAt: Date.now() }, { merge: true });
}

async function dbGetAllLanguages(opts = {}) {
  const col = userCol('languages');
  if (!col) return [];
  const snap = await col.get();
  const all = snap.docs.map(d => d.data());
  return opts.includeDeleted ? all : all.filter(l => !l.deletedAt);
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
// `onProgress(written, total)` is called after every write, so a caller filing
// hundreds of cards can show something moving instead of a bar that sits still
// until the whole set lands. Writes go out in LANG_CARDS_PER_WRITE chunks rather
// than one document at a time — one round trip per card would be far slower than
// the batching it replaced, which is the opposite of the point.
async function dbAppendLangCards(langId, newCards, onProgress = null) {
  const batches = await dbGetLangCardBatches(langId);
  let queue = [...newCards];
  const total = newCards.length;
  const before = batches.reduce((n, b) => n + (b.flashcards || []).length, 0);
  let written = 0;
  const step = (n) => {
    written += n;
    if (onProgress) { try { onProgress(written, total); } catch (_) { /* cosmetic */ } }
  };

  const last = batches[batches.length - 1];
  if (last && (last.flashcards || []).length < LANG_CARDS_PER_BATCH) {
    const room = LANG_CARDS_PER_BATCH - last.flashcards.length;
    const fill = queue.splice(0, room);
    await dbPutLangCardBatch(langId, last.batch, [...last.flashcards, ...fill]);
    step(fill.length);
  }
  let nextBatch = last ? last.batch + 1 : 0;
  while (queue.length) {
    // A batch document is filled across several writes so progress moves during
    // it, and a failure part-way costs a chunk rather than the whole batch.
    const batchCards = queue.splice(0, LANG_CARDS_PER_BATCH);
    const held = [];
    while (held.length < batchCards.length) {
      const chunk = batchCards.slice(held.length, held.length + LANG_CARDS_PER_WRITE);
      held.push(...chunk);
      await dbPutLangCardBatch(langId, nextBatch, [...held]);
      step(chunk.length);
    }
    nextBatch += 1;
  }

  // The running total lives on the language document so the flashcard source
  // list can leave out decks that hold nothing without reading every batch.
  await dbPatchLanguage(langId, { cardCount: before + newCards.length })
    .catch(err => console.warn(`Card count update failed for ${langId}:`, err.message));
}

// vocabSets/{langId}_set_{n} — one generated batch of vocabulary-builder
// words, cached so revisiting a set costs nothing.
async function dbGetVocabSet(langId, setNumber) {
  const col = userCol('vocabSets');
  if (!col) return null;
  const snap = await col.doc(`${langId}_set_${setNumber}`).get();
  return snap.exists ? snap.data() : null;
}

async function dbPutVocabSet(langId, setNumber, words, meta = {}) {
  const col = userCol('vocabSets');
  if (!col) return;
  await col.doc(`${langId}_set_${setNumber}`).set(
    { langId, setNumber, words, ...meta, createdAt: Date.now(), updatedAt: Date.now() },
    { merge: true }
  );
}

// The tutor's transcript, one per language + unit + mode. Kept apart from the
// lesson doc because the tutor is reachable without running a session, and
// apart per mode so teaching and quizzing never bleed into each other.
const tutorChatId = (langId, unitIndex, mode) => `${langId}_u${unitIndex}_${mode}`;

async function dbGetTutorChat(langId, unitIndex, mode) {
  const col = userCol('langTutorChat');
  if (!col) return [];
  const snap = await col.doc(tutorChatId(langId, unitIndex, mode)).get();
  return snap.exists ? (snap.data().messages || []) : [];
}

async function dbPutTutorChat(langId, unitIndex, mode, messages) {
  const col = userCol('langTutorChat');
  if (!col) return;
  await col.doc(tutorChatId(langId, unitIndex, mode)).set(
    { langId, unitIndex, mode, messages: messages.slice(-60), updatedAt: Date.now() },
    { merge: true }
  );
}

// Rewrites a stored set with only the words that belong to the language's own
// script. The repair for sets written before the generator checked — a set of
// English words filed under Urdu is corrected in place rather than merely
// hidden, so the deck, the quiz and the count all agree with the view.
async function dbScrubVocabSet(langId, setNumber, words) {
  const col = userCol('vocabSets');
  if (!col) return;
  await col.doc(`${langId}_set_${setNumber}`).set(
    { words, updatedAt: Date.now(), scriptScrubbed: true }, { merge: true });
}

// Every set ever generated, newest first — the Saved tab reads back through
// them so nothing a learner has studied is ever out of reach.
async function dbGetAllVocabSets(langId) {
  const col = userCol('vocabSets');
  if (!col) return [];
  try {
    const snap = await col.where('langId', '==', langId).get();
    return snap.docs.map(d => d.data()).sort((a, b) => (b.setNumber || 0) - (a.setNumber || 0));
  } catch (err) {
    console.warn('Vocab set history read failed:', err.message);
    return [];
  }
}

// A word the learner has told us they already know should not come back as a
// card. Rewrites only the batches that actually held it.
async function dbRemoveLangCardsByFront(langId, front) {
  const target = String(front).trim();
  if (!target) return 0;
  let removed = 0;
  let total = 0;
  for (const batch of await dbGetLangCardBatches(langId)) {
    const had = (batch.flashcards || []).length;
    const kept = (batch.flashcards || []).filter(c => String(c.front).trim() !== target);
    total += kept.length;
    if (kept.length === had) continue;
    removed += had - kept.length;
    await dbPutLangCardBatch(langId, batch.batch, kept);
  }
  // The new total was counted on the way through. Re-reading every batch a
  // second time just to add them up was a whole extra round trip for a number
  // we already had.
  if (removed) await dbPatchLanguage(langId, { cardCount: total }).catch(() => {});
  return removed;
}

// A word swapped for a harder one: the old card out, the new card in. One read
// of the deck instead of two, and no window in between where the deck holds
// neither. Done as two separate calls it was seven round trips, and running
// them in parallel corrupted the deck — both read every batch, so the second
// one's read predated the first one's write and silently undid it.
async function dbReplaceLangCard(langId, oldFront, newCard) {
  const target = String(oldFront).trim();
  const batches = await dbGetLangCardBatches(langId);

  let placed = false;
  let total = 0;
  const writes = [];
  for (const batch of batches) {
    const had = batch.flashcards || [];
    // The replacement takes the departing card's place, so a swap does not
    // shuffle the deck order under someone mid-review.
    const next = had.map(c => {
      if (placed || String(c.front).trim() !== target) return c;
      placed = true;
      return newCard;
    });
    total += next.length;
    if (next.some((c, i) => c !== had[i])) writes.push([batch.batch, next]);
  }

  if (!placed) {
    // Nothing to replace — the word was never in the deck. Add it rather than
    // dropping it, so the deck still gains the word the learner just met.
    await dbAppendLangCards(langId, [newCard]);
    return false;
  }
  for (const [n, cards] of writes) await dbPutLangCardBatch(langId, n, cards);
  await dbPatchLanguage(langId, { cardCount: total }).catch(() => {});
  return true;
}

// The root track keeps ONE set — the corpus. Anything left over from when it
// was handed out six words at a time is stale by definition, and would show the
// same roots again under a second heading in Saved vocab.
async function dbDropVocabSetsAbove(langId, keepSetNumber = 0) {
  const col = userCol('vocabSets');
  if (!col) return 0;
  const snap = await col.where('langId', '==', langId).get();
  const stale = snap.docs.filter(d => (d.data().setNumber || 0) !== keepSetNumber);
  for (let i = 0; i < stale.length; i += 400) {
    const batch = firestoreDB.batch();
    stale.slice(i, i + 400).forEach(d => batch.delete(d.ref));
    await batch.commit();
  }
  return stale.length;
}

// Remove a vocabulary track outright: the language document, every vocab set
// ever saved under it, and every flashcard batch it filed. Used by the Qur'anic
// cleanup below, which is the only thing that should ever want it — a learner
// removing a language is a different, gentler operation.
async function dbDropDocsFor(collection, langId) {
  const col = userCol(collection);
  if (!col) return 0;
  try {
    const snap = await col.where('langId', '==', langId).get();
    for (let i = 0; i < snap.docs.length; i += 400) {
      const batch = firestoreDB.batch();
      snap.docs.slice(i, i + 400).forEach(d => batch.delete(d.ref));
      await batch.commit();
    }
    return snap.docs.length;
  } catch (err) {
    console.warn(`Could not clear ${collection} for ${langId}:`, err.message);
    return 0;
  }
}

async function dbDeleteLanguageEntirely(langId) {
  const sets = await dbDropDocsFor('vocabSets', langId);
  const cards = await dbDropDocsFor('langCards', langId);
  try {
    const col = userCol('languages');
    if (col) await col.doc(langId).delete();
  } catch (err) {
    console.warn(`Could not delete language ${langId}:`, err.message);
  }
  return { sets, cards };
}

// ── FOUNDATION DECK ──────────────────────────────────────────────────────────
// Eight frequency bands built in parallel at onboarding. Only band 1 is due
// straight away — the rest are held with a far-future due date so the learner
// isn't buried under 400 cards on day one. "Learn more now" releases the next
// band on demand, so the staging is a default, never a limit.
const FOUNDATION_BANDS = 8;
const FOUNDATION_BAND_SIZE = 50;
const HELD_UNTIL = 4102444800000; // 2100 — effectively "not yet introduced"

async function buildFoundationDeck(profile) {
  const nonLatin = profile.script !== 'latin';

  // Non-Latin languages get the first script unit alongside the vocabulary —
  // the writing system has to enter the deck at the same time, or the
  // foundation words are unreadable.
  const jobs = Array.from({ length: FOUNDATION_BANDS }, (_, i) =>
    callFoundationDeck(profile, i + 1, FOUNDATION_BAND_SIZE).catch(err => {
      console.warn(`Foundation band ${i + 1} failed:`, err.message);
      return [];
    })
  );
  if (nonLatin) {
    jobs.push(callScriptUnitGenerator(profile, 1, []).catch(err => {
      console.warn('Script unit failed:', err.message);
      return [];
    }));
  }

  const cards = (await Promise.all(jobs)).flat();

  // Every band failed — fall back to the old seed deck rather than leave the
  // learner with nothing.
  if (!cards.length) return await callSeedDeckGenerator(profile, 'A0');

  // Script cards and band 1 are due now; later bands wait their turn.
  return cards.map(c => (!c.band || c.band === 1) ? c : { ...c, nextDueDate: HELD_UNTIL });
}

// Pull the next held band forward. No cap on how often this can be pressed.
async function releaseNextBand(lang) {
  const next = (lang.bandsReleased || 1) + 1;
  if (next > FOUNDATION_BANDS) return 0;

  const batches = await dbGetLangCardBatches(lang.id);
  let released = 0;
  for (const b of batches) {
    let touched = false;
    const cards = (b.flashcards || []).map(c => {
      if (c.band === next && c.nextDueDate === HELD_UNTIL) {
        touched = true; released += 1;
        const { nextDueDate, ...rest } = c;
        return rest;
      }
      return c;
    });
    if (touched) await dbPutLangCardBatch(lang.id, b.batch, cards);
  }
  lang.bandsReleased = next;
  await dbPatchLanguage(lang.id, { bandsReleased: next });
  return released;
}

// langLessons/{langId}_{key} — one generated lesson per key, cached so
// reopening replays the same content (cost control). The key used to be the
// calendar date, which capped the learner at one lesson per day no matter how
// much time they had. It is now `unit_{n}` — progression is by curriculum
// position, so a learner can run as many units in a sitting as they like.
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function unitKey(unitIndex) {
  return `unit_${unitIndex}`;
}

// Bump whenever the SHAPE of a generated lesson changes — a new field the
// renderer depends on, a reworked prompt. Cached lessons stamped below this
// are thrown away and regenerated, so improvements to teaching actually reach
// learners instead of being masked by yesterday's cache.
//   1 — original lesson shape
//   2 — Quranic root lessons gain rootMeaning, formTable, principle,
//       derivation and summary
//   3 — Quranic Arabic rebuilt on the eight-unit syllabus: the old 20-unit
//       ladder is gone, so every lesson cached against it must be regenerated
//   4 — every lesson still cached was written by Gemini. Rebuild them all on
//       DeepSeek, with thinking on, which is the one call that gets it.
//   5 — Quranic lessons were written under a rule that preferred famous short
//       surahs, so their examples all come from the same handful of verses.
//       The rule now opens the whole muṣḥaf; the cached lessons have to go.
//   6 — the teaching section was capped at "3-5 sentences" and is now allowed
//       to run as long as the structure needs. Every cached lesson is a short
//       one written under the old cap.
const LESSON_SCHEMA_VERSION = 8;

// Generated content is stamped with the schema it was written for AND the
// provider that wrote it. Switching the app from DeepSeek to ChatGPT is a
// request for ITS work, not merely its future work — so everything the other
// one wrote is stale and gets asked for again, lesson by lesson and root by
// root, as you reach it. Nothing is regenerated up front; you pay for a lesson
// when you open it.
//
// There is ONE cached copy per lesson, not one per provider: the new version
// replaces the old at the same key. So switching back and forth rewrites each
// time rather than restoring an earlier copy. That is the honest trade — two
// copies of everything to make a rare switch cheap is not worth the storage,
// and a rebuild is what switching provider is asking for anyway.
function generationStamp() {
  return { schemaVersion: LESSON_SCHEMA_VERSION, provider: activeProvider() };
}

function isCurrentGeneration(doc) {
  if (!doc) return false;
  if ((doc.schemaVersion || 0) < LESSON_SCHEMA_VERSION) return false;
  // Documents written before the stamp existed carry no provider. They were
  // all DeepSeek's, which is what the app ran on at the time.
  return (doc.provider || 'deepseek') === activeProvider();
}

async function dbGetLangLesson(langId, key) {
  const col = userCol('langLessons');
  if (!col) return null;
  const snap = await col.doc(`${langId}_${key}`).get();
  const data = snap.exists ? snap.data() : null;
  return data && isCurrentGeneration(data) ? data : null;
}

async function dbPutLangLesson(langId, key, lesson) {
  const col = userCol('langLessons');
  if (!col) return;
  await col.doc(`${langId}_${key}`).set(
    { ...lesson, ...generationStamp(), langId, lessonKey: key, updatedAt: Date.now() },
    { merge: true });
}

// langSyllabus/{langId} — the grammar ladder for a language, generated ONCE by
// the Instructor at first use and cached forever. This is the spine of the
// course: the ordered list of structures the learner works through.
async function dbGetSyllabus(langId) {
  const col = userCol('langSyllabus');
  if (!col) return null;
  const snap = await col.doc(langId).get();
  const data = snap.exists ? snap.data() : null;
  return data && isCurrentGeneration(data) ? data : null;
}

async function dbPutSyllabus(langId, units) {
  const col = userCol('langSyllabus');
  if (!col) return;
  await col.doc(langId).set(
    { langId, units, ...generationStamp(), updatedAt: Date.now() },
    { merge: true }
  );
}

// langGloss/{langId} — a word→meaning cache shared by every tap-a-word lookup,
// so the same word is never paid for twice. Capped so the doc stays small.
const GLOSS_CACHE_MAX = 500;

async function dbGetGlossCache(langId) {
  const col = userCol('langGloss');
  if (!col) return {};
  try {
    const snap = await col.doc(langId).get();
    return snap.exists ? (snap.data().words || {}) : {};
  } catch (err) {
    console.warn('Gloss cache read failed:', err.message);
    return {};
  }
}

async function dbPutGlossCache(langId, words) {
  const col = userCol('langGloss');
  if (!col) return;
  const entries = Object.entries(words).slice(-GLOSS_CACHE_MAX);
  await col.doc(langId).set({ langId, words: Object.fromEntries(entries), updatedAt: Date.now() }, { merge: true });
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

// ── PAGE MARKERS ──────────────────────────────────────────────────────────────
// To show accurate page numbers in the reader we must remember which PDF page
// each piece of text came from. PDF.js gives us page-by-page text, but chapter
// splitting and paragraph grouping would otherwise erase page boundaries. So at
// extraction we insert a sentinel line at each page break, which travels with
// the text through every transform. The reader parses it back out; every other
// consumer (AI prompts, quoting, word counts) strips it first.
// The sentinel contains a lowercase run so it can never be mistaken for an
// ALL-CAPS chapter heading, and the literal "@@@pgbrk:" never occurs in prose.
// "4:12" / "1:04:12" → seconds, for deep-linking into a video
function timeToSeconds(stamp) {
  if (!stamp) return 0;
  const parts = String(stamp).split(':').map(n => parseInt(n, 10));
  if (parts.some(isNaN)) return 0;
  return parts.reduce((total, n) => total * 60 + n, 0);
}

// Interleaves the sentinel lines that let any later passage be traced back to
// its moment in the video — the same trick page extraction uses for pages.
function markedVideoText(passages) {
  return (passages || [])
    .map(p => (p.time ? `${timeMarkerLine(p.time)}\n` : '') + p.text)
    .join('\n\n');
}

function videoTimeUrl(videoId, stamp) {
  const secs = timeToSeconds(stamp);
  return `https://www.youtube.com/watch?v=${videoId}${secs ? `&t=${secs}s` : ''}`;
}

// Where in the video was this said? Finds the passage in the chapter's marked
// text and walks back to the nearest preceding time sentinel. Used wherever the
// app cites the source — tutor quotes, checkpoint evidence, consolidation notes
// — so a citation points at the moment it came from, not just the lesson.
function timeForQuote(quote, chapter) {
  const raw = chapter?._chapterTextRaw || chapter?.text || '';
  if (!raw || !quote) return null;

  // Match on a distinctive slice, ignoring whitespace and the quote marks the
  // model tends to add. Falls back to progressively shorter probes because a
  // quote is often lightly reworded at the edges.
  const norm = (s) => String(s).replace(/[“”"'’‘]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  const haystackRaw = raw;
  const haystack = norm(raw);
  const needleFull = norm(quote);
  if (!needleFull) return null;

  let idx = -1;
  for (const len of [needleFull.length, 60, 40, 25]) {
    const probe = needleFull.slice(0, Math.min(len, needleFull.length));
    if (probe.length < 12) break;
    idx = haystack.indexOf(probe);
    if (idx !== -1) break;
  }
  if (idx === -1) return null;

  // Map the normalised offset back to the raw string, then take the last time
  // marker before it.
  let rawIdx = 0, normCount = 0;
  while (rawIdx < haystackRaw.length && normCount < idx) {
    const ch = haystackRaw[rawIdx];
    if (!/[“”"'’‘]/.test(ch)) {
      if (/\s/.test(ch)) {
        if (normCount > 0 && haystack[normCount - 1] !== ' ') normCount++;
      } else normCount++;
    }
    rawIdx++;
  }

  const before = haystackRaw.slice(0, rawIdx);
  const marks = [...before.matchAll(/@@@vtime:([\d:]+)@@@/g)];
  return marks.length ? marks[marks.length - 1][1] : null;
}

// Walks the rendered text of a tutor reply and tags every quoted passage with
// the moment it was said. Text nodes only — attributes and markup are never
// touched, so this can't corrupt the rendered HTML.
function annotateVideoQuotes(el, chapter = AppState.selectedChapter, book = AppState.selectedBook) {
  if (!el || book?.sourceType !== 'video') return;
  const videoId = chapter?.videoId || book?.videoIds?.[0];
  if (!videoId) return;

  const QUOTE_RE = /[“"']([^“”"']{25,400})[”"']/g;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const targets = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement.closest('.video-cite')) continue;
    if (QUOTE_RE.test(node.nodeValue)) targets.push(node);
    QUOTE_RE.lastIndex = 0;
  }

  targets.forEach(textNode => {
    const text = textNode.nodeValue;
    const frag = document.createDocumentFragment();
    let last = 0;
    QUOTE_RE.lastIndex = 0;
    let m;
    while ((m = QUOTE_RE.exec(text)) !== null) {
      const stamp = timeForQuote(m[1], chapter);
      if (!stamp) continue;
      frag.appendChild(document.createTextNode(text.slice(last, m.index + m[0].length)));
      const a = document.createElement('a');
      a.className = 'video-cite';
      a.href = videoTimeUrl(videoId, stamp);
      a.target = '_blank';
      a.rel = 'noopener';
      a.title = 'Watch this moment in the video';
      a.textContent = `🎬 ${stamp}`;
      frag.appendChild(a);
      last = m.index + m[0].length;
    }
    if (!last) return;                       // nothing resolved — leave as-is
    frag.appendChild(document.createTextNode(text.slice(last)));
    textNode.parentNode.replaceChild(frag, textNode);
  });
}

// A citation chip: the timestamp, linked to that moment. Returns '' for
// anything that isn't a video book, so callers can drop it in unconditionally.
function videoCiteHtml(quote, chapter = AppState.selectedChapter, book = AppState.selectedBook) {
  if (book?.sourceType !== 'video') return '';
  const videoId = chapter?.videoId || book?.videoIds?.[0];
  if (!videoId) return '';
  const stamp = timeForQuote(quote, chapter) || chapter?.startTime;
  if (!stamp) return '';
  return `<a class="video-cite" href="${videoTimeUrl(videoId, stamp)}" target="_blank" rel="noopener"
    title="Watch this moment in the video">🎬 ${stamp}</a>`;
}

const PAGE_MARK_LINE_RE = /^@@@pgbrk:(\d+)@@@$/;
const PAGE_MARK_STRIP_RE = /@@@pgbrk:\d+@@@/g;

// The same sentinel trick, for video lessons: where a PDF chapter records which
// page a paragraph came from, a video chapter records the moment in the video it
// was spoken. Planted at ingest, carried through splitting, stripped before the
// text ever reaches the AI or a word count — so any passage can be traced back
// to its timestamp without the marker leaking into what the learner reads.
const TIME_MARK_LINE_RE = /^@@@vtime:([\d:]+)@@@$/;
const TIME_MARK_STRIP_RE = /@@@vtime:[\d:]+@@@/g;

function pageMarkerLine(pageNum) {
  return `@@@pgbrk:${pageNum}@@@`;
}

function timeMarkerLine(stamp) {
  return `@@@vtime:${stamp}@@@`;
}

// Remove all sentinels — used everywhere text is shown to the AI or counted
function stripPageMarkers(text) {
  return (text || '').replace(PAGE_MARK_STRIP_RE, '').replace(TIME_MARK_STRIP_RE, '');
}

// Detect the offset between the PDF's page index and the number actually
// printed in the book (front matter, roman-numeral prefaces etc. push these
// apart). Every real page prints `pdfIndex + offset`, so that offset gets a
// vote from nearly every page while stray numbers in body text scatter — the
// true offset wins by a landslide. Only trusted when the win is decisive.
function detectPageOffset(perPageNumbers, totalPages) {
  const votes = new Map();
  perPageNumbers.forEach((nums, i) => {
    const pdfPage = i + 1;
    const seen = new Set();
    nums.forEach(n => {
      const off = n - pdfPage;
      if (off <= -totalPages || off >= totalPages || seen.has(off)) return;
      seen.add(off);
      votes.set(off, (votes.get(off) || 0) + 1);
    });
  });
  let best = 0, bestCount = 0;
  votes.forEach((count, off) => { if (count > bestCount) { bestCount = count; best = off; } });
  const confident = bestCount >= Math.max(12, Math.round(totalPages * 0.35));
  return { offset: confident ? best : 0, confident };
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
  let lastPageLine = null; // most recent page sentinel, to seed the next chapter

  for (const line of lines) {
    const t = line.trim();
    if (PAGE_MARK_LINE_RE.test(t)) {
      lastPageLine = t;
      currentLines.push(line);
      continue;
    }
    if (isHeading(line)) {
      if (currentTitle !== null) {
        chapters.push({ title: currentTitle, text: currentLines.join('\n').trim() });
      }
      currentTitle = line.trim();
      // A heading sits mid-page, so seed the new chapter with the page it
      // starts on — otherwise its opening paragraphs would have no page number.
      currentLines = lastPageLine ? [lastPageLine] : [];
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
// the line ends a sentence. Returns paragraphs plus a parallel `pages` array —
// pages[i] is the PDF page paragraph i started on (null if unknown), read from
// the page sentinels planted at extraction.
function groupLinesIntoParagraphs(text) {
  const lines = text.split('\n');
  const paras = [];
  const pages = [];
  const times = [];
  let cur = [];
  let curPage = null;   // page the in-progress paragraph started on
  let pageNow = null;   // most recent page sentinel seen
  let curTime = null;   // video moment the in-progress paragraph started at
  let timeNow = null;   // most recent time sentinel seen

  const flush = () => {
    if (cur.length) {
      paras.push(cur.join(' ')); pages.push(curPage); times.push(curTime);
      cur = []; curPage = null; curTime = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    const pm = line.match(PAGE_MARK_LINE_RE);
    if (pm) { pageNow = parseInt(pm[1], 10); continue; } // sentinel: record, don't render
    const tm = line.match(TIME_MARK_LINE_RE);
    if (tm) { timeNow = tm[1]; continue; }
    if (!line) { flush(); continue; }
    if (!cur.length) { curPage = pageNow; curTime = timeNow; } // paragraph begins here
    cur.push(line);
    const joined = cur.join(' ');
    if (joined.length > 350 && /[.!?"'”’]$/.test(line)) {
      paras.push(joined); pages.push(curPage); times.push(curTime);
      cur = []; curPage = null; curTime = null;
    }
  }
  flush();

  // Forward/back-fill any stray nulls so every paragraph carries one:
  // interior gaps inherit the previous value, leading gaps the first known one.
  const fill = (arr) => {
    let lastKnown = null;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == null) arr[i] = lastKnown;
      else lastKnown = arr[i];
    }
    const firstKnown = arr.find(v => v != null) ?? null;
    for (let i = 0; i < arr.length && arr[i] == null; i++) arr[i] = firstKnown;
  };
  fill(pages);
  fill(times);

  // Oversized paragraphs get re-split by sentence; each chunk keeps its page/time
  const MAX_PARA_WORDS = 250;
  const outParas = [];
  const outPages = [];
  const outTimes = [];
  for (let i = 0; i < paras.length; i++) {
    const p = paras[i];
    if (p.split(/\s+/).length > MAX_PARA_WORDS) {
      splitLongParagraphBySentences(p, MAX_PARA_WORDS).forEach(c => {
        outParas.push(c); outPages.push(pages[i]); outTimes.push(times[i]);
      });
    } else {
      outParas.push(p); outPages.push(pages[i]); outTimes.push(times[i]);
    }
  }
  return { paragraphs: outParas, pages: outPages, times: outTimes };
}

function splitChapterIntoSegments(rawText) {
  const TARGET_WORDS = 1200;
  const { paragraphs: paras, pages, times } = groupLinesIntoParagraphs(rawText);

  const segments = [];
  let curParas = [];
  let curPages = [];
  let curTimes = [];
  let curWords = 0;

  for (let i = 0; i < paras.length; i++) {
    const p = paras[i];
    curParas.push(p);
    curPages.push(pages[i]);
    curTimes.push(times[i]);
    curWords += p.split(/\s+/).length;
    if (curWords >= TARGET_WORDS) {
      segments.push({ paragraphs: curParas, pages: curPages, times: curTimes, wordCount: curWords });
      curParas = [];
      curPages = [];
      curTimes = [];
      curWords = 0;
    }
  }
  if (curParas.length) {
    // A tiny tail reads better merged into the previous segment
    if (segments.length && curWords < TARGET_WORDS * 0.3) {
      const last = segments[segments.length - 1];
      last.paragraphs.push(...curParas);
      last.pages.push(...curPages);
      last.times.push(...curTimes);
      last.wordCount += curWords;
    } else {
      segments.push({ paragraphs: curParas, pages: curPages, times: curTimes, wordCount: curWords });
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
      ? `<blockquote class="cp-quote">“${result.sourceQuote}”${videoCiteHtml(result.sourceQuote)}</blockquote>`
      : '';
    const verdictHtml = `
      <div class="cp-verdict cp-gap">${result.feedback}${quote}</div>
    `;
    this.renderQuestion(card, state, verdictHtml);
  },

  showReveal(card, state, result) {
    const quote = result.sourceQuote
      ? `<blockquote class="cp-quote">“${result.sourceQuote}”${videoCiteHtml(result.sourceQuote)}</blockquote>`
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
      mixedUp.map(m => `<span class="recall-memo">${m.note}${m.quote ? `<blockquote class="cp-quote">“${m.quote}”${videoCiteHtml(m.quote, chapter)}</blockquote>` : ''}</span>`));

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
// Demo twin of callLanguageProfiler. Neither is wired to the UI any more — the
// catalogue supplies hand-written profiles — but both are kept for the day a
// language needs profiling that nobody has written a profile for yet.
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
  // Runs here too, not only in the Vocabulary Builder: a course hidden by the
  // old shared id should come back the moment you look at your courses.
  const all = await removeQuranLessonDeck(
    await cleanUpQuranVocabTracks(await dbGetAllLanguages()));

  // The Qur'anic text is 1.4MB and a lesson cannot start writing until it has
  // loaded, because the verses go INTO the prompt. Fetching it the moment the
  // courses appear takes that off the front of the first lesson — by the time
  // one is opened it is already in memory, and if it isn't, loadQuranText
  // returns the same in-flight promise rather than fetching it twice.
  if (all.some(l => getRecipe(l).ui?.staticSyllabus === 'QURAN_GRAMMAR')) {
    loadQuranText().catch(() => {});
  }

  // Vocabulary-builder entries are not courses — they have no session to start
  // and live in their own view, so they stay off this grid.
  const languages = all.filter(l => getRecipe(l).id !== 'vocabBuilder');

  // Keep the reader's "Add to vocab" harvest target fresh
  AppState._harvestLang = languages.find(l => getRecipe(l).id === 'vocabExpand') || null;

  // Due counts need each language's card batches — fetch them all in parallel
  // rather than one-language-at-a-time, so the grid isn't gated on serial reads.
  const dueCounts = await Promise.all(languages.map(async (lang) => {
    try {
      const batches = await dbGetLangCardBatches(lang.id);
      let due = 0;
      batches.forEach(b => (b.flashcards || []).forEach(c => { if (isCardDue(c)) due++; }));
      return due;
    } catch (_) { return 0; /* card count is decorative — never block the view */ }
  }));

  // Roots are learned in the Vocabulary Builder now, on its own document — so
  // the course card's coverage meter reads them from there rather than from
  // itself, and studying roots still visibly moves the course forward.
  const rootTrack = all.find(l => l.id === QURAN_VOCAB_ID);

  // Passing through here is enough to get a course's finished lessons into the
  // deck — you should not have to reopen a lesson to make its cards appear.
  languages.forEach(l => {
    if (getRecipe(l).ui?.staticSyllabus === 'QURAN_GRAMMAR') {
      backfillLessonCards(l, quranGrammarUnits()).catch(() => {});
    }
  });

  languages.forEach((lang, li) => {
    const due = dueCounts[li];
    const recipe = getRecipe(lang);
    const coverageHtml = recipe.ui?.coverageMeter ? (() => {
      const roots = [...new Set([...(lang.rootsLearned || []), ...(rootTrack?.rootsLearned || [])])];
      const pct = (quranCoverage(roots) * 100).toFixed(1);
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
      ${recipe.ui?.syllabus ? `
        <div class="lang-unit-line">
          <span class="lang-unit-label">Lesson ${(lang.unitIndex || 0) + 1}${(lang.unitsMastered || []).length ? ` · ${(lang.unitsMastered || []).length} done` : ''}</span>
        </div>` : ''}
      <button class="btn btn-primary lang-card-cta">${isLessonCourse(recipe) ? 'Continue course →' : "Start today's session →"}</button>
    `;
    // A recipe with no strands is not a session — it is a lesson you read, and
    // it opens the lesson page. One button: a course you are part-way through
    // has exactly one obvious next action, and it is to carry on from where you
    // stopped. The tutor and the lessons list live inside the lesson itself.
    card.querySelector('.lang-card-cta').addEventListener('click', () =>
      isLessonCourse(recipe) ? LessonView.open(lang) : LangSession.start(lang));

    // Foundation deck: pull the next held frequency band forward on demand.
    if (recipe.id === 'fresh' && (lang.bandsReleased || 0) > 0 && lang.bandsReleased < FOUNDATION_BANDS) {
      const moreBtn = document.createElement('button');
      moreBtn.className = 'btn btn-ghost lang-script-btn';
      moreBtn.textContent = 'Learn more words now →';
      moreBtn.addEventListener('click', async () => {
        moreBtn.disabled = true;
        moreBtn.textContent = 'Releasing…';
        try {
          const n = await releaseNextBand(lang);
          showToast(n ? `${n} more words are now in your deck.` : 'No more words to release.', 'success');
          await renderLanguages();
        } catch (err) {
          showToast('Could not release more words: ' + err.message, 'error');
          moreBtn.disabled = false;
          moreBtn.textContent = 'Learn more words now →';
        }
      });
      card.appendChild(moreBtn);
    }

    // Script bootcamp: pulls the next unit of a writing system into the deck
    // (kana rows, letter groups, hanzi by frequency). Fades out past A1 — except
    // for `literacy`, where the script IS the course. A lesson-page course keeps
    // one button, so its script work belongs inside its lessons instead.
    if (lang.script && lang.script !== 'latin' && !isLessonCourse(recipe)
        && (['A0', 'A1'].includes(lang.level) || recipe.id === 'literacy')) {
      const scriptBtn = document.createElement('button');
      scriptBtn.className = 'btn btn-ghost lang-script-btn';
      scriptBtn.textContent = `Script bootcamp · unit ${(lang.scriptUnit || 0) + 1} →`;
      scriptBtn.addEventListener('click', () => startScriptUnit(lang, scriptBtn));
      card.appendChild(scriptBtn);
    }
    const delBtn = document.createElement('button');
    delBtn.className = 'card-delete-btn';
    delBtn.title = 'Delete this language';
    delBtn.setAttribute('aria-label', `Delete ${lang.name}`);
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', (e) => { e.stopPropagation(); deleteLanguageFlow(lang); });
    card.appendChild(delBtn);

    grid.insertBefore(card, document.getElementById('btn-add-language'));
  });

  renderTrashSection('languages');
}

// ── SESSION PLAYER ────────────────────────────────────────────────────────────
// One overlay, one activity at a time, run by two tutors: the Instructor
// (grammar → drill) states and tests the rule, the Companion (story → converse
// → shadow) makes it usable. Progression is per unit and uncapped — finishing
// one offers the next immediately.

// Demo syllabus — a real Spanish ladder, enough units to exercise progression.
function demoSyllabus(lang) {
  const base = [
    { title: 'Naming things', structure: 'ser + noun ("soy / eres / es")', whyItMatters: 'Say who and what things are.', level: 'A0' },
    { title: 'This and that', structure: 'Articles and gender: el / la / un / una', whyItMatters: 'Every noun needs one; getting it right shapes everything else.', level: 'A0' },
    { title: 'Doing things now', structure: 'Regular present tense: -ar / -er / -ir endings', whyItMatters: 'The workhorse tense — most of what you say lives here.', level: 'A1' },
    { title: 'Saying no, and asking', structure: 'Negation with "no" + question word order', whyItMatters: 'Turns statements into a conversation.', level: 'A1' },
    { title: 'Talking about yesterday', structure: 'Preterite: completed past actions', whyItMatters: 'Tell someone what happened.', level: 'A2' },
    { title: 'What used to happen', structure: 'Imperfect: habitual and background past', whyItMatters: 'The other past tense — Spanish needs both.', level: 'A2' },
    { title: 'What comes next', structure: 'ir a + infinitive for the near future', whyItMatters: 'Make plans out loud.', level: 'A2' }
  ];
  return base.map((u, i) => ({ id: `demo-u${i + 1}`, ...u }));
}

// ── THE SYLLABUS, A SLICE AT A TIME ──────────────────────────────────────────
// Opening a course used to mean waiting for all forty units to be written
// before a single word appeared — 82 seconds, measured, and a spinner for
// every one of them. Now the first eight arrive in about six seconds and the
// course opens on them, while the remaining thirty-two are written behind the
// learner and appear as they land.
//
// This is shared by both readers of a syllabus, so they can never disagree
// about how one is built.
async function loadCourseSyllabus(lang) {
  // Quranic Arabic's syllabus is hand-written rather than generated: its
  // topics are settled and ordered the same way in every serious curriculum,
  // so a fixed ladder beats asking the model to invent one each time.
  if (getRecipe(lang).ui?.staticSyllabus === 'QURAN_GRAMMAR') return quranGrammarUnits();

  // A syllabus written by the previous provider is rebuilt, not served —
  // same version stamp the lessons use.
  const cached = await dbGetSyllabus(lang.id);
  if (cached?.units?.length && (cached.schemaVersion || 0) >= LESSON_SCHEMA_VERSION) {
    // A course closed while its later units were still being written picks up
    // where it stopped instead of being stuck at eight lessons forever.
    if (cached.units.length < SYLLABUS_TOTAL) extendSyllabus(lang, cached.units);
    return cached.units;
  }

  if (AppState.mode === 'demo') {
    const units = demoSyllabus(lang);
    await dbPutSyllabus(lang.id, units);
    return units;
  }

  const first = await callSyllabusArchitect(lang, lang.level || 'A0',
    { from: 1, count: SYLLABUS_CHUNK });
  await dbPutSyllabus(lang.id, first);
  extendSyllabus(lang, first);          // deliberately not awaited
  return first;
}

// The rest of the course, written a slice at a time behind the learner. Each
// slice is saved the moment it lands, so leaving mid-way costs one slice
// rather than the whole course. One fill per language at a time.
const _syllabusFills = {};

function extendSyllabus(lang, units) {
  if (_syllabusFills[lang.id] || AppState.mode === 'demo') return;
  _syllabusFills[lang.id] = (async () => {
    let all = [...units];
    try {
      while (all.length < SYLLABUS_TOTAL) {
        const more = await callSyllabusArchitect(lang, lang.level || 'A0', {
          from: all.length + 1,
          count: Math.min(SYLLABUS_CHUNK, SYLLABUS_TOTAL - all.length),
          prior: all
        });
        if (!more.length) break;        // nothing came back; stop rather than spin
        all = [...all, ...more];
        await dbPutSyllabus(lang.id, all);
        // If the learner is reading this course right now, the lesson count and
        // the end-of-course button correct themselves as the course grows.
        if (LessonView.lang?.id === lang.id) LessonView.syllabusGrew(all);
      }
    } catch (err) {
      // A course of eight real lessons is a working course. Failing to write
      // unit 23 is not a reason to take the first eight away from anyone.
      console.warn(`Syllabus fill stopped at ${all.length} units:`, err.message);
    } finally {
      delete _syllabusFills[lang.id];
    }
  })();
}

function demoGrammarUnit(unit) {
  if (!unit) return null;
  return {
    explanation: `In Spanish, **${unit.structure}** works differently from English. The ending of the verb already tells you who is doing it, which is why Spanish can drop the word for "I" or "you" entirely — *hablo* on its own means "I speak".`,
    patternTable: {
      caption: 'The endings',
      rows: [
        { form: 'yo', example: 'hablo', gloss: 'I speak' },
        { form: 'tú', example: 'hablas', gloss: 'you speak' },
        { form: 'él / ella', example: 'habla', gloss: 'he / she speaks' },
        { form: 'nosotros', example: 'hablamos', gloss: 'we speak' }
      ]
    },
    examples: [
      { text: 'Hablo español todos los días.', gloss: 'I speak Spanish every day.', wordGlosses: [{ word: 'Hablo', gloss: 'I speak' }, { word: 'español', gloss: 'Spanish' }, { word: 'días', gloss: 'days' }] },
      { text: '¿Hablas inglés?', gloss: 'Do you speak English?', wordGlosses: [{ word: 'Hablas', gloss: 'you speak' }, { word: 'inglés', gloss: 'English' }] },
      { text: 'María trabaja en casa.', gloss: 'María works at home.', wordGlosses: [{ word: 'trabaja', gloss: 'works' }, { word: 'casa', gloss: 'house, home' }] }
    ],
    pitfall: 'English speakers keep saying "yo hablo" every time. Spanish only adds "yo" for emphasis or contrast — the ending already carries it.',
    drills: [
      { kind: 'cloze', prompt: 'Yo ___ español. (hablar)', answer: 'hablo', options: [], hint: 'The "yo" ending is -o.' },
      { kind: 'build', prompt: 'Put these in order:', answer: 'María trabaja en casa', options: ['en', 'María', 'casa', 'trabaja'], hint: 'Subject, then verb, then where.' },
      { kind: 'translate', prompt: 'Say in Spanish: "We speak Spanish."', answer: 'Hablamos español', options: [], hint: 'The "nosotros" ending is -amos.' },
      { kind: 'transform', prompt: 'Make this a question: "Tú hablas inglés."', answer: '¿Hablas inglés?', options: [], hint: 'Drop the pronoun and add question marks.' }
    ]
  };
}

function demoFoundationDeck(profile, band) {
  if (profile.script && profile.script !== 'latin') {
    const rows = [
      ['わたしは がくせいです。', 'I am a student.', 'わたし', 'watashi wa gakusei desu'],
      ['ほんは どこですか。', 'Where is the book?', 'ほん', 'hon wa doko desu ka'],
      ['ねこが すきです。', 'I like cats.', 'ねこ', 'neko ga suki desu'],
      ['みずを ください。', 'Water, please.', 'みず', 'mizu o kudasai'],
      ['きょうは いそがしい。', "Today I'm busy.", 'きょう', 'kyō wa isogashii'],
      ['また あした。', 'See you tomorrow.', 'あした', 'mata ashita']
    ];
    return rows.map(([front, back, word, romanization]) => ({
      front, back, word, romanization, type: 'vocab', band
    }));
  }
  const rows = [
    ['Yo soy estudiante.', 'I am a student.', 'ser'],
    ['¿Dónde está el libro?', 'Where is the book?', 'estar'],
    ['Tengo dos hermanos.', 'I have two brothers.', 'tener'],
    ['Ella va a casa.', 'She goes home.', 'ir'],
    ['Quiero un café.', 'I want a coffee.', 'querer'],
    ['No puedo hoy.', "I can't today.", 'poder']
  ];
  return rows.map(([front, back, word]) => ({
    front, back, word, romanization: null, type: 'vocab', band
  }));
}

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

// Demo content for a Quranic grammar unit — Form II, the unit that most
// repays being taught properly, since it looks inconsistent until it isn't.
// Demo grammar units. Hand-written for the units a demo learner meets first;
// everything else is shaped from the unit's OWN `structure` so demo mode never
// shows one unit's content under another unit's heading — which is exactly what
// this function used to do, being pinned to Form II whatever was open.
const DEMO_QURAN_UNITS = {
  'q-find-root': {
    explanation: `Nearly every word in the Qur'an is **three letters** with extras stuck on the front and the back. Learn to peel the extras off and the word tells you what it means. The extras come from a short, fixed list — الْ ، وَ ، فَ ، بِ ، لِ on the front, and ـهُ ، ـهُمْ ، ـِينَ ، ـُونَ on the back — so once you know them you stop being surprised.`,
    patternTable: {
      caption: 'Peel it back to three letters',
      rows: [
        { form: 'الْمُسْلِمُونَ', example: 'الْ + مُ + سلم + ونَ', gloss: 'root س ل م — "those who submit"' },
        { form: 'وَالْكِتَابِ', example: 'وَ + الْ + كتب + ِ', gloss: 'root ك ت ب — "and the Book"' },
        { form: 'يَعْلَمُونَ', example: 'يَ + علم + ونَ', gloss: 'root ع ل م — "they know"' }
      ]
    },
    examples: [
      { text: 'إِنَّ الْمُسْلِمِينَ وَالْمُسْلِمَاتِ', romanization: 'inna l-muslimīna wa-l-muslimāt',
        gloss: 'Indeed the submitting men and the submitting women (33:35)',
        wordGlosses: [{ word: 'الْمُسْلِمِينَ', gloss: 'strip الْ and ـِينَ → س ل م' },
                      { word: 'الْمُسْلِمَاتِ', gloss: 'same root, feminine plural ـَاتِ' }] },
      { text: 'وَاللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ', romanization: 'wa-llāhu yaʿlamu wa-antum lā taʿlamūn',
        gloss: 'Allah knows, and you do not know. (2:216)',
        wordGlosses: [{ word: 'يَعْلَمُ', gloss: 'يَ is a prefix → ع ل م' },
                      { word: 'تَعْلَمُونَ', gloss: 'تَ and ـُونَ are extras → ع ل م' }] }
    ],
    pitfall: 'The commonest mistake is treating a long word as a new word. It almost never is — it is a root you already know, wearing three or four extras.',
    drills: [
      { kind: 'cloze', prompt: 'Strip الْمَكْتُوب back to its three letters: ___',
        answer: 'ك ت ب', options: [], hint: 'الْ and مَ are both extras.' },
      { kind: 'translate', prompt: 'الْعَالَمِينَ — what are the three letters, and what do they mean?',
        answer: 'ع ل م — knowing', options: [], hint: 'Take off الْ at the front and ـِينَ at the back.' },
      { kind: 'transform', prompt: 'Find the root of وَيَنصُرُونَ.',
        answer: 'ن ص ر — helping', options: [], hint: 'وَ and يَ on the front, ـُونَ on the back.' }
    ]
  },
  'q-attached-pronouns': {
    explanation: `A word that ends in **ـهُ ، ـهُمْ ، ـكَ ، ـنَا ، ـِي** has a pronoun glued to it. On a noun it means "his / their / your / our / my"; on a verb it means "him / them / you / us / me". Eight endings, and they are everywhere.`,
    patternTable: {
      caption: 'The whole set',
      rows: [
        { form: 'ـهُ / ـهَا', example: 'رَبُّهُ · رَبُّهَا', gloss: 'his Lord · her Lord' },
        { form: 'ـهُمْ', example: 'رَبُّهُمْ', gloss: 'their Lord' },
        { form: 'ـكَ / ـكُمْ', example: 'رَبُّكَ · رَبُّكُمْ', gloss: 'your Lord (one · many)' },
        { form: 'ـنَا / ـِي', example: 'رَبُّنَا · رَبِّي', gloss: 'our Lord · my Lord' }
      ]
    },
    examples: [
      { text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', romanization: 'iyyāka naʿbudu wa-iyyāka nastaʿīn',
        gloss: 'You alone we worship, and You alone we ask for help. (1:5)',
        wordGlosses: [{ word: 'إِيَّاكَ', gloss: 'ـكَ = You (the one being worshipped)' }] },
      { text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً', romanization: 'rabbanā ātinā fī d-dunyā ḥasana',
        gloss: 'Our Lord, give us good in this world (2:201)',
        wordGlosses: [{ word: 'رَبَّنَا', gloss: 'ـنَا on a noun = our' },
                      { word: 'آتِنَا', gloss: 'ـنَا on a verb = us' }] }
    ],
    pitfall: 'The same ـنَا means "our" on a noun and "us" on a verb. Look at what it is attached to, not at the ending alone.',
    drills: [
      { kind: 'cloze', prompt: 'رَبُّ means "Lord". "Their Lord" is رَبُّ___',
        answer: 'هُمْ', options: [], hint: 'The ending for "their".' },
      { kind: 'translate', prompt: 'What does كِتَابُهُ mean?',
        answer: 'his book', options: [], hint: 'كتاب = book; ـهُ = his.' },
      { kind: 'transform', prompt: 'نَصَرَ means "he helped". What does نَصَرَهُمْ mean?',
        answer: 'he helped them', options: [], hint: 'On a verb the ending is the object.' }
    ]
  },
  'q-idafa': {
    explanation: `Two nouns next to each other, with nothing between them, means **"the X of the Y"**. The first noun loses its الْ; the second takes a kasrah (ـِ). That is the whole rule, and some of the most repeated phrases in the Qur'an are built on it.`,
    patternTable: {
      caption: 'Two nouns, one idea',
      rows: [
        { form: 'رَبُّ + الْعَالَمِينَ', example: 'رَبُّ الْعَالَمِينَ', gloss: 'Lord of the worlds' },
        { form: 'يَوْمُ + الدِّينُ', example: 'يَوْمِ الدِّينِ', gloss: 'the Day of Judgement' },
        { form: 'كِتَابُ + اللَّهُ', example: 'كِتَابِ اللَّهِ', gloss: 'the Book of Allah' }
      ]
    },
    examples: [
      { text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', romanization: 'al-ḥamdu lillāhi rabbi l-ʿālamīn',
        gloss: 'All praise is for Allah, Lord of the worlds. (1:2)',
        wordGlosses: [{ word: 'رَبِّ', gloss: 'first noun — no الْ' },
                      { word: 'الْعَالَمِينَ', gloss: 'second noun — "of the worlds"' }] },
      { text: 'مَالِكِ يَوْمِ الدِّينِ', romanization: 'māliki yawmi d-dīn',
        gloss: 'Master of the Day of Judgement (1:4)',
        wordGlosses: [{ word: 'مَالِكِ', gloss: 'Master OF…' },
                      { word: 'يَوْمِ', gloss: '…the Day OF… (a second pair inside the first)' }] }
    ],
    pitfall: 'If the first noun still has الْ on it, it is not a possession pair — it is a noun and its description. The missing الْ is the tell.',
    drills: [
      { kind: 'translate', prompt: 'What does بَيْتُ اللَّهِ mean?',
        answer: 'the House of Allah', options: [], hint: 'Two nouns side by side.' },
      { kind: 'cloze', prompt: 'In رَسُولُ اللَّهِ, which word carries the kasrah? ___',
        answer: 'اللَّهِ', options: [], hint: 'Always the second one.' },
      { kind: 'transform', prompt: 'Is الْكِتَابُ الْكَرِيمُ a possession pair? Why or why not?',
        answer: 'No — both have الْ, so it is a noun and its description', options: [],
        hint: 'Check the first word for الْ.' }
    ]
  }
};

function demoQuranGrammarUnit(unit) {
  if (!unit) return null;
  if (DEMO_QURAN_UNITS[unit.id]) return DEMO_QURAN_UNITS[unit.id];

  // Shaped from the unit itself, so demo mode is always about the right topic.
  // The verses are al-Fātiḥah, which every unit of this course can be pointed at
  // — so even a unit with no hand-written demo content still gets a real table
  // and real examples rather than a single lonely row.
  return {
    explanation: unit.structure,
    patternTable: {
      caption: unit.title,
      rows: [
        { form: 'In the opening', example: 'بِسْمِ اللَّهِ', gloss: 'in the name of Allah (1:1)' },
        { form: 'In the praise', example: 'الْحَمْدُ لِلَّهِ', gloss: 'all praise is for Allah (1:2)' },
        { form: 'In the request', example: 'اهْدِنَا الصِّرَاطَ', gloss: 'guide us to the path (1:6)' }
      ]
    },
    examples: [
      { text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', romanization: 'bismi llāhi r-raḥmāni r-raḥīm',
        gloss: 'In the name of Allah, the Most Merciful, the Especially Merciful. (1:1)',
        wordGlosses: [{ word: 'بِسْمِ', gloss: 'in the name of' }, { word: 'اللَّهِ', gloss: 'Allah' }] },
      { text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', romanization: 'al-ḥamdu lillāhi rabbi l-ʿālamīn',
        gloss: 'All praise is for Allah, Lord of the worlds. (1:2)',
        wordGlosses: [{ word: 'الْحَمْدُ', gloss: 'the praise' }, { word: 'رَبِّ', gloss: 'Lord of' }] },
      { text: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', romanization: 'iyyāka naʿbudu wa-iyyāka nastaʿīn',
        gloss: 'You alone we worship, and You alone we ask for help. (1:5)',
        wordGlosses: [{ word: 'إِيَّاكَ', gloss: 'You alone' }, { word: 'نَعْبُدُ', gloss: 'we worship' }] }
    ],
    pitfall: unit.whyItMatters,
    drills: [
      { kind: 'translate', prompt: `In one line: what is "${unit.title}" about?`,
        answer: unit.structure, options: [], hint: unit.whyItMatters }
    ]
  };
}

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

// ── VOCABULARY BUILDER ───────────────────────────────────────────────────────
// A standalone surface, not a course strand: pick a language, get words that
// make you more articulate, meet each one inside the sentence that makes its
// meaning felt, then prove you own them in the Quiz tab.
//
// English is offered first and needs no setup at all — for most users this is
// their own language, where the goal is expression rather than comprehension.
// The others are chosen from a fixed list, never typed: see VOCAB_CATALOGUE.
//
// Words become `precision` cards in the shared SM-2 deck, so the Flashcards tab
// keeps reviewing them long after the set is closed. Quranic Arabic is the
// exception — its words are ROOTS drawn from curated data rather than picked by
// the model, and they become `root` cards.

const ENGLISH_PROFILE = {
  id: 'en', name: 'English', nativeName: 'English', code: 'en', ttsLangCode: 'en-GB',
  script: 'latin', scriptName: 'Latin alphabet', romanizationName: null,
  notes: 'Vocabulary building for expression, not comprehension.'
};

const URDU_PROFILE = {
  id: 'ur', name: 'Urdu', nativeName: 'اردو', code: 'ur', ttsLangCode: 'ur-PK',
  script: 'arabic', scriptName: 'Nastaliq (Perso-Arabic)', romanizationName: 'Roman Urdu',
  notes: 'Precise Urdu words, in Nastaliq, with the pronunciation written out for you.'
};

// The vocabulary side of Quranic Arabic. Item one of the syllabus: 300 root
// words with their commonest Quranic forms.
//
// Its id is deliberately NOT the course's. dbPutLanguage merges, so sharing
// `ar-quran` meant adding this merged `recipeId: 'vocabBuilder'` onto the
// COURSE document — and renderLanguages filters vocabBuilder entries out, so
// the course silently vanished from the grid with its progress stranded.
const QURAN_VOCAB_ID = 'ar-quran-roots';
const QURAN_VOCAB_PROFILE = {
  id: QURAN_VOCAB_ID, name: 'Quranic Arabic', nativeName: 'العربية الفصحى',
  code: 'ar-quran', ttsLangCode: 'ar-SA',
  script: 'arabic', scriptName: 'Arabic script', romanizationName: 'transliteration',
  notes: 'The 300 roots the Qur\'an is built from, in five sets of sixty, each with the words it grows and a verse to meet them in.'
};

// Chosen from, never typed. Same reasoning as LANGUAGE_CATALOGUE: a language is
// here because something was actually built for it.
const VOCAB_CATALOGUE = [
  { profile: ENGLISH_PROFILE,     blurb: 'Words that make you precise — the ones an articulate speaker reaches for.' },
  { profile: URDU_PROFILE,        blurb: 'Precise Urdu, in script, with pronunciation and an example sentence.' },
  { profile: QURAN_VOCAB_PROFILE, blurb: '300 roots in five sets of sixty, each with the real Quranic words built from it.' }
];

// The root-vocabulary track is driven by curated data rather than the model.
const isQuranVocab = (lang) => lang?.id === QURAN_VOCAB_ID;

// The other half: the 28-lesson Qur'anic course, on the Languages side. It is
// identified by its syllabus rather than its id, because the id has moved once
// already and the syllabus is what actually makes it that course.
const isQuranCourse = (lang) =>
  !!lang && getRecipe(lang).ui?.staticSyllabus === 'QURAN_GRAMMAR';

// ── THE EIGHT-UNIT COURSE BECOMES FORTY ──────────────────────────────────────
// The old course had eight units and the new one has forty, so a learner who
// had finished five of eight is not five-fortieths of the way through the new
// one — they are past whichever new lessons cover the same ground.
//
// Four of the eight ids survive unchanged because the lesson still exists under
// the same name. The other four were split or merged, and each maps to the new
// lesson that now teaches it. Progress can only ever be preserved by this, never
// invented: a unit that has no successor is simply dropped.
// ── THE COURSE WAS REBUILT AROUND THE LEARNER'S OWN SESSION ──────────────────
// Twice now. The eight-unit course became forty grammar lessons (v7), and those
// forty became twenty-eight morphology-first ones derived from his real ChatGPT
// transcript (v8). Every id changed in the second move, because the subjects
// changed — not renamed, reconceived.
//
// So there is very little to carry. Four subjects survive recognisably, and
// those are mapped; everything else has no successor and is dropped rather than
// guessed at. Crediting someone with a lesson they never read is worse than
// asking them to read a better one.
const QURAN_UNIT_MOVES = {
  // v7 → v8. The root lesson and the forms lesson are the only two whose
  // subject genuinely survives intact.
  'q-find-root':       'root-lemma-wordform',
  'q-forms-1-2-3':     'forms-in-english',
  'q-participles':     'noun-patterns',
  'q-sentence-types':  'nominal-and-verbal',
  'q-case-endings':    'just-enough-irab',
  'q-particles':       'the-40-particles',

  // v6 → v8, for anyone who never opened the app during v7.
  'q-attached-pronouns': 'root-lemma-wordform'
};

function migrateQuranProgress(lang, syllabus) {
  if (!lang || lang.recipeId !== 'quranic' || lang.unitsMigratedV8) return null;
  const valid = new Set(syllabus.map(u => u.id));
  const had = lang.unitsMastered || [];
  const moved = had
    .map(id => QURAN_UNIT_MOVES[id] || id)
    .filter(id => valid.has(id));

  const mastered = [...new Set(moved)];
  // THE FIRST lesson they have not done — not the one after the furthest.
  //
  // Those differ badly here. The old course and this one disagree about order,
  // so a mapped lesson can land late: someone credited with the old particles
  // lesson gets lesson 22 of the new course, and resuming "after the furthest"
  // would drop them at 23 — past the entire patterns unit, which is the heart
  // of this course and which they have never seen. Resuming at the first gap
  // credits what they did without skipping what they did not.
  const firstGap = syllabus.findIndex(u => !mastered.includes(u.id));
  const lastDone = firstGap === -1 ? syllabus.length - 1 : firstGap - 1;
  const dropped = had.length - mastered.length;
  if (dropped > 0) {
    // Said out loud rather than swallowed. Someone who had finished a dozen
    // lessons and now shows four is owed an explanation, and the console is
    // where the one person who can act on it will look.
    console.log(`${lang.id}: the course was rebuilt around a different sequence, so ` +
      `${dropped} of ${had.length} finished lesson(s) have no equivalent and were dropped. ` +
      `${mastered.length} carried across; resuming at lesson ${lastDone + 2}.`);
  }
  return {
    unitsMastered: mastered,
    unitIndex: Math.max(0, Math.min(lastDone + 1, syllabus.length - 1)),
    unitsMigratedV8: true
  };
}

// ONE QUR'ANIC VOCABULARY TRACK, AND IT IS THE ROOTS.
//
// Two of them accumulated. The roots track is `ar-quran-roots`; the other is a
// leftover from before the ids were separated, when adding Quranic vocabulary
// merged `recipeId: 'vocabBuilder'` onto the COURSE document under `ar-quran`.
// That leftover then behaved like an ordinary vocabulary track and generated
// ordinary Arabic words six at a time — words that have nothing to do with the
// root list and were never meant to be a second Quranic section.
//
// So it goes, with the words it generated, and the course id it was squatting
// on is handed back to the course. The roots track is untouched.
async function cleanUpQuranVocabTracks(languages) {
  const strays = languages.filter(l =>
    l.id !== QURAN_VOCAB_ID &&
    l.recipeId === 'vocabBuilder' &&
    // Matched on the name too, not just the id: what he is looking at is a
    // second entry reading "Quranic Arabic" in the vocabulary dropdown, and an
    // old track could be filed under an id that does not say so.
    (l.id === 'ar-quran' || l.code === 'ar-quran' ||
     /quran/i.test(l.id) || /qur.?an/i.test(l.name || '')));
  if (!strays.length) return languages;

  const gone = new Set();
  for (const stray of strays) {
    try {
      if (stray.id === 'ar-quran') {
        // The course lives on this document, so it is not deleted — only its
        // vocabulary half is. The words it generated go, and the recipe goes
        // back to being the course.
        const sets = await dbDropDocsFor('vocabSets', stray.id);
        console.log(`Removed the second Quranic vocabulary section (${sets} saved set(s)).`);
        await dbPatchLanguage('ar-quran', { recipeId: 'quranic', vocabSet: 0, knownWords: [] });
        gone.add(stray.id);
      } else {
        const { sets } = await dbDeleteLanguageEntirely(stray.id);
        console.log(`Removed the second Quranic vocabulary section ${stray.id} (${sets} saved set(s)).`);
        gone.add(stray.id);
      }
    } catch (err) {
      console.warn(`Could not remove the stray Quranic vocabulary track ${stray.id}:`, err.message);
    }
  }

  return languages
    .filter(l => !gone.has(l.id))
    .concat(strays.filter(l => l.id === 'ar-quran' && gone.has(l.id))
      .map(l => ({ ...l, recipeId: 'quranic', vocabSet: 0, knownWords: [] })));
}

// The Qur'anic course's flashcards are removed once, for good.
//
// Flashcards listed Qur'anic Arabic twice — (L) for the course and (V) for the
// roots — two entries under one name where only one was ever wanted. The roots
// are the deck. This drops what the course had already filed; backfillLessonCards
// stops it being refilled.
//
// A hard purge rather than the 30-day bin: the point is that it stops being on
// screen, and the bin would leave it there under "Recently deleted decks". The
// cards were only ever derived from quran-course-data.js, so nothing written by
// hand is lost, and the course itself — lessons, progress, tutor — is untouched.
async function removeQuranLessonDeck(languages) {
  const course = languages.find(l => isQuranCourse(l) && !l.lessonDeckRemoved);
  if (!course) return languages;

  try {
    await dbPurgeDeck(course.id);
    await dbPatchLanguage(course.id, {
      lessonDeckRemoved: true,
      // So the backfill has nothing left to think about either.
      lessonCardsVersion: LESSON_CARDS_VERSION
    });
    console.log(`Removed the ${course.name} (L) flashcard deck — the roots deck is the Qur'anic deck now.`);
  } catch (err) {
    console.warn('Could not remove the Quranic lesson deck:', err.message);
    return languages;
  }

  return languages.map(l => l.id === course.id
    ? { ...l, lessonDeckRemoved: true, lessonCardsVersion: LESSON_CARDS_VERSION,
        cardCount: 0, deckDeletedAt: undefined }
    : l);
}

// ── THE QUR'ANIC TEXT ────────────────────────────────────────────────────────
// quran-text.js is a megabyte and only the Quranic course wants it, so it is
// fetched the first time something asks. A script tag rather than fetch(),
// because index.html is meant to open straight off disk and file:// blocks
// fetch — see the "no build step" promise in the project notes.
let _quranTextPromise = null;

function loadQuranText() {
  if (typeof QURAN_TEXT !== 'undefined') return Promise.resolve(QURAN_TEXT);
  if (_quranTextPromise) return _quranTextPromise;
  _quranTextPromise = new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = 'quran-text.js';
    el.onload = () => resolve(typeof QURAN_TEXT !== 'undefined' ? QURAN_TEXT : null);
    el.onerror = () => {
      _quranTextPromise = null;
      reject(new Error('Could not load the Qur\'anic text.'));
    };
    document.head.appendChild(el);
  });
  return _quranTextPromise;
}

function quranSurahName(num) {
  const row = (typeof QURAN_SURAHS !== 'undefined' ? QURAN_SURAHS : []).find(s => s[0] === num);
  return row ? `Sūrat ${row[1]}` : `Surah ${num}`;
}

// A spread of real verses for the tutor to quote from. Sampling uniformly over
// all 6,236 ayat is itself the right distribution — most of the Qur'an is in the
// long and middle surahs, so that is where most of the sample lands, without
// anyone having to weight it. One verse per surah, so a dozen candidates come
// from a dozen different places.
//
// The length window is pedagogical: under four words there is nothing to break
// down, over twenty and a beginner drowns before the point is made.
function pickQuranVerses(count = 12, { exclude = [], minWords = 4, maxWords = 20 } = {}) {
  if (typeof QURAN_TEXT === 'undefined') return [];
  const keys = Object.keys(QURAN_TEXT);
  const skip = new Set(exclude);
  const surahsUsed = new Set();
  const out = [];

  for (let tries = 0; out.length < count && tries < count * 400; tries++) {
    const ref = keys[Math.floor(Math.random() * keys.length)];
    if (skip.has(ref)) continue;
    const surah = parseInt(ref, 10);
    if (surahsUsed.has(surah)) continue;
    const text = QURAN_TEXT[ref];
    const words = text.split(/\s+/).length;
    if (words < minWords || words > maxWords) continue;
    surahsUsed.add(surah);
    skip.add(ref);
    out.push({ ref, text, surah: quranSurahName(surah) });
  }
  return out;
}

// Verses already quoted, so a fresh sample never repeats one. Matches the
// tutor's own citation format.
function versesInHistory(history = []) {
  const refs = [];
  for (const m of history) {
    for (const [, s, a] of String(m.content || '').matchAll(/\b(\d{1,3}):(\d{1,3})\b/g)) {
      if (+s >= 1 && +s <= 114) refs.push(`${+s}:${+a}`);
    }
  }
  return refs;
}

// ── THE FULL ROOT DECK ───────────────────────────────────────────────────────
// Every entry in QURAN_SEQUENCE as a flashcard, in one go. The learn tab still
// walks six at a time — that is reading, and it is unchanged — but the deck
// holds the whole corpus from the moment the track is added, because a root
// list is a reference you revise, not something to be handed out in instalments.
//
// The only per-root work is the lemmas, so that is what's batched: fifteen
// roots per call, every batch in flight at once, and any root already in the
// lemma cache is never asked for again. All 305 arrive due immediately.
async function buildQuranRootDeck(lang, onProgress = () => {}) {
  const entries = QURAN_SEQUENCE;

  // Nothing to fetch and nothing to generate: every root carries its verified
  // family in quran-roots-data.js, so the whole deck is built from data that is
  // already in the page. It used to cost twenty model calls and a cache.
  //
  // What is left is the writing, and that is what the progress now tracks —
  // cards land in chunks and the bar moves as each one is filed, rather than
  // sitting still until all 300 are in.
  onProgress(0, entries.length);

  // Cards the deck doesn't already hold. Re-running tops up rather than doubles.
  const have = new Set();
  for (const batch of await dbGetLangCardBatches(lang.id)) {
    for (const c of batch.flashcards || []) if (c.rootId) have.add(c.rootId);
  }

  const cards = entries.filter(e => !have.has(e.id)).map(e => ({
    // A real Quranic word on the front, not the three root letters. The root
    // goes on the back with the family — the list is where roots are read.
    front: e.headword || e.root,
    back: e.gloss,
    word: e.headword || e.root,
    root: e.root,
    romanization: e.translit,
    headwordGloss: e.headwordGloss || '',
    verse: e.verse || null,
    type: 'root',
    rootId: e.id,
    quranCount: e.count,
    lemmas: (e.family || []).map(f => ({ word: f.word, meaning: f.gloss }))
  }));

  // Already-held roots count as done, so a top-up run does not restart the bar
  // from zero for cards it is not going to write.
  const already = entries.length - cards.length;
  onProgress(already, entries.length);
  if (cards.length) {
    await dbAppendLangCards(lang.id, cards,
      (written) => onProgress(Math.min(already + written, entries.length), entries.length));
  }

  lang.rootDeckSeeded = true;
  lang.rootDeckCount = entries.length;
  await dbPatchLanguage(lang.id, { rootDeckSeeded: true, rootDeckCount: entries.length });
  return cards.length;
}

// ── RECOVERING LOST COURSE PROGRESS ──────────────────────────────────────────
// A course document that was reset — re-added after going missing from the grid
// — loses unitIndex and unitsMastered. The tutor transcripts do not: they live
// in their own collection, one document per lesson, and every unit the learner
// mastered has a "[MASTERED: …]" tag sitting in its teach transcript.
//
// So the progress is recoverable, and this rebuilds it. Runs once per language,
// only when the stored progress is emptier than the transcripts say it should
// be — it can only ever restore mastery, never take it away.
async function recoverLangProgress(lang, syllabus) {
  if (!lang || !syllabus?.length || lang.progressRecovered) return lang;
  const col = userCol('langTutorChat');
  if (!col) return lang;

  let docs = [];
  try {
    const snap = await col.where('langId', '==', lang.id).get();
    docs = snap.docs.map(d => d.data());
  } catch (err) {
    console.warn('Could not read tutor transcripts for recovery:', err.message);
    return lang;
  }

  const mastered = new Set(lang.unitsMastered || []);
  const before = mastered.size;
  for (const doc of docs) {
    if (doc.mode !== 'teach') continue;
    const tagged = (doc.messages || []).some(m =>
      m.role !== 'user' && /\[MASTERED:/i.test(String(m.content || '')));
    if (!tagged) continue;
    const unit = syllabus[doc.unitIndex];
    if (unit?.id) mastered.add(unit.id);
  }

  if (mastered.size === before) {
    // Nothing to restore, but record that we looked so we don't look again
    lang.progressRecovered = true;
    dbPatchLanguage(lang.id, { progressRecovered: true }).catch(() => {});
    return lang;
  }

  // The furthest lesson they finished, plus one — the lesson they were on.
  const lastDone = syllabus.reduce((n, u, i) => mastered.has(u.id) ? i : n, -1);
  lang.unitsMastered = syllabus.filter(u => mastered.has(u.id)).map(u => u.id);
  lang.unitIndex = Math.max(lang.unitIndex || 0, Math.min(lastDone + 1, syllabus.length - 1));
  lang.progressRecovered = true;

  try {
    await dbPatchLanguage(lang.id, {
      unitsMastered: lang.unitsMastered,
      unitIndex: lang.unitIndex,
      progressRecovered: true
    });
    const found = mastered.size - before;
    console.log(`Recovered ${found} mastered lesson(s) for ${lang.name} from the tutor transcripts.`);
    showToast(`Found ${found} lesson${found === 1 ? '' : 's'} you had already finished — your ${lang.name} progress is back.`,
      'success', 6000);
  } catch (err) {
    console.warn('Progress recovery save failed:', err.message);
  }
  return lang;
}

// ── LESSONS ALREADY READ, TURNED INTO CARDS ──────────────────────────────────
// Lessons file cards as you finish them, but a learner part-way through a
// course read those lessons before that was true — so their course deck is
// empty and the course shows up nowhere in Flashcards. This fills it in from
// the lessons already cached: no generation, no API calls, just what is on disk
// for the units they have finished. Runs once per language.
const LESSON_CARDS_VERSION = 1;

async function backfillLessonCards(lang, syllabus) {
  if (!lang || !syllabus?.length) return 0;
  // The Qur'anic course has no flashcard deck of its own any more. Its roots
  // are the deck — one Qur'anic entry in Flashcards, not two under one name —
  // and its lessons are read in the course, where the rule, the summary and the
  // traps are already written out. Other courses still file their cards.
  if (isQuranCourse(lang)) return 0;
  if ((lang.lessonCardsVersion || 0) >= LESSON_CARDS_VERSION) return 0;

  const done = new Set(lang.unitsMastered || []);
  if (!done.size) {
    // Nothing read yet — nothing to backfill, and nothing to come back for.
    lang.lessonCardsVersion = LESSON_CARDS_VERSION;
    dbPatchLanguage(lang.id, { lessonCardsVersion: LESSON_CARDS_VERSION }).catch(() => {});
    return 0;
  }

  const have = new Set();
  try {
    for (const batch of await dbGetLangCardBatches(lang.id)) {
      for (const c of batch.flashcards || []) have.add(String(c.front).trim());
    }
  } catch (err) {
    console.warn('Could not read the deck to backfill it:', err.message);
    return 0;
  }

  const cards = [];
  await Promise.all(syllabus.map(async (unit, i) => {
    if (!done.has(unit.id)) return;
    // A written-out course has its examples in the shipped data; a generated one
    // has them in the cached lesson document. Reading only the latter meant the
    // Quranic course stopped filing cards the moment it stopped generating.
    const written = typeof quranLesson === 'function' &&
      getRecipe(lang).ui?.staticSyllabus === 'QURAN_GRAMMAR'
        ? quranLesson(unit.id) : null;
    let lesson = null;
    if (!written) {
      try { lesson = await dbGetLangLesson(lang.id, unitKey(i)); } catch (_) { return; }
    }

    const rows = [];
    if (unit.structure) rows.push({ front: unit.title, back: unit.structure, word: '' });
    const examples = written
      ? written.examples.map(ex => ({ text: ex.arabic, gloss: ex.smooth, romanization: null }))
      : (lesson?.grammar?.examples || []);
    for (const ex of examples.slice(0, 4)) {
      if (ex.text && ex.gloss) {
        rows.push({ front: ex.text, back: ex.gloss, word: ex.text,
                    romanization: ex.romanization || null });
      }
    }
    for (const r of rows) {
      if (have.has(String(r.front).trim())) continue;
      have.add(String(r.front).trim());
      cards.push({ romanization: null, ...r, type: 'grammar', unitId: unit.id });
    }
  }));

  if (cards.length) {
    try {
      await dbAppendLangCards(lang.id, cards);
      console.log(`Backfilled ${cards.length} card(s) from lessons already read in ${lang.name}.`);
      showToast(`${cards.length} cards from your ${lang.name} lessons are now in your deck.`,
        'success', 5000);
    } catch (err) {
      console.warn('Lesson card backfill failed:', err.message);
      return 0;
    }
  }

  lang.lessonCardsVersion = LESSON_CARDS_VERSION;
  dbPatchLanguage(lang.id, { lessonCardsVersion: LESSON_CARDS_VERSION }).catch(() => {});
  return cards.length;
}

// Checked before its own script, so kanji doesn't get read as Chinese and
// Hangul doesn't get read as CJK.
const SCRIPT_DETECT_ORDER = ['arabic', 'hebrew', 'devanagari', 'cyrillic', 'greek',
  'thai', 'hangul', 'kana-kanji', 'cjk'];

// The whole script guard rests on the language knowing what it is written in.
// A profile saved before that field existed — or one that fell back to 'latin'
// — would wave English through under Urdu, which is exactly the bug. The
// language's own name, written in itself, settles it for free.
function ensureLangScript(lang) {
  if (!lang || (lang.script && lang.script !== 'latin' && SCRIPT_RANGES[lang.script])) return lang;
  const native = lang?.nativeName || '';
  if (!native) return lang;
  for (const script of SCRIPT_DETECT_ORDER) {
    if (!new RegExp(`[${SCRIPT_RANGES[script]}]`).test(native)) continue;
    lang.script = script;
    dbPutLanguage(lang).catch(err => console.warn('Script backfill failed:', err.message));
    break;
  }
  return lang;
}

// A set that came back in the wrong script is corrected wherever it was
// recorded — the set itself, and the learned-words list that feeds the
// generator's BANNED list. Deliberately fire-and-forget: tidying history must
// never block or break the view being drawn.
function repairVocabSet(lang, set, good) {
  const keep = new Set(good);
  const dropped = (set.words || []).filter(w => !keep.has(w)).map(w => String(w.word || '').trim());
  if (!dropped.length) return;
  console.warn(`Vocab: dropping ${dropped.length} word(s) not in ${lang.scriptName || lang.script} from ${lang.name} set ${set.setNumber}: ${dropped.join(', ')}`);

  if (set.setNumber != null) {
    dbScrubVocabSet(lang.id, set.setNumber, good)
      .catch(err => console.warn('Vocab set scrub failed:', err.message));
  }

  const bad = new Set(dropped.map(w => w.toLowerCase()));
  const known = lang.knownWords || [];
  const kept = known.filter(w => !bad.has(String(w).trim().toLowerCase()));
  if (kept.length !== known.length) {
    lang.knownWords = kept;
    dbPutLanguage(lang).catch(err => console.warn('Language scrub failed:', err.message));
  }
}

const VocabBuilder = {
  lang: null,
  langs: [],
  tab: 'learn',
  words: [],           // the set currently on screen
  setNumber: 0,
  quiz: null,

  async open() {
    let all = await dbGetAllLanguages().catch(() => []);
    all = await removeQuranLessonDeck(await cleanUpQuranVocabTracks(all));
    this.langs = all.filter(l => getRecipe(l).id === 'vocabBuilder').map(ensureLangScript);

    // First visit: English is ready to go with no setup at all.
    if (!this.langs.length) {
      this.lang = { ...ENGLISH_PROFILE, recipeId: 'vocabBuilder', tier: 'articulate',
        level: 'B2', knownWords: [], vocabSet: 0, quizStats: { asked: 0, correct: 0 } };
      this.langs = [this.lang];
    } else {
      this.lang = this.langs.find(l => l.id === this.lang?.id) || this.langs[0];
    }

    this.renderControls();
    this.renderTab();
  },

  renderControls() {
    const sel = document.getElementById('vocab-lang-select');
    if (!sel) return;
    sel.innerHTML = this.langs.map(l =>
      `<option value="${l.id}"${l.id === this.lang.id ? ' selected' : ''}>${l.name}</option>`).join('');
    const tier = document.getElementById('vocab-tier-select');
    if (tier) tier.value = this.lang.tier || 'articulate';

    // Tier and theme steer the model's choice of word. Quranic roots come from
    // a fixed frequency list instead, so neither control means anything there.
    const quranic = isQuranVocab(this.lang);
    const theme = document.getElementById('vocab-theme');
    if (tier) tier.style.display = quranic ? 'none' : '';
    if (theme) theme.style.display = quranic ? 'none' : '';

    // Nothing left to add once every catalogue language is in
    const addBtn = document.getElementById('btn-vocab-add-lang');
    if (addBtn) addBtn.style.display = this.availableToAdd().length ? '' : 'none';
  },

  // Catalogue entries not already in the learner's list
  availableToAdd() {
    return VOCAB_CATALOGUE.filter(e => !this.langs.some(l => l.id === e.profile.id));
  },

  togglePicker() {
    const picker = document.getElementById('vocab-picker');
    if (!picker) return;
    if (picker.style.display !== 'none') { picker.style.display = 'none'; return; }

    const available = this.availableToAdd();
    if (!available.length) {
      showToast('Every language we build vocabulary for is already in your list.', 'info', 3500);
      return;
    }

    picker.innerHTML = available.map((e, i) => `
      <button class="vocab-picker-card" data-vocab-cat="${i}" type="button">
        <span class="vocab-picker-native">${escapeAttr(e.profile.nativeName)}</span>
        <span class="vocab-picker-name">${escapeAttr(e.profile.name)}</span>
        <span class="vocab-picker-desc">${escapeAttr(e.blurb)}</span>
      </button>`).join('');
    picker.style.display = 'flex';

    picker.querySelectorAll('[data-vocab-cat]').forEach(btn => {
      btn.addEventListener('click', () => this.addFromCatalogue(available[parseInt(btn.dataset.vocabCat)]));
    });
  },

  async addFromCatalogue(entry) {
    const picker = document.getElementById('vocab-picker');
    if (picker) picker.style.display = 'none';

    const lang = {
      ...entry.profile, recipeId: 'vocabBuilder', tier: 'articulate', level: 'B2',
      knownWords: [], vocabSet: 0, wordsLearned: 0,
      quizStats: { asked: 0, correct: 0 }, createdAt: Date.now()
    };
    try {
      await dbPutLanguage(lang);
      this.langs.push(lang);
      this.lang = lang;
      this.words = [];
      this.quiz = null;
      this.renderControls();
      this.renderTab();
      showToast(`${lang.name} added to your vocabulary.`, 'success');
      // The root track ships with its whole deck rather than an empty one.
      if (isQuranVocab(lang)) this.seedRootDeck();
    } catch (err) {
      showToast('Could not add that language: ' + err.message, 'error', 6000);
    }
  },

  // Build the full root deck, with the learn panel standing in as the progress
  // bar. Runs once per track; the banner in renderLearn is the way back in if
  // it was interrupted.
  async seedRootDeck() {
    const lang = this.lang;
    if (this._seeding) return;
    this._seeding = true;

    // The progress replaces the offer strip, not the list — the learner should
    // still be able to read the roots while their deck is being built.
    //
    // Found by attribute, and on whichever tab the list is showing in: the root
    // table lives in Saved vocab now, so looking for an id on the Learn tab
    // meant the bar never appeared at all.
    const paint = (done, total) => {
      const strip = document.querySelector('[data-root-deck-offer]');
      if (!strip || this.lang.id !== lang.id) return;
      strip.innerHTML = `
        <span class="root-deck-offer-text">Adding them to your flashcards — ${done} of ${total}. This runs once.</span>
        <div class="seed-progress"><div class="seed-progress-fill" style="width:${Math.round(done / total * 100)}%"></div></div>`;
    };

    paint(0, QURAN_SEQUENCE.length);
    try {
      const added = await buildQuranRootDeck(lang, paint);
      showToast(added
        ? `${added} root cards are in your deck and due now.`
        : 'Your root deck is already complete.', 'success', 4000);
    } catch (err) {
      showToast('Could not build the root deck: ' + err.message, 'error', 6000);
    } finally {
      this._seeding = false;
      if (this.lang.id === lang.id) this.renderTab();
    }
  },

  switchTab(tab) {
    this.tab = tab;
    document.querySelectorAll('.vocab-tab').forEach(b =>
      b.classList.toggle('active', b.dataset.tab === tab));
    ['learn', 'quiz', 'saved'].forEach(t => {
      const el = document.getElementById(`vocab-panel-${t}`);
      if (el) el.style.display = tab === t ? 'block' : 'none';
    });
    this.renderTab();
  },

  renderTab() {
    if (this.tab === 'learn') this.renderLearn();
    else if (this.tab === 'saved') this.renderSaved();
    else this.renderQuiz();
  },

  // ── SAVED SETS ──
  // Every set ever generated, kept so a learner can go back over old words on
  // their own terms rather than only meeting them again through the deck.
  async renderSaved() {
    const panel = document.getElementById('vocab-panel-saved');
    if (!panel) return;

    panel.innerHTML = `<div class="cp-loading" style="justify-content:center; padding:2.5rem 0;">
      <span class="cp-spinner"></span> Loading your vocab…</div>`;

    // One entry per language, holding everything ever learned in it. The words
    // matter to a learner; which batch they arrived in does not.
    const byLang = [];
    for (const lang of this.langs) {
      // The 300 roots are not "saved words" that accumulated — they are a fixed
      // list that ships with the app, so they come from the file rather than
      // from Firestore. That makes this group complete the first time it is
      // opened, and identical to what the list looked like before it moved.
      if (isQuranVocab(lang)) {
        byLang.push({ lang, words: await this.loadQuranRoots(), isRoots: true });
        continue;
      }
      let sets = [];
      try {
        sets = await dbGetAllVocabSets(lang.id);
      } catch (err) {
        console.warn(`Saved vocab read failed for ${lang.id}:`, err.message);
      }
      // Newest first, and never the same word twice however often it appeared.
      // Sets written before the script guard existed can hold English words
      // under a non-Latin language — those are dropped from the view and
      // scrubbed from storage so the count and the quiz agree with it.
      const seen = new Set();
      const words = [];
      for (const set of sets) {
        const good = (set.words || []).filter(w => wordMatchesScript(w.word, lang.script));
        if (good.length !== (set.words || []).length) {
          repairVocabSet(lang, set, good);
        }
        for (const w of good) {
          const key = String(w.word).trim().toLowerCase();
          if (!key || seen.has(key)) continue;
          seen.add(key);
          // The set it came from travels with it, so a swap here can write the
          // replacement back to the right document rather than guessing.
          words.push({ ...w, _learnedAt: set.createdAt || null,
                       _setNumber: set.setNumber ?? null });
        }
      }
      if (words.length) byLang.push({ lang, words });
    }

    if (!byLang.length) {
      panel.innerHTML = `
        <div class="vocab-empty">
          <h3 class="vocab-empty-title">No vocab saved yet</h3>
          <p class="vocab-empty-sub">Every word you learn is kept here, grouped by language, so you can come back to any of it.</p>
          <button class="btn btn-primary" id="btn-saved-to-learn">Learn your first words →</button>
        </div>`;
      document.getElementById('btn-saved-to-learn').addEventListener('click', () => this.switchTab('learn'));
      return;
    }

    // The language currently being studied opens by default — but a group the
    // learner opened themselves stays open through a re-render, or swapping a
    // word would fold the list up underneath them.
    const wasOpen = this._openSavedLangs
      || new Set(byLang.filter(e => e.lang.id === this.lang?.id).map(e => e.lang.id));
    panel.innerHTML = `
      <div class="vocab-saved-list">
        ${byLang.map(({ lang, words, isRoots }) => `
          <details class="vocab-saved-set" data-lang="${escapeAttr(lang.id)}"${wasOpen.has(lang.id) ? ' open' : ''}>
            <summary class="vocab-saved-head">
              <span class="vocab-saved-title">${escapeAttr(lang.name)}</span>
              <span class="vocab-saved-meta">${words.length} ${isRoots ? 'root' : 'word'}${words.length === 1 ? '' : 's'}</span>
              <span class="vocab-saved-words">${words.slice(0, 12).map(w => escapeAttr(isRoots ? w.root : w.word)).join(' · ')}${words.length > 12 ? ' …' : ''}</span>
            </summary>
            ${isRoots
              // Filled in after the paint by renderRootList, so the table here
              // is the same table, built by the same code, rather than a copy
              // of it that can drift.
              ? `<div class="vocab-saved-body root-list-host" data-roots-for="${escapeAttr(lang.id)}"></div>`
              : `<div class="vocab-list vocab-saved-body">
                   ${words.map((w, i) => vocabCardHtml(w, i, lang, { swappable: true })).join('')}
                 </div>
                 <div class="vocab-actions">
                   <button class="btn btn-ghost btn-sm vocab-review-set" data-lang="${escapeAttr(lang.id)}">
                     Quiz me on ${escapeAttr(lang.name)} →
                   </button>
                 </div>`}
          </details>
        `).join('')}
      </div>
    `;

    for (const { lang, words, isRoots } of byLang) {
      if (!isRoots) continue;
      const host = panel.querySelector(`[data-roots-for="${CSS.escape(lang.id)}"]`);
      if (host) this.renderRootList(host, words, lang);
    }

    this._openSavedLangs = new Set(wasOpen);
    panel.querySelectorAll('.vocab-saved-set').forEach(det => {
      const entry = byLang.find(e => e.lang.id === det.dataset.lang);
      if (!entry) return;

      det.addEventListener('toggle', () => {
        if (det.open) this._openSavedLangs.add(det.dataset.lang);
        else this._openSavedLangs.delete(det.dataset.lang);
      });

      det.querySelectorAll('.vocab-speak').forEach(btn => {
        btn.addEventListener('click', () => {
          const w = entry.words[parseInt(btn.dataset.idx)];
          if (!NarrationEngine.speakLang(w.word, entry.lang.ttsLangCode || entry.lang.code, 0.85)) {
            showToast(`No ${entry.lang.name} voice on this device — audio unavailable.`, 'info', 3000);
          }
        });
      });

      // "I know this — swap it" works here too. It is arguably where it matters
      // most: this is the whole history, and a word you have outgrown sitting in
      // it is exactly the one you want replaced with something harder.
      det.querySelectorAll('[data-know]').forEach(btn => {
        btn.addEventListener('click', () => this.swapWord({
          lang: entry.lang,
          list: entry.words,
          index: parseInt(btn.dataset.know),
          btn,
          // Saved words are written back to the set they arrived in.
          setNumber: (w) => w._setNumber
        }));
      });
    });

    // Quizzing a language pulls from everything learned in it, most recent
    // first, capped so a long history doesn't produce an endless quiz.
    panel.querySelectorAll('.vocab-review-set').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const entry = byLang.find(x => x.lang.id === btn.dataset.lang);
        if (!entry?.words.length) return;
        this.lang = entry.lang;
        this.words = entry.words.slice(0, 12);
        this.quiz = null;
        this.renderControls();
        this.switchTab('quiz');
      });
    });
  },

  // ── LEARN ──
  renderLearn() {
    const panel = document.getElementById('vocab-panel-learn');
    if (!panel) return;
    if (this._seeding) return;               // the progress bar owns the panel

    // The root list lives in Saved vocab now — it is a reference you come back
    // to, not a batch you are handed. This tab is where the next Qur'anic
    // section will go; until there is one, it says so and points at the roots
    // rather than showing a second copy of them.
    if (isQuranVocab(this.lang)) {
      panel.innerHTML = `
        <div class="vocab-empty">
          <h3 class="vocab-empty-title">The ${QURAN_SEQUENCE.length} roots are in Saved vocab</h3>
          <p class="vocab-empty-sub">
            That is where the list lives — five sets of sixty, each root with the
            words built from it and a verse to meet them in.<br>
            The next Qur'anic section will appear here.
          </p>
          <button class="btn btn-primary" id="btn-vocab-to-saved">Open the roots →</button>
        </div>`;
      document.getElementById('btn-vocab-to-saved')
        .addEventListener('click', () => this.switchTab('saved'));
      return;
    }

    if (!this.words.length) {
      panel.innerHTML = `
        <div class="vocab-empty">
          <h3 class="vocab-empty-title">Build your ${this.lang.name} vocabulary</h3>
          <p class="vocab-empty-sub">
            You'll get ${this.lang.name === 'English' ? 'words an articulate speaker reaches for' : 'precise, useful words'} —
            each one inside a sentence that makes its meaning stick.
            ${(this.lang.knownWords || []).length ? `<br>${(this.lang.knownWords || []).length} words learned so far.` : ''}
          </p>
          <button class="btn btn-primary" id="btn-vocab-generate">
            ${(this.lang.knownWords || []).length ? 'Next 6 words →' : 'Start with 6 words →'}
          </button>
        </div>
      `;
      document.getElementById('btn-vocab-generate').addEventListener('click', () => this.loadWords());
      return;
    }

    panel.innerHTML = `
      <div class="vocab-set-head">
        <span class="vocab-set-count">${this.words.length} new words</span>
        <button class="btn btn-ghost btn-sm" id="btn-vocab-more">New vocab →</button>
      </div>
      <div class="vocab-list">
        ${this.words.map((w, i) => vocabCardHtml(w, i, this.lang, { swappable: true })).join('')}
      </div>
      <div class="vocab-actions">
        <button class="btn btn-primary" id="btn-vocab-quiz-now">Quiz me on these →</button>
      </div>
    `;

    panel.querySelectorAll('.vocab-speak').forEach(btn => {
      btn.addEventListener('click', () => {
        const w = this.words[parseInt(btn.dataset.idx)];
        if (!NarrationEngine.speakLang(w.word, this.lang.ttsLangCode || this.lang.code, 0.85)) {
          showToast(`No ${this.lang.name} voice on this device — audio unavailable.`, 'info', 3000);
        }
      });
    });
    this.bindKnowButtons(panel);
    document.getElementById('btn-vocab-more').addEventListener('click', () => this.loadWords());
    document.getElementById('btn-vocab-quiz-now').addEventListener('click', () => this.switchTab('quiz'));
  },

  bindKnowButtons(scope) {
    scope.querySelectorAll('[data-know]').forEach(btn => {
      btn.addEventListener('click', () => this.swapWord({
        lang: this.lang,
        list: this.words,
        index: parseInt(btn.dataset.know),
        btn,
        setNumber: () => this.setNumber,
        onSwapped: () => { this.quiz = null; }   // the set changed under it
      }));
    });
  },

  // "I know this" is a request for a harder word in the same area of meaning,
  // and a statement that this one should stop coming round. So it does three
  // things: swaps the card, adds the word to the never-offer-again list, and
  // takes its flashcard out of the review deck — a word you know is not a card
  // you want back next week.
  //
  // One implementation, two callers. The Learn tab swaps within the batch on
  // screen; Saved vocab swaps within the whole history and writes back to the
  // set the word originally came from. Everything between those two facts is
  // identical, and when it was only wired up on one of them the button sat
  // there on the other doing nothing at all.
  //
  // THE CARD CHANGES THE MOMENT THE WORD ARRIVES. Saving it does not hold the
  // paint. It used to: after the model answered in about two seconds, eleven
  // sequential Firestore round trips ran before anything moved on screen, with
  // the button still reading "Finding a harder one…" throughout. That is why
  // this felt slow, and why it read as broken rather than slow.
  async swapWord(ctx) {
    const { lang, list, index, btn, setNumber, onSwapped } = ctx;
    const old = list[index];
    if (!lang || !old || btn.disabled) return;

    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = 'Finding a harder one…';

    let replacement;
    try {
      const known = [...(lang.knownWords || []), ...list.map(w => w.word)];
      const theme = document.getElementById('vocab-theme')?.value.trim() || '';
      replacement = AppState.mode === 'demo'
        ? demoSimilarWord(lang, old)
        : await callSimilarWord(lang, lang.tier || 'articulate', old.word, old.meaning,
                                known, theme);
    } catch (err) {
      // Nothing has changed yet, so there is nothing to undo — put the button
      // back and say why.
      console.warn('Word swap failed:', err.message);
      btn.disabled = false;
      btn.textContent = label;
      showToast('Could not find a replacement: ' + err.message, 'error', 5000);
      return;
    }

    const target = setNumber(old);
    list[index] = { ...replacement, _setNumber: target };
    lang.knownWords = [...new Set([...(lang.knownWords || []), old.word, replacement.word])]
      .slice(-400);
    onSwapped?.();

    // ── On screen, now ────────────────────────────────────────────────────
    // One card is replaced in place rather than the list being re-rendered.
    // Re-rendering Saved vocab means re-reading every set of every language
    // from Firestore, which is the single most expensive thing in this path
    // and buys nothing — we already know what the card should say.
    await this.replaceCardNode(btn.closest('.vocab-card'), replacement, ctx);
    showToast(`"${old.word}" swapped for "${replacement.word}".`, 'success', 3500);

    // ── In the database, behind it ────────────────────────────────────────
    this.persistSwap(lang, old, replacement, target, list)
      .catch(err => {
        console.warn('Swap did not save:', err.message);
        showToast(`"${replacement.word}" is on screen but didn't save — it may be back next time.`,
          'error', 6000);
      });
  },

  // Swap one card's markup for another's, with the leaving and arriving
  // animation around it. The replacement is wired up from the SAME context the
  // card it replaced was wired from — the Learn tab and Saved vocab swap
  // against different lists and write to different sets, so a card rebound
  // with the wrong one would quietly edit the wrong word.
  async replaceCardNode(card, word, ctx) {
    if (!card) return;
    const { lang, index } = ctx;
    const animate = !prefersReducedMotion();
    if (animate) {
      card.classList.add('vocab-card-leaving');
      await new Promise(r => setTimeout(r, 220));
    }

    const holder = document.createElement('div');
    holder.innerHTML = vocabCardHtml(word, index, lang, { swappable: true });
    const fresh = holder.firstElementChild;
    if (!fresh) return;
    card.replaceWith(fresh);

    fresh.querySelector('.vocab-speak')?.addEventListener('click', () => {
      if (!NarrationEngine.speakLang(word.word, lang.ttsLangCode || lang.code, 0.85)) {
        showToast(`No ${lang.name} voice on this device — audio unavailable.`, 'info', 3000);
      }
    });
    fresh.querySelector('[data-know]')?.addEventListener('click', (e) =>
      this.swapWord({ ...ctx, btn: e.currentTarget }));

    if (animate) {
      fresh.classList.add('vocab-card-arriving');
      fresh.addEventListener('animationend',
        () => fresh.classList.remove('vocab-card-arriving'), { once: true });
    }
  },

  // Everything the swap has to write down. Sequential on purpose — these read
  // and rewrite the same documents, so running them together loses one of the
  // edits — but nothing on screen is waiting for any of it.
  async persistSwap(lang, old, replacement, target, list) {
    await dbReplaceLangCard(lang.id, old.word, {
      front: replacement.word,
      back: [replacement.meaning,
             replacement.example ? `\n\n"${replacement.example}"` : '',
             replacement.exampleRomanization ? `\n${replacement.exampleRomanization}` : '',
             replacement.exampleTranslation ? `\n${replacement.exampleTranslation}` : ''].join(''),
      word: replacement.word,
      romanization: replacement.pronunciation || null,
      type: 'precision'
    });

    // Only the set the word actually belonged to is rewritten, and only that
    // one word inside it. The list on screen in Saved vocab spans several
    // sets and has had duplicates folded out of it, so writing it back
    // wholesale would collapse the history into one set and drop words the
    // view had merely hidden.
    if (target != null) {
      const stored = await dbGetVocabSet(lang.id, target);
      // No stored copy means this batch was never written — fall back to what
      // is on screen rather than replacing the set with a single word.
      const base = stored?.words?.length
        ? stored.words
        : list.map(({ _setNumber, _learnedAt, ...w }) => w);
      const members = base.map(w =>
        String(w.word).trim() === String(old.word).trim() ? replacement : w);
      if (!members.some(w => w.word === replacement.word)) members.push(replacement);
      await dbPutVocabSet(lang.id, target, members,
        { langName: lang.name, script: lang.script });
    }
    await dbPutLanguage(lang);
  },

  // ── THE ROOT LIST ──
  // All 305 entries in frequency order, each with the words the Qur'an builds
  // from it. Rendered in one pass — 305 cards is a lot of nodes, so the HTML is
  // built as a single string and assigned once rather than appended per card.
  // The root table. Rendered into whatever container it is handed, and every
  // lookup scoped to that container — both panels live in the DOM at once, so
  // getElementById would hand the Saved tab's button to the Learn tab's code.
  renderRootList(panel, words = this.words, lang = this.lang) {
    const filter = (this.rootFilter || '').trim().toLowerCase();
    const shown = filter
      ? words.filter(w =>
          String(w.root).includes(filter) ||
          String(w.word).includes(filter) ||
          String(w.pronunciation).toLowerCase().includes(filter) ||
          String(w.meaning).toLowerCase().includes(filter) ||
          (w.lemmas || []).some(l => String(l.meaning).toLowerCase().includes(filter) ||
                                     String(l.word).includes(filter)))
      : words;

    const covered = (quranCoverage(words.map(w => w.rootId)) * 100).toFixed(1);

    // The deck offer sits above the list, not instead of it. Reading the roots
    // and putting them in the review deck are two different things, and being
    // shown a button where the words should be helps with neither.
    const deckOffer = lang.rootDeckSeeded ? '' : `
      <div class="root-deck-offer" data-root-deck-offer>
        <span class="root-deck-offer-text">These ${words.length} roots can go in your flashcard deck too — a real Qur'anic word on the front, the root and its family on the back.</span>
        <button class="btn btn-primary btn-sm" data-seed-roots>Add to flashcards</button>
      </div>`;

    // Sixty at a time, with a heading over each set, because that is how the
    // list was written and how the course teaches it: five sets you can finish
    // rather than one list of 300 you abandon at forty. Searching cuts across
    // all five, so the headings come off while a filter is on — a heading over
    // no rows is worse than no heading.
    const sets = (typeof QURAN_ROOT_SETS !== 'undefined' && QURAN_ROOT_SETS) || [];
    const rows = (list) => list.map(w => rootEntryHtml(w, words.indexOf(w))).join('');

    const body = filter
      ? (shown.length
          ? `<div class="root-table">${rootTableHeadHtml()}${rows(shown)}</div>`
          : `<div class="vocab-empty"><p class="vocab-empty-sub">
               Nothing matches “${escapeAttr(this.rootFilter)}”.</p></div>`)
      : sets.map(s => {
          const inSet = shown.filter(w => w.set === s.set);
          if (!inSet.length) return '';
          return `
            <section class="root-set" data-set="${s.set}">
              <h3 class="root-set-title">
                <span class="root-set-leaf" aria-hidden="true">🌿</span>
                ${escapeAttr(s.title)} <span class="root-set-range">(Set ${s.set}: ${s.from}–${s.to})</span>
              </h3>
              <div class="root-table">${rootTableHeadHtml()}${rows(inSet)}</div>
            </section>`;
        }).join('');

    panel.innerHTML = `
      <div class="root-head">
        <div class="root-head-line">
          <span class="vocab-set-count">${words.length} roots</span>
          <span class="root-head-note">in five sets of sixty · ${covered}% of the Qur'an between them</span>
        </div>
        ${deckOffer}
        <input type="search" data-root-search class="form-input root-search"
               placeholder="Search a root, a meaning or a word built from it…"
               value="${escapeAttr(this.rootFilter || '')}">
      </div>
      ${body}
      <div class="vocab-actions">
        <button class="btn btn-primary" data-root-quiz>Quiz me on these →</button>
      </div>
    `;

    panel.querySelector('[data-seed-roots]')
      ?.addEventListener('click', () => this.seedRootDeck());

    const search = panel.querySelector('[data-root-search]');
    search.addEventListener('input', () => {
      this.rootFilter = search.value;
      clearTimeout(this._rootFilterTimer);
      this._rootFilterTimer = setTimeout(() => {
        this.renderRootList(panel, words, lang);
        const again = panel.querySelector('[data-root-search]');
        again.focus();
        again.setSelectionRange(again.value.length, again.value.length);
      }, 180);
    });

    // A row opens onto its words. The table is the list he asked for; the
    // family and the verse are still one tap underneath it rather than gone.
    panel.querySelectorAll('.root-row-main').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (e.target.closest('.vocab-speak')) return;
        const row = btn.closest('.root-row');
        const open = row.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    panel.querySelectorAll('.vocab-speak').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const w = words[parseInt(btn.dataset.idx)];
        if (!NarrationEngine.speakLang(w.word || w.lemmas?.[0]?.word,
              lang.ttsLangCode || lang.code, 0.85)) {
          showToast(`No ${lang.name} voice on this device — audio unavailable.`, 'info', 3000);
        }
      });
    });
    panel.querySelector('[data-root-quiz]')
      .addEventListener('click', () => { this.lang = lang; this.words = words; this.switchTab('quiz'); });
  },

  // One corpus entry as a vocabulary word.
  //
  // Every root now ships with its own family, its own example verse and its own
  // headword, all checked against quran-text.js at build time — so this reads
  // the entry and asks nothing of a model. Nothing here can be slow, and nothing
  // here can invent a word the Qur'an does not contain.
  //
  // THE LIST SHOWS THE ROOT, THE CARD SHOWS A WORD. كتب is what a root list is
  // written with and what he wrote; ٱلْكِتَٰبِ is what you actually meet on the
  // page, so that is what stays on the front of the flashcard.
  quranWord(entry) {
    const family = (entry.family || []).map(f => ({
      word: f.word, meaning: f.gloss || f.meaning || '', romanization: ''
    }));

    return {
      word: entry.headword || entry.root,
      headwordGloss: entry.headwordGloss || '',
      root: entry.root,
      rootId: entry.id,
      n: entry.n,
      set: entry.set,
      partOfSpeech: 'root',
      pronunciation: entry.translit,
      meaning: entry.gloss,
      verse: entry.verse || null,
      example: family[0]?.word || '',
      exampleRomanization: '',
      exampleTranslation: family[0]?.meaning || '',
      cloze: '',
      contrast: '',
      quranCount: entry.count,
      lemmas: family
    };
  },

  // The whole list, not a handful. The 300 roots ARE the set: there is nothing
  // to generate a batch at a time, and no reason to make a learner press "next
  // sixty" five times to see what they are studying.
  //
  // It paints instantly and costs nothing. Every root's words and verse are in
  // quran-roots-data.js, verified against the text when that file was built, so
  // there is no cache to read and no model to wait for.
  async loadQuranRoots() {
    return QURAN_SEQUENCE.map(entry => this.quranWord(entry));
  },

  async loadWords() {
    const panel = document.getElementById('vocab-panel-learn');
    const tier = document.getElementById('vocab-tier-select')?.value || 'articulate';
    const theme = document.getElementById('vocab-theme')?.value.trim() || '';
    this.lang.tier = tier;

    panel.innerHTML = `<div class="cp-loading" style="justify-content:center; padding:3rem 0;">
      <span class="cp-spinner"></span> Choosing ${this.lang.name} words…</div>`;

    try {
      const setNumber = this.lang.vocabSet || 0;
      const known = this.lang.knownWords || [];

      // Quranic Arabic doesn't ask the model which words to teach, and it is
      // not handed out a batch at a time: the corpus IS the set. All 305
      // entries paint from the cache at once, and their lemmas fill in behind
      // the paint. The model only ever supplies lemmas.
      if (isQuranVocab(this.lang)) {
        this.words = await this.loadQuranRoots();
        this.setNumber = 0;
        this.quiz = null;
        this.renderTab();
        // Nothing is written back. The roots are a fixed list in the page, and
        // Saved vocab reads them from there — copying 300 of them into
        // Firestore only to read them out again bought nothing. Anything an
        // earlier version did write is cleared, so the old cards cannot show up
        // underneath the table.
        dbDropVocabSetsAbove(this.lang.id, -1)
          .then(n => { if (n) console.log(`Cleared ${n} stale root set(s).`); })
          .catch(err => console.warn('Stale root set cleanup failed:', err.message));
        return;
      }

      // Always a genuinely new set. The old code replayed a cached set for the
      // same number, which is how previously-seen words kept reappearing.
      let words = AppState.mode === 'demo'
          ? demoVocabBuilderWords(this.lang, tier)
              .filter(w => !known.some(k => k.toLowerCase() === w.word.toLowerCase()))
              .slice(0, 6)
        : await callVocabWords(this.lang, tier, known, theme);

      // The agent drops repeats itself, which can leave the set short. One
      // top-up call, told about the words just issued as well, fills the gap.
      if (words.length < 6 && AppState.mode !== 'demo') {
        const excludeNow = [...known, ...words.map(w => w.word)];
        try {
          const more = await callVocabWords(this.lang, tier, excludeNow, theme, 6 - words.length);
          // The top-up is told what it already issued, but being told is not the
          // same as obeying — a repeat here would put the same word on screen twice.
          const have = new Set(words.map(w => String(w.word).trim().toLowerCase()));
          words = [...words, ...more.filter(w => !have.has(String(w.word).trim().toLowerCase()))];
        } catch (err) {
          console.warn('Vocab top-up failed, continuing with a short set:', err.message);
        }
      }

      // Last line of defence before anything is stored: a word that isn't in
      // the language's own script never reaches the set, the deck or the quiz.
      const offScript = words.filter(w => !wordMatchesScript(w.word, this.lang.script));
      if (offScript.length) {
        console.warn(`Vocab: rejected ${offScript.length} off-script word(s) for ${this.lang.name}: ${offScript.map(w => w.word).join(', ')}`);
        words = words.filter(w => wordMatchesScript(w.word, this.lang.script));
      }

      if (!words.length) {
        throw new Error('No new words came back — try a different theme or tier.');
      }

      await dbPutVocabSet(this.lang.id, setNumber, words, {
        tier, theme, langName: this.lang.name, script: this.lang.script
      });

      this.words = words;
      this.setNumber = setNumber;
      this.quiz = null;                    // a new set invalidates the old quiz
      await this.persistSet(words);
      this.renderLearn();
    } catch (err) {
      console.warn('Vocab generation failed:', err.message);
      panel.innerHTML = `<div class="cp-fallback" style="text-align:center; padding:2rem 0;">
        Couldn't build your vocab: ${escapeAttr(err.message)}
      </div>
      <div class="vocab-actions"><button class="btn btn-ghost" id="btn-vocab-retry">Try again</button></div>`;
      document.getElementById('btn-vocab-retry').addEventListener('click', () => this.loadWords());
    }
  },

  // Words join the shared SM-2 deck, and the profile tracks what's been seen so
  // the generator never repeats itself.
  async persistSet(words) {
    const lang = this.lang;
    lang.knownWords = [...new Set([...(lang.knownWords || []), ...words.map(w => w.word)])].slice(-400);
    lang.vocabSet = (lang.vocabSet || 0) + 1;
    lang.wordsLearned = (lang.wordsLearned || 0) + words.length;

    // Roots are tracked by id as well as by their letters — the coverage meter
    // on the course card counts corpus frequency, which needs the id.
    const rootIds = words.map(w => w.rootId).filter(Boolean);
    if (rootIds.length) {
      lang.rootsLearned = [...new Set([...(lang.rootsLearned || []), ...rootIds])];
    }

    // Once the full root deck has been built, every root is already a card —
    // reading the next six must not file them a second time.
    const fresh = lang.rootDeckSeeded ? words.filter(w => !w.rootId) : words;

    try {
      // The WORD goes on the front — recall runs word → meaning, which is what
      // owning a word actually is. The back carries the definition and the
      // sentence that makes it stick, plus the translation for a non-Latin
      // script where the sentence itself needs one.
      if (fresh.length) await dbAppendLangCards(lang.id, fresh.map(w => {
        // A root card is the root alone on the front. The back carries the root
        // again with its meaning, then the five words the Qur'an builds from it
        // — structured, because the renderer lays it out rather than printing a
        // paragraph. See showNextCard's `#card-back-lemmas`.
        if (w.lemmas?.length) {
          return {
            front: w.word,                 // a real wordform, not root letters
            back: w.meaning,
            word: w.word,
            root: w.root || null,
            headwordGloss: w.headwordGloss || '',
            verse: w.verse || null,
            romanization: w.pronunciation || null,
            type: 'root',
            rootId: w.rootId || null,
            quranCount: w.quranCount || null,
            lemmas: w.lemmas
          };
        }

        const back = [
          w.meaning,
          w.example ? `\n\n"${w.example}"` : '',
          w.exampleRomanization ? `\n${w.exampleRomanization}` : '',
          w.exampleTranslation ? `\n${w.exampleTranslation}` : ''
        ].join('');
        return {
          front: w.word,
          back,
          word: w.word,
          romanization: w.pronunciation || null,
          type: 'precision'
        };
      }));
      await dbPutLanguage(lang);
      if (!this.langs.some(l => l.id === lang.id)) this.langs.push(lang);
      this.renderControls();
    } catch (err) {
      console.warn('Vocab persistence failed:', err.message);
    }
  },

  // ── QUIZ ──
  // Built locally from words already studied: no API call, no waiting, and the
  // questions can never drift from what was actually taught. The one exception
  // is the closing item, where you write your own sentence — recognition is
  // cheap, production is the real test.
  renderQuiz() {
    const panel = document.getElementById('vocab-panel-quiz');
    if (!panel) return;

    // The Qur'anic roots are always available — they are in the page, not
    // something that has to have been studied first — so quizzing them never
    // needs the learner to go and fetch them.
    if (!this.words.length && isQuranVocab(this.lang)) {
      this.words = QURAN_SEQUENCE.map(e => this.quranWord(e));
    }

    const pool = this.words.length ? this.words : null;
    if (!pool) {
      panel.innerHTML = `
        <div class="vocab-empty">
          <h3 class="vocab-empty-title">Nothing to quiz yet</h3>
          <p class="vocab-empty-sub">Learn some vocab first — the quiz is built from what you've studied.</p>
          <button class="btn btn-primary" id="btn-quiz-to-learn">Go to Learn →</button>
        </div>`;
      document.getElementById('btn-quiz-to-learn').addEventListener('click', () => this.switchTab('learn'));
      return;
    }

    if (!this.quiz) this.quiz = { items: buildVocabQuiz(pool), idx: 0, correct: 0, answered: false };
    const q = this.quiz;

    if (q.idx >= q.items.length) { this.renderQuizResults(); return; }

    const item = q.items[q.idx];
    panel.innerHTML = `
      <div class="vocab-quiz-progress">
        <span>${q.idx + 1} of ${q.items.length}</span>
        <div class="vocab-quiz-bar"><i style="width:${(q.idx / q.items.length) * 100}%"></i></div>
        <span class="vocab-quiz-score">${q.correct} correct</span>
      </div>
      <div class="vocab-quiz-card">
        <div class="vocab-quiz-kind">${item.label}</div>
        <div class="vocab-quiz-prompt">${item.promptHtml}</div>
        ${item.kind === 'use'
          ? `<textarea class="cp-answer" id="vocab-use-input" rows="2" placeholder="Write a sentence using “${escapeAttr(item.word.word)}”…"></textarea>
             <div class="vocab-quiz-actions"><button class="btn btn-primary" id="btn-vocab-use-check">Check</button></div>`
          : `<div class="vocab-options">${item.options.map((o, i) =>
              `<button class="vocab-option" data-i="${i}">${escapeAttr(o)}</button>`).join('')}</div>`}
        <div class="vocab-quiz-verdict" id="vocab-quiz-verdict"></div>
      </div>
    `;

    if (item.kind === 'use') {
      document.getElementById('btn-vocab-use-check').addEventListener('click', async () => {
        const btn = document.getElementById('btn-vocab-use-check');
        const text = document.getElementById('vocab-use-input').value.trim();
        if (!text) return;
        btn.disabled = true; btn.textContent = 'Checking…';
        let res;
        try {
          res = AppState.mode === 'demo'
            ? { verdict: text.split(/\s+/).length >= 4 ? 'pass' : 'gap',
                feedback: text.split(/\s+/).length >= 4 ? 'Used naturally — that\'s the word working.' : 'Give it a fuller sentence so the meaning shows.' }
            : await callVocabUsageGrader(this.lang, item.word, text);
        } catch (err) {
          res = { verdict: 'pass', feedback: 'Check unavailable — counting it.' };
        }
        this.markAnswer(res.verdict === 'pass', res.feedback, item);
      });
    } else {
      panel.querySelectorAll('.vocab-option').forEach(btn => {
        btn.addEventListener('click', () => {
          if (q.answered) return;
          const chosen = parseInt(btn.dataset.i);
          const right = chosen === item.answerIdx;
          panel.querySelectorAll('.vocab-option').forEach((b, i) => {
            if (i === item.answerIdx) b.classList.add('correct');
            else if (i === chosen) b.classList.add('wrong');
            b.disabled = true;
          });
          this.markAnswer(right, right ? 'Correct.' : `It's “${item.options[item.answerIdx]}”. ${item.word.meaning}`, item);
        });
      });
    }
  },

  markAnswer(correct, feedback, item) {
    const q = this.quiz;
    q.answered = true;
    if (correct) q.correct += 1;
    // A missed word comes back at the end — the point is to learn it, not score it.
    else if (!item.requeued) q.items.push({ ...item, requeued: true });

    const v = document.getElementById('vocab-quiz-verdict');
    v.innerHTML = `
      <div class="cp-verdict ${correct ? 'cp-pass' : 'cp-gap'}">${correct ? '✓ ' : ''}${escapeAttr(feedback)}</div>
      <button class="btn btn-primary btn-sm" id="btn-vocab-next">${q.idx + 1 >= q.items.length ? 'See results →' : 'Next →'}</button>
    `;
    document.getElementById('btn-vocab-next').addEventListener('click', () => {
      q.idx += 1; q.answered = false; this.renderQuiz();
    });
  },

  renderQuizResults() {
    const panel = document.getElementById('vocab-panel-quiz');
    const q = this.quiz;
    const pct = Math.round((q.correct / q.items.length) * 100);
    const lang = this.lang;

    lang.quizStats = {
      asked: (lang.quizStats?.asked || 0) + q.items.length,
      correct: (lang.quizStats?.correct || 0) + q.correct
    };
    dbPutLanguage(lang).catch(err => console.warn('Quiz stats save failed:', err.message));

    panel.innerHTML = `
      <div class="vocab-empty">
        <h3 class="vocab-empty-title">${q.correct} of ${q.items.length} — ${pct}%</h3>
        <p class="vocab-empty-sub">
          ${pct >= 80 ? 'These are yours. They\'ll come back in your flashcards to stay that way.'
                      : 'The ones you missed came round again — and they\'re all in your flashcard deck now.'}
        </p>
        <div class="vocab-actions">
          <button class="btn btn-primary" id="btn-vocab-requiz">Quiz again</button>
          <button class="btn btn-ghost" id="btn-vocab-newset">Learn new vocab →</button>
        </div>
      </div>
    `;
    document.getElementById('btn-vocab-requiz').addEventListener('click', () => {
      this.quiz = null; this.renderQuiz();
    });
    document.getElementById('btn-vocab-newset').addEventListener('click', () => {
      this.switchTab('learn'); this.loadWords();
    });
  }
};

// One word card. A non-Latin language shows the word in its own script with the
// English pronunciation bracketed beneath it, and its example sentence in that
// script with a romanization and an English translation — everything an English
// speaker needs to actually read, say and understand it.
// `swappable` is off by default. Saved vocab renders with this same function,
// and a swap there has no set to swap WITHIN — the button appeared and did
// nothing, which is worse than not offering it.
function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
}

function vocabCardHtml(w, i, lang, { swappable = false } = {}) {
  const nonLatin = lang?.script && lang.script !== 'latin';

  // A root card is a different animal: instead of one word in one sentence, it
  // is a family — the three letters, and the real Quranic words grown from them.
  if (w.lemmas?.length) return rootCardHtml(w, i);

  return `
    <article class="vocab-card${nonLatin ? ' vocab-card-script' : ''}" data-idx="${i}">
      <div class="vocab-card-head">
        <h3 class="vocab-word">${escapeAttr(w.word)}</h3>
        <button class="vocab-speak" data-idx="${i}" title="Hear it">🔊</button>
      </div>
      <div class="vocab-meta">
        ${w.pronunciation ? `<span class="vocab-pron">(${escapeAttr(w.pronunciation)})</span>` : ''}
        ${w.partOfSpeech ? `<span class="vocab-pos">${escapeAttr(w.partOfSpeech)}</span>` : ''}
      </div>
      <p class="vocab-meaning">${escapeAttr(w.meaning)}</p>
      <blockquote class="vocab-example">
        ${highlightWordIn(w.example, w.word)}
        ${w.exampleRomanization ? `<span class="vocab-ex-rom">${escapeAttr(w.exampleRomanization)}</span>` : ''}
        ${w.exampleTranslation ? `<span class="vocab-ex-trans">${escapeAttr(w.exampleTranslation)}</span>` : ''}
      </blockquote>
      ${w.contrast ? `<p class="vocab-contrast">${escapeAttr(w.contrast)}</p>` : ''}
      ${swappable ? `<div class="vocab-card-foot">
        <button class="vocab-know" data-know="${i}">I know this — swap it</button>
      </div>` : ''}
    </article>`;
}

// A root and the words the Qur'an actually builds from it. Same card frame as
// every other vocabulary card, so the Saved tab and the quiz need no special
// case — only the body differs.
function rootCardHtml(w, i) {
  return `
    <article class="vocab-card vocab-card-script vocab-card-root" data-idx="${i}">
      <div class="vocab-card-head">
        <h3 class="vocab-word vocab-root-word">${escapeAttr(w.word)}</h3>
        <button class="vocab-speak" data-idx="${i}" title="Hear it">🔊</button>
      </div>
      <div class="vocab-meta">
        ${w.pronunciation ? `<span class="vocab-pron">(${escapeAttr(w.pronunciation)})</span>` : ''}
        ${w.quranCount ? `<span class="vocab-pos">${w.quranCount.toLocaleString()}× in the Qur'an</span>` : ''}
      </div>
      <p class="vocab-meaning">${escapeAttr(w.meaning)}</p>
      <div class="root-lemmas">
        <div class="root-lemmas-head">Words built from it</div>
        ${w.lemmas.map(l => `
          <div class="root-lemma">
            <span class="root-lemma-ar">${escapeAttr(l.word)}</span>
            <span class="root-lemma-body">
              ${l.romanization ? `<span class="root-lemma-rom">${escapeAttr(l.romanization)}</span>` : ''}
              <span class="root-lemma-meaning">${escapeAttr(l.meaning)}</span>
              ${l.note ? `<span class="root-lemma-note">${escapeAttr(l.note)}</span>` : ''}
            </span>
            ${l.form ? `<span class="root-lemma-form">${escapeAttr(l.form)}</span>` : ''}
          </div>`).join('')}
      </div>
    </article>`;
}

// The list he asked for: a numbered table of `# / Root / Core meaning`, the
// root written JOINED — كتب, the way a root list is written and the way he
// wrote it — with his own wording in the meaning column.
//
// The root leads here and a real wordform leads on the flashcard, and that is
// deliberate rather than inconsistent. A root list exists to show the thing
// that unifies a family; a card exists to drill what you actually meet on the
// page. ك ت ب appears nowhere in the muṣḥaf, but كتب is how every root list
// ever printed writes it.
//
// The words built from the root, their translations and the verse are one tap
// underneath, so the table stays scannable without losing any of it.
function rootTableHeadHtml() {
  return `
    <div class="root-table-head" aria-hidden="true">
      <span class="root-col-n">#</span>
      <span class="root-col-root">Root</span>
      <span class="root-col-gloss">Core meaning / concept</span>
    </div>`;
}

function rootEntryHtml(w, i) {
  const lemmas = w.lemmas || [];
  return `
    <article class="root-row" data-idx="${i}">
      <button type="button" class="root-row-main" aria-expanded="false"
              aria-label="${escapeAttr(w.root)} — ${escapeAttr(w.meaning)}">
        <span class="root-col-n">${w.n || i + 1}</span>
        <span class="root-col-root" dir="rtl" lang="ar">${escapeAttr(w.root)}</span>
        <span class="root-col-gloss">${escapeAttr(w.meaning)}</span>
        <span class="root-row-more" aria-hidden="true">▾</span>
      </button>
      <div class="root-row-detail">
        <div class="root-row-meta">
          ${w.pronunciation ? `<span class="root-chip">${escapeAttr(w.pronunciation)}</span>` : ''}
          ${w.word && w.word !== w.root ? `<span class="root-chip root-chip-word" dir="rtl" lang="ar">${escapeAttr(w.word)}</span>` : ''}
          ${w.headwordGloss ? `<span class="root-chip-gloss">${escapeAttr(w.headwordGloss)}</span>` : ''}
          ${w.quranCount ? `<span class="vocab-pos">${w.quranCount.toLocaleString()}× in the Qur'an</span>` : ''}
          <button class="vocab-speak" data-idx="${i}" title="Hear it">🔊</button>
        </div>
        ${lemmas.length ? `<div class="root-lemmas">
          <div class="root-lemmas-head">Words built from ${escapeAttr(w.root)}</div>
          ${lemmas.map(l => `
            <div class="root-lemma">
              <span class="root-lemma-ar" dir="rtl" lang="ar">${escapeAttr(l.word)}</span>
              <span class="root-lemma-body">
                <span class="root-lemma-meaning">${escapeAttr(l.meaning)}</span>
              </span>
            </div>`).join('')}
        </div>` : ''}
        ${w.verse ? `
          <blockquote class="root-verse">
            <span class="root-verse-ar" dir="rtl" lang="ar">${escapeAttr(w.verse.text)}</span>
            <cite class="root-verse-ref">${escapeAttr(w.verse.surah)} · ${escapeAttr(w.verse.ref)}</cite>
          </blockquote>` : ''}
      </div>
    </article>`;
}

// Wraps the target word in its example so the eye lands on it immediately.
function highlightWordIn(sentence, word) {
  const stem = word.length > 4 ? word.slice(0, Math.ceil(word.length * 0.6)) : word;
  const re = new RegExp(`\\b(${stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\w*)\\b`, 'i');
  const safe = escapeAttr(sentence);
  return re.test(safe) ? safe.replace(re, '<strong>$1</strong>') : safe;
}

// Three recognition formats plus one production item, all derived from the set
// itself — so the quiz costs nothing and always matches what was taught.
function buildVocabQuiz(words) {
  const items = [];
  const pick = (arr, n, exclude) =>
    shuffleArray(arr.filter(x => x !== exclude)).slice(0, n);

  // Every lemma in the set, so a root question can be given wrong answers that
  // are real Quranic words from OTHER roots — much harder, and much more useful,
  // than inventing plausible-looking Arabic.
  const allLemmas = words.flatMap(x => (x.lemmas || []).map(l => ({ ...l, from: x.word })));

  // A root entry is asked about BY ITS ROOT. `word` is the headword — a real
  // wordform, right for a flashcard — but "which word comes from ٱلْكِتَٰبِ?"
  // asks the wrong question. The root is what the family hangs off, so the root
  // is what the question shows.
  const face = x => x.root || x.word;

  words.forEach(w => {
    // 1. cloze: the studied sentence, word removed. A root has no sentence of
    //    its own — the words grown from it are the point — so it skips this.
    const clozeDistractors = pick(words.map(x => x.word), 3, w.word);
    if (w.cloze && w.cloze.includes('_____') && clozeDistractors.length === 3) {
      const options = shuffleArray([w.word, ...clozeDistractors]);
      items.push({
        kind: 'cloze', label: 'Which word fits?', word: w,
        promptHtml: escapeAttr(w.cloze).replace('_____', '<span class="vocab-blank">_____</span>'),
        options, answerIdx: options.indexOf(w.word)
      });
    }

    // 2. meaning → word (or, for a root entry, meaning → root)
    const isRootEntry = !!w.lemmas?.length && !!w.root;
    const answer = isRootEntry ? face(w) : w.word;
    const meaningDistractors = pick(words.map(x => (isRootEntry ? face(x) : x.word)), 3, answer);
    if (meaningDistractors.length === 3) {
      const options = shuffleArray([answer, ...meaningDistractors]);
      items.push({
        kind: 'meaning', label: isRootEntry ? 'Which root means this?' : 'Which word means this?', word: w,
        promptHtml: escapeAttr(w.meaning),
        options, answerIdx: options.indexOf(answer)
      });
    }

    // 3. root → one of its own words. The skill the whole course is built on:
    //    seeing which word grew from which three letters.
    if (w.lemmas?.length) {
      const correct = w.lemmas[Math.floor(Math.random() * w.lemmas.length)].word;
      const others = shuffleArray(allLemmas.filter(l => l.from !== w.word).map(l => l.word));
      const distractors = [...new Set(others)].slice(0, 3);
      if (distractors.length === 3) {
        const options = shuffleArray([correct, ...distractors]);
        items.push({
          kind: 'lemma', label: `Which word comes from ${face(w)}?`, word: w,
          promptHtml: `<strong>${escapeAttr(face(w))}</strong> — ${escapeAttr(w.meaning)}`,
          options, answerIdx: options.indexOf(correct)
        });
      }
    }
  });

  // 4. one production item: use a word yourself — or, for a root, name a word
  //    that grows from it, which is the equivalent act of ownership.
  const target = words[Math.floor(Math.random() * words.length)];
  const isRoot = !!target.lemmas?.length;
  const quiz = shuffleArray(items).slice(0, 8);
  quiz.push({
    kind: 'use',
    label: isRoot ? 'Name a word from this root' : 'Now use it yourself',
    word: target,
    promptHtml: `<strong>${escapeAttr(isRoot ? face(target) : target.word)}</strong> — ${escapeAttr(target.meaning)}`,
    options: [], answerIdx: -1
  });
  return quiz;
}

// Demo mode needs no stand-in lemmas any more: every root ships with the same
// verified family the live path uses, so a keyless tester sees the real cards.

// Demo mode: a shaped stand-in so "I know this" works without an API key.
function demoSimilarWord(lang, old) {
  const harder = {
    'interesting': { word: 'compelling', meaning: 'so interesting you cannot look away' },
    'دلچسپ': { word: 'دلکش', meaning: 'captivating; it pulls you in' }
  };
  const pick = harder[String(old.word)] || {
    word: `${old.word}-er`, meaning: `a sharper version of ${old.meaning}`
  };
  return {
    word: pick.word,
    partOfSpeech: old.partOfSpeech || 'adjective',
    pronunciation: old.pronunciation || '',
    meaning: pick.meaning,
    example: `A ${pick.word} case, and no one looked away.`,
    exampleRomanization: '',
    exampleTranslation: '',
    cloze: '',
    contrast: `Stronger than "${old.word}".`
  };
}

function demoVocabBuilderWords(lang, tier) {
  // A non-Latin language must come back in its own script, with the English
  // pronunciation, an English meaning, and a sentence that also carries a
  // romanization and a translation.
  if (lang.script && lang.script !== 'latin') {
    return [
      { word: 'دلچسپ', partOfSpeech: 'adjective', pronunciation: 'dil-CHASP',
        meaning: 'interesting; engaging to the mind',
        example: 'یہ کتاب بہت دلچسپ ہے۔',
        exampleRomanization: 'Yeh kitaab bohot dilchasp hai.',
        exampleTranslation: 'This book is very interesting.',
        cloze: 'یہ کتاب بہت _____ ہے۔',
        contrast: 'Unlike "اچھا" (good), it says the thing holds your attention.' },
      { word: 'مشکل', partOfSpeech: 'adjective', pronunciation: 'mush-KIL',
        meaning: 'difficult; hard to do',
        example: 'یہ سوال بہت مشکل ہے۔',
        exampleRomanization: 'Yeh sawaal bohot mushkil hai.',
        exampleTranslation: 'This question is very difficult.',
        cloze: 'یہ سوال بہت _____ ہے۔',
        contrast: 'Unlike "بھاری" (heavy), it describes effort, not weight.' },
      { word: 'کوشش', partOfSpeech: 'noun', pronunciation: 'ko-SHISH',
        meaning: 'an effort or attempt',
        example: 'اس نے دوبارہ کوشش کی۔',
        exampleRomanization: 'Us ne dobara koshish ki.',
        exampleTranslation: 'He tried again.',
        cloze: 'اس نے دوبارہ _____ کی۔',
        contrast: 'Unlike "کام" (work), it stresses the trying rather than the task.' },
      { word: 'خوشی', partOfSpeech: 'noun', pronunciation: 'khu-SHEE',
        meaning: 'happiness; gladness',
        example: 'مجھے بہت خوشی ہوئی۔',
        exampleRomanization: 'Mujhe bohot khushi hui.',
        exampleTranslation: 'I was very happy.',
        cloze: 'مجھے بہت _____ ہوئی۔',
        contrast: 'Unlike "مزہ" (fun), it is an inward feeling, not an experience.' },
      { word: 'ضروری', partOfSpeech: 'adjective', pronunciation: 'za-roo-REE',
        meaning: 'necessary; required',
        example: 'یہ کام ضروری ہے۔',
        exampleRomanization: 'Yeh kaam zaroori hai.',
        exampleTranslation: 'This task is necessary.',
        cloze: 'یہ کام _____ ہے۔',
        contrast: 'Unlike "اہم" (important), it means it cannot be skipped.' },
      { word: 'تجربہ', partOfSpeech: 'noun', pronunciation: 'taj-ru-BA',
        meaning: 'experience; a trial or experiment',
        example: 'اسے پڑھانے کا تجربہ ہے۔',
        exampleRomanization: 'Use parhaane ka tajruba hai.',
        exampleTranslation: 'He has experience of teaching.',
        cloze: 'اسے پڑھانے کا _____ ہے۔',
        contrast: 'Unlike "علم" (knowledge), it comes from having done the thing.' },
      // A second batch, so demo mode can actually show a fresh set with no repeats
      { word: 'حیرت', partOfSpeech: 'noun', pronunciation: 'hai-RAT',
        meaning: 'astonishment; wonder',
        example: 'مجھے یہ سن کر حیرت ہوئی۔',
        exampleRomanization: 'Mujhe yeh sun kar hairat hui.',
        exampleTranslation: 'I was astonished to hear this.',
        cloze: 'مجھے یہ سن کر _____ ہوئی۔',
        contrast: 'Unlike "ڈر" (fear), it is surprise without threat.' },
      { word: 'سنجیدہ', partOfSpeech: 'adjective', pronunciation: 'san-JEE-da',
        meaning: 'serious; not joking',
        example: 'وہ ہمیشہ سنجیدہ رہتا ہے۔',
        exampleRomanization: 'Woh hamesha sanjeeda rehta hai.',
        exampleTranslation: 'He is always serious.',
        cloze: 'وہ ہمیشہ _____ رہتا ہے۔',
        contrast: 'Unlike "اداس" (sad), it describes manner, not mood.' },
      { word: 'اعتماد', partOfSpeech: 'noun', pronunciation: 'aiy-ti-MAAD',
        meaning: 'confidence; trust placed in someone',
        example: 'مجھے اس پر اعتماد ہے۔',
        exampleRomanization: 'Mujhe us par aitmaad hai.',
        exampleTranslation: 'I have confidence in him.',
        cloze: 'مجھے اس پر _____ ہے۔',
        contrast: 'Unlike "امید" (hope), it rests on evidence, not wishing.' },
      { word: 'مہارت', partOfSpeech: 'noun', pronunciation: 'ma-haa-RAT',
        meaning: 'skill; mastery of something',
        example: 'اسے لکھنے میں مہارت ہے۔',
        exampleRomanization: 'Use likhne mein mahaarat hai.',
        exampleTranslation: 'He has skill in writing.',
        cloze: 'اسے لکھنے میں _____ ہے۔',
        contrast: 'Unlike "تجربہ" (experience), it is ability rather than exposure.' },
      { word: 'واضح', partOfSpeech: 'adjective', pronunciation: 'WAA-zeh',
        meaning: 'clear; plainly stated',
        example: 'اس کا جواب واضح تھا۔',
        exampleRomanization: 'Us ka jawaab waazeh tha.',
        exampleTranslation: 'His answer was clear.',
        cloze: 'اس کا جواب _____ تھا۔',
        contrast: 'Unlike "آسان" (easy), it is about clarity, not difficulty.' },
      { word: 'رویہ', partOfSpeech: 'noun', pronunciation: 'ra-VAI-ya',
        meaning: 'attitude; the way one behaves toward others',
        example: 'اس کا رویہ بہت اچھا تھا۔',
        exampleRomanization: 'Us ka ravaiya bohot acha tha.',
        exampleTranslation: 'His attitude was very good.',
        cloze: 'اس کا _____ بہت اچھا تھا۔',
        contrast: 'Unlike "عادت" (habit), it is stance toward people, not routine.' }
    ];
  }
  return [
    { word: 'perfunctory', partOfSpeech: 'adjective', pronunciation: 'per-FUNK-tuh-ree',
      meaning: 'done as a routine duty, without real care or interest',
      example: 'He gave the report a perfunctory glance and signed it.',
      cloze: 'He gave the report a _____ glance and signed it.',
      contrast: 'Unlike "careless", it implies going through the motions of an obligation.' },
    { word: 'equivocate', partOfSpeech: 'verb', pronunciation: 'ih-KWIV-uh-kayt',
      meaning: 'to use vague language deliberately to avoid committing to a position',
      example: 'Asked directly whether he would resign, the minister equivocated.',
      cloze: 'Asked directly whether he would resign, the minister _____.',
      contrast: 'Unlike "lie", it avoids the truth without stating a falsehood.' },
    { word: 'trenchant', partOfSpeech: 'adjective', pronunciation: 'TREN-chunt',
      meaning: 'sharply perceptive and forcefully expressed',
      example: 'Her trenchant analysis left nothing of the argument standing.',
      cloze: 'Her _____ analysis left nothing of the argument standing.',
      contrast: 'Unlike "harsh", it implies incisiveness rather than cruelty.' },
    { word: 'assuage', partOfSpeech: 'verb', pronunciation: 'uh-SWAYJ',
      meaning: 'to make an unpleasant feeling less intense',
      example: 'Nothing he said could assuage her guilt.',
      cloze: 'Nothing he said could _____ her guilt.',
      contrast: 'Unlike "solve", it eases the feeling without removing the cause.' },
    { word: 'ostensible', partOfSpeech: 'adjective', pronunciation: 'oss-TEN-sih-bul',
      meaning: 'stated as true, but likely not the real reason',
      example: 'The ostensible purpose of the trip was research.',
      cloze: 'The _____ purpose of the trip was research.',
      contrast: 'Unlike "apparent", it hints that the truth is being concealed.' },
    { word: 'inveterate', partOfSpeech: 'adjective', pronunciation: 'in-VET-er-it',
      meaning: 'having a long-established habit unlikely to change',
      example: 'He was an inveterate collector of other people\'s stories.',
      cloze: 'He was an _____ collector of other people\'s stories.',
      contrast: 'Unlike "frequent", it describes the person, not the act.' },
    // A second batch, so demo mode can actually show a fresh set with no repeats
    { word: 'tendentious', partOfSpeech: 'adjective', pronunciation: 'ten-DEN-shuss',
      meaning: 'presented as neutral but pushing a position',
      example: 'The report was a tendentious reading of the same figures.',
      cloze: 'The report was a _____ reading of the same figures.',
      contrast: 'Unlike "biased", it implies the slant is deliberately disguised.' },
    { word: 'obviate', partOfSpeech: 'verb', pronunciation: 'OB-vee-ate',
      meaning: 'to remove the need for something',
      example: 'A clear brief would obviate most of these meetings.',
      cloze: 'A clear brief would _____ most of these meetings.',
      contrast: 'Unlike "prevent", it removes the necessity rather than the event.' },
    { word: 'salient', partOfSpeech: 'adjective', pronunciation: 'SAY-lee-unt',
      meaning: 'standing out as the most noticeable or important',
      example: 'She had a gift for the salient detail.',
      cloze: 'She had a gift for the _____ detail.',
      contrast: 'Unlike "important", it is what leaps out, not merely what matters.' },
    { word: 'desultory', partOfSpeech: 'adjective', pronunciation: 'DEZ-ul-tor-ee',
      meaning: 'moving from thing to thing without method or purpose',
      example: 'They made desultory conversation until the train came.',
      cloze: 'They made _____ conversation until the train came.',
      contrast: 'Unlike "lazy", it describes the lack of direction, not the effort.' },
    { word: 'venerate', partOfSpeech: 'verb', pronunciation: 'VEN-er-ate',
      meaning: 'to regard with deep respect, close to reverence',
      example: 'The students venerated him long after he stopped teaching.',
      cloze: 'The students _____ him long after he stopped teaching.',
      contrast: 'Unlike "admire", it carries something almost devotional.' },
    { word: 'intransigent', partOfSpeech: 'adjective', pronunciation: 'in-TRAN-si-junt',
      meaning: 'refusing to compromise, however reasonable the case',
      example: 'One intransigent member held up the whole agreement.',
      cloze: 'One _____ member held up the whole agreement.',
      contrast: 'Unlike "firm", it implies refusal has become the point.' }
  ];
}

// ── TAP ANY WORD ─────────────────────────────────────────────────────────────
// Every piece of target-language text in the language section is tokenized so
// any word can be tapped for its meaning. Three sources, cheapest first:
//   1. wordGlosses shipped with the lesson  — free, instant
//   2. the per-language cache (memory → Firestore) — free after the first tap
//   3. callWordGloss — the only one that costs a request
// The popover also offers "+ Add to deck", so a word met mid-conversation
// becomes tomorrow's review card. That's the loop: gaps found while using the
// language feed the deck that closes them.

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Splits on whitespace and punctuation while KEEPING the separators, so the
// rendered sentence looks untouched — only the word runs become tappable.
// Scripts without inter-word spaces (CJK) fall back to per-character spans.
function glossify(text, lang) {
  if (!text) return '';
  const noSpaces = lang?.script === 'cjk';
  const tokens = noSpaces
    ? String(text).split(/([　-〿＀-･\s]+)/)
    : String(text).split(/([\s.,!?;:¿¡"'()«»—–،؛؟۔]+)/);

  return tokens.map(tok => {
    if (!tok || /^[\s.,!?;:¿¡"'()«»—–،؛؟۔]+$/.test(tok) || /^[　-〿＀-･\s]+$/.test(tok)) {
      return escapeAttr(tok);
    }
    return `<span class="w" data-word="${escapeAttr(tok)}">${escapeAttr(tok)}</span>`;
  }).join('');
}

// In-memory gloss cache, hydrated from Firestore once per language per session.
const _glossCache = {};

async function lookupWord(lang, word, sentence = '', shipped = null) {
  const key = word.toLowerCase();

  // 1. shipped with the lesson
  if (shipped) {
    const hit = shipped.find(w => (w.word || '').toLowerCase() === key);
    if (hit) return { meaning: hit.gloss, romanization: hit.romanization || null, note: '', free: true };
  }

  // 2. cache (memory, then Firestore)
  if (!_glossCache[lang.id]) _glossCache[lang.id] = await dbGetGlossCache(lang.id);
  const cached = _glossCache[lang.id][key];
  if (cached) return { ...cached, free: true };

  // 3. the model
  const result = AppState.mode === 'demo'
    ? { meaning: `(demo) meaning of "${word}"`, romanization: null, note: '' }
    : await callWordGloss(lang, word, sentence);

  _glossCache[lang.id][key] = result;
  dbPutGlossCache(lang.id, _glossCache[lang.id]).catch(() => {});
  return result;
}

// ── CONTINUOUS LEVEL RECALIBRATION ───────────────────────────────────────────
// levelScore (0-100) is the running estimate of the learner's level; the CEFR
// string is DERIVED from it (never set independently — the romanization fade
// and level chips key off the string). Every real interaction is evidence:
// story checkpoints, card grades, shadow self-rates, conversation turns.
// Deltas accumulate per language and flush to Firestore debounced, with a
// ±3-points-per-day movement cap so no single session swings the level.

const LEVEL_ORDER = ['A0', 'A1', 'A2', 'B1', 'B2'];

function levelFromScore(score) {
  if (score < 15) return 'A0';
  if (score < 35) return 'A1';
  if (score < 55) return 'A2';
  if (score < 75) return 'B1';
  return 'B2';
}

// Grammar units worked through are hard evidence of level — a learner who has
// mastered 20 structures is not A0 whatever the running score says.
function levelFromUnits(count) {
  if (count < 4) return 'A0';
  if (count < 10) return 'A1';
  if (count < 18) return 'A2';
  if (count < 28) return 'B1';
  return 'B2';
}

function higherLevel(a, b) {
  return LEVEL_ORDER.indexOf(a) >= LEVEL_ORDER.indexOf(b) ? a : b;
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

    // Per-FLUSH clamp, not a daily one. The old ±3/day budget meant a learner
    // needed five flawless days just to leave A0 and 25 to reach B1 — a hard
    // ceiling on how fast anyone could progress, no matter how much work they
    // put in. Clamping each flush instead keeps one bad answer from swinging
    // the level while leaving a productive day free to move as far as it earns.
    const applied = Math.max(-2, Math.min(2, delta));
    if (!applied) return;

    const levelScore = Math.max(0, Math.min(100, (lang.levelScore ?? 8) + applied));
    // Units mastered are the strongest evidence there is, so the level never
    // sits below what the learner has demonstrably worked through.
    const level = higherLevel(levelFromScore(levelScore), levelFromUnits((lang.unitsMastered || []).length));
    const levelEvidence = [...(lang.levelEvidence || []), { at: Date.now(), delta: Math.round(applied * 10) / 10 }].slice(-20);

    await col.doc(langId).set({ levelScore, level, levelEvidence }, { merge: true });

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
  syllabus: null,      // the Instructor's ordered grammar ladder
  unit: null,          // the unit being taught right now
  unitIndex: 0,
  lessonKey: null,     // langLessons doc key for this session
  drillResults: [],    // per-drill pass/fail, feeds the mastery gate

  // start(lang, unitIndex) — unitIndex defaults to wherever the learner is on
  // the syllabus. Lessons are cached per UNIT, not per day, so finishing one
  // and starting the next in the same sitting is the normal path.
  async start(lang, unitIndex = null) {
    this.lang = lang;
    this.recipe = getRecipe(lang);
    this.activities = [...this.recipe.strands];
    this.activityIdx = 0;
    this.checkpointsPassed = 0;
    this.chatHistory = [];
    this.reviewQueue = [];
    this.shadowRatings = {};
    this.drillResults = [];
    this.unitIndex = unitIndex ?? (lang.unitIndex || 0);
    this.unit = null;
    this.syllabus = null;

    const overlay = document.getElementById('lang-session-overlay');
    const body = document.getElementById('lang-session-body');
    overlay.style.display = 'flex';
    overlay.scrollTop = 0;
    body.innerHTML = `
      <div class="cp-loading" style="justify-content:center; padding:3rem 0;">
        <span class="cp-spinner"></span> ${this.recipe.loadingCopy(lang)}
      </div>
    `;

    try {
      // The Instructor's syllabus: generated once per language, cached forever.
      if (this.recipe.ui?.syllabus) {
        this.syllabus = await this.loadSyllabus(lang);
        // A syllabus can get SHORTER — Quranic Arabic went from 20 units to 8.
        // A learner sitting on old unit 14 would otherwise index off the end and
        // get a unit-less lesson forever, so clamp to the last real unit.
        if (this.syllabus?.length && this.unitIndex > this.syllabus.length - 1) {
          console.log(`Unit ${this.unitIndex} is past the end of ${lang.id}'s syllabus — clamping to ${this.syllabus.length - 1}.`);
          this.unitIndex = this.syllabus.length - 1;
          dbPatchLanguage(lang.id, { unitIndex: this.unitIndex })
            .catch(err => console.warn('Unit clamp save failed:', err.message));
          lang.unitIndex = this.unitIndex;
        }
        this.unit = this.syllabus?.[this.unitIndex] || null;
      }

      const key = this.recipe.ui?.syllabus ? unitKey(this.unitIndex) : todayKey();
      this.lessonKey = key;
      let lesson = await dbGetLangLesson(lang.id, key);

      // A cached lesson written before the current lesson shape existed would
      // replay the old teaching forever — the learner sees no change however
      // much the generator improves. Anything stamped with an older version is
      // regenerated rather than served.
      if (lesson && (lesson.schemaVersion || 0) < LESSON_SCHEMA_VERSION) {
        console.log(`Lesson ${lang.id}/${key} predates schema v${LESSON_SCHEMA_VERSION} — regenerating.`);
        lesson = null;
      }

      if (!lesson) {
        lesson = await getLessonGenerator(this.recipe.id)(lang, this.unit);
        lesson.schemaVersion = LESSON_SCHEMA_VERSION;
        await dbPutLangLesson(lang.id, key, lesson);
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
    this.unit = null;
    this.syllabus = null;
  },

  // The grammar ladder for this language — see loadCourseSyllabus.
  loadSyllabus(lang) { return loadCourseSyllabus(lang); },

  dotsHtml() {
    return `<div class="prime-dots lang-session-dots">${this.activities
      .map((_, i) => `<i class="${i === this.activityIdx ? 'on' : ''}"></i>`).join('')}</div>`;
  },

  // One delegated handler per rendered strand. `shipped` is the lesson's own
  // per-word glosses when the strand has them, so most taps never hit the API.
  bindWordTaps(scopeEl, shipped = null) {
    scopeEl.querySelectorAll('.w').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const sentence = el.closest('.story-target, .drill-correct, .lang-bubble')?.textContent || '';
        this.showWordPopover(el, el.dataset.word, sentence, shipped);
      });
    });
  },

  async showWordPopover(anchorEl, word, sentence, shipped) {
    const { lang } = this;
    document.querySelectorAll('.word-pop').forEach(p => p.remove());

    const pop = document.createElement('div');
    pop.className = 'word-pop';
    pop.innerHTML = `<div class="word-pop-head">${escapeAttr(word)}</div><div class="word-pop-body">…</div>`;
    document.body.appendChild(pop);

    // Touch devices bottom-dock (same reason the selection bar does: iOS's own
    // menu owns the space next to the text); desktop floats by the word.
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) {
      pop.classList.add('word-pop-dock');
    } else {
      const r = anchorEl.getBoundingClientRect();
      pop.style.left = `${Math.min(Math.max(8, r.left), window.innerWidth - 260)}px`;
      pop.style.top = `${r.bottom + 8}px`;
    }

    const dismiss = (e) => {
      if (pop.contains(e.target)) return;
      pop.remove();
      document.removeEventListener('mousedown', dismiss);
      document.removeEventListener('touchstart', dismiss);
    };
    setTimeout(() => {
      document.addEventListener('mousedown', dismiss);
      document.addEventListener('touchstart', dismiss);
    }, 0);

    try {
      const g = await lookupWord(lang, word, sentence, shipped);
      pop.innerHTML = `
        <div class="word-pop-head">
          ${escapeAttr(word)}
          ${g.romanization ? `<em>${escapeAttr(g.romanization)}</em>` : ''}
        </div>
        <div class="word-pop-body">${escapeAttr(g.meaning || '—')}</div>
        ${g.note ? `<div class="word-pop-note">${escapeAttr(g.note)}</div>` : ''}
        <div class="word-pop-actions">
          <button class="word-pop-btn" data-act="speak">🔊</button>
          <button class="word-pop-btn" data-act="add">+ Add to deck</button>
        </div>
      `;
      pop.querySelector('[data-act="speak"]').addEventListener('click', () => {
        if (!NarrationEngine.speakLang(word, lang.ttsLangCode || lang.code, 0.8)) {
          showToast(`No ${lang.name} voice on this device — audio unavailable.`, 'info', 3000);
        }
      });
      pop.querySelector('[data-act="add"]').addEventListener('click', async (e) => {
        const btn = e.target;
        btn.disabled = true;
        try {
          await dbAppendLangCards(lang.id, [{
            front: sentence.trim() || word,
            back: `${g.meaning}${sentence.trim() ? ` — "${word}"` : ''}`,
            word,
            romanization: g.romanization || null,
            type: 'vocab'
          }]);
          btn.textContent = '✓ In deck';
        } catch (err) {
          btn.textContent = 'Save failed';
        }
      });
    } catch (err) {
      pop.querySelector('.word-pop-body').textContent = 'Lookup unavailable.';
    }
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

  // ── GRAMMAR (the Instructor teaches the rule) ──
  // The language-focused learning strand: state the rule outright, show the
  // pattern, work through examples, name the trap. This is the part an adult
  // can use that a child can't, and it is what the rest of the session then
  // practises.
  renderGrammar() {
    const { lang, lesson, unit } = this;
    const g = lesson.grammar;
    const body = document.getElementById('lang-session-body');

    if (!g || !unit) { this.next(); return; }   // recipe without a syllabus

    body.innerHTML = `
      <div class="prime-kicker">${unit.stage ? escapeAttr(unit.stage) : `Rule ${this.unitIndex + 1}`} · ${lang.name}</div>
      ${this.dotsHtml()}
      ${grammarUnitHtml(unit, g, lang, lesson.formMarkers)}
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-grammar-continue">Practise it →</button>
      </div>
    `;

    bindGrammarUnit(body, g, lang, (el, shipped) => this.bindWordTaps(el, shipped));
    document.getElementById('btn-grammar-continue').addEventListener('click', () => this.next());
  },

  // ── DRILL (the Instructor checks the rule stuck) ──
  // Generative practice, which the course had none of. cloze and build grade
  // locally and instantly; transform and translate go to the grader. A missed
  // drill comes back once at the end of the set before the unit is judged.
  renderDrill() {
    const { lang, lesson, unit } = this;
    const g = lesson.grammar;
    if (!g?.drills?.length || !unit) { this.next(); return; }

    if (!this.drillQueue) {
      this.drillQueue = g.drills.map((d, i) => ({ ...d, _id: i, _retry: false }));
      this.drillIdx = 0;
      this.drillResults = [];
    }
    this.renderDrillItem();
  },

  renderDrillItem() {
    const { lang, unit } = this;
    const body = document.getElementById('lang-session-body');
    const drill = this.drillQueue[this.drillIdx];

    if (!drill) { this.finishDrills(); return; }

    const total = this.drillQueue.length;
    const kindLabel = {
      cloze: 'Fill the gap', build: 'Put it in order',
      transform: 'Change it', translate: 'Say it in ' + lang.name
    }[drill.kind] || 'Practise';

    // "build" hands them the words as chips; the rest take free text.
    const inputHtml = drill.kind === 'build'
      ? `<div class="drill-chips" id="drill-chips">
           ${shuffleArray([...(drill.options || [])]).map(w => `<button class="drill-chip" data-word="${escapeAttr(w)}">${w}</button>`).join('')}
         </div>
         <div class="drill-built" id="drill-built"></div>`
      : `<textarea class="cp-answer drill-input" id="drill-input" rows="2"
           placeholder="${drill.kind === 'cloze' ? 'The missing word…' : `Your answer in ${lang.name}…`}"></textarea>`;

    body.innerHTML = `
      <div class="prime-kicker">Practice · ${unit.title}</div>
      ${this.dotsHtml()}
      <p class="story-title-gloss">${this.drillIdx + 1} of ${total} · ${kindLabel}</p>
      <div class="drill-card">
        <div class="drill-prompt">${drill.prompt}</div>
        ${inputHtml}
        <div class="drill-verdict" id="drill-verdict"></div>
        <div class="drill-actions">
          <button class="btn btn-ghost btn-sm" id="btn-drill-hint">Hint</button>
          <button class="btn btn-primary" id="btn-drill-check">Check</button>
        </div>
      </div>
      <div class="consolidate-actions">
        <button class="btn btn-ghost btn-sm" id="btn-drill-skip">Skip this one</button>
      </div>
    `;

    // build: tapping chips assembles the sentence, tapping a placed word removes it
    let built = [];
    if (drill.kind === 'build') {
      const builtEl = document.getElementById('drill-built');
      const redraw = () => {
        builtEl.innerHTML = built.map((w, i) => `<button class="drill-chip placed" data-i="${i}">${w}</button>`).join('');
        builtEl.querySelectorAll('.drill-chip').forEach(c => c.addEventListener('click', () => {
          built.splice(parseInt(c.dataset.i), 1); redraw();
        }));
      };
      body.querySelectorAll('#drill-chips .drill-chip').forEach(c => {
        c.addEventListener('click', () => { built.push(c.dataset.word); redraw(); });
      });
    }

    document.getElementById('btn-drill-hint').addEventListener('click', (e) => {
      document.getElementById('drill-verdict').innerHTML =
        `<div class="drill-hint">${drill.hint || 'Look back at the pattern you just read.'}</div>`;
      e.target.style.display = 'none';
    });

    document.getElementById('btn-drill-skip').addEventListener('click', () => {
      this.drillResults.push({ id: drill._id, passed: false });
      this.drillIdx += 1;
      this.renderDrillItem();
    });

    document.getElementById('btn-drill-check').addEventListener('click', async () => {
      const btn = document.getElementById('btn-drill-check');
      const verdictEl = document.getElementById('drill-verdict');
      const answer = drill.kind === 'build'
        ? built.join(' ')
        : (document.getElementById('drill-input')?.value || '').trim();
      if (!answer) return;

      btn.disabled = true;
      let result;
      try {
        result = await this.gradeDrill(drill, answer);
      } catch (err) {
        console.warn('Drill grading failed:', err.message);
        result = { verdict: 'pass', feedback: 'Check unavailable — counting it.', correctedAnswer: drill.answer };
      }

      const passed = result.verdict === 'pass';
      updateLevelEstimate(lang.id, passed ? 0.8 : -0.4);
      verdictEl.innerHTML = passed
        ? `<div class="cp-verdict cp-pass">✓ ${result.feedback || 'Correct.'}</div>`
        : `<div class="cp-verdict cp-gap">${result.feedback || 'Not quite.'}
             <div class="drill-correct">${glossify(result.correctedAnswer || drill.answer, lang)}</div>
           </div>`;

      // First miss earns one more go at the end of the set — the same
      // second-chance logic the shadow strand already uses for rough lines.
      if (!passed && !drill._retry) {
        this.drillQueue.push({ ...drill, _retry: true });
      } else {
        this.drillResults.push({ id: drill._id, passed });
      }

      btn.textContent = 'Next →';
      btn.disabled = false;
      btn.onclick = () => { this.drillIdx += 1; this.renderDrillItem(); };
    });

    const input = document.getElementById('drill-input');
    if (input) {
      input.focus();
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); document.getElementById('btn-drill-check').click(); }
      });
    }
  },

  // cloze and build are decidable locally — no network, instant feedback.
  async gradeDrill(drill, answer) {
    const norm = s => String(s).toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')   // ignore missing accents
      .replace(/[.,!?¿¡;:"']/g, '').replace(/\s+/g, ' ').trim();

    if (drill.kind === 'cloze' || drill.kind === 'build') {
      const passed = norm(answer) === norm(drill.answer);
      return {
        verdict: passed ? 'pass' : 'gap',
        feedback: passed ? 'Correct.' : 'Not quite — here it is:',
        correctedAnswer: drill.answer
      };
    }
    if (AppState.mode === 'demo') {
      const passed = norm(answer) === norm(drill.answer) || answer.length > 4;
      return { verdict: passed ? 'pass' : 'gap', feedback: passed ? 'Correct.' : 'Check the pattern again.', correctedAnswer: drill.answer };
    }
    return await callDrillGrader(this.lang, this.unit, drill, answer);
  },

  // Mastery gate: 75% of the unit's drills. Passing unlocks the next unit
  // immediately — the learner sets the pace, not the calendar.
  async finishDrills() {
    const { lang, unit } = this;
    const results = this.drillResults;
    const passedCount = results.filter(r => r.passed).length;
    const mastered = results.length > 0 && (passedCount / results.length) >= 0.75;

    this.drillQueue = null;
    this.unitMastered = mastered;
    this.drillScore = { passed: passedCount, total: results.length };

    if (mastered && unit) {
      const list = lang.unitsMastered || [];
      if (!list.includes(unit.id)) {
        lang.unitsMastered = [...list, unit.id];
        try {
          await dbPatchLanguage(lang.id, { unitsMastered: lang.unitsMastered });
        } catch (err) { console.warn('Mastery save failed:', err.message); }
      }
    }
    this.next();
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
          <span class="story-target">${glossify(s.text, lang)}</span>
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
      <p class="story-title-gloss">${lesson.titleGloss} · tap a word for its meaning, or the line for the whole sentence</p>
      <div class="story-body">${sentencesHtml}</div>
      <div class="story-checkpoints">
        <div class="recall-col-head" style="color:var(--purple)"><i style="background:var(--purple)"></i>Did you follow it?</div>
        ${checkpointsHtml}
      </div>
      <div class="consolidate-actions">
        <button class="btn btn-primary" id="btn-story-continue">Continue →</button>
      </div>
    `;

    // Tap a sentence → toggle its gloss. Word taps stopPropagation, so tapping
    // a single word looks it up without also flipping the whole translation.
    body.querySelectorAll('.story-sentence-text').forEach(el => {
      el.addEventListener('click', () => {
        const gloss = el.querySelector('.story-gloss');
        gloss.style.display = gloss.style.display === 'none' ? 'block' : 'none';
      });
    });

    // Per-sentence shipped glosses mean most word taps cost nothing
    body.querySelectorAll('.story-sentence').forEach((row, i) => {
      this.bindWordTaps(row, lesson.sentences[i]?.wordGlosses || null);
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

  // ── TUTOR (the taught strand) ──
  // The same tutor the language card opens, mounted inside the session so the
  // teaching happens where the rest of the lesson does.
  renderTutor() {
    const body = document.getElementById('lang-session-body');
    QuranTutor.mount(body, {
      lang: this.lang,
      syllabus: this.syllabus || [],
      unitIndex: this.unitIndex,
      unit: this.unit,
      embedded: true
    });
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
      // Partner replies are the richest source of unknown words in the whole
      // session, so they get the same tap-for-meaning treatment as the story.
      if (role === 'partner') {
        div.innerHTML = glossify(content, lang);
        this.bindWordTaps(div);
      } else {
        div.textContent = content;
      }
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
        // The Companion takes its orders from the Instructor: the unit under
        // study steers what it asks and what it corrects, and intensity sets
        // how hard it pushes.
        reply = await callLangPartner(lang, lang.level, lesson.chatTopic || '', this.chatHistory, userMessage, {
          unit: this.unit,
          intensity: lang.intensity || 'normal'
        });
      }

      addBubble('partner', reply);
      this.chatHistory.push({ role: 'partner', content: reply });

      // Cache the conversation so reopening this unit restores it
      dbPutLangLesson(lang.id, this.lessonKey || todayKey(), { chat: this.chatHistory }).catch(() => {});
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
    const { lang, lesson, unit } = this;
    const body = document.getElementById('lang-session-body');
    const words = lesson.newWords || [];
    const hasNextUnit = this.syllabus && this.unitIndex + 1 < this.syllabus.length;
    const nextUnit = hasNextUnit ? this.syllabus[this.unitIndex + 1] : null;

    const wordsHtml = words.map(w => `
      <div class="new-word-row">
        <span class="new-word">${w.word}${w.romanization ? ` <em>${w.romanization}</em>` : ''}</span>
        <span class="new-word-meaning">${w.meaning}</span>
      </div>
    `).join('');

    const masteryHtml = unit ? `
      <div class="wrap-unit-line ${this.unitMastered ? 'mastered' : 'partial'}">
        ${this.unitMastered
          ? `✓ <strong>${unit.title}</strong> — mastered${this.drillScore ? ` (${this.drillScore.passed}/${this.drillScore.total} drills)` : ''}`
          : `<strong>${unit.title}</strong> — ${this.drillScore ? `${this.drillScore.passed}/${this.drillScore.total} drills` : 'more practice needed'}. This unit will come round again.`}
      </div>` : '';

    body.innerHTML = `
      <div class="prime-kicker">Session wrap · ${lang.name}</div>
      ${this.dotsHtml()}
      <h3 class="consolidate-title">${words.length ? `${words.length} new word${words.length === 1 ? '' : 's'} joined your deck` : 'Nice work'}</h3>
      ${masteryHtml}
      ${lesson.summary ? `<p class="wrap-summary">${escapeAttr(lesson.summary)}</p>` : ''}
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
      <div class="consolidate-actions wrap-actions">
        ${hasNextUnit ? `<button class="btn btn-primary" id="btn-next-unit">Next: ${nextUnit.title} →</button>` : ''}
        <button class="btn ${hasNextUnit ? 'btn-ghost' : 'btn-primary'}" id="btn-session-done">${hasNextUnit ? 'Stop here' : 'Done →'}</button>
      </div>
      ${hasNextUnit ? `<p class="wrap-pace-note">Keep going as long as you like — there's no daily limit.</p>` : ''}
    `;

    // Persist once per lesson: new vocabulary, the unit's pattern cards, and
    // the profile counters. Written through dbPatchLanguage so a level flush
    // that lands mid-session isn't overwritten by a stale in-memory copy.
    if (!lesson.cardsAdded) {
      lesson.cardsAdded = true;
      const cards = words.map(w => ({
        front: w.exampleSentence || w.word,
        back: `${w.meaning}${w.exampleSentence ? ` — "${w.word}"` : ''}`,
        word: w.word,
        romanization: w.romanization || null,
        type: 'vocab'
      }));

      // The rules get spaced-repeated too, not just the vocabulary — each
      // mastered unit leaves its worked examples behind as grammar cards.
      if (this.unitMastered && unit && lesson.grammar?.examples?.length) {
        lesson.grammar.examples.slice(0, 3).forEach(ex => {
          if (!ex.gloss || !ex.text) return;
          cards.push({
            front: `${ex.gloss}\n(${unit.structure})`,
            back: ex.text,
            word: unit.title,
            romanization: ex.romanization || null,
            type: 'grammar'
          });
        });
      }

      try {
        if (cards.length) await dbAppendLangCards(lang.id, cards);
        await dbPutLangLesson(lang.id, this.lessonKey || todayKey(), { cardsAdded: true });

        const patch = {};

        // Streak: bumps once per calendar day. It is a habit indicator only —
        // nothing about progression is gated on it.
        const today = todayKey();
        const last = lang.lastSessionAt ? new Date(lang.lastSessionAt) : null;
        const lastKey = last ? `${last.getFullYear()}-${String(last.getMonth() + 1).padStart(2, '0')}-${String(last.getDate()).padStart(2, '0')}` : null;
        if (lastKey !== today) {
          const yesterday = new Date(Date.now() - 86400000);
          const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
          lang.streak = lastKey === yKey ? (lang.streak || 0) + 1 : 1;
          lang.lastSessionAt = Date.now();
          patch.streak = lang.streak;
          patch.lastSessionAt = lang.lastSessionAt;
        }
        lang.sessionNumber = (lang.sessionNumber || 0) + 1;
        patch.sessionNumber = lang.sessionNumber;

        if (words.length) {
          lang.knownWords = [...(lang.knownWords || []), ...words.map(w => w.word)].slice(-500);
          lang.wordsLearned = (lang.wordsLearned || 0) + words.length;
          patch.knownWords = lang.knownWords;
          patch.wordsLearned = lang.wordsLearned;
        }

        // Mastering the unit moves the pointer on. A unit not yet mastered
        // leaves it where it is, so the next session repeats it.
        if (this.unitMastered && hasNextUnit) {
          lang.unitIndex = this.unitIndex + 1;
          patch.unitIndex = lang.unitIndex;
        }

        // Quranic recipe: today's root joins the learned list → coverage grows
        if (this.recipe?.id === 'quranic' && lesson.rootId && !(lang.rootsLearned || []).includes(lesson.rootId)) {
          lang.rootsLearned = [...(lang.rootsLearned || []), lesson.rootId];
          patch.rootsLearned = lang.rootsLearned;
        }
        await dbPatchLanguage(lang.id, patch);
      } catch (err) {
        console.warn('Session wrap persistence failed:', err.message);
      }
    }

    // The uncapped path: straight into the next unit, same sitting.
    const nextBtn = document.getElementById('btn-next-unit');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.start(lang, this.unitIndex + 1));
    }
    document.getElementById('btn-session-done').addEventListener('click', async () => {
      this.close();
      await renderLanguages();
    });
  }
};

// ── THE QURANIC LESSON PAGE ──────────────────────────────────────────────────
// Ten sections, identical on every one of the forty lessons, rendered from
// quran-course-data.js. Nothing here is generated at runtime and nothing is
// awaited — the whole page exists before it is asked for.
//
// The shape came out of the design conversation with GPT-5.2. Its argument, and
// it is right: this page is READ, so its job is not practice. It is to give one
// mental model, show just enough worked examples to make it stick, and say
// exactly what to look for in the muṣḥaf. Practice is the quiz's job; questions
// are the tutor's.
//
// ── THE COLOUR SYSTEM ───────────────────────────────────────────────────────
// One colour per grammatical role, fixed across all forty lessons and never
// reassigned. That consistency IS the teaching: it trains the eye to segment a
// word before the reader can consciously parse it. Rainbow colouring without a
// stable legend looks like more work and teaches nothing.
const ROLE_LABELS = {
  particle:        'particle',
  preposition:     'preposition',
  attachedPronoun: 'attached pronoun',
  verbPrefix:      'verb prefix',
  verbSuffix:      'verb ending',
  root:            'root letters',
  nounEnding:      'case ending',
  plain:           ''
};

// An Arabic snippet with each piece coloured by what it is. The pieces come
// pre-segmented and corpus-verified — see tools/build-course.cjs, which refuses
// to ship a segmentation that does not rebuild its own snippet.
function annotatedArabic(segments, arabic) {
  if (!segments?.length) return `<span class="ar-plain">${escapeAttr(arabic || '')}</span>`;
  return segments.map(s => {
    const role = ROLE_LABELS[s.role] !== undefined ? s.role : 'plain';
    return role === 'plain'
      ? `<span class="ar-plain">${escapeAttr(s.text)}</span>`
      : `<span class="ar-seg ar-${role}" title="${escapeAttr(ROLE_LABELS[role])}">${escapeAttr(s.text)}</span>`;
  }).join('');
}

// Which roles a lesson actually uses, so the legend names those and not the
// full set. A legend listing colours that are not on the page is noise.
function roleLegendHtml(lesson) {
  const used = new Set();
  for (const ex of lesson.examples || []) {
    for (const s of ex.segments || []) if (s.role && s.role !== 'plain') used.add(s.role);
  }
  for (const a of lesson.anatomy || []) {
    for (const b of a.blocks || []) if (b.role && b.role !== 'plain') used.add(b.role);
  }
  if (!used.size) return '';
  return `<div class="role-legend">${[...used].map(r =>
    `<span class="role-key"><i class="ar-${r}"></i>${escapeAttr(ROLE_LABELS[r] || r)}</span>`).join('')}</div>`;
}

// Word anatomy: one written word broken into the blocks it is actually made of,
// each glossed. Comprehension fails at boundaries — a reader who knows رَبّ and
// knows هُمْ can still stall on رَبُّهُمْ — so the boundary is what gets drawn.
function anatomyHtml(anatomy) {
  if (!anatomy?.length) return '';
  return `
    <section class="lesson-sec">
      <h3 class="lesson-sec-head">Inside the word</h3>
      <div class="anatomy-set">
        ${anatomy.map(a => `
          <figure class="anatomy">
            <div class="anatomy-whole">${escapeAttr(a.word || '')}</div>
            <div class="anatomy-blocks">
              ${(a.blocks || []).map(b => `
                <div class="anatomy-block ar-${ROLE_LABELS[b.role] !== undefined ? b.role : 'plain'}">
                  <span class="anatomy-ar">${escapeAttr(b.text)}</span>
                  <span class="anatomy-gloss">${escapeAttr(b.gloss || '')}</span>
                </div>`).join('<span class="anatomy-join">+</span>')}
            </div>
            ${a.note ? `<figcaption class="anatomy-note">${escapeAttr(a.note)}</figcaption>` : ''}
          </figure>`).join('')}
      </div>
    </section>`;
}

// A worked example, in the five lines GPT-5.2 argued for: the Arabic, the same
// Arabic annotated, a tight literal gloss, the smooth meaning, and one line on
// what THIS example shows that the last one did not. Fewer examples, each
// properly explained, beats more of them listed.
function workedExamplesHtml(examples) {
  if (!examples?.length) return '';
  return `
    <section class="lesson-sec">
      <div class="lesson-sec-bar">
        <h3 class="lesson-sec-head">See it in the Qur'an</h3>
        <button class="annot-toggle" id="btn-annot-toggle" aria-pressed="true">Hide the colours</button>
      </div>
      <div class="worked-set">
        ${examples.map((ex, i) => `
          <article class="worked" data-idx="${i}">
            <div class="worked-head">
              <button class="grammar-play worked-play" data-idx="${i}" title="Hear it">
                <svg viewBox="0 0 20 20" fill="currentColor"><path d="M6 4l10 6-10 6V4z"/></svg>
              </button>
              <cite class="worked-ref">${escapeAttr(ex.surah || '')} · ${escapeAttr(ex.ref || '')}</cite>
            </div>
            <p class="worked-ar" dir="rtl" lang="ar">${annotatedArabic(ex.segments, ex.arabic)}</p>
            ${ex.literal ? `<p class="worked-literal">${escapeAttr(ex.literal)}</p>` : ''}
            ${ex.smooth ? `<p class="worked-smooth">${escapeAttr(ex.smooth)}</p>` : ''}
            ${ex.whatChanged ? `<p class="worked-changed">${escapeAttr(ex.whatChanged)}</p>` : ''}
          </article>`).join('')}
      </div>
    </section>`;
}

// The whole lesson page.
function quranLessonHtml(lesson, formMarkers = null) {
  if (!lesson) return '';

  const patternHtml = lesson.pattern?.rows?.length ? `
    <section class="lesson-sec">
      <h3 class="lesson-sec-head">The shape to recognise</h3>
      ${lesson.pattern.caption ? `<p class="lesson-sec-sub">${escapeAttr(lesson.pattern.caption)}</p>` : ''}
      <div class="lesson-table-wrap">
        <table class="lesson-table">
          ${lesson.pattern.columns?.length ? `<thead><tr>${
            lesson.pattern.columns.map(c => `<th>${escapeAttr(c)}</th>`).join('')}</tr></thead>` : ''}
          <tbody>${lesson.pattern.rows.map(r =>
            `<tr>${(Array.isArray(r) ? r : [r]).map((c, i) =>
              `<td${i === 0 ? ' class="lt-key"' : ''}>${escapeAttr(c)}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>` : '';

  // The structural key sits beside every lesson in the patterns unit, folded
  // away so it never crowds the teaching. Which lessons get it is an explicit
  // list in quran-grammar-data.js, not a match on the title — a title match
  // put it on lessons that merely said "form" in passing and left it off ones
  // that needed it.
  const wantsKey = typeof QURAN_FORM_KEY_UNITS !== 'undefined'
    ? QURAN_FORM_KEY_UNITS.has(lesson.id)
    : /\bforms?\b/i.test(lesson.title || '');
  const markersHtml = (formMarkers?.length && wantsKey) ? `
    <details class="form-markers">
      <summary class="form-markers-head">Every form, and what marks it</summary>
      <div class="form-markers-wrap">
        <table class="form-markers-table">
          <thead><tr><th>Form</th><th>What marks it</th><th>What it does</th></tr></thead>
          <tbody>${formMarkers.map(m => `
            <tr><td class="fm-num">${escapeAttr(m.form)}</td>
                <td class="fm-cell">${escapeAttr(m.marker)}</td>
                <td class="fm-cell">${escapeAttr(m.sense)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </details>` : '';

  return `
    <header class="lesson-head">
      <h2 class="lesson-h">${escapeAttr(lesson.title)}</h2>
      ${lesson.canDo ? `<p class="lesson-cando">${escapeAttr(lesson.canDo)}</p>` : ''}
    </header>

    <!-- ENGLISH FIRST, ARABIC SECOND. The learner asked for exactly this in
         his own session — "without using Arabic example explain what each of
         the forms do in English. Do it simply" — and engagement went up when
         it happened. So a lesson arrives in three steps and he opens each one
         when he is ready, rather than meeting a wall with Arabic a third of
         the way down it. The steps are the sections it already had; what is
         new is that they are gated and named. -->
    <div class="reveal-step reveal-open" data-step="1">
      <button class="reveal-head" aria-expanded="true">
        <span class="reveal-num">1</span>
        <span class="reveal-name">The idea, in English</span>
        <span class="reveal-mark" aria-hidden="true"></span>
      </button>
      <div class="reveal-body">
        ${lesson.rule ? `
          <aside class="lesson-rule">
            <span class="lesson-rule-label">The rule</span>
            <p>${escapeAttr(lesson.rule)}</p>
          </aside>` : ''}
        ${lesson.why?.length ? `
          <section class="lesson-sec">
            <h3 class="lesson-sec-head">Why it matters</h3>
            <ul class="lesson-why">${lesson.why.map(b => `<li>${escapeAttr(b)}</li>`).join('')}</ul>
          </section>` : ''}
      </div>
    </div>

    <div class="reveal-step" data-step="2">
      <button class="reveal-head" aria-expanded="false">
        <span class="reveal-num">2</span>
        <span class="reveal-name">What to look for</span>
        <span class="reveal-mark" aria-hidden="true"></span>
      </button>
      <div class="reveal-body">
        ${patternHtml}
        ${markersHtml}
        ${anatomyHtml(lesson.anatomy)}
      </div>
    </div>

    <div class="reveal-step" data-step="3">
      <button class="reveal-head" aria-expanded="false">
        <span class="reveal-num">3</span>
        <span class="reveal-name">See it in the Qur'an</span>
        <span class="reveal-mark" aria-hidden="true"></span>
      </button>
      <div class="reveal-body">
        ${roleLegendHtml(lesson)}
        ${workedExamplesHtml(lesson.examples)}
      </div>
    </div>

    ${lesson.traps?.length ? `
      <section class="lesson-sec">
        <h3 class="lesson-sec-head">Traps</h3>
        <div class="trap-set">
          ${lesson.traps.map(t => `
            <div class="trap">
              <p class="trap-claim">${escapeAttr(t.claim || '')}</p>
              ${t.example ? `<p class="trap-ar" dir="rtl" lang="ar">${escapeAttr(t.example)}</p>` : ''}
              ${t.note ? `<p class="trap-note">${escapeAttr(t.note)}</p>` : ''}
            </div>`).join('')}
        </div>
      </section>` : ''}

    ${lesson.checklist?.length ? `
      <section class="lesson-sec">
        <h3 class="lesson-sec-head">Spotting it in the muṣḥaf</h3>
        <ol class="lesson-checklist">${lesson.checklist.map(c =>
          `<li>${escapeAttr(c)}</li>`).join('')}</ol>
      </section>` : ''}

    ${lesson.summary?.length ? `
      <aside class="lesson-summary">
        <span class="lesson-rule-label">In three lines</span>
        <ul>${lesson.summary.map(s => `<li>${escapeAttr(s)}</li>`).join('')}</ul>
      </aside>` : ''}

    ${lesson.quizBridge ? `
      <p class="lesson-bridge">${escapeAttr(lesson.quizBridge)}</p>` : ''}
  `;
}

// ── ONE UNIT, ON A PAGE ───────────────────────────────────────────────────────
// The written teaching for a syllabus unit: what it is, the pattern laid out,
// worked examples you can hear and tap, and the trap at the end. Still used by
// every language OTHER than Quranic Arabic, whose lessons are generated at
// runtime against the `structure` in their syllabus.
// `g` is the generated half and may not have arrived yet. Everything above it —
// the title, what the structure is, why it matters, the form-marker table — is
// curated data sitting in quran-grammar-data.js, so it goes on screen at once
// and the written part fills in underneath. A learner should be reading within
// a moment of opening a lesson, not watching a spinner.
function grammarUnitHtml(unit, g, lang, formMarkers = null) {
  if (!unit) return '';
  if (!g) {
    // The explanation element is here, empty, because the teaching STREAMS into
    // it — see LessonView.open. The note below it is removed by the first chunk.
    return `
      <h3 class="consolidate-title grammar-title">${escapeAttr(unit.title)}</h3>
      <p class="grammar-structure">${unit.structure}</p>
      ${unit.whyItMatters ? `<p class="story-title-gloss">${unit.whyItMatters}</p>` : ''}
      <div class="grammar-explanation" id="lesson-explanation"></div>
      <div class="lesson-pending">
        <span class="cp-spinner"></span>
        <span>Writing this lesson…</span>
      </div>`;
  }

  const tableHtml = g.patternTable?.rows?.length ? `
    <div class="grammar-table-wrap">
      ${g.patternTable.caption ? `<div class="grammar-table-caption">${g.patternTable.caption}</div>` : ''}
      <table class="grammar-table">
        ${g.patternTable.rows.map(r => `
          <tr>
            <th>${r.form || ''}</th>
            <td class="grammar-table-ex">${glossify(r.example || '', lang)}</td>
            <td class="grammar-table-gloss">${r.gloss || ''}</td>
          </tr>
        `).join('')}
      </table>
    </div>` : '';

  const examplesHtml = (g.examples || []).map((ex, i) => `
    <div class="story-sentence" data-idx="${i}">
      <button class="grammar-play" data-idx="${i}" title="Hear it">
        <svg viewBox="0 0 20 20" fill="currentColor"><path d="M6 4l10 6-10 6V4z"/></svg>
      </button>
      <div class="story-sentence-text">
        <span class="story-target">${glossify(ex.text, lang)}</span>
        ${ex.romanization && ['A0', 'A1'].includes(lang.level) ? `<span class="story-rom">${ex.romanization}</span>` : ''}
        <span class="grammar-ex-gloss">${ex.gloss || ''}</span>
      </div>
    </div>
  `).join('');

  // The form-marker table stays on hand through the verb-form unit —
  // identifying a form on sight is learned by repeated reference, not by being
  // shown once. Folded away by default so it never crowds the teaching.
  const markersHtml = (formMarkers?.length && /forms/i.test(unit.title || '')) ? `
    <details class="form-markers">
      <summary class="form-markers-head">How to spot each form on sight</summary>
      <div class="form-markers-wrap">
        <table class="form-markers-table">
          <thead><tr><th>Form</th><th>What marks it</th><th>What it does</th></tr></thead>
          <tbody>
            ${formMarkers.map(m => `
              <tr><td class="fm-num">${escapeAttr(m.form)}</td>
                  <td class="fm-cell">${escapeAttr(m.marker)}</td>
                  <td class="fm-cell">${escapeAttr(m.sense)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </details>` : '';

  return `
    <h3 class="consolidate-title grammar-title">${escapeAttr(unit.title)}</h3>
    <p class="grammar-structure">${unit.structure}</p>
    ${markersHtml}
    ${unit.whyItMatters ? `<p class="story-title-gloss">${unit.whyItMatters}</p>` : ''}
    <div class="grammar-explanation" id="lesson-explanation">${renderMarkdown(g.explanation || '')}</div>
    ${tableHtml}
    ${examplesHtml ? `
      <div class="recall-col-head" style="color:var(--purple)"><i style="background:var(--purple)"></i>See it working</div>
      <div class="story-body">${examplesHtml}</div>` : ''}
    ${g.pitfall ? `
      <div class="grammar-pitfall">
        <span class="grammar-pitfall-label">Watch out</span>
        ${g.pitfall}
      </div>` : ''}
  `;
}

// ▶ speaks the example; tapping a word looks it up. Shipped per-example glosses
// mean most taps cost nothing.
function bindGrammarUnit(scopeEl, g, lang, bindTaps) {
  scopeEl.querySelectorAll('.grammar-play').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const ex = (g.examples || [])[parseInt(btn.dataset.idx)];
      if (!ex) return;
      if (!NarrationEngine.speakLang(ex.text, lang.ttsLangCode || lang.code, 0.85)) {
        showToast(`No ${lang.name} voice on this device — audio unavailable.`, 'info', 3500);
      }
    });
  });
  if (bindTaps) bindTaps(scopeEl, null);
}

// ── THE LESSON ────────────────────────────────────────────────────────────────
// A course lesson, in the shape of a book chapter: the whole thing on one
// scrolling page, a topbar whose title opens every lesson, and a Tutor button
// top-right that swaps to a tutor scoped to what you are reading. No Continue
// buttons — you read, and when you are done you take the next lesson.
const LessonView = {
  lang: null,
  syllabus: [],
  unitIndex: 0,
  unit: null,
  lesson: null,
  written: null,        // the pre-written lesson, when the course has one

  async open(lang, unitIndex = null) {
    this.lang = lang;
    this.unitIndex = unitIndex ?? (lang.unitIndex || 0);

    // The lesson takes over the whole view. Without this the courses grid and
    // the page header stay stacked underneath it, so you scroll off the bottom
    // of a lesson straight into the card you opened it from.
    document.getElementById('view-languages').classList.add('lesson-open');
    document.getElementById('lesson-pane').style.display = 'flex';
    document.getElementById('lesson-tutor-pane').style.display = 'none';
    setFocusMode(true);
    this.showLoading();

    try {
      this.syllabus = await this.loadSyllabus(lang);

      // The course has been reshaped twice. Anyone part-way through an older
      // version is moved onto this one before anything is indexed against it.
      const moved = migrateQuranProgress(lang, this.syllabus);
      if (moved) {
        Object.assign(lang, moved);
        if (unitIndex == null) unitIndex = moved.unitIndex;
        dbPatchLanguage(lang.id, moved).catch(err =>
          console.warn('Could not save the course migration:', err.message));
        console.log(`Moved ${lang.id} onto the ${this.syllabus.length}-lesson course: ` +
          `${moved.unitsMastered.length} lesson(s) kept, resuming at ${moved.unitIndex + 1}.`);
      }

      if (unitIndex == null) this.unitIndex = lang.unitIndex || 0;
      // A syllabus can change length — clamp rather than index off the end.
      if (this.syllabus.length) {
        this.unitIndex = Math.max(0, Math.min(this.unitIndex, this.syllabus.length - 1));
      }
      this.unit = this.syllabus[this.unitIndex] || null;

      // ── The written-out course ────────────────────────────────────────
      // Quranic Arabic is pre-generated into quran-course-data.js, so opening
      // a lesson is a property lookup. It paints in this frame, before any of
      // the housekeeping below, and there is nothing to wait for and nothing
      // that can fail to arrive.
      this.written = this.staticLesson(this.unit);
      if (this.written) {
        this.lesson = { unit: this.unit, formMarkers: QURAN_FORM_MARKERS };
        this.render();
        this.afterOpen(lang);
        return;
      }

      // Every other language still writes its lessons on demand.
      await recoverLangProgress(lang, this.syllabus).catch(() => {});
      backfillLessonCards(lang, this.syllabus).catch(() => {});

      // Which open() this is. A lesson can take ten seconds to write, and in
      // that time the learner may well have moved on — the reply from the one
      // they left must not paint over the one they are looking at.
      const token = ++this._openToken;
      const mine = () => this._openToken === token;

      // On screen straight away with what we already have, then again once the
      // written half lands. A cached lesson resolves immediately and the shell
      // is never seen; an uncached one is readable while it is being written.
      this.lesson = { grammar: null, unit: this.unit, formMarkers: QURAN_FORM_MARKERS };
      this.render();

      // The teaching streams straight into the page it is already rendered on,
      // so a learner starts reading long before the lesson is finished.
      const lesson = await this.lessonFor(this.unitIndex, (piece, full) => {
        if (!mine()) return;
        const el = document.getElementById('lesson-explanation');
        if (!el) return;
        document.querySelector('#lesson-column .lesson-pending')?.remove();
        el.innerHTML = renderMarkdown(full);
      });
      if (!mine()) return;
      this.lesson = lesson;
      this.render();

      // While they read this one, quietly write the next. "Next lesson" is then
      // instant instead of another wait.
      this.prefetchLesson(this.unitIndex + 1);
    } catch (err) {
      console.warn('Lesson failed to load:', err.message);
      document.getElementById('lesson-column').innerHTML = `
        <div class="cp-fallback" style="text-align:center; padding:2rem 0;">
          Couldn't build this lesson: ${escapeAttr(err.message)}
        </div>
        <div class="consolidate-actions">
          <button class="btn btn-ghost" id="btn-lesson-retry">Try again</button>
        </div>`;
      document.getElementById('btn-lesson-retry')
        ?.addEventListener('click', () => this.open(this.lang, this.unitIndex));
    }
  },

  close() {
    document.getElementById('view-languages').classList.remove('lesson-open');
    document.body.classList.remove('tutor-open');
    document.getElementById('lesson-pane').style.display = 'none';
    document.getElementById('lesson-tutor-pane').style.display = 'none';
    this.closeLessonJump();
    setFocusMode(false);
    this.lang = null;
    this.lesson = null;
    this.written = null;
    renderLanguages();
  },

  showLoading() {
    document.getElementById('lesson-column').innerHTML = `
      <div class="cp-loading" style="justify-content:center; padding:4rem 0;">
        <span class="cp-spinner"></span> Opening your lesson…
      </div>`;
    document.getElementById('lesson-title-btn').textContent = 'Loading…';
  },

  // Hand-written for Quranic Arabic, generated-and-cached for anything else.
  loadSyllabus(lang) { return loadCourseSyllabus(lang); },

  // The written-out lesson for a unit, if this COURSE has one. Quranic Arabic
  // does; nothing else does yet.
  //
  // Gated on the recipe, not just the unit id. Matching on the id alone meant
  // any other language whose syllabus happened to use one of these ids was
  // served Quranic content — which is not a hypothetical, it is what a test
  // fixture did within an hour of this being written.
  //
  // Also guarded on the global existing, so the app still runs if
  // quran-course-data.js is missing.
  staticLesson(unit) {
    if (!unit?.id || typeof quranLesson !== 'function') return null;
    if (getRecipe(this.lang).ui?.staticSyllabus !== 'QURAN_GRAMMAR') return null;
    return quranLesson(unit.id);
  },

  // The housekeeping a lesson used to wait for. It restores progress and files
  // cards, and none of it has anything to say about what is on the page — so
  // it runs after the page is already up.
  afterOpen(lang) {
    recoverLangProgress(lang, this.syllabus)
      .then(() => this.renderChrome())
      .catch(() => {});
    backfillLessonCards(lang, this.syllabus).catch(() => {});
  },

  // A slice of the course landed while this one was being read. Only the
  // chrome moves — repainting the page would scroll the learner back to the
  // top and wipe any teaching still streaming into it.
  syllabusGrew(units) {
    if (!units?.length || units.length <= this.syllabus.length) return;
    this.syllabus = units;
    this.renderChrome();
    // And the lessons list, if it happens to be open in front of them.
    if (document.getElementById('lesson-jump')?.style.display === 'flex') {
      this.openLessonJump();
    }
  },

  _openToken: 0,

  loadLesson() { return this.lessonFor(this.unitIndex); },

  // Cached per unit, and regenerated when the lesson shape changes underneath
  // it. In-flight generations are shared, so the prefetch and a learner who
  // taps "next lesson" before it finishes wait on the SAME call rather than
  // paying for two.
  _inflight: {},

  async lessonFor(index, onChunk = null) {
    const unit = this.syllabus[index];
    if (!unit) return null;
    const lang = this.lang;
    const key = unitKey(index);
    const cacheKey = `${lang.id}_${key}`;
    if (this._inflight[cacheKey]) return this._inflight[cacheKey];

    const job = (async () => {
      let lesson = await dbGetLangLesson(lang.id, key).catch(() => null);
      if (lesson && (lesson.schemaVersion || 0) < LESSON_SCHEMA_VERSION) lesson = null;
      if (lesson?.grammar) return lesson;

      // Enough verses for four examples and a pattern table without them all
      // coming from one page of the muṣḥaf. Ten rather than twenty: the block
      // is a fifth of the prompt, and ten is already more than the lesson uses.
      let verses = [];
      if (AppState.mode !== 'demo') {
        try {
          await loadQuranText();
          verses = pickQuranVerses(10);
        } catch (err) {
          console.warn('Qur\'anic text unavailable for this lesson:', err.message);
        }
      }

      let grammar;
      if (AppState.mode === 'demo') {
        grammar = demoQuranGrammarUnit(unit);
      } else {
        // Both halves at once. The teaching streams onto the page as it is
        // written; the table and examples arrive whenever they arrive. The wall
        // clock is the slower of the two, not the sum, and the first sentence
        // is readable in about a second either way.
        //
        // allSettled, not all: these are two independent calls, and a lesson
        // whose pattern table failed is still a lesson. Failing the pair meant
        // one bad reply from the smaller half threw away teaching that had
        // already been written and put an error where the lesson should be.
        const [written, mech] = await Promise.allSettled([
          callLessonExplanation(lang, unit, lang.knownWords || [], verses, onChunk),
          // The lesson page renders neither drills nor per-word glosses —
          // see the timings on callGrammarUnitGenerator.
          callGrammarUnitGenerator(lang, unit, lang.knownWords || [], verses,
            { withDrills: false, withWordGlosses: false })
        ]);
        if (written.status === 'rejected' && mech.status === 'rejected') {
          throw written.reason;          // nothing came back at all
        }
        if (mech.status === 'rejected') {
          console.warn('Lesson mechanics failed, teaching kept:', mech.reason?.message);
        }
        if (written.status === 'rejected') {
          console.warn('Lesson teaching failed, mechanics kept:', written.reason?.message);
        }
        grammar = { explanation: written.status === 'fulfilled' ? written.value : '',
                    ...(mech.status === 'fulfilled' ? mech.value : {}) };
        // A half-written lesson is worth showing but not worth keeping — the
        // next open should have another go at the part that failed.
        if (written.status === 'rejected' || mech.status === 'rejected') {
          return { grammar, unit, formMarkers: QURAN_FORM_MARKERS, partial: true };
        }
      }

      lesson = { grammar, unit, formMarkers: QURAN_FORM_MARKERS,
                 schemaVersion: LESSON_SCHEMA_VERSION };
      dbPutLangLesson(lang.id, key, lesson)
        .catch(err => console.warn('Lesson cache write failed:', err.message));
      return lesson;
    })();

    this._inflight[cacheKey] = job;
    try { return await job; }
    finally { delete this._inflight[cacheKey]; }
  },

  // Write the next lesson while this one is being read. Failure is silent by
  // design — nothing depends on it, and opening that lesson normally will just
  // generate it the ordinary way.
  prefetchLesson(index) {
    if (index < 0 || index >= this.syllabus.length) return;
    this.lessonFor(index).catch(err =>
      console.warn(`Prefetch of lesson ${index + 1} failed:`, err.message));
  },

  render() {
    const { lang, unit, lesson } = this;
    const total = this.syllabus.length;
    const done = (lang.unitsMastered || []).length;
    const hasNext = this.unitIndex < total - 1;
    const hasPrev = this.unitIndex > 0;

    const column = document.getElementById('lesson-column');
    const written = this.written;
    column.innerHTML = `
      <div class="lesson-kicker">${escapeAttr(unit?.stage || lang.name)}</div>
      ${written
        ? quranLessonHtml(written, lesson.formMarkers)
        : grammarUnitHtml(unit, lesson.grammar, lang, lesson.formMarkers)}
      <div class="lesson-foot" id="lesson-foot"></div>
    `;
    this.renderChrome();

    if (written) this.bindWrittenLesson(column, written, lang);
    else bindGrammarUnit(column, lesson.grammar, lang, (el) => this.bindWordTaps(el));
    document.getElementById('lesson-scroll').scrollTop = 0;


  },

  // Speaking an example, the three-step reveal, the hide-the-answers table, and
  // the toggle that takes the colours off so a reader can check they can still
  // segment a word without them.
  bindWrittenLesson(column, written, lang) {
    // ── The three steps ───────────────────────────────────────────────────
    // Opening one does not close the others: this is a lesson being revealed,
    // not an accordion. Once a step is open it stays open, because going back
    // up to re-read something you have already unlocked is normal.
    column.querySelectorAll('.reveal-step').forEach(step => {
      const head = step.querySelector('.reveal-head');
      head?.addEventListener('click', () => {
        const open = step.classList.toggle('reveal-open');
        head.setAttribute('aria-expanded', String(open));
        if (open) step.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
    });

    // ── Hide the answers ──────────────────────────────────────────────────
    // The نزل exchange, generalised: work down the table with the meanings
    // covered, then reveal and compare. NOTHING IS SCORED and nothing is
    // recorded — across 38 turns of his own session he was never once tested,
    // and that is why it never felt like an exam.
    column.querySelectorAll('.lesson-table-wrap').forEach(wrap => {
      const table = wrap.querySelector('.lesson-table');
      if (!table || table.tBodies[0]?.rows.length < 3) return;
      const bar = document.createElement('div');
      bar.className = 'table-reveal-bar';
      bar.innerHTML = `<button class="table-reveal-btn" type="button">Cover the answers</button>`;
      wrap.parentNode.insertBefore(bar, wrap);
      bar.querySelector('button').addEventListener('click', (e) => {
        const hidden = table.classList.toggle('answers-hidden');
        e.currentTarget.textContent = hidden ? 'Show me' : 'Cover the answers';
      });
    });

    this.bindLessonExtras(column, written, lang);
  },

  bindLessonExtras(column, written, lang) {
    column.querySelectorAll('.worked-play').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const ex = written.examples[parseInt(btn.dataset.idx)];
        if (!ex) return;
        if (!NarrationEngine.speakLang(ex.arabic, 'ar-SA', 0.75)) {
          showToast('No Arabic voice on this device — audio unavailable.', 'info', 3000);
        }
      });
    });

    // ── Format preferences, remembered ────────────────────────────────────
    // He steered format constantly in his own session — "no dashes", "no
    // Arabic examples", "one table only", "exactly how you did before" — and
    // the tutor adapted instantly. A page cannot be asked, so it offers the
    // two switches that mattered and REMEMBERS them, because having to set
    // them again on every lesson is worse than not having them.
    const prefs = LessonView.lessonPrefs();
    if (prefs.annotOff) column.classList.add('lesson-annot-off');
    if (prefs.romanOff) column.classList.add('lesson-roman-off');

    const toggle = column.querySelector('#btn-annot-toggle');
    const paintToggle = () => {
      if (!toggle) return;
      const off = column.classList.contains('lesson-annot-off');
      toggle.textContent = off ? 'Show the colours' : 'Hide the colours';
      toggle.setAttribute('aria-pressed', String(!off));
    };
    paintToggle();
    toggle?.addEventListener('click', () => {
      const off = column.classList.toggle('lesson-annot-off');
      paintToggle();
      LessonView.lessonPrefs({ annotOff: off });
    });

    this.bindWordTaps(column);
  },

  // Everything on the page that depends on HOW LONG THE COURSE IS: the lesson
  // count, the progress bar, and whether the last button says "next lesson" or
  // "finish the course". Kept apart from render() because the course grows
  // while it is being read — a slice of syllabus landing must not scroll the
  // learner back to the top or wipe teaching still streaming onto the page.
  renderChrome() {
    const total = this.syllabus.length;
    const done = (this.lang.unitsMastered || []).length;
    const hasNext = this.unitIndex < total - 1;
    const hasPrev = this.unitIndex > 0;

    document.getElementById('lesson-title-btn').textContent =
      `Lesson ${this.unitIndex + 1} of ${total} · ${this.unit?.title || ''}`;
    document.getElementById('lesson-progress-fill').style.width =
      `${total ? Math.round((done / total) * 100) : 0}%`;

    const foot = document.getElementById('lesson-foot');
    if (!foot) return;
    const next = hasNext ? this.syllabus[this.unitIndex + 1] : null;

    // ── THE PULL FORWARD ──────────────────────────────────────────────────
    // A lesson ends by OFFERING, not by sitting there. This is the single
    // thing that made the original ChatGPT sessions feel like progress:
    // measured across that transcript, 31 of 38 replies ended by proposing
    // the next step, and the learner's own messages were a median of 66
    // characters — "yes", "keep going". He was never navigating; he was
    // accepting. A page with one grey "Next lesson" button asks him to
    // navigate, and that is what "I don't feel any progression" was about.
    //
    // The tutor is deliberately NOT the thing doing this. It stays
    // answer-only. The page pulls; the tutor waits to be asked.
    const milestone = this.unit?.canDoLine || this.written?.canDo || '';
    foot.innerHTML = `
      ${milestone ? `<p class="lesson-milestone"><span>✓</span>${escapeAttr(milestone)}</p>` : ''}
      <div class="lesson-next">
        ${hasNext ? `
          <button class="btn btn-primary lesson-next-main" id="btn-lesson-next">
            <span class="lesson-next-label">Carry on</span>
            <span class="lesson-next-title">${escapeAttr(next.title)}</span>
          </button>` : `
          <button class="btn btn-primary lesson-next-main" id="btn-lesson-done">
            <span class="lesson-next-label">Finish the course</span>
            <span class="lesson-next-title">That is the last lesson</span>
          </button>`}
        <div class="lesson-next-side">
          <button class="btn btn-ghost btn-sm" id="btn-lesson-ask-more">Ask about this →</button>
          <button class="btn btn-ghost btn-sm" id="btn-lesson-quiz">Try it on a verse →</button>
          ${hasPrev ? `<button class="btn btn-ghost btn-sm" id="btn-lesson-prev">← Back one</button>` : ''}
        </div>
      </div>`;

    document.getElementById('btn-lesson-prev')
      ?.addEventListener('click', () => this.goTo(this.unitIndex - 1, false));
    document.getElementById('btn-lesson-next')
      ?.addEventListener('click', () => this.goTo(this.unitIndex + 1, true));
    document.getElementById('btn-lesson-ask-more')
      ?.addEventListener('click', () => this.showTutor('teach'));
    document.getElementById('btn-lesson-quiz')
      ?.addEventListener('click', () => this.showTutor('quiz'));
    document.getElementById('btn-lesson-done')?.addEventListener('click', async () => {
      await this.markRead();
      showToast('That\'s the whole course. Keep the review deck warm.', 'success', 4000);
      this.close();
    });
  },

  // Read, or read-and-write, the format preferences. Kept in IndexedDB beside
  // the other local-only settings rather than in Firestore: this is a display
  // choice, not progress, and it should not need a sync to take effect.
  lessonPrefs(patch = null) {
    this._prefs = this._prefs || { annotOff: false, romanOff: false };
    if (patch) {
      Object.assign(this._prefs, patch);
      dbPut('settings', { key: 'lessonPrefs', value: this._prefs })
        .catch(err => console.warn('Could not save the display preference:', err.message));
    }
    return this._prefs;
  },

  async loadLessonPrefs() {
    try {
      const rec = await dbGet('settings', 'lessonPrefs');
      if (rec?.value) this._prefs = { annotOff: false, romanOff: false, ...rec.value };
    } catch (_) { /* first run, or no IndexedDB — the defaults are fine */ }
  },

  // Word taps reuse the session's popover — same three gloss sources, same cache.
  bindWordTaps(scopeEl) {
    scopeEl.querySelectorAll('.w').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const sentence = el.closest('.story-target, .grammar-table-ex')?.textContent || '';
        LangSession.lang = this.lang;   // the popover reads the language off it
        LangSession.showWordPopover(el, el.dataset.word, sentence, null);
      });
    });
  },

  // Moving forward counts as having read it; moving back does not un-read it.
  async goTo(index, markCurrentRead) {
    if (index < 0 || index >= this.syllabus.length) return;
    if (markCurrentRead) await this.markRead();
    await this.open(this.lang, index);
  },

  async markRead() {
    const { lang, unit } = this;
    if (!unit) return;
    const patch = {};
    const mastered = lang.unitsMastered || [];
    if (!mastered.includes(unit.id)) {
      lang.unitsMastered = [...mastered, unit.id];
      patch.unitsMastered = lang.unitsMastered;
    }
    // The pointer only ever moves forward — revisiting lesson 2 having reached
    // lesson 6 must not send you back to 3.
    const next = Math.min(this.unitIndex + 1, this.syllabus.length - 1);
    if (next > (lang.unitIndex || 0)) {
      lang.unitIndex = next;
      patch.unitIndex = next;
    }
    if (Object.keys(patch).length) {
      try { await dbPatchLanguage(lang.id, patch); }
      catch (err) { console.warn('Lesson progress save failed:', err.message); }
    }

    // A lesson you have read becomes cards. Without this the course had no
    // deck at all — it appeared nowhere in Flashcards, because there was
    // nothing in it to review.
    await this.fileLessonCards();
  },

  // Cards from the lesson just read: the rule itself, and each example the
  // lesson used. Filed on markRead rather than on generation, so a lesson
  // written ahead by the prefetch does not put cards in your deck for something
  // you have not looked at yet.
  async fileLessonCards() {
    const { lang, unit, lesson, written } = this;
    const g = lesson?.grammar;
    // Either half of the course can supply the examples: the shipped data for
    // the written-out course, the cached lesson for a generated one.
    if (!lang || !unit || (!g && !written)) return;

    const cards = [];
    // The rule, in the unit's own words — curated, so it is worth having even
    // when the written half is thin.
    if (unit.structure) {
      cards.push({
        front: unit.title,
        back: unit.structure,
        word: '',
        romanization: null,
        type: 'grammar',
        unitId: unit.id
      });
    }
    // Each example: the Arabic on the front, what it means on the back.
    const examples = written
      ? written.examples.map(ex => ({ text: ex.arabic, gloss: ex.smooth, romanization: null }))
      : (g?.examples || []);
    for (const ex of examples.slice(0, 4)) {
      if (!ex.text || !ex.gloss) continue;
      cards.push({
        front: ex.text,
        back: ex.gloss,
        word: ex.text,
        romanization: ex.romanization || null,
        type: 'grammar',
        unitId: unit.id
      });
    }
    if (!cards.length) return;

    try {
      // Re-reading a lesson must not file it twice, so anything already in the
      // deck with the same front is skipped.
      const have = new Set();
      for (const batch of await dbGetLangCardBatches(lang.id)) {
        for (const c of batch.flashcards || []) have.add(String(c.front).trim());
      }
      const fresh = cards.filter(c => !have.has(String(c.front).trim()));
      if (fresh.length) {
        await dbAppendLangCards(lang.id, fresh);
        console.log(`Filed ${fresh.length} card(s) from "${unit.title}".`);
      }
    } catch (err) {
      console.warn('Could not file lesson cards:', err.message);
    }
  },

  // ── The lessons list, off the title ──
  openLessonJump() {
    const wrap = document.getElementById('lesson-jump');
    const list = document.getElementById('lesson-jump-list');
    if (!wrap || !list || !this.syllabus.length) return;

    const done = new Set(this.lang?.unitsMastered || []);
    list.innerHTML = this.syllabus.map((u, i) => `
      <button class="chapter-jump-item${i === this.unitIndex ? ' current' : ''}" data-unit="${i}">
        <span class="chapter-jump-num">${i + 1}</span>
        <span class="chapter-jump-title">${escapeAttr(u.title)}</span>
        ${done.has(u.id) ? '<span class="chapter-jump-mark">✓</span>' : ''}
      </button>`).join('') +
      // The course is written in slices, so a learner who opens this list two
      // minutes in should be told the short list is temporary rather than left
      // to conclude the course is eight lessons long.
      (_syllabusFills[this.lang?.id]
        ? `<div class="lesson-jump-note">Writing the rest of the course… ${this.syllabus.length} of ${SYLLABUS_TOTAL} lessons ready.</div>`
        : '');

    list.querySelectorAll('.chapter-jump-item').forEach(btn => {
      btn.addEventListener('click', async () => {
        const i = parseInt(btn.dataset.unit);
        this.closeLessonJump();
        if (i !== this.unitIndex) await this.open(this.lang, i);
      });
    });

    wrap.style.display = 'flex';
    list.querySelector('.chapter-jump-item.current')?.scrollIntoView({ block: 'center' });
  },

  closeLessonJump() {
    const wrap = document.getElementById('lesson-jump');
    if (wrap) wrap.style.display = 'none';
  },

  // ── The tutor, on the lesson you are reading ──
  // `mode` lets the lesson's own buttons land the learner in the right place —
  // "Ask about this" opens the answering side, "Try it on a verse" opens the
  // quiz. Both are offers made BY the page; the tutor still never proposes
  // anything itself.
  showTutor(mode = 'teach') {
    document.getElementById('lesson-pane').style.display = 'none';
    // Lifts the floating menu button clear of the composer — on a phone they
    // share the bottom-right corner, and it sits on top of Send.
    document.body.classList.add('tutor-open');
    const pane = document.getElementById('lesson-tutor-pane');
    pane.style.display = 'flex';
    // The topbar names the lesson, so the tutor body doesn't have to repeat it
    document.getElementById('lesson-tutor-title').textContent =
      `Lesson ${this.unitIndex + 1} · ${this.unit?.title || ''}`;
    QuranTutor.mount(document.getElementById('lesson-tutor-body'), {
      lang: this.lang,
      syllabus: this.syllabus,
      unitIndex: this.unitIndex,
      unit: this.unit,
      mode
    });
  },

  showLesson() {
    document.body.classList.remove('tutor-open');
    document.getElementById('lesson-tutor-pane').style.display = 'none';
    document.getElementById('lesson-pane').style.display = 'flex';
    // Mastery reached in the tutor should show on the progress bar straight away
    if (this.lesson) this.render();
  }
};

// ── THE TUTOR ─────────────────────────────────────────────────────────────────
// A tutor bound to one lesson, the way the book tutor is bound to one chapter.
// This is where the practice lives: the examples you want more of, the questions
// you have, and the quizzing. The lesson page teaches; the tutor works you.
//
// Two modes (Teach Me / Quiz) and two scopes (this lesson, which is the default,
// or everything so far). Reached from the Tutor button in the lesson topbar, and
// still mountable inside the old session player for the other recipes. The
// transcript is per lesson and per mode, so coming back picks up where you left
// off and quizzing never bleeds into teaching.
const QuranTutor = {
  lang: null,
  unit: null,
  unitIndex: 0,
  syllabus: [],
  mode: 'teach',
  // Scoped to the lesson you are reading. You open the tutor from inside a
  // lesson, so that lesson is what you want asked about — "everything so far"
  // is still one tap away for anyone who wants the wider view.
  scope: 'unit',
  history: { teach: [], quiz: [] },
  root: null,          // the container it is mounted in
  embedded: false,     // true inside the session player, which owns its own nav
  busy: false,

  // ── Mount into any container ──
  async mount(containerEl, { lang, syllabus, unitIndex, unit, embedded = false,
                             mode = 'teach' }) {
    this.lang = lang;
    this.syllabus = syllabus || [];
    this.unitIndex = unitIndex || 0;
    this.unit = unit || this.syllabus[this.unitIndex] || null;
    this.root = containerEl;
    this.embedded = embedded;
    this.mode = mode === 'quiz' ? 'quiz' : 'teach';
    this.scope = 'unit';
    this.history = { teach: [], quiz: [] };

    this.render();
    await this.loadHistory();
  },

  render() {
    const { lang, unit } = this;
    const el = this.root;
    if (!el) return;

    el.innerHTML = `
      ${this.embedded ? `
        <div class="qtutor-unit">
          <span class="qtutor-unit-n">Lesson ${this.unitIndex + 1} of ${this.syllabus.length || 1}</span>
          <span class="qtutor-unit-title">${escapeAttr(unit?.title || 'Getting started')}</span>
        </div>` : ''}
      <div class="qtutor-bar">
        <div class="qtutor-modes">
          <button class="qtutor-mode${this.mode === 'teach' ? ' active' : ''}" data-tmode="teach">Ask</button>
          <button class="qtutor-mode${this.mode === 'quiz' ? ' active' : ''}" data-tmode="quiz">Quiz me</button>
        </div>
        <div class="qtutor-scope">
          <span class="qtutor-scope-label">Covering</span>
          <button class="qtutor-scope-btn active" data-tscope="unit"
                  title="Only the lesson you are on">This lesson</button>
          <button class="qtutor-scope-btn" data-tscope="cumulative"
                  title="Everything you have covered up to and including this lesson">Everything</button>
        </div>
      </div>
      <div class="lang-chat qtutor-chat"></div>
      <div class="chat-composer">
        <textarea class="cp-answer qtutor-input" rows="1"
                  placeholder="${this.mode === 'quiz' ? 'Your answer…' : 'Ask about anything in this lesson…'}"></textarea>
        <button class="qtutor-send" type="button" title="Send" aria-label="Send">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <path d="M10 16V4M5 9l5-5 5 5"/>
          </svg>
        </button>
      </div>
      ${this.embedded ? `<div class="consolidate-actions">
        <button class="btn btn-ghost qtutor-done">Continue →</button>
      </div>` : ''}
    `;

    el.querySelectorAll('[data-tmode]').forEach(btn => {
      btn.addEventListener('click', () => this.switchMode(btn.dataset.tmode));
    });
    el.querySelectorAll('[data-tscope]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.scope = btn.dataset.tscope;
        el.querySelectorAll('[data-tscope]').forEach(b =>
          b.classList.toggle('active', b.dataset.tscope === this.scope));
      });
    });

    const input = el.querySelector('.qtutor-input');
    el.querySelector('.qtutor-send').addEventListener('click', () => this.send());
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.send(); }
    });
    // The composer grows with what is typed and stops at a third of the pane,
    // rather than sitting at a fixed two rows whether there is one word in it
    // or ten lines.
    input.addEventListener('input', () => this.autoGrow(input));
    // Only the session player has a "next activity" to continue to; the lesson
    // pane has its own topbar and footer for getting anywhere.
    el.querySelector('.qtutor-done')?.addEventListener('click', () => LangSession.next());
  },

  switchMode(mode) {
    if (this.busy || mode === this.mode) return;
    this.mode = mode;
    this.root.querySelectorAll('[data-tmode]').forEach(b =>
      b.classList.toggle('active', b.dataset.tmode === mode));
    this.root.querySelector('.qtutor-input').placeholder = mode === 'quiz'
      ? 'Your answer…'
      : 'Ask about anything in this lesson…';
    this.paintHistory();
  },

  async loadHistory() {
    for (const mode of ['teach', 'quiz']) {
      try {
        this.history[mode] = await dbGetTutorChat(this.lang.id, this.unitIndex, mode);
      } catch (err) {
        console.warn(`Tutor transcript unavailable (${mode}):`, err.message);
        this.history[mode] = [];
      }
    }
    this.paintHistory();
    // The tutor no longer opens by itself. It used to teach the unit unprompted,
    // which is exactly the job the lesson page now does properly — so it waits,
    // and answers what it is asked.
  },

  paintHistory() {
    const chat = this.root?.querySelector('.qtutor-chat');
    if (!chat) return;
    chat.innerHTML = '';
    const msgs = this.history[this.mode];
    if (!msgs.length) {
      chat.innerHTML = `<div class="qtutor-empty">${this.mode === 'quiz'
        ? 'Say "ready" and the questions start. No teaching — just questions.'
        : 'Ask me anything about this lesson. I answer questions — I won\'t teach it back at you or test you.'}</div>`;
      return;
    }
    msgs.forEach(m => this.addBubble(m.role, m.content, false));
    // Coming back to a quiz mid-question: the offer that was on screen when you
    // left is still the live question, so the chips come back with it.
    const last = msgs[msgs.length - 1];
    if (this.mode === 'quiz' && last?.role !== 'user' && /\[EXPLAIN\?\]/i.test(last?.content || '')) {
      this.offerExplain();
    }
    chat.scrollTop = chat.scrollHeight;
  },

  autoGrow(input) {
    if (!input) return;
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 160)}px`;
  },

  // Tags the model emits for the app, not for the learner: mastery bookkeeping
  // and the quiz's offer-an-explanation marker. Both are stripped on the way to
  // the screen — see the chips in `turn`.
  cleanText(content) {
    return String(content)
      .replace(/\[MASTERED:[^\]]*\]/gi, '')
      .replace(/\[EXPLAIN\?\]/gi, '')
      .trim();
  },

  addBubble(role, content, scroll = true) {
    const chat = this.root?.querySelector('.qtutor-chat');
    if (!chat) return null;
    chat.querySelector('.qtutor-empty')?.remove();

    // A row per message: the tutor gets a small mark and its words run the full
    // width of the thread; the learner gets a bubble on the right. Same shape as
    // the chat apps everyone already knows how to read.
    const row = document.createElement('div');
    row.className = `chat-msg ${role === 'user' ? 'user' : 'tutor'}`;
    const div = document.createElement('div');
    div.className = `lang-bubble ${role === 'user' ? 'user' : 'partner'}`;
    div.textContent = this.cleanText(content);
    if (role !== 'user') {
      const mark = document.createElement('span');
      mark.className = 'chat-avatar';
      mark.textContent = 'ق';
      mark.setAttribute('aria-hidden', 'true');
      row.appendChild(mark);
    }
    row.appendChild(div);
    chat.appendChild(row);
    if (scroll) chat.scrollTop = chat.scrollHeight;
    return div;
  },

  // The two answers to "Want me to explain?", so the commonest reply in a quiz
  // is a tap rather than a sentence.
  offerExplain() {
    const chat = this.root?.querySelector('.qtutor-chat');
    if (!chat) return;
    chat.querySelector('.chat-chips')?.remove();
    const row = document.createElement('div');
    row.className = 'chat-chips';
    // A tap is a known intent, so it is passed as one. Left to infer it from
    // the words, the model graded "Yes, explain" as an answer to its question,
    // decided it was wrong, and offered to explain all over again.
    row.innerHTML = `
      <button class="chat-chip" data-reply="Yes, explain" data-intent="explain">Explain it</button>
      <button class="chat-chip ghost" data-reply="No, next question" data-intent="next">Next question</button>`;
    row.querySelectorAll('[data-reply]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.busy) return;
        row.remove();
        const text = btn.dataset.reply;
        this.addBubble('user', text);
        this.history[this.mode].push({ role: 'user', content: text });
        this.turn(text, btn.dataset.intent);
      });
    });
    chat.appendChild(row);
    chat.scrollTop = chat.scrollHeight;
  },

  send() {
    if (this.busy) return;
    const input = this.root?.querySelector('.qtutor-input');
    const text = input?.value.trim();
    if (!text) return;
    input.value = '';
    this.autoGrow(input);
    this.root?.querySelector('.chat-chips')?.remove();
    this.addBubble('user', text);
    this.history[this.mode].push({ role: 'user', content: text });
    this.turn(text);
  },

  async turn(userMessage, intent = null) {
    const { lang, unit } = this;
    this.busy = true;
    const sendBtn = this.root?.querySelector('.qtutor-send');
    if (sendBtn) sendBtn.disabled = true;

    // Three dots until the first words land, so the wait reads as the tutor
    // thinking rather than as nothing happening.
    const bubble = this.addBubble('tutor', '');
    bubble.classList.add('typing');
    bubble.innerHTML = '<span></span><span></span><span></span>';
    const paint = (text) => {
      bubble.classList.remove('typing');
      bubble.textContent = this.cleanText(text);
    };
    let full = '';

    try {
      if (AppState.mode === 'demo') {
        // Same slice as the live path: the message being answered is passed
        // separately, so it must not also appear in the history behind it.
        full = demoQuranTutor(unit, userMessage, this.mode, this.history[this.mode].slice(0, -1));
        paint(full);
      } else {
        // Real verses to quote from, different ones each turn, never one this
        // conversation has already used. A failed load is not fatal — the tutor
        // falls back to its own recall, with the reference rules that go with it.
        let verses = [];
        try {
          await loadQuranText();
          verses = pickQuranVerses(10, { exclude: versesInHistory(this.history[this.mode]) });
        } catch (err) {
          console.warn('Qur\'anic text unavailable for this turn:', err.message);
        }

        full = await callQuranTutor(lang, unit, userMessage, this.mode, {
          scope: this.scope,
          history: this.history[this.mode].slice(0, -1),   // the new message is passed separately
          roots: (lang.rootsLearned || [])
            .map(id => QURAN_ROOTS.find(r => r.id === id)?.root)
            .filter(Boolean),
          priorUnits: this.syllabus.slice(0, this.unitIndex),
          verses,
          intent,
          onChunk: (chunk) => {
            full += chunk;
            paint(full);
            const chat = this.root?.querySelector('.qtutor-chat');
            if (chat) chat.scrollTop = chat.scrollHeight;
          }
        });
      }

      // The chunks normally paint as they arrive, but a reply that comes back
      // whole — no streaming, or a stream that yielded nothing — would leave the
      // three dots sitting there for good. Paint once more, unconditionally.
      paint(full || '(No reply came back — ask me again.)');

      this.history[this.mode].push({ role: 'tutor', content: full });
      dbPutTutorChat(lang.id, this.unitIndex, this.mode, this.history[this.mode])
        .catch(err => console.warn('Tutor transcript save failed:', err.message));

      // The tutor no longer marks anything mastered — it answers questions and
      // that is all. Progress comes from reading the lesson and from the quiz.
      // The tag is still stripped on the way to the screen (see the paint path)
      // in case a model emits one out of habit.
      // Quiz mode: a missed question ends with the offer, which becomes a chip.
      // Never after a tap, though — an offer answered is answered, and a model
      // that repeats it would leave the learner tapping the same button forever.
      if (this.mode === 'quiz' && !intent && /\[EXPLAIN\?\]/i.test(full)) this.offerExplain();
    } catch (err) {
      console.warn('Tutor turn failed:', err.message);
      paint('(Connection hiccup — ask me again.)');
    } finally {
      this.busy = false;
      if (sendBtn) sendBtn.disabled = false;
    }
  }
};

// Demo tutor: enough of the real shape to exercise the UI — it teaches, it
// asks, it accepts, and it answers "I don't know" the way the prompt demands.
function demoQuranTutor(unit, userMessage, mode, history) {
  const msg = String(userMessage).toLowerCase();
  const dunno = /(i don'?t know|no idea|not sure|tell me|what'?s the answer|just tell me|skip)/i.test(msg);
  const asked = history.filter(m => m.role === 'tutor').length;

  // Quiz mode runs on its own rails: correct → next question, wrong → the
  // answer plus an offer, never a second pass through the lesson.
  if (mode === 'quiz') {
    const last = [...history].reverse().find(m => m.role === 'tutor')?.content || '';
    const offered = /\[EXPLAIN\?\]/.test(last);
    const wants = /^(y|yes|yeah|ok|okay|please|explain|why|go on|sure)\b/i.test(msg);
    const declines = /^(n|no|next|move on|skip|carry on)\b/i.test(msg);

    if (!asked) {
      return `In الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (1:2) — which two words are the possession pair?`;
    }
    if (offered && wants) {
      return `رَبِّ is "Lord" and الْعَالَمِينَ is "the worlds". Two nouns side by side, nothing between them, so the second owns the first: "Lord of the worlds". The first noun drops its الْ and the second takes a kasrah.\n\nNext: in يَوْمِ الدِّينِ (1:4), which word is being owned?`;
    }
    if (offered && declines) {
      return `In يَوْمِ الدِّينِ (1:4), which word is being owned?`;
    }
    if (dunno || /\b(hamd|الحمد|lillah)\b/i.test(msg)) {
      return `Not quite — it is رَبِّ الْعَالَمِينَ.\n\nWant me to explain? [EXPLAIN?]`;
    }
    return `Correct.\n\nIn مَالِكِ يَوْمِ الدِّينِ (1:4) there are two pairs stacked — what owns يَوْمِ?`;
  }

  // Ask mode ANSWERS. It never teaches the lesson back and never ends on a
  // question of its own — the page did the teaching and the quiz does the
  // testing.
  if (dunno) {
    return `Here it is straight out: in بِسْمِ اللَّهِ (bismillāh, 1:1) the two nouns sit side by side with nothing between them, so the second owns the first — "the name OF Allah". That side-by-side pair is the whole structure.`;
  }
  if (!asked && !msg.trim()) {
    return `This lesson is on ${unit?.title || 'the current structure'}. Ask me anything about it — or about any other verse you have hit.`;
  }
  return asked === 0
    ? `${unit?.structure || ''}\n\nIn real Qur'an: بِسْمِ اللَّهِ (bismillāh, 1:1) — بِسْمِ is "in the name", اللَّهِ is "of Allah". Two nouns, nothing between them, and the second takes a kasrah.`
    : `الْحَمْدُ لِلَّهِ (1:2) works the same way — "the praise is for Allah". The kasrah on the second word is what tells you the pair is a unit.`;
}

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

// ── THE CATALOGUE ────────────────────────────────────────────────────────────
// The courses this app actually has. A course means a syllabus somebody wrote, a
// tutor briefed on it, and curated data behind it — none of which can be
// conjured from a language name typed into a box, which is why free text is
// gone. Adding a language means adding an entry here, and building the course
// that entry promises.
const LANGUAGE_CATALOGUE = [
  {
    profile: QURANIC_PRESET_PROFILE,
    recipeId: 'quranic',
    preset: 'quranic',
    blurb: '300 root words with their most common Quranic forms, then eight short units that take you from spotting a root to reading a verse. Taught by a tutor, in plain English, with every example from the Qur\'an itself.'
  }
];

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

  existingIds: [],

  async open() {
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
    this.existingIds = [];
    document.getElementById('lang-onboard-overlay').style.display = 'flex';
    this.render();

    // A course already added must not be offered again: generateSeed writes to
    // `id: p.code`, so choosing it a second time would overwrite the learner's
    // progress with a fresh profile.
    try {
      const existing = await dbGetAllLanguages();
      this.existingIds = existing.map(l => l.id);
      if (this.step === 'start') this.render();
    } catch (err) {
      console.warn('Could not read existing languages:', err.message);
    }
  },

  // Catalogue entries the learner hasn't started yet
  availableCourses() {
    return LANGUAGE_CATALOGUE.filter(e => !this.existingIds.includes(e.profile.code));
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
      // The catalogue, and only the catalogue. A course is a real thing the app
      // has built — a syllabus, a tutor, curated data — not something improvised
      // from a name typed into a box, so there is no box.
      const available = this.availableCourses();
      content.innerHTML = available.length ? `
        <div class="prime-subhead">Choose a course.</div>
        ${available.map((entry, i) => `
          <button class="lang-preset-card" data-catalogue-idx="${i}" type="button">
            <span class="lang-preset-native">${escapeAttr(entry.profile.nativeName)}</span>
            <span class="lang-preset-name">${escapeAttr(entry.profile.name)}</span>
            <span class="lang-preset-desc">${escapeAttr(entry.blurb)}</span>
          </button>
        `).join('')}
      ` : `
        <div class="prime-subhead">You're already studying every course we have.</div>
        <p class="lang-notes-line">More are on the way — each one takes a syllabus and a tutor built for it, so they arrive slowly and properly.</p>
      `;
      nextBtn.style.display = 'none';   // a card IS the choice
      content.querySelectorAll('[data-catalogue-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          const entry = available[parseInt(btn.dataset.catalogueIdx)];
          this.preset = entry.preset || null;
          this.recipeId = entry.recipeId;
          this.profile = { ...entry.profile };
          this.step = 'profile';
          this.render();
        });
      });

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
    // The `start` step has no Next button any more — a catalogue entry is chosen
    // by clicking it, and there is nothing to type. `profile` is the only step
    // this button still drives.
    if (this.step === 'profile') this.advanceFrom('profile');
  },

  async generateSeed() {
    const p = this.profile;
    const recipeId = this.recipeId;
    try {
      let cards = [];
      if (recipeId === 'fresh') {
        // The foundation deck: eight frequency bands built in PARALLEL, so the
        // learner starts with a real vocabulary base (~400 words, roughly 80%
        // of everyday text) instead of the ~30 cards the seed deck gave them.
        // Conversation is worth far more when there's something under it.
        cards = AppState.mode === 'demo'
          ? [
              ...[1, 2].flatMap(b => demoFoundationDeck(p, b)),
              ...(p.script !== 'latin' ? demoSeedCards(p).filter(c => c.type === 'script') : [])
            ]
          : await buildFoundationDeck(p);
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
        knownWords: cards.filter(c => c.type === 'vocab').map(c => c.word).filter(Boolean).slice(0, 500),
        unitIndex: 0,
        unitsMastered: [],
        intensity: 'normal',
        bandsReleased: recipeId === 'fresh' ? 1 : 0,
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
      // NEVER flatten a course that is already there. dbPutLanguage merges, but
      // the object above carries unitIndex: 0, unitsMastered: [] and
      // rootsLearned: [] as literal values, so merging them writes those resets
      // over real progress. A learner whose course went missing from the grid
      // and who added it again to get it back lost everything they had done —
      // that is what happened, and it must not be possible.
      const prior = (await dbGetAllLanguages({ includeDeleted: true }).catch(() => []))
        .find(l => l.id === lang.id);
      if (prior) {
        for (const field of ['unitIndex', 'unitsMastered', 'rootsLearned', 'knownWords',
                             'learnedChars', 'scriptUnit', 'wordsLearned', 'streak',
                             'sessionNumber', 'lastSessionAt', 'levelScore', 'bandsReleased',
                             'createdAt', 'quizStats', 'vocabSet']) {
          if (prior[field] !== undefined) lang[field] = prior[field];
        }
        // It was in the bin, which is why it was not offered as "already added"
        lang.deletedAt = firebase.firestore.FieldValue.delete();
        console.log(`Re-adding ${lang.id}: kept existing progress rather than resetting it.`);
      }

      await dbPutLanguage(lang);
      // Only seed cards into a deck that has none — a re-add must not double it
      if (cards.length && !prior) await dbAppendLangCards(lang.id, cards);

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

  // ── The lesson pane ──
  document.getElementById('btn-lesson-exit').addEventListener('click', () => LessonView.close());
  document.getElementById('lesson-title-btn').addEventListener('click', () => LessonView.openLessonJump());
  document.getElementById('btn-lesson-tutor').addEventListener('click', () => LessonView.showTutor());
  document.getElementById('btn-lesson-back').addEventListener('click', () => LessonView.showLesson());
  document.getElementById('btn-lesson-jump-close').addEventListener('click', () => LessonView.closeLessonJump());
  document.getElementById('lesson-jump').addEventListener('click', (e) => {
    if (e.target.id === 'lesson-jump') LessonView.closeLessonJump();   // tap the backdrop
  });
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
    // Reader uses the raw text (with page sentinels); old chapters ingested
    // before page tracking fall back to the clean text and simply show no page.
    const text = chapter._chapterTextRaw || chapter._chapterText || '';
    if (!text) return false;

    this.chapter = chapter;
    this.hasPageData = /@@@pgbrk:\d+@@@/.test(text);
    this.segments = splitChapterIntoSegments(text);
    this.segmentsDone = Math.min(chapter.segmentsDone || 0, this.segments.length);
    this.active = true;

    document.getElementById('reader-pane').style.display = 'flex';
    document.querySelector('#view-tutor .tutor-split').style.display = 'none';
    document.getElementById('btn-back-to-reader').style.display = 'flex';
    setFocusMode(true);

    const book = AppState.selectedBook;
    const total = (book?.chapters || []).length;
    document.getElementById('reader-chapter-label').textContent =
      `Ch ${chapter.number}${total ? ` of ${total}` : ''} · ${chapter.title}`;

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
    this.renderPage(); // reflect the resumed position
    this.renderWatchLink();
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
      const page = segment.pages?.[i];
      if (page != null) el.dataset.page = page;
      const time = segment.times?.[i];
      if (time != null) el.dataset.time = time;
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

  // Chapter list, in the reader, without a trip through the tutor's dropdown.
  openChapterJump() {
    const book = AppState.selectedBook;
    const wrap = document.getElementById('chapter-jump');
    const list = document.getElementById('chapter-jump-list');
    if (!book || !wrap || !list) return;

    const studied = new Set(book.studiedChapters || []);
    const ready = new Set(book.readyChapters || []);
    const current = this.chapter?.number;

    list.innerHTML = [...(book.chapters || [])]
      .sort((a, b) => a.number - b.number)
      .map(ch => {
        const mark = studied.has(ch.number) ? '✓' : (ready.has(ch.number) ? '✨' : '');
        return `
          <button class="chapter-jump-item${ch.number === current ? ' current' : ''}" data-ch="${ch.number}">
            <span class="chapter-jump-num">${ch.number}</span>
            <span class="chapter-jump-title">${escapeAttr(ch.title)}</span>
            ${ch.startTime ? `<span class="chapter-jump-time">${escapeAttr(ch.startTime)}</span>` : ''}
            ${mark ? `<span class="chapter-jump-mark">${mark}</span>` : ''}
          </button>`;
      }).join('');

    list.querySelectorAll('.chapter-jump-item').forEach(btn => {
      btn.addEventListener('click', async () => {
        const n = parseInt(btn.dataset.ch);
        this.closeChapterJump();
        if (n === current) return;
        const sel = document.getElementById('tutor-chapter-select');
        if (sel) sel.value = n;
        await loadChapter(n);
      });
    });

    wrap.style.display = 'flex';
    list.querySelector('.chapter-jump-item.current')?.scrollIntoView({ block: 'center' });
  },

  closeChapterJump() {
    const wrap = document.getElementById('chapter-jump');
    if (wrap) wrap.style.display = 'none';
  },

  // The chapter after this one, in reading order. Null on the last chapter.
  nextChapterSkeleton() {
    const book = AppState.selectedBook;
    if (!book || !this.chapter) return null;
    const ordered = [...(book.chapters || [])].sort((a, b) => a.number - b.number);
    const idx = ordered.findIndex(c => c.number === this.chapter.number);
    return idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;
  },

  // Finishing a chapter used to leave the reader with nowhere to go but the
  // tutor's chapter dropdown. Video curricula made that obvious — their lessons
  // are short, so the dead end came round every few minutes.
  buildNextChapterBtn(className = 'btn btn-primary') {
    const next = this.nextChapterSkeleton();
    const btn = document.createElement('button');
    if (next) {
      btn.className = className;
      btn.textContent = `Next: Ch. ${next.number} — ${next.title} →`;
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        btn.textContent = 'Opening…';
        const sel = document.getElementById('tutor-chapter-select');
        if (sel) sel.value = next.number;
        await loadChapter(next.number);
      });
    } else {
      btn.className = 'cp-skip';
      btn.textContent = "That's the last chapter — back to library";
      btn.addEventListener('click', () => navigateTo('library'));
    }
    return btn;
  },

  buildChapterCompleteEl() {
    const done = document.createElement('div');
    done.className = 'reader-chapter-done';

    if (this.chapter.consolidated) {
      done.innerHTML = `
        <div class="seg-rule">Chapter consolidated ✓</div>
        <p>Recall checked and review cards scheduled. Prove it in the field — or talk it through with the tutor.</p>
      `;
      // Moving on is the most likely next action once a chapter is done
      done.appendChild(this.buildNextChapterBtn());

      const transferBtn = document.createElement('button');
      transferBtn.className = 'btn btn-ghost';
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

    // Consolidating is the better move, but never at the price of being stuck
    done.appendChild(this.buildNextChapterBtn('btn btn-ghost'));

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

    this.renderPage();
  },

  // The PDF page currently under the top of the reading area: the last
  // page-tagged paragraph whose top has scrolled to or above the reading line.
  currentPdfPage() {
    const ps = document.querySelectorAll('#reader-column p[data-page]');
    if (!ps.length) return null;
    const topbarH = document.getElementById('reader-topbar').offsetHeight || 52;
    const line = topbarH + 24; // a little below the bar = "what you're reading"
    let page = parseInt(ps[0].dataset.page, 10);
    for (const p of ps) {
      if (p.getBoundingClientRect().top <= line) page = parseInt(p.dataset.page, 10);
      else break;
    }
    return page;
  },

  // The timestamp of whatever is currently at the top of the viewport — the
  // video equivalent of currentPdfPage().
  currentVideoTime() {
    const ps = document.querySelectorAll('#reader-column p[data-time]');
    if (!ps.length) return null;
    const line = 96;
    let time = ps[0].dataset.time;
    for (const p of ps) {
      if (p.getBoundingClientRect().top <= line) time = p.dataset.time;
      else break;
    }
    return time;
  },

  // A video chapter has no pages, but it does have a place in the video — so
  // the reader offers the source instead, tracking where you actually are
  // rather than just where the lesson began.
  renderWatchLink() {
    const el = document.getElementById('reader-watch');
    if (!el) return;
    const book = AppState.selectedBook;
    const chapter = AppState.selectedChapter;
    if (book?.sourceType !== 'video' || !chapter?.videoId) {
      el.style.display = 'none';
      return;
    }
    const stamp = this.currentVideoTime() || chapter.startTime || '';
    el.href = videoTimeUrl(chapter.videoId, stamp);
    el.textContent = stamp ? `🎬 ${stamp}` : '🎬 Watch';
    el.title = 'Watch this part of the video';
    el.style.display = '';
  },

  renderPage() {
    const el = document.getElementById('reader-page');
    if (!el) return;
    const book = AppState.selectedBook;
    const pdfPage = this.hasPageData ? this.currentPdfPage() : null;
    if (pdfPage == null) { el.style.display = 'none'; el.textContent = ''; return; }
    const offset = book?.pageOffset || 0;
    const printed = Math.max(1, pdfPage + offset);
    const lastPrinted = Math.max(printed, (book?.totalPages || pdfPage) + offset);
    el.style.display = '';
    el.textContent = `p. ${printed} / ${lastPrinted}`;
  },

  // Top bar hides while scrolling down, returns on scroll-up
  handleScroll(scrollEl) {
    const y = scrollEl.scrollTop;
    const topbar = document.getElementById('reader-topbar');
    topbar.classList.toggle('topbar-hidden', y > this._lastScrollY && y > 64);
    this._lastScrollY = y;

    // Update the page readout at most once per frame while scrolling
    if (!this._pageRafPending) {
      this._pageRafPending = true;
      requestAnimationFrame(() => {
        this._pageRafPending = false;
        this.renderPage();
        this.renderWatchLink();   // the video timestamp follows the reading position
      });
    }
  }
};

function initReader() {
  document.getElementById('btn-reader-exit').addEventListener('click', () => {
    Reader.close();
    navigateTo('library');
  });
  document.getElementById('btn-reader-tutor').addEventListener('click', () => Reader.showTutor());
  document.getElementById('btn-back-to-reader').addEventListener('click', () => Reader.showReader());

  // Scope: how much of the book the tutor and quiz draw on. One control for
  // both tabs — a learner thinks in terms of "how much am I covering", not
  // "how much is the teach tab covering".
  document.querySelectorAll('.scope-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const scope = btn.dataset.scope;
      if (scope === AppState.tutorScope) return;
      AppState.tutorScope = scope;
      document.querySelectorAll('.scope-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.scope === scope));
      try { await dbPut('settings', { key: 'tutorScope', value: scope }); } catch (_) {}
      showToast(scope === 'cumulative'
        ? 'Tutor and quiz now cover the whole book up to this chapter.'
        : 'Tutor and quiz now cover this chapter only.', 'info', 3500);
    });
  });

  // Chapter jump: the title in the reader IS the chapter picker
  document.getElementById('reader-chapter-label')
    .addEventListener('click', () => Reader.openChapterJump());
  document.getElementById('btn-chapter-jump-close')
    .addEventListener('click', () => Reader.closeChapterJump());
  document.getElementById('chapter-jump').addEventListener('click', (e) => {
    if (e.target.id === 'chapter-jump') Reader.closeChapterJump();  // tap the backdrop
  });
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
// Two providers can run the app — DeepSeek or OpenAI — and Gemini is optional
// and only reached for attachments (a video to watch, a PDF to read directly).
async function loadSettings() {
  const apiKeyRecord = await dbGet('settings', 'apiKey');
  const geminiRecord = await dbGet('settings', 'geminiKey');
  const openaiRecord = await dbGet('settings', 'openaiKey');
  const providerRecord = await dbGet('settings', 'provider');
  const openaiModelRecord = await dbGet('settings', 'openaiModel');
  const openaiChoiceRecord = await dbGet('settings', 'openaiModelChoice');
  const demoRecord   = await dbGet('settings', 'demoMode');
  const scopeRecord  = await dbGet('settings', 'tutorScope');

  // ── AUTO-CONFIGURE ON FIRST LAUNCH ──────────────────────────────
  // API keys must be entered via Settings — never hardcode them here
  // as they would be exposed in the public GitHub repository.
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
  AppState.settings.geminiKey = geminiRecord?.value || '';
  AppState.settings.openaiKey = openaiRecord?.value || '';
  AppState.settings.openaiModel = openaiModelRecord?.value || '';
  AppState.settings.openaiModelChoice = openaiChoiceRecord?.value || '';
  // DeepSeek unless OpenAI was explicitly chosen — nobody's existing setup
  // should change provider because a second one became available.
  AppState.settings.provider = providerRecord?.value === 'openai' ? 'openai' : 'deepseek';

  // How the lesson page should be shown — local-only, like the keys.
  await LessonView.loadLessonPrefs();

  // Anyone who used this before the switch has a GEMINI key sitting in the main
  // field. Google's keys start with AIza and DeepSeek's with sk-, so they can be
  // told apart with certainty: move it to the video slot, where it still works,
  // and leave the main field empty so it's obvious a DeepSeek key is now wanted.
  if (/^AIza/.test(AppState.settings.apiKey) && !AppState.settings.geminiKey) {
    console.log('Moving your existing Google key to the video-only slot — the app now runs on DeepSeek.');
    AppState.settings.geminiKey = AppState.settings.apiKey;
    AppState.settings.apiKey = '';
    await dbPut('settings', { key: 'geminiKey', value: AppState.settings.geminiKey });
    await dbPut('settings', { key: 'apiKey', value: '' });
  }

  // No model picker any more. Which model runs is not a preference — there is
  // one model, and the TASK decides whether it thinks. A global "think harder"
  // switch could only ever make the whole app slower for no gain on the
  // structured calls, which is measured in ai-agents.js.
  // Cumulative by default: a book is one argument, and treating each chapter
  // as an island is the behaviour worth opting OUT of, not into.
  AppState.tutorScope = scopeRecord?.value === 'chapter' ? 'chapter' : 'cumulative';
  document.querySelectorAll('.scope-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.scope === AppState.tutorScope));

  const isDemoMode = AppState.mode === 'demo';

  // Sync the settings UI
  if (document.getElementById('input-api-key'))
    document.getElementById('input-api-key').value = AppState.settings.apiKey;
  if (document.getElementById('input-openai-key'))
    document.getElementById('input-openai-key').value = AppState.settings.openaiKey;
  if (document.getElementById('input-openai-model'))
    document.getElementById('input-openai-model').value = AppState.settings.openaiModelChoice;
  if (document.getElementById('select-provider'))
    document.getElementById('select-provider').value = AppState.settings.provider || 'deepseek';
  if (document.getElementById('input-gemini-key'))
    document.getElementById('input-gemini-key').value = AppState.settings.geminiKey;
  syncProviderFields();
  if (document.getElementById('toggle-demo-mode'))
    document.getElementById('toggle-demo-mode').checked = isDemoMode;

  if (isDemoMode) {
    document.getElementById('btn-demo-banner').style.display = 'inline-flex';
  }
}

// The chosen provider's key field is the one that matters; the other stays
// visible but plays down, so switching back later doesn't mean re-typing a key
// you already gave.
function syncProviderFields() {
  const provider = document.getElementById('select-provider')?.value
    || AppState.settings.provider || 'deepseek';
  const ds = document.getElementById('group-deepseek-key');
  const oa = document.getElementById('group-openai-key');
  if (ds) ds.classList.toggle('form-group-idle', provider !== 'deepseek');
  if (oa) oa.classList.toggle('form-group-idle', provider !== 'openai');
  const note = document.getElementById('openai-model-note');
  if (note) {
    note.textContent = AppState.settings.openaiModel
      ? `Using ${AppState.settings.openaiModel} — picked from what your account offers.` : '';
  }
}

async function saveSettings() {
  const apiKey = document.getElementById('input-api-key').value.trim();
  const openaiKey = document.getElementById('input-openai-key')?.value.trim() || '';
  const openaiModelChoice = document.getElementById('input-openai-model')?.value.trim() || '';
  const geminiKey = document.getElementById('input-gemini-key')?.value.trim() || '';
  const provider = document.getElementById('select-provider')?.value || 'deepseek';
  const isDemoMode = document.getElementById('toggle-demo-mode').checked;

  // A new key may belong to a different account with a different model list,
  // so the discovered model is forgotten and picked again on the next call.
  if (openaiKey !== AppState.settings.openaiKey) {
    AppState.settings.openaiModel = '';
    await dbPut('settings', { key: 'openaiModel', value: '' });
  }

  AppState.settings.apiKey = apiKey;
  AppState.settings.openaiKey = openaiKey;
  AppState.settings.openaiModelChoice = openaiModelChoice;
  AppState.settings.provider = provider;
  AppState.settings.geminiKey = geminiKey;
  AppState.mode = isDemoMode ? 'demo' : 'live';

  await dbPut('settings', { key: 'apiKey', value: apiKey });
  await dbPut('settings', { key: 'openaiKey', value: openaiKey });
  await dbPut('settings', { key: 'openaiModelChoice', value: openaiModelChoice });
  await dbPut('settings', { key: 'provider', value: provider });
  await dbPut('settings', { key: 'geminiKey', value: geminiKey });
  await dbPut('settings', { key: 'demoMode', value: isDemoMode });

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
    // Still render the bin: deleting your only book is exactly when you most
    // need a way back to it.
    renderTrashSection('books');
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
    // Any id shorter than 5 characters would give NaN here and take the whole
    // grid down with it, so fall back to the first palette entry.
    const colorIndex = (book.id.charCodeAt(4) || 0) % coverColors.length;
    const [c1, c2] = coverColors[colorIndex] || coverColors[0];

    const pct = totalChapters > 0 ? Math.round((studiedCount / totalChapters) * 100) : 0;
    
    // Create tags array, each paired with a theme class
    const tags = [];
    if (pct === 100) tags.push(['#Completed', '']);
    else if (pct > 0) tags.push(['#Read', '']);
    else tags.push(['#New', 'tag-brass']);

    if (book.sourceType === 'video') tags.push(['#Video', 'tag-burgundy']);
    else if (book.isPdfBook) tags.push(['#PDF', 'tag-burgundy']);
    // An unfinished video is worth flagging — there is more curriculum to pull
    if (book.pendingPart) tags.push([`#Part${book.pendingPart.nextPart}Ready`, 'tag-brass']);
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
      ${book.sourceType === 'video' && (book.videoIds || [])[0]
        ? `<a class="book-card-source" href="${videoTimeUrl(book.videoIds[0], '')}" target="_blank" rel="noopener"
             title="Open the original video on YouTube">▶ Watch on YouTube</a>`
        : ''}
      <button class="card-delete-btn" title="Delete this book" aria-label="Delete ${escapeAttr(book.title)}">✕</button>
    `;

    // The source link opens the video, not the book
    const sourceLink = card.querySelector('.book-card-source');
    if (sourceLink) sourceLink.addEventListener('click', (e) => e.stopPropagation());

    // Delete acts on the book, and must not also open it
    card.querySelector('.card-delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteBookFlow(book);
    });

    card.addEventListener('click', () => openBook(book.id));
    grid.appendChild(card);
  });

  renderTrashSection('books');

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

  // Video curricula can always take another video as further chapters
  const addVideoBtn = document.getElementById('btn-add-video-chapter');
  if (addVideoBtn) addVideoBtn.style.display = book.sourceType === 'video' ? 'block' : 'none';

  renderVideoPartPanel(book);
  renderVideoSources(book);
}

// A video too long to fit one response is generated in parts. This shows how
// far through the video the curriculum reaches and pulls the next part.
function renderVideoPartPanel(book) {
  const panel = document.getElementById('video-part-panel');
  if (!panel) return;
  const pending = book?.sourceType === 'video' ? book.pendingPart : null;
  if (!pending) { panel.style.display = 'none'; return; }

  const line = document.getElementById('video-part-line');
  const btn = document.getElementById('btn-next-video-part');

  // No progress bar: each part only ever sees its own window of the video, so
  // the total runtime is genuinely unknown. Better to state what IS known —
  // where the curriculum reaches and what the next part will cover — than to
  // invent a percentage out of a duration nobody measured.
  const nextEnd = secondsToStamp((pending.nextOffset || 0) + (pending.windowSeconds || 600));
  line.innerHTML = `Covered up to <strong>${pending.coveredUntil}</strong>.
    Part ${pending.nextPart} covers <strong>${pending.coveredUntil}–${nextEnd}</strong>.`;
  btn.textContent = `Generate part ${pending.nextPart} →`;
  panel.style.display = 'block';
}

// Lists every video this curriculum was built from, so the original is always
// one tap away. Each entry names the chapters it produced, which is what makes
// it useful once a curriculum has grown past a single video.
function renderVideoSources(book) {
  const wrap = document.getElementById('video-sources');
  const list = document.getElementById('video-sources-list');
  if (!wrap || !list) return;

  const ids = book?.sourceType === 'video' ? (book.videoIds || []) : [];
  if (!ids.length) { wrap.style.display = 'none'; list.innerHTML = ''; return; }

  list.innerHTML = ids.map((id, i) => {
    const chapters = (book.chapters || []).filter(c => c.videoId === id);
    const range = chapters.length
      ? (chapters.length === 1
          ? `Chapter ${chapters[0].number}`
          : `Chapters ${chapters[0].number}–${chapters[chapters.length - 1].number}`)
      : '';
    return `
      <a class="video-source-link" href="${videoTimeUrl(id, '')}" target="_blank" rel="noopener"
         title="Open the original video on YouTube">
        <img class="video-source-thumb" src="https://i.ytimg.com/vi/${id}/default.jpg" alt="" loading="lazy">
        <span class="video-source-meta">
          <span class="video-source-label">${ids.length > 1 ? `Video ${i + 1}` : 'Watch on YouTube'}</span>
          ${range ? `<span class="video-source-range">${range}</span>` : ''}
        </span>
        <span class="video-source-arrow">↗</span>
      </a>`;
  }).join('');
  wrap.style.display = 'block';
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
        // Clean of page sentinels before it ever reaches the AI
        const chapterText = stripPageMarkers(chapterData?.text || '');
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

    // Build the chapter object the rest of the function expects.
    // _chapterText is cleaned of page sentinels (everything AI-facing uses it);
    // _chapterTextRaw keeps them so the reader can map text to page numbers.
    const rawText = chapterData?.text || '';
    const chapter = {
      ...chapterSkeleton,
      ...chapterData,
      _chapterTextRaw: rawText,
      _chapterText: stripPageMarkers(rawText), // for tutor quoting / AI
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
  // The scope control only means anything once there are earlier chapters
  const scopeToggle = document.getElementById('scope-toggle');
  if (scopeToggle) {
    scopeToggle.style.display = (AppState.selectedChapter?.number || 1) > 1 ? 'flex' : 'none';
  }
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
// Headings, bold, italic, paragraphs — and lists, which it used to render as
// literal "- " lines with a <br> after each. A lesson's teaching section is
// allowed to be long now, and long prose without lists is a wall.
function renderMarkdown(text) {
  if (!text) return '';

  const inline = (t) => t
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');

  const out = [];
  let list = null;                       // 'ul' | 'ol' while one is open
  let para = [];

  const flushPara = () => {
    if (para.length) { out.push(`<p>${inline(para.join('<br>'))}</p>`); para = []; }
  };
  const flushList = () => { if (list) { out.push(`</${list}>`); list = null; } };

  for (const raw of String(text).split('\n')) {
    const line = raw.trim();

    if (!line) { flushPara(); flushList(); continue; }

    const heading = line.match(/^(#{2,3})\s+(.*)$/);
    if (heading) {
      flushPara(); flushList();
      const tag = heading[1].length === 2 ? 'h2' : 'h3';
      out.push(`<${tag}>${inline(heading[2])}</${tag}>`);
      continue;
    }

    const bullet = line.match(/^[-*•]\s+(.*)$/);
    const numbered = line.match(/^\d+[.)]\s+(.*)$/);
    if (bullet || numbered) {
      flushPara();
      const want = bullet ? 'ul' : 'ol';
      if (list !== want) { flushList(); out.push(`<${want}>`); list = want; }
      out.push(`<li>${inline((bullet || numbered)[1])}</li>`);
      continue;
    }

    flushList();
    para.push(line);
  }
  flushPara(); flushList();
  return out.join('');
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
    // The tutor quotes the source as it teaches. On a video curriculum each
    // quote gets the moment it was said, linked — so "where did that come
    // from?" is one tap away.
    annotateVideoQuotes(msg.querySelector('.prose'));
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

      // Everything studied before this chapter, unless the learner has scoped
      // the conversation down to this one.
      const scope = AppState.tutorScope || 'cumulative';
      const priorContext = scope === 'cumulative'
        ? await buildPriorChaptersContext(book, chapter.number).catch(() => '')
        : '';

      const [tutorReply, visualData] = await Promise.all([
        callLiveTutorAgent(
          message, AppState.currentChatMode, AppState.masteredConcepts, chapter._chapterText || '',
          (piece, fullSoFar) => updateStreamingTutorTurn(streamEl, fullSoFar),
          { priorContext, scope }
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
      // Resolve the video moment now, while the chapter's marked text is in
      // hand — the Notes tab shows saved quotes long after it has unloaded.
      videoId: book.sourceType === 'video' ? (chapter.videoId || book.videoIds?.[0] || null) : null,
      videoTime: book.sourceType === 'video' ? timeForQuote(pendingText, chapter) : null,
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
        <p class="note-quote">"${n.quote}"${n.videoTime && n.videoId
          ? `<a class="video-cite" href="${videoTimeUrl(n.videoId, n.videoTime)}" target="_blank" rel="noopener" title="Watch this moment in the video">🎬 ${n.videoTime}</a>`
          : ''}</p>
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
  document.getElementById('source-video-zone').style.display       = 'none';
  document.getElementById('title-author-group').style.display      = 'block';
  document.getElementById('pdf-autodetect-note').style.display     = 'none';
  document.getElementById('input-video-url').value                 = '';
  document.getElementById('video-url-status').style.display        = 'none';
  document.querySelector('label[for="input-book-title"]').textContent = 'Book Title';
  document.querySelector('label[for="input-book-author"]').parentElement.style.display = 'block';
  document.getElementById('btn-check-book').textContent            = 'Check Book Coverage →';
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

  // PDF auto-extracts its title; video mode can name itself from the content.
  if (sourceMode === 'knowledge' && !title) {
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

  // ── VIDEO MODE: validate the link, then straight to Step 2 ──
  if (sourceMode === 'video') {
    const raw = document.getElementById('input-video-url').value.trim();
    const parsed = parseYouTubeUrl(raw);
    if (!parsed) {
      showToast('Paste a YouTube link first — that\'s what the AI can watch.', 'error');
      return;
    }
    document.getElementById('add-book-step-1').style.display = 'none';
    document.getElementById('add-book-step-2').style.display = 'block';
    document.getElementById('diagnostic-result').innerHTML = `
      <strong style="color:#b8863f">🎬 Video ready</strong><br><br>
      The AI will watch the video and pull out the lessons it teaches, in order —
      keeping the speaker's own claims, figures and examples. Each lesson becomes
      a chapter with its own summaries, concepts, flashcards and quizzes.
      <br><br>
      <em style="color:var(--text-muted); font-size:0.85rem;">
        Long videos are built about 10 minutes at a time — you'll get the first
        part now and can pull each next part when you want it. Private,
        age-restricted and members-only videos can't be read.
      </em>
    `;
    document.getElementById('btn-generate-book').dataset.level = 'ref';
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

// Continue a video that was too long to finish in one response. Picks up from
// where the last part stopped, clipping the video so only the unread remainder
// is ever sent, and appends its lessons as further chapters.
async function generateNextVideoPart() {
  const book = AppState.selectedBook;
  const pending = book?.pendingPart;
  if (!book || !pending) return;

  if (AppState.mode === 'demo') {
    showToast('Generating video parts needs a Gemini API key — turn off Demo Mode in Settings.', 'info', 5000);
    return;
  }

  const btn = document.getElementById('btn-next-video-part');
  const original = btn ? btn.textContent : '';
  const splitEnd = secondsToStamp((pending.nextOffset || 0) + (pending.windowSeconds || 600));
  if (btn) { btn.disabled = true; btn.textContent = `Watching ${pending.coveredUntil}–${splitEnd}…`; }

  try {
    const startChapter = (book.chapters || []).reduce((m, c) => Math.max(m, c.number), 0) + 1;
    const existingTitles = (book.chapters || []).map(c => c.title);
    const result = await callVideoCurriculum(pending.videoUrl, '', startChapter, existingTitles, {
      startOffset: pending.nextOffset,
      part: pending.nextPart,
      onShrink: (secs) => {
        if (btn) btn.textContent = `Too dense — retrying with ${Math.round(secs / 60)} min…`;
      }
    });

    for (const ch of result.chapters) {
      await dbPutChapter(book.id, {
        chapterNumber: ch.number,
        title: ch.title,
        text: markedVideoText(ch.passages).substring(0, 200000),
        videoId: result.videoId,
        startTime: ch.startTime,
        endTime: ch.endTime,
        part: result.part,
        summary_10s: null, summary_3m: null, summary_15m: null,
        concepts: null, flashcards: null, studiedAt: null
      });
    }

    book.chapters = [...(book.chapters || []), ...result.chapters.map(ch => ({
      number: ch.number, title: ch.title,
      startTime: ch.startTime, endTime: ch.endTime,
      videoId: result.videoId, part: result.part
    }))];
    book.totalChapters = book.chapters.length;
    book.wordsTotal = (book.wordsTotal || 0)
      + result.chapters.reduce((n, ch) => n + ch.text.split(/\s+/).filter(Boolean).length, 0);

    // A part that made no forward progress would loop forever — treat it as
    // the end of the video rather than offering the same part again.
    const advanced = result.coveredSeconds > pending.nextOffset;
    book.pendingPart = (result.hasMore && advanced) ? {
      videoId: result.videoId,
      videoUrl: result.videoUrl,
      nextOffset: result.coveredSeconds,
      nextPart: result.part + 1,
      coveredUntil: result.coveredUntil,
      windowSeconds: result.windowSeconds
    } : null;

    await dbPut('books', book);
    populateChapterSelect(book);
    showToast(book.pendingPart
      ? `Part ${result.part}: ${result.chapters.length} more lessons, up to ${result.coveredUntil}.`
      : `Part ${result.part}: ${result.chapters.length} more lessons — that's the whole video.`,
      'success', 6000);
    await renderLibrary();
  } catch (err) {
    // A window that starts past the end of the recording has nothing in it.
    // That means the video is finished, not that anything went wrong.
    if (/could not extract any lessons|no lessons/i.test(err.message)) {
      book.pendingPart = null;
      await dbPut('books', book).catch(() => {});
      populateChapterSelect(book);
      showToast('That\'s the whole video — the curriculum is complete.', 'success', 5000);
      await renderLibrary();
    } else {
      console.error('Next video part failed:', err);
      showToast(`Couldn't generate the next part: ${err.message}`, 'error', 10000);
    }
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = original; }
  }
}

// A video curriculum grows the same way it was created: point it at another
// video and its lessons are appended as further chapters. The AI is told what
// the curriculum already covers so it doesn't teach the same thing twice.
async function addChaptersFromVideo() {
  const book = AppState.selectedBook;
  if (!book || book.sourceType !== 'video') return;

  if (AppState.mode === 'demo') {
    showToast('Adding videos needs a Gemini API key — turn off Demo Mode in Settings.', 'info', 5000);
    return;
  }

  const raw = prompt(`Add another video to "${book.title}".\n\nPaste the YouTube link:`);
  if (!raw || !raw.trim()) return;

  const parsed = parseYouTubeUrl(raw);
  if (!parsed) {
    showToast('Only YouTube links work — that\'s what the AI can watch.', 'error', 6000);
    return;
  }
  if ((book.videoIds || []).includes(parsed.id)) {
    showToast('That video is already part of this curriculum.', 'info', 5000);
    return;
  }

  const btn = document.getElementById('btn-add-video-chapter');
  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = '🎬 Watching the video…';

  try {
    const startChapter = (book.chapters || []).reduce((m, c) => Math.max(m, c.number), 0) + 1;
    const existingTitles = (book.chapters || []).map(c => c.title);
    const result = await callVideoCurriculum(parsed.url, '', startChapter, existingTitles);

    for (const ch of result.chapters) {
      await dbPutChapter(book.id, {
        chapterNumber: ch.number,
        title: ch.title,
        text: markedVideoText(ch.passages).substring(0, 200000),
        videoId: result.videoId,
        startTime: ch.startTime,
        endTime: ch.endTime,
        summary_10s: null, summary_3m: null, summary_15m: null,
        concepts: null, flashcards: null, studiedAt: null
      });
    }

    book.chapters = [...(book.chapters || []), ...result.chapters.map(ch => ({
      number: ch.number, title: ch.title,
      startTime: ch.startTime, endTime: ch.endTime, videoId: result.videoId
    }))];
    book.videoIds = [...(book.videoIds || []), result.videoId];
    book.totalChapters = book.chapters.length;
    book.wordsTotal = (book.wordsTotal || 0)
      + result.chapters.reduce((n, ch) => n + ch.text.split(/\s+/).filter(Boolean).length, 0);
    await dbPut('books', book);

    populateChapterSelect(book);
    showToast(`${result.chapters.length} new chapter${result.chapters.length !== 1 ? 's' : ''} added from that video.`, 'success');
    await renderLibrary();
  } catch (err) {
    console.error('Add-video-chapter failed:', err);
    showToast(`Couldn't add that video: ${err.message}`, 'error', 10000);
  } finally {
    btn.disabled = false;
    btn.textContent = original;
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
    showToast('Please add your DeepSeek API key in Settings first.', 'error');
    return;
  }
  // Ensure AppState is in sync in case loadSettings() was slow
  AppState.settings.apiKey = resolvedKey;

  let fileUri = null;

  // ── VIDEO MODE ────────────────────────────────────────────────────────────
  // The AI watches the video and writes each lesson up as study prose. From
  // there the book is indistinguishable from an uploaded one: the same chapter
  // docs, the same on-demand curriculum, the same reader, quizzes and cards.
  if (sourceMode === 'video') {
    const rawUrl = document.getElementById('input-video-url').value.trim();
    try {
      logStep('🎬 Watching the video from 0:00 to 10:00 (part 1)…');
      const result = await callVideoCurriculum(rawUrl, title, 1, [], {
        onShrink: (secs) => logStep(`⚙️ That stretch was too dense — retrying with a ${Math.round(secs / 60)}-minute split…`)
      });
      logStep(`✅ Part 1 covers 0:00–${result.coveredUntil}`);

      logStep(`✅ Found ${result.chapters.length} lesson${result.chapters.length !== 1 ? 's' : ''} — "${result.title}"`);
      logStep('💾 Saving to your library…');

      const bookId = `book-${Date.now()}`;
      const newBook = {
        id: bookId,
        title:  result.title,
        author: result.author,
        coverUrl: `https://i.ytimg.com/vi/${result.videoId}/hqdefault.jpg`,
        level: 'ref',
        // Video books are text-backed with on-demand curriculum, exactly like
        // uploaded ones — this flag is what the rest of the app keys off.
        isPdfBook: true,
        sourceType: 'video',
        videoUrl: result.videoUrl,
        videoIds: [result.videoId],
        topic: result.topic,
        totalPages: 0,
        pageOffset: 0,
        pageLabelConfident: false,
        totalChapters: result.chapters.length,
        wordsTotal: result.chapters.reduce((n, ch) => n + ch.text.split(/\s+/).filter(Boolean).length, 0),
        wordsRead: 0,
        chapters: result.chapters.map(ch => ({
          number: ch.number, title: ch.title,
          startTime: ch.startTime, endTime: ch.endTime,
          videoId: result.videoId, part: result.part
        })),
        // A long video can't be turned into a curriculum in one response, so
        // generation is resumable: this records where to pick up, and the UI
        // offers the next part until the video is exhausted.
        pendingPart: result.hasMore ? {
          videoId: result.videoId,
          videoUrl: result.videoUrl,
          nextOffset: result.coveredSeconds,
          nextPart: result.part + 1,
          coveredUntil: result.coveredUntil,
          windowSeconds: result.windowSeconds
        } : null,
        readyChapters: [],
        studiedChapters: [],
        createdAt: Date.now()
      };
      await dbPut('books', newBook);

      for (const ch of result.chapters) {
        await dbPutChapter(bookId, {
          chapterNumber: ch.number,
          title: ch.title,
          text: markedVideoText(ch.passages).substring(0, 200000),
          videoId: result.videoId,
          startTime: ch.startTime,
          endTime: ch.endTime,
          summary_10s: null, summary_3m: null, summary_15m: null,
          concepts: null, flashcards: null, studiedAt: null
        });
      }

      document.getElementById('modal-add-book').style.display = 'none';
      showToast(result.hasMore
        ? `"${result.title}" added — ${result.chapters.length} lessons up to ${result.coveredUntil}. Open it to generate the next part.`
        : `"${result.title}" added — ${result.chapters.length} lessons ready to study.`,
        'success', result.hasMore ? 8000 : 5000);
      await renderLibrary();
    } catch (videoErr) {
      document.getElementById('add-book-step-3').style.display = 'none';
      document.getElementById('add-book-step-2').style.display = 'block';
      document.getElementById('diagnostic-result').innerHTML =
        `<strong style="color:#f87171;">Video Error:</strong> ${videoErr.message}`;
      showToast(`Error: ${videoErr.message}`, 'error', 10000);
      console.error('Video processing error:', videoErr);
    }
    return;
  }

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
      const perPageNumbers = []; // standalone integers per page, for offset detection
      for (let p = 1; p <= totalPages; p++) {
        const page    = await pdfDoc.getPage(p);
        const content = await page.getTextContent();
        const strs    = content.items.map(i => i.str);
        // A sentinel line marks where page p begins, so the reader can map any
        // paragraph back to its real page after all the downstream splitting.
        fullText += '\n' + pageMarkerLine(p) + '\n' + strs.join(' ') + '\n';

        // Candidate printed page numbers: standalone integers (headers/footers)
        const nums = [...new Set(
          strs.map(s => s.trim())
            .filter(s => /^\d{1,4}$/.test(s))
            .map(Number)
            .filter(n => n >= 1 && n <= totalPages + 40)
        )];
        perPageNumbers.push(nums);

        if (p % 40 === 0 || p === totalPages) {
          const pct = Math.round((p / totalPages) * 70); // 70% for extraction
          progressFill.style.width = pct + '%';
          progressPct.textContent  = `Reading… ${pct}%`;
        }
      }
      const pageInfo = detectPageOffset(perPageNumbers, totalPages);

      // ── STEP 2: Split into chapters ──
      logStep('📚 Identifying chapter structure…');
      const chapters = splitPdfIntoChapters(fullText);
      logStep(`✅ Found ${chapters.length} chapter${chapters.length !== 1 ? 's' : ''}. Identifying title & author…`);

      // ── STEP 3: Auto-detect title & author from first pages ──
      progressFill.style.width = '75%';
      progressPct.textContent  = 'Detecting title & author…';
      const bookInfo = await callBookIdentifier(stripPageMarkers(fullText.substring(0, 5200)).substring(0, 5000));
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
        // Printed page = PDF page + pageOffset (front matter etc.); when
        // detection wasn't confident, offset is 0 → we show the PDF page index,
        // which is still exactly accurate to the file.
        pageOffset:        pageInfo.offset,
        pageLabelConfident: pageInfo.confident,
        totalChapters: chapters.length,
        // Total word count feeds the library's personalized time-left estimate
        // (strip page sentinels so they don't inflate the count)
        wordsTotal:    chapters.reduce((n, ch) => n + (ch.text ? stripPageMarkers(ch.text).split(/\s+/).filter(Boolean).length : 0), 0),
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
// Every card in the app, or every card due. Sources are read concurrently and
// handed over AS THEY LAND, through `onBatch`, rather than after the slowest of
// them — because the slowest is a PDF book's chapter documents, which carry the
// raw chapter text, and waiting for those before showing card one is most of
// what made opening Flashcards feel slow.
//
// The return value is unchanged: the full array, once everything is in. A caller
// that does not pass `onBatch` behaves exactly as before.
async function collectCards({ dueOnly = true, onBatch = null } = {}) {
  const out = [];
  AppState._reviewBookCache = {};
  AppState._reviewChapterCache = {};
  AppState._reviewLangCache = {};

  const emit = (cards) => {
    if (!cards.length) return;
    out.push(...cards);
    if (onBatch) { try { onBatch(cards); } catch (err) { console.warn('Card batch handler failed:', err.message); } }
  };

  const [languages, books] = await Promise.all([
    dbGetAllLanguages().catch(err => {
      console.warn('Language cards unavailable for review:', err.message);
      return [];
    }),
    dbGetAll('books')
  ]);

  // Backfills `script` on any profile saved before that field existed, so the
  // off-script card check below has something to test against.
  languages.forEach(ensureLangScript);

  // A deck in the bin is out of the deck until it is restored — the cards are
  // still on disk for the grace period, they just stop being reviewed.
  const liveDecks = languages.filter(l => !l.deckDeletedAt);

  const langCards = (lang, batch) => {
    const cards = batch.flashcards || [];
    if (cards.length) AppState._reviewLangCache[`${lang.id}_batch_${batch.batch}`] = cards;
    const rows = [];
    cards.forEach((card, idx) => {
      // Vocabulary-builder cards from before the script guard can be English
      // filed under a non-Latin language. Only `precision` cards are tested — a
      // correction or grammar card is meant to have an English front.
      if (card.type === 'precision' && card.word &&
          !wordMatchesScript(card.word, lang.script)) return;
      if (!dueOnly || isCardDue(card)) {
        rows.push({
          ...card,
          // The tag on the card says which deck it came from, and in a mixed
          // review that has to include which SIDE of the app.
          bookTitle: deckLabel(lang),
          _langName: lang.name,                 // for prose, which wants no tag
          _langLevel: lang.level,               // drives the romanization fade
          _ttsLang: lang.ttsLangCode || lang.code,
          _src: { type: 'langCards', langId: lang.id, batch: batch.batch, index: idx }
        });
      }
    });
    return rows;
  };

  // Books already in memory cost nothing to walk, so they go out first and the
  // reader has something on screen while every read below is still in flight.
  const plainBooks = books.filter(b => !b.isPdfBook);
  for (const book of plainBooks) {
    AppState._reviewBookCache[book.id] = book;
    const rows = [];
    (book.chapters || []).forEach(ch => {
      (ch.flashcards || []).forEach((card, idx) => {
        if (!dueOnly || isCardDue(card)) {
          rows.push({ ...card, bookTitle: book.title,
            _src: { type: 'bookDoc', bookId: book.id, chapterNumber: ch.number, index: idx } });
        }
      });
    });
    emit(rows);
  }

  // Decks and chapter documents all start at once; each emits the moment it
  // resolves, so a fast deck is never held up behind a slow book.
  await Promise.all([
    ...liveDecks.map(lang =>
      dbGetLangCardBatches(lang.id)
        .then(batches => { for (const b of batches) emit(langCards(lang, b)); })
        .catch(err => console.warn(`Deck unavailable for review (${lang.id}):`, err.message))
    ),
    ...books.filter(b => b.isPdfBook).map(book =>
      dbGetChaptersForBook(book.id)
        .then(chapterDocs => {
          for (const chDoc of chapterDocs) {
            const cards = chDoc.flashcards || [];
            if (cards.length) {
              AppState._reviewChapterCache[`${book.id}_ch_${chDoc.chapterNumber}`] = cards;
            }
            const rows = [];
            cards.forEach((card, idx) => {
              if (!dueOnly || isCardDue(card)) {
                rows.push({ ...card, bookTitle: book.title,
                  _src: { type: 'chapterDoc', bookId: book.id, chapterNumber: chDoc.chapterNumber, index: idx } });
              }
            });
            emit(rows);
          }
        })
        .catch(err => console.warn(`Chapters unavailable for review (${book.id}):`, err.message))
    )
  ]);

  return out;
}

// Kept for existing callers (badge refresh, session review activity)
async function collectDueCards() {
  return collectCards({ dueOnly: true });
}

// ── SOURCE FILTER + RANDOM PRACTICE ──────────────────────────────────────────

// Which half of the app a deck belongs to. Every language deck says which one
// it is, not only the ones that would otherwise collide: a rule you can rely on
// beats one that appears only sometimes.
//
//   (L) — the Languages side: a course, its lessons and its tutor
//   (V) — the Vocabulary side: a word list you build up
//
// Qur'anic Arabic used to appear under both, which is what the tag was first
// for. It no longer does — the course has no deck and the roots are (V) — but
// the tag stays, because a deck that says which half it came from is still
// worth more than one that leaves you to guess.
function deckTag(lang) {
  return getRecipe(lang).id === 'vocabBuilder' ? 'V' : 'L';
}

function deckLabel(lang) {
  return `${lang?.name || 'Deck'} (${deckTag(lang)})`;
}

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

  // A language document is not a deck. Quranic Arabic exists twice — the course
  // and the root vocabulary — and listing both by name gave two identical
  // entries, one of which was empty. Only decks that actually hold cards are
  // offered, and where two survive under one name they say which is which.
  await Promise.all(languages.map(async (l) => {
    if (l.deckDeletedAt) { l.cardCount = 0; return; }   // in the bin, not on offer
    if (typeof l.cardCount === 'number') return;
    try {
      const batches = await dbGetLangCardBatches(l.id);
      l.cardCount = batches.reduce((n, b) => n + (b.flashcards || []).length, 0);
      dbPatchLanguage(l.id, { cardCount: l.cardCount }).catch(() => {});
    } catch (_) { l.cardCount = 1; }   // unreadable: keep it rather than hide it
  }));

  const withCards = languages.filter(l => l.cardCount > 0);

  const bookOpts = books
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(b => `<option value="book:${b.id}">${b.title}</option>`).join('');
  const langOpts = withCards
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(l => `<option value="lang:${l.id}">${deckLabel(l)}</option>`).join('');

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

  // Deleting is per-deck, so the button only exists once a deck is selected.
  // Book cards live inside their chapters — a book is deleted in the Library.
  AppState._reviewDecks = withCards;
  syncDeleteDeckButton();
  await renderDeckTrash();
}

function syncDeleteDeckButton() {
  const btn = document.getElementById('btn-delete-deck');
  if (!btn) return;
  const id = (AppState.reviewFilter || '').startsWith('lang:')
    ? AppState.reviewFilter.slice(5) : null;
  const lang = id ? (AppState._reviewDecks || []).find(l => l.id === id) : null;
  btn.style.display = lang ? '' : 'none';
  btn.onclick = lang ? () => deleteDeckFlow(lang) : null;
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
  delete clean._langName;
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

  // Dropdown appears instantly from metadata; cards arrive behind it.
  await populateReviewFilterFromMeta();
  document.getElementById('review-empty-message').style.display = 'none';
  document.getElementById('review-finished-message').style.display = 'none';
  document.getElementById('flashcard-deck').style.display = 'none';
  const loadingEl = document.getElementById('review-loading');
  if (loadingEl) loadingEl.style.display = 'flex';

  // Each init owns its own session. An older sweep that is still running when
  // the source filter changes must not push its cards into the new one.
  const token = (AppState._reviewToken = (AppState._reviewToken || 0) + 1);
  const mine = () => AppState._reviewToken === token;

  AppState.flashcardSession = [];
  AppState.flashcardIndex = 0;
  AppState.reviewStats = { forgot: 0, hard: 0, good: 0, easy: 0, total: 0, done: 0 };

  const filterLabel = AppState.reviewFilter === 'all' ? '' : ' in this source';
  const subtitle = document.querySelector('#view-review .page-subtitle');
  const paintCount = (settled) => {
    const n = AppState.flashcardSession.length;
    const ratio = document.getElementById('review-cards-ratio');
    if (ratio) ratio.textContent = `${AppState.reviewStats.done} / ${n}`;
    AppState.reviewStats.total = n;
    // The bar reads against the total it has, so it has to be repainted as the
    // total grows or it sits at a percentage of a number that no longer holds.
    const fill = document.getElementById('review-progress-fill');
    if (fill) fill.style.width = n ? `${(AppState.reviewStats.done / n) * 100}%` : '0%';
    if (!subtitle) return;
    // Honest session estimate: ~30s per card. While cards are still arriving it
    // says so, rather than showing a total that is about to change.
    subtitle.textContent = n
      ? `${n} due today${filterLabel}${settled ? '' : ' so far'} · about ${formatReadingTime(n * 0.5)} · keys 1–4 rate, Space flips`
      : (settled
          ? `Nothing due${filterLabel} — spaced repetition schedules cards right before your brain would forget them.`
          : `Looking for cards due${filterLabel}…`);
  };

  let started = false;
  let allDue = 0;

  // Cards go on screen the moment the first source that has any comes back. The
  // rest are appended behind them, and each arriving chunk is shuffled ON ITS
  // OWN — reshuffling the whole session would move cards the reader has already
  // been shown, including the one in front of them.
  const onBatch = (cards) => {
    if (!mine()) return;
    const due = cards.filter(isCardDue);
    allDue += due.length;
    const mineNow = shuffleCards(due.filter(matchesReviewFilter));
    if (!mineNow.length) return;

    AppState.flashcardSession.push(...mineNow);
    paintCount(false);

    if (!started) {
      started = true;
      if (loadingEl) loadingEl.style.display = 'none';
      document.getElementById('review-empty-message').style.display = 'none';
      document.getElementById('review-finished-message').style.display = 'none';
      document.getElementById('flashcard-deck').style.display = 'block';
      showNextCard();
    } else if (AppState.flashcardIndex >= AppState.flashcardSession.length - mineNow.length) {
      // The reader had already reached the end of what was loaded and is
      // looking at the finished screen. More cards arrived, so carry on.
      const finished = document.getElementById('review-finished-message');
      if (finished && finished.style.display !== 'none') {
        finished.style.display = 'none';
        document.getElementById('flashcard-deck').style.display = 'block';
        showNextCard();
      }
    }
  };

  paintCount(false);
  await collectCards({ dueOnly: false, onBatch });
  if (!mine()) return;

  if (loadingEl) loadingEl.style.display = 'none';
  updateReviewBadge(allDue);   // global count, correct only once everything is in
  paintCount(true);

  if (!AppState.flashcardSession.length) {
    document.getElementById('review-empty-message').style.display = 'flex';
    document.getElementById('flashcard-deck').style.display = 'none';
    document.getElementById('review-finished-message').style.display = 'none';
  }
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

  // ── Root cards ──────────────────────────────────────────────────────────
  // A REAL QURANIC WORD on the front — ٱلْكِتَٰبِ, not ك ت ب. The three letters
  // never appear as a word in the muṣḥaf, so a card fronted with them drilled
  // recognition of something the page does not contain.
  //
  // The back does the explaining: the word again with what it means, then the
  // root that unifies the family, then the other real forms grown from it, then
  // a verse it actually appears in.
  const isRootCard = card.type === 'root' && Array.isArray(card.lemmas) && card.lemmas.length;
  const rootHead = document.getElementById('card-back-root');
  const lemmaBox = document.getElementById('card-back-lemmas');
  const cardEl = document.getElementById('flashcard-element');
  cardEl.classList.toggle('root-card', !!isRootCard);
  if (rootHead) {
    rootHead.style.display = isRootCard ? 'flex' : 'none';
    if (isRootCard) {
      document.getElementById('card-back-root-word').textContent = card.front;
      document.getElementById('card-back-root-rom').textContent = [
        card.headwordGloss,
        card.root ? `root ${card.root}` : card.romanization,
        card.quranCount ? `${card.quranCount.toLocaleString()}× in the Qur'an` : ''
      ].filter(Boolean).join(' · ');
    }
  }
  if (lemmaBox) {
    lemmaBox.style.display = isRootCard ? 'block' : 'none';
    lemmaBox.innerHTML = isRootCard ? `
      <div class="card-lemmas-head">Others from the same root</div>
      ${card.lemmas.map(l => `
        <div class="card-lemma">
          <span class="card-lemma-ar">${escapeAttr(l.word)}</span>
          <span class="card-lemma-body">
            ${l.romanization ? `<span class="card-lemma-rom">${escapeAttr(l.romanization)}</span>` : ''}
            <span class="card-lemma-meaning">${escapeAttr(l.meaning)}</span>
          </span>
          ${l.form ? `<span class="card-lemma-form">${escapeAttr(l.form)}</span>` : ''}
        </div>`).join('')}
      ${card.verse ? `
        <blockquote class="card-verse">
          <span class="card-verse-ar" dir="rtl" lang="ar">${escapeAttr(card.verse.text)}</span>
          <cite class="card-verse-ref">${escapeAttr(card.verse.surah)} · ${escapeAttr(card.verse.ref)}</cite>
        </blockquote>` : ''}` : '';
  }

  // ── Language cards: TTS button + romanization fade ──
  const isLangCard = card._src?.type === 'langCards';
  const speakBtn = document.getElementById('card-speak-btn');
  const frontRom = document.getElementById('card-front-romanization');
  const backRom  = document.getElementById('card-back-romanization');

  speakBtn.style.display = isLangCard ? 'inline-flex' : 'none';
  speakBtn.onclick = isLangCard ? (e) => {
    e.stopPropagation(); // don't flip the card
    if (!NarrationEngine.speakLang(card.front, card._ttsLang)) {
      showToast(`No ${card._langName || card.bookTitle} voice on this device — audio unavailable.`,
        'info', 3500);
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
      if (view === 'vocab') VocabBuilder.open();
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
      if (view === 'vocab') VocabBuilder.open();
    });
  });

  // ── VOCABULARY BUILDER ──
  document.querySelectorAll('.vocab-tab').forEach(btn => {
    btn.addEventListener('click', () => VocabBuilder.switchTab(btn.dataset.tab));
  });
  document.getElementById('vocab-lang-select').addEventListener('change', async (e) => {
    VocabBuilder.lang = VocabBuilder.langs.find(l => l.id === e.target.value) || VocabBuilder.lang;
    VocabBuilder.words = [];
    VocabBuilder.quiz = null;
    VocabBuilder.renderControls();
    VocabBuilder.renderTab();
  });
  document.getElementById('vocab-tier-select').addEventListener('change', (e) => {
    VocabBuilder.lang.tier = e.target.value;
  });
  // A language is picked from the catalogue, not typed. Ones already added are
  // left out, so the list only ever offers something that would actually change
  // anything.
  document.getElementById('btn-vocab-add-lang').addEventListener('click', () => {
    VocabBuilder.togglePicker();
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
      const mode = document.querySelector('input[name="book-source"]:checked')?.value || 'knowledge';
      const isPdf = mode === 'pdf', isVideo = mode === 'video';
      document.getElementById('source-knowledge-zone').style.display  = mode === 'knowledge' ? 'block' : 'none';
      document.getElementById('source-pdf-zone').style.display        = isPdf ? 'block' : 'none';
      document.getElementById('source-video-zone').style.display      = isVideo ? 'block' : 'none';
      // Video mode keeps the name field: the learner names their own curriculum,
      // and leaving it blank lets the AI name it from the content.
      document.getElementById('title-author-group').style.display     = isPdf ? 'none' : 'block';
      document.getElementById('pdf-autodetect-note').style.display    = isPdf ? 'block' : 'none';

      const titleLabel = document.querySelector('label[for="input-book-title"]');
      const titleInput = document.getElementById('input-book-title');
      const authorGroup = document.querySelector('label[for="input-book-author"]')?.parentElement;
      if (titleLabel) titleLabel.textContent = isVideo ? 'Curriculum name' : 'Book Title';
      if (titleInput) titleInput.placeholder = isVideo
        ? 'e.g. Huberman on Sleep — leave blank to let the AI name it'
        : 'e.g. The Behavior Operational Manual';
      if (authorGroup) authorGroup.style.display = isVideo ? 'none' : 'block';

      document.getElementById('btn-check-book').textContent =
        isVideo ? 'Check Video →' : 'Check Book Coverage →';
    });
  });

  // Live feedback on the pasted link — a wrong URL should be obvious before
  // the learner waits on a generation that was never going to work.
  document.getElementById('input-video-url').addEventListener('input', (e) => {
    const status = document.getElementById('video-url-status');
    const val = e.target.value.trim();
    if (!val) { status.style.display = 'none'; return; }
    const parsed = parseYouTubeUrl(val);
    status.style.display = 'block';
    status.className = 'video-url-status ' + (parsed ? 'ok' : 'bad');
    status.textContent = parsed
      ? '✓ YouTube video recognised'
      : 'Only YouTube links work — the AI streams the video from there.';
  });

  document.getElementById('btn-add-video-chapter').addEventListener('click', addChaptersFromVideo);
  document.getElementById('btn-next-video-part').addEventListener('click', generateNextVideoPart);

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
  document.getElementById('select-provider')?.addEventListener('change', syncProviderFields);
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

  // Sweep anything whose grace period has run out. Fire-and-forget: nothing
  // the learner is doing should wait on housekeeping.
  purgeExpiredTrash();

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
