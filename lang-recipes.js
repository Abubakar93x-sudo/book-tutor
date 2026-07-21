// ============================================================================
// BookTutor — Language Curriculum Recipes (lang-recipes.js)
// A recipe = how a language is taught for a given learner situation. It
// decides the vocabulary unit, the strands that make up a daily session,
// the assessment style at onboarding, and any extra UI (coverage meter,
// romanization bridge). The session player (LangSession in app.js) consumes
// a recipe instead of hardcoding one pedagogy for every language.
//
// Loaded BEFORE app.js — everything here is plain globals (no modules),
// matching the rest of the codebase. Generator functions reference app.js /
// ai-agents.js globals which resolve at call time, after all scripts load.
// ============================================================================

const RECIPES = {
  // The original frequency-word course — unchanged behavior, now explicit.
  fresh: {
    id: 'fresh',
    label: 'Full course',
    unitType: 'word',                 // frequency-ordered single words
    strands: ['review', 'story', 'converse', 'shadow', 'wrap'],
    assessment: 'none',               // self-report level picker
    loadingCopy: (lang) => `Writing today's ${lang.name} story at your level…`,
    ui: {}
  },

  // Heritage speakers: they understand the language, the script is the only
  // lock. Script decoding IS the course; success = recognizing a word they
  // already know out loud.
  literacy: {
    id: 'literacy',
    label: 'Learn to read it',
    unitType: 'char',
    strands: ['review', 'decode', 'shadow', 'wrap'],
    assessment: 'listening-check',
    loadingCopy: (lang) => `Building today's ${lang.scriptName} decoding drills…`,
    ui: { romanizationBridge: true }
  },

  // Fluent speakers growing the long tail: precision over translation.
  vocabExpand: {
    id: 'vocabExpand',
    label: 'Grow my vocabulary',
    unitType: 'word-family',
    strands: ['review', 'precision', 'wrap'],
    assessment: 'frontier',
    loadingCopy: (lang) => `Picking today's ${lang.name} words from just past your frontier…`,
    ui: { bookHarvest: true }
  },

  // Quranic Arabic: root families in corpus-frequency order, anchored in real
  // verses. Closed corpus → honest coverage math from static data. No
  // conversation strand (nobody chats in classical fus'ha); shadowing is
  // recitation of the studied verses.
  quranic: {
    id: 'quranic',
    label: 'Quranic Arabic',
    unitType: 'root',
    strands: ['review', 'rootLesson', 'verses', 'recite', 'wrap'],
    assessment: 'verse-ladder',
    loadingCopy: () => `Preparing today's root family and its verses…`,
    ui: { coverageMeter: true },
    dataSource: 'QURAN_ROOTS'
  }
};

// Missing/unknown recipeId falls back to the original behavior — this line IS
// the migration for language docs created before recipes existed.
function getRecipe(lang) {
  return RECIPES[lang?.recipeId] || RECIPES.fresh;
}

// ── LESSON GENERATORS ────────────────────────────────────────────────────────
// One per recipe: async (lang) => lesson. Every lesson shape must stay
// wrap-compatible (renderWrap consumes lesson.newWords / lesson.checkpoints).
// Demo-mode handling lives inside each generator so LangSession stays clean.

const RECIPE_LESSON_GENERATORS = {
  fresh: async (lang) => {
    return AppState.mode === 'demo'
      ? demoLangLesson(lang)
      : await callGradedStoryGenerator(lang, lang.level, lang.knownWords || []);
  }
  // literacy / vocabExpand / quranic generators are registered by app.js as
  // their stages land (registerRecipeLessonGenerator below).
};

function registerRecipeLessonGenerator(recipeId, fn) {
  RECIPE_LESSON_GENERATORS[recipeId] = fn;
}

function getLessonGenerator(recipeId) {
  return RECIPE_LESSON_GENERATORS[recipeId] || RECIPE_LESSON_GENERATORS.fresh;
}

// ── ACTIVITY RENDERER MAP ────────────────────────────────────────────────────
// Strand kind → LangSession method name, for kinds beyond the original five.
// renderActivity checks this map before its renderWrap catch-all.
const RECIPE_ACTIVITY_RENDERERS = {
  decode: 'renderDecode',
  rootLesson: 'renderRootLesson',
  verses: 'renderVerses',
  recite: 'renderRecite',
  precision: 'renderPrecision'
};
