// ============================================================================
// BookTutor — AI Agents Layer (ai-agents.js)
// Bridges the web app to Google's Gemini 1.5 Pro API.
// Contains all AI prompt pipelines: Diagnostic, Curriculum Designer,
// QA Verifier, Socratic Tutor (Teach & Quiz), and Feynman Assessor.
// ============================================================================

// Gemini 2.5 Flash — current free tier model.
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

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
async function queryGemini(prompt, responseJson = false, fileUri = null) {
  const apiKey = getApiKey();
  const url = `${GEMINI_API_URL}?key=${apiKey}`;

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
    // ── LARGE PDF TEXT MODE: full book text extracted client-side (>1000 pages) ──
    // Send the entire extracted text — Gemini 2.5 Flash handles up to 1M tokens.
    // No character limit applied; we allow up to 800K chars safely within the window.
    const safeText = userUploadedText.substring(0, 800000);
    prompt = `
      You are an expert curriculum designer. The following is the COMPLETE extracted text of a book.

      STEP 1 — Identify the book:
      Read the opening pages to find the exact book title and author name.

      STEP 2 — Build the curriculum:
      Read the ENTIRE text below carefully from start to finish.
      Create a complete chapter-by-chapter curriculum covering EVERY chapter, law, section, or part.
      Do NOT skip, merge, or abbreviate chapters — list every single one in the order they appear.
      Use the exact chapter titles and headings as they appear in the text.
      Base ALL content SOLELY on the text provided — do NOT use any prior knowledge.

      BOOK TEXT:
      ---
      ${safeText}
      ---

      For each chapter return:
      - number: chapter number (integer, starting at 1)
      - title: exact chapter title from the text
      - summary_10s: one powerful sentence summarising the chapter thesis
      - summary_3m: array of 3-4 key point strings (use **bold** for keywords)
      - summary_15m: a rich markdown string with ### headers and 3+ detailed paragraphs
      - concepts: array of 3-4 short concept noun strings
      - flashcards: array of 2-3 objects with "front" question and "back" answer strings

      Return ONLY valid JSON with NO markdown fences:
      {
        "title": "exact book title from the text",
        "author": "author full name from the text",
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

// ── AGENT 4: SOCRATIC TUTOR (TEACH & QUIZ MODES) ─────────────────────────────
// Powers the two-tab tutor system.
// "teach" mode: Page-by-page 80/20 teaching with mastery tag detection.
// "quiz" mode:  Comprehensive chapter review and retention testing.
async function callLiveTutorAgent(userMessage, mode = 'teach', masteredConcepts = []) {
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

    prompt = `
      You are an expert AI Tutor. Your job is to teach Chapter ${chapter.number}: "${chapter.title}"
      from "${bookTitle}" page-by-page using the 80/20 rule.

      CHAPTER CONTENT (for reference):
      ---
      ${chapter.summary_15m}
      ---

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
           * At the end, ask: "Do you have any questions on this, or are you ready to turn the page?"

      2. If the student says they are ready to proceed (e.g. "next", "ready", "no questions", "continue", "got it"):
         - Output the mastery tag for the concept just taught: [MASTERED: ${activeConcept}]
         - Then immediately begin teaching the NEXT concept in depth the same way.
         - End with: "Do you have any questions on this, or are you ready to turn the page?"

      3. If the student asks a clarifying question:
         - Answer it thoroughly with simple analogies.
         - Do NOT output any mastery tag.
         - End with: "Does that clear it up? Ready to turn the page?"

      4. If all concepts are mastered:
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
    return await queryGemini(prompt, false);
  } catch (error) {
    console.error('Tutor API call failed:', error);
    return `[Tutor System] Failed to reach Gemini API. Please check your key and connection.\nError: ${error.message}`;
  }
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
    return await queryGemini(prompt, true);
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
