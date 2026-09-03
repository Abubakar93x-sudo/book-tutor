// ============================================================================
// BookTutor — the Qur'anic prefixes, suffixes and pronouns (quran-particles-data.js)
//
// The second Qur'anic vocabulary section. The 300 roots in quran-roots-data.js
// are the meanings; this is the machinery that gets attached to them — the
// prefixes on the front, the endings on the back, and the pronouns that stand
// alone or cling to a word.
//
// GENERATED — do not hand-edit. Re-run tools/build-particles.cjs, which reads
// tools/particles-source.json.
//
// EVERY ARABIC STRING HERE CAME OUT OF THE CORPUS. The source file gives only a
// consonantal skeleton and an English gloss; the builder looks it up in
// quran-text.js and writes back the exact vowelled spelling the muṣḥaf uses,
// with how often it occurs. Verses are found by searching for the entry's own
// example words. Nothing was typed from memory, which is the one way a form
// that is not in the Qur'an gets onto a card.
//
// 83 entries · 6 groups · 156 example words
// ============================================================================

const QURAN_PARTICLE_GROUPS = [
 {
  "id": "prefix",
  "title": "Prefixes — what attaches in front",
  "blurb": "One or two letters glued to the front of a word. Miss them and the word looks unfamiliar; know them and you strip them off on sight.",
  "from": 1,
  "to": 10
 },
 {
  "id": "pronoun",
  "title": "Pronouns that stand on their own",
  "blurb": "The fourteen separate pronouns. Arabic marks gender and has a form for exactly two, so there are more of them than English has.",
  "from": 11,
  "to": 24
 },
 {
  "id": "attached",
  "title": "Pronouns that cling to a word",
  "blurb": "The same pronouns again, glued to the end. On a noun they mean “his / your / our”; on a verb or preposition they mean “him / you / us”.",
  "from": 25,
  "to": 38
 },
 {
  "id": "verbEnding",
  "title": "What the verb tells you — prefixes and endings",
  "blurb": "A verb carries its own subject. These letters say who did it and when, so the pronoun is usually not written at all.",
  "from": 39,
  "to": 61
 },
 {
  "id": "nounEnding",
  "title": "What the noun's ending tells you",
  "blurb": "The last mark on a noun says what job it is doing in the sentence, and whether it is one, two or many.",
  "from": 62,
  "to": 73
 },
 {
  "id": "pointing",
  "title": "Pointing and joining words",
  "blurb": "This, that, those — and the words that hook one clause onto the next. Between them they are on almost every page.",
  "from": 74,
  "to": 83
 }
];

const QURAN_PARTICLES = [
 {
  "id": "pre-bi",
  "n": 1,
  "group": "prefix",
  "form": "بِـ",
  "translit": "bi-",
  "gloss": "with, by, in",
  "role": "preposition prefixed to a noun",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "بِسْمِ",
    "gloss": "in the name of"
   },
   {
    "word": "بِٱلْحَقِّ",
    "gloss": "with the truth"
   },
   {
    "word": "بِٱللَّهِ",
    "gloss": "in Allah"
   }
  ],
  "count": 326,
  "verse": {
   "ref": "1:1",
   "surah": "Sūrat Al-Faatiha",
   "text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
  }
 },
 {
  "id": "pre-li",
  "n": 2,
  "group": "prefix",
  "form": "لِـ",
  "translit": "li-",
  "gloss": "for, to, belonging to",
  "role": "preposition prefixed to a noun",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "لِلَّهِ",
    "gloss": "for Allah / belonging to Allah"
   },
   {
    "word": "لِلنَّاسِ",
    "gloss": "for the people"
   }
  ],
  "count": 140,
  "verse": {
   "ref": "1:2",
   "surah": "Sūrat Al-Faatiha",
   "text": "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ"
  }
 },
 {
  "id": "pre-ka",
  "n": 3,
  "group": "prefix",
  "form": "كَـ",
  "translit": "ka-",
  "gloss": "like, as",
  "role": "comparison prefixed to a noun",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "كَمَثَلِ",
    "gloss": "like the likeness of"
   },
   {
    "word": "كَٱلَّذِينَ",
    "gloss": "like those who"
   }
  ],
  "count": 22,
  "verse": {
   "ref": "8:21",
   "surah": "Sūrat Al-Anfaal",
   "text": "وَلَا تَكُونُوا۟ كَٱلَّذِينَ قَالُوا۟ سَمِعْنَا وَهُمْ لَا يَسْمَعُونَ"
  }
 },
 {
  "id": "pre-wa",
  "n": 4,
  "group": "prefix",
  "form": "وَ",
  "translit": "wa-",
  "gloss": "and",
  "role": "joining particle",
  "attaches": "anything",
  "note": "",
  "examples": [
   {
    "word": "وَٱللَّهُ",
    "gloss": "and Allah"
   },
   {
    "word": "وَقَالَ",
    "gloss": "and he said"
   }
  ],
  "count": 324,
  "verse": {
   "ref": "10:79",
   "surah": "Sūrat Yunus",
   "text": "وَقَالَ فِرْعَوْنُ ٱئْتُونِى بِكُلِّ سَٰحِرٍ عَلِيمٍۢ"
  }
 },
 {
  "id": "pre-fa",
  "n": 5,
  "group": "prefix",
  "form": "فَـ",
  "translit": "fa-",
  "gloss": "so, then, and so",
  "role": "consequence particle",
  "attaches": "anything",
  "note": "",
  "examples": [
   {
    "word": "فَقَالَ",
    "gloss": "so he said"
   },
   {
    "word": "فَإِنَّ",
    "gloss": "so indeed / then if"
   }
  ],
  "count": 98,
  "verse": {
   "ref": "79:24",
   "surah": "Sūrat An-Naazi'aat",
   "text": "فَقَالَ أَنَا۠ رَبُّكُمُ ٱلْأَعْلَىٰ"
  }
 },
 {
  "id": "pre-sa",
  "n": 6,
  "group": "prefix",
  "form": "سَـ",
  "translit": "sa-",
  "gloss": "will, shall (future)",
  "role": "future marker on a present verb",
  "attaches": "verb",
  "note": "",
  "examples": [
   {
    "word": "سَيَقُولُ",
    "gloss": "he will say"
   },
   {
    "word": "سَنُرِيهِمْ",
    "gloss": "We will show them"
   }
  ],
  "count": 5,
  "verse": {
   "ref": "2:142",
   "surah": "Sūrat Al-Baqara",
   "text": "۞ سَيَقُولُ ٱلسُّفَهَآءُ مِنَ ٱلنَّاسِ مَا وَلَّىٰهُمْ عَن قِبْلَتِهِمُ ٱلَّتِى كَانُوا۟ عَلَيْهَا ۚ قُل لِّلَّهِ ٱلْمَشْرِقُ وَٱلْمَغْرِبُ ۚ يَهْدِى مَن يَشَآءُ إِلَىٰ صِرَٰطٍۢ مُّسْتَقِيمٍۢ"
  }
 },
 {
  "id": "pre-al",
  "n": 7,
  "group": "prefix",
  "form": "ٱلْـ",
  "translit": "al-",
  "gloss": "the",
  "role": "definite article",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "ٱلنَّاسِ",
    "gloss": "the people"
   },
   {
    "word": "ٱلرَّحْمَٰنِ",
    "gloss": "the Most Merciful"
   }
  ],
  "count": 225,
  "verse": {
   "ref": "1:1",
   "surah": "Sūrat Al-Faatiha",
   "text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
  }
 },
 {
  "id": "pre-a",
  "n": 8,
  "group": "prefix",
  "form": "أَ",
  "translit": "a-",
  "gloss": "(turns the sentence into a question)",
  "role": "interrogative prefix",
  "attaches": "anything",
  "note": "",
  "examples": [
   {
    "word": "أَفَلَا",
    "gloss": "do they not…?"
   },
   {
    "word": "أَتَجْعَلُ",
    "gloss": "will You place…?"
   }
  ],
  "count": 46,
  "verse": {
   "ref": "37:138",
   "surah": "Sūrat As-Saaffaat",
   "text": "وَبِٱلَّيْلِ ۗ أَفَلَا تَعْقِلُونَ"
  }
 },
 {
  "id": "pre-la",
  "n": 9,
  "group": "prefix",
  "form": "لَـ",
  "translit": "la-",
  "gloss": "surely, indeed",
  "role": "emphasis prefix",
  "attaches": "anything",
  "note": "",
  "examples": [
   {
    "word": "لَقَدْ",
    "gloss": "indeed, certainly"
   },
   {
    "word": "لَفِى",
    "gloss": "is surely in"
   }
  ],
  "count": 62,
  "verse": {
   "ref": "26:196",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "وَإِنَّهُۥ لَفِى زُبُرِ ٱلْأَوَّلِينَ"
  }
 },
 {
  "id": "pre-wa-oath",
  "n": 10,
  "group": "prefix",
  "form": "وَ",
  "translit": "wa-",
  "gloss": "by — (swearing an oath)",
  "role": "oath particle",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "وَٱلْعَصْرِ",
    "gloss": "by time"
   },
   {
    "word": "وَٱلضُّحَىٰ",
    "gloss": "by the morning brightness"
   }
  ],
  "count": 2,
  "verse": {
   "ref": "103:1",
   "surah": "Sūrat Al-Asr",
   "text": "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ وَٱلْعَصْرِ"
  }
 },
 {
  "id": "pro-huwa",
  "n": 11,
  "group": "pronoun",
  "form": "هُوَ",
  "translit": "huwa",
  "gloss": "he, it",
  "role": "3rd person masculine singular",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "هُوَ",
    "gloss": "he, it"
   },
   {
    "word": "وَهُوَ",
    "gloss": "and he"
   }
  ],
  "count": 436,
  "verse": {
   "ref": "3:2",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ"
  }
 },
 {
  "id": "pro-hiya",
  "n": 12,
  "group": "pronoun",
  "form": "هِىَ",
  "translit": "hiya",
  "gloss": "she, it",
  "role": "3rd person feminine singular",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "هِىَ",
    "gloss": "she, it"
   },
   {
    "word": "وَهِىَ",
    "gloss": "and she"
   }
  ],
  "count": 57,
  "verse": {
   "ref": "20:20",
   "surah": "Sūrat Taa-Haa",
   "text": "فَأَلْقَىٰهَا فَإِذَا هِىَ حَيَّةٌۭ تَسْعَىٰ"
  }
 },
 {
  "id": "pro-huma",
  "n": 13,
  "group": "pronoun",
  "form": "هُمَا",
  "translit": "humā",
  "gloss": "they two",
  "role": "3rd person dual",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "هُمَا",
    "gloss": "they two"
   }
  ],
  "count": 1,
  "verse": {
   "ref": "9:40",
   "surah": "Sūrat At-Tawba",
   "text": "إِلَّا تَنصُرُوهُ فَقَدْ نَصَرَهُ ٱللَّهُ إِذْ أَخْرَجَهُ ٱلَّذِينَ كَفَرُوا۟ ثَانِىَ ٱثْنَيْنِ إِذْ هُمَا فِى ٱلْغَارِ إِذْ يَقُولُ لِصَٰحِبِهِۦ لَا تَحْزَنْ إِنَّ ٱللَّهَ مَعَنَا ۖ فَأَنزَلَ ٱللَّهُ سَكِينَتَهُۥ عَلَيْهِ وَأَيَّدَهُۥ بِجُنُودٍۢ لَّمْ تَرَوْهَا وَجَعَلَ كَلِمَةَ ٱلَّذِينَ كَفَرُوا۟ ٱلسُّفْلَىٰ ۗ وَكَلِمَةُ ٱللَّهِ هِىَ ٱلْعُلْيَا ۗ وَٱللَّهُ عَزِيزٌ حَكِيمٌ"
  }
 },
 {
  "id": "pro-hum",
  "n": 14,
  "group": "pronoun",
  "form": "هُمْ",
  "translit": "hum",
  "gloss": "they (men, or mixed)",
  "role": "3rd person masculine plural",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "هُمْ",
    "gloss": "they"
   },
   {
    "word": "وَهُمْ",
    "gloss": "and they"
   }
  ],
  "count": 254,
  "verse": {
   "ref": "7:191",
   "surah": "Sūrat Al-A'raaf",
   "text": "أَيُشْرِكُونَ مَا لَا يَخْلُقُ شَيْـًۭٔا وَهُمْ يُخْلَقُونَ"
  }
 },
 {
  "id": "pro-hunna",
  "n": 15,
  "group": "pronoun",
  "form": "هُنَّ",
  "translit": "hunna",
  "gloss": "they (women)",
  "role": "3rd person feminine plural",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "هُنَّ",
    "gloss": "they (fem.)"
   }
  ],
  "count": 7,
  "verse": {
   "ref": "2:187",
   "surah": "Sūrat Al-Baqara",
   "text": "أُحِلَّ لَكُمْ لَيْلَةَ ٱلصِّيَامِ ٱلرَّفَثُ إِلَىٰ نِسَآئِكُمْ ۚ هُنَّ لِبَاسٌۭ لَّكُمْ وَأَنتُمْ لِبَاسٌۭ لَّهُنَّ ۗ عَلِمَ ٱللَّهُ أَنَّكُمْ كُنتُمْ تَخْتَانُونَ أَنفُسَكُمْ فَتَابَ عَلَيْكُمْ وَعَفَا عَنكُمْ ۖ فَٱلْـَٰٔنَ بَٰشِرُوهُنَّ وَٱبْتَغُوا۟ مَا كَتَبَ ٱللَّهُ لَكُمْ ۚ وَكُلُوا۟ وَٱشْرَبُوا۟ حَتَّىٰ يَتَبَيَّنَ لَكُمُ ٱلْخَيْطُ ٱلْأَبْيَضُ مِنَ ٱلْخَيْطِ ٱلْأَسْوَدِ مِنَ ٱلْفَجْرِ ۖ ثُمَّ أَتِمُّوا۟ ٱلصِّيَامَ إِلَى ٱلَّيْلِ ۚ وَلَا تُبَٰشِرُوهُنَّ وَأَنتُمْ عَٰكِفُونَ فِى ٱلْمَسَٰجِدِ ۗ تِلْكَ حُدُودُ ٱللَّهِ فَلَا تَقْرَبُوهَا ۗ كَذَٰلِكَ يُبَيِّنُ ٱللَّهُ ءَايَٰتِهِۦ لِلنَّاسِ لَعَلَّهُمْ يَتَّقُونَ"
  }
 },
 {
  "id": "pro-anta",
  "n": 16,
  "group": "pronoun",
  "form": "أَنتَ",
  "translit": "anta",
  "gloss": "you (one man)",
  "role": "2nd person masculine singular",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "أَنتَ",
    "gloss": "you"
   },
   {
    "word": "وَأَنتَ",
    "gloss": "and you"
   }
  ],
  "count": 69,
  "verse": {
   "ref": "90:2",
   "surah": "Sūrat Al-Balad",
   "text": "وَأَنتَ حِلٌّۢ بِهَٰذَا ٱلْبَلَدِ"
  }
 },
 {
  "id": "pro-anti",
  "n": 17,
  "group": "pronoun",
  "form": "أَنتِ",
  "translit": "anti",
  "gloss": "you (one woman)",
  "role": "2nd person feminine singular",
  "attaches": "",
  "note": "This exact word is not in the Qur'an. You meet this person as ـكِ attached to a word — رَبُّكِ, لَكِ — and as كُنتِ on a verb.",
  "examples": [
   {
    "word": "رَبِّكِ",
    "gloss": "your Lord (speaking to a woman)"
   },
   {
    "word": "لَكِ",
    "gloss": "for you (fem.)"
   }
  ],
  "count": 5,
  "verse": {
   "ref": "89:28",
   "surah": "Sūrat Al-Fajr",
   "text": "ٱرْجِعِىٓ إِلَىٰ رَبِّكِ رَاضِيَةًۭ مَّرْضِيَّةًۭ"
  }
 },
 {
  "id": "pro-antuma",
  "n": 18,
  "group": "pronoun",
  "form": "أَنتُمَا",
  "translit": "antumā",
  "gloss": "you two",
  "role": "2nd person dual",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "أَنتُمَا",
    "gloss": "you two"
   }
  ],
  "count": 1,
  "verse": {
   "ref": "28:35",
   "surah": "Sūrat Al-Qasas",
   "text": "قَالَ سَنَشُدُّ عَضُدَكَ بِأَخِيكَ وَنَجْعَلُ لَكُمَا سُلْطَٰنًۭا فَلَا يَصِلُونَ إِلَيْكُمَا ۚ بِـَٔايَٰتِنَآ أَنتُمَا وَمَنِ ٱتَّبَعَكُمَا ٱلْغَٰلِبُونَ"
  }
 },
 {
  "id": "pro-antum",
  "n": 19,
  "group": "pronoun",
  "form": "أَنتُمْ",
  "translit": "antum",
  "gloss": "you (men, or mixed)",
  "role": "2nd person masculine plural",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "أَنتُمْ",
    "gloss": "you (pl.)"
   },
   {
    "word": "وَأَنتُمْ",
    "gloss": "while you"
   }
  ],
  "count": 88,
  "verse": {
   "ref": "37:162",
   "surah": "Sūrat As-Saaffaat",
   "text": "مَآ أَنتُمْ عَلَيْهِ بِفَٰتِنِينَ"
  }
 },
 {
  "id": "pro-antunna",
  "n": 20,
  "group": "pronoun",
  "form": "أَنتُنَّ",
  "translit": "antunna",
  "gloss": "you (women)",
  "role": "2nd person feminine plural",
  "attaches": "",
  "note": "This exact word is not in the Qur'an. You meet this person as ـكُنَّ attached to a word and as ـتُنَّ on a verb.",
  "examples": [
   {
    "word": "كُنتُنَّ",
    "gloss": "you (women) were"
   },
   {
    "word": "لَهُنَّ",
    "gloss": "for them (women)"
   }
  ],
  "count": 12,
  "verse": {
   "ref": "33:29",
   "surah": "Sūrat Al-Ahzaab",
   "text": "وَإِن كُنتُنَّ تُرِدْنَ ٱللَّهَ وَرَسُولَهُۥ وَٱلدَّارَ ٱلْءَاخِرَةَ فَإِنَّ ٱللَّهَ أَعَدَّ لِلْمُحْسِنَٰتِ مِنكُنَّ أَجْرًا عَظِيمًۭا"
  }
 },
 {
  "id": "pro-ana",
  "n": 21,
  "group": "pronoun",
  "form": "أَنَا۠",
  "translit": "anā",
  "gloss": "I",
  "role": "1st person singular",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "إِنَّا",
    "gloss": "I"
   },
   {
    "word": "وَإِنَّا",
    "gloss": "and I"
   }
  ],
  "count": 143,
  "verse": {
   "ref": "15:64",
   "surah": "Sūrat Al-Hijr",
   "text": "وَأَتَيْنَٰكَ بِٱلْحَقِّ وَإِنَّا لَصَٰدِقُونَ"
  }
 },
 {
  "id": "pro-nahnu",
  "n": 22,
  "group": "pronoun",
  "form": "نَحْنُ",
  "translit": "naḥnu",
  "gloss": "we",
  "role": "1st person plural",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "نَحْنُ",
    "gloss": "we"
   },
   {
    "word": "وَنَحْنُ",
    "gloss": "and we"
   }
  ],
  "count": 70,
  "verse": {
   "ref": "26:203",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "فَيَقُولُوا۟ هَلْ نَحْنُ مُنظَرُونَ"
  }
 },
 {
  "id": "pro-iyyaka",
  "n": 23,
  "group": "pronoun",
  "form": "إِيَّاكَ",
  "translit": "iyyāka",
  "gloss": "you — as the object, brought forward",
  "role": "detached object pronoun",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "إِيَّاكَ",
    "gloss": "You (alone)"
   }
  ],
  "count": 1,
  "verse": {
   "ref": "1:5",
   "surah": "Sūrat Al-Faatiha",
   "text": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ"
  }
 },
 {
  "id": "pro-iyyahu",
  "n": 24,
  "group": "pronoun",
  "form": "إِيَّاهُ",
  "translit": "iyyāhu",
  "gloss": "him — as the object, brought forward",
  "role": "detached object pronoun",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "إِيَّاهُ",
    "gloss": "Him (alone)"
   }
  ],
  "count": 8,
  "verse": {
   "ref": "6:41",
   "surah": "Sūrat Al-An'aam",
   "text": "بَلْ إِيَّاهُ تَدْعُونَ فَيَكْشِفُ مَا تَدْعُونَ إِلَيْهِ إِن شَآءَ وَتَنسَوْنَ مَا تُشْرِكُونَ"
  }
 },
 {
  "id": "att-hu",
  "n": 25,
  "group": "attached",
  "form": "ـهُ",
  "translit": "-hu",
  "gloss": "his, him, its",
  "role": "3rd person masculine singular",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "كِتَٰبَهُۥ",
    "gloss": "his book"
   },
   {
    "word": "رَبَّهُۥ",
    "gloss": "his Lord"
   },
   {
    "word": "لَهُۥ",
    "gloss": "for him / he has"
   }
  ],
  "count": 202,
  "verse": {
   "ref": "84:7",
   "surah": "Sūrat Al-Inshiqaaq",
   "text": "فَأَمَّا مَنْ أُوتِىَ كِتَٰبَهُۥ بِيَمِينِهِۦ"
  }
 },
 {
  "id": "att-ha",
  "n": 26,
  "group": "attached",
  "form": "ـهَا",
  "translit": "-hā",
  "gloss": "her, it, its",
  "role": "3rd person feminine singular",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "فِيهَا",
    "gloss": "in it"
   },
   {
    "word": "مِنْهَا",
    "gloss": "from it"
   }
  ],
  "count": 270,
  "verse": {
   "ref": "15:34",
   "surah": "Sūrat Al-Hijr",
   "text": "قَالَ فَٱخْرُجْ مِنْهَا فَإِنَّكَ رَجِيمٌۭ"
  }
 },
 {
  "id": "att-huma",
  "n": 27,
  "group": "attached",
  "form": "ـهُمَا",
  "translit": "-humā",
  "gloss": "their (two), them (two)",
  "role": "3rd person dual",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "بَيْنَهُمَا",
    "gloss": "between them two"
   },
   {
    "word": "لَهُمَا",
    "gloss": "for them two"
   }
  ],
  "count": 28,
  "verse": {
   "ref": "55:20",
   "surah": "Sūrat Ar-Rahmaan",
   "text": "بَيْنَهُمَا بَرْزَخٌۭ لَّا يَبْغِيَانِ"
  }
 },
 {
  "id": "att-hum",
  "n": 28,
  "group": "attached",
  "form": "ـهُمْ",
  "translit": "-hum",
  "gloss": "their, them",
  "role": "3rd person masculine plural",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "لَهُمْ",
    "gloss": "for them"
   },
   {
    "word": "مِنْهُمْ",
    "gloss": "from them"
   }
  ],
  "count": 284,
  "verse": {
   "ref": "15:79",
   "surah": "Sūrat Al-Hijr",
   "text": "فَٱنتَقَمْنَا مِنْهُمْ وَإِنَّهُمَا لَبِإِمَامٍۢ مُّبِينٍۢ"
  }
 },
 {
  "id": "att-him",
  "n": 29,
  "group": "attached",
  "form": "ـهِمْ",
  "translit": "-him",
  "gloss": "their, them — after an i-sound",
  "role": "3rd person masculine plural, i-form",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "رَبِّهِمْ",
    "gloss": "their Lord"
   },
   {
    "word": "عَلَيْهِمْ",
    "gloss": "upon them"
   }
  ],
  "count": 200,
  "verse": {
   "ref": "16:42",
   "surah": "Sūrat An-Nahl",
   "text": "ٱلَّذِينَ صَبَرُوا۟ وَعَلَىٰ رَبِّهِمْ يَتَوَكَّلُونَ"
  }
 },
 {
  "id": "att-hunna",
  "n": 30,
  "group": "attached",
  "form": "ـهُنَّ",
  "translit": "-hunna",
  "gloss": "their, them (women)",
  "role": "3rd person feminine plural",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "لَهُنَّ",
    "gloss": "for them (fem.)"
   },
   {
    "word": "بُعُولَتِهِنَّ",
    "gloss": "their husbands"
   }
  ],
  "count": 12,
  "verse": {
   "ref": "2:228",
   "surah": "Sūrat Al-Baqara",
   "text": "وَٱلْمُطَلَّقَٰتُ يَتَرَبَّصْنَ بِأَنفُسِهِنَّ ثَلَٰثَةَ قُرُوٓءٍۢ ۚ وَلَا يَحِلُّ لَهُنَّ أَن يَكْتُمْنَ مَا خَلَقَ ٱللَّهُ فِىٓ أَرْحَامِهِنَّ إِن كُنَّ يُؤْمِنَّ بِٱللَّهِ وَٱلْيَوْمِ ٱلْءَاخِرِ ۚ وَبُعُولَتُهُنَّ أَحَقُّ بِرَدِّهِنَّ فِى ذَٰلِكَ إِنْ أَرَادُوٓا۟ إِصْلَٰحًۭا ۚ وَلَهُنَّ مِثْلُ ٱلَّذِى عَلَيْهِنَّ بِٱلْمَعْرُوفِ ۚ وَلِلرِّجَالِ عَلَيْهِنَّ دَرَجَةٌۭ ۗ وَٱللَّهُ عَزِيزٌ حَكِيمٌ"
  }
 },
 {
  "id": "att-ka",
  "n": 31,
  "group": "attached",
  "form": "ـكَ",
  "translit": "-ka",
  "gloss": "your, you (one man)",
  "role": "2nd person masculine singular",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "رَبِّكَ",
    "gloss": "your Lord"
   },
   {
    "word": "لَكَ",
    "gloss": "for you"
   }
  ],
  "count": 140,
  "verse": {
   "ref": "19:2",
   "surah": "Sūrat Maryam",
   "text": "ذِكْرُ رَحْمَتِ رَبِّكَ عَبْدَهُۥ زَكَرِيَّآ"
  }
 },
 {
  "id": "att-ki",
  "n": 32,
  "group": "attached",
  "form": "ـكِ",
  "translit": "-ki",
  "gloss": "your, you (one woman)",
  "role": "2nd person feminine singular",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "رَبِّكِ",
    "gloss": "your Lord (to a woman)"
   },
   {
    "word": "لَكِ",
    "gloss": "for you (fem.)"
   }
  ],
  "count": 5,
  "verse": {
   "ref": "89:28",
   "surah": "Sūrat Al-Fajr",
   "text": "ٱرْجِعِىٓ إِلَىٰ رَبِّكِ رَاضِيَةًۭ مَّرْضِيَّةًۭ"
  }
 },
 {
  "id": "att-kuma",
  "n": 33,
  "group": "attached",
  "form": "ـكُمَا",
  "translit": "-kumā",
  "gloss": "your (two), you (two)",
  "role": "2nd person dual",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "رَبِّكُمَا",
    "gloss": "your Lord (to two)"
   },
   {
    "word": "لَكُمَا",
    "gloss": "for you two"
   }
  ],
  "count": 36,
  "verse": {
   "ref": "55:13",
   "surah": "Sūrat Ar-Rahmaan",
   "text": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ"
  }
 },
 {
  "id": "att-kum",
  "n": 34,
  "group": "attached",
  "form": "ـكُمْ",
  "translit": "-kum",
  "gloss": "your, you (plural)",
  "role": "2nd person masculine plural",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "رَّبِّكُمْ",
    "gloss": "your Lord"
   },
   {
    "word": "لَكُمْ",
    "gloss": "for you (pl.)"
   }
  ],
  "count": 196,
  "verse": {
   "ref": "2:242",
   "surah": "Sūrat Al-Baqara",
   "text": "كَذَٰلِكَ يُبَيِّنُ ٱللَّهُ لَكُمْ ءَايَٰتِهِۦ لَعَلَّكُمْ تَعْقِلُونَ"
  }
 },
 {
  "id": "att-kunna",
  "n": 35,
  "group": "attached",
  "form": "ـكُنَّ",
  "translit": "-kunna",
  "gloss": "your, you (women)",
  "role": "2nd person feminine plural",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "بُيُوتِكُنَّ",
    "gloss": "your houses (to the wives of the Prophet)"
   }
  ],
  "count": 2,
  "verse": {
   "ref": "33:33",
   "surah": "Sūrat Al-Ahzaab",
   "text": "وَقَرْنَ فِى بُيُوتِكُنَّ وَلَا تَبَرَّجْنَ تَبَرُّجَ ٱلْجَٰهِلِيَّةِ ٱلْأُولَىٰ ۖ وَأَقِمْنَ ٱلصَّلَوٰةَ وَءَاتِينَ ٱلزَّكَوٰةَ وَأَطِعْنَ ٱللَّهَ وَرَسُولَهُۥٓ ۚ إِنَّمَا يُرِيدُ ٱللَّهُ لِيُذْهِبَ عَنكُمُ ٱلرِّجْسَ أَهْلَ ٱلْبَيْتِ وَيُطَهِّرَكُمْ تَطْهِيرًۭا"
  }
 },
 {
  "id": "att-na",
  "n": 36,
  "group": "attached",
  "form": "ـنَا",
  "translit": "-nā",
  "gloss": "our, us",
  "role": "1st person plural",
  "attaches": "noun, verb or preposition",
  "note": "",
  "examples": [
   {
    "word": "رَبَّنَا",
    "gloss": "our Lord"
   },
   {
    "word": "لَنَا",
    "gloss": "for us"
   }
  ],
  "count": 99,
  "verse": {
   "ref": "23:47",
   "surah": "Sūrat Al-Muminoon",
   "text": "فَقَالُوٓا۟ أَنُؤْمِنُ لِبَشَرَيْنِ مِثْلِنَا وَقَوْمُهُمَا لَنَا عَٰبِدُونَ"
  }
 },
 {
  "id": "att-i",
  "n": 37,
  "group": "attached",
  "form": "ـِى",
  "translit": "-ī",
  "gloss": "my",
  "role": "1st person singular, on a noun",
  "attaches": "noun or preposition",
  "note": "",
  "examples": [
   {
    "word": "رَبِّى",
    "gloss": "my Lord"
   },
   {
    "word": "لِى",
    "gloss": "for me"
   }
  ],
  "count": 107,
  "verse": {
   "ref": "20:25",
   "surah": "Sūrat Taa-Haa",
   "text": "قَالَ رَبِّ ٱشْرَحْ لِى صَدْرِى"
  }
 },
 {
  "id": "att-ni",
  "n": 38,
  "group": "attached",
  "form": "ـنِى",
  "translit": "-nī",
  "gloss": "me",
  "role": "1st person singular, on a verb",
  "attaches": "verb",
  "note": "",
  "examples": [
   {
    "word": "فَٱذْكُرُونِىٓ",
    "gloss": "so remember Me"
   },
   {
    "word": "ٱتَّبِعُونِ",
    "gloss": "follow me"
   }
  ],
  "count": 2,
  "verse": {
   "ref": "2:152",
   "surah": "Sūrat Al-Baqara",
   "text": "فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ"
  }
 },
 {
  "id": "vb-tu",
  "n": 39,
  "group": "verbEnding",
  "form": "ـتُ",
  "translit": "-tu",
  "gloss": "I — (past)",
  "role": "past-tense subject ending",
  "attaches": "past verb",
  "note": "",
  "examples": [
   {
    "word": "قُلْتُ",
    "gloss": "I said"
   },
   {
    "word": "خَلَقْتُ",
    "gloss": "I created"
   }
  ],
  "count": 4,
  "verse": {
   "ref": "74:11",
   "surah": "Sūrat Al-Muddaththir",
   "text": "ذَرْنِى وَمَنْ خَلَقْتُ وَحِيدًۭا"
  }
 },
 {
  "id": "vb-ta",
  "n": 40,
  "group": "verbEnding",
  "form": "ـتَ",
  "translit": "-ta",
  "gloss": "you (one man) — (past)",
  "role": "past-tense subject ending",
  "attaches": "past verb",
  "note": "",
  "examples": [
   {
    "word": "قُلْتَ",
    "gloss": "you said"
   },
   {
    "word": "عَلَّمْتَنَآ",
    "gloss": "You taught us"
   }
  ],
  "count": 5,
  "verse": {
   "ref": "2:32",
   "surah": "Sūrat Al-Baqara",
   "text": "قَالُوا۟ سُبْحَٰنَكَ لَا عِلْمَ لَنَآ إِلَّا مَا عَلَّمْتَنَآ ۖ إِنَّكَ أَنتَ ٱلْعَلِيمُ ٱلْحَكِيمُ"
  }
 },
 {
  "id": "vb-ti",
  "n": 41,
  "group": "verbEnding",
  "form": "ـتِ",
  "translit": "-ti",
  "gloss": "you (one woman) — (past)",
  "role": "past-tense subject ending",
  "attaches": "past verb",
  "note": "",
  "examples": [
   {
    "word": "كُنتِ",
    "gloss": "you (fem.) were"
   }
  ],
  "count": 1,
  "verse": {
   "ref": "12:29",
   "surah": "Sūrat Yusuf",
   "text": "يُوسُفُ أَعْرِضْ عَنْ هَٰذَا ۚ وَٱسْتَغْفِرِى لِذَنۢبِكِ ۖ إِنَّكِ كُنتِ مِنَ ٱلْخَاطِـِٔينَ"
  }
 },
 {
  "id": "vb-fem-sg",
  "n": 42,
  "group": "verbEnding",
  "form": "ـِى",
  "translit": "-ī",
  "gloss": "you (one woman) — on a command or present verb",
  "role": "feminine singular verb ending",
  "attaches": "verb",
  "note": "",
  "examples": [
   {
    "word": "كُلِى",
    "gloss": "eat! (to a woman)"
   },
   {
    "word": "وَٱشْرَبِى",
    "gloss": "and drink!"
   },
   {
    "word": "وَٱسْجُدِى",
    "gloss": "and prostrate!"
   }
  ],
  "count": 3,
  "verse": {
   "ref": "3:43",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "يَٰمَرْيَمُ ٱقْنُتِى لِرَبِّكِ وَٱسْجُدِى وَٱرْكَعِى مَعَ ٱلرَّٰكِعِينَ"
  }
 },
 {
  "id": "vb-tuma",
  "n": 43,
  "group": "verbEnding",
  "form": "ـتُمَا",
  "translit": "-tumā",
  "gloss": "you two — (past)",
  "role": "past-tense subject ending",
  "attaches": "past verb",
  "note": "",
  "examples": [
   {
    "word": "شِئْتُمَا",
    "gloss": "you two wished"
   }
  ],
  "count": 2,
  "verse": {
   "ref": "2:35",
   "surah": "Sūrat Al-Baqara",
   "text": "وَقُلْنَا يَٰٓـَٔادَمُ ٱسْكُنْ أَنتَ وَزَوْجُكَ ٱلْجَنَّةَ وَكُلَا مِنْهَا رَغَدًا حَيْثُ شِئْتُمَا وَلَا تَقْرَبَا هَٰذِهِ ٱلشَّجَرَةَ فَتَكُونَا مِنَ ٱلظَّٰلِمِينَ"
  }
 },
 {
  "id": "vb-tum",
  "n": 44,
  "group": "verbEnding",
  "form": "ـتُمْ",
  "translit": "-tum",
  "gloss": "you (plural) — (past)",
  "role": "past-tense subject ending",
  "attaches": "past verb",
  "note": "",
  "examples": [
   {
    "word": "كُنتُمْ",
    "gloss": "you (pl.) were"
   },
   {
    "word": "قُلْتُمْ",
    "gloss": "you (pl.) said"
   }
  ],
  "count": 159,
  "verse": {
   "ref": "2:72",
   "surah": "Sūrat Al-Baqara",
   "text": "وَإِذْ قَتَلْتُمْ نَفْسًۭا فَٱدَّٰرَْٰٔتُمْ فِيهَا ۖ وَٱللَّهُ مُخْرِجٌۭ مَّا كُنتُمْ تَكْتُمُونَ"
  }
 },
 {
  "id": "vb-tunna",
  "n": 45,
  "group": "verbEnding",
  "form": "ـتُنَّ",
  "translit": "-tunna",
  "gloss": "you (women) — (past)",
  "role": "past-tense subject ending",
  "attaches": "past verb",
  "note": "",
  "examples": [
   {
    "word": "كُنتُنَّ",
    "gloss": "you (fem. pl.) were"
   }
  ],
  "count": 2,
  "verse": {
   "ref": "33:29",
   "surah": "Sūrat Al-Ahzaab",
   "text": "وَإِن كُنتُنَّ تُرِدْنَ ٱللَّهَ وَرَسُولَهُۥ وَٱلدَّارَ ٱلْءَاخِرَةَ فَإِنَّ ٱللَّهَ أَعَدَّ لِلْمُحْسِنَٰتِ مِنكُنَّ أَجْرًا عَظِيمًۭا"
  }
 },
 {
  "id": "vb-na-past",
  "n": 46,
  "group": "verbEnding",
  "form": "ـنَا",
  "translit": "-nā",
  "gloss": "we — (past)",
  "role": "past-tense subject ending",
  "attaches": "past verb",
  "note": "",
  "examples": [
   {
    "word": "قُلْنَا",
    "gloss": "We said"
   },
   {
    "word": "جَعَلْنَا",
    "gloss": "We made"
   }
  ],
  "count": 41,
  "verse": {
   "ref": "20:68",
   "surah": "Sūrat Taa-Haa",
   "text": "قُلْنَا لَا تَخَفْ إِنَّكَ أَنتَ ٱلْأَعْلَىٰ"
  }
 },
 {
  "id": "vb-at",
  "n": 47,
  "group": "verbEnding",
  "form": "ـَتْ",
  "translit": "-at",
  "gloss": "she — (past)",
  "role": "past-tense subject ending",
  "attaches": "past verb",
  "note": "",
  "examples": [
   {
    "word": "قَالَتْ",
    "gloss": "she said"
   },
   {
    "word": "كَانَتْ",
    "gloss": "she was"
   }
  ],
  "count": 46,
  "verse": {
   "ref": "78:21",
   "surah": "Sūrat An-Naba",
   "text": "إِنَّ جَهَنَّمَ كَانَتْ مِرْصَادًۭا"
  }
 },
 {
  "id": "vb-aa",
  "n": 48,
  "group": "verbEnding",
  "form": "ـَا",
  "translit": "-ā",
  "gloss": "they two — (past)",
  "role": "past-tense subject ending",
  "attaches": "past verb",
  "note": "",
  "examples": [
   {
    "word": "قَالَا",
    "gloss": "they two said"
   },
   {
    "word": "كَانَا",
    "gloss": "they two were"
   }
  ],
  "count": 4,
  "verse": {
   "ref": "20:45",
   "surah": "Sūrat Taa-Haa",
   "text": "قَالَا رَبَّنَآ إِنَّنَا نَخَافُ أَن يَفْرُطَ عَلَيْنَآ أَوْ أَن يَطْغَىٰ"
  }
 },
 {
  "id": "vb-uu",
  "n": 49,
  "group": "verbEnding",
  "form": "ـُوا۟",
  "translit": "-ū",
  "gloss": "they (men) — (past)",
  "role": "past-tense subject ending",
  "attaches": "past verb",
  "note": "",
  "examples": [
   {
    "word": "قَالُوا۟",
    "gloss": "they said"
   },
   {
    "word": "كَانُوا۟",
    "gloss": "they were"
   }
  ],
  "count": 383,
  "verse": {
   "ref": "6:49",
   "surah": "Sūrat Al-An'aam",
   "text": "وَٱلَّذِينَ كَذَّبُوا۟ بِـَٔايَٰتِنَا يَمَسُّهُمُ ٱلْعَذَابُ بِمَا كَانُوا۟ يَفْسُقُونَ"
  }
 },
 {
  "id": "vb-na-fem",
  "n": 50,
  "group": "verbEnding",
  "form": "ـْنَ",
  "translit": "-na",
  "gloss": "they / you (women)",
  "role": "feminine plural subject ending",
  "attaches": "verb",
  "note": "",
  "examples": [
   {
    "word": "يَتَرَبَّصْنَ",
    "gloss": "they (women) wait"
   },
   {
    "word": "يُرْضِعْنَ",
    "gloss": "they (mothers) suckle"
   }
  ],
  "count": 3,
  "verse": {
   "ref": "2:228",
   "surah": "Sūrat Al-Baqara",
   "text": "وَٱلْمُطَلَّقَٰتُ يَتَرَبَّصْنَ بِأَنفُسِهِنَّ ثَلَٰثَةَ قُرُوٓءٍۢ ۚ وَلَا يَحِلُّ لَهُنَّ أَن يَكْتُمْنَ مَا خَلَقَ ٱللَّهُ فِىٓ أَرْحَامِهِنَّ إِن كُنَّ يُؤْمِنَّ بِٱللَّهِ وَٱلْيَوْمِ ٱلْءَاخِرِ ۚ وَبُعُولَتُهُنَّ أَحَقُّ بِرَدِّهِنَّ فِى ذَٰلِكَ إِنْ أَرَادُوٓا۟ إِصْلَٰحًۭا ۚ وَلَهُنَّ مِثْلُ ٱلَّذِى عَلَيْهِنَّ بِٱلْمَعْرُوفِ ۚ وَلِلرِّجَالِ عَلَيْهِنَّ دَرَجَةٌۭ ۗ وَٱللَّهُ عَزِيزٌ حَكِيمٌ"
  }
 },
 {
  "id": "vb-ya",
  "n": 51,
  "group": "verbEnding",
  "form": "يَـ",
  "translit": "ya-",
  "gloss": "he / they — (present)",
  "role": "present-tense subject prefix",
  "attaches": "present verb",
  "note": "",
  "examples": [
   {
    "word": "يَعْلَمُ",
    "gloss": "he knows"
   },
   {
    "word": "يَقُولُ",
    "gloss": "he says"
   }
  ],
  "count": 97,
  "verse": {
   "ref": "37:52",
   "surah": "Sūrat As-Saaffaat",
   "text": "يَقُولُ أَءِنَّكَ لَمِنَ ٱلْمُصَدِّقِينَ"
  }
 },
 {
  "id": "vb-ta-pre",
  "n": 52,
  "group": "verbEnding",
  "form": "تَـ",
  "translit": "ta-",
  "gloss": "you / she — (present)",
  "role": "present-tense subject prefix",
  "attaches": "present verb",
  "note": "",
  "examples": [
   {
    "word": "تَعْلَمُونَ",
    "gloss": "you (pl.) know"
   },
   {
    "word": "تَعْمَلُونَ",
    "gloss": "you (pl.) do"
   }
  ],
  "count": 137,
  "verse": {
   "ref": "6:67",
   "surah": "Sūrat Al-An'aam",
   "text": "لِّكُلِّ نَبَإٍۢ مُّسْتَقَرٌّۭ ۚ وَسَوْفَ تَعْلَمُونَ"
  }
 },
 {
  "id": "vb-na-pre",
  "n": 53,
  "group": "verbEnding",
  "form": "نَـ",
  "translit": "na-",
  "gloss": "we — (present)",
  "role": "present-tense subject prefix",
  "attaches": "present verb",
  "note": "",
  "examples": [
   {
    "word": "نَعْبُدُ",
    "gloss": "we worship"
   },
   {
    "word": "نَسْتَعِينُ",
    "gloss": "we seek help"
   }
  ],
  "count": 4,
  "verse": {
   "ref": "1:5",
   "surah": "Sūrat Al-Faatiha",
   "text": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ"
  }
 },
 {
  "id": "vb-a-pre",
  "n": 54,
  "group": "verbEnding",
  "form": "أَـ",
  "translit": "a-",
  "gloss": "I — (present)",
  "role": "present-tense subject prefix",
  "attaches": "present verb",
  "note": "",
  "examples": [
   {
    "word": "أَعْبُدُ",
    "gloss": "I worship"
   },
   {
    "word": "أَقُولُ",
    "gloss": "I say"
   }
  ],
  "count": 15,
  "verse": {
   "ref": "109:2",
   "surah": "Sūrat Al-Kaafiroon",
   "text": "لَآ أَعْبُدُ مَا تَعْبُدُونَ"
  }
 },
 {
  "id": "vb-uuna",
  "n": 55,
  "group": "verbEnding",
  "form": "ـُونَ",
  "translit": "-ūna",
  "gloss": "they / you (plural) — (present)",
  "role": "present-tense plural ending",
  "attaches": "present verb",
  "note": "",
  "examples": [
   {
    "word": "يَعْلَمُونَ",
    "gloss": "they know"
   },
   {
    "word": "يَعْمَلُونَ",
    "gloss": "they do"
   }
  ],
  "count": 137,
  "verse": {
   "ref": "7:118",
   "surah": "Sūrat Al-A'raaf",
   "text": "فَوَقَعَ ٱلْحَقُّ وَبَطَلَ مَا كَانُوا۟ يَعْمَلُونَ"
  }
 },
 {
  "id": "vb-aani",
  "n": 56,
  "group": "verbEnding",
  "form": "ـَانِ",
  "translit": "-āni",
  "gloss": "you two / they two — (present)",
  "role": "present-tense dual ending",
  "attaches": "present verb",
  "note": "",
  "examples": [
   {
    "word": "تُكَذِّبَانِ",
    "gloss": "you two deny"
   }
  ],
  "count": 31,
  "verse": {
   "ref": "55:13",
   "surah": "Sūrat Ar-Rahmaan",
   "text": "فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ"
  }
 },
 {
  "id": "vb-imp",
  "n": 57,
  "group": "verbEnding",
  "form": "ٱ… ـُوا۟",
  "translit": "u-…-ū",
  "gloss": "do it! — (an order to more than one)",
  "role": "plural imperative",
  "attaches": "verb",
  "note": "",
  "examples": [
   {
    "word": "ٱعْبُدُوا۟",
    "gloss": "worship!"
   },
   {
    "word": "ٱدْخُلُوا۟",
    "gloss": "enter!"
   }
  ],
  "count": 28,
  "verse": {
   "ref": "71:3",
   "surah": "Sūrat Nooh",
   "text": "أَنِ ٱعْبُدُوا۟ ٱللَّهَ وَٱتَّقُوهُ وَأَطِيعُونِ"
  }
 },
 {
  "id": "vb-imp-sg",
  "n": 58,
  "group": "verbEnding",
  "form": "ٱ… / قُلْ",
  "translit": "—",
  "gloss": "do it! — (an order to one person)",
  "role": "singular imperative",
  "attaches": "verb",
  "note": "",
  "examples": [
   {
    "word": "قُلْ",
    "gloss": "say!"
   },
   {
    "word": "ٱتَّقُوا۟",
    "gloss": "be mindful!"
   }
  ],
  "count": 232,
  "verse": {
   "ref": "9:119",
   "surah": "Sūrat At-Tawba",
   "text": "يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱتَّقُوا۟ ٱللَّهَ وَكُونُوا۟ مَعَ ٱلصَّٰدِقِينَ"
  }
 },
 {
  "id": "vb-lam",
  "n": 59,
  "group": "verbEnding",
  "form": "لَمْ + ـْ",
  "translit": "lam",
  "gloss": "did not — (present form, past meaning)",
  "role": "negation that shortens the verb",
  "attaches": "present verb",
  "note": "",
  "examples": [
   {
    "word": "لَمْ",
    "gloss": "did not"
   },
   {
    "word": "يَلِدْ",
    "gloss": "he begot"
   }
  ],
  "count": 90,
  "verse": {
   "ref": "112:3",
   "surah": "Sūrat Al-Ikhlaas",
   "text": "لَمْ يَلِدْ وَلَمْ يُولَدْ"
  }
 },
 {
  "id": "vb-la",
  "n": 60,
  "group": "verbEnding",
  "form": "لَا",
  "translit": "lā",
  "gloss": "does not / do not",
  "role": "negation or prohibition",
  "attaches": "present verb",
  "note": "",
  "examples": [
   {
    "word": "لَا",
    "gloss": "not"
   },
   {
    "word": "يَعْلَمُونَ",
    "gloss": "they know"
   }
  ],
  "count": 697,
  "verse": {
   "ref": "2:18",
   "surah": "Sūrat Al-Baqara",
   "text": "صُمٌّۢ بُكْمٌ عُمْىٌۭ فَهُمْ لَا يَرْجِعُونَ"
  }
 },
 {
  "id": "vb-nna",
  "n": 61,
  "group": "verbEnding",
  "form": "ـَنَّ",
  "translit": "-anna",
  "gloss": "he certainly will — (heavy emphasis)",
  "role": "emphatic nūn",
  "attaches": "verb",
  "note": "",
  "examples": [
   {
    "word": "لَنُخْرِجَنَّكُم",
    "gloss": "we will surely drive you out"
   },
   {
    "word": "وَلَيَكُونًۭا",
    "gloss": "and he will surely be"
   }
  ],
  "count": 2,
  "verse": {
   "ref": "14:13",
   "surah": "Sūrat Ibrahim",
   "text": "وَقَالَ ٱلَّذِينَ كَفَرُوا۟ لِرُسُلِهِمْ لَنُخْرِجَنَّكُم مِّنْ أَرْضِنَآ أَوْ لَتَعُودُنَّ فِى مِلَّتِنَا ۖ فَأَوْحَىٰٓ إِلَيْهِمْ رَبُّهُمْ لَنُهْلِكَنَّ ٱلظَّٰلِمِينَ"
  }
 },
 {
  "id": "nn-un",
  "n": 62,
  "group": "nounEnding",
  "form": "ـٌ",
  "translit": "-un",
  "gloss": "the subject — one, unspecified",
  "role": "nominative, indefinite",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "نُورٌۭ",
    "gloss": "a light"
   },
   {
    "word": "خَيْرٌۭ",
    "gloss": "a good thing"
   }
  ],
  "count": 67,
  "verse": {
   "ref": "12:57",
   "surah": "Sūrat Yusuf",
   "text": "وَلَأَجْرُ ٱلْءَاخِرَةِ خَيْرٌۭ لِّلَّذِينَ ءَامَنُوا۟ وَكَانُوا۟ يَتَّقُونَ"
  }
 },
 {
  "id": "nn-an",
  "n": 63,
  "group": "nounEnding",
  "form": "ـًا",
  "translit": "-an",
  "gloss": "the object — one, unspecified",
  "role": "accusative, indefinite",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "كَثِيرًۭا",
    "gloss": "much, many"
   },
   {
    "word": "قَلِيلًۭا",
    "gloss": "a little"
   }
  ],
  "count": 88,
  "verse": {
   "ref": "51:17",
   "surah": "Sūrat Adh-Dhaariyat",
   "text": "كَانُوا۟ قَلِيلًۭا مِّنَ ٱلَّيْلِ مَا يَهْجَعُونَ"
  }
 },
 {
  "id": "nn-in",
  "n": 64,
  "group": "nounEnding",
  "form": "ـٍ",
  "translit": "-in",
  "gloss": "after a preposition, or “of” — one, unspecified",
  "role": "genitive, indefinite",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "خَيْرٍۢ",
    "gloss": "of good"
   },
   {
    "word": "شَىْءٍۢ",
    "gloss": "of a thing"
   }
  ],
  "count": 131,
  "verse": {
   "ref": "3:115",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "وَمَا يَفْعَلُوا۟ مِنْ خَيْرٍۢ فَلَن يُكْفَرُوهُ ۗ وَٱللَّهُ عَلِيمٌۢ بِٱلْمُتَّقِينَ"
  }
 },
 {
  "id": "nn-uuna",
  "n": 65,
  "group": "nounEnding",
  "form": "ـُونَ",
  "translit": "-ūna",
  "gloss": "many men — as the subject",
  "role": "sound masculine plural, nominative",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "ٱلْمُؤْمِنُونَ",
    "gloss": "the believers"
   },
   {
    "word": "ٱلْمُسْلِمُونَ",
    "gloss": "the Muslims"
   }
  ],
  "count": 23,
  "verse": {
   "ref": "33:11",
   "surah": "Sūrat Al-Ahzaab",
   "text": "هُنَالِكَ ٱبْتُلِىَ ٱلْمُؤْمِنُونَ وَزُلْزِلُوا۟ زِلْزَالًۭا شَدِيدًۭا"
  }
 },
 {
  "id": "nn-iina",
  "n": 66,
  "group": "nounEnding",
  "form": "ـِينَ",
  "translit": "-īna",
  "gloss": "many men — as the object or after a preposition",
  "role": "sound masculine plural, accusative/genitive",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "ٱلْمُؤْمِنِينَ",
    "gloss": "the believers"
   },
   {
    "word": "ٱلْمُتَّقِينَ",
    "gloss": "those mindful of Allah"
   }
  ],
  "count": 101,
  "verse": {
   "ref": "15:45",
   "surah": "Sūrat Al-Hijr",
   "text": "إِنَّ ٱلْمُتَّقِينَ فِى جَنَّٰتٍۢ وَعُيُونٍ"
  }
 },
 {
  "id": "nn-aani",
  "n": 67,
  "group": "nounEnding",
  "form": "ـَانِ",
  "translit": "-āni",
  "gloss": "exactly two — as the subject",
  "role": "dual, nominative",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "رَجُلَانِ",
    "gloss": "two men"
   },
   {
    "word": "جَنَّتَانِ",
    "gloss": "two gardens"
   }
  ],
  "count": 4,
  "verse": {
   "ref": "55:46",
   "surah": "Sūrat Ar-Rahmaan",
   "text": "وَلِمَنْ خَافَ مَقَامَ رَبِّهِۦ جَنَّتَانِ"
  }
 },
 {
  "id": "nn-ayni",
  "n": 68,
  "group": "nounEnding",
  "form": "ـَيْنِ",
  "translit": "-ayni",
  "gloss": "exactly two — as the object or after a preposition",
  "role": "dual, accusative/genitive",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "ٱثْنَيْنِ",
    "gloss": "two"
   },
   {
    "word": "عَيْنَيْنِ",
    "gloss": "two eyes"
   }
  ],
  "count": 11,
  "verse": {
   "ref": "90:8",
   "surah": "Sūrat Al-Balad",
   "text": "أَلَمْ نَجْعَل لَّهُۥ عَيْنَيْنِ"
  }
 },
 {
  "id": "nn-aat",
  "n": 69,
  "group": "nounEnding",
  "form": "ـَٰتٌ",
  "translit": "-āt",
  "gloss": "many women, or many things (feminine)",
  "role": "sound feminine plural",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "ٱلصَّٰلِحَٰتِ",
    "gloss": "the righteous deeds"
   },
   {
    "word": "ٱلْمُؤْمِنَٰتِ",
    "gloss": "the believing women"
   }
  ],
  "count": 64,
  "verse": {
   "ref": "29:9",
   "surah": "Sūrat Al-Ankaboot",
   "text": "وَٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ لَنُدْخِلَنَّهُمْ فِى ٱلصَّٰلِحِينَ"
  }
 },
 {
  "id": "nn-ta",
  "n": 70,
  "group": "nounEnding",
  "form": "ـَةٌ",
  "translit": "-a(tun)",
  "gloss": "marks the word as feminine",
  "role": "tāʾ marbūṭa",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "رَحْمَةًۭ",
    "gloss": "a mercy"
   },
   {
    "word": "جَنَّةٌۭ",
    "gloss": "a garden"
   }
  ],
  "count": 21,
  "verse": {
   "ref": "21:107",
   "surah": "Sūrat Al-Anbiyaa",
   "text": "وَمَآ أَرْسَلْنَٰكَ إِلَّا رَحْمَةًۭ لِّلْعَٰلَمِينَ"
  }
 },
 {
  "id": "nn-mu",
  "n": 71,
  "group": "nounEnding",
  "form": "مُـ",
  "translit": "mu-",
  "gloss": "one who does it / one it is done to",
  "role": "participle prefix",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "مُسْلِمِينَ",
    "gloss": "those who submit"
   },
   {
    "word": "مُّبِينٌۭ",
    "gloss": "clear, making clear"
   }
  ],
  "count": 39,
  "verse": {
   "ref": "37:156",
   "surah": "Sūrat As-Saaffaat",
   "text": "أَمْ لَكُمْ سُلْطَٰنٌۭ مُّبِينٌۭ"
  }
 },
 {
  "id": "nn-ma",
  "n": 72,
  "group": "nounEnding",
  "form": "مَـ",
  "translit": "ma-",
  "gloss": "the place where, or the act of",
  "role": "place / verbal-noun prefix",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "ٱلْمَسْجِدِ",
    "gloss": "the place of prostration"
   },
   {
    "word": "مَكَانٍۢ",
    "gloss": "a place"
   }
  ],
  "count": 16,
  "verse": {
   "ref": "2:144",
   "surah": "Sūrat Al-Baqara",
   "text": "قَدْ نَرَىٰ تَقَلُّبَ وَجْهِكَ فِى ٱلسَّمَآءِ ۖ فَلَنُوَلِّيَنَّكَ قِبْلَةًۭ تَرْضَىٰهَا ۚ فَوَلِّ وَجْهَكَ شَطْرَ ٱلْمَسْجِدِ ٱلْحَرَامِ ۚ وَحَيْثُ مَا كُنتُمْ فَوَلُّوا۟ وُجُوهَكُمْ شَطْرَهُۥ ۗ وَإِنَّ ٱلَّذِينَ أُوتُوا۟ ٱلْكِتَٰبَ لَيَعْلَمُونَ أَنَّهُ ٱلْحَقُّ مِن رَّبِّهِمْ ۗ وَمَا ٱللَّهُ بِغَٰفِلٍ عَمَّا يَعْمَلُونَ"
  }
 },
 {
  "id": "nn-iyy",
  "n": 73,
  "group": "nounEnding",
  "form": "ـِىٌّ",
  "translit": "-iyy",
  "gloss": "belonging to, of the kind of",
  "role": "nisba ending",
  "attaches": "noun",
  "note": "",
  "examples": [
   {
    "word": "عَرَبِيًّۭا",
    "gloss": "Arabic"
   },
   {
    "word": "نَبِيًّۭا",
    "gloss": "a prophet"
   }
  ],
  "count": 11,
  "verse": {
   "ref": "37:112",
   "surah": "Sūrat As-Saaffaat",
   "text": "وَبَشَّرْنَٰهُ بِإِسْحَٰقَ نَبِيًّۭا مِّنَ ٱلصَّٰلِحِينَ"
  }
 },
 {
  "id": "pt-alladhi",
  "n": 74,
  "group": "pointing",
  "form": "ٱلَّذِى",
  "translit": "alladhī",
  "gloss": "the one who, which",
  "role": "relative pronoun, masculine singular",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "ٱلَّذِى",
    "gloss": "the one who"
   },
   {
    "word": "وَٱلَّذِى",
    "gloss": "and the one who"
   }
  ],
  "count": 226,
  "verse": {
   "ref": "26:79",
   "surah": "Sūrat Ash-Shu'araa",
   "text": "وَٱلَّذِى هُوَ يُطْعِمُنِى وَيَسْقِينِ"
  }
 },
 {
  "id": "pt-allati",
  "n": 75,
  "group": "pointing",
  "form": "ٱلَّتِى",
  "translit": "allatī",
  "gloss": "the one who, which (feminine)",
  "role": "relative pronoun, feminine singular",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "ٱلَّتِى",
    "gloss": "the one which (fem.)"
   }
  ],
  "count": 43,
  "verse": {
   "ref": "56:71",
   "surah": "Sūrat Al-Waaqia",
   "text": "أَفَرَءَيْتُمُ ٱلنَّارَ ٱلَّتِى تُورُونَ"
  }
 },
 {
  "id": "pt-alladhina",
  "n": 76,
  "group": "pointing",
  "form": "ٱلَّذِينَ",
  "translit": "alladhīna",
  "gloss": "those who",
  "role": "relative pronoun, masculine plural",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "ٱلَّذِينَ",
    "gloss": "those who"
   },
   {
    "word": "وَٱلَّذِينَ",
    "gloss": "and those who"
   }
  ],
  "count": 973,
  "verse": {
   "ref": "5:10",
   "surah": "Sūrat Al-Maaida",
   "text": "وَٱلَّذِينَ كَفَرُوا۟ وَكَذَّبُوا۟ بِـَٔايَٰتِنَآ أُو۟لَٰٓئِكَ أَصْحَٰبُ ٱلْجَحِيمِ"
  }
 },
 {
  "id": "pt-hadha",
  "n": 77,
  "group": "pointing",
  "form": "هَٰذَا",
  "translit": "hādhā",
  "gloss": "this (near, masculine)",
  "role": "demonstrative",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "هَٰذَا",
    "gloss": "this"
   },
   {
    "word": "وَهَٰذَا",
    "gloss": "and this"
   }
  ],
  "count": 170,
  "verse": {
   "ref": "3:138",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "هَٰذَا بَيَانٌۭ لِّلنَّاسِ وَهُدًۭى وَمَوْعِظَةٌۭ لِّلْمُتَّقِينَ"
  }
 },
 {
  "id": "pt-hadhihi",
  "n": 78,
  "group": "pointing",
  "form": "هَٰذِهِۦ",
  "translit": "hādhihi",
  "gloss": "this (near, feminine)",
  "role": "demonstrative",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "هَٰذِهِ",
    "gloss": "this (fem.)"
   }
  ],
  "count": 23,
  "verse": {
   "ref": "52:14",
   "surah": "Sūrat At-Tur",
   "text": "هَٰذِهِ ٱلنَّارُ ٱلَّتِى كُنتُم بِهَا تُكَذِّبُونَ"
  }
 },
 {
  "id": "pt-dhalika",
  "n": 79,
  "group": "pointing",
  "form": "ذَٰلِكَ",
  "translit": "dhālika",
  "gloss": "that (far, masculine)",
  "role": "demonstrative",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "ذَٰلِكَ",
    "gloss": "that"
   },
   {
    "word": "وَذَٰلِكَ",
    "gloss": "and that"
   }
  ],
  "count": 292,
  "verse": {
   "ref": "3:58",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "ذَٰلِكَ نَتْلُوهُ عَلَيْكَ مِنَ ٱلْءَايَٰتِ وَٱلذِّكْرِ ٱلْحَكِيمِ"
  }
 },
 {
  "id": "pt-tilka",
  "n": 80,
  "group": "pointing",
  "form": "تِلْكَ",
  "translit": "tilka",
  "gloss": "that (far, feminine)",
  "role": "demonstrative",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "تِلْكَ",
    "gloss": "that (fem.)"
   }
  ],
  "count": 27,
  "verse": {
   "ref": "20:17",
   "surah": "Sūrat Taa-Haa",
   "text": "وَمَا تِلْكَ بِيَمِينِكَ يَٰمُوسَىٰ"
  }
 },
 {
  "id": "pt-ulaika",
  "n": 81,
  "group": "pointing",
  "form": "أُو۟لَٰٓئِكَ",
  "translit": "ulāʾika",
  "gloss": "those — (people)",
  "role": "demonstrative, plural",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "أُو۟لَٰٓئِكَ",
    "gloss": "those"
   },
   {
    "word": "فَأُو۟لَٰٓئِكَ",
    "gloss": "then those"
   }
  ],
  "count": 179,
  "verse": {
   "ref": "23:102",
   "surah": "Sūrat Al-Muminoon",
   "text": "فَمَن ثَقُلَتْ مَوَٰزِينُهُۥ فَأُو۟لَٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ"
  }
 },
 {
  "id": "pt-man",
  "n": 82,
  "group": "pointing",
  "form": "مَن",
  "translit": "man",
  "gloss": "whoever, the one who — (people)",
  "role": "conditional / relative",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "مَن",
    "gloss": "whoever"
   },
   {
    "word": "وَمَن",
    "gloss": "and whoever"
   }
  ],
  "count": 410,
  "verse": {
   "ref": "3:74",
   "surah": "Sūrat Aal-i-Imraan",
   "text": "يَخْتَصُّ بِرَحْمَتِهِۦ مَن يَشَآءُ ۗ وَٱللَّهُ ذُو ٱلْفَضْلِ ٱلْعَظِيمِ"
  }
 },
 {
  "id": "pt-ma",
  "n": 83,
  "group": "pointing",
  "form": "مَا",
  "translit": "mā",
  "gloss": "what, whatever — and also: not",
  "role": "relative, interrogative or negation",
  "attaches": "",
  "note": "",
  "examples": [
   {
    "word": "مَا",
    "gloss": "what, whatever"
   },
   {
    "word": "وَمَا",
    "gloss": "and what / and not"
   }
  ],
  "count": 1223,
  "verse": {
   "ref": "2:77",
   "surah": "Sūrat Al-Baqara",
   "text": "أَوَلَا يَعْلَمُونَ أَنَّ ٱللَّهَ يَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ"
  }
 }
];

// Every entry of one group, in order.
function quranParticlesInGroup(id) {
  return QURAN_PARTICLES.filter(p => p.group === id);
}
