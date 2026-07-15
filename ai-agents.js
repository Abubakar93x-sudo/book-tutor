// ============================================================================
// BookTutor — AI Agents Layer (ai-agents.js)
// Bridges the web app to Google's Gemini API.
// Contains all AI prompt pipelines: Diagnostic, Curriculum Designer,
// Socratic Tutor (Teach & Quiz), and Feynman Assessor.
// ============================================================================

// ── MODEL TIERING ─────────────────────────────────────────────────────────────
// Two tiers of Gemini model, selected per task:
//   'fast' — the user's default model (Flash unless changed in Settings).
//            Used for high-frequency grounded calls: question generation,
//            segment classification, tutor turns. Speed + cost matter here.
//   'deep' — reasoning-heavy grading (Feynman assessor, recall diff, Socratic
//            hinting). Routes to Pro when the "Higher quality grading" toggle
//            is on; otherwise falls back to the user's default model.
const GEMINI_DEFAULT_MODEL = 'gemini-2.5-flash';
const GEMINI_DEEP_MODEL    = 'gemini-2.5-pro';

function modelFor(tier = 'fast') {
  const base = AppState.settings.model || GEMINI_DEFAULT_MODEL;
  if (tier === 'deep' && AppState.settings.highQualityGrading) return GEMINI_DEEP_MODEL;
  return base;
}

function geminiUrl(model, stream = false) {
  const method = stream ? 'streamGenerateContent' : 'generateContent';
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:${method}`;
}

// ── HELPER: GET API KEY ──────────────────────────────────────────────────────
// Safely retrieves the API key. Checks AppState first, then falls back to the
// Settings input field so a missing loadSettings() call doesn't silently break things.
function getApiKey() {
  const key = AppState.settings.apiKey
    || document.getElementById('input-api-key')?.value?.trim();
  if (!key) throw new Error('Gemini API Key is missing. Please add it in Settings.');
  // Keep AppState in sync if it was stale
  if (key && !AppState.settings.apiKey) AppState.settings.apiKey = key;
  return key;
}

// ── CORE: GEMINI HTTP REQUEST ─────────────────────────────────────────────────
// Sends a prompt to the Gemini API and returns either raw text or parsed JSON.
// fileUri: optional Gemini File API URI to attach (e.g. uploaded PDF)
// tier:    'fast' (default) or 'deep' — resolved to a model via modelFor()
async function queryGemini(prompt, responseJson = false, fileUri = null, tier = 'fast') {
  const apiKey = getApiKey();
  const url = `${geminiUrl(modelFor(tier))}?key=${apiKey}`;

  // Build parts array — text always first, file attachment second if provided
  const parts = [{ text: prompt }];
  if (fileUri) {
    parts.push({
      fileData: {
        mimeType: 'application/pdf',
        fileUri: fileUri
      }
    });
  }

  const payload = {
    contents: [{ parts }]
  };

  if (responseJson) {
    payload.generationConfig = {
      responseMimeType: 'application/json',
      // Raise the output limit: 1000-page books produce very large curricula.
      // Gemini 2.5 Flash supports up to 65536 output tokens.
      maxOutputTokens: fileUri ? 65536 : 32768
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json();
    console.error('Gemini API Error:', errData);
    throw new Error(errData.error?.message || 'Failed to query Gemini API.');
  }

  const result = await response.json();
  const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!textResponse) throw new Error('Received empty response from Gemini API.');

  if (!responseJson) return textResponse;

  // ── Robust JSON extraction ──
  // Gemini sometimes wraps JSON in markdown fences or uses Python-style quotes.
  let toParse = textResponse.trim();
  console.log('Raw Gemini response:', toParse); // Keep for debugging

  // 1. Strip ```json ... ``` or ``` ... ``` fences
  const fenceMatch = toParse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (fenceMatch) toParse = fenceMatch[1].trim();

  // 2. Try direct parse
  try { return JSON.parse(toParse); } catch (_) { /* fall through */ }

  // 3. Extract first {...} or [...] block
  const objMatch = toParse.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (objMatch) {
    try { return JSON.parse(objMatch[1]); } catch (_) { /* fall through */ }
  }

  // 4. Replace literal newlines inside strings
  try { return JSON.parse(toParse.replace(/\n/g, '\\n')); } catch (_) { /* fall through */ }

  // 5. Convert Python-style single-quoted dict syntax → JSON double quotes
  try {
    const fixed = toParse
      .replace(/'([^'\\]*)'\s*:/g, '"$1":')   // 'key': → "key":
      .replace(/:\s*'([^'\\]*)'/g, ': "$1"')  // : 'value' → : "value"
      .replace(/'/g, '"');                     // remaining single quotes
    return JSON.parse(fixed);
  } catch (_) { /* fall through */ }

  // 6. Strip any non-printable/BOM characters and retry
  try {
    return JSON.parse(toParse.replace(/[^\x20-\x7E\n\r\t]/g, ''));
  } catch (e) {
    throw new Error(`Failed to parse JSON response: ${e.message}\nRaw: ${toParse.slice(0, 200)}`);
  }
}

// ── CORE: GEMINI STREAMING REQUEST ────────────────────────────────────────────
// Same as queryGemini but uses the streamGenerateContent SSE endpoint, calling
// onChunk(piece, fullTextSoFar) as text arrives instead of waiting for the
// whole response. Plain-text only — not used for the JSON curriculum calls,
// since incremental JSON isn't safely parseable mid-stream.
async function queryGeminiStream(prompt, onChunk, tier = 'fast') {
  const apiKey = getApiKey();
  const url = `${geminiUrl(modelFor(tier), true)}?key=${apiKey}&alt=sse`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || 'Failed to query Gemini API.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // SSE frames are "data: {...}" lines separated by newlines
    const lines = buffer.split('\n');
    buffer = lines.pop(); // keep the last (possibly incomplete) line for the next read
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const jsonStr = trimmed.slice(5).trim();
      if (!jsonStr) continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const piece = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
        if (piece) {
          fullText += piece;
          onChunk(piece, fullText);
        }
      } catch (_) { /* incomplete JSON fragment split across reads — ignore */ }
    }
  }

  if (!fullText) throw new Error('Received empty response from Gemini API.');
  return fullText;
}

// ── GEMINI FILE UPLOAD ────────────────────────────────────────────────────────
// Uploads a File (PDF or TXT) to Gemini's File API via multipart/related.
// Returns the fileUri string, which can then be attached to any prompt.
// onProgress(0..100) is called with upload progress estimates.
async function uploadPdfToGemini(file, onProgress = () => {}) {
  const apiKey = getApiKey();
  const BOUNDARY = '----GeminiUpload' + Date.now();
  const mimeType = file.type || (file.name.toLowerCase().endsWith('.txt') ? 'text/plain' : 'application/pdf');

  onProgress(5);
  const fileBuffer = await file.arrayBuffer();
  const fileBytes  = new Uint8Array(fileBuffer);
  onProgress(20);

  // Build multipart/related body (required format for Gemini Files API)
  const enc = new TextEncoder();
  const metaJson    = JSON.stringify({ file: { display_name: file.name } });
  const part1       = enc.encode(`--${BOUNDARY}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metaJson}\r\n`);
  const part2Header = enc.encode(`--${BOUNDARY}\r\nContent-Type: ${mimeType}\r\n\r\n`);
  const part2Footer = enc.encode(`\r\n--${BOUNDARY}--`);

  const body = new Uint8Array(part1.length + part2Header.length + fileBytes.length + part2Footer.length);
  let off = 0;
  body.set(part1,       off); off += part1.length;
  body.set(part2Header, off); off += part2Header.length;
  body.set(fileBytes,   off); off += fileBytes.length;
  body.set(part2Footer, off);

  onProgress(40);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/related; boundary=${BOUNDARY}`,
        'X-Goog-Upload-Protocol': 'multipart',
      },
      body: body.buffer
    }
  );

  onProgress(90);

  if (!response.ok) {
    const errText = await response.text();
    let msg = `Upload failed (HTTP ${response.status})`;
    try { msg = JSON.parse(errText).error?.message || msg; } catch {}
    throw new Error(msg);
  }

  const data = await response.json();
  onProgress(100);

  const fileUri = data.file?.uri;
  if (!fileUri) throw new Error('Gemini did not return a file URI after upload.');
  console.log('PDF uploaded to Gemini. URI:', fileUri);
  return fileUri;
}

// ── AGENT 1: DIAGNOSTIC LIBRARIAN ────────────────────────────────────────────
// Checks if Gemini has deep or surface-level knowledge of the requested book.
// Returns "deep" if Gemini knows the book well, or "ref" if the user must paste text.
async function callLiveDiagnosticCheck(title, author) {
  const prompt = `
    You are an AI Librarian and diagnostic bot.
    A student wants to study: "${title}" by "${author}".

    Analyze your own knowledge base. Decide:
    - "deep": If this is a mainstream bestseller you have granular knowledge of (chapters, concepts, arguments).
    - "ref": If this is a rare, specialized, or technical manual where you only have high-level awareness.

    Return ONLY a valid JSON object, no markdown fences:
    {
      "level": "deep" or "ref",
      "desc": "A 2-3 sentence HTML explanation of your knowledge depth on this book using <strong> and <br> tags."
    }
  `;
  try {
    return await queryGemini(prompt, true);
  } catch (error) {
    console.error('Diagnostic failed:', error);
    return {
      level: 'ref',
      desc: `Could not verify API connection. Please check your API key in Settings.<br><strong>Error:</strong> ${error.message}`
    };
  }
}

// ── AGENT 1b: BOOK IDENTIFIER ─────────────────────────────────────────────────
// Given the first few pages of a PDF (as text), returns the book title and author.
// Used during PDF upload so users don't have to type them manually.
async function callBookIdentifier(firstPageText) {
  const prompt = `
    Read the following text extracted from the opening pages of a book (cover page, title page, copyright).
    Identify the exact book title and the author's full name.

    TEXT:
    ---
    ${firstPageText.substring(0, 4000)}
    ---

    Return ONLY valid JSON, no markdown fences:
    {
      "title": "exact book title as written on the cover",
      "author": "author full name"
    }

    If you cannot determine one of these, use null for that field.
  `;
  try {
    return await queryGemini(prompt, true);
  } catch (e) {
    console.warn('Book identifier failed:', e.message);
    return { title: null, author: null };
  }
}

// ── AGENT: CHAPTER CURRICULUM GENERATOR ──────────────────────────────────────
// Generates a complete curriculum entry for a SINGLE chapter using its extracted text.
// This is the core of the chapter-by-chapter approach — no whole-book truncation issues.
async function callChapterCurriculumGenerator(chapterTitle, bookTitle, bookAuthor, chapterText) {
  const safeText = chapterText.substring(0, 60000); // ~15k tokens — one chapter comfortably fits
  const prompt = `
    You are an expert curriculum designer and educator using the 80/20 learning principle.

    Book: "${bookTitle}" by "${bookAuthor}"
    Chapter: "${chapterTitle}"

    CHAPTER TEXT (extracted directly from the student's PDF):
    ---
    ${safeText}
    ---

    Using the text above, generate a complete learning entry for this chapter.
    Apply the 80/20 rule: identify the 20% of ideas that deliver 80% of the value.
    You may quote directly from the text when it is vivid or memorable.

    Return ONLY valid JSON with NO markdown fences:
    {
      "summary_10s": "One powerful sentence capturing the chapter's core thesis",
      "summary_3m": [
        "Key point 1 — use **bold** for important keywords",
        "Key point 2 — use **bold** for important keywords",
        "Key point 3 — use **bold** for important keywords",
        "Key point 4 — use **bold** for important keywords"
      ],
      "summary_15m": "A rich markdown string with ### headers and 3+ detailed paragraphs. Include direct quotes from the text where powerful.",
      "concepts": ["Concept One", "Concept Two", "Concept Three"],
      "flashcards": [
        { "front": "Question testing deep understanding", "back": "Answer" },
        { "front": "Another probing question", "back": "Answer" }
      ]
    }
  `;
  try {
    const result = await queryGemini(prompt, true);
    // Ensure all required fields exist
    return {
      summary_10s: result.summary_10s || '',
      summary_3m:  Array.isArray(result.summary_3m)  ? result.summary_3m  : [],
      summary_15m: result.summary_15m || '',
      concepts:    Array.isArray(result.concepts)    ? result.concepts    : [],
      flashcards:  Array.isArray(result.flashcards)  ? result.flashcards  : []
    };
  } catch (error) {
    console.error('Chapter curriculum generation failed:', error);
    throw error;
  }
}

// ── AGENT 2 & 3: CURRICULUM DESIGNER + QA VERIFIER ───────────────────────────
// Two-agent pipeline: Designer creates the curriculum, QA Verifier audits it.
// Returns a structured JSON syllabus of chapters, summaries, concepts, and flashcards.
// fileUri:        Gemini File API URI (PDFs ≤1000 pages)
// isFullPdfText:  true when userUploadedText is full extracted text from a large PDF (>1000 pages)
async function callLiveCurriculumGenerator(title, author, userUploadedText = '', fileUri = null, isFullPdfText = false) {
  let prompt;

  if (fileUri) {
    // ── FILE API MODE: Gemini reads the actual uploaded PDF ──
    prompt = `
      You are an expert curriculum designer reading an uploaded book PDF.

      STEP 1 — Identify the book:
      Read the cover page or title page to find the exact book title and author name.

      STEP 2 — Build the curriculum:
      Read the ENTIRE document from start to finish.
      Create a complete chapter-by-chapter curriculum covering EVERY chapter, law, section, or part.
      Do NOT skip, merge, or abbreviate chapters — list every single one.
      Use the exact chapter titles and section headings as written in the PDF.
      Base ALL content SOLELY on the uploaded PDF — do NOT use any prior knowledge.

      For each chapter return:
      - number: chapter number (integer, starting at 1)
      - title: exact chapter title from the PDF
      - summary_10s: one powerful sentence summarising the chapter thesis
      - summary_3m: array of 3-4 key point strings (use **bold** for keywords)
      - summary_15m: a rich markdown string with ### headers and 3+ detailed paragraphs
      - concepts: array of 3-4 short concept noun strings
      - flashcards: array of 2-3 objects with "front" question and "back" answer strings

      Return ONLY valid JSON with NO markdown fences:
      {
        "title": "exact book title from the PDF",
        "author": "author full name from the PDF",
        "chapters": [
          {
            "number": 1,
            "title": "string",
            "summary_10s": "string",
            "summary_3m": ["string"],
            "summary_15m": "string",
            "concepts": ["string"],
            "flashcards": [{"front": "string", "back": "string"}]
          }
        ]
      }
    `;
  } else if (isFullPdfText && userUploadedText) {
    // ── STRUCTURE EXCERPT MODE: chapter headings + brief excerpts from the PDF ──
    // We send a compact structure (headings + 400-char excerpts per chapter), NOT
    // the raw verbatim text, to avoid Gemini's recitation/copyright protection.
    // Gemini supplements with its knowledge to generate rich summaries.
    const safeText = userUploadedText.substring(0, 150000); // structure is already compact
    prompt = `
      You are an expert curriculum designer and book educator.

      The student has uploaded their copy of a book as a PDF. The chapter structure and brief
      excerpt from each chapter have been extracted from that PDF and are shown below.

      YOUR TASKS:
      1. Identify the book title and author from the content shown.
      2. Build a complete chapter-by-chapter curriculum covering EVERY chapter, law, section, or part
         shown in the structure. Do NOT skip or merge any chapters.
      3. Use the exact chapter titles and headings as they appear in the structure below.
      4. You may supplement each chapter's summary with your broader knowledge of the book,
         but the chapter LIST must come solely from the structure provided.

      BOOK STRUCTURE (headings + excerpts extracted from the uploaded PDF):
      ---
      ${safeText}
      ---

      For each chapter generate:
      - number: chapter number (integer, starting at 1)
      - title: exact chapter title from the structure above
      - summary_10s: one powerful sentence summarising the chapter's core thesis
      - summary_3m: array of 3-4 key point strings (use **bold** for keywords)
      - summary_15m: a rich markdown string with ### headers and 3+ detailed paragraphs
      - concepts: array of 3-4 short concept noun strings
      - flashcards: array of 2-3 objects with "front" question and "back" answer strings

      Return ONLY valid JSON with NO markdown fences:
      {
        "title": "book title",
        "author": "author full name",
        "chapters": [
          {
            "number": 1,
            "title": "string",
            "summary_10s": "string",
            "summary_3m": ["string"],
            "summary_15m": "string",
            "concepts": ["string"],
            "flashcards": [{"front": "string", "back": "string"}]
          }
        ]
      }
    `;
  } else {
    // ── AI KNOWLEDGE MODE (existing behaviour) ──
    prompt = `
      You are a two-agent team:
      Agent 1 (Curriculum Designer): Creates a structured learning curriculum.
      Agent 2 (QA Verifier): Audits it for accuracy and removes hallucinations.

      Book: "${title}" by "${author}".
      Generate a complete chapter-by-chapter curriculum covering ALL major chapters, laws, or sections.
      Include every chapter/law/section — do not summarise or collapse them.
      For example, if the book has 48 laws, generate all 48. If it has 12 chapters, generate all 12.
    `;

    if (userUploadedText) {
      prompt += `
        The student has provided this reference text/highlights:
        ---
        ${userUploadedText.substring(0, 15000)}
        ---
        Use this text to build accurate summaries.
      `;
    } else {
      prompt += `Use your internal knowledge of this book's chapters and arguments.`;
    }

    prompt += `
      For each chapter, generate:
      - number: Chapter number (integer)
      - title: Chapter title string
      - summary_10s: One powerful sentence summarizing the chapter thesis
      - summary_3m: Array of 3-4 key point strings (use **bold** for keywords)
      - summary_15m: A rich markdown string with ### headers and 3+ paragraphs of detailed analysis
      - concepts: Array of 3-4 short concept noun strings (e.g. "Habit Loop", "Behavioral Baseline")
      - flashcards: Array of 2-3 objects with "front" question and "back" answer strings

      After designing, the QA Verifier must audit for accuracy and remove any filler.

      Return ONLY valid JSON, no markdown fences:
      {
        "chapters": [
          {
            "number": 1,
            "title": "string",
            "summary_10s": "string",
            "summary_3m": ["string"],
            "summary_15m": "string",
            "concepts": ["string"],
            "flashcards": [{"front": "string", "back": "string"}]
          }
        ]
      }
    `;
  }

  return await queryGemini(prompt, true, fileUri);
}

// ── AGENT 2.5: VISUAL DIRECTOR ────────────────────────────────────────────────
// Runs in parallel with the Tutor agent. Given the concept being taught, it
// generates (1) a cartoon image prompt for Pollinations.ai and (2) a Mermaid
// mindmap that maps the key ideas. Returns null gracefully on any error.
async function callVisualDirectorAgent(conceptText, bookTitle, chapterTitle) {
  const prompt = `
    You are a Visual Director for an educational AI app.
    A tutor is teaching a concept from "${bookTitle}", Chapter: "${chapterTitle}".

    Concept being taught:
    """
    ${conceptText.substring(0, 600)}
    """

    Generate two things:
    1. A SHORT image prompt (max 12 words) for a cartoon illustration that captures
       the essence of this concept. Make it vivid, simple, cartoonish, and educational.
       Example: "cartoon king on throne waving away talented advisor, flat design"

    2. A Mermaid.js mindmap diagram that maps the key ideas of this concept.
       Use simple labels (2-4 words each). Maximum 8 nodes total.
       The mindmap MUST start with: mindmap

    Return ONLY valid JSON, no markdown fences:
    {
      "imagePrompt": "cartoon illustration of concept, flat design, bright colors",
      "diagram": "mindmap\\n  root((Core Idea))\\n    Branch One\\n    Branch Two\\n      Sub Point"
    }
  `;
  try {
    return await queryGemini(prompt, true);
  } catch (e) {
    console.warn('Visual Director failed silently:', e.message);
    return null;
  }
}

// ── AGENT: ATTENTION CLASSIFIER ──────────────────────────────────────────────
// Labels every paragraph of a chapter as core / support / skim, once per
// chapter. Core paragraphs carry the argument and render at full contrast;
// skim paragraphs (padding, digressions) render dimmed and collapsible —
// this is where legitimate reading speed comes from.
async function callSegmentClassifier(paragraphs, chapterTitle, bookTitle) {
  const numbered = paragraphs
    .map((p, i) => `[${i}] ${p.length > 400 ? p.slice(0, 400) + '…' : p}`)
    .join('\n\n')
    .substring(0, 90000);

  const prompt = `
    You are a reading coach analysing a chapter from "${bookTitle}"
    ("${chapterTitle}"). Below are its ${paragraphs.length} paragraphs, each
    prefixed with its index.

    Classify EVERY paragraph as exactly one of:
    - "core":    carries the argument — a central claim, mechanism, definition,
                 or key conclusion. The reader must give this full attention.
    - "support": evidence, examples, or elaboration worth normal reading.
    - "skim":    anecdote padding, tangents, repetition of earlier points, or
                 throat-clearing that a time-pressed reader can safely skim.

    Be honest, not timid: dense books typically have 20-40% skim-able text.
    But never mark a paragraph "skim" if it introduces an idea needed later.

    PARAGRAPHS:
    ---
    ${numbered}
    ---

    Return ONLY valid JSON, no markdown fences, with exactly ${paragraphs.length} entries:
    { "labels": ["core", "support", "skim", ...] }
  `;
  const result = await queryGemini(prompt, true);
  const labels = Array.isArray(result.labels) ? result.labels : [];
  // Align defensively: unknown or missing entries become "support" (neutral)
  return paragraphs.map((_, i) =>
    ['core', 'support', 'skim'].includes(labels[i]) ? labels[i] : 'support'
  );
}

// ── AGENT: CHECKPOINT QUESTION GENERATOR ─────────────────────────────────────
// Creates one retrieval question from the segment the student just read.
// Grounded: the question must be answerable from the passage alone.
async function callCheckpointGenerator(segmentText, chapterTitle, bookTitle, concepts = []) {
  const prompt = `
    You are a reading tutor creating a comprehension checkpoint.
    The student has JUST finished reading this passage from "${bookTitle}",
    chapter "${chapterTitle}":
    ---
    ${segmentText.substring(0, 12000)}
    ---
    Chapter concepts: ${concepts.join(', ') || '(none listed)'}

    Write ONE retrieval question that tests whether the student understood this
    passage's key move — its central claim, mechanism, or argument. Prefer a
    free-recall what/why/how question answerable in 1–2 sentences using ONLY
    the passage. Never ask about trivia, names, or minor details.

    Also list which of the chapter concepts above this passage meaningfully
    covers (0–3 of them, exact strings from the list).

    Return ONLY valid JSON, no markdown fences:
    { "question": "string", "concepts": ["string"] }
  `;
  const result = await queryGemini(prompt, true);
  return {
    question: result.question || 'In one or two sentences: what was the key idea of the passage you just read?',
    concepts: Array.isArray(result.concepts) ? result.concepts.filter(c => concepts.includes(c)) : []
  };
}

// ── AGENT: CHECKPOINT GRADER ─────────────────────────────────────────────────
// Grades the student's answer against the passage ONLY. Gap verdicts return a
// Socratic hint that points back into the text, never the answer itself.
async function callCheckpointGrader(segmentText, question, answer, hintRound = 0) {
  const prompt = `
    You are a reading tutor grading a comprehension checkpoint.
    Judge SOLELY against this passage — not your own knowledge of the book:
    ---
    ${segmentText.substring(0, 12000)}
    ---
    Question: "${question}"
    Student's answer: "${answer}"
    ${hintRound > 0 ? `This is the student's retry after ${hintRound} Socratic hint(s).` : ''}

    Grade generously on wording, strictly on substance: pass if the answer
    shows they grasped the key idea in their own words; fail if it misses or
    contradicts the passage's point.

    If PASS: one warm sentence naming specifically what they got right.
    If GAP: one Socratic hint that points them back into the passage
    (e.g. Re-read the part beginning "..." — what does the author say causes ...?).
    Never reveal the answer inside a hint.

    Either way include a short exact quote from the passage that grounds your
    judgement.

    Return ONLY valid JSON, no markdown fences:
    {
      "verdict": "pass" or "gap",
      "feedback": "confirmation sentence (pass) or Socratic hint (gap)",
      "sourceQuote": "short exact quote from the passage"
    }
  `;
  // Judgement calls benefit from the deep tier when the user enables it
  const result = await queryGemini(prompt, true, null, 'deep');
  return {
    verdict: result.verdict === 'pass' ? 'pass' : 'gap',
    feedback: result.feedback || '',
    sourceQuote: result.sourceQuote || ''
  };
}

// ── AGENT: RECALL DIFF (brain dump grader) ───────────────────────────────────
// Diffs the student's end-of-chapter free recall against the chapter's
// concepts, grounded in the chapter text. Free recall is the single most
// effective retention technique (Karpicke & Blunt) — this makes it honest.
async function callRecallDiff(brainDump, concepts, chapterText, chapterTitle, bookTitle) {
  const prompt = `
    You are a reading tutor reviewing a student's free-recall "brain dump"
    written immediately after finishing "${chapterTitle}" from "${bookTitle}".

    CHAPTER TEXT (ground truth — judge against this, not your own knowledge):
    ---
    ${chapterText.substring(0, 30000)}
    ---
    Chapter concepts: ${concepts.join(', ')}

    STUDENT'S BRAIN DUMP:
    """
    ${brainDump.substring(0, 8000)}
    """

    Sort every chapter concept into exactly one bucket:
    - "recalled": the dump shows they understood it (their own words count)
    - "missed":   the dump doesn't mention or imply it
    - "mixedUp":  the dump gets it wrong or contradicts the text — include a
                  one-sentence correction and a short exact quote from the text

    Return ONLY valid JSON, no markdown fences:
    {
      "recalled": ["Concept"],
      "missed": ["Concept"],
      "mixedUp": [{ "concept": "Concept", "note": "You said X — the text says Y.", "quote": "short exact quote" }]
    }
  `;
  const result = await queryGemini(prompt, true, null, 'deep');
  return {
    recalled: Array.isArray(result.recalled) ? result.recalled : [],
    missed: Array.isArray(result.missed) ? result.missed : [],
    mixedUp: Array.isArray(result.mixedUp) ? result.mixedUp : []
  };
}

// ── AGENT: GAP CARD GENERATOR ────────────────────────────────────────────────
// Builds review flashcards from the student's ACTUAL gaps: missed and
// mixed-up concepts get 2 cards each (one recall, one application), solidly
// recalled concepts get at most 1 light card.
async function callGapCardGenerator(diff, chapterText, chapterTitle, bookTitle) {
  const prompt = `
    You are a spaced-repetition card writer for "${chapterTitle}" from "${bookTitle}".

    The student just free-recalled this chapter with these results:
    - Recalled well: ${diff.recalled.join(', ') || '(none)'}
    - Missed entirely: ${diff.missed.join(', ') || '(none)'}
    - Mixed up: ${diff.mixedUp.map(m => m.concept).join(', ') || '(none)'}

    CHAPTER TEXT (base all cards on this):
    ---
    ${chapterText.substring(0, 30000)}
    ---

    Create flashcards weighted toward their gaps:
    - Each MISSED or MIXED-UP concept: 2 cards — one plain recall question,
      one application question ("You're facing situation Z — how does this
      concept apply?")
    - Each RECALLED concept: at most 1 light card, or none if trivial
    - Answers must be concise (1-3 sentences) and faithful to the text

    Return ONLY valid JSON, no markdown fences:
    { "flashcards": [{ "front": "question", "back": "answer", "concept": "concept name" }] }
  `;
  const result = await queryGemini(prompt, true);
  return Array.isArray(result.flashcards)
    ? result.flashcards.filter(c => c.front && c.back)
    : [];
}

// ── AGENT: TRANSFER PROBLEM ──────────────────────────────────────────────────
// One application problem per chapter — dense-book comprehension is proven by
// use, not recognition. The answer is graded Socratically by the quiz tutor.
async function callTransferProblem(chapterText, concepts, chapterTitle, bookTitle) {
  const prompt = `
    You are a tutor writing ONE application problem for "${chapterTitle}"
    from "${bookTitle}".

    CHAPTER TEXT (base the problem on this):
    ---
    ${chapterText.substring(0, 20000)}
    ---
    Key concepts: ${concepts.join(', ')}

    Write a single realistic scenario the student might actually face, where
    applying this chapter's framework produces a concrete decision or action.
    End with a direct question asking what they would do and why.
    Keep it to 3-5 sentences. Do not hint at the answer.

    Return ONLY valid JSON, no markdown fences:
    { "problem": "the scenario ending in a question" }
  `;
  const result = await queryGemini(prompt, true, null, 'deep');
  return result.problem || '';
}

// ── AGENT 4: SOCRATIC TUTOR (TEACH & QUIZ MODES) ─────────────────────────────
// Powers the two-tab tutor system.
// "teach" mode: Page-by-page 80/20 teaching with mastery tag detection.
// "quiz" mode:  Comprehensive chapter review and retention testing.
// chapterText: raw PDF text for the chapter (optional) — enables direct quoting.
async function callLiveTutorAgent(userMessage, mode = 'teach', masteredConcepts = [], chapterText = '', onChunk = null) {
  const bookTitle = AppState.selectedBook.title;
  const chapter = AppState.selectedChapter;

  // Only load history for the current mode to prevent context bleeding.
  const historyText = AppState.activeChatHistory
    .filter(m => m.mode === mode)
    .map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`)
    .join('\n');

  let prompt = '';

  if (mode === 'teach') {
    const remainingConcepts = chapter.concepts.filter(c => !masteredConcepts.includes(c));
    const activeConcept = remainingConcepts[0];

    // Include up to 8000 chars of the raw chapter text so the tutor can quote
    const textBlock = chapterText
      ? `\n      RAW CHAPTER TEXT (quote from this when teaching — use "..." with quotation marks):\n      ---\n      ${chapterText.substring(0, 8000)}\n      ---\n`
      : '';

    prompt = `
      You are an expert AI Tutor. Your job is to teach Chapter ${chapter.number}: "${chapter.title}"
      from "${bookTitle}" page-by-page using the 80/20 rule.

      CHAPTER CONTENT (for reference):
      ---
      ${chapter.summary_15m}
      ---
      ${textBlock}
      TEACHING STATUS:
      - Mastered: ${masteredConcepts.length > 0 ? masteredConcepts.join(', ') : 'None yet'}
      - Remaining: ${remainingConcepts.join(', ') || 'All done!'}
      - Current Page/Concept: ${activeConcept || 'ALL MASTERED'}

      CONVERSATION HISTORY:
      ${historyText}

      Student's message: "${userMessage}"

      TEACHING RULES (follow strictly):
      1. If this appears to be the very first message (student says "yes", "ready", "start", "begin", or similar short confirmation):
         - Do NOT output a mastery tag yet.
         - Immediately begin teaching "${activeConcept}" in depth:
           * Write 2-3 rich paragraphs explaining the core principle using the 80/20 rule.
           * Include a vivid real-world analogy or example.
           * If raw chapter text is provided, quote 1-2 powerful lines from it using quotation marks.
           * At the end, ask: "Do you have any questions on this, or are you ready to turn the page?"

      2. If the student says they are ready to proceed (e.g. "next", "ready", "no questions", "continue", "got it"):
         - Do NOT mark anything mastered yet — willingness to move on is not evidence of understanding.
         - Ask ONE short check question that tests the concept just taught ("${activeConcept}").
           It must require retrieval in their own words (a what/why/how question), never yes/no.
         - Keep it to 2-3 sentences: acknowledge them briefly, then ask the question.

      3. If the student is ANSWERING your check question:
         - If their answer captures the key idea in substance (wording doesn't matter):
           * Output the mastery tag: [MASTERED: ${activeConcept}]
           * Then immediately begin teaching the NEXT concept in depth the same way as rule 1.
           * End with: "Do you have any questions on this, or are you ready to turn the page?"
         - If their answer misses or contradicts the key idea:
           * Give a Socratic hint that points them back toward the idea. Do NOT reveal the answer.
           * Do NOT output any mastery tag. Invite them to try again.
           * If they have now missed it twice, explain the answer plainly, then move on to the
             next concept WITHOUT a mastery tag.

      4. If the student asks a clarifying question:
         - Answer it thoroughly with simple analogies.
         - If raw chapter text is provided, quote the relevant passage if helpful.
         - Do NOT output any mastery tag.
         - End with: "Does that clear it up? Ready to turn the page?"

      5. If all concepts are mastered:
         - Warmly congratulate the student.
         - Tell them to switch to the "Quiz & Review" tab to test their retention.
    `;
  } else {
    prompt = `
      You are a Socratic Quiz Master reviewing Chapter ${chapter.number}: "${chapter.title}"
      from "${bookTitle}".

      CHAPTER CONTENT:
      ---
      ${chapter.summary_15m}
      ---
      Core Concepts: ${chapter.concepts.join(', ')}

      QUIZ CONVERSATION HISTORY:
      ${historyText}

      Student's message: "${userMessage}"

      QUIZ RULES:
      1. Ask probing questions that test deep comprehension of all core concepts.
      2. If they answer correctly, praise them and move to the next concept or ask a deeper follow-up.
      3. If they answer incorrectly, guide them with a Socratic hint — don't give the answer directly.
      4. The student may also ask clarifying questions. Answer them clearly with analogies.
      5. NEVER output any "[MASTERED: ...]" tags in this mode.
      6. After covering all concepts, give a brief performance summary.
    `;
  }

  try {
    return onChunk
      ? await queryGeminiStream(prompt, onChunk)
      : await queryGemini(prompt, false);
  } catch (error) {
    console.error('Tutor API call failed:', error);
    return `[Tutor System] Failed to reach Gemini API. Please check your key and connection.\nError: ${error.message}`;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// LANGUAGE LEARNING AGENTS
// ════════════════════════════════════════════════════════════════════════════

// ── AGENT: LANGUAGE PROFILER ─────────────────────────────────────────────────
// Given any language name the user types, returns a normalized profile.
// The `script` field is the master switch: everything downstream (romanization
// lines, script bootcamp cards, TTS locale) adjusts off this classification.
async function callLanguageProfiler(languageName) {
  const prompt = `
    A learner wants to study the language: "${languageName}".

    Return a normalized profile of this language. The "script" field must be
    one of: "latin", "cyrillic", "greek", "arabic", "hebrew", "devanagari",
    "cjk", "hangul", "kana-kanji", "thai", "other".
    Use "kana-kanji" for Japanese, "cjk" for Chinese, "hangul" for Korean.

    Return ONLY valid JSON, no markdown fences:
    {
      "name": "English name of the language, e.g. Japanese",
      "nativeName": "the language's name in itself, e.g. 日本語",
      "code": "ISO 639-1 code, e.g. ja",
      "ttsLangCode": "BCP-47 code for speech synthesis, e.g. ja-JP",
      "script": "one of the values above",
      "scriptName": "human name of the writing system, e.g. Kana + Kanji",
      "romanizationName": "name of its standard romanization, e.g. Rōmaji, or null for Latin-script languages",
      "notes": "one sentence on what makes this language's writing/pronunciation distinctive for a beginner"
    }

    If the input is not a recognizable human language, return: { "error": "not a language" }
  `;
  const result = await queryGemini(prompt, true);
  if (result.error || !result.code) throw new Error(`Couldn't recognize "${languageName}" as a language.`);
  return {
    name: result.name,
    nativeName: result.nativeName || result.name,
    code: result.code,
    ttsLangCode: result.ttsLangCode || result.code,
    script: result.script || 'latin',
    scriptName: result.scriptName || 'Latin alphabet',
    romanizationName: result.script === 'latin' ? null : (result.romanizationName || 'romanization'),
    notes: result.notes || ''
  };
}

// ── AGENT: SEED DECK GENERATOR ───────────────────────────────────────────────
// First cards for a new language: highest-frequency words in short sentences.
// Non-Latin scripts also get script cards (letter/kana groups with mnemonics)
// so the writing system enters the SM-2 deck before vocabulary ramps up.
async function callSeedDeckGenerator(langProfile, level) {
  const nonLatin = langProfile.script !== 'latin';
  const prompt = `
    You are building the FIRST spaced-repetition deck for a ${level}-level
    learner of ${langProfile.name} (written in ${langProfile.scriptName}).

    Create ${nonLatin ? '25' : '30'} sentence cards:
    - Use ONLY the highest-frequency everyday words (greetings, to be/have,
      pronouns, numbers 1-5, yes/no, please/thanks, common verbs).
    - Each card's front is a SHORT sentence (2-6 words) in ${langProfile.name}
      containing the target word. The back is the English translation.
    - Sentences must be natural, not word lists. Reuse earlier words so the
      deck compounds.
    ${nonLatin ? `- Every front sentence must include "romanization" in ${langProfile.romanizationName}.

    ALSO create 12 script cards for the ${langProfile.scriptName} writing system:
    - front: a single character or letter group as it appears in text
    - back: its sound/meaning, plus a short vivid mnemonic
    - romanization: how it is pronounced
    - type: "script"` : ''}

    Return ONLY valid JSON, no markdown fences:
    {
      "cards": [
        { "front": "sentence in ${langProfile.name}", "back": "English translation", "word": "target word", ${nonLatin ? '"romanization": "romanized sentence", ' : ''}"type": "vocab" }
      ]
    }
  `;
  const result = await queryGemini(prompt, true);
  const cards = Array.isArray(result.cards) ? result.cards.filter(c => c.front && c.back) : [];
  if (!cards.length) throw new Error('Seed deck generation returned no cards.');
  return cards.map(c => ({
    front: c.front,
    back: c.back,
    word: c.word || '',
    romanization: c.romanization || null,
    type: c.type === 'script' ? 'script' : 'vocab'
  }));
}

// ── AGENT 5: FEYNMAN SANDBOX ASSESSOR ────────────────────────────────────────
// Grades the student's Feynman explanation for accuracy, simplicity, and completeness.
async function callLiveSandboxAssessor(concept, explanation) {
  const bookTitle = AppState.selectedBook.title;

  const prompt = `
    You are a Socratic Assessor and QA Fact-Checker.
    The student is explaining a concept from "${bookTitle}" using the Feynman Technique.

    Concept: "${concept}"
    Student's Explanation:
    """
    ${explanation}
    """

    Grade their explanation on:
    1. Factual accuracy — does it match the real concept?
    2. Simplicity — did they avoid jargon and use clear language?
    3. Completeness — did they cover the key points?

    Return ONLY valid JSON, no markdown fences:
    {
      "score": 0-100,
      "right": "What they got correct and why it works",
      "gaps": "Key points they missed or oversimplified",
      "refined": "An ideal ELI10 (Explain Like I'm 10) version of the explanation"
    }
  `;

  try {
    // Grading nuance benefits from the deep tier when the user enables it
    return await queryGemini(prompt, true, null, 'deep');
  } catch (error) {
    console.error('Feynman assessor failed:', error);
    return {
      score: 0,
      right: 'Connection error. Could not grade your explanation.',
      gaps: `Error: ${error.message}`,
      refined: 'Please check your Gemini API key in Settings and try again.'
    };
  }
}
