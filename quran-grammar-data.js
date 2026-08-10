// ============================================================================
// BookTutor — Quranic Arabic syllabus (quran-grammar-data.js)
//
// Twenty-eight lessons, derived from the learner's own ChatGPT session.
//
// ── WHERE THIS CAME FROM ────────────────────────────────────────────────────
// The previous syllabus was designed by consulting GPT-5.2 in the abstract. It
// was a competent grammar course and it did not work: "i dont feel any
// progression and im finding it difficult", against a real ChatGPT session
// that felt "way faster" and "more engaged".
//
// So the session itself was fed back in — all 76 turns, 106,078 characters —
// and ChatGPT was asked to turn what it had actually done into a course. This
// is that, with two edits noted at the bottom.
//
// ── WHY THE ORDER IS WHAT IT IS ─────────────────────────────────────────────
// Its stated principle: "frequency-first and morphology-first… convert
// recognition into comprehension by learning derivational patterns before
// syntax. Where the session lingered, the course should linger."
//
// That inverts the old course. Eleven of these lessons are the patterns and
// three are syntax; before, forms sat at 23-32 behind nearly all the grammar.
// The justification is simply what happened: the learner spent 20 of his 38
// turns on the forms. That is where the interest was, and a course that defers
// it for twenty-two lessons is a course he stops doing.
//
// ── HIS OWN QUESTIONS ARE LESSONS ───────────────────────────────────────────
// Several lessons exist because he asked, mid-session, and the answer was the
// best teaching in the transcript:
//   "How come in the fourth form the word loses a wow?"  → hollow verbs (17)
//   "Why isn't قَرَّأَ translated to someone who reads a lot?" → Form II (18)
//   "Why didn't you put the diacritical marks on them?"  → bare roots (7)
//   "What is the difference between transitive and intransitive?" → (19, 20)
// A syllabus written from the outside would not have contained any of them.
//
// ── THE TWO EDITS ───────────────────────────────────────────────────────────
// 1. Its lessons 4 and 5 were "the 80/20 strategy" and "a 6-hour/day roadmap".
//    Merged into ONE orientation lesson. The 80/20 logic earns its place — it
//    explains why the course is shaped this way, and that was motivating. An
//    hour-by-hour timetable for six hours a day does not: it prescribes a
//    routine almost nobody keeps, and being behind it from week one produces
//    exactly the "finding it difficult" feeling this rebuild exists to remove.
//    What survives from it is the ORDER and the milestones, not the clock.
// 2. Ids are kebab-case and stable; stages renamed to plain English.
//
// The vocabulary track (quran-roots-data.js, 300 roots) is the session's step
// one and runs alongside these lessons rather than inside them.
//
// Not generated at runtime. Content is pre-written against this file into
// quran-course-data.js, so opening a lesson is a lookup.
// ============================================================================

const QURAN_GRAMMAR_UNITS = [
  // ══ WHAT A WORD IS (1-3) ══════════════════════════════════════════════════
  // The session opened here, unprompted by any syllabus: he asked what the
  // commonest kind of word was, and the answer became the parsing lens for
  // everything after it.
  {
    id: 'word-types', stage: 'What a word is', level: 'A0',
    title: 'The three kinds of word — and why that is the first thing to see',
    structure: 'Every word in the Qur\'an is one of three things. اسم (ism) — a noun: a thing, a person, a quality: كِتَاب، رَبّ، عَظِيم. فِعْل (fiʿl) — a verb, an action in time: قَالَ، يَعْلَمُ. حَرْف (ḥarf) — a particle, the glue that has no meaning alone: فِي، مِنْ، لَا، إِنَّ. The Qur\'an is noun-heavy: اسم is the commonest of the three by a wide margin.',
    whyItMatters: 'It gives you something to do with a word before you can translate it. Sorting a verse into these three is a move you can make on day one, and it is the lens every later lesson looks through.'
  },
  {
    id: 'lemma-vs-form', stage: 'What a word is', level: 'A0',
    title: 'Why "how many words" is the wrong question',
    structure: 'A LEMMA is the dictionary entry that gathers many surface forms under one heading: قَالَ، يَقُولُونَ، قُلْ، قِيلَ are four word-forms and one lemma. The Qur\'an has roughly 77,430 words but only a few thousand lemmas, and far fewer roots than that. Counting what you see on the page counts the same word again and again.',
    whyItMatters: 'This is what makes frequency lists work, and what makes 300 roots a realistic target instead of an absurd one. You are not learning 77,000 things.'
  },
  {
    id: 'root-lemma-wordform', stage: 'What a word is', level: 'A0',
    title: 'Root, lemma, word-form — the three layers of every word',
    structure: 'ROOT (جذر) — the bare consonants carrying the family meaning: ك ت ب, writing. LEMMA (مدخل) — a distinct dictionary word grown from it: كِتَاب a book، كَاتِب a writer، مَكْتُوب written. WORD-FORM (صيغة) — that lemma as it actually appears, inflected: كَتَبُوا they wrote، كُتِبَ it was prescribed، ٱلْكِتَٰبِ of the Book.',
    whyItMatters: 'This is the mental model the whole course runs on: family meaning from the root, specific meaning from the pattern, grammar from the ending. Every unfamiliar word you ever meet gets taken apart this way.'
  },

  // ══ HOW TO GO ABOUT IT (4) ════════════════════════════════════════════════
  {
    id: 'the-80-20-plan', stage: 'How to go about it', level: 'A0',
    title: 'The 20% that gets you 80% of the Qur\'an',
    structure: 'Four things carry almost all of it. THE 300 COMMONEST ROOTS — about 20% of the effort for 70-80% of word recognition. THE 40 CORE PARTICLES — 5% of the effort, and they unlock sentence flow. THE TEN VERB FORMS AND THE MAIN NOUN PATTERNS — 10%, and they let you decode words you have never seen. TWO SENTENCE TYPES plus a little syntax — 10%, for most of the grammar. In that order: roots, then patterns, then grammar, then reading.',
    whyItMatters: 'It tells you what to ignore, which matters more than what to study. Classical Arabic is vast and most of it is not in the Qur\'an — knowing where the ceiling is stops the whole thing feeling bottomless.'
  },

  // ══ THE ROOTS (5-7) ═══════════════════════════════════════════════════════
  // The vocabulary track does the actual 300; these three are the method.
  {
    id: 'why-roots', stage: 'The roots', level: 'A0',
    title: 'What knowing a root actually buys you',
    structure: 'A root is not a word — it is a meaning shared by a family of words. Learn ك ت ب and you have not learned one word, you have a claim on كِتَاب، كَاتِب، مَكْتُوب، كُتُب، يَكْتُبُونَ، كُتِبَ. The payoff is not memorising 300 things; it is that each of the 300 unlocks five to ten more, and that a word you have never seen still gives up its area of meaning.',
    whyItMatters: 'Root knowledge alone is not comprehension — that is the next unit\'s job. But it is the ground everything else stands on, and without it patterns have nothing to apply to.'
  },
  {
    id: 'roots-in-chunks', stage: 'The roots', level: 'A0',
    title: 'How to actually get through 300 roots',
    structure: 'In sets, not in one heap. Sixty at a time, in frequency order, each root attached to two things: a small family of real words grown from it, and one āyah where you meet it. Do not learn a root as three bare letters and a gloss — learn it as ك ت ب → ٱلْكِتَٰب, and one verse that has it in.',
    whyItMatters: 'Sixty is a set you can finish, and finishing is the point. A list of 300 is something you abandon at 40; six sets of sixty is something you tick off.'
  },
  {
    id: 'bare-roots', stage: 'The roots', level: 'A0',
    title: 'Why roots are written without vowel marks',
    structure: 'A root list writes كتب, not كَتَبَ. That is deliberate. The ḥarakāt — the fatḥah, kasrah and ḍammah — do not belong to the root; they belong to the PATTERN that gets applied to it. كَتَبَ he wrote، كُتِبَ it was written، كِتَاب a book all share ك ت ب and differ only in what was poured into it. Writing the root bare shows the part that stays.',
    whyItMatters: 'It is the bridge to the next unit. Once you see that the vowels are the pattern and the consonants are the root, the ten forms stop being arbitrary shapes and start being a system.'
  },

  // ══ THE PATTERNS (8-18) ═══════════════════════════════════════════════════
  // The centre of the course. Eleven lessons, because this is where the
  // session spent half its length and where the learner was most engaged.
  {
    id: 'what-is-a-pattern', stage: 'The patterns', level: 'A1',
    title: 'Root + template = meaning',
    structure: 'Arabic builds words by pouring a root into a template (وَزْن, plural أَوْزَان). The root gives the area of meaning; the template says what is being done with it — doing it, causing it, doing it to each other, seeking it, having it done to you. فَعَلَ is the template every grammar book uses to describe the others: ف is the first root letter, ع the second, ل the third. So فَعَّلَ means "double the middle letter", whatever the root is.',
    whyItMatters: 'This is the engine. Ten templates times 300 roots is three thousand words you can decode without ever having met them, and that is the difference between reading with a dictionary and reading.'
  },
  {
    id: 'forms-in-english', stage: 'The patterns', level: 'A1',
    title: 'What the ten forms mean — in English, no Arabic yet',
    structure: 'What each form DOES, before any Arabic shape. I — the plain action. II — makes it stronger, or makes someone else do it. III — aims it at someone. IV — causes it to happen. V — the doer does it to themselves. VI — two parties do it to each other. VII — it simply happens to the subject. VIII — the doer takes it up for themselves. IX — turning a colour or a state. X — seeking it, asking for it, or considering something to be it.',
    whyItMatters: 'You asked for exactly this — "explain what each of the forms do in English, do it simply" — and it is the right order. Meaning first, shapes second: a shape you cannot attach a meaning to is just a squiggle to memorise.'
  },
  {
    id: 'form-markers-english', stage: 'The patterns', level: 'A1',
    title: 'How to spot each form — described in plain letters',
    structure: 'The signal for each, still without Arabic script. I — nothing added, the three root letters alone. II — the middle consonant doubled. III — a long "aa" after the first consonant. IV — an "a-" on the front. V — "ta-" on the front plus the doubled middle. VI — "ta-" on the front plus the long "aa". VII — "in-" on the front. VIII — a "t" slipped in after the FIRST consonant. IX — the last consonant doubled. X — "ista-" on the front.',
    whyItMatters: 'Recognition is a visual skill and it can be learned in a script you already read. Doing this step in Roman letters means you arrive at the Arabic already knowing what you are looking for.'
  },
  {
    id: 'form-markers-arabic', stage: 'The patterns', level: 'A1',
    title: 'The same markers, now in Arabic',
    structure: 'The signals as they appear on the page. II — the shadda ّ on the middle letter: عَلَّمَ. III — a long alif after the first: جَاهَدَ. IV — أَ on the front in the past, and it disappears in the present: أَنْزَلَ / يُنْزِلُ. V — تَ plus the shadda: تَذَكَّرَ. VI — تَ plus the long alif: تَعَاوَنُوا. VII — انْ: انْشَقَّ. VIII — a ت after the first root letter: اخْتَلَفَ. IX — the last letter doubled: اسْوَدَّ. X — اسْتَ: اسْتَغْفَرَ.',
    whyItMatters: 'This is the actual reading skill. Everything before it was preparation for being able to glance at a word in the muṣḥaf and know which form it is.'
  },
  {
    id: 'forms-master-table', stage: 'The patterns', level: 'A1',
    title: 'All ten forms on one page',
    structure: 'The reference: form number, the marker that identifies it, and what it does to the meaning. Three columns, ten rows, nothing else. This is the page to come back to for the rest of the course — not to memorise in one sitting, but to consult until it stops being needed.',
    whyItMatters: 'You called this your structural key, and you were right to want it separated from the examples. A table you can hold in your head beats ten pages you half-remember.'
  },
  {
    id: 'one-root-ten-forms', stage: 'The patterns', level: 'A1',
    title: 'One root, all ten forms',
    structure: 'ك ت ب poured into every template in turn, so the shapes can be compared with the meaning held still. كَتَبَ he wrote · كَتَّبَ he made write · كَاتَبَ he corresponded with · أَكْتَبَ he dictated · تَكَتَّبَ · تَكَاتَبَ they wrote to each other · انْكَتَبَ it was written · اكْتَتَبَ he had it written down · اسْتَكْتَبَ he asked for it to be written. Not every form exists for every root, and that is itself worth seeing.',
    whyItMatters: 'This is the lesson where the system clicks. One root held constant is the only way to see that the template, not the letters, is what is carrying the change.'
  },
  {
    id: 'blank-table-practice', stage: 'The patterns', level: 'A1',
    title: 'Fill it in yourself',
    structure: 'The same table with the forms blank, for نزل. Work down it — what is Form II of ن ز ل, what is Form IV — and then reveal the filled version and compare. No score, no timer, nothing recorded.',
    whyItMatters: 'Producing a form from memory fixes it far harder than reading one. And doing it with the answer one tap away, unmarked, is the difference between practice and being examined.'
  },
  {
    id: 'nazala-case-study', stage: 'The patterns', level: 'A2',
    title: 'نزل: why the Qur\'an uses three different forms for "sent down"',
    structure: 'One root, three forms, three genuinely different claims. نَزَّلَ (II) — sent down gradually, in stages. أَنْزَلَ (IV) — sent down, as a single act. تَنَزَّلَ (V) — came down repeatedly, descended. The Qur\'an uses all three about revelation and the choice is never accidental.',
    whyItMatters: 'This is where morphology stops being grammar and starts being meaning. Two verses that a translation renders identically are saying different things, and the form is where the difference lives.'
  },
  {
    id: 'why-meanings-drift', stage: 'The patterns', level: 'A2',
    title: 'When a form does not mean what the table says',
    structure: 'Form III adds interaction, Form VI adds mutuality — but roots also grow idioms, and a derived form can settle into a meaning you would not predict. نَازَلَ is confrontation rather than just "descend at someone"; تَنَازَلَ is mutual yielding. The template tells you the direction of travel, not the destination.',
    whyItMatters: 'Knowing the table is not the same as knowing the words, and expecting the table to be exact is how people conclude the system does not work. It works as a strong hint.'
  },
  {
    id: 'hollow-verbs', stage: 'The patterns', level: 'A2',
    title: 'Why ق و ل loses its و',
    structure: 'A root whose MIDDLE letter is و or ي is hollow (أَجْوَف), and that weak letter does not survive every pattern. قَوَلَ is not a word; the و collapses into a long vowel and you get قَالَ. Form IV أَقْوَلَ becomes أَقَالَ. The root is still ق و ل — it is just not visible in the surface form. Same for ك و ن → كَانَ, ب ي ع → بَاعَ.',
    whyItMatters: 'You asked this directly, and it is the single commonest reason a word refuses to match any root you know. قَالَ is one of the most frequent verbs in the Qur\'an and it does not look like its own root.'
  },
  {
    id: 'form-2-teach-or-intensify', stage: 'The patterns', level: 'A2',
    title: 'Form II: sometimes "teach", sometimes "do it hard"',
    structure: 'Form II strengthens the base — but strengthening shows up two ways depending on the verb. On a verb that already takes an object, it tends to intensify or repeat: فَسَّدَ, corrupted thoroughly. On one that does not, it tends to add a doer: عَلِمَ he knew → عَلَّمَ he made someone know, taught. قَرَّأَ is "made someone read", not "read a lot", because قَرَأَ already had an object.',
    whyItMatters: 'You spotted this inconsistency yourself and it is a real one. The answer is transitivity, which is the next two lessons — and once you have it, Form II stops being arbitrary.'
  },

  // ══ WHO DOES WHAT TO WHOM (19-20) ═════════════════════════════════════════
  {
    id: 'transitive-intransitive', stage: 'Who does what to whom', level: 'A2',
    title: 'Verbs that need an object, and verbs that do not',
    structure: 'A TRANSITIVE verb (مُتَعَدٍّ) needs something to receive the action: قَرَأَ ٱلْكِتَابَ, he read the book — "he read" alone is unfinished. An INTRANSITIVE verb (لَازِم) is complete on its own: جَلَسَ, he sat. The test is whether you can ask "what?" and expect an answer.',
    whyItMatters: 'This is what makes the verb forms predictable rather than a list of exceptions. Whether a form causes, intensifies or reflects depends on what the base verb already did.'
  },
  {
    id: 'two-objects', stage: 'Who does what to whom', level: 'A2',
    title: 'When one object becomes two',
    structure: 'A causative form can add a participant. عَلِمَ takes one object — he knew something. عَلَّمَ takes two — he taught SOMEONE SOMETHING: عَلَّمَ آدَمَ ٱلْأَسْمَاءَ, He taught Adam the names. Same with آتَىٰ, gave: آتَيْنَا مُوسَى ٱلْكِتَٰبَ. Two nouns in a row after the verb, both objects, no preposition between them.',
    whyItMatters: 'With two objects and nothing to separate them, word order and the endings are all you have. This is the first place where morphology and syntax genuinely need each other.'
  },

  // ══ NOUNS FROM ROOTS (21) ═════════════════════════════════════════════════
  {
    id: 'noun-patterns', stage: 'Nouns from roots', level: 'A2',
    title: 'The noun templates: doer, done-to, and the rest',
    structure: 'Nouns come from templates too, and a handful cover most of the Qur\'an. فَاعِل — the one doing it: كَاتِب writer، عَالِم knower. مَفْعُول — the one it is done to: مَكْتُوب written، مَعْلُوم known. فَعِيل — an intensified quality: عَلِيم all-knowing، رَحِيم most merciful. فَعَّال — one who does it constantly: غَفَّار ever-forgiving. مَفْعَل — the place or time: مَسْجِد place of prostration. مُـ + present stem — the participle of the derived forms: مُؤْمِن، مُسْلِم، مُسْتَغْفِر.',
    whyItMatters: 'The Qur\'an is noun-heavy — that was lesson one — so this is where pattern recognition pays out most. The divine names are almost all فَعِيل and فَعَّال, and reading the template tells you the intensity as well as the meaning.'
  },

  // ══ HOW A SENTENCE WORKS (22-24) ══════════════════════════════════════════
  {
    id: 'the-40-particles', stage: 'How a sentence works', level: 'A2',
    title: 'The forty small words that hold everything together',
    structure: 'Learned as one working set, because they behave as one. Prepositions: فِي، مِنْ، إِلَى، عَلَىٰ، عَنْ، بِ، لِ، كَ، مَعَ. Connectors: وَ، فَ، ثُمَّ، بَلْ، لَٰكِنْ، أَوْ. Negations: لَا، مَا، لَمْ، لَنْ. Emphasis and assertion: إِنَّ، أَنَّ، قَدْ، لَـ. Conditions: إِنْ، إِذَا، لَوْ، لَوْلَا. Questions: أَ، هَلْ، مَنْ، مَا، كَيْفَ، أَيْنَ. Exception and limit: إِلَّا، إِنَّمَا، غَيْر. Relatives: ٱلَّذِي، ٱلَّتِي، ٱلَّذِينَ.',
    whyItMatters: 'They carry almost no meaning of their own and they decide the meaning of everything else. Miss a لَمْ and you have read the opposite of the verse — there is no cheaper error to avoid.'
  },
  {
    id: 'nominal-and-verbal', stage: 'How a sentence works', level: 'A2',
    title: 'Two kinds of sentence, and the missing "is"',
    structure: 'A VERBAL sentence (جُمْلَة فِعْلِيَّة) starts with the verb: خَلَقَ ٱللَّهُ ٱلسَّمَٰوَٰتِ. A NOMINAL sentence (جُمْلَة ٱسْمِيَّة) has no verb at all, because Arabic has no word for "is": ٱللَّهُ غَفُورٌ — "Allah IS forgiving". Two nouns in a row where the first is definite and the second is not is usually a statement, not a description.',
    whyItMatters: 'A great many of the Qur\'an\'s central statements are nominal sentences. Read them as noun phrases and they stop being statements at all — you get "the forgiving Allah" instead of "Allah is forgiving".'
  },
  {
    id: 'just-enough-irab', stage: 'How a sentence works', level: 'B1',
    title: 'Just enough case endings to tell who did what',
    structure: 'Three vowels, recognition only. ـُ (ḍammah) — the doer: نَصَرَ ٱللَّهُ. ـَ (fatḥah) — the one it was done to, or a noun after إِنَّ: إِنَّ ٱللَّهَ. ـِ (kasrah) — after a preposition, or the second noun of a possessive pair: فِي ٱلْبَيْتِ، بَيْتِ ٱللَّهِ. That is the whole of what a reader needs. You never have to produce one.',
    whyItMatters: 'Arabic word order moves freely, so the ending rather than the position tells you who did what to whom. Three vowels is a small price for that, and iʿrāb beyond this is a subject for grammarians, not readers.'
  },

  // ══ READING (25-28) ═══════════════════════════════════════════════════════
  {
    id: 'the-parsing-routine', stage: 'Reading', level: 'B1',
    title: 'The four-step routine for any word you do not know',
    structure: 'ROOT — strip the prefixes and suffixes, find the three letters. FORM — which template is it in, and what does that template do. ROLE — is it the doer, the done-to, after a preposition; what does the ending say. MEANING — put the three together and read it. Four steps, in that order, every time, until it stops being four steps.',
    whyItMatters: 'This is everything in the course turned into something you do rather than something you know. A repeatable procedure is what replaces the panic of an unfamiliar verse.'
  },
  {
    id: 'reading-path', stage: 'Reading', level: 'B1',
    title: 'Where to start reading, and where to go next',
    structure: 'Juzʾ ʿAmma first — short sūrahs, short āyāt, high repetition. Then Juzʾ 29 and 28, where the sentences lengthen but the vocabulary stays familiar. Then the long middle sūrahs, which is where most of the Qur\'an actually is. Read the same passage more than once: the second pass is where the grammar becomes visible.',
    whyItMatters: 'Reading at random means constantly meeting structures you have not been taught, which feels like failing. A graded path means the difficulty rises with you.'
  },
  {
    id: 'why-this-form-here', stage: 'Reading', level: 'B2',
    title: 'Asking why this form and not another',
    structure: 'Once you can identify a form, you can ask why it was chosen. Why نَزَّلَ here and أَنْزَلَ there. Why the passive rather than naming the doer. Why a nominal sentence, which states a permanent fact, rather than a verbal one, which reports an event. Not rhetoric as a subject — just the habit of noticing that the choice was a choice.',
    whyItMatters: 'This is the point where reading stops being decoding. It is also the most engaging part of the whole thing, and it is available much earlier than people are usually told.'
  },
  {
    id: 'reading-unaided', stage: 'Reading', level: 'B2',
    title: 'Reading pages without leaning on a translation',
    structure: 'The end state: read continuously, using the root, the form and the particles, and reach for a translation only to check yourself rather than to find out. A few pages at a time, the same passage more than once, and translation as an answer key instead of a crutch.',
    whyItMatters: 'This is what the course was for. Not knowing about Arabic — opening the muṣḥaf and understanding what is in front of you.'
  }
];

// The structural key: form, what marks it, what it does. Ten rows, three
// columns, nothing else — the shape asked for in the session and the reference
// the whole patterns unit leans on. Shown foldable on every lesson in it.
const QURAN_FORM_MARKERS = [
  { form: 'I',    marker: 'Nothing added — the three root letters alone',   sense: 'The plain action: عَلِمَ he knew' },
  { form: 'II',   marker: 'Middle consonant doubled (shadda)',              sense: 'Stronger, or makes someone else do it: عَلَّمَ he taught' },
  { form: 'III',  marker: 'Long alif after the first consonant',            sense: 'Aimed at someone else: جَاهَدَ he struggled against' },
  { form: 'IV',   marker: 'أَ on the front (gone in the present)',           sense: 'Causes it to happen: أَنْزَلَ He sent down' },
  { form: 'V',    marker: 'تَ on the front + doubled middle',                sense: 'The doer does it to themselves: تَذَكَّرَ he took heed' },
  { form: 'VI',   marker: 'تَ on the front + long alif',                     sense: 'Two parties, to each other: تَعَاوَنُوا they helped one another' },
  { form: 'VII',  marker: 'انْ on the front',                                sense: 'It simply happens: انْشَقَّ it split' },
  { form: 'VIII', marker: 'ت slipped in after the FIRST root letter',        sense: 'The doer takes it up: اخْتَلَفَ they differed' },
  { form: 'IX',   marker: 'Last consonant doubled',                          sense: 'Turning a colour or state: اسْوَدَّ it blackened' },
  { form: 'X',    marker: 'اسْتَ on the front',                              sense: 'Seeks or considers it: اسْتَغْفَرَ he sought forgiveness' }
];

// Which lessons get the structural key beside them. An explicit list rather
// than a regex on the title — a title match put the table on lessons that
// merely said "form" in passing and left it off ones that needed it.
const QURAN_FORM_KEY_UNITS = new Set([
  'what-is-a-pattern', 'forms-in-english', 'form-markers-english',
  'form-markers-arabic', 'forms-master-table', 'one-root-ten-forms',
  'blank-table-practice', 'nazala-case-study', 'why-meanings-drift',
  'hollow-verbs', 'form-2-teach-or-intensify'
]);

function quranGrammarUnits() {
  return QURAN_GRAMMAR_UNITS.map((u, i) => ({ ...u, index: i }));
}
