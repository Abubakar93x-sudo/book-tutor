// ============================================================================
// BookTutor — the Quranic Arabic course, written out (quran-course-data.js)
//
// All 40 lessons, in full. GENERATED — do not hand-edit; edit the syllabus in
// quran-grammar-data.js and re-run tools/build-course.cjs.
//
// Written by gpt-5.2 on 2026-08-08.
//
// Every one of the 221 Arabic examples below was checked against
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
  "id": "q-word-kinds",
  "n": 1,
  "title": "How a Quranic sentence hangs together",
  "stage": "Survival parsing",
  "level": "A0",
  "structure": "Every word in the Qur'an is one of three things: a NOUN (اسم — a thing, a person, a quality: كِتَاب، رَبّ، عَظِيم), a VERB (فِعْل — an action: قَالَ، يَعْلَمُ), or a PARTICLE (حَرْف — the glue: فِي، مِن، لَا، إِنَّ). Nouns and verbs carry the meaning; particles decide what the meaning DOES. Reading starts with sorting a verse into these three, not with translating word by word.",
  "whyItMatters": "Word-by-word translation is what makes verses collapse into nonsense. Sorting first gives you a shape to hang the meanings on.",
  "canDo": "After this lesson you can look at a short Qur’anic phrase and quickly sort its words into NOUN (اسم), VERB (فعل), and PARTICLE (حرف) so the sentence has a clear “skeleton” before you try to understand it.",
  "rule": "Every word in the Qur’an is either a NOUN (اسم), a VERB (فعل), or a PARTICLE (حرف). Nouns and verbs carry the main meaning; particles are the glue that tells you how the meaning works (negation, emphasis, direction, cause, etc.). Do not start with word‑by‑word translation; start by sorting, then connect the parts.",
  "why": [
   "Prevents treating glue-words as “extra”: you stop missing that لَا flips the meaning into a prohibition (not just “no”).",
   "Prevents scrambled English: you stop reading مِنَ ٱللَّهِ as if it were a new subject instead of a relationship (“from Allah”).",
   "Prevents misreading emphasis: you stop treating إِنَّا as a normal “we” when it is “indeed we” (assertion/strengthening).",
   "Prevents losing the sentence spine in long ayāt: you learn to locate the core VERB + who/what (NOUN/pronoun) even when many particles surround it."
  ],
  "pattern": {
   "caption": "The Qur’anic “sentence skeleton”: find the carriers (noun/verb) and the glue (particle).",
   "columns": [
    "Type",
    "What it does",
    "Typical examples (from today’s verses)"
   ],
   "rows": [
    [
     "NOUN (اسم)",
     "Names a person/thing/quality/idea",
     "ٱللَّهِ ، ٱلْكَوْثَرَ ، رَبِّ ، مُلْكًۭا"
    ],
    [
     "VERB (فعل)",
     "Carries an action/state (often the backbone)",
     "أَعْطَيْنَٰكَ ، قَالَ ، يَنۢبَغِى"
    ],
    [
     "PARTICLE (حرف)",
     "Controls relationships (negation, emphasis, direction, exception, purpose)",
     "بِـ ، مِن ، لَا ، إِنَّ"
    ],
    [
     "Preposition (a particle subtype)",
     "Shows “in/from/to/on/with/by” type links",
     "بِسْمِ ، مِنَ ٱللَّهِ ، عَلَيْهِ"
    ],
    [
     "Attached pronoun (clitic)",
     "A built-in “he/they/you/me” attached to a word",
     "ـنَا in إِنَّا ، ـكَ in أَعْطَيْنَٰكَ"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "إِنَّآ",
    "blocks": [
     {
      "text": "إِنَّ",
      "role": "particle",
      "gloss": "indeed (emphasis)"
     },
     {
      "text": "ا",
      "role": "attachedPronoun",
      "gloss": "we (us)"
     }
    ],
    "note": "The emphasis particle إِنَّ comes first; the “we” is attached as a pronoun, so the word acts like ‘Indeed, We…’"
   },
   {
    "word": "أَعْطَيْنَٰكَ",
    "blocks": [
     {
      "text": "أَعْطَيْ",
      "role": "root",
      "gloss": "gave (grant)"
     },
     {
      "text": "نَا",
      "role": "verbSuffix",
      "gloss": "we (did)"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun",
      "gloss": "to you"
     }
    ],
    "note": "One verb can contain the doer (نَا = we) and the receiver (كَ = you) without extra words."
   },
   {
    "word": "بِسْمِ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "in/by (with)"
     },
     {
      "text": "سْمِ",
      "role": "plain",
      "gloss": "name"
     }
    ],
    "note": "The preposition بِـ is glued onto the front of the noun; in the mushaf it is written as one word."
   },
   {
    "word": "لَا",
    "blocks": [
     {
      "text": "لَا",
      "role": "particle",
      "gloss": "do not (neg.)"
     }
    ],
    "note": "لَا is a particle that changes what follows; when it comes before a verb it often means prohibition/negation."
   },
   {
    "word": "مِنَ",
    "blocks": [
     {
      "text": "مِنَ",
      "role": "preposition",
      "gloss": "from (of)"
     }
    ],
    "note": "مِن is pure glue: it rarely ‘translates’ well alone, but it always forces a relationship with the next noun."
   }
  ],
  "examples": [
   {
    "arabic": "إِنَّآ أَعْطَيْنَٰكَ ٱلْكَوْثَرَ",
    "ref": "108:1",
    "surah": "Sūrat Al-Kawthar",
    "segments": [
     {
      "text": "إِنَّآ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَعْطَيْنَٰكَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْكَوْثَرَ",
      "role": "plain"
     }
    ],
    "literal": "Indeed we / gave-you / the-Kawthar",
    "smooth": "Indeed, We have granted you al-Kawthar.",
    "whatChanged": "This shows the basic backbone: a PARTICLE for emphasis, then a VERB carrying ‘we’ and ‘you’, then a NOUN as the object."
   },
   {
    "arabic": "بِسْمِ ٱللَّهِ",
    "ref": "108:1",
    "surah": "Sūrat Al-Kawthar",
    "segments": [
     {
      "text": "بِسْمِ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهِ",
      "role": "plain"
     }
    ],
    "literal": "in-name / of-Allah",
    "smooth": "In the name of Allah.",
    "whatChanged": "This shows a sentence can begin with glue: a preposition (particle-type) attaches to a noun and forces a relationship."
   },
   {
    "arabic": "لَا تَدْخُلُوا۟",
    "ref": "12:67",
    "surah": "Sūrat Yusuf",
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
      "text": "تَدْخُلُوا۟",
      "role": "plain"
     }
    ],
    "literal": "do-not / enter",
    "smooth": "Do not enter.",
    "whatChanged": "This shows a PARTICLE can control the whole action: understanding لَا first prevents you from reading the verb as a simple command without negation."
   },
   {
    "arabic": "مِّنَ ٱللَّهِ",
    "ref": "12:67",
    "surah": "Sūrat Yusuf",
    "segments": [
     {
      "text": "مِّنَ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهِ",
      "role": "plain"
     }
    ],
    "literal": "from / Allah",
    "smooth": "from Allah.",
    "whatChanged": "This shows how a small glue-word (preposition) prevents a common collapse: treating the next noun as a new ‘topic’ instead of a linked phrase."
   },
   {
    "arabic": "قَالَ رَبِّ ٱغْفِرْ لِى",
    "ref": "38:35",
    "surah": "Sūrat Saad",
    "segments": [
     {
      "text": "قَالَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَبِّ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱغْفِرْ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لِى",
      "role": "plain"
     }
    ],
    "literal": "he-said / my-Lord / forgive / for-me",
    "smooth": "He said, “My Lord, forgive me.”",
    "whatChanged": "This shows multiple verbs can stack: a reporting VERB (قَالَ) then a command VERB (ٱغْفِرْ), with particles/pronouns tying roles together."
   },
   {
    "arabic": "وَلَا ٱلضَّآلِّينَ",
    "ref": "1:7",
    "surah": "Sūrat Al-Faatiha",
    "segments": [
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
      "text": "ٱلضَّآلِّينَ",
      "role": "plain"
     }
    ],
    "literal": "and / not / the-strayers",
    "smooth": "and not those who went astray.",
    "whatChanged": "This shows particles can come in pairs (وَ + لَا): one connects, the other negates, so you don’t misread it as just ‘and the…’"
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse “finding meanings” with “finding types.”",
    "example": "إِنَّآ أَعْطَيْنَٰكَ",
    "note": "At this stage, you are not trying to produce a perfect translation. Your first win is: ‘particle + verb (with pronouns inside)’. That skeleton stays stable even when your vocabulary is limited."
   },
   {
    "claim": "Don’t treat particles as optional decoration.",
    "example": "لَا تَدْخُلُوا۟",
    "note": "If you skip لَا, you reverse the instruction. Particles are often short and easy to overlook, but they can flip, limit, or intensify the entire clause."
   },
   {
    "claim": "Don’t assume every Arabic ‘word’ is one idea.",
    "example": "بِسْمِ",
    "note": "Some words are fused units: a preposition attached to a noun. If you don’t separate the glue (بِـ), you lose the relationship and the phrase feels like a random noun string."
   }
  ],
  "checklist": [
   "Underline (mentally) every very short word: often it is a PARTICLE (like لَا, إِنَّ, وَ) or a preposition (like مِن, بِـ).",
   "Circle the action word(s): anything that looks like “did/does/will do” is a VERB (e.g., قَالَ, أَعْطَيْنَٰكَ).",
   "Mark the remaining meaning-words as NOUN candidates (names, things, qualities): e.g., ٱللَّهِ, رَبِّ, ٱلْكَوْثَرَ.",
   "When a word ends with a small pronoun sound (like ـى, ـكَ, ـنَا), suspect an attached pronoun: ask ‘for me? to you? we?’",
   "Only after sorting, connect: preposition + next noun; negation particle + next verb; emphasis particle + whole clause.",
   "If the phrase feels like nonsense in English, restart by re-identifying the particles—you probably skipped one."
  ],
  "summary": [
   "Rule: every Qur’anic word is a NOUN, a VERB, or a PARTICLE; nouns/verbs carry meaning, particles control how it works.",
   "What it looks like: short glue-words (لَا, مِن, بِـ, إِنَّ, وَ) wrap around a few strong carriers (verbs/nouns) that form the backbone.",
   "What you can now do: before translating, you can map a snippet into ‘glue’ and ‘carriers’ so the sentence hangs together instead of collapsing into word-by-word fragments."
  ],
  "quizBridge": "The quiz will show short snippets and ask you to label the words as noun/verb/particle (and spot prepositions and attached pronouns) before choosing the best overall meaning."
 },
 {
  "id": "q-connectors",
  "n": 2,
  "title": "And, then, so, but — the words that carry the thread",
  "stage": "Survival parsing",
  "level": "A0",
  "structure": "وَ and · فَ so/then (immediately) · ثُمَّ then (after a gap) · بَلْ rather/on the contrary · لَٰكِنْ but. وَ and فَ are written joined to the next word, which is why they are so easy to miss: وَقَالَ is وَ + قَالَ. فَ implies consequence where وَ is only addition.",
  "whyItMatters": "These are the joints of a long āyah. Track them and a verse becomes a sequence of claims instead of a wall of words.",
  "canDo": "After this lesson you can follow the thread of a long āyah by spotting وَ / فَ / ثُمَّ / بَلْ / لَٰكِنْ and reading each clause as a step (addition, consequence, delayed sequence, correction, or contrast).",
  "rule": "These small particles are the joints between claims. وَ usually just adds another item or clause; فَ links what follows as a result/next step (often immediate). ثُمَّ also means “then” but with a gap or later stage; بَلْ corrects or overturns what was assumed (“rather/on the contrary”); لَٰكِنْ means “but” (contrast). Remember: وَ and فَ are often written attached to the next word, so you must look for them at the start of a word, not as a separate token.",
  "why": [
   "Prevents reading a verse as one long list when it is actually a sequence (especially where فَ signals “therefore/so”).",
   "Prevents missing a new clause because وَ/فَ are attached (e.g., فَٱتَّبِعُوهُ), which can make you mis-assign who is doing what.",
   "Prevents misreading time/sequence: ثُمَّ often signals a later stage, not immediate next action.",
   "Prevents misunderstanding a correction: بَلْ can flip the direction of the statement (“not that—rather this”)."
  ],
  "pattern": {
   "caption": "Thread-carrying particles: what they usually do in Qur’anic reading",
   "columns": [
    "Particle",
    "Core sense",
    "Reader’s move"
   ],
   "rows": [
    [
     "وَ",
     "and / plus",
     "Add another item/clause without assuming cause"
    ],
    [
     "فَ",
     "so / then (immediate)",
     "Read what follows as consequence/next step from what came before"
    ],
    [
     "ثُمَّ",
     "then (after a gap)",
     "Expect a later stage or a shift after time/steps"
    ],
    [
     "بَلْ",
     "rather / on the contrary",
     "Correct what was assumed; replace with what follows"
    ],
    [
     "لَٰكِنْ",
     "but",
     "Hold both sides; the second contrasts or limits the first"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "فَٱتَّبِعُوهُ",
    "blocks": [
     {
      "text": "فَ",
      "role": "particle",
      "gloss": "so/then"
     },
     {
      "text": "ٱتَّبِعُو",
      "role": "plain",
      "gloss": "follow (you all)"
     },
     {
      "text": "هُ",
      "role": "attachedPronoun",
      "gloss": "him/it"
     }
    ],
    "note": "Boundary: فَ is glued to the next word in writing; the pronoun هُ is glued at the end."
   },
   {
    "word": "وَبِٱلْءَاخِرَةِ",
    "blocks": [
     {
      "text": "وَ",
      "role": "particle",
      "gloss": "and"
     },
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "in/with"
     },
     {
      "text": "ٱلْءَاخِرَةِ",
      "role": "plain",
      "gloss": "the Hereafter"
     }
    ],
    "note": "Two attachments stack: وَ attaches to the word, and بِ attaches to the noun after it."
   },
   {
    "word": "ثُمَّ",
    "blocks": [
     {
      "text": "ثُمَّ",
      "role": "particle",
      "gloss": "then (later)"
     }
    ],
    "note": "ثُمَّ is usually written as its own word; the key is meaning (later stage), not attachment."
   },
   {
    "word": "فَلَهُمْ",
    "blocks": [
     {
      "text": "فَ",
      "role": "particle",
      "gloss": "so/then"
     },
     {
      "text": "لَ",
      "role": "preposition",
      "gloss": "for/to"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "them"
     }
    ],
    "note": "This shows a common chain: فَ + preposition + pronoun, all in one written word."
   },
   {
    "word": "بَل",
    "blocks": [
     {
      "text": "بَل",
      "role": "particle",
      "gloss": "rather"
     }
    ],
    "note": "بَلْ (here written بَل) signals a correction: stop and reread the claim that follows as the intended one."
   }
  ],
  "examples": [
   {
    "arabic": "خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ",
    "ref": "10:3",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "خَلَقَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلسَّمَٰوَٰتِ",
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
      "text": "ٱلْأَرْضَ",
      "role": "plain"
     }
    ],
    "literal": "created the-heavens and-the-earth",
    "smooth": "He created the heavens and the earth.",
    "whatChanged": "This shows وَ as simple addition (two objects joined) with no “therefore” implied."
   },
   {
    "arabic": "فَٱعْبُدُوهُ",
    "ref": "10:3",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "ٱعْبُدُو",
      "role": "plain"
     },
     {
      "text": "هُ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "so worship (you all) him",
    "smooth": "So worship Him.",
    "whatChanged": "This shows فَ carrying consequence: the command is presented as a result of what was just stated."
   },
   {
    "arabic": "ثُمَّ ٱسْتَوَىٰ عَلَى ٱلْعَرْشِ",
    "ref": "10:3",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "ثُمَّ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱسْتَوَىٰ",
      "role": "plain"
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
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْعَرْشِ",
      "role": "plain"
     }
    ],
    "literal": "then established on the-throne",
    "smooth": "Then He established Himself over the Throne.",
    "whatChanged": "This shows ثُمَّ as sequencing with a later stage (not merely the next word, but the next phase)."
   },
   {
    "arabic": "ثُمَّ بَدَّلَ حُسْنًۢا بَعْدَ سُوٓءٍۢ",
    "ref": "27:11",
    "surah": "Sūrat An-Naml",
    "segments": [
     {
      "text": "ثُمَّ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بَدَّلَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "حُسْنًۢا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بَعْدَ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "سُوٓءٍۢ",
      "role": "plain"
     }
    ],
    "literal": "then changed good after evil",
    "smooth": "Then (later) he replaced evil with good.",
    "whatChanged": "This pairs ثُمَّ with بَعْدَ (“after”), reinforcing that ثُمَّ often points to a later turn in the story."
   },
   {
    "arabic": "إِنَّ ٱلَّذِينَ فَتَنُوا۟ ٱلْمُؤْمِنِينَ وَٱلْمُؤْمِنَٰتِ ثُمَّ لَمْ يَتُوبُوا۟ فَلَهُمْ",
    "ref": "85:10",
    "surah": "Sūrat Al-Burooj",
    "segments": [
     {
      "text": "إِنَّ",
      "role": "plain"
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
      "text": "فَتَنُوا۟",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْمُؤْمِنِينَ",
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
      "text": "ٱلْمُؤْمِنَٰتِ",
      "role": "plain"
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
      "text": "لَمْ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَتُوبُوا۟",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فَ",
      "role": "particle"
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
    "literal": "indeed those who persecuted the-believing-men and-the-believing-women then did-not repent so for-them",
    "smooth": "Those who persecuted believing men and women, then did not repent—so for them (is…).",
    "whatChanged": "This compresses all three joints: وَ (add), ثُمَّ (later stage), and فَ (therefore), letting you read the logic step-by-step."
   },
   {
    "arabic": "قَالَ بَل رَّبُّكُمْ",
    "ref": "21:56",
    "surah": "Sūrat Al-Anbiyaa",
    "segments": [
     {
      "text": "قَالَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بَل",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَّبُّكُمْ",
      "role": "plain"
     }
    ],
    "literal": "he said rather your-Lord",
    "smooth": "He said, ‘Rather, your Lord is…’",
    "whatChanged": "This shows بَل as correction/turn: it signals ‘not what you think; the real claim is what follows’."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse وَ with فَ",
    "example": "وَٱلْأَرْضَ / فَٱعْبُدُوهُ",
    "note": "وَ often just adds another item: “X and Y.” فَ often means “so/therefore/then (right away),” tying the next clause to the previous one as a result. If you read every فَ as plain “and,” you can miss the argument."
   },
   {
    "claim": "Don’t miss وَ and فَ because they attach to the next word",
    "example": "وَبِٱلْءَاخِرَةِ / فَٱتَّبِعُوهُ",
    "note": "In the mushaf, وَ and فَ frequently appear as the first letter of a word. Train yourself to scan the start of words for these single-letter joints."
   },
   {
    "claim": "Don’t collapse ثُمَّ into “immediately next”",
    "example": "ثُمَّ ٱسْتَوَىٰ",
    "note": "ثُمَّ usually signals a later stage or a pause in the storyline/logic. Reading it like فَ can flatten the time/step structure of the āyah."
   },
   {
    "claim": "Don’t read بَل as simple “and”",
    "example": "بَل رَّبُّكُمْ",
    "note": "بَل introduces a correction: it replaces an assumed idea with the statement after it. When you see بَل, mentally ‘turn the page’ and expect a re-aimed claim."
   }
  ],
  "checklist": [
   "At the start of each new word, quickly ask: does it begin with وَ or فَ attached?",
   "When you see وَ, mark it mentally as “+ another piece” and keep the same direction unless other cues change it.",
   "When you see فَ, look left: what just happened or was just claimed? Read what follows as a consequence/next step.",
   "When you see ثُمَّ, slow down and expect a later stage; look for any sense of time, stages, or delayed outcome.",
   "When you see بَل, treat it as a correction: ‘not that—rather this,’ and reread the next clause as the intended one.",
   "If multiple joints appear in one line (…وَ… ثُمَّ… فَ…), use them to split the āyah into a clear sequence of mini-clauses."
  ],
  "summary": [
   "Rule: وَ adds; فَ advances with consequence/next step; ثُمَّ advances with a gap; بَل corrects; لَٰكِنْ contrasts.",
   "Look: وَ and فَ are often stuck onto the next word, so the joint is easy to miss unless you scan word-beginnings.",
   "Now: you can turn a long āyah into a readable chain of claims by following these connectors as signposts."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether the connector is adding (وَ), causing/advancing (فَ), sequencing later (ثُمَّ), or correcting (بَل), and to choose the best English ‘thread’ for the clause."
 },
 {
  "id": "q-prepositions",
  "n": 3,
  "title": "The prepositions you will meet on every page",
  "stage": "Survival parsing",
  "level": "A0",
  "structure": "فِي in · مِنْ from/of · إِلَى to · عَلَىٰ on/against · عَنْ about/away from · مَعَ with · بِـ with/by/in · لِـ for/to · كَـ like. The last three are single letters written onto the front of the following word: بِسْمِ is بِ + اسْم. Whatever follows a preposition takes a kasrah.",
  "whyItMatters": "A prepositional phrase is never the subject of the sentence. Spotting them tells you what to set aside while you look for who is doing what.",
  "canDo": "After this lesson you can spot the nine most common Qur’anic prepositions, read what they connect to, and mentally “set aside” the whole prepositional phrase while you look for who is doing what in the sentence.",
  "rule": "These words are prepositions: فِي مِنْ إِلَى عَلَىٰ عَنْ مَعَ and the attached letters بِـ لِـ كَـ. Whatever comes after a preposition is in the جرّ (jarr) position and is usually marked with a kasrah (ـِ) or behaves like it (even if you don’t know the full grammar yet). A prepositional phrase (preposition + its object) does not act as the subject of the sentence.",
  "why": [
   "Prevents you from mistaking a location/time phrase for “the doer” (subject) and then misreading the whole sentence.",
   "Stops you attaching the wrong meaning to a verb because you didn’t notice the verb is followed by بِـ / لِـ / إِلَى and therefore points “with/to/toward.”",
   "Helps you chunk long āyāt: you can temporarily bracket phrases like فِى نَفْسِهِۦ or عَلَيْهِمْ so you can find the main statement.",
   "Reduces dictionary overload: many “extra words” are just prepositions plus pronouns, not new vocabulary."
  ],
  "pattern": {
   "caption": "Core prepositions and what they usually do (recognition first; meanings are approximate and context-sensitive).",
   "columns": [
    "Form in mushaf",
    "Basic sense",
    "Typical object mark"
   ],
   "rows": [
    [
     "فِى",
     "in/within",
     "next word in jarr (often kasrah)"
    ],
    [
     "مِنْ",
     "from / of",
     "next word in jarr"
    ],
    [
     "إِلَى",
     "to / toward",
     "next word in jarr"
    ],
    [
     "عَلَىٰ",
     "on / upon / against",
     "next word in jarr"
    ],
    [
     "بِـ / لِـ / كَـ",
     "with/by/in · for/to · like (attached to next word)",
     "the attached word is in jarr"
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
      "gloss": "with/by"
     },
     {
      "text": "سْمِ",
      "role": "plain",
      "gloss": "name (jarr)"
     }
    ],
    "note": "The letter بِـ is written onto the front of the following word; the kasrah on the word shows it is governed by a preposition."
   },
   {
    "word": "لَّهُۥ",
    "blocks": [
     {
      "text": "لِ",
      "role": "preposition",
      "gloss": "for/to"
     },
     {
      "text": "ـهُۥ",
      "role": "attachedPronoun",
      "gloss": "to him"
     }
    ],
    "note": "لِـ attaches to a pronoun too; this single written word contains both the preposition and its object."
   },
   {
    "word": "عَمَّا",
    "blocks": [
     {
      "text": "عَ",
      "role": "preposition",
      "gloss": "about/from"
     },
     {
      "text": "مَّا",
      "role": "plain",
      "gloss": "what (merged)"
     }
    ],
    "note": "Sometimes عَنْ combines with ما in writing/recitation, producing عَمَّا; treat it as a preposition + what follows."
   },
   {
    "word": "عَلَيْهِمْ",
    "blocks": [
     {
      "text": "عَلَىٰ",
      "role": "preposition",
      "gloss": "on/upon"
     },
     {
      "text": "ـهِمْ",
      "role": "attachedPronoun",
      "gloss": "upon them"
     }
    ],
    "note": "The object of the preposition can be an attached pronoun; that whole unit is one prepositional phrase."
   }
  ],
  "examples": [
   {
    "arabic": "فِى نَفْسِهِۦ",
    "ref": "12:77",
    "surah": "Sūrat Yusuf",
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
      "text": "نَفْسِهِۦ",
      "role": "plain"
     }
    ],
    "literal": "in · his self",
    "smooth": "within himself.",
    "whatChanged": "This shows فِي marking an internal “location,” and the governed word carries the jarr-style kasrah."
   },
   {
    "arabic": "مِن قَبْلُ",
    "ref": "12:77",
    "surah": "Sūrat Yusuf",
    "segments": [
     {
      "text": "مِن",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "قَبْلُ",
      "role": "plain"
     }
    ],
    "literal": "from · before",
    "smooth": "from before / previously.",
    "whatChanged": "This adds مِنْ, which often signals source or earlier time; bracket it as a phrase so you don’t treat it as the subject."
   },
   {
    "arabic": "إِلَيْكِ بِجِذْعِ",
    "ref": "19:25",
    "surah": "Sūrat Maryam",
    "segments": [
     {
      "text": "إِلَيْكِ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بِجِذْعِ",
      "role": "plain"
     }
    ],
    "literal": "to you · with trunk",
    "smooth": "toward you, by/with the trunk…",
    "whatChanged": "This shows two prepositional links in a row: direction (إِلَى) and instrument/means (بِـ), both creating bracketable phrases."
   },
   {
    "arabic": "عَلَيْهِمْ",
    "ref": "1:7",
    "surah": "Sūrat Al-Faatiha",
    "segments": [
     {
      "text": "عَلَىٰ",
      "role": "preposition"
     },
     {
      "text": "ـهِمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "upon · them",
    "smooth": "upon them.",
    "whatChanged": "This shows the object of a preposition can be a pronoun attached to it, so you must read the word as a complete phrase."
   },
   {
    "arabic": "عَمَّا يُشْرِكُونَ",
    "ref": "28:68",
    "surah": "Sūrat Al-Qasas",
    "segments": [
     {
      "text": "عَمَّا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يُشْرِكُونَ",
      "role": "plain"
     }
    ],
    "literal": "about/from what · they associate",
    "smooth": "far above what they associate (with Him).",
    "whatChanged": "This shows عَنْ can appear in a merged-looking form (عَمَّا), so your eye must still recognize the preposition idea even when the spelling is compact."
   },
   {
    "arabic": "مَا عَلَى ٱلرَّسُولِ",
    "ref": "5:99",
    "surah": "Sūrat Al-Maaida",
    "segments": [
     {
      "text": "مَا",
      "role": "plain"
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
      "text": "ٱلرَّسُولِ",
      "role": "plain"
     }
    ],
    "literal": "not/what · upon · the Messenger",
    "smooth": "It is not upon the Messenger (except conveying).",
    "whatChanged": "This shows a whole clause can start with a prepositional phrase; spotting عَلَى helps you avoid treating “the Messenger” as the grammatical subject here."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a preposition with the similarly-shaped part of another word.",
    "example": "فِى ٱلْخَيْرَٰتِ",
    "note": "Here فِى is a complete separate word meaning “in.” Do not merge it mentally into what follows; it begins a phrase you can bracket."
   },
   {
    "claim": "Don’t miss attached-letter prepositions at the start of a word.",
    "example": "بِمَا تَصِفُونَ",
    "note": "The بِـ is not part of the root of the following word; it is a preposition. If you ignore it, you will lose the meaning “with/by what…” and misread the relationship."
   },
   {
    "claim": "Don’t assume every word ending with kasrah is ‘just’ vocabulary; it may be governed by a preposition you already passed.",
    "example": "عَلَى ٱلظَّٰلِمِينَ",
    "note": "Once you see عَلَىٰ, expect what follows to be in jarr. Let the ending remind you: this whole unit is a prepositional phrase, not the subject."
   }
  ],
  "checklist": [
   "Scan for the high-frequency forms: فِى مِنْ إِلَى عَلَىٰ عَنْ مَعَ, and for attached letters at word-start: بِـ لِـ كَـ.",
   "When you spot one, draw a mental bracket: [preposition + next word] (or [preposition + attached pronoun]).",
   "Confirm by looking for the jarr signal: the next word often has kasrah (ـِ) or looks “pulled down” in ending compared with surrounding words.",
   "If two prepositional phrases come back-to-back, bracket both separately (e.g., direction then instrument).",
   "While searching for the main message, temporarily set bracketed phrases aside: they give location, direction, means, relationship—rarely the doer.",
   "After you identify the core statement, bring the prepositional phrases back in to complete the meaning."
  ],
  "summary": [
   "Rule: Prepositions (including attached-letter ones) force what follows into jarr and create a prepositional phrase that is not the subject.",
   "What it looks like: short words like فِى / مِنْ / عَلَىٰ, or single letters stuck to the next word like بِـ, often followed by kasrah or an attached pronoun (عَلَيْهِمْ).",
   "What you can now do: bracket these phrases on sight so you can find the main “who did what,” then reattach the phrase to understand where/with what/to whom."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to (1) identify the preposition, (2) mark the full prepositional phrase, and (3) choose the best basic meaning (in/from/to/on/about/with/for/like)."
 },
 {
  "id": "q-definiteness",
  "n": 4,
  "title": "The, a, and why الْ changes everything",
  "stage": "Survival parsing",
  "level": "A0",
  "structure": "الْ on the front makes a noun definite: كِتَاب a book → الْكِتَاب the Book. The opposite mark is tanween — the doubled vowel on the end (كِتَابٌ، كِتَابًا، كِتَابٍ) — which means indefinite. A word never carries both. After the sun letters the ل is silent and the next letter doubles: الشَّمْس is written al-shams and read ash-shams.",
  "whyItMatters": "Definiteness is not decoration. It is the single test that separates a description from a full sentence, and both look identical without it.",
  "canDo": "After this lesson you can spot whether a Qur’anic noun is definite (with ٱلْ) or indefinite (with tanwīn), and use that to decide whether you are looking at “the X” vs “an X” and whether a phrase is acting like a label or a complete statement.",
  "rule": "ٱلْ at the front of a noun makes it definite: it points to a specific, known thing (“the …”). Tanwīn (ٌ/ً/ٍ) on the end makes a noun indefinite (“a/an …”) and you never get both on the same word. After “sun letters” the ل of ٱلْ is silent in reading and the next letter doubles (e.g., ٱلنَّاسِ is read an-nās).",
  "why": [
   "Prevents reading a description as a full sentence: Arabic can look identical until you notice “the” vs “a”.",
   "Prevents missing the intended referent: ٱلْكِتَٰبِ (“the Book”) is not the same as كِتَٰبٌ (“a book”).",
   "Prevents mis-parsing chains: once a noun is definite, the whole phrase can become a named, specific unit (e.g., أَهْلِ ٱلْكِتَٰبِ).",
   "Prevents pronunciation-based confusion when reading silently: in print the ل is there, but with sun letters you must expect the doubled next letter (ٱلنَّاسِ, ٱلَّذِى)."
  ],
  "pattern": {
   "caption": "Definite vs indefinite nouns you will meet constantly in the muṣḥaf",
   "columns": [
    "Form you see",
    "Meaning signal",
    "Tiny Qur’anic example"
   ],
   "rows": [
    [
     "ٱلْ + noun",
     "definite: “the …” (a specific one)",
     "ٱلْكِتَٰبِ (2:2)"
    ],
    [
     "noun + ٌ",
     "indefinite nominative: “a …” (as a subject-like noun)",
     "طَّآئِفَةٌۭ (3:69)"
    ],
    [
     "noun + ً",
     "indefinite accusative: “a …” (often object-like)",
     "بَطَرًۭا (8:47)"
    ],
    [
     "noun + ٍ",
     "indefinite genitive: “a …” after a preposition/construct",
     "حَقٌّۭ (35:5) is not this case, so watch endings"
    ],
    [
     "ٱلْ + sun letter (written ل, read silent)",
     "definite + doubled next letter in reading",
     "ٱلنَّاسِ (3:87)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلْكِتَٰبُ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the (al-)"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "book (base)"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "u-ending"
     }
    ],
    "note": "Boundary is right after ٱلْ: everything after it is the noun body plus its case ending."
   },
   {
    "word": "طَّآئِفَةٌۭ",
    "blocks": [
     {
      "text": "طَّآئِفَة",
      "role": "root",
      "gloss": "group/party"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding",
      "gloss": "an (indef.)"
     }
    ],
    "note": "Tanwīn is the doubled vowel mark at the end; it signals “a/an …”, not “the …”."
   },
   {
    "word": "بَطَرًۭا",
    "blocks": [
     {
      "text": "بَطَر",
      "role": "root",
      "gloss": "arrogance/pride"
     },
     {
      "text": "ًۭا",
      "role": "nounEnding",
      "gloss": "an (indef.)"
     }
    ],
    "note": "Accusative tanwīn is written with ً and often with an extra ا; treat the whole ending as the indefinite marker."
   },
   {
    "word": "ٱلنَّاسِ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the (al-)"
     },
     {
      "text": "نَّاس",
      "role": "root",
      "gloss": "people"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "i-ending"
     }
    ],
    "note": "This is the “sun letter” effect: the ل is written but not pronounced; the next letter (ن) doubles."
   }
  ],
  "examples": [
   {
    "arabic": "ذَٰلِكَ ٱلْكِتَٰبُ",
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
      "text": "كِتَٰبُ",
      "role": "root"
     }
    ],
    "literal": "that — the Book",
    "smooth": "That is the Book.",
    "whatChanged": "You can now see that ٱلْ turns كِتَٰب into a specific known referent (“the Book”), not merely “a book”."
   },
   {
    "arabic": "مِّنْ أَهْلِ ٱلْكِتَٰبِ",
    "ref": "3:69",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "مِّنْ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
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
      "role": "plain"
     },
     {
      "text": "كِتَٰبِ",
      "role": "root"
     }
    ],
    "literal": "from — people/of — the Book",
    "smooth": "from the People of the Book",
    "whatChanged": "Definiteness can sit inside a multi-word phrase; ٱلْ makes “Book” specific, which makes the whole label a known group."
   },
   {
    "arabic": "وَرِئَآءَ ٱلنَّاسِ",
    "ref": "8:47",
    "surah": "Sūrat Al-Anfaal",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "رِئَآءَ",
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
      "text": "نَّاسِ",
      "role": "root"
     }
    ],
    "literal": "and — showing-off — the people",
    "smooth": "and (for) showing off before the people",
    "whatChanged": "This example adds the sun-letter effect: the word is written with ٱلْ but read with a doubled next letter (an-nās)."
   },
   {
    "arabic": "يَٰٓأَيُّهَا ٱلنَّاسُ",
    "ref": "35:5",
    "surah": "Sūrat Faatir",
    "segments": [
     {
      "text": "يَٰٓأَيُّهَا",
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
      "text": "نَّاسُ",
      "role": "root"
     }
    ],
    "literal": "O (you) — the people",
    "smooth": "O people,",
    "whatChanged": "You can now recognize when Arabic is addressing a definite audience (“the people”) rather than an indefinite “people” with tanwīn."
   },
   {
    "arabic": "رَسُولًۭا مِّنْهُمْ",
    "ref": "62:2",
    "surah": "Sūrat Al-Jumu'a",
    "segments": [
     {
      "text": "رَسُول",
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
      "text": "مِّنْ",
      "role": "preposition"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "a messenger — from them",
    "smooth": "a messenger from among them",
    "whatChanged": "This contrasts with ٱلْ: tanwīn at the end marks an indefinite noun (“a messenger”), and it cannot coexist with ٱلْ."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse ٱلْ (definite) with a word that merely starts with ا or ل",
    "example": "ٱلَّذِى",
    "note": "In Qur’anic reading you will see many words starting with ٱل. Sometimes it’s the definite article (ٱلْكِتَٰبِ), and sometimes it’s just part of the word (ٱلَّذِى in 62:2). Use meaning: can you sensibly translate “the who”? If not, it’s not “the”."
   },
   {
    "claim": "Don’t try to read the written ل after sun letters",
    "example": "ٱلنَّاسِ",
    "note": "The mushaf writes ٱلْ, but in recitation the ل is silent and the next letter doubles. For comprehension, the key is still definiteness: it means “the people”, even if your ear hears an-nās."
   },
   {
    "claim": "Don’t treat tanwīn as decoration",
    "example": "طَّآئِفَةٌۭ",
    "note": "That doubled vowel is a meaning marker: it signals indefiniteness (“a group”). If you miss it, you may assume a known, specific group when the Qur’an is introducing an unspecified one."
   }
  ],
  "checklist": [
   "When you meet a noun, look first: does it begin with ٱلْ? If yes, assume “the …” unless context forces otherwise.",
   "If there is no ٱلْ, look last: is there tanwīn (ٌ/ً/ٍ) at the end? If yes, assume “a/an …”.",
   "Remember: a noun never carries both; if you think you see both, re-check where the word actually starts and ends.",
   "When you see ٱلْ followed by a letter with shadda ( ّ ), expect a sun-letter word (like ٱلنَّاسِ) and read it as definite anyway.",
   "In phrases, check each key noun: definiteness inside the phrase often makes the whole phrase a fixed label (أَهْلِ ٱلْكِتَٰبِ).",
   "Use definiteness to choose between “this is a description” vs “this is identifying something”: e.g., “ذَٰلِكَ ٱلْكِتَٰبُ” reads like naming a known entity, not introducing any book."
  ],
  "summary": [
   "Rule: ٱلْ makes a noun definite (“the …”); tanwīn makes it indefinite (“a/an …”), and they do not combine.",
   "Look: ٱلْ is at the front; tanwīn is the doubled vowel at the end; with sun letters the ل is silent and the next letter doubles (ٱلنَّاسِ).",
   "You can now: quickly read Qur’anic nouns as “the X” vs “a/an X” and use that to keep phrases, labels, and sentence meaning from blurring together."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify which nouns are definite vs indefinite (and to notice sun-letter assimilation like ٱلنَّاسِ)."
 },
 {
  "id": "q-pronouns-standalone",
  "n": 5,
  "title": "The standalone pronouns: he, they, you, we",
  "stage": "Survival parsing",
  "level": "A0",
  "structure": "هُوَ he · هِيَ she · هُمْ they (m) · هُنَّ they (f) · أَنْتَ you (m) · أَنْتِ you (f) · أَنْتُمْ you (pl) · أَنَا I · نَحْنُ we. These stand as separate words, unlike the attached versions coming in lessons 7, 8 and 13. Arabic has no word for \"is\", so هُوَ الْعَزِيزُ is a complete sentence: \"He is the Mighty\".",
  "whyItMatters": "Verses turn on who is being spoken about, and the pronoun is often the only thing telling you.",
  "canDo": "After this lesson you can spot the standalone pronouns (he, she, they, you, I, we) and use them to track who a Qur’anic sentence is talking about—even when there is no word for “is.”",
  "rule": "Arabic has a set of pronouns that appear as separate words: هُوَ، هِيَ، هُمْ، هُنَّ، أَنْتَ، أَنْتِ، أَنْتُمْ، أَنَا، نَحْنُ. These are not attached to the word before or after; they stand on their own. Arabic often forms “X is Y” sentences without any word for “is”, so a pronoun + a noun/adjective can already be a full sentence (e.g., هُوَ ٱلْحَقُّ = “He is the Truth”).",
  "why": [
   "Prevents losing the subject: you won’t misread a sentence as still talking about “they” when it switches to “He” (or vice versa).",
   "Prevents missing a complete statement: you’ll recognize pronoun + ٱلْ… as a full meaning without searching for “is.”",
   "Prevents wrong attribution: you’ll notice when the Qur’an moves from people’s actions to Allah’s description (or the other way)."
  ],
  "pattern": {
   "caption": "Standalone pronouns you will meet constantly (as separate words)",
   "columns": [
    "Pronoun",
    "Core meaning",
    "Typical use in reading"
   ],
   "rows": [
    [
     "هُوَ",
     "he / it (m)",
     "points to a previously mentioned male/person/thing; also used for Allah"
    ],
    [
     "هِيَ",
     "she / it (f)",
     "points to a previously mentioned female/thing treated as feminine"
    ],
    [
     "هُمْ / هُنَّ",
     "they (m) / they (f)",
     "keeps track of groups; often contrasts with هُوَ"
    ],
    [
     "أَنْتَ / أَنْتِ / أَنْتُمْ",
     "you (m) / you (f) / you (pl)",
     "direct address; often appears with commands or reminders"
    ],
    [
     "أَنَا / نَحْنُ",
     "I / we",
     "speaker identity; “We” is frequently used in divine speech"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "هُوَ",
    "blocks": [
     {
      "text": "هُوَ",
      "role": "plain",
      "gloss": "he / it"
     }
    ],
    "note": "This whole word is the pronoun; nothing attaches to it in this lesson."
   },
   {
    "word": "هِيَ",
    "blocks": [
     {
      "text": "هِيَ",
      "role": "plain",
      "gloss": "she / it"
     }
    ],
    "note": "Also a complete standalone word; look for it separating clauses."
   },
   {
    "word": "هُمْ",
    "blocks": [
     {
      "text": "هُمْ",
      "role": "plain",
      "gloss": "they (m)"
     }
    ],
    "note": "Do not mix this up with the attached pronoun ـهُمْ (coming later); here it is its own word."
   },
   {
    "word": "نَحْنُ",
    "blocks": [
     {
      "text": "نَحْنُ",
      "role": "plain",
      "gloss": "we"
     }
    ],
    "note": "When you see this, the speaker is explicitly “we”; it may start a new clause."
   }
  ],
  "examples": [
   {
    "arabic": "وَهُوَ يُدْرِكُ ٱلْأَبْصَٰرَ",
    "ref": "6:103",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
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
      "text": "يُدْرِكُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْأَبْصَٰرَ",
      "role": "plain"
     }
    ],
    "literal": "and + he + perceives + the sights",
    "smooth": "And He perceives all sight.",
    "whatChanged": "Shows a standalone pronoun (هُوَ) as the clear subject right after وَ, anchoring who is doing the action."
   },
   {
    "arabic": "وَهُوَ ٱللَّطِيفُ ٱلْخَبِيرُ",
    "ref": "6:103",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
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
      "text": "ٱللَّطِيفُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْخَبِيرُ",
      "role": "plain"
     }
    ],
    "literal": "and + he + the Subtle + the Aware",
    "smooth": "And He is the Subtle, the All-Aware.",
    "whatChanged": "Demonstrates the “no ‘is’ ” rule: pronoun + ٱلْ… names already makes a complete sentence."
   },
   {
    "arabic": "هُوَ ٱلْحَقُّ",
    "ref": "31:30",
    "surah": "Sūrat Luqman",
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
      "text": "ٱلْحَقُّ",
      "role": "plain"
     }
    ],
    "literal": "he + the Truth",
    "smooth": "He is the Truth.",
    "whatChanged": "A minimal, high-impact pattern: just two words can carry a full claim when the pronoun is explicit."
   },
   {
    "arabic": "قَالَ هِىَ رَٰوَدَتْنِى",
    "ref": "12:26",
    "surah": "Sūrat Yusuf",
    "segments": [
     {
      "text": "قَالَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "هِىَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَٰوَدَتْنِى",
      "role": "plain"
     }
    ],
    "literal": "he said + she + sought-to-seduce-me",
    "smooth": "He said, “She tried to seduce me.”",
    "whatChanged": "Introduces هِيَ as a standalone switch of reference: the statement hinges on “she” (not “he”)."
   },
   {
    "arabic": "وَلَا هُمْ يُسْتَعْتَبُونَ",
    "ref": "30:57",
    "surah": "Sūrat Ar-Room",
    "segments": [
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
      "text": "هُمْ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يُسْتَعْتَبُونَ",
      "role": "plain"
     }
    ],
    "literal": "and + not + they + will be allowed to seek/receive appeasement",
    "smooth": "And they will not be allowed to make amends.",
    "whatChanged": "Shows a standalone plural pronoun (هُمْ) after particles; it tells you immediately the ruling is about “they.”"
   },
   {
    "arabic": "وَإِنَّا لَهُۥ كَٰتِبُونَ",
    "ref": "21:94",
    "surah": "Sūrat Al-Anbiyaa",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "إِنَّا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَهُۥ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَٰتِبُونَ",
      "role": "plain"
     }
    ],
    "literal": "and + indeed we + for him + are writing/recording",
    "smooth": "And indeed We are recording it for him.",
    "whatChanged": "Adds the first-person plural sense (إِنَّا = ‘indeed we’): the speaker is explicitly “We,” which shifts the viewpoint."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the standalone pronoun هُمْ with an attached pronoun that happens to look similar later.",
    "example": "هُمْ",
    "note": "In this lesson, the pronoun is a separate word with its own space around it in the mushaf. Attached forms like ـهُمْ will come later and do not stand alone."
   },
   {
    "claim": "Don’t go hunting for a word meaning “is” after هُوَ/هِيَ.",
    "example": "هُوَ ٱلْحَقُّ",
    "note": "Arabic often states identity/description without a verb. Pronoun + a definite word (often starting ٱلْ) can already be a full sentence."
   },
   {
    "claim": "Don’t assume وَ always continues the same subject.",
    "example": "وَهُوَ",
    "note": "وَ can simply link, but the pronoun right after it can restart the clause with a fresh subject: “and HE…”, “and THEY…”. Train your eye to notice the pronoun immediately."
   }
  ],
  "checklist": [
   "Scan for short, common pronoun shapes: هُوَ / هِيَ / هُمْ / هُنَّ / أَنْتَ / أَنْتِ / أَنْتُمْ / أَنَا / نَحْنُ.",
   "Confirm it is standalone: it appears as its own word with spaces around it.",
   "Ask: who is being referred to—Allah, a person in the story, or a group just mentioned?",
   "If the next word begins with ٱلْ (definite), try reading “pronoun + (no ‘is’) + description”: هُوَ ٱلْ… = “He is the …”.",
   "If a verb follows, read it as “pronoun + verb”: وَهُوَ يُدْرِكُ = “and He perceives…”.",
   "When you see a pronoun, be ready for a turn: the verse may shift from “they” to “He” or from “he” to “she.”"
  ],
  "summary": [
   "The rule: certain pronouns come as separate words and can form complete meaning without “is.”",
   "What it looks like: tiny standalone words like هُوَ / هِيَ / هُمْ / نَحْنُ, often right after وَ or right before a description starting with ٱلْ.",
   "What you can now do: reliably track the subject in Qur’anic reading and recognize pronoun + description as a complete statement."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify the standalone pronoun and who it points to (he/she/they/we/you) in the sentence."
 },
 {
  "id": "q-find-root",
  "n": 6,
  "title": "Finding the three letters inside any word",
  "stage": "Survival parsing",
  "level": "A1",
  "structure": "Almost every Quranic word is three root letters wearing extras. Peel off the front (الْ ، وَ ، فَ ، بِ ، لِ ، كَ ، يَ ، تَ ، نَ ، أَ ، مُ ، مَ ، اسْتَ) and the back (ـهُ ، ـهُمْ ، ـكَ ، ـنَا ، ـِينَ ، ـُونَ ، ـَاتِ ، ـَان) and the three letters left standing are the root. الْمُسْلِمُونَ → س ل م.",
  "whyItMatters": "This is the skill the vocabulary track pays out on: know 300 roots and this one move, and a word you have never seen still gives up its meaning. It sits at lesson 6, not lesson 1, because stripping affixes has to come first — find the root too early and you find the wrong one.",
  "canDo": "After this lesson you can look at a new Qur’anic word, peel off common front and back add-ons, and recognize the three root letters that carry its core meaning.",
  "rule": "Most Qur’anic vocabulary is built on three root letters. Many words arrive wearing “extras” attached to the front (like وَ ، فَ ، بِ ، لِ ، الْ ، أَ ، يَ ، تَ ، نَ ، مُ ، مَ ، اسْتَ) or the back (like ـهُ ، ـهُمْ ، ـكَ ، ـنَا ، ـِينَ ، ـُونَ ، ـَاتِ ، ـَان). Strip those extras first; what remains is usually the three-letter root that unlocks the main meaning-family.",
  "why": [
   "Prevents you from missing a familiar meaning because the word is “dressed up” (e.g., seeing ٱلْمُسْلِمِينَ as totally new instead of related to س ل م).",
   "Prevents wrong dictionary lookups: if you search a full word with prefixes/suffixes attached, you often won’t find it.",
   "Prevents confusing grammar with meaning: endings like ـُونَ / ـِينَ change “who/which group,” not the core idea.",
   "Prevents getting stuck on long words: you can still extract the root and guess the meaning-family even when you don’t know the full form."
  ],
  "pattern": {
   "caption": "Root-finding in one move: peel extras → keep the three core letters",
   "columns": [
    "Word you see",
    "Peel off (front/back)",
    "Root letters left"
   ],
   "rows": [
    [
     "ٱلْمُسْلِمِينَ",
     "ٱلْ + مُ… + ـِينَ",
     "س ل م"
    ],
    [
     "وَأُمِرْتُ",
     "وَ + أ… + ـتُ",
     "م ر (from أُمِرَ)"
    ],
    [
     "لِتَهْتَدُوا۟",
     "لِ + تَ… + ـوا۟",
     "ه د ي (guidance-family; note this one is not three letters)"
    ],
    [
     "وَلَهُۥ",
     "وَ + لِ… + ـهُۥ",
     "plain (not a root word; it is a preposition + pronoun)"
    ],
    [
     "يَعْلَمُونَ",
     "يَ… + ـُونَ",
     "ع ل م"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلْمُسْلِمِينَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "particle",
      "gloss": "the (Al-)"
     },
     {
      "text": "مُ",
      "role": "plain",
      "gloss": "doer-form marker"
     },
     {
      "text": "س",
      "role": "root",
      "gloss": "peace/surrender"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "peace/surrender"
     },
     {
      "text": "م",
      "role": "root",
      "gloss": "peace/surrender"
     },
     {
      "text": "ِينَ",
      "role": "nounEnding",
      "gloss": "plural (oblique)"
     }
    ],
    "note": "Everything outside س ل م is “extra”: ٱلْ makes it definite, مُ is part of the pattern, and ـِينَ is a grammatical ending."
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
      "text": "ع",
      "role": "root",
      "gloss": "know"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "know"
     },
     {
      "text": "م",
      "role": "root",
      "gloss": "know"
     },
     {
      "text": "ُونَ",
      "role": "verbSuffix",
      "gloss": "plural"
     }
    ],
    "note": "The meaning core is ع ل م; the y- and -ūna tell you “they” and “plural,” not the root meaning."
   },
   {
    "word": "وَبِذَٰلِكَ",
    "blocks": [
     {
      "text": "وَ",
      "role": "particle",
      "gloss": "and"
     },
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "by/with"
     },
     {
      "text": "ذَٰلِكَ",
      "role": "plain",
      "gloss": "that"
     }
    ],
    "note": "Not every Qur’anic “word-shape” hides a root: some are particles/prepositions + demonstratives."
   },
   {
    "word": "لَهُۥ",
    "blocks": [
     {
      "text": "لِ",
      "role": "preposition",
      "gloss": "for/to"
     },
     {
      "text": "هُۥ",
      "role": "attachedPronoun",
      "gloss": "him"
     }
    ],
    "note": "Attached pronouns (like ـهُۥ) are not part of the root; remove them before you hunt the core letters."
   }
  ],
  "examples": [
   {
    "arabic": "أَوَّلُ ٱلْمُسْلِمِينَ",
    "ref": "6:163",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "أَوَّلُ",
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
      "text": "مُ",
      "role": "plain"
     },
     {
      "text": "س",
      "role": "root"
     },
     {
      "text": "ل",
      "role": "root"
     },
     {
      "text": "م",
      "role": "root"
     },
     {
      "text": "ِينَ",
      "role": "nounEnding"
     }
    ],
    "literal": "first — the — (doer-form) — s-l-m — plural (oblique)",
    "smooth": "“the first of the Muslims / those who submit.”",
    "whatChanged": "You see a full “vocabulary-looking” word and learn to ignore ٱلْ and ـِينَ so the root س ل م stands out."
   },
   {
    "arabic": "مِنَ ٱلْمُسْلِمِينَ",
    "ref": "10:72",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "مِنَ",
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
      "text": "مُ",
      "role": "plain"
     },
     {
      "text": "س",
      "role": "root"
     },
     {
      "text": "ل",
      "role": "root"
     },
     {
      "text": "م",
      "role": "root"
     },
     {
      "text": "ِينَ",
      "role": "nounEnding"
     }
    ],
    "literal": "from — the — (doer-form) — s-l-m — plural (oblique)",
    "smooth": "“from among the Muslims.”",
    "whatChanged": "Now the word is preceded by a preposition (مِنَ), reminding you to peel off neighboring particles and still find the same root."
   },
   {
    "arabic": "لِتَهْتَدُوا۟ بِهَا",
    "ref": "6:97",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "لِ",
      "role": "preposition"
     },
     {
      "text": "تَ",
      "role": "verbPrefix"
     },
     {
      "text": "هْتَد",
      "role": "plain"
     },
     {
      "text": "ُوا۟",
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
      "text": "هَا",
      "role": "attachedPronoun"
     }
    ],
    "literal": "so that — you (pl.) — be guided — (plural) — by — it",
    "smooth": "“so that you may be guided by it.”",
    "whatChanged": "Not every useful meaning comes from a neat three-letter root you can isolate: here your win is stripping l-, b-, and the attached pronoun to see the core verb remains in the middle."
   },
   {
    "arabic": "لَا يَعْلَمُونَ",
    "ref": "34:28",
    "surah": "Sūrat Saba",
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
      "text": "ع",
      "role": "root"
     },
     {
      "text": "ل",
      "role": "root"
     },
     {
      "text": "م",
      "role": "root"
     },
     {
      "text": "ُونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "not — they — know — (plural)",
    "smooth": "“they do not know.”",
    "whatChanged": "You practice root-finding in verbs: peel the subject prefix (يَ) and plural ending (ُونَ) to reveal ع ل م."
   },
   {
    "arabic": "وَلَهُۥ كُلُّ شَىْءٍۢ",
    "ref": "27:91",
    "surah": "Sūrat An-Naml",
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
      "text": "هُۥ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كُلُّ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "شَىْءٍۢ",
      "role": "plain"
     }
    ],
    "literal": "and — for/to — him — every — thing",
    "smooth": "“and to Him belongs everything.”",
    "whatChanged": "You learn the discipline of NOT hunting for a root where the whole unit is actually preposition + pronoun (لِهُۥ)."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the root letters with grammatical endings you see a lot",
    "example": "يَعْلَمُونَ",
    "note": "The core is ع ل م. The final ـُونَ is a verb ending meaning “they (plural),” not part of the root—even though it is attached and looks “real.”"
   },
   {
    "claim": "Don’t treat attached pronouns as part of the word’s root",
    "example": "لَهُۥ",
    "note": "هُۥ means “him.” Peel it off first. Many comprehension mistakes happen when you try to assign meaning to the leftover letters without removing pronoun suffixes."
   },
   {
    "claim": "Don’t assume every word is a three-letter root word",
    "example": "وَبِذَٰلِكَ",
    "note": "Here you have وَ (and) + بِ (by/with) + ذَٰلِكَ (that). It’s meaningful, but it’s not a root-based vocabulary item you should try to reduce to three letters."
   }
  ],
  "checklist": [
   "Circle the word you want to understand; don’t let nearby words merge in your mind.",
   "Check the front: if it begins with وَ / فَ, peel that off (a connector).",
   "Check again: if you see بِ / لِ / كَ, peel it off (a preposition/particle).",
   "If you see ٱلْ at the front, peel it off (definiteness).",
   "Check the back: peel off any attached pronoun (ـهُۥ / ـهُمْ / ـكَ / ـنَا).",
   "Then peel common endings like ـُونَ / ـِينَ (often “plural” endings).",
   "What remains is usually the root letters (often three). If what remains is tiny or doesn’t look like a content word, you may be dealing with particles (like ذَٰلِكَ) rather than a root-based word."
  ],
  "summary": [
   "Rule: Most Qur’anic words are built from three root letters plus common front/back add-ons.",
   "What it looks like: connectors (وَ/فَ), prepositions (بِ/لِ/مِنَ), the article (ٱلْ), pronoun suffixes (ـهُۥ), and plural endings (ـُونَ/ـِينَ) often surround the core.",
   "What you can now do: strip extras and quickly recognize roots like س ل م and ع ل م inside longer forms, giving you the meaning-family even when the exact word is new."
  ],
  "quizBridge": "The quiz will show you short Qur’anic snippets and ask you to mark which pieces are removable extras and which three letters are the root (when a root is present)."
 },
 {
  "id": "q-pronouns-nouns",
  "n": 7,
  "title": "His, their, your — glued to the end of a noun",
  "stage": "Survival parsing",
  "level": "A1",
  "structure": "One closed set, stuck to the back of a noun to mean possession: ـهُ his · ـهَا her · ـهُمْ their · ـكَ your (m) · ـكِ your (f) · ـكُمْ your (pl) · ـنَا our · ـِي my. رَبّ a Lord → رَبُّهُ HIS Lord، رَبُّنَا OUR Lord، رَبِّي MY Lord. The whole thing is one written word and should be read as one unit.",
  "whyItMatters": "This is the commonest reason a word you genuinely know looks like one you do not.",
  "canDo": "After this lesson you can spot when a familiar Qur’anic noun has a possession meaning (“his/their/your/our/my”) because a short pronoun is glued to its end, and you can read the whole word as one unit.",
  "rule": "Qur’anic Arabic often attaches a closed set of pronouns directly to the end of a noun to show possession: ـهُ his, ـهَا her, ـهُمْ their, ـكَ your (m), ـكِ your (f), ـكُمْ your (pl), ـنَا our, ـِي my. This attachment makes one written word: noun + attached pronoun, read together with no break. When you see the ending, translate it immediately (“his X”, “their X”) so the noun stops looking unfamiliar.",
  "why": [
   "Prevents missing a known word because it has “extra letters” at the end (e.g., رَبّ vs رَبَّهُمْ).",
   "Prevents mistranslating a phrase by leaving out “his/their/your/our/my,” which can flip who is being talked about.",
   "Prevents confusing two different endings that look similar in the mushaf (especially ـهُ vs ـهُمْ).",
   "Helps you quickly find the core noun (the part you already know) when scanning a line."
  ],
  "pattern": {
   "caption": "Possession pronouns that glue to the end of a noun (one written word)",
   "columns": [
    "Attached ending",
    "Meaning",
    "Example shape"
   ],
   "rows": [
    [
     "ـهُ / ـهُۥ",
     "his / of him",
     "… + ـهُ"
    ],
    [
     "ـهَا",
     "her",
     "… + ـهَا"
    ],
    [
     "ـهُمْ",
     "their / of them",
     "… + ـهُمْ"
    ],
    [
     "ـكَ / ـكِ / ـكُمْ",
     "your (m) / your (f) / your (pl)",
     "… + ـكَ / ـكِ / ـكُمْ"
    ],
    [
     "ـنَا",
     "our",
     "… + ـنَا"
    ],
    [
     "ـِي",
     "my",
     "… + ـِ + ي"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "رَبِّهِمْ",
    "blocks": [
     {
      "text": "رَبِّ",
      "role": "plain",
      "gloss": "a Lord"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "their / them"
     }
    ],
    "note": "Boundary is after the noun رَبِّ; the ending هُمْ is glued on and makes possession: “their Lord.”"
   },
   {
    "word": "رَبَّهُم",
    "blocks": [
     {
      "text": "رَبَّ",
      "role": "plain",
      "gloss": "a Lord"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "their"
     }
    ],
    "note": "Same idea with a different vowel on the noun; do not split it into two separate words when reading."
   },
   {
    "word": "وَجْهَهُۥ",
    "blocks": [
     {
      "text": "وَجْهَ",
      "role": "plain",
      "gloss": "face"
     },
     {
      "text": "هُۥ",
      "role": "attachedPronoun",
      "gloss": "his"
     }
    ],
    "note": "The small raised sign (ۥ) still belongs to the attached pronoun; the whole word means “his face.”"
   },
   {
    "word": "قُلُوبِهِمْ",
    "blocks": [
     {
      "text": "قُلُوبِ",
      "role": "plain",
      "gloss": "hearts"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "their"
     }
    ],
    "note": "If you recognize قُلُوب (hearts), the ending هُمْ tells you whose hearts: “their hearts.”"
   },
   {
    "word": "رَبَّكَ",
    "blocks": [
     {
      "text": "رَبَّ",
      "role": "plain",
      "gloss": "Lord"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun",
      "gloss": "your (m)"
     }
    ],
    "note": "The attached كَ is “your”; it is not a separate word, and it makes the phrase “your Lord.”"
   }
  ],
  "examples": [
   {
    "arabic": "مِّن رَّبِّهِمْ",
    "ref": "2:5",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "مِّن ",
      "role": "preposition"
     },
     {
      "text": "رَّبِّ",
      "role": "plain"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "from Lord-their",
    "smooth": "from their Lord",
    "whatChanged": "This is the simplest “noun + their” pattern: the noun you know (رَبّ) plus the glued ending (هُمْ)."
   },
   {
    "arabic": "قُلُوبِهِمْ",
    "ref": "2:7",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "قُلُوبِ",
      "role": "plain"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "hearts-their",
    "smooth": "their hearts",
    "whatChanged": "Now the attached pronoun is on a plural noun (hearts), showing that possession works on any noun, not only رَبّ."
   },
   {
    "arabic": "وَجْهَهُۥ",
    "ref": "6:52",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "وَجْهَ",
      "role": "plain"
     },
     {
      "text": "هُۥ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "face-his",
    "smooth": "His Face",
    "whatChanged": "This shows ـهُ (“his”) and the Qur’anic spelling with ۥ; still one attached ending meaning “his.”"
   },
   {
    "arabic": "دِينُهُمْ",
    "ref": "8:49",
    "surah": "Sūrat Al-Anfaal",
    "segments": [
     {
      "text": "دِينُ",
      "role": "plain"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "religion-their",
    "smooth": "their religion",
    "whatChanged": "Here the noun ends in a visible vowel (دِينُ); the pronoun still attaches directly, so do not look for a separate word for “their.”"
   },
   {
    "arabic": "رَبَّهُمْ",
    "ref": "11:60",
    "surah": "Sūrat Hud",
    "segments": [
     {
      "text": "رَبَّ",
      "role": "plain"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "Lord-their",
    "smooth": "their Lord",
    "whatChanged": "Same root word (رَبّ), but the written form looks different from رَبِّهِمْ; the key is still the glued هُمْ."
   },
   {
    "arabic": "إِنَّكَ أَنتَ",
    "ref": "2:127",
    "surah": "Sūrat Al-Baqara",
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
     }
    ],
    "literal": "indeed-you you",
    "smooth": "Indeed, You are…",
    "whatChanged": "The same “glued ending” can also attach to certain particles (like إِنَّ), so a short ك at the end can still be an attached pronoun even when there is no noun."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the attached pronoun ending ـهُمْ with a separate word هُمُ (they).",
    "example": "رَبِّهِمْ / هُمُ",
    "note": "رَبِّهِمْ is one word meaning “their Lord.” هُمُ is a standalone pronoun meaning “they.” If the pronoun is glued to the noun, you should not translate it as a new subject."
   },
   {
    "claim": "Don’t drop the attached pronoun when you already recognize the noun.",
    "example": "قُلُوبِهِمْ",
    "note": "If you read only “hearts” you lose the meaning. The entire point of the ending is whose hearts: “their hearts.” Train yourself to translate the ending automatically."
   },
   {
    "claim": "Don’t treat the attached pronoun as if it were an extra root letter.",
    "example": "وَجْهَهُۥ",
    "note": "The هـ here is not part of the noun’s core letters; it is the pronoun “his.” Use your root-finding habit: identify the noun first, then peel off the ending."
   }
  ],
  "checklist": [
   "When a word ends with one of these shapes, pause: ـهُ / ـهُۥ, ـهَا, ـهُمْ, ـكَ, ـكِ, ـكُمْ, ـنَا, ـِي.",
   "Assume it is “noun + possession” unless the context clearly forces something else.",
   "Mentally split: (known noun) + (attached pronoun). Do not insert a space in Arabic; it remains one written word.",
   "Translate the pronoun immediately: his/her/their/your/our/my, then read the noun meaning with it (“their hearts”).",
   "If the noun looks unfamiliar, try removing the ending first; often the remaining noun is a word you already know.",
   "If you see هُمُ as its own word, treat it as the standalone pronoun “they” (Lesson 5), not possession."
  ],
  "summary": [
   "Rule: a short closed set of pronouns can glue to the end of a noun to mean possession (his/her/their/your/our/my).",
   "Look: the word ends with ـهُ/ـهُۥ, ـهَا, ـهُمْ, ـكَ/ـكِ/ـكُمْ, ـنَا, or ـِي, and the whole thing is one written unit.",
   "Now you can quickly recognize “their Lord / their hearts / his face” even when the base noun is disguised by an attached ending."
  ],
  "quizBridge": "The quiz will show Qur’anic words and short snippets and ask you to identify the attached pronoun ending and give the correct possession meaning in English."
 },
 {
  "id": "q-pronouns-preps",
  "n": 8,
  "title": "The same endings, glued to a preposition",
  "stage": "Survival parsing",
  "level": "A1",
  "structure": "The identical set attaches to prepositions, and then means \"to him / for them / in it\": لَهُ for him · لَهُمْ for them · بِهِ with it · فِيهِ in it · عَلَيْهِ upon him · إِلَيْهِمْ to them · مِنْهُ from it · مَعَهُمْ with them. Note the shape-shifting: عَلَىٰ becomes عَلَيْـ and إِلَىٰ becomes إِلَيْـ before an ending.",
  "whyItMatters": "These are among the most frequent words in the Qur'an, and read as a single unit they are effortless. Read letter by letter they stop a verse dead.",
  "canDo": "After this lesson you can instantly read common Qur’anic preposition+pronoun units like لَهُمْ، بِهِ، فِيهِ، عَلَيْهِمْ, and understand them as one meaning (“for them / with it / in it / upon them”) without stopping to parse letter by letter.",
  "rule": "The same attached-pronoun endings you already know can also attach to prepositions, creating one glued unit: “to/for/with/in/upon/from + him/them/it.” Treat the preposition and the attached pronoun as one word in meaning and in reading flow. Watch the two shape-shifts: عَلَىٰ becomes عَلَيْـ and إِلَىٰ becomes إِلَيْـ before these endings.",
  "why": [
   "Prevents getting stuck on frequent mini-words like عَلَيْهِمْ and لَهُمْ and losing the sentence thread mid-ayah",
   "Prevents misreading who a statement is about (e.g., confusing “upon them” vs “upon you”) when the pronoun is glued",
   "Prevents missing core relationships (in/with/from/to) that change the whole meaning of a clause",
   "Prevents over-translating: you don’t need extra words if you recognize the unit as a single idea"
  ],
  "pattern": {
   "caption": "Preposition + attached pronoun = one unit (note عَلَىٰ → عَلَيْـ, إِلَىٰ → إِلَيْـ)",
   "columns": [
    "Base preposition",
    "Glued form in the Qur’an",
    "Meaning"
   ],
   "rows": [
    [
     "لِـ",
     "لَهُمْ",
     "for them"
    ],
    [
     "بِـ",
     "بِهِ",
     "with it / by it"
    ],
    [
     "فِى",
     "فِيهِ",
     "in it"
    ],
    [
     "عَلَىٰ",
     "عَلَيْكُمْ",
     "upon you (pl.)"
    ],
    [
     "إِلَىٰ",
     "إِلَيْهِمْ",
     "to them"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "عَلَيْكُمْ",
    "blocks": [
     {
      "text": "عَلَيْ",
      "role": "preposition",
      "gloss": "upon"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun",
      "gloss": "you (pl.)"
     }
    ],
    "note": "Boundary is after عَلَيْـ: the base عَلَىٰ changes to عَلَيْـ before the ending."
   },
   {
    "word": "إِلَيْهِمْ",
    "blocks": [
     {
      "text": "إِلَيْ",
      "role": "preposition",
      "gloss": "to"
     },
     {
      "text": "هِمْ",
      "role": "attachedPronoun",
      "gloss": "them"
     }
    ],
    "note": "Boundary is after إِلَيْـ: the base إِلَىٰ changes to إِلَيْـ before the ending."
   },
   {
    "word": "بِهِمْ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "with / by"
     },
     {
      "text": "هِمْ",
      "role": "attachedPronoun",
      "gloss": "them"
     }
    ],
    "note": "No shape-shift here: it’s simply بِـ + pronoun ending."
   },
   {
    "word": "رَبِّهِمْ",
    "blocks": [
     {
      "text": "رَبِّ",
      "role": "plain",
      "gloss": "Lord"
     },
     {
      "text": "هِمْ",
      "role": "attachedPronoun",
      "gloss": "their"
     }
    ],
    "note": "Compare: this is a noun + attached pronoun (“their Lord”), not a preposition unit."
   }
  ],
  "examples": [
   {
    "arabic": "لَهُمْ عَذَابٌ عَظِيمٌۭ",
    "ref": "2:7",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "لَ",
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
      "text": "عَذَابٌ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَظِيمٌۭ",
      "role": "plain"
     }
    ],
    "literal": "for-them punishment great",
    "smooth": "For them is a great punishment.",
    "whatChanged": "Shows the simplest form: لِـ + pronoun gives “for/to + them” as one fast unit (لَهُمْ)."
   },
   {
    "arabic": "عَلَيْكُمْ عَذَابًۭا",
    "ref": "6:65",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "عَلَيْ",
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
      "text": "عَذَابًۭا",
      "role": "plain"
     }
    ],
    "literal": "upon-you punishment",
    "smooth": "…a punishment upon you.",
    "whatChanged": "Introduces the shape-shift: عَلَىٰ becomes عَلَيْـ before the attached pronoun."
   },
   {
    "arabic": "فِى رَحْمَتِهِۦ",
    "ref": "45:30",
    "surah": "Sūrat Al-Jaathiya",
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
      "text": "رَحْمَتِ",
      "role": "plain"
     },
     {
      "text": "هِۦ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "in mercy-his",
    "smooth": "…into/within His mercy.",
    "whatChanged": "Shows that preposition+pronoun glue can happen indirectly too: here فِى stands before a noun that itself carries the pronoun (not فِيهِ, but still the same ending)."
   },
   {
    "arabic": "بِهِمْ فِى مَوْجٍۢ",
    "ref": "11:42",
    "surah": "Sūrat Hud",
    "segments": [
     {
      "text": "بِ",
      "role": "preposition"
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
      "text": "فِى",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مَوْجٍۢ",
      "role": "plain"
     }
    ],
    "literal": "with-them in waves",
    "smooth": "…carrying them through waves…",
    "whatChanged": "Gives two prepositions in a row, one glued (بِهِمْ) and one standalone (فِى), training your eye not to over-glue everything."
   },
   {
    "arabic": "وَمَا لَهُۥ مِنْهُم",
    "ref": "34:22",
    "surah": "Sūrat Saba",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "مَا",
      "role": "plain"
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
      "text": "هُۥ",
      "role": "attachedPronoun"
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
      "text": "هُم",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and not for-him from-them",
    "smooth": "And he has nothing from them (no support from them).",
    "whatChanged": "Stacks two glued units in one small space: لَهُۥ and مِنْهُم—exactly the kind that can ‘stop a verse dead’ if read slowly."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a preposition+pronoun unit (لَهُمْ) with the standalone pronoun هُمْ",
    "example": "لَهُمْ / هُمْ",
    "note": "If there is a لِـ before it, it’s not “they”; it’s “for/to them.” The meaning changes the whole relationship in the sentence."
   },
   {
    "claim": "Don’t confuse عَلَيْـ (the shifted form) with the standalone preposition عَلَىٰ",
    "example": "عَلَىٰ / عَلَيْكُمْ",
    "note": "When an ending attaches, the written shape changes: you see ي appear (عَلَيْـ). Read it as the same preposition “upon,” not as a new word."
   },
   {
    "claim": "Don’t confuse glued endings after prepositions with possessive endings after nouns",
    "example": "مِنْهُم / رَبِّهِمْ",
    "note": "مِنْهُم is “from them” (a relationship). رَبِّهِمْ is “their Lord” (possession/attachment to a noun). Same ending, different job."
   }
  ],
  "checklist": [
   "When you see a short preposition (لِـ بِـ كَـ) or a common one (مِنْ فِى عَلَىٰ إِلَىٰ), look immediately for a pronoun ending right after it.",
   "If you see عَلَىٰ or إِلَىٰ and the next letters look like ـيـ, consider the shape-shift: عَلَيْـ / إِلَيْـ before an ending.",
   "Circle (mentally) the entire unit: preposition + ending (e.g., بِ + هِمْ). Do not translate the pieces separately.",
   "Identify the pronoun quickly: ـهُ/ـهِ (him/it), ـهُمْ (them), ـكُمْ (you pl.), etc. (You already know these endings—now they can follow prepositions too.)",
   "After recognizing the unit, ask one question: ‘relationship to whom/what?’ That keeps you synced with the sentence.",
   "If the pronoun ending is attached to a noun instead (like رَبِّهِمْ), translate as possession (“their…”) not as a preposition phrase."
  ],
  "summary": [
   "Rule: Attached-pronoun endings can glue to prepositions, forming one high-frequency unit meaning ‘to/for/with/in/upon/from + him/them/it.’",
   "Look: لَهُمْ، بِهِمْ، مِنْهُم—and watch the special spelling shifts: عَلَىٰ → عَلَيْـ, إِلَىٰ → إِلَيْـ before the ending.",
   "Now you can keep reading flow by recognizing these as single chunks and instantly knowing who the phrase points to."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to spot the glued preposition+pronoun unit and choose its meaning (e.g., ‘upon them’, ‘for him’, ‘from them’)."
 },
 {
  "id": "q-negation",
  "n": 9,
  "title": "Four different ways to say no",
  "stage": "Survival parsing",
  "level": "A1",
  "structure": "لَا not (general, present) · مَا not (past, or \"what\") · لَمْ did not (past, though the verb after it looks present) · لَنْ will never (future, emphatic). لَمْ is the trap: لَمْ يَلِدْ uses a present-tense verb shape but means \"He did not beget\".",
  "whyItMatters": "Miss a negation and you read the exact opposite of the verse. There is no error in Quranic reading that costs more.",
  "canDo": "After this lesson you can spot which kind of negation the Qur’an is using (general, past, past-with-لَمْ, or future-with-لَنْ) so you don’t reverse the meaning of an ayah.",
  "rule": "Arabic uses more than one “no/not,” and the choice tells you time and strength. لَا negates generally (often present/habitual) and is also used in prohibitions. مَا often negates a completed past statement, and it can also mean “what.” لَمْ is the trap: it means “did not,” but it is followed by a present-looking verb shape; لَنْ negates the future with emphasis (“will never / will not”).",
  "why": [
   "Prevents reading the opposite of an ayah by missing a small لَا / مَا at the start of a clause.",
   "Prevents misreading time: لَا (general) vs مَا (past) vs لَنْ (future) change when something is denied.",
   "Prevents the classic misunderstanding of لَمْ: the verb after it looks “present,” but the meaning is firmly past (“did not”).",
   "Prevents confusing “not” with “what”: مَا can flip a sentence from negation to a question/relative meaning if you don’t notice the context."
  ],
  "pattern": {
   "caption": "Four Qur’anic negators: what time they point to and what form follows",
   "columns": [
    "Negator",
    "Typical meaning",
    "What you expect after it"
   ],
   "rows": [
    [
     "لَا",
     "not / does not (general, ongoing); also “do not” in commands",
     "often a present-tense verb shape or a noun phrase"
    ],
    [
     "مَا",
     "not (often past); also “what”",
     "either a past-tense verb or a whole clause; watch context"
    ],
    [
     "لَمْ",
     "did not (past)",
     "a present-looking verb shape (this is the trap)"
    ],
    [
     "لَنْ",
     "will not / will never (future, emphatic)",
     "a present-looking verb shape pointing to future meaning"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "لَا",
    "blocks": [
     {
      "text": "لَا",
      "role": "particle",
      "gloss": "not / no"
     }
    ],
    "note": "A standalone particle; it usually comes right before what it negates."
   },
   {
    "word": "مَآ",
    "blocks": [
     {
      "text": "مَآ",
      "role": "particle",
      "gloss": "not / what"
     }
    ],
    "note": "Same written word can be negation or “what”; you decide by the clause meaning."
   },
   {
    "word": "لَمْ",
    "blocks": [
     {
      "text": "لَمْ",
      "role": "particle",
      "gloss": "did not"
     }
    ],
    "note": "When you see لَمْ, force your brain to read past time even if the next verb looks present."
   },
   {
    "word": "تُضِيعُ",
    "blocks": [
     {
      "text": "تُ",
      "role": "verbPrefix",
      "gloss": "she/you-he"
     },
     {
      "text": "ضِيع",
      "role": "root",
      "gloss": "waste/lose"
     },
     {
      "text": "ُ",
      "role": "verbSuffix",
      "gloss": "present ending"
     }
    ],
    "note": "This is a present-tense verb shape; with لَا it means “does not,” but with لَمْ it would mean “did not.”"
   }
  ],
  "examples": [
   {
    "arabic": "لَا يُضِيعُ أَجْرَ",
    "ref": "12:90",
    "surah": "Sūrat Yusuf",
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
      "text": "يُضِيعُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَجْرَ",
      "role": "plain"
     }
    ],
    "literal": "not — He loses — reward (of)",
    "smooth": "Indeed Allah does not waste the reward (of the doers of good).",
    "whatChanged": "This shows لَا as a general/ongoing negation with a present-shaped verb (a timeless principle)."
   },
   {
    "arabic": "لَا يَهْدِى ٱلْقَوْمَ",
    "ref": "46:10",
    "surah": "Sūrat Al-Ahqaf",
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
      "text": "يَهْدِى",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْقَوْمَ",
      "role": "plain"
     }
    ],
    "literal": "not — He guides — the people",
    "smooth": "Allah does not guide the wrongdoing people.",
    "whatChanged": "This reinforces that لَا negates “He guides” in a general way; missing it flips the entire statement."
   },
   {
    "arabic": "وَلَا ٱلضَّآلِّينَ",
    "ref": "1:7",
    "surah": "Sūrat Al-Faatiha",
    "segments": [
     {
      "text": "وَ",
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
      "text": "ٱلضَّآلِّينَ",
      "role": "plain"
     }
    ],
    "literal": "and — not — those who go astray",
    "smooth": "…and not those who are astray.",
    "whatChanged": "This shows لَا used with a noun phrase (not only with verbs): it excludes a group rather than negating an action."
   },
   {
    "arabic": "مَا عَلَيْكَ",
    "ref": "6:52",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "مَا",
      "role": "particle"
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
     }
    ],
    "literal": "not/what — upon — you",
    "smooth": "You are not responsible (upon you is not…) for their account.",
    "whatChanged": "This introduces مَا negation in a common Qur’anic frame (“مَا … عَلَى/عَلَيْـ”): it denies responsibility/obligation."
   },
   {
    "arabic": "مَآ أُمِرُوٓا۟ إِلَّا",
    "ref": "98:5",
    "surah": "Sūrat Al-Bayyina",
    "segments": [
     {
      "text": "مَآ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أُمِرُوٓا۟",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَّا",
      "role": "plain"
     }
    ],
    "literal": "not — they were commanded — except",
    "smooth": "They were not commanded except to worship Allah…",
    "whatChanged": "This shows مَا negating a completed statement (“they were commanded”), often paired with إِلَّا to mean “only / nothing but.”"
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse مَا (not) with مَا (what)",
    "example": "مَا تَصِفُونَ",
    "note": "From 12:18: وَٱللَّهُ ٱلْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ. Here مَا is “what” (what you describe), not negation. If you force it to mean “not,” the phrase becomes nonsense."
   },
   {
    "claim": "Don’t miss لَا when it comes after وَ",
    "example": "وَلَا ٱلضَّآلِّينَ",
    "note": "From 1:7. The وَ is just “and,” but the real meaning hinge is لَا. Skipping it turns an exclusion (“and not…”) into inclusion, reversing the du‘ā’."
   },
   {
    "claim": "Don’t treat مَا as a filler—assume it changes the whole clause",
    "example": "مَا عَلَيْكَ",
    "note": "From 6:52. مَا here denies burden/responsibility. If you glide past it, you read “upon you is their account,” the opposite guidance for the Prophet ﷺ."
   },
   {
    "claim": "Don’t forget that لَمْ is past even though the next verb looks present",
    "example": "لَمْ يَلِدْ",
    "note": "Core rule for this lesson (even though this exact phrase is not in today’s verse list): with لَمْ you translate “did not,” while the verb form looks like present. Keep this ‘tense switch’ ready for when you meet it in the muṣḥaf."
   }
  ],
  "checklist": [
   "Scan each line for tiny particles: لَا ، مَا ، لَمْ ، لَنْ (they are short and easy to skip).",
   "If you see لَا, ask: is it negating an action (verb after it) or excluding a group/thing (noun after it), like وَلَا ٱلضَّآلِّينَ?",
   "If you see مَا, decide quickly: does “not” make the clause sensible, or is “what” required (as in عَلَىٰ مَا تَصِفُونَ)?",
   "If you see مَا + إِلَّا, expect a strong “only / nothing but” structure (e.g., مَآ أُمِرُوٓا۟ إِلَّا…).",
   "When you later meet لَمْ or لَنْ: force the time in English (لَمْ = did not; لَنْ = will not), even if the verb shape looks like present.",
   "Before moving on, re-read the clause once with the negation included; check that your English is not accidentally positive."
  ],
  "summary": [
   "The rule: Arabic negation is not one word—لَا (general), مَا (often past or “what”), لَمْ (past with present-looking verb), لَنْ (future emphatic).",
   "What it looks like: a short particle right before the word/phrase it flips; sometimes after وَ (وَلَا), sometimes paired with إِلَّا (مَا… إِلَّا).",
   "What you can now do: reliably catch “not” in Qur’anic reading, choose the right time sense, and avoid reversing the meaning of a verse."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether the negation is لَا or مَا (and whether مَا means “not” or “what”), and to choose the correct English meaning."
 },
 {
  "id": "q-questions-emphasis",
  "n": 10,
  "title": "Asking, and insisting",
  "stage": "Survival parsing",
  "level": "A1",
  "structure": "Questions: أَ (a single letter on the front — أَلَمْ \"did not…?\") · هَلْ · مَنْ who · مَا what · أَيْنَ where · كَيْفَ how · لِمَ why. Emphasis: إِنَّ indeed · قَدْ already/certainly (with a past verb) · لَـ truly (on the front of a word).",
  "whyItMatters": "These set the tone of a verse — whether it is asking, asserting or insisting — and flattening them loses the argument the verse is making.",
  "canDo": "After this lesson you can spot when a Qur’anic line is asking (and what kind of question), versus asserting or insisting—so you follow the verse’s argument instead of flattening its tone.",
  "rule": "Watch the very first small words: question particles (أَ/أَلَمْ, هَلْ, مَنْ, مَا, أَيْنَ, كَيْفَ, لِمَ) and emphasis particles (إِنَّ, قَدْ with past, and لَـ at the front of a word) set the direction of the sentence. If you miss them, you may translate the words correctly but misunderstand whether Allah is questioning, challenging, confirming, or insisting. Treat them like “traffic signs” at the start of meaning.",
  "why": [
   "Prevents reading a rhetorical challenge as a plain statement (you lose the force of the argument).",
   "Prevents missing negation inside a question (especially with مَا … إِلَّا, which can sound like “only”).",
   "Prevents ignoring emphasis words like إِنَّ and لَـ, which shift a verse from “it is” to “it is indeed / truly.”",
   "Prevents misreading expectation/urgency in a passage by skipping tiny particles like هَلْ and قَدْ."
  ],
  "pattern": {
   "caption": "Tone-setters: questions vs emphasis (recognition only)",
   "columns": [
    "Marker",
    "Meaning in English",
    "What to do while reading"
   ],
   "rows": [
    [
     "هَلْ + verb",
     "Is/Are…? (often rhetorical)",
     "Read as a question; expect a point being made."
    ],
    [
     "مَا … إِلَّا",
     "Not…except / only",
     "Recognize it as a strong limiting statement."
    ],
    [
     "إِنَّ + pronoun/noun",
     "Indeed / truly",
     "Add certainty; don’t translate it away."
    ],
    [
     "لَـ + word",
     "Surely / certainly",
     "Hear insistence: “really, truly” on that word."
    ],
    [
     "قَدْ + past verb",
     "Already / certainly (has happened)",
     "Expect a confirmed past event, not a wish."
    ]
   ]
  },
  "anatomy": [
   {
    "word": "إِنِّىٓ",
    "blocks": [
     {
      "text": "إِنَّ",
      "role": "particle",
      "gloss": "indeed/truly"
     },
     {
      "text": "ِى",
      "role": "attachedPronoun",
      "gloss": "I/me"
     }
    ],
    "note": "Boundary is after إِنَّ: the pronoun (ـي) is attached to the emphasis particle."
   },
   {
    "word": "لَّا",
    "blocks": [
     {
      "text": "لَـ",
      "role": "particle",
      "gloss": "truly/indeed"
     },
     {
      "text": "ا",
      "role": "plain",
      "gloss": "no (with لَ)"
     }
    ],
    "note": "Here لَـ is fused into the spelling; focus on the ‘insisting’ لّ sound at the start."
   },
   {
    "word": "هَلْ",
    "blocks": [
     {
      "text": "هَلْ",
      "role": "particle",
      "gloss": "is it…?"
     }
    ],
    "note": "A single particle word; it often opens a question whose answer is implied."
   },
   {
    "word": "مَا",
    "blocks": [
     {
      "text": "مَا",
      "role": "particle",
      "gloss": "not / what"
     }
    ],
    "note": "Context decides: it can be a question word “what?” or a negator “not…”."
   }
  ],
  "examples": [
   {
    "arabic": "هَلْ يَنظُرُونَ إِلَّا ٱلسَّاعَةَ",
    "ref": "43:66",
    "surah": "Sūrat Az-Zukhruf",
    "segments": [
     {
      "text": "هَلْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَنظُرُونَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَّا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلسَّاعَةَ",
      "role": "plain"
     }
    ],
    "literal": "Is [it that] they-wait except the-Hour",
    "smooth": "Are they waiting for anything except the Hour?",
    "whatChanged": "This shows هَلْ setting a question tone, while إِلَّا tightens the meaning to “nothing except.”"
   },
   {
    "arabic": "إِذْ رَءَا نَارًۭا فَقَالَ",
    "ref": "20:10",
    "surah": "Sūrat Taa-Haa",
    "segments": [
     {
      "text": "إِذْ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَءَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "نَارًۭا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فَقَالَ",
      "role": "plain"
     }
    ],
    "literal": "When he-saw a fire then-he-said",
    "smooth": "When he saw a fire, he said…",
    "whatChanged": "This is a control example: no question/emphasis marker—just narrative flow—so you feel the contrast when markers appear."
   },
   {
    "arabic": "إِنِّىٓ ءَانَسْتُ نَارًۭا",
    "ref": "20:10",
    "surah": "Sūrat Taa-Haa",
    "segments": [
     {
      "text": "إِنِّىٓ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ءَانَسْتُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "نَارًۭا",
      "role": "plain"
     }
    ],
    "literal": "Indeed-I perceived a fire",
    "smooth": "I have indeed noticed a fire.",
    "whatChanged": "This shows إِنَّ turning a simple report into an emphatic, confident statement."
   },
   {
    "arabic": "إِنَّهُۥ كَانَ فِىٓ أَهْلِهِۦ",
    "ref": "84:13",
    "surah": "Sūrat Al-Inshiqaaq",
    "segments": [
     {
      "text": "إِنَّهُۥ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَانَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِىٓ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَهْلِهِۦ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "Indeed-he was in his-family",
    "smooth": "He truly used to be among his family…",
    "whatChanged": "This shows إِنَّ attached to a pronoun (إِنَّهُۥ): the emphasis is on ‘he’ as the subject."
   },
   {
    "arabic": "وَمَا كَانَ رَبُّكَ",
    "ref": "11:117",
    "surah": "Sūrat Hud",
    "segments": [
     {
      "text": "وَ",
      "role": "plain"
     },
     {
      "text": "مَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَانَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَبُّكَ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "And not was your-Lord",
    "smooth": "And your Lord would not be…",
    "whatChanged": "This shows مَا as negation (not “what”), shaping the whole clause before you even reach the main action."
   },
   {
    "arabic": "مَا نَرَىٰكَ إِلَّا بَشَرًۭا",
    "ref": "11:27",
    "surah": "Sūrat Hud",
    "segments": [
     {
      "text": "مَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "نَرَىٰكَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَّا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بَشَرًۭا",
      "role": "plain"
     }
    ],
    "literal": "Not we-see-you except a human",
    "smooth": "We see you as nothing but a human.",
    "whatChanged": "This shows the ‘insisting’ pattern مَا … إِلَّا: a denial plus a narrow exception, stronger than a plain ‘you are a human’."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse مَا (not…) with مَا (what?).",
    "example": "وَمَا كَانَ",
    "note": "In 11:117 it is clearly negation: “and not/never was…”. If you read it as “what was…”, the whole sentence collapses."
   },
   {
    "claim": "Don’t treat إِلَّا as just ‘except’ without noticing what comes before it.",
    "example": "هَلْ يَنظُرُونَ إِلَّا",
    "note": "With a question (43:66) it implies “anything other than…?” With negation (11:27) it becomes “nothing but…”. Same word, different force."
   },
   {
    "claim": "Don’t skip emphasis particles as ‘untranslatable’.",
    "example": "إِنِّىٓ",
    "note": "إِنَّ adds certainty and insistence. If you drop it, you may still get the facts, but you miss the speaker’s firmness and the verse’s tone."
   }
  ],
  "checklist": [
   "Scan the first 1–3 words: is there هَلْ or a bare question word (مَنْ/مَا/أَيْنَ/كَيْفَ/لِمَ)? If yes, read as a question.",
   "If you see إِنَّ (often fused: إِنِّىٓ, إِنَّهُۥ), add “indeed/truly” in your mind before translating anything else.",
   "Look for إِلَّا: immediately check whether there is a negator nearby (مَا, لَا). If yes, expect “nothing but/only.”",
   "When you meet a tiny prefix-like لَـ at the front with a strong ‘l’ sound, treat it as insistence on that word.",
   "When the sentence feels oddly flat in English, re-check whether you ignored a tone-setter particle at the start."
  ],
  "summary": [
   "The rule: tiny question and emphasis particles control the whole sentence’s tone and force.",
   "What it looks like: هَلْ for questioning; إِنَّ (often with attached pronouns) for “indeed”; مَا … إِلَّا for strong limitation; لَـ for insistence.",
   "What you can now do: keep the Qur’an’s argumentative texture—hearing when it challenges, confirms, or insists—even before you know every vocabulary word."
  ],
  "quizBridge": "The quiz will show short snippets and ask you to label whether they are question/negation/emphasis (and what that does to the meaning)."
 },
 {
  "id": "q-past-verbs",
  "n": 11,
  "title": "Past-tense verbs, and who did it",
  "stage": "Verbs for readers",
  "level": "A1",
  "structure": "The past (الماضي) is the bare root with endings on the BACK: فَعَلَ he did · فَعَلَتْ she did · فَعَلُوا they did · فَعَلْتَ you did · فَعَلْتُ I did · فَعَلْنَا we did. The three root letters sit at the front, undisturbed — which is why past-tense verbs are the easiest words in the Qur'an to trace to a root.",
  "whyItMatters": "Most Quranic narrative is in the past. This one table tells you who acted in the majority of stories in the book.",
  "canDo": "After this lesson you can spot a past-tense Qur’anic verb at a glance and tell who did the action by reading the ending attached to the back of the root.",
  "rule": "In the past tense (الماضي), the three root letters sit at the front and stay intact. Who did the action is shown by endings attached on the BACK of the verb (like ـتْ, ـوا, ـتُ, ـنا). Because the root is undisturbed, past-tense verbs are often the easiest place to identify a root while reading the Qur’an.",
  "why": [
   "Prevents reading a story sentence but missing the subject: you won’t confuse “they said” (قَالُوا۟) with “he said” (قَالَ).",
   "Prevents swapping speakers: you won’t misread “we created” (خَلَقْنَا) as “he created” (خَلَقَ).",
   "Prevents losing track of groups vs individuals in dialogue scenes: the ending instantly signals “they” vs “you” vs “I/we.”",
   "Prevents root-hunting mistakes: you will stop treating the ending letters as part of the root and find the three-letter root faster."
  ],
  "pattern": {
   "caption": "Past tense: root first, ending last (the ending tells you who did it)",
   "columns": [
    "Past verb shape",
    "Who did it (English)",
    "Ending on the back"
   ],
   "rows": [
    [
     "فَعَلَ",
     "he did",
     "— (no extra letters)"
    ],
    [
     "فَعَلَتْ",
     "she did",
     "ـتْ"
    ],
    [
     "فَعَلُوا",
     "they did",
     "ـوا"
    ],
    [
     "فَعَلْتَ",
     "you (m.) did",
     "ـتَ"
    ],
    [
     "فَعَلْتُ",
     "I did",
     "ـتُ"
    ],
    [
     "فَعَلْنَا",
     "we did",
     "ـنَا"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "خَلَقْنَا",
    "blocks": [
     {
      "text": "خَلَقْ",
      "role": "root",
      "gloss": "created (root)"
     },
     {
      "text": "نَا",
      "role": "verbSuffix",
      "gloss": "we (did)"
     }
    ],
    "note": "The root stays at the front (خ ل ق); ـنَا is the past-tense doer ending meaning “we.”"
   },
   {
    "word": "قَالُوا۟",
    "blocks": [
     {
      "text": "قَالَ",
      "role": "root",
      "gloss": "said (root)"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they (did)"
     }
    ],
    "note": "Read the back: ـوا means “they.” The root is ق و ل (appearing here as قَالَ)."
   },
   {
    "word": "قِيلَ",
    "blocks": [
     {
      "text": "قِيلَ",
      "role": "root",
      "gloss": "was said"
     }
    ],
    "note": "This is a past-tense verb without a visible person-suffix; it reads as “it was said” (passive). Don’t try to force an ending."
   },
   {
    "word": "جَآءَهُم",
    "blocks": [
     {
      "text": "جَآءَ",
      "role": "root",
      "gloss": "came"
     },
     {
      "text": "هُم",
      "role": "attachedPronoun",
      "gloss": "to them"
     }
    ],
    "note": "Not every ending is a doer ending: here هُم is an attached object pronoun (“them”), not “they did.”"
   }
  ],
  "examples": [
   {
    "arabic": "لَقَدْ خَلَقْنَا ٱلْإِنسَٰنَ",
    "ref": "95:4",
    "surah": "Sūrat At-Tin",
    "segments": [
     {
      "text": "لَقَدْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "خَلَقْ",
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
      "text": "ٱلْإِنسَٰنَ",
      "role": "plain"
     }
    ],
    "literal": "Indeed/certainly — created — we — the human",
    "smooth": "We certainly created the human being.",
    "whatChanged": "This is your clearest past-tense “we did” marker: ـنَا on the back tells you the doer immediately."
   },
   {
    "arabic": "مِنْهَا خَلَقْنَٰكُمْ",
    "ref": "20:55",
    "surah": "Sūrat Taa-Haa",
    "segments": [
     {
      "text": "مِنْ",
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
     }
    ],
    "literal": "from — it — created — we — you (plural)",
    "smooth": "From it We created you all.",
    "whatChanged": "Now you see two different “back attachments” in one verb: ـنَا is the doer (we did), while ـكُمْ is the object (you all)."
   },
   {
    "arabic": "قَالُوا۟ إِنَّمَا نَحْنُ",
    "ref": "2:11",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "قَالَ",
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
      "text": "إِنَّمَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "نَحْنُ",
      "role": "plain"
     }
    ],
    "literal": "said — they — only — we",
    "smooth": "They said, “We are only…”",
    "whatChanged": "You meet the most common narrative engine in the Qur’an: “they said” (قَالُوا۟) — the ـوا ending keeps dialogue speakers straight."
   },
   {
    "arabic": "وَإِذَا قِيلَ لَهُمْ",
    "ref": "2:11",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "إِذَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "قِيلَ",
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
      "text": "هُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and — when — was said — to — them",
    "smooth": "And when it is said to them…",
    "whatChanged": "Not all past verbs show a doer at the back: قِيلَ is past passive (“it was said”), so you don’t look for ـوا/ـنَا to identify an actor."
   },
   {
    "arabic": "فَلَمَّا جَآءَهُم بِٱلْحَقِّ",
    "ref": "40:25",
    "surah": "Sūrat Ghafir",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "لَمَّا",
      "role": "plain"
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
      "text": "هُم",
      "role": "attachedPronoun"
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
      "text": "ٱلْحَقِّ",
      "role": "plain"
     }
    ],
    "literal": "so — when — came — them — with — the truth",
    "smooth": "So when the truth came to them…",
    "whatChanged": "This shows a common trap: an ending like ـهُم can be an object (“to them”), not the doer; the doer might be understood from context."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a past-tense doer suffix (like ـوا / ـنا) with an attached object pronoun (like ـهم / ـكم).",
    "example": "خَلَقْنَٰكُمْ",
    "note": "Here ـنَا means “we did” (the doer), but ـكُمْ means “you” (the object). Past tense can carry both: who acted, and who received the action."
   },
   {
    "claim": "Don’t assume every past verb must end with a doer suffix you recognize.",
    "example": "قِيلَ",
    "note": "قِيلَ is past passive: “it was said.” The Qur’an often shifts to passive to focus on the event, not the speaker."
   },
   {
    "claim": "Don’t treat the ending letters as part of the root when you go root-hunting.",
    "example": "قَالُوا۟",
    "note": "The root is in قَالَ (from ق و ل). The extra وا۟ is only telling you “they.” If you include it in the root, you’ll never find the dictionary family."
   }
  ],
  "checklist": [
   "Look for a word that feels like an action (often translated as “said, came, created…” in your head).",
   "Check the BACK of the word first: do you see ـوا (they), ـنَا (we), ـتُ (I), or ـتْ (she)?",
   "If you see one of those, mentally peel it off and keep it as “who did it.”",
   "Now stare at what remains at the FRONT: those are your root letters (or the root pattern) to recognize across the Qur’an.",
   "If the ending is ـهُم / ـكُمْ / ـهَا etc., treat it as an attached pronoun (often “to him/them/you”), not automatically the doer.",
   "If there is no clear doer ending (e.g., قِيلَ), consider that it may be passive: translate it as “it was …” and let the context supply the actor."
  ],
  "summary": [
   "Rule: Past tense in Qur’anic Arabic keeps the root at the front and puts “who did it” on the back as an ending.",
   "Look: endings like ـوا (they) and ـنَا (we) are your fastest clue; attached pronouns like ـهُم/ـكُمْ may instead be objects.",
   "Now: you can read narrative verbs and instantly track whether he, they, we, or you did the action—without guessing from English translation."
  ],
  "quizBridge": "The quiz will show you short Qur’anic snippets and ask you to identify the past-tense verb, separate its root from its ending, and state who did the action."
 },
 {
  "id": "q-present-verbs",
  "n": 12,
  "title": "Present and future verbs, marked at the front",
  "stage": "Verbs for readers",
  "level": "A1",
  "structure": "The present (المضارع) puts a letter on the FRONT instead: يَفْعَلُ he does · تَفْعَلُ she does / you do · أَفْعَلُ I do · نَفْعَلُ we do · يَفْعَلُونَ they do · تَفْعَلُونَ you all do. The prefix letters are أ ن ي ت — the same four you learned to strip in lesson 6. سَـ or سَوْفَ before it makes it explicitly future: سَيَقُولُ he will say.",
  "whyItMatters": "Front-marked or back-marked is the fastest tense test in the language, and it works before you know the word.",
  "canDo": "After this lesson you can spot a Qur’anic present/future verb instantly by its front letter (أ ن ي ت) and notice when سَـ or سَوْفَ makes it explicitly “will …”.",
  "rule": "Past-tense verbs are “back-marked” (the ending tells you who did it), but the present/future (المضارع) is “front-marked”: it starts with one of four prefix letters: أ ن ي ت. That single front letter often tells you the subject (he/they, she/you, I, we) before you even know the root. If سَـ or سَوْفَ comes right before a present verb, it pushes the meaning clearly into the future: “will …”.",
  "why": [
   "Prevents you from mistaking a present verb for a noun just because you don’t recognize the root yet (e.g., you see يـ and know “he/it does …”).",
   "Prevents the common tense flip: reading “He knew” when the Arabic actually says “He knows” (e.g., يَعْلَمُ).",
   "Stops you from missing warnings and promises that are explicitly future (فَسَوْفَ يَعْلَمُونَ = “so they will know”).",
   "Helps you keep track of “who is doing it” in long verses: the prefix often identifies I/we/you/he quickly."
  ],
  "pattern": {
   "caption": "Present (المضارع) starts with a prefix letter. Sometimes an ending also appears (especially plural).",
   "columns": [
    "Prefix",
    "Typical meaning (subject)",
    "Example shape"
   ],
   "rows": [
    [
     "يَـ",
     "he/it does (often also “they do” with a plural ending)",
     "يَفْعَلُ / يَفْعَلُونَ"
    ],
    [
     "تَـ",
     "she does / you (sing.) do (context decides)",
     "تَفْعَلُ / تَفْعَلُونَ"
    ],
    [
     "أَـ",
     "I do",
     "أَفْعَلُ"
    ],
    [
     "نَـ",
     "we do",
     "نَفْعَلُ"
    ],
    [
     "سَـ + يَـ/تَـ/أَـ/نَـ",
     "will … (near future)",
     "سَيَفْعَلُ"
    ],
    [
     "سَوْفَ + يَـ/تَـ/أَـ/نَـ",
     "will … (clear future emphasis)",
     "سَوْفَ يَفْعَلُ"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "يَعْلَمُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he/they (marks present)"
     },
     {
      "text": "عْلَم",
      "role": "root",
      "gloss": "know (core meaning)"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "they (plural)"
     }
    ],
    "note": "The present marker is at the very front (يَـ); the plural subject “they” is shown again at the end (ـونَ)."
   },
   {
    "word": "تَعْلَمُونَ",
    "blocks": [
     {
      "text": "تَ",
      "role": "verbPrefix",
      "gloss": "you (or she) present"
     },
     {
      "text": "عْلَم",
      "role": "root",
      "gloss": "know"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "you all (plural)"
     }
    ],
    "note": "Same root, but the first letter تَـ shifts the person; ـونَ shows it is plural “you all”."
   },
   {
    "word": "أَعْلَمُ",
    "blocks": [
     {
      "text": "أَ",
      "role": "verbPrefix",
      "gloss": "I (present)"
     },
     {
      "text": "عْلَم",
      "role": "root",
      "gloss": "know"
     },
     {
      "text": "ُ",
      "role": "plain",
      "gloss": "ending vowel"
     }
    ],
    "note": "Many present verbs end with a short vowel; don’t hunt for a “past ending”—the key clue is the front أَـ."
   },
   {
    "word": "يُعَلِّمُكَ",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "he (present)"
     },
     {
      "text": "عَلِّم",
      "role": "root",
      "gloss": "teach (core meaning)"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun",
      "gloss": "you (to you)"
     }
    ],
    "note": "A present verb can also carry an attached object pronoun at the end (here: “teaches you”)."
   }
  ],
  "examples": [
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
    "literal": "not — they/he (present) — know — they (plural)",
    "smooth": "They do not know.",
    "whatChanged": "First time seeing the present verb as a whole signal: a front marker (يَـ) plus a plural ending (ـونَ)."
   },
   {
    "arabic": "يَعْلَمُ سِرَّكُمْ",
    "ref": "6:3",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "عْلَم",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "سِرَّ",
      "role": "plain"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "he (present) — know — (ending) — secret — your (plural)",
    "smooth": "He knows your secrets.",
    "whatChanged": "Shows a present verb with no plural verb ending, plus an attached pronoun on the following noun (كُمْ = “your”)."
   },
   {
    "arabic": "يُعَلِّمُكَ مِن",
    "ref": "12:6",
    "surah": "Sūrat Yusuf",
    "segments": [
     {
      "text": "يُ",
      "role": "verbPrefix"
     },
     {
      "text": "عَلِّم",
      "role": "root"
     },
     {
      "text": "ُ",
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
      "text": "مِن",
      "role": "preposition"
     }
    ],
    "literal": "he (present) — teach — (ending) — you — from",
    "smooth": "He teaches you from …",
    "whatChanged": "Shows that attached pronouns can stick directly to a present verb (…كَ = “you”), not only to nouns and prepositions."
   },
   {
    "arabic": "وَلَا يَشْفَعُونَ",
    "ref": "21:28",
    "surah": "Sūrat Al-Anbiyaa",
    "segments": [
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
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "شْفَع",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "and — not — they/he (present) — intercede — they (plural)",
    "smooth": "And they do not intercede.",
    "whatChanged": "Reinforces the fast tense test: even before knowing the meaning, yā’ at the front flags “present/ongoing,” not past."
   },
   {
    "arabic": "فَسَوْفَ يَعْلَمُونَ",
    "ref": "40:70",
    "surah": "Sūrat Ghafir",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "سَوْفَ",
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
    "literal": "so/then — will — they/he (present) — know — they (plural)",
    "smooth": "Then they will know.",
    "whatChanged": "Adds the explicit future marker سَوْفَ: same present verb form, but now the time is clearly future."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the verb-prefix letters (أ ن ي ت) with the definite article الْـ on nouns.",
    "example": "يَعْلَمُ / ٱلْأَرْضُ",
    "note": "يَـ is a single-letter verb marker meaning “(he/it) does/knows…”. ٱلْـ attaches to nouns and means “the…”. If you see ٱلْ at the front, think “noun”; if you see أ/ن/ي/ت at the very front of a verb-shape, think “present verb.”"
   },
   {
    "claim": "Don’t treat every final ـونَ as “they” unless there is also a present prefix at the front.",
    "example": "يَعْلَمُونَ",
    "note": "In this lesson’s data, ـونَ appears on present verbs (with يَـ or تَـ). The reliable tense clue is still the front marker; the ending helps confirm the subject as plural."
   },
   {
    "claim": "Don’t miss سَوْفَ because it is a separate word; it still belongs to the verb time.",
    "example": "سَوْفَ يَعْلَمُونَ",
    "note": "سَوْفَ comes before a present verb and makes it “will …”. Read the pair together: future marker + present verb form."
   }
  ],
  "checklist": [
   "When you see a new word, first check the very first letter: is it one of أ ن ي ت?",
   "If yes, assume “present/ongoing” (or general truth) and look next for the three-letter root inside it.",
   "Check the end: if you see ـونَ, it often signals a plural subject (“they …” or “you all …”), while the front letter tells you which one.",
   "Scan immediately before the verb: if you see سَـ attached or the separate word سَوْفَ, upgrade the meaning to an explicit future: “will …”.",
   "If a word starts with ٱلْـ, treat it as a noun phrase (“the …”), not a present verb marker.",
   "When you are unsure of meaning, still use the prefix to track “who is doing it” in the sentence flow."
  ],
  "summary": [
   "The rule: present/future verbs are front-marked with one of أ ن ي ت; past verbs are not.",
   "What it looks like: يَعْلَمُ / تَعْلَمُونَ / أَعْلَمُ / نَفْعَلُ, and with future markers: سَوْفَ يَعْلَمُونَ.",
   "What you can now do: identify tense and likely subject quickly, even before recognizing the root, and notice when the Qur’an shifts to an explicit “will …”."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to label present vs past, identify the prefix (أ/ن/ي/ت), and spot whether سَوْفَ makes the meaning future."
 },
 {
  "id": "q-pronouns-verbs",
  "n": 13,
  "title": "The endings again — this time meaning him, them, us",
  "stage": "Verbs for readers",
  "level": "A1",
  "structure": "The same pronoun set on the back of a VERB is the object, not possession: نَصَرَ he helped → نَصَرَهُمْ he helped THEM · هَدَانَا He guided US · خَلَقَكُمْ He created YOU. The third and last home of one closed set: on a noun it means \"his\", on a preposition \"to him\", on a verb \"him\".",
  "whyItMatters": "The set is identical in all three places, so what it means depends entirely on what it is stuck to. Knowing which is which is most of reading a verb clause.",
  "canDo": "After this lesson you can spot when a familiar attached pronoun on the end of a verb is the verb’s object (him/them/us/you), not possession or “to him”.",
  "rule": "The same attached-pronoun set you already know (ـهُ، ـهُمْ، ـنَا، ـكُمْ، …) changes meaning depending on what it sticks to. On a noun it means possession (his/their/our/your). On a preposition it means the object of the preposition (to him/for them/with us). On a verb it means the direct object: he helped them, He guided us, He created you.",
  "why": [
   "Prevents reading خَلَقَكُمْ as “your creation” (noun-meaning) instead of “He created you” (verb-object).",
   "Prevents reading هَدَىٰنَا as “to us” (preposition-meaning) instead of “He guided us” (verb-object).",
   "Helps you find “who did what to whom” inside short verb clauses, especially when no separate object word appears.",
   "Stops you from hunting for a hidden noun after the verb when the object is already glued on."
  ],
  "pattern": {
   "caption": "Same endings, three homes: noun vs preposition vs verb",
   "columns": [
    "Where it attaches",
    "Meaning of the pronoun",
    "Example idea"
   ],
   "rows": [
    [
     "Noun + ـهُمْ",
     "their / them (possession: “their …”)",
     "…their skins…"
    ],
    [
     "Preposition + ـهُ",
     "to him / for him / with him (object of preposition)",
     "…to him…"
    ],
    [
     "Verb + ـهُ",
     "him (direct object of the verb)",
     "He sent him"
    ],
    [
     "Verb + ـهُمْ",
     "them (direct object of the verb)",
     "He made them"
    ],
    [
     "Verb + ـنَا",
     "us (direct object of the verb)",
     "He guided us"
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
      "gloss": "created (he)"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun",
      "gloss": "you (pl.)"
     }
    ],
    "note": "Everything after خَلَقَ is not a new word: كُمْ is the glued-on object “you”."
   },
   {
    "word": "هَدَىٰنَا",
    "blocks": [
     {
      "text": "هَدَىٰ",
      "role": "root",
      "gloss": "guided (he)"
     },
     {
      "text": "نَا",
      "role": "attachedPronoun",
      "gloss": "us"
     }
    ],
    "note": "نَا here is not “our” (that would be on a noun); it is “us” because it is on a verb."
   },
   {
    "word": "أَرْسَلْنَٰهُ",
    "blocks": [
     {
      "text": "أَرْسَلْنَٰ",
      "role": "root",
      "gloss": "sent (we)"
     },
     {
      "text": "هُ",
      "role": "attachedPronoun",
      "gloss": "him"
     }
    ],
    "note": "The verb already contains the “who did it” (we) and the attached pronoun adds “whom” (him)."
   },
   {
    "word": "جَعَلَهُمْ",
    "blocks": [
     {
      "text": "جَعَلَ",
      "role": "root",
      "gloss": "made (he)"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "them"
     }
    ],
    "note": "When you see هُمْ on a verb, translate it as “them”, not “their”."
   }
  ],
  "examples": [
   {
    "arabic": "ٱلَّذِى خَلَقَكُمْ",
    "ref": "2:21",
    "surah": "Sūrat Al-Baqara",
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
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "the one-who created-you",
    "smooth": "…the One who created you.",
    "whatChanged": "You meet كُمْ as a verb-object: the verb already happened, and “you” is attached as the receiver of the action."
   },
   {
    "arabic": "ٱللَّهُ خَلَقَكُمْ ثُمَّ",
    "ref": "16:70",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "ٱللَّهُ",
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
      "text": "كُمْ",
      "role": "attachedPronoun"
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
    "literal": "Allah created-you then",
    "smooth": "Allah created you, then …",
    "whatChanged": "This shows how the attached object often completes the verb clause before the next linking word (ثُمَّ) continues the story."
   },
   {
    "arabic": "وَقَدْ هَدَىٰنَا سُبُلَنَا",
    "ref": "14:12",
    "surah": "Sūrat Ibrahim",
    "segments": [
     {
      "text": "وَ",
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
      "text": "هَدَىٰ",
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
      "text": "سُبُلَ",
      "role": "plain"
     },
     {
      "text": "نَا",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and indeed guided-us paths-our",
    "smooth": "…and He has guided us to our ways/paths.",
    "whatChanged": "One snippet contains both uses: نَا on a verb = “us”, but نَا on a noun = “our”. The same letters, two different jobs."
   },
   {
    "arabic": "وَأَرْسَلْنَٰهُ إِلَىٰ",
    "ref": "37:147",
    "surah": "Sūrat As-Saaffaat",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "أَرْسَلْنَٰ",
      "role": "root"
     },
     {
      "text": "هُ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَىٰ",
      "role": "preposition"
     }
    ],
    "literal": "and we-sent-him to",
    "smooth": "And We sent him to …",
    "whatChanged": "Here the attached pronoun finishes the verb (“sent him”), and then a preposition opens the destination (“to …”)."
   },
   {
    "arabic": "فَجَعَلَهُمْ جُذَٰذًا",
    "ref": "21:58",
    "surah": "Sūrat Al-Anbiyaa",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "جَعَلَ",
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
      "text": "جُذَٰذًا",
      "role": "plain"
     }
    ],
    "literal": "so made-them fragments",
    "smooth": "So he made them into fragments.",
    "whatChanged": "This is the “them” ending (هُمْ) as a direct object: you do not need a separate word for “them” after the verb."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse verb+pronoun (object) with noun+pronoun (possession).",
    "example": "هَدَىٰنَا / سُبُلَنَا",
    "note": "In 14:12 both appear back-to-back. هَدَىٰنَا = “He guided us” (verb-object). سُبُلَنَا = “our paths” (noun-possession). Read what the ending is stuck to."
   },
   {
    "claim": "Don’t translate a verb-attached pronoun as “to him/for him”. That meaning belongs to prepositions.",
    "example": "أَرْسَلْنَٰهُ إِلَىٰ",
    "note": "In 37:147, هُ is not “to him”; it is “him” as the object of “sent”. The “to …” meaning comes from the next word: إِلَىٰ."
   },
   {
    "claim": "Don’t look for a separate object word when the object is already glued onto the verb.",
    "example": "جَعَلَهُمْ",
    "note": "In 21:58, the “them” is already present as هُمْ. The next noun (جُذَٰذًا) is what they became, not the missing object."
   }
  ],
  "checklist": [
   "First, find the verb (past or present) and mark its boundaries as one word in the mushaf.",
   "Look at the very end of the verb: do you see a familiar attached pronoun shape (هُ، هُمْ، نَا، كُمْ…)?",
   "If it is attached to a verb, translate it as the direct object: him/them/us/you (not “his/their/our/your”).",
   "If the same pronoun appears again on a noun nearby, switch gears: on a noun it becomes possession (our, their…).",
   "If a preposition is present (إِلَىٰ, عَلَىٰ, لِـ, بِـ…), keep its meaning separate: preposition+pronoun = “to him/with them…”, not verb-object.",
   "Re-read the clause as a simple English order: (who) + (did) + (to whom). The attached pronoun often provides the “to whom” instantly."
  ],
  "summary": [
   "Rule: the attached pronoun set changes meaning by attachment—noun = possession, preposition = object of preposition, verb = direct object.",
   "What it looks like: a complete verb with a glued ending: خَلَقَكُمْ, هَدَىٰنَا, أَرْسَلْنَٰهُ, جَعَلَهُمْ.",
   "What you can now do: read many Qur’anic verb clauses without waiting for a separate word for “him/them/us/you”, and avoid mixing up “us” with “our”."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to decide whether the attached pronoun is possession, a prepositional object, or a verb object—and translate it accordingly."
 },
 {
  "id": "q-idafa",
  "n": 14,
  "title": "Two nouns together: \"the X of the Y\"",
  "stage": "Verbs for readers",
  "level": "A2",
  "structure": "Two nouns side by side with nothing between them means \"the X of the Y\" (الإضافة). The FIRST noun drops its الْ and any tanween; the SECOND takes a kasrah: رَبُّ الْعَالَمِينَ Lord of the worlds · يَوْمُ الدِّينِ the Day of Judgement · كِتَابُ اللَّهِ the Book of Allah · عِبَادُ اللَّهِ the servants of Allah. The pair behaves as one unit.",
  "whyItMatters": "Some of the most repeated phrases in the Qur'an are exactly this shape. Once you see the pattern you stop reading two words and start reading one idea.",
  "canDo": "After this lesson you can spot two nouns side by side and read them as one unit meaning “the X of the Y,” noticing the missing الْ/tanwīn on the first noun and the kasrah on the second.",
  "rule": "When two nouns come directly next to each other with nothing between them, they form an iḍāfa (الإضافة): “the X of the Y.” The first noun (X) loses its الْ (if it had one) and loses tanwīn; the second noun (Y) is in the genitive, so it takes a kasrah (ـِ) if it shows a case ending. Read the pair as one idea, not two separate items.",
  "why": [
   "Prevents reading رَبِّ ٱلْعَٰلَمِينَ as “a lord, the worlds” instead of the single phrase “Lord of the worlds.”",
   "Prevents missing what a preposition is pointing to: بِـ / لِـ often leads straight into an iḍāfa (e.g., لِرَبِّ ٱلْعَٰلَمِينَ), which is the true object of the preposition.",
   "Prevents treating the second noun as an adjective; in iḍāfa the second noun is “owner/identifier,” not a describer.",
   "Prevents breaking Qur’anic key phrases into two unrelated words, especially repeated ones like يَوْمِ ٱلدِّينِ."
  ],
  "pattern": {
   "caption": "The iḍāfa pattern: two nouns, one meaning",
   "columns": [
    "Form you see",
    "What it literally means",
    "What to notice"
   ],
   "rows": [
    [
     "رَبُّ ٱلْعَٰلَمِينَ",
     "Lord of the worlds",
     "2 nouns; second is definite; whole phrase becomes definite"
    ],
    [
     "يَوْمِ ٱلدِّينِ",
     "Day of the Judgement",
     "Second noun has kasrah; first has no tanwīn"
    ],
    [
     "رَسُولُ رَبِّ ٱلْعَٰلَمِينَ",
     "Messenger of (the) Lord of the worlds",
     "An iḍāfa can be nested inside a bigger one"
    ],
    [
     "بِيَوْمِ ٱلدِّينِ",
     "in/with (belief in) the Day of Judgement",
     "A preposition + iḍāfa is extremely common"
    ],
    [
     "إِلَىٰ يَوْمِ ٱلدِّينِ",
     "until the Day of Judgement",
     "The iḍāfa can be the object of a preposition"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "رَبِّ",
    "blocks": [
     {
      "text": "رَبّ",
      "role": "root",
      "gloss": "lord, master"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "genitive i"
     }
    ],
    "note": "The kasrah (ـِ) is the visible signal that this noun is the SECOND noun in an iḍāfa (or is governed by a preposition)."
   },
   {
    "word": "يَوْمِ",
    "blocks": [
     {
      "text": "يَوْم",
      "role": "root",
      "gloss": "day, time"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "genitive i"
     }
    ],
    "note": "In phrases like يَوْمِ ٱلدِّينِ, the first noun is often shown with kasrah because something before it (like إِلَىٰ) pulls it into the genitive."
   },
   {
    "word": "ٱلدِّينِ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "دِّين",
      "role": "root",
      "gloss": "judgement, religion"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "genitive i"
     }
    ],
    "note": "The second noun in an iḍāfa is often definite (here with ٱلْ), making the whole iḍāfa definite: “the Day of Judgement.”"
   },
   {
    "word": "لِرَبِّ",
    "blocks": [
     {
      "text": "لِ",
      "role": "preposition",
      "gloss": "to/for"
     },
     {
      "text": "رَبّ",
      "role": "root",
      "gloss": "lord, master"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "genitive i"
     }
    ],
    "note": "The لِـ sticks to the noun; the kasrah you see after the noun is still the noun’s case ending."
   },
   {
    "word": "بِيَوْمِ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "in/with/by"
     },
     {
      "text": "يَوْم",
      "role": "root",
      "gloss": "day, time"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "genitive i"
     }
    ],
    "note": "When a preposition comes right before the iḍāfa, it usually attaches to the FIRST noun (here: day), not to the second."
   }
  ],
  "examples": [
   {
    "arabic": "لِرَبِّ ٱلْعَٰلَمِينَ",
    "ref": "2:131",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "لِ",
      "role": "preposition"
     },
     {
      "text": "رَبّ",
      "role": "root"
     },
     {
      "text": "ِ ",
      "role": "nounEnding"
     },
     {
      "text": "ٱلْعَٰلَمِينَ",
      "role": "plain"
     }
    ],
    "literal": "to/for + Lord (genitive) + the worlds",
    "smooth": "to the Lord of the worlds",
    "whatChanged": "This shows iḍāfa after a preposition: لِ points you to the whole unit “Lord of the worlds,” not just the first word."
   },
   {
    "arabic": "رَسُولُ رَبِّ ٱلْعَٰلَمِينَ",
    "ref": "26:16",
    "surah": "Sūrat Ash-Shu'araa",
    "segments": [
     {
      "text": "رَسُول",
      "role": "root"
     },
     {
      "text": "ُ ",
      "role": "nounEnding"
     },
     {
      "text": "رَبّ",
      "role": "root"
     },
     {
      "text": "ِ ",
      "role": "nounEnding"
     },
     {
      "text": "ٱلْعَٰلَمِينَ",
      "role": "plain"
     }
    ],
    "literal": "messenger (u) + Lord (i) + the worlds",
    "smooth": "the Messenger of the Lord of the worlds",
    "whatChanged": "This shows an iḍāfa chain: “Messenger of [Lord of the worlds]” where the second part is itself an iḍāfa."
   },
   {
    "arabic": "رَبِّ ٱلسَّمَٰوَٰتِ",
    "ref": "45:36",
    "surah": "Sūrat Al-Jaathiya",
    "segments": [
     {
      "text": "رَبّ",
      "role": "root"
     },
     {
      "text": "ِ ",
      "role": "nounEnding"
     },
     {
      "text": "ٱلْ",
      "role": "plain"
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
    "literal": "Lord (i) + the + heavens (i)",
    "smooth": "Lord of the heavens",
    "whatChanged": "This highlights the key signal on the SECOND noun: ٱلسَّمَٰوَٰتِ ends with kasrah because it is “the Y” in “X of Y.”"
   },
   {
    "arabic": "إِلَىٰ يَوْمِ ٱلدِّينِ",
    "ref": "15:35",
    "surah": "Sūrat Al-Hijr",
    "segments": [
     {
      "text": "إِلَىٰ ",
      "role": "preposition"
     },
     {
      "text": "يَوْم",
      "role": "root"
     },
     {
      "text": "ِ ",
      "role": "nounEnding"
     },
     {
      "text": "ٱلْ",
      "role": "plain"
     },
     {
      "text": "دِّين",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     }
    ],
    "literal": "until + day (i) + the + judgement (i)",
    "smooth": "until the Day of Judgement",
    "whatChanged": "This shows how prepositions often make the FIRST noun genitive too (يَوْمِ), but the iḍāfa still works the same: two nouns, one meaning."
   },
   {
    "arabic": "بِيَوْمِ ٱلدِّينِ",
    "ref": "70:26",
    "surah": "Sūrat Al-Ma'aarij",
    "segments": [
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "يَوْم",
      "role": "root"
     },
     {
      "text": "ِ ",
      "role": "nounEnding"
     },
     {
      "text": "ٱلْ",
      "role": "plain"
     },
     {
      "text": "دِّين",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     }
    ],
    "literal": "in/with + day (i) + the + judgement (i)",
    "smooth": "in the Day of Judgement / in (belief in) the Day of Judgement",
    "whatChanged": "This reinforces the very common shape “preposition + iḍāfa,” where بِـ attaches to the first noun and the phrase reads as one concept."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse an iḍāfa (two nouns) with “noun + adjective.”",
    "example": "رَبِّ ٱلْعَٰلَمِينَ",
    "note": "ٱلْعَٰلَمِينَ is not describing what kind of Lord (like “great Lord”); it identifies whose Lord: Lord OF the worlds. In adjective phrases, the adjective typically matches definiteness with the noun; in iḍāfa, the second word is a noun that the first depends on."
   },
   {
    "claim": "Don’t translate the two words separately; translate the unit.",
    "example": "يَوْمِ ٱلدِّينِ",
    "note": "Reading “day, the judgement” loses the relationship. Train yourself to glue them: “Day of Judgement.” The meaning is in the link, not just the dictionary words."
   },
   {
    "claim": "Don’t expect the first noun to always show a special ending; what matters is ‘no gap’ and the second noun being genitive.",
    "example": "رَبُّ ٱلْعَٰلَمِينَ",
    "note": "Sometimes the first noun ends with ُ (like رَبُّ) because of its role in the sentence, not because iḍāfa is absent. The iḍāfa signal you can reliably look for is: two nouns touching + the second noun in kasrah when visible."
   },
   {
    "claim": "Don’t think the second noun is always ‘the’; it can be definite or not, and that affects the whole phrase.",
    "example": "رَسُولُ رَبِّ ٱلْعَٰلَمِينَ",
    "note": "Here, رَسُولُ has no ٱلْ. The phrase becomes definite because the second side is definite by what follows (رَبِّ ٱلْعَٰلَمِينَ). In general: if the second noun is definite, the whole iḍāfa reads as definite in English."
   }
  ],
  "checklist": [
   "Look for two nouns back-to-back with nothing between them (no وَ, no لَا, no verb).",
   "Check the FIRST noun: it usually has no tanwīn, and it does not carry ٱلْ in iḍāfa.",
   "Check the SECOND noun: if vowel marks are shown, expect a kasrah (ـِ) at the end (or it behaves like a genitive form).",
   "If there is a preposition right before the first noun (لِـ, بِـ, إِلَىٰ), expect the iḍāfa immediately after it: preposition + [X of Y].",
   "Translate as a single chunk: “X of Y,” and only then place it into the sentence meaning.",
   "If you see a chain (X Y Z), try grouping it from the end: (Y of Z), then (X of (Y of Z))."
  ],
  "summary": [
   "Rule: two nouns touching each other form an iḍāfa: “the X of the Y.”",
   "Look: first noun drops tanwīn/doesn’t take ٱلْ; second noun is genitive (often with kasrah).",
   "Result: you can read repeated Qur’anic phrases like رَبِّ ٱلْعَٰلَمِينَ and يَوْمِ ٱلدِّينِ as one idea while reading."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify the iḍāfa unit and translate it as “X of Y,” including cases after prepositions."
 },
 {
  "id": "q-noun-adjective",
  "n": 15,
  "title": "A noun and its description — and how to tell it from the last lesson",
  "stage": "Verbs for readers",
  "level": "A2",
  "structure": "An adjective FOLLOWS its noun and copies it four ways: definite/indefinite, gender, number, and case ending. الصِّرَاطَ الْمُسْتَقِيمَ the straight path (both definite, both fathah) · رَبٌّ غَفُورٌ a forgiving Lord (both indefinite). The test against إضافة: if الْ matches on both words it is a description; if the first has الْ and the second does not, something else is going on.",
  "whyItMatters": "Confusing this with إضافة turns \"the straight path\" into \"the path of the straight\". These two structures look identical and mean different things, which is why they sit back to back.",
  "canDo": "After this lesson you can spot when a Qur’anic word is describing the noun right before it (an adjective), and you can distinguish that from the two‑nouns “X of Y” structure from last lesson.",
  "rule": "In Qur’anic Arabic, an adjective (نعت) follows its noun and agrees with it in four ways: definiteness (الـ or not), gender, number, and case ending. So ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ is “the straight path” because both words are definite and both carry the same case ending. A quick test against إضافة: if the first word has ٱلـ and the second does NOT, it is not a description—something else (often iḍāfa) is happening.",
  "why": [
   "Prevents reading a description as ownership/relationship: “the straight path” vs “the path of the straight.”",
   "Prevents missing key meanings in repeated Qur’anic phrases like عَذَابٌ أَلِيمٌ (a painful punishment) by treating the second word as a separate noun.",
   "Helps you see what a word is doing in the sentence: a following adjective is not a new subject/object, it is extra information about the same noun.",
   "Stops you from forcing a “of …” translation when both words are matching in definiteness and endings."
  ],
  "pattern": {
   "caption": "Noun + adjective: the second word matches the first (especially in الـ and the case ending)",
   "columns": [
    "Structure",
    "Arabic cue you can see",
    "What to read it as"
   ],
   "rows": [
    [
     "Definite noun + definite adjective",
     "both have ٱلـ; endings match",
     "“the ___ (that is) ___”"
    ],
    [
     "Indefinite noun + indefinite adjective",
     "no ٱلـ on either; often tanwīn matches",
     "“a/an ___ (that is) ___”"
    ],
    [
     "Plural/dual agreement",
     "adjective form fits the noun’s number",
     "still one noun being described"
    ],
    [
     "Case agreement",
     "both words share the same final vowel (ـُ/ـَ/ـِ) when visible",
     "the adjective is grammatically tied to the noun"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلصِّرَٰطَ",
    "blocks": [
     {
      "text": "ٱل",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "صِّرَٰط",
      "role": "root",
      "gloss": "path/road"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "accusative"
     }
    ],
    "note": "Split shows the definite article and the case ending that the adjective will copy."
   },
   {
    "word": "ٱلْمُسْتَقِيمَ",
    "blocks": [
     {
      "text": "ٱل",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "مُسْتَقِيم",
      "role": "root",
      "gloss": "straight/upright"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "accusative"
     }
    ],
    "note": "The key boundary is the final َ matching the noun’s َ, plus ٱلـ matching ٱلـ."
   },
   {
    "word": "عَذَابٌ",
    "blocks": [
     {
      "text": "عَذَاب",
      "role": "root",
      "gloss": "punishment"
     },
     {
      "text": "ٌ",
      "role": "nounEnding",
      "gloss": "indefinite -un"
     }
    ],
    "note": "Tanwīn (ٌ) is an “indefinite” signal that the adjective can mirror."
   },
   {
    "word": "أَلِيمٌۢ",
    "blocks": [
     {
      "text": "أَلِيم",
      "role": "root",
      "gloss": "painful"
     },
     {
      "text": "ٌۢ",
      "role": "nounEnding",
      "gloss": "indefinite -un"
     }
    ],
    "note": "The adjective repeats the same indefiniteness (tanwīn) and case as the noun."
   }
  ],
  "examples": [
   {
    "arabic": "ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
    "ref": "37:118",
    "surah": "Sūrat As-Saaffaat",
    "segments": [
     {
      "text": "ٱل",
      "role": "plain"
     },
     {
      "text": "صِّرَٰط",
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
      "text": "ٱل",
      "role": "plain"
     },
     {
      "text": "مُسْتَقِيم",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "the path-َ / the straight-َ",
    "smooth": "the straight path",
    "whatChanged": "Both words have ٱلـ and the same case ending (َ), so the second word is describing the first (not “X of Y”)."
   },
   {
    "arabic": "عَذَابٌ أَلِيمٌۢ",
    "ref": "2:10",
    "surah": "Sūrat Al-Baqara",
    "segments": [
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
      "text": "ٌۢ",
      "role": "nounEnding"
     }
    ],
    "literal": "punishment-un / painful-un",
    "smooth": "a painful punishment",
    "whatChanged": "Here both words are indefinite (tanwīn) and match in ending, so you read one noun being described, not two separate nouns."
   },
   {
    "arabic": "عَذَابٌ أَلِيمٌۭ",
    "ref": "3:177",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
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
      "text": "ٌۭ",
      "role": "nounEnding"
     }
    ],
    "literal": "punishment-un / painful-un",
    "smooth": "a painful punishment",
    "whatChanged": "Same grammar as the previous example, but this time notice the Qur’an may show slightly different tanwīn shapes (ۭ/ۢ) while the agreement logic stays the same."
   },
   {
    "arabic": "عَارِضًۭا مُّسْتَقْبِلَ",
    "ref": "46:24",
    "surah": "Sūrat Al-Ahqaf",
    "segments": [
     {
      "text": "عَارِض",
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
      "text": "مُّسْتَقْبِل",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "a cloud-ًا / facing-َ",
    "smooth": "a cloud approaching (their valleys)",
    "whatChanged": "The adjective still follows the noun, and you can often see matching “accusative” -a/-an endings (َ / ًا) tying them together."
   },
   {
    "arabic": "ٱللَّهَ غَفُورٌۭ رَّحِيمٌۭ",
    "ref": "3:31",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "ٱل",
      "role": "plain"
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
      "text": "ٌۭ",
      "role": "nounEnding"
     }
    ],
    "literal": "Allah-َ / forgiving-un / merciful-un",
    "smooth": "Allah is Forgiving, Merciful",
    "whatChanged": "Not every “following word” is an adjective of the immediately previous word: here the endings show ٱللَّهَ is in a different case from غَفُورٌۭ رَّحِيمٌۭ, so these are describing Allah as a predicate description, not a tight noun+adjective pair like ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse “noun + adjective” with iḍāfa (two nouns: X of Y)",
    "example": "ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
    "note": "Because both words carry ٱلـ, it cannot be an iḍāfa pattern like “the X of Y” (where the second noun is typically definite without needing ٱلـ). Read it as “the straight path,” not “the path of the straight.”"
   },
   {
    "claim": "Don’t force an “of …” translation when endings and definiteness match",
    "example": "عَذَابٌ أَلِيمٌۢ",
    "note": "Both words are indefinite with tanwīn; that matching is the loud signal of description. If you translate “punishment of painful,” you’ve misread the structure."
   },
   {
    "claim": "Don’t assume every following word is an adjective of the previous one",
    "example": "ٱللَّهَ غَفُورٌۭ",
    "note": "Here the case endings do not match (َ vs ٌ). This often indicates a sentence-level relationship (a predicate description) rather than a single noun being modified. Use the endings as your compass."
   }
  ],
  "checklist": [
   "When you see two words side by side, first ask: is the second word describing the first (adjective) or completing it (iḍāfa)?",
   "Check definiteness: if both words have ٱلـ, strongly suspect “noun + adjective.” If only the first has ٱلـ and the second does not, it is probably not an adjective pair.",
   "Check the ending vowels when they are written: matching َ/ُ/ِ (or matching tanwīn) is a strong adjective-agreement clue.",
   "Keep them together in translation: “a painful punishment,” not “a punishment, painful” (unless the sentence clearly separates them).",
   "If endings do not match, slow down: the second word may be a predicate description or part of a different structure, not a tight modifier.",
   "If you already recognize an iḍāfa from last lesson, use this lesson’s test: iḍāfa does not show “double ٱلـ matching” the way adjective pairs do."
  ],
  "summary": [
   "Rule: An adjective follows its noun and agrees in definiteness, gender, number, and case ending.",
   "Look: matching ٱلـ on both words and matching endings (especially tanwīn or the final vowel) usually means “noun + description.”",
   "Now you can: keep adjective phrases glued together while reading and avoid mistaking them for the iḍāfa “X of Y” structure."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify which pairs are noun+adjective (agreement) versus not, using ٱلـ and the case/tanwīn endings as your evidence."
 },
 {
  "id": "q-sentence-types",
  "n": 16,
  "title": "Two kinds of sentence, and the missing \"is\"",
  "stage": "Verbs for readers",
  "level": "A2",
  "structure": "A VERBAL sentence starts with a verb: خَلَقَ اللَّهُ السَّمَاوَاتِ. A NOMINAL sentence has no verb at all, because Arabic has no word for \"is\": اللَّهُ غَفُورٌ \"Allah IS forgiving\". Two nouns in a row where the first is definite and the second is not usually means a sentence, not a description.",
  "whyItMatters": "Half the theological statements in the Qur'an are nominal sentences. Read them as noun phrases and they stop being statements at all.",
  "canDo": "After this lesson you can tell when the Qur’an is making a statement with no verb (a nominal sentence) versus when it begins with a verb (a verbal sentence), and you will automatically supply the missing English “is/are” when you read.",
  "rule": "Arabic has two common sentence types. A verbal sentence starts with a verb (often “He does…” / “They do…”), while a nominal sentence may have no verb at all: a definite noun/pronoun followed by an adjective or another noun is often a complete statement, with an implied “is/are.” When the first word is definite (like ٱللَّهُ or إِنَّ ٱللَّهَ) and the next key word is not, read it as “X is Y,” not as “the Y of X” or “X’s Y.”",
  "why": [
   "Prevents reading statements like إِنَّ ٱللَّهَ غَفُورٌۭ رَّحِيمٌ as a mere noun phrase (“Allah’s forgiving, merciful…”) instead of a claim (“Allah is forgiving, merciful”).",
   "Prevents mistaking theological declarations for descriptions inside a longer noun chain (confusing nominal sentences with the “X of the Y” structure from Lesson 14).",
   "Helps you locate the real “main clause” in a long āyah: a verb-start may be one clause, then a nominal sentence may explain Allah’s attributes as a second clause.",
   "Stops you from searching for a hidden verb in places where Arabic intentionally has none (especially in names and attributes of Allah)."
  ],
  "pattern": {
   "caption": "Two sentence types you will keep meeting: verb-first vs “missing is”",
   "columns": [
    "Type",
    "What it often looks like",
    "How to read it in English"
   ],
   "rows": [
    [
     "Verbal",
     "يَنصُرُ … / أَرْسَلْنَا … / جَعَلَ …",
     "“(He/We) does …” (a real verb is present)"
    ],
    [
     "Nominal (simple)",
     "ٱللَّهُ + adjective/noun",
     "“Allah is …” (no Arabic word for “is”)"
    ],
    [
     "Nominal with إِنَّ",
     "إِنَّ + definite noun + adjective(s)",
     "“Indeed, X is …” (still no “is”)"
    ],
    [
     "Nominal with pronoun",
     "وَهُوَ + adjective(s)",
     "“And He is …”"
    ],
    [
     "Nominal with a prepositional phrase",
     "X + مِن … + adjective(s)",
     "“X is … / X is from …” (still a statement)"
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
      "gloss": "indeed that"
     }
    ],
    "note": "This particle often introduces a nominal sentence; it does not provide an “is.”"
   },
   {
    "word": "ٱللَّهَ",
    "blocks": [
     {
      "text": "ٱللَّه",
      "role": "plain",
      "gloss": "Allah"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "case ending"
     }
    ],
    "note": "Treat the final vowel sign as the noun’s ending; it changes with grammar, but the word remains ‘Allah’."
   },
   {
    "word": "غَفُورٌۭ",
    "blocks": [
     {
      "text": "غَفُور",
      "role": "plain",
      "gloss": "forgiving"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding",
      "gloss": "an ending"
     }
    ],
    "note": "An indefinite adjective/noun after a definite subject often completes a nominal sentence: “is forgiving.”"
   },
   {
    "word": "وَهُوَ",
    "blocks": [
     {
      "text": "وَ",
      "role": "plain",
      "gloss": "and"
     },
     {
      "text": "هُوَ",
      "role": "plain",
      "gloss": "he"
     }
    ],
    "note": "وَ is attached in writing; the pronoun هُوَ can act as the subject of a nominal sentence."
   },
   {
    "word": "يَنصُرُ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he (does)"
     },
     {
      "text": "نص",
      "role": "root",
      "gloss": "help root"
     },
     {
      "text": "رُ",
      "role": "verbSuffix",
      "gloss": "present ending"
     }
    ],
    "note": "A verb like يَنصُرُ is your clearest ‘verbal sentence’ signal: the clause is action-first."
   }
  ],
  "examples": [
   {
    "arabic": "يَنصُرُ مَن يَشَآءُ",
    "ref": "30:5",
    "surah": "Sūrat Ar-Room",
    "segments": [
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "نص",
      "role": "root"
     },
     {
      "text": "رُ",
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
      "text": "ش",
      "role": "root"
     },
     {
      "text": "آءُ",
      "role": "verbSuffix"
     }
    ],
    "literal": "he-gives-victory / whoever / he-wills",
    "smooth": "He gives victory to whom He wills.",
    "whatChanged": "This is a verbal clause: it begins with a real verb, so you do not mentally insert “is.”"
   },
   {
    "arabic": "وَهُوَ ٱلْعَزِيزُ ٱلرَّحِيمُ",
    "ref": "30:5",
    "surah": "Sūrat Ar-Room",
    "segments": [
     {
      "text": "وَ",
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
      "text": "ٱلْ",
      "role": "plain"
     },
     {
      "text": "عَزِيزُ",
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
      "text": "رَّحِيمُ",
      "role": "plain"
     }
    ],
    "literal": "and he / the-mighty / the-merciful",
    "smooth": "And He is the Mighty, the Merciful.",
    "whatChanged": "Now there is no verb at all: a pronoun + descriptions forms a full statement with an implied “is.”"
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
      "text": "ٱللَّه",
      "role": "plain"
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
      "role": "plain"
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
      "role": "plain"
     },
     {
      "text": "ٌ",
      "role": "nounEnding"
     }
    ],
    "literal": "indeed / Allah / forgiving / merciful",
    "smooth": "Indeed, Allah is forgiving and merciful.",
    "whatChanged": "This shows the very common Qur’anic pattern: إِنَّ + Allah + (indefinite) attributes—still a nominal sentence with a missing “is.”"
   },
   {
    "arabic": "فَإِنَّكَ غَفُورٌۭ رَّحِيمٌۭ",
    "ref": "14:36",
    "surah": "Sūrat Ibrahim",
    "segments": [
     {
      "text": "فَ",
      "role": "plain"
     },
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
      "text": "غَفُور",
      "role": "plain"
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
      "role": "plain"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding"
     }
    ],
    "literal": "so-indeed-you / forgiving / merciful",
    "smooth": "So indeed You are forgiving, merciful.",
    "whatChanged": "Here the subject is ‘You’ (كَ attached to إِنَّ), proving the pattern is not only for the word ٱللَّه: the ‘missing is’ works with any definite subject."
   },
   {
    "arabic": "لَغَفُورٌۭ رَّحِيمٌۭ",
    "ref": "7:153",
    "surah": "Sūrat Al-A'raaf",
    "segments": [
     {
      "text": "لَ",
      "role": "particle"
     },
     {
      "text": "غَفُور",
      "role": "plain"
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
      "role": "plain"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding"
     }
    ],
    "literal": "surely-forgiving / merciful",
    "smooth": "(He is) surely forgiving, merciful.",
    "whatChanged": "This snippet forces you to remember: Arabic may give you the predicate (‘forgiving, merciful’) and you supply the subject from context—still no ‘is’ word appears."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a nominal sentence (statement) with a description inside a noun phrase.",
    "example": "إِنَّ ٱللَّهَ غَفُورٌۭ",
    "note": "Because ٱللَّهَ is definite and غَفُورٌۭ is indefinite, this is normally a complete claim: “Allah is forgiving.” If you read it as a mere phrase (“the forgiving Allah”), you lose the statement."
   },
   {
    "claim": "Don’t go hunting for a hidden verb when the Qur’an intends a timeless statement.",
    "example": "وَهُوَ ٱلْعَزِيزُ",
    "note": "There is no ‘is’ in Arabic here. The point is precisely that the attribute is constant: “And He is the Mighty.”"
   },
   {
    "claim": "Don’t misread verb-first clauses as nominal sentences just because a noun appears soon after.",
    "example": "يَنصُرُ مَن",
    "note": "The first word is already a verb (يَنصُرُ), so the clause is action-first. Your brain should switch to “He does…” not “He is…”."
   },
   {
    "claim": "Don’t treat إِنَّ as meaning ‘is’.",
    "example": "إِنَّ ٱللَّهَ",
    "note": "إِنَّ adds emphasis (“indeed/truly”) and often triggers a different ending on the noun after it, but it does not supply the English verb ‘is’—you still insert that yourself when the structure is nominal."
   }
  ],
  "checklist": [
   "Look at the first meaningful word: if it is a verb form (often with a prefix like يَ / نَ), expect a verbal sentence.",
   "If the clause begins with a definite noun/pronoun (ٱللَّهُ, هُوَ, or a name with ٱلْ), and no verb appears, expect a nominal sentence.",
   "In a nominal sentence, watch for a second word that is an adjective or noun (often indefinite with ٌ / ً / ٍ): read “X is Y.”",
   "If you see إِنَّ, treat it as a loud signpost: a nominal sentence is likely starting right after it.",
   "If you see وَهُوَ, read it as “and He is …” and let what follows complete the statement.",
   "When in doubt between Lesson 14 (X of Y) and this lesson: if the first word is definite and the next key word is indefinite (no ٱلْ), it is usually “X is Y,” not “X of Y.”"
  ],
  "summary": [
   "Rule: verbal sentences start with a verb; nominal sentences may have no verb, so you supply “is/are” in English.",
   "What it looks like: ٱللَّهُ/هُوَ/إِنَّ + (attribute) — especially definite subject followed by an indefinite adjective/noun.",
   "What you can now do: read core Qur’anic declarations as real statements, not as dangling noun phrases."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to label them as verbal vs nominal, and to choose the correct English reading with (or without) an implied “is.”"
 },
 {
  "id": "q-mubtada-khabar",
  "n": 17,
  "title": "Subject and predicate: what is being said about what",
  "stage": "Verbs for readers",
  "level": "A2",
  "structure": "The nominal sentence has two parts: the MUBTADA (what we are talking about — definite, usually first, dammah) and the KHABAR (what is said about it — usually indefinite, dammah). ٱللَّهُ نُورُ ٱلسَّمَٰوَٰتِ · إِنَّ ٱللَّهَ غَفُورٌ رَّحِيمٌ. Either part can be a whole phrase.",
  "whyItMatters": "Naming the two halves is what lets you read a long verse as one claim rather than a pile of nouns.",
  "canDo": "After this lesson you can spot a Qur’anic nominal sentence and split it into MUBTADA (what we are talking about) and KHABAR (what is being said about it), even when either side is a whole phrase.",
  "rule": "A nominal sentence (الجملة الاسمية) has two halves: the MUBTADA (مبتدأ) and the KHABAR (خبر). The MUBTADA is usually definite and comes first; the KHABAR is what is said about it and is often indefinite. Both parts are typically in the nominative (often shown by ُ / dammah), and either half can be more than one word (a phrase).",
  "why": [
   "Prevents reading a string of nouns as separate labels instead of one complete claim (e.g., “Allah … powerful” as one statement).",
   "Stops you from mistaking a new sentence for a continuation, especially after وَ or other connectors.",
   "Helps you locate “the missing is/are” quickly, so you know what is being asserted about what.",
   "Keeps you from treating an adjective phrase as the whole point when it is actually the KHABAR of a larger subject."
  ],
  "pattern": {
   "caption": "Nominal sentence = Subject (MUBTADA) + Predicate (KHABAR). Look for nominative endings and (often) definiteness vs indefiniteness.",
   "columns": [
    "MUBTADA (about what?)",
    "KHABAR (said about it)",
    "Overall meaning"
   ],
   "rows": [
    [
     "ٱللَّهُ",
     "قَدِيرٌۭ",
     "Allah is powerful/able"
    ],
    [
     "ٱللَّهُ",
     "غَفُورٌۭ رَّحِيمٌۭ",
     "Allah is Forgiving, Merciful"
    ],
    [
     "وَٱللَّهُ",
     "مُحِيطٌۢ بِٱلْكَٰفِرِينَ",
     "and Allah is encompassing the disbelievers"
    ],
    [
     "طَاعَةٌۭ",
     "مَّعْرُوفَةٌ",
     "(Their duty is) known/recognized obedience"
    ],
    [
     "وَٱللَّهُ",
     "ذُو ٱلْفَضْلِ ٱلْعَظِيمِ",
     "and Allah is the possessor of great bounty"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱللَّهُ",
    "blocks": [
     {
      "text": "ٱللَّهُ",
      "role": "plain",
      "gloss": "Allah (subject)"
     }
    ],
    "note": "Treat this as one unit; in nominal sentences it is commonly the MUBTADA when it comes first with ُ."
   },
   {
    "word": "قَدِيرٌۭ",
    "blocks": [
     {
      "text": "قَدِير",
      "role": "root",
      "gloss": "powerful/able"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding",
      "gloss": "nominative"
     }
    ],
    "note": "The ending ٌ (tanwīn ḍamm) often signals an indefinite KHABAR: “(is) powerful.”"
   },
   {
    "word": "غَفُورٌۭ",
    "blocks": [
     {
      "text": "غَفُور",
      "role": "root",
      "gloss": "forgiving"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding",
      "gloss": "nominative"
     }
    ],
    "note": "Another classic KHABAR pattern: an indefinite descriptive noun with ٌ."
   },
   {
    "word": "مُحِيطٌۢ",
    "blocks": [
     {
      "text": "مُحِيط",
      "role": "root",
      "gloss": "encompassing"
     },
     {
      "text": "ٌۢ",
      "role": "nounEnding",
      "gloss": "nominative"
     }
    ],
    "note": "Even when the KHABAR will continue (e.g., with بِ...), the first word still shows nominative."
   }
  ],
  "examples": [
   {
    "arabic": "إِنَّ ٱللَّهَ عَلَىٰ كُلِّ شَىْءٍۢ قَدِيرٌۭ",
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
      "text": "ٱللَّهَ",
      "role": "plain"
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
      "text": "كُلِّ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "شَىْءٍۢ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "قَدِيرٌۭ",
      "role": "plain"
     }
    ],
    "literal": "Indeed Allah — over every thing — powerful.",
    "smooth": "Indeed, Allah is able over everything.",
    "whatChanged": "This shows a nominal-style claim introduced by إِنَّ, with the KHABAR coming at the end after a whole phrase."
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
      "text": "ٱللَّهُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُحِيطٌۢ",
      "role": "plain"
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
      "text": "ٱلْكَٰفِرِينَ",
      "role": "plain"
     }
    ],
    "literal": "And Allah — encompassing — of the disbelievers.",
    "smooth": "And Allah encompasses the disbelievers.",
    "whatChanged": "This shows a KHABAR that is a phrase: one main word (مُحِيطٌۢ) plus a prepositional complement (بِٱلْكَٰفِرِينَ)."
   },
   {
    "arabic": "وَٱللَّهُ غَفُورٌۭ رَّحِيمٌۭ",
    "ref": "3:31",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
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
      "text": "غَفُورٌۭ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَّحِيمٌۭ",
      "role": "plain"
     }
    ],
    "literal": "And Allah — forgiving — merciful.",
    "smooth": "And Allah is Forgiving and Merciful.",
    "whatChanged": "This shows that the KHABAR can be more than one word (two predicates describing the same subject)."
   },
   {
    "arabic": "طَاعَةٌۭ مَّعْرُوفَةٌ",
    "ref": "24:53",
    "surah": "Sūrat An-Noor",
    "segments": [
     {
      "text": "طَاعَةٌۭ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مَّعْرُوفَةٌ",
      "role": "plain"
     }
    ],
    "literal": "Obedience — recognized/known.",
    "smooth": "(What is required is) proper obedience.",
    "whatChanged": "This shows a very compact nominal sentence: a noun as MUBTADA and a descriptive word as KHABAR, with no verb at all."
   },
   {
    "arabic": "وَٱللَّهُ عَلِيمٌۢ بِٱلظَّٰلِمِينَ",
    "ref": "9:47",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
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
      "text": "عَلِيمٌۢ",
      "role": "plain"
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
      "text": "ٱلظَّٰلِمِينَ",
      "role": "plain"
     }
    ],
    "literal": "And Allah — knowing — of the wrongdoers.",
    "smooth": "And Allah knows the wrongdoers well.",
    "whatChanged": "This reinforces that a prepositional phrase can belong to the KHABAR, completing the meaning of the predicate."
   },
   {
    "arabic": "وَٱللَّهُ ذُو ٱلْفَضْلِ ٱلْعَظِيمِ",
    "ref": "57:21",
    "surah": "Sūrat Al-Hadid",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
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
      "text": "ذُو",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْفَضْلِ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْعَظِيمِ",
      "role": "plain"
     }
    ],
    "literal": "And Allah — possessor (of) — the bounty — the great.",
    "smooth": "And Allah is the possessor of great bounty.",
    "whatChanged": "This shows that the KHABAR can be a whole noun phrase (ذُو ...), not just a single adjective-like word."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a nominal sentence with a verbal sentence just because there is “meaning” of action.",
    "example": "وَٱللَّهُ مُحِيطٌۢ",
    "note": "There is no verb here; it is a claim about Allah. Start by asking: “About who/what?” (ٱللَّهُ) then “What is said?” (مُحِيطٌۢ ...)."
   },
   {
    "claim": "Don’t assume the first noun is always the MUBTADA if a particle has already shifted the structure.",
    "example": "إِنَّ ٱللَّهَ ... قَدِيرٌۭ",
    "note": "إِنَّ introduces an emphasized statement; focus on the two halves of the claim (Allah + the predicate) even if the ending on ٱللَّهَ is not ُ in the written text."
   },
   {
    "claim": "Don’t split the KHABAR too early when it is a phrase.",
    "example": "عَلِيمٌۢ بِٱلظَّٰلِمِينَ",
    "note": "Read it as one predicate package: “knowing/aware of the wrongdoers.” The بِ- phrase completes the predicate, not a new sentence."
   }
  ],
  "checklist": [
   "Look for a place where the Qur’an is making a claim without an explicit “is/are.”",
   "Find the “about what?” word or phrase (often definite: ٱللَّهُ, or a word with الْ). Mark it as the MUBTADA.",
   "Look for the “said about it” part (often indefinite with ٌ / tanwīn ḍamm). Mark it as the KHABAR.",
   "If the predicate word is followed by a preposition (بِ، عَلَىٰ, etc.), keep reading: that whole phrase may still be the KHABAR.",
   "If you see two descriptive words in a row (e.g., غَفُورٌۭ رَّحِيمٌۭ), treat both as part of the KHABAR.",
   "After splitting, reread in English with an inserted “is/are” between the halves to confirm the meaning."
  ],
  "summary": [
   "The rule: a nominal sentence has two halves—MUBTADA (topic) and KHABAR (comment)—often both nominative.",
   "What it looks like: a definite subject first, then an often-indefinite predicate; either side can expand into a phrase.",
   "What you can now do: take long verses with many nouns and recognize the single statement being made, instead of reading them as a list."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify which words belong to the MUBTADA and which belong to the KHABAR, including when the KHABAR is a whole phrase."
 },
 {
  "id": "q-inna-sisters",
  "n": 18,
  "title": "إِنَّ and its sisters: indeed, that, but, perhaps",
  "stage": "Verbs for readers",
  "level": "A2",
  "structure": "إِنَّ indeed · أَنَّ that · لَٰكِنَّ but · لَعَلَّ perhaps · لَيْتَ if only · كَأَنَّ as though. Each one puts the noun after it into FATHAH: إِنَّ اللَّهَ — not اللَّهُ. That fathah is the visible fingerprint of the particle.",
  "whyItMatters": "Seeing a fathah where you expected a dammah is a clue, not a mistake — it tells you a particle is governing the clause.",
  "canDo": "After this lesson you can spot إِنَّ and its sisters in a verse and use the sudden fathah on the next noun as a clue that a whole clause is being introduced (indeed/that/but/perhaps).",
  "rule": "إِنَّ and its sisters (إِنَّ، أَنَّ، لَٰكِنَّ، لَعَلَّ، لَيْتَ، كَأَنَّ) govern the nominal sentence that follows them. Their visible fingerprint is that the noun immediately after them takes fathah (ـَ) where you might have expected dammah (ـُ). When you see that unexpected fathah, read it as a meaning clue: “indeed / that / but / perhaps …”.",
  "why": [
   "Prevents misreading a fathah on a familiar word (like ٱللَّهَ) as a “mistake” instead of a sign that a particle is controlling the clause.",
   "Stops you from treating the next noun as a normal subject (مبتدأ) with dammah, which would scramble who/what the sentence is about.",
   "Helps you detect when the Qur’an is emphasizing (إِنَّ) versus merely stating, changing the force of the message.",
   "Keeps you from missing embedded “that …” information after verbs like ٱعْلَمُوا۟ (know), where أَنَّ introduces the content."
  ],
  "pattern": {
   "caption": "Particles that “stamp” the next noun with fathah (the fingerprint)",
   "columns": [
    "Particle",
    "Core meaning",
    "Fingerprint on next noun"
   ],
   "rows": [
    [
     "إِنَّ",
     "indeed / truly",
     "إِنَّ ٱللَّهَ … (noun after is ـَ)"
    ],
    [
     "أَنَّ",
     "that … (content clause)",
     "أَنَّ ٱللَّهَ …"
    ],
    [
     "لَٰكِنَّ / لَٰكِن",
     "but / however",
     "… وَلَٰكِن … (contrast; watch the noun after لَٰكِنَّ when it appears)"
    ],
    [
     "لَعَلَّ",
     "perhaps / so that",
     "وَلَعَلَّكُمْ … (often followed by pronoun forms)"
    ],
    [
     "إِنَّا",
     "indeed we …",
     "إِنَّآ + verb (particle plus attached pronoun)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "إِنَّآ",
    "blocks": [
     {
      "text": "إِنَّ",
      "role": "particle",
      "gloss": "indeed"
     },
     {
      "text": "ا",
      "role": "attachedPronoun",
      "gloss": "we"
     },
     {
      "text": "ٓ",
      "role": "plain",
      "gloss": "length mark"
     }
    ],
    "note": "The particle and the attached pronoun are written together as one word: إِنَّ + نا (we)."
   },
   {
    "word": "ٱللَّهَ",
    "blocks": [
     {
      "text": "ٱللَّه",
      "role": "plain",
      "gloss": "Allah"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "fathah mark"
     }
    ],
    "note": "That final fathah (ـَ) is the “stamp” showing a governing particle just came before (like إِنَّ or أَنَّ)."
   },
   {
    "word": "لَعَلَّكُمْ",
    "blocks": [
     {
      "text": "لَعَلَّ",
      "role": "particle",
      "gloss": "perhaps"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun",
      "gloss": "you all"
     }
    ],
    "note": "Many of these particles commonly attach to pronouns; the boundary is right after لَعَلَّ."
   },
   {
    "word": "أَنَّ",
    "blocks": [
     {
      "text": "أَنَّ",
      "role": "particle",
      "gloss": "that"
     }
    ],
    "note": "أَنَّ often introduces the content of knowing/saying, and it stamps the next noun with fathah."
   }
  ],
  "examples": [
   {
    "arabic": "إِنَّ ٱللَّهَ عَلَىٰ كُلِّ شَىْءٍۢ",
    "ref": "2:20",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "إِنَّ ",
      "role": "particle"
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
      "text": "عَلَىٰ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كُلِّ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "شَىْءٍۢ",
      "role": "plain"
     }
    ],
    "literal": "Indeed Allah — over every thing",
    "smooth": "Indeed Allah is capable over everything (context continues).",
    "whatChanged": "This shows the main fingerprint: ٱللَّهَ has fathah because إِنَّ is governing the clause."
   },
   {
    "arabic": "ٱعْلَمُوٓا۟ أَنَّ ٱللَّهَ شَدِيدُ",
    "ref": "5:98",
    "surah": "Sūrat Al-Maaida",
    "segments": [
     {
      "text": "ٱعْلَمُوٓا۟",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَنَّ ",
      "role": "particle"
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
      "text": "شَدِيدُ",
      "role": "plain"
     }
    ],
    "literal": "Know — that Allah (is) severe",
    "smooth": "Know that Allah is severe in punishment (context continues).",
    "whatChanged": "Here the particle is أَنَّ (“that”), marking an embedded content clause; it still stamps ٱللَّهَ with fathah."
   },
   {
    "arabic": "قُلْ إِنَّ ٱللَّهَ يُضِلُّ",
    "ref": "13:27",
    "surah": "Sūrat Ar-Ra'd",
    "segments": [
     {
      "text": "قُلْ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِنَّ ",
      "role": "particle"
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
      "text": "يُضِلُّ",
      "role": "plain"
     }
    ],
    "literal": "Say: indeed Allah — misguides",
    "smooth": "Say: indeed Allah lets go astray whom He wills (context continues).",
    "whatChanged": "This shows إِنَّ at the start of a quoted statement; the emphasis “indeed” frames what follows."
   },
   {
    "arabic": "إِنَّهُمْ هُمُ ٱلْمُفْسِدُونَ",
    "ref": "2:12",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "إِنَّ",
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
      "text": "هُمُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْمُفْسِدُونَ",
      "role": "plain"
     }
    ],
    "literal": "Indeed they — they (are) the corrupters",
    "smooth": "Indeed, they are the corrupters (context continues).",
    "whatChanged": "This shows the particle attaching to a pronoun (إِنَّ + هُمْ), so the “stamped noun” may be a pronoun, not a visible noun like ٱللَّهَ."
   },
   {
    "arabic": "وَلَٰكِن لَّا يَشْعُرُونَ",
    "ref": "2:12",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "plain"
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
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "يَشْعُرُونَ",
      "role": "plain"
     }
    ],
    "literal": "But — not — they perceive",
    "smooth": "But they do not perceive.",
    "whatChanged": "This adds the contrast particle لَٰكِن; it may appear without the doubled-nun form (لَٰكِنَّ) and may not be followed immediately by a stamped noun in the snippet."
   },
   {
    "arabic": "وَلَعَلَّكُمْ تَشْكُرُونَ",
    "ref": "30:46",
    "surah": "Sūrat Ar-Room",
    "segments": [
     {
      "text": "وَ",
      "role": "plain"
     },
     {
      "text": "لَعَلَّ",
      "role": "particle"
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
      "text": "تَشْكُرُونَ",
      "role": "plain"
     }
    ],
    "literal": "And perhaps you all — you give thanks",
    "smooth": "So that perhaps you may be grateful.",
    "whatChanged": "This shows لَعَلَّ (“perhaps/so that”) commonly followed by an attached pronoun; recognizing it prevents you from reading it as a normal لِـ preposition."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse إِنَّ (indeed) with إِنْ (if) just because they start the same.",
    "example": "إِنَّ ٱللَّهَ / إِن كُنتُمْ",
    "note": "إِنَّ has shaddah on نّ and stamps what follows (often a fathah on a noun). إِنْ is a different particle meaning “if,” like in: إِن كُنتُمْ صَٰدِقِينَ (45:25)."
   },
   {
    "claim": "Don’t treat the stamped word as “wrongly vowelled”; the fathah is doing a job.",
    "example": "إِنَّ ٱللَّهَ",
    "note": "You may expect ٱللَّهُ in a simple subject position, but after إِنَّ/أَنَّ it becomes ٱللَّهَ. That shift is your sign you are inside an “indeed/that …” clause."
   },
   {
    "claim": "Don’t assume every لَٰكِن must be followed by a visible fathah-stamped noun.",
    "example": "وَلَٰكِن لَّا يَشْعُرُونَ",
    "note": "In real Qur’anic flow, لَٰكِن can come before a full verbal sentence (like “they do not perceive”). The key is the meaning pivot: contrast, correction, “but …”."
   }
  ],
  "checklist": [
   "Scan for the shapes: إِنَّ، أَنَّ، لَٰكِن/لَٰكِنَّ، لَعَلَّ, (and remember لَيْتَ, كَأَنَّ even if not in today’s verses).",
   "If you see one, look immediately at the next word: is it a noun/pronoun that looks “pulled down” with fathah (ـَ) instead of dammah (ـُ)?",
   "If the next word is a pronoun attached (e.g., إِنَّهُمْ, إِنَّآ, لَعَلَّكُمْ), treat that pronoun as the “stamped” item even if no separate noun appears.",
   "Mentally insert the meaning: إِنَّ = “indeed/truly”; أَنَّ = “that …”; لَٰكِن = “but”; لَعَلَّ = “perhaps/so that”.",
   "Then read the rest as one unit (a clause): don’t break it into separate sentences too early—these particles are glue.",
   "When you meet ٱللَّهَ specifically, check the word before it: a preceding إِنَّ/أَنَّ is often the reason for the fathah."
  ],
  "summary": [
   "Rule: إِنَّ and its sisters govern what follows and stamp the next noun/pronoun with the “fathah clue.”",
   "Look: a surprising fathah where you expected dammah—especially on a clear noun like ٱللَّهَ—often signals one of these particles just before.",
   "Now you can: recognize emphasis (إِنَّ), embedded “that …” clauses (أَنَّ), contrast (لَٰكِن), and “perhaps/so that” (لَعَلَّ) while reading Qur’an."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify the particle (إِنَّ/أَنَّ/لَٰكِن/لَعَلَّ) and point to the “fathah fingerprint” on the word it governs."
 },
 {
  "id": "q-relative-clauses",
  "n": 19,
  "title": "\"Those who…\" — descriptions that run for a whole line",
  "stage": "Verbs for readers",
  "level": "B1",
  "structure": "الَّذِي who/which (m sg) · الَّتِي (f sg) · الَّذِينَ (m pl) · اللَّاتِي (f pl). Everything after it, sometimes to the end of the āyah, describes the noun before it: الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ — one long label for one group of people.",
  "whyItMatters": "These are why some verses feel endless. Read the whole clause as a single block naming a group and the verse shortens dramatically.",
  "canDo": "After this lesson you can spot الَّذِي/الَّتِي/الَّذِينَ/اللَّاتِي and read everything after it (often to the end of the āyah) as one descriptive block labeling the noun before it.",
  "rule": "الَّذِي / الَّتِي / الَّذِينَ / اللَّاتِي means “the one(s) who/which…”. It attaches a whole clause after it, and that clause functions like one long description of a person/thing already mentioned. When you meet it, don’t translate word-by-word as separate sentences—bundle the entire following clause as one label until you hit a clear stop or a new main statement.",
  "why": [
   "Prevents losing the main sentence: you stop treating the rest of the āyah as unrelated new statements when it’s really one description of “those who…”.",
   "Prevents “endless verse” fatigue: you learn to read a long run of verbs as one single description block rather than many separate ideas.",
   "Prevents wrong referents: you keep remembering that the actions after الَّذِينَ describe a specific group, not everyone in general.",
   "Prevents misreading إِنَّ: in verses like إِنَّ ٱلَّذِينَ… you keep the whole الَّذِينَ-clause together as the subject of the statement."
  ],
  "pattern": {
   "caption": "Relative clauses as long descriptions (read as ONE block)",
   "columns": [
    "Form",
    "Basic meaning",
    "Used for"
   ],
   "rows": [
    [
     "ٱلَّذِى",
     "the one who/which",
     "masculine singular (often “who”)"
    ],
    [
     "ٱلَّتِى",
     "the one which",
     "feminine singular (often “which”)"
    ],
    [
     "ٱلَّذِينَ",
     "those who",
     "masculine plural (often mixed groups)"
    ],
    [
     "ٱللَّاتِى",
     "those who/which",
     "feminine plural"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلَّذِينَ",
    "blocks": [
     {
      "text": "ٱلَّذِينَ",
      "role": "plain",
      "gloss": "those who"
     }
    ],
    "note": "Treat the whole written form as one “relative word” that opens a description clause."
   },
   {
    "word": "ٱلَّذِى",
    "blocks": [
     {
      "text": "ٱلَّذِى",
      "role": "plain",
      "gloss": "the one who"
     }
    ],
    "note": "Often followed by a verb; everything after it is describing that “one”."
   },
   {
    "word": "ٱلَّتِى",
    "blocks": [
     {
      "text": "ٱلَّتِى",
      "role": "plain",
      "gloss": "the one which"
     }
    ],
    "note": "Common when the described noun is feminine, like ٱلنَّارَ (fire)."
   },
   {
    "word": "ٱللَّاتِى",
    "blocks": [
     {
      "text": "ٱللَّاتِى",
      "role": "plain",
      "gloss": "those (f.)"
     }
    ],
    "note": "Feminine plural relative word; it introduces a clause describing feminine plural nouns."
   }
  ],
  "examples": [
   {
    "arabic": "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
    "ref": "1:7",
    "surah": "Sūrat Al-Faatiha",
    "segments": [
     {
      "text": "صِرَٰطَ ",
      "role": "plain"
     },
     {
      "text": "ٱلَّذِينَ ",
      "role": "plain"
     },
     {
      "text": "أَنْعَمْتَ ",
      "role": "plain"
     },
     {
      "text": "عَلَيْهِمْ",
      "role": "plain"
     }
    ],
    "literal": "path (of) those-who You-bestowed-favor upon-them",
    "smooth": "the path of those whom You have blessed",
    "whatChanged": "Shows a relative clause inside an “X of Y” structure: the whole “ٱلَّذِينَ …” block names which people the path belongs to."
   },
   {
    "arabic": "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟",
    "ref": "4:71",
    "surah": "Sūrat An-Nisaa",
    "segments": [
     {
      "text": "يَٰٓأَيُّهَا ",
      "role": "plain"
     },
     {
      "text": "ٱلَّذِينَ ",
      "role": "plain"
     },
     {
      "text": "ءَامَنُوا۟",
      "role": "plain"
     }
    ],
    "literal": "O (you) those-who believed",
    "smooth": "O you who believe",
    "whatChanged": "Shows how a direct address can be aimed at a group defined by a “those who…” label."
   },
   {
    "arabic": "إِنَّ ٱلَّذِينَ لَا يُؤْمِنُونَ",
    "ref": "16:104",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "إِنَّ ",
      "role": "particle"
     },
     {
      "text": "ٱلَّذِينَ ",
      "role": "plain"
     },
     {
      "text": "لَا ",
      "role": "particle"
     },
     {
      "text": "يُؤْمِنُونَ",
      "role": "plain"
     }
    ],
    "literal": "indeed those-who not they-believe",
    "smooth": "Indeed, those who do not believe…",
    "whatChanged": "Shows the common pattern “إِنَّ + ٱلَّذِينَ …”: the entire following clause is the subject of an emphatic statement."
   },
   {
    "arabic": "ٱلنَّارَ ٱلَّتِى وَقُودُهَا",
    "ref": "2:24",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "ٱلنَّارَ ",
      "role": "plain"
     },
     {
      "text": "ٱلَّتِى ",
      "role": "plain"
     },
     {
      "text": "وَقُودُهَا",
      "role": "plain"
     }
    ],
    "literal": "the-Fire which fuel-its",
    "smooth": "the Fire whose fuel is…",
    "whatChanged": "Shows a feminine singular relative word describing a thing (ٱلنَّارَ), not a group of people."
   },
   {
    "arabic": "وَهُوَ ٱلَّذِى خَلَقَ",
    "ref": "21:33",
    "surah": "Sūrat Al-Anbiyaa",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "هُوَ ",
      "role": "plain"
     },
     {
      "text": "ٱلَّذِى ",
      "role": "plain"
     },
     {
      "text": "خَلَقَ",
      "role": "plain"
     }
    ],
    "literal": "and He (is) the-one-who created",
    "smooth": "And He is the One who created…",
    "whatChanged": "Shows ٱلَّذِى after a pronoun (هُوَ): it introduces a describing clause explaining who “He” is."
   },
   {
    "arabic": "إِلَّا بِٱلَّتِى هِىَ أَحْسَنُ",
    "ref": "29:46",
    "surah": "Sūrat Al-Ankaboot",
    "segments": [
     {
      "text": "إِلَّا ",
      "role": "particle"
     },
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "ٱلَّتِى ",
      "role": "plain"
     },
     {
      "text": "هِىَ ",
      "role": "plain"
     },
     {
      "text": "أَحْسَنُ",
      "role": "plain"
     }
    ],
    "literal": "except with-which it (is) best",
    "smooth": "except in the way that is best",
    "whatChanged": "Shows a relative clause after a preposition (بِـ): the whole “ٱلَّتِى هِىَ أَحْسَنُ” block names the required manner."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse ٱلَّذِينَ (those who…) with simply “the + noun”.",
    "example": "ٱلْكَٰفِرُونَ vs ٱلَّذِينَ كَفَرُوا۟",
    "note": "ٱلْكَٰفِرُونَ is a single noun meaning “the disbelievers.” ٱلَّذِينَ كَفَرُوا۟ is a label built from a relative word + a clause: “those who disbelieved.” Both can point to similar people, but they behave differently in the sentence."
   },
   {
    "claim": "Don’t stop too early: the description often continues through multiple actions.",
    "example": "ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟",
    "note": "When you see وَ after the first verb, it can be adding another part of the SAME description block (“those who believed AND did…”). Keep bundling until a new main clause clearly starts."
   },
   {
    "claim": "Don’t treat ٱلَّذِى as a question word (“which?”) here.",
    "example": "ٱلَّذِى خَلَقَ",
    "note": "In Qur’anic reading, ٱلَّذِى usually functions as “the one who…,” introducing identification or description, not a question. The sentence is telling you who/which one, not asking."
   }
  ],
  "checklist": [
   "Circle the relative word when you see it: ٱلَّذِى / ٱلَّتِى / ٱلَّذِينَ / ٱللَّاتِى.",
   "Look LEFT: what noun or pronoun is being labeled? (e.g., صِرَٰطَ …, هُوَ …, ٱلنَّارَ …).",
   "Now read RIGHT and collect the whole clause as one unit (verbs, prepositional phrases, and any وَ additions).",
   "Translate the whole collected unit as a single description: “the one who… / those who… / the (thing) which…”.",
   "Only after bundling it, return to the main sentence and ask: what is being said about that labeled noun/group?",
   "If you meet إِنَّ before it, keep “إِنَّ + [relative-clause]” together as the subject of the statement."
  ],
  "summary": [
   "Rule: ٱلَّذِى/ٱلَّتِى/ٱلَّذِينَ/ٱللَّاتِى opens a relative clause meaning “the one(s) who/which…”.",
   "What it looks like: a relative word followed by a run of verbs and phrases that may stretch to the end of the āyah.",
   "What you can now do: compress a long stretch into one label (“those who…”) and then find the main point of the verse more easily."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify the relative word and bracket the full “those who/which…” description block."
 },
 {
  "id": "q-demonstratives",
  "n": 20,
  "title": "This and that",
  "stage": "Verbs for readers",
  "level": "B1",
  "structure": "هَٰذَا this (m) · هَٰذِهِ this (f) · ذَٰلِكَ that (m) · تِلْكَ that (f) · هَٰؤُلَاءِ these · أُولَٰئِكَ those. With a definite noun after it, it means \"this X\": ذَٰلِكَ الْكِتَابُ that Book. Against an indefinite or a whole clause, it is a sentence: أُولَٰئِكَ هُمُ الْمُفْلِحُونَ those are the successful.",
  "whyItMatters": "أُولَٰئِكَ opens the summing-up of many passages. Recognising it tells you the verse is about to deliver its verdict.",
  "canDo": "After this lesson you can recognise Qur’anic “this/that/these/those” words and tell when they introduce a noun (“this Book”) versus when they deliver a verdict about a whole clause (“those are the successful”).",
  "rule": "هَٰذَا/هَٰذِهِ (this), ذَٰلِكَ/تِلْكَ (that), هَٰؤُلَاءِ (these), أُولَٰئِكَ (those) are demonstratives. When one is followed by a definite noun (often with ٱلـ), read it as “this/that + noun”: ذَٰلِكَ ٱلْكِتَٰبُ = “that Book.” When it stands against an entire meaning (often followed by a pronoun like هُم), it functions as a complete sentence: “Those are…”.",
  "why": [
   "Prevents missing the “verdict/summing-up” signal when you see أُولَٰئِكَ at the start of a conclusion.",
   "Prevents misreading a demonstrative + definite noun as two separate ideas instead of one unit (“this X”).",
   "Prevents treating هَٰذَا/ذَٰلِكَ as “there/then” (they are pointing words, not time words).",
   "Prevents getting lost in long passages: spotting the demonstrative helps you locate the main claim being pointed to."
  ],
  "pattern": {
   "caption": "Demonstratives in the Qur’an: what they point to",
   "columns": [
    "Arabic",
    "Basic meaning",
    "Most common Qur’anic reading"
   ],
   "rows": [
    [
     "هَٰذَا",
     "this (m)",
     "this + (often a following noun/idea)"
    ],
    [
     "هَٰذِهِ",
     "this (f)",
     "this + (often a following noun/idea)"
    ],
    [
     "ذَٰلِكَ",
     "that (m)",
     "that + definite noun, or “that is how…” (see كَذَٰلِكَ)"
    ],
    [
     "تِلْكَ",
     "that (f)",
     "that + (often a following noun/idea)"
    ],
    [
     "هَٰؤُلَاءِ",
     "these",
     "these + (people/things present in the discourse)"
    ],
    [
     "أُولَٰئِكَ",
     "those",
     "those… (often a conclusion about a described group)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "هَٰذَا",
    "blocks": [
     {
      "text": "هَٰذَا",
      "role": "plain",
      "gloss": "this (m)"
     }
    ],
    "note": "Treat it as one fixed pointing word; you usually do not need to “derive” it from a root."
   },
   {
    "word": "ذَٰلِكَ",
    "blocks": [
     {
      "text": "ذَٰلِكَ",
      "role": "plain",
      "gloss": "that (m)"
     }
    ],
    "note": "Also a fixed pointing word. In the mushaf it often appears right before a definite noun."
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
      "gloss": "case ending"
     }
    ],
    "note": "Boundary: isolate ٱلـ (definite article) from the core noun, and the final vowel as the grammatical ending."
   },
   {
    "word": "هُمُ",
    "blocks": [
     {
      "text": "هُم",
      "role": "plain",
      "gloss": "they"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "ending"
     }
    ],
    "note": "Standalone pronoun. The final vowel can shift with recitation/grammar; recognise the pronoun itself (هُم)."
   },
   {
    "word": "أُولَٰئِكَ",
    "blocks": [
     {
      "text": "أُولَٰئِكَ",
      "role": "plain",
      "gloss": "those"
     }
    ],
    "note": "Often appears at a transition where the Qur’an points back to a described group and then states the outcome."
   }
  ],
  "examples": [
   {
    "arabic": "ذَٰلِكَ ٱلْكِتَٰبُ",
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
     }
    ],
    "literal": "that | the- | book | (ending)",
    "smooth": "That is the Book / That Book.",
    "whatChanged": "This shows the key “demonstrative + definite noun” pattern: read it as one unit (“that Book”), not two separate statements."
   },
   {
    "arabic": "هَٰذَا مِنْ عِندِ",
    "ref": "2:79",
    "surah": "Sūrat Al-Baqara",
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
      "text": "مِنْ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عِند",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     }
    ],
    "literal": "this | from | (at/with) | (ending)",
    "smooth": "“This is from (the presence of) …”",
    "whatChanged": "Here the demonstrative points to a claim being quoted (“this”), and what follows is a prepositional phrase—not a simple “this + noun” label."
   },
   {
    "arabic": "هَٰذَا مَا كَنَزْتُمْ",
    "ref": "9:35",
    "surah": "Sūrat At-Tawba",
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
      "text": "مَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَنَز",
      "role": "root"
     },
     {
      "text": "ْتُمْ",
      "role": "verbSuffix"
     }
    ],
    "literal": "this | (is) what | you hoarded",
    "smooth": "This is what you hoarded.",
    "whatChanged": "This shows “demonstrative + whole clause/idea” (via مَا + verb): هَٰذَا is not naming a noun; it points to the consequence now being shown."
   },
   {
    "arabic": "بِهَٰذَا ٱلْحَدِيثِ",
    "ref": "18:6",
    "surah": "Sūrat Al-Kahf",
    "segments": [
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "هَٰذَا",
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
      "text": "حَدِيث",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     }
    ],
    "literal": "with/by | this | the- | discourse | (ending)",
    "smooth": "…because of / about this discourse (message).",
    "whatChanged": "Here the demonstrative is attached to a preposition (بِـ): read بِهَٰذَا as a single chunk “with/by this,” then expect a following definite noun."
   },
   {
    "arabic": "هَٰذَا بُهْتَٰنٌ عَظِيمٌۭ",
    "ref": "24:16",
    "surah": "Sūrat An-Noor",
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
      "text": "بُهْتَٰن",
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
      "text": "عَظِيم",
      "role": "root"
     },
     {
      "text": "ٌۭ",
      "role": "nounEnding"
     }
    ],
    "literal": "this | (is) slander | (ending) | great | (ending)",
    "smooth": "This is a tremendous slander.",
    "whatChanged": "This shows the missing “is” sentence type: demonstrative as subject (هَٰذَا) + an indefinite predicate noun (بُهْتَٰنٌ) = “This is …”."
   },
   {
    "arabic": "أُو۟لَٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ",
    "ref": "2:5",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "أُو۟لَٰٓئِكَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "هُم",
      "role": "plain"
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
      "text": "ٱلْ",
      "role": "particle"
     },
     {
      "text": "مُفْلِحُون",
      "role": "root"
     },
     {
      "text": "َ",
      "role": "nounEnding"
     }
    ],
    "literal": "those | they | (ending) | the- | successful | (ending)",
    "smooth": "Those—they are the successful.",
    "whatChanged": "This is the classic Qur’anic summing-up: أُولَٰئِكَ points back to a described group, then هُمُ reinforces the verdict (‘they, indeed’)."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse ذَٰلِكَ (that) with كَذَٰلِكَ (thus/like that).",
    "example": "كَذَٰلِكَ زُيِّنَ",
    "note": "In 6:122 the extra كَـ is a prefix meaning “like/as,” so the meaning shifts to “thus/like that.” If you read it as plain “that,” you miss the comparison signal."
   },
   {
    "claim": "Don’t assume a demonstrative must be followed by a noun.",
    "example": "هَٰذَا مَا كَنَزْتُمْ",
    "note": "In 9:35 هَٰذَا points to an entire meaning introduced by مَا + verb (“what you hoarded”). Treating it as “this + (noun)” makes the sentence feel incomplete."
   },
   {
    "claim": "Don’t miss a demonstrative when it is glued to a preposition.",
    "example": "بِهَٰذَا",
    "note": "In 18:6 the بِـ is not a separate word. Spotting بِهَٰذَا quickly tells you: “with/by this …” and you should look for what “this” is (often a definite noun right after)."
   }
  ],
  "checklist": [
   "Scan for the pointing-words: هَٰذَا / هَٰذِهِ / ذَٰلِكَ / تِلْكَ / هَٰؤُلَاءِ / أُولَٰئِكَ.",
   "If the next word starts with ٱلْ, read the pair as “this/that + the X” (one noun phrase).",
   "If you see a pronoun after it (especially هُمُ), expect a conclusion: “those are …”.",
   "If you see مَا after it (هَٰذَا مَا …), expect “this is what …” (demonstrative pointing to a clause).",
   "Watch for attached prepositions: بِهَٰذَا, لِذَٰلِكَ, بِذَٰلِكَ—read them as one chunk first, then continue.",
   "If you see كَذَٰلِكَ, translate it as “thus/like that,” not “that,” and look for the action being described after it."
  ],
  "summary": [
   "Rule: demonstratives point—either to a following definite noun (“this/that + the X”) or to a whole judgement (“those are…”).",
   "What it looks like: ذَٰلِكَ ٱلْكِتَٰبُ (demonstrative + ٱلـ noun) and أُو۟لَٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ (demonstrative + pronoun + verdict).",
   "You can now: spot when a passage is about to deliver its conclusion (especially with أُولَٰئِكَ) and read “this/that” phrases as coherent units while you recite-read."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether the demonstrative is labeling a definite noun (“this X”) or concluding a statement (“those are…”), including cases like بِهَٰذَا and كَذَٰلِكَ."
 },
 {
  "id": "q-imperatives",
  "n": 21,
  "title": "Commands and prohibitions",
  "stage": "Verbs for readers",
  "level": "B1",
  "structure": "The command drops the present-tense prefix and often adds a helping alif: يَقُولُ he says → قُلْ say! · اعْبُدُوا worship! · اهْدِنَا guide us! Prohibition is لَا + present: لَا تَقْرَبُوا do not approach · لَا تَحْزَنْ do not grieve.",
  "whyItMatters": "The shift from describing to commanding is one of the largest changes of register in the Qur'an, and it hangs on a couple of letters.",
  "canDo": "After this lesson you can spot when the Qur’an shifts into direct commands (do!) and prohibitions (don’t!) by noticing the dropped present-tense prefix and the pattern لَا + present.",
  "rule": "A command (imperative) is built from the present tense by dropping the front prefix (ي/ت/أ/ن) and often adding a helping alif at the start: تَعْبُدُ → ٱعْبُدْ, تَقُولُ → قُلْ. For a “don’t” command (prohibition), the Qur’an commonly uses لَا + the present tense: لَا تَكُونَنَّ = do not be. When you see this shift, the text is no longer describing; it is addressing someone directly.",
  "why": [
   "Prevents reading commands as descriptions (e.g., taking قُلْ as “he says” instead of “say!”), which flips who is being addressed.",
   "Prevents missing who the مخاطَب is: a sudden ٱفْعَلُوا۟/ٱعْبُدُوا۟ means “you (all) do…”, not “they do…”.",
   "Prevents misreading prohibitions as simple negation: لَا تَكُونَنَّ is not “you are not…”, it is “do not be…”.",
   "Helps you follow register changes: narrative/past tense → direct instruction, often within the same line."
  ],
  "pattern": {
   "caption": "Present → Command (drop the prefix) | Prohibition (لَا + present)",
   "columns": [
    "Meaning",
    "Present/future form (has a prefix)",
    "Command / Prohibition form"
   ],
   "rows": [
    [
     "say!",
     "يَقُولُ (he says)",
     "قُلْ (say!)"
    ],
    [
     "worship! (you all)",
     "تَعْبُدُونَ (you worship)",
     "ٱعْبُدُوا۟ (worship!)"
    ],
    [
     "bow! (you all)",
     "تَرْكَعُونَ (you bow)",
     "ٱرْكَعُوا۟ (bow!)"
    ],
    [
     "prohibition: do not be",
     "تَكُونَنَّ (you be)",
     "لَا تَكُونَنَّ (do not be)"
    ],
    [
     "do! (you all)",
     "تَفْعَلُونَ (you do)",
     "ٱفْعَلُوا۟ (do!)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱعْبُدُوا۟",
    "blocks": [
     {
      "text": "ٱ",
      "role": "plain",
      "gloss": "helping alif"
     },
     {
      "text": "عْبُد",
      "role": "root",
      "gloss": "worship (base)"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "you all"
     }
    ],
    "note": "The present prefix (تـ) is gone; the ending وا۟ shows it is addressed to a group (you all)."
   },
   {
    "word": "قُلْ",
    "blocks": [
     {
      "text": "قُلْ",
      "role": "root",
      "gloss": "say!"
     }
    ],
    "note": "This is a short command form; there is no front prefix like يـ/تـ."
   },
   {
    "word": "ٱرْكَعُوا۟",
    "blocks": [
     {
      "text": "ٱ",
      "role": "plain",
      "gloss": "helping alif"
     },
     {
      "text": "رْكَع",
      "role": "root",
      "gloss": "bow (base)"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "you all"
     }
    ],
    "note": "The initial ٱ often appears to make pronunciation possible when the command begins with a consonant cluster."
   },
   {
    "word": "لَا",
    "blocks": [
     {
      "text": "لَا",
      "role": "particle",
      "gloss": "do not"
     }
    ],
    "note": "In prohibitions, لَا comes immediately before a present-tense verb."
   },
   {
    "word": "تَكُونَنَّ",
    "blocks": [
     {
      "text": "تَ",
      "role": "verbPrefix",
      "gloss": "you (sg.)"
     },
     {
      "text": "كُون",
      "role": "root",
      "gloss": "be"
     },
     {
      "text": "نَّ",
      "role": "verbSuffix",
      "gloss": "emphasis"
     }
    ],
    "note": "This is still a present-form verb because it keeps its prefix تَـ; with لَا before it, it becomes a prohibition."
   }
  ],
  "examples": [
   {
    "arabic": "قُلْ أَغَيْرَ ٱللَّهِ",
    "ref": "6:14",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "قُلْ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَغَيْرَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهِ",
      "role": "plain"
     }
    ],
    "literal": "Say: other-than Allah?",
    "smooth": "Say, “(Should I take) other than Allah…?”",
    "whatChanged": "This shows the command form can be just one compact word (قُلْ), marking a direct instruction."
   },
   {
    "arabic": "وَقُلِ ٱلْحَمْدُ لِلَّهِ",
    "ref": "17:111",
    "surah": "Sūrat Al-Israa",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "قُلِ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْحَمْدُ",
      "role": "plain"
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
      "text": "لَّهِ",
      "role": "plain"
     }
    ],
    "literal": "And say: the praise (is) for Allah.",
    "smooth": "And say, “All praise belongs to Allah.”",
    "whatChanged": "This adds a common Qur’anic pattern: a command introduced by وَ (“and”), embedded inside a longer statement."
   },
   {
    "arabic": "ٱعْبُدُوا۟ رَبَّكُمُ",
    "ref": "2:21",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "ٱعْبُدُوا۟",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَبَّ",
      "role": "plain"
     },
     {
      "text": "كُمُ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "Worship your Lord.",
    "smooth": "Worship your Lord.",
    "whatChanged": "This shows the plural command ending (…وا۟) and how the instruction targets “you all,” reinforced by كُمُ (your)."
   },
   {
    "arabic": "ٱرْكَعُوا۟ وَٱسْجُدُوا۟",
    "ref": "22:77",
    "surah": "Sūrat Al-Hajj",
    "segments": [
     {
      "text": "ٱرْكَعُوا۟",
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
      "text": "ٱسْجُدُوا۟",
      "role": "plain"
     }
    ],
    "literal": "Bow, and prostrate.",
    "smooth": "Bow and prostrate.",
    "whatChanged": "This shows chained commands: multiple imperatives linked by وَ, making a rapid sequence of instructions."
   },
   {
    "arabic": "وَلَا تَكُونَنَّ مِنَ ٱلْمُشْرِكِينَ",
    "ref": "6:14",
    "surah": "Sūrat Al-An'aam",
    "segments": [
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
      "text": "كُون",
      "role": "root"
     },
     {
      "text": "نَّ",
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
      "text": "ٱلْ",
      "role": "plain"
     },
     {
      "text": "مُشْرِكِينَ",
      "role": "plain"
     }
    ],
    "literal": "And do not you-be (emphatic) from the polytheists.",
    "smooth": "And do not be among the polytheists.",
    "whatChanged": "This shows the prohibition template clearly: لَا + a present-form verb (still with its prefix تَـ)."
   },
   {
    "arabic": "قُلْ هَاتُوا۟ بُرْهَٰنَكُمْ",
    "ref": "27:64",
    "surah": "Sūrat An-Naml",
    "segments": [
     {
      "text": "قُلْ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "هَاتُوا۟",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "بُرْهَٰنَ",
      "role": "plain"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "Say: bring your proof.",
    "smooth": "Say, “Bring your proof.”",
    "whatChanged": "This shows two commands back-to-back (قُلْ … هَاتُوا۟), which is common in argument passages."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a command with a present-tense verb that merely starts with أ/ي/ت/ن.",
    "example": "قُلْ vs يُطْعِمُ",
    "note": "In 6:14 you can see both registers close together: قُلْ is a command (no prefix), while وَهُوَ يُطْعِمُ describes (has the prefix يُـ = “he…”). The missing prefix is the clue."
   },
   {
    "claim": "Don’t confuse prohibition لَا + present with other kinds of “no” you learned earlier.",
    "example": "لَا تَكُونَنَّ",
    "note": "Here لَا is followed immediately by a present-form verb with its prefix (تَـ). That combination signals “do not …”, not a simple “there is no…” or “not …” statement."
   },
   {
    "claim": "Don’t miss that plural commands usually end with وا۟ and target a group.",
    "example": "ٱعْبُدُوا۟",
    "note": "In 2:21 and 22:77 the ending وا۟ is a strong visual cue that the command is addressed to “you all.” This prevents reading it as a general noun or a past action."
   }
  ],
  "checklist": [
   "Scan for sudden short verbs without the present prefixes يـ / تـ / أـ / نـ; these are often commands (e.g., قُلْ).",
   "When you see an initial ٱ at the start of a verb (ٱعْـ / ٱرْـ / ٱسْـ), suspect an imperative and look for the missing prefix.",
   "Check the end: وا۟ usually means the command is to a group (“you all”).",
   "For “don’t…”, look for لَا immediately followed by a present-form verb that still has its prefix (لَا تَ…).",
   "When commands appear in sequences, watch for وَ linking them: ٱرْكَعُوا۟ وَٱسْجُدُوا۟.",
   "If the surrounding text contains description verbs with prefixes (يُ…/تُ…), treat a prefixless form as a deliberate switch into direct address."
  ],
  "summary": [
   "The rule: Imperatives drop the present-tense prefix and often use a helping ٱ; prohibitions are لَا + present.",
   "What it looks like: قُلْ, ٱعْبُدُوا۟, ٱرْكَعُوا۟—versus لَا تَكُونَنَّ.",
   "What you can now do: Read many Qur’anic instruction passages as direct commands and “don’t” prohibitions, instead of mistaking them for narration."
  ],
  "quizBridge": "The quiz will show short snippets and ask you to identify whether the verb is a command, a prohibition (لَا + present), or an ordinary present-tense description."
 },
 {
  "id": "q-verb-chart",
  "n": 22,
  "title": "The whole verb, on one page",
  "stage": "Verbs for readers",
  "level": "B1",
  "structure": "Everything from lessons 11-21 as one reader's map: past marked on the back, present marked on the front, the four prefix letters أ ن ي ت, the plural endings ـُوا (past) and ـُونَ (present), where the object pronoun goes, and how the command is formed. Read the front first, then the back, then the middle.",
  "whyItMatters": "This is the reference page to come back to. Recognition of tense and person on sight is the whole of it — no producing, no conjugating.",
  "canDo": "After this lesson you can spot tense (past/present/command), person (he/they/you/we), and attached object pronouns in a Qur’anic verb at a glance by reading the front, then the back, then the middle.",
  "rule": "Treat the verb like a map with three zones. The front (prefix) tells you “who/when” in the present: one of أ ن ي ت. The back (suffix) often tells you “who” in the past (like ـوا) or “they” in the present (like ـونَ), and any attached object pronoun sits at the very end. Commands are the same present verb family, but used as a direct instruction (often without the normal present prefix).",
  "why": [
   "Prevents misreading present verbs as past just because you recognize the root (e.g., يَفْعَلُونَ vs فَعَلُوا۟).",
   "Prevents missing “they” and “you (all)” when it is only shown by an ending like ـوا / ـونَ.",
   "Prevents dropping the object (“it/him/them/us”) when it is glued at the end (e.g., يُنَبِّئُهُم).",
   "Prevents treating a command like a noun or like “he does” (e.g., ٱفْعَلُوا۟, قُوٓا۟)."
  ],
  "pattern": {
   "caption": "The whole verb on one page: read FRONT → BACK → MIDDLE",
   "columns": [
    "Front (present marker)",
    "Middle (root & pattern)",
    "Back (who/number + object pronoun)"
   ],
   "rows": [
    [
     "يـ / تـ / أ / نـ",
     "… ف ع ل …",
     "ـونَ (they do)"
    ],
    [
     "يـ / تـ / أ / نـ",
     "… ف ع ل …",
     "ـهُم (them) / ـهُ (him/it)"
    ],
    [
     "(none shown here)",
     "… ف ع ل …",
     "ـوا (they did)"
    ],
    [
     "(command form)",
     "… ف ع ل …",
     "ـوا (you all! do)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "يَفْعَلُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he/they (present)"
     },
     {
      "text": "فْعَل",
      "role": "root",
      "gloss": "do (root)"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "they (plural)"
     }
    ],
    "note": "Front يَ tells you it is present-family; back ـونَ tells you “they”."
   },
   {
    "word": "فَعَلُوا۟",
    "blocks": [
     {
      "text": "فَعَل",
      "role": "root",
      "gloss": "did (root)"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they (past)"
     }
    ],
    "note": "Past-family verbs often show person/number mainly on the back."
   },
   {
    "word": "تَفْعَلُوا۟",
    "blocks": [
     {
      "text": "تَ",
      "role": "verbPrefix",
      "gloss": "you (present)"
     },
     {
      "text": "فْعَل",
      "role": "root",
      "gloss": "do (root)"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "you all"
     }
    ],
    "note": "In this course, read it as: present marker at the front + plural marker at the back."
   },
   {
    "word": "يُنَبِّئُهُم",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "he (present)"
     },
     {
      "text": "نَبِّئ",
      "role": "root",
      "gloss": "inform (root)"
     },
     {
      "text": "هُم",
      "role": "attachedPronoun",
      "gloss": "them (object)"
     }
    ],
    "note": "The object pronoun comes at the very end, after the verb is already complete."
   },
   {
    "word": "ٱفْعَلُوا۟",
    "blocks": [
     {
      "text": "ٱ",
      "role": "plain",
      "gloss": "command start"
     },
     {
      "text": "فْعَل",
      "role": "root",
      "gloss": "do (root)"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "you all!"
     }
    ],
    "note": "Command: you recognize it by function in context and by the missing present prefix (no تـ / يـ etc.)."
   }
  ],
  "examples": [
   {
    "arabic": "ثُمَّ يُنَبِّئُهُم بِمَا كَانُوا۟",
    "ref": "6:159",
    "surah": "Sūrat Al-An'aam",
    "segments": [
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
      "text": "نَبِّئ",
      "role": "root"
     },
     {
      "text": "هُم",
      "role": "attachedPronoun"
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
      "text": "مَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَانُوا۟",
      "role": "plain"
     }
    ],
    "literal": "then he-informs-them with what they-were",
    "smooth": "Then He will inform them about what they used to do.",
    "whatChanged": "This shows the object pronoun position: هُم sits at the very end of the verb, after the “who/when” prefix."
   },
   {
    "arabic": "يَخَافُونَ رَبَّهُم مِّن",
    "ref": "16:50",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "خَاف",
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
      "text": "رَبّ",
      "role": "plain"
     },
     {
      "text": "هُم",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مِّن",
      "role": "preposition"
     }
    ],
    "literal": "they-fear their-Lord from",
    "smooth": "They fear their Lord from above them.",
    "whatChanged": "This shows the present plural signature clearly: front يَ + back ـونَ = “they (are) doing”."
   },
   {
    "arabic": "فَإِن لَّمْ تَفْعَلُوا۟",
    "ref": "2:24",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "إِن",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "لَّمْ",
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
      "text": "فْعَل",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     }
    ],
    "literal": "so-if not you-do (all)",
    "smooth": "So if you do not do it…",
    "whatChanged": "This ties person to the front letter: تـ points to “you”, while ـوا points to a plural ‘you all’ here."
   },
   {
    "arabic": "قَالُوا۟ ٱلْـَٰٔنَ جِئْتَ",
    "ref": "2:71",
    "surah": "Sūrat Al-Baqara",
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
      "text": "ٱلْـَٰٔنَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "جِئْتَ",
      "role": "plain"
     }
    ],
    "literal": "they-said now you-came",
    "smooth": "They said, “Now you have come…”",
    "whatChanged": "This is the past plural marker: ـوا on the back is a fast “they did” signal when there is no present-prefix at the front."
   },
   {
    "arabic": "فَٱفْعَلُوا۟ مَا تُؤْمَرُونَ",
    "ref": "2:68",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "ٱ",
      "role": "plain"
     },
     {
      "text": "فْعَل",
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
      "text": "مَا",
      "role": "plain"
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
      "text": "ؤْمَر",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "so do-you-all what you-are-commanded",
    "smooth": "So do what you are commanded.",
    "whatChanged": "This places command and present side-by-side: ٱفْعَلُوا۟ is an instruction, while تُؤْمَرُونَ is a present passive-style form with the usual prefix and ـونَ ending."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse ـوا (past ‘they did’) with ـونَ (present ‘they do’)",
    "example": "فَعَلُوا۟ / يَفْعَلُونَ",
    "note": "Your eye may latch onto the shared root ف ع ل and miss tense. Check the back: ـوا is a past marker; ـونَ is a present plural marker."
   },
   {
    "claim": "Don’t confuse an attached object pronoun on a verb with a possession pronoun on a noun",
    "example": "يُنَبِّئُهُم / رَبَّهُم",
    "note": "Both end with هُم, but the job differs. First ask: is this word clearly a verb (has a present prefix like يـ)? If yes, the ending is likely an object; if it’s a noun, the ending is ‘their’."
   },
   {
    "claim": "Don’t mistake a command for a past verb just because it has no present prefix",
    "example": "ٱفْعَلُوا۟ / فَعَلُوا۟",
    "note": "Both lack يـ/تـ at the front and both end in ـوا. Use context: commands often come with direct instruction flow (like فَ… followed by what to do) and commonly start with a helping ٱ at the front."
   }
  ],
  "checklist": [
   "Step 1: Look at the very first letter of the verb: is it one of أ ن ي ت? If yes, you are in the present/future family.",
   "Step 2: If it is present-family, look at the very last letters: do you see ـونَ? If yes, read “they (plural) do”.",
   "Step 3: If there is no أ/ن/ي/ت at the front, check the back for ـوا: a quick “they did” signal in the past family (especially in narrative).",
   "Step 4: After you’ve identified tense/person, check whether anything is glued AFTER the verb as an object pronoun (e.g., ـهُم). If present, include it in meaning: “him/it/them/us”.",
   "Step 5: For commands, look for an instruction context and a verb that begins without the present prefix (often with ٱ), then read the ending: ـوا frequently means “you all!”",
   "Step 6: Only after front/back do you spend attention on the middle (the root/pattern) to get the core meaning."
  ],
  "summary": [
   "The rule: read the verb as front → back → middle, and put any attached object pronoun at the very end.",
   "What it looks like: present has one of أ ن ي ت up front; past often shows person on the back (like ـوا); present plural often ends ـونَ; object pronouns (like هُم) attach last.",
   "What you can now do: recognize tense and person on sight and stop losing meaning when “they/you all/them” is only shown by a few letters."
  ],
  "quizBridge": "The quiz will show short verb snippets and ask you to identify (1) past/present/command, (2) who is doing it (he/they/you/we), and (3) whether an attached object pronoun is present."
 },
 {
  "id": "q-form-1",
  "n": 23,
  "title": "Form I and the verbal noun: \"he did\" versus \"the doing\"",
  "stage": "Meaning from patterns",
  "level": "B1",
  "structure": "Form I is the bare root: عَلِمَ he knew · كَتَبَ he wrote. Every form also has a MASDAR — the noun of the action itself: عِلْم knowledge · كِتَابَة writing · عِبَادَة worship. Form I masdars take many shapes and are learned per word; every later form has one predictable shape.",
  "whyItMatters": "Recognising \"the act of X\" against \"he did X\" is the difference between reading a verse as a statement and reading it as a name.",
  "canDo": "After this lesson you can tell when a Qur’anic word is a Form I verb meaning “he/they did” and when it is a Form I verbal noun (مَصْدَر) meaning “the doing/act of X,” so you read it as an action-name rather than a statement.",
  "rule": "Form I (فَعَلَ) is the plain root verb: عَلِمَ “he knew,” كَتَبَ “he wrote.” The verbal noun (مَصْدَر) names the action itself: عِلْم “knowledge (the knowing),” كِتَاب “book/writing,” إِيمَان “faith (the believing). In Form I, masdars come in several shapes and are learned word-by-word, but they behave like nouns in the sentence.",
  "why": [
   "Prevents reading a noun as if it were a verb: e.g., treating عِلْمُ as “he knew” would turn a noun phrase into a statement.",
   "Prevents missing iḍāfah (Lesson 14): عِلْمُ ٱلسَّاعَةِ is “knowledge of the Hour,” not “he knew the Hour.”",
   "Prevents misunderstanding prepositions: بِعِلْمِهِۦ means “with/according to His knowledge,” not “with His knowing (as a verb).”",
   "Prevents mis-parsing of sentences with “missing is” (Lesson 16): ٱلْحَمْدُ لِلَّهِ is a noun-based statement, not a verb-based one."
  ],
  "pattern": {
   "caption": "Same root, different job: verb (did X) vs masdar (the doing of X). In Form I, the masdar pattern varies, so you recognise it as a noun in context.",
   "columns": [
    "Root idea",
    "Form I verb (does/ did)",
    "Form I masdar (action-name)"
   ],
   "rows": [
    [
     "ʿ-l-m (knowing)",
     "يَعْلَمُ (he knows)",
     "عِلْم (knowledge)"
    ],
    [
     "ʾ-m-n (believing)",
     "ءَامَنُوا۟ (they believed)",
     "إِيمَٰن (faith)"
    ],
    [
     "k-t-b (writing)",
     "كُتِبَ / كَتَبَ (was written / he wrote)",
     "ٱلْكِتَٰب (the Book / the writing)"
    ],
    [
     "ḥ-m-d (praise)",
     "— (often appears as a noun instead)",
     "ٱلْحَمْد (the praise)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "يَعْلَمُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he/they (imperfect)"
     },
     {
      "text": "عْلَم",
      "role": "root",
      "gloss": "know"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "they"
     }
    ],
    "note": "Verb pieces: prefix + root + plural ending; this is clearly a verb, not a noun."
   },
   {
    "word": "عِلْمُ",
    "blocks": [
     {
      "text": "عِلْم",
      "role": "root",
      "gloss": "knowledge"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "of (iḍāfah)"
     }
    ],
    "note": "The final ḍamma often signals the first noun of an iḍāfah: “knowledge of …”"
   },
   {
    "word": "بِعِلْمِهِۦ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "with/by"
     },
     {
      "text": "عِلْم",
      "role": "root",
      "gloss": "knowledge"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "in/with (case)"
     },
     {
      "text": "هِۦ",
      "role": "attachedPronoun",
      "gloss": "his"
     }
    ],
    "note": "Preposition بِ attaches to a noun; the attached pronoun makes it “His knowledge.”"
   },
   {
    "word": "إِيمَٰنِكُمْ",
    "blocks": [
     {
      "text": "إِيمَٰن",
      "role": "root",
      "gloss": "faith"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "of (after بَعْدَ)"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun",
      "gloss": "your (pl.)"
     }
    ],
    "note": "Masdar behaving like a noun: it takes an attached pronoun (“your faith”)."
   }
  ],
  "examples": [
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
    "literal": "not — they know",
    "smooth": "They do not know.",
    "whatChanged": "This is the Form I verb in action: a real statement about what someone does/does not do."
   },
   {
    "arabic": "يَعْلَمُ مَا",
    "ref": "28:69",
    "surah": "Sūrat Al-Qasas",
    "segments": [
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "عْلَم",
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
      "text": "مَا",
      "role": "plain"
     }
    ],
    "literal": "He knows — what",
    "smooth": "He knows what …",
    "whatChanged": "Same root, but here you see the verb immediately followed by its object marker/phrase, reinforcing that it is a verb clause."
   },
   {
    "arabic": "عِلْمُ ٱلسَّاعَةِ",
    "ref": "41:47",
    "surah": "Sūrat Fussilat",
    "segments": [
     {
      "text": "عِلْم",
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
      "text": "ٱلسَّاعَةِ",
      "role": "plain"
     }
    ],
    "literal": "knowledge-of — the Hour",
    "smooth": "Knowledge of the Hour …",
    "whatChanged": "Now the same root is not a verb at all: it is a masdar functioning as a noun, forming iḍāfah (“X of Y”)."
   },
   {
    "arabic": "بِعِلْمِهِۦ",
    "ref": "41:47",
    "surah": "Sūrat Fussilat",
    "segments": [
     {
      "text": "بِ",
      "role": "preposition"
     },
     {
      "text": "عِلْم",
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
    "literal": "with/by — knowledge — his",
    "smooth": "with His knowledge / by His knowledge.",
    "whatChanged": "A masdar behaves like a normal noun: it can follow a preposition and carry an attached pronoun."
   },
   {
    "arabic": "بَعْدَ إِيمَٰنِكُمْ",
    "ref": "3:100",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "بَعْدَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِيمَٰن",
      "role": "root"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "after — faith — your",
    "smooth": "after your faith.",
    "whatChanged": "This shows a different Form I masdar shape (إِيمَٰن), reminding you Form I masdars are not one fixed pattern, but still act like nouns."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse عِلْم (knowledge) with يَعْلَم (he knows).",
    "example": "عِلْمُ ٱلسَّاعَةِ / يَعْلَمُ مَا",
    "note": "If it has a verb prefix (يَ / تَ / أَ / نَ) it is almost certainly a verb. If it sits in iḍāfah (“X of Y”), it is a noun—often a masdar."
   },
   {
    "claim": "Don’t treat a masdar as ‘a thing’ only; often it means ‘the act of…’.",
    "example": "بِعِلْمِهِۦ",
    "note": "Translate it as an action-name when that makes sense: ‘by His knowledge’ = by what He knows / according to His knowing, not a separate ‘object’ floating in the verse."
   },
   {
    "claim": "Don’t assume Form I masdars have one pattern you can guess every time.",
    "example": "عِلْم / إِيمَٰن",
    "note": "Form I masdars vary (عِلْم, إِيمَان, كِتَاب…). Your job while reading is recognition: ‘this is acting like a noun,’ not perfect prediction."
   }
  ],
  "checklist": [
   "Spot the three-letter root you already know (Lesson 6): here it is often ع-ل-م or ء-م-ن.",
   "Look for verb markers: a present-tense prefix (يَ / تَ / أَ / نَ) or past-tense endings you learned (Lesson 11–12). If present, read it as “does/know(s).”",
   "If there is no verb prefix and the word behaves like a noun (has الْ, takes a preposition, or takes an attached pronoun), suspect a masdar.",
   "Check for iḍāfah (Lesson 14): a first noun with a short ending followed by another noun (e.g., عِلْمُ ٱلسَّاعَةِ). That structure is never “he did.”",
   "Check for prepositions (Lesson 3): بِـ, لِـ, إِلَى. If the word follows one, it must be a noun phrase (often including a masdar).",
   "Mentally paraphrase: if your reading turns a phrase into an odd statement (“He knew the Hour” where the Arabic looks like “knowledge of the Hour”), switch to the masdar reading."
  ],
  "summary": [
   "Rule: Form I verbs report the action (“he knew / they know”), while the masdar names the action itself (“knowledge / faith / praise”).",
   "What it looks like: verbs show verb prefixes/suffixes; masdars look and behave like nouns—taking الْ, prepositions, iḍāfah, and attached pronouns.",
   "What you can now do: when you meet a root you recognize, you can decide whether the verse is making a statement (verb) or naming an action/quality (masdar)."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether the highlighted word is a Form I verb or a Form I masdar, and to choose the correct English sense (“he knows” vs “knowledge”)."
 },
 {
  "id": "q-form-2",
  "n": 24,
  "title": "Form II: doubling the middle letter",
  "stage": "Meaning from patterns",
  "level": "B1",
  "structure": "فَعَّلَ — the middle root letter carries a shadda. It makes the action intensive, or causative: عَلِمَ he knew → عَلَّمَ he TAUGHT (made someone know) · نَزَلَ it came down → نَزَّلَ He sent it down. Masdar shape: تَفْعِيل (تَعْلِيم teaching).",
  "whyItMatters": "One shadda is the whole difference between knowing and teaching. It is the most meaning ever carried by one mark in this language.",
  "canDo": "After this lesson you can spot a Form II verb (فَعَّلَ) in the Qur’an by the shadda on the middle root letter and read its meaning as “intensive / causative” compared to the simpler Form I meaning.",
  "rule": "Form II (فَعَّلَ) is the same three-root system you already know, but the middle root letter is doubled with a shadda (ـّـ). This doubling often makes the meaning stronger (intensive) or makes someone/something do the action (causative). A common verbal-noun (masdar) pattern for Form II is تَفْعِيل (e.g., تَعْلِيم “teaching”).",
  "why": [
   "Prevents reading يُنَزِّلُ as “it descends” instead of “He sends down / causes to descend,” changing who is acting and what is happening.",
   "Prevents missing causation: the shadda can turn “he knew” into “he taught,” a completely different relationship between people.",
   "Prevents flattening emphasis: Form II can signal repeated/intensified action, not just a bare occurrence.",
   "Prevents you from overlooking the main verb in a clause: the shadda is a quick visual flag for a specific kind of verb meaning."
  ],
  "pattern": {
   "caption": "Form II: the middle root letter is doubled (shadda) → intensive/causative",
   "columns": [
    "Form I (basic)",
    "Form II (doubled middle letter)",
    "Masdar (often)"
   ],
   "rows": [
    [
     "عَلِمَ (he knew)",
     "عَلَّمَ (he taught / made know)",
     "تَعْلِيم (teaching)"
    ],
    [
     "نَزَلَ (it came down)",
     "نَزَّلَ (he sent down)",
     "تَنْزِيل (sending down)"
    ],
    [
     "يَعْلَمُ (he knows)",
     "يُعَلِّمُ (he teaches)",
     "تَعْلِيم"
    ],
    [
     "أَنزَلَ (he sent down)",
     "يُنَزِّلُ (he sends down repeatedly / causes to descend)",
     "تَنْزِيل"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "يُنَزِّلُ",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "he does"
     },
     {
      "text": "نَزِّل",
      "role": "root",
      "gloss": "send down"
     },
     {
      "text": "ُ",
      "role": "verbSuffix",
      "gloss": "indicative"
     }
    ],
    "note": "The key boundary is inside the root-area: the middle root letter carries the shadda (زِّ), marking Form II."
   },
   {
    "word": "لَنَزَّلْنَا",
    "blocks": [
     {
      "text": "لَ",
      "role": "particle",
      "gloss": "surely"
     },
     {
      "text": "نَزَّل",
      "role": "root",
      "gloss": "send down"
     },
     {
      "text": "نَا",
      "role": "verbSuffix",
      "gloss": "we (did)"
     }
    ],
    "note": "Everything hinges on زَّ (shadda). Without it, you would be in a different verb pattern and likely a different meaning."
   },
   {
    "word": "نَزَّلْنَٰهُ",
    "blocks": [
     {
      "text": "نَزَّل",
      "role": "root",
      "gloss": "sent down"
     },
     {
      "text": "نَا",
      "role": "verbSuffix",
      "gloss": "we (did)"
     },
     {
      "text": "هُ",
      "role": "attachedPronoun",
      "gloss": "it / him"
     }
    ],
    "note": "Form II is signaled by the shadda on the middle root letter; then the object pronoun هُ is simply attached at the end."
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
      "gloss": "you (pl.)"
     }
    ],
    "note": "This is here as the ‘non-doubled’ contrast in the same root family (ع ل م): no shadda in the middle letter."
   }
  ],
  "examples": [
   {
    "arabic": "لَّا يَعْلَمُونَ",
    "ref": "2:13",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "لَّا ",
      "role": "particle"
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
    "literal": "not — they — know",
    "smooth": "They do not know.",
    "whatChanged": "This gives you the baseline (Form I): the same root ع ل م appears with no shadda, meaning simple “know.”"
   },
   {
    "arabic": "فَسَوْفَ تَعْلَمُونَ",
    "ref": "11:39",
    "surah": "Sūrat Hud",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "سَوْفَ ",
      "role": "particle"
     },
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
     }
    ],
    "literal": "so/then — will — you (pl.) — know",
    "smooth": "Then you will know.",
    "whatChanged": "Now you see the same ‘know’ verb with a different prefix (تَ) and a future particle (سوف): meaning shifts by context, not by shadda."
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
      "text": "نَا ",
      "role": "verbSuffix"
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
    "literal": "surely — We sent down — on — them",
    "smooth": "We would surely send down upon them…",
    "whatChanged": "This is Form II in action: the shadda in نَزَّلْنَا makes it “send down / cause to descend,” not merely “descend.”"
   },
   {
    "arabic": "نَزَّلْنَٰهُ عَلَىٰ",
    "ref": "26:198",
    "surah": "Sūrat Ash-Shu'araa",
    "segments": [
     {
      "text": "نَزَّلْ",
      "role": "root"
     },
     {
      "text": "نَٰ",
      "role": "verbSuffix"
     },
     {
      "text": "هُ ",
      "role": "attachedPronoun"
     },
     {
      "text": "عَلَىٰ",
      "role": "preposition"
     }
    ],
    "literal": "We sent down — it — upon",
    "smooth": "We sent it down upon…",
    "whatChanged": "Here you add the attached object pronoun هُ (“it”): Form II plus an object is a very common Qur’anic package."
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
      "text": "ُ ",
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
    "literal": "and — He — sends down — for — you (pl.)",
    "smooth": "And He sends down for you…",
    "whatChanged": "Now the Form II meaning appears in the present tense: you learn to ‘hear’ causation/intensity even when the verb is ongoing."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse shadda inside the verb (Form II) with shadda caused by assimilation in الْ (like الرَّحْمَٰن).",
    "example": "ٱلرَّحْمَٰنِ",
    "note": "That shadda is about the definite article meeting a “sun letter,” not about a doubled root letter. In Form II, the shadda sits on the middle root letter of the verb itself."
   },
   {
    "claim": "Don’t treat every ‘sending down’ as the same pattern: أَنزَلَ is not the same visual cue as نَزَّلَ.",
    "example": "أَنزَلْنَٰهُ / نَزَّلْنَٰهُ",
    "note": "Both can be translated ‘sent down,’ but today’s skill is recognizing Form II specifically by the shadda on the middle root letter (نَزَّلَ)."
   },
   {
    "claim": "Don’t ignore a tiny shadda: it can flip who is acting and what kind of action it is.",
    "example": "نَزَلَ / نَزَّلَ",
    "note": "Without the shadda, the meaning tends toward ‘came down/descended.’ With it, the meaning tends toward ‘sent down/caused to descend’ or a more forceful/intentional action."
   }
  ],
  "checklist": [
   "When you see a verb, first find its three root letters (Lesson 6).",
   "Look specifically at the middle root letter: does it carry a shadda (ـّـ)?",
   "If yes, label it mentally as Form II (فَعَّلَ) and expect an intensive/causative meaning.",
   "Confirm you are not looking at an الْ assimilation shadda on a noun (like الرَّ...).",
   "Notice attached pronouns at the end (هُ، هِم، كُم): Form II often appears with a direct object (“sent it down”).",
   "Read the prefix (يَ / تَ / نَ) to know who is doing it, then let the shadda adjust the meaning (“causes to…/does intensely”)."
  ],
  "summary": [
   "Rule: Form II has a shadda on the middle root letter, often giving an intensive or causative meaning.",
   "Look: the visual cue is the single shadda sitting on the 2nd root letter inside the verb (e.g., نَزَّلَ).",
   "Now you can: distinguish ‘know’ vs ‘make know/teach’ in principle, and in the Qur’anic examples here you can correctly read n-z-l Form II as ‘send down’ rather than merely ‘come down.’"
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether the verb is Form II by the shadda on the middle root letter and choose the causative/intensive meaning."
 },
 {
  "id": "q-form-3",
  "n": 25,
  "title": "Form III: a long ā, and someone on the other end",
  "stage": "Meaning from patterns",
  "level": "B1",
  "structure": "فَاعَلَ — a long alif after the first root letter. It aims the action AT someone: جَاهَدَ he struggled against · قَاتَلَ he fought (someone) · نَادَىٰ he called out to. Masdar shapes: مُفَاعَلَة and فِعَال (جِهَاد).",
  "whyItMatters": "Form III always implies a second party. Spotting it tells you to look for who the action is aimed at.",
  "canDo": "After this lesson you can spot a Form III verb (فَاعَلَ) by its long ā after the first root letter, and immediately look for the “other side” the action is aimed at.",
  "rule": "Form III is the verb pattern فَاعَلَ: an extra long alif (ا / ā) appears after the first root letter. The meaning usually involves doing the action toward/against someone else (a second party), even if that second party is not stated right next to the verb. Its common masdars are مُفَاعَلَة and sometimes فِعَال (like جِهَاد).",
  "why": [
   "Prevents reading Form III as a “plain action” and missing that the verb is directed at an opponent/partner (you stop at “he strove” and miss “against/with someone”).",
   "Prevents losing track of the object/target: spotting Form III tells you to search the sentence for who is being fought, called, or struggled against/with.",
   "Prevents mis-parsing a long ā as decoration: here it is a meaning-carrying marker that changes how you interpret the whole clause.",
   "Prevents confusing Form III with Form I/II when scanning quickly (you learn to treat the long ā after root 1 as a red flag)."
  ],
  "pattern": {
   "caption": "Form III (فَاعَلَ): long ā after root letter 1; often implies action aimed at someone",
   "columns": [
    "Shape in Arabic",
    "What to notice",
    "Comprehension cue"
   ],
   "rows": [
    [
     "جَٰهَدَ",
     "ج + long ā (ٰا) + هَد",
     "struggled (directed/engaged)"
    ],
    [
     "يُجَٰهِدُوا۟",
     "still has جَٰ inside; present marker at front",
     "they strive/struggle (with/against)"
    ],
    [
     "جِهَاد",
     "masdar on فِعَال",
     "the striving/struggle"
    ],
    [
     "قَٰتِلُوا۟",
     "ق + long ā (ٰا) + تِل",
     "fight (someone)"
    ],
    [
     "قَاتَلَ",
     "ق + ا + تَل",
     "he fought (someone)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "جَٰهَدُوا۟",
    "blocks": [
     {
      "text": "جَٰهَ",
      "role": "root",
      "gloss": "strive against"
     },
     {
      "text": "د",
      "role": "root",
      "gloss": "root 3"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they (did)"
     }
    ],
    "note": "The long ā sits right after the first root letter (جَٰ…): that is your Form III signal; the suffix وا۟ is separate information (they)."
   },
   {
    "word": "يُجَٰهِدُوا۟",
    "blocks": [
     {
      "text": "يُ",
      "role": "verbPrefix",
      "gloss": "they (do)"
     },
     {
      "text": "جَٰهِ",
      "role": "root",
      "gloss": "strive against"
     },
     {
      "text": "د",
      "role": "root",
      "gloss": "root 3"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they"
     }
    ],
    "note": "Don’t let the يُ- prefix distract you: the جَٰ… in the middle is the Form III fingerprint."
   },
   {
    "word": "قَٰتِلُوا۟",
    "blocks": [
     {
      "text": "قَٰتِ",
      "role": "root",
      "gloss": "fight (someone)"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "root 3"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "you all"
     }
    ],
    "note": "Form III is visible even in commands: the long ā after ق is the key; the ending وا۟ tells you it is addressed to a plural “you”."
   },
   {
    "word": "قَاتَلَ",
    "blocks": [
     {
      "text": "قَا",
      "role": "root",
      "gloss": "fought (someone)"
     },
     {
      "text": "تَ",
      "role": "root",
      "gloss": "root 2"
     },
     {
      "text": "لَ",
      "role": "root",
      "gloss": "root 3"
     }
    ],
    "note": "In the simple past shape, Form III is very “clean”: قَا- is the long ā after root 1, then the remaining root letters follow."
   }
  ],
  "examples": [
   {
    "arabic": "وَجَٰهَدُوا۟ فِى سَبِيلِ ٱللَّهِ",
    "ref": "2:218",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "جَٰهَدُوا۟",
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
      "text": "سَبِيلِ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهِ",
      "role": "plain"
     }
    ],
    "literal": "and-they-struggled in way the-Allah",
    "smooth": "and they strove/struggled in the path of Allah",
    "whatChanged": "This shows the basic past Form III: the long ā inside جَٰهَدُوا۟ signals an engaged, directed struggle—so you expect some “other side,” even if not named here."
   },
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
      "text": "جَٰهِدُوا۟",
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
      "text": "سَبِيلِ",
      "role": "plain"
     },
     {
      "text": "هِۦ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and-struggle in path-his",
    "smooth": "and strive/struggle in His path",
    "whatChanged": "This shows Form III as a command (not past): the form marker (long ā) stays, while the verb ending changes to address “you all.”"
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
      "text": "جَٰهِدُوا۟",
      "role": "root"
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
      "text": "أَمْوَٰلِ",
      "role": "plain"
     },
     {
      "text": "هِمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "that they-strive with-wealth-their",
    "smooth": "that they strive/struggle with their wealth",
    "whatChanged": "This adds the present-form prefix يُ-: even when the front of the verb changes, the Form III long ā (جَٰ…) still tells you it is the “aimed/engaged” version of the verb."
   },
   {
    "arabic": "فَقَٰتِلُوا۟ أَئِمَّةَ ٱلْكُفْرِ",
    "ref": "9:12",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "قَٰتِلُوا۟",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَئِمَّةَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْكُفْرِ",
      "role": "plain"
     }
    ],
    "literal": "so-fight leaders the-disbelief",
    "smooth": "so fight the leaders of disbelief",
    "whatChanged": "This shows Form III with an explicit target right after it: the command ‘fight’ immediately points to who is on the other end (أَئِمَّةَ ٱلْكُفْرِ)."
   },
   {
    "arabic": "قَٰتِلُوا۟ ٱلَّذِينَ يَلُونَكُم",
    "ref": "9:123",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "قَٰتِلُوا۟",
      "role": "root"
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
      "text": "يَلُونَ",
      "role": "plain"
     },
     {
      "text": "كُم",
      "role": "attachedPronoun"
     }
    ],
    "literal": "fight those who-are-near-you-all",
    "smooth": "fight those who are near you",
    "whatChanged": "This reinforces the Form III ‘other side’ idea: the object is a whole ‘those who…’ phrase, not just one noun—so you keep reading to find the target."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse Form III قَٰتِلُوا۟ (fight someone) with Form I تَقْتُلُوا۟ (kill).",
    "example": "قَٰتِلُوا۟ / تَقْتُلُوا۟",
    "note": "In 9:123 you see قَٰتِلُوا۟ with the long ā after the first root letter: engagement against others. In 17:31 you see وَلَا تَقْتُلُوا۟: no long ā; it is the basic ‘kill’ verb, not the directed ‘fight’ pattern."
   },
   {
    "claim": "Don’t mistake the long ā marker for a random spelling stretch; it is the pattern itself.",
    "example": "جَٰهَدُوا۟",
    "note": "The long ā comes right after the first root letter (جَٰ…). If you ignore it, you may search for the wrong root/pattern and miss the ‘second party’ implication that Form III carries."
   },
   {
    "claim": "Don’t assume the ‘other side’ must be a direct object right after the verb.",
    "example": "وَجَٰهَدُوا۟ فِى سَبِيلِ ٱللَّهِ",
    "note": "In 2:218 the verb is followed by فِى سَبِيلِ ٱللَّهِ (a prepositional phrase). Form III still suggests engagement; the target can be understood from context rather than stated as a single noun after the verb."
   }
  ],
  "checklist": [
   "When you meet a verb, scan the first part: is there a long ā (ا / ٰا) right after the first root letter? If yes, suspect Form III (فَاعَلَ).",
   "Confirm you are looking at a verb (not a noun) by noticing common verb prefixes (like يُـ) or plural endings (like ـوا۟).",
   "Mentally label it “directed/engaged action” and ask: who is it aimed at/with/against?",
   "Search to the right for an explicit target (a noun, or a full ٱلَّذِينَ … phrase).",
   "If there is no clear object, look for a prepositional phrase (فِى … / مَعَ … / بِـ …) that tells you the arena, companion, or means, and let context supply the ‘other side.’",
   "Do a quick sanity check: if the verb is about fighting/striving, Form III often fits; if it is a plain ‘kill’ (تَقْتُلُوا۟), it is not Form III."
  ],
  "summary": [
   "Rule: Form III is فَاعَلَ—long ā after the first root letter—and it usually implies action aimed at someone else (a second party).",
   "Look: inside the verb you will literally see that long ā early (جَٰهَدُوا۟, قَٰتِلُوا۟), even when prefixes/suffixes change.",
   "Now you can read a line and, upon spotting Form III, automatically look for the target/other party—whether it is a direct object or a longer phrase."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify Form III verbs by the long ā marker and point to the word/phrase that names (or implies) the other side."
 },
 {
  "id": "q-form-4",
  "n": 26,
  "title": "Form IV: أ on the front, and making it happen",
  "stage": "Meaning from patterns",
  "level": "B1",
  "structure": "أَفْعَلَ — a fathah-bearing alif prefix in the past, and the present drops it: يُسْلِمُ. Causative: سَلِمَ he was safe → أَسْلَمَ he submitted · نَزَلَ → أَنْزَلَ He sent down · خْرَجَ → أَخْرَجَ He brought out. Masdar: إِفْعَال (إِنْزَال، إِسْلَام).",
  "whyItMatters": "Forms II and IV are both causative and both extremely common. Telling them apart on sight is a genuine reading skill.",
  "canDo": "After this lesson you can recognize Form IV verbs (أَفْعَلَ) in Qur’anic Arabic, link them to their three-letter root, and understand the common “make it happen / cause it” meaning—especially when the present tense shows up without the initial أ (e.g., يُسْلِمُ).",
  "rule": "Form IV is built by adding a hamzah-alif with fatḥah at the front in the past: أَفْعَلَ. In the present, that initial أ is not written; instead you see the normal present prefix (ي / ت / أ / ن): يُفْعِلُ. Very often Form IV is causative: it turns “X happened/was” into “he caused X / made X happen.”",
  "why": [
   "Prevents misreading أَنزَلَ as simply “he descended” (نَزَلَ) instead of “He sent down” (caused descending).",
   "Stops you from confusing Form IV with Form II (which signals causation by doubling the middle letter), so you don’t assign the wrong meaning to a familiar root.",
   "Helps you recognize the same verb across tenses: أَسْلَمَ (past) vs يُسْلِمُ (present), even when the opening أ disappears.",
   "Makes it easier to spot the verbal noun (masdar) pattern إِفْعَال (like إِسْلَٰم), so you connect “the action” to “he did the action.”"
  ],
  "pattern": {
   "caption": "Form IV on sight: past has أَ…; present drops it and uses يـ…; masdar is often إِفْعَال.",
   "columns": [
    "Form I (basic)",
    "Form IV (causative)",
    "Masdar of Form IV"
   ],
   "rows": [
    [
     "نَزَلَ (came down)",
     "أَنزَلَ (sent down)",
     "إِنزَال (sending down)"
    ],
    [
     "سَلِمَ (was safe/whole)",
     "أَسْلَمَ (submitted)",
     "إِسْلَٰم (submission)"
    ],
    [
     "خَرَجَ (went out)",
     "أَخْرَجَ (brought out)",
     "إِخْرَاج (bringing out)"
    ],
    [
     "—",
     "أَعَدَّ (prepared)",
     "إِعْدَاد (preparing)"
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
      "gloss": "Form IV marker"
     },
     {
      "text": "نز",
      "role": "root",
      "gloss": "n-z-l root"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "3rd root"
     },
     {
      "text": "ْنَآ",
      "role": "verbSuffix",
      "gloss": "we (did)"
     }
    ],
    "note": "The Form IV marker is the very first أَ; the suffix ـنَآ tells you the doer is “we.”"
   },
   {
    "word": "أُنزِلَ",
    "blocks": [
     {
      "text": "أُ",
      "role": "verbPrefix",
      "gloss": "Form IV marker"
     },
     {
      "text": "نز",
      "role": "root",
      "gloss": "n-z-l root"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "3rd root"
     },
     {
      "text": "َ",
      "role": "verbSuffix",
      "gloss": "was (done)"
     }
    ],
    "note": "Same Form IV root as أَنزَلَ, but here it is passive in meaning (“was sent down”)—still recognizable by the initial hamzah-alif."
   },
   {
    "word": "أَسْلَمَ",
    "blocks": [
     {
      "text": "أَ",
      "role": "verbPrefix",
      "gloss": "Form IV marker"
     },
     {
      "text": "س",
      "role": "root",
      "gloss": "s-l-m root"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "2nd root"
     },
     {
      "text": "مَ",
      "role": "root",
      "gloss": "3rd root"
     }
    ],
    "note": "The first أَ is not the normal present prefix; it is the Form IV past marker attached to the root س-ل-م."
   },
   {
    "word": "أَسْلَمْتُ",
    "blocks": [
     {
      "text": "أَ",
      "role": "verbPrefix",
      "gloss": "Form IV marker"
     },
     {
      "text": "س",
      "role": "root",
      "gloss": "s-l-m root"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "2nd root"
     },
     {
      "text": "م",
      "role": "root",
      "gloss": "3rd root"
     },
     {
      "text": "ْتُ",
      "role": "verbSuffix",
      "gloss": "I (did)"
     }
    ],
    "note": "Everything before ـتُ is the Form IV verb; ـتُ is the attached subject “I.”"
   },
   {
    "word": "إِسْلَٰمَكُم",
    "blocks": [
     {
      "text": "إِ",
      "role": "plain",
      "gloss": "masdar start"
     },
     {
      "text": "س",
      "role": "root",
      "gloss": "s-l-m root"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "2nd root"
     },
     {
      "text": "َٰمَ",
      "role": "plain",
      "gloss": "masdar ending"
     },
     {
      "text": "كُم",
      "role": "attachedPronoun",
      "gloss": "your (pl.)"
     }
    ],
    "note": "This is the masdar pattern إِفْعَال (here: إِسْلَٰم), plus the attached pronoun كُم."
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
      "text": "ل",
      "role": "root"
     },
     {
      "text": "ْنَآ",
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
      "text": "كُمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "نُورًۭا",
      "role": "plain"
     }
    ],
    "literal": "and + We-sent-down + to-you(pl.) + a light",
    "smooth": "And We sent down to you a clear light.",
    "whatChanged": "This shows Form IV in the past with a visible initial أَ plus a subject suffix (ـنَآ = we)."
   },
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
      "text": "ل",
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
      "text": "إِلَى",
      "role": "preposition"
     },
     {
      "text": "كَ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "in/with what + was-sent-down + to-you",
    "smooth": "…in what has been sent down to you…",
    "whatChanged": "This shows the same Form IV root ن-ز-ل but in a passive-style Qur’anic phrasing (“was sent down”), still marked by the initial hamzah."
   },
   {
    "arabic": "مَاذَآ أَنزَلَ رَبُّكُمْ",
    "ref": "16:30",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "مَاذَآ",
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
      "text": "نز",
      "role": "root"
     },
     {
      "text": "ل",
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
      "text": "رَبُّ",
      "role": "plain"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "what? + did-send-down + your-Lord",
    "smooth": "What has your Lord sent down?",
    "whatChanged": "This gives you a clean, short past Form IV (أَنزَلَ) with an obvious subject noun after it (رَبُّكُمْ)."
   },
   {
    "arabic": "وَأَسْلَمْتُ مَعَ سُلَيْمَٰنَ",
    "ref": "27:44",
    "surah": "Sūrat An-Naml",
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
      "text": "س",
      "role": "root"
     },
     {
      "text": "ل",
      "role": "root"
     },
     {
      "text": "م",
      "role": "root"
     },
     {
      "text": "ْتُ",
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
      "text": " ",
      "role": "plain"
     },
     {
      "text": "سُلَيْمَٰنَ",
      "role": "plain"
     }
    ],
    "literal": "and + I-submitted + with + Sulayman",
    "smooth": "And I submit, along with Sulayman…",
    "whatChanged": "This highlights the same Form IV verb with a different subject suffix (ـتُ = I), strengthening recognition across persons."
   },
   {
    "arabic": "إِسْلَٰمَكُم",
    "ref": "49:17",
    "surah": "Sūrat Al-Hujuraat",
    "segments": [
     {
      "text": "إِ",
      "role": "plain"
     },
     {
      "text": "س",
      "role": "root"
     },
     {
      "text": "ل",
      "role": "root"
     },
     {
      "text": "َٰمَ",
      "role": "plain"
     },
     {
      "text": "كُم",
      "role": "attachedPronoun"
     }
    ],
    "literal": "your + Islam/submission",
    "smooth": "your submission (your Islam).",
    "whatChanged": "This is the masdar (verbal noun) of Form IV (إِفْعَال), letting you connect “the act” (إِسْلَٰم) to “he did the act” (أَسْلَمَ)."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse Form IV أَفْعَلَ with the present-tense prefix أَ (I do…).",
    "example": "أَسْلَمَ",
    "note": "Here the opening أَ is part of the verb’s form (past Form IV), not “I.” Check the ending: there is no ـتُ/ـتَ/ـتِ that would make it “I/you,” and the overall shape matches أَفْعَلَ."
   },
   {
    "claim": "Don’t confuse Form IV causation with Form II causation (middle letter doubled).",
    "example": "أَنزَلَ",
    "note": "Form II would show a doubled middle root letter (…زَّ…), but Form IV shows a front hamzah-alif (أَ…). When you see أَ at the very start + three root letters after it, think Form IV first."
   },
   {
    "claim": "Don’t treat every initial أ as ‘question/hamzah of interrogation’ in meaning.",
    "example": "أُنزِلَ",
    "note": "This initial hamzah belongs to the verb pattern and is part of the spelling. Interrogative hamzah is a separate particle at the beginning of a sentence; here the word itself begins with hamzah because it is Form IV."
   }
  ],
  "checklist": [
   "Spot a verb that begins with أَ / أُ in the past-style shape: often 4-letter look = (أ + three root letters).",
   "Extract the three-letter root after the initial أ (e.g., in أَنزَلَ the root is ن-ز-ل).",
   "Ask: does the meaning naturally become “cause/make/send/bring” rather than just “be/come/go”? If yes, Form IV is likely.",
   "Look for matching family members: the same root may appear with أَنزَلَ / أُنزِلَ / أَنزَلْنَآ across verses.",
   "Check for the masdar pattern إِفْعَال nearby in vocabulary you know (e.g., إِسْلَٰمَكُم): it often points back to a Form IV verb.",
   "If you later see a present tense with يـ + similar root letters, remember: Form IV present drops the initial أ (conceptually: يُفْعِلُ)."
  ],
  "summary": [
   "Rule: Form IV adds أَ at the front in the past (أَفْعَلَ) and is often causative; its present uses the normal present prefix and does not show that initial أ.",
   "Look: a verb starting with أَ/أُ plus three root letters—like أَنزَلَ, أُنزِلَ, أَسْلَمَ—often signals “make it happen.”",
   "Now you can connect common Qur’anic words like أَنزَلَ / أُنزِلَ and إِسْلَٰم to their root and read their causative force instead of defaulting to Form I meanings."
  ],
  "quizBridge": "The quiz will ask you to spot Form IV in short snippets, pull out the three-letter root, and choose the causative/“make it happen” meaning (and recognize the related masdar إِفْعَال)."
 },
 {
  "id": "q-forms-5-6",
  "n": 27,
  "title": "Forms V and VI: the تـ forms, turned inward",
  "stage": "Meaning from patterns",
  "level": "B1",
  "structure": "تَفَعَّلَ (V) is Form II with تَـ on the front — the action done to or for oneself: تَذَكَّرَ he reminded himself, took heed · تَوَكَّلَ he put his trust. تَفَاعَلَ (VI) is Form III with تَـ — mutual action between parties: تَعَاوَنُوا they helped one another · تَسَاءَلُونَ they ask each other.",
  "whyItMatters": "The تـ tells you the action has turned back on the subject, or is running between two parties. It is the difference between reminding and taking heed.",
  "canDo": "After this lesson you can spot Form V and Form VI verbs (the تـ forms) in Qur’anic text and understand whether the action turns back on the subject (self-directed) or runs between people (mutual).",
  "rule": "Form V (تَفَعَّلَ) is Form II with an extra تَـ at the front: it often means doing the action to/for oneself or becoming affected by it (e.g., “take heed / remind oneself”). Form VI (تَفَاعَلَ) is Form III with an extra تَـ: it often signals mutual or back-and-forth action between parties (e.g., “ask one another”). The key recognition cue is the initial تـ plus the inner shape: doubled middle letter (V) vs long ā / alif after the first root letter (VI).",
  "why": [
   "Prevents reading تَذَكَّرَ as merely “he reminded (someone else)”—you’ll catch the inward sense: “he took heed / reminded himself.”",
   "Prevents missing mutual meaning in groups, e.g., يَتَسَاءَلُونَ is not just “they ask,” but “they ask each other.”",
   "Stops you from treating all تـ verbs as ordinary Form I present tense; you’ll look inside for the Form II/III core.",
   "Helps you follow Qur’anic argument flow: commands like تَوَكَّلْ are not “make others trust,” but “place your own trust.”"
  ],
  "pattern": {
   "caption": "The تـ forms: Form V = ت + Form II (double middle). Form VI = ت + Form III (long ā).",
   "columns": [
    "Form",
    "Looks like (past/present)",
    "Typical Qur’an reading sense"
   ],
   "rows": [
    [
     "V (تَفَعَّلَ)",
     "تَ + (Form II: middle letter doubled) / يَتَ + (Form II core)",
     "self-directed / inward: take heed, commit oneself, become affected"
    ],
    [
     "V example",
     "تَذَكَّرَ / تَذَكَّرُونَ / يَتَذَكَّرُونَ",
     "remind oneself; take heed; reflect"
    ],
    [
     "V example",
     "تَوَكَّلَ / تَوَكَّلْ / يَتَوَكَّلُونَ",
     "put one’s trust (not “make others trust”)"
    ],
    [
     "VI (تَفَاعَلَ)",
     "تَ + (Form III: long ā after 1st root) / يَتَ + (Form III core)",
     "mutual / between parties: do to each other; interact"
    ],
    [
     "VI example",
     "يَتَسَاءَلُونَ",
     "ask one another; question each other"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "تَذَكَّرُونَ",
    "blocks": [
     {
      "text": "تَ",
      "role": "plain",
      "gloss": "Form V marker"
     },
     {
      "text": "ذَكَّر",
      "role": "root",
      "gloss": "remember / remind"
     },
     {
      "text": "و",
      "role": "verbSuffix",
      "gloss": "you (pl.)"
     },
     {
      "text": "نَ",
      "role": "verbSuffix",
      "gloss": "indicative"
     }
    ],
    "note": "The boundary that matters is تَ + ذَكَّر (Form II core with doubled كّ), then the plural ending ـونَ."
   },
   {
    "word": "يَتَذَكَّرُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he/they"
     },
     {
      "text": "تَ",
      "role": "plain",
      "gloss": "Form V marker"
     },
     {
      "text": "ذَكَّر",
      "role": "root",
      "gloss": "remember / remind"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "they (pl.)"
     }
    ],
    "note": "Present tense has its usual prefix (يَـ), and Form V adds an extra تَ immediately after it."
   },
   {
    "word": "تَوَكَّلْتُ",
    "blocks": [
     {
      "text": "تَ",
      "role": "plain",
      "gloss": "Form V marker"
     },
     {
      "text": "وَكَّل",
      "role": "root",
      "gloss": "entrust / rely"
     },
     {
      "text": "تُ",
      "role": "verbSuffix",
      "gloss": "I"
     }
    ],
    "note": "See the Form II core (وَكَّل with doubled كّ) plus initial تَ; the suffix تُ tells you “I.”"
   },
   {
    "word": "تَوَكَّلُوا۟",
    "blocks": [
     {
      "text": "تَ",
      "role": "plain",
      "gloss": "Form V marker"
     },
     {
      "text": "وَكَّل",
      "role": "root",
      "gloss": "entrust / rely"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "you (pl.)"
     }
    ],
    "note": "Imperative to a group: the key is still تَ + Form II core; the ending ـوا۟ marks plural command."
   },
   {
    "word": "يَتَسَآءَلُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "they"
     },
     {
      "text": "تَ",
      "role": "plain",
      "gloss": "Form VI marker"
     },
     {
      "text": "سَآءَل",
      "role": "root",
      "gloss": "ask / question"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "they (pl.)"
     }
    ],
    "note": "Form VI shows the Form III inside it: the long ā (سَا…) is the giveaway that this is mutual/back-and-forth."
   }
  ],
  "examples": [
   {
    "arabic": "أَفَلَا تَذَكَّرُونَ",
    "ref": "23:85",
    "surah": "Sūrat Al-Muminoon",
    "segments": [
     {
      "text": "أَفَلَا ",
      "role": "particle"
     },
     {
      "text": "تَذَكَّرُونَ",
      "role": "plain"
     }
    ],
    "literal": "then-will-not you-take-heed?",
    "smooth": "Will you not take heed?",
    "whatChanged": "This shows Form V in a direct address: the تـ verb is not “you remind (someone),” but “you remind yourselves / take heed.”"
   },
   {
    "arabic": "لَعَلَّهُمْ يَتَذَكَّرُونَ",
    "ref": "28:43",
    "surah": "Sūrat Al-Qasas",
    "segments": [
     {
      "text": "لَعَلَّهُمْ ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "تَذَكَّرُونَ",
      "role": "plain"
     }
    ],
    "literal": "so-that-perhaps-they they(Form) take-heed",
    "smooth": "So that perhaps they may take heed.",
    "whatChanged": "This adds the present-tense prefix يَـ: you can still see Form V because the extra تَ sits right after the prefix."
   },
   {
    "arabic": "وَعَلَى ٱللَّهِ فَلْيَتَوَكَّلِ ٱلْمُؤْمِنُونَ",
    "ref": "3:122",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "عَلَى ",
      "role": "preposition"
     },
     {
      "text": "ٱللَّهِ ",
      "role": "plain"
     },
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "لْ",
      "role": "plain"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "تَوَكَّلِ ",
      "role": "plain"
     },
     {
      "text": "ٱلْمُؤْمِنُونَ",
      "role": "plain"
     }
    ],
    "literal": "and upon Allah then-let they put-trust the-believers",
    "smooth": "And upon Allah let the believers put their trust.",
    "whatChanged": "This shows Form V in a “let them…” structure: the meaning is self-commitment (placing one’s own trust), not directing trust into others."
   },
   {
    "arabic": "فَعَلَيْهِ تَوَكَّلُوا۟",
    "ref": "10:84",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "عَلَيْهِ ",
      "role": "preposition"
     },
     {
      "text": "تَوَكَّلُوا۟",
      "role": "plain"
     }
    ],
    "literal": "so upon-him put-trust(you all)",
    "smooth": "So put your trust in Him.",
    "whatChanged": "This shows Form V as a command to a group: recognize تَ + doubled middle letter, with a plural command ending."
   },
   {
    "arabic": "وَلَا يَتَسَآءَلُونَ",
    "ref": "23:101",
    "surah": "Sūrat Al-Muminoon",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَا ",
      "role": "particle"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "تَسَآءَلُونَ",
      "role": "plain"
     }
    ],
    "literal": "and not they ask-each-other",
    "smooth": "And they will not ask one another.",
    "whatChanged": "This introduces Form VI: the inner long ā (سَا…) marks the Form III core, so the added تـ now signals mutual action."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the Form-V/VI تـ with the normal present-tense prefix تـ meaning “you/she.”",
    "example": "تَذَكَّرُونَ",
    "note": "Here تَ is not “you-” as a simple present prefix; it is the form marker sitting on top of the Form II core (ذَكَّر with كّ). Use the doubled middle letter to confirm Form V."
   },
   {
    "claim": "Don’t treat every تـ verb as ‘someone else is being acted on.’",
    "example": "تَوَكَّلْتُ",
    "note": "Form V often turns the meaning inward: “I relied / I put my trust,” not “I made someone rely.” Look for the Form II doubling to read it as self-directed."
   },
   {
    "claim": "Don’t miss Form VI mutual meaning by translating it as a plain ‘ask.’",
    "example": "يَتَسَآءَلُونَ",
    "note": "Form VI = ت + Form III (long ā). The shape itself tells you there is an ‘each other / back-and-forth’ sense, even if English sometimes hides it."
   }
  ],
  "checklist": [
   "When you see a verb starting with تـ (or يَتَـ), pause: it may be a “t-form.”",
   "Look inside for Form II vs Form III: doubled middle letter (…َّ…) suggests Form V; a long ā/alif after the first root letter suggests Form VI.",
   "Confirm the three root letters you already know how to find; then note what the pattern is doing to them (doubling or long vowel).",
   "Ask a comprehension question: is the subject doing it to themselves/entering a state (V), or is it happening between people (VI)?",
   "Use endings only to identify who: ـونَ (they/you plural), ـتُ (I), etc.; the “turned inward / mutual” meaning comes from the form, not the ending.",
   "Translate with the right English feel: Form V often reads as “take/receive/commit oneself,” and Form VI often reads as “each other / together.”"
  ],
  "summary": [
   "The rule: Form V is تَفَعَّلَ (ت + Form II) and often turns the action back onto the subject; Form VI is تَفَاعَلَ (ت + Form III) and often indicates mutual action.",
   "What it looks like: initial تـ (or يَتَـ) plus either a doubled middle root letter (V) or a long ā inside (VI).",
   "What you can now do: when you meet تَذَكَّرُونَ, يَتَذَكَّرُونَ, تَوَكَّلُوا۟, or يَتَسَآءَلُونَ, you can read the direction of the action without guessing."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether the highlighted تـ verb is Form V (inward/self-directed) or Form VI (mutual), and to choose the best reading."
 },
 {
  "id": "q-forms-7-8",
  "n": 28,
  "title": "Forms VII and VIII: it happened, or he took it on",
  "stage": "Meaning from patterns",
  "level": "B2",
  "structure": "انْفَعَلَ (VII) — انْـ prefix, the action simply happens to the subject: انْشَقَّ it split · انْفَجَرَ it burst forth. افْتَعَلَ (VIII) — a ت slipped in AFTER the first root letter, the subject taking the action up: اجْتَنَبَ he avoided · اتَّقَىٰ he was mindful · اخْتَلَفَ they differed · اسْتَمَعَ he listened.",
  "whyItMatters": "Form VIII's infixed ت hides inside the word rather than sitting on the front, which makes it the hardest form to spot and the one most often misrooted.",
  "canDo": "After this lesson you can spot Form VII (اِنْفَعَلَ) and Form VIII (اِفْتَعَلَ) in a Qur’anic verb and predict whether the subject is “undergoing” the action (it happened to him) or “taking it on” (he did it to himself / deliberately).",
  "rule": "Form VII starts with انْـ and often means the action happens to the subject: “it split”, “it burst”. Form VIII is built on Form I but hides a ت right after the first root letter (…ت…): the subject actively takes the action up, often like “he avoided / was mindful / they differed / he listened”. The key recognition skill: in Form VIII the ت is inside the word, so you must not treat it as part of the root.",
  "why": [
   "Prevents mis-rooting: reading the hidden ت of Form VIII as a root letter and looking up the wrong root (e.g., treating ٱخْتَلَفُوا۟ as خ-ت-ل instead of خ-ل-ف).",
   "Prevents mistranslating the “feel”: Form VII is often passive-like (“it happened to them”), while Form VIII often carries deliberate engagement (“they took it on / kept mindful”).",
   "Stops you from missing a form when the ت assimilates or is doubled (like ٱتَّقُوا۟), which can make the pattern look “not like” Form VIII at first glance.",
   "Helps you connect verbs and verbal nouns you already know (e.g., ٱخْتِلَٰفُ as the “differing” noun tied to the Form VIII verb)."
  ],
  "pattern": {
   "caption": "Two new verb shapes to recognize: VII = انْ + root, VIII = first root letter + ت inside the pattern",
   "columns": [
    "Form",
    "Shape to look for",
    "Basic comprehension feel"
   ],
   "rows": [
    [
     "VII (اِنْفَعَلَ)",
     "اِنْ + فَـ… (انْـ at the very front)",
     "the action happens to the subject"
    ],
    [
     "VIII (اِفْتَعَلَ)",
     "…ت… after 1st root letter (often ٱتَّـ / ٱخْتَـ)",
     "the subject takes it on / engages in it"
    ],
    [
     "VIII with assimilation",
     "ت may “merge” and look doubled (ّ) after certain letters (e.g., ٱتَّقَىٰ)",
     "still Form VIII—don’t lose the hidden ت"
    ],
    [
     "VIII verbal noun",
     "often on اِفْتِعَال (e.g., ٱخْتِلَٰف)",
     "the act/condition of doing Form VIII"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱخْتَلَفُوا۟",
    "blocks": [
     {
      "text": "ٱ",
      "role": "plain",
      "gloss": "linking alif"
     },
     {
      "text": "خ",
      "role": "root",
      "gloss": "root 1"
     },
     {
      "text": "ت",
      "role": "plain",
      "gloss": "Form VIII t"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "root 2"
     },
     {
      "text": "ف",
      "role": "root",
      "gloss": "root 3"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they (past)"
     }
    ],
    "note": "The ت is not part of the root; the root here is خ-ل-ف, with the plural past ending وا۟."
   },
   {
    "word": "يَخْتَلِفُونَ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "they (present)"
     },
     {
      "text": "خ",
      "role": "root",
      "gloss": "root 1"
     },
     {
      "text": "ت",
      "role": "plain",
      "gloss": "Form VIII t"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "root 2"
     },
     {
      "text": "ف",
      "role": "root",
      "gloss": "root 3"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "they (end)"
     }
    ],
    "note": "Form VIII is visible even in the present: y- (present marker) + root1 + hidden ت + rest of root + plural ending."
   },
   {
    "word": "ٱخْتِلَٰفُ",
    "blocks": [
     {
      "text": "ٱ",
      "role": "plain",
      "gloss": "linking alif"
     },
     {
      "text": "خ",
      "role": "root",
      "gloss": "root 1"
     },
     {
      "text": "ت",
      "role": "plain",
      "gloss": "Form VIII t"
     },
     {
      "text": "ل",
      "role": "root",
      "gloss": "root 2"
     },
     {
      "text": "ٰف",
      "role": "root",
      "gloss": "root 3"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "nom./of"
     }
    ],
    "note": "This is a noun (verbal noun): same hidden ت inside; the ending ُ signals it is in a noun role in the sentence."
   },
   {
    "word": "ٱتَّقُوا۟",
    "blocks": [
     {
      "text": "ٱ",
      "role": "plain",
      "gloss": "linking alif"
     },
     {
      "text": "تَّ",
      "role": "plain",
      "gloss": "merged t"
     },
     {
      "text": "ق",
      "role": "root",
      "gloss": "root 1"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "you all (cmd)"
     }
    ],
    "note": "Form VIII’s hidden ت can assimilate and appear doubled (تَّ). Don’t try to extract a root from تَّق; focus on the remaining root letters."
   }
  ],
  "examples": [
   {
    "arabic": "فَٱخْتَلَفُوا۟ ۚ",
    "ref": "10:19",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "ٱخْتَلَفُوا۟",
      "role": "plain"
     },
     {
      "text": " ۚ",
      "role": "plain"
     }
    ],
    "literal": "so/then + they differed",
    "smooth": "So they came to differ.",
    "whatChanged": "First clear Form VIII past plural: you can see the internal ت plus the “they” ending وا۟."
   },
   {
    "arabic": "فِيمَا فِيهِ يَخْتَلِفُونَ",
    "ref": "10:19",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "فِ",
      "role": "preposition"
     },
     {
      "text": "يمَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِ",
      "role": "preposition"
     },
     {
      "text": "يهِ",
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
      "text": "خْ",
      "role": "plain"
     },
     {
      "text": "ت",
      "role": "plain"
     },
     {
      "text": "لِف",
      "role": "plain"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "in what + in it + they differ",
    "smooth": "…about what they differ in.",
    "whatChanged": "Shows Form VIII in the present: the y- prefix and -ونَ ending wrap around the same hidden ت pattern."
   },
   {
    "arabic": "ٱخْتَلَفُوا۟ فِيهِ",
    "ref": "16:64",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "ٱخْتَلَفُوا۟",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِ",
      "role": "preposition"
     },
     {
      "text": "يهِ",
      "role": "plain"
     }
    ],
    "literal": "they differed + in it",
    "smooth": "…that they differed about.",
    "whatChanged": "Adds the very common Qur’anic frame “differed in/over it” (فِيهِ), so you learn to spot the verb and then attach its prepositional phrase."
   },
   {
    "arabic": "وَلَهُ ٱخْتِلَٰفُ ٱلَّيْلِ",
    "ref": "23:80",
    "surah": "Sūrat Al-Muminoon",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَ",
      "role": "preposition"
     },
     {
      "text": "هُ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱخْتِلَٰفُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلَّيْلِ",
      "role": "plain"
     }
    ],
    "literal": "and + for/to + Him + the differing + of the night",
    "smooth": "And to Him belongs the alternation of the night…",
    "whatChanged": "Moves from the verb to the verbal noun: same Form VIII “hidden ت”, but now it functions as a noun meaning “the differing/alternation”."
   },
   {
    "arabic": "وَمَا ٱخْتَلَفْتُمْ فِيهِ",
    "ref": "42:10",
    "surah": "Sūrat Ash-Shura",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "مَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱخْتَلَفْ",
      "role": "plain"
     },
     {
      "text": "تُمْ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فِ",
      "role": "preposition"
     },
     {
      "text": "يهِ",
      "role": "plain"
     }
    ],
    "literal": "and + whatever + you (all) differed + in it",
    "smooth": "And whatever you differ about…",
    "whatChanged": "Shows the same Form VIII verb with a different “who”: -تُمْ marks “you all” in the past, without changing the hidden ت pattern."
   },
   {
    "arabic": "فَٱتَّقُوا۟ ٱلنَّارَ",
    "ref": "2:24",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "ٱتَّقُوا۟",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلنَّارَ",
      "role": "plain"
     }
    ],
    "literal": "so + be mindful/guard yourselves + the Fire",
    "smooth": "So be mindful of the Fire.",
    "whatChanged": "Demonstrates Form VIII with assimilation: the internal ت “shows up” as doubling (تَّ), which is why Form VIII can be hard to spot."
   }
  ],
  "traps": [
   {
    "claim": "Don’t treat the ت in Form VIII as a root letter.",
    "example": "ٱخْتَلَفُوا۟",
    "note": "The root is خ-ل-ف, not خ-ت-ل. The ت is a built-in part of the pattern (اِفْتَعَلَ) and often causes wrong dictionary searches."
   },
   {
    "claim": "Don’t miss Form VIII when the ت assimilates and looks doubled.",
    "example": "ٱتَّقُوا۟",
    "note": "You may not see a separate “t after the first root letter” because it merged (تَّ). Still read it as Form VIII, not as a strange Form I."
   },
   {
    "claim": "Don’t confuse a Form VIII verbal noun with a simple noun just because it starts with ٱ.",
    "example": "ٱخْتِلَٰفُ",
    "note": "Many nouns start with ٱ (linking alif). Here, the clue is the internal ت plus a recognizable root, giving “the act/state of differing (alternation)”."
   }
  ],
  "checklist": [
   "Scan for verbs beginning with ٱخْتَـ or ٱتَّـ: these are frequent doorways into Form VIII.",
   "If you see a ت right after the first root letter (or a doubled next letter indicating assimilation), suspect Form VIII.",
   "Extract the root by ignoring that ت and collecting the three main consonants around it (e.g., خ-ل-ف in يَخْتَلِفُونَ).",
   "Check the verb wrapper: y-/t-/’ (present prefixes) or endings like وا۟, تُمْ, ونَ to know “who” is doing it (already familiar from earlier lessons).",
   "If the word is not acting like a verb, look for a noun ending (like ُ) and read it as a verbal noun: “the differing/alternation”."
  ],
  "summary": [
   "Rule: Form VII begins with انْـ and often means the subject undergoes the action; Form VIII hides a ت after the first root letter and often means the subject deliberately takes the action up.",
   "What it looks like: Form VIII is easiest to spot in patterns like ٱخْتَلَفَ / يَخْتَلِفُ, but the ت may assimilate and appear as doubling as in ٱتَّقُوا۟.",
   "What you can now do: pull the correct three-letter root out of Form VIII words and read the basic “happened vs. took it on” feel without needing to translate every letter."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to (1) identify Form VIII patterns (including assimilated ت) and (2) extract the correct root without counting the hidden ت."
 },
 {
  "id": "q-form-10",
  "n": 29,
  "title": "Form X: اسْتَـ, asking and seeking",
  "stage": "Meaning from patterns",
  "level": "B2",
  "structure": "اسْتَفْعَلَ — the اسْتَـ prefix, meaning to seek or ask for the action, or to consider something to be it: غَفَرَ he forgave → اسْتَغْفَرَ he SOUGHT forgiveness · اسْتَكْبَرَ he considered himself great, was arrogant · اسْتَعَانَ he sought help. Masdar: اسْتِفْعَال (اسْتِغْفَار).",
  "whyItMatters": "اسْتَـ is three letters bolted on the front, so it is the most visible of all the forms — and it covers a cluster of very high-frequency Quranic verbs.",
  "canDo": "After this lesson you can spot Form X (اسْتَفْعَلَ) verbs in the Qur’an, pull out their three-letter root, and understand the added meaning of “seeking/asking for” or “considering oneself/it to be” that action.",
  "rule": "Form X adds the very visible prefix اسْتَـ to the front of a root: اسْتَفْعَلَ. Most often it means to seek/ask for the base meaning (غَفَرَ → اسْتَغْفَرَ “seek forgiveness”), and sometimes it means to consider oneself/it to be that quality (كَبُرَ/كَبِير → اسْتَكْبَرَ “act proud/consider oneself great”). The verbal noun (maṣdar) is usually اسْتِفْعَال (اسْتِغْفَار).",
  "why": [
   "Prevents reading ٱسْتَغْفِرُوا۟ as simply “forgive” (غَفَرَ) instead of “seek forgiveness,” which changes who is doing what.",
   "Prevents missing the moral meaning in ٱسْتَكْبَرُوا۟: it is not “became big” but “arrogantly saw themselves as great.”",
   "Prevents losing track of a command: ٱسْتَغْفِرْ is an instruction to request forgiveness, often with attached pronouns and prepositions (لِـ, ـهُ).",
   "Prevents mis-parsing long words: once you see اسْتَـ, you stop searching for the root in the wrong place."
  ],
  "pattern": {
   "caption": "Form X (اسْتَفْعَلَ): the اسْتَـ prefix + the same root you already know",
   "columns": [
    "Form I (basic idea)",
    "Form X (اسْتَـ added)",
    "Typical meaning shift"
   ],
   "rows": [
    [
     "غَفَرَ (forgave)",
     "ٱسْتَغْفَرَ (sought forgiveness)",
     "ask/seek the action"
    ],
    [
     "عَانَ / عَوْن (help)",
     "ٱسْتَعَانَ (sought help)",
     "ask/seek help"
    ],
    [
     "كَبُرَ / كَبِير (great)",
     "ٱسْتَكْبَرَ (was arrogant)",
     "consider oneself great"
    ],
    [
     "…root meaning",
     "اسْتَ + root verb",
     "“try to get/claim” that meaning"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱسْتَغْفِرُوا۟",
    "blocks": [
     {
      "text": "ٱسْتَ",
      "role": "verbPrefix",
      "gloss": "seek/ask"
     },
     {
      "text": "غْفِر",
      "role": "root",
      "gloss": "forgive (root)"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "you all"
     }
    ],
    "note": "The prefix is everything up to تَ; the root begins right after it (here: غ-ف-ر), and وا۟ marks “you (plural)” on the verb."
   },
   {
    "word": "ٱسْتَغْفِرِ",
    "blocks": [
     {
      "text": "ٱسْتَ",
      "role": "verbPrefix",
      "gloss": "seek/ask"
     },
     {
      "text": "غْفِر",
      "role": "root",
      "gloss": "forgive (root)"
     },
     {
      "text": "ِ",
      "role": "verbSuffix",
      "gloss": "you (m.)"
     }
    ],
    "note": "In Qur’anic spelling the “you (singular)” command can appear without a big visible ending; the key recognition is still اسْتَ + root."
   },
   {
    "word": "سَأَسْتَغْفِرُ",
    "blocks": [
     {
      "text": "سَ",
      "role": "verbPrefix",
      "gloss": "will/soon"
     },
     {
      "text": "أَ",
      "role": "verbPrefix",
      "gloss": "I"
     },
     {
      "text": "سْتَ",
      "role": "verbPrefix",
      "gloss": "seek/ask"
     },
     {
      "text": "غْفِر",
      "role": "root",
      "gloss": "forgive (root)"
     },
     {
      "text": "ُ",
      "role": "verbSuffix",
      "gloss": "present"
     }
    ],
    "note": "Multiple prefixes can stack: first سَ (future), then أَ (I), then the Form X marker (here written as سْتَ because it is inside the word)."
   },
   {
    "word": "ٱسْتَكْبَرُوا۟",
    "blocks": [
     {
      "text": "ٱسْتَ",
      "role": "verbPrefix",
      "gloss": "consider oneself"
     },
     {
      "text": "كْبَر",
      "role": "root",
      "gloss": "great (root)"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they"
     }
    ],
    "note": "Form X is easy to see; don’t let the meaning drift to physical “bigness”—in context it often signals arrogance."
   }
  ],
  "examples": [
   {
    "arabic": "وَٱسْتَغْفِرُوا۟ ٱللَّهَ",
    "ref": "2:199",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱسْتَغْفِرُوا۟",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهَ",
      "role": "plain"
     }
    ],
    "literal": "and seek-forgiveness Allah",
    "smooth": "And seek Allah’s forgiveness.",
    "whatChanged": "This shows the core Form X command in the plural (ـوا۟), where اسْتَـ clearly signals “seek,” not “do” the root meaning."
   },
   {
    "arabic": "وَٱسْتَغْفِرِ ٱللَّهَ",
    "ref": "4:106",
    "surah": "Sūrat An-Nisaa",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱسْتَغْفِرِ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهَ",
      "role": "plain"
     }
    ],
    "literal": "and seek-forgiveness Allah",
    "smooth": "And seek forgiveness from Allah.",
    "whatChanged": "This is the same Form X idea but addressed to one person (singular command), so you learn not to rely only on ـوا۟ to recognize it."
   },
   {
    "arabic": "سَأَسْتَغْفِرُ لَكَ رَبِّىٓ",
    "ref": "19:47",
    "surah": "Sūrat Maryam",
    "segments": [
     {
      "text": "سَ",
      "role": "verbPrefix"
     },
     {
      "text": "أَ",
      "role": "verbPrefix"
     },
     {
      "text": "سْتَغْفِرُ",
      "role": "plain"
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
      "text": "كَ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "رَبِّىٓ",
      "role": "plain"
     }
    ],
    "literal": "will I-seek-forgiveness for-you my-Lord",
    "smooth": "I will ask my Lord to forgive you.",
    "whatChanged": "This adds stacked prefixes (سَ + أَ) before the Form X verb, and it shows the common companion phrase لَكَ (“for you”)."
   },
   {
    "arabic": "وَٱسْتَغْفِرْهُ",
    "ref": "110:3",
    "surah": "Sūrat An-Nasr",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱسْتَغْفِرْ",
      "role": "plain"
     },
     {
      "text": "هُ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and seek-forgiveness-him",
    "smooth": "And seek His forgiveness.",
    "whatChanged": "This shows an attached object pronoun (ـهُ) directly on the Form X verb: you are seeking forgiveness from/with respect to Him."
   },
   {
    "arabic": "وَٱسْتَكْبَرُوا۟ عَنْهَآ",
    "ref": "7:36",
    "surah": "Sūrat Al-A'raaf",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱسْتَكْبَرُوا۟",
      "role": "plain"
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
      "text": "هَآ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "and they-were-arrogant away-from-it",
    "smooth": "And they acted arrogantly toward it / turned away from it in pride.",
    "whatChanged": "This shows the second major meaning of Form X: not “seeking,” but “claiming/considering oneself,” and it appears with a preposition (عَنْهَآ)."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse Form X اسْتَـ with the future particle سَـ",
    "example": "سَأَسْتَغْفِرُ",
    "note": "Here سَ means “will/soon,” but the seeking meaning comes from the Form X part inside the word (…سْتَ…). Look for the full sequence that signals Form X, not just a single س."
   },
   {
    "claim": "Don’t reduce ٱسْتَغْفَرَ to “forgave”",
    "example": "ٱسْتَغْفِرُوا۟",
    "note": "غَفَرَ would mean he forgave; ٱسْتَغْفَرَ means he asked for forgiveness. In commands it is almost always “seek/ask forgiveness,” not “forgive someone else.”"
   },
   {
    "claim": "Don’t translate ٱسْتَكْبَرُوا۟ as “became big”",
    "example": "ٱسْتَكْبَرُوا۟",
    "note": "The root points to greatness, but Form X commonly signals arrogance: they treated themselves as great. Context often includes rejection, pride, and turning away."
   }
  ],
  "checklist": [
   "Scan for the opening cluster اسْتَـ at the start of a verb (very visible on the page).",
   "After اسْتَـ, extract the three root letters that remain (ignore prefixes/suffixes you already know).",
   "Ask: does the context fit “seeking/asking for X” (common with forgiveness/help), or “considering oneself X” (common with arrogance)?",
   "Look for attached pronouns (ـهُ, ـهَآ) or prepositions nearby (لِـ, عَنْ) that complete the meaning.",
   "If you see extra prefixes before it (like سَـ for future, أَـ for “I”), don’t panic—keep hunting for the Form X marker inside the word.",
   "Mentally link the verb to its maṣdar family: اسْتِفْعَال (e.g., اسْتِغْفَار) so repeated vocabulary becomes instantly recognizable."
  ],
  "summary": [
   "Rule: اسْتَـ on the front usually means “seek/ask for” the root action, and sometimes “consider oneself/act as” the root quality.",
   "What it looks like: a long, obvious beginning اسْتَـ attached to a familiar three-letter root, plus normal verb endings/pronouns.",
   "What you can now do: recognize high-frequency Qur’anic verbs like ٱسْتَغْفَرَ and ٱسْتَكْبَرَ and translate their extra meaning instead of flattening them to Form I."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to (1) spot Form X, (2) identify the root, and (3) choose whether it means “seek/ask for” or “consider oneself” in context."
 },
 {
  "id": "q-participles",
  "n": 30,
  "title": "The doer and the done-to",
  "stage": "Meaning from patterns",
  "level": "B2",
  "structure": "ACTIVE participle (اسم الفاعل) — the one doing it: فَاعِل from Form I (كَاتِب writer، عَالِم knower)، and مُـ + present stem from the rest (مُؤْمِن believer، مُسْلِم one who submits، مُسْتَغْفِر one seeking forgiveness). PASSIVE participle (اسم المفعول) — the one it is done to: مَفْعُول (مَكْتُوب written، مَعْلُوم known) and مُـ + a fathah (مُبَارَك blessed).",
  "whyItMatters": "A huge share of the Qur'an's vocabulary for people — believer, disbeliever, wrongdoer, guided — is participles. Read the pattern and the word explains itself.",
  "canDo": "After this lesson you can recognize “the doer” and “the done-to” words in Qur’anic Arabic (active and passive participles) and use their patterns to understand who is acting and who is affected.",
  "rule": "A participle is a noun built from a verb that points to a person described by that verb. The active participle (اسم الفاعل) means “the one doing it”: Form I is فَاعِل, while Forms II–X usually begin with مُـ. The passive participle (اسم المفعول) means “the one it is done to”: Form I is مَفْعُول, while many non‑Form‑I passives begin with مُـ and often show a fatḥah on the second-to-last pattern vowel (e.g., مُبَارَك).",
  "why": [
   "Prevents misreading people-words as verbs: e.g., ٱلْمُؤْمِنُونَ is “the believers” (a noun), not “they believe” (a verb).",
   "Prevents missing the subject in nominal sentences: many ayāt state “X are Y” using participles as X or Y.",
   "Prevents confusing identity vs action in context: مُسْلِمِينَ can describe who someone is, not what they are doing in that moment.",
   "Helps you infer meaning from pattern when the root is familiar: once you spot مُـ + pattern, you can often guess “one who does/seeks/receives …”."
  ],
  "pattern": {
   "caption": "Two participle jobs: doer (active) vs done-to (passive). Learn the common Qur’anic shapes.",
   "columns": [
    "Type",
    "Common pattern",
    "Example idea"
   ],
   "rows": [
    [
     "Active participle (doer) — Form I",
     "فَاعِل",
     "“one who does” (e.g., كاتب “writer”)"
    ],
    [
     "Active participle (doer) — Forms II–X",
     "مُـ + present stem",
     "مُؤْمِن “believer”; مُسْلِم “one who submits”"
    ],
    [
     "Passive participle (done-to) — Form I",
     "مَفْعُول",
     "“thing done” (e.g., مكتوب “written”)"
    ],
    [
     "Passive participle (done-to) — many non‑Form‑I",
     "مُـ + (often) fatḥah in the pattern",
     "مُبَارَك “blessed” (done to: blessed by Allah)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلْمُؤْمِنُونَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "مُؤْمِن",
      "role": "root",
      "gloss": "believing one"
     },
     {
      "text": "ونَ",
      "role": "nounEnding",
      "gloss": "plural (nom.)"
     }
    ],
    "note": "The participle core is مُؤْمِن; the ending ونَ marks “they/the ones …” as a nominative plural."
   },
   {
    "word": "مُسْلِمِينَ",
    "blocks": [
     {
      "text": "مُسْلِم",
      "role": "root",
      "gloss": "submitting ones"
     },
     {
      "text": "ينَ",
      "role": "nounEnding",
      "gloss": "plural (obl.)"
     }
    ],
    "note": "مُسْلِم is the active participle; ينَ is used when the word is not nominative (often after a preposition or as an object)."
   },
   {
    "word": "مُّسْلِمًا",
    "blocks": [
     {
      "text": "مُّسْلِم",
      "role": "root",
      "gloss": "submitting one"
     },
     {
      "text": "ًا",
      "role": "nounEnding",
      "gloss": "indef. (acc.)"
     }
    ],
    "note": "Same participle as above, but singular and indefinite; the ending tells you its sentence-position, not a different dictionary meaning."
   },
   {
    "word": "ذَلُولٌ",
    "blocks": [
     {
      "text": "ذَلُول",
      "role": "plain",
      "gloss": "tamed/tractable"
     },
     {
      "text": "ٌ",
      "role": "nounEnding",
      "gloss": "indef. (nom.)"
     }
    ],
    "note": "Not every descriptive noun is a participle; this is an adjective-like word describing the cow, so do not force مُـ/فَاعِل/مَفْعُول patterns onto it."
   }
  ],
  "examples": [
   {
    "arabic": "لَّا يَتَّخِذِ ٱلْمُؤْمِنُونَ",
    "ref": "3:28",
    "surah": "Sūrat Aal-i-Imraan",
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
      "text": "يَتَّخِذِ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْمُؤْمِنُونَ",
      "role": "plain"
     }
    ],
    "literal": "do-not take the-believers",
    "smooth": "The believers must not take …",
    "whatChanged": "You see an active participle used as the subject (“the believers”), even though the verse also contains a real verb (يَتَّخِذِ)."
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
      "text": "غَالِبَ",
      "role": "plain"
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
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "then-no overpowering-one for-you(pl.)",
    "smooth": "… then no one can overcome you.",
    "whatChanged": "This shows the Form I active participle shape فَاعِل (غَالِب) meaning “one who overcomes,” functioning like “an overcomer.”"
   },
   {
    "arabic": "أُو۟لَٰٓئِكَ هُمُ ٱلْمُؤْمِنُونَ",
    "ref": "8:4",
    "surah": "Sūrat Al-Anfaal",
    "segments": [
     {
      "text": "أُو۟لَٰٓئِكَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "هُمُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْمُؤْمِنُونَ",
      "role": "plain"
     }
    ],
    "literal": "those they the-believers",
    "smooth": "Those are the believers.",
    "whatChanged": "A participle can be the predicate in a nominal sentence: “Those” = “the believers” (identity, not an action-time verb)."
   },
   {
    "arabic": "إِلَىٰ عَٰلِمِ ٱلْغَيْبِ",
    "ref": "9:105",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "إِلَىٰ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَٰلِمِ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْغَيْبِ",
      "role": "plain"
     }
    ],
    "literal": "to knower(of) the-unseen",
    "smooth": "… to the Knower of the unseen …",
    "whatChanged": "Another Form I active participle (عَٰلِم) shows “the one who knows,” and it appears inside an iḍāfah (“Knower of …”)."
   },
   {
    "arabic": "حَنِيفًۭا مُّسْلِمًۭا",
    "ref": "3:67",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "حَنِيفًۭا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُّسْلِمًۭا",
      "role": "plain"
     }
    ],
    "literal": "inclining-upright (as) submitting-one",
    "smooth": "… upright, one who submits …",
    "whatChanged": "A مُـ participle can be singular and indefinite, used as a description; it is still a “doer/one characterized by the verb,” not a tense-marked verb."
   },
   {
    "arabic": "مُسَلَّمَةٌۭ لَّا شِيَةَ",
    "ref": "2:71",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "مُسَلَّمَةٌۭ",
      "role": "plain"
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
      "text": "شِيَةَ",
      "role": "plain"
     }
    ],
    "literal": "delivered/unblemished no mark",
    "smooth": "… sound/unblemished, with no mark …",
    "whatChanged": "This gives a clear passive participle feel: the cow is described as having a state “done to it” (made sound/cleared), not as an agent doing an action."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse an active participle with a present-tense verb just because both can start with مُـ/يـ patterns in your mind.",
    "example": "ٱلْمُؤْمِنُونَ",
    "note": "ٱلْمُؤْمِنُونَ is a noun meaning “the believers.” A present verb would carry verb-marking you already know (prefixes like يـ/تـ/نـ/أ) and behaves like a verb in the sentence."
   },
   {
    "claim": "Don’t confuse a participle’s plural ending with part of the root.",
    "example": "مُسْلِمِينَ",
    "note": "The meaning core is مُسْلِم (root idea: submit). ينَ is just an ending showing grammar position; it does not belong to the three-letter root."
   },
   {
    "claim": "Don’t assume every مُـ word is active; some are passive/state descriptions.",
    "example": "مُسَلَّمَةٌۭ",
    "note": "Context decides whether it’s “doing” or “done-to.” Here it describes the cow’s condition, so it reads like a passive/state participle (“made sound/cleared”)."
   }
  ],
  "checklist": [
   "When you see a people-word, ask: is it a noun describing someone (often a participle) rather than a verb?",
   "Look for Form I active shape فَاعِل (like غَالِب, عَٰلِم): an ā after the first root letter is a strong visual clue.",
   "Look for مُـ at the start: often an active participle from Forms II–X (like مُؤْمِن, مُسْلِم).",
   "Check the ending: ونَ / ينَ / ًا / ٌ helps you see whether it’s singular/plural and how it fits the sentence; it does not change the basic participle meaning.",
   "Use nearby structure: in “X هُمُ Y” or “إِنَّمَا X …” the X/Y are usually nouns—participles are common there.",
   "If the word describes a state/condition of something (like a cow), consider a passive participle reading (“done-to / made …”)."
  ],
  "summary": [
   "Rule: participles are nouns built from verbs; active = doer, passive = done-to.",
   "Look: Form I active often looks like فَاعِل; many non‑Form‑I actives start with مُـ; passives can look like مَفْعُول or مُـ patterns used as states.",
   "Now: when you meet words like ٱلْمُؤْمِنُونَ, مُسْلِمِينَ, غَالِبَ, عَٰلِمِ, you can label them as describing “who” rather than “what tense,” and read the sentence roles more confidently."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether a highlighted word is an active participle (doer) or a passive/state participle (done-to), using only the visible pattern and context."
 },
 {
  "id": "q-noun-patterns",
  "n": 31,
  "title": "Where, when, and what with",
  "stage": "Meaning from patterns",
  "level": "B2",
  "structure": "مَفْعَل / مَفْعِل — the place or time of the action: مَسْجِد place of prostration · مَشْرِق place of sunrise · مَوْعِد appointed time. مِفْعَال / مِفْعَل — the instrument: مِفْتَاح key · مِيزَان scales. فَعِيل — an intensified quality: عَلِيم all-knowing · رَحِيم most merciful. فَعَّال — one who does it constantly: غَفَّار ever-forgiving.",
  "whyItMatters": "The divine names are mostly فَعِيل and فَعَّال. Reading the template tells you not just the meaning but its intensity.",
  "canDo": "After this lesson you can recognize common Qur’anic noun templates that signal (1) where/when an action happens, (2) the instrument used, and (3) an intensified or constant quality—especially in Allah’s Names—so you read the meaning and its strength more accurately.",
  "rule": "Arabic often encodes “what kind of thing” a word is by its template (pattern), not only by its root. مَفْعَل / مَفْعِل commonly names the place or time connected to an action; مِفْعَال / مِفْعَل commonly names an instrument; فَعِيل and فَعَّال commonly express strong qualities (often Divine Names). When you spot the template, you can anticipate the category of meaning even before you fully parse the sentence.",
  "why": [
   "Prevents reading place/time words as random vocabulary: you’ll instantly read ٱلْمَسْجِد as “place of sujūd” (prostration) rather than an unconnected label.",
   "Prevents under-translating Divine Names: عَلِيم is not merely “knowing” but an intensified, established quality (“All-Knowing”).",
   "Prevents missing contrast and scope: ٱلْمَشْرِق / ٱلْمَغْرِب are not just “east/west” but cosmic ‘sunrise/sunset’ directions tied to the فعل of rising/setting.",
   "Prevents category confusion in reading: you will not mistake an instrument-template (like ‘key/scales’) for a place-template just because the letters look similar."
  ],
  "pattern": {
   "caption": "Templates that tell you: place/time, instrument, intensified quality, constant doer",
   "columns": [
    "Template",
    "Typical meaning",
    "Qur’anic example from today"
   ],
   "rows": [
    [
     "مَفْعِل",
     "place/time of the action (often ‘where it happens’)",
     "ٱلْمَسْجِدِ (place of sujūd)"
    ],
    [
     "مَفْعِل",
     "place/time of the action",
     "ٱلْمَشْرِقُ (place/time of rising)"
    ],
    [
     "فَعِيل",
     "intensified / firmly-established quality",
     "عَلِيمٌ (All-Knowing)"
    ],
    [
     "فَعِيل",
     "intensified quality (often mercy/attribute)",
     "ٱلرَّحِيمِ (The Especially Merciful)"
    ],
    [
     "فَعِيل",
     "intensified quality",
     "ٱلسَّمِيعُ / ٱلْبَصِيرُ (All-Hearing / All-Seeing)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلْمَسْجِدِ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "مَسْجِد",
      "role": "root",
      "gloss": "place of sujūd"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "of/at (i)"
     }
    ],
    "note": "The template is مَفْعِل: مَـ + سْ + جِ + د. The final kasrah here is the case ending because it is after مِنَ in the verse."
   },
   {
    "word": "ٱلْمَشْرِقُ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "مَشْرِق",
      "role": "root",
      "gloss": "place of rising"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "(u) ending"
     }
    ],
    "note": "مَفْعِل again: it points you toward a ‘where/when’ meaning tied to the root (here: rising)."
   },
   {
    "word": "عَلِيمٌ",
    "blocks": [
     {
      "text": "عَلِيم",
      "role": "root",
      "gloss": "all-knowing"
     },
     {
      "text": "ٌ",
      "role": "nounEnding",
      "gloss": "(un) ending"
     }
    ],
    "note": "فَعِيل is an intensified quality. The tanwīn (ٌ) is a grammatical ending; the strength comes from the template itself."
   },
   {
    "word": "ٱلرَّحِيمِ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "رَّحِيم",
      "role": "root",
      "gloss": "especially merciful"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "of (i)"
     }
    ],
    "note": "This is فَعِيل with الْ. In بِسْمِ ٱللَّهِ ... it appears in a chain, so you see an i-ending."
   }
  ],
  "examples": [
   {
    "arabic": "عِندَ ٱلْمَسْجِدِ ٱلْحَرَامِ",
    "ref": "9:7",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "عِندَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْمَسْجِدِ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْحَرَامِ",
      "role": "plain"
     }
    ],
    "literal": "at the-prostration-place the-sacred",
    "smooth": "at the Sacred Mosque",
    "whatChanged": "This introduces مَفْعِل as a ‘place of the action’ word: مسجد is literally the place of sujūd (prostration)."
   },
   {
    "arabic": "مِّنَ ٱلْمَسْجِدِ ٱلْحَرَامِ",
    "ref": "17:1",
    "surah": "Sūrat Al-Israa",
    "segments": [
     {
      "text": "مِّنَ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْمَسْجِدِ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْحَرَامِ",
      "role": "plain"
     }
    ],
    "literal": "from the-prostration-place the-sacred",
    "smooth": "from the Sacred Mosque",
    "whatChanged": "Now the same place-word appears after a preposition (مِنَ), helping you expect a ‘from a place’ meaning rather than treating مسجد as just a name."
   },
   {
    "arabic": "لِيَدْخُلُوا۟ ٱلْمَسْجِدَ",
    "ref": "17:7",
    "surah": "Sūrat Al-Israa",
    "segments": [
     {
      "text": "لِ",
      "role": "particle"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "دْخُل",
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
      "text": "ٱلْمَسْجِدَ",
      "role": "root"
     }
    ],
    "literal": "so-that they-enter the-prostration-place",
    "smooth": "so that they may enter the mosque",
    "whatChanged": "You see the place-word functioning as the destination/object of ‘enter’—a quick confirmation that مسجد is a location-noun built on a place template."
   },
   {
    "arabic": "وَلِلَّهِ ٱلْمَشْرِقُ وَٱلْمَغْرِبُ",
    "ref": "2:115",
    "surah": "Sūrat Al-Baqara",
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
      "text": "لَّهِ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْمَشْرِقُ",
      "role": "root"
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
      "text": "ٱلْمَغْرِبُ",
      "role": "plain"
     }
    ],
    "literal": "and to-Allah the-rising-place and the-setting-place",
    "smooth": "And to Allah belong the east and the west.",
    "whatChanged": "This adds another مَفْعِل place-word (ٱلْمَشْرِقُ): recognizing the template helps you read it as a ‘direction/place tied to rising’ (sunrise)."
   },
   {
    "arabic": "إِنَّ ٱللَّهَ عَلِيمٌ حَكِيمٌۭ",
    "ref": "9:28",
    "surah": "Sūrat At-Tawba",
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
      "text": "ٱللَّهَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَلِيمٌ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "حَكِيمٌۭ",
      "role": "plain"
     }
    ],
    "literal": "indeed Allah (is) all-knowing, all-wise",
    "smooth": "Indeed Allah is All-Knowing, All-Wise.",
    "whatChanged": "This shifts from ‘place templates’ to a Divine-Name style template: فَعِيل (عَلِيم) signals an intensified, established attribute."
   },
   {
    "arabic": "ٱلسَّمِيعُ ٱلْبَصِيرُ",
    "ref": "17:1",
    "surah": "Sūrat Al-Israa",
    "segments": [
     {
      "text": "ٱلسَّمِيعُ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْبَصِيرُ",
      "role": "plain"
     }
    ],
    "literal": "the-all-hearing the-all-seeing",
    "smooth": "the All-Hearing, the All-Seeing.",
    "whatChanged": "You now see multiple Names in the same ‘intensified quality’ style; recognizing this template keeps you from translating them as simple, ordinary adjectives."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the template meaning with the sentence role.",
    "example": "لِيَدْخُلُوا۟ ٱلْمَسْجِدَ",
    "note": "مسجد is a ‘place-word’ by template, but in the sentence it can be an object of a verb (‘enter the mosque’). Template tells category; grammar tells role."
   },
   {
    "claim": "Don’t treat every مـ word as a place/time word.",
    "example": "ٱلْمَشْرِقُ",
    "note": "The initial مـ is a strong hint, but you confirm by the whole pattern (مَفْعِل / مَفْعَل) and context. Not every word starting with م has this meaning."
   },
   {
    "claim": "Don’t flatten فَعِيل into a weak English adjective.",
    "example": "عَلِيمٌ",
    "note": "فَعِيل commonly carries intensity and permanence. In Allah’s Names, it signals an absolute attribute, not a momentary state."
   },
   {
    "claim": "Don’t over-guess instrument meanings when today’s verses don’t show them.",
    "example": "مِفْتَاح",
    "note": "Instrument templates (مِفْعَال / مِفْعَل) exist and are common, but this lesson’s ayah list mainly demonstrates place/time (مَفْعِل) and intensified quality (فَعِيل). Use the pattern awareness, but verify with context."
   }
  ],
  "checklist": [
   "Spot a word beginning with مَـ or مِـ and immediately ask: is this a ‘place/time’ or ‘instrument’ template?",
   "If it looks like مَفْعِل / مَفْعَل, try reading it as “place/time of [root action]” (e.g., مسجد = place of sujūd).",
   "If it looks like فَعِيل (often ending in ـِيم / ـِيع / ـِير shapes), read it as an intensified, established quality—especially if it is about Allah.",
   "Confirm with the local grammar you already know: after مِنَ expect ‘from a place’; after إِلَى expect ‘to a place’; after لِ/عِندَ expect a location/association phrase.",
   "When you meet multiple attributes together (like عَلِيمٌ حَكِيمٌ), treat them as deliberate, weighted descriptors, not casual adjectives."
  ],
  "summary": [
   "Rule: Templates can encode category—place/time (مَفْعَل/مَفْعِل), instrument (مِفْعَال/مِفْعَل), intensified quality (فَعِيل), and constant doer (فَعَّال).",
   "Look: مسجد and مشرق are ‘place’ words; عليم and الرحيم and السميع are ‘intensified attribute’ words.",
   "Now you can read many unfamiliar words with a better first-guess: ‘this is a place/time noun’ or ‘this is an intense attribute,’ improving comprehension of Qur’anic flow and Divine Names."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether a highlighted word is a place/time template (مَفْعَل/مَفْعِل) or an intensified attribute template (فَعِيل), and to choose the best comprehension gloss."
 },
 {
  "id": "q-broken-plurals",
  "n": 32,
  "title": "Plurals that rearrange the word instead of adding to it",
  "stage": "Meaning from patterns",
  "level": "B2",
  "structure": "Arabic often makes a plural by rebuilding the word rather than adding an ending. كِتَاب → كُتُب · رَسُول → رُسُل · نَبِيّ → أَنْبِيَاء · قَلْب → قُلُوب · عَبْد → عِبَاد · عَيْن → عُيُون. The root letters stay in order; the vowels and the extras change around them. Common shapes: أَفْعَال، فُعُول، فِعَال، فُعَل، أَفْعِلَاء.",
  "whyItMatters": "Learners routinely read a broken plural as a singular they half-recognise, and lose the fact that a verse is about many. The root is still visible — that is the way in.",
  "canDo": "After this lesson you can spot when a familiar root has been rebuilt into a “broken plural” and reliably read it as many (not one) while you follow a Qur’anic verse.",
  "rule": "Arabic often makes a plural by rebuilding the word’s inside pattern instead of adding an ending. The root letters stay in the same order, but the vowels (and sometimes extra letters like أ or ي) change around them. When you recognize the root, let the plural pattern tell you “many.”",
  "why": [
   "Prevents reading a broken plural as a half-familiar singular (you recognize the root but miss that the verse is about many).",
   "Prevents wrong subject size: a statement about groups (e.g., messengers) gets misread as about one person.",
   "Helps you track repeated themes: the same root shows up with different plural shapes, so you don’t think it is a new word.",
   "Stops you from forcing “their/his” endings to do the work of plurality when the plural is already inside the word."
  ],
  "pattern": {
   "caption": "Common broken-plural “shapes” you will meet: same root, rebuilt word. (Examples here are vocabulary you’ll meet often, even if not all appear in the verses below.)",
   "columns": [
    "Common shape",
    "Typical look/feel",
    "Example (singular → plural)"
   ],
   "rows": [
    [
     "فُعُل",
     "short, tight plural",
     "رَسُول → رُسُل"
    ],
    [
     "أَفْعَال",
     "often starts with أَ",
     "قَلْب → أَقْلَاب (pattern example)"
    ],
    [
     "فُعُول",
     "often has a long feel with و",
     "قَلْب → قُلُوب"
    ],
    [
     "فِعَال",
     "often has “i” then “ā”",
     "عَبْد → عِبَاد"
    ],
    [
     "أَفْعِلَاء / أَفْعِيَاء",
     "often begins with أَ and ends with اء/ياء",
     "نَبِيّ → أَنْبِيَاء"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلْكِتَٰبِ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the (AL)"
     },
     {
      "text": "كِتَٰب",
      "role": "root",
      "gloss": "book (root)"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "of/with (case)"
     }
    ],
    "note": "This is the singular you already know; in this lesson you will compare it to rebuilt plurals that keep the root (ك ت ب) but change the pattern."
   },
   {
    "word": "رُسُلِهِۦ",
    "blocks": [
     {
      "text": "رُسُل",
      "role": "root",
      "gloss": "messengers (plural)"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "of/with (case)"
     },
     {
      "text": "هِۦ",
      "role": "attachedPronoun",
      "gloss": "his"
     }
    ],
    "note": "Boundary: the broken plural is the whole stem رُسُل; then a normal case vowel; then the glued pronoun."
   },
   {
    "word": "مَفَاتِحُ",
    "blocks": [
     {
      "text": "مَفَاتِح",
      "role": "root",
      "gloss": "keys (plural)"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "(case)"
     }
    ],
    "note": "The root (ف ت ح) is still in order, but the word is rebuilt (not *مِفْتَاح + something*). Treat it as plural from its shape and context."
   },
   {
    "word": "ءَابَآءَكُمْ",
    "blocks": [
     {
      "text": "ءَابَآء",
      "role": "root",
      "gloss": "fathers (plural)"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun",
      "gloss": "your (pl.)"
     }
    ],
    "note": "This plural is rebuilt and irregular-looking; the pronoun كُمْ attaches after the plural stem."
   }
  ],
  "examples": [
   {
    "arabic": "مَلَٰٓئِكَتِهِۦ وَرُسُلِهِۦ",
    "ref": "2:98",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "مَلَٰٓئِكَتِ",
      "role": "plain"
     },
     {
      "text": "هِۦ",
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
      "text": "رُسُلِ",
      "role": "root"
     },
     {
      "text": "هِۦ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "His angels and His messengers",
    "smooth": "…His angels and His messengers…",
    "whatChanged": "You see a classic broken plural رُسُل (from رَسُول) alongside a familiar attached pronoun; the plurality is inside the stem, not in the ending."
   },
   {
    "arabic": "مَفَاتِحُ ٱلْغَيْبِ",
    "ref": "6:59",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "مَفَاتِحُ",
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
      "text": "غَيْبِ",
      "role": "plain"
     }
    ],
    "literal": "keys of the unseen",
    "smooth": "the keys of the unseen",
    "whatChanged": "This shows a rebuilt plural that does not look like “singular + ending”; recognizing the root (فتح) helps you accept “keys” immediately."
   },
   {
    "arabic": "مِّنَ ٱلَّذِينَ أُوتُوا۟ ٱلْكِتَٰبَ",
    "ref": "3:100",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "مِّنَ",
      "role": "preposition"
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
      "text": "أُوتُوا۟",
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
      "text": "كِتَٰبَ",
      "role": "root"
     }
    ],
    "literal": "from those who were given the Book",
    "smooth": "from those who were given the Scripture",
    "whatChanged": "Here you anchor the singular كِتَٰب so that when you meet the root ك ت ب in other rebuilt shapes, you don’t assume it must still mean “a book (one).”"
   },
   {
    "arabic": "مِن نَّبِىٍّ إِلَّآ",
    "ref": "7:94",
    "surah": "Sūrat Al-A'raaf",
    "segments": [
     {
      "text": "مِن",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "نَّبِىٍّ",
      "role": "root"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَّآ",
      "role": "particle"
     }
    ],
    "literal": "any prophet except… (none…except)",
    "smooth": "no prophet…except that…",
    "whatChanged": "This gives you the singular نَبِيّ so you can later recognize its rebuilt plural أَنْبِيَاء when it appears elsewhere: same root order (ن ب أ), new pattern."
   },
   {
    "arabic": "وَجَدتُّمْ عَلَيْهِ ءَابَآءَكُمْ",
    "ref": "43:24",
    "surah": "Sūrat Az-Zukhruf",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "جَدتُّمْ",
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
      "text": "هِ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ءَابَآءَ",
      "role": "root"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "you found upon it your fathers",
    "smooth": "you found your fathers following it",
    "whatChanged": "This shows a broken plural (ءَابَآء) that looks very unlike the singular you may expect; the attached pronoun does not create the plural— it only says whose fathers."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a broken plural with a singular that merely has “their/his” attached",
    "example": "رُسُلِهِۦ",
    "note": "رُسُل is already plural (“messengers”). The هِۦ only means “his.” If you read it as “his messenger,” you shrink the meaning of the phrase."
   },
   {
    "claim": "Don’t assume every plural must end with ـون / ـين",
    "example": "مَفَاتِحُ",
    "note": "Many Qur’anic plurals are internal rebuilds. If you only hunt for ـون / ـين, you will miss plurals constantly and misread group statements as singular."
   },
   {
    "claim": "Don’t treat the initial أَ in a plural as if it were the Form IV verb marker",
    "example": "أَنْبِيَاء",
    "note": "In nouns, أَ can be part of a plural pattern (أَفْعِلَاء/أَفْعِيَاء). Look for verb signs (prefix + tense context) before deciding something is a verb."
   }
  ],
  "checklist": [
   "When you meet a noun you half-recognize, pause and extract the root letters (Lesson 6).",
   "Ask: do the root letters appear in the same order, but the vowels/extra letters look “rearranged”? If yes, suspect a broken plural.",
   "Check the surrounding words: does the meaning want “many” (lists, categories, repeated items, or group statements)?",
   "Don’t rely on endings like ـون/ـين; instead, treat the stem shape itself as the plural marker.",
   "If there is an attached pronoun (ـه، ـهم، ـكم), separate it mentally: pronoun tells “whose,” not “how many.”",
   "Once you decide it is plural, keep that plurality as you read the next clause (verbs/pronouns may refer back to it)."
  ],
  "summary": [
   "Rule: Arabic often pluralizes by rebuilding the word (broken plural) while keeping the root letters in order.",
   "Look: the stem changes shape (sometimes with أَ, sometimes with و/ا/ي inside), and the plural is not an added ending.",
   "Now: you can use the visible root + the new pattern to recognize “many” in real Qur’anic phrases like وَرُسُلِهِۦ and مَفَاتِحُ ٱلْغَيْبِ."
  ],
  "quizBridge": "The quiz will show you Qur’anic snippets and ask you to identify which highlighted noun is a broken plural and what singular root-meaning it comes from."
 },
 {
  "id": "q-case-endings",
  "n": 33,
  "title": "Why words end in ـُ , ـَ and ـِ",
  "stage": "Reading the endings",
  "level": "B1",
  "structure": "The last vowel on a noun tells you its JOB. ـُ (dammah) — the doer: نَصَرَ اللَّهُ. ـَ (fathah) — the one it was done to, or after إِنَّ: إِنَّ اللَّهَ. ـِ (kasrah) — after a preposition, or the second noun of an إضافة: فِي الْبَيْتِ، بَيْتِ اللَّهِ. Recognition only. You never have to produce one.",
  "whyItMatters": "Arabic word order moves freely, so the ending rather than the position tells you who did what to whom. Three vowels are the difference between guessing and reading.",
  "canDo": "After this lesson you can look at the last short vowel on a Qur’anic noun (ـُ / ـَ / ـِ) and recognize its job in the sentence: doer, done-to/after إِنَّ, or after a preposition/inside an إضافة.",
  "rule": "In fully-vowelled Qur’anic Arabic, a noun’s final short vowel often signals its grammatical job. ـُ (dammah) commonly marks the doer (subject). ـَ (fathah) commonly marks the done-to (object) and also the noun after إِنَّ. ـِ (kasrah) commonly appears after a preposition and on the second noun of an إضافة.",
  "why": [
   "Prevents swapping “who did it” and “who it happened to” when Arabic word order differs from English.",
   "Prevents missing that a word is governed by a preposition (and therefore belongs to a “where/with/from/to” phrase).",
   "Prevents breaking an إضافة by mistake: the second noun is often kasrah-marked even though it is not “after a preposition.”",
   "Prevents misreading emphasis structures like إِنَّ by expecting the following noun to look like a normal subject."
  ],
  "pattern": {
   "caption": "Three common noun-endings you will see in the mushaf, and the job they usually signal",
   "columns": [
    "Ending you see",
    "Typical job (recognize only)",
    "Tiny Qur’anic anchor"
   ],
   "rows": [
    [
     "ـُ (dammah)",
     "Doer / subject (the one doing the verb)",
     "وَٱللَّهُ جَعَلَ (16:72)"
    ],
    [
     "ـَ (fathah)",
     "Done-to / object (receives the action)",
     "وَرَزَقَكُم مِّنَ ٱلطَّيِّبَٰتِ (16:72)"
    ],
    [
     "ـَ (fathah)",
     "After إِنَّ (إِنَّ + noun is “indeed…”)",
     "لَوَجَدُوا۟ ٱللَّهَ (4:64)"
    ],
    [
     "ـِ (kasrah)",
     "After a preposition (in/from/to/by…)",
     "بِإِذْنِ ٱللَّهِ (4:64)"
    ],
    [
     "ـِ (kasrah)",
     "Second noun of an إضافة (“X of Y”)",
     "بَرَآءَةٌۭ مِّنَ ٱللَّهِ وَرَسُولِهِۦٓ (9:1)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱللَّهُ",
    "blocks": [
     {
      "text": "ٱللَّه",
      "role": "plain",
      "gloss": "Allah"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "doer mark"
     }
    ],
    "note": "Everything is the word, but the final dammah is the signal you are training your eyes to notice."
   },
   {
    "word": "ٱللَّهَ",
    "blocks": [
     {
      "text": "ٱللَّه",
      "role": "plain",
      "gloss": "Allah"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "after إِنَّ / object"
     }
    ],
    "note": "Same letters, different last vowel: this is why recognition of the last vowel matters."
   },
   {
    "word": "بِإِذْنِ",
    "blocks": [
     {
      "text": "بِ",
      "role": "preposition",
      "gloss": "by/with"
     },
     {
      "text": "إِذْن",
      "role": "plain",
      "gloss": "permission"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "after prep."
     }
    ],
    "note": "The kasrah at the end is the common ‘this noun is governed’ look after a preposition."
   },
   {
    "word": "رَسُولِهِۦٓ",
    "blocks": [
     {
      "text": "رَسُول",
      "role": "plain",
      "gloss": "messenger"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "of… (iḍāfah)"
     },
     {
      "text": "هِۦٓ",
      "role": "attachedPronoun",
      "gloss": "his"
     }
    ],
    "note": "In an إضافة chain, the second noun often shows kasrah; then an attached pronoun can continue the chain."
   }
  ],
  "examples": [
   {
    "arabic": "وَٱللَّهُ جَعَلَ لَكُم",
    "ref": "16:72",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ٱللَّه",
      "role": "plain"
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
      "text": "جَعَلَ",
      "role": "plain"
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
     }
    ],
    "literal": "and + Allah-(doer) + made + for + you(pl.)",
    "smooth": "And Allah made for you…",
    "whatChanged": "This shows the dammah: ٱللَّهُ is marked as the doer even before you think about English word order."
   },
   {
    "arabic": "وَرَزَقَكُم مِّنَ ٱلطَّيِّبَٰتِ",
    "ref": "16:72",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "رَزَقَ",
      "role": "plain"
     },
     {
      "text": "كُم",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مِّنَ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلطَّيِّبَٰت",
      "role": "plain"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     }
    ],
    "literal": "and + he-provided-you + from + the good-things-(after prep.)",
    "smooth": "…and provided you from the good things.",
    "whatChanged": "This adds two recognitions: the object is already ‘you’ as a verb suffix, and the kasrah shows ٱلطَّيِّبَٰتِ is inside a مِنْ phrase."
   },
   {
    "arabic": "لَوَجَدُوا۟ ٱللَّهَ تَوَّابًۭا",
    "ref": "4:64",
    "surah": "Sūrat An-Nisaa",
    "segments": [
     {
      "text": "لَ",
      "role": "particle"
     },
     {
      "text": "وَجَدُوا۟",
      "role": "plain"
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
      "text": "َ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "تَوَّاب",
      "role": "plain"
     },
     {
      "text": "ًۭا",
      "role": "nounEnding"
     }
    ],
    "literal": "surely + they-would-find + Allah-(fathah) + accepting-repentance-(as predicate)",
    "smooth": "They would have found Allah accepting of repentance…",
    "whatChanged": "This shows a clear fathah on ٱللَّهَ: here it is not the doer—its ending helps you avoid reading it as the subject."
   },
   {
    "arabic": "لِيُطَاعَ بِإِذْنِ ٱللَّهِ",
    "ref": "4:64",
    "surah": "Sūrat An-Nisaa",
    "segments": [
     {
      "text": "لِ",
      "role": "particle"
     },
     {
      "text": "يُطَاعَ",
      "role": "plain"
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
      "text": "إِذْن",
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
      "text": "ٱللَّه",
      "role": "plain"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     }
    ],
    "literal": "so-that + he-is-obeyed + by/with + permission-(kasrah) + of Allah-(kasrah)",
    "smooth": "…so that he may be obeyed by Allah’s permission.",
    "whatChanged": "This shows kasrah stacking: بِإِذْنِ is kasrah because of بِ, and ٱللَّهِ is kasrah because it is the second noun in ‘permission of Allah’."
   },
   {
    "arabic": "بَرَآءَةٌۭ مِّنَ ٱللَّهِ وَرَسُولِهِۦٓ",
    "ref": "9:1",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "بَرَآءَة",
      "role": "plain"
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
      "text": "مِّنَ",
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
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "رَسُول",
      "role": "plain"
     },
     {
      "text": "ِ",
      "role": "nounEnding"
     },
     {
      "text": "هِۦٓ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "disavowal-(noun ending) + from + Allah-(kasrah) + and + messenger-(kasrah) + his",
    "smooth": "A disavowal from Allah and His Messenger…",
    "whatChanged": "This example makes you track two kasrahs for two different reasons: ٱللَّهِ is after مِنَ, while رَسُولِهِۦٓ is the second term of an إضافة with a pronoun attached."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse ‘kasrah = after a preposition’ with ‘kasrah = second noun of an إضافة.’",
    "example": "بِإِذْنِ ٱللَّهِ",
    "note": "Here the first kasrah (إِذْنِ) is because of بِ. The second kasrah (ٱللَّهِ) is because it completes ‘permission of Allah’ (an إضافة). Same vowel, different trigger."
   },
   {
    "claim": "Don’t assume ٱللَّهُ and ٱللَّهَ are different words.",
    "example": "وَٱللَّهُ / ٱللَّهَ",
    "note": "The consonants are identical. The last vowel is doing grammar work. Train your eye: same noun, different job in the sentence."
   },
   {
    "claim": "Don’t treat the final vowel as ‘decoration’ you can ignore when meaning is at stake.",
    "example": "ٱللَّهُ جَعَلَ / لَوَجَدُوا۟ ٱللَّهَ",
    "note": "Ignoring the ending makes you guess who is acting. The Qur’an often relies on these endings because word order can shift for emphasis."
   }
  ],
  "checklist": [
   "When you meet a noun, pause on the last mark: ـُ or ـَ or ـِ (ignore long vowels like ـا/ـو/ـي; you’re hunting the tiny final short vowel).",
   "If the noun ends in ـِ, look immediately to the left: is there a preposition like بِ or مِنَ? If yes, read it as part of that prepositional phrase.",
   "If the noun ends in ـِ but there is no preposition right before it, check if it is the second term in an إضافة (a “X of Y” structure).",
   "If the noun ends in ـُ, tentatively label it ‘doer/subject’ and see which verb it naturally matches nearby.",
   "If the noun ends in ـَ, ask: is it receiving the action (object), or is it the noun after إِنَّ (which you learned earlier)?",
   "Use the ending to resist English word-order instincts: let the vowel tell you the role first, then fit the translation."
  ],
  "summary": [
   "Rule: the final short vowel on many Qur’anic nouns signals their job—ـُ for doer, ـَ for done-to/after إِنَّ, ـِ after prepositions or as the second noun of an إضافة.",
   "What it looks like: the same noun may appear with different endings (ٱللَّهُ / ٱللَّهَ / ٱللَّهِ) because the grammar role changed, not the meaning of the noun itself.",
   "What you can now do: track ‘who did what to whom’ and where/with/from/to phrases more reliably, even when Arabic word order feels unfamiliar."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether a highlighted noun ending is marking doer (ـُ), done-to/after إِنَّ (ـَ), or after a preposition/inside an إضافة (ـِ)."
 },
 {
  "id": "q-sound-plurals-dual",
  "n": 34,
  "title": "Plural and dual endings that change with the case",
  "stage": "Reading the endings",
  "level": "B2",
  "structure": "Sound masculine plural: ـُونَ as the doer (الْمُسْلِمُونَ), ـِينَ everywhere else (الْمُسْلِمِينَ). Dual: ـَانِ as the doer, ـَيْنِ everywhere else (رَجُلَانِ / رَجُلَيْنِ). Sound feminine plural: ـَاتٌ / ـَاتٍ. The trap is ـُونَ, which is also the present-tense plural verb ending (يَفْعَلُونَ).",
  "whyItMatters": "One ending, two completely different jobs. Whether ـُونَ is a noun plural or a verb ending decides what the sentence is.",
  "canDo": "After this lesson you can tell when ـُونَ/ـِينَ and ـَانِ/ـَيْنِ (and feminine ـَاتٌ/ـَاتٍ) are noun endings that shift with case—and when ـُونَ is instead a present-tense verb ending—so you don’t misread who is doing the action.",
  "rule": "Sound masculine plural nouns change ending with case: ـُونَ when the word is the doer (subject), and ـِينَ everywhere else. Dual nouns change similarly: ـَانِ as doer, and ـَيْنِ everywhere else. Sound feminine plural often shows ـَاتٌ or ـَاتٍ, and its ending also shifts with case. The dangerous look-alike is ـُونَ: it can be a noun plural ending, or a verb suffix meaning “they do.”",
  "why": [
   "Prevents reading a noun like ٱلْمُؤْمِنِينَ as “the believers (are doing…)” when it is actually the object: “(someone) urges the believers.”",
   "Prevents mistaking يَغْلِبُوا۟ as a noun ending; it is a verb, so the sentence has an action, not just a list of people.",
   "Stops you from treating ـُونَ in a verb as “plural men” (a noun) and missing that it is the verb’s “they” ending.",
   "Helps you use case clues (subject vs after a preposition / after a verb) to decide the role of a word quickly while reading."
  ],
  "pattern": {
   "caption": "Case-sensitive endings you can recognize at sight (focus: reading, not grammar naming).",
   "columns": [
    "Type",
    "When it’s the doer (subject)",
    "Everywhere else (after verbs, after prepositions, after إِنَّ…)"
   ],
   "rows": [
    [
     "Sound masculine plural (ـون/ـين)",
     "ـُونَ (e.g., صَٰبِرُونَ)",
     "ـِينَ (e.g., ٱلْمُؤْمِنِينَ)"
    ],
    [
     "Dual (ـان/ـين)",
     "ـَانِ (not in today’s verses)",
     "ـَيْنِ (e.g., مِا۟ئَتَيْنِ)"
    ],
    [
     "Sound feminine plural (ـات)",
     "often ـَاتٌ (not in today’s snippets)",
     "often ـَاتٍ (not in today’s snippets)"
    ],
    [
     "Present-tense verb plural ending",
     "—",
     "ـُونَ / ـُوا۟ = “they do” (e.g., تَعْبُدُونَ / يَغْلِبُوا۟)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلْمُسْلِمُونَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "مُسْلِم",
      "role": "root",
      "gloss": "one who submits"
     },
     {
      "text": "ونَ",
      "role": "nounEnding",
      "gloss": "plural doer"
     }
    ],
    "note": "Everything up to مُسْلِم is the noun; ـونَ is the sound masculine plural ending when this noun is the subject."
   },
   {
    "word": "ٱلْمُؤْمِنِينَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the"
     },
     {
      "text": "مُؤْمِن",
      "role": "root",
      "gloss": "believer"
     },
     {
      "text": "ينَ",
      "role": "nounEnding",
      "gloss": "plural non-subject"
     }
    ],
    "note": "The switch to ـينَ usually tells you this noun is not the doer (often object, or after a preposition, or after إِنَّ)."
   },
   {
    "word": "مِا۟ئَتَيْنِ",
    "blocks": [
     {
      "text": "مِا۟ئَة",
      "role": "plain",
      "gloss": "hundred"
     },
     {
      "text": "يْنِ",
      "role": "nounEnding",
      "gloss": "dual non-subject"
     }
    ],
    "note": "Dual “two” often hides in the ending: ـينِ here signals “two hundred” in a non-subject position."
   },
   {
    "word": "تَعْبُدُونَ",
    "blocks": [
     {
      "text": "تَ",
      "role": "verbPrefix",
      "gloss": "you (pl.)"
     },
     {
      "text": "عْبُد",
      "role": "root",
      "gloss": "worship"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix",
      "gloss": "plural do"
     }
    ],
    "note": "Here ـونَ is not a noun ending at all: it is a verb suffix meaning “you (all) do.”"
   },
   {
    "word": "صَٰبِرُونَ",
    "blocks": [
     {
      "text": "صَٰبِر",
      "role": "root",
      "gloss": "patient, enduring"
     },
     {
      "text": "ونَ",
      "role": "nounEnding",
      "gloss": "plural doer"
     }
    ],
    "note": "No verb-prefix here; the word itself is a plural noun/adjective. The ـونَ points to a subject-like role in its clause."
   }
  ],
  "examples": [
   {
    "arabic": "مِنَّا ٱلْمُسْلِمُونَ",
    "ref": "72:14",
    "surah": "Sūrat Al-Jinn",
    "segments": [
     {
      "text": "مِنَّا ",
      "role": "preposition"
     },
     {
      "text": "ٱلْمُسْلِمُونَ",
      "role": "plain"
     }
    ],
    "literal": "from us / the Muslims (plural-doer ending)",
    "smooth": "Among us are the Muslims.",
    "whatChanged": "Shows ـُونَ on a noun (ٱلْمُسْلِمُونَ): it is a plural noun ending, not a verb ending."
   },
   {
    "arabic": "وَبَشِّرِ ٱلْمُؤْمِنِينَ",
    "ref": "2:223",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "بَشِّرِ ",
      "role": "plain"
     },
     {
      "text": "ٱلْمُؤْمِنِينَ",
      "role": "plain"
     }
    ],
    "literal": "and give-glad-tidings / the believers (plural non-subject ending)",
    "smooth": "And give good news to the believers.",
    "whatChanged": "Shows the same kind of people-word with ـِينَ, signaling it is not the doer here (it is the one being addressed/affected by the verb)."
   },
   {
    "arabic": "عِشْرُونَ صَٰبِرُونَ",
    "ref": "8:65",
    "surah": "Sūrat Al-Anfaal",
    "segments": [
     {
      "text": "عِشْرُونَ ",
      "role": "plain"
     },
     {
      "text": "صَٰبِرُونَ",
      "role": "plain"
     }
    ],
    "literal": "twenty / patient-ones (plural-doer ending)",
    "smooth": "Twenty steadfast ones…",
    "whatChanged": "Gives a clear noun/adjective with ـُونَ where there is no verb-prefix—helping you recognize a true sound masculine plural, not a verb."
   },
   {
    "arabic": "يَغْلِبُوا۟ مِا۟ئَتَيْنِ",
    "ref": "8:65",
    "surah": "Sūrat Al-Anfaal",
    "segments": [
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "غْلِب",
      "role": "root"
     },
     {
      "text": "وا۟ ",
      "role": "verbSuffix"
     },
     {
      "text": "مِا۟ئَتَيْنِ",
      "role": "plain"
     }
    ],
    "literal": "they / overcome / (plural verb) / two hundred (dual non-subject)",
    "smooth": "…they will overcome two hundred.",
    "whatChanged": "Puts the dual ending ـَيْنِ next to a plural verb: you see both systems at once—verb endings vs noun dual endings."
   },
   {
    "arabic": "ٱلَّذِينَ تَعْبُدُونَ",
    "ref": "10:104",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "ٱلَّذِينَ ",
      "role": "plain"
     },
     {
      "text": "تَ",
      "role": "verbPrefix"
     },
     {
      "text": "عْبُد",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "those whom / you (all) / worship / (plural verb ending)",
    "smooth": "…those whom you worship…",
    "whatChanged": "Shows the trap directly: ـُونَ here belongs to a verb (تَعْبُدُونَ), not a plural noun—even though it looks similar."
   },
   {
    "arabic": "يَوْمَ تَرَى ٱلْمُؤْمِنِينَ",
    "ref": "57:12",
    "surah": "Sūrat Al-Hadid",
    "segments": [
     {
      "text": "يَوْمَ ",
      "role": "plain"
     },
     {
      "text": "تَ",
      "role": "verbPrefix"
     },
     {
      "text": "رَى ",
      "role": "plain"
     },
     {
      "text": "ٱلْمُؤْمِنِينَ",
      "role": "plain"
     }
    ],
    "literal": "day / you / see / the believers (plural non-subject ending)",
    "smooth": "On the Day you will see the believers…",
    "whatChanged": "Reinforces that ـِينَ often marks “seen/affected” nouns (objects) after a verb of seeing—helping you assign roles fast."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse ـُونَ on a noun with ـُونَ as a verb ending.",
    "example": "ٱلْمُسْلِمُونَ / تَعْبُدُونَ",
    "note": "If there is a present-tense prefix (يـ / تـ / أ / نـ) before the root, you are likely looking at a verb, and ـونَ is “(they/you all) do.” If there is no verb prefix and the word begins like a noun (often with ٱلـ), ـونَ is probably a plural noun ending."
   },
   {
    "claim": "Don’t treat ـِينَ as “always plural subject.” It usually signals ‘not the doer’.",
    "example": "وَبَشِّرِ ٱلْمُؤْمِنِينَ",
    "note": "In Qur’anic reading, ـينَ is a quick flag: this word is commonly an object, or after a preposition, or after إِنَّ. That changes the sentence structure: someone is acting on them."
   },
   {
    "claim": "Don’t miss the dual hiding in ـَينِ.",
    "example": "مِا۟ئَتَيْنِ",
    "note": "Even when the base word looks singular (مِا۟ئَة), the ending can carry the meaning ‘two’. Spotting ـينِ prevents undercounting in passages about numbers, witnesses, days, etc."
   }
  ],
  "checklist": [
   "Circle every word that ends in ـُونَ, ـِينَ, ـَانِ, or ـَيْنِ while you read a line.",
   "For each ـُونَ word, ask: does it have a present-tense prefix (ي/ت/أ/ن)? If yes, it’s a verb ending; if no, it may be a plural noun ending.",
   "If it is clearly a noun and ends in ـُونَ, expect it to behave like a doer/subject in its clause (especially in a “we/they are…” type of statement).",
   "If it ends in ـِينَ, expect it to be ‘not the doer’: often the object of a verb (like بَشِّرِ) or something governed by a particle/preposition.",
   "If it ends in ـَيْنِ, read “two ___” and look for what role it is playing (often after a verb: what was overcome/seen/given).",
   "When two signals conflict, trust the verb signal first: a verb-prefix plus a verb-suffix means you have an action, even if the ending resembles a noun ending."
  ],
  "summary": [
   "Rule: sound masculine plural nouns switch ـُونَ (doer) vs ـِينَ (elsewhere), and dual nouns switch ـَانِ (doer) vs ـَيْنِ (elsewhere); sound feminine plural often appears with ـَاتٌ/ـَاتٍ.",
   "Look: the key ambiguity is ـُونَ, which can be either a noun plural ending or a present-tense plural verb ending—use the verb-prefix test to decide.",
   "Now you can: identify whether a line is telling you ‘who they are’ (nouns like ٱلْمُسْلِمُونَ) or ‘what they do’ (verbs like تَعْبُدُونَ), and you can spot dual meaning in endings like ـَيْنِ."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to label each ـُونَ/ـِينَ/ـَيْنِ word as noun-ending or verb-ending and decide whether it is the doer or not."
 },
 {
  "id": "q-objects",
  "n": 35,
  "title": "Objects, and verbs that take two",
  "stage": "Reading the endings",
  "level": "B2",
  "structure": "The object carries fathah and usually follows the verb and its subject: خَلَقَ اللَّهُ السَّمَاوَاتِ. Some verbs take TWO objects — giving, teaching, making: آتَيْنَا مُوسَى الْكِتَابَ we gave Moses the Book · عَلَّمَ آدَمَ الْأَسْمَاءَ He taught Adam the names.",
  "whyItMatters": "With two objects and no prepositions to guide you, the endings and the word order are all you have.",
  "canDo": "After this lesson you can spot the direct object (and second object) of a verb in Qur’anic word order by using case endings and position, even when there is no preposition to guide you.",
  "rule": "In a verbal sentence, the verb is often followed by its subject, and then the direct object; the object is usually in the accusative (manṣūb) and often shows a fatḥah (-َ) at the end. Some verbs take TWO direct objects with no preposition between them—commonly verbs of giving, teaching, and making/appointing. When two objects appear, both are manṣūb, and the safest reading is: verb → (subject) → object 1 → object 2 (or object 1 + object 2 together as “what was given/taught/made”).",
  "why": [
   "Prevents swapping “who did it” with “what was done”: misreading the subject as the object when both are nouns.",
   "Prevents missing a second object and under-translating: reading “We gave the Book” and forgetting “to Moses”.",
   "Prevents guessing relationships from meaning alone: the case endings and order are the only reliable markers when no preposition appears.",
   "Prevents treating a second object as a new sentence: you can keep the whole verb package together in one mental bracket."
  ],
  "pattern": {
   "caption": "Objects in Qur’anic verbal sentences: one object vs two objects",
   "columns": [
    "Verb package",
    "What to look for in Arabic",
    "What it means in English"
   ],
   "rows": [
    [
     "فعل + فاعل + مفعول به",
     "Object is manṣūb (often -َ) and usually comes after the subject",
     "“X did Y”"
    ],
    [
     "خَلَقَ + (الذي) + ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ",
     "The created-things are the object(s); coordinated nouns can share the object slot",
     "“He created the heavens and the earth”"
    ],
    [
     "فعل + فاعل + مفعول 1 + مفعول 2",
     "Two nouns/pronouns after the verb are both manṣūb; no preposition is needed",
     "“He gave/taught/assigned someone something”"
    ],
    [
     "ءَاتَيْنَا + مُوسَى + ٱلْكِتَٰبَ",
     "Both مُوسَى and ٱلْكِتَٰبَ are objects: recipient + thing-given",
     "“We gave Moses the Book”"
    ],
    [
     "عَلَّمَ + ءَادَمَ + ٱلْأَسْمَآءَ",
     "Both are objects: person-taught + content-taught",
     "“He taught Adam the names”"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "ٱلْأَرْضَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the (al-)"
     },
     {
      "text": "أَرْض",
      "role": "plain",
      "gloss": "earth/land"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "accusative"
     }
    ],
    "note": "The fatḥah at the end is the key: here it marks the object of خَلَقَ."
   },
   {
    "word": "ٱلسَّمَٰوَٰتِ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the (al-)"
     },
     {
      "text": "سَّمَٰوَٰت",
      "role": "plain",
      "gloss": "heavens (pl.)"
     },
     {
      "text": "ِ",
      "role": "nounEnding",
      "gloss": "genitive"
     }
    ],
    "note": "This ends with kasrah because it is after the preposition فِى in the verse; do not force every “thing” to be an object."
   },
   {
    "word": "ءَاتَيْنَا",
    "blocks": [
     {
      "text": "ءَاتَيْنَا",
      "role": "plain",
      "gloss": "we gave"
     }
    ],
    "note": "Treat the whole verb form as one unit for comprehension; then look immediately after it for one or two objects."
   },
   {
    "word": "مُوسَى",
    "blocks": [
     {
      "text": "مُوسَى",
      "role": "plain",
      "gloss": "Moses"
     }
    ],
    "note": "Often appears as the first object after آتَى: the recipient; it may not show a visible fatḥah due to spelling conventions."
   },
   {
    "word": "ٱلْكِتَٰبَ",
    "blocks": [
     {
      "text": "ٱلْ",
      "role": "plain",
      "gloss": "the (al-)"
     },
     {
      "text": "كِتَٰب",
      "role": "plain",
      "gloss": "Book"
     },
     {
      "text": "َ",
      "role": "nounEnding",
      "gloss": "accusative"
     }
    ],
    "note": "The ending fatḥah marks it as an object; with آتَيْنَا it is typically the second object (the thing given)."
   }
  ],
  "examples": [
   {
    "arabic": "خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ",
    "ref": "10:3",
    "surah": "Sūrat Yunus",
    "segments": [
     {
      "text": "خَلَقَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلسَّمَٰوَٰتِ",
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
      "text": "ٱلْأَرْضَ",
      "role": "plain"
     }
    ],
    "literal": "created the-heavens and-the-earth",
    "smooth": "He created the heavens and the earth.",
    "whatChanged": "This shows a single verb with its created-things as the object slot, including two coordinated nouns (joined by وَ)."
   },
   {
    "arabic": "خَلَقَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضَ",
    "ref": "32:4",
    "surah": "Sūrat As-Sajda",
    "segments": [
     {
      "text": "خَلَقَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلسَّمَٰوَٰتِ",
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
      "text": "ٱلْأَرْضَ",
      "role": "plain"
     }
    ],
    "literal": "created the-heavens and-the-earth",
    "smooth": "Allah created the heavens and the earth.",
    "whatChanged": "Seeing the same snippet in another place trains you not to rely on surrounding words: the object-marking still does the work."
   },
   {
    "arabic": "ءَاتَيْنَا مُوسَى ٱلْكِتَٰبَ",
    "ref": "2:53",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "ءَاتَيْنَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُوسَى",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْكِتَٰبَ",
      "role": "plain"
     }
    ],
    "literal": "we-gave Moses the-Book",
    "smooth": "We gave Moses the Book.",
    "whatChanged": "This introduces a verb that takes two objects: recipient first (مُوسَى), then the thing given (ٱلْكِتَٰبَ)."
   },
   {
    "arabic": "ءَاتَيْنَا مُوسَىٰ وَهَٰرُونَ ٱلْفُرْقَانَ",
    "ref": "21:48",
    "surah": "Sūrat Al-Anbiyaa",
    "segments": [
     {
      "text": "ءَاتَيْنَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُوسَىٰ",
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
      "text": "هَٰرُونَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْفُرْقَانَ",
      "role": "plain"
     }
    ],
    "literal": "we-gave Moses and-Harun the-Criterion",
    "smooth": "We gave Moses and Aaron the Criterion.",
    "whatChanged": "Now the FIRST object is itself a pair (two recipients joined by وَ) while the SECOND object stays a single thing."
   },
   {
    "arabic": "وَءَاتَيْنَا دَاوُۥدَ زَبُورًۭا",
    "ref": "17:55",
    "surah": "Sūrat Al-Israa",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "ءَاتَيْنَا",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "دَاوُۥدَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "زَبُورًۭا",
      "role": "plain"
     }
    ],
    "literal": "and-we-gave David a-Zabur",
    "smooth": "And We gave David the Zabūr.",
    "whatChanged": "This shows the same two-object verb with an indefinite second object (no ٱلْ), reminding you the object rule is about case/position, not definiteness."
   },
   {
    "arabic": "وَعَلَّمَ ءَادَمَ ٱلْأَسْمَآءَ",
    "ref": "2:31",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "عَلَّمَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ءَادَمَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْأَسْمَآءَ",
      "role": "plain"
     }
    ],
    "literal": "and-taught Adam the-names",
    "smooth": "And He taught Adam the names.",
    "whatChanged": "This adds a second common two-object verb: teaching, where the taught-person is object 1 and the taught-content is object 2."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse an object with a noun after a preposition",
    "example": "فِى ٱلسَّمَٰوَٰتِ",
    "note": "A preposition (like فِى) forces the following noun into the جرّ (genitive) case. Even if it names a “thing,” it is not a direct object; it is a prepositional phrase."
   },
   {
    "claim": "Don’t treat the first noun after آتَيْنَا as the subject",
    "example": "ءَاتَيْنَا مُوسَى",
    "note": "In “we gave…,” the subject is already inside the verb (نَا = we). So مُوسَى is not “Moses gave”; it is the recipient object: “(We) gave Moses…”."
   },
   {
    "claim": "Don’t assume وَ always starts a new sentence",
    "example": "وَءَاتَيْنَا دَاوُۥدَ",
    "note": "وَ often just continues the flow: “and…”. Keep reading to see whether the verb still expects objects; stopping early makes you miss the second object."
   }
  ],
  "checklist": [
   "Find the verb first; note whether the subject is already built into the verb (like نَا = “we”).",
   "Look immediately after the verb for nouns/pronouns with accusative signs (often a fatḥah -َ, or tanwīn fatḥah -ً).",
   "If you see TWO noun/pronoun chunks after a verb like ءَاتَى or عَلَّمَ, assume two objects unless a preposition clearly interrupts.",
   "If وَ appears between nouns after the verb, decide whether it is joining recipients (object 1 is a pair) or joining things given/taught (object 2 is a pair).",
   "If a preposition (فِى، مِن، عَلَى، etc.) appears, treat the phrase after it as separate from the object chain.",
   "Translate mentally in a stable order: verb → (subject) → object 1 (recipient/person) → object 2 (thing/content)."
  ],
  "summary": [
   "The rule: the direct object is manṣūb and usually follows the verb and its subject; some verbs take two direct objects with no preposition.",
   "What it looks like: ءَاتَيْنَا مُوسَى ٱلْكِتَٰبَ / وَعَلَّمَ ءَادَمَ ٱلْأَسْمَآءَ—two nouns after the verb, both functioning as objects.",
   "What you can now do: keep your reading accurate when Qur’anic Arabic lists recipient + gift (or student + lesson) without any ‘to/for’ in Arabic."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify which word(s) are object 1 and object 2, and which nouns are not objects because a preposition is present."
 },
 {
  "id": "q-attachment",
  "n": 36,
  "title": "What is \"for\" whom: where a phrase attaches",
  "stage": "Reading the endings",
  "level": "B2",
  "structure": "A prepositional phrase attaches to something — usually the verb, sometimes the noun before it, sometimes standing as the whole predicate: وَلَهُمْ عَذَابٌ أَلِيمٌ is \"and for them is a painful punishment\", where لَهُمْ is the predicate and عَذَابٌ the subject, inverted. A dammah on the noun after it is the clue.",
  "whyItMatters": "The classic misread is treating a prepositional phrase as the subject. This lesson is the antidote to it.",
  "canDo": "After this lesson you can decide what a prepositional phrase (like لَهُمْ / فِى ٱلْءَاخِرَةِ / عَلَيْكُمْ) is attached to, and avoid mistaking it for the subject.",
  "rule": "A prepositional phrase can attach to (1) a verb (telling where/for whom/with what), (2) a noun before it (like an “of/for” relationship), or (3) stand as the whole predicate in a nominal sentence. When the prepositional phrase is the predicate (خَبَر), the noun after it is often the subject (مُبْتَدَأ) and you’ll frequently see it with ḍammah (-ٌ / -ُ), even though it comes later. This is the key to reading phrases like وَلَهُمْ عَذَابٌ أَلِيمٌ correctly: “and for them is a painful punishment.”",
  "why": [
   "Prevents reading لَهُمْ as the subject, which flips the meaning and makes the sentence feel “broken” in English.",
   "Prevents missing that Arabic can invert subject and predicate for emphasis, especially when the predicate is a جارّ ومجرور (preposition + pronoun/noun).",
   "Prevents treating every prepositional phrase as “extra detail” on the nearest noun, when it may actually complete the verb (e.g., يَبْعَثَ عَلَيْكُمْ).",
   "Prevents losing track of “who gets what” in repeated warnings: the phrase “for them” is often the main point, not a side note."
  ],
  "pattern": {
   "caption": "Where the prepositional phrase attaches (and what the case-ending often hints)",
   "columns": [
    "Prepositional phrase",
    "Attaches to…",
    "Meaning you should read"
   ],
   "rows": [
    [
     "وَلَهُمْ عَذَابٌ",
     "predicate of a nominal sentence",
     "And for them is a punishment"
    ],
    [
     "فِى ٱلْءَاخِرَةِ",
     "what they have (nominal predicate) / situation",
     "in the Hereafter"
    ],
    [
     "يَبْعَثَ عَلَيْكُمْ",
     "the verb",
     "send upon you"
    ],
    [
     "خَتَمَ ٱللَّهُ عَلَىٰ قُلُوبِهِمْ",
     "the verb",
     "Allah sealed upon their hearts"
    ],
    [
     "فَيُدْخِلُهُمْ رَبُّهُمْ فِى رَحْمَتِهِۦ",
     "the verb",
     "so their Lord admits them into His mercy"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "لَهُمْ",
    "blocks": [
     {
      "text": "لِـ",
      "role": "preposition",
      "gloss": "for/to"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "them"
     }
    ],
    "note": "Boundary is after the preposition: لِـ + هُمْ becomes لَهُمْ (for them)."
   },
   {
    "word": "عَلَيْكُمْ",
    "blocks": [
     {
      "text": "عَلَىٰ",
      "role": "preposition",
      "gloss": "upon/on"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun",
      "gloss": "you (pl.)"
     }
    ],
    "note": "This is a preposition plus an attached pronoun: it usually completes a verb like يَبْعَثَ."
   },
   {
    "word": "بِمَا",
    "blocks": [
     {
      "text": "بِـ",
      "role": "preposition",
      "gloss": "with/by"
     },
     {
      "text": "مَا",
      "role": "plain",
      "gloss": "what/that"
     }
    ],
    "note": "Read it as one chunk: بِـ attaches to مَا; together they form a prepositional phrase meaning “with what / by what.”"
   },
   {
    "word": "فِيهِمَا",
    "blocks": [
     {
      "text": "فِى",
      "role": "preposition",
      "gloss": "in"
     },
     {
      "text": "هِمَا",
      "role": "attachedPronoun",
      "gloss": "them two"
     }
    ],
    "note": "Preposition + dual attached pronoun: “in them both” (not a subject)."
   }
  ],
  "examples": [
   {
    "arabic": "وَلَهُمْ عَذَابٌ عَظِيمٌۭ",
    "ref": "2:7",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَ",
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
      "text": "عَذَابٌ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَظِيمٌۭ",
      "role": "nounEnding"
     }
    ],
    "literal": "and + for + them + (is) punishment-ٌ + great-ٌ",
    "smooth": "And for them is a tremendous punishment.",
    "whatChanged": "Shows the core pattern: the prepositional phrase (لَهُمْ) is the predicate, and the following noun with ḍammah (عَذَابٌ) is the subject even though it comes later."
   },
   {
    "arabic": "لَا خَلَٰقَ لَهُمْ فِى ٱلْءَاخِرَةِ",
    "ref": "3:77",
    "surah": "Sūrat Aal-i-Imraan",
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
      "text": "خَلَٰقَ",
      "role": "nounEnding"
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
      "text": "ٱلْءَاخِرَةِ",
      "role": "plain"
     }
    ],
    "literal": "no + share-َ + for + them + in + the Hereafter",
    "smooth": "They will have no share in the Hereafter.",
    "whatChanged": "Shows two prepositional phrases in one line: لَهُمْ marks “for them” (who the ruling is about), and فِى ٱلْءَاخِرَةِ adds the setting (“in the Hereafter”)."
   },
   {
    "arabic": "وَلَهُمْ عَذَابٌۭ مُّهِينٌۭ",
    "ref": "3:178",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَ",
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
      "text": "عَذَابٌۭ",
      "role": "nounEnding"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُّهِينٌۭ",
      "role": "nounEnding"
     }
    ],
    "literal": "and + for + them + punishment-ٌ + humiliating-ٌ",
    "smooth": "And for them is a humiliating punishment.",
    "whatChanged": "Reinforces that the inverted nominal pattern repeats across the Qur’an; recognizing it prevents you from re-parsing each time as if it were new."
   },
   {
    "arabic": "أَن يَبْعَثَ عَلَيْكُمْ عَذَابًۭا",
    "ref": "6:65",
    "surah": "Sūrat Al-An'aam",
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
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "بْعَثَ",
      "role": "root"
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
      "text": "كُمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَذَابًۭا",
      "role": "nounEnding"
     }
    ],
    "literal": "that + he-sends + upon + you + punishment-ًا",
    "smooth": "…to send upon you a punishment…",
    "whatChanged": "Shows the other common attachment: the prepositional phrase (عَلَيْكُمْ) completes the verb “send,” not a nominal predicate."
   },
   {
    "arabic": "وَمَا لَهُمْ فِيهِمَا مِن شِرْكٍۢ",
    "ref": "34:22",
    "surah": "Sūrat Saba",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "مَا",
      "role": "particle"
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
      "text": "هِمَا",
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
      "text": "شِرْكٍۢ",
      "role": "nounEnding"
     }
    ],
    "literal": "and not + for + them + in + them two + any/of + partnership-ٍ",
    "smooth": "And they have no share (of partnership) in either of them.",
    "whatChanged": "Shows multiple prepositional phrases stacking: لَهُمْ (“for them”) and فِيهِمَا (“in them both”) are not subjects; they frame where/for whom the negation applies."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse the prepositional phrase with the subject.",
    "example": "وَلَهُمْ عَذَابٌۭ",
    "note": "A common misread is “and for them punishment” as if لَهُمْ were the “doer/thing.” Here, لَهُمْ is the predicate (for them), and عَذَابٌ (with ḍammah) is the subject: “a punishment.”"
   },
   {
    "claim": "Don’t force every prepositional phrase to attach to the nearest noun; it may belong to the verb.",
    "example": "يَبْعَثَ عَلَيْكُمْ",
    "note": "Here عَلَيْكُمْ answers “send upon whom?” It completes the verb. If you attach it to the next noun, you will delay the meaning and lose the verb’s object structure."
   },
   {
    "claim": "Don’t ignore case clues: ḍammah after a prepositional phrase often signals an inverted nominal sentence.",
    "example": "لَهُمْ عَذَابٌ",
    "note": "A preposition normally makes what follows it majrūr (ـِ), but in this pattern the noun after the phrase is not governed by the preposition; it is a new subject, often marked by ḍammah."
   }
  ],
  "checklist": [
   "Circle the prepositional phrase: لِـ / عَلَىٰ / فِى / مِن (and any attached pronoun like ـهُمْ, ـكُمْ).",
   "Ask: is there an explicit verb right before it (like يَبْعَثَ, خَتَمَ, يُدْخِلُ)? If yes, default: the phrase attaches to that verb.",
   "If there is no verb and the line feels like “X is Y” (a nominal sentence), consider the prepositional phrase as the predicate (خَبَر).",
   "Look immediately after the prepositional phrase: if you see a noun with ḍammah (-ٌ / -ُ), treat it as the subject coming after the predicate (inversion).",
   "If multiple prepositional phrases appear, separate their jobs: one may mark “for whom” (لَهُمْ), another may mark “where/when” (فِى ٱلْءَاخِرَةِ, فِيهِمَا).",
   "When stuck, paraphrase in English using “for them / upon you / in it” and see whether it completes a verb or forms the “is …” part of the sentence."
  ],
  "summary": [
   "Rule: a prepositional phrase attaches to something—usually the verb, sometimes it is itself the predicate of a nominal sentence.",
   "Look: when the phrase is the predicate, the next noun often has ḍammah and is the subject, even though it comes later (وَلَهُمْ عَذَابٌ…).",
   "Now you can: read ‘for them is…’ lines correctly and avoid turning a ‘for them’ phrase into the subject."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to identify whether the prepositional phrase attaches to the verb or is the predicate (with the following noun as the subject)."
 },
 {
  "id": "q-conditionals",
  "n": 37,
  "title": "If and when: the condition and what follows from it",
  "stage": "Reading the endings",
  "level": "B2",
  "structure": "إِذَا when (it will happen) · إِنْ if (it may) · لَوْ if (it did not) · لَوْلَا if not for. The shape is two halves: the condition, then the result, often introduced by فَـ. إِذَا جَاءَ نَصْرُ اللَّهِ … فَسَبِّحْ. Whole surahs are built on this frame.",
  "whyItMatters": "Losing track of which half you are in is how a long conditional āyah turns into a list of unconnected images.",
  "canDo": "After this lesson you can spot a Qur’anic conditional frame (condition → result), tell whether it means “when” (إِذَا), “if (maybe)” (إِنْ), “if… (counterfactual)” (لَوْ), or “if not for” (لَوْلَا), and keep track of which half of the āyah you are in.",
  "rule": "Conditional meanings often come in two halves: the condition first, then what follows from it (the result). إِذَا usually points to something expected/when it happens; إِنْ introduces a real possibility/if it happens; لَوْ introduces a contrary-to-fact “if (but it didn’t)”; لَوْلَا means “if not for…”. The result half is often signposted by فَـ (“then/so”).",
  "why": [
   "Prevents reading a long āyah as a list of unrelated actions, when it is actually “if/when X, then Y.”",
   "Prevents flipping the logic: treating the result as a separate statement rather than the consequence of the condition.",
   "Prevents missing the scope of a command: realizing it is triggered by a condition (e.g., “when you are settled, then say…”).",
   "Prevents misreading لَوْ / لَوْلَا as ordinary “if,” missing the counterfactual or “but for” meaning."
  ],
  "pattern": {
   "caption": "Two halves: a trigger (condition) + a consequence (result), often linked by فَـ",
   "columns": [
    "Trigger word",
    "Condition half (what must/does happen)",
    "Result half (what follows, often with فَـ)"
   ],
   "rows": [
    [
     "إِذَا",
     "When/whenever X happens (expected)",
     "then Y (often فَـ + verb/command)"
    ],
    [
     "إِنْ",
     "If X happens (possible)",
     "then Y (often فَـ ...)"
    ],
    [
     "لَوْ",
     "If X had happened (but it did not)",
     "then Y would have happened (but it did not)"
    ],
    [
     "لَوْلَا",
     "If not for X (X prevented something)",
     "then Y would have happened"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "فَإِذَا",
    "blocks": [
     {
      "text": "فَ",
      "role": "particle",
      "gloss": "then/so"
     },
     {
      "text": "إِذَا",
      "role": "particle",
      "gloss": "when"
     }
    ],
    "note": "The فَـ is glued in writing; it often marks the start of the result half (or tightly links to what follows)."
   },
   {
    "word": "إِذَآ",
    "blocks": [
     {
      "text": "إِذَآ",
      "role": "particle",
      "gloss": "when"
     }
    ],
    "note": "This single word launches the condition half; what follows is inside its scope until the result begins."
   },
   {
    "word": "فَإِن",
    "blocks": [
     {
      "text": "فَ",
      "role": "particle",
      "gloss": "then/so"
     },
     {
      "text": "إِن",
      "role": "particle",
      "gloss": "if"
     }
    ],
    "note": "فَـ can appear right before the conditional particle, especially in chained conditionals: “then if…”"
   },
   {
    "word": "لَوْلَا",
    "blocks": [
     {
      "text": "لَوْلَا",
      "role": "particle",
      "gloss": "if not for"
     }
    ],
    "note": "Treat it as one unit: it sets up an unrealized outcome that was prevented by what follows."
   }
  ],
  "examples": [
   {
    "arabic": "وَإِذَا قِيلَ لَهُمْ",
    "ref": "2:11",
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
      "role": "plain"
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
    "literal": "and-when it-was-said to-them",
    "smooth": "And when it is said to them…",
    "whatChanged": "This shows إِذَا launching the condition half as a time-trigger (“when…”), with the rest still inside that frame."
   },
   {
    "arabic": "إِذَآ أَرَدْنَٰهُ أَن",
    "ref": "16:40",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "إِذَآ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَرَدْ",
      "role": "plain"
     },
     {
      "text": "نَٰ",
      "role": "plain"
     },
     {
      "text": "هُ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَن",
      "role": "plain"
     }
    ],
    "literal": "when We-willed-it that",
    "smooth": "When We will it…",
    "whatChanged": "This shows how long the condition can run; إِذَا can govern multiple words before the consequence appears later (don’t exit the frame too early)."
   },
   {
    "arabic": "فَيَكُونُ",
    "ref": "16:40",
    "surah": "Sūrat An-Nahl",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "كُون",
      "role": "root"
     },
     {
      "text": "ُ",
      "role": "nounEnding"
     }
    ],
    "literal": "then it-is",
    "smooth": "then it is (so it happens).",
    "whatChanged": "This isolates the result marker: فَـ can explicitly announce the consequence half after an إِذَا condition."
   },
   {
    "arabic": "فَإِن يَخْرُجُوا۟",
    "ref": "5:22",
    "surah": "Sūrat Al-Maaida",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "إِن",
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
      "text": "خْرُج",
      "role": "root"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix"
     }
    ],
    "literal": "then-if they-go-out",
    "smooth": "So if they leave…",
    "whatChanged": "This shows إِنْ for a real possibility (not guaranteed), and how فَـ can attach to it to continue a chain of reasoning."
   },
   {
    "arabic": "لَوْ كَانُوا۟ يَفْقَهُونَ",
    "ref": "9:81",
    "surah": "Sūrat At-Tawba",
    "segments": [
     {
      "text": "لَوْ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَان",
      "role": "plain"
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
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "فْقَه",
      "role": "root"
     },
     {
      "text": "ونَ",
      "role": "verbSuffix"
     }
    ],
    "literal": "if (but not) they-were understanding",
    "smooth": "If only they understood (but they do not).",
    "whatChanged": "This introduces لَوْ as counterfactual: it points to an unreal condition, often implying blame or regret rather than a real option."
   },
   {
    "arabic": "وَلَوْلَا كَلِمَةٌۭ سَبَقَتْ",
    "ref": "41:45",
    "surah": "Sūrat Fussilat",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "لَوْلَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "كَلِمَةٌۭ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "سَبَقَتْ",
      "role": "plain"
     }
    ],
    "literal": "and-if-not-for a-word preceded",
    "smooth": "And if not for a word that had already come…",
    "whatChanged": "This shows لَوْلَا meaning “but for / if not for,” introducing a prevented outcome (the consequence appears later in the āyah)."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse إِذَا (when) with إِذًۭا (then/at that time).",
    "example": "وَإِذًۭا لَّا",
    "note": "إِذًۭا is not a condition-starter; it’s closer to “then/at that point,” often reacting to what came before. إِذَا, by contrast, opens a condition/time frame that has a matching result."
   },
   {
    "claim": "Don’t treat every فَـ as “then” in a conditional; sometimes it just moves the story forward.",
    "example": "فَقُلِ ٱلْحَمْدُ",
    "note": "In conditionals, فَـ often marks the consequence (“when X, then do Y”). But فَـ also commonly means simple sequence. Look back: is there an إِذَا/إِن/لَو/لَوْلَا whose frame this could be finishing?"
   },
   {
    "claim": "Don’t read لَوْ as a real possibility like إِنْ.",
    "example": "لَوْ كَانُوا۟",
    "note": "إِنْ leaves the door open (“if it happens”). لَوْ usually signals “if it had happened (but it didn’t),” and the tone is often hypothetical, regretful, or condemnatory."
   }
  ],
  "checklist": [
   "Scan for a trigger particle: إِذَا / إِن / لَوْ / لَوْلَا.",
   "Bracket mentally from that trigger forward: you are in the condition half until you see a clear shift to outcome (often a فَـ).",
   "If you see فَـ, ask: is this “so/then” concluding the condition, or just sequential “and then”? Decide by checking whether a condition trigger appeared earlier.",
   "Label the meaning: إِذَا = when/whenever (expected), إِنْ = if (possible), لَوْ = if (counterfactual), لَوْلَا = if not for (prevented outcome).",
   "If the verse feels like scattered images, re-check: are you accidentally reading one conditional as several independent clauses?",
   "If there is a command (Lesson 21), check whether it is inside the result half (“when X happens, then do Y”)."
  ],
  "summary": [
   "Rule: Qur’anic conditionals come in two halves—condition first, then result—often signposted by فَـ.",
   "Look: identify the trigger particle (إِذَا / إِنْ / لَوْ / لَوْلَا) and track where the consequence starts.",
   "Now you can read long āyāt with nested phrases without losing the logic of “if/when… then…”."
  ],
  "quizBridge": "The quiz will show short snippets and ask you to identify the trigger (إِذَا/إِنْ/لَوْ/لَوْلَا), mark condition vs result, and choose the correct English force (when vs if vs counterfactual vs but for)."
 },
 {
  "id": "q-exceptions",
  "n": 38,
  "title": "Except, only, other than",
  "stage": "Reading the endings",
  "level": "B2",
  "structure": "إِلَّا except — the exception carved out of a negation, and together they make the strongest statement in the language: لَا إِلَٰهَ إِلَّا اللَّهُ. إِنَّمَا only/it is merely · غَيْر other than · سِوَىٰ apart from. Negation + إِلَّا is not two ideas but one emphatic claim.",
  "whyItMatters": "This structure carries the central statement of the faith. Reading it as \"no god except God\" rather than as two clauses is the point.",
  "canDo": "After this lesson you can read negation + إِلَّا as a single emphatic claim (not two separate clauses), and you can recognize “only/merely” (إِنَّمَا) and “other than/apart from” (غَيْر) when they limit a statement in the Qur’an.",
  "rule": "إِلَّا (“except”) usually comes after a negation and carves out the one true exception; together they form one strong meaning: “none … except …”. Read لَا … إِلَّا as a single emphatic claim, not as “no X” plus a second independent thought. إِنَّمَا restricts the sentence to “only/merely”, and غَيْر means “other than” (a non-matching alternative).",
  "why": [
   "Prevents reading وَمَا … إِلَّا as two messages (“they do not…” AND “except…”) instead of one restriction (“they only…”).",
   "Prevents missing the force of exclusive statements like لَآ إِلَٰهَ إِلَّا هُوَ (exclusive worship/authority), by treating it as a casual exception rather than the core claim.",
   "Prevents translating إِنَّمَا as “indeed” (like إِنَّ) instead of “only/merely,” which flips the intended limitation.",
   "Prevents mistaking غَيْرُ ٱللَّهِ for “not Allah” (negation) instead of “someone other than Allah” (alternative)."
  ],
  "pattern": {
   "caption": "Four ways the Qur’an limits a statement: exception, exclusivity, and “other than”",
   "columns": [
    "Arabic pattern",
    "How to read it",
    "What it means"
   ],
   "rows": [
    [
     "لَا / مَا … إِلَّا …",
     "One unit: negation-with-exception",
     "None/doesn’t … except = only …"
    ],
    [
     "… إِلَّا … (after negation)",
     "The exception carved out",
     "The single allowed case"
    ],
    [
     "إِنَّمَا + sentence",
     "Restriction marker",
     "Only/merely; nothing beyond this"
    ],
    [
     "غَيْر + noun",
     "Alternative marker",
     "Other than; someone/something else"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "إِلَّآ",
    "blocks": [
     {
      "text": "إِلَّآ",
      "role": "particle",
      "gloss": "except; only"
     }
    ],
    "note": "Treat it as one particle; when it follows a negation, the whole phrase means “only …”."
   },
   {
    "word": "إِنَّمَا",
    "blocks": [
     {
      "text": "إِنَّمَا",
      "role": "particle",
      "gloss": "only; merely"
     }
    ],
    "note": "Don’t split it in your mind into separate effects; it functions as a single restrictor: “it is only that…”."
   },
   {
    "word": "غَيْرُ",
    "blocks": [
     {
      "text": "غَيْر",
      "role": "plain",
      "gloss": "other-than"
     },
     {
      "text": "ُ",
      "role": "nounEnding",
      "gloss": "subject-ُ"
     }
    ],
    "note": "غَيْر is the meaning-bearing word; the ending changes by case (here shown as ـُ)."
   },
   {
    "word": "أَنفُسَهُمْ",
    "blocks": [
     {
      "text": "أَنفُسَ",
      "role": "plain",
      "gloss": "selves"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "their"
     }
    ],
    "note": "A noun plus a glued pronoun: “their selves” = “themselves”."
   }
  ],
  "examples": [
   {
    "arabic": "وَمَا يَخْدَعُونَ إِلَّآ أَنفُسَهُمْ",
    "ref": "2:9",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "مَا",
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
      "text": "خْدَع",
      "role": "root"
     },
     {
      "text": "ُونَ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَّآ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَنفُسَ",
      "role": "plain"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "And not they deceive except themselves",
    "smooth": "They are only deceiving themselves.",
    "whatChanged": "Shows the key move: negation (مَا) + إِلَّا becomes an “only” meaning in English."
   },
   {
    "arabic": "وَمَا تَفَرَّقَ ٱلَّذِينَ أُوتُوا۟ ٱلْكِتَٰبَ إِلَّا",
    "ref": "98:4",
    "surah": "Sūrat Al-Bayyina",
    "segments": [
     {
      "text": "وَ",
      "role": "particle"
     },
     {
      "text": "مَا",
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
      "text": "فَرَّق",
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
      "text": "ٱلَّذِينَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أُوتُوا۟",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْكِتَٰبَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَّا",
      "role": "particle"
     }
    ],
    "literal": "And not split the ones given the Book except",
    "smooth": "They did not divide—except (at a certain point).",
    "whatChanged": "Shows إِلَّا as a hinge that expects the exception after it; your eyes should look ahead for what is being excluded."
   },
   {
    "arabic": "إِنَّمَا نَحْنُ مُصْلِحُونَ",
    "ref": "2:11",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "إِنَّمَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "نَحْنُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "مُصْلِحُونَ",
      "role": "plain"
     }
    ],
    "literal": "Only we (are) reformers",
    "smooth": "We are only reformers (nothing else).",
    "whatChanged": "Shows restriction without a prior negation: إِنَّمَا limits the claim from the start."
   },
   {
    "arabic": "قُلْ إِنَّمَا ٱلْءَايَٰتُ عِندَ ٱللَّهِ",
    "ref": "6:109",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "قُلْ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِنَّمَا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْءَايَٰتُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عِندَ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱللَّهِ",
      "role": "plain"
     }
    ],
    "literal": "Say: only the signs (are) with Allah",
    "smooth": "Say: the signs are only with Allah.",
    "whatChanged": "Shows إِنَّمَا restricting where something belongs/comes from—useful when the sentence is nominal (missing “is”)."
   },
   {
    "arabic": "يَوْمَ تُبَدَّلُ ٱلْأَرْضُ غَيْرَ ٱلْأَرْضِ",
    "ref": "14:48",
    "surah": "Sūrat Ibrahim",
    "segments": [
     {
      "text": "يَوْمَ",
      "role": "plain"
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
      "text": "بَدَّل",
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
      "text": "ٱلْأَرْضُ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "غَيْرَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "ٱلْأَرْضِ",
      "role": "plain"
     }
    ],
    "literal": "Day (when) is-changed the earth other-than the earth",
    "smooth": "On the Day the earth will be changed into another earth.",
    "whatChanged": "Shows غَيْر as “other than” (an alternative replacement), not as a negation particle."
   },
   {
    "arabic": "لَآ إِلَٰهَ إِلَّا هُوَ",
    "ref": "35:3",
    "surah": "Sūrat Faatir",
    "segments": [
     {
      "text": "لَآ",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَٰهَ",
      "role": "plain"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "إِلَّا",
      "role": "particle"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "هُوَ",
      "role": "plain"
     }
    ],
    "literal": "No god except He",
    "smooth": "There is no god except Him. (Exclusive: only He is God.)",
    "whatChanged": "Shows the strongest form: a negation plus one carved-out exception—read it as exclusivity, not two separate clauses."
   }
  ],
  "traps": [
   {
    "claim": "Don’t translate negation + إِلَّا as two separate statements",
    "example": "وَمَا … إِلَّا",
    "note": "In English it often becomes “only …”. If you read it as (1) “not …” then (2) “except …”, you miss the intended emphasis and the sentence’s single thrust."
   },
   {
    "claim": "Don’t confuse إِنَّمَا (only) with إِنَّ (indeed)",
    "example": "إِنَّمَا ٱلْءَايَٰتُ",
    "note": "إِنَّ adds emphasis (“indeed”), while إِنَّمَا adds restriction (“only”). In meaning, restriction is stronger and narrower than emphasis."
   },
   {
    "claim": "Don’t read غَيْر as simple negation",
    "example": "غَيْرُ ٱللَّهِ",
    "note": "غَيْر points to an alternative (“someone other than Allah”), not to the particle meaning “not”. Watch for a noun after it: it behaves like “other than + noun”."
   }
  ],
  "checklist": [
   "When you see لَا or مَا, scan forward for إِلَّا—if it appears, treat the whole stretch as one restricted claim.",
   "When you see إِلَّا, immediately ask: “What is being excluded, and what is the one exception?”—then look just after إِلَّا for the exception word/phrase.",
   "Mentally translate many لَا/مَا … إِلَّا patterns as “only …” to capture the force, then re-check that the exception really is singular/limited.",
   "When you see إِنَّمَا at the start of a clause, read it as “only/merely,” and expect the rest of the clause to be the limited claim.",
   "When you see غَيْرَ/غَيْرُ/غَيْرِ, read “other than …” and look for the noun that completes it; don’t hunt for a second negation.",
   "For core creed phrasing, slow down: in لَآ إِلَٰهَ إِلَّا هُوَ, don’t split the meaning—hear exclusivity in one sweep."
  ],
  "summary": [
   "Rule: Negation + إِلَّا is a single emphatic meaning of exclusivity; إِنَّمَا also restricts meaning to “only/merely,” and غَيْر means “other than.”",
   "What it looks like: لَا/مَا … إِلَّا … ; or a clause beginning with إِنَّمَا; or a noun phrase containing غَيْرَ/غَيْرُ/غَيْرِ.",
   "What you can now do: read these structures as restrictions (exclusive claims) and avoid translating them as two independent ideas."
  ],
  "quizBridge": "The quiz will ask you to spot whether a snippet is (1) negation + إِلَّا exclusivity, (2) إِنَّمَا restriction, or (3) غَيْر “other than,” and to choose the best “only/except/other than” reading."
 },
 {
  "id": "q-purpose",
  "n": 39,
  "title": "So that, in order to, until",
  "stage": "Reading the endings",
  "level": "B2",
  "structure": "لِـ so that (with a subjunctive verb: لِيَعْلَمُوا) · كَيْ / لِكَيْ in order that · لَعَلَّ perhaps/so that you may (لَعَلَّكُمْ تَتَّقُونَ) · حَتَّىٰ until, to the point that · فَـ so, as a result. Purpose looks forward to an intention; consequence looks back at a result.",
  "whyItMatters": "These tell you WHY something is mentioned. لَعَلَّكُمْ تَتَّقُونَ closes a great many passages, and it is the reason the passage was given.",
  "canDo": "After this lesson you can spot purpose (“so that / in order to”) and consequence (“so / as a result”) markers—لِـ, كَيْ/لِكَيْ, لَعَلَّ, حَتَّىٰ, and فَ—so you understand why an action is mentioned and what result it leads to while reading Qur’anic Arabic.",
  "rule": "Purpose particles point forward to an intended outcome: لِـ + a present verb (often with a subjunctive feel), كَيْ/لِكَيْ “in order that,” and the very common closing لَعَلَّكُمْ… “so that you may / perhaps you will…”. Consequence with فَـ points backward: it introduces what happened because of what came before. حَتَّىٰ sets an endpoint: “until / to the point that,” often marking how far something goes.",
  "why": [
   "Prevents reading لَعَلَّكُمْ تَتَّقُونَ as random “maybe”—it often gives the reason a passage was delivered (the intended moral outcome).",
   "Prevents missing the goal in command lists: without لَعَلَّ/لِـ you may know what to do, but not why it is being asked.",
   "Prevents reversing cause and effect: فَـ often signals “so/as a result,” not just “and,” which changes who is responding to what.",
   "Prevents treating لِـ as simple “for/to” only—when it attaches to a verb (لِيَعْلَمَ) it commonly means “so that … (may) …,” i.e., purpose."
  ],
  "pattern": {
   "caption": "Purpose looks forward; consequence looks back. Watch what comes after the particle.",
   "columns": [
    "Marker",
    "Core meaning",
    "Typical next word"
   ],
   "rows": [
    [
     "لِـ",
     "so that / in order to",
     "present verb: لِيَعْلَمَ"
    ],
    [
     "كَيْ / لِكَيْ",
     "in order that",
     "verb clause (purpose)"
    ],
    [
     "لَعَلَّ",
     "so that you may / perhaps",
     "pronoun + present verb: لَعَلَّكُمْ تَتَّقُونَ"
    ],
    [
     "حَتَّىٰ",
     "until / up to the point that",
     "endpoint clause"
    ],
    [
     "فَـ",
     "so / as a result",
     "result clause after a cause"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "لِيَعْلَمَ",
    "blocks": [
     {
      "text": "لِ",
      "role": "particle",
      "gloss": "so that"
     },
     {
      "text": "يَعْلَمَ",
      "role": "plain",
      "gloss": "he knows"
     }
    ],
    "note": "The boundary is after لِـ; when لِـ is directly attached to a present verb, it commonly signals purpose (“so that …”)."
   },
   {
    "word": "لَعَلَّكُمْ",
    "blocks": [
     {
      "text": "لَعَلَّ",
      "role": "particle",
      "gloss": "so that"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun",
      "gloss": "you (pl.)"
     }
    ],
    "note": "The pronoun is glued to the end of لَعَلَّ: لَعَلَّ + كُمْ = “so that you (all) …”."
   },
   {
    "word": "فَتَفَرَّقَ",
    "blocks": [
     {
      "text": "فَ",
      "role": "particle",
      "gloss": "so / then"
     },
     {
      "text": "تَفَرَّقَ",
      "role": "plain",
      "gloss": "it split"
     }
    ],
    "note": "فَـ is a single-letter particle attached to the next word; here it introduces the result that follows from what came before."
   },
   {
    "word": "حَتَّىٰ",
    "blocks": [
     {
      "text": "حَتَّىٰ",
      "role": "particle",
      "gloss": "until"
     }
    ],
    "note": "حَتَّىٰ stands as its own word and sets an endpoint (“up to / until”)."
   }
  ],
  "examples": [
   {
    "arabic": "ذَٰلِكُمْ وَصَّىٰكُم بِهِۦ لَعَلَّكُمْ تَتَّقُونَ",
    "ref": "6:153",
    "surah": "Sūrat Al-An'aam",
    "segments": [
     {
      "text": "ذَٰلِكُمْ ",
      "role": "plain"
     },
     {
      "text": "وَصَّىٰكُم ",
      "role": "plain"
     },
     {
      "text": "بِهِۦ ",
      "role": "plain"
     },
     {
      "text": "لَعَلَّ",
      "role": "particle"
     },
     {
      "text": "كُمْ ",
      "role": "attachedPronoun"
     },
     {
      "text": "تَتَّقُونَ",
      "role": "plain"
     }
    ],
    "literal": "That—He advised you with it—so that you (all) may be mindful.",
    "smooth": "That is what He instructed you with, so that you may have taqwā.",
    "whatChanged": "This shows لَعَلَّ as a purpose/aim marker that often closes guidance: it tells you the intended outcome of the commands."
   },
   {
    "arabic": "إِنَّآ أَنزَلْنَٰهُ قُرْءَٰنًا عَرَبِيًّۭا لَّعَلَّكُمْ تَعْقِلُونَ",
    "ref": "12:2",
    "surah": "Sūrat Yusuf",
    "segments": [
     {
      "text": "إِنَّآ ",
      "role": "plain"
     },
     {
      "text": "أَنزَلْنَٰهُ ",
      "role": "plain"
     },
     {
      "text": "قُرْءَٰنًا ",
      "role": "plain"
     },
     {
      "text": "عَرَبِيًّۭا ",
      "role": "plain"
     },
     {
      "text": "لَّعَلَّ",
      "role": "particle"
     },
     {
      "text": "كُمْ ",
      "role": "attachedPronoun"
     },
     {
      "text": "تَعْقِلُونَ",
      "role": "plain"
     }
    ],
    "literal": "Indeed We sent it down—an Arabic Qur’an—so that you (all) understand.",
    "smooth": "We sent it down as an Arabic Qur’an so that you may understand.",
    "whatChanged": "This shows لَعَلَّ attached to a different goal (understanding), not only taqwā—still giving the ‘why’ of revelation."
   },
   {
    "arabic": "وَٱفْعَلُوا۟ ٱلْخَيْرَ لَعَلَّكُمْ تُفْلِحُونَ",
    "ref": "22:77",
    "surah": "Sūrat Al-Hajj",
    "segments": [
     {
      "text": "وَٱفْعَلُوا۟ ",
      "role": "plain"
     },
     {
      "text": "ٱلْخَيْرَ ",
      "role": "plain"
     },
     {
      "text": "لَعَلَّ",
      "role": "particle"
     },
     {
      "text": "كُمْ ",
      "role": "attachedPronoun"
     },
     {
      "text": "تُفْلِحُونَ",
      "role": "plain"
     }
    ],
    "literal": "And do the good—so that you (all) succeed.",
    "smooth": "Do good so that you may succeed.",
    "whatChanged": "This shows purpose attached directly to commands: لَعَلَّ tells you the intended result of the imperatives."
   },
   {
    "arabic": "لِتَسْكُنُوا۟ فِيهِ وَلِتَبْتَغُوا۟",
    "ref": "28:73",
    "surah": "Sūrat Al-Qasas",
    "segments": [
     {
      "text": "لِ",
      "role": "particle"
     },
     {
      "text": "تَسْكُنُوا۟ ",
      "role": "plain"
     },
     {
      "text": "فِيهِ ",
      "role": "plain"
     },
     {
      "text": "وَ",
      "role": "plain"
     },
     {
      "text": "لِ",
      "role": "particle"
     },
     {
      "text": "تَبْتَغُوا۟",
      "role": "plain"
     }
    ],
    "literal": "So that you (all) may rest in it, and so that you (all) may seek…",
    "smooth": "So that you may rest in it, and so that you may seek…",
    "whatChanged": "This shows لِـ used repeatedly before present verbs to list multiple purposes (why night/day were made for you)."
   },
   {
    "arabic": "فَتُخْبِتَ لَهُۥ قُلُوبُهُمْ",
    "ref": "22:54",
    "surah": "Sūrat Al-Hajj",
    "segments": [
     {
      "text": "فَ",
      "role": "particle"
     },
     {
      "text": "تُخْبِتَ ",
      "role": "plain"
     },
     {
      "text": "لَهُۥ ",
      "role": "plain"
     },
     {
      "text": "قُلُوبُهُمْ",
      "role": "plain"
     }
    ],
    "literal": "So their hearts may humble to Him.",
    "smooth": "As a result, their hearts become humble toward Him.",
    "whatChanged": "This highlights فَـ as a consequence connector: it points back to what precedes and introduces the resulting clause."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse لِـ of purpose (before a verb) with لِـ meaning “for/to” (before a noun).",
    "example": "لِيَعْلَمَ / لَكُمُ",
    "note": "In 3:166 you see وَلِيَعْلَمَ (لِـ + verb) = “so that …”. In 28:73 you see جَعَلَ لَكُمُ (لِـ + pronoun/noun) = “for you,” not a purpose clause by itself."
   },
   {
    "claim": "Don’t treat every فَـ as mere ‘and then’.",
    "example": "فَتَفَرَّقَ / فَتُخْبِتَ",
    "note": "In 6:153 فَتَفَرَّقَ بِكُمْ comes as the outcome of following other paths. In 22:54 فَتُخْبِتَ introduces what follows from believing in the truth—read it as result (“so/as a result”)."
   },
   {
    "claim": "Don’t read لَعَلَّ as doubt only (“maybe”) and stop there.",
    "example": "لَعَلَّكُمْ تَتَّقُونَ",
    "note": "In many Qur’anic passages, لَعَلَّ introduces the intended benefit or aim for the listener: “so that you may…”. Even when it carries ‘perhaps,’ it still functions as a purpose/outcome framing device."
   }
  ],
  "checklist": [
   "Scan for لَعَلَّ near the end of an āyah; if it is followed by a glued pronoun (كُمْ) and a present verb, read it as the passage’s intended outcome.",
   "Look for لِـ stuck directly onto a present-tense verb form (often beginning with يـ / تـ): لِيَعْلَمَ, لِتَسْكُنُوا۟. Translate it as “so that / in order to.”",
   "When you see repeated لِـ + verb joined by وَ (… وَلِ…), expect a list of purposes (multiple ‘whys’).",
   "When a clause starts with فَـ, pause and ask: “What just happened that caused this?” Then read the فَـ clause as the consequence/result.",
   "If you meet حَتَّىٰ, treat it as an endpoint marker: read what follows as the limit reached (“until / to the point that”).",
   "Always decide: is this connector pointing forward to an aim (purpose) or backward to a result (consequence)? That decision usually resolves the meaning."
  ],
  "summary": [
   "The rule: purpose markers (لِـ, كَيْ/لِكَيْ, لَعَلَّ, حَتَّىٰ) explain why something is said; consequence with فَـ explains what happened as a result.",
   "What it looks like: لِـ attached to a present verb (لِيَعْلَمَ), لَعَلَّ + pronoun + present verb (لَعَلَّكُمْ تَتَّقُونَ), and فَـ attached to the next word (فَتَفَرَّقَ).",
   "What you can now do: while reading, you can connect actions to their intended goal and separate intention (purpose) from outcome (result), especially in the many passages that close with لَعَلَّكُمْ…"
  ],
  "quizBridge": "The quiz will ask you to identify whether a marked phrase is purpose or consequence and to choose the best English sense for لِـ, لَعَلَّ, and فَـ in short Qur’anic snippets."
 },
 {
  "id": "q-method",
  "n": 40,
  "title": "A method for reading any āyah",
  "stage": "Reading the endings",
  "level": "B2",
  "structure": "Six steps, in order. 1 — Mark the particles: connectors, prepositions, negations, conditions. 2 — Find the verbs; note front-marked or back-marked. 3 — Find who is doing it and who it is done to, using the endings. 4 — Resolve every attached pronoun: what is it stuck to, and who does it point at? 5 — Bracket the groups: إضافة pairs, noun-adjective pairs, relative clauses. 6 — Read the whole thing as a small number of claims.",
  "whyItMatters": "Everything in this course, in the order you use it. A repeatable procedure is what replaces the panic of an unfamiliar verse.",
  "canDo": "After this lesson you can approach any āyah with a fixed six-step scan that turns a long Arabic line into a few clear claims you can understand while reading.",
  "rule": "Use the same six steps every time: (1) mark particles, (2) find verbs, (3) identify doer and done-to from endings, (4) resolve attached pronouns, (5) bracket word-groups (iḍāfa, adjective pairs, relatives), (6) read it as a small number of claims. Do not translate first; analyze first. The goal is recognition: you are reducing panic by reducing uncertainty.",
  "why": [
   "Prevents missing the real “turn” of the meaning by overlooking a particle like إِن / لَا / لَن / وَ / فَ",
   "Prevents reversing meaning by guessing who did what when verb markings and noun endings already tell you",
   "Prevents losing the thread when multiple attached pronouns (ـهُم / ـكُمْ / ـهَا) point to different people/things",
   "Prevents reading one long āyah as one blob by bracketing it into a few connected mini-claims"
  ],
  "pattern": {
   "caption": "Six-step scan (repeatable on any line): what you mark, what you decide, what you end up with",
   "columns": [
    "Step",
    "What you mark/locate",
    "Output (a simple decision)"
   ],
   "rows": [
    [
     "1. Particles",
     "و / ف / لَا / لَن / إِن / مَن / إِذْ and prepositions like عَلَىٰ / مِن / عَن",
     "Where clauses start, connect, negate, or condition"
    ],
    [
     "2. Verbs",
     "Past/present/command; front-marked (يـ/تـ/نـ/أ) or back-marked (ـوا/ـتْ)",
     "What actions/events are being asserted"
    ],
    [
     "3. Doer & done-to",
     "Noun endings and verb suffixes (who did it; who receives it)",
     "Who acts, who is affected, whether there is an object"
    ],
    [
     "4. Attached pronouns",
     "ـه / ـهم / ـكم on nouns, prepositions, and verbs",
     "Exactly what each pronoun is stuck to and who it refers to"
    ],
    [
     "5. Brackets",
     "iḍāfa pairs, noun-adjective pairs, relative clauses (ٱلَّذِينَ …)",
     "One compact “chunk” per bracket, so you don’t mis-attach phrases"
    ],
    [
     "6. Claims",
     "Re-read with chunks",
     "A small list of claims (A; therefore B; but not C)"
    ]
   ]
  },
  "anatomy": [
   {
    "word": "عَلَيْهِمْ",
    "blocks": [
     {
      "text": "عَلَىٰ",
      "role": "preposition",
      "gloss": "on, upon"
     },
     {
      "text": "هِمْ",
      "role": "attachedPronoun",
      "gloss": "them"
     }
    ],
    "note": "Boundary is after the preposition: عَلَىٰ + ـهِمْ (preposition + glued pronoun)."
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
      "gloss": "plural doers"
     }
    ],
    "note": "Front-mark (يـ) tells present/ongoing; ـونَ signals ‘they’ as the doers."
   },
   {
    "word": "أَمْوَٰلُهُمْ",
    "blocks": [
     {
      "text": "أَمْوَٰلُ",
      "role": "nounEnding",
      "gloss": "wealth (as-subject)"
     },
     {
      "text": "هُمْ",
      "role": "attachedPronoun",
      "gloss": "their"
     }
    ],
    "note": "The final ـُ belongs to the noun’s case/role; then the pronoun is attached after it."
   },
   {
    "word": "يَرُدُّوكُمْ",
    "blocks": [
     {
      "text": "يَ",
      "role": "verbPrefix",
      "gloss": "he/they (does)"
     },
     {
      "text": "رُدّ",
      "role": "root",
      "gloss": "turn back"
     },
     {
      "text": "وكُمْ",
      "role": "verbSuffix",
      "gloss": "you (object)"
     }
    ],
    "note": "The suffix here is not a ‘doer’ ending; it is the attached object ‘you all’."
   },
   {
    "word": "ٱتَّخَذُوا۟",
    "blocks": [
     {
      "text": "ٱتَّخَذ",
      "role": "root",
      "gloss": "took/adopted"
     },
     {
      "text": "وا۟",
      "role": "verbSuffix",
      "gloss": "they did"
     }
    ],
    "note": "In past tense, the doer is often carried in the back-marking suffix like ـوا (they)."
   }
  ],
  "examples": [
   {
    "arabic": "سَوَآءٌ عَلَيْهِمْ",
    "ref": "2:6",
    "surah": "Sūrat Al-Baqara",
    "segments": [
     {
      "text": "سَوَآءٌ",
      "role": "plain"
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
      "text": "هِمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "equal upon-them",
    "smooth": "It is the same for them.",
    "whatChanged": "Step 1+4 together: you see a preposition carrying the meaning and the pronoun giving its target."
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
     }
    ],
    "literal": "not they-believe",
    "smooth": "They do not believe.",
    "whatChanged": "Step 2 is now central: you identify a verb with front- and back-marking and let the grammar give you the subject."
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
    "literal": "never will-benefit away-from them",
    "smooth": "It will never benefit them (at all).",
    "whatChanged": "Step 1 prevents a major mistake: لَن is stronger than a simple ‘no’ and shapes the whole claim before you even translate."
   },
   {
    "arabic": "ٱتَّخَذُوا۟ ٱلْعِجْلَ",
    "ref": "7:152",
    "surah": "Sūrat Al-A'raaf",
    "segments": [
     {
      "text": "ٱتَّخَذ",
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
      "text": "ٱلْعِجْلَ",
      "role": "nounEnding"
     }
    ],
    "literal": "they-took the-calf-(object)",
    "smooth": "They took the calf (as an object of devotion).",
    "whatChanged": "Step 3 becomes visible: the verb suffix tells ‘they’ as doer, while the noun ending signals an object."
   },
   {
    "arabic": "إِن جَآءَكُمْ فَاسِقٌۢ",
    "ref": "49:6",
    "surah": "Sūrat Al-Hujuraat",
    "segments": [
     {
      "text": "إِن",
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
      "text": "كُمْ",
      "role": "attachedPronoun"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "فَاسِقٌۢ",
      "role": "plain"
     }
    ],
    "literal": "if came-to-you a-deviator",
    "smooth": "If a sinner comes to you…",
    "whatChanged": "Step 1 + Step 4: you immediately spot a condition opener (إِن) and an attached ‘to you’ target (ـكُمْ) before you read the outcome."
   },
   {
    "arabic": "يَرُدُّوكُمْ عَلَىٰٓ أَعْقَٰبِكُمْ",
    "ref": "3:149",
    "surah": "Sūrat Aal-i-Imraan",
    "segments": [
     {
      "text": "يَ",
      "role": "verbPrefix"
     },
     {
      "text": "رُدّ",
      "role": "root"
     },
     {
      "text": "وكُمْ",
      "role": "verbSuffix"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "عَلَىٰٓ",
      "role": "preposition"
     },
     {
      "text": " ",
      "role": "plain"
     },
     {
      "text": "أَعْقَٰبِ",
      "role": "plain"
     },
     {
      "text": "كُمْ",
      "role": "attachedPronoun"
     }
    ],
    "literal": "they-turn-you-back upon heels-your",
    "smooth": "They will turn you back on your heels.",
    "whatChanged": "Step 4 resolves two different ‘you’ attachments: one is the verb’s object (ـوكُمْ) and one is ‘your’ on a noun (ـكُمْ)."
   }
  ],
  "traps": [
   {
    "claim": "Don’t confuse a glued pronoun on a preposition with a standalone pronoun subject.",
    "example": "عَلَيْهِمْ",
    "note": "عَلَىٰ + ـهِمْ is ‘upon them’ (a phrase), not ‘they’ as the doer. You still must find the verb to know who is acting."
   },
   {
    "claim": "Don’t treat every final ـونَ as ‘they did’; it is often present-tense ‘they do’.",
    "example": "يُؤْمِنُونَ",
    "note": "The front-marker يـ already signals a present verb. The suffix ـونَ here is a doer marker for the present, not a past tense ending."
   },
   {
    "claim": "Don’t miss the condition-opener and accidentally read the ‘if’ clause as a full statement.",
    "example": "إِن جَآءَكُمْ",
    "note": "When you see إِن, stop and look for what follows as the result (often with فَ). Your mind should expect: condition → outcome."
   },
   {
    "claim": "Don’t attach the wrong ‘you’ when there are two in one snippet.",
    "example": "يَرُدُّوكُمْ ... أَعْقَٰبِكُمْ",
    "note": "One ‘you’ is the object of ‘turn back’ (who is being turned). The other ‘your’ belongs to ‘heels’ (what the heels belong to). Different attachments, different jobs."
   }
  ],
  "checklist": [
   "Step 1: Circle/mentally flag particles first (و، ف، إِن، لَا، لَن, and any preposition).",
   "Step 2: Underline verbs; note whether they are front-marked (ي/ت/ن/أ) or back-marked (ـوا/ـتْ etc.).",
   "Step 3: For each verb, ask: who is the doer (from the verb suffix/prefix)? Is there an object (from endings or attached object pronouns)?",
   "Step 4: Scan for every attached pronoun (ـه، ـهم، ـكم، ـها). Write a tiny note: stuck-to-what? refers-to-who?",
   "Step 5: Bracket chunks: (ٱلَّذِينَ …) as a unit; iḍāfa (X of Y); noun+adjective pairs (same definiteness/case).",
   "Step 6: Convert the line into 2–4 claims: a main statement, any conditions, any results, any contrasts/negations."
  ],
  "summary": [
   "Rule: Use the same six steps in the same order—particles, verbs, roles, pronouns, brackets, then claims.",
   "What it looks like: you stop trying to ‘read fluently’ and instead mark small signals (لَا/لَن/إِن, verb markings, ـهم/ـكم) that control meaning.",
   "What you can now do: reduce any āyah—however long—into a few correctly attached chunks that you can understand as you read."
  ],
  "quizBridge": "The quiz will show short Qur’anic snippets and ask you to mark particles/verbs/pronouns and then choose the correct chunked meaning (the correct set of claims)."
 }
];

function quranLesson(unitId) {
  return QURAN_COURSE.find(l => l.id === unitId) || null;
}
