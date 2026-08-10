// ============================================================================
// BookTutor — the Quranic Arabic course, written out (quran-course-data.js)
//
// All 28 lessons, in full. GENERATED — do not hand-edit; edit the syllabus in
// quran-grammar-data.js and re-run tools/build-course.cjs.
//
// Written by gpt-5.2 on 2026-08-10.
//
// Every one of the 144 Arabic examples below was checked against
// quran-text.js before it was written here: the snippet occurs at the ayah it
// cites, and its coloured segments concatenate back into it exactly. Examples
// that failed either check were regenerated, and dropped if they failed again.
// Models misquote the Qur'an often enough that this is not optional — an early
// probe had two of five references wrong.
//
// The app reads this synchronously. No lesson is ever generated at runtime, so
// opening one is a property lookup rather than a wait.
// ============================================================================

const QURAN_COURSE = [
 {
  "id": "word-types",
  "n": 1,
  "title": "The three kinds of word — and why that is the first thing to see",
  "stage": "What a word is",
  "level": "A0",
  "structure": "Every word in the Qur'an is one of three things. اسم (ism) — a noun: a thing, a person, a quality: كِتَاب، رَبّ، عَظِيم. فِعْل (fiʿl) — a verb, an action in time: قَالَ، يَعْلَمُ. حَرْف (ḥarf) — a particle, the glue that has no meaning alone: فِي، مِنْ، لَا، إِنَّ. The Qur'an is noun-heavy: اسم is the commonest of the three by a wide margin.",
  "whyItMatters": "It gives you something to do with a word before you can translate it. Sorting a verse into these three is a move you can make on day one, and it is the lens every later lesson looks through.",
  "canDo": "After this lesson you can look at any word in a Qur’anic line and quickly label it as اسم (noun), فعل (verb), or حرف (particle), before you try to translate.",
  "rule": "Every word you meet in the Qur’an is one of three types: اسم (a noun), فعل (a verb), or حرف (a particle). A noun points to a “thing” (including people, qualities, and ideas), a verb points to an action tied to time, and a particle is “glue” that gains meaning only by attaching to other words. If you cannot translate yet, you can still do something reliable: sort words into these three kinds—because the Qur’an is noun-heavy, you will most often be looking at أسماء.",
  "why": [
   "Prevents mistaking a particle like لَا or إِنَّ for a “mystery noun,” which leads to completely backwards sentence meaning.",
   "Prevents reading a verb like قَالَ as “a name” and missing that a speaker/action has just started (a major shift in narrative).",
   "Prevents translating word-by-word without structure: particles (especially prepositions) tell you how nouns and verbs connect.",
   "Prevents getting stuck: even when a word is unknown, identifying it as noun/verb/particle narrows what it could mean and where to look next."
  ],
  "pattern": {
   "caption": "The only three word-kinds you will ever need on day one (recognition, not speaking).",
   "columns": [
    "Kind (Arabic name)",
    "What it does in meaning",
    "Common Qur’anic signals"
   ],
   "rows": [
    [
     "اسم (ism) — noun",
     "Names a thing/person/quality/idea",
     "Often appears with ٱلـ (the), often after prepositions like فِى / مِنْ, and is the most common type"
    ],
    [
     "فعل (fiʿl) — verb",
     "Names an action tied to time",
     "Often carries “person/number” inside the word; frequently comes early in a clause (e.g., قَالَ)"
    ],
    [
     "حرف (ḥarf) — particle",
     "Connects; has no full meaning alone",
     "Short words like لَا, فِى, مِنْ, إِنَّ; often triggers a predictable structure after it"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "وَقَالَ",
    "blocks": [
     {
      "text": "وَ",
      "role": "particle",
      "gloss": "and"
     },
     {
      "text": "قَالَ",
      "role": "root",
      "gloss": "said"
     }
    ],
    "note": "The particle وَ is attached directly to the verb; spotting it helps you not treat the whole word as a noun."
   },
   {
    "word": "لَا",
    "blocks": [
     {
      "text": "لَا",
      "role": "particle",
      "gloss": "not / do-not"
     }
    ],
    "note": "This is pure “glue”: it flips or blocks the action; it is not a name of something."
   },
   {
    "word": "مِنْ",
    "blocks": [
     {
      "text": "مِنْ",
      "role": "preposition",
      "gloss": "from"
     }
    ],
    "note": "Prepositions are a major subgroup of particles: they announce that a noun is coming and will be linked to something else."
   },
   {
    "word": "ٱلْكِتَٰبُ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "book"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "case ending"
     }
    ],
    "note": "In reading, focus on the letters (كِتَٰب) as the noun; the ending vowel is grammar information you will learn to use later."
   },
   {
    "word": "إِنَّكَ",
    "blocks": [
     {
      "text": "إِنَّ",
      "role": "particle",
      "gloss": "indeed"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun",
      "gloss": "you (sg.)"
     }
    ],
    "note": "Some particles carry an attached pronoun; this still does not make the word a verb—start by identifying the particle."
   }
  ],
  "examples": [
   {
    "arabic": "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ",
    "ref": "2:2",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "ذَٰلِكَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "plain"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَيْب",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "That | the-book | no | doubt",
    "smooth": "That is the Book—no doubt in it.",
    "whatChanged": "This shows a noun-heavy line: you can spot two nouns (ٱلْكِتَٰبُ, رَيْبَ) and one particle (لَا) even before knowing full grammar."
   },
   {
    "arabic": "وَقَالَ يَٰبَنِىَّ لَا تَدْخُلُوا۟",
    "ref": "12:67",
    "surah": "Sūrat Yusuf",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "قَالَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَٰ",
      "role": "particle"
     },
     {
      "text": "بَنِى",
      "role": "root"
     },
     {
      "text": "َّ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "تَ",
      "role": "verbPrefix"
     },
     {
      "text": "دْخُل",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     }
    ],
    "literal": "And-said | O my-sons | do-not | you (pl.) enter",
    "smooth": "And he said: “My sons, do not enter…”",
    "whatChanged": "This adds verbs to the picture: you can see where the action words are (قَالَ, تَدْخُلُوا۟) and how particles (وَ, لَا, يَٰ) control the flow."
   },
   {
    "arabic": "قَالَ خُذْهَا وَلَا تَخَفْ",
    "ref": "20:21",
    "surah": "Sūrat Taa-Haa",
    "segments": [
     {
      "text": "قَالَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "خُذْ",
      "role": "root"
     },
     {
      "text": "هَا",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "تَ",
      "role": "verbPrefix"
     },
     {
      "text": "خَفْ",
      "role": "root"
     }
    ],
    "literal": "He-said | take-it | and-do-not | you fear",
    "smooth": "He said: “Take it, and do not fear.”",
    "whatChanged": "This shows that attached pronouns can be glued to a verb (خُذْهَا) while the word is still a verb, not a noun."
   },
   {
    "arabic": "هُوَ ٱلَّذِى بَعَثَ فِى",
    "ref": "62:2",
    "surah": "Sūrat Al-Jumu'a",
    "segments": [
     {
      "text": "هُوَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلَّذِى",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بَعَثَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِى",
      "role": "preposition"
     }
    ],
    "literal": "He | (is) the-one-who | sent | in",
    "smooth": "He is the One who sent (a messenger) among…",
    "whatChanged": "This introduces a key reading move: when you see a preposition (فِى), expect a noun right after it and read forward to complete the meaning."
   },
   {
    "arabic": "إِنَّكَ أَنتَ ٱلْوَهَّابُ",
    "ref": "38:35",
    "surah": "Sūrat Saad",
    "segments": [
     {
      "text": "إِنَّ",
      "role": "particle"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَنتَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "plain"
     },
     {
      "text": "وَهَّاب",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     }
    ],
    "literal": "Indeed-you | you | the-Bestower",
    "smooth": "Indeed, You are the Bestower.",
    "whatChanged": "This highlights a frequent Qur’anic structure: a particle (إِنَّ) sets up emphasis, then the line is carried by nouns (names/attributes) like ٱلْوَهَّابُ."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a preposition (حرف جرّ) with a noun just because it is short.",
    "example": "فِى",
    "note": "فِى is not “a thing”; it is a connector meaning “in/within.” When you see it, your brain should immediately look for the noun after it to complete the idea."
   },
   {
    "claim": "Don’t treat لَا as a random sound; it is meaning-bearing glue that changes the whole clause.",
    "example": "لَا تَدْخُلُوا۟",
    "note": "Even if you do not know the verb yet, لَا tells you the clause is negative (often a prohibition). Missing it flips the meaning."
   },
   {
    "claim": "Don’t assume every word with multiple parts is a verb; particles can carry attached pronouns too.",
    "example": "إِنَّكَ",
    "note": "إِنَّ is a particle; كَ is “you.” This is not an action; it is emphasis plus a pronoun, often leading into a statement about Allah or a person."
   }
  ],
  "checklist": [
   "Circle (mentally) the shortest “glue words” first: لَا, فِى, مِنْ, وَ, إِنَّ. These are almost always حروف (particles).",
   "Mark any preposition (فِى / مِنْ) as a promise: a noun will follow and complete the phrase.",
   "Look for obvious action-starters like قَالَ or words that carry verb prefixes/suffixes (e.g., تَ…وا۟): label them فعل.",
   "Everything left that names something—people, things, attributes, concepts—label اسم, even if you do not know the dictionary meaning yet (e.g., ٱلْكِتَٰبُ).",
   "If stuck, decide between “action” (verb) and “thing/quality” (noun) first; only then worry about finer details."
  ],
  "summary": [
   "Rule: every Qur’anic word is either اسم, فعل, or حرف.",
   "What it looks like: particles are short glue (لَا, فِى, وَ, إِنَّ), verbs carry actions (قَالَ, تَدْخُلُوا۟), and nouns carry most of the content (ٱلْكِتَٰبُ, رَيْبَ, ٱلْوَهَّابُ).",
   "What you can now do: before translating, you can sort a snippet into these three kinds and read it with structure instead of guessing word-by-word."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to label each word as اسم / فعل / حرف (and to spot particles like لَا, فِى, وَ, إِنَّ)."
 },
 {
  "id": "lemma-vs-form",
  "n": 2,
  "title": "Why \"how many words\" is the wrong question",
  "stage": "What a word is",
  "level": "A0",
  "structure": "A LEMMA is the dictionary entry that gathers many surface forms under one heading: قَالَ، يَقُولُونَ، قُلْ، قِيلَ are four word-forms and one lemma. The Qur'an has roughly 77,430 words but only a few thousand lemmas, and far fewer roots than that. Counting what you see on the page counts the same word again and again.",
  "whyItMatters": "This is what makes frequency lists work, and what makes 300 roots a realistic target instead of an absurd one. You are not learning 77,000 things.",
  "canDo": "After this lesson you can treat many different Qur’anic word-shapes as the same dictionary entry (lemma), so repetition stops feeling like “new vocabulary.”",
  "rule": "A lemma is the dictionary heading that gathers many surface word-forms under one meaning core (often one root). In Qur’anic Arabic, what you see on the page (قَالُوا۟, يَقُولُونَ, قُلْ…) can be different forms of the same lemma “to say.” Counting “words on the page” counts the same lemma again and again. For comprehension, you want to recognize lemmas, not memorize every surface form as a separate item.",
  "why": [
   "Prevents the “I don’t know this word” panic when you meet a familiar lemma in a new shape (e.g., يَقُولُونَ vs قَالُوا۟).",
   "Prevents wasting study time: you stop treating each form as a separate vocabulary item when it is the same dictionary entry with different grammar attached.",
   "Prevents misunderstanding frequency lists: the most common “words” are often one lemma appearing in many forms, not thousands of unrelated items.",
   "Prevents overestimating the learning load: the Qur’an has ~77,430 word-tokens, but only a few thousand lemmas and far fewer roots."
  ],
  "pattern": {
   "caption": "One lemma “to say” appears in different surface forms. Notice how prefixes/suffixes and pronouns change, while the meaning-core stays recognizable.",
   "columns": [
    "Surface form (as written)",
    "What got added around the core",
    "Same lemma meaning"
   ],
   "rows": [
    [
     "قَالُوا۟",
     "verb suffix = “they”",
     "said"
    ],
    [
     "وَقَالُوا۟",
     "particle وَ + “they” suffix",
     "and they said"
    ],
    [
     "يَقُولُونَ",
     "verb prefix (present) + “they” ending",
     "they say / are saying"
    ],
    [
     "سَيَقُولُونَ",
     "future particle سَ + present prefix + “they” ending",
     "they will say"
    ],
    [
     "قُلْ",
     "imperative form (command)",
     "say! (to one male)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "وَقَالُوا۟",
    "blocks": [
     {
      "text": "وَ",
      "role": "particle",
      "gloss": "and"
     },
     {
      "text": "قَال",
      "role": "root",
      "gloss": "say (core)"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they (did)"
     }
    ],
    "note": "Split after وَ and before the plural suffix; the meaning core stays in قَال."
   },
   {
    "word": "يَقُولُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he/they (imperfect)"
     },
     {
      "text": "قُول",
      "role": "root",
      "gloss": "say (core)"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "they"
     }
    ],
    "note": "The present/ongoing frame is signaled by the prefix يَ and the plural ending ونَ."
   },
   {
    "word": "سَيَقُولُونَ",
    "blocks": [
     {
      "text": "سَ",
      "role": "particle",
      "gloss": "will (soon)"
     },
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "they (imperfect)"
     },
     {
      "text": "قُول",
      "role": "root",
      "gloss": "say (core)"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "they"
     }
    ],
    "note": "Future meaning comes from سَ; everything else is the same lemma shape as يَقُولُونَ."
   },
   {
    "word": "قُلْ",
    "blocks": [
     {
      "text": "قُلْ",
      "role": "root",
      "gloss": "say! (command)"
     }
    ],
    "note": "Even when the core is not split, recognize it as the same lemma; it is another surface form of “to say.”"
   }
  ],
  "examples": [
   {
    "arabic": "قَالُوا۟ يَٰشُعَيْبُ",
    "ref": "11:91",
    "surah": "Sūrat Hud",
    "segments": [
     {
      "text": "قَال",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَٰ",
      "role": "particle"
     },
     {
      "text": "شُعَيْبُ",
      "role": "plain"
     }
    ],
    "literal": "said-they O Shuʿayb",
    "smooth": "They said, “O Shuʿayb …”",
    "whatChanged": "This sets the baseline: the lemma “to say” appears in a past form with a clear “they” suffix."
   },
   {
    "arabic": "وَقَالُوا۟ لَا تَذَرُنَّ",
    "ref": "71:23",
    "surah": "Sūrat Nooh",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "قَال",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "تَذَرُنَّ",
      "role": "plain"
     }
    ],
    "literal": "and said-they do-not (surely) leave",
    "smooth": "And they said, “Do not ever abandon …”",
    "whatChanged": "Same lemma and same past “they said,” but now a common particle وَ attaches in front—do not count it as a new vocabulary item."
   },
   {
    "arabic": "وَيَقُولُونَ مَتَىٰ",
    "ref": "32:28",
    "surah": "Sūrat As-Sajda",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "قُول",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مَتَىٰ",
      "role": "plain"
     }
    ],
    "literal": "and they-say when",
    "smooth": "And they say, “When …?”",
    "whatChanged": "The lemma is the same, but the surface form switches to present/ongoing (يَ…ونَ), which beginners often misfile as a “different word.”"
   },
   {
    "arabic": "فَسَيَقُولُونَ هَٰذَآ",
    "ref": "46:11",
    "surah": "Sūrat Al-Ahqaf",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "سَ",
      "role": "particle"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "قُول",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "هَٰذَآ",
      "role": "plain"
     }
    ],
    "literal": "so-then will they-say this",
    "smooth": "So they will say, “This …”",
    "whatChanged": "Future meaning appears without changing the lemma—particles (فَ, سَ) can stack in front and inflate the “word count” if you are not lemma-aware."
   },
   {
    "arabic": "قُلْ أَتُنَبِّـُٔونَ",
    "ref": "10:18",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "قُلْ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَ",
      "role": "particle"
     },
     {
      "text": "تُنَبِّـُٔونَ",
      "role": "plain"
     }
    ],
    "literal": "say! do-you-inform",
    "smooth": "Say, “Are you informing …?”",
    "whatChanged": "Now the same lemma appears as a command (imperative). Different shape, same dictionary entry—so it should feel familiar, not new."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the lemma with a single tense.",
    "example": "قَالُوا۟ / يَقُولُونَ",
    "note": "Both belong to the same lemma “to say.” If you treat them as separate vocabulary, you will double (or triple) your workload and miss obvious repetition."
   },
   {
    "claim": "Don’t count attached particles as new “words you must learn.”",
    "example": "قَالُوا۟ / وَقَالُوا۟ / فَسَيَقُولُونَ",
    "note": "وَ, فَ, سَ change the sentence flow (and, so, will), but they are add-ons. The core meaning is still carried by the same lemma of “saying.”"
   },
   {
    "claim": "Don’t assume different spellings mean different lemmas.",
    "example": "قُلْ / يَقُولُونَ",
    "note": "Imperatives often look very different from past/present forms in Arabic. For comprehension, train your eye to look past the shape and spot the shared core."
   }
  ],
  "checklist": [
   "When you meet an unfamiliar-looking verb, first ask: is there a common core repeated across verses (a few letters that keep coming back)?",
   "Circle (mentally) any front add-ons: وَ, فَ, سَ and similar particles often attach and make the form look longer.",
   "Look for person/number endings: suffixes like وا۟ or endings like ونَ often tell you “they,” not a new meaning.",
   "If the sentence has “say” context (speech, quotation, response), suspect the lemma “to say” even if the form is imperative (قُلْ).",
   "In your dictionary or word list, store one lemma entry (e.g., “to say”) and file all these forms under it instead of making separate cards."
  ],
  "summary": [
   "Rule: many different surface word-forms belong to one lemma (dictionary entry).",
   "What it looks like: prefixes/suffixes and particles change around a stable meaning core (قَال… / يَقُول… / قُلْ), producing many shapes on the page.",
   "What you can now do: read repeated Qur’anic vocabulary as repetition of the same lemma, making frequency-based study realistic rather than overwhelming."
  ],
  "quizBridge": "The quiz will show you short Qur’anic snippets and ask you to group different forms (with prefixes/suffixes/particles) under the same lemma instead of counting them as separate words."
 },
 {
  "id": "root-lemma-wordform",
  "n": 3,
  "title": "Root, lemma, word-form — the three layers of every word",
  "stage": "What a word is",
  "level": "A0",
  "structure": "ROOT (جذر) — the bare consonants carrying the family meaning: ك ت ب, writing. LEMMA (مدخل) — a distinct dictionary word grown from it: كِتَاب a book، كَاتِب a writer، مَكْتُوب written. WORD-FORM (صيغة) — that lemma as it actually appears, inflected: كَتَبُوا they wrote، كُتِبَ it was prescribed، ٱلْكِتَٰبِ of the Book.",
  "whyItMatters": "This is the mental model the whole course runs on: family meaning from the root, specific meaning from the pattern, grammar from the ending. Every unfamiliar word you ever meet gets taken apart this way.",
  "canDo": "After this lesson you can look at an unfamiliar Qur’anic word and separate its ROOT (family meaning), its LEMMA (dictionary word), and its WORD‑FORM (the lemma as it appears with endings/attachments).",
  "rule": "Every Arabic word you meet has three useful layers for reading: ROOT → LEMMA → WORD‑FORM. The root (جذر) is the bare consonants that carry the family meaning (e.g., ك ت ب “writing”). The lemma (مدخل) is one dictionary word built from that root (كِتَٰب “book”, كَاتِب “writer”), and the word-form (صيغة) is how that lemma shows up in the Qur’an with grammar (ٱلْكِتَٰبِ, كِتَٰبًا, كِتَٰبُهُ).",
  "why": [
   "Prevents the “I don’t know this word” freeze: you can still recognize the root-family meaning even when the form is unfamiliar.",
   "Prevents misreading grammar as meaning: endings and attachments change the role in the sentence (of the Book / the Book / a book) without changing the core lemma.",
   "Prevents treating similar-looking words as unrelated: the same root can appear across verbs and nouns, linking ideas across āyāt (e.g., كِتَٰب, ٱلْكِتَٰب).",
   "Prevents dictionary frustration: you learn to search by lemma/root rather than the exact printed word-form in the mushaf."
  ],
  "pattern": {
   "caption": "Three layers you mentally peel off while reading",
   "columns": [
    "ROOT (family meaning)",
    "LEMMA (dictionary word)",
    "WORD‑FORM in the Qur’an (with grammar)"
   ],
   "rows": [
    [
     "ك ت ب",
     "كِتَٰب (book)",
     "ٱلْكِتَٰبُ / ٱلْكِتَٰبَ / ٱلْكِتَٰبِ"
    ],
    [
     "ك ت ب",
     "كِتَٰب (book)",
     "كِتَٰبٍ (a book [in/with])"
    ],
    [
     "ك ت ب",
     "كِتَٰب (book)",
     "كِتَٰبًا (a book [as object])"
    ],
    [
     "ك ت ب",
     "كِتَٰب (book)",
     "كِتَٰبُهُ (his book)"
    ],
    [
     "ك ت ب",
     "كِتَٰب (book)",
     "لَكِتَٰبٌ (indeed a book)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلْكِتَٰبِ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "particle",
      "gloss": "the (definite)"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "book (K‑T‑B)"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "of/in (i)"
     }
    ],
    "note": "Split after the definite article ٱلْ, then isolate the meaning-carrying letters, then the final case vowel (here: ـِ)."
   },
   {
    "word": "ٱلْكِتَٰبَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "particle",
      "gloss": "the (definite)"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "book (K‑T‑B)"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "object (a)"
     }
    ],
    "note": "Same lemma as above; only the ending changes, which changes the grammatical job."
   },
   {
    "word": "كِتَٰبٍۢ",
    "blocks": [
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "book (K‑T‑B)"
     },
     {
      "text": "ٍۢ",
      "role": "nounEnding",
      "gloss": "in/with (in)"
     }
    ],
    "note": "No ٱلْ here, so the lemma appears as an indefinite noun; the ending still signals grammar."
   },
   {
    "word": "كِتَٰبُهُۥ",
    "blocks": [
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "book (K‑T‑B)"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "subject (u)"
     },
     {
      "text": "هُۥ",
      "role": "attachedPronoun",
      "gloss": "his / its"
     }
    ],
    "note": "The attached pronoun is not part of the lemma; it is added to the word-form to specify whose."
   },
   {
    "word": "لَكِتَٰبٌ",
    "blocks": [
     {
      "text": "لَ",
      "role": "particle",
      "gloss": "indeed / surely"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "book (K‑T‑B)"
     },
     {
      "text": "ٌ",
      "role": "nounEnding",
      "gloss": "a (un)"
     }
    ],
    "note": "A particle can sit in front of the lemma; the root stays the meaning core, while the ending marks the word’s grammatical state."
   }
  ],
  "examples": [
   {
    "arabic": "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ",
    "ref": "2:2",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "ذَٰلِكَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَيْبَ",
      "role": "plain"
     }
    ],
    "literal": "That / the‑Book‑(u) / no / doubt",
    "smooth": "That is the Book—no doubt.",
    "whatChanged": "You see one lemma (كِتَٰب) as a word-form with two extra layers: ٱلْ for definiteness and ـُ marking its grammatical role."
   },
   {
    "arabic": "إِلَّا فِى كِتَٰبٍۢ مُّبِينٍۢ",
    "ref": "6:59",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "إِلَّا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ٍۢ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُّبِين",
      "role": "plain"
     },
     {
      "text": "ٍۢ",
      "role": "nounEnding"
     }
    ],
    "literal": "except / in / book‑(in) / clear‑(in)",
    "smooth": "…except in a clear record.",
    "whatChanged": "The same root/lemma appears without ٱلْ (indefinite), and the ending (ـٍ) matches its preposition (فِى), showing word-form grammar."
   },
   {
    "arabic": "نَزَّلْنَا عَلَيْكَ ٱلْكِتَٰبَ",
    "ref": "16:89",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "نَزَّلْنَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَلَيْ",
      "role": "preposition"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "We sent down / upon‑you / the‑Book‑(a)",
    "smooth": "We sent down to you the Book.",
    "whatChanged": "The lemma stays the same, but now you see a different case ending (ـَ) on ٱلْكِتَٰبَ, signaling a different grammatical slot than in 2:2."
   },
   {
    "arabic": "إِنَّهُۥ لَكِتَٰبٌ عَزِيزٌۭ",
    "ref": "41:41",
    "surah": "Sūrat Fussilat",
    "segments": [
     {
      "text": "إِنَّ",
      "role": "particle"
     },
     {
      "text": "هُۥ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَ",
      "role": "particle"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ٌ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَزِيزٌۭ",
      "role": "plain"
     }
    ],
    "literal": "Indeed‑it / surely / book‑(un) / mighty",
    "smooth": "Indeed, it is a mighty Book.",
    "whatChanged": "You see how particles can wrap around the lemma (إِنَّ… لَ…), while the root stays the stable meaning core; the word-form includes those add-ons."
   },
   {
    "arabic": "أُوتِىَ كِتَٰبَهُۥ وَرَآءَ",
    "ref": "84:10",
    "surah": "Sūrat Al-Inshiqaaq",
    "segments": [
     {
      "text": "أُوتِىَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     },
     {
      "text": "هُۥ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "وَرَآءَ",
      "role": "plain"
     }
    ],
    "literal": "is given / book‑(a)‑his / behind",
    "smooth": "…is given his book behind (his back)…",
    "whatChanged": "The word-form shows possession through an attached pronoun (ـهُ), which is neither the root nor a separate lemma, but a grammatical attachment."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse ROOT with “the first three letters you see.”",
    "example": "ٱلْكِتَٰبِ",
    "note": "The visible beginning ٱلْ is a definite-article add-on, not part of the root. The root family here is ك ت ب; you mentally peel off ٱلْ before thinking “root.”"
   },
   {
    "claim": "Don’t confuse LEMMA with WORD‑FORM.",
    "example": "كِتَٰبٍۢ / ٱلْكِتَٰبَ",
    "note": "Both point back to the same dictionary lemma كِتَٰب, but they are different word-forms. The ending and definiteness change the sentence-role and nuance, not the core lemma meaning “book.”"
   },
   {
    "claim": "Don’t treat attached pronouns as part of the root or lemma.",
    "example": "كِتَٰبَهُۥ",
    "note": "The هُۥ is “his/its,” added to the noun in the word-form. If you mistakenly bake it into the lemma, you will fail to recognize the same lemma elsewhere without the pronoun."
   }
  ],
  "checklist": [
   "Circle the meaning core: look for the consonant skeleton you keep seeing across related words (here: ك‑ت‑ب).",
   "Before guessing meaning, peel off obvious add-ons: ٱلْ (definite article), and any attached pronoun like ـهُۥ.",
   "Identify the lemma: what dictionary noun/verb does this word-form most directly match (e.g., كِتَٰب).",
   "Finally read the ending: ـُ / ـَ / ـِ / ـٌ / ـٍ and treat it as “grammar information,” not new vocabulary.",
   "If you see a preposition right before a noun (e.g., فِى), expect the noun ending to reflect that word-form role.",
   "When the same lemma repeats in different āyāt, compare only what changed (article, ending, attached pronoun, particles) to understand the new function."
  ],
  "summary": [
   "Rule: ROOT gives family meaning, LEMMA gives the dictionary word, WORD‑FORM gives the lemma as it appears with grammar and attachments.",
   "What it looks like: ٱلْ + كِتَٰب + ending (ـُ/ـَ/ـِ) and sometimes + pronoun (ـهُۥ), or particles like لَ in front.",
   "What you can now do: recognize “book/record/Book” as one lemma family (كِتَٰب from ك ت ب) even when the Qur’an shows it in different word-forms."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to label which pieces are ROOT vs add-ons (article/ending/pronoun) and to state the shared lemma meaning across different word-forms."
 },
 {
  "id": "the-80-20-plan",
  "n": 4,
  "title": "The 20% that gets you 80% of the Qur'an",
  "stage": "How to go about it",
  "level": "A0",
  "structure": "Four things carry almost all of it. THE 300 COMMONEST ROOTS — about 20% of the effort for 70-80% of word recognition. THE 40 CORE PARTICLES — 5% of the effort, and they unlock sentence flow. THE TEN VERB FORMS AND THE MAIN NOUN PATTERNS — 10%, and they let you decode words you have never seen. TWO SENTENCE TYPES plus a little syntax — 10%, for most of the grammar. In that order: roots, then patterns, then grammar, then reading.",
  "whyItMatters": "It tells you what to ignore, which matters more than what to study. Classical Arabic is vast and most of it is not in the Qur'an — knowing where the ceiling is stops the whole thing feeling bottomless.",
  "canDo": "After this lesson you can triage a Qur’anic line by spotting the few high-payoff building blocks (roots, particles, patterns, and sentence type) that unlock most recognition.",
  "rule": "Most Qur’anic comprehension comes from four carriers: common roots, core particles, a small set of verb/noun patterns, and two basic sentence types. Start by grabbing meaning-bearing roots, then let patterns tell you “what kind of word it is,” then let particles show relationships, and finally read the sentence as either verbal (verb-led) or nominal (noun-led). Ignore the rest until these four feel automatic.",
  "why": [
   "Prevents the “bottomless vocabulary” feeling by giving you a clear ceiling: you are not trying to learn all Arabic, only the Qur’an’s high-frequency engine.",
   "Prevents getting lost in sentence flow when you know words but miss connectors like إِنَّ / لَا / وَ / لَهُمْ that steer the whole clause.",
   "Prevents “I’ve never seen this word” paralysis by using patterns (like مُفْعِل / فَعِيل / تَفَعَّلَ) to guess meaning-family and role from a root.",
   "Prevents misreading who did what to whom by recognizing whether you are in a verbal sentence (action first) or a nominal sentence (topic/comment)."
  ],
  "pattern": {
   "caption": "The 80/20 reading pipeline (do this in order)",
   "columns": [
    "Carrier",
    "What you look for in the mushaf",
    "What it gives you"
   ],
   "rows": [
    [
     "300 common roots",
     "The 3–4 core letters inside many words",
     "The meaning-family (belief, mercy, punishment, etc.)"
    ],
    [
     "40 core particles",
     "Short function-words (إِنَّ، لَا، وَ، مِنْ، لِـ)",
     "Clause type, negation, emphasis, links"
    ],
    [
     "Verb forms + noun patterns",
     "Extra letters around a root (يستـ، تـ، مُـ، ـون)",
     "Who/what the root is doing (doer, done-to, intensity)"
    ],
    [
     "Two sentence types",
     "Does it start with a verb or a noun/particle?",
     "Where to expect the subject, object, and description"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلَّذِينَ",
    "blocks": [
     {
      "text": "ٱل",
      "role": "particle",
      "gloss": "the (definite)"
     },
     {
      "text": "ذِين",
      "role": "root",
      "gloss": "those who"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "plural ending"
     }
    ],
    "note": "Split to notice the definite marker ٱلـ and the remaining stem; the tiny ending is not “vocabulary,” it is grammar/shape."
   },
   {
    "word": "لَهُمْ",
    "blocks": [
     {
      "text": "لِ",
      "role": "preposition",
      "gloss": "for/to"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "them"
     }
    ],
    "note": "A preposition plus an attached pronoun is a whole mini-phrase; don’t hunt for a separate “هو/هم” word."
   },
   {
    "word": "يَسْتَجِيبُ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he/it (imperfect)"
     },
     {
      "text": "سْتَجِيب",
      "role": "root",
      "gloss": "respond/answer"
     },
     {
      "text": "ُ",
      "role": "verbSuffix",
      "gloss": "present vowel"
     }
    ],
    "note": "The prefix tells you tense/person; the core letters carry meaning; the final vowel is part of the verb’s grammatical shape."
   },
   {
    "word": "بِذُنُوبِهِمْ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "by/for"
     },
     {
      "text": "ذُنُوب",
      "role": "root",
      "gloss": "sins"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "of/with-case"
     },
     {
      "text": "هِمْ",
      "role": "attachedPronoun",
      "gloss": "their"
     }
    ],
    "note": "Here the preposition controls the case-ending; the attached pronoun seals “their sins” as one unit in reading."
   }
  ],
  "examples": [
   {
    "arabic": "إِنَّ ٱللَّهَ قَوِىٌّۭ",
    "ref": "8:52",
    "surah": "Sūrat Al-Anfaal",
    "segments": [
     {
      "text": "إِنَّ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّه",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "قَوِىّ",
      "role": "root"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding"
     }
    ],
    "literal": "Indeed / Allah-(object of إِنَّ) / strong-(predicate).",
    "smooth": "Indeed, Allah is strong.",
    "whatChanged": "This shows a core particle (إِنَّ) steering the whole clause: it makes you expect a statement with emphasis and reshapes the noun’s ending."
   },
   {
    "arabic": "لَا يُؤْمِنُونَ بِـَٔايَٰتِ ٱللَّهِ",
    "ref": "16:104",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يُ",
      "role": "verbPrefix"
     },
     {
      "text": "ؤْمِن",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "ـَٔايَٰت",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّه",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     }
    ],
    "literal": "not / they-believe / in-signs / of-Allah.",
    "smooth": "They do not believe in the signs of Allah.",
    "whatChanged": "This adds the “flow unlock” of particles and prefixes: لَا (negation) plus يـ…ونَ (imperfect plural) lets you read the action even if you only half-know the root."
   },
   {
    "arabic": "وَلَهُمْ عَذَابٌ أَلِيمٌ",
    "ref": "16:104",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لِ",
      "role": "preposition"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَذَاب",
      "role": "root"
     },
     {
      "text": "ٌ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَلِيم",
      "role": "root"
     },
     {
      "text": "ٌ",
      "role": "nounEnding"
     }
    ],
    "literal": "and / for-them / punishment / painful.",
    "smooth": "And for them is a painful punishment.",
    "whatChanged": "This highlights a nominal-style statement (starting with a prepositional phrase) where the grammar is carried by particles and endings more than by a verb."
   },
   {
    "arabic": "وَيَسْتَجِيبُ ٱلَّذِينَ ءَامَنُوا۟",
    "ref": "42:26",
    "surah": "Sūrat Ash-Shura",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "سْتَجِيب",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "ذِينَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ء",
      "role": "plain"
     },
     {
      "text": "امَن",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     }
    ],
    "literal": "and / he-responds / the-those-who / believed-(they).",
    "smooth": "And He responds to those who believed.",
    "whatChanged": "This shows how patterns carry meaning: the verb has extra letters around the root (يَـ…ُ), and ٱلَّذِينَ flags a whole group as a single unit (‘those who…’)."
   },
   {
    "arabic": "فَأَخَذَهُمُ ٱللَّهُ",
    "ref": "8:52",
    "surah": "Sūrat Al-Anfaal",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "أَخَذ",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "verbSuffix"
     },
     {
      "text": "هُمُ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّه",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     }
    ],
    "literal": "so / took / them / Allah-(subject).",
    "smooth": "So Allah seized them.",
    "whatChanged": "This makes verbal sentence-reading concrete: a quick particle (فَ) links cause/effect, the attached pronoun marks the object, and the ending on ٱللَّهُ signals the doer."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse particles with “extra letters” inside a word.",
    "example": "وَلَهُمْ",
    "note": "وَ is a separate connector particle; لِ is a preposition; هُمْ is an attached pronoun. Treating all of it as one unanalyzable word hides the sentence flow."
   },
   {
    "claim": "Don’t mistake the definite article ٱلـ for part of the root.",
    "example": "ٱلَّذِينَ",
    "note": "The ٱلـ segment is a high-frequency signal (definiteness). If you fold it into the root, you miss families of words that share the same stem without ٱلـ."
   },
   {
    "claim": "Don’t read a suffix pronoun as a separate word you should look up.",
    "example": "فَأَخَذَهُمُ",
    "note": "هُمُ is ‘them’ attached to the verb. If you split it off mentally, the action becomes clearer: “took + them,” not an unknown longer verb."
   }
  ],
  "checklist": [
   "Circle particles first: إِنَّ، لَا، وَ، فَ, and any preposition like بِـ / لِـ / مِنْ.",
   "On each long word, peel off the easy edges: a verb prefix (يـ) or an attached pronoun (ـهُمْ).",
   "Look for the root letters in the middle; accept that you may only recognize the family, not the exact dictionary gloss yet.",
   "Notice patterns: extra letters (like سْتـ in يَسْتَجِيبُ) often signal a known verb form; مُـ / ـون often signal “type of word.”",
   "Decide sentence type quickly: verb-led (action first) or noun/phrase-led (topic first).",
   "Only after that, use endings as signals (who is doing/receiving; description), not as “new vocabulary to memorize.”"
  ],
  "summary": [
   "The rule: focus on roots, then particles, then patterns, then sentence type—this is the highest-return path to Qur’an comprehension.",
   "What it looks like: tiny words and tiny endings do big jobs (إِنَّ, لَا, وَ, بِـ, لِـ, ـهُمْ, ـونَ) while roots carry the meaning-family.",
   "What you can now do: scan a verse and extract the main meaning skeleton even when several full word-forms are unfamiliar."
  ],
  "quizBridge": "The quiz will ask you to identify roots vs particles vs attached pronouns in short snippets and to choose whether the snippet reads like a verbal or nominal statement."
 },
 {
  "id": "why-roots",
  "n": 5,
  "title": "What knowing a root actually buys you",
  "stage": "The roots",
  "level": "A0",
  "structure": "A root is not a word — it is a meaning shared by a family of words. Learn ك ت ب and you have not learned one word, you have a claim on كِتَاب، كَاتِب، مَكْتُوب، كُتُب، يَكْتُبُونَ، كُتِبَ. The payoff is not memorising 300 things; it is that each of the 300 unlocks five to ten more, and that a word you have never seen still gives up its area of meaning.",
  "whyItMatters": "Root knowledge alone is not comprehension — that is the next unit's job. But it is the ground everything else stands on, and without it patterns have nothing to apply to.",
  "canDo": "After this lesson you can look at an unfamiliar Qur’anic word and, by spotting its root letters, predict its “area of meaning” and connect it to other words you already know.",
  "rule": "A root is not a word; it is a shared meaning carried by a family of related word-forms. When you learn a root like ك ت ب you have not memorised one item—you have gained access to many: “book, write, written, prescribed, record…”. Root knowledge gives you a semantic map, not a finished translation: the exact meaning in a verse still depends on the word-form and context (next unit).",
  "why": [
   "Prevents the “I don’t know this word, so I know nothing” failure: the root lets you infer a reasonable meaning-range even on first sight.",
   "Prevents treating every form as unrelated: كِتَاب, كَتَبْنَا, فَٱكْتُبْنَا are not separate vocabulary islands if you can see ك ت ب inside them.",
   "Prevents wrong confidence from one gloss: knowing “kitāb = book” does not mean every ك ت ب form means “book”; the shared meaning is broader (“writing/recording/prescribing”).",
   "Prevents missing thematic links across verses: repeated roots signal repeated topics (revelation as “book/record”, divine “writing/prescribing”)."
  ],
  "pattern": {
   "caption": "One root, many word-families: the root gives the meaning-field; the word-form tells the role (noun/verb, doer/done-to, command/past, etc.).",
   "columns": [
    "Root (meaning-field)",
    "Common Qur’anic word-forms (from our verses)",
    "Likely meaning range you can expect"
   ],
   "rows": [
    [
     "ك ت ب",
     "ٱلْكِتَٰبِ / ٱلْكِتَٰبَ",
     "the Book; scripture; written record"
    ],
    [
     "ك ت ب",
     "كِتَٰبُنَا",
     "our record/document; that which is written"
    ],
    [
     "ك ت ب",
     "فَٱكْتُبْنَا",
     "so write/record us; enroll/inscribe (as a request)"
    ],
    [
     "ك ت ب",
     "كَتَبْنَا",
     "We wrote/recorded; We prescribed/ordained"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلْكِتَٰبِ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "particle",
      "gloss": "the (al-)"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "writing/record"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "genitive (-i)"
     }
    ],
    "note": "Split the definite article ٱلْ from the meaning-carrying stem; the final kasrah is a grammar ending, not part of the root."
   },
   {
    "word": "ٱلْكِتَٰبَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "particle",
      "gloss": "the (al-)"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "writing/record"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "accusative (-a)"
     }
    ],
    "note": "Same stem, different case ending; roots stay stable while endings change with grammar."
   },
   {
    "word": "فَٱكْتُبْنَا",
    "blocks": [
     {
      "text": "فَ",
      "role": "particle",
      "gloss": "so/then"
     },
     {
      "text": "ٱكْتُب",
      "role": "root",
      "gloss": "write/record"
     },
     {
      "text": "نَا",
      "role": "attachedPronoun",
      "gloss": "us/for us"
     }
    ],
    "note": "The core meaning sits in ك ت ب inside ٱكْتُب; the attached pronoun tells you who is being included."
   },
   {
    "word": "كَتَبْنَا",
    "blocks": [
     {
      "text": "كَتَب",
      "role": "root",
      "gloss": "wrote/prescribed"
     },
     {
      "text": "نَا",
      "role": "verbSuffix",
      "gloss": "We (did)"
     }
    ],
    "note": "Verb suffixes can carry the subject; the root letters remain the semantic anchor."
   }
  ],
  "examples": [
   {
    "arabic": "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ",
    "ref": "2:2",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "ذَٰلِكَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَيْبَ",
      "role": "plain"
     }
    ],
    "literal": "That — the Book — no doubt",
    "smooth": "That is the Book: there is no doubt in it.",
    "whatChanged": "You see the root ك ت ب as “writing/record,” not just a memorised word, while the noun ending (ُ) can change without changing the core meaning-field."
   },
   {
    "arabic": "أَهْلِ ٱلْكِتَٰبِ لَوْ",
    "ref": "3:69",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "أَهْلِ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَوْ",
      "role": "particle"
     }
    ],
    "literal": "people(of) the Book — if",
    "smooth": "A group from the People of the Book wished…",
    "whatChanged": "Same root/stem, but now the ending is (ِ) and it sits in a common phrase; root-recognition helps you spot repeated Qur’anic collocations quickly."
   },
   {
    "arabic": "أَنزَلْنَآ إِلَيْكَ ٱلْكِتَٰبَ",
    "ref": "4:105",
    "surah": "Sūrat An-Nisaa",
    "segments": [
     {
      "text": "أَنزَلْنَآ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَيْكَ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "We sent down — to you — the Book",
    "smooth": "We sent down to you the Book in truth…",
    "whatChanged": "You can keep the meaning-field constant (“written revelation/record”) even as grammar changes the ending (َ) and the word is governed by surrounding structure."
   },
   {
    "arabic": "هَٰذَا كِتَٰبُنَا يَنطِقُ",
    "ref": "45:29",
    "surah": "Sūrat Al-Jaathiya",
    "segments": [
     {
      "text": "هَٰذَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "نَا",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "نطِقُ",
      "role": "plain"
     }
    ],
    "literal": "This — our book/record — speaks",
    "smooth": "This is Our record; it speaks against you in truth.",
    "whatChanged": "The same root shifts from ‘the Book’ to ‘our record’ by adding an attached pronoun; the root tells you the domain (written record), while the add-on tells you whose."
   },
   {
    "arabic": "فَٱكْتُبْنَا مَعَ ٱلشَّٰهِدِينَ",
    "ref": "3:53",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "ٱكْتُب",
      "role": "root"
     },
     {
      "text": "نَا",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مَعَ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "شَّٰهِدِينَ",
      "role": "plain"
     }
    ],
    "literal": "so write/record us — with — the witnesses",
    "smooth": "So record us among the witnesses.",
    "whatChanged": "Now the root appears as an action (write/record), not a thing (book); recognising the root lets you keep the same meaning-family while the form changes function."
   },
   {
    "arabic": "وَلَقَدْ كَتَبْنَا فِى ٱلزَّبُورِ",
    "ref": "21:105",
    "surah": "Sūrat Al-Anbiyaa",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَقَدْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَتَب",
      "role": "root"
     },
     {
      "text": "نَا",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "زَّبُورِ",
      "role": "plain"
     }
    ],
    "literal": "and indeed — We wrote/prescribed — in — the Zabūr",
    "smooth": "We certainly wrote (decreed) in the Psalms…",
    "whatChanged": "You see ك ت ب used for divine ‘writing/prescribing’ in a past-tense form; the root keeps the theme while the verb form supplies time and subject."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse ‘root meaning’ with ‘one English word’.",
    "example": "ٱلْكِتَٰبِ / كَتَبْنَا",
    "note": "Both share ك ت ب, but one points to ‘the Book/record’ and the other to ‘We wrote/prescribed.’ The shared meaning is the writing/recording domain, not a single gloss like “book.”"
   },
   {
    "claim": "Don’t treat attached pieces as part of the root.",
    "example": "كِتَٰبُنَا",
    "note": "The نَا is ‘our’, not a fourth root letter. If you mistake add-ons for root letters, you will fail to recognise the family and miss easy connections."
   },
   {
    "claim": "Don’t assume the definite article is ‘part of the word you must memorise.’",
    "example": "ٱلْكِتَٰبِ",
    "note": "ٱلْ is a separate, frequent piece meaning ‘the’. Recognise it, then look for the stem/root that carries the meaning you want."
   }
  ],
  "checklist": [
   "When you meet a new word, first strip off obvious frequent pieces: ٱلْ (the), single-letter particles like وَ and فَ, and attached pronouns like نَا.",
   "Look at what remains and ask: which letters are the meaning-carriers (often three consonants)? For today, practice spotting ك ت ب inside different shapes.",
   "Expect the same root to show up in different word-types: noun (‘book/record’) and verb (‘wrote/prescribed’). Don’t force them into one English label.",
   "Notice endings (like ُ / ِ / َ) can change while the root stays the same; treat endings as grammar signals, not new vocabulary.",
   "As you read, circle repeated roots across verses; repeated roots often mark repeated themes even when the translation wording varies."
  ],
  "summary": [
   "Rule: a root is a shared meaning-field, not a single word.",
   "Look: strip add-ons (ٱلْ, particles, pronouns), then spot the root letters that remain (e.g., ك ت ب).",
   "Now you can: connect unfamiliar forms to a known family and predict the general meaning area before you consult word-form and context."
  ],
  "quizBridge": "The quiz will show you short Qur’anic snippets and ask you to identify the ك ت ب root-bearing part versus add-ons (ٱلْ, نَا, endings) and state the likely meaning-field."
 },
 {
  "id": "roots-in-chunks",
  "n": 6,
  "title": "How to actually get through 300 roots",
  "stage": "The roots",
  "level": "A0",
  "structure": "In sets, not in one heap. Sixty at a time, in frequency order, each root attached to two things: a small family of real words grown from it, and one āyah where you meet it. Do not learn a root as three bare letters and a gloss — learn it as ك ت ب → ٱلْكِتَٰب, and one verse that has it in.",
  "whyItMatters": "Sixty is a set you can finish, and finishing is the point. A list of 300 is something you abandon at 40; six sets of sixty is something you tick off.",
  "canDo": "After this lesson you can work through 300 Qur’anic roots without burnout by learning them in six finishable sets of sixty, each root tied to a small word-family and a real āyah where you meet it.",
  "rule": "Do not learn roots as three bare letters plus a gloss. Learn roots in sets (about 60 at a time) in frequency order, and attach each root to (1) two–five real Qur’anic word-forms from that root and (2) one āyah-snippet where you actually see it. Finishing a set is the point: completion beats an endless master list.",
  "why": [
   "Prevents the “I memorized 40 roots then stalled” failure: you always have a visible finish line (60).",
   "Prevents the “I know the gloss but never recognize it in the mushaf” failure: every root is anchored to an āyah you have already seen.",
   "Prevents the “every new form looks like a new word” failure: the mini word-family trains your eye to spot root-letters inside different shells.",
   "Prevents the “I’m studying but comprehension isn’t increasing” failure: you pick high-frequency roots first, so recognition rises quickly."
  ],
  "pattern": {
   "caption": "A root is learned as a small family + one āyah meeting: this is what one ‘root card’ should look like in your notes.",
   "columns": [
    "Root → core idea",
    "Small family (2–5 Qur’anic forms)",
    "One āyah you meet it in (snippet)"
   ],
   "rows": [
    [
     "ك ت ب → writing / book",
     "ٱلْكِتَٰب • تَنزِيل",
     "تَنزِيلُ ٱلْكِتَٰبِ (32:2)"
    ],
    [
     "ر ب ب → Lord / nurture",
     "رَبِّ • رَبُّكُمْ",
     "رَبِّ ٱلنَّاسِ (114:1)"
    ],
    [
     "ن ص ر → help / victory",
     "نَصْر • يَنصُرُ",
     "بِنَصْرِ ٱللَّهِ (30:5)"
    ],
    [
     "غ ف ر → forgive",
     "ٱسْتَغْفَرُوا۟ • ٱغْفِرْ",
     "ٱسْتَغْفَرُوا۟ ٱللَّهَ (4:64)"
    ],
    [
     "ف س د → فساد / corrupt",
     "تُفْسِدُوا۟ • مُصْلِحُونَ",
     "لَا تُفْسِدُوا۟ فِى (2:11)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "وَرَسُولِهِۦٓ",
    "blocks": [
     {
      "text": "وَ",
      "role": "particle",
      "gloss": "and"
     },
     {
      "text": "رَسُول",
      "role": "root",
      "gloss": "messenger"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "of/for (case)"
     },
     {
      "text": "هِۦ",
      "role": "attachedPronoun",
      "gloss": "his / of him"
     }
    ],
    "note": "The root-carrying noun is رَسُول, while the kasrah (ِ) is a grammar signal and هِۦ is a pronoun stuck on the end."
   },
   {
    "word": "بِنَصْرِ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "by/with"
     },
     {
      "text": "نَصْر",
      "role": "root",
      "gloss": "help/victory"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "of/for (case)"
     }
    ],
    "note": "Do not swallow the بِ into the root; the root is ن ص ر and the بِ is a separate meaning-bearing preposition."
   },
   {
    "word": "ٱلْمُفْلِحُونَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "مُفْلِح",
      "role": "root",
      "gloss": "successful"
     },
     {
      "text": "ونَ",
      "role": "nounEnding",
      "gloss": "plural (sound)"
     }
    ],
    "note": "The meaning sits in مُفْلِح, while ونَ is the visible plural ending; recognize the root inside a longer shape."
   },
   {
    "word": "ٱسْتَغْفَرُوا۟",
    "blocks": [
     {
      "text": "ٱسْتَ",
      "role": "plain",
      "gloss": "seek (pattern)"
     },
     {
      "text": "غْفَر",
      "role": "root",
      "gloss": "forgive"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they (plural)"
     }
    ],
    "note": "Treat the pattern (ٱسْتَ…) as a wrapper around the root; the root letters here are the heart you want to recognize."
   }
  ],
  "examples": [
   {
    "arabic": "تَنزِيلُ ٱلْكِتَٰبِ لَا رَيْبَ",
    "ref": "32:2",
    "surah": "Sūrat As-Sajda",
    "segments": [
     {
      "text": "تَنزِيلُ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْكِتَٰبِ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَيْبَ",
      "role": "root"
     }
    ],
    "literal": "Sending-down / the Book / no / doubt",
    "smooth": "The Book’s revelation—there is no doubt.",
    "whatChanged": "You see the ‘root card’ principle in action: two real word-forms plus a live āyah anchor, not a bare root list."
   },
   {
    "arabic": "بِنَصْرِ ٱللَّهِ ۚ يَنصُرُ",
    "ref": "30:5",
    "surah": "Sūrat Ar-Room",
    "segments": [
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "نَصْرِ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهِ",
      "role": "plain"
     },
     {
      "text": " ۚ ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "نصُرُ",
      "role": "root"
     }
    ],
    "literal": "By victory of Allah / He helps",
    "smooth": "By Allah’s help—He helps (whom He wills).",
    "whatChanged": "Now the same root appears as a noun (نَصْر) and a verb (يَنصُرُ): one root, multiple shapes—this is why you learn a family."
   },
   {
    "arabic": "رَبَّنَا ٱغْفِرْ لِى",
    "ref": "14:41",
    "surah": "Sūrat Ibrahim",
    "segments": [
     {
      "text": "رَبَّ",
      "role": "root"
     },
     {
      "text": "نَا",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱغْفِرْ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لِ",
      "role": "preposition"
     },
     {
      "text": "ى",
      "role": "attachedPronoun"
     }
    ],
    "literal": "Our Lord / forgive / for me",
    "smooth": "Our Lord, forgive me.",
    "whatChanged": "This shows the second anchor: attach a root to a memorable Qur’anic line so recognition becomes automatic in real reading."
   },
   {
    "arabic": "ٱسْتَغْفَرُوا۟ ٱللَّهَ وَٱسْتَغْفَرَ",
    "ref": "4:64",
    "surah": "Sūrat An-Nisaa",
    "segments": [
     {
      "text": "ٱسْتَ",
      "role": "plain"
     },
     {
      "text": "غْفَر",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱسْتَ",
      "role": "plain"
     },
     {
      "text": "غْفَر",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "verbSuffix"
     }
    ],
    "literal": "They sought-forgiveness / Allah / and he sought-forgiveness",
    "smooth": "They asked Allah’s forgiveness, and the Messenger asked forgiveness (for them).",
    "whatChanged": "You meet one root twice with different endings: you are training ‘spot the root’ while letting endings be just grammar signals."
   },
   {
    "arabic": "لَا تُفْسِدُوا۟ فِى ٱلْأَرْضِ",
    "ref": "2:11",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "تُ",
      "role": "verbPrefix"
     },
     {
      "text": "فْسِد",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْأَرْضِ",
      "role": "root"
     }
    ],
    "literal": "Do-not / you-corrupt / in / the earth",
    "smooth": "Do not cause corruption on the earth.",
    "whatChanged": "This shows how a high-frequency root pays off immediately in reading: one command form can unlock many related forms later."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the wrapper (preposition/particle) with the root.",
    "example": "بِنَصْرِ",
    "note": "The بِ is a separate word-piece meaning ‘by/with’. The root is ن ص ر inside نَصْر; if you memorize ‘بِنصر’ as one lump, you will miss نصر when it appears without بِ."
   },
   {
    "claim": "Don’t confuse endings with new vocabulary.",
    "example": "يَنصُرُ",
    "note": "The يَ is a verb prefix and the final vowel is grammar/tense information. The core recognition win is the root letters; treat the rest as a frame you’ll see again and again."
   },
   {
    "claim": "Don’t learn a root as a single English gloss that is too narrow.",
    "example": "ٱلْكِتَٰبِ",
    "note": "ك ت ب can show up as ‘book’, ‘write’, ‘decree/record’ depending on form and context. Your ‘root card’ should hold a core idea plus examples, not one rigid translation."
   }
  ],
  "checklist": [
   "Break your 300-root target into 6 sets of 60, and label them Set 1–Set 6 (finishable units).",
   "Within a set, go in frequency order (high-frequency roots first); do not jump around chasing curiosity.",
   "For each root, collect 2–5 real Qur’anic forms you have seen (noun + verb if possible).",
   "Attach one āyah-snippet you can point to (2–7 words) where the root appears clearly.",
   "When reading, first strip wrappers: particles/prepositions (لَا، وَ، بِ، فِى) and attached pronouns (…نَا، …هِ).",
   "Then circle the root-carrying chunk; let endings (plural/verb suffixes/case vowels) be ‘grammar signals’, not ‘new words’."
  ],
  "summary": [
   "Rule: Learn roots in sets of sixty, each tied to a small word-family and one āyah where you meet it.",
   "What it looks like: ك ت ب is learned as forms like ٱلْكِتَٰب and a real line like تَنزِيلُ ٱلْكِتَٰبِ, not as ‘ك-ت-ب = write’.",
   "What you can now do: Build a realistic, finishable plan that increases recognition in the mushaf week by week instead of collapsing under a 300-item heap."
  ],
  "quizBridge": "The quiz will show new snippets and ask you to identify the root-carrying chunk versus wrappers/endings, and to match a root to its mini word-family and āyah anchor."
 },
 {
  "id": "bare-roots",
  "n": 7,
  "title": "Why roots are written without vowel marks",
  "stage": "The roots",
  "level": "A0",
  "structure": "A root list writes كتب, not كَتَبَ. That is deliberate. The ḥarakāt — the fatḥah, kasrah and ḍammah — do not belong to the root; they belong to the PATTERN that gets applied to it. كَتَبَ he wrote، كُتِبَ it was written، كِتَاب a book all share ك ت ب and differ only in what was poured into it. Writing the root bare shows the part that stays.",
  "whyItMatters": "It is the bridge to the next unit. Once you see that the vowels are the pattern and the consonants are the root, the ten forms stop being arbitrary shapes and start being a system.",
  "canDo": "After this lesson you can look at a Qur’anic word, strip away its short vowels in your mind, and recognise the shared consonant root that stays constant across different meanings and grammars.",
  "rule": "Roots are written without ḥarakāt because the short vowels (fatḥah/kasrah/ḍammah) do not belong to the root; they belong to the pattern applied to it. The root is the stable consonant skeleton (like ك ت ب), while patterns and endings supply tense, voice, noun-type, and grammar. So a root list writes كتب (bare) on purpose: it is showing what stays when everything else changes.",
  "why": [
   "It prevents the failure of thinking كِتَٰب, ٱلْكِتَٰب, كِتَٰبَهُۥ are “different words” unrelated in meaning—so you miss repeated themes.",
   "It prevents the failure of searching for the wrong dictionary entry: you stop looking up a fully-vowelled form and start locating the root letters that carry the core meaning.",
   "It prevents the failure of treating vowel changes as random: you begin to expect systematic meaning shifts when the consonants stay but the vowels/pattern change.",
   "It prevents the failure of overlooking grammar signals (like ٱلْ or attached pronouns) because you learn to separate the root from what was added to it."
  ],
  "pattern": {
   "caption": "Same root (ك ت ب), different patterns: the vowels/shape change, the root letters stay.",
   "columns": [
    "Bare root (stable)",
    "Patterned word (Qur’an form)",
    "What the pattern contributes"
   ],
   "rows": [
    [
     "كتب",
     "كِتَٰب",
     "noun on a pattern: “book”"
    ],
    [
     "كتب",
     "ٱلْكِتَٰب",
     "definiteness (ٱلْ): “the Book”"
    ],
    [
     "كتب",
     "كِتَٰبَهُۥ",
     "ownership (ـهُۥ): “his book”"
    ],
    [
     "كتب",
     "كِتَٰبٍۢ",
     "case ending (ٍ): grammar role in the sentence"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلْكِتَٰبَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the (def.)"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "k-t-b idea"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "accusative"
     }
    ],
    "note": "The root-carrying block is the consonant skeleton inside the word; the final vowel mark is a separate grammar ending."
   },
   {
    "word": "كِتَٰبٍۢ",
    "blocks": [
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "k-t-b idea"
     },
     {
      "text": "ٍۢ",
      "role": "nounEnding",
      "gloss": "genitive (in)"
     }
    ],
    "note": "A root list would still file this under كتب; the tanwīn kasrah is not part of the root."
   },
   {
    "word": "كِتَٰبَهُۥ",
    "blocks": [
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "k-t-b idea"
     },
     {
      "text": "هُۥ",
      "role": "attachedPronoun",
      "gloss": "his (it)"
     }
    ],
    "note": "The pronoun attaches after the root+pattern word; the root letters still remain the anchor for meaning."
   },
   {
    "word": "ٱلْكِتَٰبِ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the (def.)"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "k-t-b idea"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "genitive"
     }
    ],
    "note": "Same root block as ٱلْكِتَٰبَ; only the final vowel mark changes with grammar."
   }
  ],
  "examples": [
   {
    "arabic": "إِلَّا فِى كِتَٰبٍۢ مُّبِينٍۢ",
    "ref": "6:59",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "إِلَّا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ٍۢ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُّبِينٍۢ",
      "role": "plain"
     }
    ],
    "literal": "except in book-(gen.) clear-(gen.)",
    "smooth": "…except in a clear Record/Book.",
    "whatChanged": "You can now ignore the final ٍۢ as “grammar only” and still spot the stable root block كِتَٰب (from كتب)."
   },
   {
    "arabic": "وَنَزَّلْنَا عَلَيْكَ ٱلْكِتَٰبَ",
    "ref": "16:89",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "نَزَّلْنَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَلَيْ",
      "role": "plain"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "plain"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "and-We sent down upon-you the-book-(acc.)",
    "smooth": "We sent down to you the Book.",
    "whatChanged": "This adds the idea that the same root block كِتَٰب stays even when definiteness (ٱلْ) and case (َ) wrap around it."
   },
   {
    "arabic": "أُوتِىَ كِتَٰبَهُۥ وَرَآءَ",
    "ref": "84:10",
    "surah": "Sūrat Al-Inshiqaaq",
    "segments": [
     {
      "text": "أُوتِىَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "هُۥ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "وَرَآءَ",
      "role": "plain"
     }
    ],
    "literal": "he-was-given book-his behind",
    "smooth": "…is given his record behind (his back)…",
    "whatChanged": "This shows a major meaning add-on (ownership) comes from an attached pronoun, not from changing the root."
   },
   {
    "arabic": "وَٱذْكُرْ فِى ٱلْكِتَٰبِ",
    "ref": "19:41",
    "surah": "Sūrat Maryam",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱذْكُرْ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "plain"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     }
    ],
    "literal": "and-mention in the-book-(gen.)",
    "smooth": "And mention in the Book…",
    "whatChanged": "Now the noun ending is ِ (because of فِى), proving that endings change with grammar while the root block remains."
   },
   {
    "arabic": "تَفْصِيلَ ٱلْكِتَٰبِ لَا رَيْبَ",
    "ref": "10:37",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "تَفْصِيلَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "plain"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَيْبَ",
      "role": "plain"
     }
    ],
    "literal": "detail-(acc.) the-book-(gen.) no doubt",
    "smooth": "…a detailed explanation of the Book—no doubt…",
    "whatChanged": "This reinforces that even when the word is embedded inside another construction, you can still “see through” to the root block كِتَٰب."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the root with the fully-vowelled word you happen to see.",
    "example": "كِتَٰب",
    "note": "كِتَٰب is not “the root.” It is a root (كتب) plus a noun-pattern and vowels. Root lists drop the vowels to keep only what stays."
   },
   {
    "claim": "Don’t treat case endings as part of the meaning-carrying root.",
    "example": "كِتَٰبَ / كِتَٰبِ",
    "note": "The final َ vs ِ mainly signals grammar (how the word fits in the sentence). If you glue those vowels to the root in your mind, you’ll miss that it’s the same word-family."
   },
   {
    "claim": "Don’t assume ٱلْ (the definite article) is part of the root.",
    "example": "ٱلْكِتَٰب",
    "note": "ٱلْ is a wrapper meaning “the.” The core meaning signal is still the ك-ت-ب block. This matters because Qur’anic words often appear both with and without ٱلْ."
   }
  ],
  "checklist": [
   "When you meet a new word, look for the “heavy letters” (mostly consonants) and mentally ignore short vowels first.",
   "Peel off obvious wrappers: ٱلْ at the front, and attached pronouns like ـهُۥ at the end.",
   "Notice the final vowel mark (َ / ِ / ُ or tanwīn like ٍۢ): label it as a grammar ending, not the root.",
   "Ask: what consonant skeleton remains? That stable block is what a root list writes.",
   "Collect repeats: if different words share the same skeleton (like ك ت ب), treat them as one meaning-family while allowing the pattern to refine the meaning."
  ],
  "summary": [
   "The rule: roots are written without vowel marks because vowels belong to patterns, not to the root.",
   "What it looks like: the same consonant block (e.g., كِتَٰب from كتب) survives while definiteness (ٱلْ), endings (َ/ِ/ٍۢ), and pronouns (ـهُۥ) change around it.",
   "What you can now do: recognise a shared root-family across different Qur’anic word-forms and avoid misreading vowel/ending changes as “different unrelated words.”"
  ],
  "quizBridge": "The quiz will show you Qur’anic snippets and ask you to identify the root-carrying block versus the vowel/ending or attached pieces that come from the pattern and grammar."
 },
 {
  "id": "what-is-a-pattern",
  "n": 8,
  "title": "Root + template = meaning",
  "stage": "The patterns",
  "level": "A1",
  "structure": "Arabic builds words by pouring a root into a template (وَزْن, plural أَوْزَان). The root gives the area of meaning; the template says what is being done with it — doing it, causing it, doing it to each other, seeking it, having it done to you. فَعَلَ is the template every grammar book uses to describe the others: ف is the first root letter, ع the second, ل the third. So فَعَّلَ means \"double the middle letter\", whatever the root is.",
  "whyItMatters": "This is the engine. Ten templates times 300 roots is three thousand words you can decode without ever having met them, and that is the difference between reading with a dictionary and reading.",
  "canDo": "After this lesson you can look at an unfamiliar Qur’anic word, identify its root letters and its template (wazn), and make a reliable first-pass guess at its meaning direction (doing, causing, being done, seeking, etc.).",
  "rule": "Most Arabic words are built by pouring a root (usually three consonants) into a template (وَزْن / أَوْزَان). The root gives the core meaning area; the template tells what is happening to that meaning: basic action, causative, reciprocal, passive, etc. Grammar books describe templates with فَعَلَ: ف = 1st root letter, ع = 2nd, ل = 3rd.",
  "why": [
   "Prevents the “I know the root but I still don’t know the word” problem by showing how the template changes the meaning direction.",
   "Stops you treating related words as unrelated (e.g., thinking يُؤْمِنُونَ and ءَامَنُوا۟ are separate vocabulary items).",
   "Helps you avoid false guesses where a familiar root is present but the pattern makes it passive/causative, changing the sense.",
   "Reduces dictionary dependence: you can often decode the *type* of meaning even if you cannot yet name the exact translation."
  ],
  "pattern": {
   "caption": "Common Qur’anic verb templates (very high-yield): same root, different template, different meaning direction",
   "columns": [
    "Template (wazn)",
    "What it signals",
    "Example idea (English)"
   ],
   "rows": [
    [
     "فَعَلَ",
     "basic action (simple verb)",
     "he did"
    ],
    [
     "فَعَّلَ",
     "intensifying / causing (middle letter doubled)",
     "he made (someone) do"
    ],
    [
     "أَفْعَلَ",
     "causative / bringing about (often with أَ at start)",
     "he caused / he made happen"
    ],
    [
     "فُعِلَ / يُفْعَلُ",
     "passive (done to the subject)",
     "it was done / it is done"
    ],
    [
     "اِسْتَفْعَلَ",
     "seeking / asking for / considering (often with اِسْتَـ)",
     "he sought / asked for"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "أَنزَلْنَآ",
    "blocks": [
     {
      "text": "أَن",
      "role": "plain",
      "gloss": "form marker"
     },
     {
      "text": "زَل",
      "role": "root",
      "gloss": "descend root"
     },
     {
      "text": "نَآ",
      "role": "verbSuffix",
      "gloss": "we (did)"
     }
    ],
    "note": "The root is ز-ل (from نزل), while أَ…َ is the template signal; نَا is the attached subject ending."
   },
   {
    "word": "أُنزِلَ",
    "blocks": [
     {
      "text": "أُ",
      "role": "plain",
      "gloss": "passive marker"
     },
     {
      "text": "نز",
      "role": "root",
      "gloss": "descend root"
     },
     {
      "text": "لَ",
      "role": "verbSuffix",
      "gloss": "was (done)"
     }
    ],
    "note": "Same root (ن-ز-ل), but the vowel/template pattern marks it as passive: ‘was sent down’ rather than ‘sent down’."
   },
   {
    "word": "يُؤْمِنُونَ",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "they (do)"
     },
     {
      "text": "ؤْمِن",
      "role": "root",
      "gloss": "faith root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "plural ending"
     }
    ],
    "note": "The meaningful core is ء-م-ن; the prefix/suffix show person/number, while the internal shape points to a specific template family."
   },
   {
    "word": "يُوقِنُونَ",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "they (do)"
     },
     {
      "text": "وقِن",
      "role": "root",
      "gloss": "certainty root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "plural ending"
     }
    ],
    "note": "The root is ي-ق-ن; the template pushes the meaning toward ‘being certain/holding certainty’, not just the abstract idea."
   }
  ],
  "examples": [
   {
    "arabic": "وَمَآ أُنزِلَ مِن قَبْلِكَ",
    "ref": "2:4",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "مَآ ",
      "role": "plain"
     },
     {
      "text": "أُنزِلَ",
      "role": "root"
     },
     {
      "text": " مِن ",
      "role": "preposition"
     },
     {
      "text": "قَبْلِ",
      "role": "plain"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and what was-sent-down from before-you",
    "smooth": "and what was sent down before you",
    "whatChanged": "This shows the same root ن-ز-ل in a *passive* template: focus is on revelation received (done to it), not on who sent it."
   },
   {
    "arabic": "وَأَنزَلْنَآ إِلَيْكُمْ",
    "ref": "4:174",
    "surah": "Sūrat An-Nisaa",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "أَنزَلْ",
      "role": "root"
     },
     {
      "text": "نَآ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَىٰ",
      "role": "preposition"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and we-sent-down to-you(pl.)",
    "smooth": "and We sent down to you",
    "whatChanged": "Now the same root appears in an *active, causative-style* template (أَفْعَلَ family): the doer is explicit (We), not hidden as in the passive."
   },
   {
    "arabic": "لَّقَدْ أَنزَلْنَآ ءَايَٰتٍۢ",
    "ref": "24:46",
    "surah": "Sūrat An-Noor",
    "segments": [
     {
      "text": "لَّ",
      "role": "particle"
     },
     {
      "text": "قَدْ ",
      "role": "particle"
     },
     {
      "text": "أَنزَلْ",
      "role": "root"
     },
     {
      "text": "نَآ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ءَايَٰتٍۢ",
      "role": "plain"
     }
    ],
    "literal": "surely indeed we-sent-down signs",
    "smooth": "We have certainly sent down clear signs",
    "whatChanged": "This reinforces that the template signal (أَنزَلْـ) stays stable across contexts; once you spot it, you can decode many ‘send down’ occurrences quickly."
   },
   {
    "arabic": "وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ",
    "ref": "2:4",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱلَّذِينَ ",
      "role": "plain"
     },
     {
      "text": "يُ",
      "role": "verbPrefix"
     },
     {
      "text": "ؤْمِن",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "مَآ",
      "role": "plain"
     }
    ],
    "literal": "and those who they-believe in what",
    "smooth": "and those who believe in what…",
    "whatChanged": "This switches from the ن-ز-ل set to ء-م-ن: you see how person/number sit outside the core, while the template+root carries the meaning."
   },
   {
    "arabic": "وَبِٱلْءَاخِرَةِ هُمْ يُوقِنُونَ",
    "ref": "2:4",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "ٱلْءَاخِرَةِ ",
      "role": "plain"
     },
     {
      "text": "هُمْ ",
      "role": "plain"
     },
     {
      "text": "يُ",
      "role": "verbPrefix"
     },
     {
      "text": "وقِن",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "and in the Hereafter they are-certain",
    "smooth": "and of the Hereafter they are certain",
    "whatChanged": "You now compare two different roots (ء-م-ن vs ي-ق-ن) under a similar outer frame (يُ…ونَ), training your eye to separate root from template markers."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the root with the person/number endings",
    "example": "أَنزَلْنَآ",
    "note": "The meaning-carrying root is in the middle; نَآ is not part of the root—it is ‘we’. If you treat endings as root letters, you will misfile vocabulary and miss patterns."
   },
   {
    "claim": "Don’t confuse passive ‘was sent down’ with active ‘sent down’ just because the same root appears",
    "example": "أُنزِلَ / أَنزَلْنَآ",
    "note": "Both come from ن-ز-ل, but the template flips who is in focus. Passive forms often hide the doer; active forms name it."
   },
   {
    "claim": "Don’t assume every extra letter is ‘random’—many are template signals",
    "example": "يُؤْمِنُونَ",
    "note": "The يـ and ـونَ are not decoration; they consistently signal ‘they…’. The internal shape points you to a template family; that is the whole point of أَوْزَان."
   }
  ],
  "checklist": [
   "Circle the 3 root letters you already know (ignore prefixes/suffixes for a moment).",
   "Look for template signals: doubling (شَدَّة), an initial أَ / يُـ, or a passive feel (often with أُ…ِ…َ).",
   "Separate person/number pieces (like يـ, نَا, ـونَ) from the core—these change grammar, not the root meaning area.",
   "Ask one question: is the word describing doing, causing, being done, or seeking? Let the template answer before you pick an English word.",
   "If two words share a root across verses, compare their templates before you decide they mean the same thing.",
   "Keep your guess broad (meaning-direction + root area) until later lessons tighten the exact translation."
  ],
  "summary": [
   "Arabic words are built from a root plus a template (wazn).",
   "It looks like stable root letters sitting inside predictable shapes (prefixes, doubled letters, vowel-pattern signals, and endings).",
   "You can now use root+template to make a controlled, repeatable meaning guess when you meet an unfamiliar Qur’anic word."
  ],
  "quizBridge": "The quiz will show Qur’anic word snippets and ask you to spot the root letters, identify template signals (active vs passive, person/number), and choose the best meaning-direction."
 },
 {
  "id": "forms-in-english",
  "n": 9,
  "title": "What the ten forms mean — in English, no Arabic yet",
  "stage": "The patterns",
  "level": "A1",
  "structure": "What each form DOES, before any Arabic shape. I — the plain action. II — makes it stronger, or makes someone else do it. III — aims it at someone. IV — causes it to happen. V — the doer does it to themselves. VI — two parties do it to each other. VII — it simply happens to the subject. VIII — the doer takes it up for themselves. IX — turning a colour or a state. X — seeking it, asking for it, or considering something to be it.",
  "whyItMatters": "You asked for exactly this — \"explain what each of the forms do in English, do it simply\" — and it is the right order. Meaning first, shapes second: a shape you cannot attach a meaning to is just a squiggle to memorise.",
  "canDo": "After this lesson you can look at a Qur’anic verb and predict—before translating—what kind of meaning it is likely to carry based on its form number (I–X).",
  "rule": "Arabic often builds whole families of meanings from one root by placing it into different “forms” (I–X). The form is not just spelling: it adds a predictable meaning layer such as causation, mutual action, seeking, or passivity. In this lesson you learn what each form DOES in English—so later, when you learn the Arabic shapes, you will attach meaning rather than memorize squiggles.",
  "why": [
   "Prevents the “same root = same meaning” mistake (e.g., thinking every ج-ه-د must mean exactly “struggle” in the same way).",
   "Prevents missing who is acting on whom (e.g., ‘they asked permission’ vs ‘you permitted them’).",
   "Prevents flattening a verse into vague English because you did not notice a form meaning like “seeking” or “mutual”.",
   "Prevents over-translating: once you see the form meaning, you can keep your translation simple and accurate."
  ],
  "pattern": {
   "caption": "What the ten forms *mean* (no Arabic shapes yet): one root, different meaning-layers",
   "columns": [
    "Form",
    "Core meaning layer (English)",
    "Qur’anic-like sense you should expect"
   ],
   "rows": [
    [
     "I",
     "Plain action/state",
     "He did / it happened / he knew"
    ],
    [
     "II / III / IV",
     "Makes stronger (II), aims at someone (III), causes (IV)",
     "Intensify / direct toward an object / make something happen"
    ],
    [
     "V / VI",
     "Reflexive (V) / mutual (VI)",
     "Do it to oneself / do it with each other"
    ],
    [
     "VII / VIII",
     "Passive-ish (VII) / takes it up for oneself (VIII)",
     "It gets done / he undertakes, adopts, acts for himself"
    ],
    [
     "IX / X",
     "Become a color/state (IX) / seek-ask-consider (X)",
     "Turn red/white… / ask for, seek, request, regard as"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "يَسْتَـْٔذِنُكَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he/it does"
     },
     {
      "text": "سْتَـْٔذِن",
      "role": "root",
      "gloss": "seek permission"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun",
      "gloss": "you (object)"
     }
    ],
    "note": "The root block here includes the Form X meaning-layer ‘seek/ask’; the attached pronoun tells you *from whom* permission is sought."
   },
   {
    "word": "ٱبْتَغُوا۟",
    "blocks": [
     {
      "text": "ٱبْتَ",
      "role": "verbPrefix",
      "gloss": "take up/seek"
     },
     {
      "text": "غُوا۟",
      "role": "verbSuffix",
      "gloss": "you all (do)"
     }
    ],
    "note": "This is a Form VIII-style meaning: taking something up / seeking for oneself. We mark the front as the ‘meaning-layer signal’ even before teaching the exact Arabic pattern."
   },
   {
    "word": "أُنزِلَتْ",
    "blocks": [
     {
      "text": "أُ",
      "role": "verbPrefix",
      "gloss": "was (made)"
     },
     {
      "text": "نزِل",
      "role": "root",
      "gloss": "sent down"
     },
     {
      "text": "تْ",
      "role": "verbSuffix",
      "gloss": "she/it"
     }
    ],
    "note": "This word reads naturally like ‘was sent down’: the form meaning is passive/result-focused (close to ‘it happened to it’)."
   },
   {
    "word": "فَقُطِعَ",
    "blocks": [
     {
      "text": "فَ",
      "role": "particle",
      "gloss": "so/then"
     },
     {
      "text": "قُطِعَ",
      "role": "root",
      "gloss": "was cut off"
     }
    ],
    "note": "The particle is not the form, but it signals the flow (‘so/then’). The verb itself is passive/result: focus on what happened, not who did it."
   }
  ],
  "examples": [
   {
    "arabic": "لَا يَسْتَـْٔذِنُكَ",
    "ref": "9:44",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "سْتَـْٔذِن",
      "role": "root"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "not / he-seeks-permission / you",
    "smooth": "They do not ask you for permission.",
    "whatChanged": "This shows Form X meaning (‘seek/ask’) plus an attached pronoun showing who the request is directed to."
   },
   {
    "arabic": "ٱسْتَـْٔذَنَكَ أُو۟لُوا۟",
    "ref": "9:86",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "ٱسْتَـْٔذَن",
      "role": "root"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أُو۟لُوا۟",
      "role": "plain"
     }
    ],
    "literal": "he-asked-permission / you / (the) possessors",
    "smooth": "Those with means asked you for permission.",
    "whatChanged": "Same Form X ‘ask permission’, but now you see it in a past-event framing—helpful for recognizing the meaning regardless of tense."
   },
   {
    "arabic": "ٱبْتَغُوٓا۟ إِلَيْهِ",
    "ref": "5:35",
    "surah": "Sūrat Al-Maaida",
    "segments": [
     {
      "text": "ٱبْتَ",
      "role": "verbPrefix"
     },
     {
      "text": "غُوٓا۟",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَى",
      "role": "preposition"
     },
     {
      "text": "هِ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "seek!/take-up! (you all) / to / Him",
    "smooth": "Seek a means to Him.",
    "whatChanged": "This introduces the ‘take it up for oneself / actively pursue’ feel (Form VIII-type) and shows how a preposition + attached pronoun completes the direction (‘to Him’)."
   },
   {
    "arabic": "وَإِذَا قِيلَ",
    "ref": "2:13",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "إِذَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "قِيلَ",
      "role": "root"
     }
    ],
    "literal": "and / when / it-was-said",
    "smooth": "And when it is said (to them)…",
    "whatChanged": "This gives you a result-focused/passive-style meaning: you’re not told who said it; you’re told that the saying happened."
   },
   {
    "arabic": "فَقُطِعَ دَابِرُ",
    "ref": "6:45",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "قُطِعَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "دَابِرُ",
      "role": "plain"
     }
    ],
    "literal": "so / was-cut-off / (the) end",
    "smooth": "So the last remnant was cut off.",
    "whatChanged": "A second clear passive/result example: you practice letting the form steer you to ‘was done’ rather than hunting for a hidden doer."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse Form X (‘seek/ask/consider’) with a plain Form I verb that just ‘does’.",
    "example": "يَسْتَـْٔذِنُكَ",
    "note": "Even before you learn the shapes, train yourself: some verb patterns *add* the idea of seeking/requesting. If you translate it as a plain ‘permits’ or ‘knows’, you invert the direction of meaning."
   },
   {
    "claim": "Don’t force every passive/result-looking verb to name an agent in English.",
    "example": "قِيلَ",
    "note": "In Qur’anic style, the point can be the event (‘it was said’) rather than who said it. Adding ‘they said’ may import an assumption the Arabic did not state."
   },
   {
    "claim": "Don’t ignore attached pronouns: they often carry the key ‘target’ of the verb.",
    "example": "ٱسْتَـْٔذَنَكَ",
    "note": "The كَ is not decoration; it tells you *you* are the one being asked. Missing it leads to vague translations like ‘they asked permission’ without ‘from whom’."
   }
  ],
  "checklist": [
   "When you meet a new verb, pause and ask: is this a plain action (Form I) or does it feel like a ‘modified’ meaning (cause/seek/mutual/passive)?",
   "Look for meaning signals at the beginning of the verb (extra letters often hint at a form meaning-layer). Don’t name the form yet—just notice ‘added meaning’.",
   "Check for attached pronouns at the end (كَ / هُ / هِ etc.) to identify who receives the action or who it is directed to.",
   "Notice whether the verse wording focuses on the doer or on the happening (passive/result style like قِيلَ, قُطِعَ). Let that guide your English.",
   "Use nearby particles (وَ, فَ, لَا, إِذَا) to keep the logic straight: negation, sequence, and time-setting can change the whole sense of a clause."
  ],
  "summary": [
   "The rule: the ten forms add predictable meaning-layers to a root; meaning first, shapes later.",
   "What it looks like: some verbs naturally read as ‘seek/ask’, some as ‘it was done/it happened’, and some stay plain—often signaled by extra letters and by attached pronouns.",
   "What you can now do: read a Qur’anic verb and anticipate whether it is plain, seeking, or passive/result-focused, making your first-pass comprehension faster and safer."
  ],
  "quizBridge": "The quiz will show short verb snippets and ask you to choose the correct meaning-layer (plain vs seeking vs passive/result), using particles and attached pronouns as clues."
 },
 {
  "id": "form-markers-english",
  "n": 10,
  "title": "How to spot each form — described in plain letters",
  "stage": "The patterns",
  "level": "A1",
  "structure": "The signal for each, still without Arabic script. I — nothing added, the three root letters alone. II — the middle consonant doubled. III — a long \"aa\" after the first consonant. IV — an \"a-\" on the front. V — \"ta-\" on the front plus the doubled middle. VI — \"ta-\" on the front plus the long \"aa\". VII — \"in-\" on the front. VIII — a \"t\" slipped in after the FIRST consonant. IX — the last consonant doubled. X — \"ista-\" on the front.",
  "whyItMatters": "Recognition is a visual skill and it can be learned in a script you already read. Doing this step in Roman letters means you arrive at the Arabic already knowing what you are looking for.",
  "canDo": "After this lesson you can spot which of the ten verb-forms you are looking at by its visible “signal” in Roman letters, before you even deal with Arabic script.",
  "rule": "Each derived verb-form has a signature change you can see: a prefix (a-, ta-, in-, ista-), a doubled consonant, a long “aa,” or a inserted “t.” Train your eye to look for the signal first, then connect it to the form number and the meaning-family you already learned. In three days, still remember: you are not “reading vowels,” you are spotting form-signals.",
  "why": [
   "Prevents the comprehension failure of mixing Form II (intensive/causative feel) with Form I just because the root is the same.",
   "Prevents missing Form VIII because the “extra t” is easy to overlook, especially when Arabic hides it inside the word.",
   "Prevents confusing Form IV and Form X (both have a front prefix) when scanning quickly.",
   "Prevents treating a long “aa” (Form III/VI) as “just pronunciation” instead of a meaning-carrying pattern."
  ],
  "pattern": {
   "caption": "The ten forms: spot the signal (Roman-letter description)",
   "columns": [
    "Form",
    "Signal you look for",
    "Template idea (Roman)"
   ],
   "rows": [
    [
     "I",
     "nothing added: just the three root letters",
     "C1aC2aC3 (varies)"
    ],
    [
     "II",
     "middle consonant doubled",
     "CaC2C2aC3"
    ],
    [
     "III",
     "long “aa” after first consonant",
     "CaaC2aC3"
    ],
    [
     "IV",
     "“a-” on the front",
     "aC1C2aC3"
    ],
    [
     "V / VI",
     "“ta-” on the front (+ II signal / + III signal)",
     "ta + (II) / ta + (III)"
    ],
    [
     "VII / VIII / IX / X",
     "in- / t after first consonant / last consonant doubled / ista-",
     "inC1... / C1t... / ...C3C3 / istaC1..."
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱقْتَرَبَتِ",
    "blocks": [
     {
      "text": "ٱقْتَرَبَ",
      "role": "root",
      "gloss": "came near"
     },
     {
      "text": "تِ",
      "role": "verbSuffix",
      "gloss": "she (f.)"
     }
    ],
    "note": "Split after the core verb to make the feminine marker visible; the form-signal here is the internal “t” after the first consonant (Form VIII)."
   },
   {
    "word": "ٱنشَقَّ",
    "blocks": [
     {
      "text": "ٱن",
      "role": "verbPrefix",
      "gloss": "in- (Form VII)"
     },
     {
      "text": "شَقّ",
      "role": "root",
      "gloss": "split"
     }
    ],
    "note": "Prefix boundary is the whole point: “in-” is a form-signal (VII), then the root carries the meaning."
   },
   {
    "word": "تَذَكَّرُونَ",
    "blocks": [
     {
      "text": "تَ",
      "role": "verbPrefix",
      "gloss": "you (pl.)"
     },
     {
      "text": "ذَكّ",
      "role": "root",
      "gloss": "remember (core)"
     },
     {
      "text": "رُونَ",
      "role": "verbSuffix",
      "gloss": "you all"
     }
    ],
    "note": "The doubled middle consonant (كّ) is the form-signal (II); don’t let the normal “you-” prefix distract you."
   },
   {
    "word": "يَعْلَمُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "they"
     },
     {
      "text": "عْلَم",
      "role": "root",
      "gloss": "know"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "they (pl.)"
     }
    ],
    "note": "Here there is no derived-form signal beyond the normal verb prefixes/suffixes; this is a clean Form I baseline for comparison."
   }
  ],
  "examples": [
   {
    "arabic": "ٱقْتَرَبَتِ ٱلسَّاعَةُ",
    "ref": "54:1",
    "surah": "Sūrat Al-Qamar",
    "segments": [
     {
      "text": "ٱقْتَرَبَ",
      "role": "root"
     },
     {
      "text": "تِ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "سَّاعَةُ",
      "role": "plain"
     }
    ],
    "literal": "came-near + she; the + Hour",
    "smooth": "The Hour has drawn near.",
    "whatChanged": "This shows the Form VIII signal (a “t” slipped in after the first consonant) inside a real Qur’anic verb."
   },
   {
    "arabic": "وَٱنشَقَّ ٱلْقَمَرُ",
    "ref": "54:1",
    "surah": "Sūrat Al-Qamar",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱن",
      "role": "verbPrefix"
     },
     {
      "text": "شَقّ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "قَمَرُ",
      "role": "plain"
     }
    ],
    "literal": "and; in- + split; the Moon",
    "smooth": "And the moon split.",
    "whatChanged": "This adds the Form VII signal: the clear in- prefix, which is easier to spot than the hidden Form VIII “t.”"
   },
   {
    "arabic": "لَّا يَعْلَمُونَ",
    "ref": "2:13",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "لَّا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "عْلَم",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "not; they + know + (pl.)",
    "smooth": "But they do not know.",
    "whatChanged": "This gives you a Form I baseline (no derived-form signal) so you can feel the contrast when a form adds a marker."
   },
   {
    "arabic": "تَعْلَمُونَ مَن",
    "ref": "11:39",
    "surah": "Sūrat Hud",
    "segments": [
     {
      "text": "تَ",
      "role": "verbPrefix"
     },
     {
      "text": "عْلَم",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مَن",
      "role": "plain"
     }
    ],
    "literal": "you (pl.) + know + (pl.); who",
    "smooth": "You will know who…",
    "whatChanged": "This reinforces that normal person/number prefixes (like تَ-) are not the same as the derived-form prefix ta- (Forms V/VI); context and the rest of the pattern decide."
   },
   {
    "arabic": "تَذَكَّرُونَ",
    "ref": "23:85",
    "surah": "Sūrat Al-Muminoon",
    "segments": [
     {
      "text": "تَ",
      "role": "verbPrefix"
     },
     {
      "text": "ذَكّ",
      "role": "root"
     },
     {
      "text": "رُونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "you (pl.) + remember (with doubling) + you (pl.)",
    "smooth": "Will you not take heed?",
    "whatChanged": "This spotlights the Form II signal: the doubled middle consonant—your quickest visual cue for Form II-family meaning."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the derived-form prefix ta- (Forms V/VI) with the normal present-tense prefix تَ- meaning “you.”",
    "example": "تَعْلَمُونَ",
    "note": "In many Qur’anic verbs, تَ- is just “you (pl.) do…”. A derived-form ta- is part of the template and will be paired with another signal: doubling (V) or long “aa” (VI)."
   },
   {
    "claim": "Don’t miss Form VIII by looking only for a front prefix.",
    "example": "ٱقْتَرَبَتِ",
    "note": "Form VIII often hides its signal inside the word: a “t” after the first consonant. If you only scan the beginning, you may mis-label it as Form I."
   },
   {
    "claim": "Don’t treat consonant doubling as “just pronunciation.”",
    "example": "تَذَكَّرُونَ",
    "note": "The shadda (doubling) is a meaning signal: it often marks Form II (and therefore may shift the verb into a different meaning-family). Train your eye to stop on the doubled letter."
   }
  ],
  "checklist": [
   "First, decide: is it a verb you are analyzing? (These ten forms are verb templates.)",
   "Ignore person/tense endings for a moment (like تَ-, يَ-, -ونَ, -تِ) and hunt for the derived-form signal.",
   "Scan the front: do you see in- (ٱن…)? do you see ista- (ٱست…)? do you see an extra a- (أَ…)?",
   "If no clear front signal, scan inside: is there a “t” right after the first root consonant (Form VIII pattern)?",
   "Check for doubling: doubled middle consonant (Form II/V) versus doubled last consonant (Form IX).",
   "Check for a long “aa” after the first consonant (Form III/VI). If you don’t see it, don’t assume it’s there."
  ],
  "summary": [
   "Rule: each form has a visible signal (prefix, doubling, long “aa,” or an inserted “t”).",
   "What it looks like: VII = in-, VIII = internal t after the first consonant, II = doubled middle consonant; Form I = no added signal.",
   "What you can now do: label a Qur’anic verb-form quickly by pattern-recognition in Roman-letter terms, so Arabic script becomes confirmation, not confusion."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify the form-signal (prefix/doubling/inserted t/long aa) and match it to the correct form number."
 },
 {
  "id": "form-markers-arabic",
  "n": 11,
  "title": "The same markers, now in Arabic",
  "stage": "The patterns",
  "level": "A1",
  "structure": "The signals as they appear on the page. II — the shadda ّ on the middle letter: عَلَّمَ. III — a long alif after the first: جَاهَدَ. IV — أَ on the front in the past, and it disappears in the present: أَنْزَلَ / يُنْزِلُ. V — تَ plus the shadda: تَذَكَّرَ. VI — تَ plus the long alif: تَعَاوَنُوا. VII — انْ: انْشَقَّ. VIII — a ت after the first root letter: اخْتَلَفَ. IX — the last letter doubled: اسْوَدَّ. X — اسْتَ: اسْتَغْفَرَ.",
  "whyItMatters": "This is the actual reading skill. Everything before it was preparation for being able to glance at a word in the muṣḥaf and know which form it is.",
  "canDo": "After this lesson you can look at a verb in the muṣḥaf and recognize—by its written Arabic markers—which verb form (II–X) it belongs to, even before you know the exact translation.",
  "rule": "In the Qur’an, the ten verb forms are not abstract grammar: they announce themselves with visible markers on the page. Your job is to spot the marker first (shadda, long alif, أَ, تَ, انْ, ت after the first root letter, last-letter doubling, اسْتَ), then read the word as “root + form meaning.” Don’t chase full parsing; just identify the form reliably.",
  "why": [
   "Prevents mistaking intensity/repetition (Form II) for a simple action (Form I), which changes the force of a verse.",
   "Prevents missing the “cause/make/bring about” sense (Form IV) when the hamza أَ is present in the past but absent in the present (يُـ).",
   "Prevents confusing a mutual/shared action (Form VI) with a reflexive/effortful one (Form V) when both start with تَ.",
   "Prevents treating longer-looking verbs (VII–X) as random extra letters rather than meaningful signals you can recognize instantly."
  ],
  "pattern": {
   "caption": "The same form-markers, now as you will actually see them written in Qur’anic Arabic",
   "columns": [
    "Form",
    "Marker to spot",
    "Example shape"
   ],
   "rows": [
    [
     "II",
     "shadda ّ on middle root letter",
     "نَزَّلَ"
    ],
    [
     "IV",
     "أَ in the past; present starts with يُـ (hamza disappears)",
     "أَنزَلَ / يُنزِلُ"
    ],
    [
     "V",
     "تَ plus shadda in the middle",
     "تَذَكَّرَ"
    ],
    [
     "VI",
     "تَ plus a long alif after the first root letter",
     "تَسَاءَلُونَ"
    ],
    [
     "VIII",
     "a ت after the first root letter (often written after an initial ا)",
     "ٱخْتَلَفُوا۟"
    ],
    [
     "X",
     "اسْتَ at the front",
     "يَسْتَبْشِرُونَ"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "نَزَّلَ",
    "blocks": [
     {
      "text": "ن",
      "role": "root",
      "gloss": "send down"
     },
     {
      "text": "زّ",
      "role": "root",
      "gloss": "send down"
     },
     {
      "text": "لَ",
      "role": "root",
      "gloss": "send down"
     }
    ],
    "note": "The shadda ّ sits on the middle root letter: that visual doubling is the Form II flag."
   },
   {
    "word": "أَنزَلَ",
    "blocks": [
     {
      "text": "أَ",
      "role": "verbPrefix",
      "gloss": "Form IV"
     },
     {
      "text": "نز",
      "role": "root",
      "gloss": "send down"
     },
     {
      "text": "لَ",
      "role": "root",
      "gloss": "send down"
     }
    ],
    "note": "Split off the initial hamza أَ as the form-marker; what remains are the root letters."
   },
   {
    "word": "يُؤْمِنُونَ",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "they (do)"
     },
     {
      "text": "ؤْمِن",
      "role": "root",
      "gloss": "believe"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "plural (they)"
     }
    ],
    "note": "Here the first segment is a present-tense prefix; this helps you not confuse يُـ with أَ (Form IV past marker)."
   },
   {
    "word": "تَذَكَّرَ",
    "blocks": [
     {
      "text": "تَ",
      "role": "verbPrefix",
      "gloss": "Form V"
     },
     {
      "text": "ذَكّ",
      "role": "root",
      "gloss": "remember"
     },
     {
      "text": "رَ",
      "role": "root",
      "gloss": "remember"
     }
    ],
    "note": "Form V is “تَ + (Form II look)”—so you expect both تَ and a shadda in the middle."
   },
   {
    "word": "ٱخْتَلَفُوا۟",
    "blocks": [
     {
      "text": "ٱخْ",
      "role": "verbPrefix",
      "gloss": "Form VIII"
     },
     {
      "text": "ت",
      "role": "verbPrefix",
      "gloss": "inserted ت"
     },
     {
      "text": "لَف",
      "role": "root",
      "gloss": "differ"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they (pl.)"
     }
    ],
    "note": "The key boundary is the extra ت right after the first root letter: that is the Form VIII signal."
   }
  ],
  "examples": [
   {
    "arabic": "ٱللَّهَ نَزَّلَ ٱلْكِتَٰبَ",
    "ref": "2:176",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "ٱللَّهَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "نَزَّلَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "كِتَٰبَ",
      "role": "plain"
     }
    ],
    "literal": "Allah — sent-down(II) — the — Book",
    "smooth": "Allah sent down the Book.",
    "whatChanged": "This shows the Form II marker in real Qur’anic print: the middle-letter shadda in نَزَّلَ."
   },
   {
    "arabic": "قَدْ جَآءَكُم بُرْهَٰنٌۭ",
    "ref": "4:174",
    "surah": "Sūrat An-Nisaa",
    "segments": [
     {
      "text": "قَدْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "جَآءَ",
      "role": "root"
     },
     {
      "text": "كُم",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بُرْهَٰنٌۭ",
      "role": "plain"
     }
    ],
    "literal": "indeed — came — to-you(pl.) — a proof",
    "smooth": "A proof has certainly come to you.",
    "whatChanged": "This adds the “long alif after the first” look (جَآءَ) so you practice noticing a long written vowel as a page-signal."
   },
   {
    "arabic": "قَدْ أَنزَلَ ٱللَّهُ",
    "ref": "65:10",
    "surah": "Sūrat At-Talaaq",
    "segments": [
     {
      "text": "قَدْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَ",
      "role": "verbPrefix"
     },
     {
      "text": "نزَلَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهُ",
      "role": "plain"
     }
    ],
    "literal": "indeed — (Form IV) sent down — Allah",
    "smooth": "Indeed Allah has sent down …",
    "whatChanged": "This is Form IV as it appears in the past: the initial أَ is the entire signal you must train your eye to grab."
   },
   {
    "arabic": "وَلِيَتَذَكَّرَ أُو۟لُوا۟",
    "ref": "38:29",
    "surah": "Sūrat Saad",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لِ",
      "role": "preposition"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "تَ",
      "role": "verbPrefix"
     },
     {
      "text": "ذَكَّرَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أُو۟لُوا۟",
      "role": "plain"
     }
    ],
    "literal": "and — for — he/it may — (Form V) remember — possessors",
    "smooth": "… so that those of understanding may take reminder.",
    "whatChanged": "This shows Form V inside running text: you see تَ plus a shadda later (ذَكَّرَ), not just one marker."
   },
   {
    "arabic": "لَا يَتَسَآءَلُونَ",
    "ref": "23:101",
    "surah": "Sūrat Al-Muminoon",
    "segments": [
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "تَ",
      "role": "verbPrefix"
     },
     {
      "text": "سَآ",
      "role": "root"
     },
     {
      "text": "ءَل",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "not — they — (Form VI) ask-one-another — (they pl.)",
    "smooth": "They will not ask one another questions.",
    "whatChanged": "This gives you the Form VI page-signal: تَ plus a visible long alif (سَآ) in the middle of the verb."
   },
   {
    "arabic": "ٱخْتَلَفُوا۟ فِى ٱلْكِتَٰبِ",
    "ref": "2:176",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "ٱخْ",
      "role": "verbPrefix"
     },
     {
      "text": "ت",
      "role": "verbPrefix"
     },
     {
      "text": "لَفُوا۟",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "كِتَٰبِ",
      "role": "plain"
     }
    ],
    "literal": "(Form VIII) differed — in — the — Book",
    "smooth": "… they differed concerning the Book.",
    "whatChanged": "This adds Form VIII recognition: the “extra ت after the first root letter” is the key thing to spot quickly."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a shadda as “decoration” — it is often the whole Form II signal.",
    "example": "نَزَّلَ",
    "note": "If you ignore the shadda, you will read the verb as a simpler action than intended. Train your eye to hunt for ّ immediately after you locate the root letters."
   },
   {
    "claim": "Don’t confuse Form IV past أَـ with the present-tense prefix يُـ / يَـ.",
    "example": "أَنزَلَ / يُؤْمِنُونَ",
    "note": "Form IV has أَ at the start in the past; in the present, that hamza is not there (you’ll see يُـ). The mere presence of a leading hamza is meaningful."
   },
   {
    "claim": "Don’t confuse Form V and Form VI: both start with تَ, but only one has the long alif signal.",
    "example": "تَذَكَّرَ vs يَتَسَآءَلُونَ",
    "note": "Form V looks like “تَ + Form II (shadda in the middle).” Form VI looks like “تَ + long alif after the first root letter.” When you see both تَ and a long alif, lean VI."
   }
  ],
  "checklist": [
   "Circle the verb first (ignore surrounding particles like قَدْ, لَا, وَ).",
   "Scan for a shadda ّ on the middle root letter → suspect Form II (and if there is also an initial تَ → Form V).",
   "Scan for an initial أَ in a past-tense-looking verb → suspect Form IV; remember it will not stay as أَ in the present.",
   "Scan for تَ near the front: if you also see a long alif later (ـَاـ / ـآـ) → suspect Form VI; if you see a shadda instead → suspect Form V.",
   "Scan for an extra ت right after the first root letter (often after an initial ٱ/ا) → suspect Form VIII (ٱخْتَـ… is a common look).",
   "Only after you have the form, read “root + form meaning” to predict the kind of meaning (cause, mutual, effort, etc.)."
  ],
  "summary": [
   "Rule: the Qur’an’s verb forms advertise themselves with visible Arabic markers (shadda, long alif, أَ, تَ, inserted ت, etc.).",
   "What it looks like: نَزَّلَ (II), أَنزَلَ (IV), يَتَسَآءَلُونَ (VI), ٱخْتَلَفُوا۟ (VIII) — you can identify them by sight.",
   "What you can now do: glance at a verb and label its form before translating, making your root knowledge immediately usable while reading."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to point to the marker and name the verb form (II–X) it indicates."
 },
 {
  "id": "forms-master-table",
  "n": 12,
  "title": "All ten forms on one page",
  "stage": "The patterns",
  "level": "A1",
  "structure": "The reference: form number, the marker that identifies it, and what it does to the meaning. Three columns, ten rows, nothing else. This is the page to come back to for the rest of the course — not to memorise in one sitting, but to consult until it stops being needed.",
  "whyItMatters": "You called this your structural key, and you were right to want it separated from the examples. A table you can hold in your head beats ten pages you half-remember.",
  "canDo": "After this lesson you can look at a Qur’anic verb, identify which of the ten forms it is from its marker, and predict the kind of meaning-shift that form usually adds.",
  "rule": "Every derived verb form is identified by a visible marker (a doubled middle letter, an extra alif, a prefixed تـ, an initial اِنـ, etc.). The form number is your reference label; the marker is what you actually see on the page; the “job” is the typical meaning-shift (causative, reflexive, mutual, seeking, passive-like, etc.). Don’t try to memorize all ten today: use this as a lookup page until your eye starts recognizing them automatically.",
  "why": [
   "Prevents treating every verb as basic Form I and missing crucial meaning like “cause” (Form IV) or “make someone do” rather than “do.”",
   "Prevents confusing “someone was guided” with “Allah guides” by noticing Form IV هَدَى vs other patterns and looking for the marker.",
   "Prevents reading past key themes (revelation, sending down, making clear) without noticing that Qur’anic verbs often come in predictable forms like Form IV أَنزَلَ.",
   "Prevents getting stuck on unfamiliar vocabulary when the marker already tells you the direction of meaning, even before you know the root well."
  ],
  "pattern": {
   "caption": "All ten verb forms: your one-page structural key (reference number → marker you see → what it tends to do to meaning).",
   "columns": [
    "Form (reference)",
    "Marker you recognize (Arabic)",
    "Meaning job (typical shift)"
   ],
   "rows": [
    [
     "I",
     "no extra letters (base pattern)",
     "Basic action/state of the root (default meaning)."
    ],
    [
     "II",
     "middle letter doubled (ـّ)",
     "Intensive / repeated OR causative / ‘make X do’ (context decides)."
    ],
    [
     "III",
     "an extra alif after 1st root letter (ـاـ)",
     "Interaction / involvement with another party (often ‘do with/against’)."
    ],
    [
     "IV",
     "hamzah at the start (أَـ)",
     "Causative / bring about / ‘make/let/cause’ (very common in Qur’an)."
    ],
    [
     "V",
     "تَـ prefix + doubled middle letter (تَ…ّ)",
     "Reflexive of II: the subject takes on the effect; ‘become / get oneself…’"
    ],
    [
     "VI",
     "تَـ prefix + alif after 1st root (تَـاـ)",
     "Mutual / reciprocal: ‘do to each other’ / shared involvement."
    ],
    [
     "VII",
     "اِنـ at the start (اِنْـ / اِنـ)",
     "Often passive-like or ‘happen to oneself’: ‘become / be done’."
    ],
    [
     "VIII",
     "اِـ at start + inserted ت after 1st root (…ت…)",
     "Reflexive / exert effort / ‘take up’ the action (often internal/intentional)."
    ],
    [
     "IX",
     "اِـ + doubled last root letter (ـّ at end)",
     "Colors/defects/states (rare; ‘become X-colored/defective’)."
    ],
    [
     "X",
     "اِسْتَـ at the start (اِسْتَـ)",
     "Seeking/considering: ‘seek, ask for, try to’ or ‘consider as’."
    ]
   ]
  },
  "anatomy": [
   {
    "word": "أَنزَلْنَآ",
    "blocks": [
     {
      "text": "أَ",
      "role": "verbPrefix",
      "gloss": "Form IV"
     },
     {
      "text": "نز",
      "role": "root",
      "gloss": "send down"
     },
     {
      "text": "لْ",
      "role": "verbSuffix",
      "gloss": "past stem"
     },
     {
      "text": "نَآ",
      "role": "attachedPronoun",
      "gloss": "we"
     }
    ],
    "note": "Split shows the Form IV marker (أَـ) plus the attached pronoun نَآ; the remaining letters carry the root meaning."
   },
   {
    "word": "يَهْدِى",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he/it"
     },
     {
      "text": "هْد",
      "role": "root",
      "gloss": "guide"
     },
     {
      "text": "ِى",
      "role": "verbSuffix",
      "gloss": "imperfect"
     }
    ],
    "note": "The verb-prefix يَ tells you it is an imperfect verb; the form is judged by the internal marker (here, none obvious = likely Form I)."
   },
   {
    "word": "يَسْتَبْشِرُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "they"
     },
     {
      "text": "سْتَ",
      "role": "verbPrefix",
      "gloss": "Form X"
     },
     {
      "text": "بْشِر",
      "role": "root",
      "gloss": "good news"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "plural"
     }
    ],
    "note": "Form X is recognized by the visible اِسْتَ/سْتَ sequence; imperfect يَ and plural ونَ are separate layers."
   },
   {
    "word": "مُبَيِّنَٰتٍۢ",
    "blocks": [
     {
      "text": "مُ",
      "role": "verbPrefix",
      "gloss": "made/causing"
     },
     {
      "text": "بَيِّن",
      "role": "root",
      "gloss": "clear"
     },
     {
      "text": "َٰتٍۢ",
      "role": "nounEnding",
      "gloss": "plural ending"
     }
    ],
    "note": "This is not a finite verb but a derived word built from a form pattern; the doubled يّ is the same ‘Form II-family’ signal (intensive/causative clarity)."
   }
  ],
  "examples": [
   {
    "arabic": "وَأَنزَلْنَآ إِلَيْكُمْ نُورًۭا",
    "ref": "4:174",
    "surah": "Sūrat An-Nisaa",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "أَ",
      "role": "verbPrefix"
     },
     {
      "text": "نز",
      "role": "root"
     },
     {
      "text": "لْ",
      "role": "verbSuffix"
     },
     {
      "text": "نَآ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَى",
      "role": "preposition"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "نُورًۭا",
      "role": "nounEnding"
     }
    ],
    "literal": "and + (Form IV) sent-down-we + to + you(pl) + a light(acc.)",
    "smooth": "And We sent down to you a clear light.",
    "whatChanged": "This anchors Form IV: when you see initial أَـ, expect a causative/bringing-about sense like ‘send down, make happen’ rather than a bare root action."
   },
   {
    "arabic": "لَّقَدْ أَنزَلْنَآ ءَايَٰتٍۢ",
    "ref": "24:46",
    "surah": "Sūrat An-Noor",
    "segments": [
     {
      "text": "لَ",
      "role": "particle"
     },
     {
      "text": "قَدْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَ",
      "role": "verbPrefix"
     },
     {
      "text": "نز",
      "role": "root"
     },
     {
      "text": "لْ",
      "role": "verbSuffix"
     },
     {
      "text": "نَآ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ءَايَٰتٍۢ",
      "role": "nounEnding"
     }
    ],
    "literal": "surely + indeed + sent-down-we + signs(pl.)",
    "smooth": "We have certainly sent down signs.",
    "whatChanged": "Same Form IV marker (أَـ), now with particles (لَ…قَدْ) around it—training you to still spot the form even when the line is busy."
   },
   {
    "arabic": "وَٱللَّهُ يَهْدِى مَن يَشَآءُ",
    "ref": "24:46",
    "surah": "Sūrat An-Noor",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱللَّهُ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "هْد",
      "role": "root"
     },
     {
      "text": "ِى",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مَن",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "شَآءُ",
      "role": "root"
     }
    ],
    "literal": "and + Allah(u) + he-guides + whom + he-wills",
    "smooth": "And Allah guides whomever He wills.",
    "whatChanged": "This is your ‘baseline’: a verb with no derived-form marker is often Form I; you still segment it by prefix/suffix so you don’t mistake who is doing what."
   },
   {
    "arabic": "فَزَادَتْهُمْ إِيمَٰنًۭا",
    "ref": "9:124",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "زَادَ",
      "role": "root"
     },
     {
      "text": "تْ",
      "role": "verbSuffix"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِيمَٰنًۭا",
      "role": "nounEnding"
     }
    ],
    "literal": "so + increased + (she/it) + them + faith(acc.)",
    "smooth": "So it increased them in faith.",
    "whatChanged": "Not every important meaning-shift is a form marker: here the attached object pronoun هُمْ is the key to comprehension—who received the increase."
   },
   {
    "arabic": "وَهُمْ يَسْتَبْشِرُونَ",
    "ref": "9:124",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "سْتَ",
      "role": "verbPrefix"
     },
     {
      "text": "بْشِر",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "and + they + (Form X) seek-good-news/are-glad + plural",
    "smooth": "And they rejoice.",
    "whatChanged": "This gives you a clear Form X marker (سْتَ) inside the verb: when you see it, expect ‘seeking/considering’ or an intensified intentional stance rather than a simple action."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse Form IV (أَـ) with the imperfect prefix أَ (I…).",
    "example": "أَنزَلْنَآ / أَعْلَمُ",
    "note": "Both begin with hamzah, but Form IV’s أَـ is part of the derived pattern, while imperfect-prefix أَـ simply marks ‘I…’ on many verbs. Check what follows: Form IV often shows a clear extra structure (like أَنـ), and the ending may be past-tense with attached pronouns."
   },
   {
    "claim": "Don’t confuse Form X (اِسْتَـ / سْتَ) with the prefix سَـ meaning ‘will/soon’.",
    "example": "يَسْتَبْشِرُونَ / فَسَوْفَ",
    "note": "Form X has an actual cluster سْتَ inside the verb (often after a verb-prefix like يَـ). The future particle is a separate word or prefix (سَـ) and does not create the سْتَ sequence."
   },
   {
    "claim": "Don’t assume a doubled letter (ـّ) always means Form II verb in the line you’re reading.",
    "example": "مُّبَيِّنَٰتٍۢ",
    "note": "Shadda can appear in derived nouns/adjectives too, not only finite verbs. Still, it is a strong ‘Form II-family’ signal: something is being intensified/made clear, and you should look for a causative/intensive feel in meaning."
   }
  ],
  "checklist": [
   "Find the verb, then ignore surrounding particles for a moment (وَ، فَ، قَدْ, etc.).",
   "Look first for the big markers: initial أَـ (Form IV), initial اِنـ (Form VII), initial اِسْتَـ/سْتَ (Form X).",
   "If none, check for internal markers: doubled middle letter ـّ (Form II) or an alif after the first root letter ـاـ (Form III).",
   "If there is a prefixed تَـ, ask: does the verb also have ـّ (Form V) or ـاـ (Form VI)?",
   "Split off the verb-prefix (يَ/تَ/أَ/نَ) and any plural endings (ونَ) so you don’t mistake grammar for the form marker.",
   "Once you have the form number, apply only the ‘job’ (causative, mutual, seeking…) as a meaning-hint; let context choose the best English."
  ],
  "summary": [
   "Rule: form number is your reference, the marker is what your eye detects, and the job is the usual meaning-shift.",
   "Look: أَـ (IV), ـّ (II/V/IX-family signals), ـاـ (III/VI), اِنـ (VII), …ت… (VIII), اِسْتَـ (X).",
   "Now you can pause at an unfamiliar verb, label its form quickly, and read with a guided expectation instead of guessing blindly."
  ],
  "quizBridge": "The quiz will show short Qur’anic verbs and ask you to choose the correct form number from the marker and select the best ‘meaning job’ (causative, mutual, seeking, etc.)."
 },
 {
  "id": "one-root-ten-forms",
  "n": 13,
  "title": "One root, all ten forms",
  "stage": "The patterns",
  "level": "A1",
  "structure": "ك ت ب poured into every template in turn, so the shapes can be compared with the meaning held still. كَتَبَ he wrote · كَتَّبَ he made write · كَاتَبَ he corresponded with · أَكْتَبَ he dictated · تَكَتَّبَ · تَكَاتَبَ they wrote to each other · انْكَتَبَ it was written · اكْتَتَبَ he had it written down · اسْتَكْتَبَ he asked for it to be written. Not every form exists for every root, and that is itself worth seeing.",
  "whyItMatters": "This is the lesson where the system clicks. One root held constant is the only way to see that the template, not the letters, is what is carrying the change.",
  "canDo": "After this lesson you can look at different words built from the same root ك ت ب and identify which form-template is being used, so you can predict the “type of meaning shift” even before you translate.",
  "rule": "Hold the root constant (ك ت ب) and change only the template: the template carries the added meaning (intensity, reciprocity, passive, seeking, etc.). In the Qur’an, not every theoretical form will appear for every root—so you learn two things at once: what the template usually means, and what the Qur’an actually uses. When you see كَتَبَ / كُتِبَ / يَكْتُبُونَ / كِتَاب, your job is to separate “root meaning” (writing/record) from “template meaning” (who did it, how, and in what grammatical shape).",
  "why": [
   "Prevents the failure of treating every ك ت ب word as just “book” and missing verbs like يَكْتُبُونَ (they write) or كَتَبَتْ (it wrote).",
   "Prevents the failure of thinking the root alone determines everything; templates add crucial meaning like passive (“was written”) or causative (“made write”).",
   "Prevents the failure of missing that Arabic often signals relationships inside the word (prefix/suffix) rather than with separate helper words in English.",
   "Prevents the failure of over-generalizing: you stop assuming all 10 forms must exist in the Qur’an for a given root, and instead learn to recognize what is actually present."
  ],
  "pattern": {
   "caption": "Same root ك ت ب, different templates: compare the “shape signal” to the meaning shift. (Not all appear in the sample verses; that absence is part of the point.)",
   "columns": [
    "Form",
    "Template signal (what you look for)",
    "Meaning with ك ت ب held still"
   ],
   "rows": [
    [
     "I",
     "basic 3-letter verb (no extra letters)",
     "كَتَبَ: he wrote"
    ],
    [
     "II",
     "middle letter doubled (ـتّـ)",
     "كَتَّبَ: he made/caused (someone) to write"
    ],
    [
     "III",
     "long ā after 1st root letter (كَاـ)",
     "كَاتَبَ: he corresponded (writing back-and-forth)"
    ],
    [
     "VII",
     "اِنْـ prefix (انـ)",
     "اِنْكَتَبَ: it was written / got written"
    ],
    [
     "X",
     "اِسْتَـ prefix (استـ)",
     "اِسْتَكْتَبَ: he asked for it to be written"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "يَكْتُبُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he/they (imperfect)"
     },
     {
      "text": "كْتُب",
      "role": "root",
      "gloss": "write / record"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "they (masc.)"
     }
    ],
    "note": "Boundary is prefix + root-core + plural suffix; the root letters are still ك ت ب even when vowels change."
   },
   {
    "word": "كَتَبَتْ",
    "blocks": [
     {
      "text": "كَتَب",
      "role": "root",
      "gloss": "write / record"
     },
     {
      "text": "تْ",
      "role": "verbSuffix",
      "gloss": "she/it (past)"
     }
    ],
    "note": "Past tense can mark ‘she/it’ by a final تْ; the root stays visible as three consonants."
   },
   {
    "word": "ٱلْكِتَٰبَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "particle",
      "gloss": "the (def.)"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "book / scripture"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "object (acc.)"
     }
    ],
    "note": "Here the ‘template’ is a noun-pattern (kitāb). The ending vowel (fatḥa) is grammar, not root meaning."
   },
   {
    "word": "لِّلْمُتَّقِينَ",
    "blocks": [
     {
      "text": "لِ",
      "role": "preposition",
      "gloss": "for / to"
     },
     {
      "text": "ٱلْ",
      "role": "particle",
      "gloss": "the (def.)"
     },
     {
      "text": "مُتَّقِين",
      "role": "plain",
      "gloss": "those mindful"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "plural case"
     }
    ],
    "note": "Not a ك ت ب word: included to train you to ignore surrounding grammar when your target is the root+template word."
   }
  ],
  "examples": [
   {
    "arabic": "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ",
    "ref": "2:2",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "ذَٰلِكَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَيْبَ",
      "role": "plain"
     }
    ],
    "literal": "that / the-book / (is) no doubt",
    "smooth": "That is the Book—no doubt in it.",
    "whatChanged": "You see ك ت ب as a noun-pattern (كِتَٰب) plus a grammar ending; nothing here is ‘verb form’ yet."
   },
   {
    "arabic": "فِى كِتَٰبٍۢ مُّبِينٍۢ",
    "ref": "6:59",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "فِى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ٍۢ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُّبِينٍۢ",
      "role": "plain"
     }
    ],
    "literal": "in / a-book / clear",
    "smooth": "…in a clear record/book.",
    "whatChanged": "Same root noun-pattern, but now it is indefinite (no ٱلْ) and its ending is different because grammar changed, not meaning."
   },
   {
    "arabic": "أُوتُوا۟ ٱلْكِتَٰبَ يَرُدُّوكُم",
    "ref": "3:100",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "أُوتُوا۟",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "رُدُّو",
      "role": "plain"
     },
     {
      "text": "كُم",
      "role": "attachedPronoun"
     }
    ],
    "literal": "were-given / the-book / (they) turn-you-back",
    "smooth": "…those who were given the Book may turn you back…",
    "whatChanged": "You practice not over-focusing on ك ت ب alone: other words carry their own internal signals (prefix + attached pronoun)."
   },
   {
    "arabic": "يَكْتُبُونَ ٱلْكِتَٰبَ",
    "ref": "2:79",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "كْتُب",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "they-write / the-book",
    "smooth": "They write the Book…",
    "whatChanged": "For the first time the same root appears as both a verb (Form I imperfect) and a noun (kitāb) side-by-side—template, not root, is doing the job."
   },
   {
    "arabic": "مِمَّا كَتَبَتْ أَيْدِيهِمْ",
    "ref": "2:79",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "مِمَّا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَتَب",
      "role": "root"
     },
     {
      "text": "تْ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَيْدِى",
      "role": "plain"
     },
     {
      "text": "هِمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "from-what / wrote / their-hands",
    "smooth": "…from what their hands wrote.",
    "whatChanged": "You see the same root as a past tense verb with a feminine/it marker (تْ), which Qur’anic Arabic uses for ‘hands’ as a plural noun treated grammatically as feminine."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the root meaning with one common noun meaning (كِتَٰب = ‘book’).",
    "example": "يَكْتُبُونَ",
    "note": "This is not ‘they book’. It is the verb ‘they write’. Same root; different template and grammar signals (يـ … ون)."
   },
   {
    "claim": "Don’t treat endings as part of the root.",
    "example": "ٱلْكِتَٰبُ / ٱلْكِتَٰبَ",
    "note": "The final vowel (ُ vs َ) is a grammatical ending (case), not a change in the root. Your eye should separate كِتَٰب from its ending."
   },
   {
    "claim": "Don’t assume all ten forms must appear in the Qur’an for a given root.",
    "example": "ك ت ب",
    "note": "This lesson lists Form II/III/VII/X for comparison, but the verses here mainly show Form I verbs and the noun كِتَٰب. Absence is information: learn what is actually attested."
   }
  ],
  "checklist": [
   "First, spot the root consonants: look for ك…ت…ب in that order (even if vowels/lengthening marks change).",
   "Second, ask: is it a verb-shape or a noun-shape? (Verb: likely has prefixes like يـ or suffixes like ـون / ـتْ; noun: may have ٱلـ and a case ending.)",
   "If it is a verb, strip off verbPrefix/verbSuffix mentally and keep the three root letters in view.",
   "If it is a noun, strip off ٱلـ and the nounEnding; what remains is the noun-template carrying the core ‘writing/record’ meaning.",
   "Compare occurrences: when the root stays the same but the surrounding letters (prefixes, doubling, extra letters) change, assume a template meaning shift, not a new root.",
   "Finally, accept “missing forms”: if you don’t see a template signal in the mushaf, don’t force it—read what is there."
  ],
  "summary": [
   "Rule: keep the root constant and let the template explain the meaning shift.",
   "Look: identify added letters (prefix/suffix/definite article) and distinguish root letters from grammar endings.",
   "Now: you can recognize ك ت ب as noun (كِتَٰب) or verb (يَكْتُبُونَ / كَتَبَتْ) and know what kind of meaning shift is happening."
  ],
  "quizBridge": "The quiz will show new ك ت ب words and ask you to label what is root vs prefix/suffix/ending, and whether you are looking at a verb-shape or noun-shape."
 },
 {
  "id": "blank-table-practice",
  "n": 14,
  "title": "Fill it in yourself",
  "stage": "The patterns",
  "level": "A1",
  "structure": "The same table with the forms blank, for نزل. Work down it — what is Form II of ن ز ل, what is Form IV — and then reveal the filled version and compare. No score, no timer, nothing recorded.",
  "whyItMatters": "Producing a form from memory fixes it far harder than reading one. And doing it with the answer one tap away, unmarked, is the difference between practice and being examined.",
  "canDo": "After this lesson you can look at any ن ز ل verb in the Qur’an and mentally “fill in” which Form it belongs to (especially II vs IV), then check yourself against the revealed table so recognition becomes automatic.",
  "rule": "Cover the answers and rebuild the Forms from the root ن ز ل: Form II is the doubled middle letter (نَزَّلَ), and Form IV has the أَ prefix (أَنزَلَ). When you can generate the pattern from memory, the Qur’anic word becomes easier to recognize instantly. This is practice, not a test: you check, not get judged.",
  "why": [
   "Prevents mixing up “sent down (once / caused to descend)” (أَنزَلَ) with “sent down repeatedly / in stages” (نَزَّلَ) when you read quickly.",
   "Prevents missing a Form II marker (shadda) and thinking a word is basic Form I, which breaks the meaning flow of an āyah.",
   "Prevents seeing أَنزَلَ and treating the أَ as “just a vowel” instead of a Form IV signal that changes the verb family.",
   "Prevents losing track of meaning when the same root appears in multiple Forms across nearby verses (revelation, provision, sending)."
  ],
  "pattern": {
   "caption": "Fill-it-yourself table (cover the right column first). Work down: “What is Form II of ن ز ل? What is Form IV?” Then reveal and compare.",
   "columns": [
    "Form (meaning family, from earlier lessons)",
    "Your fill-in (blank when you study)",
    "Reveal (check yourself)"
   ],
   "rows": [
    [
     "I (basic: descend)",
     "_____",
     "نَزَلَ"
    ],
    [
     "II (intensive/repeated: send down in stages)",
     "_____",
     "نَزَّلَ"
    ],
    [
     "III (reciprocal/associative)",
     "_____",
     "نَازَلَ (rare for this root in Qur’anic usage)"
    ],
    [
     "IV (causative: send down / bring down)",
     "_____",
     "أَنزَلَ"
    ],
    [
     "V (reflexive of II: come down gradually)",
     "_____",
     "تَنَزَّلَ"
    ],
    [
     "X (seek/consider: ask to be sent down)",
     "_____",
     "ٱسْتَنزَلَ (not in today’s verse list; included so the full system stays in your head)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "أَنزَلْنَآ",
    "blocks": [
     {
      "text": "أَ",
      "role": "verbPrefix",
      "gloss": "Form IV"
     },
     {
      "text": "نزَل",
      "role": "root",
      "gloss": "come down"
     },
     {
      "text": "نَآ",
      "role": "verbSuffix",
      "gloss": "we (did)"
     }
    ],
    "note": "Boundary: the initial أَ is not “part of the root”; it is the Form IV marker placed before the root."
   },
   {
    "word": "لَنَزَّلْنَا",
    "blocks": [
     {
      "text": "لَ",
      "role": "particle",
      "gloss": "surely / would"
     },
     {
      "text": "نَزَّل",
      "role": "root",
      "gloss": "send down (II)"
     },
     {
      "text": "نَا",
      "role": "verbSuffix",
      "gloss": "we (did)"
     }
    ],
    "note": "Boundary: the shadda on ز is the whole point—without it you would not be seeing Form II."
   },
   {
    "word": "يُنَزِّلُ",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "he (does)"
     },
     {
      "text": "نَزِّل",
      "role": "root",
      "gloss": "send down (II)"
     },
     {
      "text": "ُ",
      "role": "verbSuffix",
      "gloss": "imperfect ending"
     }
    ],
    "note": "Boundary: keep the یُ as a verb prefix (imperfect), and focus on the doubled middle letter (زّ) to identify Form II."
   },
   {
    "word": "تُنَزَّلَ",
    "blocks": [
     {
      "text": "تُ",
      "role": "verbPrefix",
      "gloss": "it is (being)"
     },
     {
      "text": "نَزَّل",
      "role": "root",
      "gloss": "sent down (II)"
     },
     {
      "text": "َ",
      "role": "verbSuffix",
      "gloss": "passive ending"
     }
    ],
    "note": "Boundary: the تُ here is not “you”; in this context it is part of the passive verb pattern, while the shadda still signals Form II."
   }
  ],
  "examples": [
   {
    "arabic": "مَّآ أَنزَلَ ٱللَّهُ",
    "ref": "10:59",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "مَّآ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَ",
      "role": "verbPrefix"
     },
     {
      "text": "نزَل",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهُ",
      "role": "plain"
     }
    ],
    "literal": "what — sent-down (IV) — Allah",
    "smooth": "“what Allah has sent down …”",
    "whatChanged": "This anchors Form IV visually: the opening أَ is your fast signal that this is أَنزَلَ, not نَزَّلَ."
   },
   {
    "arabic": "لَنَزَّلْنَا عَلَيْهِم",
    "ref": "17:95",
    "surah": "Sūrat Al-Israa",
    "segments": [
     {
      "text": "لَ",
      "role": "particle"
     },
     {
      "text": "نَزَّل",
      "role": "root"
     },
     {
      "text": "نَا",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَلَى",
      "role": "preposition"
     },
     {
      "text": "هِم",
      "role": "attachedPronoun"
     }
    ],
    "literal": "surely/would — send-down (II) — we — upon — them",
    "smooth": "“We would certainly have sent down upon them …”",
    "whatChanged": "Now you contrast II vs IV: no أَ prefix; instead, the shadda on ز (نَزَّلَ) marks Form II."
   },
   {
    "arabic": "وَلَوْ نَزَّلْنَٰهُ",
    "ref": "26:198",
    "surah": "Sūrat Ash-Shu'araa",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَوْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "نَزَّل",
      "role": "root"
     },
     {
      "text": "نَٰ",
      "role": "verbSuffix"
     },
     {
      "text": "هُ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and — if — send-down (II) — we — it",
    "smooth": "“And if We had sent it down …”",
    "whatChanged": "This adds attached pronouns: the Form stays II (نَزَّلَ), even when “it” (هُ) sticks to the end."
   },
   {
    "arabic": "وَيُنَزِّلُ لَكُم",
    "ref": "40:13",
    "surah": "Sūrat Ghafir",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "يُ",
      "role": "verbPrefix"
     },
     {
      "text": "نَزِّل",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لِ",
      "role": "preposition"
     },
     {
      "text": "كُم",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and — he (does) — send-down (II) — (imperfect) — for — you (pl.)",
    "smooth": "“and He sends down for you …”",
    "whatChanged": "This shows Form II in the present/imperfect: focus on the doubled middle letter, not just past-tense shapes."
   },
   {
    "arabic": "إِنَّآ أَنزَلْنَٰهُ",
    "ref": "97:1",
    "surah": "Sūrat Al-Qadr",
    "segments": [
     {
      "text": "إِنَّ",
      "role": "particle"
     },
     {
      "text": "آ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَ",
      "role": "verbPrefix"
     },
     {
      "text": "نزَل",
      "role": "root"
     },
     {
      "text": "نَٰ",
      "role": "verbSuffix"
     },
     {
      "text": "هُ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "indeed — we — sent-down (IV) — we — it",
    "smooth": "“Indeed We sent it down …”",
    "whatChanged": "This pairs the Form IV marker (أَ) with both “we” and “it” endings, proving you can still spot the Form under extra letters."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a Form IV أَ (أَنزَلَ) with the definite article ٱلـ (ٱللَّهُ).",
    "example": "أَنزَلَ / ٱللَّهُ",
    "note": "ٱلـ belongs to nouns (like ٱللَّهُ) and signals definiteness. The أَ at the start of أَنزَلَ is a verb-form marker attached to the verb pattern, not “the.”"
   },
   {
    "claim": "Don’t miss the shadda: نَزَّلَ is not the same reading experience as نَزَلَ.",
    "example": "نَزَّلَ / نَزَلَ",
    "note": "Your eye can slide past the shadda when you read fast. But in Form spotting, the shadda is the headline: it’s the Form II marker that often correlates with ‘sent down gradually/repeatedly.’"
   },
   {
    "claim": "Don’t treat attached pronouns as part of the root.",
    "example": "أَنزَلْنَٰهُ",
    "note": "The root letters carrying meaning are ن ز ل. Endings like نَا (we) and هُ (him/it) add who did it and who received it; they do not change the Form."
   }
  ],
  "checklist": [
   "Circle the root letters mentally: look for ن…ز…ل in the verb.",
   "Check for Form IV first: is there an initial أَ right before the root? If yes, you’re in أَفْعَلَ (Form IV): أَنزَلَ.",
   "If no أَ, check for Form II: is the middle root letter doubled (shadda) — نَزَّلَ / يُنَزِّلُ?",
   "Ignore extra “wrappers” while identifying the Form: particles (وَ, لَوْ, إِنَّ), prepositions (عَلَى, لِ), and attached pronouns (نَا, هُ, هِم, كُم).",
   "Once you’ve named the Form, reread the snippet with that meaning family in mind (IV: send down; II: send down in stages/repeatedly) and see which fits the context better."
  ],
  "summary": [
   "Rule: rebuild the verb form from the root—Form II is the doubled middle letter; Form IV is the أَ prefix.",
   "Look: shadda = II (نَزَّلَ / يُنَزِّلُ); initial أَ = IV (أَنزَلَ).",
   "You can now pause on a Qur’anic ن ز ل verb, identify its Form quickly, and let that guide comprehension without translating word-by-word."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets with ن ز ل verbs and ask you to pick the Form (especially II vs IV) by spotting shadda vs أَ—no writing, just recognition."
 },
 {
  "id": "nazala-case-study",
  "n": 15,
  "title": "نزل: why the Qur'an uses three different forms for \"sent down\"",
  "stage": "The patterns",
  "level": "A2",
  "structure": "One root, three forms, three genuinely different claims. نَزَّلَ (II) — sent down gradually, in stages. أَنْزَلَ (IV) — sent down, as a single act. تَنَزَّلَ (V) — came down repeatedly, descended. The Qur'an uses all three about revelation and the choice is never accidental.",
  "whyItMatters": "This is where morphology stops being grammar and starts being meaning. Two verses that a translation renders identically are saying different things, and the form is where the difference lives.",
  "canDo": "After this lesson you can tell, while reading, whether the Qur’an is saying “sent down in one act” (أَنْزَلَ), “sent down gradually” (نَزَّلَ), or “kept coming down repeatedly” (تَنَزَّلَ) from the same root ن-ز-ل.",
  "rule": "The root ن-ز-ل always carries the core idea of “coming down / sending down,” but the verb form changes the claim. Form IV أَنْزَلَ presents the sending-down as a single, complete act; Form II نَزَّلَ presents it as staged/gradual; Form V تَنَزَّلَ presents repeated descending/coming down again and again. When translations flatten all three into “sent down,” you lose meaning that the Arabic kept on purpose.",
  "why": [
   "Prevents reading “إِنَّآ أَنزَلْنَٰهُ” as “We sent it down gradually” when the Arabic is making a one-act claim (e.g., about a specific night/event).",
   "Prevents missing the slow, staged nature implied by “لَنَزَّلْنَا” / “يُنَزِّلُ” where the form itself signals “in portions,” not merely “from above.”",
   "Prevents treating every “أُنزِلَ / أَنزَلَ” as interchangeable with “نَزَّلَ,” which can blur why one passage stresses completion while another stresses process.",
   "Prevents confusing “coming down repeatedly” (Form V) with “being sent down gradually” (Form II): both can look like “more than once,” but they are different ideas."
  ],
  "pattern": {
   "caption": "One root (ن-ز-ل), three forms, three meanings the Qur’an distinguishes",
   "columns": [
    "Form + common shape",
    "Core claim (in English)",
    "Reading cue you can spot"
   ],
   "rows": [
    [
     "IV: أَنْزَلَ / أُنزِلَ",
     "sent down as a single act / made to descend (complete event)",
     "hamzah (أَ / أُ) at the start of the verb"
    ],
    [
     "II: نَزَّلَ / يُنَزِّلُ / لَنَزَّلْنَا",
     "sent down gradually, in stages, portion by portion",
     "middle letter doubled (ـزّـ) with shadda"
    ],
    [
     "V: تَنَزَّلَ / يَتَنَزَّلُ",
     "came down repeatedly; descended again and again",
     "starts with تَـ plus the same doubled middle letter (ـزّـ)"
    ],
    [
     "Passive IV: أُنزِلَ",
     "was sent down (focus on the thing revealed, not the sender)",
     "أُـ at start + often followed by “إِلَيْكَ / إِلَيْهِم”"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "أَنزَلْنَٰهُ",
    "blocks": [
     {
      "text": "أَ",
      "role": "verbPrefix",
      "gloss": "Form IV"
     },
     {
      "text": "نز",
      "role": "root",
      "gloss": "come down"
     },
     {
      "text": "لْنَا",
      "role": "verbSuffix",
      "gloss": "we (did)"
     },
     {
      "text": "هُ",
      "role": "attachedPronoun",
      "gloss": "it/him"
     }
    ],
    "note": "The initial hamzah (أَ) is the visual flag for Form IV; the final هُ is an attached object pronoun."
   },
   {
    "word": "نَزَّلْنَا",
    "blocks": [
     {
      "text": "نزّ",
      "role": "root",
      "gloss": "come down"
     },
     {
      "text": "لْنَا",
      "role": "verbSuffix",
      "gloss": "we (did)"
     }
    ],
    "note": "The shadda on the middle root letter (زّ) is the flag for Form II (the “staged/gradual” form)."
   },
   {
    "word": "يُنَزِّلُ",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "he (does)"
     },
     {
      "text": "نزّ",
      "role": "root",
      "gloss": "send down"
     },
     {
      "text": "لُ",
      "role": "verbSuffix",
      "gloss": "imperfect"
     }
    ],
    "note": "In the imperfect, Form II still shows its identity by the doubled middle letter (زّ), even when the word begins with يـ."
   },
   {
    "word": "أُنزِلَ",
    "blocks": [
     {
      "text": "أُ",
      "role": "verbPrefix",
      "gloss": "was (IV)"
     },
     {
      "text": "نز",
      "role": "root",
      "gloss": "sent down"
     },
     {
      "text": "لَ",
      "role": "verbSuffix",
      "gloss": "passive"
     }
    ],
    "note": "The initial أُ plus the overall shape signals passive Form IV: “was sent down,” shifting focus to the revealed thing."
   }
  ],
  "examples": [
   {
    "arabic": "بِمَآ أُنزِلَ إِلَيْكَ",
    "ref": "2:4",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "مَآ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أُ",
      "role": "verbPrefix"
     },
     {
      "text": "نز",
      "role": "root"
     },
     {
      "text": "لَ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَيْ",
      "role": "preposition"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "in/with what was-sent-down to-you",
    "smooth": "…in what has been sent down to you.",
    "whatChanged": "Same Form IV meaning, but in the passive (أُنزِلَ): it spotlights the revelation itself (“what was sent down”), not the sender."
   },
   {
    "arabic": "لَنَزَّلْنَا عَلَيْهِم",
    "ref": "17:95",
    "surah": "Sūrat Al-Israa",
    "segments": [
     {
      "text": "لَ",
      "role": "particle"
     },
     {
      "text": "نَزّ",
      "role": "root"
     },
     {
      "text": "لْنَا",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَلَيْ",
      "role": "preposition"
     },
     {
      "text": "هِم",
      "role": "attachedPronoun"
     }
    ],
    "literal": "surely-we-would-send-down-gradually upon-them",
    "smooth": "We would certainly have sent down upon them…",
    "whatChanged": "Now it’s Form II (نَزَّلَ): the doubled middle letter (زّ) signals a staged/portioning sense, not merely “from above.”"
   },
   {
    "arabic": "يُنَزِّلُ لَكُم مِّنَ",
    "ref": "40:13",
    "surah": "Sūrat Ghafir",
    "segments": [
     {
      "text": "يُ",
      "role": "verbPrefix"
     },
     {
      "text": "نَزّ",
      "role": "root"
     },
     {
      "text": "لُ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَ",
      "role": "preposition"
     },
     {
      "text": "كُم",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مِّنَ",
      "role": "preposition"
     }
    ],
    "literal": "he-sends-down-gradually for-you from",
    "smooth": "He sends down for you—from (the sky)…",
    "whatChanged": "Form II appears in the present/imperfect (يُنَزِّلُ): the ongoing form pairs naturally with the idea of repeated provision in portions."
   },
   {
    "arabic": "وَأَنزَلْنَا مِنَ ٱلسَّمَآءِ",
    "ref": "23:18",
    "surah": "Sūrat Al-Muminoon",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "أَ",
      "role": "verbPrefix"
     },
     {
      "text": "نز",
      "role": "root"
     },
     {
      "text": "لْنَا",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مِنَ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلسَّمَآءِ",
      "role": "plain"
     }
    ],
    "literal": "and-we-sent-down from the-sky",
    "smooth": "And We sent down from the sky…",
    "whatChanged": "Back to Form IV (أَنْزَلَ): even outside revelation (rain here), the form still frames the action as a single sending-down event rather than a staged delivery."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse Form IV hamzah (أَنْزَلَ / أُنزِلَ) with “just an أ at the start.”",
    "example": "أَنزَلْنَا vs نَزَّلْنَا",
    "note": "In this root, the hamzah is the form-marker that changes meaning (single-act framing). If there’s no hamzah but there is a shadda on زّ, you are in Form II (gradual/staged)."
   },
   {
    "claim": "Don’t confuse “gradually sent down” (Form II) with “repeatedly came down” (Form V).",
    "example": "نَزَّلَ vs تَنَزَّلَ",
    "note": "Both can imply ‘more than once,’ but differently: Form II is about delivery in portions/stages; Form V is about repeated descent/arrival (often of something coming down again and again). Look for initial تَـ as the extra marker for Form V."
   },
   {
    "claim": "Don’t miss the passive: أُنزِلَ is not a different root, and it’s not “we sent down.”",
    "example": "أُنزِلَ إِلَيْكَ",
    "note": "The passive keeps the idea ‘was sent down’ while removing the doer from the verb. In reading, it often pairs with ‘to you / to them’ and focuses attention on the revealed content."
   }
  ],
  "checklist": [
   "When you see ن-ز-ل, pause: is there an initial hamzah (أَ / أُ) or not?",
   "If you see initial أَ / أُ, treat it as Form IV: single-act framing; then check if it’s passive (often أُنزِلَ).",
   "If you see a shadda on the middle root letter (زّ), treat it as Form II: staged/gradual sending down.",
   "If you see both تَـ at the start and the doubled middle (زّ), it’s Form V: repeated descending/coming down.",
   "Notice attached pronouns (ـهُ, ـكَ, ـهِم) to know what is being sent down and to whom.",
   "Use nearby prepositions (إِلَى, عَلَى, مِنْ) to map direction: to you, upon them, from the sky—then let the verb form tell you the kind of ‘sending down.’"
  ],
  "summary": [
   "Rule: With ن-ز-ل, Form IV (أَنْزَلَ/أُنزِلَ) = a single sending-down act; Form II (نَزَّلَ/يُنَزِّلُ) = gradual, in stages; Form V (تَنَزَّلَ) = repeated descent.",
   "What it looks like: hamzah at the start (أَ/أُ) vs shadda on زّ, and sometimes an extra initial تَـ.",
   "What you can now do: read two verses that English translates the same (‘sent down’) and still catch what claim the Arabic is making by the form alone."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets with ن-ز-ل and ask you to identify whether the form is IV or II (and what meaning difference that implies)."
 },
 {
  "id": "why-meanings-drift",
  "n": 16,
  "title": "When a form does not mean what the table says",
  "stage": "The patterns",
  "level": "A2",
  "structure": "Form III adds interaction, Form VI adds mutuality — but roots also grow idioms, and a derived form can settle into a meaning you would not predict. نَازَلَ is confrontation rather than just \"descend at someone\"; تَنَازَلَ is mutual yielding. The template tells you the direction of travel, not the destination.",
  "whyItMatters": "Knowing the table is not the same as knowing the words, and expecting the table to be exact is how people conclude the system does not work. It works as a strong hint.",
  "canDo": "After this lesson you can treat Form III and Form VI as meaning-hints (interaction vs mutuality) while still checking the Qur’anic word’s settled sense in context, so you don’t force a “table meaning” onto a real ayah.",
  "rule": "Form III often points toward involvement/engagement with something or someone, and Form VI often points toward mutuality or back-and-forth among multiple sides. But a derived form can become an idiom: the template shows a direction of travel, not the final destination. So you read the form as a strong clue, then confirm with the immediate context and the Qur’an’s usage of that lemma.",
  "why": [
   "Prevents reading يُجَٰهِدُوا۟ as “they mutually fight” (Form III ≠ always “two-sided”), when the ayah is about exerting effort in Allah’s path.",
   "Prevents assuming يَتَسَآءَلُونَ means merely “they ask” (Form VI signals reciprocal questioning), which changes the scene in dialogue-heavy passages.",
   "Prevents dismissing Arabic morphology as “inconsistent” when a form develops a specialized Qur’anic sense (the system is a hint-system, not a dictionary).",
   "Prevents missing number/participants: Form VI often implies “among themselves,” which affects who is doing what to whom."
  ],
  "pattern": {
   "caption": "Form is a clue: III tends to add engagement; VI tends to add mutual back-and-forth. Then the Qur’an’s usage narrows it.",
   "columns": [
    "Form",
    "Template hint (not a promise)",
    "Typical Qur’anic reading here"
   ],
   "rows": [
    [
     "III (فَاعَلَ / يُفَاعِلُ)",
     "engage with / involve oneself",
     "جَاهَدَ = strive/exert effort (not necessarily “against someone”)"
    ],
    [
     "VI (تَفَاعَلَ / يَتَفَاعَلُ)",
     "mutual, among one another",
     "تَسَاءَلَ = question one another (back-and-forth)"
    ],
    [
     "III + بِـ object",
     "engagement using means",
     "جَٰهِدُوا۟ بِأَمْوَٰلِهِمْ… = strive with wealth/lives"
    ],
    [
     "VI without stated object",
     "reciprocal action is inside the group",
     "يَتَسَآءَلُونَ = they are asking each other"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "يُجَٰهِدُوا۟",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "they (verb)"
     },
     {
      "text": "جَٰهِد",
      "role": "root",
      "gloss": "strive hard"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they (plural)"
     }
    ],
    "note": "Prefix يـ and suffix ـوا show a plural imperfect verb; the core جَٰهِد signals Form III activity (engagement), not automatically “mutual fighting.”"
   },
   {
    "word": "جَٰهِدُوا۟",
    "blocks": [
     {
      "text": "جَٰهِد",
      "role": "root",
      "gloss": "strive hard"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "you (plural)"
     }
    ],
    "note": "An imperative plural: the same Form III core, but now as a command; don’t force a two-party reading."
   },
   {
    "word": "يَتَسَآءَلُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "they (verb)"
     },
     {
      "text": "تَ",
      "role": "verbPrefix",
      "gloss": "Form VI t-"
     },
     {
      "text": "سَآءَل",
      "role": "root",
      "gloss": "ask questions"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "they (plural)"
     }
    ],
    "note": "The extra تَ after the initial يـ is the loud visual signal of Form VI; it often carries “among one another.”"
   },
   {
    "word": "عَمَّ",
    "blocks": [
     {
      "text": "عَنْ",
      "role": "preposition",
      "gloss": "about"
     },
     {
      "text": "ما",
      "role": "particle",
      "gloss": "what?"
     }
    ],
    "note": "Written fused in the muṣḥaf as عَمَّ: it’s عَنْ + ما, setting up the question that follows."
   }
  ],
  "examples": [
   {
    "arabic": "وَجَٰهِدُوا۟ فِى سَبِيلِهِۦ",
    "ref": "5:35",
    "surah": "Sūrat Al-Maaida",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "جَٰهِد",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "سَبِيل",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     },
     {
      "text": "هۦ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and strive you(pl) in path-of Him",
    "smooth": "And strive in His path.",
    "whatChanged": "You see Form III used as a command of committed striving, without any “two opponents” being required by the form."
   },
   {
    "arabic": "أَن يُجَٰهِدُوا۟ بِأَمْوَٰلِهِمْ",
    "ref": "9:44",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "أَن",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يُ",
      "role": "verbPrefix"
     },
     {
      "text": "جَٰهِد",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "أَمْوَٰل",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     },
     {
      "text": "هِمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "that they strive with their-wealth",
    "smooth": "…to strive with their wealth…",
    "whatChanged": "The بِـ phrase shows the ‘means’ of striving; the form hints engagement, while the context specifies how (with wealth)."
   },
   {
    "arabic": "وَجَٰهَدُوا۟ مَعَكُمْ",
    "ref": "8:75",
    "surah": "Sūrat Al-Anfaal",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "جَٰهَد",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مَعَ",
      "role": "preposition"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and they strove with-you(pl)",
    "smooth": "…and they strove alongside you.",
    "whatChanged": "The companion preposition مَعَكُمْ steers you away from reading Form III as “against”: here it’s clearly ‘together with’."
   },
   {
    "arabic": "فَهُمْ لَا يَتَسَآءَلُونَ",
    "ref": "28:66",
    "surah": "Sūrat Al-Qasas",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "تَ",
      "role": "verbPrefix"
     },
     {
      "text": "سَآءَل",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "so they not they-mutually-question",
    "smooth": "So they will not question one another.",
    "whatChanged": "Form VI (the extra تَ) adds the ‘among themselves’ sense; it’s not merely ‘they do not ask.’"
   },
   {
    "arabic": "يَتَسَآءَلُونَ",
    "ref": "37:27",
    "surah": "Sūrat As-Saaffaat",
    "segments": [
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "تَ",
      "role": "verbPrefix"
     },
     {
      "text": "سَآءَل",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "they mutually-question",
    "smooth": "They begin questioning one another.",
    "whatChanged": "With no object stated, Form VI itself supplies the missing participant-structure: the questioning is back-and-forth within the group."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse Form VI تَسَاءَلَ (ask one another) with a plain ‘ask’ reading that ignores mutuality.",
    "example": "يَتَسَآءَلُونَ",
    "note": "The extra تَ is not decoration: it often means the action is happening within a group, back-and-forth. In scenes of confusion or conversation, that changes the picture you imagine."
   },
   {
    "claim": "Don’t force Form III to mean ‘two-sided combat’ every time.",
    "example": "وَجَٰهِدُوا۟ فِى سَبِيلِهِۦ",
    "note": "Form III is an engagement-hint: exert yourself seriously. The prepositional phrases (فِى سَبِيل… / بِأَمْوَٰل… / مَعَكُمْ) tell you the intended direction: in Allah’s path, with resources, alongside believers."
   },
   {
    "claim": "Don’t treat the form-table as a dictionary entry.",
    "example": "أَن يُجَٰهِدُوا۟ بِأَمْوَٰلِهِمْ",
    "note": "The form narrows possibilities, but Qur’anic usage and context finish the job. If you demand a perfectly literal ‘template meaning,’ you will think the system failed—when actually you asked it to do the dictionary’s job."
   }
  ],
  "checklist": [
   "Spot the form marker first: Form VI usually shows a visible تَ after the initial imperfect prefix (يَتَ…); Form III often shows a long vowel pattern inside the verb (like جَاهَدَ).",
   "Then ask: does the scene require multiple sides interacting (Form VI), or is it one party committing effort/engagement (often Form III)?",
   "Look immediately to the nearest prepositions: فِى (in), بِـ (with/by), مَعَ (with). They often tell you the “direction of travel” of the verb.",
   "If Form VI appears with no object, default to ‘among themselves / one another’ unless the context clearly supplies a different partner.",
   "If a literal template reading produces nonsense (“descend at someone,” “ask oneself” when the passage is a crowd), keep the form as a hint and let Qur’anic usage decide the settled sense.",
   "Build a mental note: some derived-form lemmas become specialized; your job is recognition + the Qur’an’s meaning, not enforcing a mechanical gloss."
  ],
  "summary": [
   "Rule: Form III and VI give you a reliable nudge (engagement vs mutuality), but not a guaranteed dictionary meaning.",
   "Look: Form VI often shows يَتَ… and tends to read ‘one another’; Form III like جَاهَدَ often reads ‘strive/exert’ with context filling in how/with what/with whom.",
   "Now: you can read Qur’anic Form III/VI verbs without over-literalizing the template, and you can use nearby prepositions to lock in the intended sense."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether the key verb is Form III or VI, and whether the context requires ‘engagement’ or ‘mutual among themselves’—without translating every word."
 },
 {
  "id": "hollow-verbs",
  "n": 17,
  "title": "Why ق و ل loses its و",
  "stage": "The patterns",
  "level": "A2",
  "structure": "A root whose MIDDLE letter is و or ي is hollow (أَجْوَف), and that weak letter does not survive every pattern. قَوَلَ is not a word; the و collapses into a long vowel and you get قَالَ. Form IV أَقْوَلَ becomes أَقَالَ. The root is still ق و ل — it is just not visible in the surface form. Same for ك و ن → كَانَ, ب ي ع → بَاعَ.",
  "whyItMatters": "You asked this directly, and it is the single commonest reason a word refuses to match any root you know. قَالَ is one of the most frequent verbs in the Qur'an and it does not look like its own root.",
  "canDo": "After this lesson you can recognize when a Qur’anic verb is from a hollow root (أجوف) even though the middle و/ي has “disappeared” and turned into a long vowel.",
  "rule": "If a triliteral root’s MIDDLE letter is و or ي, it is “hollow” (أجوف). In many common patterns, that weak middle letter does not appear as a normal consonant: it collapses into a long vowel (often ا) or changes shape. So ق و ل can surface as قَالَ (not *قَوَلَ), and the root is still there even when you cannot see the و/ي on the page.",
  "why": [
   "Prevents the “I can’t find the root” failure when you meet قَالَ and it doesn’t visually match ق و ل.",
   "Stops you from inventing a fake root like ق ا ل (treating the long vowel as an original letter) and then missing related words like قُلْ.",
   "Helps you connect different-looking forms in the same family: قَالَ (he said) and قُلْ (say!) are the same root, not two separate verbs.",
   "Keeps you from assuming the mushaf has a spelling irregularity—this is a regular weak-letter behavior, not randomness."
  ],
  "pattern": {
   "caption": "Hollow roots: the middle و/ي often collapses into a long vowel, especially in the “he did” past form",
   "columns": [
    "Underlying root",
    "What you expect if all letters stayed",
    "What you actually see in Qur’an"
   ],
   "rows": [
    [
     "ق و ل",
     "*قَوَلَ",
     "قَالَ / قُلْ"
    ],
    [
     "ك و ن",
     "*كَوَنَ",
     "كَانَ / يَكُن"
    ],
    [
     "ب ي ع",
     "*بَيَعَ",
     "بَاعَ"
    ],
    [
     "ق و ل (Form IV idea)",
     "*أَقْوَلَ",
     "أَقَالَ (same root, weak middle)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "قَالَ",
    "blocks": [
     {
      "text": "ق",
      "role": "root",
      "gloss": "root letter"
     },
     {
      "text": "ا",
      "role": "plain",
      "gloss": "long vowel"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "root letter"
     }
    ],
    "note": "The long ا is where the middle و would have been; the root is still ق و ل even though only ق and ل are visible as consonants."
   },
   {
    "word": "قُلْ",
    "blocks": [
     {
      "text": "ق",
      "role": "root",
      "gloss": "root letter"
     },
     {
      "text": "ُ",
      "role": "plain",
      "gloss": "u-vowel"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "root letter"
     }
    ],
    "note": "In the imperative, the middle weak letter is not written; you still read it as the same root family (ق و ل)."
   },
   {
    "word": "قُلُوبِهِمْ",
    "blocks": [
     {
      "text": "قُلُوب",
      "role": "root",
      "gloss": "hearts (ق-ل-ب)"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "i-ending"
     },
     {
      "text": "هِمْ",
      "role": "attachedPronoun",
      "gloss": "their"
     }
    ],
    "note": "Split between the base noun and the attached pronoun; this is here to stop you from mistaking ق-ل-ب ‘heart’ for ق-و-ل ‘say’ just because both begin with ق."
   },
   {
    "word": "يَكُن",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he/it (imperfect)"
     },
     {
      "text": "ك",
      "role": "root",
      "gloss": "root letter"
     },
     {
      "text": "ن",
      "role": "root",
      "gloss": "root letter"
     }
    ],
    "note": "The missing middle و of ك و ن is not a typo; it is a normal hollow-root surface form."
   }
  ],
  "examples": [
   {
    "arabic": "وَقَالَ يَٰبَنِىَّ",
    "ref": "12:67",
    "surah": "Sūrat Yusuf",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ق",
      "role": "root"
     },
     {
      "text": "ا",
      "role": "plain"
     },
     {
      "text": "لَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَٰبَنِىَّ",
      "role": "plain"
     }
    ],
    "literal": "and-he_said O-my_sons",
    "smooth": "And he said, “O my sons…”",
    "whatChanged": "You see قَالَ in the wild: only ق and ل look like root letters, while the missing middle و has collapsed into the long vowel ا."
   },
   {
    "arabic": "قَالَ خُذْهَا",
    "ref": "20:21",
    "surah": "Sūrat Taa-Haa",
    "segments": [
     {
      "text": "ق",
      "role": "root"
     },
     {
      "text": "ا",
      "role": "plain"
     },
     {
      "text": "لَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "خُذْ",
      "role": "plain"
     },
     {
      "text": "هَا",
      "role": "attachedPronoun"
     }
    ],
    "literal": "he_said take-it",
    "smooth": "He said, “Take it.”",
    "whatChanged": "This adds an attached pronoun (هَا) so you practice not treating every extra letter as part of the root; قَالَ is still from ق و ل."
   },
   {
    "arabic": "فَقَالَ لَهُمْ",
    "ref": "91:13",
    "surah": "Sūrat Ash-Shams",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "ق",
      "role": "root"
     },
     {
      "text": "ا",
      "role": "plain"
     },
     {
      "text": "لَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَ",
      "role": "preposition"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "so-he_said to-them",
    "smooth": "So he said to them…",
    "whatChanged": "You now see the same hollow-root verb after a particle (فَـ) and followed by a preposition+pronoun (لَهُمْ), which are common ‘frames’ around قَالَ in Qur’anic narration."
   },
   {
    "arabic": "قُلْ أَغَيْرَ",
    "ref": "6:14",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "ق",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "plain"
     },
     {
      "text": "لْ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَغَيْرَ",
      "role": "plain"
     }
    ],
    "literal": "say other-than",
    "smooth": "Say: “Other than…”",
    "whatChanged": "This is the same root ق و ل in a different surface form (قُلْ): the weak middle letter is not written, yet it’s still the ‘say’ family you must connect to قَالَ."
   },
   {
    "arabic": "وَلَمْ يَكُن",
    "ref": "17:111",
    "surah": "Sūrat Al-Israa",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَمْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "ك",
      "role": "root"
     },
     {
      "text": "ن",
      "role": "root"
     }
    ],
    "literal": "and not he_be",
    "smooth": "And there has not been / and he was not…",
    "whatChanged": "A second hollow root appears: ك و ن shows up as يَكُن with the middle و gone; recognizing this pattern generalizes beyond ق و ل."
   }
  ],
  "traps": [
   {
    "claim": "Don’t treat the long vowel ا in قَالَ as a permanent root letter",
    "example": "قَالَ",
    "note": "If you decide the root is ق ا ل, you won’t connect it to قُلْ. In hollow roots, the long vowel often represents a collapsed و/ي, not an original ‘real’ middle consonant."
   },
   {
    "claim": "Don’t confuse the root ق و ل (say) with the noun قُلُوب (hearts)",
    "example": "قَالَ vs قُلُوبِهِمْ",
    "note": "They can look similar to beginners because both start with ق and have a ‘u/ā’ sound nearby. But قُلُوب is from ق ل ب (heart), and قَالَ/قُلْ are from ق و ل (say). Use meaning and visible consonants to separate families."
   },
   {
    "claim": "Don’t assume ‘missing letters’ means you misread the script",
    "example": "يَكُن",
    "note": "You may look for كَوْن or something with a visible و. In hollow roots, the weak middle letter routinely vanishes or turns into a vowel depending on the pattern; that is the rule, not an exception."
   }
  ],
  "checklist": [
   "When a very common verb seems to have only two strong consonants (like ق…ل in قَالَ), suspect a hollow root.",
   "Ask: could the hidden middle consonant be و or ي? If yes, try a known hollow family: ق و ل, ك و ن, ب ي ع, etc.",
   "Look for a sibling form nearby in your memory: قَالَ often pairs conceptually with قُلْ; كَانَ pairs with يَكُن. Different shapes, same root.",
   "Do not ‘lock in’ the long vowel (ا) as a root letter until you’ve checked whether the root is weak in the middle.",
   "Use the frame words to keep orientation: particles like وَ / فَ and prepositions like لَ plus pronouns (لَهُمْ) are add-ons, not root material."
  ],
  "summary": [
   "Rule: if the middle root letter is و/ي (أجوف), it may collapse into a long vowel or disappear in some patterns.",
   "Look: قَالَ shows the outer root letters (ق…ل) while the middle و is hidden; قُلْ is the same root with the weak letter not written.",
   "You can now connect high-frequency Qur’anic forms that ‘don’t match their root’ at first glance, especially the ق و ل family."
  ],
  "quizBridge": "The quiz will show you short Qur’anic snippets and ask you to spot hollow-root verbs and identify the underlying root (e.g., linking قَالَ and قُلْ to ق و ل, and يَكُن to ك و ن)."
 },
 {
  "id": "form-2-teach-or-intensify",
  "n": 18,
  "title": "Form II: sometimes \"teach\", sometimes \"do it hard\"",
  "stage": "The patterns",
  "level": "A2",
  "structure": "Form II strengthens the base — but strengthening shows up two ways depending on the verb. On a verb that already takes an object, it tends to intensify or repeat: فَسَّدَ, corrupted thoroughly. On one that does not, it tends to add a doer: عَلِمَ he knew → عَلَّمَ he made someone know, taught. قَرَّأَ is \"made someone read\", not \"read a lot\", because قَرَأَ already had an object.",
  "whyItMatters": "You spotted this inconsistency yourself and it is a real one. The answer is transitivity, which is the next two lessons — and once you have it, Form II stops being arbitrary.",
  "canDo": "After this lesson you can spot a Form II verb (فَعَّلَ) in the muṣḥaf and decide whether it likely means “do intensely/repeatedly” or “make someone do/know” by checking whether the base verb already takes an object.",
  "rule": "Form II (فَعَّلَ) strengthens the base meaning, but that strengthening shows up in two common ways. If the base verb already takes a direct object, Form II often intensifies or repeats the action (e.g., “deny thoroughly / keep denying”). If the base verb does not take an object, Form II often makes it transitive: it adds a doer-to-someone effect (e.g., “cause to know” = teach).",
  "why": [
   "Prevents reading كَذَّبُوا۟ as merely “they lied” instead of the Qur’anic idea “they declared (it) false / rejected,” often with force or persistence.",
   "Stops you from expecting every Form II to mean “a lot” and missing the “make someone…” sense when the base verb is intransitive (a key issue you will formalize in the next lessons on transitivity).",
   "Helps you interpret passive Form II like كُذِّبَتْ: not “she/it lied,” but “it was declared false / rejected.”",
   "Keeps you from losing the object: Form II often implies an object is being acted upon (signaled in the verse by بِـ or an explicit noun)."
  ],
  "pattern": {
   "caption": "Form II (فَعَّلَ): same form, two common outcomes depending on the base verb",
   "columns": [
    "Base (idea)",
    "Form II signal",
    "Most likely Qur’anic sense"
   ],
   "rows": [
    [
     "Verb already takes an object",
     "middle letter doubled (شَدَّة)",
     "intensify / repeat the action on that object"
    ],
    [
     "Verb does NOT take an object",
     "middle letter doubled (شَدَّة)",
     "make someone do/know/be (causative, adds an object)"
    ],
    [
     "Often appears with بِـ + what’s rejected/denied",
     "كَذَّبَ + بِـ",
     "declare false / reject (not just “lie”)"
    ],
    [
     "Can appear in passive",
     "كُذِّبَ / كُذِّبَتْ",
     "was rejected / was declared false"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "كَذَّبُوا۟",
    "blocks": [
     {
      "text": "كَذَّب",
      "role": "root",
      "gloss": "declare false"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they (did)"
     }
    ],
    "note": "The doubled middle consonant (ذّ) is the Form II flag; وا۟ is the 3rd person plural past ending."
   },
   {
    "word": "كُذِّبَتْ",
    "blocks": [
     {
      "text": "كُذِّب",
      "role": "root",
      "gloss": "was rejected"
     },
     {
      "text": "تْ",
      "role": "verbSuffix",
      "gloss": "she/it (f.)"
     }
    ],
    "note": "Same Form II doubling, but with passive vowels (كُـ…ـِّـ) and a feminine ending تْ."
   },
   {
    "word": "يَعْلَمُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "they (do)"
     },
     {
      "text": "عْلَم",
      "role": "root",
      "gloss": "know"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "plural"
     }
    ],
    "note": "Not Form II: no shadda. Included so you contrast Form I/regular patterns with Form II doubling."
   },
   {
    "word": "تَعْلَمُونَ",
    "blocks": [
     {
      "text": "تَ",
      "role": "verbPrefix",
      "gloss": "you (pl.)"
     },
     {
      "text": "عْلَم",
      "role": "root",
      "gloss": "know"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "plural"
     }
    ],
    "note": "Also not Form II: the lesson needs you to notice when the middle letter is NOT doubled, so you don’t hallucinate Form II meanings."
   }
  ],
  "examples": [
   {
    "arabic": "وَكَذَّبُوا۟ بِـَٔايَٰتِنَآ",
    "ref": "2:39",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "كَذَّبُوا۟",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بِـ",
      "role": "preposition"
     },
     {
      "text": "َٔايَٰتِنَآ",
      "role": "plain"
     }
    ],
    "literal": "and-they-declared-false / in-Our-signs",
    "smooth": "And they rejected Our signs.",
    "whatChanged": "You see Form II doubling (كَذَّبُوا۟) and the object introduced by بِـ, pushing the meaning toward “reject/declare false,” not merely “lie.”"
   },
   {
    "arabic": "وَلَقَدْ كُذِّبَتْ رُسُلٌۭ",
    "ref": "6:34",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَ",
      "role": "particle"
     },
     {
      "text": "قَدْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كُذِّبَتْ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رُسُلٌۭ",
      "role": "plain"
     }
    ],
    "literal": "and / certainly / indeed / were-declared-false (f.) / messengers",
    "smooth": "Messengers were certainly rejected (before you).",
    "whatChanged": "Same Form II idea, but now in the passive: it’s not about who did the rejecting, but that rejection happened to the messengers."
   },
   {
    "arabic": "ٱلَّذِينَ كَذَّبُوا۟ شُعَيْبًۭا",
    "ref": "7:92",
    "surah": "Sūrat Al-A'raaf",
    "segments": [
     {
      "text": "ٱلَّذِينَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَذَّبُوا۟",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "شُعَيْبًۭا",
      "role": "plain"
     }
    ],
    "literal": "those-who / declared-false / Shuʿayb",
    "smooth": "Those who rejected Shuʿayb…",
    "whatChanged": "The object is direct (a person), not بِـ + “signs,” showing that Form II can take a clear object and still carries the forceful “deny/reject” sense."
   },
   {
    "arabic": "كَذَبُوا۟ ٱللَّهَ وَرَسُولَهُۥ",
    "ref": "9:90",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "كَذَب",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "رَسُولَ",
      "role": "plain"
     },
     {
      "text": "هُۥ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "they-lied / Allah / and / His-messenger",
    "smooth": "They lied to Allah and His Messenger.",
    "whatChanged": "This is Form I (no shadda): it helps you feel the contrast between كَذَبُوا۟ (they lied) and كَذَّبُوا۟ (they declared false/rejected)."
   },
   {
    "arabic": "وَلَٰكِن لَّا يَعْلَمُونَ",
    "ref": "2:13",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَٰكِن",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَّا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "عْلَم",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "but / not / they-know",
    "smooth": "But they do not know.",
    "whatChanged": "You anchor the base meaning عَلِمَ/يَعْلَمُ “to know” (no doubling), preparing you to understand why the doubled version عَلَّمَ becomes “make someone know” (teach) when the base doesn’t naturally take an object."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse Form I كَذَبَ (to lie) with Form II كَذَّبَ (to declare false / reject).",
    "example": "كَذَبُوا۟ / كَذَّبُوا۟",
    "note": "The shadda (َّ) is not decoration: it often marks a different form and a different relationship to an object. In Qur’anic usage, كَذَّبَ commonly means rejecting a message/person/signs."
   },
   {
    "claim": "Don’t assume Form II always means “do a lot.”",
    "example": "عَلِمَ → عَلَّمَ",
    "note": "On an intransitive base (“know”), Form II frequently adds an object: “make someone know.” This lesson is the bridge to transitivity: the same shape, but the verb’s ‘needs’ decide the meaning."
   },
   {
    "claim": "Don’t miss the passive: Form II can show up as something that happened to them.",
    "example": "كُذِّبَتْ",
    "note": "Passive vowels plus Form II doubling means “was rejected/declared false,” not “she lied.” If you read it actively, the whole sentence flips."
   }
  ],
  "checklist": [
   "Scan for a shadda on the 2nd root letter inside a verb: that is your Form II alarm.",
   "Locate the object: is there a direct noun after it, or a بِـ phrase (common with كَذَّبَ)?",
   "Ask: does the base meaning naturally take an object? (know = no; reject/declare false = yes).",
   "If the base already takes an object, lean toward “more intensely / repeatedly.”",
   "If the base doesn’t take an object, lean toward “cause/make someone…” (added object).",
   "Check whether the verb is passive-looking (like كُذِّبَتْ): then translate as “was …,” not “did ….”"
  ],
  "summary": [
   "Rule: Form II strengthens the base; if the base is already transitive it often intensifies, but if the base is intransitive it often becomes causative (adds an object).",
   "Look: the key visual cue is the shadda on the middle root letter (e.g., كَذَّبُوا۟, كُذِّبَتْ).",
   "Now you can read common Qur’anic Form II words more accurately by checking what the verb is doing to its object (or by noticing it is passive)."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify the Form II verb and choose whether it reads as intensifying/rejecting or as “make someone…” based on the object and the presence of passive cues."
 },
 {
  "id": "transitive-intransitive",
  "n": 19,
  "title": "Verbs that need an object, and verbs that do not",
  "stage": "Who does what to whom",
  "level": "A2",
  "structure": "A TRANSITIVE verb (مُتَعَدٍّ) needs something to receive the action: قَرَأَ ٱلْكِتَابَ, he read the book — \"he read\" alone is unfinished. An INTRANSITIVE verb (لَازِم) is complete on its own: جَلَسَ, he sat. The test is whether you can ask \"what?\" and expect an answer.",
  "whyItMatters": "This is what makes the verb forms predictable rather than a list of exceptions. Whether a form causes, intensifies or reflects depends on what the base verb already did.",
  "canDo": "After this lesson you can tell, while reading, whether a Qur’anic verb is complete by itself or needs an object—and you can look for that object in the words right after it.",
  "rule": "Some verbs are مُتَعَدٍّ (transitive): the action must land on something, so you should be able to ask “what?” and expect an answer (an object). Other verbs are لَازِم (intransitive): the verb is already complete, and “what?” does not make sense unless the verse adds extra information like a prepositional phrase. In reading, this helps you predict what kinds of words will follow the verb (an object noun/pronoun, or not).",
  "why": [
   "Prevents you from stopping too early: you see خَلَقَ and you keep reading until you find what was created.",
   "Prevents a common misread where a following prepositional phrase is mistaken as the object (e.g., بِـ usually signals “with/by,” not the direct object).",
   "Helps you track pronoun objects: if the object is “hidden” inside the verb (ـهُ), you won’t keep hunting for a separate noun.",
   "Makes form-meaning more predictable later: when a derived form ‘causes’ or ‘makes’ something happen, it often turns an intransitive idea into a transitive one (or adds an extra object)."
  ],
  "pattern": {
   "caption": "Quick reading test: can you ask “what?” after the verb?",
   "columns": [
    "Verb type",
    "Reading test",
    "What you expect next"
   ],
   "rows": [
    [
     "مُتَعَدٍّ (transitive)",
     "You can ask: “did what?”",
     "An object noun/pronoun (often right after)"
    ],
    [
     "لَازِم (intransitive)",
     "“what?” feels unfinished/odd",
     "No required object; may take a preposition phrase"
    ],
    [
     "Transitive with pronoun object",
     "Object may be inside the verb (ـهُ / ـهم)",
     "You may NOT see a separate noun object"
    ],
    [
     "Passive-like receiving (أُوتِىَ)",
     "The receiver can appear as attached pronoun (نُؤْتَى)",
     "Look for “given to” meaning; object logic shifts"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "خَلَقَكُمْ",
    "blocks": [
     {
      "text": "خَلَقَ",
      "role": "root",
      "gloss": "created"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun",
      "gloss": "you all"
     }
    ],
    "note": "The verb is transitive; the object is not a separate word here—it's the attached pronoun كُمْ."
   },
   {
    "word": "يَبْدَؤُا۟",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he (imperfect)"
     },
     {
      "text": "بْدَؤُا۟",
      "role": "root",
      "gloss": "begins"
     }
    ],
    "note": "The prefix يَ signals an imperfect verb; then you check whether it needs an object (here it does)."
   },
   {
    "word": "يُعِيدُهُۥ",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "he (imperfect)"
     },
     {
      "text": "عِيدُ",
      "role": "root",
      "gloss": "returns/repeats"
     },
     {
      "text": "هُۥ",
      "role": "attachedPronoun",
      "gloss": "it"
     }
    ],
    "note": "The attached pronoun هُۥ is the direct object; don’t expect another object noun after it."
   },
   {
    "word": "نَجَّيْنَا",
    "blocks": [
     {
      "text": "نَ",
      "role": "verbPrefix",
      "gloss": "we (past)"
     },
     {
      "text": "جَّيْ",
      "role": "root",
      "gloss": "saved"
     },
     {
      "text": "نَا",
      "role": "verbSuffix",
      "gloss": "we"
     }
    ],
    "note": "This verb typically takes an object (who was saved), which often comes right after as a noun."
   },
   {
    "word": "ٱلْخَلْقَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "خَلْقَ",
      "role": "nounEnding",
      "gloss": "creation (object)"
     }
    ],
    "note": "The final ـَ (fatḥa) is a key signal for a direct object in many common readings: the verb ‘did’ something to it."
   }
  ],
  "examples": [
   {
    "arabic": "ٱعْبُدُوا۟ رَبَّكُمُ",
    "ref": "2:21",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "ٱعْبُدُوا۟",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَبَّ",
      "role": "nounEnding"
     },
     {
      "text": "كُمُ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "worship (you all) / your-Lord",
    "smooth": "Worship your Lord.",
    "whatChanged": "This shows a clearly transitive verb: you can ask “worship what/whom?” and the object is right there (رَبَّكُمُ)."
   },
   {
    "arabic": "خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ",
    "ref": "14:32",
    "surah": "Sūrat Ibrahim",
    "segments": [
     {
      "text": "خَلَقَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "plain"
     },
     {
      "text": "سَّمَٰوَٰتِ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱلْ",
      "role": "plain"
     },
     {
      "text": "أَرْضَ",
      "role": "nounEnding"
     }
    ],
    "literal": "created / the-heavens / and / the-earth",
    "smooth": "He created the heavens and the earth.",
    "whatChanged": "This adds the idea that a transitive verb can take more than one object joined by وَ (two things created)."
   },
   {
    "arabic": "خَلَقْنَٰكُمْ وَفِيهَا نُعِيدُكُمْ",
    "ref": "20:55",
    "surah": "Sūrat Taa-Haa",
    "segments": [
     {
      "text": "خَلَقْ",
      "role": "root"
     },
     {
      "text": "نَٰ",
      "role": "verbSuffix"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "فِى",
      "role": "preposition"
     },
     {
      "text": "هَا",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "نُ",
      "role": "verbPrefix"
     },
     {
      "text": "عِيدُ",
      "role": "root"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "We-created-you all / and / in-it / We-return-you all",
    "smooth": "We created you, and in it We return you.",
    "whatChanged": "This shows two ways the object can appear: attached pronoun objects (كُمْ) and a prepositional phrase (فِيهَا) that is not the direct object."
   },
   {
    "arabic": "يَبْدَؤُا۟ ٱلْخَلْقَ ثُمَّ يُعِيدُهُۥ",
    "ref": "30:11",
    "surah": "Sūrat Ar-Room",
    "segments": [
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "بْدَؤُا۟",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْخَلْقَ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ثُمَّ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يُ",
      "role": "verbPrefix"
     },
     {
      "text": "عِيدُ",
      "role": "root"
     },
     {
      "text": "هُۥ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "He-begins / the-creation / then / He-returns-it",
    "smooth": "He begins creation, then He repeats it.",
    "whatChanged": "This contrasts a visible object noun (ٱلْخَلْقَ) with an object pronoun (هُۥ): both satisfy a transitive verb’s ‘what?’ requirement."
   },
   {
    "arabic": "نَجَّيْنَا هُودًۭا وَٱلَّذِينَ ءَامَنُوا۟",
    "ref": "11:58",
    "surah": "Sūrat Hud",
    "segments": [
     {
      "text": "نَ",
      "role": "verbPrefix"
     },
     {
      "text": "جَّيْ",
      "role": "root"
     },
     {
      "text": "نَا",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "هُودًۭا",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱلَّذِينَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ءَامَنُوا۟",
      "role": "root"
     }
    ],
    "literal": "We-saved / Hūd / and / those / believed",
    "smooth": "We saved Hūd and those who believed.",
    "whatChanged": "This shows a transitive verb taking a person as its direct object, and then extending to a second group joined with وَ."
   },
   {
    "arabic": "وَجَآءَ رَبُّكَ",
    "ref": "89:22",
    "surah": "Sūrat Al-Fajr",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "جَآءَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَبُّ",
      "role": "nounEnding"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and / came / your-Lord",
    "smooth": "And your Lord comes.",
    "whatChanged": "This illustrates an intransitive pattern: you don’t ask “came what?” as an object; instead you identify who did the coming (the subject)."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a needed object with extra detail introduced by a preposition.",
    "example": "فِيهَا نُعِيدُكُمْ",
    "note": "نُعِيدُكُمْ already has its object (كُمْ = you). فِيهَا answers “where?”, not “what?”. Prepositions often add location/means, not direct objects."
   },
   {
    "claim": "Don’t assume the next noun is always an object; it might be the subject of an intransitive verb.",
    "example": "وَجَآءَ رَبُّكَ",
    "note": "Here رَبُّكَ is not ‘what he came’—it is who came. With an intransitive verb like جَآءَ, look for the doer (subject), not an object."
   },
   {
    "claim": "Don’t keep hunting for an object when the verb already contains it as a pronoun.",
    "example": "يُعِيدُهُۥ",
    "note": "هُۥ is the object: “returns it.” If you miss it, you may incorrectly force the next phrase into being the object and scramble the meaning."
   }
  ],
  "checklist": [
   "Circle the verb, then immediately ask in English: “Did what?” (what was done? to what?).",
   "If the question demands an answer, treat the verb as مُتَعَدٍّ and look for the object: (a) a noun right after, often with a clear ending like ـَ, or (b) an attached pronoun like ـهُ / ـكُمْ.",
   "If “what?” is unnatural, treat it as لَازِم and look instead for the subject (who/what did it).",
   "When you see a preposition (فِى، مِن، بِـ), assume it is adding context (where/from/with) unless the verb clearly requires that specific preposition for its meaning.",
   "When verbs are chained with وَ or ثُمَّ, repeat the test for each verb: each verb has its own object/subject expectations.",
   "If the object is a pronoun, mentally replace it with “it/them/you” and keep reading without expecting another direct-object noun."
  ],
  "summary": [
   "Rule: transitive verbs need an object you can ask “what?” about; intransitive verbs are complete without an object.",
   "Look: objects may be nouns (often clearly marked) or attached pronouns (ـهُ، ـكُمْ); intransitives often follow with the subject instead.",
   "Now you can read more reliably by knowing whether to search for “what was done” or simply identify “who did it,” without forcing the next phrase into the wrong role."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to label each verb as transitive or intransitive and point to where the object is (noun or attached pronoun) when it exists."
 },
 {
  "id": "two-objects",
  "n": 20,
  "title": "When one object becomes two",
  "stage": "Who does what to whom",
  "level": "A2",
  "structure": "A causative form can add a participant. عَلِمَ takes one object — he knew something. عَلَّمَ takes two — he taught SOMEONE SOMETHING: عَلَّمَ آدَمَ ٱلْأَسْمَاءَ, He taught Adam the names. Same with آتَىٰ, gave: آتَيْنَا مُوسَى ٱلْكِتَٰبَ. Two nouns in a row after the verb, both objects, no preposition between them.",
  "whyItMatters": "With two objects and nothing to separate them, word order and the endings are all you have. This is the first place where morphology and syntax genuinely need each other.",
  "canDo": "After this lesson you can spot when a Qur’anic verb takes two direct objects (someone + something) simply by noticing two nouns in a row with no preposition between them.",
  "rule": "Some verbs in the Qur’an can take two objects. The common Qur’anic pattern is: verb + recipient (object 1) + thing given/taught (object 2), with no preposition separating the two nouns. Form II often makes this happen (e.g., “teach”), but some verbs (like آتَىٰ “give”) already take two objects by meaning, so you must read the noun sequence, not just the form.",
  "why": [
   "Prevents reading the first noun after the verb as the subject (and flipping who did what to whom).",
   "Prevents forcing an invisible “to” into the translation when the Qur’an is actually using a direct object.",
   "Prevents mis-attaching later phrases (like مِن فَضْلِهِۦ) as if they were the recipient, when the recipient is already there.",
   "Helps you track “who received what” in long sentences, especially when the verb is followed by multiple nouns."
  ],
  "pattern": {
   "caption": "Two-object frame (no preposition): verb → recipient → thing",
   "columns": [
    "Verb (often causes / gives)",
    "Object 1 (who receives)",
    "Object 2 (what is given/taught)"
   ],
   "rows": [
    [
     "ءَاتَيْنَا",
     "مُوسَىٰ",
     "ٱلْفُرْقَانَ"
    ],
    [
     "ءَاتَيْنَا",
     "مُوسَى",
     "ٱلْكِتَٰبَ"
    ],
    [
     "ءَاتَيْنَا",
     "دَاوُۥدَ",
     "زَبُورًۭا"
    ],
    [
     "ءَاتَيْنَٰهُ",
     "ـهُ",
     "حُكْمًۭا"
    ],
    [
     "ءَاتَىٰنِىَ",
     "ـنِىَ",
     "ٱلْكِتَٰبَ"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ءَاتَيْنَا",
    "blocks": [
     {
      "text": "ءَاتَيْ",
      "role": "root",
      "gloss": "give / grant"
     },
     {
      "text": "نَا",
      "role": "verbSuffix",
      "gloss": "we (did)"
     }
    ],
    "note": "Split between the verb base and the subject suffix; the suffix tells you who did the giving."
   },
   {
    "word": "ءَاتَيْنَٰهُ",
    "blocks": [
     {
      "text": "ءَاتَيْ",
      "role": "root",
      "gloss": "give / grant"
     },
     {
      "text": "نَا",
      "role": "verbSuffix",
      "gloss": "we (did)"
     },
     {
      "text": "هُ",
      "role": "attachedPronoun",
      "gloss": "him (obj)"
     }
    ],
    "note": "The attached pronoun here is object 1 (recipient): “We gave him …” and the next noun is object 2."
   },
   {
    "word": "ءَاتَىٰنِىَ",
    "blocks": [
     {
      "text": "ءَاتَىٰ",
      "role": "root",
      "gloss": "gave / granted"
     },
     {
      "text": "نِىَ",
      "role": "attachedPronoun",
      "gloss": "me (obj)"
     }
    ],
    "note": "The verb already has its recipient attached; that makes it easy to expect a second object right after."
   },
   {
    "word": "مُوسَى",
    "blocks": [
     {
      "text": "مُوسَى",
      "role": "plain",
      "gloss": "Mūsā"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "object"
     }
    ],
    "note": "Mark the final vowel as the object signal: in this pattern, the first noun after the verb is usually object 1 (recipient)."
   },
   {
    "word": "ٱلْكِتَٰبَ",
    "blocks": [
     {
      "text": "ٱلْكِتَٰب",
      "role": "root",
      "gloss": "the Book"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "object"
     }
    ],
    "note": "Object 2 often appears as a definite noun; the ending helps you keep it as the ‘thing’ rather than a new clause."
   }
  ],
  "examples": [
   {
    "arabic": "ءَاتَيْنَا دَاوُۥدَ زَبُورًۭا",
    "ref": "17:55",
    "surah": "Sūrat Al-Israa",
    "segments": [
     {
      "text": "ءَاتَيْ",
      "role": "root"
     },
     {
      "text": "نَا",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "دَاوُۥدَ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "زَبُور",
      "role": "root"
     },
     {
      "text": "ًۭا",
      "role": "nounEnding"
     }
    ],
    "literal": "We-gave Dawūd Zabūr-a",
    "smooth": "We gave David the Zabūr.",
    "whatChanged": "This is the cleanest two-noun chain: verb + recipient name + thing given, with no preposition at all."
   },
   {
    "arabic": "ءَاتَيْنَا مُوسَى ٱلْكِتَٰبَ",
    "ref": "23:49",
    "surah": "Sūrat Al-Muminoon",
    "segments": [
     {
      "text": "ءَاتَيْ",
      "role": "root"
     },
     {
      "text": "نَا",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُوسَى",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْكِتَٰب",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "We-gave Mūsā the-Book-a",
    "smooth": "We gave Moses the Book.",
    "whatChanged": "Object 2 is definite (ٱلْكِتَٰبَ), so you must not treat it as a new subject—it's still the second object."
   },
   {
    "arabic": "ءَاتَيْنَا مُوسَىٰ وَهَٰرُونَ ٱلْفُرْقَانَ",
    "ref": "21:48",
    "surah": "Sūrat Al-Anbiyaa",
    "segments": [
     {
      "text": "ءَاتَيْ",
      "role": "root"
     },
     {
      "text": "نَا",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُوسَىٰ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "هَٰرُونَ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْفُرْقَان",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "We-gave Mūsā and Hārūn the-Criterion-a",
    "smooth": "We gave Moses and Aaron the Criterion.",
    "whatChanged": "Object 1 can be a pair joined by وَ; both are recipients, and the following noun is still object 2."
   },
   {
    "arabic": "لَئِنْ ءَاتَىٰنَا مِن فَضْلِهِۦ",
    "ref": "9:75",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "لَئِنْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ءَاتَىٰ",
      "role": "root"
     },
     {
      "text": "نَا",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مِن",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فَضْل",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     },
     {
      "text": "هِۦ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "If surely he-gives-us from فضلِهِ",
    "smooth": "If He gives us from His bounty…",
    "whatChanged": "Here the recipient (object 1) is attached (نَا), and the next piece is a prepositional phrase, so the ‘thing’ is not a bare second noun."
   },
   {
    "arabic": "ءَاتَىٰنِىَ ٱلْكِتَٰبَ",
    "ref": "19:30",
    "surah": "Sūrat Maryam",
    "segments": [
     {
      "text": "ءَاتَىٰ",
      "role": "root"
     },
     {
      "text": "نِىَ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْكِتَٰب",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "He-gave-me the-Book-a",
    "smooth": "He has given me the Book.",
    "whatChanged": "A singular past verb with an attached recipient still follows the same two-object logic; the second object is the next noun."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse “two objects” with “object + prepositional phrase.”",
    "example": "ءَاتَىٰنَا مِن فَضْلِهِۦ",
    "note": "مِن forces what follows it to be a prepositional phrase. That means you do NOT have two bare objects in a row; the ‘given’ is expressed through مِن… rather than as a second direct noun."
   },
   {
    "claim": "Don’t treat the first noun after the verb as the subject just because it’s a person’s name.",
    "example": "ءَاتَيْنَا مُوسَى ٱلْكِتَٰبَ",
    "note": "The doer is already inside the verb (نَا = “We”). So مُوسَى is not “Moses gave…”; it is the recipient (object 1)."
   },
   {
    "claim": "Don’t assume the second noun must be indefinite; it can be definite.",
    "example": "ٱلْكِتَٰبَ",
    "note": "Definiteness (ٱلْ…) tells you which thing, not its grammatical role. In these examples, a definite noun can still be the second object."
   },
   {
    "claim": "Don’t lose track of object 2 when it becomes a coordinated list.",
    "example": "حُكْمًۭا وَعِلْمًۭا",
    "note": "A وَ list can expand the ‘thing given/taught.’ Keep the recipient fixed (هُ / مُوسَى / دَاوُۥدَ), and read everything coordinated after it as the gift/teaching content."
   }
  ],
  "checklist": [
   "Find a verb you recognize as ‘give/grant’ (ءَاتَىٰ / ءَاتَيْنَا / ءَاتَيْنَٰهُ).",
   "Ask: is the doer already marked in the verb (like نَا “we”)? If yes, the next noun is unlikely to be the subject.",
   "Look immediately after the verb: if you see a bare noun/name/pronoun recipient (like مُوسَى / دَاوُۥدَ / هُ / نِىَ), label it object 1.",
   "Check what comes next: if another bare noun follows with no preposition, that noun is object 2 (the thing given/taught).",
   "If a preposition appears (مِن, بِ, إِلَى), stop the two-object reading there: what follows is not a second direct object.",
   "If وَ appears after object 2, treat it as ‘and’ extending object 2 (a list of things), not starting a new recipient."
  ],
  "summary": [
   "Rule: Some Qur’anic verbs take two direct objects—recipient first, then the thing—often with no preposition between them.",
   "Look: verb + noun/pronoun + noun, both behaving like objects; prepositions break the pattern.",
   "Now you can: reliably read ‘who got what’ in common Qur’anic giving/teaching structures even when names, definiteness, or lists appear."
  ],
  "quizBridge": "The quiz will show short snippets and ask you to identify object 1 (recipient) and object 2 (thing), or to say whether a preposition has broken the two-object pattern."
 },
 {
  "id": "noun-patterns",
  "n": 21,
  "title": "The noun templates: doer, done-to, and the rest",
  "stage": "Nouns from roots",
  "level": "A2",
  "structure": "Nouns come from templates too, and a handful cover most of the Qur'an. فَاعِل — the one doing it: كَاتِب writer، عَالِم knower. مَفْعُول — the one it is done to: مَكْتُوب written، مَعْلُوم known. فَعِيل — an intensified quality: عَلِيم all-knowing، رَحِيم most merciful. فَعَّال — one who does it constantly: غَفَّار ever-forgiving. مَفْعَل — the place or time: مَسْجِد place of prostration. مُـ + present stem — the participle of the derived forms: مُؤْمِن، مُسْلِم، مُسْتَغْفِر.",
  "whyItMatters": "The Qur'an is noun-heavy — that was lesson one — so this is where pattern recognition pays out most. The divine names are almost all فَعِيل and فَعَّال, and reading the template tells you the intensity as well as the meaning.",
  "canDo": "After this lesson you can look at a Qur’anic noun and recognize which common template it is on (doer, done-to, intensified quality, constant doer, place/time, or مُـ-participle) so you can predict the basic meaning even before you know the exact dictionary gloss.",
  "rule": "Nouns in the Qur’an are built on templates (patterns) just like verbs: the same root can produce different noun-types by changing the قالب (template). A small set of templates covers a large share of Qur’anic nouns, especially in descriptions of people and in Allah’s names/attributes. When you spot the template, you immediately know the “role”: doer, done-to, intensified quality, constant doer, place/time, or a derived-form participle (مُـ + present stem).",
  "why": [
   "Prevents reading مُؤْمِنُونَ as “faith” (a thing) instead of “believers” (people doing the believing).",
   "Prevents missing intensity: رَحِيم and كَرِيم are not neutral adjectives; the template itself signals “strong/constant quality.”",
   "Prevents mistaking place/time nouns (like مَصِير) for an action verb; you’ll read “destination/return” instead of “he returns.”",
   "Prevents treating مبين as a random adjective; you can hear “clarifying/clear” from the participle template even if the root is new."
  ],
  "pattern": {
   "caption": "High-frequency noun templates to recognize at sight (root stays, template changes the noun’s job)",
   "columns": [
    "Template",
    "Core idea",
    "Qur’anic example (from today’s verses)"
   ],
   "rows": [
    [
     "فَاعِل",
     "doer / agent (“one who does”)",
     "غَالِبَ (one who overcomes) — 3:160"
    ],
    [
     "مَفْعُول",
     "done-to / object (“one it is done to”)",
     "— (not in today’s snippets; recognize it as the partner of فَاعِل)"
    ],
    [
     "فَعِيل",
     "intensified/firm quality",
     "رَحِيمِ — 23:1, كَرِيمٌ — 8:4, مُّبِينٌ — 2:168"
    ],
    [
     "فَعَّال",
     "constant/repeated doer",
     "— (not in today’s snippets; common in Allah’s names like غَفَّار)"
    ],
    [
     "مَفْعِل / مَفْعَل",
     "place/time or result noun (where/when/endpoint)",
     "ٱلْمَصِيرُ — 3:28"
    ],
    [
     "مُـ + present-stem (derived forms)",
     "active participle of forms II–X (one engaged in that form’s action/state)",
     "ٱلْمُؤْمِنُونَ — 23:1"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلْمُؤْمِنُونَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "particle",
      "gloss": "the (def.)"
     },
     {
      "text": "مُؤْمِن",
      "role": "root",
      "gloss": "believing one"
     },
     {
      "text": "ونَ",
      "role": "nounEnding",
      "gloss": "plural (masc.)"
     }
    ],
    "note": "The template is مُـ (derived-form participle); the ending ونَ is the visible plural marker."
   },
   {
    "word": "مُّبِينٌ",
    "blocks": [
     {
      "text": "مُ",
      "role": "plain",
      "gloss": "participle mark"
     },
     {
      "text": "بِين",
      "role": "root",
      "gloss": "clear/clarify"
     },
     {
      "text": "ٌ",
      "role": "nounEnding",
      "gloss": "indef. -un"
     }
    ],
    "note": "مُ… is the participle “one who is/does X” in derived forms; the ٌ shows it is indefinite here."
   },
   {
    "word": "رَحِيمِ",
    "blocks": [
     {
      "text": "رَحِيم",
      "role": "root",
      "gloss": "most merciful"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "genitive -i"
     }
    ],
    "note": "فَعِيل template: strong, settled quality. The كسرة (ِ) is showing its grammar role in the phrase."
   },
   {
    "word": "غَالِبَ",
    "blocks": [
     {
      "text": "غَالِب",
      "role": "root",
      "gloss": "overcoming one"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "acc. -a"
     }
    ],
    "note": "فَاعِل template: the doer/agent. Here the fatḥa marks its role after لَا in a “no X” statement."
   },
   {
    "word": "ٱلْمَصِيرُ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "particle",
      "gloss": "the (def.)"
     },
     {
      "text": "مَصِير",
      "role": "root",
      "gloss": "destination/return"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "nom. -u"
     }
    ],
    "note": "This is a مَـ noun (place/time/result). Do not read it as a verb; it names an endpoint."
   }
  ],
  "examples": [
   {
    "arabic": "قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ",
    "ref": "23:1",
    "surah": "Sūrat Al-Muminoon",
    "segments": [
     {
      "text": "قَدْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَفْلَحَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "مُؤْمِن",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "nounEnding"
     }
    ],
    "literal": "Indeed succeeded the-believing-ones(pl.)",
    "smooth": "The believers have succeeded.",
    "whatChanged": "You are not just recognizing “faith” (root) but the مُـ participle template: it tells you this noun means people characterized by believing."
   },
   {
    "arabic": "فَلَا غَالِبَ لَكُمْ",
    "ref": "3:160",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "غَالِب",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لِ",
      "role": "preposition"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "So no overcoming-one for-you(pl.)",
    "smooth": "Then no one can overcome you.",
    "whatChanged": "This shows فَاعِل “doer” in action: غَالِب is “an overcomer,” and the ending helps you notice it is a noun in a “no X exists” structure."
   },
   {
    "arabic": "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    "ref": "23:1",
    "surah": "Sūrat Al-Muminoon",
    "segments": [
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "رَّحْمَٰن",
      "role": "plain"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "رَّحِيم",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     }
    ],
    "literal": "the-Entirely-Merciful, the-Most-Merciful",
    "smooth": "The Entirely Merciful, the Especially Merciful.",
    "whatChanged": "Now the template itself carries meaning: رَحِيم (فَعِيل) signals an intensified, stable quality—an attribute, not a one-time action."
   },
   {
    "arabic": "عَدُوٌّ مُّبِينٌ",
    "ref": "2:168",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "عَدُوّ",
      "role": "plain"
     },
     {
      "text": "ٌ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُ",
      "role": "plain"
     },
     {
      "text": "بِين",
      "role": "root"
     },
     {
      "text": "ٌ",
      "role": "nounEnding"
     }
    ],
    "literal": "an-enemy (indef.), clear/clarifying (indef.)",
    "smooth": "a clear enemy.",
    "whatChanged": "This adds the مُ… participle pattern (derived-form participle) used as an adjective: you can feel “clear/clarifying” even before pinning down which derived form it comes from."
   },
   {
    "arabic": "وَإِلَى ٱللَّهِ ٱلْمَصِيرُ",
    "ref": "3:28",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "إِلَى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّه",
      "role": "plain"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "مَصِير",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     }
    ],
    "literal": "And to Allah (gen.) the-destination/return (nom.)",
    "smooth": "And to Allah is the final return.",
    "whatChanged": "This shows a مَـ noun of endpoint/result (not a verb): the template helps you read it as “the destination/return,” fitting the sentence structure immediately."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse مُؤْمِن (a participle noun: “believing one”) with إِيمَان (a verbal noun: “belief/faith”).",
    "example": "ٱلْمُؤْمِنُونَ",
    "note": "Both share the same root, but the template changes what it refers to: people vs. the abstract concept. In the Qur’an this prevents you from turning groups of people into an abstract idea."
   },
   {
    "claim": "Don’t assume every word starting with مـ is “place of …”.",
    "example": "مُّبِينٌ",
    "note": "Here مـ is not “place”; it’s the مُـ participle marker (derived forms). Check the vowel and shape: مُـ often signals “one who is/does …” rather than location."
   },
   {
    "claim": "Don’t treat فَعِيل as a neutral, weak adjective.",
    "example": "ٱلرَّحِيمِ / كَرِيمٌ",
    "note": "فَعِيل usually signals intensity/firmness. If you ignore the template, you flatten Qur’anic description (especially divine attributes) into ordinary adjectives."
   }
  ],
  "checklist": [
   "When you meet a noun/adjective, look first for obvious template markers: مُـ at the start, or مَـ for place/time/result nouns.",
   "If it is مُـ, ask: “Is this likely ‘one who…/one engaged in…’?” (a participle), especially for groups like ٱلْمُؤْمِنُونَ.",
   "If it looks like فَاعِل (often long ā after the first consonant), read it as a doer/agent: “one who does X” (e.g., غَالِب).",
   "If it looks like فَعِيل, read it as an intensified quality: “strongly/steadily characterized by X” (e.g., رَحِيم, كَرِيم, مُّبِين).",
   "Use the ending (ـُ/ـِ/ـَ or ـٌ/ـٍ/ـً) as a clue that you are looking at a noun/adjective in a sentence role—not a verb form.",
   "Only after you’ve guessed the noun’s job from its template, attach the root meaning you already know (or can look up)."
  ],
  "summary": [
   "Rule: Qur’anic nouns come from templates too; a small set reliably tells you the noun’s “job” (doer, done-to, intensified quality, constant doer, place/time/result, or مُـ participle).",
   "What it looks like: مُـ at the start for derived-form participles (ٱلْمُؤْمِنُونَ, مُّبِينٌ), فَاعِل for doers (غَالِب), فَعِيل for intensified qualities (رَحِيم, كَرِيم).",
   "What you can now do: see a noun, recognize its template, and predict whether it refers to a person/group, an attribute, or an endpoint—before translating word-by-word."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify which noun template you’re seeing (especially مُـ participle vs. فَاعِل vs. فَعِيل vs. مَـ endpoint/place) and what that implies in English."
 },
 {
  "id": "the-40-particles",
  "n": 22,
  "title": "The forty small words that hold everything together",
  "stage": "How a sentence works",
  "level": "A2",
  "structure": "Learned as one working set, because they behave as one. Prepositions: فِي، مِنْ، إِلَى، عَلَىٰ، عَنْ، بِ، لِ، كَ، مَعَ. Connectors: وَ، فَ، ثُمَّ، بَلْ، لَٰكِنْ، أَوْ. Negations: لَا، مَا، لَمْ، لَنْ. Emphasis and assertion: إِنَّ، أَنَّ، قَدْ، لَـ. Conditions: إِنْ، إِذَا، لَوْ، لَوْلَا. Questions: أَ، هَلْ، مَنْ، مَا، كَيْفَ، أَيْنَ. Exception and limit: إِلَّا، إِنَّمَا، غَيْر. Relatives: ٱلَّذِي، ٱلَّتِي، ٱلَّذِينَ.",
  "whyItMatters": "They carry almost no meaning of their own and they decide the meaning of everything else. Miss a لَمْ and you have read the opposite of the verse — there is no cheaper error to avoid.",
  "canDo": "After this lesson you can spot and correctly “apply” the small particles that flip and steer Qur’anic meaning (direction, time, negation, emphasis, condition, question, exception, relation) while you read.",
  "rule": "Treat these small words as one working set: they don’t carry the main content, they control it. First identify the particle, then ask what it governs (a noun phrase, a verb, or a whole clause). Finally read the controlled words through that lens: negation negates, لِ/بِ/فِي/مِنْ re-frame relationships, and إِنَّ/قَدْ/لَـ add force or certainty.",
  "why": [
   "Prevents reading the opposite meaning by missing a negator (especially لَا vs لَمْ).",
   "Prevents “floating” relationships: who something belongs to, is for, is with, is in, comes from, or goes to.",
   "Prevents losing clause logic: sequence (فَ / ثُمَّ), contrast (بَلْ / لَٰكِنْ), condition (إِنْ / إِذَا), and exception (إِلَّا / إِنَّمَا).",
   "Prevents misreading emphasis as optional: إِنَّ/أَنَّ/قَدْ/لَـ can turn a bare statement into a strongly asserted one."
  ],
  "pattern": {
   "caption": "One set, different jobs: the “glue” words and what they control",
   "columns": [
    "Type",
    "Key words (from this lesson)",
    "What to look for right after it"
   ],
   "rows": [
    [
     "Prepositions",
     "فِي، مِنْ، إِلَى، عَلَىٰ، عَنْ، بِ، لِ، كَ، مَعَ",
     "A noun phrase (often with attached pronoun); read it as a relationship"
    ],
    [
     "Connectors",
     "وَ، فَ، ثُمَّ، بَلْ، لَٰكِنْ، أَوْ",
     "Another word/clause; read the logic: “and / so / then / rather / but / or”"
    ],
    [
     "Negations",
     "لَا، مَا، لَمْ، لَنْ",
     "A verb (often right after); decide: not now? not ever? not in past?"
    ],
    [
     "Emphasis / assertion",
     "إِنَّ، أَنَّ، قَدْ، لَـ",
     "A clause; expect strengthened certainty or insistence"
    ],
    [
     "Condition / question / exception / relative",
     "إِنْ، إِذَا، لَوْ… | أَ، هَلْ، مَنْ… | إِلَّا… | ٱلَّذِي…",
     "A full clause or a “slot” needing its answer (condition/result, question/answer, exception, description)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "فِيهِ",
    "blocks": [
     {
      "text": "فِي",
      "role": "preposition",
      "gloss": "in"
     },
     {
      "text": "هِ",
      "role": "attachedPronoun",
      "gloss": "it/him"
     }
    ],
    "note": "Many prepositions “carry” an attached pronoun; read them together as one unit (“in it”)."
   },
   {
    "word": "مِنْهُمْ",
    "blocks": [
     {
      "text": "مِنْ",
      "role": "preposition",
      "gloss": "from"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "them"
     }
    ],
    "note": "The pronoun completes the relationship; don’t hunt for a separate ‘them’ word elsewhere."
   },
   {
    "word": "لَنَا",
    "blocks": [
     {
      "text": "لِ",
      "role": "preposition",
      "gloss": "for/to"
     },
     {
      "text": "نَا",
      "role": "attachedPronoun",
      "gloss": "us"
     }
    ],
    "note": "لِ often marks recipient/beneficiary; with pronouns it is especially easy to miss."
   },
   {
    "word": "أَلَمْ",
    "blocks": [
     {
      "text": "أَ",
      "role": "particle",
      "gloss": "question"
     },
     {
      "text": "لَمْ",
      "role": "particle",
      "gloss": "did not"
     }
    ],
    "note": "This is a stacked pair: a question particle + a negator; read it as “Have you not…?” not as two unrelated words."
   }
  ],
  "examples": [
   {
    "arabic": "لَا رَيْبَ فِيهِ",
    "ref": "2:2",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَيْبَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِي",
      "role": "preposition"
     },
     {
      "text": "هِ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "no doubt in-it",
    "smooth": "There is no doubt in it.",
    "whatChanged": "You see negation (لَا) and a preposition+pronoun (فِيهِ) working together: “no doubt” about a specific referent."
   },
   {
    "arabic": "لَسْتَ مِنْهُمْ",
    "ref": "6:159",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "لَسْتَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مِنْ",
      "role": "preposition"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "you-are-not from-them",
    "smooth": "You have nothing to do with them / you are not of them.",
    "whatChanged": "Here the key is مِنْهُمْ: “from/of them” is not geography, it marks belonging/association."
   },
   {
    "arabic": "إِلَى ٱللَّهِ ثُمَّ",
    "ref": "6:159",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "إِلَى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهِ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ثُمَّ",
      "role": "particle"
     }
    ],
    "literal": "to Allah then",
    "smooth": "…to Allah, then…",
    "whatChanged": "This adds two kinds of control: direction/return (إِلَى) and sequencing with a pause/step (ثُمَّ)."
   },
   {
    "arabic": "وَلَمْ يُبْدِهَا",
    "ref": "12:77",
    "surah": "Sūrat Yusuf",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَمْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يُبْدِ",
      "role": "plain"
     },
     {
      "text": "هَا",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and not (did) he-show-it",
    "smooth": "and he did not reveal it.",
    "whatChanged": "Now the tiny word flips the whole event: لَمْ negates a verb in a past sense; missing it reverses the meaning."
   },
   {
    "arabic": "وَيَدْعُونَنَا رَغَبًا",
    "ref": "21:90",
    "surah": "Sūrat Al-Anbiyaa",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "يَدْعُونَ",
      "role": "plain"
     },
     {
      "text": "نَا",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَغَبًۭا",
      "role": "plain"
     }
    ],
    "literal": "and they-call-us desirefully",
    "smooth": "and they would call upon Us in hope.",
    "whatChanged": "You see وَ linking actions, plus an attached pronoun that supplies the object (“call Us”) without a separate word."
   },
   {
    "arabic": "أَلَمْ تَرَ كَيْفَ",
    "ref": "105:1",
    "surah": "Sūrat Al-Fil",
    "segments": [
     {
      "text": "أَ",
      "role": "particle"
     },
     {
      "text": "لَمْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "تَرَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَيْفَ",
      "role": "particle"
     }
    ],
    "literal": "have-not you-seen how",
    "smooth": "Have you not seen how…?",
    "whatChanged": "This stacks question + negation + question-word: the meaning is rhetorical and guided (‘consider how’), not a neutral information question."
   }
  ],
  "traps": [
   {
    "claim": "Don’t treat وَ and فَ as the same kind of “and.”",
    "example": "فَٱسْتَجَبْنَا لَهُۥ",
    "note": "From 21:90. فَ usually signals consequence/so-then, not mere addition. If you read it as a plain ‘and’, you can miss cause → result flow."
   },
   {
    "claim": "Don’t miss the scope of negation: لَا may negate a noun-idea, لَمْ negates a verb-event.",
    "example": "لَا رَيْبَ / وَلَمْ يُبْدِهَا",
    "note": "From 2:2 and 12:77. لَا here negates the existence of “doubt”; لَمْ negates an action happening. Different targets, different reading."
   },
   {
    "claim": "Don’t ignore attached pronouns after particles; they are the meaning-holder of the relationship.",
    "example": "فِيهِ / مِنْهُمْ / لَنَا",
    "note": "From 2:2, 6:159, 21:90. If you skip the pronoun, you lose ‘in what? from whom? for whom?’ and the sentence becomes vague."
   },
   {
    "claim": "Don’t translate question particles as always seeking information.",
    "example": "أَلَمْ تَرَ",
    "note": "From 105:1. Often rhetorical: it pushes attention and reflection. Reading it as a literal question can flatten the intended force."
   }
  ],
  "checklist": [
   "Scan for the smallest words first (often 1–3 letters): وَ، فَ، لَا، لَمْ، إِلَى، مِنْ، فِي، بِ، لِ.",
   "If you see a preposition, immediately look for an attached pronoun at the end (ـه، ـهم، ـنا) and read them as one unit.",
   "If you see a negator, locate the verb it negates (usually right after) and mentally flip the event to ‘did not / will not’.",
   "If you see a connector, decide the relationship: simple addition (وَ) vs consequence (فَ) vs later step (ثُمَّ).",
   "If you see a question marker (أَ / كَيْفَ / هَلْ), read until you find what is being asked about; don’t stop at the first word.",
   "Re-read the snippet once with the particles highlighted; then read it again smoothly as English while keeping the same logical links."
  ],
  "summary": [
   "Rule: these small particles are a single working system that governs everything around them; identify them before you translate.",
   "Look: many are tiny and attach to pronouns; others stack (like أَلَمْ) or link clauses (وَ/فَ/ثُمَّ).",
   "Now you can read Qur’anic lines more safely by applying negation, relationship, sequence, and rhetorical force correctly."
  ],
  "quizBridge": "The quiz will highlight short snippets and ask you to identify the particle(s) and choose the correct meaning shift (negation, direction, sequence, rhetorical question, or relationship with an attached pronoun)."
 },
 {
  "id": "nominal-and-verbal",
  "n": 23,
  "title": "Two kinds of sentence, and the missing \"is\"",
  "stage": "How a sentence works",
  "level": "A2",
  "structure": "A VERBAL sentence (جُمْلَة فِعْلِيَّة) starts with the verb: خَلَقَ ٱللَّهُ ٱلسَّمَٰوَٰتِ. A NOMINAL sentence (جُمْلَة ٱسْمِيَّة) has no verb at all, because Arabic has no word for \"is\": ٱللَّهُ غَفُورٌ — \"Allah IS forgiving\". Two nouns in a row where the first is definite and the second is not is usually a statement, not a description.",
  "whyItMatters": "A great many of the Qur'an's central statements are nominal sentences. Read them as noun phrases and they stop being statements at all — you get \"the forgiving Allah\" instead of \"Allah is forgiving\".",
  "canDo": "After this lesson you can tell when the Qur’an is making a statement with no verb (“Allah is forgiving”) versus describing a noun (“the forgiving …”), simply by noticing whether the line begins with a verb or with a noun and by watching definiteness.",
  "rule": "Arabic has two common sentence types in the Qur’an: a verbal sentence (جُمْلَة فِعْلِيَّة) that begins with a verb, and a nominal sentence (جُمْلَة ٱسْمِيَّة) that may have no verb at all. When you see a definite noun followed by an indefinite noun/adjective, it is usually a complete statement, and English must supply “is/are”: ٱللَّهُ غَفُورٌ = “Allah is forgiving.” Do not automatically read two nouns in a row as a single noun phrase like “the forgiving Allah.”",
  "why": [
   "Prevents turning Qur’anic claims into labels: reading ٱللَّهُ غَفُورٌ as “the forgiving Allah” removes the statement being made.",
   "Prevents missing the main action in a verse: in خَلَقَ ٱللَّهُ … the verb is the backbone; if you miss it, you miss the meaning.",
   "Prevents mis-parsing “Allah + adjective” as an iḍāfa/description of a different noun instead of a full clause.",
   "Helps you hear emphasis particles like إِنَّ as introducing a statement (“Indeed, Allah is …”), not a noun phrase."
  ],
  "pattern": {
   "caption": "Two sentence frames you will meet constantly",
   "columns": [
    "Starts with…",
    "What you’re looking at",
    "How to translate"
   ],
   "rows": [
    [
     "Verb (فعل)",
     "Verbal sentence: verb + doer (often after it)",
     "Use an English verb: “created / made / does …”"
    ],
    [
     "Definite noun (often ٱللَّهُ)",
     "Nominal sentence: no verb written",
     "Supply “is/are”: “Allah is …”"
    ],
    [
     "Particle إِنَّ + noun",
     "Emphatic nominal sentence",
     "“Indeed/Truly, … is …”"
    ],
    [
     "كَانَ + noun + predicate",
     "Nominal meaning with a past-time frame",
     "“was/has always been …” depending on context"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱللَّهُ",
    "blocks": [
     {
      "text": "ٱل",
      "role": "particle",
      "gloss": "the (definite)"
     },
     {
      "text": "لَّه",
      "role": "root",
      "gloss": "Allah (name)"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "subject ending"
     }
    ],
    "note": "Split shows (1) definiteness and (2) the nominative ending often seen on the subject of a nominal sentence."
   },
   {
    "word": "غَفُورٌۭ",
    "blocks": [
     {
      "text": "غَفُور",
      "role": "root",
      "gloss": "forgiving (much)"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding",
      "gloss": "indefinite -un"
     }
    ],
    "note": "The tanwīn (ٌ) is a loud signal of indefiniteness: in a nominal sentence it often functions as the predicate (“is forgiving”)."
   },
   {
    "word": "خَلَقَ",
    "blocks": [
     {
      "text": "خَلَق",
      "role": "root",
      "gloss": "create"
     },
     {
      "text": "َ",
      "role": "verbSuffix",
      "gloss": "past (he)"
     }
    ],
    "note": "A verbal sentence can begin with a past verb; the doer comes after (e.g., ٱللَّهُ)."
   },
   {
    "word": "إِنَّ",
    "blocks": [
     {
      "text": "إِنّ",
      "role": "particle",
      "gloss": "indeed"
     },
     {
      "text": "َ",
      "role": "plain",
      "gloss": "emphasis"
     }
    ],
    "note": "Treat إِنَّ as a clause-starter: it usually introduces a statement that follows."
   },
   {
    "word": "وَكَانَ",
    "blocks": [
     {
      "text": "وَ",
      "role": "particle",
      "gloss": "and"
     },
     {
      "text": "كَان",
      "role": "root",
      "gloss": "be (was)"
     },
     {
      "text": "َ",
      "role": "verbSuffix",
      "gloss": "past (he)"
     }
    ],
    "note": "Here a real verb of being appears (كَانَ); it frames the description in time instead of leaving “is” unwritten."
   }
  ],
  "examples": [
   {
    "arabic": "خَلَقَ ٱللَّهُ ٱلسَّمَٰوَٰتِ",
    "ref": "29:44",
    "surah": "Sūrat Al-Ankaboot",
    "segments": [
     {
      "text": "خَلَق",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "لَّه",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "سَّمَٰوَٰت",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     }
    ],
    "literal": "created — Allah — the-heavens",
    "smooth": "Allah created the heavens.",
    "whatChanged": "This is a verbal sentence: the first thing you see is a verb, so you look for “who did it?” after it."
   },
   {
    "arabic": "إِنَّ ٱللَّهَ غَفُورٌۭ رَّحِيمٌ",
    "ref": "2:173",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "إِنَّ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "لَّه",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "غَفُور",
      "role": "root"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَّحِيم",
      "role": "root"
     },
     {
      "text": "ٌ",
      "role": "nounEnding"
     }
    ],
    "literal": "indeed — Allah — forgiving — merciful",
    "smooth": "Indeed, Allah is forgiving and merciful.",
    "whatChanged": "Now there is no main action verb like “created”; the meaning is a statement with an implied “is/are.”"
   },
   {
    "arabic": "وَٱللَّهُ غَفُورٌ حَلِيمٌۭ",
    "ref": "5:101",
    "surah": "Sūrat Al-Maaida",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "لَّه",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "غَفُور",
      "role": "root"
     },
     {
      "text": "ٌ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "حَلِيم",
      "role": "root"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding"
     }
    ],
    "literal": "and — Allah — forgiving — forbearing",
    "smooth": "And Allah is forgiving, forbearing.",
    "whatChanged": "This is the same nominal-sentence idea without إِنَّ: definite ٱللَّهُ followed by indefinite adjectives gives a full statement."
   },
   {
    "arabic": "وَكَانَ ٱللَّهُ غَفُورًۭا رَّحِيمًۢا",
    "ref": "33:73",
    "surah": "Sūrat Al-Ahzaab",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "كَان",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "لَّه",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "غَفُور",
      "role": "root"
     },
     {
      "text": "ًۭا",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَّحِيم",
      "role": "root"
     },
     {
      "text": "ًۢا",
      "role": "nounEnding"
     }
    ],
    "literal": "and — was — Allah — forgiving — merciful",
    "smooth": "And Allah was (always) forgiving and merciful.",
    "whatChanged": "Here Arabic *does* use a being-verb (كَانَ), so you don’t supply an invisible “is”; you read the time-frame the verb gives."
   },
   {
    "arabic": "وَٱللَّهُ مُحِيطٌۢ بِٱلْكَٰفِرِينَ",
    "ref": "2:19",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "لَّه",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُحِيط",
      "role": "root"
     },
     {
      "text": "ٌۢ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "كَٰفِرِين",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "and — Allah — encompassing — of/with — the-disbelievers",
    "smooth": "And Allah is encompassing of the disbelievers.",
    "whatChanged": "This nominal sentence adds a prepositional phrase (بِ…) that completes the statement; you still supply “is” in English."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a nominal sentence (statement) with a noun phrase (description).",
    "example": "ٱللَّهُ غَفُورٌ",
    "note": "Because the first noun is definite (ٱللَّهُ) and the next is indefinite (غَفُورٌ), this normally reads as “Allah is forgiving,” not “the forgiving Allah.” If you turn it into a label, you erase the claim being asserted."
   },
   {
    "claim": "Don’t hunt for an invisible verb when there is a real verb present.",
    "example": "خَلَقَ ٱللَّهُ",
    "note": "This begins with a verb; it is not “Allah is created…” The direction is: verb first, then doer. Your first task is to spot the verb and let it drive the meaning."
   },
   {
    "claim": "Don’t treat إِنَّ as decoration; it announces a statement.",
    "example": "إِنَّ ٱللَّهَ",
    "note": "إِنَّ commonly introduces an emphatic nominal sentence: “Indeed, Allah is …” If you skip it, you miss the verse’s insistence and may mis-read the line as a mere topic heading."
   }
  ],
  "checklist": [
   "Look at the first meaningful word: is it a verb-form (you learned how to spot forms) or a noun like ٱللَّهُ?",
   "If it starts with a verb, read it as: action first → then ask “who did it?” (often the next noun).",
   "If it starts with a definite noun (often with ٱل), expect a nominal sentence: no written “is/are.”",
   "In a nominal sentence, watch for an indefinite word with tanwīn (ٌ/ً/ٍ) after the subject: it is commonly the predicate (“is X”).",
   "Notice clause-starters like إِنَّ and وَ: they frequently introduce or link statements; don’t force them into noun phrases.",
   "If you see كَانَ, treat it as an actual verb of being that sets time (“was/has been”), not as the usual missing “is.”"
  ],
  "summary": [
   "Rule: Arabic often states “X is Y” with no verb; a verbal sentence starts with a verb, but a nominal sentence can be noun + noun/adjective with “is” understood.",
   "Look: definite subject (often ٱللَّهُ) followed by an indefinite predicate (often with tanwīn) is usually a full statement.",
   "Now you can read key Qur’anic declarations as declarations (Allah is forgiving…), not as mere descriptions (the forgiving Allah…)."
  ],
  "quizBridge": "The quiz will show short snippets and ask you to label each as verbal or nominal, and to choose the correct English reading with an implied “is/are” when needed."
 },
 {
  "id": "just-enough-irab",
  "n": 24,
  "title": "Just enough case endings to tell who did what",
  "stage": "How a sentence works",
  "level": "B1",
  "structure": "Three vowels, recognition only. ـُ (ḍammah) — the doer: نَصَرَ ٱللَّهُ. ـَ (fatḥah) — the one it was done to, or a noun after إِنَّ: إِنَّ ٱللَّهَ. ـِ (kasrah) — after a preposition, or the second noun of a possessive pair: فِي ٱلْبَيْتِ، بَيْتِ ٱللَّهِ. That is the whole of what a reader needs. You never have to produce one.",
  "whyItMatters": "Arabic word order moves freely, so the ending rather than the position tells you who did what to whom. Three vowels is a small price for that, and iʿrāb beyond this is a subject for grammarians, not readers.",
  "canDo": "After this lesson you can use just three vowel endings (ُ / َ / ِ) to recognize who did what to whom, and to spot nouns governed by إِنَّ, prepositions, and iḍāfa (possessive) pairs while reading Qur’anic Arabic.",
  "rule": "In fully-vowelled Qur’anic text, the last short vowel on a noun often signals its job. ُ (ḍammah) commonly marks the doer (subject), َ (fatḥah) commonly marks the done-to (object) and also a noun after إِنَّ/أَنَّ, and ِ (kasrah) commonly marks a noun after a preposition or the first noun in an iḍāfa (possessive) link. You do not have to produce these endings—only recognize them when they appear.",
  "why": [
   "Prevents misreading the doer vs. the done-to when Arabic word order shifts (e.g., a subject can come after the verb).",
   "Stops you from treating an إِنَّ-clause noun as if it were the doer, when the fatḥah is actually signaling “as for X…”",
   "Helps you instantly see prepositional phrases as one unit (بِ / فِي / إِلَى etc. + kasrah noun), instead of guessing relationships.",
   "Lets you recognize iḍāfa (“X of Y”) without needing extra words like “of,” because the first noun often carries kasrah."
  ],
  "pattern": {
   "caption": "Three endings worth recognizing (not producing): what they usually signal in the Qur’an",
   "columns": [
    "Ending you see",
    "Most common reading job",
    "Typical trigger/context"
   ],
   "rows": [
    [
     "ـُ (ḍammah)",
     "Doer / subject",
     "Often the named subject, especially after a verb"
    ],
    [
     "ـَ (fatḥah)",
     "Done-to / object",
     "Direct object of a verb"
    ],
    [
     "ـَ (fatḥah)",
     "Noun after إِنَّ / أَنَّ",
     "After إِنَّ / أَنَّ (and their attached-pronoun forms)"
    ],
    [
     "ـِ (kasrah)",
     "After a preposition",
     "After بِ / مِن / إِلَى / عَلَى etc."
    ],
    [
     "ـِ (kasrah)",
     "First noun of iḍāfa",
     "Xِ Yِ = “X of Y” (a possessive link)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱللَّهُ",
    "blocks": [
     {
      "text": "ٱللَّه",
      "role": "root",
      "gloss": "Allah (name)"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "doer-mark"
     }
    ],
    "note": "Split after the last consonant: the final ḍammah is the signal you are training your eye to notice."
   },
   {
    "word": "ٱللَّهَ",
    "blocks": [
     {
      "text": "ٱللَّه",
      "role": "root",
      "gloss": "Allah (name)"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "object/إِنَّ"
     }
    ],
    "note": "Same letters, different ending: fatḥah often means “the one it happens to,” or “the noun introduced by إِنَّ/أَنَّ.”"
   },
   {
    "word": "ٱللَّهِ",
    "blocks": [
     {
      "text": "ٱللَّه",
      "role": "root",
      "gloss": "Allah (name)"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "after prep/iḍāfa"
     }
    ],
    "note": "Kasrah is your main cue for ‘after a preposition’ or ‘first noun in iḍāfa’ in this lesson."
   },
   {
    "word": "بِٱللَّهِ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "by/with"
     },
     {
      "text": "ٱللَّه",
      "role": "root",
      "gloss": "Allah (name)"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "prep-governed"
     }
    ],
    "note": "The boundary is between the preposition بِ and the following noun; the kasrah matches the preposition’s pull."
   }
  ],
  "examples": [
   {
    "arabic": "سَمِعَ ٱللَّهُ قَوْلَ",
    "ref": "3:181",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "سَمِعَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّه",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "قَوْل",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "heard Allahُ statementَ",
    "smooth": "Allah heard the statement.",
    "whatChanged": "This shows the basic contrast: ḍammah marks the doer (ٱللَّهُ), fatḥah marks what was heard (قَوْلَ)."
   },
   {
    "arabic": "وَلَوْ شَآءَ ٱللَّهُ",
    "ref": "2:20",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَلَوْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "شَآءَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّه",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     }
    ],
    "literal": "and-if willed Allahُ",
    "smooth": "And if Allah willed…",
    "whatChanged": "This adds a common Qur’anic word-order pattern: verb first, then the doer—so you rely on ٱللَّهُ (ḍammah), not position."
   },
   {
    "arabic": "إِنَّ ٱللَّهَ عَلَىٰ",
    "ref": "2:20",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "إِنَّ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّه",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَلَىٰ",
      "role": "preposition"
     }
    ],
    "literal": "indeed Allahَ upon",
    "smooth": "Indeed Allah is over/able regarding… (continuing).",
    "whatChanged": "This introduces the second use of fatḥah: after إِنَّ, the following noun is marked with َ even though it is not ‘an object’ of a verb."
   },
   {
    "arabic": "أَنَّ ٱللَّهَ شَدِيدُ",
    "ref": "5:98",
    "surah": "Sūrat Al-Maaida",
    "segments": [
     {
      "text": "أَنَّ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّه",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "شَدِيد",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     }
    ],
    "literal": "that Allahَ severeُ",
    "smooth": "…that Allah is severe in punishment (continuing).",
    "whatChanged": "This shows the same governing idea with أَنَّ: it pulls the next noun into fatḥah (ٱللَّهَ), while the predicate can show ḍammah (شَدِيدُ)."
   },
   {
    "arabic": "بِإِذْنِ ٱللَّهِ",
    "ref": "4:64",
    "surah": "Sūrat An-Nisaa",
    "segments": [
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "إِذْن",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّه",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     }
    ],
    "literal": "by-permissionِ Allahِ",
    "smooth": "by Allah’s permission.",
    "whatChanged": "This gives you both key kasrah triggers at once: kasrah after a preposition (بِإِذْنِ) and kasrah on the first noun of iḍāfa (إِذْنِ ٱللَّهِ = ‘permission of Allah’)."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse ‘fatḥah = object’ with ‘fatḥah = after إِنَّ/أَنَّ’.",
    "example": "إِنَّ ٱللَّهَ",
    "note": "Here ٱللَّهَ is not an object of a verb; the particle إِنَّ is what forces the fatḥah. Your reading job: notice the particle, then expect َ on the noun right after it."
   },
   {
    "claim": "Don’t treat every kasrah noun as ‘owned by the next noun’.",
    "example": "بِإِذْنِ",
    "note": "Kasrah can come simply because a preposition is right before it. Ask: is there a preposition (بِ/مِن/إِلَى/عَلَى) immediately before? If yes, it’s a prepositional phrase first, not automatically iḍāfa."
   },
   {
    "claim": "Don’t rely on word order to find the doer.",
    "example": "شَآءَ ٱللَّهُ",
    "note": "English-trained eyes expect the subject early, but Qur’anic Arabic often places the verb first. The ḍammah is the reliable clue: ٱللَّهُ is the doer even when it comes after the verb."
   }
  ],
  "checklist": [
   "When you see a noun, look only at its final short vowel: ُ vs َ vs ِ.",
   "Scan one word to the left: if there is a preposition (بِ, مِن, إِلَى, عَلَى), expect the next noun to show kasrah (ِ).",
   "Scan one word to the left for إِنَّ or أَنَّ: if present, expect the next noun to show fatḥah (َ).",
   "If you see two nouns back-to-back with no preposition between them, and the first ends in kasrah, read it as an iḍāfa link: “Xِ Yِ / Xِ Yَ / Xِ Yُ” ≈ “X of Y” (context decides).",
   "If a verb appears, check the nearest named noun with ḍammah: treat it as the doer unless a stronger cue overrides it.",
   "Keep your promise to yourself: recognition only—your job is to notice the signal, not to ‘fix’ endings or recite grammar."
  ],
  "summary": [
   "Rule: recognize three noun endings—ُ for the doer, َ for the done-to or after إِنَّ/أَنَّ, ِ after a preposition or as the first noun in iḍāfa.",
   "What it looks like: the same word (ٱللَّه) can appear as ٱللَّهُ / ٱللَّهَ / ٱللَّهِ, and that last vowel is doing real comprehension work.",
   "What you can now do: follow who did what to whom in flexible Arabic word order, and quickly group prepositional phrases and possessive links while reading."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether a highlighted ending signals doer (ُ), object/إِنَّ-noun (َ), or preposition/iḍāfa (ِ)—recognition only."
 },
 {
  "id": "the-parsing-routine",
  "n": 25,
  "title": "The four-step routine for any word you do not know",
  "stage": "Reading",
  "level": "B1",
  "structure": "ROOT — strip the prefixes and suffixes, find the three letters. FORM — which template is it in, and what does that template do. ROLE — is it the doer, the done-to, after a preposition; what does the ending say. MEANING — put the three together and read it. Four steps, in that order, every time, until it stops being four steps.",
  "whyItMatters": "This is everything in the course turned into something you do rather than something you know. A repeatable procedure is what replaces the panic of an unfamiliar verse.",
  "canDo": "After this lesson you can face any unfamiliar Qur’anic word and systematically decode it in four moves: ROOT, FORM, ROLE, then MEANING.",
  "rule": "When you do not know a word, do not guess its translation first. Do this in order every time: ROOT (strip attachments to find the core letters), FORM (identify the template and what it typically adds), ROLE (use endings/particles to see who did what to whom), then MEANING (combine the three into a read). At first it feels like four steps; with repetition it becomes one glance.",
  "why": [
   "Prevents the “panic-guess” where you see a familiar-looking word and assign the wrong meaning without checking form or role.",
   "Stops you from treating every new word as a dictionary emergency by showing you what you can recover without lookup (root + form + role).",
   "Prevents reversing meaning (doer vs done-to) when a noun template or case ending is the only clue.",
   "Keeps you from missing the verse’s logic when a particle (like إِنَّ / لَن / لَا) is doing the heavy lifting."
  ],
  "pattern": {
   "caption": "Four steps, always in this order (the routine you repeat until it becomes automatic)",
   "columns": [
    "Step",
    "What you look for",
    "What you get"
   ],
   "rows": [
    [
     "ROOT",
     "Remove ال- / prepositions / attached pronouns / verb prefixes & suffixes; keep the core letters",
     "The meaning-family (e.g., خ ل ق = create)"
    ],
    [
     "FORM",
     "Is it a verb form (I–X) or a noun template (doer/done-to/etc.)?",
     "The “extra idea” (cause, reciprocity, intensity, doer/done-to)"
    ],
    [
     "ROLE",
     "Particle before it? Preposition? Case ending? Attached pronoun?",
     "Its job in the sentence (subject/object/after-preposition/possessed, etc.)"
    ],
    [
     "MEANING",
     "Combine ROOT + FORM + ROLE, then read the phrase",
     "A confident in-context understanding"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلَّذِى",
    "blocks": [
     {
      "text": "ٱل",
      "role": "particle",
      "gloss": "the (marks)"
     },
     {
      "text": "ذِى",
      "role": "plain",
      "gloss": "who/which"
     }
    ],
    "note": "Treat ٱلَّذِى as a single “connector word” meaning ‘the one who/which’; splitting only highlights the recognizable ٱل- marker."
   },
   {
    "word": "بِرَبِّهِمْ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "with/by"
     },
     {
      "text": "رَبِّ",
      "role": "root",
      "gloss": "lord (r-b-b)"
     },
     {
      "text": "ـِ",
      "role": "nounEnding",
      "gloss": "after preposition"
     },
     {
      "text": "هِمْ",
      "role": "attachedPronoun",
      "gloss": "their (them)"
     }
    ],
    "note": "Boundary: the preposition بِ forces a kasrah-type role on the noun; the attached pronoun is possession (‘their Lord’)."
   },
   {
    "word": "أَنزَلَ",
    "blocks": [
     {
      "text": "أَ",
      "role": "verbPrefix",
      "gloss": "Form IV"
     },
     {
      "text": "نز",
      "role": "root",
      "gloss": "n-z-l (down)"
     },
     {
      "text": "لَ",
      "role": "verbSuffix",
      "gloss": "past (he)"
     }
    ],
    "note": "Form marker first: أَ…َ often signals Form IV; then you recover the root letters and read ‘cause/send down’."
   },
   {
    "word": "يَعْدِلُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "they (imperfect)"
     },
     {
      "text": "عْدِل",
      "role": "root",
      "gloss": "ʿ-d-l (equal/turn)"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "plural (they)"
     }
    ],
    "note": "For many verbs, ROOT recognition is easiest after you remove the imperfect prefix يَ and the plural ending ونَ."
   }
  ],
  "examples": [
   {
    "arabic": "ٱلَّذِى خَلَقَ ٱلسَّمَٰوَٰتِ",
    "ref": "6:1",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "ٱلَّذِى",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "خَلَقَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "سَّمَٰوَٰتِ",
      "role": "root"
     }
    ],
    "literal": "the one-who created the-heavens",
    "smooth": "the One who created the heavens",
    "whatChanged": "This starts the routine with ROOT first: you can recognize خَلَقَ as the core meaning even before worrying about anything else."
   },
   {
    "arabic": "أَنزَلَ عَلَىٰ عَبْدِهِ",
    "ref": "18:1",
    "surah": "Sūrat Al-Kahf",
    "segments": [
     {
      "text": "أَ",
      "role": "verbPrefix"
     },
     {
      "text": "نز",
      "role": "root"
     },
     {
      "text": "لَ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَلَىٰ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَبْدِ",
      "role": "root"
     },
     {
      "text": "هِ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "sent-down (caused) upon servant-his",
    "smooth": "He sent down (the Book) upon His servant",
    "whatChanged": "Now you add FORM: the أَ… pattern tells you ‘Form IV’ (causative), so you read ‘send down’ rather than just ‘descend’."
   },
   {
    "arabic": "بِرَبِّهِمْ يَعْدِلُونَ",
    "ref": "6:1",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "رَبِّ",
      "role": "root"
     },
     {
      "text": "هِمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "عْدِل",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "with their-Lord they-deviate/equate",
    "smooth": "they set up equals regarding their Lord (they turn away in their judgment)",
    "whatChanged": "Now you add ROLE: بِ tells you ‘after a preposition’ and the attached pronoun tells you possession, so you don’t mis-read who is connected to whom."
   },
   {
    "arabic": "لَن تُغْنِىَ عَنْهُمْ",
    "ref": "3:116",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "لَن",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "تُ",
      "role": "verbPrefix"
     },
     {
      "text": "غْنِىَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَنْ",
      "role": "preposition"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "never will-benefit from-them",
    "smooth": "it will never benefit them at all",
    "whatChanged": "This highlights that MEANING depends on the small words: لَن sets a strong ‘never’ frame and عَنْ + هُمْ tells you the direction (‘away from / in place of them’), before you even finish the verb."
   },
   {
    "arabic": "وَذِلَّةٌۭ فِى ٱلْحَيَوٰةِ",
    "ref": "7:152",
    "surah": "Sūrat Al-A'raaf",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ذِلَّةٌۭ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱل",
      "role": "particle"
     },
     {
      "text": "حَيَوٰةِ",
      "role": "root"
     }
    ],
    "literal": "and humiliation in the-life",
    "smooth": "and humiliation in worldly life",
    "whatChanged": "Here ROLE is carried by a preposition (فِى): you immediately know the phrase is ‘in …’, so the noun after it is not the doer or done-to, just a location/frame."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse ROOT with the whole written word-form",
    "example": "يَعْدِلُونَ",
    "note": "If you treat the whole thing as an unbreakable chunk, you will miss the useful core ع د ل. Strip يَ…ونَ first, then decide meaning in context."
   },
   {
    "claim": "Don’t decide meaning from ROOT before checking FORM",
    "example": "أَنزَلَ",
    "note": "ن ز ل relates to ‘down/descending’. But Form IV (أَ…) pushes it toward ‘send down/bring down’ (causative). Form changes your English."
   },
   {
    "claim": "Don’t ignore particles that control the whole clause",
    "example": "لَن تُغْنِىَ",
    "note": "If you miss لَن, you may read a general statement (‘it benefits’) instead of a strong negation (‘it will never benefit’). Small words often carry the main claim."
   },
   {
    "claim": "Don’t miss prepositions + attached pronouns as one unit of meaning",
    "example": "عَنْهُمْ",
    "note": "The pronoun is not a separate ‘they’ subject; it completes the preposition (‘from them/about them’). ROLE first prevents you from inventing extra subjects."
   }
  ],
  "checklist": [
   "Circle the unfamiliar word, then immediately look for anything stuck to it: ٱل- , وَ , بِ/لِ/كـ , فِى , or an attached pronoun (ـه, ـهم, etc.).",
   "Peel off attachments (prefixes/suffixes) until you can see 3 core letters you can compare to your root bank.",
   "Ask: is there a FORM marker (like أَ… for Form IV, or a doubled middle letter for Form II)? If yes, note the typical added meaning.",
   "Check ROLE: did a particle come right before it (إِنَّ / لَن / لَا)? did a preposition come right before it (بِ / عَلَىٰ / عَنْ / فِى)?",
   "If it is a noun, look for anything that signals its job: after a preposition, in an iḍāfa-like link, or carrying an attached pronoun.",
   "Only then write your MEANING in English: (root meaning-family) + (form nuance) + (role in sentence).",
   "If two readings are possible, keep both briefly—then let nearby words decide (especially particles and prepositions)."
  ],
  "summary": [
   "Rule: ROOT → FORM → ROLE → MEANING, in that order, every time you meet an unknown word.",
   "What it looks like: you physically strip what is attached, recognize a template marker, then let particles/endings decide the grammatical job.",
   "What you can now do: recover a large portion of meaning from unfamiliar Qur’anic words without freezing—then confirm with context instead of guessing."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify ROOT, FORM markers, and ROLE signals (particles/prepositions/pronouns) before choosing the best meaning."
 },
 {
  "id": "reading-path",
  "n": 26,
  "title": "Where to start reading, and where to go next",
  "stage": "Reading",
  "level": "B1",
  "structure": "Juzʾ ʿAmma first — short sūrahs, short āyāt, high repetition. Then Juzʾ 29 and 28, where the sentences lengthen but the vocabulary stays familiar. Then the long middle sūrahs, which is where most of the Qur'an actually is. Read the same passage more than once: the second pass is where the grammar becomes visible.",
  "whyItMatters": "Reading at random means constantly meeting structures you have not been taught, which feels like failing. A graded path means the difficulty rises with you.",
  "canDo": "After this lesson you can choose a graded reading path in the Qur'an and use repetition (a second pass) to notice grammar and connectors that were invisible on the first pass.",
  "rule": "Start where the Qur'an is easiest to parse: Juzʾ ʿAmma (short sūrahs, short āyāt, high repetition of the same structures). Then move to Juzʾ 29 and 28, where sentences get longer but the vocabulary and small-words remain familiar. Only after that go into the long middle sūrahs, where most of the Qur'an actually is. Read the same passage twice: the second pass is where particles, prepositions, and endings “light up” and the sentence skeleton becomes clear.",
  "why": [
   "Prevents the “random page” problem: meeting unfamiliar clause structures every few words and feeling like you are failing, even when you know many roots.",
   "Prevents mis-parsing who did what: longer āyāt add more connectors (وَ، ثُمَّ، لِـ) and without a staged path you miss the sentence joints.",
   "Prevents vocabulary fatigue: graded reading keeps you inside a small set of recurring lemmas (ٱلْحَمْدُ، ٱللَّهِ، رَبِّ، خَلَقَ) so your attention can shift to grammar.",
   "Prevents over-trusting first impressions: the first pass gives meaning; the second pass reveals function (what is a prepositional phrase, what is a clause opener, what is attached)."
  ],
  "pattern": {
   "caption": "A graded reading path + a two-pass method: meaning first, structure second",
   "columns": [
    "Stage",
    "What to expect on the page",
    "What to do (twice)"
   ],
   "rows": [
    [
     "1) Juzʾ ʿAmma",
     "Very short āyāt, repeated phrases, simple sentence types",
     "Pass 1: recognize roots + key nouns. Pass 2: circle small-words (وَ، لِـ, عَلَىٰ) and attached pronouns."
    ],
    [
     "2) Juzʾ 29",
     "Slightly longer clauses; still high repetition of connectors",
     "Pass 1: get the gist quickly. Pass 2: mark where each clause begins (particles) and ends (pauses/punctuation)."
    ],
    [
     "3) Juzʾ 28",
     "Longer sentences with stacked prepositional phrases",
     "Pass 1: identify main verb(s). Pass 2: attach every لِـ/بِـ/مِنْ phrase to the word it modifies."
    ],
    [
     "4) Long middle sūrahs",
     "Long multi-clause āyāt; frequent switches, conditions, relative clauses",
     "Pass 1: follow the storyline/argument. Pass 2: track joints: وَ/ثُمَّ/إِنَّ/وَلَئِن and pronoun references."
    ]
   ]
  },
  "anatomy": [
   {
    "word": "بِسْمِ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "by/with"
     },
     {
      "text": "ٱسْمِ",
      "role": "root",
      "gloss": "name"
     }
    ],
    "note": "Split at the preposition بِـ attached to the noun; seeing it early makes prepositional phrases easy to spot on a second pass."
   },
   {
    "word": "لِلَّهِ",
    "blocks": [
     {
      "text": "لِ",
      "role": "preposition",
      "gloss": "for/to"
     },
     {
      "text": "ٱللَّهِ",
      "role": "plain",
      "gloss": "Allah"
     }
    ],
    "note": "The preposition is the signal: on reread you can attach the whole phrase to the word before it (often ٱلْحَمْدُ)."
   },
   {
    "word": "بِيَدِهِ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "in/with"
     },
     {
      "text": "يَد",
      "role": "root",
      "gloss": "hand"
     },
     {
      "text": "ِهِ",
      "role": "attachedPronoun",
      "gloss": "his"
     }
    ],
    "note": "The boundary is between the noun and the attached pronoun; the second pass is where you stop reading “hand” and start reading “his hand.”"
   },
   {
    "word": "رَبِّهِمْ",
    "blocks": [
     {
      "text": "رَبّ",
      "role": "root",
      "gloss": "lord"
     },
     {
      "text": "ِهِمْ",
      "role": "attachedPronoun",
      "gloss": "their"
     }
    ],
    "note": "Attached pronouns are high-frequency; noticing them turns vague nouns into specific references you can track across clauses."
   }
  ],
  "examples": [
   {
    "arabic": "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
    "ref": "112:1",
    "surah": "Sūrat Al-Ikhlaas",
    "segments": [
     {
      "text": "قُلْ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "هُوَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَحَدٌ",
      "role": "nounEnding"
     }
    ],
    "literal": "Say — he — Allah — one(un)",
    "smooth": "Say: He is Allah, One.",
    "whatChanged": "This is what “start easy” looks like: one short command + one short identification, perfect for doing two passes without getting lost."
   },
   {
    "arabic": "بِيَدِهِ ٱلْمُلْكُ",
    "ref": "67:1",
    "surah": "Sūrat Al-Mulk",
    "segments": [
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "يَد",
      "role": "root"
     },
     {
      "text": "ِهِ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْمُلْكُ",
      "role": "plain"
     }
    ],
    "literal": "in/with — hand — his — the-dominion",
    "smooth": "In His hand is all dominion.",
    "whatChanged": "This shows why Juzʾ 29–28 are a good next step: the words are still familiar, but meanings depend on prepositions + attached pronouns you only reliably notice on reread."
   },
   {
    "arabic": "عَلَىٰ عَبْدِهِ ٱلْكِتَٰبَ",
    "ref": "18:1",
    "surah": "Sūrat Al-Kahf",
    "segments": [
     {
      "text": "عَلَىٰ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَبْد",
      "role": "root"
     },
     {
      "text": "ِهِ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْكِتَٰبَ",
      "role": "nounEnding"
     }
    ],
    "literal": "upon — servant — his — the-Book(a)",
    "smooth": "upon His servant, the Book.",
    "whatChanged": "This is a “long-sūrah” taste: you can still understand it, but only if you see the phrase boundaries (preposition + pronoun) and notice the object ending on a second pass."
   },
   {
    "arabic": "بِرَبِّهِمْ يَعْدِلُونَ",
    "ref": "6:1",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "رَبّ",
      "role": "root"
     },
     {
      "text": "ِهِمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَعْدِلُونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "with — lord — their — they-(...) (ūna)",
    "smooth": "with their Lord, they deviate/equate (wrongly).",
    "whatChanged": "Here the prepositional phrase arrives first; a graded path trains you to hold that phrase until the verb appears—exactly the skill long middle sūrahs demand."
   },
   {
    "arabic": "وَلَئِن سَأَلْتَهُم",
    "ref": "31:25",
    "surah": "Sūrat Luqman",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَئِن",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "سَأَلْتَ",
      "role": "root"
     },
     {
      "text": "هُم",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and — if — you asked — them",
    "smooth": "And if you ask them…",
    "whatChanged": "This is the doorway into longer discourse: particles stack (وَ + لَئِن), and the attached pronoun marks who is being asked—these are easiest to notice on the second pass."
   }
  ],
  "traps": [
   {
    "claim": "Don't confuse a connector with part of the word itself",
    "example": "وَلَئِن",
    "note": "وَ is a separate connector (“and”), while لَئِن opens a conditional (“if”). In long āyāt, missing these joints makes the whole sentence feel like one unbroken string."
   },
   {
    "claim": "Don't treat attached pronouns as optional decoration",
    "example": "بِيَدِهِ",
    "note": "هِ changes “hand” into “His hand,” which changes reference and meaning. On a second read, always ask: whose? them? his? our?—because the Qur'an often relies on pronoun chains."
   },
   {
    "claim": "Don't translate prepositions loosely and move on without attaching them",
    "example": "لِلَّهِ",
    "note": "لِـ is the relationship marker: it binds a phrase to what came before (often “praise,” “thanks,” “belongs”). If you don’t attach it, you understand vocabulary but miss the logic."
   },
   {
    "claim": "Don't assume the first pass is the 'real' reading and the second is redundant",
    "example": "عَلَىٰ عَبْدِهِ",
    "note": "First pass: meaning. Second pass: structure—where phrases begin, where pronouns point, what is governed by what. That is how grammar becomes visible without doing production exercises."
   }
  ],
  "checklist": [
   "Choose a stretch to read: begin with Juzʾ ʿAmma, then move to Juzʾ 29, then 28; only then commit time to long middle sūrahs.",
   "Pass 1 (meaning pass): underline only high-frequency anchors you already know (ٱللَّه, رَبّ, ٱلْحَمْد, ٱلْكِتَٰب). Keep moving.",
   "Pass 2 (structure pass): circle particles and connectors (وَ، ثُمَّ, لَئِن, إِنَّ when you see it). These are the sentence joints.",
   "On pass 2, box every prepositional phrase starter (بِـ, لِـ, عَلَىٰ, مِنْ) and draw an arrow to the word it attaches to.",
   "On pass 2, highlight every attached pronoun (ـه, ـهم, etc.) and write a tiny English label above it (his/their/them).",
   "If an āyah feels 'too long,' don’t abandon it—repeat it once more; the second pass is where you locate the main clause and stop feeling lost."
  ],
  "summary": [
   "Rule: Read in a graded order—Juzʾ ʿAmma → Juzʾ 29 → Juzʾ 28 → the long middle sūrahs—and reread passages so structure becomes visible.",
   "What it looks like: on the second pass you actively notice the signals (particles, prepositions, attached pronouns, endings) that connect the familiar words into a clear sentence.",
   "What you can now do: stop reading at random, keep difficulty rising with you, and use repetition to turn “I know these words” into “I see how this sentence works.”"
  ],
  "quizBridge": "The quiz will show short Qur'anic snippets and ask you to pick the best next reading stage and to identify the connectors (particles/prepositions/attached pronouns) that make the sentence structure visible on a second pass."
 },
 {
  "id": "why-this-form-here",
  "n": 27,
  "title": "Asking why this form and not another",
  "stage": "Reading",
  "level": "B2",
  "structure": "Once you can identify a form, you can ask why it was chosen. Why نَزَّلَ here and أَنْزَلَ there. Why the passive rather than naming the doer. Why a nominal sentence, which states a permanent fact, rather than a verbal one, which reports an event. Not rhetoric as a subject — just the habit of noticing that the choice was a choice.",
  "whyItMatters": "This is the point where reading stops being decoding. It is also the most engaging part of the whole thing, and it is available much earlier than people are usually told.",
  "canDo": "After this lesson you can spot a familiar Qur’anic form and immediately ask “why this form here?”—then answer with a small, text-based reason (agency, emphasis, permanence, or viewpoint) without turning it into a rhetoric lecture.",
  "rule": "Once you can identify a form, treat it as a deliberate choice. Ask what the form highlights: the doer (active) or the event/result (passive), an ongoing pattern (imperfect) or a completed act (perfect), a permanent fact (nominal sentence) or a happening (verbal sentence). You are not hunting fancy rhetoric—just noticing what meaning-shade the grammar itself points you toward.",
  "why": [
   "Prevents “flattening”: reading أُنزِلَ and أَنزَلَ as identical and missing when the text foregrounds the revelation itself vs naming Allah as the doer.",
   "Prevents wrong agency: assuming the doer is stated when the passive is intentionally leaving it unspoken because it is already known or not the focus.",
   "Prevents time/aspect mistakes: reading a habitual present (يُنَزِّلُ) as a one-time past event, or vice versa.",
   "Prevents sentence-type blindness: missing when a nominal opening (ذَٰلِكَ ٱلْكِتَٰبُ) is stating a stable reality rather than narrating an action."
  ],
  "pattern": {
   "caption": "Ask “why this form?” with four quick lenses (not a full rhetoric course).",
   "columns": [
    "Choice you notice",
    "What it tends to foreground",
    "A good ‘why’ question to ask"
   ],
   "rows": [
    [
     "Active (أَنزَلَ …)",
     "Doer is named/central",
     "Why is Allah’s action being explicitly stated here?"
    ],
    [
     "Passive (أُنزِلَ …)",
     "The event/thing sent down",
     "Why highlight ‘what was sent down’ rather than the Sender?"
    ],
    [
     "Perfect (أَنزَلْنَا …)",
     "Completed act / established fact",
     "Why present it as done and settled at this point?"
    ],
    [
     "Imperfect (يُنَزِّلُ …)",
     "Ongoing pattern / repeated giving",
     "Why frame it as continual provision rather than a single moment?"
    ],
    [
     "Nominal sentence (Xُ …)",
     "Stability/permanence",
     "Why state a lasting reality instead of reporting an action?"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "أُنزِلَ",
    "blocks": [
     {
      "text": "أُ",
      "role": "verbPrefix",
      "gloss": "passive marker"
     },
     {
      "text": "نز",
      "role": "root",
      "gloss": "come down"
     },
     {
      "text": "لَ",
      "role": "verbSuffix",
      "gloss": "perfect ending"
     }
    ],
    "note": "The opening أُ- is your visual cue: it often signals a passive perfect (‘was sent down’) in this family."
   },
   {
    "word": "أَنزَلَ",
    "blocks": [
     {
      "text": "أَ",
      "role": "verbPrefix",
      "gloss": "Form IV"
     },
     {
      "text": "نز",
      "role": "root",
      "gloss": "come down"
     },
     {
      "text": "لَ",
      "role": "verbSuffix",
      "gloss": "perfect ending"
     }
    ],
    "note": "Form IV أَفْعَلَ pattern: active causation (‘to send down’). Same root letters, different spotlight."
   },
   {
    "word": "يُنَزِّلُ",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "imperfect he"
     },
     {
      "text": "نزّ",
      "role": "root",
      "gloss": "send down"
     },
     {
      "text": "لُ",
      "role": "verbSuffix",
      "gloss": "imperfect ending"
     }
    ],
    "note": "The doubled middle consonant (here shown by the sense of نزّ) is the Form II ‘intensive/repeated’ feel; with يُ- it becomes ongoing/habitual."
   },
   {
    "word": "ٱلْكِتَٰبُ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "particle",
      "gloss": "the (al-)"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "book"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "subject -u"
     }
    ],
    "note": "Split the definite article and the case ending: they are often the signals that tell you what kind of sentence is being made."
   }
  ],
  "examples": [
   {
    "arabic": "مَآ أُنزِلَ إِلَيْكَ",
    "ref": "2:4",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "مَآ ",
      "role": "plain"
     },
     {
      "text": "أُ",
      "role": "verbPrefix"
     },
     {
      "text": "نز",
      "role": "root"
     },
     {
      "text": "لَ ",
      "role": "verbSuffix"
     },
     {
      "text": "إِلَى",
      "role": "preposition"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "what was-sent-down to you",
    "smooth": "what has been sent down to you",
    "whatChanged": "This uses the passive (أُنزِلَ): the focus is the revealed content that must be believed, not naming the Sender in the same word."
   },
   {
    "arabic": "أَنزَلَ ٱللَّهُ لَكُم",
    "ref": "10:59",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "أَ",
      "role": "verbPrefix"
     },
     {
      "text": "نز",
      "role": "root"
     },
     {
      "text": "لَ ",
      "role": "verbSuffix"
     },
     {
      "text": "ٱللَّهُ ",
      "role": "plain"
     },
     {
      "text": "لَ",
      "role": "preposition"
     },
     {
      "text": "كُم",
      "role": "attachedPronoun"
     }
    ],
    "literal": "sent-down Allah for you(pl.)",
    "smooth": "Allah sent down for you",
    "whatChanged": "Now the doer is explicitly named right after the active verb; the text is pressing responsibility: you are judging what Allah sent."
   },
   {
    "arabic": "يُنَزِّلُ لَكُم",
    "ref": "40:13",
    "surah": "Sūrat Ghafir",
    "segments": [
     {
      "text": "يُ",
      "role": "verbPrefix"
     },
     {
      "text": "نزّ",
      "role": "root"
     },
     {
      "text": "لُ ",
      "role": "verbSuffix"
     },
     {
      "text": "لَ",
      "role": "preposition"
     },
     {
      "text": "كُم",
      "role": "attachedPronoun"
     }
    ],
    "literal": "he sends-down for you(pl.)",
    "smooth": "He keeps sending down for you",
    "whatChanged": "The imperfect Form II pushes an ‘ongoing provision’ viewpoint: not one past sending, but a repeated/continuous giving."
   },
   {
    "arabic": "إِذَا مَآ أُنزِلَتْ",
    "ref": "9:124",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "إِذَا ",
      "role": "particle"
     },
     {
      "text": "مَآ ",
      "role": "plain"
     },
     {
      "text": "أُ",
      "role": "verbPrefix"
     },
     {
      "text": "نز",
      "role": "root"
     },
     {
      "text": "لَتْ",
      "role": "verbSuffix"
     }
    ],
    "literal": "when was-sent-down (f.)",
    "smooth": "whenever a sūrah is sent down",
    "whatChanged": "The passive plus the ‘when(ever)’ frame makes the repeated event itself the trigger—watching people’s reactions, not discussing the Sender."
   },
   {
    "arabic": "ذَٰلِكَ ٱلْكِتَٰبُ لَا رَيْبَ",
    "ref": "2:2",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "ذَٰلِكَ ",
      "role": "plain"
     },
     {
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "كِتَٰب",
      "role": "root"
     },
     {
      "text": "ُ ",
      "role": "nounEnding"
     },
     {
      "text": "لَا ",
      "role": "particle"
     },
     {
      "text": "رَيْبَ",
      "role": "plain"
     }
    ],
    "literal": "that the-book (is) no doubt",
    "smooth": "That is the Book—no doubt in it",
    "whatChanged": "This is a nominal sentence move: it states a stable reality (‘no doubt’) rather than reporting an action that happened."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse passive ‘was sent down’ with ‘they sent down’.",
    "example": "أُنزِلَ",
    "note": "The initial أُ- is not a subject pronoun; it’s a passive cue. In these examples, the doer is not in the verb—your brain must not invent a ‘they’."
   },
   {
    "claim": "Don’t treat all ‘sent down’ verbs as the same just because the root is نزل.",
    "example": "أَنزَلَ / يُنَزِّلُ",
    "note": "Same root, different form/aspect: Form IV often presents the act as a single sending; Form II in the imperfect often reads as repeated/ongoing sending."
   },
   {
    "claim": "Don’t miss that a noun ending can be the sentence signal.",
    "example": "ٱلْكِتَٰبُ",
    "note": "The  ُ  ending is doing real work: it helps you read ‘the Book’ as the subject of a nominal sentence. Ignoring endings can make the line feel like word-pile decoding."
   }
  ],
  "checklist": [
   "Circle the verb first, then label: perfect vs imperfect (look for يـ/تـ/أـ/نـ prefixes).",
   "If the verb starts with أُ- in this family, consider: is it passive? Ask: “Why hide the doer here?”",
   "If Allah (ٱللَّهُ) appears right after the verb, ask: “Is the text foregrounding agency/responsibility?”",
   "If you see يُنَزِّلُ, ask: “Is this describing an ongoing pattern rather than a one-time event?”",
   "If the line begins with a noun/pointing word (ذَٰلِكَ …), check for a nominal sentence feel: “Is this stating a lasting fact?”",
   "Write one ‘why’ in the margin in English: focus on doer vs event, ongoing vs completed, permanent statement vs happening."
  ],
  "summary": [
   "Rule: grammar choices are meaning choices—ask why this form was selected.",
   "Look for signals: passive أُ- vs active أَ-, imperfect يُ-, and nominal-sentence markers like ٱلْ…ُ.",
   "You can now read beyond decoding by giving a small, text-grounded reason for the form you are seeing."
  ],
  "quizBridge": "The quiz will show short snippets and ask you to identify the choice (active/passive, perfect/imperfect, nominal/verbal) and pick the most likely ‘why’ focus it creates."
 },
 {
  "id": "reading-unaided",
  "n": 28,
  "title": "Reading pages without leaning on a translation",
  "stage": "Reading",
  "level": "B2",
  "structure": "The end state: read continuously, using the root, the form and the particles, and reach for a translation only to check yourself rather than to find out. A few pages at a time, the same passage more than once, and translation as an answer key instead of a crutch.",
  "whyItMatters": "This is what the course was for. Not knowing about Arabic — opening the muṣḥaf and understanding what is in front of you.",
  "canDo": "After this lesson you can read a few Qur’an pages continuously by chaining particles + form markers + root meaning into a running paraphrase, using a translation only as an answer key.",
  "rule": "Read forward, not downward into a translation: first catch the particles (especially إِنَّ / لَن / لَا / وَ / فِى / بِـ / مِن / عَلَىٰ), then identify the verb form markers and the root, then confirm “who did what to whom” with the endings/attached pronouns. Your goal is not perfect wording; it is a stable, testable meaning that you can keep while you move to the next phrase. Only after you have a guess, check a translation to correct your guess—then reread the same Arabic with the correction in your head.",
  "why": [
   "Prevents the common failure: knowing many roots but still getting lost because particles (إِنَّ, لَن, لَا, مِن, بِـ) were skipped.",
   "Prevents the “translation-first” habit where Arabic becomes decoration and you never build continuous comprehension.",
   "Prevents misreading the same-looking phrase patterns (إِنَّ ٱلَّذِينَ… / وَٱلَّذِينَ…) as “new vocabulary” each time instead of reusable structures.",
   "Prevents drifting: rereading the exact passage twice locks in particles + form markers, which is what makes meaning stay."
  ],
  "pattern": {
   "caption": "The continuous-reading loop: particles → structure → root → quick paraphrase → move on → check",
   "columns": [
    "What you notice first",
    "What it signals",
    "What you do next"
   ],
   "rows": [
    [
     "إِنَّ / وَ / لَا / لَن",
     "clause type & emphasis/negation/connection",
     "decide: ‘Indeed… / And… / Not… / Never…’"
    ],
    [
     "ٱلَّذِينَ / مَنْ / هُمْ",
     "who the clause is about",
     "hold a placeholder: ‘those who… / whoever… / they…’"
    ],
    [
     "Verb form markers (تـ, يُـ, سـ, ـوا)",
     "time/voice/subject",
     "identify the verb chunk, then its root"
    ],
    [
     "Prepositions (بِـ, مِن, فِى, عَلَىٰ)",
     "relationship: with/from/in/on",
     "attach the phrase to what it governs"
    ],
    [
     "Root meaning",
     "core action/idea",
     "choose the closest meaning that fits the particles"
    ],
    [
     "Quick check (translation after)",
     "confirmation not discovery",
     "re-read the Arabic once more with the corrected meaning"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "إِنَّ",
    "blocks": [
     {
      "text": "إِنَّ",
      "role": "particle",
      "gloss": "indeed / truly"
     }
    ],
    "note": "Treat it as a single chunk that ‘sets the tone’ for what follows; do not try to derive it from a root."
   },
   {
    "word": "لَنُدْخِلَنَّهُمْ",
    "blocks": [
     {
      "text": "لَ",
      "role": "particle",
      "gloss": "surely (emphasis)"
     },
     {
      "text": "نُ",
      "role": "verbPrefix",
      "gloss": "We (subject)"
     },
     {
      "text": "دْخِل",
      "role": "root",
      "gloss": "enter / admit"
     },
     {
      "text": "نَّ",
      "role": "verbSuffix",
      "gloss": "certainly (stress)"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "them"
     }
    ],
    "note": "This is the ‘continuous reading’ win: even if you don’t name the grammar, you can hear emphasis + subject + action + object."
   },
   {
    "word": "سَيَنَالُهُمْ",
    "blocks": [
     {
      "text": "سَ",
      "role": "particle",
      "gloss": "will (soon)"
     },
     {
      "text": "يَنَال",
      "role": "root",
      "gloss": "reach / befall"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "them"
     }
    ],
    "note": "Split off سَ and the attached pronoun; what remains carries the event."
   },
   {
    "word": "بِمَآ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "with / in"
     },
     {
      "text": "مَآ",
      "role": "plain",
      "gloss": "what / that which"
     }
    ],
    "note": "Keep بِـ glued to what follows; it often tells you how a verb relates to its object."
   }
  ],
  "examples": [
   {
    "arabic": "إِنَّ ٱلَّذِينَ كَفَرُوا۟",
    "ref": "2:6",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "إِنَّ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلَّذِينَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَفَر",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     }
    ],
    "literal": "Indeed / those who / disbelieved (they).",
    "smooth": "Indeed, the ones who disbelieve…",
    "whatChanged": "This establishes the reusable launch pattern for pages of Qur’an: particle + relative ‘those who’ + a rooted action."
   },
   {
    "arabic": "لَا يُؤْمِنُونَ",
    "ref": "2:6",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "لَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يُؤْمِن",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "not / they believe.",
    "smooth": "they do not believe.",
    "whatChanged": "Now you connect the earlier subject (‘those who…’) to a negated ongoing verb without leaving the Arabic line."
   },
   {
    "arabic": "لَن تُغْنِىَ عَنْهُمْ",
    "ref": "3:116",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "لَن",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "تُغْنِىَ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَنْ",
      "role": "preposition"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "never / will avail / away-from them.",
    "smooth": "will never benefit them.",
    "whatChanged": "You add a new ‘page-reading’ cue: لَن flips the whole clause into strong future negation, and عَنْهُمْ pins the direction (‘from them’)."
   },
   {
    "arabic": "سَيَنَالُهُمْ غَضَبٌۭ",
    "ref": "7:152",
    "surah": "Sūrat Al-A'raaf",
    "segments": [
     {
      "text": "سَ",
      "role": "particle"
     },
     {
      "text": "يَنَال",
      "role": "root"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "غَضَب",
      "role": "root"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding"
     }
    ],
    "literal": "will / reach-them / anger (subject).",
    "smooth": "anger will soon reach them.",
    "whatChanged": "This shows how to keep moving when Arabic word order differs from English: the ‘event’ is verb-first, and the noun ending helps you treat غَضَبٌۭ as the doer/subject in meaning."
   },
   {
    "arabic": "بِمَآ أُنزِلَ",
    "ref": "2:4",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "مَآ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أُ",
      "role": "verbPrefix"
     },
     {
      "text": "نزِل",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "verbSuffix"
     }
    ],
    "literal": "in/with what / was-sent-down.",
    "smooth": "in what has been sent down…",
    "whatChanged": "You practice reading through a prepositional link (بِـ) into a passive-looking verb chunk, relying on root recognition (نزل) to keep continuity."
   },
   {
    "arabic": "لَنُدْخِلَنَّهُمْ فِى",
    "ref": "29:9",
    "surah": "Sūrat Al-Ankaboot",
    "segments": [
     {
      "text": "لَ",
      "role": "particle"
     },
     {
      "text": "نُ",
      "role": "verbPrefix"
     },
     {
      "text": "دْخِل",
      "role": "root"
     },
     {
      "text": "نَّ",
      "role": "verbSuffix"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِى",
      "role": "preposition"
     }
    ],
    "literal": "surely / We / admit / certainly / them / in.",
    "smooth": "We will surely admit them into…",
    "whatChanged": "This combines multiple signals in one run (emphasis + subject + root + object + preposition), which is exactly the skill of reading lines without pausing for translation."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse لَا with لَن",
    "example": "لَا يُؤْمِنُونَ / لَن تُغْنِىَ",
    "note": "Both negate, but they feel different in flow: لَا is plain negation, while لَن pushes you into ‘never / not going to’ for what follows. If you miss that, your whole sentence tone becomes wrong."
   },
   {
    "claim": "Don’t treat attached pronouns as optional decoration",
    "example": "عَنْهُمْ / سَيَنَالُهُمْ",
    "note": "هُمْ is often the whole object (‘them’). If you ignore it, you will keep asking ‘benefit who?’ or ‘reach who?’ and you will stall on every line."
   },
   {
    "claim": "Don’t translate word order; translate relationships",
    "example": "سَيَنَالُهُمْ غَضَبٌۭ",
    "note": "Arabic may place the verb first and the noun after. Your job is to catch: event (root) + recipient (attached pronoun) + what is happening (noun). Then produce a natural English order in your head."
   },
   {
    "claim": "Don’t stop at the root; finish the particle too",
    "example": "بِمَآ أُنزِلَ",
    "note": "If you only see نزل (‘sent down’) but miss بِـ (‘in/with’), you lose how the phrase connects to the previous verb. Continuous reading depends on connectors more than on rare vocabulary."
   }
  ],
  "checklist": [
   "Before you start a passage, decide: 3–5 verses, twice through, no translation on the first pass.",
   "On each phrase, circle mentally the particles first (إِنَّ، لَا، لَن، وَ، سَ، بِـ، مِن، فِى، عَلَىٰ). Say their force in English in one word: ‘indeed / not / never / and / will / with / from / in / on’.",
   "Identify any verb chunk: grab prefixes/suffixes (يـ, تـ, نـ, ـون, ـوا, ـهُمْ) and isolate the root letters in the middle.",
   "Hold placeholders instead of stopping: ‘those who…’, ‘they…’, ‘for them…’, ‘from them…’—then keep moving.",
   "After 2–3 lines, summarize aloud in English one sentence of meaning (rough is fine), then reread the Arabic to see if every particle is accounted for.",
   "Only now open the translation: treat it as an answer key; adjust your guess; reread the same Arabic immediately once more."
  ],
  "summary": [
   "Rule: read forward by chaining particles + form markers + root meaning, and check translation only after you have a guess.",
   "Look for: clause starters (إِنَّ), negators (لَا/لَن), future marker (سَ), links (و), prepositions (بِـ/عَنْ/فِى), plus attached pronouns (هُمْ) that complete the meaning.",
   "You can now: take familiar Qur’anic patterns like إِنَّ ٱلَّذِينَ… and keep going line-by-line, building a stable running meaning without leaning on translation."
  ],
  "quizBridge": "The quiz will show short snippets and ask you to (1) mark the particles and attached pronouns, and (2) choose the best running meaning before seeing any translation."
 }
];

function quranLesson(unitId) {
  return QURAN_COURSE.find(l => l.id === unitId) || null;
}
