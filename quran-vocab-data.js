// ============================================================================
// BookTutor — the Quranic vocabulary cards (quran-vocab-data.js)
//
// One card per root, 298 of them. GENERATED — do not hand-edit; re-run
// tools/build-vocab.cjs. Written by gpt-5.2 on 2026-08-08.
//
// The FRONT of each card is `headword`: a real Quranic wordform in full Uthmani
// script, fully vowelled. Not the root letters — those are three letters that
// never appear as a word, and fronting a card with them trains recognition of
// something the muṣḥaf does not contain.
//
// The root, the family and the verse go on the BACK. The root is what unifies
// the family; it is not what you meet while reading.
//
// Every Arabic string here was checked against quran-text.js before it was
// written: each headword and each family form genuinely occurs, and each verse
// is a real verse found by searching the corpus rather than recalled.
// ============================================================================

// NOTE: this file is no longer loaded by the app. Its cards were folded into
// quran-roots-data.js when the root list was rebuilt from the learner's own
// 300, so the page carries one file instead of two. It is kept because
// tools/build-roots300.cjs reads it as a source — the verified headwords and
// families in here are where most of that list's words come from, and deleting
// it would make the build unreproducible.
//
const QURAN_VOCAB = [
 {
  "id": "alh",
  "root": "أ ل ه",
  "translit": "ʾ-l-h",
  "count": 2850,
  "gloss": "god, divinity (Allāh)",
  "headword": "ٱللَّهُ",
  "headwordGloss": "Allah (God)",
  "meaning": "godhood/divinity; worshipped deity — in the Qur’an overwhelmingly the One God (ٱللَّه).",
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
  "id": "qwl",
  "root": "ق و ل",
  "translit": "q-w-l",
  "count": 1720,
  "gloss": "saying, speech",
  "headword": "قَالَ",
  "headwordGloss": "he said",
  "meaning": "saying/speech; to say, tell, declare — used for quotation, command, and proclamation.",
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
  "id": "kwn",
  "root": "ك و ن",
  "translit": "k-w-n",
  "count": 1390,
  "gloss": "being, existence",
  "headword": "كَانَ",
  "headwordGloss": "he was",
  "meaning": "being/existence; to be, become, happen — also as an auxiliary (‘was/has been’).",
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
  "id": "rbb",
  "root": "ر ب ب",
  "translit": "r-b-b",
  "count": 975,
  "gloss": "lord, sustainer",
  "headword": "رَبِّ",
  "headwordGloss": "my Lord",
  "meaning": "lordship/nurturing; master, sustainer, cherisher — God as Rabb; also ‘owner/master’ by context.",
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
  "id": "amn",
  "root": "أ م ن",
  "translit": "ʾ-m-n",
  "count": 880,
  "gloss": "faith, security, belief",
  "headword": "ءَامَنُوا۟",
  "headwordGloss": "they believed",
  "meaning": "security/faith; to believe, trust, be secure — īmān as inward assent and reliance; also safety/peace.",
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
  "id": "alm",
  "root": "ع ل م",
  "translit": "ʿ-l-m",
  "count": 855,
  "gloss": "knowledge, knowing",
  "headword": "يَعْلَمُونَ",
  "headwordGloss": "they know",
  "meaning": "knowledge/knowing; to know, learn, recognize — also ‘be aware’ vs ‘be ignorant’.",
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
  "id": "qwm",
  "root": "ق و م",
  "translit": "q-w-m",
  "count": 660,
  "gloss": "standing, people, uprightness",
  "headword": "قَوْمِ",
  "headwordGloss": "people (of)",
  "meaning": "standing/uprightness; to stand, establish — also ‘people/folk (a قوم)’ and ‘maintain/keep upright’.",
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
  "id": "aty",
  "root": "أ ت ي",
  "translit": "ʾ-t-y",
  "count": 550,
  "gloss": "coming, bringing",
  "headword": "أَتَىٰ",
  "headwordGloss": "he came",
  "meaning": "coming/bringing; to come, bring, arrive — also ‘commit/produce’ by context (e.g., come with a sign).",
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
  "id": "kfr",
  "root": "ك ف ر",
  "translit": "k-f-r",
  "count": 525,
  "gloss": "disbelief, ingratitude, covering",
  "headword": "ٱلَّذِينَ كَفَرُوا۟",
  "headwordGloss": "those who disbelieved",
  "meaning": "covering/denying; to disbelieve, reject, be ungrateful — kufr ranges from ingratitude to outright denial.",
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
  "id": "shy",
  "root": "ش ي أ",
  "translit": "š-y-ʾ",
  "count": 520,
  "gloss": "thing, willing",
  "headword": "شَىْءٍ",
  "headwordGloss": "a thing",
  "meaning": "thingness/will; ‘thing, anything’ — also ‘to will’ in the sense of wanting/choosing (شاء).",
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
  "id": "rsl",
  "root": "ر س ل",
  "translit": "r-s-l",
  "count": 515,
  "gloss": "sending, messenger",
  "headword": "رَسُولٌ",
  "headwordGloss": "messenger",
  "meaning": "to send/dispatch; a messenger/envoy; messengership — human or angelic, context decides",
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
  "id": "ywm",
  "root": "ي و م",
  "translit": "y-w-m",
  "count": 475,
  "gloss": "day",
  "headword": "يَوْمَ",
  "headwordGloss": "on the day / day",
  "meaning": "day; a time/occasion; the Day (of Judgement) in many contexts",
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
  "id": "ard",
  "root": "أ ر ض",
  "translit": "ʾ-r-ḍ",
  "count": 460,
  "gloss": "earth, land",
  "headword": "ٱلْأَرْضِ",
  "headwordGloss": "the earth",
  "meaning": "earth/land/ground — the world below, a region/territory, or soil/ground (context decides).",
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
  "id": "ayy",
  "root": "أ ي ي",
  "translit": "ʾ-y-y",
  "count": 382,
  "gloss": "sign, verse (āyah)",
  "headword": "ءَايَٰتٍ",
  "headwordGloss": "signs / verses",
  "meaning": "a sign/mark; a Qur’anic verse; a miraculous sign — context decides which",
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
  "id": "smw",
  "root": "س م و",
  "translit": "s-m-w",
  "count": 380,
  "gloss": "height, heaven, name",
  "headword": "ٱلسَّمَٰوَٰتِ",
  "headwordGloss": "the heavens",
  "meaning": "height/loftiness → heaven(s)/sky — the created upper realm(s), sometimes ‘sky’ or ‘celestial domains’.",
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
  "id": "adhb",
  "root": "ع ذ ب",
  "translit": "ʿ-ḏ-b",
  "count": 373,
  "gloss": "punishment, torment",
  "headword": "عَذَابٌ",
  "headwordGloss": "punishment",
  "meaning": "to punish/torment; punishment, chastisement; (sometimes) pain/suffering",
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
  "id": "aml",
  "root": "ع م ل",
  "translit": "ʿ-m-l",
  "count": 360,
  "gloss": "doing, deeds, work",
  "headword": "عَمَلٌ",
  "headwordGloss": "deed / work",
  "meaning": "to do/act; deeds/works; (often) moral actions — righteous vs evil",
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
  "id": "nws",
  "root": "ن و س",
  "translit": "n-w-s",
  "count": 350,
  "gloss": "people, mankind (an-nās)",
  "headword": "ٱلنَّاسِ",
  "headwordGloss": "the people",
  "meaning": "people/mankind — humanity in general, people as a crowd, often contrasted with believers/disbelievers (context decides).",
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
  "id": "jal",
  "root": "ج ع ل",
  "translit": "j-ʿ-l",
  "count": 346,
  "gloss": "making, placing, appointing",
  "headword": "جَعَلْنَا",
  "headwordGloss": "We made/placed",
  "meaning": "to make, place, render, appoint; to set up/assign — wide Qur’anic usage",
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
  "id": "ktb",
  "root": "ك ت ب",
  "translit": "k-t-b",
  "count": 320,
  "gloss": "writing, book, decree",
  "headword": "ٱلْكِتَٰبِ",
  "headwordGloss": "the Book",
  "meaning": "to write/prescribe; book/scripture; decree/ordinance — context decides which",
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
  "id": "hdy",
  "root": "ه د ي",
  "translit": "h-d-y",
  "count": 316,
  "gloss": "guidance",
  "headword": "هُدًى",
  "headwordGloss": "guidance",
  "meaning": "to guide/lead; guidance; being rightly directed — moral/spiritual guidance, right path, divine direction.",
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
  "id": "nfs",
  "root": "ن ف س",
  "translit": "n-f-s",
  "count": 298,
  "gloss": "soul, self",
  "headword": "نَفْسٍ",
  "headwordGloss": "a soul/self",
  "meaning": "self; soul; person — inner self, a human being, life, or one’s own person depending on context.",
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
  "id": "nzl",
  "root": "ن ز ل",
  "translit": "n-z-l",
  "count": 293,
  "gloss": "sending down, revelation",
  "headword": "أَنزَلَ",
  "headwordGloss": "He sent down",
  "meaning": "to send down; to descend — revelation being sent down, provision/rain coming down, or someone descending.",
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
  "id": "dhkr",
  "root": "ذ ك ر",
  "translit": "ḏ-k-r",
  "count": 292,
  "gloss": "remembrance, mention",
  "headword": "ذِكْرِ",
  "headwordGloss": "remembrance/mention",
  "meaning": "to remember/mention; remembrance; reminder — recollection, mention, admonition, and the Qur’an as “the Reminder.”",
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
  "id": "hqq",
  "root": "ح ق ق",
  "translit": "ḥ-q-q",
  "count": 287,
  "gloss": "truth, right, reality",
  "headword": "ٱلْحَقِّ",
  "headwordGloss": "the truth",
  "meaning": "truth; right; that which is real/established — truth vs falsehood, rightful due, and what is certain/inevitable.",
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
  "id": "abd",
  "root": "ع ب د",
  "translit": "ʿ-b-d",
  "count": 275,
  "gloss": "worship, servanthood",
  "headword": "عِبَادِ",
  "headwordGloss": "(of) servants",
  "meaning": "to serve/worship; servanthood — worship of God, service/enslavement, and the identity of being God’s servants.",
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
  "id": "khlq",
  "root": "خ ل ق",
  "translit": "ḵ-l-q",
  "count": 261,
  "gloss": "creation",
  "headword": "خَلَقَ",
  "headwordGloss": "He created",
  "meaning": "create/form/bring into existence — God’s creating, shaping, determining; also ‘creature/creation’ and ‘character’ in some contexts.",
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
  "id": "amr",
  "root": "أ م ر",
  "translit": "ʾ-m-r",
  "count": 248,
  "gloss": "command, affair",
  "headword": "أَمْرِ",
  "headwordGloss": "command/affair",
  "meaning": "to command/order; command/affair/matter — divine command, an instruction, or an affair/event under God’s decree.",
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
  "id": "rhm",
  "root": "ر ح م",
  "translit": "r-ḥ-m",
  "count": 339,
  "gloss": "mercy, compassion",
  "headword": "رَحْمَةِ",
  "headwordGloss": "mercy",
  "meaning": "mercy; compassion; رحم — God’s mercy, kindness, forgiveness, blessing, and compassionate ties.",
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
  "id": "khf",
  "root": "خ و ف",
  "translit": "ḵ-w-f",
  "count": 124,
  "gloss": "fear",
  "headword": "خَوْفٍ",
  "headwordGloss": "fear",
  "meaning": "fear; to fear; be afraid — dread, apprehension, fear of God, or fear from people/events.",
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
  "id": "akhr",
  "root": "أ خ ر",
  "translit": "ʾ-ḵ-r",
  "count": 250,
  "gloss": "other, last, hereafter",
  "headword": "ءَاخَرُ",
  "headwordGloss": "another/other",
  "meaning": "later/last; the other; the next life (Hereafter) — context decides which",
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
  "id": "nzr",
  "root": "ن ظ ر",
  "translit": "n-ẓ-r",
  "count": 129,
  "gloss": "looking, seeing, considering",
  "headword": "يَنظُرُونَ",
  "headwordGloss": "they look/await",
  "meaning": "to look/see; to consider; to wait/expect — Qur’anic usage ranges from physical seeing to reflection to awaiting",
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
  "id": "jnn",
  "root": "ج ن ن",
  "translit": "j-n-n",
  "count": 201,
  "gloss": "garden (jannah), concealment, jinn",
  "headword": "ٱلْجَنَّةِ",
  "headwordGloss": "the Garden",
  "meaning": "to cover/conceal; hence garden (jannah) as lushly covered; jinn as hidden beings — context decides which",
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
  "id": "nar",
  "root": "ن و ر",
  "translit": "n-w-r",
  "count": 194,
  "gloss": "light, fire (nār)",
  "headword": "ٱلنَّارِ",
  "headwordGloss": "the Fire",
  "meaning": "fire; blaze; (also) light/illumination in some derivatives — Qur’an often uses it for Hellfire",
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
  "id": "slm",
  "root": "س ل م",
  "translit": "s-l-m",
  "count": 140,
  "gloss": "peace, submission (islām)",
  "headword": "ٱلسَّلَٰمِ",
  "headwordGloss": "peace",
  "meaning": "wholeness/safety; peace; submission (islām) — ranges from greeting/peace to faith-submission and salvation",
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
  "id": "ghfr",
  "root": "غ ف ر",
  "translit": "ġ-f-r",
  "count": 234,
  "gloss": "forgiveness",
  "headword": "غَفُورٌ",
  "headwordGloss": "All-Forgiving",
  "meaning": "to cover/forgive; pardon; shielding from consequences — Qur’an heavily uses it for Allah’s forgiveness",
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
  "id": "sbr",
  "root": "ص ب ر",
  "translit": "ṣ-b-r",
  "count": 103,
  "gloss": "patience, endurance",
  "headword": "ٱصْبِرُوا۟",
  "headwordGloss": "be patient!",
  "meaning": "to endure/hold firm; patience and steadfastness — includes restraint, perseverance in trial, and steadfast obedience",
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
  "id": "slw",
  "root": "ص ل و",
  "translit": "ṣ-l-w",
  "count": 99,
  "gloss": "prayer (ṣalāh)",
  "headword": "ٱلصَّلَوٰةِ",
  "headwordGloss": "the prayer",
  "meaning": "ṣalāh: ritual prayer; also blessing/prayer upon (ṣalawāt) — Qur’an uses it for both worship-prayer and sending blessings",
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
  "id": "khyr",
  "root": "خ ي ر",
  "translit": "ḵ-y-r",
  "count": 196,
  "gloss": "good, better, choice",
  "headword": "خَيْرٌ",
  "headwordGloss": "good / better",
  "meaning": "goodness; benefit; the better/best; chosen good — ranges from moral good to advantage and “better than” comparisons",
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
  "id": "shrk",
  "root": "ش ر ك",
  "translit": "š-r-k",
  "count": 168,
  "gloss": "association, partnership (shirk)",
  "headword": "ٱلْمُشْرِكِينَ",
  "headwordGloss": "the polytheists",
  "meaning": "to share/associate; partnership; associating others with Allah (shirk) — ranges from partners in general to religious idolatry",
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
  "id": "dny",
  "root": "د ن و",
  "translit": "d-n-w",
  "count": 133,
  "gloss": "nearness, this world (dunyā)",
  "headword": "ٱلدُّنْيَا",
  "headwordGloss": "the near world",
  "meaning": "nearness/lowliness; the present life and its immediacy — often contrasted with the Ākhirah",
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
  "id": "qlb",
  "root": "ق ل ب",
  "translit": "q-l-b",
  "count": 168,
  "gloss": "heart, turning",
  "headword": "قُلُوبٌ",
  "headwordGloss": "hearts",
  "meaning": "to turn/flip; heart as inner core, understanding, resolve — and its turning/being turned",
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
  "id": "hsn",
  "root": "ح س ن",
  "translit": "ḥ-s-n",
  "count": 194,
  "gloss": "goodness, beauty, excellence",
  "headword": "أَحْسَنَ",
  "headwordGloss": "he did good",
  "meaning": "beauty/goodness/excellence; to do good, make beautiful, act with ihsān; the best/fairer choice",
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
  "root": "و ق ي",
  "translit": "w-q-y",
  "count": 258,
  "gloss": "guarding, God-consciousness (taqwā)",
  "headword": "ٱلْمُتَّقِينَ",
  "headwordGloss": "the God-conscious",
  "meaning": "to guard/protect; to take precaution; taqwā as God-conscious restraint/guarding oneself from sin/punishment",
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
  "id": "ahd",
  "root": "و ح د",
  "translit": "w-ḥ-d",
  "count": 68,
  "gloss": "oneness, unity",
  "headword": "وَٰحِدٌ",
  "headwordGloss": "one",
  "meaning": "oneness/singleness/unity; one (as number), unique (esp. Allah), single/only",
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
  "id": "bsr",
  "root": "ب ص ر",
  "translit": "b-ṣ-r",
  "count": 148,
  "gloss": "seeing, insight",
  "headword": "يُبْصِرُونَ",
  "headwordGloss": "they see",
  "meaning": "to see/perceive; eyesight and inner insight; making visible/clear vs. blindness",
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
  "id": "smaa",
  "root": "س م ع",
  "translit": "s-m-ʿ",
  "count": 185,
  "gloss": "hearing, listening",
  "headword": "يَسْمَعُونَ",
  "headwordGloss": "they hear",
  "meaning": "to hear/listen; receiving/accepting (hearing with response) vs. refusing to hear",
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
  "id": "dll",
  "root": "ض ل ل",
  "translit": "ḍ-l-l",
  "count": 191,
  "gloss": "going astray, error",
  "headword": "ضَلَّ",
  "headwordGloss": "he went astray",
  "meaning": "to stray/lose the way; error and misguidance; being lost/ruined; making others go astray",
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
  "id": "ghyb",
  "root": "غ ي ب",
  "translit": "ġ-y-b",
  "count": 60,
  "gloss": "the unseen, absence",
  "headword": "ٱلْغَيْبِ",
  "headwordGloss": "the unseen",
  "meaning": "hidden/absent; the unseen realm and what is beyond perception; absence (not present)",
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
  "id": "mlk",
  "root": "م ل ك",
  "translit": "m-l-k",
  "count": 206,
  "gloss": "dominion, kingship, angel",
  "headword": "ٱللَّهُ",
  "headwordGloss": "Allah",
  "meaning": "to own/possess and rule; dominion/kingship/authority; a king; an angel (malak) — context decides",
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
  "id": "mwt",
  "root": "م و ت",
  "translit": "m-w-t",
  "count": 165,
  "gloss": "death",
  "headword": "ٱلْمَوْتُ",
  "headwordGloss": "death",
  "meaning": "to die; death; lifelessness — physical death, spiritual death, the state of death",
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
  "id": "hyy",
  "root": "ح ي ي",
  "translit": "ḥ-y-y",
  "count": 184,
  "gloss": "life, living",
  "headword": "ٱلْحَيَوٰةِ",
  "headwordGloss": "the life",
  "meaning": "to live; life; living — worldly life vs. true/eternal life; reviving/giving life",
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
  "id": "rzq",
  "root": "ر ز ق",
  "translit": "r-z-q",
  "count": 123,
  "gloss": "provision, sustenance",
  "headword": "رِزْقًا",
  "headwordGloss": "provision",
  "meaning": "to provide/sustain; provision — food, wealth, children, rain, all allotted sustenance",
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
  "id": "wld",
  "root": "و ل د",
  "translit": "w-l-d",
  "count": 102,
  "gloss": "child, birth",
  "headword": "وَلَدًا",
  "headwordGloss": "a child",
  "meaning": "to beget/give birth; child/offspring — literal children, claimed sonship, lineage/descendants",
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
  "id": "qtl",
  "root": "ق ت ل",
  "translit": "q-t-l",
  "count": 170,
  "gloss": "killing, fighting",
  "headword": "قُتِلُوا۟",
  "headwordGloss": "they were killed",
  "meaning": "to kill/fight; killing; being slain — murder, lawful fighting, martyrdom, warfare contexts",
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
  "id": "zlm",
  "root": "ظ ل م",
  "translit": "ẓ-l-m",
  "count": 315,
  "gloss": "wrongdoing, injustice, darkness",
  "headword": "ٱلظَّٰلِمِينَ",
  "headwordGloss": "the wrongdoers",
  "meaning": "to wrong/oppress; wrongdoing/injustice; (also) darkness — moral ظلم, shirk as ظلم, oppression",
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
  "id": "sdq",
  "root": "ص د ق",
  "translit": "ṣ-d-q",
  "count": 155,
  "gloss": "truthfulness, charity (ṣadaqah)",
  "headword": "صَدَقُوا۟",
  "headwordGloss": "they were truthful",
  "meaning": "to be truthful; truthfulness; confirm; charity (ṣadaqah) — sincerity, verifying, alms",
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
  "id": "wjh",
  "root": "و ج ه",
  "translit": "w-j-h",
  "count": 78,
  "gloss": "face, direction",
  "headword": "وَجْهَ",
  "headwordGloss": "face; direction",
  "meaning": "face; direction; turning — literal face, orientation (qiblah), seeking God’s Face (His pleasure)",
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
  "id": "tbb",
  "root": "ت و ب",
  "translit": "t-w-b",
  "count": 87,
  "gloss": "repentance, returning",
  "headword": "تُوبُوا۟",
  "headwordGloss": "repent (pl.)",
  "meaning": "to return/repent; repentance — turning back to God, accepting repentance, seeking forgiveness",
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
  "id": "dua",
  "root": "د ع و",
  "translit": "d-ʿ-w",
  "count": 212,
  "gloss": "calling, supplication (duʿāʾ)",
  "headword": "يَدْعُونَ",
  "headwordGloss": "they call/supplicate",
  "meaning": "to call/invoke; supplication — الدعاء (prayer), calling to faith, naming/addressing",
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
  "id": "khsr",
  "root": "خ س ر",
  "translit": "ḵ-s-r",
  "count": 65,
  "gloss": "loss, ruin",
  "headword": "ٱلْخَـٰسِرِينَ",
  "headwordGloss": "the losers",
  "meaning": "loss; ruin; being deprived — worldly loss, moral failure, or ultimate loss in the Hereafter",
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
  "id": "flh",
  "root": "ف ل ح",
  "translit": "f-l-ḥ",
  "count": 40,
  "gloss": "success, prosperity",
  "headword": "ٱلْمُفْلِحُونَ",
  "headwordGloss": "the successful",
  "meaning": "success; prosperity; attaining what is sought — especially true success (salvation) by faith and obedience",
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
  "id": "jzy",
  "root": "ج ز ي",
  "translit": "j-z-y",
  "count": 118,
  "gloss": "recompense, reward",
  "headword": "جَزَآءً",
  "headwordGloss": "a recompense",
  "meaning": "recompense; requital; reward/punishment — repayment according to deeds, good or bad",
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
  "id": "shhd",
  "root": "ش ه د",
  "translit": "š-h-d",
  "count": 160,
  "gloss": "witnessing, testimony",
  "headword": "شَهِيدٌ",
  "headwordGloss": "witness",
  "meaning": "witnessing; testimony; being present — legal testimony, moral witnessing, and (by extension) one martyred as a witness",
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
  "id": "nsr",
  "root": "ن ص ر",
  "translit": "n-ṣ-r",
  "count": 158,
  "gloss": "help, victory",
  "headword": "يَنصُرُ",
  "headwordGloss": "he helps",
  "meaning": "help; support; victory — divine aid, military victory, or any decisive support",
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
  "id": "rj3",
  "root": "ر ج ع",
  "translit": "r-j-ʿ",
  "count": 104,
  "gloss": "returning",
  "headword": "رَجَعُوا۟",
  "headwordGloss": "they returned",
  "meaning": "returning; coming back; being brought back — return in space, in thought, or to Allah for judgment",
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
  "id": "khrj",
  "root": "خ ر ج",
  "translit": "ḵ-r-j",
  "count": 182,
  "gloss": "going out, bringing forth",
  "headword": "أَخْرَجَ",
  "headwordGloss": "he brought out",
  "meaning": "going out; bringing forth — exiting, expelling, producing (plants), or bringing from hidden to manifest",
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
  "root": "د خ ل",
  "translit": "d-ḵ-l",
  "count": 126,
  "gloss": "entering",
  "headword": "ٱدْخُلُوا۟",
  "headwordGloss": "enter!",
  "meaning": "entering; admission — entering places, states, or being admitted by Allah (e.g., Paradise)",
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
  "id": "ba3th",
  "root": "ب ع ث",
  "translit": "b-ʿ-ṯ",
  "count": 67,
  "gloss": "raising, resurrection",
  "headword": "بَعَثْنَا",
  "headwordGloss": "We raised/sent",
  "meaning": "raising up; sending forth — resurrection from death, awakening, or commissioning a messenger",
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
  "id": "wʿd",
  "root": "و ع د",
  "translit": "w-ʿ-d",
  "count": 151,
  "gloss": "promise",
  "headword": "وَعْدَ",
  "headwordGloss": "promise (of)",
  "meaning": "promise; pledged outcome — Allah’s true promise (reward or warning) and human promises",
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
  "id": "ttbʿ",
  "root": "ت ب ع",
  "translit": "t-b-ʿ",
  "count": 172,
  "gloss": "following",
  "headword": "ٱتَّبِعُوا۟",
  "headwordGloss": "follow!",
  "meaning": "to follow/come after, pursue, obey — following persons, guidance, truth, or desires",
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
  "id": "sbl",
  "root": "س ب ل",
  "translit": "s-b-l",
  "count": 176,
  "gloss": "path, way (sabīl)",
  "headword": "سَبِيلِ",
  "headwordGloss": "path/way (of)",
  "meaning": "a way/route/means — often ‘Allah’s way’, also ways of evil, means/grounds",
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
  "id": "srt",
  "root": "ص ر ط",
  "translit": "ṣ-r-ṭ",
  "count": 45,
  "gloss": "path (ṣirāṭ)",
  "headword": "ٱلصِّرَٰطَ",
  "headwordGloss": "the path",
  "meaning": "a straight road/path — especially the straight path of guidance",
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
  "id": "ajr",
  "root": "أ ج ر",
  "translit": "ʾ-j-r",
  "count": 105,
  "gloss": "reward, wage",
  "headword": "أَجْرٌ",
  "headwordGloss": "reward",
  "meaning": "reward/wage/compensation — often spiritual recompense from Allah, sometimes pay",
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
  "id": "dhbb",
  "root": "ذ ه ب",
  "translit": "ḏ-h-b",
  "count": 56,
  "gloss": "going, gold",
  "headword": "ذَهَبَ",
  "headwordGloss": "he went",
  "meaning": "to go/leave/pass away; also ‘gold’ as a noun — context decides motion vs. metal",
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
  "id": "aqll",
  "root": "ع ق ل",
  "translit": "ʿ-q-l",
  "count": 49,
  "gloss": "reason, understanding",
  "headword": "تَعْقِلُونَ",
  "headwordGloss": "you understand",
  "meaning": "to understand/reason; to use the ‘aql’ (mind) — Quran often urges reflection and grasping signs",
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
  "root": "ف ك ر",
  "translit": "f-k-r",
  "count": 18,
  "gloss": "reflection, thought",
  "headword": "يَتَفَكَّرُونَ",
  "headwordGloss": "they reflect",
  "meaning": "to think/reflect/ponder — especially contemplating Allah’s signs and consequences",
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
  "id": "aya",
  "root": "ع ي ن",
  "translit": "ʿ-y-n",
  "count": 65,
  "gloss": "eye, spring",
  "headword": "أَعْيُنِ",
  "headwordGloss": "eyes (of)",
  "meaning": "eye; spring/fountain; watchful care — also ‘essence/that very’ in some contexts via ‘ʿayn’ sense-family",
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
  "id": "ydd",
  "root": "ي د ي",
  "translit": "y-d-y",
  "count": 120,
  "gloss": "hand",
  "headword": "يَدِ",
  "headwordGloss": "hand (of)",
  "meaning": "hand; power/authority; possession — literal and idiomatic (‘in their hands’, ‘Allah’s hand’)",
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
  "id": "qdm",
  "root": "ق د م",
  "translit": "q-d-m",
  "count": 48,
  "gloss": "preceding, advancing, foot",
  "headword": "قَدَّمَتْ",
  "headwordGloss": "it sent ahead",
  "meaning": "to come before/precede; to send forward/put forth — also ‘foot’ and ‘former times’ in set Quranic phrasing",
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
  "id": "blgh",
  "root": "ب ل غ",
  "translit": "b-l-ġ",
  "count": 77,
  "gloss": "reaching, conveying",
  "headword": "بَلَٰغٌ",
  "headwordGloss": "a conveyance",
  "meaning": "to reach, attain; to convey/communicate; to deliver a message fully — context decides",
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
  "id": "wsʿ",
  "root": "و س ع",
  "translit": "w-s-ʿ",
  "count": 32,
  "gloss": "vastness, capacity",
  "headword": "وَٰسِعٌ",
  "headwordGloss": "all-encompassing",
  "meaning": "to be wide/vast; to encompass; capacity and abundance — often of Allah’s knowledge/mercy/provision",
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
  "id": "ʿzz",
  "root": "ع ز ز",
  "translit": "ʿ-z-z",
  "count": 119,
  "gloss": "might, honor (ʿazīz)",
  "headword": "ٱلْعَزِيزُ",
  "headwordGloss": "the Mighty",
  "meaning": "might, invincibility, honor; to be strong/dear; عزّة as power and dignity — often a Divine name",
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
  "id": "hkm",
  "root": "ح ك م",
  "translit": "ḥ-k-m",
  "count": 210,
  "gloss": "judgment, wisdom",
  "headword": "حَكِيمٌ",
  "headwordGloss": "all-wise",
  "meaning": "to judge, decide, govern; wisdom and decisive judgment; firmness/restraint — often of Allah’s decree and wisdom",
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
  "id": "ʿfw",
  "root": "ع ف و",
  "translit": "ʿ-f-w",
  "count": 35,
  "gloss": "pardon",
  "headword": "عَفُوٌّ",
  "headwordGloss": "O Pardoning",
  "meaning": "to pardon, erase, overlook; waiver of blame; also ‘surplus’/extra in giving — Qur’anic range includes forgiving and effacing",
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
  "id": "qdr",
  "root": "ق د ر",
  "translit": "q-d-r",
  "count": 132,
  "gloss": "power, decree, measure",
  "headword": "قَدَرَ",
  "headwordGloss": "he decreed",
  "meaning": "to measure, determine, apportion; power/ability; decree and destiny; precise estimation — context decides",
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
  "id": "shkr",
  "root": "ش ك ر",
  "translit": "š-k-r",
  "count": 75,
  "gloss": "gratitude",
  "headword": "شَكُورٌ",
  "headwordGloss": "Most Appreciative",
  "meaning": "to thank; gratitude shown by acknowledgment and obedience; also ‘appreciating’ (rewarding) good — often of Allah",
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
  "id": "fdl",
  "root": "ف ض ل",
  "translit": "f-ḍ-l",
  "count": 104,
  "gloss": "bounty, favor, preference",
  "headword": "فَضْلِ",
  "headwordGloss": "bounty/favor",
  "meaning": "excess/surplus → favor, bounty, grace, preference/superiority — often God’s فضل upon people, or one’s advantage over another.",
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
  "root": "ن ع م",
  "translit": "n-ʿ-m",
  "count": 144,
  "gloss": "blessing, favor",
  "headword": "نِعْمَةَ",
  "headwordGloss": "favor / blessing",
  "meaning": "to be pleasant/good; نعمة as blessing, favor, benefit; نعيم as bliss — often Allah’s favors and Paradise bliss",
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
  "id": "ḥmd",
  "root": "ح م د",
  "translit": "ḥ-m-d",
  "count": 68,
  "gloss": "praise",
  "headword": "ٱلْحَمْدُ",
  "headwordGloss": "all praise",
  "meaning": "praise and thanks; to commend for perfection; الحمد as comprehensive praise — often directed to Allah",
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
  "id": "sjd",
  "root": "س ج د",
  "translit": "s-j-d",
  "count": 92,
  "gloss": "prostration",
  "headword": "يَسْجُدُونَ",
  "headwordGloss": "they prostrate",
  "meaning": "to prostrate; submit in worship — physical sujūd, humble submission, angelic prostration",
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
  "id": "rk3",
  "root": "ر ك ع",
  "translit": "r-k-ʿ",
  "count": 13,
  "gloss": "bowing",
  "headword": "ٱرْكَعُوا۟",
  "headwordGloss": "bow!",
  "meaning": "to bow; incline — rukūʿ in prayer, humble yielding",
  "family": [
   {
    "word": "ٱرْكَعْ",
    "gloss": "bow!"
   },
   {
    "word": "يَرْكَعُونَ",
    "gloss": "they bow"
   },
   {
    "word": "رُكَّعًا",
    "gloss": "those bowing"
   }
  ],
  "verse": {
   "ref": "77:48",
   "surah": "Sūrat Al-Mursalaat",
   "text": "وَإِذَا قِيلَ لَهُمُ ٱرْكَعُوا۟ لَا يَرْكَعُونَ"
  }
 },
 {
  "id": "zky",
  "root": "ز ك و",
  "translit": "z-k-w",
  "count": 59,
  "gloss": "purification, growth (zakāh)",
  "headword": "ٱلزَّكَوٰةَ",
  "headwordGloss": "the alms (zakāh)",
  "meaning": "to be pure / grow; to purify — zakāh (alms), self-purification, commendation as pure",
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
  "id": "swm",
  "root": "ص و م",
  "translit": "ṣ-w-m",
  "count": 14,
  "gloss": "fasting",
  "headword": "ٱلصِّيَامُ",
  "headwordGloss": "the fasting",
  "meaning": "to refrain/abstain — ṣawm (fasting), vowed abstention, self-restraint",
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
  "id": "hjj",
  "root": "ح ج ج",
  "translit": "ḥ-j-j",
  "count": 33,
  "gloss": "pilgrimage, argument",
  "headword": "ٱلْحَجِّ",
  "headwordGloss": "the pilgrimage",
  "meaning": "to intend/visit; to argue/prove — ḥajj (pilgrimage) and ḥujjah (argument/proof)",
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
  "id": "msk",
  "root": "م س ك",
  "translit": "m-s-k",
  "count": 27,
  "gloss": "holding, grasping",
  "headword": "يُمْسِكُ",
  "headwordGloss": "he holds back",
  "meaning": "to hold/grasp/retain — to withhold, detain, keep (from falling), keep (a spouse)",
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
  "id": "ahl",
  "root": "أ ه ل",
  "translit": "ʾ-h-l",
  "count": 127,
  "gloss": "family, people of",
  "headword": "أَهْلِ",
  "headwordGloss": "people of / family of",
  "meaning": "people, family, household; أهل + X = people of X — أهل الكتاب, أهل البيت, أهل القرى",
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
  "id": "bytt",
  "root": "ب ي ت",
  "translit": "b-y-t",
  "count": 73,
  "gloss": "house",
  "headword": "ٱلْبَيْتِ",
  "headwordGloss": "the House",
  "meaning": "house, dwelling; the House (Kaʿbah) — bayt, buyūt, and references to sacred House",
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
  "id": "mdn",
  "root": "م د ن",
  "translit": "m-d-n",
  "count": 17,
  "gloss": "city",
  "headword": "ٱلْمَدِينَةِ",
  "headwordGloss": "the city",
  "meaning": "city/town; urban settlement — especially al-Madīnah; also مدائن (cities)",
  "family": [
   {
    "word": "مَدِينَةٍ",
    "gloss": "a city"
   },
   {
    "word": "مَدَائِنَ",
    "gloss": "cities"
   },
   {
    "word": "مَدَائِنِ",
    "gloss": "cities (gen.)"
   }
  ],
  "verse": {
   "ref": "15:67",
   "surah": "Sūrat Al-Hijr",
   "text": "وَجَآءَ أَهْلُ ٱلْمَدِينَةِ يَسْتَبْشِرُونَ"
  }
 },
 {
  "id": "qry",
  "root": "ق ر ي",
  "translit": "q-r-y",
  "count": 57,
  "gloss": "town",
  "headword": "ٱلْقَرْيَةِ",
  "headwordGloss": "the town",
  "meaning": "town/settlement — a community (its people) as well as the place; villages/towns destroyed or warned",
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
  "id": "jbl",
  "root": "ج ب ل",
  "translit": "j-b-l",
  "count": 41,
  "gloss": "mountain",
  "headword": "ٱلْجِبَالُ",
  "headwordGloss": "the mountains",
  "meaning": "mountain(s); the great elevated masses of earth/rock — literal mountains, sometimes as cosmic signs",
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
  "root": "ب ح ر",
  "translit": "b-ḥ-r",
  "count": 42,
  "gloss": "sea",
  "headword": "ٱلْبَحْرِ",
  "headwordGloss": "the sea",
  "meaning": "sea; large body of water — sea/ocean, sometimes any great expanse of water",
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
  "id": "shms",
  "root": "ش م س",
  "translit": "š-m-s",
  "count": 33,
  "gloss": "sun",
  "headword": "ٱلشَّمْسُ",
  "headwordGloss": "the sun",
  "meaning": "sun — the sun as a created sign; also appears in oath/cosmic contexts",
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
  "root": "ق م ر",
  "translit": "q-m-r",
  "count": 27,
  "gloss": "moon",
  "headword": "ٱلْقَمَرَ",
  "headwordGloss": "the moon",
  "meaning": "moon — the lunar body; also appears in oaths/signs with sun/stars and in cosmic imagery.",
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
  "root": "ن ج م",
  "translit": "n-j-m",
  "count": 13,
  "gloss": "star",
  "headword": "ٱلنَّجْمِ",
  "headwordGloss": "the star",
  "meaning": "star(s) — stars as celestial signs; also in oath imagery",
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
  "id": "lyl",
  "root": "ل ي ل",
  "translit": "l-y-l",
  "count": 92,
  "gloss": "night",
  "headword": "ٱلَّيْلِ",
  "headwordGloss": "the night",
  "meaning": "night — the time of darkness; often contrasted with day in signs and rhythms of life",
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
  "id": "nhr",
  "root": "ن ه ر",
  "translit": "n-h-r",
  "count": 113,
  "gloss": "river, daytime",
  "headword": "ٱلنَّهَارِ",
  "headwordGloss": "the daytime",
  "meaning": "daytime (as opposed to night); also ‘river’ in a few contexts — context decides which",
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
  "id": "ma",
  "root": "م و ه",
  "translit": "m-w-h",
  "count": 63,
  "gloss": "water",
  "headword": "ٱلْمَآءِ",
  "headwordGloss": "the water",
  "meaning": "water — water as life-source, rain/streams, and imagery for purity and sustenance",
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
  "id": "trb",
  "root": "ت ر ب",
  "translit": "t-r-b",
  "count": 22,
  "gloss": "dust, earth",
  "headword": "تُرَابًا",
  "headwordGloss": "dust/earth",
  "meaning": "dust; earth/soil — humble origin and return-to-earth imagery",
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
  "id": "tyn",
  "root": "ط ي ن",
  "translit": "ṭ-y-n",
  "count": 12,
  "gloss": "clay",
  "headword": "طِينٍ",
  "headwordGloss": "clay",
  "meaning": "clay; mud — human creation material imagery (clay, sticky clay, molded clay) across contexts",
  "family": [
   {
    "word": "طِينًا",
    "gloss": "clay"
   },
   {
    "word": "مِن طِينٍ",
    "gloss": "from clay"
   },
   {
    "word": "ٱلطِّينِ",
    "gloss": "the clay"
   },
   {
    "word": "طِينٍ لَّازِبٍ",
    "gloss": "sticky clay"
   }
  ],
  "verse": {
   "ref": "26:210",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "وَمَا تَنَزَّلَتْ بِهِ ٱلشَّيَٰطِينُ"
  }
 },
 {
  "id": "rwh",
  "root": "ر و ح",
  "translit": "r-w-ḥ",
  "count": 57,
  "gloss": "spirit, rest",
  "headword": "رُوحٌ",
  "headwordGloss": "spirit",
  "meaning": "spirit/breath; divine spirit/revelatory spirit; mercy/relief — context decides which",
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
  "id": "ʿrf",
  "root": "ع ر ف",
  "translit": "ʿ-r-f",
  "count": 70,
  "gloss": "knowing, recognition",
  "headword": "يَعْلَمُونَ",
  "headwordGloss": "they know",
  "meaning": "knowing/recognising; being acquainted/identifying; acknowledging — context decides which",
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
  "id": "fhm",
  "root": "ف ه م",
  "translit": "f-h-m",
  "count": 1,
  "gloss": "understanding",
  "headword": "فَفَهَّمْنَٰهَا",
  "headwordGloss": "We gave understanding of it",
  "meaning": "understanding/comprehension; being made to grasp a matter (Quranic: God granting understanding)",
  "family": [],
  "verse": {
   "ref": "21:79",
   "surah": "Sūrat Al-Anbiyaa",
   "text": "فَفَهَّمْنَٰهَا سُلَيْمَٰنَ ۚ وَكُلًّا ءَاتَيْنَا حُكْمًۭا وَعِلْمًۭا ۚ وَسَخَّرْنَا مَعَ دَاوُۥدَ ٱلْجِبَالَ يُسَبِّحْنَ وَٱلطَّيْرَ ۚ وَكُنَّا فَٰعِلِينَ"
  }
 },
 {
  "id": "ʿlw",
  "root": "ع ل و",
  "translit": "ʿ-l-w",
  "count": 70,
  "gloss": "height, exaltation",
  "headword": "ٱلْعَلِيُّ",
  "headwordGloss": "the Most High",
  "meaning": "height/exaltation; rising above; high rank/pride — context decides which",
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
  "id": "kbr",
  "root": "ك ب ر",
  "translit": "k-b-r",
  "count": 161,
  "gloss": "greatness",
  "headword": "كَبِيرٌ",
  "headwordGloss": "great",
  "meaning": "greatness/bigness; seniority/old age; arrogance/importance — context decides which",
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
  "id": "sghr",
  "root": "ص غ ر",
  "translit": "ṣ-ġ-r",
  "count": 13,
  "gloss": "smallness",
  "headword": "صَغِيرٌ",
  "headwordGloss": "small",
  "meaning": "smallness/littleness; being humbled/subdued — context decides which",
  "family": [
   {
    "word": "صَغِيرًا",
    "gloss": "small (acc.)"
   },
   {
    "word": "صِغَارٌ",
    "gloss": "humiliation"
   }
  ],
  "verse": {
   "ref": "54:53",
   "surah": "Sūrat Al-Qamar",
   "text": "وَكُلُّ صَغِيرٍۢ وَكَبِيرٍۢ مُّسْتَطَرٌ"
  }
 },
 {
  "id": "kthr",
  "root": "ك ث ر",
  "translit": "k-ṯ-r",
  "count": 167,
  "gloss": "abundance",
  "headword": "كَثِيرٌ",
  "headwordGloss": "many/much",
  "meaning": "abundance/multiplicity; being numerous; increase — context decides which",
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
  "id": "qll",
  "root": "ق ل ل",
  "translit": "q-l-l",
  "count": 76,
  "gloss": "fewness",
  "headword": "قَلِيلٌ",
  "headwordGloss": "few/little",
  "meaning": "fewness/scarcity; little time/amount; reducing — context decides which",
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
  "id": "ʿzm",
  "root": "ع ظ م",
  "translit": "ʿ-ẓ-m",
  "count": 128,
  "gloss": "greatness, magnificence",
  "headword": "عَظِيمٌ",
  "headwordGloss": "tremendous",
  "meaning": "greatness/magnificence; enormity/seriousness; mighty status — context decides which",
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
  "id": "krm",
  "root": "ك ر م",
  "translit": "k-r-m",
  "count": 47,
  "gloss": "nobility, generosity",
  "headword": "كَرِيمٌ",
  "headwordGloss": "noble/generous",
  "meaning": "nobility/honour; generosity; valuable/precious — context decides which",
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
  "id": "brk",
  "root": "ب ر ك",
  "translit": "b-r-k",
  "count": 32,
  "gloss": "blessing",
  "headword": "مُبَارَكٌ",
  "headwordGloss": "blessed",
  "meaning": "blessing; being endowed with الخير/بركة — blessed persons, places, times, or revelations",
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
  "id": "kdhb",
  "root": "ك ذ ب",
  "translit": "k-ḏ-b",
  "count": 282,
  "gloss": "lying, denying as false",
  "headword": "كَذَّبُوا۟",
  "headwordGloss": "they denied",
  "meaning": "to lie/deny as false; to treat as untrue — rejecting signs, messengers, or the truth",
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
  "id": "nba",
  "root": "ن ب أ",
  "translit": "n-b-ʾ",
  "count": 160,
  "gloss": "news, tidings, prophethood",
  "headword": "نَبَإٍ",
  "headwordGloss": "news/tidings",
  "meaning": "news of weight; tidings — information, major reports, revelation-related news",
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
  "id": "ndhr",
  "root": "ن ذ ر",
  "translit": "n-ḏ-r",
  "count": 130,
  "gloss": "warning, a vow",
  "headword": "نَذِيرٌ",
  "headwordGloss": "a warner",
  "meaning": "warning/forewarning; also a vowed dedication — giving notice of danger or divine accountability",
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
  "id": "sal",
  "root": "س أ ل",
  "translit": "s-ʾ-l",
  "count": 129,
  "gloss": "asking, questioning",
  "headword": "سَأَلُوا۟",
  "headwordGloss": "they asked",
  "meaning": "asking/questioning; requesting — asking people or asking God; inquiry or demand",
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
  "id": "bshr",
  "root": "ب ش ر",
  "translit": "b-š-r",
  "count": 123,
  "gloss": "good news, a human being",
  "headword": "بَشِيرٌ",
  "headwordGloss": "a bringer of good news",
  "meaning": "good news/glad tidings; also human (mortal) — announcing good; بشر as human nature",
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
  "id": "qra",
  "root": "ق ر أ",
  "translit": "q-r-ʾ",
  "count": 88,
  "gloss": "reading, reciting (Qurʾān)",
  "headword": "ٱلْقُرْءَانِ",
  "headwordGloss": "the Qur’an",
  "meaning": "to read/recite; recitation — the Qur’an itself and the act of reciting/reading aloud",
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
  "id": "klm",
  "root": "ك ل م",
  "translit": "k-l-m",
  "count": 75,
  "gloss": "word, speech",
  "headword": "كَلِمَٰتِ",
  "headwordGloss": "words",
  "meaning": "word/speech; utterance — God’s words/decrees, statements, promises, or commands",
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
  "id": "tlw",
  "root": "ت ل و",
  "translit": "t-l-w",
  "count": 63,
  "gloss": "reciting, following after",
  "headword": "يَتْلُونَ",
  "headwordGloss": "they recite",
  "meaning": "to recite/read out; to follow after — reciting revelation and also following closely",
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
  "id": "fry",
  "root": "ف ر ي",
  "translit": "f-r-y",
  "count": 60,
  "gloss": "fabricating a lie",
  "headword": "يَفْتَرُونَ",
  "headwordGloss": "they fabricate",
  "meaning": "to fabricate/forge (esp. a lie) — inventing false claims, often ‘against Allah’",
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
  "id": "jwb",
  "root": "ج و ب",
  "translit": "j-w-b",
  "count": 43,
  "gloss": "answering, responding",
  "headword": "أَجِبْ",
  "headwordGloss": "answer!",
  "meaning": "to answer/respond; to comply or give a reply — context decides which",
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
  "id": "fsl",
  "root": "ف ص ل",
  "translit": "f-ṣ-l",
  "count": 43,
  "gloss": "separating, setting out in detail",
  "headword": "فَصَّلْنَا",
  "headwordGloss": "We detailed",
  "meaning": "to separate/distinguish; to set out clearly in detail; decisive judgment — context decides which",
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
  "id": "ndy",
  "root": "ن د ي",
  "translit": "n-d-y",
  "count": 52,
  "gloss": "calling out",
  "headword": "يُنَادِى",
  "headwordGloss": "he calls out",
  "meaning": "to call/cry out; to summon or address; a call made publicly — context decides which",
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
  "id": "wʿz",
  "root": "و ع ظ",
  "translit": "w-ʿ-ẓ",
  "count": 25,
  "gloss": "admonition, counsel",
  "headword": "مَوْعِظَةٌ",
  "headwordGloss": "an admonition",
  "meaning": "admonition/counsel; moral warning; heart-softening reminder — context decides which",
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
  "id": "lsn",
  "root": "ل س ن",
  "translit": "l-s-n",
  "count": 25,
  "gloss": "tongue, language",
  "headword": "لِسَانٌ",
  "headwordGloss": "tongue",
  "meaning": "tongue; speech; language/dialect; eloquent expression — context decides which",
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
  "id": "qss",
  "root": "ق ص ص",
  "translit": "q-ṣ-ṣ",
  "count": 30,
  "gloss": "narrating, a story",
  "headword": "قَصَصِ",
  "headwordGloss": "narrative(s)",
  "meaning": "to relate/track closely; a narrative or account; story with lessons — context decides which",
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
  "id": "ktm",
  "root": "ك ت م",
  "translit": "k-t-m",
  "count": 21,
  "gloss": "concealing, hiding",
  "headword": "تَكْتُمُوا۟",
  "headwordGloss": "you conceal",
  "meaning": "to conceal/keep back; to hide testimony or truth; to suppress — context decides which",
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
  "id": "ntq",
  "root": "ن ط ق",
  "translit": "n-ṭ-q",
  "count": 12,
  "gloss": "speaking, uttering",
  "headword": "يَنطِقُ",
  "headwordGloss": "he speaks",
  "meaning": "to speak/utter; to make something articulate; to testify verbally — context decides which",
  "family": [
   {
    "word": "يَنطِقُونَ",
    "gloss": "they speak"
   },
   {
    "word": "مَنطِقِ",
    "gloss": "speech/utterance"
   }
  ],
  "verse": {
   "ref": "77:35",
   "surah": "Sūrat Al-Mursalaat",
   "text": "هَٰذَا يَوْمُ لَا يَنطِقُونَ"
  }
 },
 {
  "id": "syh",
  "root": "ص ي ح",
  "translit": "ṣ-y-ḥ",
  "count": 14,
  "gloss": "a cry, a blast",
  "headword": "ٱلصَّيْحَةُ",
  "headwordGloss": "the Cry/Blast",
  "meaning": "a loud cry/blast; the punishing shout; a sudden overwhelming sound — context decides which",
  "family": [
   {
    "word": "صَيْحَةٌ",
    "gloss": "a cry/blast"
   },
   {
    "word": "صَيْحَةً",
    "gloss": "a cry/blast (acc.)"
   },
   {
    "word": "صَٰعِقَةٌ",
    "gloss": "thunderbolt/blast"
   },
   {
    "word": "صَٰعِقَةً",
    "gloss": "a thunderbolt/blast (acc.)"
   }
  ],
  "verse": {
   "ref": "15:73",
   "surah": "Sūrat Al-Hijr",
   "text": "فَأَخَذَتْهُمُ ٱلصَّيْحَةُ مُشْرِقِينَ"
  }
 },
 {
  "id": "shrh",
  "root": "ش ر ح",
  "translit": "š-r-ḥ",
  "count": 5,
  "gloss": "expanding, explaining",
  "headword": "شَرَحَ",
  "headwordGloss": "he expanded; opened",
  "meaning": "to open/expand (esp. the chest/heart); to explain/clarify — often guidance vs. constriction",
  "family": [
   {
    "word": "يَشْرَحْ",
    "gloss": "He expands/opens"
   },
   {
    "word": "نَشْرَحْ",
    "gloss": "We expand/ open"
   },
   {
    "word": "ٱشْرَحْ",
    "gloss": "expand/open!"
   }
  ],
  "verse": {
   "ref": "20:25",
   "surah": "Sūrat Taa-Haa",
   "text": "قَالَ رَبِّ ٱشْرَحْ لِى صَدْرِى"
  }
 },
 {
  "id": "byn",
  "root": "ب ي ن",
  "translit": "b-y-n",
  "count": 523,
  "gloss": "between, making clear",
  "headword": "بَيْنَ",
  "headwordGloss": "between",
  "meaning": "between/in the midst; separation; making clear, clarifying, manifest — context decides.",
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
  "id": "hsb",
  "root": "ح س ب",
  "translit": "ḥ-s-b",
  "count": 109,
  "gloss": "reckoning, supposing",
  "headword": "يَحْسَبُ",
  "headwordGloss": "he thinks",
  "meaning": "to reckon/count; to suppose/assume; to deem sufficient — senses overlap by context.",
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
  "id": "frq",
  "root": "ف ر ق",
  "translit": "f-r-q",
  "count": 72,
  "gloss": "separating, distinguishing",
  "headword": "ٱلْفُرْقَانِ",
  "headwordGloss": "the Criterion",
  "meaning": "separation/distinguishing; decisive criterion; division — used for truth-vs-falsehood and splitting apart.",
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
  "id": "ʿdd",
  "root": "ع د د",
  "translit": "ʿ-d-d",
  "count": 57,
  "gloss": "number, counting",
  "headword": "عَدَدَ",
  "headwordGloss": "a number",
  "meaning": "number; counting/enumerating; a counted set — often for limited days/years or specified totals.",
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
  "id": "ʿdl",
  "root": "ع د ل",
  "translit": "ʿ-d-l",
  "count": 28,
  "gloss": "justice, balance",
  "headword": "ٱلْعَدْلَ",
  "headwordGloss": "justice",
  "meaning": "justice, fairness, balance; to be even/straight; to set as equal or as an equivalent — legal and moral senses.",
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
  "id": "qst",
  "root": "ق س ط",
  "translit": "q-s-ṭ",
  "count": 25,
  "gloss": "equity, fair dealing",
  "headword": "ٱلْقِسْطِ",
  "headwordGloss": "equity",
  "meaning": "equity/just measure; fairness in judgment and dealings; (also) to act unjustly in a different pattern — Qur’an contrasts forms by context.",
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
  "id": "wzn",
  "root": "و ز ن",
  "translit": "w-z-n",
  "count": 23,
  "gloss": "weighing, the balance",
  "headword": "ٱلْمِيزَانَ",
  "headwordGloss": "the balance",
  "meaning": "weighing and measure; the balance/scale; due measure and justice — physical and moral reckoning contexts.",
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
  "id": "kyl",
  "root": "ك ي ل",
  "translit": "k-y-l",
  "count": 16,
  "gloss": "measuring out",
  "headword": "ٱلْكَيْلَ",
  "headwordGloss": "the measure",
  "meaning": "measuring out (dry measure); giving full measure; quantity/measure — often in commercial fairness passages.",
  "family": [
   {
    "word": "ٱلْكَيْلَ وَٱلْمِيزَانَ",
    "gloss": "measure and balance"
   },
   {
    "word": "كَيْلًا",
    "gloss": "as a measure"
   },
   {
    "word": "كِلْتُ",
    "gloss": "I measured"
   },
   {
    "word": "مِكْيَالٌ",
    "gloss": "measuring vessel"
   }
  ],
  "verse": {
   "ref": "26:181",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "۞ أَوْفُوا۟ ٱلْكَيْلَ وَلَا تَكُونُوا۟ مِنَ ٱلْمُخْسِرِينَ"
  }
 },
 {
  "id": "hdd",
  "root": "ح د د",
  "translit": "ḥ-d-d",
  "count": 25,
  "gloss": "a limit, iron",
  "headword": "حَدِيدٌ",
  "headwordGloss": "iron",
  "meaning": "sharpness/edge and limit; (also) iron/metal; boundary-lines in law ('limits') are expressed with related forms.",
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
  "id": "nqs",
  "root": "ن ق ص",
  "translit": "n-q-ṣ",
  "count": 10,
  "gloss": "decreasing, diminishing",
  "headword": "يَنقُصُ",
  "headwordGloss": "it decreases",
  "meaning": "to diminish/lessen; reduction in quantity, reward, or provision; being made deficient — context decides.",
  "family": [
   {
    "word": "نَقَصَ",
    "gloss": "it decreased"
   },
   {
    "word": "نَنقُصُ",
    "gloss": "We decrease"
   },
   {
    "word": "لَا يَنقُصُ",
    "gloss": "it does not decrease"
   },
   {
    "word": "نَقْصٍ",
    "gloss": "loss; diminution"
   }
  ],
  "verse": {
   "ref": "9:4",
   "surah": "Sūrat At-Tawba",
   "text": "إِلَّا ٱلَّذِينَ عَٰهَدتُّم مِّنَ ٱلْمُشْرِكِينَ ثُمَّ لَمْ يَنقُصُوكُمْ شَيْـًۭٔا وَلَمْ يُظَٰهِرُوا۟ عَلَيْكُمْ أَحَدًۭا فَأَتِمُّوٓا۟ إِلَيْهِمْ عَهْدَهُمْ إِلَىٰ مُدَّتِهِمْ ۚ إِنَّ ٱللَّهَ يُحِبُّ ٱلْمُتَّقِينَ"
  }
 },
 {
  "id": "zyd",
  "root": "ز ي د",
  "translit": "z-y-d",
  "count": 61,
  "gloss": "increasing, more",
  "headword": "زَادَ",
  "headwordGloss": "he increased",
  "meaning": "to increase; add; grow; augment — in faith, punishment, provision, numbers, etc.",
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
  "id": "tmm",
  "root": "ت م م",
  "translit": "t-m-m",
  "count": 22,
  "gloss": "completing, fulfilling",
  "headword": "تَمَامًا",
  "headwordGloss": "fully; completely",
  "meaning": "to be complete; to complete; to fulfill fully — finishing, perfecting, completing a term/blessing/word.",
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
  "id": "kml",
  "root": "ك م ل",
  "translit": "k-m-l",
  "count": 5,
  "gloss": "perfection, wholeness",
  "headword": "أَكْمَلْتُ",
  "headwordGloss": "I have perfected",
  "meaning": "to be whole/complete; to perfect — completing to full measure, perfection of religion/favor, etc.",
  "family": [
   {
    "word": "أَكْمَلْتُ لَكُمْ",
    "gloss": "I perfected for you"
   },
   {
    "word": "كَمُلَ",
    "gloss": "it became complete"
   }
  ],
  "verse": {
   "ref": "5:3",
   "surah": "Sūrat Al-Maaida",
   "text": "حُرِّمَتْ عَلَيْكُمُ ٱلْمَيْتَةُ وَٱلدَّمُ وَلَحْمُ ٱلْخِنزِيرِ وَمَآ أُهِلَّ لِغَيْرِ ٱللَّهِ بِهِۦ وَٱلْمُنْخَنِقَةُ وَٱلْمَوْقُوذَةُ وَٱلْمُتَرَدِّيَةُ وَٱلنَّطِيحَةُ وَمَآ أَكَلَ ٱلسَّبُعُ إِلَّا مَا ذَكَّيْتُمْ وَمَا ذُبِحَ عَلَى ٱلنُّصُبِ وَأَن تَسْتَقْسِمُوا۟ بِٱلْأَزْلَٰمِ ۚ ذَٰلِكُمْ فِسْقٌ ۗ ٱلْيَوْمَ يَئِسَ ٱلَّذِينَ كَفَرُوا۟ مِن دِينِكُمْ فَلَا تَخْشَوْهُمْ وَٱخْشَوْنِ ۚ ٱلْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِى وَرَضِيتُ لَكُمُ ٱلْإِسْلَٰمَ دِينًۭا ۚ فَمَنِ ٱضْطُرَّ فِى مَخْمَصَةٍ غَيْرَ مُتَجَانِفٍۢ لِّإِثْمٍۢ ۙ فَإِنَّ ٱللَّهَ غَفُورٌۭ رَّحِيمٌۭ"
  }
 },
 {
  "id": "thbt",
  "root": "ث ب ت",
  "translit": "ṯ-b-t",
  "count": 18,
  "gloss": "firmness, standing fast",
  "headword": "ثَبِّتْ",
  "headwordGloss": "make firm!",
  "meaning": "to be firm; make firm; stand fast — stability in faith/heart/feet; confirmation and strengthening.",
  "family": [
   {
    "word": "يُثَبِّتُ",
    "gloss": "He makes firm"
   },
   {
    "word": "ٱثْبُتُوا۟",
    "gloss": "stand firm!"
   },
   {
    "word": "ثَابِتٌ",
    "gloss": "firm; ثابت"
   }
  ],
  "verse": {
   "ref": "13:39",
   "surah": "Sūrat Ar-Ra'd",
   "text": "يَمْحُوا۟ ٱللَّهُ مَا يَشَآءُ وَيُثْبِتُ ۖ وَعِندَهُۥٓ أُمُّ ٱلْكِتَٰبِ"
  }
 },
 {
  "id": "swa",
  "root": "س و أ",
  "translit": "s-w-ʾ",
  "count": 167,
  "gloss": "evil, harm",
  "headword": "سُوٓءٌ",
  "headwordGloss": "evil; harm",
  "meaning": "evil; badness; harm; سوء — moral evil, misfortune, punishment, ugliness of deeds/assumptions.",
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
  "id": "slh",
  "root": "ص ل ح",
  "translit": "ṣ-l-ḥ",
  "count": 180,
  "gloss": "righteousness, putting right",
  "headword": "ٱلصَّٰلِحَٰتِ",
  "headwordGloss": "righteous deeds",
  "meaning": "to be sound/righteous; to set right; صالح — good, rectitude, reconciliation, repair; deeds and people that are right.",
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
  "root": "ف س د",
  "translit": "f-s-d",
  "count": 50,
  "gloss": "corruption, spoiling",
  "headword": "ٱلْفَسَادُ",
  "headwordGloss": "corruption",
  "meaning": "to be corrupt/spoiled; to corrupt — فساد in land/society, wrongdoing, disorder, moral decay.",
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
  "id": "twʿ",
  "root": "ط و ع",
  "translit": "ṭ-w-ʿ",
  "count": 129,
  "gloss": "obedience, willingness",
  "headword": "أَطِيعُوا۟",
  "headwordGloss": "obey!",
  "meaning": "to obey; comply willingly; be pliant — طاعة of Allah/His Messenger; willing compliance vs reluctance.",
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
  "id": "ʿsy",
  "root": "ع ص ي",
  "translit": "ʿ-ṣ-y",
  "count": 33,
  "gloss": "disobedience",
  "headword": "عَصَىٰ",
  "headwordGloss": "he disobeyed",
  "meaning": "to disobey; rebel — عصيان against Allah/command; refusal to comply.",
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
  "id": "dhnb",
  "root": "ذ ن ب",
  "translit": "ḏ-n-b",
  "count": 39,
  "gloss": "sin, offence",
  "headword": "ذُنُوبِهِمْ",
  "headwordGloss": "their sins",
  "meaning": "sin; offence; جرم — ذنب as wrongdoing and its consequence; forgiveness/punishment tied to it.",
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
  "id": "hrm",
  "root": "ح ر م",
  "translit": "ḥ-r-m",
  "count": 83,
  "gloss": "sacred, forbidden",
  "headword": "ٱلْحَرَامِ",
  "headwordGloss": "the sacred/forbidden",
  "meaning": "sacred and inviolable; forbidden/prohibited; consecrated precincts/things—context decides",
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
  "root": "ح ل ل",
  "translit": "ḥ-l-l",
  "count": 51,
  "gloss": "lawful, alighting",
  "headword": "أُحِلَّ",
  "headwordGloss": "it was made lawful",
  "meaning": "to be lawful/allowed; to untie/unbind; to alight/settle—Qur’anic usage often ‘made lawful’ vs ‘forbidden’",
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
  "id": "thr",
  "root": "ط ه ر",
  "translit": "ṭ-h-r",
  "count": 31,
  "gloss": "purity, cleansing",
  "headword": "طَهِّرْ",
  "headwordGloss": "purify! (command)",
  "meaning": "purity/cleansing; being clean (physically/ritually) and purified (morally/spiritually)—both senses occur",
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
  "id": "tyb",
  "root": "ط ي ب",
  "translit": "ṭ-y-b",
  "count": 50,
  "gloss": "good, wholesome, pure",
  "headword": "طَيِّبًا",
  "headwordGloss": "good/wholesome",
  "meaning": "good, wholesome, pleasant, pure; also ‘goodly’ provision or ‘good word’—context decides",
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
  "root": "خ ب ث",
  "translit": "ḫ-b-ṯ",
  "count": 16,
  "gloss": "foul, impure",
  "headword": "ٱلْخَبِيثَ",
  "headwordGloss": "the foul/impure",
  "meaning": "foul, filthy, bad, impure; applied to things, wealth, words, persons—contrast with ṭayyib",
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
  "id": "bghy",
  "root": "ب غ ي",
  "translit": "b-ġ-y",
  "count": 96,
  "gloss": "seeking, transgressing",
  "headword": "بِغَيْرِ",
  "headwordGloss": "without; other than",
  "meaning": "to seek/desire; to transgress/act tyrannically; to go beyond due bounds—Qur’an uses both ‘seeking’ and ‘rebellious excess’",
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
  "id": "ʿdw",
  "root": "ع د و",
  "translit": "ʿ-d-w",
  "count": 106,
  "gloss": "enmity, overstepping",
  "headword": "عَدُوٌّ",
  "headwordGloss": "enemy",
  "meaning": "enmity; an enemy; to exceed/overstep—often ‘enemy’ (person/group) or ‘in hostility’",
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
  "id": "ksb",
  "root": "ك س ب",
  "translit": "k-s-b",
  "count": 67,
  "gloss": "earning what you have done",
  "headword": "يَكْسِبُونَ",
  "headwordGloss": "they earn",
  "meaning": "to earn/acquire; what one has earned (deeds, guilt, merit, wealth)—often moral responsibility for one’s actions",
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
  "id": "ʿqb",
  "root": "ع ق ب",
  "translit": "ʿ-q-b",
  "count": 80,
  "gloss": "consequence, the end of a matter",
  "headword": "عُقْبَىٰ",
  "headwordGloss": "good end; final abode",
  "meaning": "to come after; consequence/end result — outcome in this life or the next, often moral consequence.",
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
  "id": "thwb",
  "root": "ث و ب",
  "translit": "ṯ-w-b",
  "count": 28,
  "gloss": "reward, a garment",
  "headword": "ثَوَابٌ",
  "headwordGloss": "reward",
  "meaning": "reward/recompense; returning/coming back; also ‘garment’ (thawb)—Qur’an uses reward most, garment also occurs",
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
  "id": "hlk",
  "root": "ه ل ك",
  "translit": "h-l-k",
  "count": 68,
  "gloss": "destruction, perishing",
  "headword": "هَلَكَ",
  "headwordGloss": "he perished",
  "meaning": "to perish, be destroyed; ruin, annihilation; causing destruction — context decides agent/patient",
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
  "id": "njw",
  "root": "ن ج و",
  "translit": "n-j-w",
  "count": 84,
  "gloss": "deliverance, being saved",
  "headword": "نَجَّيْنَا",
  "headwordGloss": "We saved",
  "meaning": "to rescue, deliver, be saved; escape; also private counsel/secret talk (najwā) — context decides",
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
  "id": "dyn",
  "root": "د ي ن",
  "translit": "d-y-n",
  "count": 101,
  "gloss": "religion, judgement, debt",
  "headword": "ٱلدِّينِ",
  "headwordGloss": "the religion/judgement",
  "meaning": "dīn: religion/way of life; judgement/reckoning; obligation/debt — context decides",
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
  "id": "sabbah",
  "root": "س ب ح",
  "translit": "s-b-ḥ",
  "count": 92,
  "gloss": "glorifying, declaring free of fault",
  "headword": "سَبِّحْ",
  "headwordGloss": "glorify!",
  "meaning": "to declare (Allah) free of any fault; glorify/exalt; tasbīḥ in worship — context decides",
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
  "id": "nfq",
  "root": "ن ف ق",
  "translit": "n-f-q",
  "count": 111,
  "gloss": "spending, and hypocrisy",
  "headword": "يُنفِقُونَ",
  "headwordGloss": "they spend",
  "meaning": "to spend (for Allah), expend; nafaqa (spending) and nifāq (hypocrisy) are both Quranic branches — context decides",
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
  "id": "ʿhd",
  "root": "ع ه د",
  "translit": "ʿ-h-d",
  "count": 46,
  "gloss": "covenant, pledge",
  "headword": "عَهْدِ",
  "headwordGloss": "covenant/pledge",
  "meaning": "a covenant, pledge, commitment; to عهد = to entrust/charge, make a binding promise — context decides",
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
  "id": "shtn",
  "root": "ش ط ن",
  "translit": "š-ṭ-n",
  "count": 88,
  "gloss": "Satan, the one who is far",
  "headword": "ٱلشَّيْطَٰنِ",
  "headwordGloss": "the Devil",
  "meaning": "shayṭān: satan/devil; rebellious, far-removed from good; can be human or jinn — context decides",
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
  "id": "mll",
  "root": "م ل ل",
  "translit": "m-l-l",
  "count": 15,
  "gloss": "creed, way of a community",
  "headword": "مِلَّةَ",
  "headwordGloss": "creed/way",
  "meaning": "a community’s creed, religious way/tradition (esp. “millat Ibrāhīm”) — context decides",
  "family": [
   {
    "word": "مِلَّتَهُمْ",
    "gloss": "their creed/way"
   },
   {
    "word": "مِلَّةَ إِبْرَٰهِيمَ",
    "gloss": "the way of Abraham"
   }
  ],
  "verse": {
   "ref": "47:8",
   "surah": "Sūrat Muhammad",
   "text": "وَٱلَّذِينَ كَفَرُوا۟ فَتَعْسًۭا لَّهُمْ وَأَضَلَّ أَعْمَٰلَهُمْ"
  }
 },
 {
  "id": "hnf",
  "root": "ح ن ف",
  "translit": "ḥ-n-f",
  "count": 12,
  "gloss": "upright, inclining to truth",
  "headword": "حَنِيفًا",
  "headwordGloss": "upright; true",
  "meaning": "ḥanīf: inclining away from shirk to pure truth; upright monotheist — context decides",
  "family": [
   {
    "word": "حُنَفَآءَ",
    "gloss": "upright ones (pl.)"
   },
   {
    "word": "حَنِيفًا مُّسْلِمًا",
    "gloss": "upright, submitting"
   },
   {
    "word": "حَنِيفًا وَمَا",
    "gloss": "upright; and not..."
   }
  ],
  "verse": {
   "ref": "10:105",
   "surah": "Sūrat Yunus",
   "text": "وَأَنْ أَقِمْ وَجْهَكَ لِلدِّينِ حَنِيفًۭا وَلَا تَكُونَنَّ مِنَ ٱلْمُشْرِكِينَ"
  }
 },
 {
  "id": "jhd",
  "root": "ج ه د",
  "translit": "j-h-d",
  "count": 41,
  "gloss": "striving, exerting effort",
  "headword": "جَٰهِدُوا۟",
  "headwordGloss": "strive!",
  "meaning": "to strive/exert effort; struggle (often “in the path of Allah”); also to press/urge strongly — context decides",
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
  "id": "khld",
  "root": "خ ل د",
  "translit": "ḫ-l-d",
  "count": 87,
  "gloss": "abiding forever",
  "headword": "خَٰلِدِينَ",
  "headwordGloss": "abiding forever",
  "meaning": "to remain/last; to abide permanently — eternal stay, especially in Paradise or Hell",
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
  "id": "abad",
  "root": "أ ب د",
  "translit": "ʾ-b-d",
  "count": 28,
  "gloss": "forever, endlessly",
  "headword": "أَبَدًا",
  "headwordGloss": "ever; never (with neg.)",
  "meaning": "endless time; forever — often with negation meaning “never ever”",
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
  "id": "hshr",
  "root": "ح ش ر",
  "translit": "ḥ-š-r",
  "count": 43,
  "gloss": "gathering for judgement",
  "headword": "يُحْشَرُونَ",
  "headwordGloss": "they will be gathered",
  "meaning": "to gather/muster/drive together — gathering for judgment, mustering crowds",
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
  "id": "nshr",
  "root": "ن ش ر",
  "translit": "n-š-r",
  "count": 24,
  "gloss": "spreading out, resurrection",
  "headword": "نُشِرَتْ",
  "headwordGloss": "are spread out",
  "meaning": "to spread/unfold; to raise from the dead — unfolding (e.g., pages) and resurrection",
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
  "id": "ʿwd",
  "root": "ع و د",
  "translit": "ʿ-w-d",
  "count": 65,
  "gloss": "returning to, repeating",
  "headword": "تَعُودُونَ",
  "headwordGloss": "you return",
  "meaning": "to return/go back; to repeat — returning to a state, reverting, coming back again",
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
  "id": "bda",
  "root": "ب د أ",
  "translit": "b-d-ʾ",
  "count": 35,
  "gloss": "beginning, originating",
  "headword": "بَدَأَ",
  "headwordGloss": "He began",
  "meaning": "to begin/originate — initiating creation, starting a matter from nothing",
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
  "id": "bqy",
  "root": "ب ق ي",
  "translit": "b-q-y",
  "count": 23,
  "gloss": "remaining, lasting",
  "headword": "بَاقٍ",
  "headwordGloss": "remaining",
  "meaning": "to remain/last/endure — what stays after others pass; lasting reward or reality",
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
  "id": "fny",
  "root": "ف ن ي",
  "translit": "f-n-y",
  "count": 2,
  "gloss": "passing away",
  "headword": "فَانٍ",
  "headwordGloss": "perishing; passing away",
  "meaning": "to pass away/come to an end — perishing and fading of what is not eternal",
  "family": [],
  "verse": {
   "ref": "94:7",
   "surah": "Sūrat Ash-Sharh",
   "text": "فَإِذَا فَرَغْتَ فَٱنصَبْ"
  }
 },
 {
  "id": "bny",
  "root": "ب ن ي",
  "translit": "b-n-y",
  "count": 184,
  "gloss": "son, and building",
  "headword": "بَنِىٓ",
  "headwordGloss": "sons/children of",
  "meaning": "sons/offspring; also to build/construct — lineage formulas and building imagery",
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
  "id": "amm",
  "root": "أ م م",
  "translit": "ʾ-m-m",
  "count": 119,
  "gloss": "mother, community, leader",
  "headword": "أُمَّةً",
  "headwordGloss": "a community",
  "meaning": "mother/source; community/nation; leader/exemplar; also “toward/aim” in some derivatives — context decides",
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
  "id": "abw",
  "root": "أ ب و",
  "translit": "ʾ-b-w",
  "count": 117,
  "gloss": "father",
  "headword": "أَبِيهِ",
  "headwordGloss": "his father",
  "meaning": "father/parent; forefather/ancestor — literal or lineage context decides",
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
  "id": "akhw",
  "root": "أ خ و",
  "translit": "ʾ-ḫ-w",
  "count": 96,
  "gloss": "brother",
  "headword": "إِخْوَةٌ",
  "headwordGloss": "brothers",
  "meaning": "brotherhood/kinship — literal brothers, or believers as brothers, or allied “brethren”.",
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
  "id": "shb",
  "root": "ص ح ب",
  "translit": "ṣ-ḥ-b",
  "count": 97,
  "gloss": "companion, people of",
  "headword": "صَاحِبِهِ",
  "headwordGloss": "his companion",
  "meaning": "to accompany/be associated — companions, associates; “people of X” (e.g., Fire, Garden).",
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
  "id": "wly",
  "root": "و ل ي",
  "translit": "w-l-y",
  "count": 232,
  "gloss": "ally, guardian, turning toward",
  "headword": "وَلِيٌّ",
  "headwordGloss": "ally; protector",
  "meaning": "nearness/turning toward; authority, guardianship, alliance; patron/protector — context decides",
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
  "id": "zwj",
  "root": "ز و ج",
  "translit": "z-w-j",
  "count": 81,
  "gloss": "spouse, a pair",
  "headword": "أَزْوَٰجٌ",
  "headwordGloss": "spouses; pairs",
  "meaning": "pairing; spouse/mate; kinds/types (‘pairs’) — marital or categorical context",
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
  "id": "nkh",
  "root": "ن ك ح",
  "translit": "n-k-ḥ",
  "count": 23,
  "gloss": "marriage",
  "headword": "ٱنكِحُوا۟",
  "headwordGloss": "marry (them)",
  "meaning": "marriage/contracting marriage; to wed/give in marriage — lawful union context",
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
  "root": "ط ل ق",
  "translit": "ṭ-l-q",
  "count": 23,
  "gloss": "divorce, releasing",
  "headword": "طَلَّقْتُمُ",
  "headwordGloss": "you divorced",
  "meaning": "releasing/letting go; divorce (legal separation) — family-law context",
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
  "id": "ytm",
  "root": "ي ت م",
  "translit": "y-t-m",
  "count": 23,
  "gloss": "orphan",
  "headword": "ٱلْيَتَٰمَىٰ",
  "headwordGloss": "the orphans",
  "meaning": "orphanhood; orphan (esp. minor without father); vulnerable dependents — legal/ethical context",
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
  "id": "rjl",
  "root": "ر ج ل",
  "translit": "r-j-l",
  "count": 72,
  "gloss": "man, and foot",
  "headword": "رِجَالٌ",
  "headwordGloss": "men",
  "meaning": "man/men; manliness/standing; also ‘foot/leg’ in some forms — human vs. body-part context",
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
  "id": "jmʿ",
  "root": "ج م ع",
  "translit": "j-m-ʿ",
  "count": 129,
  "gloss": "gathering, all together",
  "headword": "جَمِيعًا",
  "headwordGloss": "all together",
  "meaning": "gathering/collecting; togetherness; totality (‘all’) — physical or abstract جمع",
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
  "id": "ʿrb",
  "root": "ع ر ب",
  "translit": "ʿ-r-b",
  "count": 22,
  "gloss": "Arabic, clear of speech",
  "headword": "عَرَبِيًّا",
  "headwordGloss": "in Arabic",
  "meaning": "Arabic/clear expression; Arabic language; clarity/eloquence — context decides",
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
  "id": "qrn",
  "root": "ق ر ن",
  "translit": "q-r-n",
  "count": 33,
  "gloss": "generation, pairing together",
  "headword": "قَرْنٍ",
  "headwordGloss": "a generation",
  "meaning": "to join/pair; a generation/epoch; those contemporaneous — context decides",
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
  "id": "wrth",
  "root": "و ر ث",
  "translit": "w-r-ṯ",
  "count": 35,
  "gloss": "inheriting",
  "headword": "يَرِثُ",
  "headwordGloss": "he inherits",
  "meaning": "to inherit/receive as heir; inheriting wealth/land; God ‘inheriting’ (remaining/possessing) — context decides",
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
  "id": "slf",
  "root": "س ل ف",
  "translit": "s-l-f",
  "count": 8,
  "gloss": "those who went before",
  "headword": "سَلَفَ",
  "headwordGloss": "preceded; went before",
  "meaning": "to precede; what has already passed — earlier people, prior deeds, precedent",
  "family": [
   {
    "word": "سَلَفَتْ",
    "gloss": "has passed (f.)"
   },
   {
    "word": "سَلَفْتُمْ",
    "gloss": "you have sent ahead"
   },
   {
    "word": "سَلَفًا",
    "gloss": "as a precedent / as those before"
   },
   {
    "word": "أَسْلَفْتُمْ",
    "gloss": "you sent ahead"
   }
  ],
  "verse": {
   "ref": "43:56",
   "surah": "Sūrat Az-Zukhruf",
   "text": "فَجَعَلْنَٰهُمْ سَلَفًۭا وَمَثَلًۭا لِّلْءَاخِرِينَ"
  }
 },
 {
  "id": "mlaa",
  "root": "م ل أ",
  "translit": "m-l-ʾ",
  "count": 41,
  "gloss": "the chiefs, and filling",
  "headword": "ٱلْمَلَأُ",
  "headwordGloss": "the chiefs",
  "meaning": "the notable/chiefs (elite); also ‘filling’ (fullness) in non-elite senses — context decides",
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
  "id": "jnd",
  "root": "ج ن د",
  "translit": "j-n-d",
  "count": 29,
  "gloss": "army, host",
  "headword": "جُنُودُ",
  "headwordGloss": "hosts/armies",
  "meaning": "army/host/forces; troops (often of God); enlisted forces — context decides",
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
  "id": "ʿrsh",
  "root": "ع ر ش",
  "translit": "ʿ-r-š",
  "count": 33,
  "gloss": "throne",
  "headword": "ٱلْعَرْشِ",
  "headwordGloss": "the Throne",
  "meaning": "throne/seat of kingship; God’s Throne; a physical throne — context decides",
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
  "root": "ك ر س",
  "translit": "k-r-s",
  "count": 2,
  "gloss": "seat (al-kursī)",
  "headword": "كُرْسِيُّهُۥ",
  "headwordGloss": "His Seat",
  "meaning": "seat/throne-like seat; in Ayat al-Kursi: God’s Kursī — context decides",
  "family": [],
  "verse": {
   "ref": "38:34",
   "surah": "Sūrat Saad",
   "text": "وَلَقَدْ فَتَنَّا سُلَيْمَٰنَ وَأَلْقَيْنَا عَلَىٰ كُرْسِيِّهِۦ جَسَدًۭا ثُمَّ أَنَابَ"
  }
 },
 {
  "id": "qbl",
  "root": "ق ب ل",
  "translit": "q-b-l",
  "count": 294,
  "gloss": "before, accepting, facing",
  "headword": "قَبْلِ",
  "headwordGloss": "before",
  "meaning": "before/previously; in front of/facing; to accept/receive — context decides",
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
  "id": "bʿd",
  "root": "ب ع د",
  "translit": "b-ʿ-d",
  "count": 235,
  "gloss": "after, and being far",
  "headword": "بَعْدَ",
  "headwordGloss": "after",
  "meaning": "after; later; also ‘far/remote’ (distance, time, rank) — context decides.",
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
  "id": "awl",
  "root": "أ و ل",
  "translit": "ʾ-w-l",
  "count": 170,
  "gloss": "first, and returning to",
  "headword": "أُو۟لَٰٓئِكَ",
  "headwordGloss": "those",
  "meaning": "deictic ‘those’; also ‘first/earliest’ and ‘returning/going back’ in other patterns.",
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
  "id": "qrb",
  "root": "ق ر ب",
  "translit": "q-r-b",
  "count": 96,
  "gloss": "nearness, drawing close",
  "headword": "قَرِيبٌ",
  "headwordGloss": "near",
  "meaning": "nearness; drawing close/approaching; closeness in space, time, relation, or response.",
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
  "id": "skn",
  "root": "س ك ن",
  "translit": "s-k-n",
  "count": 69,
  "gloss": "dwelling, stillness",
  "headword": "يَسْكُنُ",
  "headwordGloss": "dwells",
  "meaning": "to dwell/settle; to become still/quiet; ‘dwelling’ and ‘tranquility’ (سَكِينَة) in Qur’anic usage.",
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
  "id": "yumn",
  "root": "ي م ن",
  "translit": "y-m-n",
  "count": 71,
  "gloss": "the right hand, an oath",
  "headword": "ٱلْيَمِينِ",
  "headwordGloss": "the right (hand/side)",
  "meaning": "right hand/side; also ‘oath’ (يَمِين) and ‘blessed/fortunate’ (يُمْن) depending on form/context.",
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
  "id": "shml",
  "root": "ش م ل",
  "translit": "š-m-l",
  "count": 12,
  "gloss": "the left, encompassing",
  "headword": "شِمَالِهِۦ",
  "headwordGloss": "his left",
  "meaning": "left side/hand; also ‘encompassing’ sense in some derivatives; Qur’anic usage is mainly ‘left’.",
  "family": [
   {
    "word": "عَنِ ٱلشِّمَالِ",
    "gloss": "on the left"
   },
   {
    "word": "أَصْحَٰبُ ٱلشِّمَالِ",
    "gloss": "companions of the left"
   },
   {
    "word": "مَشْـَٔمَةٍ",
    "gloss": "left side"
   }
  ],
  "verse": {
   "ref": "69:25",
   "surah": "Sūrat Al-Haaqqa",
   "text": "وَأَمَّا مَنْ أُوتِىَ كِتَٰبَهُۥ بِشِمَالِهِۦ فَيَقُولُ يَٰلَيْتَنِى لَمْ أُوتَ كِتَٰبِيَهْ"
  }
 },
 {
  "id": "fwq",
  "root": "ف و ق",
  "translit": "f-w-q",
  "count": 43,
  "gloss": "above, over",
  "headword": "فَوْقَ",
  "headwordGloss": "above",
  "meaning": "above/over; higher than; ‘beyond’ in rank/degree; also ‘over them’ (فَوْقَهُمْ) etc.",
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
  "id": "tht",
  "root": "ت ح ت",
  "translit": "t-ḥ-t",
  "count": 52,
  "gloss": "beneath",
  "headword": "تَحْتِ",
  "headwordGloss": "beneath",
  "meaning": "beneath/under; ‘below’ in location and (by extension) rank; frequent in ‘rivers beneath’.",
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
  "id": "wst",
  "root": "و س ط",
  "translit": "w-s-ṭ",
  "count": 10,
  "gloss": "middle, balanced",
  "headword": "وَسَطًا",
  "headwordGloss": "middle / balanced",
  "meaning": "middle/center; moderate, balanced, best/just (esp. أُمَّةً وَسَطًا).",
  "family": [
   {
    "word": "وَسَطِ",
    "gloss": "midst of"
   },
   {
    "word": "ٱلْوُسْطَىٰ",
    "gloss": "the middle (fem.)"
   },
   {
    "word": "أَوْسَطُهُمْ",
    "gloss": "the most moderate of them"
   }
  ],
  "verse": {
   "ref": "2:143",
   "surah": "Sūrat Al-Baqara",
   "text": "وَكَذَٰلِكَ جَعَلْنَٰكُمْ أُمَّةًۭ وَسَطًۭا لِّتَكُونُوا۟ شُهَدَآءَ عَلَى ٱلنَّاسِ وَيَكُونَ ٱلرَّسُولُ عَلَيْكُمْ شَهِيدًۭا ۗ وَمَا جَعَلْنَا ٱلْقِبْلَةَ ٱلَّتِى كُنتَ عَلَيْهَآ إِلَّا لِنَعْلَمَ مَن يَتَّبِعُ ٱلرَّسُولَ مِمَّن يَنقَلِبُ عَلَىٰ عَقِبَيْهِ ۚ وَإِن كَانَتْ لَكَبِيرَةً إِلَّا عَلَى ٱلَّذِينَ هَدَى ٱللَّهُ ۗ وَمَا كَانَ ٱللَّهُ لِيُضِيعَ إِيمَٰنَكُمْ ۚ إِنَّ ٱللَّهَ بِٱلنَّاسِ لَرَءُوفٌۭ رَّحِيمٌۭ"
  }
 },
 {
  "id": "zhr",
  "root": "ظ ه ر",
  "translit": "ẓ-h-r",
  "count": 59,
  "gloss": "appearing, the back, outward",
  "headword": "ظَهَرَ",
  "headwordGloss": "became manifest",
  "meaning": "to appear/become manifest; to prevail; ‘back/outward’ (ظَهْر) and ‘apparent’ (ظَاهِر) in Qur’anic usage.",
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
  "id": "btn",
  "root": "ب ط ن",
  "translit": "b-ṭ-n",
  "count": 25,
  "gloss": "inward, the belly",
  "headword": "بُطُونِ",
  "headwordGloss": "bellies",
  "meaning": "inside/interior; belly/womb; inner parts (literal & figurative: inward/hidden).",
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
  "id": "subh",
  "root": "ص ب ح",
  "translit": "ṣ-b-ḥ",
  "count": 62,
  "gloss": "morning, and becoming",
  "headword": "ٱلصُّبْحِ",
  "headwordGloss": "the morning",
  "meaning": "morning/daybreak; to become morning; to do at daybreak — time-of-day and onset sense.",
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
  "id": "ʿshy",
  "root": "ع ش ي",
  "translit": "ʿ-š-y",
  "count": 14,
  "gloss": "evening",
  "headword": "ٱلْعَشِىِّ",
  "headwordGloss": "the evening",
  "meaning": "evening/late day; to be dim/obscured — commonly: worship/mention ‘evening and morning’.",
  "family": [
   {
    "word": "عَشِيًّا",
    "gloss": "in the evening"
   },
   {
    "word": "عَشِيٍّ",
    "gloss": "evening (time)"
   },
   {
    "word": "عَشِيَّةً",
    "gloss": "evening"
   }
  ],
  "verse": {
   "ref": "38:31",
   "surah": "Sūrat Saad",
   "text": "إِذْ عُرِضَ عَلَيْهِ بِٱلْعَشِىِّ ٱلصَّٰفِنَٰتُ ٱلْجِيَادُ"
  }
 },
 {
  "id": "saʿ",
  "root": "س و ع",
  "translit": "s-w-ʿ",
  "count": 48,
  "gloss": "the Hour",
  "headword": "ٱلسَّاعَةُ",
  "headwordGloss": "the Hour",
  "meaning": "the (Final) Hour; an hour/time-point — especially the Day of Resurrection and its onset.",
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
  "id": "hyn",
  "root": "ح ي ن",
  "translit": "ḥ-y-n",
  "count": 34,
  "gloss": "a time, a while",
  "headword": "حِينٍ",
  "headwordGloss": "a time",
  "meaning": "time/while/period; appointed term; ‘when’ — ranges from a moment to a long span, context decides.",
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
  "id": "shr",
  "root": "ش ه ر",
  "translit": "š-h-r",
  "count": 21,
  "gloss": "month",
  "headword": "شَهْرِ",
  "headwordGloss": "month (of)",
  "meaning": "month; lunar month; a fixed monthly term — also used in set phrases (e.g., Ramaḍān; al-Ḥarām).",
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
  "id": "snw",
  "root": "س ن و",
  "translit": "s-n-w",
  "count": 20,
  "gloss": "year",
  "headword": "سَنَةٍ",
  "headwordGloss": "a year",
  "meaning": "year — a counted year/years; often contrasted with long periods and with ‘ām",
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
  "id": "snn",
  "root": "س ن ن",
  "translit": "s-n-n",
  "count": 21,
  "gloss": "a way, an established practice",
  "headword": "سُنَّةَ",
  "headwordGloss": "way; practice",
  "meaning": "an established way/practice (esp. God’s sunnah); a precedent/lawlike pattern — ‘the way of…’.",
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
  "id": "bab",
  "root": "ب و ب",
  "translit": "b-w-b",
  "count": 27,
  "gloss": "door, gate",
  "headword": "بَابٌ",
  "headwordGloss": "a gate; door",
  "meaning": "door/gate/entryway — physical gates and metaphorical ‘gates’ (e.g., of heaven/hell, provisions)",
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
  "id": "hjr",
  "root": "ح ج ر",
  "translit": "ḥ-j-r",
  "count": 21,
  "gloss": "stone, and forbidding",
  "headword": "حِجَارَةً",
  "headwordGloss": "stones",
  "meaning": "stone/rock; to prevent/forbid; a boundary/barrier — includes ‘stones’ and ‘ḥijr’ as prohibition/protected space.",
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
  "id": "adhn",
  "root": "أ ذ ن",
  "translit": "ʾ-ḏ-n",
  "count": 102,
  "gloss": "ear, and permission",
  "headword": "أَذِنَ",
  "headwordGloss": "he gave ear",
  "meaning": "ear; listening/hearing; giving permission/allowing — context decides",
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
  "id": "sdr",
  "root": "ص د ر",
  "translit": "ṣ-d-r",
  "count": 46,
  "gloss": "chest, and proceeding from",
  "headword": "صُدُورِهِمْ",
  "headwordGloss": "their chests",
  "meaning": "chest/heart (inner self); what issues forth/comes from — thoughts, doubts, intentions",
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
  "id": "ras",
  "root": "ر أ س",
  "translit": "r-ʾ-s",
  "count": 18,
  "gloss": "head, chief",
  "headword": "رَأْسِهِ",
  "headwordGloss": "his head",
  "meaning": "head; top; chief/leader; beginning (of something) — context decides",
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
  "id": "lhm",
  "root": "ل ح م",
  "translit": "l-ḥ-m",
  "count": 12,
  "gloss": "flesh, meat",
  "headword": "لَحْمٌ",
  "headwordGloss": "flesh; meat",
  "meaning": "flesh/meat — human flesh, animal meat, and figurative ‘eating flesh’ (backbiting)",
  "family": [
   {
    "word": "لَحْمًا",
    "gloss": "flesh/meat (acc.)"
   },
   {
    "word": "لُحُومُهَا",
    "gloss": "its meats/flesh"
   },
   {
    "word": "لُحُومَ",
    "gloss": "meats/flesh (pl., acc.)"
   }
  ],
  "verse": {
   "ref": "56:21",
   "surah": "Sūrat Al-Waaqia",
   "text": "وَلَحْمِ طَيْرٍۢ مِّمَّا يَشْتَهُونَ"
  }
 },
 {
  "id": "dmm",
  "root": "د م ي",
  "translit": "d-m-y",
  "count": 10,
  "gloss": "blood",
  "headword": "دَمًا",
  "headwordGloss": "blood",
  "meaning": "blood; bloodshed; (also) menstrual blood — context decides which",
  "family": [
   {
    "word": "ٱلدَّمَ",
    "gloss": "the blood"
   },
   {
    "word": "دِمَآءٌ",
    "gloss": "bloods"
   },
   {
    "word": "دِمَآءَكُمْ",
    "gloss": "your blood"
   },
   {
    "word": "دَمٍ",
    "gloss": "blood (gen.)"
   }
  ],
  "verse": {
   "ref": "8:6",
   "surah": "Sūrat Al-Anfaal",
   "text": "يُجَٰدِلُونَكَ فِى ٱلْحَقِّ بَعْدَمَا تَبَيَّنَ كَأَنَّمَا يُسَاقُونَ إِلَى ٱلْمَوْتِ وَهُمْ يَنظُرُونَ"
  }
 },
 {
  "id": "mss",
  "root": "م س س",
  "translit": "m-s-s",
  "count": 61,
  "gloss": "touching, afflicting",
  "headword": "مَسَّ",
  "headwordGloss": "touched/afflicted",
  "meaning": "touch; contact; befall/afflict (harm, hardship); reach (someone) — physical or figurative",
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
  "id": "dhwq",
  "root": "ذ و ق",
  "translit": "ḏ-w-q",
  "count": 63,
  "gloss": "tasting",
  "headword": "يَذُوقُونَ",
  "headwordGloss": "they taste",
  "meaning": "taste/experience; come to feel (punishment, mercy, hardship) — often ‘experience’ in context",
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
  "id": "hml",
  "root": "ح م ل",
  "translit": "ḥ-m-l",
  "count": 64,
  "gloss": "carrying, bearing a burden",
  "headword": "يَحْمِلُونَ",
  "headwordGloss": "they carry",
  "meaning": "carry/bear (a load, responsibility, sin, a child); transport — literal and moral burdening",
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
  "id": "rfʿ",
  "root": "ر ف ع",
  "translit": "r-f-ʿ",
  "count": 29,
  "gloss": "raising, lifting up",
  "headword": "رَفَعَ",
  "headwordGloss": "he raised",
  "meaning": "raise/lift; exalt; elevate in rank; make high — physical and honorific elevation",
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
  "root": "و ض ع",
  "translit": "w-ḍ-ʿ",
  "count": 26,
  "gloss": "placing, laying down",
  "headword": "وَضَعْنَا",
  "headwordGloss": "We placed/laid",
  "meaning": "place/put down; lay; set (a burden); lower; deliver (a child, in context) — ‘placing’ or ‘removing/laying down’",
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
  "id": "qwy",
  "root": "ق و ي",
  "translit": "q-w-y",
  "count": 42,
  "gloss": "strength",
  "headword": "قَوِىٌّ",
  "headwordGloss": "strong",
  "meaning": "strength; power; ability; firm/strong — physical, moral, or divine power",
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
  "id": "dʿf",
  "root": "ض ع ف",
  "translit": "ḍ-ʿ-f",
  "count": 52,
  "gloss": "weakness, and multiplying",
  "headword": "ضُعَفَٰٓؤُا۟",
  "headwordGloss": "the weak ones",
  "meaning": "weakness, frailty; also doubling/multiplying (reward/punishment) — context decides.",
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
  "id": "jnb",
  "root": "ج ن ب",
  "translit": "j-n-b",
  "count": 33,
  "gloss": "side, and keeping away from",
  "headword": "جَنۢبِ",
  "headwordGloss": "side",
  "meaning": "side/edge; to keep away/avoid; to remove to the side — often in moral avoidance or physical side.",
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
  "id": "akl",
  "root": "أ ك ل",
  "translit": "ʾ-k-l",
  "count": 109,
  "gloss": "eating, consuming",
  "headword": "يَأْكُلُونَ",
  "headwordGloss": "they eat/consume",
  "meaning": "eating/consuming; also devouring unjustly, spending up, consuming wealth — literal or figurative.",
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
  "root": "ش ر ب",
  "translit": "š-r-b",
  "count": 39,
  "gloss": "drinking",
  "headword": "يَشْرَبُونَ",
  "headwordGloss": "they drink",
  "meaning": "drinking; being given to drink; a drink/portion — literal drink (water, wine, etc.).",
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
  "id": "tʿm",
  "root": "ط ع م",
  "translit": "ṭ-ʿ-m",
  "count": 48,
  "gloss": "food, feeding",
  "headword": "طَعَامٌ",
  "headwordGloss": "food",
  "meaning": "food, eating; feeding/provision; taste — nourishment literal and, at times, lawful/forbidden food rulings.",
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
  "id": "lbs",
  "root": "ل ب س",
  "translit": "l-b-s",
  "count": 23,
  "gloss": "clothing, and obscuring",
  "headword": "لِبَاسًا",
  "headwordGloss": "clothing",
  "meaning": "clothing/garment; to wear; also to mix/obscure/confuse — physical dress and metaphorical covering/confusion.",
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
  "id": "mal",
  "root": "م و ل",
  "translit": "m-w-l",
  "count": 86,
  "gloss": "wealth, property",
  "headword": "مَالٍ",
  "headwordGloss": "wealth",
  "meaning": "wealth/property/possessions; what one owns — often in charity, spending, inheritance, trial by wealth.",
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
  "id": "ghny",
  "root": "غ ن ي",
  "translit": "ġ-n-y",
  "count": 73,
  "gloss": "wealth, needing nothing",
  "headword": "ٱلْغَنِىُّ",
  "headwordGloss": "the Self-Sufficient",
  "meaning": "richness, sufficiency; needing nothing; to be free of need — especially Allah’s absolute independence vs. human need.",
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
  "id": "faqr",
  "root": "ف ق ر",
  "translit": "f-q-r",
  "count": 13,
  "gloss": "poverty, need",
  "headword": "ٱلْفُقَرَآءُ",
  "headwordGloss": "the poor",
  "meaning": "poverty, need, dependence; being in want — material need and the broader human need before God.",
  "family": [
   {
    "word": "فَقِيرٌ",
    "gloss": "poor / needy"
   },
   {
    "word": "فَقِيرًا",
    "gloss": "poor (acc.)"
   },
   {
    "word": "ٱلْفَقِيرُ",
    "gloss": "the poor person"
   },
   {
    "word": "فُقَرَآءَ",
    "gloss": "poor people (pl.)"
   }
  ],
  "verse": {
   "ref": "35:15",
   "surah": "Sūrat Faatir",
   "text": "۞ يَٰٓأَيُّهَا ٱلنَّاسُ أَنتُمُ ٱلْفُقَرَآءُ إِلَى ٱللَّهِ ۖ وَٱللَّهُ هُوَ ٱلْغَنِىُّ ٱلْحَمِيدُ"
  }
 },
 {
  "id": "rbw",
  "root": "ر ب و",
  "translit": "r-b-w",
  "count": 20,
  "gloss": "increase, usury",
  "headword": "ٱلرِّبَوٰا۟",
  "headwordGloss": "usury",
  "meaning": "increase; to rise/grow; usury/interest; (also) a raised hill/high ground — context decides",
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
 },
 {
  "id": "byʿ",
  "root": "ب ي ع",
  "translit": "b-y-ʿ",
  "count": 15,
  "gloss": "selling, a pledge",
  "headword": "ٱشْتَرَوْا۟",
  "headwordGloss": "they bought",
  "meaning": "to sell/buy in exchange; a bargain; also a pledge of allegiance — trade and commitment imagery",
  "family": [
   {
    "word": "ٱشْتَرَىٰ",
    "gloss": "he bought"
   },
   {
    "word": "يَشْتَرُونَ",
    "gloss": "they buy"
   },
   {
    "word": "ٱلْبَيْعَ",
    "gloss": "trade/sale"
   }
  ],
  "verse": {
   "ref": "3:177",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "إِنَّ ٱلَّذِينَ ٱشْتَرَوُا۟ ٱلْكُفْرَ بِٱلْإِيمَٰنِ لَن يَضُرُّوا۟ ٱللَّهَ شَيْـًۭٔا وَلَهُمْ عَذَابٌ أَلِيمٌۭ"
  }
 },
 {
  "id": "tjr",
  "root": "ت ج ر",
  "translit": "t-j-r",
  "count": 9,
  "gloss": "trade",
  "headword": "تِجَٰرَةً",
  "headwordGloss": "trade",
  "meaning": "trade/commerce; to trade; figuratively a ‘deal’ with God (profitable bargain)",
  "family": [
   {
    "word": "تَجِدَ",
    "gloss": "you find"
   },
   {
    "word": "تَبُورَ",
    "gloss": "to perish/decline"
   }
  ],
  "verse": {
   "ref": "61:10",
   "surah": "Sūrat As-Saff",
   "text": "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ هَلْ أَدُلُّكُمْ عَلَىٰ تِجَٰرَةٍۢ تُنجِيكُم مِّنْ عَذَابٍ أَلِيمٍۢ"
  }
 },
 {
  "id": "knz",
  "root": "ك ن ز",
  "translit": "k-n-z",
  "count": 9,
  "gloss": "hoarded treasure",
  "headword": "يَكْنِزُونَ",
  "headwordGloss": "they hoard",
  "meaning": "to hoard/store up; a hoarded treasure (esp. wealth kept back, not spent in God’s way)",
  "family": [
   {
    "word": "تَكْنِزُونَ",
    "gloss": "you hoard"
   },
   {
    "word": "يَكْنِزْ",
    "gloss": "he hoards"
   },
   {
    "word": "كَنْزٌ",
    "gloss": "a treasure"
   },
   {
    "word": "كَنْزَهُمَا",
    "gloss": "their treasure"
   }
  ],
  "verse": {
   "ref": "9:34",
   "surah": "Sūrat At-Tawba",
   "text": "۞ يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۟ إِنَّ كَثِيرًۭا مِّنَ ٱلْأَحْبَارِ وَٱلرُّهْبَانِ لَيَأْكُلُونَ أَمْوَٰلَ ٱلنَّاسِ بِٱلْبَٰطِلِ وَيَصُدُّونَ عَن سَبِيلِ ٱللَّهِ ۗ وَٱلَّذِينَ يَكْنِزُونَ ٱلذَّهَبَ وَٱلْفِضَّةَ وَلَا يُنفِقُونَهَا فِى سَبِيلِ ٱللَّهِ فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍۢ"
  }
 },
 {
  "id": "fdd",
  "root": "ف ض ض",
  "translit": "f-ḍ-ḍ",
  "count": 6,
  "gloss": "silver",
  "headword": "فِضَّةٍ",
  "headwordGloss": "silver",
  "meaning": "silver; made of silver; (in imagery) pure bright metal/ornament",
  "family": [
   {
    "word": "مِّن فِضَّةٍ",
    "gloss": "of silver"
   },
   {
    "word": "أَسَاوِرَ مِن فِضَّةٍ",
    "gloss": "bracelets of silver"
   },
   {
    "word": "قَوَارِيرَا۟ مِن فِضَّةٍ",
    "gloss": "goblets of silver"
   }
  ],
  "verse": {
   "ref": "76:16",
   "surah": "Sūrat Al-Insaan",
   "text": "قَوَارِيرَا۟ مِن فِضَّةٍۢ قَدَّرُوهَا تَقْدِيرًۭا"
  }
 },
 {
  "id": "hbb",
  "root": "ح ب ب",
  "translit": "ḥ-b-b",
  "count": 95,
  "gloss": "love, and a grain",
  "headword": "يُحِبُّ",
  "headwordGloss": "He loves",
  "meaning": "to love/like; love and belovedness; also ‘grain/seed’ from the same root family in Qur’anic usage",
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
  "id": "rdy",
  "root": "ر ض ي",
  "translit": "r-ḍ-y",
  "count": 73,
  "gloss": "being pleased, contentment",
  "headword": "رَضِىَ",
  "headwordGloss": "He was pleased",
  "meaning": "to be pleased/content; approval and acceptance; mutual pleasure between God and believers",
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
  "id": "kre",
  "root": "ك ر ه",
  "translit": "k-r-h",
  "count": 41,
  "gloss": "disliking, aversion",
  "headword": "كَرِهُوا۟",
  "headwordGloss": "they disliked",
  "meaning": "to dislike/hate; aversion and unwillingness; sometimes ‘to find it burdensome’",
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
  "id": "hzn",
  "root": "ح ز ن",
  "translit": "ḥ-z-n",
  "count": 42,
  "gloss": "grief, sorrow",
  "headword": "يَحْزُنُ",
  "headwordGloss": "it grieves",
  "meaning": "grief/sorrow; to grieve; ‘no fear upon them nor shall they grieve’ is a frequent Qur’anic frame",
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
  "root": "ف ر ح",
  "translit": "f-r-ḥ",
  "count": 22,
  "gloss": "joy, exultation",
  "headword": "فَرِحُوا۟",
  "headwordGloss": "they rejoiced",
  "meaning": "joy/rejoicing; to be glad; can be praiseworthy (God’s bounty) or blameworthy (exultation/arrogance)",
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
  "id": "ghdb",
  "root": "غ ض ب",
  "translit": "ġ-ḍ-b",
  "count": 24,
  "gloss": "anger",
  "headword": "غَضَبَ",
  "headwordGloss": "he became angry",
  "meaning": "anger; wrath; being angered — especially divine displeasure/punitive wrath in Qur’anic usage",
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
  "id": "yas",
  "root": "ي أ س",
  "translit": "y-ʾ-s",
  "count": 13,
  "gloss": "despair",
  "headword": "تَيْـَٔسُوا۟",
  "headwordGloss": "do not despair",
  "meaning": "despair; to lose hope / give up (often of relief, mercy, or a people’s guidance).",
  "family": [
   {
    "word": "ٱلْيَأْسِ",
    "gloss": "despair (gen.)"
   }
  ],
  "verse": {
   "ref": "12:80",
   "surah": "Sūrat Yusuf",
   "text": "فَلَمَّا ٱسْتَيْـَٔسُوا۟ مِنْهُ خَلَصُوا۟ نَجِيًّۭا ۖ قَالَ كَبِيرُهُمْ أَلَمْ تَعْلَمُوٓا۟ أَنَّ أَبَاكُمْ قَدْ أَخَذَ عَلَيْكُم مَّوْثِقًۭا مِّنَ ٱللَّهِ وَمِن قَبْلُ مَا فَرَّطتُمْ فِى يُوسُفَ ۖ فَلَنْ أَبْرَحَ ٱلْأَرْضَ حَتَّىٰ يَأْذَنَ لِىٓ أَبِىٓ أَوْ يَحْكُمَ ٱللَّهُ لِى ۖ وَهُوَ خَيْرُ ٱلْحَٰكِمِينَ"
  }
 },
 {
  "id": "tmʿ",
  "root": "ط م ع",
  "translit": "ṭ-m-ʿ",
  "count": 12,
  "gloss": "hoping for, coveting",
  "headword": "يَطْمَعُ",
  "headwordGloss": "he hopes/covets",
  "meaning": "to hope for; to covet/aspire; desire directed at what one seeks or expects.",
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
  "id": "rghb",
  "root": "ر غ ب",
  "translit": "r-ġ-b",
  "count": 8,
  "gloss": "desiring, turning toward",
  "headword": "يَرْغَبُ",
  "headwordGloss": "he desires",
  "meaning": "to desire/seek, be eager for; also: to turn away from / be averse to (رَغِبَ عَنْ) — preposition decides",
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
  "id": "shhw",
  "root": "ش ه و",
  "translit": "š-h-w",
  "count": 13,
  "gloss": "desire, appetite",
  "headword": "ٱلشَّهَوَٰتِ",
  "headwordGloss": "the desires",
  "meaning": "appetite/desire (esp. sensual); attraction to what the self craves—women, wealth, pleasures.",
  "family": [
   {
    "word": "شَهْوَةً",
    "gloss": "lust; desire"
   },
   {
    "word": "ٱشْتَهَتْ",
    "gloss": "it desired/it craved"
   },
   {
    "word": "تَشْتَهِيهِ",
    "gloss": "it/you desire it"
   }
  ],
  "verse": {
   "ref": "19:59",
   "surah": "Sūrat Maryam",
   "text": "۞ فَخَلَفَ مِنۢ بَعْدِهِمْ خَلْفٌ أَضَاعُوا۟ ٱلصَّلَوٰةَ وَٱتَّبَعُوا۟ ٱلشَّهَوَٰتِ ۖ فَسَوْفَ يَلْقَوْنَ غَيًّا"
  }
 },
 {
  "id": "bky",
  "root": "ب ك ي",
  "translit": "b-k-y",
  "count": 7,
  "gloss": "weeping",
  "headword": "يَبْكُونَ",
  "headwordGloss": "they weep",
  "meaning": "weeping/crying; tears from fear, remorse, grief, or humility.",
  "family": [
   {
    "word": "بَكَىٰ",
    "gloss": "he wept"
   },
   {
    "word": "بُكِيًّا",
    "gloss": "weeping (intensively)"
   },
   {
    "word": "فَلْيَضْحَكُوا۟ قَلِيلًا وَلْيَبْكُوا۟ كَثِيرًا",
    "gloss": "let them laugh little and weep much"
   }
  ],
  "verse": {
   "ref": "12:16",
   "surah": "Sūrat Yusuf",
   "text": "وَجَآءُوٓ أَبَاهُمْ عِشَآءًۭ يَبْكُونَ"
  }
 },
 {
  "id": "dhk",
  "root": "ض ح ك",
  "translit": "ḍ-ḥ-k",
  "count": 10,
  "gloss": "laughing",
  "headword": "يَضْحَكُونَ",
  "headwordGloss": "they laugh",
  "meaning": "laughing/smiling; also used in contrast with weeping, and for amazed reaction (of Sarah).",
  "family": [
   {
    "word": "ضَحِكَتْ",
    "gloss": "she laughed/smiled"
   },
   {
    "word": "فَلْيَضْحَكُوا۟ قَلِيلًا",
    "gloss": "let them laugh little"
   },
   {
    "word": "يَضْحَكُ",
    "gloss": "he laughs"
   }
  ],
  "verse": {
   "ref": "83:34",
   "surah": "Sūrat Al-Mutaffifin",
   "text": "فَٱلْيَوْمَ ٱلَّذِينَ ءَامَنُوا۟ مِنَ ٱلْكُفَّارِ يَضْحَكُونَ"
  }
 },
 {
  "id": "ʿjb",
  "root": "ع ج ب",
  "translit": "ʿ-j-b",
  "count": 27,
  "gloss": "wonder, astonishment",
  "headword": "عَجِبْتَ",
  "headwordGloss": "you wondered",
  "meaning": "wonder/astonishment; to marvel (sometimes at denial or at Allah’s signs).",
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
  "id": "sxr",
  "root": "س خ ر",
  "translit": "s-ḫ-r",
  "count": 42,
  "gloss": "mocking, and subjecting",
  "headword": "سَخَّرَ",
  "headwordGloss": "He subjected",
  "meaning": "to subject/make subservient; also to mock (by a different pattern in this root-family, context distinguishes).",
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
  "id": "hzw",
  "root": "ه ز أ",
  "translit": "h-z-ʾ",
  "count": 34,
  "gloss": "ridicule",
  "headword": "هُزُوًا",
  "headwordGloss": "mockery",
  "meaning": "ridicule; to take as a joke/mock, treat with scorn (often of faith, verses, believers).",
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
  "id": "wsws",
  "root": "و س و س",
  "translit": "w-s-w-s",
  "count": 5,
  "gloss": "whispering (of the self, of Satan)",
  "headword": "ٱلْوَسْوَاسِ",
  "headwordGloss": "the whisperer",
  "meaning": "whispering suggestion (esp. Satan/self); furtive inner prompting; causing doubt",
  "family": [
   {
    "word": "يُوَسْوِسُ",
    "gloss": "he whispers"
   },
   {
    "word": "وَسْوَسَ",
    "gloss": "he whispered"
   },
   {
    "word": "ٱلْوَسْوَاسِ ٱلْخَنَّاسِ",
    "gloss": "the retreating whisperer"
   }
  ],
  "verse": {
   "ref": "114:4",
   "surah": "Sūrat An-Naas",
   "text": "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ"
  }
 },
 {
  "id": "sdd",
  "root": "ص د د",
  "translit": "ṣ-d-d",
  "count": 42,
  "gloss": "turning away, hindering",
  "headword": "يَصُدُّونَ",
  "headwordGloss": "they turn away",
  "meaning": "to turn away/avert; to hinder/bar from a path (often from Allah’s way)",
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
  "id": "ghlb",
  "root": "غ ل ب",
  "translit": "ġ-l-b",
  "count": 31,
  "gloss": "overcoming, prevailing",
  "headword": "غَلَبَتْ",
  "headwordGloss": "she/it overcame",
  "meaning": "to overcome/prevail; to be dominant; victory after struggle",
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
  "id": "fth",
  "root": "ف ت ح",
  "translit": "f-t-ḥ",
  "count": 38,
  "gloss": "opening, victory",
  "headword": "فَتْحٌ",
  "headwordGloss": "victory/opening",
  "meaning": "opening/unsealing; giving access; decisive victory; also judging/deciding between parties",
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
  "id": "dfʿ",
  "root": "د ف ع",
  "translit": "d-f-ʿ",
  "count": 24,
  "gloss": "repelling, warding off",
  "headword": "يَدْفَعُ",
  "headwordGloss": "he repels",
  "meaning": "to push away/repel; to ward off; to avert harm or aggression",
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
  "id": "mnʿ",
  "root": "م ن ع",
  "translit": "m-n-ʿ",
  "count": 17,
  "gloss": "preventing, withholding",
  "headword": "يَمْنَعُونَ",
  "headwordGloss": "they withhold",
  "meaning": "to prevent/withhold; to bar access; to deny giving (incl. al-māʿūn)",
  "family": [
   {
    "word": "مَنَعَ",
    "gloss": "he prevented"
   },
   {
    "word": "مَانِعٌ",
    "gloss": "a preventer"
   },
   {
    "word": "مَمْنُوعٌ",
    "gloss": "withheld / forbidden"
   },
   {
    "word": "مَنَّاعٌ",
    "gloss": "one who withholds much"
   }
  ],
  "verse": {
   "ref": "107:7",
   "surah": "Sūrat Al-Maa'un",
   "text": "وَيَمْنَعُونَ ٱلْمَاعُونَ"
  }
 },
 {
  "id": "hrb",
  "root": "ح ر ب",
  "translit": "ḥ-r-b",
  "count": 11,
  "gloss": "war",
  "headword": "حَرْبٌ",
  "headwordGloss": "war",
  "meaning": "war/hostility; waging war; being at enmity (incl. ‘war from Allah and His Messenger’)",
  "family": [
   {
    "word": "بِحَرْبٍ",
    "gloss": "with war"
   },
   {
    "word": "يُحَارِبُونَ",
    "gloss": "they wage war"
   },
   {
    "word": "يُحَارِبُونَ ٱللَّهَ",
    "gloss": "they wage war against Allah"
   }
  ],
  "verse": {
   "ref": "8:57",
   "surah": "Sūrat Al-Anfaal",
   "text": "فَإِمَّا تَثْقَفَنَّهُمْ فِى ٱلْحَرْبِ فَشَرِّدْ بِهِم مَّنْ خَلْفَهُمْ لَعَلَّهُمْ يَذَّكَّرُونَ"
  }
 },
 {
  "id": "hfz",
  "root": "ح ف ظ",
  "translit": "ḥ-f-ẓ",
  "count": 44,
  "gloss": "guarding, preserving",
  "headword": "حَفِيظٌ",
  "headwordGloss": "guardian",
  "meaning": "to guard/preserve; to keep watch; to memorize/keep safe; protection by Allah and by appointed keepers",
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
  "id": "ʿrd",
  "root": "ع ر ض",
  "translit": "ʿ-r-ḍ",
  "count": 79,
  "gloss": "presenting, and turning aside",
  "headword": "مُعْرِضُونَ",
  "headwordGloss": "turning away",
  "meaning": "to present/expose; to set forth; also to turn aside/avoid—context decides (offer vs. avoidance)",
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
  "id": "hdth",
  "root": "ح د ث",
  "translit": "ḥ-d-ṯ",
  "count": 36,
  "gloss": "an event, relating it",
  "headword": "حَدِيثٌ",
  "headwordGloss": "a discourse",
  "meaning": "something occurring or being reported — event; news; statement; narrative; message (context decides).",
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
  "id": "suq",
  "root": "س و ق",
  "translit": "s-w-q",
  "count": 21,
  "gloss": "driving on, a leg",
  "headword": "سَاقَيْهَا",
  "headwordGloss": "her two shins",
  "meaning": "to drive/urge forward; to lead in a procession — also ‘leg/shin’ (ساق) and derivatives.",
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
  "id": "rkb",
  "root": "ر ك ب",
  "translit": "r-k-b",
  "count": 15,
  "gloss": "riding, mounting",
  "headword": "يَرْكَبُونَ",
  "headwordGloss": "they ride",
  "meaning": "to ride/mount; to board; to layer/stack one upon another — used for animals, ships, and metaphorical “layers/waves”",
  "family": [
   {
    "word": "تَرْكَبُوا۟",
    "gloss": "you (pl) ride"
   },
   {
    "word": "ٱرْكَبُوا۟",
    "gloss": "ride! (pl)"
   },
   {
    "word": "ٱرْكَبْ",
    "gloss": "ride! (sg)"
   },
   {
    "word": "رَاكِبًا",
    "gloss": "riding; a rider"
   }
  ],
  "verse": {
   "ref": "36:42",
   "surah": "Sūrat Yaseen",
   "text": "وَخَلَقْنَا لَهُم مِّن مِّثْلِهِۦ مَا يَرْكَبُونَ"
  }
 },
 {
  "id": "ʿbr",
  "root": "ع ب ر",
  "translit": "ʿ-b-r",
  "count": 9,
  "gloss": "crossing over, a lesson",
  "headword": "عِبْرَةٌ",
  "headwordGloss": "a lesson",
  "meaning": "to cross/pass over; to interpret; to take admonition — ‘lesson/sign to learn from’ is common Quranic usage.",
  "family": [
   {
    "word": "ٱعْتَبِرُوا۟",
    "gloss": "take heed!"
   },
   {
    "word": "تَعْبُرُونَ",
    "gloss": "you interpret"
   },
   {
    "word": "عَابِرِى سَبِيلٍ",
    "gloss": "wayfarers"
   }
  ],
  "verse": {
   "ref": "79:26",
   "surah": "Sūrat An-Naazi'aat",
   "text": "إِنَّ فِى ذَٰلِكَ لَعِبْرَةًۭ لِّمَن يَخْشَىٰٓ"
  }
 },
 {
  "id": "shjr",
  "root": "ش ج ر",
  "translit": "š-j-r",
  "count": 26,
  "gloss": "tree",
  "headword": "شَجَرَةٍ",
  "headwordGloss": "a tree",
  "meaning": "tree/wood; also: branching/entangling — in Qur’anic usage includes named trees (e.g., the Zaqqum tree)",
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
  "root": "ث م ر",
  "translit": "ṯ-m-r",
  "count": 24,
  "gloss": "fruit",
  "headword": "ثَمَرَٰتٍ",
  "headwordGloss": "fruits",
  "meaning": "fruit/produce/yield — literal crops and metaphorical outcomes/blessings (context decides).",
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
  "id": "nbt",
  "root": "ن ب ت",
  "translit": "n-b-t",
  "count": 26,
  "gloss": "plants, causing to grow",
  "headword": "نَبَاتًا",
  "headwordGloss": "growth",
  "meaning": "to sprout/grow; plants/vegetation — often God causing growth to come forth from earth.",
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
  "id": "zrʿ",
  "root": "ز ر ع",
  "translit": "z-r-ʿ",
  "count": 14,
  "gloss": "sowing, crops",
  "headword": "زَرْعًا",
  "headwordGloss": "crops; sowing",
  "meaning": "to sow/plant; crops/tilth — used for agriculture and as a vivid image for growth and provision",
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
  "id": "mtr",
  "root": "م ط ر",
  "translit": "m-ṭ-r",
  "count": 15,
  "gloss": "rain",
  "headword": "مَطَرًا",
  "headwordGloss": "rain",
  "meaning": "rainfall — in the Qur’an often rain as punishment, though context may vary.",
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
  "id": "sahb",
  "root": "س ح ب",
  "translit": "s-ḥ-b",
  "count": 9,
  "gloss": "clouds, dragging along",
  "headword": "سَحَابًا",
  "headwordGloss": "clouds",
  "meaning": "to draw/drag along; clouds driven along — commonly for rain-bearing clouds.",
  "family": [
   {
    "word": "سَحَابٌ",
    "gloss": "cloud"
   },
   {
    "word": "ٱلسَّحَابَ",
    "gloss": "the cloud(s)"
   },
   {
    "word": "سَحَابًا ثِقَالًا",
    "gloss": "heavy clouds"
   },
   {
    "word": "سُحُبٌ",
    "gloss": "clouds"
   }
  ],
  "verse": {
   "ref": "35:9",
   "surah": "Sūrat Faatir",
   "text": "وَٱللَّهُ ٱلَّذِىٓ أَرْسَلَ ٱلرِّيَٰحَ فَتُثِيرُ سَحَابًۭا فَسُقْنَٰهُ إِلَىٰ بَلَدٍۢ مَّيِّتٍۢ فَأَحْيَيْنَا بِهِ ٱلْأَرْضَ بَعْدَ مَوْتِهَا ۚ كَذَٰلِكَ ٱلنُّشُورُ"
  }
 },
 {
  "id": "brq",
  "root": "ب ر ق",
  "translit": "b-r-q",
  "count": 8,
  "gloss": "lightning",
  "headword": "ٱلْبَرْقُ",
  "headwordGloss": "the lightning",
  "meaning": "lightning; flashing brightness — literal lightning in weather imagery",
  "family": [
   {
    "word": "بَرْقٌ",
    "gloss": "lightning"
   },
   {
    "word": "يَكَادُ ٱلْبَرْقُ",
    "gloss": "the lightning almost…"
   },
   {
    "word": "بَرَقَ",
    "gloss": "it flashed"
   }
  ],
  "verse": {
   "ref": "13:12",
   "surah": "Sūrat Ar-Ra'd",
   "text": "هُوَ ٱلَّذِى يُرِيكُمُ ٱلْبَرْقَ خَوْفًۭا وَطَمَعًۭا وَيُنشِئُ ٱلسَّحَابَ ٱلثِّقَالَ"
  }
 },
 {
  "id": "rʿd",
  "root": "ر ع د",
  "translit": "r-ʿ-d",
  "count": 2,
  "gloss": "thunder",
  "headword": "ٱلرَّعْدُ",
  "headwordGloss": "the thunder",
  "meaning": "thunder; its rumbling sound — appears as a sign of Allah’s power (and as a sūrah name)",
  "family": [
   {
    "word": "رَعْدٌ",
    "gloss": "thunder"
   },
   {
    "word": "يُسَبِّحُ ٱلرَّعْدُ",
    "gloss": "the thunder glorifies"
   }
  ],
  "verse": {
   "ref": "13:13",
   "surah": "Sūrat Ar-Ra'd",
   "text": "وَيُسَبِّحُ ٱلرَّعْدُ بِحَمْدِهِۦ وَٱلْمَلَٰٓئِكَةُ مِنْ خِيفَتِهِۦ وَيُرْسِلُ ٱلصَّوَٰعِقَ فَيُصِيبُ بِهَا مَن يَشَآءُ وَهُمْ يُجَٰدِلُونَ فِى ٱللَّهِ وَهُوَ شَدِيدُ ٱلْمِحَالِ"
  }
 },
 {
  "id": "zlzl",
  "root": "ز ل ز ل",
  "translit": "z-l-z-l",
  "count": 6,
  "gloss": "shaking, earthquake",
  "headword": "زِلْزَالًا",
  "headwordGloss": "a shaking",
  "meaning": "shaking; earthquake; violent convulsion — literal and eschatological",
  "family": [
   {
    "word": "زُلْزِلُوا۟",
    "gloss": "they were shaken"
   },
   {
    "word": "زُلْزِلَتِ",
    "gloss": "it was shaken"
   },
   {
    "word": "زِلْزَالٌ",
    "gloss": "an earthquake"
   },
   {
    "word": "زِلْزَالَهَا",
    "gloss": "its shaking"
   },
   {
    "word": "زِلْزَالًا شَدِيدًا",
    "gloss": "a severe shaking"
   }
  ],
  "verse": {
   "ref": "33:11",
   "surah": "Sūrat Al-Ahzaab",
   "text": "هُنَالِكَ ٱبْتُلِىَ ٱلْمُؤْمِنُونَ وَزُلْزِلُوا۟ زِلْزَالًۭا شَدِيدًۭا"
  }
 },
 {
  "id": "flk",
  "root": "ف ل ك",
  "translit": "f-l-k",
  "count": 25,
  "gloss": "ship, and orbit",
  "headword": "ٱلْفُلْكِ",
  "headwordGloss": "the ships",
  "meaning": "ship(s), vessel(s); and (also) celestial orbit — context decides",
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
  "id": "sfn",
  "root": "س ف ن",
  "translit": "s-f-n",
  "count": 4,
  "gloss": "ship",
  "headword": "ٱلسَّفِينَةِ",
  "headwordGloss": "the ship",
  "meaning": "ship, boat — especially in the story of Mūsā and al-Khiḍr",
  "family": [
   {
    "word": "سَفِينَةٌ",
    "gloss": "a ship"
   },
   {
    "word": "فِى ٱلسَّفِينَةِ",
    "gloss": "in the ship"
   }
  ],
  "verse": {
   "ref": "29:15",
   "surah": "Sūrat Al-Ankaboot",
   "text": "فَأَنجَيْنَٰهُ وَأَصْحَٰبَ ٱلسَّفِينَةِ وَجَعَلْنَٰهَآ ءَايَةًۭ لِّلْعَٰلَمِينَ"
  }
 },
 {
  "id": "dbb",
  "root": "د ب ب",
  "translit": "d-b-b",
  "count": 18,
  "gloss": "a moving creature",
  "headword": "دَآبَّةٍ",
  "headwordGloss": "a creature",
  "meaning": "to move/creep; a moving creature — animals in general; also an eschatological beast",
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
  "id": "tyr",
  "root": "ط ي ر",
  "translit": "ṭ-y-r",
  "count": 29,
  "gloss": "bird, and an omen",
  "headword": "ٱلطَّيْرَ",
  "headwordGloss": "the birds",
  "meaning": "bird(s); to fly; and ṭāʾir = omen/fate/lot — context decides",
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
  "id": "khyl",
  "root": "خ ي ل",
  "translit": "ḫ-y-l",
  "count": 24,
  "gloss": "horses, and imagining",
  "headword": "ٱلْخَيْلِ",
  "headwordGloss": "the horses",
  "meaning": "horses/cavalry; and imagining/illusion — esp. something made to seem (magic, fear)",
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
  "id": "bqr",
  "root": "ب ق ر",
  "translit": "b-q-r",
  "count": 9,
  "gloss": "cattle, a cow",
  "headword": "بَقَرَةً",
  "headwordGloss": "a cow",
  "meaning": "cattle; a cow — the cow of Banī Isrāʾīl; livestock generally",
  "family": [
   {
    "word": "ٱلْبَقَرِ",
    "gloss": "the cattle"
   },
   {
    "word": "بَقَرٌ",
    "gloss": "cattle"
   }
  ],
  "verse": {
   "ref": "2:69",
   "surah": "Sūrat Al-Baqara",
   "text": "قَالُوا۟ ٱدْعُ لَنَا رَبَّكَ يُبَيِّن لَّنَا مَا لَوْنُهَا ۚ قَالَ إِنَّهُۥ يَقُولُ إِنَّهَا بَقَرَةٌۭ صَفْرَآءُ فَاقِعٌۭ لَّوْنُهَا تَسُرُّ ٱلنَّٰظِرِينَ"
  }
 },
 {
  "id": "ghnm",
  "root": "غ ن م",
  "translit": "ġ-n-m",
  "count": 9,
  "gloss": "sheep, and spoils of war",
  "headword": "غَنِمْتُمْ",
  "headwordGloss": "you gained (booty)",
  "meaning": "sheep/goats (livestock); and to gain as spoils — esp. war-booty (ghanīmah)",
  "family": [
   {
    "word": "مَغَانِمُ",
    "gloss": "booties, gains"
   },
   {
    "word": "مَغَانِمَ",
    "gloss": "booties (acc.)"
   },
   {
    "word": "مَغَانِمَ كَثِيرَةً",
    "gloss": "many gains"
   }
  ],
  "verse": {
   "ref": "8:69",
   "surah": "Sūrat Al-Anfaal",
   "text": "فَكُلُوا۟ مِمَّا غَنِمْتُمْ حَلَٰلًۭا طَيِّبًۭا ۚ وَٱتَّقُوا۟ ٱللَّهَ ۚ إِنَّ ٱللَّهَ غَفُورٌۭ رَّحِيمٌۭ"
  }
 }
];

function quranVocabCard(rootId) {
  return QURAN_VOCAB.find(c => c.id === rootId) || null;
}
