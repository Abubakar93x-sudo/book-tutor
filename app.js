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
  selectedBook: null,       // The full book object currently being studied
  selectedChapter: null,    // The full chapter object currently being studied
  activeChatHistory: [],    // Array of { role, content, mode } message objects
  masteredConcepts: [],     // Array of concept strings mastered in this session
  flashcardSession: [],     // Array of flashcard objects for daily review
  flashcardIndex: 0,        // Current flashcard position
  reviewStats: { forgot: 0, hard: 0, good: 0, easy: 0, total: 0, done: 0 },
  currentUser: null,        // Firebase Auth user object (null = not signed in)
  settings: {
    apiKey: ''
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

  const isDemoMode = AppState.mode === 'demo';

  // Sync the settings UI
  if (document.getElementById('input-api-key'))
    document.getElementById('input-api-key').value = AppState.settings.apiKey;
  if (document.getElementById('toggle-demo-mode'))
    document.getElementById('toggle-demo-mode').checked = isDemoMode;

  if (isDemoMode) {
    document.getElementById('btn-demo-banner').style.display = 'inline-flex';
  }
}

async function saveSettings() {
  const apiKey = document.getElementById('input-api-key').value.trim();
  const isDemoMode = document.getElementById('toggle-demo-mode').checked;

  AppState.settings.apiKey = apiKey;
  AppState.mode = isDemoMode ? 'demo' : 'live';

  await dbPut('settings', { key: 'apiKey', value: apiKey });
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
    const emoji = ['📖', '🧠', '⚡', '🎯', '🔑'][colorIndex];

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
      : `<div class="book-card-cover-placeholder" style="background: linear-gradient(135deg, ${c1}33, ${c2}22); height: 100%; border-radius: 4px; display: flex; align-items: center; justify-content: center;"><span style="font-size: 48px;">${emoji}</span></div>`;

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
        <span class="book-card-progress-text">${pct}%</span>
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
      _chapterText: chapterData?.text || '' // for tutor quoting
    };
    AppState.selectedChapter = chapter;
    AppState.masteredConcepts = chapter._masteredConcepts || [];
    AppState.currentChatMode  = 'teach';

    const chapterKey = `${book.id}-ch${chapterNum}`;
    await loadChatHistoryFromDB(chapterKey);
    renderChapterUI(chapter);
    return;
  }

  // ── KNOWLEDGE BOOK: existing flow ────────────────────────────────────────
  const chapter = chapterSkeleton;
  AppState.selectedChapter  = chapter;
  AppState.masteredConcepts = chapter._masteredConcepts || [];
  AppState.currentChatMode  = 'teach';

  const chapterKey = `${book.id}-ch${chapter.number}`;
  await loadChatHistoryFromDB(chapterKey);
  renderChapterUI(chapter);
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

  document.getElementById('tutor-status-dot').className = 'status-dot green';
  document.getElementById('tutor-status-text').textContent = 'Session Active';

  switchChatTab('teach');

  const teachHistory = AppState.activeChatHistory.filter(m => m.mode === 'teach');
  if (teachHistory.length === 0) {
    const greeting = `Welcome! You're about to study **Chapter ${chapter.number}: ${chapter.title}** from *${book.title}*.\n\nAre you ready to begin? Just say "yes" when you're ready and I'll start teaching!`;
    appendChatMessage('tutor', greeting, 'teach');
  }

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
    node.className = 'concept-node';
    if (AppState.masteredConcepts.includes(concept)) node.classList.add('mastered');
    node.textContent = concept;
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

function renderMessageBubble(role, content, container) {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${role}`;

  // Parse basic markdown in AI messages
  const displayContent = role === 'tutor'
    ? renderMarkdown(content).replace(/\[MASTERED:.*?\]/g, '')
    : content;

  msg.innerHTML = `
    <div class="msg-bubble">${displayContent}</div>
    <div class="msg-meta">${role === 'tutor' ? '🤖 AI Tutor' : '👤 You'} · just now</div>
  `;
  container.appendChild(msg);
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

  input.value = '';
  input.style.height = 'auto';

  // Show the user's message
  appendChatMessage('user', message, AppState.currentChatMode);

  // Disable input and show a "typing" indicator
  input.disabled = true;
  document.getElementById('btn-chat-send').disabled = true;

  const targetContainer = document.getElementById(
    AppState.currentChatMode === 'teach' ? 'chat-history-teach' : 'chat-history-quiz'
  );

  const typingBubble = document.createElement('div');
  typingBubble.className = 'chat-msg tutor';
  typingBubble.id = 'typing-indicator';
  typingBubble.innerHTML = `<div class="msg-bubble" style="opacity:0.6;">
    <span style="animation: pulse 1s infinite;">Thinking</span>
    <span style="animation: pulse 1s 0.3s infinite;">.</span>
    <span style="animation: pulse 1s 0.6s infinite;">.</span>
    <span style="animation: pulse 1s 0.9s infinite;">.</span>
  </div>`;
  targetContainer.appendChild(typingBubble);
  targetContainer.scrollTop = targetContainer.scrollHeight;

  let response = '';

  try {
    if (AppState.mode === 'demo') {
      // Demo mode: generate contextual mock response
      response = generateDemoResponse(message, AppState.currentChatMode);
    } else {
      // Live mode: fire tutor agent and visual director in parallel.
      // The visual director runs only in teach mode (not quiz).
      const chapter  = AppState.selectedChapter;
      const book     = AppState.selectedBook;

      // Determine current active concept for the visual director
      const activeConcept = chapter.concepts
        .filter(c => !AppState.masteredConcepts.includes(c))[0] || chapter.title;
      const visualContext = `${activeConcept}. ${chapter.summary_15m.substring(0, 500)}`;

      const [tutorReply, visualData] = await Promise.all([
        callLiveTutorAgent(message, AppState.currentChatMode, AppState.masteredConcepts, chapter._chapterText || ''),
        AppState.currentChatMode === 'teach'
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

  // Remove typing indicator
  document.getElementById('typing-indicator')?.remove();

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

  // Show the AI response
  appendChatMessage('tutor', response, AppState.currentChatMode);

  // Narrate the response
  NarrationEngine.speak(response);

  // Auto-enter immersive mode on first teach response
  if (AppState.currentChatMode === 'teach') {
    enterImmersiveMode();
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

// ── 18c. IMMERSIVE MODE ─────────────────────────────────────────────────────
// Fullscreen teaching mode: expands the chat pane to cover the entire screen,
// moves the AI image to the right column, and shows pause/exit controls.
function enterImmersiveMode() {
  if (document.body.classList.contains('immersive')) return;
  document.body.classList.add('immersive');
  // Ensure we are on the tutor view
  navigateTo('tutor');
  // Scroll chat to bottom
  const history = document.getElementById(
    AppState.currentChatMode === 'teach' ? 'chat-history-teach' : 'chat-history-quiz'
  );
  if (history) history.scrollTop = history.scrollHeight;
}

function exitImmersiveMode() {
  document.body.classList.remove('immersive');
  NarrationEngine.stop();
  // Reset pause button label
  const pauseBtn = document.getElementById('btn-immersive-pause');
  if (pauseBtn) { pauseBtn.textContent = '⏸ Pause'; pauseBtn.dataset.paused = ''; }
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
async function initReviewSession() {
  let allFlashcards = [];

  const books = await dbGetAll('books');
  books.forEach(book => {
    book.chapters.forEach(ch => {
      (ch.flashcards || []).forEach(card => {
        allFlashcards.push({ ...card, bookTitle: book.title });
      });
    });
  });

  if (allFlashcards.length === 0) {
    document.getElementById('review-empty-message').style.display = 'flex';
    document.getElementById('flashcard-deck').style.display = 'none';
    document.getElementById('review-finished-message').style.display = 'none';
    return;
  }

  AppState.flashcardSession = allFlashcards;
  AppState.flashcardIndex = 0;
  AppState.reviewStats = { forgot: 0, hard: 0, good: 0, easy: 0, total: allFlashcards.length, done: 0 };

  document.getElementById('review-cards-ratio').textContent = `0 / ${allFlashcards.length}`;
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
  const stats = AppState.reviewStats;
  stats[score]++;
  stats.done++;

  // Update UI stats
  const ratio = `${stats.done} / ${stats.total}`;
  document.getElementById('review-cards-ratio').textContent = ratio;
  document.getElementById('review-progress-fill').style.width = `${(stats.done / stats.total) * 100}%`;
  document.getElementById('review-forgot-count').textContent = stats.forgot;
  document.getElementById('review-hard-count').textContent = stats.hard;
  document.getElementById('review-good-count').textContent = stats.good;
  document.getElementById('review-easy-count').textContent = stats.easy;

  // Update review badge
  const remaining = stats.total - stats.done;
  const badge = document.getElementById('review-badge');
  if (remaining > 0) {
    badge.style.display = 'flex';
    badge.textContent = remaining;
  } else {
    badge.style.display = 'none';
  }

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
  });

  chapterSelect.addEventListener('change', (e) => {
    if (e.target.value) loadChapter(parseInt(e.target.value));
  });
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

  // Init Firebase Auth (shows sign-in overlay if not logged in)
  initAuth();

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

  // Narration toggle button
  document.getElementById('btn-narrate-toggle').addEventListener('click', () => {
    const isOn = NarrationEngine.toggle();
    const btn = document.getElementById('btn-narrate-toggle');
    btn.textContent = isOn ? '🔊' : '🔇';
    btn.classList.toggle('narrate-off', !isOn);
    showToast(isOn ? 'Narration on' : 'Narration off', 'info', 1500);
  });

  // Immersive pause button
  document.getElementById('btn-immersive-pause').addEventListener('click', () => {
    const btn = document.getElementById('btn-immersive-pause');
    const isPaused = btn.dataset.paused === 'true';
    if (isPaused) {
      // Resume: re-enable narration
      NarrationEngine.enabled = true;
      btn.textContent = '⏸ Pause';
      btn.dataset.paused = 'false';
    } else {
      // Pause: stop current narration and disable
      NarrationEngine.stop();
      NarrationEngine.enabled = false;
      btn.textContent = '▶ Resume';
      btn.dataset.paused = 'true';
    }
  });

  // Immersive exit button
  document.getElementById('btn-immersive-exit').addEventListener('click', exitImmersiveMode);

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
