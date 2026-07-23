// ============================================================================
// BookTutor — Quranic Arabic curriculum data (quran-roots-data.js)
//
// The closed-corpus backbone of the Quranic recipe: the highest-frequency
// vocabulary units of the Quran in descending corpus frequency, so lessons
// are ordered by how much of the actual text each unlocks, and the coverage
// meter ("you can now read X% of the Quran") is computed from THIS file —
// the LLM generates lesson content around these entries but never invents
// frequencies.
//
// Two kinds of entries:
//   kind:'particles' — standalone function words (prepositions, negations,
//     pronouns…). Not triliteral roots, but they are individually ~a quarter
//     of the Quran's tokens and are the fastest early coverage win.
//   kind:'root' — a triliteral root; its lesson teaches the whole derived
//     word family plus the pattern (wazn) connecting them.
//
// Counts are approximate token frequencies from the Quranic corpus
// (corpus.quran.com-style morphology counts, rounded). They set lesson ORDER
// and the coverage estimate; refining them against a fresh corpus dump only
// nudges the meter by a few points. Total word count: the standard ~77,430.
// ============================================================================

const QURAN_TOTAL_WORDS = 77430;

const QURAN_ROOTS = [
  // ── Function-word groups: the fastest honest coverage gains ──
  { id: 'p-core', kind: 'particles', root: 'مِن · فِي · عَلَى · إِلَى', translit: 'min · fī · ʿalā · ilā', gloss: 'from · in · upon · to', count: 7100,
    words: ['مِن', 'فِي', 'عَلَى', 'إِلَى', 'عَن', 'مَعَ'] },
  { id: 'p-negation', kind: 'particles', root: 'لَا · مَا · إِنَّ · قَد', translit: 'lā · mā · inna · qad', gloss: 'no/not · what/not · indeed · already', count: 6200,
    words: ['لَا', 'مَا', 'لَم', 'لَن', 'إِنَّ', 'قَد'] },
  { id: 'p-relative', kind: 'particles', root: 'الَّذِي · ذَٰلِكَ · هَٰذَا', translit: 'allaḏī · ḏālika · hāḏā', gloss: 'who/which · that · this', count: 2900,
    words: ['الَّذِي', 'الَّذِينَ', 'ذَٰلِكَ', 'هَٰذَا', 'أُولَٰئِكَ', 'تِلْكَ'] },
  { id: 'p-pronouns', kind: 'particles', root: 'هُوَ · هُم · أَنتُم · نَحْنُ', translit: 'huwa · hum · antum · naḥnu', gloss: 'he · they · you (pl) · we', count: 2500,
    words: ['هُوَ', 'هِيَ', 'هُم', 'أَنتُم', 'نَحْنُ', 'أَنَا'] },
  { id: 'p-condition', kind: 'particles', root: 'إِذَا · إِن · لَو · هَل', translit: 'iḏā · in · law · hal', gloss: 'when · if · if only · is it?', count: 1900,
    words: ['إِذَا', 'إِذ', 'إِن', 'لَو', 'هَل', 'ثُمَّ'] },

  // ── Roots, descending Quranic frequency ──
  { id: 'alh',  kind: 'root', root: 'أ ل ه', translit: 'ʾ-l-h', gloss: 'god, divinity (Allāh)', count: 2850 },
  { id: 'qwl',  kind: 'root', root: 'ق و ل', translit: 'q-w-l', gloss: 'saying, speech', count: 1720 },
  { id: 'kwn',  kind: 'root', root: 'ك و ن', translit: 'k-w-n', gloss: 'being, existence', count: 1390 },
  { id: 'rbb',  kind: 'root', root: 'ر ب ب', translit: 'r-b-b', gloss: 'lord, sustainer', count: 975 },
  { id: 'amn',  kind: 'root', root: 'أ م ن', translit: 'ʾ-m-n', gloss: 'faith, security, belief', count: 880 },
  { id: 'alm',  kind: 'root', root: 'ع ل م', translit: 'ʿ-l-m', gloss: 'knowledge, knowing', count: 855 },
  { id: 'qwm',  kind: 'root', root: 'ق و م', translit: 'q-w-m', gloss: 'standing, people, uprightness', count: 660 },
  { id: 'aty',  kind: 'root', root: 'أ ت ي', translit: 'ʾ-t-y', gloss: 'coming, bringing', count: 550 },
  { id: 'kfr',  kind: 'root', root: 'ك ف ر', translit: 'k-f-r', gloss: 'disbelief, ingratitude, covering', count: 525 },
  { id: 'shy',  kind: 'root', root: 'ش ي أ', translit: 'š-y-ʾ', gloss: 'thing, willing', count: 520 },
  { id: 'rsl',  kind: 'root', root: 'ر س ل', translit: 'r-s-l', gloss: 'sending, messenger', count: 515 },
  { id: 'ywm',  kind: 'root', root: 'ي و م', translit: 'y-w-m', gloss: 'day', count: 475 },
  { id: 'ard',  kind: 'root', root: 'أ ر ض', translit: 'ʾ-r-ḍ', gloss: 'earth, land', count: 460 },
  { id: 'ayy',  kind: 'root', root: 'أ ي ي', translit: 'ʾ-y-y', gloss: 'sign, verse (āyah)', count: 382 },
  { id: 'smw',  kind: 'root', root: 'س م و', translit: 's-m-w', gloss: 'height, heaven, name', count: 380 },
  { id: 'adhb', kind: 'root', root: 'ع ذ ب', translit: 'ʿ-ḏ-b', gloss: 'punishment, torment', count: 373 },
  { id: 'aml',  kind: 'root', root: 'ع م ل', translit: 'ʿ-m-l', gloss: 'doing, deeds, work', count: 360 },
  { id: 'nws',  kind: 'root', root: 'ن و س', translit: 'n-w-s', gloss: 'people, mankind (an-nās)', count: 350 },
  { id: 'jal',  kind: 'root', root: 'ج ع ل', translit: 'j-ʿ-l', gloss: 'making, placing, appointing', count: 346 },
  { id: 'ktb',  kind: 'root', root: 'ك ت ب', translit: 'k-t-b', gloss: 'writing, book, decree', count: 320 },
  { id: 'hdy',  kind: 'root', root: 'ه د ي', translit: 'h-d-y', gloss: 'guidance', count: 316 },
  { id: 'nfs',  kind: 'root', root: 'ن ف س', translit: 'n-f-s', gloss: 'soul, self', count: 298 },
  { id: 'nzl',  kind: 'root', root: 'ن ز ل', translit: 'n-z-l', gloss: 'sending down, revelation', count: 293 },
  { id: 'dhkr', kind: 'root', root: 'ذ ك ر', translit: 'ḏ-k-r', gloss: 'remembrance, mention', count: 292 },
  { id: 'hqq',  kind: 'root', root: 'ح ق ق', translit: 'ḥ-q-q', gloss: 'truth, right, reality', count: 287 },
  { id: 'abd',  kind: 'root', root: 'ع ب د', translit: 'ʿ-b-d', gloss: 'worship, servanthood', count: 275 },
  { id: 'khlq', kind: 'root', root: 'خ ل ق', translit: 'ḵ-l-q', gloss: 'creation', count: 261 },
  { id: 'amr',  kind: 'root', root: 'أ م ر', translit: 'ʾ-m-r', gloss: 'command, affair', count: 248 },
  { id: 'rhm',  kind: 'root', root: 'ر ح م', translit: 'r-ḥ-m', gloss: 'mercy, compassion', count: 339 },
  { id: 'khf',  kind: 'root', root: 'خ و ف', translit: 'ḵ-w-f', gloss: 'fear', count: 124 },
  { id: 'akhr', kind: 'root', root: 'أ خ ر', translit: 'ʾ-ḵ-r', gloss: 'other, last, hereafter', count: 250 },
  { id: 'nzr',  kind: 'root', root: 'ن ظ ر', translit: 'n-ẓ-r', gloss: 'looking, seeing, considering', count: 129 },
  { id: 'jnn',  kind: 'root', root: 'ج ن ن', translit: 'j-n-n', gloss: 'garden (jannah), concealment, jinn', count: 201 },
  { id: 'nar',  kind: 'root', root: 'ن و ر', translit: 'n-w-r', gloss: 'light, fire (nār)', count: 194 },
  { id: 'slm',  kind: 'root', root: 'س ل م', translit: 's-l-m', gloss: 'peace, submission (islām)', count: 140 },
  { id: 'ghfr', kind: 'root', root: 'غ ف ر', translit: 'ġ-f-r', gloss: 'forgiveness', count: 234 },
  { id: 'sbr',  kind: 'root', root: 'ص ب ر', translit: 'ṣ-b-r', gloss: 'patience, endurance', count: 103 },
  { id: 'slw',  kind: 'root', root: 'ص ل و', translit: 'ṣ-l-w', gloss: 'prayer (ṣalāh)', count: 99 },
  { id: 'khyr', kind: 'root', root: 'خ ي ر', translit: 'ḵ-y-r', gloss: 'good, better, choice', count: 196 },
  { id: 'shrk', kind: 'root', root: 'ش ر ك', translit: 'š-r-k', gloss: 'association, partnership (shirk)', count: 168 },
  { id: 'dny',  kind: 'root', root: 'د ن و', translit: 'd-n-w', gloss: 'nearness, this world (dunyā)', count: 133 },
  { id: 'qlb',  kind: 'root', root: 'ق ل ب', translit: 'q-l-b', gloss: 'heart, turning', count: 168 },
  { id: 'hsn',  kind: 'root', root: 'ح س ن', translit: 'ḥ-s-n', gloss: 'goodness, beauty, excellence', count: 194 },
  { id: 'wqy',  kind: 'root', root: 'و ق ي', translit: 'w-q-y', gloss: 'guarding, God-consciousness (taqwā)', count: 258 },
  { id: 'ahd',  kind: 'root', root: 'و ح د', translit: 'w-ḥ-d', gloss: 'oneness, unity', count: 68 },
  { id: 'bsr',  kind: 'root', root: 'ب ص ر', translit: 'b-ṣ-r', gloss: 'seeing, insight', count: 148 },
  { id: 'smaa', kind: 'root', root: 'س م ع', translit: 's-m-ʿ', gloss: 'hearing, listening', count: 185 },
  { id: 'dll',  kind: 'root', root: 'ض ل ل', translit: 'ḍ-l-l', gloss: 'going astray, error', count: 191 },
  { id: 'ghyb', kind: 'root', root: 'غ ي ب', translit: 'ġ-y-b', gloss: 'the unseen, absence', count: 60 },
  { id: 'mlk',  kind: 'root', root: 'م ل ك', translit: 'm-l-k', gloss: 'dominion, kingship, angel', count: 206 },
  { id: 'mwt',  kind: 'root', root: 'م و ت', translit: 'm-w-t', gloss: 'death', count: 165 },
  { id: 'hyy',  kind: 'root', root: 'ح ي ي', translit: 'ḥ-y-y', gloss: 'life, living', count: 184 },
  { id: 'rzq',  kind: 'root', root: 'ر ز ق', translit: 'r-z-q', gloss: 'provision, sustenance', count: 123 },
  { id: 'wld',  kind: 'root', root: 'و ل د', translit: 'w-l-d', gloss: 'child, birth', count: 102 },
  { id: 'qtl',  kind: 'root', root: 'ق ت ل', translit: 'q-t-l', gloss: 'killing, fighting', count: 170 },
  { id: 'zlm',  kind: 'root', root: 'ظ ل م', translit: 'ẓ-l-m', gloss: 'wrongdoing, injustice, darkness', count: 315 },
  { id: 'sdq',  kind: 'root', root: 'ص د ق', translit: 'ṣ-d-q', gloss: 'truthfulness, charity (ṣadaqah)', count: 155 },
  { id: 'wjh',  kind: 'root', root: 'و ج ه', translit: 'w-j-h', gloss: 'face, direction', count: 78 },
  { id: 'tbb',  kind: 'root', root: 'ت و ب', translit: 't-w-b', gloss: 'repentance, returning', count: 87 },
  { id: 'dua',  kind: 'root', root: 'د ع و', translit: 'd-ʿ-w', gloss: 'calling, supplication (duʿāʾ)', count: 212 },
  { id: 'khsr', kind: 'root', root: 'خ س ر', translit: 'ḵ-s-r', gloss: 'loss, ruin', count: 65 },
  { id: 'flh',  kind: 'root', root: 'ف ل ح', translit: 'f-l-ḥ', gloss: 'success, prosperity', count: 40 },
  { id: 'jzy',  kind: 'root', root: 'ج ز ي', translit: 'j-z-y', gloss: 'recompense, reward', count: 118 },
  { id: 'shhd', kind: 'root', root: 'ش ه د', translit: 'š-h-d', gloss: 'witnessing, testimony', count: 160 },
  { id: 'nsr',  kind: 'root', root: 'ن ص ر', translit: 'n-ṣ-r', gloss: 'help, victory', count: 158 },
  { id: 'rj3',  kind: 'root', root: 'ر ج ع', translit: 'r-j-ʿ', gloss: 'returning', count: 104 },
  { id: 'khrj', kind: 'root', root: 'خ ر ج', translit: 'ḵ-r-j', gloss: 'going out, bringing forth', count: 182 },
  { id: 'dkhl', kind: 'root', root: 'د خ ل', translit: 'd-ḵ-l', gloss: 'entering', count: 126 },
  { id: 'ba3th',kind: 'root', root: 'ب ع ث', translit: 'b-ʿ-ṯ', gloss: 'raising, resurrection', count: 67 },
  { id: 'wʿd',  kind: 'root', root: 'و ع د', translit: 'w-ʿ-d', gloss: 'promise', count: 151 },
  { id: 'ttbʿ', kind: 'root', root: 'ت ب ع', translit: 't-b-ʿ', gloss: 'following', count: 172 },
  { id: 'sbl',  kind: 'root', root: 'س ب ل', translit: 's-b-l', gloss: 'path, way (sabīl)', count: 176 },
  { id: 'srt',  kind: 'root', root: 'ص ر ط', translit: 'ṣ-r-ṭ', gloss: 'path (ṣirāṭ)', count: 45 },
  { id: 'ajr',  kind: 'root', root: 'أ ج ر', translit: 'ʾ-j-r', gloss: 'reward, wage', count: 105 },
  { id: 'dhbb', kind: 'root', root: 'ذ ه ب', translit: 'ḏ-h-b', gloss: 'going, gold', count: 56 },
  { id: 'aqll', kind: 'root', root: 'ع ق ل', translit: 'ʿ-q-l', gloss: 'reason, understanding', count: 49 },
  { id: 'fkr',  kind: 'root', root: 'ف ك ر', translit: 'f-k-r', gloss: 'reflection, thought', count: 18 },
  { id: 'aya',  kind: 'root', root: 'ع ي ن', translit: 'ʿ-y-n', gloss: 'eye, spring', count: 65 },
  { id: 'ydd',  kind: 'root', root: 'ي د ي', translit: 'y-d-y', gloss: 'hand', count: 120 },
  { id: 'qdm',  kind: 'root', root: 'ق د م', translit: 'q-d-m', gloss: 'preceding, advancing, foot', count: 48 },
  { id: 'blgh', kind: 'root', root: 'ب ل غ', translit: 'b-l-ġ', gloss: 'reaching, conveying', count: 77 },
  { id: 'wsʿ',  kind: 'root', root: 'و س ع', translit: 'w-s-ʿ', gloss: 'vastness, capacity', count: 32 },
  { id: 'ʿzz',  kind: 'root', root: 'ع ز ز', translit: 'ʿ-z-z', gloss: 'might, honor (ʿazīz)', count: 119 },
  { id: 'hkm',  kind: 'root', root: 'ح ك م', translit: 'ḥ-k-m', gloss: 'judgment, wisdom', count: 210 },
  { id: 'ʿfw',  kind: 'root', root: 'ع ف و', translit: 'ʿ-f-w', gloss: 'pardon', count: 35 },
  { id: 'qdr',  kind: 'root', root: 'ق د ر', translit: 'q-d-r', gloss: 'power, decree, measure', count: 132 },
  { id: 'shkr', kind: 'root', root: 'ش ك ر', translit: 'š-k-r', gloss: 'gratitude', count: 75 },
  { id: 'fdl',  kind: 'root', root: 'ف ض ل', translit: 'f-ḍ-l', gloss: 'bounty, favor, preference', count: 104 },
  { id: 'nʿm',  kind: 'root', root: 'ن ع م', translit: 'n-ʿ-m', gloss: 'blessing, favor', count: 144 },
  { id: 'ḥmd',  kind: 'root', root: 'ح م د', translit: 'ḥ-m-d', gloss: 'praise', count: 68 },
  { id: 'sjd',  kind: 'root', root: 'س ج د', translit: 's-j-d', gloss: 'prostration', count: 92 },
  { id: 'rk3',  kind: 'root', root: 'ر ك ع', translit: 'r-k-ʿ', gloss: 'bowing', count: 13 },
  { id: 'zky',  kind: 'root', root: 'ز ك و', translit: 'z-k-w', gloss: 'purification, growth (zakāh)', count: 59 },
  { id: 'swm',  kind: 'root', root: 'ص و م', translit: 'ṣ-w-m', gloss: 'fasting', count: 14 },
  { id: 'hjj',  kind: 'root', root: 'ح ج ج', translit: 'ḥ-j-j', gloss: 'pilgrimage, argument', count: 33 },
  { id: 'msk',  kind: 'root', root: 'م س ك', translit: 'm-s-k', gloss: 'holding, grasping', count: 27 },
  { id: 'ahl',  kind: 'root', root: 'أ ه ل', translit: 'ʾ-h-l', gloss: 'family, people of', count: 127 },
  { id: 'bytt', kind: 'root', root: 'ب ي ت', translit: 'b-y-t', gloss: 'house', count: 73 },
  { id: 'mdn',  kind: 'root', root: 'م د ن', translit: 'm-d-n', gloss: 'city', count: 17 },
  { id: 'qry',  kind: 'root', root: 'ق ر ي', translit: 'q-r-y', gloss: 'town', count: 57 },
  { id: 'jbl',  kind: 'root', root: 'ج ب ل', translit: 'j-b-l', gloss: 'mountain', count: 41 },
  { id: 'bhr',  kind: 'root', root: 'ب ح ر', translit: 'b-ḥ-r', gloss: 'sea', count: 42 },
  { id: 'shms', kind: 'root', root: 'ش م س', translit: 'š-m-s', gloss: 'sun', count: 33 },
  { id: 'qmr',  kind: 'root', root: 'ق م ر', translit: 'q-m-r', gloss: 'moon', count: 27 },
  { id: 'njm',  kind: 'root', root: 'ن ج م', translit: 'n-j-m', gloss: 'star', count: 13 },
  { id: 'lyl',  kind: 'root', root: 'ل ي ل', translit: 'l-y-l', gloss: 'night', count: 92 },
  { id: 'nhr',  kind: 'root', root: 'ن ه ر', translit: 'n-h-r', gloss: 'river, daytime', count: 113 },
  { id: 'ma',   kind: 'root', root: 'م و ه', translit: 'm-w-h', gloss: 'water', count: 63 },
  { id: 'trb',  kind: 'root', root: 'ت ر ب', translit: 't-r-b', gloss: 'dust, earth', count: 22 },
  { id: 'tyn',  kind: 'root', root: 'ط ي ن', translit: 'ṭ-y-n', gloss: 'clay', count: 12 },
  { id: 'rwh',  kind: 'root', root: 'ر و ح', translit: 'r-w-ḥ', gloss: 'spirit, rest', count: 57 },
  { id: 'ʿrf',  kind: 'root', root: 'ع ر ف', translit: 'ʿ-r-f', gloss: 'knowing, recognition', count: 70 },
  { id: 'fhm',  kind: 'root', root: 'ف ه م', translit: 'f-h-m', gloss: 'understanding', count: 1 },
  { id: 'ʿlw',  kind: 'root', root: 'ع ل و', translit: 'ʿ-l-w', gloss: 'height, exaltation', count: 70 },
  { id: 'kbr',  kind: 'root', root: 'ك ب ر', translit: 'k-b-r', gloss: 'greatness', count: 161 },
  { id: 'sghr', kind: 'root', root: 'ص غ ر', translit: 'ṣ-ġ-r', gloss: 'smallness', count: 13 },
  { id: 'kthr', kind: 'root', root: 'ك ث ر', translit: 'k-ṯ-r', gloss: 'abundance', count: 167 },
  { id: 'qll',  kind: 'root', root: 'ق ل ل', translit: 'q-l-l', gloss: 'fewness', count: 76 },
  { id: 'ʿzm',  kind: 'root', root: 'ع ظ م', translit: 'ʿ-ẓ-m', gloss: 'greatness, magnificence', count: 128 },
  { id: 'krm',  kind: 'root', root: 'ك ر م', translit: 'k-r-m', gloss: 'nobility, generosity', count: 47 },
  { id: 'brk',  kind: 'root', root: 'ب ر ك', translit: 'b-r-k', gloss: 'blessing', count: 32 }
];

// Teaching order: function-word groups first (fastest honest coverage wins),
// then roots strictly by descending corpus frequency — computed here so the
// entries above never need to be kept hand-sorted.
const QURAN_SEQUENCE = [
  ...QURAN_ROOTS.filter(e => e.kind === 'particles'),
  ...QURAN_ROOTS.filter(e => e.kind === 'root').sort((a, b) => b.count - a.count)
];

// Fraction of the Quran's tokens covered by the learned entries (0..1)
function quranCoverage(learnedIds = []) {
  const set = new Set(learnedIds);
  const covered = QURAN_ROOTS.reduce((sum, e) => sum + (set.has(e.id) ? e.count : 0), 0);
  return Math.min(1, covered / QURAN_TOTAL_WORDS);
}

// The next entry to teach, in curriculum order
function nextQuranRoot(learnedIds = []) {
  const set = new Set(learnedIds);
  return QURAN_SEQUENCE.find(e => !set.has(e.id)) || null;
}
