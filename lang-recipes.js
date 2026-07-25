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
  // The main course, taught by TWO tutors. The Instructor owns `grammar` and
  // `drill` — it states the rule and drills it, which is the progression spine.
  // The Companion owns `story`, `converse` and `shadow`, and takes its marching
  // orders from whichever unit the Instructor is on, so input and conversation
  // exercise the rule that was just taught instead of drifting.
  //
  // Progression is per UNIT, not per day: finish one and the next is available
  // immediately. There is no daily cap anywhere in this recipe.
  fresh: {
    id: 'fresh',
    label: 'Full course',
    unitType: 'structure',            // grammar units, with vocabulary riding along
    strands: ['review', 'grammar', 'drill', 'story', 'converse', 'shadow', 'wrap'],
    assessment: 'none',               // self-report level picker
    loadingCopy: (lang) => `Preparing your next ${lang.name} lesson…`,
    ui: { syllabus: true }
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

  // The vocabulary builder. Not a course — there is no session player, no
  // strands, no daily loop. It lives in its own view and exists to make an
  // already-competent speaker more ARTICULATE, which is why it is the one
  // recipe that makes sense in the learner's own native language. Its cards
  // still flow into the shared SM-2 deck like everything else.
  vocabBuilder: {
    id: 'vocabBuilder',
    label: 'Vocabulary builder',
    unitType: 'word',
    strands: [],                      // never played as a session
    assessment: 'none',
    loadingCopy: (lang) => `Choosing your next ${lang.name} words…`,
    ui: { standalone: true }
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

// Generators receive (lang, unit) — `unit` is the syllabus entry the Instructor
// is currently on, or null for recipes that carry their own spine.
const RECIPE_LESSON_GENERATORS = {
  // The two-tutor lesson: the Instructor's unit content and the Companion's
  // story are built in PARALLEL, and the story is told which structure to
  // exercise so both halves of the lesson teach the same thing.
  fresh: async (lang, unit) => {
    if (AppState.mode === 'demo') {
      return { ...demoLangLesson(lang), grammar: demoGrammarUnit(unit), unit };
    }
    const [grammar, story] = await Promise.all([
      unit ? callGrammarUnitGenerator(lang, unit, lang.knownWords || []) : Promise.resolve(null),
      callGradedStoryGenerator(lang, lang.level, lang.knownWords || [], unit)
    ]);
    return { ...story, grammar, unit };
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
  grammar: 'renderGrammar',
  drill: 'renderDrill',
  decode: 'renderDecode',
  rootLesson: 'renderRootLesson',
  verses: 'renderVerses',
  recite: 'renderRecite',
  precision: 'renderPrecision'
};
