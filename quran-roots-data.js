// ============================================================================
// BookTutor — the 300 Qur'anic roots (quran-roots-data.js)
//
// GENERATED — do not hand-edit. Re-run tools/build-roots300.cjs, which builds
// this from tools/roots300-source.txt: the learner's own list of 300 roots,
// written in his ChatGPT session, in five sets of sixty.
//
// The order is his. The meanings are his words, with the wording from his
// repeated rows merged in rather than thrown away. Roots are written JOINED —
// كتب, not ك ت ب — because that is how a root list is written and how he wrote
// it; the spaced form was never a word anyone meets on the page.
//
// Where his list repeated a root, the row was refilled with the highest-
// frequency root his list never reached, so there are 300 DISTINCT roots and
// none of the sixty-slots are spent twice on the same one.
//
// Every Arabic string below occurs in quran-text.js — checked at build time,
// form by form. `headword` is a real vowelled wordform and stays the front of
// the flashcard; `root` is what unifies the family and is what the list shows.
//
// `count` is approximate: for roots carried over from the corpus data it is
// that data's frequency, and for roots this list added it is how often the
// forms shipped here actually occur — an undercount rather than a guess. It
// sets the coverage estimate only; nothing is ordered by it.
// ============================================================================

const QURAN_TOTAL_WORDS = 77430;

// Sixty at a time, which is the way the course teaches them: five sets you can
// finish, not one list of 300 you abandon at forty.
const QURAN_ROOT_SETS = [
  { set: 1, from: 1,   to: 60,  title: 'Top Qurʾānic Roots' },
  { set: 2, from: 61,  to: 120, title: 'Qurʾānic Roots' },
  { set: 3, from: 121, to: 180, title: 'Qurʾānic Roots' },
  { set: 4, from: 181, to: 240, title: 'Qurʾānic Roots' },
  { set: 5, from: 241, to: 300, title: 'Qurʾānic Roots' }
];

const QURAN_ROOTS = [
 {
  "id": "ktb",
  "n": 1,
  "set": 1,
  "kind": "root",
  "root": "كتب",
  "translit": "k-t-b",
  "gloss": "write, book, decree, prescribed, prescribe, record",
  "count": 320,
  "headword": "ٱلْكِتَٰبِ",
  "headwordGloss": "the Book",
  "family": [
   {
    "word": "كِتَٰبٌ",
    "gloss": "a book / a decree"
   },
   {
    "word": "كُتِبَ",
    "gloss": "it was prescribed"
   },
   {
    "word": "كَتَبْنَا",
    "gloss": "We wrote/prescribed"
   },
   {
    "word": "يَكْتُبُونَ",
    "gloss": "they write"
   },
   {
    "word": "مَكْتُوبًا",
    "gloss": "written / prescribed"
   }
  ],
  "verse": {
   "ref": "26:2",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "تِلْكَ ءَايَٰتُ ٱلْكِتَٰبِ ٱلْمُبِينِ"
  }
 },
 {
  "id": "qwl",
  "n": 2,
  "set": 1,
  "kind": "root",
  "root": "قول",
  "translit": "q-w-l",
  "gloss": "say, speak",
  "count": 1720,
  "headword": "قَالَ",
  "headwordGloss": "he said",
  "family": [
   {
    "word": "قُلْ",
    "gloss": "say! (to one)"
   },
   {
    "word": "قَالُوا۟",
    "gloss": "they said"
   },
   {
    "word": "يَقُولُ",
    "gloss": "he says"
   },
   {
    "word": "يَقُولُونَ",
    "gloss": "they say"
   },
   {
    "word": "قَوْلٌ",
    "gloss": "a saying; speech"
   },
   {
    "word": "قِيلَ",
    "gloss": "it was said"
   }
  ],
  "verse": {
   "ref": "20:19",
   "surah": "Sūrat Taa-Haa",
   "text": "قَالَ أَلْقِهَا يَٰمُوسَىٰ"
  }
 },
 {
  "id": "alm",
  "n": 3,
  "set": 1,
  "kind": "root",
  "root": "علم",
  "translit": "ʿ-l-m",
  "gloss": "know, knowledge, awareness",
  "count": 855,
  "headword": "يَعْلَمُونَ",
  "headwordGloss": "they know",
  "family": [
   {
    "word": "يَعْلَمُ",
    "gloss": "he knows"
   },
   {
    "word": "ٱعْلَمُوا۟",
    "gloss": "know! (pl.)"
   },
   {
    "word": "عِلْمٌ",
    "gloss": "knowledge"
   },
   {
    "word": "عَلِيمٌ",
    "gloss": "All-Knowing"
   }
  ],
  "verse": {
   "ref": "78:5",
   "surah": "Sūrat An-Naba",
   "text": "ثُمَّ كَلَّا سَيَعْلَمُونَ"
  }
 },
 {
  "id": "fl",
  "n": 4,
  "set": 1,
  "kind": "root",
  "root": "فعل",
  "translit": "f-ʿ-l",
  "gloss": "do, act",
  "count": 183,
  "headword": "يَفْعَلُ",
  "headwordGloss": "he does",
  "family": [
   {
    "word": "يَفْعَلُ",
    "gloss": "he does"
   },
   {
    "word": "يَفْعَلُونَ",
    "gloss": "they do"
   },
   {
    "word": "فَعَلَ",
    "gloss": "he did"
   },
   {
    "word": "تَفْعَلُونَ",
    "gloss": "you do"
   },
   {
    "word": "فَٰعِلِينَ",
    "gloss": "doers"
   },
   {
    "word": "مَفْعُولًا",
    "gloss": "done, carried out"
   }
  ],
  "verse": {
   "ref": "75:25",
   "surah": "Sūrat Al-Qiyaama",
   "text": "تَظُنُّ أَن يُفْعَلَ بِهَا فَاقِرَةٌۭ"
  }
 },
 {
  "id": "jal",
  "n": 5,
  "set": 1,
  "kind": "root",
  "root": "جعل",
  "translit": "j-ʿ-l",
  "gloss": "make, appoint",
  "count": 346,
  "headword": "جَعَلْنَا",
  "headwordGloss": "We made/placed",
  "family": [
   {
    "word": "جَعَلَ",
    "gloss": "he made/placed"
   },
   {
    "word": "يَجْعَلُ",
    "gloss": "he makes/places"
   },
   {
    "word": "ٱجْعَلْ",
    "gloss": "make! / place!"
   },
   {
    "word": "جَعَلْتَ",
    "gloss": "you made/placed"
   },
   {
    "word": "جُعِلَ",
    "gloss": "it was made/placed"
   }
  ],
  "verse": {
   "ref": "78:10",
   "surah": "Sūrat An-Naba",
   "text": "وَجَعَلْنَا ٱلَّيْلَ لِبَاسًۭا"
  }
 },
 {
  "id": "khlq",
  "n": 6,
  "set": 1,
  "kind": "root",
  "root": "خلق",
  "translit": "ḵ-l-q",
  "gloss": "create, originate",
  "count": 261,
  "headword": "خَلَقَ",
  "headwordGloss": "He created",
  "family": [
   {
    "word": "خَلَقْنَا",
    "gloss": "We created"
   },
   {
    "word": "خَلَقَكُمْ",
    "gloss": "He created you"
   },
   {
    "word": "ٱلْخَلْقَ",
    "gloss": "the creation"
   }
  ],
  "verse": {
   "ref": "78:8",
   "surah": "Sūrat An-Naba",
   "text": "وَخَلَقْنَٰكُمْ أَزْوَٰجًۭا"
  }
 },
 {
  "id": "amn",
  "n": 7,
  "set": 1,
  "kind": "root",
  "root": "أمن",
  "translit": "ʾ-m-n",
  "gloss": "believe, trust, safety, security, belief",
  "count": 880,
  "headword": "ءَامَنُوا۟",
  "headwordGloss": "they believed",
  "family": [
   {
    "word": "ءَامَنَ",
    "gloss": "he believed"
   },
   {
    "word": "يُؤْمِنُ",
    "gloss": "he believes"
   },
   {
    "word": "يُؤْمِنُونَ",
    "gloss": "they believe"
   },
   {
    "word": "إِيمَٰنٌ",
    "gloss": "faith; belief"
   },
   {
    "word": "أَمْنًا",
    "gloss": "security; safety"
   },
   {
    "word": "ٱلْمُؤْمِنُونَ",
    "gloss": "the believers"
   }
  ],
  "verse": {
   "ref": "10:63",
   "surah": "Sūrat Yunus",
   "text": "ٱلَّذِينَ ءَامَنُوا۟ وَكَانُوا۟ يَتَّقُونَ"
  }
 },
 {
  "id": "hdy",
  "n": 8,
  "set": 1,
  "kind": "root",
  "root": "هدي",
  "translit": "h-d-y",
  "gloss": "guide, guidance",
  "count": 316,
  "headword": "هُدًى",
  "headwordGloss": "guidance",
  "family": [
   {
    "word": "ٱهْدِنَا",
    "gloss": "guide us"
   },
   {
    "word": "يَهْدِي",
    "gloss": "He guides"
   },
   {
    "word": "ٱهْتَدَىٰ",
    "gloss": "he was guided"
   },
   {
    "word": "ٱهْتَدَوْا۟",
    "gloss": "they were guided"
   },
   {
    "word": "مُهْتَدُونَ",
    "gloss": "rightly-guided"
   }
  ],
  "verse": {
   "ref": "87:3",
   "surah": "Sūrat Al-A'laa",
   "text": "وَٱلَّذِى قَدَّرَ فَهَدَىٰ"
  }
 },
 {
  "id": "abd",
  "n": 9,
  "set": 1,
  "kind": "root",
  "root": "عبد",
  "translit": "ʿ-b-d",
  "gloss": "worship, servant, servitude, serve",
  "count": 275,
  "headword": "عِبَادِ",
  "headwordGloss": "(of) servants",
  "family": [
   {
    "word": "عَبْدٌ",
    "gloss": "a servant"
   },
   {
    "word": "عِبَادًا",
    "gloss": "servants"
   },
   {
    "word": "يَعْبُدُونَ",
    "gloss": "they worship"
   },
   {
    "word": "ٱعْبُدُوا۟",
    "gloss": "worship!"
   },
   {
    "word": "عِبَادَةً",
    "gloss": "worship"
   }
  ],
  "verse": {
   "ref": "37:40",
   "surah": "Sūrat As-Saaffaat",
   "text": "إِلَّا عِبَادَ ٱللَّهِ ٱلْمُخْلَصِينَ"
  }
 },
 {
  "id": "rhm",
  "n": 10,
  "set": 1,
  "kind": "root",
  "root": "رحم",
  "translit": "r-ḥ-m",
  "gloss": "mercy, compassion",
  "count": 339,
  "headword": "رَحْمَةِ",
  "headwordGloss": "mercy",
  "family": [
   {
    "word": "رَحْمَتِى",
    "gloss": "My mercy"
   },
   {
    "word": "رَحِيمٌ",
    "gloss": "especially merciful"
   },
   {
    "word": "رَحْمَٰنٌ",
    "gloss": "the All-Merciful"
   },
   {
    "word": "ٱرْحَمْنَا",
    "gloss": "have mercy on us"
   },
   {
    "word": "يَرْحَمُ",
    "gloss": "He has mercy"
   },
   {
    "word": "أَرْحَامِ",
    "gloss": "wombs/kinship ties"
   }
  ],
  "verse": {
   "ref": "31:3",
   "surah": "Sūrat Luqman",
   "text": "هُدًۭى وَرَحْمَةًۭ لِّلْمُحْسِنِينَ"
  }
 },
 {
  "id": "ghfr",
  "n": 11,
  "set": 1,
  "kind": "root",
  "root": "غفر",
  "translit": "ġ-f-r",
  "gloss": "forgive, forgiveness, seek forgiveness",
  "count": 234,
  "headword": "غَفُورٌ",
  "headwordGloss": "All-Forgiving",
  "family": [
   {
    "word": "مَغْفِرَةٌ",
    "gloss": "forgiveness"
   },
   {
    "word": "ٱسْتَغْفِرُوا۟",
    "gloss": "seek forgiveness!"
   },
   {
    "word": "ٱغْفِرْ",
    "gloss": "forgive!"
   },
   {
    "word": "غَفَّارٌ",
    "gloss": "Oft-Forgiving"
   }
  ],
  "verse": {
   "ref": "85:14",
   "surah": "Sūrat Al-Burooj",
   "text": "وَهُوَ ٱلْغَفُورُ ٱلْوَدُودُ"
  }
 },
 {
  "id": "amr",
  "n": 12,
  "set": 1,
  "kind": "root",
  "root": "أمر",
  "translit": "ʾ-m-r",
  "gloss": "command, order, affair",
  "count": 248,
  "headword": "أَمْرِ",
  "headwordGloss": "command/affair",
  "family": [
   {
    "word": "أَمْرًا",
    "gloss": "a matter/command"
   },
   {
    "word": "ٱلْأَمْرَ",
    "gloss": "the matter/command"
   },
   {
    "word": "يَأْمُرُ",
    "gloss": "he commands"
   },
   {
    "word": "أَمَرْنَا",
    "gloss": "We commanded"
   },
   {
    "word": "أُمِرْتُ",
    "gloss": "I was commanded"
   }
  ],
  "verse": {
   "ref": "20:32",
   "surah": "Sūrat Taa-Haa",
   "text": "وَأَشْرِكْهُ فِىٓ أَمْرِى"
  }
 },
 {
  "id": "rzq",
  "n": 13,
  "set": 1,
  "kind": "root",
  "root": "رزق",
  "translit": "r-z-q",
  "gloss": "provide, sustenance, provision",
  "count": 123,
  "headword": "رِزْقًا",
  "headwordGloss": "provision",
  "family": [
   {
    "word": "رَزَقْنَا",
    "gloss": "We provided"
   },
   {
    "word": "يَرْزُقُ",
    "gloss": "He provides"
   },
   {
    "word": "ٱرْزُقْنَا",
    "gloss": "provide for us"
   }
  ],
  "verse": {
   "ref": "50:11",
   "surah": "Sūrat Qaaf",
   "text": "رِّزْقًۭا لِّلْعِبَادِ ۖ وَأَحْيَيْنَا بِهِۦ بَلْدَةًۭ مَّيْتًۭا ۚ كَذَٰلِكَ ٱلْخُرُوجُ"
  }
 },
 {
  "id": "nzl",
  "n": 14,
  "set": 1,
  "kind": "root",
  "root": "نزل",
  "translit": "n-z-l",
  "gloss": "descend, send down",
  "count": 293,
  "headword": "أَنزَلَ",
  "headwordGloss": "He sent down",
  "family": [
   {
    "word": "نَزَّلَ",
    "gloss": "He sent down (repeatedly)"
   },
   {
    "word": "نَزَلَ",
    "gloss": "he/it came down"
   },
   {
    "word": "نَزَّلْنَا",
    "gloss": "We sent down"
   },
   {
    "word": "تَنزِيلٌ",
    "gloss": "a sending-down; revelation"
   },
   {
    "word": "مُنَزَّلٌ",
    "gloss": "sent down"
   }
  ],
  "verse": {
   "ref": "15:90",
   "surah": "Sūrat Al-Hijr",
   "text": "كَمَآ أَنزَلْنَا عَلَى ٱلْمُقْتَسِمِينَ"
  }
 },
 {
  "id": "aml",
  "n": 15,
  "set": 1,
  "kind": "root",
  "root": "عمل",
  "translit": "ʿ-m-l",
  "gloss": "deed, action",
  "count": 360,
  "headword": "عَمَلٌ",
  "headwordGloss": "deed / work",
  "family": [
   {
    "word": "عَمِلُوا۟",
    "gloss": "they did"
   },
   {
    "word": "يَعْمَلُونَ",
    "gloss": "they do"
   },
   {
    "word": "ٱعْمَلُوا۟",
    "gloss": "do! (pl.)"
   },
   {
    "word": "عَمَلًا",
    "gloss": "a deed (acc.)"
   },
   {
    "word": "عَٰمِلُونَ",
    "gloss": "doers / workers"
   },
   {
    "word": "صَٰلِحًا",
    "gloss": "righteous (as in عَمَلًا صَٰلِحًا)"
   }
  ],
  "verse": {
   "ref": "15:93",
   "surah": "Sūrat Al-Hijr",
   "text": "عَمَّا كَانُوا۟ يَعْمَلُونَ"
  }
 },
 {
  "id": "kfr",
  "n": 16,
  "set": 1,
  "kind": "root",
  "root": "كفر",
  "translit": "k-f-r",
  "gloss": "disbelieve, reject, cover up truth",
  "count": 525,
  "headword": "ٱلَّذِينَ كَفَرُوا۟",
  "headwordGloss": "those who disbelieved",
  "family": [
   {
    "word": "كَفَرَ",
    "gloss": "he disbelieved"
   },
   {
    "word": "يَكْفُرُ",
    "gloss": "he disbelieves"
   },
   {
    "word": "يَكْفُرُونَ",
    "gloss": "they disbelieve"
   },
   {
    "word": "كُفْرٌ",
    "gloss": "disbelief"
   },
   {
    "word": "كَافِرٌ",
    "gloss": "disbeliever"
   },
   {
    "word": "ٱلْكُفَّارُ",
    "gloss": "the disbelievers"
   }
  ],
  "verse": {
   "ref": "84:22",
   "surah": "Sūrat Al-Inshiqaaq",
   "text": "بَلِ ٱلَّذِينَ كَفَرُوا۟ يُكَذِّبُونَ"
  }
 },
 {
  "id": "jhl",
  "n": 17,
  "set": 1,
  "kind": "root",
  "root": "جهل",
  "translit": "j-h-l",
  "gloss": "ignorance",
  "count": 19,
  "headword": "ٱلْجَٰهِلِينَ",
  "headwordGloss": "the ignorant",
  "family": [
   {
    "word": "ٱلْجَٰهِلِينَ",
    "gloss": "the ignorant"
   },
   {
    "word": "بِجَهَٰلَةٍ",
    "gloss": "in ignorance"
   },
   {
    "word": "تَجْهَلُونَ",
    "gloss": "you are ignorant"
   },
   {
    "word": "ٱلْجَٰهِلِيَّةِ",
    "gloss": "the age of ignorance"
   },
   {
    "word": "جَهُولًا",
    "gloss": "greatly ignorant"
   }
  ],
  "verse": {
   "ref": "7:199",
   "surah": "Sūrat Al-A'raaf",
   "text": "خُذِ ٱلْعَفْوَ وَأْمُرْ بِٱلْعُرْفِ وَأَعْرِضْ عَنِ ٱلْجَٰهِلِينَ"
  }
 },
 {
  "id": "smaa",
  "n": 18,
  "set": 1,
  "kind": "root",
  "root": "سمع",
  "translit": "s-m-ʿ",
  "gloss": "hear, hearing, perception",
  "count": 185,
  "headword": "يَسْمَعُونَ",
  "headwordGloss": "they hear",
  "family": [
   {
    "word": "سَمِعْنَا",
    "gloss": "we heard"
   },
   {
    "word": "سَمِعُوا۟",
    "gloss": "they heard"
   },
   {
    "word": "ٱسْمَعْ",
    "gloss": "listen!"
   },
   {
    "word": "سَمِيعٌ",
    "gloss": "All-Hearing"
   },
   {
    "word": "ٱلسَّمْعَ",
    "gloss": "hearing"
   },
   {
    "word": "سَمَّٰعُونَ",
    "gloss": "eager listeners"
   }
  ],
  "verse": {
   "ref": "26:72",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "قَالَ هَلْ يَسْمَعُونَكُمْ إِذْ تَدْعُونَ"
  }
 },
 {
  "id": "bsr",
  "n": 19,
  "set": 1,
  "kind": "root",
  "root": "بصر",
  "translit": "b-ṣ-r",
  "gloss": "see, sight, vision",
  "count": 148,
  "headword": "يُبْصِرُونَ",
  "headwordGloss": "they see",
  "family": [
   {
    "word": "بَصَرٌ",
    "gloss": "sight"
   },
   {
    "word": "ٱلْأَبْصَٰرَ",
    "gloss": "the sights/eyes"
   },
   {
    "word": "بَصِيرٌ",
    "gloss": "All-Seeing / seeing"
   },
   {
    "word": "بَصِيرَةٍ",
    "gloss": "clear insight"
   },
   {
    "word": "أَبْصِرْ",
    "gloss": "see!"
   },
   {
    "word": "لَا يُبْصِرُونَ",
    "gloss": "they do not see"
   }
  ],
  "verse": {
   "ref": "68:5",
   "surah": "Sūrat Al-Qalam",
   "text": "فَسَتُبْصِرُ وَيُبْصِرُونَ"
  }
 },
 {
  "id": "nsr",
  "n": 20,
  "set": 1,
  "kind": "root",
  "root": "نصر",
  "translit": "n-ṣ-r",
  "gloss": "help, victory",
  "count": 158,
  "headword": "يَنصُرُ",
  "headwordGloss": "he helps",
  "family": [
   {
    "word": "نَصَرَ",
    "gloss": "he helped"
   },
   {
    "word": "نَصَرْنَا",
    "gloss": "We helped"
   },
   {
    "word": "نَصْرٌ",
    "gloss": "help; victory"
   },
   {
    "word": "نَصْرَ ٱللَّهِ",
    "gloss": "Allah’s help"
   },
   {
    "word": "نَاصِرٍ",
    "gloss": "a helper"
   },
   {
    "word": "ٱلْمَنصُورُ",
    "gloss": "the one given victory"
   }
  ],
  "verse": {
   "ref": "48:3",
   "surah": "Sūrat Al-Fath",
   "text": "وَيَنصُرَكَ ٱللَّهُ نَصْرًا عَزِيزًا"
  }
 },
 {
  "id": "sbr",
  "n": 21,
  "set": 1,
  "kind": "root",
  "root": "صبر",
  "translit": "ṣ-b-r",
  "gloss": "patience, perseverance, endurance",
  "count": 103,
  "headword": "ٱصْبِرُوا۟",
  "headwordGloss": "be patient!",
  "family": [
   {
    "word": "ٱصْبِرْ",
    "gloss": "be patient!"
   },
   {
    "word": "صَبْرٌ",
    "gloss": "patience"
   },
   {
    "word": "صَابِرٌ",
    "gloss": "patient/steadfast"
   },
   {
    "word": "صَبَرُوا۟",
    "gloss": "they were patient"
   },
   {
    "word": "صَبْرًا",
    "gloss": "with patience"
   }
  ],
  "verse": {
   "ref": "38:6",
   "surah": "Sūrat Saad",
   "text": "وَٱنطَلَقَ ٱلْمَلَأُ مِنْهُمْ أَنِ ٱمْشُوا۟ وَٱصْبِرُوا۟ عَلَىٰٓ ءَالِهَتِكُمْ ۖ إِنَّ هَٰذَا لَشَىْءٌۭ يُرَادُ"
  }
 },
 {
  "id": "shkr",
  "n": 22,
  "set": 1,
  "kind": "root",
  "root": "شكر",
  "translit": "š-k-r",
  "gloss": "gratitude, thanks",
  "count": 75,
  "headword": "شَكُورٌ",
  "headwordGloss": "Most Appreciative",
  "family": [
   {
    "word": "شَكَرْتُمْ",
    "gloss": "you were grateful"
   },
   {
    "word": "لَئِن شَكَرْتُمْ",
    "gloss": "if you are grateful"
   },
   {
    "word": "ٱشْكُرُوا۟",
    "gloss": "be grateful!"
   },
   {
    "word": "شَاكِرٌ",
    "gloss": "grateful"
   },
   {
    "word": "شَٰكِرِينَ",
    "gloss": "those grateful"
   },
   {
    "word": "شَكُورًا",
    "gloss": "ever-grateful"
   }
  ],
  "verse": {
   "ref": "76:22",
   "surah": "Sūrat Al-Insaan",
   "text": "إِنَّ هَٰذَا كَانَ لَكُمْ جَزَآءًۭ وَكَانَ سَعْيُكُم مَّشْكُورًا"
  }
 },
 {
  "id": "zlm",
  "n": 23,
  "set": 1,
  "kind": "root",
  "root": "ظلم",
  "translit": "ẓ-l-m",
  "gloss": "wrong, oppress, injustice, wrongdoing",
  "count": 315,
  "headword": "ٱلظَّٰلِمِينَ",
  "headwordGloss": "the wrongdoers",
  "family": [
   {
    "word": "ظَلَمُوا۟",
    "gloss": "they wronged"
   },
   {
    "word": "يَظْلِمُ",
    "gloss": "he wrongs"
   },
   {
    "word": "ظُلْمًا",
    "gloss": "wrongdoing"
   },
   {
    "word": "ظُلُمَٰتٌ",
    "gloss": "darknesses"
   },
   {
    "word": "مَظْلُومًا",
    "gloss": "wronged (one)"
   },
   {
    "word": "لَا تَظْلِمُونَ",
    "gloss": "you will not be wronged"
   }
  ],
  "verse": {
   "ref": "23:94",
   "surah": "Sūrat Al-Muminoon",
   "text": "رَبِّ فَلَا تَجْعَلْنِى فِى ٱلْقَوْمِ ٱلظَّٰلِمِينَ"
  }
 },
 {
  "id": "ʿdl",
  "n": 24,
  "set": 1,
  "kind": "root",
  "root": "عدل",
  "translit": "ʿ-d-l",
  "gloss": "justice, balance, equity, fairness",
  "count": 28,
  "headword": "ٱلْعَدْلَ",
  "headwordGloss": "justice",
  "family": [
   {
    "word": "ٱعْدِلُوا۟",
    "gloss": "be just"
   },
   {
    "word": "يَعْدِلُونَ",
    "gloss": "they act justly"
   },
   {
    "word": "عَدْلًا",
    "gloss": "equivalently; justly"
   },
   {
    "word": "عَدْلٌ",
    "gloss": "an equivalent"
   }
  ],
  "verse": {
   "ref": "16:90",
   "surah": "Sūrat An-Nahl",
   "text": "۞ إِنَّ ٱللَّهَ يَأْمُرُ بِٱلْعَدْلِ وَٱلْإِحْسَٰنِ وَإِيتَآئِ ذِى ٱلْقُرْبَىٰ وَيَنْهَىٰ عَنِ ٱلْفَحْشَآءِ وَٱلْمُنكَرِ وَٱلْبَغْىِ ۚ يَعِظُكُمْ لَعَلَّكُمْ تَذَكَّرُونَ"
  }
 },
 {
  "id": "sdq",
  "n": 25,
  "set": 1,
  "kind": "root",
  "root": "صدق",
  "translit": "ṣ-d-q",
  "gloss": "truth, sincerity, truthfulness, charity, believe, affirm truth",
  "count": 155,
  "headword": "صَدَقُوا۟",
  "headwordGloss": "they were truthful",
  "family": [
   {
    "word": "يَصْدُقُ",
    "gloss": "he is truthful"
   },
   {
    "word": "صِدْقٍ",
    "gloss": "truthfulness"
   },
   {
    "word": "صَدَّقَ",
    "gloss": "he confirmed"
   },
   {
    "word": "مُصَدِّقٌ",
    "gloss": "confirming"
   }
  ],
  "verse": {
   "ref": "47:21",
   "surah": "Sūrat Muhammad",
   "text": "طَاعَةٌۭ وَقَوْلٌۭ مَّعْرُوفٌۭ ۚ فَإِذَا عَزَمَ ٱلْأَمْرُ فَلَوْ صَدَقُوا۟ ٱللَّهَ لَكَانَ خَيْرًۭا لَّهُمْ"
  }
 },
 {
  "id": "kdhb",
  "n": 26,
  "set": 1,
  "kind": "root",
  "root": "كذب",
  "translit": "k-ḏ-b",
  "gloss": "lie, deny, falsehood",
  "count": 282,
  "headword": "كَذَّبُوا۟",
  "headwordGloss": "they denied",
  "family": [
   {
    "word": "كَذَّبَ",
    "gloss": "he denied"
   },
   {
    "word": "يُكَذِّبُ",
    "gloss": "he denies"
   },
   {
    "word": "كِذْبٌ",
    "gloss": "a lie"
   },
   {
    "word": "كَذِبًا",
    "gloss": "lying/falsehood"
   },
   {
    "word": "ٱلْمُكَذِّبِينَ",
    "gloss": "the deniers"
   },
   {
    "word": "مُكَذِّبُونَ",
    "gloss": "deniers"
   }
  ],
  "verse": {
   "ref": "78:28",
   "surah": "Sūrat An-Naba",
   "text": "وَكَذَّبُوا۟ بِـَٔايَٰتِنَا كِذَّابًۭا"
  }
 },
 {
  "id": "qtl",
  "n": 27,
  "set": 1,
  "kind": "root",
  "root": "قتل",
  "translit": "q-t-l",
  "gloss": "kill",
  "count": 170,
  "headword": "قُتِلُوا۟",
  "headwordGloss": "they were killed",
  "family": [
   {
    "word": "يَقْتُلُونَ",
    "gloss": "they kill"
   },
   {
    "word": "ٱقْتُلُوا۟",
    "gloss": "kill (pl. imp.)"
   },
   {
    "word": "قِتَالٌ",
    "gloss": "fighting"
   }
  ],
  "verse": {
   "ref": "33:61",
   "surah": "Sūrat Al-Ahzaab",
   "text": "مَّلْعُونِينَ ۖ أَيْنَمَا ثُقِفُوٓا۟ أُخِذُوا۟ وَقُتِّلُوا۟ تَقْتِيلًۭا"
  }
 },
 {
  "id": "hsn",
  "n": 28,
  "set": 1,
  "kind": "root",
  "root": "حسن",
  "translit": "ḥ-s-n",
  "gloss": "do good, excellence, beauty, goodness",
  "count": 194,
  "headword": "أَحْسَنَ",
  "headwordGloss": "he did good",
  "family": [
   {
    "word": "ٱلْحُسْنَىٰ",
    "gloss": "the best (reward)"
   },
   {
    "word": "إِحْسَٰنًا",
    "gloss": "excellent conduct"
   },
   {
    "word": "حَسَنَةً",
    "gloss": "a good deed"
   },
   {
    "word": "مُحْسِنِينَ",
    "gloss": "doers of good"
   }
  ],
  "verse": {
   "ref": "55:60",
   "surah": "Sūrat Ar-Rahmaan",
   "text": "هَلْ جَزَآءُ ٱلْإِحْسَٰنِ إِلَّا ٱلْإِحْسَٰنُ"
  }
 },
 {
  "id": "wqy",
  "n": 29,
  "set": 1,
  "kind": "root",
  "root": "وقي",
  "translit": "w-q-y",
  "gloss": "protect, piety",
  "count": 258,
  "headword": "ٱلْمُتَّقِينَ",
  "headwordGloss": "the God-conscious",
  "family": [
   {
    "word": "تَقْوَىٰ",
    "gloss": "God-consciousness"
   },
   {
    "word": "ٱتَّقُوا۟",
    "gloss": "be mindful/guard yourselves"
   },
   {
    "word": "يَتَّقُونَ",
    "gloss": "they are mindful"
   },
   {
    "word": "وَقَىٰهُمُ",
    "gloss": "He protected them"
   },
   {
    "word": "مُتَّقُونَ",
    "gloss": "God-conscious (ones)"
   }
  ],
  "verse": {
   "ref": "44:51",
   "surah": "Sūrat Ad-Dukhaan",
   "text": "إِنَّ ٱلْمُتَّقِينَ فِى مَقَامٍ أَمِينٍۢ"
  }
 },
 {
  "id": "akl",
  "n": 30,
  "set": 1,
  "kind": "root",
  "root": "أكل",
  "translit": "ʾ-k-l",
  "gloss": "eat, consume",
  "count": 109,
  "headword": "يَأْكُلُونَ",
  "headwordGloss": "they eat/consume",
  "family": [
   {
    "word": "يَأْكُلُ",
    "gloss": "he eats"
   },
   {
    "word": "أَكَلُوا۟",
    "gloss": "they ate"
   },
   {
    "word": "كُلُوا۟",
    "gloss": "eat!"
   },
   {
    "word": "أُكُلَهَا",
    "gloss": "its produce"
   },
   {
    "word": "مَأْكُولٍ",
    "gloss": "eaten/consumed"
   }
  ],
  "verse": {
   "ref": "36:72",
   "surah": "Sūrat Yaseen",
   "text": "وَذَلَّلْنَٰهَا لَهُمْ فَمِنْهَا رَكُوبُهُمْ وَمِنْهَا يَأْكُلُونَ"
  }
 },
 {
  "id": "shrb",
  "n": 31,
  "set": 1,
  "kind": "root",
  "root": "شرب",
  "translit": "š-r-b",
  "gloss": "drink",
  "count": 39,
  "headword": "يَشْرَبُونَ",
  "headwordGloss": "they drink",
  "family": [
   {
    "word": "يَشْرَبُ",
    "gloss": "he drinks"
   },
   {
    "word": "ٱشْرَبُوا۟",
    "gloss": "drink!"
   },
   {
    "word": "شَرَابٌ",
    "gloss": "a drink"
   },
   {
    "word": "شَرَابًا",
    "gloss": "as a drink"
   },
   {
    "word": "مَشْرَبٍ",
    "gloss": "drinking-place"
   }
  ],
  "verse": {
   "ref": "76:5",
   "surah": "Sūrat Al-Insaan",
   "text": "إِنَّ ٱلْأَبْرَارَ يَشْرَبُونَ مِن كَأْسٍۢ كَانَ مِزَاجُهَا كَافُورًا"
  }
 },
 {
  "id": "alh",
  "n": 32,
  "set": 1,
  "kind": "root",
  "root": "أله",
  "translit": "ʾ-l-h",
  "gloss": "god, divinity (Allāh)",
  "count": 2850,
  "headword": "ٱللَّهُ",
  "headwordGloss": "Allah (God)",
  "family": [
   {
    "word": "إِلَٰهٌ",
    "gloss": "a god; deity"
   },
   {
    "word": "إِلَٰهَ",
    "gloss": "a god (acc.)"
   },
   {
    "word": "ءَالِهَةٌ",
    "gloss": "gods; deities"
   }
  ],
  "verse": {
   "ref": "104:6",
   "surah": "Sūrat Al-Humaza",
   "text": "نَارُ ٱللَّهِ ٱلْمُوقَدَةُ"
  }
 },
 {
  "id": "khrj",
  "n": 33,
  "set": 1,
  "kind": "root",
  "root": "خرج",
  "translit": "ḵ-r-j",
  "gloss": "go out",
  "count": 182,
  "headword": "أَخْرَجَ",
  "headwordGloss": "he brought out",
  "family": [
   {
    "word": "خَرَجَ",
    "gloss": "he went out"
   },
   {
    "word": "يَخْرُجُ",
    "gloss": "he goes out"
   },
   {
    "word": "نُخْرِجُ",
    "gloss": "We bring out"
   },
   {
    "word": "أُخْرِجُوا۟",
    "gloss": "they were driven out"
   },
   {
    "word": "مَخْرَجًا",
    "gloss": "a way out"
   },
   {
    "word": "مُخْرَجٌ",
    "gloss": "brought forth"
   }
  ],
  "verse": {
   "ref": "87:4",
   "surah": "Sūrat Al-A'laa",
   "text": "وَٱلَّذِىٓ أَخْرَجَ ٱلْمَرْعَىٰ"
  }
 },
 {
  "id": "dkhl",
  "n": 34,
  "set": 1,
  "kind": "root",
  "root": "دخل",
  "translit": "d-ḵ-l",
  "gloss": "enter",
  "count": 126,
  "headword": "ٱدْخُلُوا۟",
  "headwordGloss": "enter!",
  "family": [
   {
    "word": "دَخَلَ",
    "gloss": "he entered"
   },
   {
    "word": "يَدْخُلُ",
    "gloss": "he enters"
   },
   {
    "word": "أَدْخَلْنَا",
    "gloss": "We admitted"
   },
   {
    "word": "مَدْخَلًا",
    "gloss": "an entrance"
   },
   {
    "word": "مُدْخَلَ صِدْقٍ",
    "gloss": "an entrance of truth"
   }
  ],
  "verse": {
   "ref": "43:70",
   "surah": "Sūrat Az-Zukhruf",
   "text": "ٱدْخُلُوا۟ ٱلْجَنَّةَ أَنتُمْ وَأَزْوَٰجُكُمْ تُحْبَرُونَ"
  }
 },
 {
  "id": "dua",
  "n": 35,
  "set": 1,
  "kind": "root",
  "root": "دعو",
  "translit": "d-ʿ-w",
  "gloss": "call, supplicate, invite",
  "count": 212,
  "headword": "يَدْعُونَ",
  "headwordGloss": "they call/supplicate",
  "family": [
   {
    "word": "ٱدْعُوا۟",
    "gloss": "call/supplicate (pl.)"
   },
   {
    "word": "دَعَا",
    "gloss": "he called/supplicated"
   },
   {
    "word": "دُعَآءً",
    "gloss": "supplication"
   },
   {
    "word": "دَعْوَةٌ",
    "gloss": "a call/invitation"
   },
   {
    "word": "دَعْوَتُهُمْ",
    "gloss": "their call"
   },
   {
    "word": "ٱدْعُونِىٓ",
    "gloss": "call upon Me"
   }
  ],
  "verse": {
   "ref": "44:55",
   "surah": "Sūrat Ad-Dukhaan",
   "text": "يَدْعُونَ فِيهَا بِكُلِّ فَٰكِهَةٍ ءَامِنِينَ"
  }
 },
 {
  "id": "dhkr",
  "n": 36,
  "set": 1,
  "kind": "root",
  "root": "ذكر",
  "translit": "ḏ-k-r",
  "gloss": "remember, mention, remind",
  "count": 292,
  "headword": "ذِكْرِ",
  "headwordGloss": "remembrance/mention",
  "family": [
   {
    "word": "يَذْكُرُ",
    "gloss": "he remembers/mentions"
   },
   {
    "word": "ٱذْكُرُوا۟",
    "gloss": "remember!"
   },
   {
    "word": "تَذْكِرَةٌ",
    "gloss": "a reminder"
   },
   {
    "word": "مُذَكِّرٌ",
    "gloss": "one who reminds"
   },
   {
    "word": "ٱلذِّكْرَ",
    "gloss": "the Reminder"
   }
  ],
  "verse": {
   "ref": "87:10",
   "surah": "Sūrat Al-A'laa",
   "text": "سَيَذَّكَّرُ مَن يَخْشَىٰ"
  }
 },
 {
  "id": "nsy",
  "n": 37,
  "set": 1,
  "kind": "root",
  "root": "نسي",
  "translit": "n-s-y",
  "gloss": "forget",
  "count": 31,
  "headword": "نَسُوا۟",
  "headwordGloss": "they forgot",
  "family": [
   {
    "word": "نَسُوا۟",
    "gloss": "they forgot"
   },
   {
    "word": "نَسِيتَ",
    "gloss": "you forgot"
   },
   {
    "word": "تَنسَ",
    "gloss": "do not forget"
   },
   {
    "word": "نَسِيًّا",
    "gloss": "forgotten"
   },
   {
    "word": "مَّنسِيًّا",
    "gloss": "a thing forgotten"
   }
  ],
  "verse": {
   "ref": "59:19",
   "surah": "Sūrat Al-Hashr",
   "text": "وَلَا تَكُونُوا۟ كَٱلَّذِينَ نَسُوا۟ ٱللَّهَ فَأَنسَىٰهُمْ أَنفُسَهُمْ ۚ أُو۟لَٰٓئِكَ هُمُ ٱلْفَٰسِقُونَ"
  }
 },
 {
  "id": "sjd",
  "n": 38,
  "set": 1,
  "kind": "root",
  "root": "سجد",
  "translit": "s-j-d",
  "gloss": "prostrate",
  "count": 92,
  "headword": "يَسْجُدُونَ",
  "headwordGloss": "they prostrate",
  "family": [
   {
    "word": "ٱسْجُدُوا۟",
    "gloss": "prostrate!"
   },
   {
    "word": "ٱسْجُدْ",
    "gloss": "prostrate!"
   },
   {
    "word": "سُجَّدًا",
    "gloss": "in prostration"
   },
   {
    "word": "مَسْجِدِ",
    "gloss": "mosque / place of prostration"
   }
  ],
  "verse": {
   "ref": "84:21",
   "surah": "Sūrat Al-Inshiqaaq",
   "text": "وَإِذَا قُرِئَ عَلَيْهِمُ ٱلْقُرْءَانُ لَا يَسْجُدُونَ ۩"
  }
 },
 {
  "id": "slh",
  "n": 39,
  "set": 1,
  "kind": "root",
  "root": "صلح",
  "translit": "ṣ-l-ḥ",
  "gloss": "righteous, repair, righteousness, reform",
  "count": 180,
  "headword": "ٱلصَّٰلِحَٰتِ",
  "headwordGloss": "righteous deeds",
  "family": [
   {
    "word": "صَٰلِحًا",
    "gloss": "righteous; sound"
   },
   {
    "word": "صَٰلِحُونَ",
    "gloss": "righteous (pl.)"
   },
   {
    "word": "صَلَحَ",
    "gloss": "it became right"
   },
   {
    "word": "أَصْلَحَ",
    "gloss": "he set right; reformed"
   },
   {
    "word": "يُصْلِحُ",
    "gloss": "he sets right; reforms"
   },
   {
    "word": "إِصْلَاحٌ",
    "gloss": "reform; setting right"
   }
  ],
  "verse": {
   "ref": "31:8",
   "surah": "Sūrat Luqman",
   "text": "إِنَّ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ لَهُمْ جَنَّٰتُ ٱلنَّعِيمِ"
  }
 },
 {
  "id": "fsd",
  "n": 40,
  "set": 1,
  "kind": "root",
  "root": "فسد",
  "translit": "f-s-d",
  "gloss": "corrupt, spoil, corruption",
  "count": 50,
  "headword": "ٱلْفَسَادُ",
  "headwordGloss": "corruption",
  "family": [
   {
    "word": "فَسَدَ",
    "gloss": "it became corrupt"
   },
   {
    "word": "يُفْسِدُ",
    "gloss": "he causes corruption"
   },
   {
    "word": "أَفْسَدَ",
    "gloss": "he corrupted"
   },
   {
    "word": "مُفْسِدُونَ",
    "gloss": "corrupters (pl.)"
   },
   {
    "word": "مُفْسِدِينَ",
    "gloss": "corrupters (pl.)"
   },
   {
    "word": "فَسَادًا",
    "gloss": "corruption"
   }
  ],
  "verse": {
   "ref": "89:12",
   "surah": "Sūrat Al-Fajr",
   "text": "فَأَكْثَرُوا۟ فِيهَا ٱلْفَسَادَ"
  }
 },
 {
  "id": "kwn",
  "n": 41,
  "set": 1,
  "kind": "root",
  "root": "كون",
  "translit": "k-w-n",
  "gloss": "being, existence",
  "count": 1390,
  "headword": "كَانَ",
  "headwordGloss": "he was",
  "family": [
   {
    "word": "كُونُوا۟",
    "gloss": "be! (pl.)"
   },
   {
    "word": "يَكُونُ",
    "gloss": "he is/ will be"
   },
   {
    "word": "يَكُونُونَ",
    "gloss": "they are/ will be"
   },
   {
    "word": "كُن",
    "gloss": "be! (to one)"
   },
   {
    "word": "كُنْتُمْ",
    "gloss": "you were (pl.)"
   },
   {
    "word": "لَمْ يَكُن",
    "gloss": "he was not"
   }
  ],
  "verse": {
   "ref": "15:93",
   "surah": "Sūrat Al-Hijr",
   "text": "عَمَّا كَانُوا۟ يَعْمَلُونَ"
  }
 },
 {
  "id": "khf",
  "n": 42,
  "set": 1,
  "kind": "root",
  "root": "خوف",
  "translit": "ḵ-w-f",
  "gloss": "fear, awe, dread, warn",
  "count": 124,
  "headword": "خَوْفٍ",
  "headwordGloss": "fear",
  "family": [
   {
    "word": "يَخَافُ",
    "gloss": "he fears"
   },
   {
    "word": "يَخَافُونَ",
    "gloss": "they fear"
   },
   {
    "word": "خَافَ",
    "gloss": "he feared"
   },
   {
    "word": "خِفْتُمْ",
    "gloss": "you feared"
   },
   {
    "word": "لَا تَخَفْ",
    "gloss": "do not fear"
   },
   {
    "word": "خَائِفِينَ",
    "gloss": "fearing/afraid"
   }
  ],
  "verse": {
   "ref": "106:4",
   "surah": "Sūrat Quraish",
   "text": "ٱلَّذِىٓ أَطْعَمَهُم مِّن جُوعٍۢ وَءَامَنَهُم مِّنْ خَوْفٍۭ"
  }
 },
 {
  "id": "rj3",
  "n": 43,
  "set": 1,
  "kind": "root",
  "root": "رجع",
  "translit": "r-j-ʿ",
  "gloss": "return, go back",
  "count": 104,
  "headword": "رَجَعُوا۟",
  "headwordGloss": "they returned",
  "family": [
   {
    "word": "رَجَعَ",
    "gloss": "he returned"
   },
   {
    "word": "يَرْجِعُ",
    "gloss": "he returns"
   },
   {
    "word": "ٱرْجِعُوا۟",
    "gloss": "return!"
   },
   {
    "word": "مَرْجِعُكُمْ",
    "gloss": "your return"
   },
   {
    "word": "ٱلرَّجْعِ",
    "gloss": "the returning"
   }
  ],
  "verse": {
   "ref": "21:64",
   "surah": "Sūrat Al-Anbiyaa",
   "text": "فَرَجَعُوٓا۟ إِلَىٰٓ أَنفُسِهِمْ فَقَالُوٓا۟ إِنَّكُمْ أَنتُمُ ٱلظَّٰلِمُونَ"
  }
 },
 {
  "id": "ttbʿ",
  "n": 44,
  "set": 1,
  "kind": "root",
  "root": "تبع",
  "translit": "t-b-ʿ",
  "gloss": "follow",
  "count": 172,
  "headword": "ٱتَّبِعُوا۟",
  "headwordGloss": "follow!",
  "family": [
   {
    "word": "يَتَّبِعُونَ",
    "gloss": "they follow"
   },
   {
    "word": "ٱتَّبَعَ",
    "gloss": "he followed"
   },
   {
    "word": "ٱتَّبَعْتُ",
    "gloss": "I followed"
   },
   {
    "word": "ٱتَّبِعْ",
    "gloss": "follow! (sg.)"
   },
   {
    "word": "تَابِعِينَ",
    "gloss": "followers"
   }
  ],
  "verse": {
   "ref": "36:21",
   "surah": "Sūrat Yaseen",
   "text": "ٱتَّبِعُوا۟ مَن لَّا يَسْـَٔلُكُمْ أَجْرًۭا وَهُم مُّهْتَدُونَ"
  }
 },
 {
  "id": "aty",
  "n": 45,
  "set": 1,
  "kind": "root",
  "root": "أتي",
  "translit": "ʾ-t-y",
  "gloss": "give, bring",
  "count": 550,
  "headword": "أَتَىٰ",
  "headwordGloss": "he came",
  "family": [
   {
    "word": "يَأْتِى",
    "gloss": "he comes"
   },
   {
    "word": "تَأْتِى",
    "gloss": "she/you come"
   },
   {
    "word": "أَتَوْا۟",
    "gloss": "they came"
   },
   {
    "word": "أَتَيْنَا",
    "gloss": "we came"
   },
   {
    "word": "يَأْتُونَ",
    "gloss": "they come"
   },
   {
    "word": "أْتُوا۟",
    "gloss": "bring! (pl.)"
   }
  ],
  "verse": {
   "ref": "74:47",
   "surah": "Sūrat Al-Muddaththir",
   "text": "حَتَّىٰٓ أَتَىٰنَا ٱلْيَقِينُ"
  }
 },
 {
  "id": "trk",
  "n": 46,
  "set": 1,
  "kind": "root",
  "root": "ترك",
  "translit": "t-r-k",
  "gloss": "leave, abandon",
  "count": 68,
  "headword": "تَرَكَ",
  "headwordGloss": "he left",
  "family": [
   {
    "word": "تَرَكَ",
    "gloss": "he left"
   },
   {
    "word": "تَرَكْنَا",
    "gloss": "we left"
   },
   {
    "word": "تَرَكُوا۟",
    "gloss": "they left"
   },
   {
    "word": "تَارِكٌ",
    "gloss": "one who leaves"
   },
   {
    "word": "يُتْرَكُ",
    "gloss": "he is left"
   }
  ],
  "verse": {
   "ref": "84:19",
   "surah": "Sūrat Al-Inshiqaaq",
   "text": "لَتَرْكَبُنَّ طَبَقًا عَن طَبَقٍۢ"
  }
 },
 {
  "id": "jy",
  "n": 47,
  "set": 1,
  "kind": "root",
  "root": "جيء",
  "translit": "j-y-ʾ",
  "gloss": "come",
  "count": 356,
  "headword": "جَآءَ",
  "headwordGloss": "he came",
  "family": [
   {
    "word": "جَآءَ",
    "gloss": "he came"
   },
   {
    "word": "جَآءَهُمْ",
    "gloss": "it came to them"
   },
   {
    "word": "جِئْنَا",
    "gloss": "we came"
   },
   {
    "word": "جَآءُو",
    "gloss": "they came"
   },
   {
    "word": "جَآءَتْ",
    "gloss": "she came"
   }
  ],
  "verse": {
   "ref": "80:33",
   "surah": "Sūrat Abasa",
   "text": "فَإِذَا جَآءَتِ ٱلصَّآخَّةُ"
  }
 },
 {
  "id": "dhbb",
  "n": 48,
  "set": 1,
  "kind": "root",
  "root": "ذهب",
  "translit": "ḏ-h-b",
  "gloss": "go",
  "count": 56,
  "headword": "ذَهَبَ",
  "headwordGloss": "he went",
  "family": [
   {
    "word": "يَذْهَبُ",
    "gloss": "he goes"
   },
   {
    "word": "ٱذْهَبْ",
    "gloss": "go! (sg.)"
   },
   {
    "word": "ٱذْهَبَا",
    "gloss": "go! (dual)"
   },
   {
    "word": "ذَهَبًا",
    "gloss": "gold"
   }
  ],
  "verse": {
   "ref": "20:24",
   "surah": "Sūrat Taa-Haa",
   "text": "ٱذْهَبْ إِلَىٰ فِرْعَوْنَ إِنَّهُۥ طَغَىٰ"
  }
 },
 {
  "id": "ry",
  "n": 49,
  "set": 1,
  "kind": "root",
  "root": "رأي",
  "translit": "r-ʾ-y",
  "gloss": "see",
  "count": 199,
  "headword": "تَرَىٰ",
  "headwordGloss": "you see",
  "family": [
   {
    "word": "تَرَىٰ",
    "gloss": "you see"
   },
   {
    "word": "يَرَوْا۟",
    "gloss": "they see"
   },
   {
    "word": "رَأَوُا۟",
    "gloss": "they saw"
   },
   {
    "word": "رَءَيْتَ",
    "gloss": "you saw"
   },
   {
    "word": "رُءْيَا",
    "gloss": "a dream, a vision"
   }
  ],
  "verse": {
   "ref": "69:8",
   "surah": "Sūrat Al-Haaqqa",
   "text": "فَهَلْ تَرَىٰ لَهُم مِّنۢ بَاقِيَةٍۢ"
  }
 },
 {
  "id": "rbb",
  "n": 50,
  "set": 1,
  "kind": "root",
  "root": "ربب",
  "translit": "r-b-b",
  "gloss": "lord, sustainer",
  "count": 975,
  "headword": "رَبِّ",
  "headwordGloss": "my Lord",
  "family": [
   {
    "word": "رَبِّكَ",
    "gloss": "your Lord"
   },
   {
    "word": "رَبُّكُمْ",
    "gloss": "your Lord (pl.)"
   },
   {
    "word": "رَبَّنَا",
    "gloss": "our Lord"
   }
  ],
  "verse": {
   "ref": "94:8",
   "surah": "Sūrat Ash-Sharh",
   "text": "وَإِلَىٰ رَبِّكَ فَٱرْغَب"
  }
 },
 {
  "id": "skn",
  "n": 51,
  "set": 1,
  "kind": "root",
  "root": "سكن",
  "translit": "s-k-n",
  "gloss": "dwell, reside",
  "count": 69,
  "headword": "يَسْكُنُ",
  "headwordGloss": "dwells",
  "family": [
   {
    "word": "ٱسْكُنْ",
    "gloss": "dwell! (imper.)"
   },
   {
    "word": "تَسْكُنُ",
    "gloss": "you dwell / it becomes still"
   },
   {
    "word": "سَكَنًا",
    "gloss": "a dwelling"
   },
   {
    "word": "مَسَٰكِنَ",
    "gloss": "dwellings"
   },
   {
    "word": "سَكِينَةً",
    "gloss": "tranquility"
   },
   {
    "word": "لِتَسْكُنُوٓا۟",
    "gloss": "that you may dwell/be tranquil"
   }
  ],
  "verse": {
   "ref": "42:33",
   "surah": "Sūrat Ash-Shura",
   "text": "إِن يَشَأْ يُسْكِنِ ٱلرِّيحَ فَيَظْلَلْنَ رَوَاكِدَ عَلَىٰ ظَهْرِهِۦٓ ۚ إِنَّ فِى ذَٰلِكَ لَءَايَٰتٍۢ لِّكُلِّ صَبَّارٍۢ شَكُورٍ"
  }
 },
 {
  "id": "qwm",
  "n": 52,
  "set": 1,
  "kind": "root",
  "root": "قوم",
  "translit": "q-w-m",
  "gloss": "stand, rise, establish, people, community",
  "count": 660,
  "headword": "قَوْمِ",
  "headwordGloss": "people (of)",
  "family": [
   {
    "word": "قَوْمًا",
    "gloss": "a people (acc.)"
   },
   {
    "word": "قَامَ",
    "gloss": "he stood; rose"
   },
   {
    "word": "يَقُومُ",
    "gloss": "he stands"
   },
   {
    "word": "يَوْمَ يَقُومُ",
    "gloss": "the day (it) stands"
   },
   {
    "word": "ٱلْقَيِّمَةُ",
    "gloss": "the upright (religion)"
   }
  ],
  "verse": {
   "ref": "44:43",
   "surah": "Sūrat Ad-Dukhaan",
   "text": "إِنَّ شَجَرَتَ ٱلزَّقُّومِ"
  }
 },
 {
  "id": "jls",
  "n": 53,
  "set": 1,
  "kind": "root",
  "root": "جلس",
  "translit": "j-l-s",
  "gloss": "sit",
  "count": 1,
  "headword": "ٱلْمَجَٰلِسِ",
  "headwordGloss": "the gatherings",
  "family": [
   {
    "word": "ٱلْمَجَٰلِسِ",
    "gloss": "the gatherings"
   }
  ],
  "verse": {
   "ref": "58:11",
   "surah": "Sūrat Al-Mujaadila",
   "text": "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا قِيلَ لَكُمْ تَفَسَّحُوا۟ فِى ٱلْمَجَٰلِسِ فَٱفْسَحُوا۟ يَفْسَحِ ٱللَّهُ لَكُمْ ۖ وَإِذَا قِيلَ ٱنشُزُوا۟ فَٱنشُزُوا۟ يَرْفَعِ ٱللَّهُ ٱلَّذِينَ ءَامَنُوا۟ مِنكُمْ وَٱلَّذِينَ أُوتُوا۟ ٱلْعِلْمَ دَرَجَٰتٍۢ ۚ وَٱللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌۭ"
  }
 },
 {
  "id": "fth",
  "n": 54,
  "set": 1,
  "kind": "root",
  "root": "فتح",
  "translit": "f-t-ḥ",
  "gloss": "open, victory, opening, conquest",
  "count": 38,
  "headword": "فَتْحٌ",
  "headwordGloss": "victory/opening",
  "family": [
   {
    "word": "فَتَحْنَا",
    "gloss": "We opened"
   },
   {
    "word": "ٱفْتَحْ",
    "gloss": "open / decide"
   },
   {
    "word": "ٱلْفَتْحُ",
    "gloss": "the victory/opening"
   },
   {
    "word": "مَفَاتِحُ",
    "gloss": "keys"
   },
   {
    "word": "مُفَتَّحَةً",
    "gloss": "opened wide"
   },
   {
    "word": "فُتِحَتْ",
    "gloss": "it was opened"
   }
  ],
  "verse": {
   "ref": "78:19",
   "surah": "Sūrat An-Naba",
   "text": "وَفُتِحَتِ ٱلسَّمَآءُ فَكَانَتْ أَبْوَٰبًۭا"
  }
 },
 {
  "id": "tm",
  "n": 55,
  "set": 1,
  "kind": "root",
  "root": "ختم",
  "translit": "ḫ-t-m",
  "gloss": "seal, close",
  "count": 10,
  "headword": "خَتَمَ",
  "headwordGloss": "he sealed",
  "family": [
   {
    "word": "خَتَمَ",
    "gloss": "he sealed"
   },
   {
    "word": "نَخْتِمُ",
    "gloss": "we seal"
   },
   {
    "word": "يَخْتِمْ",
    "gloss": "he seals"
   },
   {
    "word": "خِتَٰمُهُۥ",
    "gloss": "its seal"
   },
   {
    "word": "خَاتَمَ",
    "gloss": "the seal of"
   }
  ],
  "verse": {
   "ref": "83:26",
   "surah": "Sūrat Al-Mutaffifin",
   "text": "خِتَٰمُهُۥ مِسْكٌۭ ۚ وَفِى ذَٰلِكَ فَلْيَتَنَافَسِ ٱلْمُتَنَٰفِسُونَ"
  }
 },
 {
  "id": "lbs",
  "n": 56,
  "set": 1,
  "kind": "root",
  "root": "لبس",
  "translit": "l-b-s",
  "gloss": "wear, cover, confuse",
  "count": 23,
  "headword": "لِبَاسًا",
  "headwordGloss": "clothing",
  "family": [
   {
    "word": "لِبَاسُ",
    "gloss": "clothing (nom.)"
   },
   {
    "word": "يَلْبَسُونَ",
    "gloss": "they wear"
   },
   {
    "word": "ٱلْبَاسٍ",
    "gloss": "armor"
   },
   {
    "word": "تَلْبِسُوا۟",
    "gloss": "you (pl.) mix/confound"
   },
   {
    "word": "لَبَسْنَا",
    "gloss": "We would have confounded"
   }
  ],
  "verse": {
   "ref": "78:10",
   "surah": "Sūrat An-Naba",
   "text": "وَجَعَلْنَا ٱلَّيْلَ لِبَاسًۭا"
  }
 },
 {
  "id": "nf",
  "n": 57,
  "set": 1,
  "kind": "root",
  "root": "نفع",
  "translit": "n-f-ʿ",
  "gloss": "benefit",
  "count": 50,
  "headword": "يَنفَعُ",
  "headwordGloss": "it benefits",
  "family": [
   {
    "word": "يَنفَعُ",
    "gloss": "it benefits"
   },
   {
    "word": "نَفْعًا",
    "gloss": "benefit"
   },
   {
    "word": "مَنَٰفِعَ",
    "gloss": "benefits, uses"
   },
   {
    "word": "تَنفَعُ",
    "gloss": "she benefits"
   },
   {
    "word": "يَنفَعُهُمْ",
    "gloss": "it benefits them"
   }
  ],
  "verse": {
   "ref": "26:73",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "أَوْ يَنفَعُونَكُمْ أَوْ يَضُرُّونَ"
  }
 },
 {
  "id": "rr",
  "n": 58,
  "set": 1,
  "kind": "root",
  "root": "ضرر",
  "translit": "ḍ-r-r",
  "gloss": "harm",
  "count": 231,
  "headword": "ضَرًّا",
  "headwordGloss": "harm",
  "family": [
   {
    "word": "ضَرًّا",
    "gloss": "harm"
   },
   {
    "word": "ٱلضُّرُّ",
    "gloss": "the affliction"
   },
   {
    "word": "يَضُرُّ",
    "gloss": "it harms"
   },
   {
    "word": "ضِرَارًا",
    "gloss": "to cause harm"
   },
   {
    "word": "ضُرٍّ",
    "gloss": "distress"
   }
  ],
  "verse": {
   "ref": "72:21",
   "surah": "Sūrat Al-Jinn",
   "text": "قُلْ إِنِّى لَآ أَمْلِكُ لَكُمْ ضَرًّۭا وَلَا رَشَدًۭا"
  }
 },
 {
  "id": "sy",
  "n": 59,
  "set": 1,
  "kind": "root",
  "root": "سعي",
  "translit": "s-ʿ-y",
  "gloss": "strive, effort",
  "count": 52,
  "headword": "يَسْعَىٰ",
  "headwordGloss": "he strives",
  "family": [
   {
    "word": "يَسْعَىٰ",
    "gloss": "he strives"
   },
   {
    "word": "سَعَىٰ",
    "gloss": "he strove"
   },
   {
    "word": "سَعْيَهَا",
    "gloss": "its striving"
   },
   {
    "word": "سَعْيُكُم",
    "gloss": "your effort"
   },
   {
    "word": "سَعْيًا",
    "gloss": "striving"
   }
  ],
  "verse": {
   "ref": "80:8",
   "surah": "Sūrat Abasa",
   "text": "وَأَمَّا مَن جَآءَكَ يَسْعَىٰ"
  }
 },
 {
  "id": "byn",
  "n": 60,
  "set": 1,
  "kind": "root",
  "root": "بين",
  "translit": "b-y-n",
  "gloss": "between, making clear",
  "count": 523,
  "headword": "بَيْنَ",
  "headwordGloss": "between",
  "family": [
   {
    "word": "بَيِّنَةٌ",
    "gloss": "clear proof"
   },
   {
    "word": "ٱلْبَيِّنَٰتُ",
    "gloss": "clear signs"
   },
   {
    "word": "مُبِينٌ",
    "gloss": "clear; manifest"
   },
   {
    "word": "أَبَانَ",
    "gloss": "he made clear"
   }
  ],
  "verse": {
   "ref": "26:138",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "وَمَا نَحْنُ بِمُعَذَّبِينَ"
  }
 },
 {
  "id": "shy",
  "n": 61,
  "set": 2,
  "kind": "root",
  "root": "شيأ",
  "translit": "š-y-ʾ",
  "gloss": "thing, willing",
  "count": 520,
  "headword": "شَىْءٍ",
  "headwordGloss": "a thing",
  "family": [
   {
    "word": "أَشْيَآءَ",
    "gloss": "things (pl., acc.)"
   },
   {
    "word": "شِئْتَ",
    "gloss": "you willed"
   },
   {
    "word": "شَآءَ",
    "gloss": "he willed"
   },
   {
    "word": "يَشَآءُ",
    "gloss": "he wills"
   }
  ],
  "verse": {
   "ref": "80:18",
   "surah": "Sūrat Abasa",
   "text": "مِنْ أَىِّ شَىْءٍ خَلَقَهُۥ"
  }
 },
 {
  "id": "qra",
  "n": 62,
  "set": 2,
  "kind": "root",
  "root": "قرأ",
  "translit": "q-r-ʾ",
  "gloss": "read, recite",
  "count": 88,
  "headword": "ٱلْقُرْءَانِ",
  "headwordGloss": "the Qur’an",
  "family": [
   {
    "word": "قَرَأْتَ",
    "gloss": "you recited/read"
   },
   {
    "word": "قَرَأْنَٰهُ",
    "gloss": "We recited it"
   },
   {
    "word": "يَقْرَءُونَ",
    "gloss": "they recite/read"
   },
   {
    "word": "ٱقْرَأْ",
    "gloss": "recite/read!"
   },
   {
    "word": "قُرْءَانًا",
    "gloss": "a recitation/Qur’an"
   }
  ],
  "verse": {
   "ref": "36:2",
   "surah": "Sūrat Yaseen",
   "text": "وَٱلْقُرْءَانِ ٱلْحَكِيمِ"
  }
 },
 {
  "id": "sal",
  "n": 63,
  "set": 2,
  "kind": "root",
  "root": "سأل",
  "translit": "s-ʾ-l",
  "gloss": "ask, question",
  "count": 129,
  "headword": "سَأَلُوا۟",
  "headwordGloss": "they asked",
  "family": [
   {
    "word": "سَأَلَ",
    "gloss": "he asked"
   },
   {
    "word": "يَسْـَٔلُونَكَ",
    "gloss": "they ask you"
   },
   {
    "word": "ٱسْـَٔلْ",
    "gloss": "ask!"
   },
   {
    "word": "سُؤَالٌ",
    "gloss": "a question"
   },
   {
    "word": "سَائِلٌ",
    "gloss": "one who asks"
   },
   {
    "word": "سُئِلَ",
    "gloss": "he was asked"
   }
  ],
  "verse": {
   "ref": "4:153",
   "surah": "Sūrat An-Nisaa",
   "text": "يَسْـَٔلُكَ أَهْلُ ٱلْكِتَٰبِ أَن تُنَزِّلَ عَلَيْهِمْ كِتَٰبًۭا مِّنَ ٱلسَّمَآءِ ۚ فَقَدْ سَأَلُوا۟ مُوسَىٰٓ أَكْبَرَ مِن ذَٰلِكَ فَقَالُوٓا۟ أَرِنَا ٱللَّهَ جَهْرَةًۭ فَأَخَذَتْهُمُ ٱلصَّٰعِقَةُ بِظُلْمِهِمْ ۚ ثُمَّ ٱتَّخَذُوا۟ ٱلْعِجْلَ مِنۢ بَعْدِ مَا جَآءَتْهُمُ ٱلْبَيِّنَٰتُ فَعَفَوْنَا عَن ذَٰلِكَ ۚ وَءَاتَيْنَا مُوسَىٰ سُلْطَٰنًۭا مُّبِينًۭا"
  }
 },
 {
  "id": "jwb",
  "n": 64,
  "set": 2,
  "kind": "root",
  "root": "جوب",
  "translit": "j-w-b",
  "gloss": "answer, respond",
  "count": 43,
  "headword": "أَجِبْ",
  "headwordGloss": "answer!",
  "family": [
   {
    "word": "أُجِيبُ",
    "gloss": "I respond"
   },
   {
    "word": "أَجِيبُوا۟",
    "gloss": "respond (pl.)"
   },
   {
    "word": "ٱسْتَجَابُوا۟",
    "gloss": "they responded"
   },
   {
    "word": "ٱسْتَجِيبُوا۟",
    "gloss": "respond (pl.)"
   }
  ],
  "verse": {
   "ref": "28:65",
   "surah": "Sūrat Al-Qasas",
   "text": "وَيَوْمَ يُنَادِيهِمْ فَيَقُولُ مَاذَآ أَجَبْتُمُ ٱلْمُرْسَلِينَ"
  }
 },
 {
  "id": "ḥmd",
  "n": 65,
  "set": 2,
  "kind": "root",
  "root": "حمد",
  "translit": "ḥ-m-d",
  "gloss": "praise, thank",
  "count": 68,
  "headword": "ٱلْحَمْدُ",
  "headwordGloss": "all praise",
  "family": [
   {
    "word": "حَمِيدٌ",
    "gloss": "Praiseworthy"
   },
   {
    "word": "أَحْمَدُ",
    "gloss": "Ahmad"
   },
   {
    "word": "مَحْمُودًا",
    "gloss": "praised"
   }
  ],
  "verse": {
   "ref": "1:2",
   "surah": "Sūrat Al-Faatiha",
   "text": "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ"
  }
 },
 {
  "id": "rsl",
  "n": 66,
  "set": 2,
  "kind": "root",
  "root": "رسل",
  "translit": "r-s-l",
  "gloss": "sending, messenger",
  "count": 515,
  "headword": "رَسُولٌ",
  "headwordGloss": "messenger",
  "family": [
   {
    "word": "ٱلرُّسُلُ",
    "gloss": "the messengers"
   },
   {
    "word": "رُسُلًا",
    "gloss": "messengers (pl.)"
   },
   {
    "word": "أَرْسَلْنَا",
    "gloss": "We sent"
   },
   {
    "word": "أَرْسَلَ",
    "gloss": "he sent"
   },
   {
    "word": "مُرْسَلُونَ",
    "gloss": "ones sent / messengers"
   },
   {
    "word": "مُرْسَلِينَ",
    "gloss": "ones sent (pl., acc/gen)"
   }
  ],
  "verse": {
   "ref": "26:107",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "إِنِّى لَكُمْ رَسُولٌ أَمِينٌۭ"
  }
 },
 {
  "id": "fr",
  "n": 67,
  "set": 2,
  "kind": "root",
  "root": "فطر",
  "translit": "f-ṭ-r",
  "gloss": "originate, split, create",
  "count": 23,
  "headword": "فَاطِرِ",
  "headwordGloss": "Originator of",
  "family": [
   {
    "word": "فَاطِرِ",
    "gloss": "Originator of"
   },
   {
    "word": "فَطَرَ",
    "gloss": "he originated"
   },
   {
    "word": "فِطْرَتَ",
    "gloss": "the nature He made"
   },
   {
    "word": "ٱنفَطَرَتْ",
    "gloss": "it split apart"
   },
   {
    "word": "فُطُورٍ",
    "gloss": "any flaw, any rift"
   }
  ],
  "verse": {
   "ref": "39:46",
   "surah": "Sūrat Az-Zumar",
   "text": "قُلِ ٱللَّهُمَّ فَاطِرَ ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ عَٰلِمَ ٱلْغَيْبِ وَٱلشَّهَٰدَةِ أَنتَ تَحْكُمُ بَيْنَ عِبَادِكَ فِى مَا كَانُوا۟ فِيهِ يَخْتَلِفُونَ"
  }
 },
 {
  "id": "bda",
  "n": 68,
  "set": 2,
  "kind": "root",
  "root": "بدأ",
  "translit": "b-d-ʾ",
  "gloss": "begin, start",
  "count": 35,
  "headword": "بَدَأَ",
  "headwordGloss": "He began",
  "family": [
   {
    "word": "يَبْدَؤُا۟",
    "gloss": "He begins"
   },
   {
    "word": "يُبْدِئُ",
    "gloss": "He originates"
   },
   {
    "word": "نُعِيدُهُ",
    "gloss": "We repeat it (after beginning)"
   }
  ],
  "verse": {
   "ref": "18:3",
   "surah": "Sūrat Al-Kahf",
   "text": "مَّٰكِثِينَ فِيهِ أَبَدًۭا"
  }
 },
 {
  "id": "ʿwd",
  "n": 69,
  "set": 2,
  "kind": "root",
  "root": "عود",
  "translit": "ʿ-w-d",
  "gloss": "return, repeat",
  "count": 65,
  "headword": "تَعُودُونَ",
  "headwordGloss": "you return",
  "family": [
   {
    "word": "عَادُوا۟",
    "gloss": "they returned"
   },
   {
    "word": "يَعُودُ",
    "gloss": "he returns"
   },
   {
    "word": "عُدْنَا",
    "gloss": "we returned"
   },
   {
    "word": "مَعَادٍ",
    "gloss": "return; place of return"
   }
  ],
  "verse": {
   "ref": "7:29",
   "surah": "Sūrat Al-A'raaf",
   "text": "قُلْ أَمَرَ رَبِّى بِٱلْقِسْطِ ۖ وَأَقِيمُوا۟ وُجُوهَكُمْ عِندَ كُلِّ مَسْجِدٍۢ وَٱدْعُوهُ مُخْلِصِينَ لَهُ ٱلدِّينَ ۚ كَمَا بَدَأَكُمْ تَعُودُونَ"
  }
 },
 {
  "id": "ayy",
  "n": 70,
  "set": 2,
  "kind": "root",
  "root": "أيي",
  "translit": "ʾ-y-y",
  "gloss": "sign, verse (āyah)",
  "count": 382,
  "headword": "ءَايَٰتٍ",
  "headwordGloss": "signs / verses",
  "family": [
   {
    "word": "ءَايَةٌ",
    "gloss": "a sign / a verse"
   },
   {
    "word": "ءَايَاتُ",
    "gloss": "signs/verses (nom.)"
   },
   {
    "word": "ءَايَاتِنَا",
    "gloss": "Our signs/verses"
   },
   {
    "word": "ءَايَتَيْنِ",
    "gloss": "two signs"
   },
   {
    "word": "بِـَٔايَٰتِ",
    "gloss": "with/by (the) signs"
   }
  ],
  "verse": {
   "ref": "26:2",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "تِلْكَ ءَايَٰتُ ٱلْكِتَٰبِ ٱلْمُبِينِ"
  }
 },
 {
  "id": "rfʿ",
  "n": 71,
  "set": 2,
  "kind": "root",
  "root": "رفع",
  "translit": "r-f-ʿ",
  "gloss": "raise, elevate",
  "count": 29,
  "headword": "رَفَعَ",
  "headwordGloss": "he raised",
  "family": [
   {
    "word": "يَرْفَعُ",
    "gloss": "He raises"
   },
   {
    "word": "رَفَعْنَا",
    "gloss": "We raised"
   },
   {
    "word": "رَفَعْتُ",
    "gloss": "I raised"
   },
   {
    "word": "مَرْفُوعَةٌ",
    "gloss": "raised/exalted (f.)"
   },
   {
    "word": "رَفِيعُ",
    "gloss": "high/exalted"
   }
  ],
  "verse": {
   "ref": "94:4",
   "surah": "Sūrat Ash-Sharh",
   "text": "وَرَفَعْنَا لَكَ ذِكْرَكَ"
  }
 },
 {
  "id": "wdʿ",
  "n": 72,
  "set": 2,
  "kind": "root",
  "root": "وضع",
  "translit": "w-ḍ-ʿ",
  "gloss": "place, set down",
  "count": 26,
  "headword": "وَضَعْنَا",
  "headwordGloss": "We placed/laid",
  "family": [
   {
    "word": "وَضَعَ",
    "gloss": "he placed"
   },
   {
    "word": "يَضَعُ",
    "gloss": "he places"
   },
   {
    "word": "وَضَعْتُ",
    "gloss": "I placed"
   },
   {
    "word": "تَضَعُ",
    "gloss": "she places / gives birth"
   },
   {
    "word": "وُضِعَ",
    "gloss": "it was placed"
   }
  ],
  "verse": {
   "ref": "94:2",
   "surah": "Sūrat Ash-Sharh",
   "text": "وَوَضَعْنَا عَنكَ وِزْرَكَ"
  }
 },
 {
  "id": "nws",
  "n": 73,
  "set": 2,
  "kind": "root",
  "root": "نوس",
  "translit": "n-w-s",
  "gloss": "people, mankind (an-nās)",
  "count": 350,
  "headword": "ٱلنَّاسِ",
  "headwordGloss": "the people",
  "family": [
   {
    "word": "لِلنَّاسِ",
    "gloss": "for/to the people"
   },
   {
    "word": "مِنَ ٱلنَّاسِ",
    "gloss": "among/from the people"
   },
   {
    "word": "يَٰٓأَيُّهَا ٱلنَّاسُ",
    "gloss": "O mankind"
   }
  ],
  "verse": {
   "ref": "114:6",
   "surah": "Sūrat An-Naas",
   "text": "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ"
  }
 },
 {
  "id": "d",
  "n": 74,
  "set": 2,
  "kind": "root",
  "root": "صعد",
  "translit": "ṣ-ʿ-d",
  "gloss": "ascend, rise",
  "count": 9,
  "headword": "صَعِيدًا",
  "headwordGloss": "earth, dust",
  "family": [
   {
    "word": "صَعِيدًا",
    "gloss": "earth, dust"
   },
   {
    "word": "يَصَّعَّدُ",
    "gloss": "he climbs"
   },
   {
    "word": "تُصْعِدُونَ",
    "gloss": "you were climbing"
   },
   {
    "word": "صَعَدًا",
    "gloss": "an uphill punishment"
   },
   {
    "word": "صَعُودًا",
    "gloss": "a steep ascent"
   }
  ],
  "verse": {
   "ref": "18:8",
   "surah": "Sūrat Al-Kahf",
   "text": "وَإِنَّا لَجَٰعِلُونَ مَا عَلَيْهَا صَعِيدًۭا جُرُزًا"
  }
 },
 {
  "id": "bshr",
  "n": 75,
  "set": 2,
  "kind": "root",
  "root": "بشر",
  "translit": "b-š-r",
  "gloss": "human being, glad tidings, give good news, good news",
  "count": 123,
  "headword": "بَشِيرٌ",
  "headwordGloss": "a bringer of good news",
  "family": [
   {
    "word": "بَشَرٌ",
    "gloss": "a human being"
   },
   {
    "word": "بَشَرًا",
    "gloss": "a human (acc.)"
   },
   {
    "word": "بُشْرَىٰ",
    "gloss": "good tidings"
   },
   {
    "word": "يُبَشِّرُ",
    "gloss": "he gives good news"
   },
   {
    "word": "مُبَشِّرِينَ",
    "gloss": "bringing good news"
   }
  ],
  "verse": {
   "ref": "41:4",
   "surah": "Sūrat Fussilat",
   "text": "بَشِيرًۭا وَنَذِيرًۭا فَأَعْرَضَ أَكْثَرُهُمْ فَهُمْ لَا يَسْمَعُونَ"
  }
 },
 {
  "id": "mlk",
  "n": 76,
  "set": 2,
  "kind": "root",
  "root": "ملك",
  "translit": "m-l-k",
  "gloss": "possess, king, power, angels",
  "count": 206,
  "headword": "ٱللَّهُ",
  "headwordGloss": "Allah",
  "family": [
   {
    "word": "مَلِكِ",
    "gloss": "King (of)"
   },
   {
    "word": "مُلْكُ",
    "gloss": "dominion"
   },
   {
    "word": "مَلَكٌ",
    "gloss": "an angel"
   },
   {
    "word": "ٱلْمَلَٰٓئِكَةُ",
    "gloss": "the angels"
   },
   {
    "word": "مَلِيكٍ",
    "gloss": "Sovereign King"
   }
  ],
  "verse": {
   "ref": "104:6",
   "surah": "Sūrat Al-Humaza",
   "text": "نَارُ ٱللَّهِ ٱلْمُوقَدَةُ"
  }
 },
 {
  "id": "hkm",
  "n": 77,
  "set": 2,
  "kind": "root",
  "root": "حكم",
  "translit": "ḥ-k-m",
  "gloss": "judge, rule, wisdom, judgment",
  "count": 210,
  "headword": "حَكِيمٌ",
  "headwordGloss": "all-wise",
  "family": [
   {
    "word": "ٱلْحُكْمُ",
    "gloss": "the judgment"
   },
   {
    "word": "حُكْمًا",
    "gloss": "judgment / authority"
   },
   {
    "word": "حَكَمًا",
    "gloss": "an arbiter"
   },
   {
    "word": "يَحْكُمُ",
    "gloss": "he judges"
   },
   {
    "word": "ٱحْكُم",
    "gloss": "judge!"
   },
   {
    "word": "أَحْكَمَتْ",
    "gloss": "it was perfected"
   }
  ],
  "verse": {
   "ref": "36:2",
   "surah": "Sūrat Yaseen",
   "text": "وَٱلْقُرْءَانِ ٱلْحَكِيمِ"
  }
 },
 {
  "id": "qbl",
  "n": 78,
  "set": 2,
  "kind": "root",
  "root": "قبل",
  "translit": "q-b-l",
  "gloss": "before, accepting, facing",
  "count": 294,
  "headword": "قَبْلِ",
  "headwordGloss": "before",
  "family": [
   {
    "word": "مِنْ قَبْلُ",
    "gloss": "from before"
   },
   {
    "word": "قِبْلَةَ",
    "gloss": "direction of prayer"
   },
   {
    "word": "تَقَبَّلْ",
    "gloss": "accept! (you)"
   }
  ],
  "verse": {
   "ref": "37:44",
   "surah": "Sūrat As-Saaffaat",
   "text": "عَلَىٰ سُرُرٍۢ مُّتَقَٰبِلِينَ"
  }
 },
 {
  "id": "nfs",
  "n": 79,
  "set": 2,
  "kind": "root",
  "root": "نفس",
  "translit": "n-f-s",
  "gloss": "self, soul",
  "count": 298,
  "headword": "نَفْسٍ",
  "headwordGloss": "a soul/self",
  "family": [
   {
    "word": "ٱلنَّفْسَ",
    "gloss": "the soul/self"
   },
   {
    "word": "نَفْسُهُۥ",
    "gloss": "his self"
   },
   {
    "word": "أَنفُسِكُمْ",
    "gloss": "yourselves"
   },
   {
    "word": "أَنفُسَهُمْ",
    "gloss": "themselves"
   }
  ],
  "verse": {
   "ref": "20:41",
   "surah": "Sūrat Taa-Haa",
   "text": "وَٱصْطَنَعْتُكَ لِنَفْسِى"
  }
 },
 {
  "id": "qlb",
  "n": 80,
  "set": 2,
  "kind": "root",
  "root": "قلب",
  "translit": "q-l-b",
  "gloss": "heart, inner self",
  "count": 168,
  "headword": "قُلُوبٌ",
  "headwordGloss": "hearts",
  "family": [
   {
    "word": "قَلْبٌ",
    "gloss": "a heart"
   },
   {
    "word": "قَلْبِهِۦ",
    "gloss": "his heart"
   },
   {
    "word": "قَلَبُوا۟",
    "gloss": "they turned back"
   },
   {
    "word": "نُقَلِّبُ",
    "gloss": "We turn/transform"
   }
  ],
  "verse": {
   "ref": "79:8",
   "surah": "Sūrat An-Naazi'aat",
   "text": "قُلُوبٌۭ يَوْمَئِذٍۢ وَاجِفَةٌ"
  }
 },
 {
  "id": "aya",
  "n": 81,
  "set": 2,
  "kind": "root",
  "root": "عين",
  "translit": "ʿ-y-n",
  "gloss": "eye, spring, essence",
  "count": 65,
  "headword": "أَعْيُنِ",
  "headwordGloss": "eyes (of)",
  "family": [
   {
    "word": "عَيْنٌ",
    "gloss": "an eye; a spring"
   },
   {
    "word": "عَيْنَيْنِ",
    "gloss": "two eyes"
   },
   {
    "word": "بِأَعْيُنِنَا",
    "gloss": "under Our eyes (care)"
   },
   {
    "word": "عُيُونٍ",
    "gloss": "springs; eyes (pl.)"
   },
   {
    "word": "عَيْنًا",
    "gloss": "a spring/eye (acc.)"
   }
  ],
  "verse": {
   "ref": "54:14",
   "surah": "Sūrat Al-Qamar",
   "text": "تَجْرِى بِأَعْيُنِنَا جَزَآءًۭ لِّمَن كَانَ كُفِرَ"
  }
 },
 {
  "id": "wjh",
  "n": 82,
  "set": 2,
  "kind": "root",
  "root": "وجه",
  "translit": "w-j-h",
  "gloss": "face, direction, presence",
  "count": 78,
  "headword": "وَجْهَ",
  "headwordGloss": "face; direction",
  "family": [
   {
    "word": "وُجُوهٌ",
    "gloss": "faces"
   },
   {
    "word": "وُجُوهَهُمْ",
    "gloss": "their faces"
   },
   {
    "word": "وَجْهِهِ",
    "gloss": "His face"
   },
   {
    "word": "وَجَّهْتُ",
    "gloss": "I turned (my face)"
   },
   {
    "word": "مُوَلِّيهَا",
    "gloss": "turning toward it"
   }
  ],
  "verse": {
   "ref": "23:5",
   "surah": "Sūrat Al-Muminoon",
   "text": "وَٱلَّذِينَ هُمْ لِفُرُوجِهِمْ حَٰفِظُونَ"
  }
 },
 {
  "id": "ydd",
  "n": 83,
  "set": 2,
  "kind": "root",
  "root": "يدي",
  "translit": "y-d-y",
  "gloss": "hand, power",
  "count": 120,
  "headword": "يَدِ",
  "headwordGloss": "hand (of)",
  "family": [
   {
    "word": "يَدًا",
    "gloss": "a hand (acc.)"
   },
   {
    "word": "يَدَيْهِ",
    "gloss": "his two hands"
   },
   {
    "word": "أَيْدِيهِمْ",
    "gloss": "their hands"
   },
   {
    "word": "بِأَيْدِيكُمْ",
    "gloss": "with your hands"
   },
   {
    "word": "أَيْدٍ",
    "gloss": "hands; strength"
   }
  ],
  "verse": {
   "ref": "74:15",
   "surah": "Sūrat Al-Muddaththir",
   "text": "ثُمَّ يَطْمَعُ أَنْ أَزِيدَ"
  }
 },
 {
  "id": "lsn",
  "n": 84,
  "set": 2,
  "kind": "root",
  "root": "لسن",
  "translit": "l-s-n",
  "gloss": "tongue, language, speech",
  "count": 25,
  "headword": "لِسَانٌ",
  "headwordGloss": "tongue",
  "family": [
   {
    "word": "لِسَانِى",
    "gloss": "my tongue"
   },
   {
    "word": "لِسَانَكَ",
    "gloss": "your tongue"
   },
   {
    "word": "أَلْسِنَتُكُمْ",
    "gloss": "your tongues"
   },
   {
    "word": "أَلْسِنَتَهُمْ",
    "gloss": "their tongues"
   },
   {
    "word": "لِسَانًا",
    "gloss": "a tongue (acc.)"
   },
   {
    "word": "بِلِسَانِ",
    "gloss": "in the language of"
   }
  ],
  "verse": {
   "ref": "26:195",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "بِلِسَانٍ عَرَبِىٍّۢ مُّبِينٍۢ"
  }
 },
 {
  "id": "wly",
  "n": 85,
  "set": 2,
  "kind": "root",
  "root": "ولي",
  "translit": "w-l-y",
  "gloss": "ally, guardian, turning toward",
  "count": 232,
  "headword": "وَلِيٌّ",
  "headwordGloss": "ally; protector",
  "family": [
   {
    "word": "وَلِيُّكُمُ",
    "gloss": "your protector"
   },
   {
    "word": "أَوْلِيَآءُ",
    "gloss": "allies/protectors"
   },
   {
    "word": "أَوْلِيَآءَ",
    "gloss": "allies/protectors (obj.)"
   },
   {
    "word": "يَتَوَلَّوْنَ",
    "gloss": "they take as allies/turn away to"
   },
   {
    "word": "تَوَلَّىٰ",
    "gloss": "he turned away"
   },
   {
    "word": "مَوْلَىٰ",
    "gloss": "patron; master; protector"
   }
  ],
  "verse": {
   "ref": "92:16",
   "surah": "Sūrat Al-Lail",
   "text": "ٱلَّذِى كَذَّبَ وَتَوَلَّىٰ"
  }
 },
 {
  "id": "sbl",
  "n": 86,
  "set": 2,
  "kind": "root",
  "root": "سبل",
  "translit": "s-b-l",
  "gloss": "path, way (sabīl)",
  "count": 176,
  "headword": "سَبِيلِ",
  "headwordGloss": "path/way (of)",
  "family": [
   {
    "word": "سُبُلَ",
    "gloss": "ways (pl.)"
   },
   {
    "word": "سَبِيلِ ٱللَّهِ",
    "gloss": "the way of Allah"
   },
   {
    "word": "بِسَبِيلِ",
    "gloss": "by means of (a way)"
   },
   {
    "word": "سَبِيلًا",
    "gloss": "a way (acc.)"
   }
  ],
  "verse": {
   "ref": "80:20",
   "surah": "Sūrat Abasa",
   "text": "ثُمَّ ٱلسَّبِيلَ يَسَّرَهُۥ"
  }
 },
 {
  "id": "awl",
  "n": 87,
  "set": 2,
  "kind": "root",
  "root": "أول",
  "translit": "ʾ-w-l",
  "gloss": "first, and returning to",
  "count": 170,
  "headword": "أُو۟لَٰٓئِكَ",
  "headwordGloss": "those",
  "family": [
   {
    "word": "أُو۟لَٰٓئِكَ هُمُ",
    "gloss": "those are"
   },
   {
    "word": "أُو۟لِى",
    "gloss": "possessors of"
   },
   {
    "word": "أُو۟لُوا۟",
    "gloss": "possessors (pl.)"
   },
   {
    "word": "أَوَّلُ",
    "gloss": "first"
   },
   {
    "word": "أَوَّلِينَ",
    "gloss": "the former/earlier ones"
   },
   {
    "word": "تَأْوِيلِهِۦ",
    "gloss": "its interpretation/ultimate outcome"
   }
  ],
  "verse": {
   "ref": "56:11",
   "surah": "Sūrat Al-Waaqia",
   "text": "أُو۟لَٰٓئِكَ ٱلْمُقَرَّبُونَ"
  }
 },
 {
  "id": "aqll",
  "n": 88,
  "set": 2,
  "kind": "root",
  "root": "عقل",
  "translit": "ʿ-q-l",
  "gloss": "reason, intellect",
  "count": 49,
  "headword": "تَعْقِلُونَ",
  "headwordGloss": "you understand",
  "family": [
   {
    "word": "يَعْقِلُونَ",
    "gloss": "they understand"
   },
   {
    "word": "أَفَلَا تَعْقِلُونَ",
    "gloss": "will you not reason?"
   },
   {
    "word": "يَعْقِلُهَا",
    "gloss": "he understands it"
   },
   {
    "word": "لَا يَعْقِلُونَ",
    "gloss": "they do not understand"
   },
   {
    "word": "عَقَلُوهُ",
    "gloss": "they understood it"
   }
  ],
  "verse": {
   "ref": "37:138",
   "surah": "Sūrat As-Saaffaat",
   "text": "وَبِٱلَّيْلِ ۗ أَفَلَا تَعْقِلُونَ"
  }
 },
 {
  "id": "fkr",
  "n": 89,
  "set": 2,
  "kind": "root",
  "root": "فكر",
  "translit": "f-k-r",
  "gloss": "think, reflect",
  "count": 18,
  "headword": "يَتَفَكَّرُونَ",
  "headwordGloss": "they reflect",
  "family": [
   {
    "word": "تَتَفَكَّرُونَ",
    "gloss": "you reflect"
   },
   {
    "word": "يَتَفَكَّرُ",
    "gloss": "he reflects"
   },
   {
    "word": "تَفَكُّرٍ",
    "gloss": "reflection"
   },
   {
    "word": "فَكَّرَ",
    "gloss": "he thought/pondered"
   }
  ],
  "verse": {
   "ref": "45:13",
   "surah": "Sūrat Al-Jaathiya",
   "text": "وَسَخَّرَ لَكُم مَّا فِى ٱلسَّمَٰوَٰتِ وَمَا فِى ٱلْأَرْضِ جَمِيعًۭا مِّنْهُ ۚ إِنَّ فِى ذَٰلِكَ لَءَايَٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ"
  }
 },
 {
  "id": "kthr",
  "n": 90,
  "set": 2,
  "kind": "root",
  "root": "كثر",
  "translit": "k-ṯ-r",
  "gloss": "abundance",
  "count": 167,
  "headword": "كَثِيرٌ",
  "headwordGloss": "many/much",
  "family": [
   {
    "word": "كَثِيرًا",
    "gloss": "much/many (adv./acc.)"
   },
   {
    "word": "أَكْثَرُ",
    "gloss": "more/most"
   },
   {
    "word": "أَكْثَرَهُمْ",
    "gloss": "most of them"
   },
   {
    "word": "كَثُرَ",
    "gloss": "it became many"
   },
   {
    "word": "ٱسْتَكْثَرْتُمْ",
    "gloss": "you sought/increased much"
   },
   {
    "word": "ٱلْكَوْثَرَ",
    "gloss": "al-Kawthar (abundance)"
   }
  ],
  "verse": {
   "ref": "20:33",
   "surah": "Sūrat Taa-Haa",
   "text": "كَىْ نُسَبِّحَكَ كَثِيرًۭا"
  }
 },
 {
  "id": "swa",
  "n": 91,
  "set": 2,
  "kind": "root",
  "root": "سوأ",
  "translit": "s-w-ʾ",
  "gloss": "evil, harm",
  "count": 167,
  "headword": "سُوٓءٌ",
  "headwordGloss": "evil; harm",
  "family": [
   {
    "word": "سُوٓءًا",
    "gloss": "evil; harm"
   },
   {
    "word": "سَيِّئَةً",
    "gloss": "an evil deed; misdeed"
   },
   {
    "word": "ٱلسُّوٓءَ",
    "gloss": "the evil; the harm"
   },
   {
    "word": "سَاءَ",
    "gloss": "it was evil; it worsened"
   }
  ],
  "verse": {
   "ref": "26:156",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "وَلَا تَمَسُّوهَا بِسُوٓءٍۢ فَيَأْخُذَكُمْ عَذَابُ يَوْمٍ عَظِيمٍۢ"
  }
 },
 {
  "id": "rghb",
  "n": 92,
  "set": 2,
  "kind": "root",
  "root": "رغب",
  "translit": "r-ġ-b",
  "gloss": "desire, incline",
  "count": 8,
  "headword": "يَرْغَبُ",
  "headwordGloss": "he desires",
  "family": [
   {
    "word": "يَرْغَبُ عَن",
    "gloss": "he turns away from"
   },
   {
    "word": "رَغَبًا",
    "gloss": "desire; longing"
   },
   {
    "word": "رَهَبًا",
    "gloss": "fear (paired with رغَبًا)"
   }
  ],
  "verse": {
   "ref": "2:130",
   "surah": "Sūrat Al-Baqara",
   "text": "وَمَن يَرْغَبُ عَن مِّلَّةِ إِبْرَٰهِۦمَ إِلَّا مَن سَفِهَ نَفْسَهُۥ ۚ وَلَقَدِ ٱصْطَفَيْنَٰهُ فِى ٱلدُّنْيَا ۖ وَإِنَّهُۥ فِى ٱلْءَاخِرَةِ لَمِنَ ٱلصَّٰلِحِينَ"
  }
 },
 {
  "id": "kbr",
  "n": 93,
  "set": 2,
  "kind": "root",
  "root": "كبر",
  "translit": "k-b-r",
  "gloss": "greatness",
  "count": 161,
  "headword": "كَبِيرٌ",
  "headwordGloss": "great",
  "family": [
   {
    "word": "ٱلْكَبِيرُ",
    "gloss": "the Great"
   },
   {
    "word": "أَكْبَرُ",
    "gloss": "greater/ greatest"
   },
   {
    "word": "كُبْرَىٰ",
    "gloss": "greatest (fem.)"
   },
   {
    "word": "كِبَرًا",
    "gloss": "old age"
   },
   {
    "word": "ٱسْتَكْبَرُوا۟",
    "gloss": "they were arrogant"
   },
   {
    "word": "مُسْتَكْبِرِينَ",
    "gloss": "arrogant ones"
   }
  ],
  "verse": {
   "ref": "54:53",
   "surah": "Sūrat Al-Qamar",
   "text": "وَكُلُّ صَغِيرٍۢ وَكَبِيرٍۢ مُّسْتَطَرٌ"
  }
 },
 {
  "id": "rjw",
  "n": 94,
  "set": 2,
  "kind": "root",
  "root": "رجو",
  "translit": "r-j-w",
  "gloss": "hope",
  "count": 20,
  "headword": "يَرْجُونَ",
  "headwordGloss": "they hope for",
  "family": [
   {
    "word": "يَرْجُونَ",
    "gloss": "they hope for"
   },
   {
    "word": "يَرْجُوا۟",
    "gloss": "he hopes for"
   },
   {
    "word": "تَرْجُونَ",
    "gloss": "you hope for"
   },
   {
    "word": "مُرْجَوْنَ",
    "gloss": "deferred, left waiting"
   }
  ],
  "verse": {
   "ref": "78:27",
   "surah": "Sūrat An-Naba",
   "text": "إِنَّهُمْ كَانُوا۟ لَا يَرْجُونَ حِسَابًۭا"
  }
 },
 {
  "id": "hbb",
  "n": 95,
  "set": 2,
  "kind": "root",
  "root": "حبب",
  "translit": "ḥ-b-b",
  "gloss": "love, affection",
  "count": 95,
  "headword": "يُحِبُّ",
  "headwordGloss": "He loves",
  "family": [
   {
    "word": "يُحِبُّونَ",
    "gloss": "they love"
   },
   {
    "word": "تُحِبُّونَ",
    "gloss": "you love"
   },
   {
    "word": "أُحِبُّ",
    "gloss": "I love"
   },
   {
    "word": "حَبَّةٍ",
    "gloss": "a grain/seed"
   },
   {
    "word": "حَبَّ",
    "gloss": "grain"
   }
  ],
  "verse": {
   "ref": "7:55",
   "surah": "Sūrat Al-A'raaf",
   "text": "ٱدْعُوا۟ رَبَّكُمْ تَضَرُّعًۭا وَخُفْيَةً ۚ إِنَّهُۥ لَا يُحِبُّ ٱلْمُعْتَدِينَ"
  }
 },
 {
  "id": "kre",
  "n": 96,
  "set": 2,
  "kind": "root",
  "root": "كره",
  "translit": "k-r-h",
  "gloss": "dislike, detest, aversion",
  "count": 41,
  "headword": "كَرِهُوا۟",
  "headwordGloss": "they disliked",
  "family": [
   {
    "word": "كَرِهْتُمُوهُ",
    "gloss": "you disliked it"
   },
   {
    "word": "يَكْرَهُونَ",
    "gloss": "they dislike"
   },
   {
    "word": "كُرْهًا",
    "gloss": "unwillingly/with hardship"
   },
   {
    "word": "كَرْهًا",
    "gloss": "compulsion/reluctance"
   }
  ],
  "verse": {
   "ref": "47:9",
   "surah": "Sūrat Muhammad",
   "text": "ذَٰلِكَ بِأَنَّهُمْ كَرِهُوا۟ مَآ أَنزَلَ ٱللَّهُ فَأَحْبَطَ أَعْمَٰلَهُمْ"
  }
 },
 {
  "id": "nba",
  "n": 97,
  "set": 2,
  "kind": "root",
  "root": "نبأ",
  "translit": "n-b-ʾ",
  "gloss": "news, tidings, prophethood",
  "count": 160,
  "headword": "نَبَإٍ",
  "headwordGloss": "news/tidings",
  "family": [
   {
    "word": "ٱلنَّبَإُ",
    "gloss": "the news"
   },
   {
    "word": "أَنبَأَ",
    "gloss": "he informed"
   },
   {
    "word": "يُنَبِّئُ",
    "gloss": "he informs"
   },
   {
    "word": "نَبِّئْهُمْ",
    "gloss": "inform them!"
   }
  ],
  "verse": {
   "ref": "78:2",
   "surah": "Sūrat An-Naba",
   "text": "عَنِ ٱلنَّبَإِ ٱلْعَظِيمِ"
  }
 },
 {
  "id": "slm",
  "n": 98,
  "set": 2,
  "kind": "root",
  "root": "سلم",
  "translit": "s-l-m",
  "gloss": "peace, submission (islām)",
  "count": 140,
  "headword": "ٱلسَّلَٰمِ",
  "headwordGloss": "peace",
  "family": [
   {
    "word": "سَلَٰمٌ",
    "gloss": "peace"
   },
   {
    "word": "سَلَٰمًا",
    "gloss": "in peace / peace"
   },
   {
    "word": "إِسْلَٰمِ",
    "gloss": "submission (Islam)"
   },
   {
    "word": "مُسْلِمِينَ",
    "gloss": "those submitting (Muslims)"
   },
   {
    "word": "أَسْلَمَ",
    "gloss": "he submitted"
   }
  ],
  "verse": {
   "ref": "19:33",
   "surah": "Sūrat Maryam",
   "text": "وَٱلسَّلَٰمُ عَلَىَّ يَوْمَ وُلِدتُّ وَيَوْمَ أَمُوتُ وَيَوْمَ أُبْعَثُ حَيًّۭا"
  }
 },
 {
  "id": "nzr",
  "n": 99,
  "set": 2,
  "kind": "root",
  "root": "نظر",
  "translit": "n-ẓ-r",
  "gloss": "looking, seeing, considering",
  "count": 129,
  "headword": "يَنظُرُونَ",
  "headwordGloss": "they look/await",
  "family": [
   {
    "word": "ٱنظُرْ",
    "gloss": "look!"
   },
   {
    "word": "نَنظُرُ",
    "gloss": "we look/consider"
   },
   {
    "word": "نَظَرَ",
    "gloss": "he looked/considered"
   },
   {
    "word": "مَنظَرٌ",
    "gloss": "a sight/view"
   },
   {
    "word": "نَاظِرَةٌ",
    "gloss": "looking/bright"
   }
  ],
  "verse": {
   "ref": "83:23",
   "surah": "Sūrat Al-Mutaffifin",
   "text": "عَلَى ٱلْأَرَآئِكِ يَنظُرُونَ"
  }
 },
 {
  "id": "qb",
  "n": 100,
  "set": 2,
  "kind": "root",
  "root": "قبح",
  "translit": "q-b-ḥ",
  "gloss": "ugliness, evil",
  "count": 1,
  "headword": "ٱلْمَقْبُوحِينَ",
  "headwordGloss": "the despised",
  "family": [
   {
    "word": "ٱلْمَقْبُوحِينَ",
    "gloss": "the despised"
   }
  ],
  "verse": {
   "ref": "28:42",
   "surah": "Sūrat Al-Qasas",
   "text": "وَأَتْبَعْنَٰهُمْ فِى هَٰذِهِ ٱلدُّنْيَا لَعْنَةًۭ ۖ وَيَوْمَ ٱلْقِيَٰمَةِ هُم مِّنَ ٱلْمَقْبُوحِينَ"
  }
 },
 {
  "id": "twʿ",
  "n": 101,
  "set": 2,
  "kind": "root",
  "root": "طوع",
  "translit": "ṭ-w-ʿ",
  "gloss": "obedience, willingness",
  "count": 129,
  "headword": "أَطِيعُوا۟",
  "headwordGloss": "obey!",
  "family": [
   {
    "word": "أَطِيعُوا۟ ٱللَّهَ",
    "gloss": "obey Allah"
   },
   {
    "word": "أَطَاعَ",
    "gloss": "he obeyed"
   },
   {
    "word": "يُطِيعُ",
    "gloss": "he obeys"
   },
   {
    "word": "طَاعَةٌ",
    "gloss": "obedience"
   },
   {
    "word": "طَوْعًا",
    "gloss": "willingly"
   }
  ],
  "verse": {
   "ref": "3:132",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "وَأَطِيعُوا۟ ٱللَّهَ وَٱلرَّسُولَ لَعَلَّكُمْ تُرْحَمُونَ"
  }
 },
 {
  "id": "jmʿ",
  "n": 102,
  "set": 2,
  "kind": "root",
  "root": "جمع",
  "translit": "j-m-ʿ",
  "gloss": "gathering, all together",
  "count": 129,
  "headword": "جَمِيعًا",
  "headwordGloss": "all together",
  "family": [
   {
    "word": "جَمْعًا",
    "gloss": "gathering; altogether"
   },
   {
    "word": "يَجْمَعُ",
    "gloss": "he gathers"
   },
   {
    "word": "نَجْمَعُ",
    "gloss": "we gather"
   },
   {
    "word": "ٱجْمَعُوا۟",
    "gloss": "gather (yourselves)"
   },
   {
    "word": "مَجْمُوعٌ",
    "gloss": "gathered"
   },
   {
    "word": "ٱلْجَمْعَ",
    "gloss": "the gathering"
   }
  ],
  "verse": {
   "ref": "70:14",
   "surah": "Sūrat Al-Ma'aarij",
   "text": "وَمَن فِى ٱلْأَرْضِ جَمِيعًۭا ثُمَّ يُنجِيهِ"
  }
 },
 {
  "id": "ʿzm",
  "n": 103,
  "set": 2,
  "kind": "root",
  "root": "عظم",
  "translit": "ʿ-ẓ-m",
  "gloss": "greatness, magnificence",
  "count": 128,
  "headword": "عَظِيمٌ",
  "headwordGloss": "tremendous",
  "family": [
   {
    "word": "ٱلْعَظِيمِ",
    "gloss": "the Tremendous (gen.)"
   },
   {
    "word": "عَظِيمًا",
    "gloss": "tremendous (acc.)"
   },
   {
    "word": "عَظُمَ",
    "gloss": "it became great"
   },
   {
    "word": "يَعْظُمُ",
    "gloss": "it becomes great"
   },
   {
    "word": "أَعْظَمُ",
    "gloss": "greater/ greatest"
   }
  ],
  "verse": {
   "ref": "78:2",
   "surah": "Sūrat An-Naba",
   "text": "عَنِ ٱلنَّبَإِ ٱلْعَظِيمِ"
  }
 },
 {
  "id": "ahl",
  "n": 104,
  "set": 2,
  "kind": "root",
  "root": "أهل",
  "translit": "ʾ-h-l",
  "gloss": "family, people of",
  "count": 127,
  "headword": "أَهْلِ",
  "headwordGloss": "people of / family of",
  "family": [
   {
    "word": "أَهْلَهُۥ",
    "gloss": "his family"
   },
   {
    "word": "أَهْلِى",
    "gloss": "my family"
   },
   {
    "word": "أَهْلَكْنَا",
    "gloss": "We destroyed"
   },
   {
    "word": "أَهْلَكْتُ",
    "gloss": "I destroyed"
   },
   {
    "word": "مُهْلِكُ",
    "gloss": "destroyer / one who causes ruin"
   }
  ],
  "verse": {
   "ref": "90:6",
   "surah": "Sūrat Al-Balad",
   "text": "يَقُولُ أَهْلَكْتُ مَالًۭا لُّبَدًا"
  }
 },
 {
  "id": "ʿzz",
  "n": 105,
  "set": 2,
  "kind": "root",
  "root": "عزز",
  "translit": "ʿ-z-z",
  "gloss": "might, honor (ʿazīz)",
  "count": 119,
  "headword": "ٱلْعَزِيزُ",
  "headwordGloss": "the Mighty",
  "family": [
   {
    "word": "عَزِيزٌ",
    "gloss": "mighty / dear"
   },
   {
    "word": "عِزَّةٌ",
    "gloss": "might / honor"
   },
   {
    "word": "أَعَزُّ",
    "gloss": "mightier"
   },
   {
    "word": "عَزَّزْنَا",
    "gloss": "We strengthened"
   },
   {
    "word": "عَزِيزٌ عَلَيْهِ",
    "gloss": "hard on him"
   }
  ],
  "verse": {
   "ref": "36:5",
   "surah": "Sūrat Yaseen",
   "text": "تَنزِيلَ ٱلْعَزِيزِ ٱلرَّحِيمِ"
  }
 },
 {
  "id": "nfq",
  "n": 106,
  "set": 2,
  "kind": "root",
  "root": "نفق",
  "translit": "n-f-q",
  "gloss": "spending, and hypocrisy",
  "count": 111,
  "headword": "يُنفِقُونَ",
  "headwordGloss": "they spend",
  "family": [
   {
    "word": "أَنفِقُوا۟",
    "gloss": "spend!"
   },
   {
    "word": "أَنفَقْتُمْ",
    "gloss": "you spent"
   },
   {
    "word": "يُنفِقْ",
    "gloss": "let him spend"
   },
   {
    "word": "نَفَقَٰتِهِمْ",
    "gloss": "their expenditures"
   },
   {
    "word": "ٱلْمُنَٰفِقِينَ",
    "gloss": "the hypocrites"
   },
   {
    "word": "نِفَاقًا",
    "gloss": "hypocrisy"
   }
  ],
  "verse": {
   "ref": "8:3",
   "surah": "Sūrat Al-Anfaal",
   "text": "ٱلَّذِينَ يُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ"
  }
 },
 {
  "id": "ʿdw",
  "n": 107,
  "set": 2,
  "kind": "root",
  "root": "عدو",
  "translit": "ʿ-d-w",
  "gloss": "enmity, overstepping",
  "count": 106,
  "headword": "عَدُوٌّ",
  "headwordGloss": "enemy",
  "family": [
   {
    "word": "عَدُوًّا",
    "gloss": "an enemy"
   },
   {
    "word": "أَعْدَآءَ",
    "gloss": "enemies (plural)"
   },
   {
    "word": "يَعْدُونَ",
    "gloss": "they transgress"
   },
   {
    "word": "ٱعْتَدَوْا۟",
    "gloss": "they transgressed"
   },
   {
    "word": "مُعْتَدِينَ",
    "gloss": "transgressors"
   }
  ],
  "verse": {
   "ref": "51:5",
   "surah": "Sūrat Adh-Dhaariyat",
   "text": "إِنَّمَا تُوعَدُونَ لَصَادِقٌۭ"
  }
 },
 {
  "id": "jzy",
  "n": 108,
  "set": 2,
  "kind": "root",
  "root": "جزي",
  "translit": "j-z-y",
  "gloss": "recompense, reward",
  "count": 118,
  "headword": "جَزَآءً",
  "headwordGloss": "a recompense",
  "family": [
   {
    "word": "يَجْزِى",
    "gloss": "He recompenses"
   },
   {
    "word": "نَجْزِى",
    "gloss": "We recompense"
   },
   {
    "word": "تُجْزَىٰ",
    "gloss": "it/one will be recompensed"
   },
   {
    "word": "جَزَيْنَـٰهُمْ",
    "gloss": "We recompensed them"
   },
   {
    "word": "ٱلْجَزَآءَ",
    "gloss": "the recompense"
   }
  ],
  "verse": {
   "ref": "56:24",
   "surah": "Sūrat Al-Waaqia",
   "text": "جَزَآءًۢ بِمَا كَانُوا۟ يَعْمَلُونَ"
  }
 },
 {
  "id": "ajr",
  "n": 109,
  "set": 2,
  "kind": "root",
  "root": "أجر",
  "translit": "ʾ-j-r",
  "gloss": "reward, wage",
  "count": 105,
  "headword": "أَجْرٌ",
  "headwordGloss": "reward",
  "family": [
   {
    "word": "أَجْرًا",
    "gloss": "a reward (acc.)"
   },
   {
    "word": "أَجْرِىَ",
    "gloss": "my reward"
   },
   {
    "word": "أَجْرَهُۥ",
    "gloss": "his reward"
   },
   {
    "word": "أُجُورَهُنَّ",
    "gloss": "their wages (fem.)"
   }
  ],
  "verse": {
   "ref": "68:3",
   "surah": "Sūrat Al-Qalam",
   "text": "وَإِنَّ لَكَ لَأَجْرًا غَيْرَ مَمْنُونٍۢ"
  }
 },
 {
  "id": "wld",
  "n": 110,
  "set": 2,
  "kind": "root",
  "root": "ولد",
  "translit": "w-l-d",
  "gloss": "child, birth",
  "count": 102,
  "headword": "وَلَدًا",
  "headwordGloss": "a child",
  "family": [
   {
    "word": "وَلَدَتْ",
    "gloss": "she gave birth"
   },
   {
    "word": "يَلِدْ",
    "gloss": "he begets"
   },
   {
    "word": "يُولَدْ",
    "gloss": "is born"
   },
   {
    "word": "وَٰلِدَةٌ",
    "gloss": "a mother (birth-giver)"
   }
  ],
  "verse": {
   "ref": "19:91",
   "surah": "Sūrat Maryam",
   "text": "أَن دَعَوْا۟ لِلرَّحْمَٰنِ وَلَدًۭا"
  }
 },
 {
  "id": "dyn",
  "n": 111,
  "set": 2,
  "kind": "root",
  "root": "دين",
  "translit": "d-y-n",
  "gloss": "religion, judgement, debt",
  "count": 101,
  "headword": "ٱلدِّينِ",
  "headwordGloss": "the religion/judgement",
  "family": [
   {
    "word": "يَوْمِ ٱلدِّينِ",
    "gloss": "Day of Judgement"
   },
   {
    "word": "دِينًا",
    "gloss": "as a religion/way"
   },
   {
    "word": "دِينِهِمْ",
    "gloss": "their religion"
   },
   {
    "word": "مَدِينِينَ",
    "gloss": "recompensed/held to account"
   },
   {
    "word": "يَدِينُونَ",
    "gloss": "they submit/are obligated"
   }
  ],
  "verse": {
   "ref": "51:6",
   "surah": "Sūrat Adh-Dhaariyat",
   "text": "وَإِنَّ ٱلدِّينَ لَوَٰقِعٌۭ"
  }
 },
 {
  "id": "brk",
  "n": 112,
  "set": 2,
  "kind": "root",
  "root": "برك",
  "translit": "b-r-k",
  "gloss": "blessing, growth, increase",
  "count": 32,
  "headword": "مُبَارَكٌ",
  "headwordGloss": "blessed",
  "family": [
   {
    "word": "تَبَارَكَ",
    "gloss": "Blessed is He"
   },
   {
    "word": "بَارِكْ",
    "gloss": "bless!"
   },
   {
    "word": "مُبَارَكًا",
    "gloss": "blessed (acc.)"
   }
  ],
  "verse": {
   "ref": "21:50",
   "surah": "Sūrat Al-Anbiyaa",
   "text": "وَهَٰذَا ذِكْرٌۭ مُّبَارَكٌ أَنزَلْنَٰهُ ۚ أَفَأَنتُمْ لَهُۥ مُنكِرُونَ"
  }
 },
 {
  "id": "shb",
  "n": 113,
  "set": 2,
  "kind": "root",
  "root": "صحب",
  "translit": "ṣ-ḥ-b",
  "gloss": "companion, people of",
  "count": 97,
  "headword": "صَاحِبِهِ",
  "headwordGloss": "his companion",
  "family": [
   {
    "word": "صَاحِبُكُمْ",
    "gloss": "your companion"
   },
   {
    "word": "صُحْبَةً",
    "gloss": "companionship"
   }
  ],
  "verse": {
   "ref": "54:29",
   "surah": "Sūrat Al-Qamar",
   "text": "فَنَادَوْا۟ صَاحِبَهُمْ فَتَعَاطَىٰ فَعَقَرَ"
  }
 },
 {
  "id": "bghy",
  "n": 114,
  "set": 2,
  "kind": "root",
  "root": "بغي",
  "translit": "b-ġ-y",
  "gloss": "seeking, transgressing",
  "count": 96,
  "headword": "بِغَيْرِ",
  "headwordGloss": "without; other than",
  "family": [
   {
    "word": "يَبْغُونَ",
    "gloss": "they seek / desire"
   },
   {
    "word": "ٱبْتَغُوا۟",
    "gloss": "seek! (pl. command)"
   },
   {
    "word": "ٱبْتِغَاءَ",
    "gloss": "seeking (for)"
   },
   {
    "word": "بَغْيًا",
    "gloss": "out of transgression"
   },
   {
    "word": "بَاغٍ",
    "gloss": "a transgressor"
   },
   {
    "word": "بَغَتْ",
    "gloss": "she transgressed"
   }
  ],
  "verse": {
   "ref": "38:39",
   "surah": "Sūrat Saad",
   "text": "هَٰذَا عَطَآؤُنَا فَٱمْنُنْ أَوْ أَمْسِكْ بِغَيْرِ حِسَابٍۢ"
  }
 },
 {
  "id": "khsr",
  "n": 115,
  "set": 2,
  "kind": "root",
  "root": "خسر",
  "translit": "ḵ-s-r",
  "gloss": "loss, failure, ruin",
  "count": 65,
  "headword": "ٱلْخَـٰسِرِينَ",
  "headwordGloss": "the losers",
  "family": [
   {
    "word": "خَسِرَ",
    "gloss": "he lost"
   },
   {
    "word": "خَسِرُوا۟",
    "gloss": "they lost"
   },
   {
    "word": "خُسْرًا",
    "gloss": "loss"
   },
   {
    "word": "خُسْرَانٌ",
    "gloss": "ruin; great loss"
   },
   {
    "word": "خَاسِرٌ",
    "gloss": "a loser"
   },
   {
    "word": "أَخْسَرِينَ",
    "gloss": "greatest losers"
   }
  ],
  "verse": {
   "ref": "5:30",
   "surah": "Sūrat Al-Maaida",
   "text": "فَطَوَّعَتْ لَهُۥ نَفْسُهُۥ قَتْلَ أَخِيهِ فَقَتَلَهُۥ فَأَصْبَحَ مِنَ ٱلْخَٰسِرِينَ"
  }
 },
 {
  "id": "fwz",
  "n": 116,
  "set": 2,
  "kind": "root",
  "root": "فوز",
  "translit": "f-w-z",
  "gloss": "success, salvation",
  "count": 31,
  "headword": "ٱلْفَوْزُ",
  "headwordGloss": "the triumph",
  "family": [
   {
    "word": "ٱلْفَوْزُ",
    "gloss": "the triumph"
   },
   {
    "word": "فَازَ",
    "gloss": "he succeeded"
   },
   {
    "word": "ٱلْفَآئِزُونَ",
    "gloss": "the successful"
   },
   {
    "word": "فَوْزًا",
    "gloss": "a triumph"
   },
   {
    "word": "مَفَازًا",
    "gloss": "a place of success"
   }
  ],
  "verse": {
   "ref": "37:60",
   "surah": "Sūrat As-Saaffaat",
   "text": "إِنَّ هَٰذَا لَهُوَ ٱلْفَوْزُ ٱلْعَظِيمُ"
  }
 },
 {
  "id": "khyr",
  "n": 117,
  "set": 2,
  "kind": "root",
  "root": "خير",
  "translit": "ḵ-y-r",
  "gloss": "good, benefit",
  "count": 196,
  "headword": "خَيْرٌ",
  "headwordGloss": "good / better",
  "family": [
   {
    "word": "خَيْرًا",
    "gloss": "good / good thing"
   },
   {
    "word": "أَخْيَارِ",
    "gloss": "the best / good people"
   },
   {
    "word": "خَيْرٌۭ لَّكُمْ",
    "gloss": "better for you"
   }
  ],
  "verse": {
   "ref": "55:70",
   "surah": "Sūrat Ar-Rahmaan",
   "text": "فِيهِنَّ خَيْرَٰتٌ حِسَانٌۭ"
  }
 },
 {
  "id": "rr2",
  "n": 118,
  "set": 2,
  "kind": "root",
  "root": "شرر",
  "translit": "š-r-r",
  "gloss": "evil, harm",
  "count": 472,
  "headword": "شَرٌّ",
  "headwordGloss": "evil, worse",
  "family": [
   {
    "word": "شَرٌّ",
    "gloss": "evil, worse"
   },
   {
    "word": "ٱلشَّرَّ",
    "gloss": "the evil"
   },
   {
    "word": "ٱلْأَشْرَارِ",
    "gloss": "the wicked"
   },
   {
    "word": "بِشَرَرٍ",
    "gloss": "with sparks"
   }
  ],
  "verse": {
   "ref": "20:32",
   "surah": "Sūrat Taa-Haa",
   "text": "وَأَشْرِكْهُ فِىٓ أَمْرِى"
  }
 },
 {
  "id": "ywm",
  "n": 119,
  "set": 2,
  "kind": "root",
  "root": "يوم",
  "translit": "y-w-m",
  "gloss": "day, time",
  "count": 475,
  "headword": "يَوْمَ",
  "headwordGloss": "on the day / day",
  "family": [
   {
    "word": "ٱلْيَوْمَ",
    "gloss": "today / this day"
   },
   {
    "word": "يَوْمِئِذٍ",
    "gloss": "on that day"
   },
   {
    "word": "أَيَّامٍ",
    "gloss": "days (pl.)"
   },
   {
    "word": "يَوْمَيْنِ",
    "gloss": "two days"
   }
  ],
  "verse": {
   "ref": "77:35",
   "surah": "Sūrat Al-Mursalaat",
   "text": "هَٰذَا يَوْمُ لَا يَنطِقُونَ"
  }
 },
 {
  "id": "lyl",
  "n": 120,
  "set": 2,
  "kind": "root",
  "root": "ليل",
  "translit": "l-y-l",
  "gloss": "night",
  "count": 92,
  "headword": "ٱلَّيْلِ",
  "headwordGloss": "the night",
  "family": [
   {
    "word": "لَيْلًا",
    "gloss": "by night / at night"
   },
   {
    "word": "لَيَالِيَ",
    "gloss": "nights"
   },
   {
    "word": "وَٱلَّيْلِ",
    "gloss": "by the night"
   },
   {
    "word": "بِٱلَّيْلِ",
    "gloss": "by/at night"
   }
  ],
  "verse": {
   "ref": "81:17",
   "surah": "Sūrat At-Takwir",
   "text": "وَٱلَّيْلِ إِذَا عَسْعَسَ"
  }
 },
 {
  "id": "ard",
  "n": 121,
  "set": 3,
  "kind": "root",
  "root": "أرض",
  "translit": "ʾ-r-ḍ",
  "gloss": "earth, land",
  "count": 460,
  "headword": "ٱلْأَرْضِ",
  "headwordGloss": "the earth",
  "family": [
   {
    "word": "أَرْضًا",
    "gloss": "land/earth (indef.)"
   },
   {
    "word": "أَرْضِكُمْ",
    "gloss": "your land"
   },
   {
    "word": "أَرْضِهِمْ",
    "gloss": "their land"
   }
  ],
  "verse": {
   "ref": "84:3",
   "surah": "Sūrat Al-Inshiqaaq",
   "text": "وَإِذَا ٱلْأَرْضُ مُدَّتْ"
  }
 },
 {
  "id": "smw",
  "n": 122,
  "set": 3,
  "kind": "root",
  "root": "سمو",
  "translit": "s-m-w",
  "gloss": "sky, heavens, heaven",
  "count": 380,
  "headword": "ٱلسَّمَٰوَٰتِ",
  "headwordGloss": "the heavens",
  "family": [
   {
    "word": "ٱلسَّمَآءِ",
    "gloss": "the heaven/sky"
   },
   {
    "word": "ٱلسَّمَآءَ",
    "gloss": "the heaven/sky (acc.)"
   },
   {
    "word": "سَمَآءٍ",
    "gloss": "a heaven/sky"
   },
   {
    "word": "سَمَٰوَٰتٍ",
    "gloss": "heavens (indef.)"
   },
   {
    "word": "وَٱلسَّمَآءِ",
    "gloss": "and the heaven/sky"
   }
  ],
  "verse": {
   "ref": "20:4",
   "surah": "Sūrat Taa-Haa",
   "text": "تَنزِيلًۭا مِّمَّنْ خَلَقَ ٱلْأَرْضَ وَٱلسَّمَٰوَٰتِ ٱلْعُلَى"
  }
 },
 {
  "id": "jbl",
  "n": 123,
  "set": 3,
  "kind": "root",
  "root": "جبل",
  "translit": "j-b-l",
  "gloss": "mountain",
  "count": 41,
  "headword": "ٱلْجِبَالُ",
  "headwordGloss": "the mountains",
  "family": [
   {
    "word": "جَبَلًا",
    "gloss": "a mountain"
   },
   {
    "word": "جِبِلًّا",
    "gloss": "a huge multitude"
   },
   {
    "word": "جِبِلًّا كَثِيرًا",
    "gloss": "a great multitude"
   }
  ],
  "verse": {
   "ref": "77:10",
   "surah": "Sūrat Al-Mursalaat",
   "text": "وَإِذَا ٱلْجِبَالُ نُسِفَتْ"
  }
 },
 {
  "id": "bhr",
  "n": 124,
  "set": 3,
  "kind": "root",
  "root": "بحر",
  "translit": "b-ḥ-r",
  "gloss": "sea",
  "count": 42,
  "headword": "ٱلْبَحْرِ",
  "headwordGloss": "the sea",
  "family": [
   {
    "word": "بَحْرًا",
    "gloss": "a sea"
   },
   {
    "word": "بَحْرَيْنِ",
    "gloss": "two seas"
   },
   {
    "word": "ٱلْبَحْرَيْنِ",
    "gloss": "the two seas"
   },
   {
    "word": "بِحَارٌ",
    "gloss": "seas"
   }
  ],
  "verse": {
   "ref": "55:19",
   "surah": "Sūrat Ar-Rahmaan",
   "text": "مَرَجَ ٱلْبَحْرَيْنِ يَلْتَقِيَانِ"
  }
 },
 {
  "id": "nhr",
  "n": 125,
  "set": 3,
  "kind": "root",
  "root": "نهر",
  "translit": "n-h-r",
  "gloss": "river",
  "count": 113,
  "headword": "ٱلنَّهَارِ",
  "headwordGloss": "the daytime",
  "family": [
   {
    "word": "نَهَارًا",
    "gloss": "by day; daytime"
   },
   {
    "word": "نَهَرٌ",
    "gloss": "a river"
   },
   {
    "word": "نَهَرًا",
    "gloss": "a river (acc.)"
   }
  ],
  "verse": {
   "ref": "92:2",
   "surah": "Sūrat Al-Lail",
   "text": "وَٱلنَّهَارِ إِذَا تَجَلَّىٰ"
  }
 },
 {
  "id": "rwh",
  "n": 126,
  "set": 3,
  "kind": "root",
  "root": "روح",
  "translit": "r-w-ḥ",
  "gloss": "wind, spirit",
  "count": 57,
  "headword": "رُوحٌ",
  "headwordGloss": "spirit",
  "family": [
   {
    "word": "ٱلرُّوحُ",
    "gloss": "the Spirit"
   },
   {
    "word": "رُوحِى",
    "gloss": "My spirit"
   },
   {
    "word": "رُوحَنَا",
    "gloss": "Our Spirit"
   },
   {
    "word": "رُوحٌۭ مِّنْهُ",
    "gloss": "a spirit from Him"
   }
  ],
  "verse": {
   "ref": "26:193",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "نَزَلَ بِهِ ٱلرُّوحُ ٱلْأَمِينُ"
  }
 },
 {
  "id": "mtr",
  "n": 127,
  "set": 3,
  "kind": "root",
  "root": "مطر",
  "translit": "m-ṭ-r",
  "gloss": "rain",
  "count": 15,
  "headword": "مَطَرًا",
  "headwordGloss": "rain",
  "family": [
   {
    "word": "مَطَرْنَا",
    "gloss": "We rained"
   },
   {
    "word": "أَمْطَرْنَا",
    "gloss": "We poured down rain"
   },
   {
    "word": "أُمْطِرَتْ",
    "gloss": "was rained upon"
   },
   {
    "word": "مَطَرُ",
    "gloss": "rain"
   }
  ],
  "verse": {
   "ref": "26:173",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "وَأَمْطَرْنَا عَلَيْهِم مَّطَرًۭا ۖ فَسَآءَ مَطَرُ ٱلْمُنذَرِينَ"
  }
 },
 {
  "id": "shms",
  "n": 128,
  "set": 3,
  "kind": "root",
  "root": "شمس",
  "translit": "š-m-s",
  "gloss": "sun",
  "count": 33,
  "headword": "ٱلشَّمْسُ",
  "headwordGloss": "the sun",
  "family": [
   {
    "word": "وَٱلشَّمْسِ",
    "gloss": "by the sun"
   },
   {
    "word": "بِٱلشَّمْسِ",
    "gloss": "with/by the sun"
   },
   {
    "word": "لِلشَّمْسِ",
    "gloss": "for the sun"
   }
  ],
  "verse": {
   "ref": "75:9",
   "surah": "Sūrat Al-Qiyaama",
   "text": "وَجُمِعَ ٱلشَّمْسُ وَٱلْقَمَرُ"
  }
 },
 {
  "id": "qmr",
  "n": 129,
  "set": 3,
  "kind": "root",
  "root": "قمر",
  "translit": "q-m-r",
  "gloss": "moon",
  "count": 27,
  "headword": "ٱلْقَمَرَ",
  "headwordGloss": "the moon",
  "family": [
   {
    "word": "وَٱلْقَمَرَ",
    "gloss": "and the moon (acc.)"
   },
   {
    "word": "وَٱلْقَمَرُ",
    "gloss": "and the moon (nom.)"
   }
  ],
  "verse": {
   "ref": "84:18",
   "surah": "Sūrat Al-Inshiqaaq",
   "text": "وَٱلْقَمَرِ إِذَا ٱتَّسَقَ"
  }
 },
 {
  "id": "njm",
  "n": 130,
  "set": 3,
  "kind": "root",
  "root": "نجم",
  "translit": "n-j-m",
  "gloss": "star",
  "count": 13,
  "headword": "ٱلنَّجْمِ",
  "headwordGloss": "the star",
  "family": [
   {
    "word": "ٱلنُّجُومِ",
    "gloss": "the stars"
   },
   {
    "word": "وَٱلنَّجْمِ",
    "gloss": "by the star"
   },
   {
    "word": "بِٱلنَّجْمِ",
    "gloss": "by the stars"
   }
  ],
  "verse": {
   "ref": "55:6",
   "surah": "Sūrat Ar-Rahmaan",
   "text": "وَٱلنَّجْمُ وَٱلشَّجَرُ يَسْجُدَانِ"
  }
 },
 {
  "id": "nar",
  "n": 131,
  "set": 3,
  "kind": "root",
  "root": "نور",
  "translit": "n-w-r",
  "gloss": "fire, hell",
  "count": 194,
  "headword": "ٱلنَّارِ",
  "headwordGloss": "the Fire",
  "family": [
   {
    "word": "نَارًا",
    "gloss": "a fire"
   },
   {
    "word": "نَارُ",
    "gloss": "fire (nom.)"
   },
   {
    "word": "نُورٌ",
    "gloss": "light"
   },
   {
    "word": "نُورِهِۦ",
    "gloss": "His light"
   },
   {
    "word": "ٱلنُّورِ",
    "gloss": "the light"
   },
   {
    "word": "نُورًا",
    "gloss": "a light"
   }
  ],
  "verse": {
   "ref": "85:5",
   "surah": "Sūrat Al-Burooj",
   "text": "ٱلنَّارِ ذَاتِ ٱلْوَقُودِ"
  }
 },
 {
  "id": "ma",
  "n": 132,
  "set": 3,
  "kind": "root",
  "root": "موه",
  "translit": "m-w-h",
  "gloss": "water",
  "count": 63,
  "headword": "ٱلْمَآءِ",
  "headwordGloss": "the water",
  "family": [
   {
    "word": "مَآءً",
    "gloss": "water"
   },
   {
    "word": "مَآءٍ",
    "gloss": "water (of)"
   },
   {
    "word": "مِنَ ٱلْمَآءِ",
    "gloss": "from the water"
   },
   {
    "word": "بِمَآءٍ",
    "gloss": "with water"
   }
  ],
  "verse": {
   "ref": "80:25",
   "surah": "Sūrat Abasa",
   "text": "أَنَّا صَبَبْنَا ٱلْمَآءَ صَبًّۭا"
  }
 },
 {
  "id": "shjr",
  "n": 133,
  "set": 3,
  "kind": "root",
  "root": "شجر",
  "translit": "š-j-r",
  "gloss": "tree",
  "count": 26,
  "headword": "شَجَرَةٍ",
  "headwordGloss": "a tree",
  "family": [
   {
    "word": "ٱلشَّجَرِ",
    "gloss": "the trees (collective)"
   },
   {
    "word": "شَجَرَةَ ٱلزَّقُّومِ",
    "gloss": "the Zaqqum tree"
   },
   {
    "word": "شَجَرَةًۭ مُّبَٰرَكَةً",
    "gloss": "a blessed tree"
   }
  ],
  "verse": {
   "ref": "37:146",
   "surah": "Sūrat As-Saaffaat",
   "text": "وَأَنۢبَتْنَا عَلَيْهِ شَجَرَةًۭ مِّن يَقْطِينٍۢ"
  }
 },
 {
  "id": "thmr",
  "n": 134,
  "set": 3,
  "kind": "root",
  "root": "ثمر",
  "translit": "ṯ-m-r",
  "gloss": "fruit",
  "count": 24,
  "headword": "ثَمَرَٰتٍ",
  "headwordGloss": "fruits",
  "family": [
   {
    "word": "ثَمَرَةً",
    "gloss": "a fruit"
   },
   {
    "word": "ثَمَرِهِۦ",
    "gloss": "its fruit"
   },
   {
    "word": "ثَمَرُهُۥ",
    "gloss": "its fruit"
   },
   {
    "word": "ثَمَرٍ",
    "gloss": "fruit; produce"
   },
   {
    "word": "ٱلثَّمَرَٰتِ",
    "gloss": "the fruits"
   }
  ],
  "verse": {
   "ref": "7:130",
   "surah": "Sūrat Al-A'raaf",
   "text": "وَلَقَدْ أَخَذْنَآ ءَالَ فِرْعَوْنَ بِٱلسِّنِينَ وَنَقْصٍۢ مِّنَ ٱلثَّمَرَٰتِ لَعَلَّهُمْ يَذَّكَّرُونَ"
  }
 },
 {
  "id": "zrʿ",
  "n": 135,
  "set": 3,
  "kind": "root",
  "root": "زرع",
  "translit": "z-r-ʿ",
  "gloss": "crop, plant",
  "count": 14,
  "headword": "زَرْعًا",
  "headwordGloss": "crops; sowing",
  "family": [
   {
    "word": "زَرَعَ",
    "gloss": "he sowed/planted"
   },
   {
    "word": "تَزْرَعُونَ",
    "gloss": "you (pl) sow"
   },
   {
    "word": "تَزْرَعُ",
    "gloss": "you (sg) sow"
   },
   {
    "word": "ٱلزَّرْعِ",
    "gloss": "the crops/tilth"
   },
   {
    "word": "زُرُوعٍ",
    "gloss": "crops (pl.)"
   }
  ],
  "verse": {
   "ref": "18:32",
   "surah": "Sūrat Al-Kahf",
   "text": "۞ وَٱضْرِبْ لَهُم مَّثَلًۭا رَّجُلَيْنِ جَعَلْنَا لِأَحَدِهِمَا جَنَّتَيْنِ مِنْ أَعْنَٰبٍۢ وَحَفَفْنَٰهُمَا بِنَخْلٍۢ وَجَعَلْنَا بَيْنَهُمَا زَرْعًۭا"
  }
 },
 {
  "id": "tyr",
  "n": 136,
  "set": 3,
  "kind": "root",
  "root": "طير",
  "translit": "ṭ-y-r",
  "gloss": "bird",
  "count": 29,
  "headword": "ٱلطَّيْرَ",
  "headwordGloss": "the birds",
  "family": [
   {
    "word": "طَيْرًا",
    "gloss": "birds (acc.)"
   },
   {
    "word": "طَٰٓئِرٌ",
    "gloss": "omen / lot"
   },
   {
    "word": "طَٰٓئِرَهُۥ",
    "gloss": "his omen/lot"
   },
   {
    "word": "طَٰٓئِرُهُمْ",
    "gloss": "their omen/lot"
   }
  ],
  "verse": {
   "ref": "38:19",
   "surah": "Sūrat Saad",
   "text": "وَٱلطَّيْرَ مَحْشُورَةًۭ ۖ كُلٌّۭ لَّهُۥٓ أَوَّابٌۭ"
  }
 },
 {
  "id": "dbb",
  "n": 137,
  "set": 3,
  "kind": "root",
  "root": "دبب",
  "translit": "d-b-b",
  "gloss": "creature, moving being",
  "count": 18,
  "headword": "دَآبَّةٍ",
  "headwordGloss": "a creature",
  "family": [
   {
    "word": "دَوَآبَّ",
    "gloss": "creatures (pl.)"
   },
   {
    "word": "دَآبَّةٍۢ فِى ٱلْأَرْضِ",
    "gloss": "a creature on earth"
   },
   {
    "word": "يَدُبُّ",
    "gloss": "it moves/creeps"
   }
  ],
  "verse": {
   "ref": "45:4",
   "surah": "Sūrat Al-Jaathiya",
   "text": "وَفِى خَلْقِكُمْ وَمَا يَبُثُّ مِن دَآبَّةٍ ءَايَٰتٌۭ لِّقَوْمٍۢ يُوقِنُونَ"
  }
 },
 {
  "id": "hyy",
  "n": 138,
  "set": 3,
  "kind": "root",
  "root": "حيي",
  "translit": "ḥ-y-y",
  "gloss": "life, living creature",
  "count": 184,
  "headword": "ٱلْحَيَوٰةِ",
  "headwordGloss": "the life",
  "family": [
   {
    "word": "يُحْيِۦ",
    "gloss": "He gives life"
   },
   {
    "word": "أَحْيَا",
    "gloss": "he gave life"
   },
   {
    "word": "ٱلْحَىُّ",
    "gloss": "the Ever-Living"
   },
   {
    "word": "حَيًّا",
    "gloss": "alive (as adj.)"
   },
   {
    "word": "يَحْيَىٰ",
    "gloss": "he lives"
   }
  ],
  "verse": {
   "ref": "79:38",
   "surah": "Sūrat An-Naazi'aat",
   "text": "وَءَاثَرَ ٱلْحَيَوٰةَ ٱلدُّنْيَا"
  }
 },
 {
  "id": "sabbah",
  "n": 139,
  "set": 3,
  "kind": "root",
  "root": "سبح",
  "translit": "s-b-ḥ",
  "gloss": "glorifying, declaring free of fault",
  "count": 92,
  "headword": "سَبِّحْ",
  "headwordGloss": "glorify!",
  "family": [
   {
    "word": "يُسَبِّحُ",
    "gloss": "he/it glorifies"
   },
   {
    "word": "سُبْحَٰنَ",
    "gloss": "glory be (to Him)"
   },
   {
    "word": "ٱلْمُسَبِّحِينَ",
    "gloss": "those who glorify"
   }
  ],
  "verse": {
   "ref": "20:33",
   "surah": "Sūrat Taa-Haa",
   "text": "كَىْ نُسَبِّحَكَ كَثِيرًۭا"
  }
 },
 {
  "id": "tyb",
  "n": 140,
  "set": 3,
  "kind": "root",
  "root": "طيب",
  "translit": "ṭ-y-b",
  "gloss": "good, pure",
  "count": 50,
  "headword": "طَيِّبًا",
  "headwordGloss": "good/wholesome",
  "family": [
   {
    "word": "طَيِّبَةً",
    "gloss": "good (fem.)"
   },
   {
    "word": "طَيِّبِينَ",
    "gloss": "good/pure (pl.)"
   },
   {
    "word": "طَابَ",
    "gloss": "it was good/pleasing"
   }
  ],
  "verse": {
   "ref": "8:69",
   "surah": "Sūrat Al-Anfaal",
   "text": "فَكُلُوا۟ مِمَّا غَنِمْتُمْ حَلَٰلًۭا طَيِّبًۭا ۚ وَٱتَّقُوا۟ ٱللَّهَ ۚ إِنَّ ٱللَّهَ غَفُورٌۭ رَّحِيمٌۭ"
  }
 },
 {
  "id": "khbth",
  "n": 141,
  "set": 3,
  "kind": "root",
  "root": "خبث",
  "translit": "ḫ-b-ṯ",
  "gloss": "impure, wicked",
  "count": 16,
  "headword": "ٱلْخَبِيثَ",
  "headwordGloss": "the foul/impure",
  "family": [
   {
    "word": "ٱلْخَبِيثُونَ",
    "gloss": "foul/impure (masc. pl.)"
   },
   {
    "word": "خَبِيثٌ",
    "gloss": "foul/impure"
   },
   {
    "word": "خَبِيثَةٍ",
    "gloss": "foul/impure (fem.)"
   }
  ],
  "verse": {
   "ref": "5:100",
   "surah": "Sūrat Al-Maaida",
   "text": "قُل لَّا يَسْتَوِى ٱلْخَبِيثُ وَٱلطَّيِّبُ وَلَوْ أَعْجَبَكَ كَثْرَةُ ٱلْخَبِيثِ ۚ فَٱتَّقُوا۟ ٱللَّهَ يَٰٓأُو۟لِى ٱلْأَلْبَٰبِ لَعَلَّكُمْ تُفْلِحُونَ"
  }
 },
 {
  "id": "khld",
  "n": 142,
  "set": 3,
  "kind": "root",
  "root": "خلد",
  "translit": "ḫ-l-d",
  "gloss": "abiding forever",
  "count": 87,
  "headword": "خَٰلِدِينَ",
  "headwordGloss": "abiding forever",
  "family": [
   {
    "word": "مُخَلَّدُونَ",
    "gloss": "made immortal; ever-young"
   },
   {
    "word": "خُلْدٍ",
    "gloss": "immortality; everlastingness"
   },
   {
    "word": "ٱلْخُلْدِ",
    "gloss": "the everlasting (life/abode)"
   }
  ],
  "verse": {
   "ref": "18:108",
   "surah": "Sūrat Al-Kahf",
   "text": "خَٰلِدِينَ فِيهَا لَا يَبْغُونَ عَنْهَا حِوَلًۭا"
  }
 },
 {
  "id": "brr",
  "n": 143,
  "set": 3,
  "kind": "root",
  "root": "برر",
  "translit": "b-r-r",
  "gloss": "land, goodness, righteousness",
  "count": 71,
  "headword": "ٱلْبِرَّ",
  "headwordGloss": "righteousness",
  "family": [
   {
    "word": "ٱلْبِرَّ",
    "gloss": "righteousness"
   },
   {
    "word": "ٱلْأَبْرَارِ",
    "gloss": "the righteous"
   },
   {
    "word": "بَرَرَةٍ",
    "gloss": "noble ones"
   },
   {
    "word": "بَرًّا",
    "gloss": "dutiful"
   }
  ],
  "verse": {
   "ref": "85:1",
   "surah": "Sūrat Al-Burooj",
   "text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ وَٱلسَّمَآءِ ذَاتِ ٱلْبُرُوجِ"
  }
 },
 {
  "id": "mal",
  "n": 144,
  "set": 3,
  "kind": "root",
  "root": "مول",
  "translit": "m-w-l",
  "gloss": "wealth, property",
  "count": 86,
  "headword": "مَالٍ",
  "headwordGloss": "wealth",
  "family": [
   {
    "word": "ٱلْمَالُ",
    "gloss": "the wealth"
   },
   {
    "word": "أَمْوَٰلِهِمْ",
    "gloss": "their wealth"
   },
   {
    "word": "أَمْوَٰلَكُمْ",
    "gloss": "your wealth"
   },
   {
    "word": "أَمْوَٰلًا",
    "gloss": "wealth (pl., acc.)"
   },
   {
    "word": "مَالِىَ",
    "gloss": "my wealth"
   }
  ],
  "verse": {
   "ref": "68:14",
   "surah": "Sūrat Al-Qalam",
   "text": "أَن كَانَ ذَا مَالٍۢ وَبَنِينَ"
  }
 },
 {
  "id": "njw",
  "n": 145,
  "set": 3,
  "kind": "root",
  "root": "نجو",
  "translit": "n-j-w",
  "gloss": "deliverance, being saved",
  "count": 84,
  "headword": "نَجَّيْنَا",
  "headwordGloss": "We saved",
  "family": [
   {
    "word": "نَجِّـنِى",
    "gloss": "save me"
   },
   {
    "word": "يُنَجِّى",
    "gloss": "He saves"
   },
   {
    "word": "نَجَوْا۟",
    "gloss": "they escaped"
   },
   {
    "word": "نَجْوَىٰ",
    "gloss": "secret counsel"
   }
  ],
  "verse": {
   "ref": "26:65",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "وَأَنجَيْنَا مُوسَىٰ وَمَن مَّعَهُۥٓ أَجْمَعِينَ"
  }
 },
 {
  "id": "ʿqb",
  "n": 146,
  "set": 3,
  "kind": "root",
  "root": "عقب",
  "translit": "ʿ-q-b",
  "gloss": "consequence, the end of a matter",
  "count": 80,
  "headword": "عُقْبَىٰ",
  "headwordGloss": "good end; final abode",
  "family": [
   {
    "word": "يُعَقِّبُ",
    "gloss": "he follows up"
   },
   {
    "word": "عِقَابٌ",
    "gloss": "punishment"
   }
  ],
  "verse": {
   "ref": "13:24",
   "surah": "Sūrat Ar-Ra'd",
   "text": "سَلَٰمٌ عَلَيْكُم بِمَا صَبَرْتُمْ ۚ فَنِعْمَ عُقْبَى ٱلدَّارِ"
  }
 },
 {
  "id": "mwt",
  "n": 147,
  "set": 3,
  "kind": "root",
  "root": "موت",
  "translit": "m-w-t",
  "gloss": "death",
  "count": 165,
  "headword": "ٱلْمَوْتُ",
  "headwordGloss": "death",
  "family": [
   {
    "word": "مَاتَ",
    "gloss": "he died"
   },
   {
    "word": "يَمُوتُ",
    "gloss": "he dies"
   },
   {
    "word": "مَيِّتٌ",
    "gloss": "dead (person/thing)"
   },
   {
    "word": "مَيِّتُونَ",
    "gloss": "dead (pl. masc.)"
   }
  ],
  "verse": {
   "ref": "75:40",
   "surah": "Sūrat Al-Qiyaama",
   "text": "أَلَيْسَ ذَٰلِكَ بِقَٰدِرٍ عَلَىٰٓ أَن يُحْۦِىَ ٱلْمَوْتَىٰ"
  }
 },
 {
  "id": "ba3th",
  "n": 148,
  "set": 3,
  "kind": "root",
  "root": "بعث",
  "translit": "b-ʿ-ṯ",
  "gloss": "resurrection, send forth",
  "count": 67,
  "headword": "بَعَثْنَا",
  "headwordGloss": "We raised/sent",
  "family": [
   {
    "word": "بَعَثَ",
    "gloss": "he raised/sent"
   },
   {
    "word": "يَبْعَثُ",
    "gloss": "He raises/sends"
   },
   {
    "word": "يُبْعَثُونَ",
    "gloss": "they will be raised"
   },
   {
    "word": "ٱلْبَعْثِ",
    "gloss": "the resurrection"
   }
  ],
  "verse": {
   "ref": "25:51",
   "surah": "Sūrat Al-Furqaan",
   "text": "وَلَوْ شِئْنَا لَبَعَثْنَا فِى كُلِّ قَرْيَةٍۢ نَّذِيرًۭا"
  }
 },
 {
  "id": "ʿrd",
  "n": 149,
  "set": 3,
  "kind": "root",
  "root": "عرض",
  "translit": "ʿ-r-ḍ",
  "gloss": "presenting, and turning aside",
  "count": 79,
  "headword": "مُعْرِضُونَ",
  "headwordGloss": "turning away",
  "family": [
   {
    "word": "عَرَضْنَا",
    "gloss": "We presented"
   },
   {
    "word": "عَرَضَ",
    "gloss": "he presented"
   },
   {
    "word": "تُعْرِضُونَ",
    "gloss": "you turn away"
   },
   {
    "word": "أَعْرَضَ",
    "gloss": "he turned away"
   },
   {
    "word": "عَرْضًا",
    "gloss": "a presentation / عرض"
   },
   {
    "word": "عَرَضُ ٱلدُّنْيَا",
    "gloss": "worldly gain"
   }
  ],
  "verse": {
   "ref": "38:68",
   "surah": "Sūrat Saad",
   "text": "أَنتُمْ عَنْهُ مُعْرِضُونَ"
  }
 },
 {
  "id": "wr",
  "n": 150,
  "set": 3,
  "kind": "root",
  "root": "صور",
  "translit": "ṣ-w-r",
  "gloss": "form, shape",
  "count": 42,
  "headword": "ٱلصُّورِ",
  "headwordGloss": "the Trumpet",
  "family": [
   {
    "word": "ٱلصُّورِ",
    "gloss": "the Trumpet"
   },
   {
    "word": "صَوَّرَ",
    "gloss": "he shaped"
   },
   {
    "word": "صُوَرَكُمْ",
    "gloss": "your forms"
   },
   {
    "word": "ٱلْمُصَوِّرُ",
    "gloss": "the Fashioner"
   },
   {
    "word": "وَصَوَّرَكُمْ",
    "gloss": "and He shaped you"
   }
  ],
  "verse": {
   "ref": "69:13",
   "surah": "Sūrat Al-Haaqqa",
   "text": "فَإِذَا نُفِخَ فِى ٱلصُّورِ نَفْخَةٌۭ وَٰحِدَةٌۭ"
  }
 },
 {
  "id": "jsd",
  "n": 151,
  "set": 3,
  "kind": "root",
  "root": "جسد",
  "translit": "j-s-d",
  "gloss": "body",
  "count": 4,
  "headword": "جَسَدًا",
  "headwordGloss": "a body",
  "family": [
   {
    "word": "جَسَدًا",
    "gloss": "a body"
   }
  ],
  "verse": {
   "ref": "21:8",
   "surah": "Sūrat Al-Anbiyaa",
   "text": "وَمَا جَعَلْنَٰهُمْ جَسَدًۭا لَّا يَأْكُلُونَ ٱلطَّعَامَ وَمَا كَانُوا۟ خَٰلِدِينَ"
  }
 },
 {
  "id": "blgh",
  "n": 152,
  "set": 3,
  "kind": "root",
  "root": "بلغ",
  "translit": "b-l-ġ",
  "gloss": "reaching, conveying",
  "count": 77,
  "headword": "بَلَٰغٌ",
  "headwordGloss": "a conveyance",
  "family": [
   {
    "word": "بَلَّغْتُ",
    "gloss": "I conveyed"
   },
   {
    "word": "يُبَلِّغُ",
    "gloss": "he conveys"
   },
   {
    "word": "أُبَلِّغُكُمْ",
    "gloss": "I convey to you"
   },
   {
    "word": "بَلَغُوا۟",
    "gloss": "they reached"
   },
   {
    "word": "بَالِغٌ",
    "gloss": "reaching / attaining"
   }
  ],
  "verse": {
   "ref": "75:26",
   "surah": "Sūrat Al-Qiyaama",
   "text": "كَلَّآ إِذَا بَلَغَتِ ٱلتَّرَاقِىَ"
  }
 },
 {
  "id": "qll",
  "n": 153,
  "set": 3,
  "kind": "root",
  "root": "قلل",
  "translit": "q-l-l",
  "gloss": "fewness",
  "count": 76,
  "headword": "قَلِيلٌ",
  "headwordGloss": "few/little",
  "family": [
   {
    "word": "قَلِيلًا",
    "gloss": "a little (adv./acc.)"
   },
   {
    "word": "أَقَلُّ",
    "gloss": "less"
   },
   {
    "word": "قَلَّ",
    "gloss": "it became few"
   },
   {
    "word": "يَقِلُّ",
    "gloss": "it becomes few"
   },
   {
    "word": "قَلِيلُونَ",
    "gloss": "few (pl.)"
   }
  ],
  "verse": {
   "ref": "56:14",
   "surah": "Sūrat Al-Waaqia",
   "text": "وَقَلِيلٌۭ مِّنَ ٱلْءَاخِرِينَ"
  }
 },
 {
  "id": "klm",
  "n": 154,
  "set": 3,
  "kind": "root",
  "root": "كلم",
  "translit": "k-l-m",
  "gloss": "word, speech",
  "count": 75,
  "headword": "كَلِمَٰتِ",
  "headwordGloss": "words",
  "family": [
   {
    "word": "كَلِمَةٌ",
    "gloss": "a word"
   },
   {
    "word": "تَكْلِيمًا",
    "gloss": "speaking (directly)"
   },
   {
    "word": "كَلَّمَ",
    "gloss": "he spoke"
   },
   {
    "word": "يُكَلِّمُ",
    "gloss": "he speaks"
   }
  ],
  "verse": {
   "ref": "37:171",
   "surah": "Sūrat As-Saaffaat",
   "text": "وَلَقَدْ سَبَقَتْ كَلِمَتُنَا لِعِبَادِنَا ٱلْمُرْسَلِينَ"
  }
 },
 {
  "id": "sdr",
  "n": 155,
  "set": 3,
  "kind": "root",
  "root": "صدر",
  "translit": "ṣ-d-r",
  "gloss": "chest, inner self",
  "count": 46,
  "headword": "صُدُورِهِمْ",
  "headwordGloss": "their chests",
  "family": [
   {
    "word": "صَدْرٌ",
    "gloss": "chest"
   },
   {
    "word": "صُدُورٌ",
    "gloss": "chests"
   },
   {
    "word": "صَدْرَهُ",
    "gloss": "his chest"
   },
   {
    "word": "يَصْدُرُ",
    "gloss": "he/it departs"
   }
  ],
  "verse": {
   "ref": "28:69",
   "surah": "Sūrat Al-Qasas",
   "text": "وَرَبُّكَ يَعْلَمُ مَا تُكِنُّ صُدُورُهُمْ وَمَا يُعْلِنُونَ"
  }
 },
 {
  "id": "bytt",
  "n": 156,
  "set": 3,
  "kind": "root",
  "root": "بيت",
  "translit": "b-y-t",
  "gloss": "house",
  "count": 73,
  "headword": "ٱلْبَيْتِ",
  "headwordGloss": "the House",
  "family": [
   {
    "word": "بَيْتٍ",
    "gloss": "a house"
   },
   {
    "word": "بُيُوتٍ",
    "gloss": "houses"
   },
   {
    "word": "بُيُوتَكُمْ",
    "gloss": "your houses"
   },
   {
    "word": "بَيْتَكَ",
    "gloss": "your house"
   },
   {
    "word": "بُيُوتِهِمْ",
    "gloss": "their houses"
   }
  ],
  "verse": {
   "ref": "106:3",
   "surah": "Sūrat Quraish",
   "text": "فَلْيَعْبُدُوا۟ رَبَّ هَٰذَا ٱلْبَيْتِ"
  }
 },
 {
  "id": "ghny",
  "n": 157,
  "set": 3,
  "kind": "root",
  "root": "غني",
  "translit": "ġ-n-y",
  "gloss": "wealth, needing nothing",
  "count": 73,
  "headword": "ٱلْغَنِىُّ",
  "headwordGloss": "the Self-Sufficient",
  "family": [
   {
    "word": "غَنِيٌّ",
    "gloss": "rich / self-sufficient"
   },
   {
    "word": "أَغْنِيَآءَ",
    "gloss": "the rich (pl.)"
   },
   {
    "word": "يُغْنِى",
    "gloss": "avails / suffices"
   }
  ],
  "verse": {
   "ref": "31:26",
   "surah": "Sūrat Luqman",
   "text": "لِلَّهِ مَا فِى ٱلسَّمَٰوَٰتِ وَٱلْأَرْضِ ۚ إِنَّ ٱللَّهَ هُوَ ٱلْغَنِىُّ ٱلْحَمِيدُ"
  }
 },
 {
  "id": "rjl",
  "n": 158,
  "set": 3,
  "kind": "root",
  "root": "رجل",
  "translit": "r-j-l",
  "gloss": "leg, foot, man",
  "count": 72,
  "headword": "رِجَالٌ",
  "headwordGloss": "men",
  "family": [
   {
    "word": "رَجُلٌ",
    "gloss": "a man"
   },
   {
    "word": "رَجُلًا",
    "gloss": "a man (obj.)"
   },
   {
    "word": "رِجَالًا",
    "gloss": "men (obj.)"
   },
   {
    "word": "أَرْجُلَكُمْ",
    "gloss": "your feet"
   },
   {
    "word": "رَجِلِكَ",
    "gloss": "your foot (lit. your leg/foot)"
   }
  ],
  "verse": {
   "ref": "38:62",
   "surah": "Sūrat Saad",
   "text": "وَقَالُوا۟ مَا لَنَا لَا نَرَىٰ رِجَالًۭا كُنَّا نَعُدُّهُم مِّنَ ٱلْأَشْرَارِ"
  }
 },
 {
  "id": "frq",
  "n": 159,
  "set": 3,
  "kind": "root",
  "root": "فرق",
  "translit": "f-r-q",
  "gloss": "separating, distinguishing",
  "count": 72,
  "headword": "ٱلْفُرْقَانِ",
  "headwordGloss": "the Criterion",
  "family": [
   {
    "word": "فَرَقْنَا",
    "gloss": "We parted"
   },
   {
    "word": "يَفْرُقُ",
    "gloss": "he separates"
   },
   {
    "word": "فَرِيقٌ",
    "gloss": "a party; group"
   },
   {
    "word": "فِرْقَةٌ",
    "gloss": "a sect"
   }
  ],
  "verse": {
   "ref": "2:53",
   "surah": "Sūrat Al-Baqara",
   "text": "وَإِذْ ءَاتَيْنَا مُوسَى ٱلْكِتَٰبَ وَٱلْفُرْقَانَ لَعَلَّكُمْ تَهْتَدُونَ"
  }
 },
 {
  "id": "yumn",
  "n": 160,
  "set": 3,
  "kind": "root",
  "root": "يمن",
  "translit": "y-m-n",
  "gloss": "the right hand, an oath",
  "count": 71,
  "headword": "ٱلْيَمِينِ",
  "headwordGloss": "the right (hand/side)",
  "family": [
   {
    "word": "بِيَمِينِهِۦ",
    "gloss": "in his right hand"
   },
   {
    "word": "يَمِينٌ",
    "gloss": "an oath / right hand"
   },
   {
    "word": "ٱلْأَيْمَٰنَ",
    "gloss": "the oaths"
   },
   {
    "word": "أَصْحَٰبُ ٱلْيَمِينِ",
    "gloss": "companions of the right"
   },
   {
    "word": "مَيْمَنَةٍ",
    "gloss": "right side"
   }
  ],
  "verse": {
   "ref": "74:39",
   "surah": "Sūrat Al-Muddaththir",
   "text": "إِلَّآ أَصْحَٰبَ ٱلْيَمِينِ"
  }
 },
 {
  "id": "adhn",
  "n": 161,
  "set": 3,
  "kind": "root",
  "root": "أذن",
  "translit": "ʾ-ḏ-n",
  "gloss": "ear",
  "count": 102,
  "headword": "أَذِنَ",
  "headwordGloss": "he gave ear",
  "family": [
   {
    "word": "ءَاذَانٌ",
    "gloss": "ears"
   },
   {
    "word": "أَذَانٌ",
    "gloss": "announcement/call"
   },
   {
    "word": "يَأْذَنُ",
    "gloss": "he permits"
   },
   {
    "word": "أَذِنَتْ",
    "gloss": "it listened"
   }
  ],
  "verse": {
   "ref": "84:2",
   "surah": "Sūrat Al-Inshiqaaq",
   "text": "وَأَذِنَتْ لِرَبِّهَا وَحُقَّتْ"
  }
 },
 {
  "id": "fwh",
  "n": 162,
  "set": 3,
  "kind": "root",
  "root": "فوه",
  "translit": "f-w-h",
  "gloss": "mouth",
  "count": 17,
  "headword": "أَفْوَٰهِهِمْ",
  "headwordGloss": "their mouths",
  "family": [
   {
    "word": "أَفْوَٰهِهِمْ",
    "gloss": "their mouths"
   },
   {
    "word": "أَفْوَٰهِكُم",
    "gloss": "your mouths"
   },
   {
    "word": "بِأَفْوَٰهِهِم",
    "gloss": "with their mouths"
   }
  ],
  "verse": {
   "ref": "61:8",
   "surah": "Sūrat As-Saff",
   "text": "يُرِيدُونَ لِيُطْفِـُٔوا۟ نُورَ ٱللَّهِ بِأَفْوَٰهِهِمْ وَٱللَّهُ مُتِمُّ نُورِهِۦ وَلَوْ كَرِهَ ٱلْكَٰفِرُونَ"
  }
 },
 {
  "id": "ras",
  "n": 163,
  "set": 3,
  "kind": "root",
  "root": "رأس",
  "translit": "r-ʾ-s",
  "gloss": "head",
  "count": 18,
  "headword": "رَأْسِهِ",
  "headwordGloss": "his head",
  "family": [
   {
    "word": "رَأْسٌ",
    "gloss": "a head"
   },
   {
    "word": "رُءُوسٌ",
    "gloss": "heads"
   },
   {
    "word": "رُءُوسِكُمْ",
    "gloss": "your heads"
   },
   {
    "word": "رُءُوسِهِمْ",
    "gloss": "their heads"
   },
   {
    "word": "رَأْسِى",
    "gloss": "my head"
   }
  ],
  "verse": {
   "ref": "44:48",
   "surah": "Sūrat Ad-Dukhaan",
   "text": "ثُمَّ صُبُّوا۟ فَوْقَ رَأْسِهِۦ مِنْ عَذَابِ ٱلْحَمِيمِ"
  }
 },
 {
  "id": "r",
  "n": 164,
  "set": 3,
  "kind": "root",
  "root": "شعر",
  "translit": "š-ʿ-r",
  "gloss": "hair, perceive",
  "count": 33,
  "headword": "يَشْعُرُونَ",
  "headwordGloss": "they perceive",
  "family": [
   {
    "word": "يَشْعُرُونَ",
    "gloss": "they perceive"
   },
   {
    "word": "تَشْعُرُونَ",
    "gloss": "you perceive"
   },
   {
    "word": "شَعَآئِرَ",
    "gloss": "the rites"
   },
   {
    "word": "شَاعِرٌ",
    "gloss": "a poet"
   },
   {
    "word": "ٱلشِّعْرَ",
    "gloss": "poetry"
   }
  ],
  "verse": {
   "ref": "26:202",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "فَيَأْتِيَهُم بَغْتَةًۭ وَهُمْ لَا يَشْعُرُونَ"
  }
 },
 {
  "id": "ʿrf",
  "n": 165,
  "set": 3,
  "kind": "root",
  "root": "عرف",
  "translit": "ʿ-r-f",
  "gloss": "knowing, recognition",
  "count": 70,
  "headword": "يَعْلَمُونَ",
  "headwordGloss": "they know",
  "family": [
   {
    "word": "عَرَفُوا۟",
    "gloss": "they recognised"
   },
   {
    "word": "تَعْرِفُ",
    "gloss": "you recognise"
   },
   {
    "word": "يَعْرِفُونَ",
    "gloss": "they recognise"
   },
   {
    "word": "مَعْرُوفٌ",
    "gloss": "known/proper (good)"
   },
   {
    "word": "ٱلْأَعْرَافِ",
    "gloss": "the Heights (al-Aʿrāf)"
   },
   {
    "word": "عِرْفًا",
    "gloss": "in succession (one after another)"
   }
  ],
  "verse": {
   "ref": "78:5",
   "surah": "Sūrat An-Naba",
   "text": "ثُمَّ كَلَّا سَيَعْلَمُونَ"
  }
 },
 {
  "id": "fd",
  "n": 166,
  "set": 3,
  "kind": "root",
  "root": "فأد",
  "translit": "f-ʾ-d",
  "gloss": "heart, emotion",
  "count": 17,
  "headword": "فُؤَادَكَ",
  "headwordGloss": "your heart",
  "family": [
   {
    "word": "فُؤَادَكَ",
    "gloss": "your heart"
   },
   {
    "word": "أَفْـِٔدَةُ",
    "gloss": "hearts"
   },
   {
    "word": "أَفْـِٔدَتَهُمْ",
    "gloss": "their hearts"
   },
   {
    "word": "وَٱلْأَفْـِٔدَةَ",
    "gloss": "and the hearts"
   }
  ],
  "verse": {
   "ref": "25:32",
   "surah": "Sūrat Al-Furqaan",
   "text": "وَقَالَ ٱلَّذِينَ كَفَرُوا۟ لَوْلَا نُزِّلَ عَلَيْهِ ٱلْقُرْءَانُ جُمْلَةًۭ وَٰحِدَةًۭ ۚ كَذَٰلِكَ لِنُثَبِّتَ بِهِۦ فُؤَادَكَ ۖ وَرَتَّلْنَٰهُ تَرْتِيلًۭا"
  }
 },
 {
  "id": "btn",
  "n": 167,
  "set": 3,
  "kind": "root",
  "root": "بطن",
  "translit": "b-ṭ-n",
  "gloss": "belly, inner part",
  "count": 25,
  "headword": "بُطُونِ",
  "headwordGloss": "bellies",
  "family": [
   {
    "word": "بَطْنِ",
    "gloss": "belly; inside"
   },
   {
    "word": "بَاطِنَهُۥ",
    "gloss": "its inward (part)"
   },
   {
    "word": "بِطَانَةً",
    "gloss": "intimates; inner circle"
   }
  ],
  "verse": {
   "ref": "56:53",
   "surah": "Sūrat Al-Waaqia",
   "text": "فَمَالِـُٔونَ مِنْهَا ٱلْبُطُونَ"
  }
 },
 {
  "id": "zhr",
  "n": 168,
  "set": 3,
  "kind": "root",
  "root": "ظهر",
  "translit": "ẓ-h-r",
  "gloss": "back, outward",
  "count": 59,
  "headword": "ظَهَرَ",
  "headwordGloss": "became manifest",
  "family": [
   {
    "word": "أَظْهَرَ",
    "gloss": "made manifest / caused to prevail"
   },
   {
    "word": "لِيُظْهِرَهُۥ",
    "gloss": "to make it prevail"
   },
   {
    "word": "ٱلظَّٰهِرُ",
    "gloss": "the Manifest/Outward"
   },
   {
    "word": "ظُهُورِهِمْ",
    "gloss": "their backs"
   }
  ],
  "verse": {
   "ref": "94:3",
   "surah": "Sūrat Ash-Sharh",
   "text": "ٱلَّذِىٓ أَنقَضَ ظَهْرَكَ"
  }
 },
 {
  "id": "ʿlw",
  "n": 169,
  "set": 3,
  "kind": "root",
  "root": "علو",
  "translit": "ʿ-l-w",
  "gloss": "height, exaltation",
  "count": 70,
  "headword": "ٱلْعَلِيُّ",
  "headwordGloss": "the Most High",
  "family": [
   {
    "word": "ٱلْعَظِيمُ",
    "gloss": "the Tremendous"
   },
   {
    "word": "تَعَالَىٰ",
    "gloss": "Exalted is He"
   },
   {
    "word": "عَالٍ",
    "gloss": "high/lofty"
   },
   {
    "word": "عَلَوْا۟",
    "gloss": "they rose/acted arrogantly"
   },
   {
    "word": "عُلُوًّا",
    "gloss": "arrogance/exaltation"
   }
  ],
  "verse": {
   "ref": "26:220",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "إِنَّهُۥ هُوَ ٱلسَّمِيعُ ٱلْعَلِيمُ"
  }
 },
 {
  "id": "lbb",
  "n": 170,
  "set": 3,
  "kind": "root",
  "root": "لبب",
  "translit": "l-b-b",
  "gloss": "core, intellect",
  "count": 25,
  "headword": "ٱلْأَلْبَٰبِ",
  "headwordGloss": "the understanding minds",
  "family": [
   {
    "word": "ٱلْأَلْبَٰبِ",
    "gloss": "the understanding minds"
   },
   {
    "word": "أُو۟لِى ٱلْأَلْبَٰبِ",
    "gloss": "people of understanding"
   }
  ],
  "verse": {
   "ref": "40:54",
   "surah": "Sūrat Ghafir",
   "text": "هُدًۭى وَذِكْرَىٰ لِأُو۟لِى ٱلْأَلْبَٰبِ"
  }
 },
 {
  "id": "rr3",
  "n": 171,
  "set": 3,
  "kind": "root",
  "root": "ذرر",
  "translit": "ḏ-r-r",
  "gloss": "offspring, progeny",
  "count": 62,
  "headword": "ذُرِّيَّةٌ",
  "headwordGloss": "offspring",
  "family": [
   {
    "word": "ذُرِّيَّةٌ",
    "gloss": "offspring"
   },
   {
    "word": "ذُرِّيَّتِهِۦ",
    "gloss": "his offspring"
   },
   {
    "word": "ذَرَّةٍ",
    "gloss": "an atom's weight"
   },
   {
    "word": "ذُرِّيَّتَهُمْ",
    "gloss": "their offspring"
   }
  ],
  "verse": {
   "ref": "3:34",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "ذُرِّيَّةًۢ بَعْضُهَا مِنۢ بَعْضٍۢ ۗ وَٱللَّهُ سَمِيعٌ عَلِيمٌ"
  }
 },
 {
  "id": "abw",
  "n": 172,
  "set": 3,
  "kind": "root",
  "root": "أبو",
  "translit": "ʾ-b-w",
  "gloss": "father",
  "count": 117,
  "headword": "أَبِيهِ",
  "headwordGloss": "his father",
  "family": [
   {
    "word": "أَبٌ",
    "gloss": "a father"
   },
   {
    "word": "أَبَآءَكُمْ",
    "gloss": "your fathers/forefathers"
   },
   {
    "word": "أَبَوَيْهِ",
    "gloss": "his parents"
   },
   {
    "word": "آبَائِهِمْ",
    "gloss": "their fathers/forefathers"
   },
   {
    "word": "أَبُونَا",
    "gloss": "our father"
   }
  ],
  "verse": {
   "ref": "69:26",
   "surah": "Sūrat Al-Haaqqa",
   "text": "وَلَمْ أَدْرِ مَا حِسَابِيَهْ"
  }
 },
 {
  "id": "amm",
  "n": 173,
  "set": 3,
  "kind": "root",
  "root": "أمم",
  "translit": "ʾ-m-m",
  "gloss": "mother, nation, community",
  "count": 119,
  "headword": "أُمَّةً",
  "headwordGloss": "a community",
  "family": [
   {
    "word": "أُمِّ",
    "gloss": "mother of (in iḍāfa)"
   },
   {
    "word": "أُمَّهَٰتِ",
    "gloss": "mothers (pl.)"
   },
   {
    "word": "أُمِّيٌّ",
    "gloss": "unlettered; unscriptured"
   },
   {
    "word": "أُمِّيُّونَ",
    "gloss": "unlettered people (pl.)"
   },
   {
    "word": "إِمَامًا",
    "gloss": "a leader; an imam"
   },
   {
    "word": "إِمَامٍ",
    "gloss": "leader; register (by context)"
   }
  ],
  "verse": {
   "ref": "75:2",
   "surah": "Sūrat Al-Qiyaama",
   "text": "وَلَآ أُقْسِمُ بِٱلنَّفْسِ ٱللَّوَّامَةِ"
  }
 },
 {
  "id": "bny",
  "n": 174,
  "set": 3,
  "kind": "root",
  "root": "بني",
  "translit": "b-n-y",
  "gloss": "son, daughter",
  "count": 184,
  "headword": "بَنِىٓ",
  "headwordGloss": "sons/children of",
  "family": [
   {
    "word": "بَنِىٓ إِسْرَٰٓءِيلَ",
    "gloss": "Children of Israel"
   },
   {
    "word": "ٱبْنِ",
    "gloss": "son of (in iḍāfa)"
   },
   {
    "word": "ٱبْنُ",
    "gloss": "a son"
   },
   {
    "word": "ٱبْنَتُ",
    "gloss": "daughter"
   },
   {
    "word": "بَنَيْنَا",
    "gloss": "We built"
   }
  ],
  "verse": {
   "ref": "91:5",
   "surah": "Sūrat Ash-Shams",
   "text": "وَٱلسَّمَآءِ وَمَا بَنَىٰهَا"
  }
 },
 {
  "id": "ahd",
  "n": 175,
  "set": 3,
  "kind": "root",
  "root": "وحد",
  "translit": "w-ḥ-d",
  "gloss": "oneness, unity",
  "count": 68,
  "headword": "وَٰحِدٌ",
  "headwordGloss": "one",
  "family": [
   {
    "word": "وَٰحِدَةٌ",
    "gloss": "one (f.)"
   },
   {
    "word": "أَحَدٌ",
    "gloss": "one/anyone; the One"
   },
   {
    "word": "ٱلْوَٰحِدُ",
    "gloss": "the One"
   },
   {
    "word": "وَحْدَهُۥ",
    "gloss": "alone"
   }
  ],
  "verse": {
   "ref": "37:4",
   "surah": "Sūrat As-Saaffaat",
   "text": "إِنَّ إِلَٰهَكُمْ لَوَٰحِدٌۭ"
  }
 },
 {
  "id": "akhw",
  "n": 176,
  "set": 3,
  "kind": "root",
  "root": "أخو",
  "translit": "ʾ-ḫ-w",
  "gloss": "brother, sister",
  "count": 96,
  "headword": "إِخْوَةٌ",
  "headwordGloss": "brothers",
  "family": [
   {
    "word": "أَخُوكَ",
    "gloss": "your brother"
   },
   {
    "word": "أَخِيهِ",
    "gloss": "his brother"
   },
   {
    "word": "أَخَا",
    "gloss": "brother of (dual/acc.)"
   },
   {
    "word": "أُخْتٌ",
    "gloss": "sister"
   }
  ],
  "verse": {
   "ref": "26:106",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "إِذْ قَالَ لَهُمْ أَخُوهُمْ نُوحٌ أَلَا تَتَّقُونَ"
  }
 },
 {
  "id": "hlk",
  "n": 177,
  "set": 3,
  "kind": "root",
  "root": "هلك",
  "translit": "h-l-k",
  "gloss": "destruction, perishing",
  "count": 68,
  "headword": "هَلَكَ",
  "headwordGloss": "he perished",
  "family": [
   {
    "word": "ٱهْلِكْنَا",
    "gloss": "We destroyed"
   },
   {
    "word": "لِيُهْلِكَ",
    "gloss": "to destroy"
   },
   {
    "word": "هَالِكٌ",
    "gloss": "perishing; doomed"
   },
   {
    "word": "مُهْلِكُ",
    "gloss": "destroyer"
   },
   {
    "word": "مَهْلِكِ",
    "gloss": "place/time of destruction"
   }
  ],
  "verse": {
   "ref": "69:29",
   "surah": "Sūrat Al-Haaqqa",
   "text": "هَلَكَ عَنِّى سُلْطَٰنِيَهْ"
  }
 },
 {
  "id": "zwj",
  "n": 178,
  "set": 3,
  "kind": "root",
  "root": "زوج",
  "translit": "z-w-j",
  "gloss": "spouse, pair",
  "count": 81,
  "headword": "أَزْوَٰجٌ",
  "headwordGloss": "spouses; pairs",
  "family": [
   {
    "word": "زَوْجٌ",
    "gloss": "a spouse; a pair"
   },
   {
    "word": "زَوْجَهَا",
    "gloss": "her husband"
   },
   {
    "word": "زَوْجَهُ",
    "gloss": "his wife"
   },
   {
    "word": "زَوْجَيْنِ",
    "gloss": "two pairs"
   }
  ],
  "verse": {
   "ref": "78:8",
   "surah": "Sūrat An-Naba",
   "text": "وَخَلَقْنَٰكُمْ أَزْوَٰجًۭا"
  }
 },
 {
  "id": "ksb",
  "n": 179,
  "set": 3,
  "kind": "root",
  "root": "كسب",
  "translit": "k-s-b",
  "gloss": "earning what you have done",
  "count": 67,
  "headword": "يَكْسِبُونَ",
  "headwordGloss": "they earn",
  "family": [
   {
    "word": "كَسَبَ",
    "gloss": "he earned"
   },
   {
    "word": "كَسَبْتُمْ",
    "gloss": "you earned"
   },
   {
    "word": "ٱكْتَسَبَتْ",
    "gloss": "it (a soul) earned"
   },
   {
    "word": "ٱكْتَسَبُوا۟",
    "gloss": "they earned"
   }
  ],
  "verse": {
   "ref": "15:84",
   "surah": "Sūrat Al-Hijr",
   "text": "فَمَآ أَغْنَىٰ عَنْهُم مَّا كَانُوا۟ يَكْسِبُونَ"
  }
 },
 {
  "id": "hml",
  "n": 180,
  "set": 3,
  "kind": "root",
  "root": "حمل",
  "translit": "ḥ-m-l",
  "gloss": "carrying, bearing a burden",
  "count": 64,
  "headword": "يَحْمِلُونَ",
  "headwordGloss": "they carry",
  "family": [
   {
    "word": "حَمَلَ",
    "gloss": "he carried"
   },
   {
    "word": "تَحْمِلُ",
    "gloss": "she carries"
   },
   {
    "word": "حَمْلًا",
    "gloss": "a الحمل (load/pregnancy)"
   },
   {
    "word": "حِمْلٌ",
    "gloss": "a load"
   },
   {
    "word": "حَمَّالَةَ",
    "gloss": "carrier (f.)"
   }
  ],
  "verse": {
   "ref": "6:31",
   "surah": "Sūrat Al-An'aam",
   "text": "قَدْ خَسِرَ ٱلَّذِينَ كَذَّبُوا۟ بِلِقَآءِ ٱللَّهِ ۖ حَتَّىٰٓ إِذَا جَآءَتْهُمُ ٱلسَّاعَةُ بَغْتَةًۭ قَالُوا۟ يَٰحَسْرَتَنَا عَلَىٰ مَا فَرَّطْنَا فِيهَا وَهُمْ يَحْمِلُونَ أَوْزَارَهُمْ عَلَىٰ ظُهُورِهِمْ ۚ أَلَا سَآءَ مَا يَزِرُونَ"
  }
 },
 {
  "id": "tlw",
  "n": 181,
  "set": 4,
  "kind": "root",
  "root": "تلو",
  "translit": "t-l-w",
  "gloss": "reciting, following after",
  "count": 63,
  "headword": "يَتْلُونَ",
  "headwordGloss": "they recite",
  "family": [
   {
    "word": "يَتْلُوا۟",
    "gloss": "he/they recite"
   },
   {
    "word": "ٱتْلُ",
    "gloss": "recite!"
   },
   {
    "word": "تَلَوْتُ",
    "gloss": "I recited"
   },
   {
    "word": "تَتْلُوا۟",
    "gloss": "you/they recite"
   },
   {
    "word": "تِلَاوَتِهِۦ",
    "gloss": "its recitation"
   }
  ],
  "verse": {
   "ref": "3:113",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "۞ لَيْسُوا۟ سَوَآءًۭ ۗ مِّنْ أَهْلِ ٱلْكِتَٰبِ أُمَّةٌۭ قَآئِمَةٌۭ يَتْلُونَ ءَايَٰتِ ٱللَّهِ ءَانَآءَ ٱلَّيْلِ وَهُمْ يَسْجُدُونَ"
  }
 },
 {
  "id": "dhwq",
  "n": 182,
  "set": 4,
  "kind": "root",
  "root": "ذوق",
  "translit": "ḏ-w-q",
  "gloss": "tasting",
  "count": 63,
  "headword": "يَذُوقُونَ",
  "headwordGloss": "they taste",
  "family": [
   {
    "word": "ذُوقُوا",
    "gloss": "taste! (pl.)"
   },
   {
    "word": "ذُقْ",
    "gloss": "taste! (sg.)"
   },
   {
    "word": "ذَاقُوا",
    "gloss": "they tasted"
   },
   {
    "word": "تَذُوقُوا",
    "gloss": "you (pl.) taste"
   },
   {
    "word": "ذَائِقَةُ",
    "gloss": "taster/experiencer (f.)"
   },
   {
    "word": "ذَائِقَةُ ٱلْمَوْتِ",
    "gloss": "tasting death"
   }
  ],
  "verse": {
   "ref": "78:24",
   "surah": "Sūrat An-Naba",
   "text": "لَّا يَذُوقُونَ فِيهَا بَرْدًۭا وَلَا شَرَابًا"
  }
 },
 {
  "id": "shtn",
  "n": 183,
  "set": 4,
  "kind": "root",
  "root": "شطن",
  "translit": "š-ṭ-n",
  "gloss": "devil, rebellion",
  "count": 88,
  "headword": "ٱلشَّيْطَٰنِ",
  "headwordGloss": "the Devil",
  "family": [
   {
    "word": "شَيَٰطِينِ",
    "gloss": "devils (pl.)"
   },
   {
    "word": "شَيَٰطِينَهُمْ",
    "gloss": "their devils"
   },
   {
    "word": "شَيْطَٰنًا",
    "gloss": "a devil"
   },
   {
    "word": "شَيَٰطِينُ",
    "gloss": "devils (nom.)"
   }
  ],
  "verse": {
   "ref": "43:62",
   "surah": "Sūrat Az-Zukhruf",
   "text": "وَلَا يَصُدَّنَّكُمُ ٱلشَّيْطَٰنُ ۖ إِنَّهُۥ لَكُمْ عَدُوٌّۭ مُّبِينٌۭ"
  }
 },
 {
  "id": "jnn",
  "n": 184,
  "set": 4,
  "kind": "root",
  "root": "جنن",
  "translit": "j-n-n",
  "gloss": "unseen beings, concealment, garden, paradise",
  "count": 201,
  "headword": "ٱلْجَنَّةِ",
  "headwordGloss": "the Garden",
  "family": [
   {
    "word": "جَنَّٰتٍ",
    "gloss": "gardens"
   },
   {
    "word": "جَنَّٰتِ",
    "gloss": "gardens (gen.)"
   },
   {
    "word": "جِنٍّ",
    "gloss": "jinn"
   },
   {
    "word": "ٱلْجِنِّ",
    "gloss": "the jinn"
   },
   {
    "word": "جُنَّةٌ",
    "gloss": "a covering/shield"
   },
   {
    "word": "مَجْنُونٍ",
    "gloss": "mad/possessed"
   }
  ],
  "verse": {
   "ref": "114:6",
   "surah": "Sūrat An-Naas",
   "text": "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ"
  }
 },
 {
  "id": "subh",
  "n": 185,
  "set": 4,
  "kind": "root",
  "root": "صبح",
  "translit": "ṣ-b-ḥ",
  "gloss": "morning, and becoming",
  "count": 62,
  "headword": "ٱلصُّبْحِ",
  "headwordGloss": "the morning",
  "family": [
   {
    "word": "مُصْبِحِينَ",
    "gloss": "entering morning; at morning-time"
   },
   {
    "word": "أَصْبَحَ",
    "gloss": "he became (in the morning / became)"
   },
   {
    "word": "أَصْبَحُوا۟",
    "gloss": "they became"
   },
   {
    "word": "فَأَصْبَحَ",
    "gloss": "so he became"
   }
  ],
  "verse": {
   "ref": "74:34",
   "surah": "Sūrat Al-Muddaththir",
   "text": "وَٱلصُّبْحِ إِذَآ أَسْفَرَ"
  }
 },
 {
  "id": "zyd",
  "n": 186,
  "set": 4,
  "kind": "root",
  "root": "زيد",
  "translit": "z-y-d",
  "gloss": "increasing, more",
  "count": 61,
  "headword": "زَادَ",
  "headwordGloss": "he increased",
  "family": [
   {
    "word": "يَزِيدُ",
    "gloss": "he increases"
   },
   {
    "word": "زِدْ",
    "gloss": "increase! (add)"
   },
   {
    "word": "زِيَادَةً",
    "gloss": "an increase; extra"
   },
   {
    "word": "مَزِيدٌ",
    "gloss": "more; additional"
   },
   {
    "word": "ٱزْدَادُوا۟",
    "gloss": "they increased"
   }
  ],
  "verse": {
   "ref": "47:17",
   "surah": "Sūrat Muhammad",
   "text": "وَٱلَّذِينَ ٱهْتَدَوْا۟ زَادَهُمْ هُدًۭى وَءَاتَىٰهُمْ تَقْوَىٰهُمْ"
  }
 },
 {
  "id": "zky",
  "n": 187,
  "set": 4,
  "kind": "root",
  "root": "زكو",
  "translit": "z-k-w",
  "gloss": "purify, grow, charity, almsgiving, purification",
  "count": 59,
  "headword": "ٱلزَّكَوٰةَ",
  "headwordGloss": "the alms (zakāh)",
  "family": [
   {
    "word": "زَكَوٰةً",
    "gloss": "purification / alms"
   },
   {
    "word": "يُزَكِّى",
    "gloss": "he purifies"
   },
   {
    "word": "يُزَكِّيهِمْ",
    "gloss": "He purifies them"
   },
   {
    "word": "تَزَكَّىٰ",
    "gloss": "he purifies himself"
   },
   {
    "word": "يَتَزَكَّىٰ",
    "gloss": "he seeks purification"
   },
   {
    "word": "أَزْكَىٰ",
    "gloss": "purer / more wholesome"
   }
  ],
  "verse": {
   "ref": "41:7",
   "surah": "Sūrat Fussilat",
   "text": "ٱلَّذِينَ لَا يُؤْتُونَ ٱلزَّكَوٰةَ وَهُم بِٱلْءَاخِرَةِ هُمْ كَٰفِرُونَ"
  }
 },
 {
  "id": "mss",
  "n": 188,
  "set": 4,
  "kind": "root",
  "root": "مسس",
  "translit": "m-s-s",
  "gloss": "touching, afflicting",
  "count": 61,
  "headword": "مَسَّ",
  "headwordGloss": "touched/afflicted",
  "family": [
   {
    "word": "يَمَسُّ",
    "gloss": "touches/afflicts"
   },
   {
    "word": "مَسَّنِىَ",
    "gloss": "touched/afflicted me"
   },
   {
    "word": "مَسَّنَا",
    "gloss": "touched/afflicted us"
   },
   {
    "word": "مَسَّكُمْ",
    "gloss": "touched/afflicted you"
   },
   {
    "word": "مَسْنُونٍ",
    "gloss": "molded (clay), fashioned"
   }
  ],
  "verse": {
   "ref": "77:8",
   "surah": "Sūrat Al-Mursalaat",
   "text": "فَإِذَا ٱلنُّجُومُ طُمِسَتْ"
  }
 },
 {
  "id": "slw",
  "n": 189,
  "set": 4,
  "kind": "root",
  "root": "صلو",
  "translit": "ṣ-l-w",
  "gloss": "prayer, connection",
  "count": 99,
  "headword": "ٱلصَّلَوٰةِ",
  "headwordGloss": "the prayer",
  "family": [
   {
    "word": "صَلَوٰتٍ",
    "gloss": "prayers / blessings"
   },
   {
    "word": "صَلُّوا۟",
    "gloss": "send blessings / pray!"
   },
   {
    "word": "يُصَلُّونَ",
    "gloss": "they send blessings / pray"
   },
   {
    "word": "صَلَّىٰ",
    "gloss": "he prayed"
   },
   {
    "word": "مُصَلًّى",
    "gloss": "a place of prayer"
   }
  ],
  "verse": {
   "ref": "8:3",
   "surah": "Sūrat Al-Anfaal",
   "text": "ٱلَّذِينَ يُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَٰهُمْ يُنفِقُونَ"
  }
 },
 {
  "id": "ghyb",
  "n": 190,
  "set": 4,
  "kind": "root",
  "root": "غيب",
  "translit": "ġ-y-b",
  "gloss": "the unseen, absence",
  "count": 60,
  "headword": "ٱلْغَيْبِ",
  "headwordGloss": "the unseen",
  "family": [
   {
    "word": "بِٱلْغَيْبِ",
    "gloss": "in the unseen"
   },
   {
    "word": "غَائِبِينَ",
    "gloss": "absent ones"
   },
   {
    "word": "غَائِبٌ",
    "gloss": "absent"
   },
   {
    "word": "عَٰلِمُ ٱلْغَيْبِ",
    "gloss": "Knower of the unseen"
   },
   {
    "word": "عَٰلِمِ ٱلْغَيْبِ",
    "gloss": "Knower of the unseen"
   }
  ],
  "verse": {
   "ref": "81:24",
   "surah": "Sūrat At-Takwir",
   "text": "وَمَا هُوَ عَلَى ٱلْغَيْبِ بِضَنِينٍۢ"
  }
 },
 {
  "id": "hjj",
  "n": 191,
  "set": 4,
  "kind": "root",
  "root": "حجج",
  "translit": "ḥ-j-j",
  "gloss": "pilgrimage",
  "count": 33,
  "headword": "ٱلْحَجِّ",
  "headwordGloss": "the pilgrimage",
  "family": [
   {
    "word": "حَجًّا",
    "gloss": "pilgrimage"
   },
   {
    "word": "حُجَّتُهُمْ",
    "gloss": "their argument"
   },
   {
    "word": "حُجَّةٌ",
    "gloss": "an argument / proof"
   },
   {
    "word": "يُحَاجُّونَ",
    "gloss": "they dispute/argue"
   }
  ],
  "verse": {
   "ref": "15:80",
   "surah": "Sūrat Al-Hijr",
   "text": "وَلَقَدْ كَذَّبَ أَصْحَٰبُ ٱلْحِجْرِ ٱلْمُرْسَلِينَ"
  }
 },
 {
  "id": "swm",
  "n": 192,
  "set": 4,
  "kind": "root",
  "root": "صوم",
  "translit": "ṣ-w-m",
  "gloss": "fasting",
  "count": 14,
  "headword": "ٱلصِّيَامُ",
  "headwordGloss": "the fasting",
  "family": [
   {
    "word": "صِيَامًا",
    "gloss": "fasting (as expiation)"
   },
   {
    "word": "صُمْ",
    "gloss": "fast!"
   },
   {
    "word": "صَوْمًا",
    "gloss": "fasting / abstention"
   }
  ],
  "verse": {
   "ref": "2:183",
   "surah": "Sūrat Al-Baqara",
   "text": "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ كُتِبَ عَلَيْكُمُ ٱلصِّيَامُ كَمَا كُتِبَ عَلَى ٱلَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ"
  }
 },
 {
  "id": "thr",
  "n": 193,
  "set": 4,
  "kind": "root",
  "root": "طهر",
  "translit": "ṭ-h-r",
  "gloss": "purity, cleanliness",
  "count": 31,
  "headword": "طَهِّرْ",
  "headwordGloss": "purify! (command)",
  "family": [
   {
    "word": "يُطَهِّرَكُمْ",
    "gloss": "to purify you"
   },
   {
    "word": "تَطْهِيرًا",
    "gloss": "a purification"
   },
   {
    "word": "مُطَهَّرَةٌ",
    "gloss": "purified (fem.)"
   }
  ],
  "verse": {
   "ref": "80:14",
   "surah": "Sūrat Abasa",
   "text": "مَّرْفُوعَةٍۢ مُّطَهَّرَةٍۭ"
  }
 },
 {
  "id": "qrb",
  "n": 194,
  "set": 4,
  "kind": "root",
  "root": "قرب",
  "translit": "q-r-b",
  "gloss": "nearness, approach",
  "count": 96,
  "headword": "قَرِيبٌ",
  "headwordGloss": "near",
  "family": [
   {
    "word": "قَرِيبًا",
    "gloss": "soon/near"
   },
   {
    "word": "أَقْرَبُ",
    "gloss": "nearer"
   },
   {
    "word": "قُرْبَىٰ",
    "gloss": "near kin"
   },
   {
    "word": "ذِى ٱلْقُرْبَىٰ",
    "gloss": "the near relative"
   },
   {
    "word": "يُقَرِّبُ",
    "gloss": "brings near"
   },
   {
    "word": "ٱقْتَرَبَتِ",
    "gloss": "has drawn near"
   }
  ],
  "verse": {
   "ref": "50:41",
   "surah": "Sūrat Qaaf",
   "text": "وَٱسْتَمِعْ يَوْمَ يُنَادِ ٱلْمُنَادِ مِن مَّكَانٍۢ قَرِيبٍۢ"
  }
 },
 {
  "id": "bʿd",
  "n": 195,
  "set": 4,
  "kind": "root",
  "root": "بعد",
  "translit": "b-ʿ-d",
  "gloss": "distance, remoteness",
  "count": 235,
  "headword": "بَعْدَ",
  "headwordGloss": "after",
  "family": [
   {
    "word": "مِنۢ بَعْدِ",
    "gloss": "after (from after)"
   },
   {
    "word": "مِنۢ بَعْدِهِمْ",
    "gloss": "after them"
   },
   {
    "word": "بَعِيدٌ",
    "gloss": "far"
   },
   {
    "word": "بَعِيدًا",
    "gloss": "far (adv.)"
   },
   {
    "word": "ٱلْبَعِيدُ",
    "gloss": "the far one/thing"
   },
   {
    "word": "بَعُدَتْ",
    "gloss": "it became far"
   }
  ],
  "verse": {
   "ref": "68:13",
   "surah": "Sūrat Al-Qalam",
   "text": "عُتُلٍّۭ بَعْدَ ذَٰلِكَ زَنِيمٍ"
  }
 },
 {
  "id": "fry",
  "n": 196,
  "set": 4,
  "kind": "root",
  "root": "فري",
  "translit": "f-r-y",
  "gloss": "fabricating a lie",
  "count": 60,
  "headword": "يَفْتَرُونَ",
  "headwordGloss": "they fabricate",
  "family": [
   {
    "word": "ٱفْتَرَىٰ",
    "gloss": "he fabricated"
   },
   {
    "word": "ٱفْتَرَيْتُهُ",
    "gloss": "I fabricated it"
   },
   {
    "word": "تَفْتَرُونَ",
    "gloss": "you fabricate"
   },
   {
    "word": "مُفْتَرًى",
    "gloss": "fabricated/forged"
   }
  ],
  "verse": {
   "ref": "21:20",
   "surah": "Sūrat Al-Anbiyaa",
   "text": "يُسَبِّحُونَ ٱلَّيْلَ وَٱلنَّهَارَ لَا يَفْتُرُونَ"
  }
 },
 {
  "id": "qry",
  "n": 197,
  "set": 4,
  "kind": "root",
  "root": "قري",
  "translit": "q-r-y",
  "gloss": "town",
  "count": 57,
  "headword": "ٱلْقَرْيَةِ",
  "headwordGloss": "the town",
  "family": [
   {
    "word": "قَرْيَةٍ",
    "gloss": "a town"
   },
   {
    "word": "قُرًى",
    "gloss": "towns"
   },
   {
    "word": "ٱلْقُرَىٰ",
    "gloss": "the towns"
   },
   {
    "word": "قَرْيَتِكُمْ",
    "gloss": "your town"
   },
   {
    "word": "أَهْلَ ٱلْقُرَىٰ",
    "gloss": "people of the towns"
   }
  ],
  "verse": {
   "ref": "36:13",
   "surah": "Sūrat Yaseen",
   "text": "وَٱضْرِبْ لَهُم مَّثَلًا أَصْحَٰبَ ٱلْقَرْيَةِ إِذْ جَآءَهَا ٱلْمُرْسَلُونَ"
  }
 },
 {
  "id": "ʿdd",
  "n": 198,
  "set": 4,
  "kind": "root",
  "root": "عدد",
  "translit": "ʿ-d-d",
  "gloss": "number, counting",
  "count": 57,
  "headword": "عَدَدَ",
  "headwordGloss": "a number",
  "family": [
   {
    "word": "عَدَدًا",
    "gloss": "in number"
   },
   {
    "word": "عِدَّةٌ",
    "gloss": "a fixed term/number"
   },
   {
    "word": "عِدَّتَهُمْ",
    "gloss": "their number"
   },
   {
    "word": "يَعُدُّونَ",
    "gloss": "they count"
   }
  ],
  "verse": {
   "ref": "104:2",
   "surah": "Sūrat Al-Humaza",
   "text": "ٱلَّذِى جَمَعَ مَالًۭا وَعَدَّدَهُۥ"
  }
 },
 {
  "id": "r2",
  "n": 199,
  "set": 4,
  "kind": "root",
  "root": "شرع",
  "translit": "š-r-ʿ",
  "gloss": "legislate, way, law",
  "count": 8,
  "headword": "شَرَعَ",
  "headwordGloss": "He ordained",
  "family": [
   {
    "word": "شَرَعَ",
    "gloss": "He ordained"
   },
   {
    "word": "شِرْعَةً",
    "gloss": "a law"
   },
   {
    "word": "شَرِيعَةٍ",
    "gloss": "an ordained way"
   },
   {
    "word": "شَرَعُوا۟",
    "gloss": "they ordained"
   },
   {
    "word": "شُرَّعًا",
    "gloss": "coming openly"
   }
  ],
  "verse": {
   "ref": "42:21",
   "surah": "Sūrat Ash-Shura",
   "text": "أَمْ لَهُمْ شُرَكَٰٓؤُا۟ شَرَعُوا۟ لَهُم مِّنَ ٱلدِّينِ مَا لَمْ يَأْذَنۢ بِهِ ٱللَّهُ ۚ وَلَوْلَا كَلِمَةُ ٱلْفَصْلِ لَقُضِىَ بَيْنَهُمْ ۗ وَإِنَّ ٱلظَّٰلِمِينَ لَهُمْ عَذَابٌ أَلِيمٌۭ"
  }
 },
 {
  "id": "tht",
  "n": 200,
  "set": 4,
  "kind": "root",
  "root": "تحت",
  "translit": "t-ḥ-t",
  "gloss": "beneath",
  "count": 52,
  "headword": "تَحْتِ",
  "headwordGloss": "beneath",
  "family": [
   {
    "word": "مِن تَحْتِهَا",
    "gloss": "beneath it"
   },
   {
    "word": "مِن تَحْتِهِمْ",
    "gloss": "beneath them"
   },
   {
    "word": "تَحْتَهَا",
    "gloss": "under it"
   },
   {
    "word": "تَحْتِى",
    "gloss": "beneath me"
   }
  ],
  "verse": {
   "ref": "78:19",
   "surah": "Sūrat An-Naba",
   "text": "وَفُتِحَتِ ٱلسَّمَآءُ فَكَانَتْ أَبْوَٰبًۭا"
  }
 },
 {
  "id": "nhy",
  "n": 201,
  "set": 4,
  "kind": "root",
  "root": "نهي",
  "translit": "n-h-y",
  "gloss": "forbid, prohibition",
  "count": 29,
  "headword": "يَنْهَىٰ",
  "headwordGloss": "he forbids",
  "family": [
   {
    "word": "يَنْهَىٰ",
    "gloss": "he forbids"
   },
   {
    "word": "نَهَىٰ",
    "gloss": "he forbade"
   },
   {
    "word": "تَنْهَوْنَ",
    "gloss": "you forbid"
   },
   {
    "word": "ٱلنُّهَىٰ",
    "gloss": "understanding"
   },
   {
    "word": "مُنتَهَىٰ",
    "gloss": "the final end"
   }
  ],
  "verse": {
   "ref": "96:9",
   "surah": "Sūrat Al-Alaq",
   "text": "أَرَءَيْتَ ٱلَّذِى يَنْهَىٰ"
  }
 },
 {
  "id": "hqq",
  "n": 202,
  "set": 4,
  "kind": "root",
  "root": "حقق",
  "translit": "ḥ-q-q",
  "gloss": "truth, right",
  "count": 287,
  "headword": "ٱلْحَقِّ",
  "headwordGloss": "the truth",
  "family": [
   {
    "word": "حَقًّا",
    "gloss": "truly"
   },
   {
    "word": "حَقَّ",
    "gloss": "became due/true"
   },
   {
    "word": "يَحِقُّ",
    "gloss": "is due/right"
   },
   {
    "word": "أَحَقُّ",
    "gloss": "more deserving/rightful"
   },
   {
    "word": "ٱلْحَاقَّةُ",
    "gloss": "the Inevitable Reality"
   }
  ],
  "verse": {
   "ref": "38:84",
   "surah": "Sūrat Saad",
   "text": "قَالَ فَٱلْحَقُّ وَٱلْحَقَّ أَقُولُ"
  }
 },
 {
  "id": "bl",
  "n": 203,
  "set": 4,
  "kind": "root",
  "root": "بطل",
  "translit": "b-ṭ-l",
  "gloss": "falsehood, vanity",
  "count": 66,
  "headword": "ٱلْبَٰطِلَ",
  "headwordGloss": "falsehood",
  "family": [
   {
    "word": "ٱلْبَٰطِلَ",
    "gloss": "falsehood"
   },
   {
    "word": "بَٰطِلًا",
    "gloss": "in vain"
   },
   {
    "word": "ٱلْمُبْطِلُونَ",
    "gloss": "the falsifiers"
   },
   {
    "word": "تُبْطِلُوا۟",
    "gloss": "you nullify"
   },
   {
    "word": "بَطَلَ",
    "gloss": "it came to nothing"
   }
  ],
  "verse": {
   "ref": "34:49",
   "surah": "Sūrat Saba",
   "text": "قُلْ جَآءَ ٱلْحَقُّ وَمَا يُبْدِئُ ٱلْبَٰطِلُ وَمَا يُعِيدُ"
  }
 },
 {
  "id": "dʿf",
  "n": 204,
  "set": 4,
  "kind": "root",
  "root": "ضعف",
  "translit": "ḍ-ʿ-f",
  "gloss": "weakness, and multiplying",
  "count": 52,
  "headword": "ضُعَفَٰٓؤُا۟",
  "headwordGloss": "the weak ones",
  "family": [
   {
    "word": "ضَعِيفًا",
    "gloss": "weak"
   },
   {
    "word": "ضَعْفًا",
    "gloss": "weakness"
   },
   {
    "word": "أَضْعَافًا",
    "gloss": "manyfold"
   },
   {
    "word": "مُّضَٰعَفَةً",
    "gloss": "multiplied"
   },
   {
    "word": "يُضَٰعِفُ",
    "gloss": "He multiplies"
   }
  ],
  "verse": {
   "ref": "40:47",
   "surah": "Sūrat Ghafir",
   "text": "وَإِذْ يَتَحَآجُّونَ فِى ٱلنَّارِ فَيَقُولُ ٱلضُّعَفَٰٓؤُا۟ لِلَّذِينَ ٱسْتَكْبَرُوٓا۟ إِنَّا كُنَّا لَكُمْ تَبَعًۭا فَهَلْ أَنتُم مُّغْنُونَ عَنَّا نَصِيبًۭا مِّنَ ٱلنَّارِ"
  }
 },
 {
  "id": "qdm",
  "n": 205,
  "set": 4,
  "kind": "root",
  "root": "قدم",
  "translit": "q-d-m",
  "gloss": "preceding, advancing, foot",
  "count": 48,
  "headword": "قَدَّمَتْ",
  "headwordGloss": "it sent ahead",
  "family": [
   {
    "word": "قَدَّمُوا۟",
    "gloss": "they sent ahead"
   },
   {
    "word": "مَا قَدَّمَتْ",
    "gloss": "what it sent ahead"
   },
   {
    "word": "قَدَمٌ",
    "gloss": "a foot"
   },
   {
    "word": "قَدَمِ",
    "gloss": "foot (of)"
   }
  ],
  "verse": {
   "ref": "89:24",
   "surah": "Sūrat Al-Fajr",
   "text": "يَقُولُ يَٰلَيْتَنِى قَدَّمْتُ لِحَيَاتِى"
  }
 },
 {
  "id": "shhd",
  "n": 206,
  "set": 4,
  "kind": "root",
  "root": "شهد",
  "translit": "š-h-d",
  "gloss": "witness, testify",
  "count": 160,
  "headword": "شَهِيدٌ",
  "headwordGloss": "witness",
  "family": [
   {
    "word": "شَهِدَ",
    "gloss": "he witnessed"
   },
   {
    "word": "شَهِدُوا۟",
    "gloss": "they witnessed"
   },
   {
    "word": "يَشْهَدُ",
    "gloss": "he witnesses"
   },
   {
    "word": "ٱشْهَدُوا۟",
    "gloss": "bear witness!"
   },
   {
    "word": "شُهَدَآءَ",
    "gloss": "witnesses"
   },
   {
    "word": "شَهَـٰدَةً",
    "gloss": "testimony"
   }
  ],
  "verse": {
   "ref": "100:7",
   "surah": "Sūrat Al-Aadiyaat",
   "text": "وَإِنَّهُۥ عَلَىٰ ذَٰلِكَ لَشَهِيدٌۭ"
  }
 },
 {
  "id": "tʿm",
  "n": 207,
  "set": 4,
  "kind": "root",
  "root": "طعم",
  "translit": "ṭ-ʿ-m",
  "gloss": "food, feeding",
  "count": 48,
  "headword": "طَعَامٌ",
  "headwordGloss": "food",
  "family": [
   {
    "word": "يَطْعَمُ",
    "gloss": "he eats"
   },
   {
    "word": "يُطْعِمُونَ",
    "gloss": "they feed"
   },
   {
    "word": "أَطْعَمَ",
    "gloss": "He fed / gave food"
   }
  ],
  "verse": {
   "ref": "69:36",
   "surah": "Sūrat Al-Haaqqa",
   "text": "وَلَا طَعَامٌ إِلَّا مِنْ غِسْلِينٍۢ"
  }
 },
 {
  "id": "fr2",
  "n": 208,
  "set": 4,
  "kind": "root",
  "root": "فرض",
  "translit": "f-r-ḍ",
  "gloss": "make obligatory",
  "count": 19,
  "headword": "فَرَضَ",
  "headwordGloss": "He made obligatory",
  "family": [
   {
    "word": "فَرَضَ",
    "gloss": "He made obligatory"
   },
   {
    "word": "فَرِيضَةً",
    "gloss": "an obligation"
   },
   {
    "word": "مَّفْرُوضًا",
    "gloss": "apportioned"
   },
   {
    "word": "فَرَضْنَا",
    "gloss": "We enjoined"
   },
   {
    "word": "تَفْرِضُوا۟",
    "gloss": "you fix"
   }
  ],
  "verse": {
   "ref": "66:2",
   "surah": "Sūrat At-Tahrim",
   "text": "قَدْ فَرَضَ ٱللَّهُ لَكُمْ تَحِلَّةَ أَيْمَٰنِكُمْ ۚ وَٱللَّهُ مَوْلَىٰكُمْ ۖ وَهُوَ ٱلْعَلِيمُ ٱلْحَكِيمُ"
  }
 },
 {
  "id": "hrm",
  "n": 209,
  "set": 4,
  "kind": "root",
  "root": "حرم",
  "translit": "ḥ-r-m",
  "gloss": "forbid, make sacred",
  "count": 83,
  "headword": "ٱلْحَرَامِ",
  "headwordGloss": "the sacred/forbidden",
  "family": [
   {
    "word": "حَرَّمَ",
    "gloss": "he made forbidden"
   },
   {
    "word": "حُرِّمَتْ",
    "gloss": "it was forbidden"
   },
   {
    "word": "حُرُمٌ",
    "gloss": "sacred (plural)"
   },
   {
    "word": "مُحَرَّمٌ",
    "gloss": "forbidden"
   },
   {
    "word": "ٱلْمَسْجِدِ ٱلْحَرَامِ",
    "gloss": "the Sacred Mosque"
   }
  ],
  "verse": {
   "ref": "2:149",
   "surah": "Sūrat Al-Baqara",
   "text": "وَمِنْ حَيْثُ خَرَجْتَ فَوَلِّ وَجْهَكَ شَطْرَ ٱلْمَسْجِدِ ٱلْحَرَامِ ۖ وَإِنَّهُۥ لَلْحَقُّ مِن رَّبِّكَ ۗ وَمَا ٱللَّهُ بِغَٰفِلٍ عَمَّا تَعْمَلُونَ"
  }
 },
 {
  "id": "hll",
  "n": 210,
  "set": 4,
  "kind": "root",
  "root": "حلل",
  "translit": "ḥ-l-l",
  "gloss": "make lawful",
  "count": 51,
  "headword": "أُحِلَّ",
  "headwordGloss": "it was made lawful",
  "family": [
   {
    "word": "حَلَّ",
    "gloss": "he/it alighted; became due"
   },
   {
    "word": "يَحِلُّ",
    "gloss": "it becomes lawful/due"
   },
   {
    "word": "مُحِلِّى",
    "gloss": "those making lawful/violating (iḥlāl)"
   }
  ],
  "verse": {
   "ref": "20:27",
   "surah": "Sūrat Taa-Haa",
   "text": "وَٱحْلُلْ عُقْدَةًۭ مِّن لِّسَانِى"
  }
 },
 {
  "id": "krm",
  "n": 211,
  "set": 4,
  "kind": "root",
  "root": "كرم",
  "translit": "k-r-m",
  "gloss": "nobility, generosity",
  "count": 47,
  "headword": "كَرِيمٌ",
  "headwordGloss": "noble/generous",
  "family": [
   {
    "word": "أَكْرَمَ",
    "gloss": "He honoured / was most generous"
   },
   {
    "word": "أَكْرَمَكُمْ",
    "gloss": "most noble of you"
   },
   {
    "word": "مُكْرَمُونَ",
    "gloss": "honoured ones (pl.)"
   },
   {
    "word": "كَرَّمْنَا",
    "gloss": "We honoured"
   },
   {
    "word": "كِرَامًا",
    "gloss": "noble ones (pl.)"
   }
  ],
  "verse": {
   "ref": "56:44",
   "surah": "Sūrat Al-Waaqia",
   "text": "لَّا بَارِدٍۢ وَلَا كَرِيمٍ"
  }
 },
 {
  "id": "ʿhd",
  "n": 212,
  "set": 4,
  "kind": "root",
  "root": "عهد",
  "translit": "ʿ-h-d",
  "gloss": "covenant, pledge",
  "count": 46,
  "headword": "عَهْدِ",
  "headwordGloss": "covenant/pledge",
  "family": [
   {
    "word": "عَهْدًا",
    "gloss": "a covenant"
   },
   {
    "word": "عَهْدِهِۦ",
    "gloss": "His covenant"
   },
   {
    "word": "عَٰهَدْتُّمْ",
    "gloss": "you made a covenant"
   },
   {
    "word": "عَٰهَدُوا۟",
    "gloss": "they pledged"
   },
   {
    "word": "عَٰهِدْتَّ",
    "gloss": "you (sg) pledged"
   }
  ],
  "verse": {
   "ref": "23:8",
   "surah": "Sūrat Al-Muminoon",
   "text": "وَٱلَّذِينَ هُمْ لِأَمَٰنَٰتِهِمْ وَعَهْدِهِمْ رَٰعُونَ"
  }
 },
 {
  "id": "wʿd",
  "n": 213,
  "set": 4,
  "kind": "root",
  "root": "وعد",
  "translit": "w-ʿ-d",
  "gloss": "promise",
  "count": 151,
  "headword": "وَعْدَ",
  "headwordGloss": "promise (of)",
  "family": [
   {
    "word": "وَعَدْنَا",
    "gloss": "We promised"
   },
   {
    "word": "يَعِدُ",
    "gloss": "he promises"
   },
   {
    "word": "يَعِدُكُمُ",
    "gloss": "He promises you"
   },
   {
    "word": "مَوْعِدٌ",
    "gloss": "an appointment (time)"
   },
   {
    "word": "مَوْعِدُهُمُ",
    "gloss": "their appointed time"
   }
  ],
  "verse": {
   "ref": "51:5",
   "surah": "Sūrat Adh-Dhaariyat",
   "text": "إِنَّمَا تُوعَدُونَ لَصَادِقٌۭ"
  }
 },
 {
  "id": "wʿz",
  "n": 214,
  "set": 4,
  "kind": "root",
  "root": "وعظ",
  "translit": "w-ʿ-ẓ",
  "gloss": "admonish, counsel",
  "count": 25,
  "headword": "مَوْعِظَةٌ",
  "headwordGloss": "an admonition",
  "family": [
   {
    "word": "وَعَظَ",
    "gloss": "he admonished"
   },
   {
    "word": "يَعِظُكُمْ",
    "gloss": "he admonishes you"
   },
   {
    "word": "فَعِظُوهُنَّ",
    "gloss": "admonish them!"
   },
   {
    "word": "ٱلْوَٰعِظِينَ",
    "gloss": "the admonishers"
   }
  ],
  "verse": {
   "ref": "3:138",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "هَٰذَا بَيَانٌۭ لِّلنَّاسِ وَهُدًۭى وَمَوْعِظَةٌۭ لِّلْمُتَّقِينَ"
  }
 },
 {
  "id": "srt",
  "n": 215,
  "set": 4,
  "kind": "root",
  "root": "صرط",
  "translit": "ṣ-r-ṭ",
  "gloss": "path (ṣirāṭ)",
  "count": 45,
  "headword": "ٱلصِّرَٰطَ",
  "headwordGloss": "the path",
  "family": [
   {
    "word": "صِرَٰطٍ",
    "gloss": "a path"
   },
   {
    "word": "صِرَٰطَ",
    "gloss": "a/the path"
   },
   {
    "word": "صِرَٰطَكَ",
    "gloss": "your path"
   },
   {
    "word": "صِرَٰطِى",
    "gloss": "my path"
   },
   {
    "word": "صِرَٰطِ",
    "gloss": "path (of)"
   }
  ],
  "verse": {
   "ref": "1:6",
   "surah": "Sūrat Al-Faatiha",
   "text": "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ"
  }
 },
 {
  "id": "ndhr",
  "n": 216,
  "set": 4,
  "kind": "root",
  "root": "نذر",
  "translit": "n-ḏ-r",
  "gloss": "warn, warning, admonition",
  "count": 130,
  "headword": "نَذِيرٌ",
  "headwordGloss": "a warner",
  "family": [
   {
    "word": "نُذُرٌ",
    "gloss": "warnings"
   },
   {
    "word": "أَنذَرَ",
    "gloss": "he warned"
   },
   {
    "word": "أَنذَرْتُكُمْ",
    "gloss": "I warned you"
   },
   {
    "word": "يُنذِرُ",
    "gloss": "he warns"
   },
   {
    "word": "مُنذِرٌ",
    "gloss": "one who warns"
   },
   {
    "word": "نَذَرْتُ",
    "gloss": "I vowed"
   }
  ],
  "verse": {
   "ref": "35:23",
   "surah": "Sūrat Faatir",
   "text": "إِنْ أَنتَ إِلَّا نَذِيرٌ"
  }
 },
 {
  "id": "hfz",
  "n": 217,
  "set": 4,
  "kind": "root",
  "root": "حفظ",
  "translit": "ḥ-f-ẓ",
  "gloss": "guarding, preserving",
  "count": 44,
  "headword": "حَفِيظٌ",
  "headwordGloss": "guardian",
  "family": [
   {
    "word": "ٱحْفَظُوا",
    "gloss": "guard!"
   },
   {
    "word": "يَحْفَظُونَ",
    "gloss": "they guard"
   },
   {
    "word": "حَافِظُونَ",
    "gloss": "guarding ones"
   },
   {
    "word": "مَحْفُوظٌ",
    "gloss": "preserved"
   },
   {
    "word": "حَفَظَةً",
    "gloss": "guardians"
   }
  ],
  "verse": {
   "ref": "50:32",
   "surah": "Sūrat Qaaf",
   "text": "هَٰذَا مَا تُوعَدُونَ لِكُلِّ أَوَّابٍ حَفِيظٍۢ"
  }
 },
 {
  "id": "fsl",
  "n": 218,
  "set": 4,
  "kind": "root",
  "root": "فصل",
  "translit": "f-ṣ-l",
  "gloss": "separating, setting out in detail",
  "count": 43,
  "headword": "فَصَّلْنَا",
  "headwordGloss": "We detailed",
  "family": [
   {
    "word": "فَصَّلَ",
    "gloss": "he detailed"
   },
   {
    "word": "فُصِّلَتْ",
    "gloss": "it was detailed"
   },
   {
    "word": "فَصْلٌ",
    "gloss": "decisive separation/judgment"
   },
   {
    "word": "فَصِّلْ",
    "gloss": "explain in detail!"
   },
   {
    "word": "مُفَصَّلًا",
    "gloss": "fully detailed"
   }
  ],
  "verse": {
   "ref": "6:126",
   "surah": "Sūrat Al-An'aam",
   "text": "وَهَٰذَا صِرَٰطُ رَبِّكَ مُسْتَقِيمًۭا ۗ قَدْ فَصَّلْنَا ٱلْءَايَٰتِ لِقَوْمٍۢ يَذَّكَّرُونَ"
  }
 },
 {
  "id": "hshr",
  "n": 219,
  "set": 4,
  "kind": "root",
  "root": "حشر",
  "translit": "ḥ-š-r",
  "gloss": "gathering for judgement",
  "count": 43,
  "headword": "يُحْشَرُونَ",
  "headwordGloss": "they will be gathered",
  "family": [
   {
    "word": "حَشَرْنَٰهُمْ",
    "gloss": "We gathered them"
   },
   {
    "word": "ٱحْشُرُوا۟",
    "gloss": "gather (plural command)"
   },
   {
    "word": "حَٰشِرِينَ",
    "gloss": "gathering (pl. act. ptc.)"
   }
  ],
  "verse": {
   "ref": "25:34",
   "surah": "Sūrat Al-Furqaan",
   "text": "ٱلَّذِينَ يُحْشَرُونَ عَلَىٰ وُجُوهِهِمْ إِلَىٰ جَهَنَّمَ أُو۟لَٰٓئِكَ شَرٌّۭ مَّكَانًۭا وَأَضَلُّ سَبِيلًۭا"
  }
 },
 {
  "id": "ndy",
  "n": 220,
  "set": 4,
  "kind": "root",
  "root": "ندي",
  "translit": "n-d-y",
  "gloss": "call aloud, proclaim",
  "count": 52,
  "headword": "يُنَادِى",
  "headwordGloss": "he calls out",
  "family": [
   {
    "word": "نَادَىٰ",
    "gloss": "he called out"
   },
   {
    "word": "نُودِىَ",
    "gloss": "it was called out"
   },
   {
    "word": "يُنَادُونَ",
    "gloss": "they call out"
   },
   {
    "word": "مُنَادٍ",
    "gloss": "a caller"
   },
   {
    "word": "نِدَاءً",
    "gloss": "a call"
   }
  ],
  "verse": {
   "ref": "28:65",
   "surah": "Sūrat Al-Qasas",
   "text": "وَيَوْمَ يُنَادِيهِمْ فَيَقُولُ مَاذَآ أَجَبْتُمُ ٱلْمُرْسَلِينَ"
  }
 },
 {
  "id": "fwq",
  "n": 221,
  "set": 4,
  "kind": "root",
  "root": "فوق",
  "translit": "f-w-q",
  "gloss": "above, over",
  "count": 43,
  "headword": "فَوْقَ",
  "headwordGloss": "above",
  "family": [
   {
    "word": "مِن فَوْقِهِمْ",
    "gloss": "from above them"
   },
   {
    "word": "فَوْقَهُمْ",
    "gloss": "above them"
   },
   {
    "word": "مِن فَوْقِكُمْ",
    "gloss": "from above you"
   },
   {
    "word": "فَوْقَكُمْ",
    "gloss": "above you"
   }
  ],
  "verse": {
   "ref": "78:12",
   "surah": "Sūrat An-Naba",
   "text": "وَبَنَيْنَا فَوْقَكُمْ سَبْعًۭا شِدَادًۭا"
  }
 },
 {
  "id": "qwy",
  "n": 222,
  "set": 4,
  "kind": "root",
  "root": "قوي",
  "translit": "q-w-y",
  "gloss": "strength",
  "count": 42,
  "headword": "قَوِىٌّ",
  "headwordGloss": "strong",
  "family": [
   {
    "word": "قُوَّةٍ",
    "gloss": "strength/power"
   },
   {
    "word": "ٱلْقُوَّةَ",
    "gloss": "the strength"
   },
   {
    "word": "قَوِيًّا",
    "gloss": "strong (acc.)"
   },
   {
    "word": "بِقُوَّةٍ",
    "gloss": "with strength"
   },
   {
    "word": "قُوَّتِكُمْ",
    "gloss": "your strength"
   }
  ],
  "verse": {
   "ref": "96:12",
   "surah": "Sūrat Al-Alaq",
   "text": "أَوْ أَمَرَ بِٱلتَّقْوَىٰٓ"
  }
 },
 {
  "id": "sxr",
  "n": 223,
  "set": 4,
  "kind": "root",
  "root": "سخر",
  "translit": "s-ḫ-r",
  "gloss": "mocking, and subjecting",
  "count": 42,
  "headword": "سَخَّرَ",
  "headwordGloss": "He subjected",
  "family": [
   {
    "word": "سَخَّرْنَا",
    "gloss": "We subjected"
   },
   {
    "word": "سَخَّرَ لَكُمْ",
    "gloss": "He subjected for you"
   },
   {
    "word": "سِخْرِيًّا",
    "gloss": "in mockery; as a ridicule"
   },
   {
    "word": "يَسْخَرُونَ",
    "gloss": "they mock"
   }
  ],
  "verse": {
   "ref": "37:12",
   "surah": "Sūrat As-Saaffaat",
   "text": "بَلْ عَجِبْتَ وَيَسْخَرُونَ"
  }
 },
 {
  "id": "tbb",
  "n": 224,
  "set": 4,
  "kind": "root",
  "root": "توب",
  "translit": "t-w-b",
  "gloss": "repent, return, repentance",
  "count": 87,
  "headword": "تُوبُوا۟",
  "headwordGloss": "repent (pl.)",
  "family": [
   {
    "word": "تَابَ",
    "gloss": "he repented/returned"
   },
   {
    "word": "يَتُوبُ",
    "gloss": "he repents"
   },
   {
    "word": "تَوْبَةً",
    "gloss": "repentance"
   },
   {
    "word": "تَابُوا۟",
    "gloss": "they repented"
   },
   {
    "word": "ٱلتَّوَّابُ",
    "gloss": "the Accepter of repentance"
   },
   {
    "word": "مَتَابًا",
    "gloss": "a place/return (turning back)"
   }
  ],
  "verse": {
   "ref": "11:90",
   "surah": "Sūrat Hud",
   "text": "وَٱسْتَغْفِرُوا۟ رَبَّكُمْ ثُمَّ تُوبُوٓا۟ إِلَيْهِ ۚ إِنَّ رَبِّى رَحِيمٌۭ وَدُودٌۭ"
  }
 },
 {
  "id": "sdd",
  "n": 225,
  "set": 4,
  "kind": "root",
  "root": "صدد",
  "translit": "ṣ-d-d",
  "gloss": "turning away, hindering",
  "count": 42,
  "headword": "يَصُدُّونَ",
  "headwordGloss": "they turn away",
  "family": [
   {
    "word": "صَدُّوا",
    "gloss": "they turned away / hindered"
   },
   {
    "word": "صَدَّ",
    "gloss": "he turned away / hindered"
   },
   {
    "word": "صَدَدْتُ",
    "gloss": "I turned away"
   },
   {
    "word": "صَدٌّ",
    "gloss": "hindering / turning away"
   },
   {
    "word": "صُدُودًا",
    "gloss": "turning away"
   }
  ],
  "verse": {
   "ref": "43:57",
   "surah": "Sūrat Az-Zukhruf",
   "text": "۞ وَلَمَّا ضُرِبَ ٱبْنُ مَرْيَمَ مَثَلًا إِذَا قَوْمُكَ مِنْهُ يَصِدُّونَ"
  }
 },
 {
  "id": "jhd",
  "n": 226,
  "set": 4,
  "kind": "root",
  "root": "جهد",
  "translit": "j-h-d",
  "gloss": "striving, exerting effort",
  "count": 41,
  "headword": "جَٰهِدُوا۟",
  "headwordGloss": "strive!",
  "family": [
   {
    "word": "يُجَٰهِدُونَ",
    "gloss": "they strive"
   },
   {
    "word": "جِهَادًا",
    "gloss": "striving (noun)"
   },
   {
    "word": "جُهْدَ",
    "gloss": "utmost effort"
   },
   {
    "word": "ٱلْمُجَٰهِدِينَ",
    "gloss": "those who strive"
   },
   {
    "word": "جَٰهِدْهُم",
    "gloss": "strive against them"
   }
  ],
  "verse": {
   "ref": "29:69",
   "surah": "Sūrat Al-Ankaboot",
   "text": "وَٱلَّذِينَ جَٰهَدُوا۟ فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ ٱللَّهَ لَمَعَ ٱلْمُحْسِنِينَ"
  }
 },
 {
  "id": "shrk",
  "n": 227,
  "set": 4,
  "kind": "root",
  "root": "شرك",
  "translit": "š-r-k",
  "gloss": "associate others with God",
  "count": 168,
  "headword": "ٱلْمُشْرِكِينَ",
  "headwordGloss": "the polytheists",
  "family": [
   {
    "word": "مُشْرِكُونَ",
    "gloss": "polytheists"
   },
   {
    "word": "شِرْكٌ",
    "gloss": "association (shirk)"
   },
   {
    "word": "شُرَكَاءَ",
    "gloss": "partners"
   },
   {
    "word": "شَرِيكٌ",
    "gloss": "a partner"
   },
   {
    "word": "أَشْرَكُوا۟",
    "gloss": "they associated (others)"
   },
   {
    "word": "يُشْرِكُونَ",
    "gloss": "they associate (others)"
   }
  ],
  "verse": {
   "ref": "15:94",
   "surah": "Sūrat Al-Hijr",
   "text": "فَٱصْدَعْ بِمَا تُؤْمَرُ وَأَعْرِضْ عَنِ ٱلْمُشْرِكِينَ"
  }
 },
 {
  "id": "y",
  "n": 228,
  "set": 4,
  "kind": "root",
  "root": "طغي",
  "translit": "ṭ-ġ-y",
  "gloss": "transgress, exceed bounds",
  "count": 51,
  "headword": "طَغَىٰ",
  "headwordGloss": "he transgressed",
  "family": [
   {
    "word": "طَغَىٰ",
    "gloss": "he transgressed"
   },
   {
    "word": "ٱلطَّٰغُوتُ",
    "gloss": "false authority"
   },
   {
    "word": "طُغْيَٰنِهِمْ",
    "gloss": "their transgression"
   },
   {
    "word": "طَٰغِينَ",
    "gloss": "transgressors"
   },
   {
    "word": "تَطْغَوْا۟",
    "gloss": "do not transgress"
   }
  ],
  "verse": {
   "ref": "53:17",
   "surah": "Sūrat An-Najm",
   "text": "مَا زَاغَ ٱلْبَصَرُ وَمَا طَغَىٰ"
  }
 },
 {
  "id": "ʿsy",
  "n": 229,
  "set": 4,
  "kind": "root",
  "root": "عصي",
  "translit": "ʿ-ṣ-y",
  "gloss": "disobey",
  "count": 33,
  "headword": "عَصَىٰ",
  "headwordGloss": "he disobeyed",
  "family": [
   {
    "word": "عَصَوْا۟",
    "gloss": "they disobeyed"
   },
   {
    "word": "يَعْصِ",
    "gloss": "he disobeys"
   },
   {
    "word": "عَصَيْتَ",
    "gloss": "you disobeyed"
   },
   {
    "word": "عَاصٍ",
    "gloss": "disobedient"
   }
  ],
  "verse": {
   "ref": "20:93",
   "surah": "Sūrat Taa-Haa",
   "text": "أَلَّا تَتَّبِعَنِ ۖ أَفَعَصَيْتَ أَمْرِى"
  }
 },
 {
  "id": "mlaa",
  "n": 230,
  "set": 4,
  "kind": "root",
  "root": "ملأ",
  "translit": "m-l-ʾ",
  "gloss": "the chiefs, and filling",
  "count": 41,
  "headword": "ٱلْمَلَأُ",
  "headwordGloss": "the chiefs",
  "family": [
   {
    "word": "مَلَأٌ",
    "gloss": "chiefs/elite"
   },
   {
    "word": "مُلِئَتْ",
    "gloss": "it was filled"
   },
   {
    "word": "مِلْءُ",
    "gloss": "a fill/fulfilment"
   }
  ],
  "verse": {
   "ref": "7:109",
   "surah": "Sūrat Al-A'raaf",
   "text": "قَالَ ٱلْمَلَأُ مِن قَوْمِ فِرْعَوْنَ إِنَّ هَٰذَا لَسَٰحِرٌ عَلِيمٌۭ"
  }
 },
 {
  "id": "fjr",
  "n": 231,
  "set": 4,
  "kind": "root",
  "root": "فجر",
  "translit": "f-j-r",
  "gloss": "sin openly, immoral",
  "count": 15,
  "headword": "ٱلْفَجْرِ",
  "headwordGloss": "the dawn",
  "family": [
   {
    "word": "ٱلْفَجْرِ",
    "gloss": "the dawn"
   },
   {
    "word": "ٱلْفُجَّارَ",
    "gloss": "the wicked"
   },
   {
    "word": "فَجَّرْنَا",
    "gloss": "We caused to gush"
   },
   {
    "word": "فُجُورَهَا",
    "gloss": "its wickedness"
   },
   {
    "word": "فَاجِرًا",
    "gloss": "a wicked one"
   }
  ],
  "verse": {
   "ref": "97:5",
   "surah": "Sūrat Al-Qadr",
   "text": "سَلَٰمٌ هِىَ حَتَّىٰ مَطْلَعِ ٱلْفَجْرِ"
  }
 },
 {
  "id": "flh",
  "n": 232,
  "set": 4,
  "kind": "root",
  "root": "فلح",
  "translit": "f-l-ḥ",
  "gloss": "success, prosperity",
  "count": 40,
  "headword": "ٱلْمُفْلِحُونَ",
  "headwordGloss": "the successful",
  "family": [
   {
    "word": "أَفْلَحَ",
    "gloss": "he succeeded"
   },
   {
    "word": "يُفْلِحُ",
    "gloss": "he succeeds"
   },
   {
    "word": "تُفْلِحُونَ",
    "gloss": "you succeed"
   },
   {
    "word": "مُفْلِحِينَ",
    "gloss": "successful (pl.)"
   }
  ],
  "verse": {
   "ref": "23:102",
   "surah": "Sūrat Al-Muminoon",
   "text": "فَمَن ثَقُلَتْ مَوَٰزِينُهُۥ فَأُو۟لَٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ"
  }
 },
 {
  "id": "sltn",
  "n": 233,
  "set": 4,
  "kind": "root",
  "root": "سلط",
  "translit": "s-l-ṭ",
  "gloss": "authority, clear warrant",
  "count": 39,
  "headword": "سُلْطَٰنٍ",
  "headwordGloss": "an authority, a warrant",
  "family": [
   {
    "word": "سُلْطَٰنٍ",
    "gloss": "an authority, a warrant"
   },
   {
    "word": "سُلْطَٰنًا",
    "gloss": "authority"
   },
   {
    "word": "بِسُلْطَٰنٍ",
    "gloss": "with a clear warrant"
   },
   {
    "word": "يُسَلِّطُ",
    "gloss": "He gives power over"
   },
   {
    "word": "سُلْطَٰنُهُۥ",
    "gloss": "his authority"
   }
  ],
  "verse": {
   "ref": "69:29",
   "surah": "Sūrat Al-Haaqqa",
   "text": "هَلَكَ عَنِّى سُلْطَٰنِيَهْ"
  }
 },
 {
  "id": "hdth",
  "n": 234,
  "set": 4,
  "kind": "root",
  "root": "حدث",
  "translit": "ḥ-d-ṯ",
  "gloss": "an event, relating it",
  "count": 36,
  "headword": "حَدِيثٌ",
  "headwordGloss": "a discourse",
  "family": [
   {
    "word": "حَدِيثًا",
    "gloss": "speech; report"
   },
   {
    "word": "مُحْدَثٌ",
    "gloss": "newly produced"
   },
   {
    "word": "حَدَثٌ",
    "gloss": "an occurrence"
   }
  ],
  "verse": {
   "ref": "79:15",
   "surah": "Sūrat An-Naazi'aat",
   "text": "هَلْ أَتَىٰكَ حَدِيثُ مُوسَىٰٓ"
  }
 },
 {
  "id": "m",
  "n": 235,
  "set": 4,
  "kind": "root",
  "root": "أثم",
  "translit": "ʾ-ṯ-m",
  "gloss": "sin",
  "count": 37,
  "headword": "ٱلْإِثْمِ",
  "headwordGloss": "the sin",
  "family": [
   {
    "word": "ٱلْإِثْمِ",
    "gloss": "the sin"
   },
   {
    "word": "إِثْمًا",
    "gloss": "a sin"
   },
   {
    "word": "أَثِيمٍ",
    "gloss": "sinful"
   },
   {
    "word": "إِثْمُهُۥ",
    "gloss": "its sin"
   },
   {
    "word": "تَأْثِيمًا",
    "gloss": "incitement to sin"
   }
  ],
  "verse": {
   "ref": "42:37",
   "surah": "Sūrat Ash-Shura",
   "text": "وَٱلَّذِينَ يَجْتَنِبُونَ كَبَٰٓئِرَ ٱلْإِثْمِ وَٱلْفَوَٰحِشَ وَإِذَا مَا غَضِبُوا۟ هُمْ يَغْفِرُونَ"
  }
 },
 {
  "id": "dhnb",
  "n": 236,
  "set": 4,
  "kind": "root",
  "root": "ذنب",
  "translit": "ḏ-n-b",
  "gloss": "fault, wrongdoing",
  "count": 39,
  "headword": "ذُنُوبِهِمْ",
  "headwordGloss": "their sins",
  "family": [
   {
    "word": "ذُنُوبَكُمْ",
    "gloss": "your sins"
   },
   {
    "word": "ذُنُوبِنَا",
    "gloss": "our sins"
   },
   {
    "word": "بِذُنُوبِهِمْ",
    "gloss": "for their sins"
   }
  ],
  "verse": {
   "ref": "3:11",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "كَدَأْبِ ءَالِ فِرْعَوْنَ وَٱلَّذِينَ مِن قَبْلِهِمْ ۚ كَذَّبُوا۟ بِـَٔايَٰتِنَا فَأَخَذَهُمُ ٱللَّهُ بِذُنُوبِهِمْ ۗ وَٱللَّهُ شَدِيدُ ٱلْعِقَابِ"
  }
 },
 {
  "id": "wrth",
  "n": 237,
  "set": 4,
  "kind": "root",
  "root": "ورث",
  "translit": "w-r-ṯ",
  "gloss": "inheriting",
  "count": 35,
  "headword": "يَرِثُ",
  "headwordGloss": "he inherits",
  "family": [
   {
    "word": "وَرِثْتُ",
    "gloss": "I inherited"
   },
   {
    "word": "وَرِثُوا",
    "gloss": "they inherited"
   },
   {
    "word": "وَارِثٌ",
    "gloss": "an heir"
   }
  ],
  "verse": {
   "ref": "23:11",
   "surah": "Sūrat Al-Muminoon",
   "text": "ٱلَّذِينَ يَرِثُونَ ٱلْفِرْدَوْسَ هُمْ فِيهَا خَٰلِدُونَ"
  }
 },
 {
  "id": "ʿfw",
  "n": 238,
  "set": 4,
  "kind": "root",
  "root": "عفو",
  "translit": "ʿ-f-w",
  "gloss": "pardon, overlook",
  "count": 35,
  "headword": "عَفُوٌّ",
  "headwordGloss": "O Pardoning",
  "family": [
   {
    "word": "عَفَا",
    "gloss": "he pardoned"
   },
   {
    "word": "يَعْفُو",
    "gloss": "He pardons"
   },
   {
    "word": "ٱعْفُ",
    "gloss": "pardon!"
   },
   {
    "word": "يَعْفُوا۟",
    "gloss": "they pardon"
   },
   {
    "word": "عَفَوْنَا",
    "gloss": "We pardoned"
   }
  ],
  "verse": {
   "ref": "7:199",
   "surah": "Sūrat Al-A'raaf",
   "text": "خُذِ ٱلْعَفْوَ وَأْمُرْ بِٱلْعُرْفِ وَأَعْرِضْ عَنِ ٱلْجَٰهِلِينَ"
  }
 },
 {
  "id": "hyn",
  "n": 239,
  "set": 4,
  "kind": "root",
  "root": "حين",
  "translit": "ḥ-y-n",
  "gloss": "a time, a while",
  "count": 34,
  "headword": "حِينٍ",
  "headwordGloss": "a time",
  "family": [
   {
    "word": "حِينًا",
    "gloss": "for a while; a time"
   },
   {
    "word": "حِينِئِذٍ",
    "gloss": "then, at that time"
   },
   {
    "word": "حِينَئِذٍ",
    "gloss": "then, at that time"
   }
  ],
  "verse": {
   "ref": "68:21",
   "surah": "Sūrat Al-Qalam",
   "text": "فَتَنَادَوْا۟ مُصْبِحِينَ"
  }
 },
 {
  "id": "hzw",
  "n": 240,
  "set": 4,
  "kind": "root",
  "root": "هزأ",
  "translit": "h-z-ʾ",
  "gloss": "ridicule",
  "count": 34,
  "headword": "هُزُوًا",
  "headwordGloss": "mockery",
  "family": [
   {
    "word": "يَسْتَهْزِءُونَ",
    "gloss": "they mock"
   },
   {
    "word": "تَسْتَهْزِءُونَ",
    "gloss": "you (pl.) mock"
   },
   {
    "word": "ٱسْتَهْزَءُوا۟",
    "gloss": "they mocked"
   },
   {
    "word": "مُسْتَهْزِءُونَ",
    "gloss": "mockers"
   },
   {
    "word": "ٱتَّخَذْتُمُوهُمْ سِخْرِيًّا",
    "gloss": "you took them in ridicule"
   }
  ],
  "verse": {
   "ref": "18:106",
   "surah": "Sūrat Al-Kahf",
   "text": "ذَٰلِكَ جَزَآؤُهُمْ جَهَنَّمُ بِمَا كَفَرُوا۟ وَٱتَّخَذُوٓا۟ ءَايَٰتِى وَرُسُلِى هُزُوًا"
  }
 },
 {
  "id": "akhr",
  "n": 241,
  "set": 5,
  "kind": "root",
  "root": "أخر",
  "translit": "ʾ-ḵ-r",
  "gloss": "afterlife, hereafter",
  "count": 250,
  "headword": "ءَاخَرُ",
  "headwordGloss": "another/other",
  "family": [
   {
    "word": "ءَاخَرِينَ",
    "gloss": "others"
   },
   {
    "word": "أُخْرَىٰ",
    "gloss": "another (fem.)"
   },
   {
    "word": "أُخَرَ",
    "gloss": "others (fem. pl.)"
   },
   {
    "word": "أَخَّرْنَا",
    "gloss": "We deferred"
   }
  ],
  "verse": {
   "ref": "26:172",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "ثُمَّ دَمَّرْنَا ٱلْءَاخَرِينَ"
  }
 },
 {
  "id": "dny",
  "n": 242,
  "set": 5,
  "kind": "root",
  "root": "دنو",
  "translit": "d-n-w",
  "gloss": "worldly life, nearness",
  "count": 133,
  "headword": "ٱلدُّنْيَا",
  "headwordGloss": "the near world",
  "family": [
   {
    "word": "ٱلْحَيَوٰةُ ٱلدُّنْيَا",
    "gloss": "the life of this world"
   },
   {
    "word": "ٱلْـَٔادْنَىٰ",
    "gloss": "the nearer/lower"
   },
   {
    "word": "دَانِيَةٌ",
    "gloss": "hanging low/near"
   }
  ],
  "verse": {
   "ref": "79:38",
   "surah": "Sūrat An-Naazi'aat",
   "text": "وَءَاثَرَ ٱلْحَيَوٰةَ ٱلدُّنْيَا"
  }
 },
 {
  "id": "qrn",
  "n": 243,
  "set": 5,
  "kind": "root",
  "root": "قرن",
  "translit": "q-r-n",
  "gloss": "generation, pairing together",
  "count": 33,
  "headword": "قَرْنٍ",
  "headwordGloss": "a generation",
  "family": [
   {
    "word": "قُرُونًا",
    "gloss": "generations"
   },
   {
    "word": "ٱلْقُرُونِ",
    "gloss": "the generations"
   },
   {
    "word": "قَرِينٌ",
    "gloss": "companion/associate"
   },
   {
    "word": "قُرَنَاءَ",
    "gloss": "companions"
   },
   {
    "word": "مُقَرَّنِينَ",
    "gloss": "bound together"
   }
  ],
  "verse": {
   "ref": "38:38",
   "surah": "Sūrat Saad",
   "text": "وَءَاخَرِينَ مُقَرَّنِينَ فِى ٱلْأَصْفَادِ"
  }
 },
 {
  "id": "jnb",
  "n": 244,
  "set": 5,
  "kind": "root",
  "root": "جنب",
  "translit": "j-n-b",
  "gloss": "side, and keeping away from",
  "count": 33,
  "headword": "جَنۢبِ",
  "headwordGloss": "side",
  "family": [
   {
    "word": "ٱجْتَنِبُوا۟",
    "gloss": "avoid!"
   },
   {
    "word": "يَجْتَنِبُ",
    "gloss": "he avoids"
   },
   {
    "word": "ٱلْجُنُبِ",
    "gloss": "the traveler / the one in janābah (by context)"
   }
  ],
  "verse": {
   "ref": "87:11",
   "surah": "Sūrat Al-A'laa",
   "text": "وَيَتَجَنَّبُهَا ٱلْأَشْقَى"
  }
 },
 {
  "id": "wsʿ",
  "n": 245,
  "set": 5,
  "kind": "root",
  "root": "وسع",
  "translit": "w-s-ʿ",
  "gloss": "vastness, capacity",
  "count": 32,
  "headword": "وَٰسِعٌ",
  "headwordGloss": "all-encompassing",
  "family": [
   {
    "word": "يَسَعُ",
    "gloss": "it can contain"
   },
   {
    "word": "سِعَةٍ",
    "gloss": "ample means"
   },
   {
    "word": "سَعَتْ",
    "gloss": "it encompassed"
   },
   {
    "word": "وُسْعَهَا",
    "gloss": "its capacity"
   }
  ],
  "verse": {
   "ref": "54:47",
   "surah": "Sūrat Al-Qamar",
   "text": "إِنَّ ٱلْمُجْرِمِينَ فِى ضَلَٰلٍۢ وَسُعُرٍۢ"
  }
 },
 {
  "id": "ghlb",
  "n": 246,
  "set": 5,
  "kind": "root",
  "root": "غلب",
  "translit": "ġ-l-b",
  "gloss": "overcoming, prevailing",
  "count": 31,
  "headword": "غَلَبَتْ",
  "headwordGloss": "she/it overcame",
  "family": [
   {
    "word": "سَيَغْلِبُونَ",
    "gloss": "they will overcome"
   },
   {
    "word": "مَغْلُوبٌ",
    "gloss": "defeated"
   },
   {
    "word": "غَلَبَ",
    "gloss": "he overcame"
   }
  ],
  "verse": {
   "ref": "23:106",
   "surah": "Sūrat Al-Muminoon",
   "text": "قَالُوا۟ رَبَّنَا غَلَبَتْ عَلَيْنَا شِقْوَتُنَا وَكُنَّا قَوْمًۭا ضَآلِّينَ"
  }
 },
 {
  "id": "ʿrsh",
  "n": 247,
  "set": 5,
  "kind": "root",
  "root": "عرش",
  "translit": "ʿ-r-š",
  "gloss": "throne",
  "count": 33,
  "headword": "ٱلْعَرْشِ",
  "headwordGloss": "the Throne",
  "family": [
   {
    "word": "عَرْشٌ",
    "gloss": "a throne"
   },
   {
    "word": "عَرْشَهَا",
    "gloss": "her throne"
   },
   {
    "word": "عَرْشِهِ",
    "gloss": "His Throne"
   },
   {
    "word": "عُرُوشٍ",
    "gloss": "trellises/arbors"
   }
  ],
  "verse": {
   "ref": "20:5",
   "surah": "Sūrat Taa-Haa",
   "text": "ٱلرَّحْمَٰنُ عَلَى ٱلْعَرْشِ ٱسْتَوَىٰ"
  }
 },
 {
  "id": "krsy",
  "n": 248,
  "set": 5,
  "kind": "root",
  "root": "كرس",
  "translit": "k-r-s",
  "gloss": "seat, authority",
  "count": 2,
  "headword": "كُرْسِيُّهُۥ",
  "headwordGloss": "His Seat",
  "family": [
   {
    "word": "كُرْسِيُّهُ",
    "gloss": "His Kursī"
   }
  ],
  "verse": {
   "ref": "38:34",
   "surah": "Sūrat Saad",
   "text": "وَلَقَدْ فَتَنَّا سُلَيْمَٰنَ وَأَلْقَيْنَا عَلَىٰ كُرْسِيِّهِۦ جَسَدًۭا ثُمَّ أَنَابَ"
  }
 },
 {
  "id": "hsb",
  "n": 249,
  "set": 5,
  "kind": "root",
  "root": "حسب",
  "translit": "ḥ-s-b",
  "gloss": "reckoning, accounting",
  "count": 109,
  "headword": "يَحْسَبُ",
  "headwordGloss": "he thinks",
  "family": [
   {
    "word": "حِسَابٌ",
    "gloss": "reckoning"
   },
   {
    "word": "حِسَابًا",
    "gloss": "as reckoning"
   },
   {
    "word": "حَسِيبٌ",
    "gloss": "Reckoner; sufficient"
   },
   {
    "word": "حَسْبُهُ",
    "gloss": "sufficient for him"
   }
  ],
  "verse": {
   "ref": "90:7",
   "surah": "Sūrat Al-Balad",
   "text": "أَيَحْسَبُ أَن لَّمْ يَرَهُۥٓ أَحَدٌ"
  }
 },
 {
  "id": "wzn",
  "n": 250,
  "set": 5,
  "kind": "root",
  "root": "وزن",
  "translit": "w-z-n",
  "gloss": "balance, scale",
  "count": 23,
  "headword": "ٱلْمِيزَانَ",
  "headwordGloss": "the balance",
  "family": [
   {
    "word": "مَوَٰزِينَ",
    "gloss": "scales (pl.)"
   },
   {
    "word": "مَوَٰزِينُهُ",
    "gloss": "his scales"
   },
   {
    "word": "وَزْنٌ",
    "gloss": "weight"
   },
   {
    "word": "وَزَنُوا۟",
    "gloss": "they weighed"
   },
   {
    "word": "يَزِنُونَ",
    "gloss": "they weigh"
   }
  ],
  "verse": {
   "ref": "55:8",
   "surah": "Sūrat Ar-Rahmaan",
   "text": "أَلَّا تَطْغَوْا۟ فِى ٱلْمِيزَانِ"
  }
 },
 {
  "id": "qss",
  "n": 251,
  "set": 5,
  "kind": "root",
  "root": "قصص",
  "translit": "q-ṣ-ṣ",
  "gloss": "narrating, a story",
  "count": 30,
  "headword": "قَصَصِ",
  "headwordGloss": "narrative(s)",
  "family": [
   {
    "word": "نَقُصُّ",
    "gloss": "We narrate"
   },
   {
    "word": "يَقُصُّ",
    "gloss": "he narrates"
   },
   {
    "word": "قُصَّ",
    "gloss": "it was narrated"
   },
   {
    "word": "قَصَصْنَا",
    "gloss": "We narrated"
   },
   {
    "word": "قَصَصًا",
    "gloss": "a narrative (acc.)"
   }
  ],
  "verse": {
   "ref": "18:64",
   "surah": "Sūrat Al-Kahf",
   "text": "قَالَ ذَٰلِكَ مَا كُنَّا نَبْغِ ۚ فَٱرْتَدَّا عَلَىٰٓ ءَاثَارِهِمَا قَصَصًۭا"
  }
 },
 {
  "id": "sjl",
  "n": 252,
  "set": 5,
  "kind": "root",
  "root": "سجل",
  "translit": "s-j-l",
  "gloss": "scroll, register",
  "count": 4,
  "headword": "ٱلسِّجِلِّ",
  "headwordGloss": "the scroll",
  "family": [
   {
    "word": "ٱلسِّجِلِّ",
    "gloss": "the scroll"
   },
   {
    "word": "سِجِّيلٍ",
    "gloss": "hard baked clay"
   }
  ],
  "verse": {
   "ref": "21:104",
   "surah": "Sūrat Al-Anbiyaa",
   "text": "يَوْمَ نَطْوِى ٱلسَّمَآءَ كَطَىِّ ٱلسِّجِلِّ لِلْكُتُبِ ۚ كَمَا بَدَأْنَآ أَوَّلَ خَلْقٍۢ نُّعِيدُهُۥ ۚ وَعْدًا عَلَيْنَآ ۚ إِنَّا كُنَّا فَٰعِلِينَ"
  }
 },
 {
  "id": "jl",
  "n": 253,
  "set": 5,
  "kind": "root",
  "root": "أجل",
  "translit": "ʾ-j-l",
  "gloss": "appointed time, term",
  "count": 94,
  "headword": "أَجَلٍ",
  "headwordGloss": "a term",
  "family": [
   {
    "word": "أَجَلٍ",
    "gloss": "a term"
   },
   {
    "word": "أَجَلُهُمْ",
    "gloss": "their term"
   },
   {
    "word": "أَجَلًا",
    "gloss": "a fixed term"
   },
   {
    "word": "أَجَلَهَا",
    "gloss": "its term"
   },
   {
    "word": "مُّسَمًّى",
    "gloss": "named, appointed"
   }
  ],
  "verse": {
   "ref": "75:20",
   "surah": "Sūrat Al-Qiyaama",
   "text": "كَلَّا بَلْ تُحِبُّونَ ٱلْعَاجِلَةَ"
  }
 },
 {
  "id": "rwd",
  "n": 254,
  "set": 5,
  "kind": "root",
  "root": "رود",
  "translit": "r-w-d",
  "gloss": "wanting, seeking to",
  "count": 30,
  "headword": "يُرِيدُ",
  "headwordGloss": "He wills",
  "family": [
   {
    "word": "يُرِيدُ",
    "gloss": "He wills"
   },
   {
    "word": "أَرَادَ",
    "gloss": "he intended"
   },
   {
    "word": "يُرِيدُونَ",
    "gloss": "they want"
   },
   {
    "word": "نُرِيدُ",
    "gloss": "we want"
   },
   {
    "word": "أَرَدْنَآ",
    "gloss": "we intended"
   }
  ],
  "verse": {
   "ref": "75:5",
   "surah": "Sūrat Al-Qiyaama",
   "text": "بَلْ يُرِيدُ ٱلْإِنسَٰنُ لِيَفْجُرَ أَمَامَهُۥ"
  }
 },
 {
  "id": "saʿ",
  "n": 255,
  "set": 5,
  "kind": "root",
  "root": "سوع",
  "translit": "s-w-ʿ",
  "gloss": "hour, moment",
  "count": 48,
  "headword": "ٱلسَّاعَةُ",
  "headwordGloss": "the Hour",
  "family": [
   {
    "word": "سَاعَةٍ",
    "gloss": "an hour; a moment"
   },
   {
    "word": "سَاعَةً",
    "gloss": "an hour; a while"
   }
  ],
  "verse": {
   "ref": "30:12",
   "surah": "Sūrat Ar-Room",
   "text": "وَيَوْمَ تَقُومُ ٱلسَّاعَةُ يُبْلِسُ ٱلْمُجْرِمُونَ"
  }
 },
 {
  "id": "qbr",
  "n": 256,
  "set": 5,
  "kind": "root",
  "root": "قبر",
  "translit": "q-b-r",
  "gloss": "grave",
  "count": 9,
  "headword": "ٱلْقُبُورِ",
  "headwordGloss": "the graves",
  "family": [
   {
    "word": "ٱلْقُبُورِ",
    "gloss": "the graves"
   },
   {
    "word": "قَبْرِهِۦ",
    "gloss": "his grave"
   },
   {
    "word": "ٱلْمَقَابِرَ",
    "gloss": "the graveyards"
   },
   {
    "word": "أَقْبَرَهُۥ",
    "gloss": "He had him buried"
   }
  ],
  "verse": {
   "ref": "82:4",
   "surah": "Sūrat Al-Infitaar",
   "text": "وَإِذَا ٱلْقُبُورُ بُعْثِرَتْ"
  }
 },
 {
  "id": "jnd",
  "n": 257,
  "set": 5,
  "kind": "root",
  "root": "جند",
  "translit": "j-n-d",
  "gloss": "army, host",
  "count": 29,
  "headword": "جُنُودُ",
  "headwordGloss": "hosts/armies",
  "family": [
   {
    "word": "جُندٌ",
    "gloss": "an army/host"
   },
   {
    "word": "جُنُودًا",
    "gloss": "hosts/armies"
   },
   {
    "word": "جُنْدُنَا",
    "gloss": "Our host"
   },
   {
    "word": "ٱلْجُنُودِ",
    "gloss": "the hosts"
   }
  ],
  "verse": {
   "ref": "26:95",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "وَجُنُودُ إِبْلِيسَ أَجْمَعُونَ"
  }
 },
 {
  "id": "nshr",
  "n": 258,
  "set": 5,
  "kind": "root",
  "root": "نشر",
  "translit": "n-š-r",
  "gloss": "rising again",
  "count": 24,
  "headword": "نُشِرَتْ",
  "headwordGloss": "are spread out",
  "family": [
   {
    "word": "ٱلنُّشُورِ",
    "gloss": "resurrection"
   },
   {
    "word": "يُنْشِرُ",
    "gloss": "He spreads; He revives"
   },
   {
    "word": "نُشُورًا",
    "gloss": "rising again; resurrection"
   }
  ],
  "verse": {
   "ref": "81:10",
   "surah": "Sūrat At-Takwir",
   "text": "وَإِذَا ٱلصُّحُفُ نُشِرَتْ"
  }
 },
 {
  "id": "thwb",
  "n": 259,
  "set": 5,
  "kind": "root",
  "root": "ثوب",
  "translit": "ṯ-w-b",
  "gloss": "reward, a garment",
  "count": 28,
  "headword": "ثَوَابٌ",
  "headwordGloss": "reward",
  "family": [
   {
    "word": "ثَوَابَ ٱلدُّنْيَا",
    "gloss": "reward of this world"
   },
   {
    "word": "ثَوَابِ ٱلْءَاخِرَةِ",
    "gloss": "reward of the Hereafter"
   },
   {
    "word": "مَثُوبَةً",
    "gloss": "a (better) reward"
   },
   {
    "word": "ثِيَابٌ",
    "gloss": "garments"
   }
  ],
  "verse": {
   "ref": "18:44",
   "surah": "Sūrat Al-Kahf",
   "text": "هُنَالِكَ ٱلْوَلَٰيَةُ لِلَّهِ ٱلْحَقِّ ۚ هُوَ خَيْرٌۭ ثَوَابًۭا وَخَيْرٌ عُقْبًۭا"
  }
 },
 {
  "id": "abad",
  "n": 260,
  "set": 5,
  "kind": "root",
  "root": "أبد",
  "translit": "ʾ-b-d",
  "gloss": "forever, endlessly",
  "count": 28,
  "headword": "أَبَدًا",
  "headwordGloss": "ever; never (with neg.)",
  "family": [
   {
    "word": "لَنْ",
    "gloss": "never (with verb)"
   },
   {
    "word": "لَآ",
    "gloss": "not/never (contextual neg.)"
   },
   {
    "word": "لَنْ يَتَمَنَّوْهُ أَبَدًا",
    "gloss": "they will never ever wish for it"
   },
   {
    "word": "خَٰلِدِينَ فِيهَآ أَبَدًا",
    "gloss": "abiding therein forever"
   }
  ],
  "verse": {
   "ref": "18:3",
   "surah": "Sūrat Al-Kahf",
   "text": "مَّٰكِثِينَ فِيهِ أَبَدًۭا"
  }
 },
 {
  "id": "qdr",
  "n": 261,
  "set": 5,
  "kind": "root",
  "root": "قدر",
  "translit": "q-d-r",
  "gloss": "decree, measure, power",
  "count": 132,
  "headword": "قَدَرَ",
  "headwordGloss": "he decreed",
  "family": [
   {
    "word": "قَدَرْنَا",
    "gloss": "We measured/decreed"
   },
   {
    "word": "نَقْدِرُ",
    "gloss": "We determine"
   },
   {
    "word": "قَدِيرٌ",
    "gloss": "All-Powerful"
   },
   {
    "word": "مَقْدُورًا",
    "gloss": "decreed / determined"
   },
   {
    "word": "قَدْرِهِ",
    "gloss": "His due measure"
   }
  ],
  "verse": {
   "ref": "74:18",
   "surah": "Sūrat Al-Muddaththir",
   "text": "إِنَّهُۥ فَكَّرَ وَقَدَّرَ"
  }
 },
 {
  "id": "msk",
  "n": 262,
  "set": 5,
  "kind": "root",
  "root": "مسك",
  "translit": "m-s-k",
  "gloss": "holding, grasping",
  "count": 27,
  "headword": "يُمْسِكُ",
  "headwordGloss": "he holds back",
  "family": [
   {
    "word": "أَمْسِكْ",
    "gloss": "hold (keep)!"
   },
   {
    "word": "أَمْسَكْتُمْ",
    "gloss": "you held/retained"
   },
   {
    "word": "مُمْسِكٌ",
    "gloss": "one who withholds"
   },
   {
    "word": "مَسَاكَ",
    "gloss": "he held/retained"
   }
  ],
  "verse": {
   "ref": "19:45",
   "surah": "Sūrat Maryam",
   "text": "يَٰٓأَبَتِ إِنِّىٓ أَخَافُ أَن يَمَسَّكَ عَذَابٌۭ مِّنَ ٱلرَّحْمَٰنِ فَتَكُونَ لِلشَّيْطَٰنِ وَلِيًّۭا"
  }
 },
 {
  "id": "bab",
  "n": 263,
  "set": 5,
  "kind": "root",
  "root": "بوب",
  "translit": "b-w-b",
  "gloss": "door, gate",
  "count": 27,
  "headword": "بَابٌ",
  "headwordGloss": "a gate; door",
  "family": [
   {
    "word": "ٱلْبَابَ",
    "gloss": "the gate (acc.)"
   },
   {
    "word": "ٱلْبَابِ",
    "gloss": "the gate (gen.)"
   },
   {
    "word": "بِبَابٍ",
    "gloss": "at/with a gate"
   }
  ],
  "verse": {
   "ref": "105:3",
   "surah": "Sūrat Al-Fil",
   "text": "وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ"
  }
 },
 {
  "id": "qy",
  "n": 264,
  "set": 5,
  "kind": "root",
  "root": "قضي",
  "translit": "q-ḍ-y",
  "gloss": "decree, determination",
  "count": 124,
  "headword": "قَضَىٰ",
  "headwordGloss": "He decreed",
  "family": [
   {
    "word": "قَضَىٰ",
    "gloss": "He decreed"
   },
   {
    "word": "قُضِىَ",
    "gloss": "it was decided"
   },
   {
    "word": "يَقْضِى",
    "gloss": "He judges"
   },
   {
    "word": "قَضَيْتَ",
    "gloss": "you decreed"
   },
   {
    "word": "مَّقْضِيًّا",
    "gloss": "decreed"
   }
  ],
  "verse": {
   "ref": "27:78",
   "surah": "Sūrat An-Naml",
   "text": "إِنَّ رَبَّكَ يَقْضِى بَيْنَهُم بِحُكْمِهِۦ ۚ وَهُوَ ٱلْعَزِيزُ ٱلْعَلِيمُ"
  }
 },
 {
  "id": "adhb",
  "n": 265,
  "set": 5,
  "kind": "root",
  "root": "عذب",
  "translit": "ʿ-ḏ-b",
  "gloss": "punishment, torment",
  "count": 373,
  "headword": "عَذَابٌ",
  "headwordGloss": "punishment",
  "family": [
   {
    "word": "يُعَذِّبُ",
    "gloss": "He punishes"
   },
   {
    "word": "عَذَّبْنَا",
    "gloss": "We punished"
   },
   {
    "word": "مُعَذِّبٌ",
    "gloss": "punishing (one who punishes)"
   },
   {
    "word": "مُعَذَّبِينَ",
    "gloss": "punished (people)"
   }
  ],
  "verse": {
   "ref": "54:39",
   "surah": "Sūrat Al-Qamar",
   "text": "فَذُوقُوا۟ عَذَابِى وَنُذُرِ"
  }
 },
 {
  "id": "jm",
  "n": 266,
  "set": 5,
  "kind": "root",
  "root": "جحم",
  "translit": "j-ḥ-m",
  "gloss": "blazing fire",
  "count": 49,
  "headword": "ٱلْجَحِيمِ",
  "headwordGloss": "the blazing fire",
  "family": [
   {
    "word": "ٱلْجَحِيمِ",
    "gloss": "the blazing fire"
   },
   {
    "word": "جَحِيمٍ",
    "gloss": "a blaze"
   }
  ],
  "verse": {
   "ref": "69:31",
   "surah": "Sūrat Al-Haaqqa",
   "text": "ثُمَّ ٱلْجَحِيمَ صَلُّوهُ"
  }
 },
 {
  "id": "ʿjb",
  "n": 267,
  "set": 5,
  "kind": "root",
  "root": "عجب",
  "translit": "ʿ-j-b",
  "gloss": "wonder, astonishment",
  "count": 27,
  "headword": "عَجِبْتَ",
  "headwordGloss": "you wondered",
  "family": [
   {
    "word": "عَجَبًا",
    "gloss": "a wonder; astonishingly"
   },
   {
    "word": "عَجِبُوا۟",
    "gloss": "they wondered"
   },
   {
    "word": "عَجَبٌ",
    "gloss": "wonder; strange thing"
   },
   {
    "word": "عُجَابٌ",
    "gloss": "most amazing; very strange"
   }
  ],
  "verse": {
   "ref": "37:12",
   "surah": "Sūrat As-Saaffaat",
   "text": "بَلْ عَجِبْتَ وَيَسْخَرُونَ"
  }
 },
 {
  "id": "nbt",
  "n": 268,
  "set": 5,
  "kind": "root",
  "root": "نبت",
  "translit": "n-b-t",
  "gloss": "plants, causing to grow",
  "count": 26,
  "headword": "نَبَاتًا",
  "headwordGloss": "growth",
  "family": [
   {
    "word": "أَنۢبَتَ",
    "gloss": "He caused to grow"
   },
   {
    "word": "أَنۢبَتْنَا",
    "gloss": "We caused to grow"
   },
   {
    "word": "يُنۢبِتُ",
    "gloss": "He causes to grow"
   },
   {
    "word": "نُبَاتٌ",
    "gloss": "plant growth"
   },
   {
    "word": "أَنۢبَتْنَا فِيهَا",
    "gloss": "We grew in it"
   }
  ],
  "verse": {
   "ref": "78:15",
   "surah": "Sūrat An-Naba",
   "text": "لِّنُخْرِجَ بِهِۦ حَبًّۭا وَنَبَاتًۭا"
  }
 },
 {
  "id": "qst",
  "n": 269,
  "set": 5,
  "kind": "root",
  "root": "قسط",
  "translit": "q-s-ṭ",
  "gloss": "equity, fair dealing",
  "count": 25,
  "headword": "ٱلْقِسْطِ",
  "headwordGloss": "equity",
  "family": [
   {
    "word": "بِٱلْقِسْطِ",
    "gloss": "with justice"
   },
   {
    "word": "ٱلْمُقْسِطِينَ",
    "gloss": "the just dealers"
   },
   {
    "word": "أَقْسَطُوا۟",
    "gloss": "they acted justly"
   },
   {
    "word": "قَٰسِطُونَ",
    "gloss": "the unjust"
   },
   {
    "word": "قِسْطَاسٍ",
    "gloss": "balance/scale"
   }
  ],
  "verse": {
   "ref": "26:182",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "وَزِنُوا۟ بِٱلْقِسْطَاسِ ٱلْمُسْتَقِيمِ"
  }
 },
 {
  "id": "hdd",
  "n": 270,
  "set": 5,
  "kind": "root",
  "root": "حدد",
  "translit": "ḥ-d-d",
  "gloss": "a limit, iron",
  "count": 25,
  "headword": "حَدِيدٌ",
  "headwordGloss": "iron",
  "family": [
   {
    "word": "حِدَادٌ",
    "gloss": "mourning"
   },
   {
    "word": "حُدُودَ",
    "gloss": "limits"
   },
   {
    "word": "حُدُودُ ٱللَّهِ",
    "gloss": "limits of Allah"
   },
   {
    "word": "حَدًّا",
    "gloss": "a limit"
   },
   {
    "word": "بَأْسٌ شَدِيدٌ",
    "gloss": "strong might"
   }
  ],
  "verse": {
   "ref": "22:21",
   "surah": "Sūrat Al-Hajj",
   "text": "وَلَهُم مَّقَٰمِعُ مِنْ حَدِيدٍۢ"
  }
 },
 {
  "id": "flk",
  "n": 271,
  "set": 5,
  "kind": "root",
  "root": "فلك",
  "translit": "f-l-k",
  "gloss": "ship, and orbit",
  "count": 25,
  "headword": "ٱلْفُلْكِ",
  "headwordGloss": "the ships",
  "family": [
   {
    "word": "فِى ٱلْفُلْكِ",
    "gloss": "in the ship(s)"
   },
   {
    "word": "ٱلْفُلْكِ ٱلْمَشْحُونِ",
    "gloss": "the loaded ship"
   },
   {
    "word": "فُلْكٍ",
    "gloss": "a ship / ships"
   },
   {
    "word": "فَلَكٍ",
    "gloss": "an orbit"
   }
  ],
  "verse": {
   "ref": "37:140",
   "surah": "Sūrat As-Saaffaat",
   "text": "إِذْ أَبَقَ إِلَى ٱلْفُلْكِ ٱلْمَشْحُونِ"
  }
 },
 {
  "id": "fdl",
  "n": 272,
  "set": 5,
  "kind": "root",
  "root": "فضل",
  "translit": "f-ḍ-l",
  "gloss": "grace, bounty",
  "count": 104,
  "headword": "فَضْلِ",
  "headwordGloss": "bounty/favor",
  "family": [
   {
    "word": "فَضْلًا",
    "gloss": "bounty/favor (indef.)"
   },
   {
    "word": "فَضْلِهِۦ",
    "gloss": "His bounty"
   },
   {
    "word": "ٱلْفَضْلِ",
    "gloss": "the bounty/favor"
   },
   {
    "word": "فَضَّلْنَا",
    "gloss": "We favored/preferred"
   }
  ],
  "verse": {
   "ref": "44:57",
   "surah": "Sūrat Ad-Dukhaan",
   "text": "فَضْلًۭا مِّن رَّبِّكَ ۚ ذَٰلِكَ هُوَ ٱلْفَوْزُ ٱلْعَظِيمُ"
  }
 },
 {
  "id": "nʿm",
  "n": 273,
  "set": 5,
  "kind": "root",
  "root": "نعم",
  "translit": "n-ʿ-m",
  "gloss": "blessing, favor",
  "count": 144,
  "headword": "نِعْمَةَ",
  "headwordGloss": "favor / blessing",
  "family": [
   {
    "word": "نِعْمَتِ",
    "gloss": "favor of"
   },
   {
    "word": "نِعْمَتَ ٱللَّهِ",
    "gloss": "Allah’s favor"
   },
   {
    "word": "أَنْعَمْتَ",
    "gloss": "You bestowed favor"
   },
   {
    "word": "أَنْعَمْنَا",
    "gloss": "We bestowed favor"
   },
   {
    "word": "نَعِيمٍ",
    "gloss": "bliss"
   },
   {
    "word": "ٱلنَّعِيمِ",
    "gloss": "the bliss"
   }
  ],
  "verse": {
   "ref": "93:11",
   "surah": "Sūrat Ad-Dhuhaa",
   "text": "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ"
  }
 },
 {
  "id": "nqm",
  "n": 274,
  "set": 5,
  "kind": "root",
  "root": "نقم",
  "translit": "n-q-m",
  "gloss": "retribution",
  "count": 15,
  "headword": "ٱنتَقَمْنَا",
  "headwordGloss": "We took retribution",
  "family": [
   {
    "word": "ٱنتَقَمْنَا",
    "gloss": "We took retribution"
   },
   {
    "word": "مُنتَقِمُونَ",
    "gloss": "ones who take retribution"
   },
   {
    "word": "نَقَمُوٓا۟",
    "gloss": "they resented"
   },
   {
    "word": "تَنقِمُونَ",
    "gloss": "you resent"
   },
   {
    "word": "ٱنتِقَامٍ",
    "gloss": "retribution"
   }
  ],
  "verse": {
   "ref": "15:79",
   "surah": "Sūrat Al-Hijr",
   "text": "فَٱنتَقَمْنَا مِنْهُمْ وَإِنَّهُمَا لَبِإِمَامٍۢ مُّبِينٍۢ"
  }
 },
 {
  "id": "blw",
  "n": 275,
  "set": 5,
  "kind": "root",
  "root": "بلو",
  "translit": "b-l-w",
  "gloss": "trial, test, testing",
  "count": 15,
  "headword": "لِيَبْلُوَكُمْ",
  "headwordGloss": "that He may test you",
  "family": [
   {
    "word": "لِيَبْلُوَكُمْ",
    "gloss": "that He may test you"
   },
   {
    "word": "ٱبْتَلَىٰ",
    "gloss": "He tested"
   },
   {
    "word": "بَلَاءٌ",
    "gloss": "a trial"
   },
   {
    "word": "نَبْلُوَا۟",
    "gloss": "We test"
   },
   {
    "word": "بَلَوْنَٰهُمْ",
    "gloss": "We tested them"
   }
  ],
  "verse": {
   "ref": "67:2",
   "surah": "Sūrat Al-Mulk",
   "text": "ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًۭا ۚ وَهُوَ ٱلْعَزِيزُ ٱلْغَفُورُ"
  }
 },
 {
  "id": "ftn",
  "n": 276,
  "set": 5,
  "kind": "root",
  "root": "فتن",
  "translit": "f-t-n",
  "gloss": "temptation, affliction",
  "count": 56,
  "headword": "فِتْنَةٌ",
  "headwordGloss": "a trial, discord",
  "family": [
   {
    "word": "فِتْنَةٌ",
    "gloss": "a trial, discord"
   },
   {
    "word": "ٱلْفِتْنَةِ",
    "gloss": "the trial"
   },
   {
    "word": "فَتَنَّا",
    "gloss": "We tried"
   },
   {
    "word": "يُفْتَنُونَ",
    "gloss": "they are tried"
   },
   {
    "word": "فُتِنُوا۟",
    "gloss": "they were tried"
   }
  ],
  "verse": {
   "ref": "37:63",
   "surah": "Sūrat As-Saaffaat",
   "text": "إِنَّا جَعَلْنَٰهَا فِتْنَةًۭ لِّلظَّٰلِمِينَ"
  }
 },
 {
  "id": "dfʿ",
  "n": 277,
  "set": 5,
  "kind": "root",
  "root": "دفع",
  "translit": "d-f-ʿ",
  "gloss": "repelling, warding off",
  "count": 24,
  "headword": "يَدْفَعُ",
  "headwordGloss": "he repels",
  "family": [
   {
    "word": "ٱدْفَعْ",
    "gloss": "repel!"
   },
   {
    "word": "ٱدْفَعُوا",
    "gloss": "repel!"
   },
   {
    "word": "ٱدْفَعْ بِٱلَّتِى",
    "gloss": "repel with that which…"
   },
   {
    "word": "دَفْعٌ",
    "gloss": "repelling"
   }
  ],
  "verse": {
   "ref": "22:38",
   "surah": "Sūrat Al-Hajj",
   "text": "۞ إِنَّ ٱللَّهَ يُدَٰفِعُ عَنِ ٱلَّذِينَ ءَامَنُوٓا۟ ۗ إِنَّ ٱللَّهَ لَا يُحِبُّ كُلَّ خَوَّانٍۢ كَفُورٍ"
  }
 },
 {
  "id": "khyl",
  "n": 278,
  "set": 5,
  "kind": "root",
  "root": "خيل",
  "translit": "ḫ-y-l",
  "gloss": "horses, and imagining",
  "count": 24,
  "headword": "ٱلْخَيْلِ",
  "headwordGloss": "the horses",
  "family": [
   {
    "word": "خَيْلٌ",
    "gloss": "horses"
   },
   {
    "word": "خَيْلِكَ",
    "gloss": "your cavalry"
   },
   {
    "word": "يُخَيَّلُ",
    "gloss": "it is made to seem"
   }
  ],
  "verse": {
   "ref": "16:8",
   "surah": "Sūrat An-Nahl",
   "text": "وَٱلْخَيْلَ وَٱلْبِغَالَ وَٱلْحَمِيرَ لِتَرْكَبُوهَا وَزِينَةًۭ ۚ وَيَخْلُقُ مَا لَا تَعْلَمُونَ"
  }
 },
 {
  "id": "bqy",
  "n": 279,
  "set": 5,
  "kind": "root",
  "root": "بقي",
  "translit": "b-q-y",
  "gloss": "remaining, lasting",
  "count": 23,
  "headword": "بَاقٍ",
  "headwordGloss": "remaining",
  "family": [
   {
    "word": "بَاقِيَةٌ",
    "gloss": "remaining; enduring"
   },
   {
    "word": "ٱلْبَٰقِيَٰتُ",
    "gloss": "the enduring (deeds)"
   },
   {
    "word": "بَقِيَّةٌ",
    "gloss": "remnant; remainder"
   },
   {
    "word": "يَبْقَىٰ",
    "gloss": "he/it remains"
   },
   {
    "word": "بَقِينَ",
    "gloss": "remaining (pl.)"
   }
  ],
  "verse": {
   "ref": "26:120",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "ثُمَّ أَغْرَقْنَا بَعْدُ ٱلْبَاقِينَ"
  }
 },
 {
  "id": "nkh",
  "n": 280,
  "set": 5,
  "kind": "root",
  "root": "نكح",
  "translit": "n-k-ḥ",
  "gloss": "marriage",
  "count": 23,
  "headword": "ٱنكِحُوا۟",
  "headwordGloss": "marry (them)",
  "family": [
   {
    "word": "نِكَاحًا",
    "gloss": "marriage"
   },
   {
    "word": "يَنكِحُ",
    "gloss": "he marries"
   },
   {
    "word": "تَنكِحُوا۟",
    "gloss": "you marry"
   },
   {
    "word": "نَكَحَ",
    "gloss": "he married"
   }
  ],
  "verse": {
   "ref": "24:32",
   "surah": "Sūrat An-Noor",
   "text": "وَأَنكِحُوا۟ ٱلْأَيَٰمَىٰ مِنكُمْ وَٱلصَّٰلِحِينَ مِنْ عِبَادِكُمْ وَإِمَآئِكُمْ ۚ إِن يَكُونُوا۟ فُقَرَآءَ يُغْنِهِمُ ٱللَّهُ مِن فَضْلِهِۦ ۗ وَٱللَّهُ وَٰسِعٌ عَلِيمٌۭ"
  }
 },
 {
  "id": "tlq",
  "n": 281,
  "set": 5,
  "kind": "root",
  "root": "طلق",
  "translit": "ṭ-l-q",
  "gloss": "divorce, releasing",
  "count": 23,
  "headword": "طَلَّقْتُمُ",
  "headwordGloss": "you divorced",
  "family": [
   {
    "word": "ٱلطَّلَٰقُ",
    "gloss": "divorce"
   },
   {
    "word": "طَلِّقُوهُنَّ",
    "gloss": "divorce them"
   },
   {
    "word": "طَلَّقَهَا",
    "gloss": "he divorced her"
   },
   {
    "word": "فَطَلِّقُوهُنَّ",
    "gloss": "then divorce them"
   }
  ],
  "verse": {
   "ref": "33:49",
   "surah": "Sūrat Al-Ahzaab",
   "text": "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِذَا نَكَحْتُمُ ٱلْمُؤْمِنَٰتِ ثُمَّ طَلَّقْتُمُوهُنَّ مِن قَبْلِ أَن تَمَسُّوهُنَّ فَمَا لَكُمْ عَلَيْهِنَّ مِنْ عِدَّةٍۢ تَعْتَدُّونَهَا ۖ فَمَتِّعُوهُنَّ وَسَرِّحُوهُنَّ سَرَاحًۭا جَمِيلًۭا"
  }
 },
 {
  "id": "tmʿ",
  "n": 282,
  "set": 5,
  "kind": "root",
  "root": "طمع",
  "translit": "ṭ-m-ʿ",
  "gloss": "desire, ambition",
  "count": 12,
  "headword": "يَطْمَعُ",
  "headwordGloss": "he hopes/covets",
  "family": [
   {
    "word": "ٱطْمَعْ",
    "gloss": "hope/aspire!"
   },
   {
    "word": "طَمَعًا",
    "gloss": "in hope; out of desire"
   },
   {
    "word": "يَطْمَعُونَ",
    "gloss": "they hope/covet"
   }
  ],
  "verse": {
   "ref": "74:15",
   "surah": "Sūrat Al-Muddaththir",
   "text": "ثُمَّ يَطْمَعُ أَنْ أَزِيدَ"
  }
 },
 {
  "id": "ytm",
  "n": 283,
  "set": 5,
  "kind": "root",
  "root": "يتم",
  "translit": "y-t-m",
  "gloss": "orphan",
  "count": 23,
  "headword": "ٱلْيَتَٰمَىٰ",
  "headwordGloss": "the orphans",
  "family": [
   {
    "word": "يَتِيمٌ",
    "gloss": "an orphan"
   },
   {
    "word": "يَتِيمًا",
    "gloss": "an orphan (obj.)"
   },
   {
    "word": "يَتِيمَيْنِ",
    "gloss": "two orphans"
   },
   {
    "word": "ٱلْيَتِيمِ",
    "gloss": "the orphan (gen.)"
   }
  ],
  "verse": {
   "ref": "4:10",
   "surah": "Sūrat An-Nisaa",
   "text": "إِنَّ ٱلَّذِينَ يَأْكُلُونَ أَمْوَٰلَ ٱلْيَتَٰمَىٰ ظُلْمًا إِنَّمَا يَأْكُلُونَ فِى بُطُونِهِمْ نَارًۭا ۖ وَسَيَصْلَوْنَ سَعِيرًۭا"
  }
 },
 {
  "id": "trb",
  "n": 284,
  "set": 5,
  "kind": "root",
  "root": "ترب",
  "translit": "t-r-b",
  "gloss": "dust, earth",
  "count": 22,
  "headword": "تُرَابًا",
  "headwordGloss": "dust/earth",
  "family": [
   {
    "word": "تُرَابٌ",
    "gloss": "dust/earth"
   },
   {
    "word": "مِن تُرَابٍ",
    "gloss": "from dust"
   },
   {
    "word": "تُرَابٍ",
    "gloss": "dust (of)"
   },
   {
    "word": "ٱلتُّرَابِ",
    "gloss": "the dust/earth"
   }
  ],
  "verse": {
   "ref": "50:3",
   "surah": "Sūrat Qaaf",
   "text": "أَءِذَا مِتْنَا وَكُنَّا تُرَابًۭا ۖ ذَٰلِكَ رَجْعٌۢ بَعِيدٌۭ"
  }
 },
 {
  "id": "rdy",
  "n": 285,
  "set": 5,
  "kind": "root",
  "root": "رضي",
  "translit": "r-ḍ-y",
  "gloss": "contentment, satisfaction",
  "count": 73,
  "headword": "رَضِىَ",
  "headwordGloss": "He was pleased",
  "family": [
   {
    "word": "رَضِىَ ٱللَّهُ",
    "gloss": "Allah was pleased"
   },
   {
    "word": "رَضُوا۟",
    "gloss": "they were pleased"
   },
   {
    "word": "تَرْضَىٰ",
    "gloss": "you will be pleased"
   },
   {
    "word": "رِضْوَٰنٌ",
    "gloss": "good-pleasure"
   },
   {
    "word": "مَرْضِيَّةً",
    "gloss": "well-pleasing"
   }
  ],
  "verse": {
   "ref": "93:5",
   "surah": "Sūrat Ad-Dhuhaa",
   "text": "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰٓ"
  }
 },
 {
  "id": "ghdb",
  "n": 286,
  "set": 5,
  "kind": "root",
  "root": "غضب",
  "translit": "ġ-ḍ-b",
  "gloss": "anger, wrath",
  "count": 24,
  "headword": "غَضَبَ",
  "headwordGloss": "he became angry",
  "family": [
   {
    "word": "بِغَضَبٍ",
    "gloss": "with wrath"
   },
   {
    "word": "غَضَبَ ٱللَّهِ",
    "gloss": "Allah’s wrath"
   },
   {
    "word": "ٱلْمَغْضُوبِ",
    "gloss": "those angered upon"
   }
  ],
  "verse": {
   "ref": "24:9",
   "surah": "Sūrat An-Noor",
   "text": "وَٱلْخَٰمِسَةَ أَنَّ غَضَبَ ٱللَّهِ عَلَيْهَآ إِن كَانَ مِنَ ٱلصَّٰدِقِينَ"
  }
 },
 {
  "id": "hzn",
  "n": 287,
  "set": 5,
  "kind": "root",
  "root": "حزن",
  "translit": "ḥ-z-n",
  "gloss": "sadness, grief",
  "count": 42,
  "headword": "يَحْزُنُ",
  "headwordGloss": "it grieves",
  "family": [
   {
    "word": "يَحْزُنُونَ",
    "gloss": "they grieve"
   },
   {
    "word": "لَا تَحْزَنْ",
    "gloss": "do not grieve"
   },
   {
    "word": "تَحْزَنُوا۟",
    "gloss": "do not grieve (pl.)"
   },
   {
    "word": "حَزَنًا",
    "gloss": "grief"
   }
  ],
  "verse": {
   "ref": "36:76",
   "surah": "Sūrat Yaseen",
   "text": "فَلَا يَحْزُنكَ قَوْلُهُمْ ۘ إِنَّا نَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ"
  }
 },
 {
  "id": "frh",
  "n": 288,
  "set": 5,
  "kind": "root",
  "root": "فرح",
  "translit": "f-r-ḥ",
  "gloss": "joy, delight",
  "count": 22,
  "headword": "فَرِحُوا۟",
  "headwordGloss": "they rejoiced",
  "family": [
   {
    "word": "يَفْرَحُونَ",
    "gloss": "they rejoice"
   },
   {
    "word": "تَفْرَحُوا۟",
    "gloss": "you rejoice"
   },
   {
    "word": "فَرِحِينَ",
    "gloss": "rejoicing"
   },
   {
    "word": "لَا تَفْرَحْ",
    "gloss": "do not exult"
   }
  ],
  "verse": {
   "ref": "10:58",
   "surah": "Sūrat Yunus",
   "text": "قُلْ بِفَضْلِ ٱللَّهِ وَبِرَحْمَتِهِۦ فَبِذَٰلِكَ فَلْيَفْرَحُوا۟ هُوَ خَيْرٌۭ مِّمَّا يَجْمَعُونَ"
  }
 },
 {
  "id": "tmm",
  "n": 289,
  "set": 5,
  "kind": "root",
  "root": "تمم",
  "translit": "t-m-m",
  "gloss": "completing, fulfilling",
  "count": 22,
  "headword": "تَمَامًا",
  "headwordGloss": "fully; completely",
  "family": [
   {
    "word": "تَمَّتْ",
    "gloss": "it was completed"
   },
   {
    "word": "تَمَّ",
    "gloss": "it was completed"
   },
   {
    "word": "أَتْمَمْتُ",
    "gloss": "I completed"
   },
   {
    "word": "نُتِمُّ",
    "gloss": "We complete"
   },
   {
    "word": "تَمَامَ",
    "gloss": "completion of"
   }
  ],
  "verse": {
   "ref": "6:154",
   "surah": "Sūrat Al-An'aam",
   "text": "ثُمَّ ءَاتَيْنَا مُوسَى ٱلْكِتَٰبَ تَمَامًا عَلَى ٱلَّذِىٓ أَحْسَنَ وَتَفْصِيلًۭا لِّكُلِّ شَىْءٍۢ وَهُدًۭى وَرَحْمَةًۭ لَّعَلَّهُم بِلِقَآءِ رَبِّهِمْ يُؤْمِنُونَ"
  }
 },
 {
  "id": "fz",
  "n": 290,
  "set": 5,
  "kind": "root",
  "root": "فزع",
  "translit": "f-z-ʿ",
  "gloss": "fear, panic",
  "count": 8,
  "headword": "فَزَعٍ",
  "headwordGloss": "terror",
  "family": [
   {
    "word": "فَزَعٍ",
    "gloss": "terror"
   },
   {
    "word": "ٱلْفَزَعُ",
    "gloss": "the terror"
   },
   {
    "word": "فَزِعُوا۟",
    "gloss": "they were terrified"
   }
  ],
  "verse": {
   "ref": "34:51",
   "surah": "Sūrat Saba",
   "text": "وَلَوْ تَرَىٰٓ إِذْ فَزِعُوا۟ فَلَا فَوْتَ وَأُخِذُوا۟ مِن مَّكَانٍۢ قَرِيبٍۢ"
  }
 },
 {
  "id": "ʿrb",
  "n": 291,
  "set": 5,
  "kind": "root",
  "root": "عرب",
  "translit": "ʿ-r-b",
  "gloss": "Arabic, clear of speech",
  "count": 22,
  "headword": "عَرَبِيًّا",
  "headwordGloss": "in Arabic",
  "family": [
   {
    "word": "عَرَبِيٌّ",
    "gloss": "Arabic (adj.)"
   },
   {
    "word": "أَعْرَابٌ",
    "gloss": "bedouins"
   },
   {
    "word": "ٱلْأَعْرَابُ",
    "gloss": "the bedouins"
   }
  ],
  "verse": {
   "ref": "39:28",
   "surah": "Sūrat Az-Zumar",
   "text": "قُرْءَانًا عَرَبِيًّا غَيْرَ ذِى عِوَجٍۢ لَّعَلَّهُمْ يَتَّقُونَ"
  }
 },
 {
  "id": "lqy",
  "n": 292,
  "set": 5,
  "kind": "root",
  "root": "لقي",
  "translit": "l-q-y",
  "gloss": "meeting, encounter",
  "count": 187,
  "headword": "لِقَآءَ",
  "headwordGloss": "the meeting",
  "family": [
   {
    "word": "لِقَآءَ",
    "gloss": "the meeting"
   },
   {
    "word": "يَلْقَىٰ",
    "gloss": "he meets"
   },
   {
    "word": "مُّلَٰقُوا۟",
    "gloss": "ones who will meet"
   },
   {
    "word": "أَلْقَىٰ",
    "gloss": "he cast"
   },
   {
    "word": "يُلْقِى",
    "gloss": "he casts"
   },
   {
    "word": "لَٰقُوا۟",
    "gloss": "they met"
   }
  ],
  "verse": {
   "ref": "28:22",
   "surah": "Sūrat Al-Qasas",
   "text": "وَلَمَّا تَوَجَّهَ تِلْقَآءَ مَدْيَنَ قَالَ عَسَىٰ رَبِّىٓ أَن يَهْدِيَنِى سَوَآءَ ٱلسَّبِيلِ"
  }
 },
 {
  "id": "ktm",
  "n": 293,
  "set": 5,
  "kind": "root",
  "root": "كتم",
  "translit": "k-t-m",
  "gloss": "concealing, hiding",
  "count": 21,
  "headword": "تَكْتُمُوا۟",
  "headwordGloss": "you conceal",
  "family": [
   {
    "word": "يَكْتُمُونَ",
    "gloss": "they conceal"
   },
   {
    "word": "يَكْتُمُ",
    "gloss": "he conceals"
   }
  ],
  "verse": {
   "ref": "2:42",
   "surah": "Sūrat Al-Baqara",
   "text": "وَلَا تَلْبِسُوا۟ ٱلْحَقَّ بِٱلْبَٰطِلِ وَتَكْتُمُوا۟ ٱلْحَقَّ وَأَنتُمْ تَعْلَمُونَ"
  }
 },
 {
  "id": "dll",
  "n": 294,
  "set": 5,
  "kind": "root",
  "root": "ضلل",
  "translit": "ḍ-l-l",
  "gloss": "error, misguidance",
  "count": 191,
  "headword": "ضَلَّ",
  "headwordGloss": "he went astray",
  "family": [
   {
    "word": "ضَلَٰلَةٌ",
    "gloss": "misguidance"
   },
   {
    "word": "ٱلضَّالِّينَ",
    "gloss": "those astray"
   },
   {
    "word": "أَضَلَّ",
    "gloss": "he misled"
   },
   {
    "word": "يُضِلُّ",
    "gloss": "he misleads"
   },
   {
    "word": "ضَلَلْنَا",
    "gloss": "we went astray"
   }
  ],
  "verse": {
   "ref": "53:2",
   "surah": "Sūrat An-Najm",
   "text": "مَا ضَلَّ صَاحِبُكُمْ وَمَا غَوَىٰ"
  }
 },
 {
  "id": "shr",
  "n": 295,
  "set": 5,
  "kind": "root",
  "root": "شهر",
  "translit": "š-h-r",
  "gloss": "month",
  "count": 21,
  "headword": "شَهْرِ",
  "headwordGloss": "month (of)",
  "family": [
   {
    "word": "شَهْرًا",
    "gloss": "a month"
   },
   {
    "word": "شَهْرَيْنِ",
    "gloss": "two months"
   },
   {
    "word": "ٱلشَّهْرِ",
    "gloss": "the month (gen/acc)"
   },
   {
    "word": "شُهُورٍ",
    "gloss": "months"
   },
   {
    "word": "رَمَضَانَ",
    "gloss": "Ramaḍān (month name)"
   }
  ],
  "verse": {
   "ref": "97:3",
   "surah": "Sūrat Al-Qadr",
   "text": "لَيْلَةُ ٱلْقَدْرِ خَيْرٌۭ مِّنْ أَلْفِ شَهْرٍۢ"
  }
 },
 {
  "id": "snn",
  "n": 296,
  "set": 5,
  "kind": "root",
  "root": "سنن",
  "translit": "s-n-n",
  "gloss": "a way, an established practice",
  "count": 21,
  "headword": "سُنَّةَ",
  "headwordGloss": "way; practice",
  "family": [
   {
    "word": "سُنَنٌ",
    "gloss": "ways; precedents"
   },
   {
    "word": "سُنَنٍ",
    "gloss": "ways; precedents (gen)"
   },
   {
    "word": "سُنَّتَنَا",
    "gloss": "Our way (practice)"
   }
  ],
  "verse": {
   "ref": "15:13",
   "surah": "Sūrat Al-Hijr",
   "text": "لَا يُؤْمِنُونَ بِهِۦ ۖ وَقَدْ خَلَتْ سُنَّةُ ٱلْأَوَّلِينَ"
  }
 },
 {
  "id": "hjr",
  "n": 297,
  "set": 5,
  "kind": "root",
  "root": "حجر",
  "translit": "ḥ-j-r",
  "gloss": "stone, and forbidding",
  "count": 21,
  "headword": "حِجَارَةً",
  "headwordGloss": "stones",
  "family": [
   {
    "word": "حَجَرًا",
    "gloss": "stone"
   },
   {
    "word": "حِجْرٍ",
    "gloss": "forbiddance; protected place"
   },
   {
    "word": "مَحْجُورًا",
    "gloss": "forbidden; barred"
   }
  ],
  "verse": {
   "ref": "105:4",
   "surah": "Sūrat Al-Fil",
   "text": "تَرْمِيهِم بِحِجَارَةٍۢ مِّن سِجِّيلٍۢ"
  }
 },
 {
  "id": "suq",
  "n": 298,
  "set": 5,
  "kind": "root",
  "root": "سوق",
  "translit": "s-w-q",
  "gloss": "driving on, a leg",
  "count": 21,
  "headword": "سَاقَيْهَا",
  "headwordGloss": "her two shins",
  "family": [
   {
    "word": "سُوقِهِ",
    "gloss": "its stalk"
   },
   {
    "word": "سَاقَ",
    "gloss": "he drove"
   },
   {
    "word": "سِيقَ",
    "gloss": "was driven"
   },
   {
    "word": "نَسُوقُ",
    "gloss": "We drive"
   }
  ],
  "verse": {
   "ref": "27:44",
   "surah": "Sūrat An-Naml",
   "text": "قِيلَ لَهَا ٱدْخُلِى ٱلصَّرْحَ ۖ فَلَمَّا رَأَتْهُ حَسِبَتْهُ لُجَّةًۭ وَكَشَفَتْ عَن سَاقَيْهَا ۚ قَالَ إِنَّهُۥ صَرْحٌۭ مُّمَرَّدٌۭ مِّن قَوَارِيرَ ۗ قَالَتْ رَبِّ إِنِّى ظَلَمْتُ نَفْسِى وَأَسْلَمْتُ مَعَ سُلَيْمَٰنَ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ"
  }
 },
 {
  "id": "snw",
  "n": 299,
  "set": 5,
  "kind": "root",
  "root": "سنو",
  "translit": "s-n-w",
  "gloss": "year",
  "count": 20,
  "headword": "سَنَةٍ",
  "headwordGloss": "a year",
  "family": [
   {
    "word": "سِنِينَ",
    "gloss": "years (pl.)"
   },
   {
    "word": "سِنِينَ",
    "gloss": "for years (pl.)"
   },
   {
    "word": "سِنِينَ",
    "gloss": "years (pl.)"
   }
  ],
  "verse": {
   "ref": "15:13",
   "surah": "Sūrat Al-Hijr",
   "text": "لَا يُؤْمِنُونَ بِهِۦ ۖ وَقَدْ خَلَتْ سُنَّةُ ٱلْأَوَّلِينَ"
  }
 },
 {
  "id": "rbw",
  "n": 300,
  "set": 5,
  "kind": "root",
  "root": "ربو",
  "translit": "r-b-w",
  "gloss": "increase, usury",
  "count": 20,
  "headword": "ٱلرِّبَوٰا۟",
  "headwordGloss": "usury",
  "family": [
   {
    "word": "يُرْبِى",
    "gloss": "He increases"
   },
   {
    "word": "رَبْوَةٍ",
    "gloss": "a hill/rise"
   },
   {
    "word": "رِبْيَةً",
    "gloss": "increase"
   }
  ],
  "verse": {
   "ref": "2:276",
   "surah": "Sūrat Al-Baqara",
   "text": "يَمْحَقُ ٱللَّهُ ٱلرِّبَوٰا۟ وَيُرْبِى ٱلصَّدَقَٰتِ ۗ وَٱللَّهُ لَا يُحِبُّ كُلَّ كَفَّارٍ أَثِيمٍ"
  }
 }
];

// The list is already in the order it is taught in — his order — so the
// sequence is the list. Kept as its own name because the rest of the app asks
// for it by this one.
const QURAN_SEQUENCE = QURAN_ROOTS;

// Fraction of the Quran's tokens covered by the learned entries (0..1)
function quranCoverage(learnedIds = []) {
  const set = new Set(learnedIds);
  const covered = QURAN_ROOTS.reduce((sum, e) => sum + (set.has(e.id) ? e.count : 0), 0);
  return Math.min(1, covered / QURAN_TOTAL_WORDS);
}

// The next entry to teach, in list order
function nextQuranRoot(learnedIds = []) {
  const set = new Set(learnedIds);
  return QURAN_SEQUENCE.find(e => !set.has(e.id)) || null;
}

// The set a root belongs to, and the roots in a set.
function quranRootSet(n) { return QURAN_ROOT_SETS.find(s => n >= s.from && n <= s.to) || null; }
function quranRootsInSet(set) { return QURAN_ROOTS.filter(e => e.set === set); }
