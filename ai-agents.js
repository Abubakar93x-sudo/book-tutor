// ============================================================================
// BookTutor — AI Agents Layer (ai-agents.js)
// Every AI prompt pipeline in the app: Diagnostic, Curriculum Designer,
// Socratic Tutor (Teach & Quiz), the language course, and the Feynman Assessor.
//
// TWO PROVIDERS, ONE RULE:
//   DeepSeek runs everything. Gemini is kept for the one thing DeepSeek cannot
//   do — read an attachment. It is text-only: no file upload, no vision, and no
//   watching a YouTube video, which is the whole basis of video→curriculum.
//   So: an attachment means Gemini, everything else means DeepSeek. That lives
//   in queryAI() and nowhere else, because `fileUri` is only ever set by the PDF
//   and video paths and no caller needs to know which provider it got.
// ============================================================================

// ── TIERING: WHAT THINKS, AND WHAT DOESN'T ────────────────────────────────────
// The tier does not choose a MODEL. It chooses whether the model is allowed to
// think before it answers, which is the only knob that matters here — measured
// against the live API on a real lesson-generation call:
//
//     thinking off   7.1s        thinking on   14.5s … 31.2s
//
// Same model, same prompt, same valid JSON out either way. So thinking is worth
// it only where the model genuinely has to work something out, and is pure dead
// time everywhere else. Two further findings from that session, both the
// opposite of what the docs led me to expect:
//
//   • `reasoning_effort: 'low'` is ACCEPTED and then IGNORED — it produced MORE
//     reasoning (1350 tokens) than the default (895). Do not use it.
//   • `deepseek-chat` and `deepseek-reasoner` are aliases onto the same model
//     (deepseek-v4-flash); the alias only preset the thinking flag. Setting
//     `thinking` explicitly is what actually controls it, on either name.
//   • deepseek-v4-pro reasons so hard it spent an entire 500-token budget
//     thinking and returned no answer at all. Not usable for this.
//
//   'quick' — word glosses, lemmas. The learner is mid-tap.        no thinking
//   'fast'  — the default: the tutor, grading, summaries, stories. no thinking
//   'deep'  — building a syllabus or a lesson. Generated once and then cached
//             for good, so it is the one place where being right matters more
//             than being quick.                                       THINKING
const DEEPSEEK_MODEL = 'deepseek-chat';
const DEEPSEEK_URL   = 'https://api.deepseek.com/chat/completions';

// One model; the tier decides whether it thinks.
function modelFor() { return DEEPSEEK_MODEL; }
const tierThinks = (tier) => tier === 'deep';

// ── OPENAI ───────────────────────────────────────────────────────────────────
// The second provider. Its /v1/chat/completions is the API DeepSeek copied, so
// the request and the SSE stream have the same shape and share one code path
// below — only the URL, the key, the body extras and the error wording differ.
//
// Verified before writing any of it: a CORS preflight from a browser origin
// returns access-control-allow-origin for that origin and allows the
// authorization header, so this works from the page with no backend, exactly
// like DeepSeek.
const OPENAI_URL        = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODELS_URL = 'https://api.openai.com/v1/models';

// Preference order, not a claim about what is available: which of these an
// account can reach depends on the account, and the list of what exists moves,
// so the model is DISCOVERED from /v1/models — see resolveOpenAIModel.
//
// The order leads with the strong models that ANSWER rather than the ones that
// reason first. That is the same lesson the DeepSeek timings taught: on this
// app's work — short structured JSON and a page of teaching prose — reasoning
// bought a ten-fold wait and no more quality (107.6s against 13.1s, for a
// smaller table). These are flagship models, not cut-down ones, so leading
// with them costs nothing in quality and a great deal less in time. Anyone who
// wants a reasoning model can name it in Settings and it will be used as given.
const OPENAI_PREFERRED = [
  'gpt-4.1', 'gpt-4o', 'gpt-4.1-mini', 'gpt-4o-mini',
  'gpt-5', 'gpt-5-mini', 'gpt-4-turbo'
];

// Which provider runs the app. DeepSeek unless ChatGPT is both chosen AND has
// a key — a provider set without a key would fail every call instead of
// falling back to the one that works.
function activeProvider() {
  const chosen = AppState.settings.provider;
  if (chosen === 'openai' && (AppState.settings.openaiKey || '').trim()) return 'openai';
  return 'deepseek';
}

function getOpenAIKey() {
  const key = AppState.settings.openaiKey
    || document.getElementById('input-openai-key')?.value?.trim();
  if (!key) throw new Error('OpenAI API key is missing. Add it in Settings.');
  if (key && !AppState.settings.openaiKey) AppState.settings.openaiKey = key;
  return key;
}

// Ask the account what it can actually run, and take the best of ours that it
// offers. Cached on the settings object; a 404 from a chat call clears it so
// the next call asks again.
async function resolveOpenAIModel() {
  // A model typed into Settings is used exactly as given — no discovery, no
  // second-guessing. That is the escape hatch for anyone who wants a specific
  // model, including a slower reasoning one.
  const chosen = (AppState.settings.openaiModelChoice || '').trim();
  if (chosen) return chosen;
  if (AppState.settings.openaiModel) return AppState.settings.openaiModel;

  let ids = [];
  try {
    const res = await fetch(OPENAI_MODELS_URL, {
      headers: { 'Authorization': `Bearer ${getOpenAIKey()}` }
    });
    if (res.ok) ids = ((await res.json()).data || []).map(m => m.id);
    else console.warn(`OpenAI model list unavailable (${res.status}); falling back.`);
  } catch (err) {
    console.warn('OpenAI model list unreachable:', err.message);
  }

  const pick = OPENAI_PREFERRED.find(m => ids.includes(m))
    // Nothing from the preference list: take the plainest gpt-* chat model on
    // offer, skipping the ones that are not chat at all.
    || ids.filter(id => /^gpt-/.test(id) &&
         !/audio|realtime|search|transcribe|tts|image|embedding|moderation/.test(id))
         .sort((a, b) => a.length - b.length)[0]
    // Or nothing at all — the list call failed. Try the safest name we know and
    // let the chat call report properly if the account cannot run it.
    || 'gpt-4o-mini';

  AppState.settings.openaiModel = pick;
  console.log(`OpenAI model: ${pick}${ids.length ? '' : ' (guessed — model list unavailable)'}`);
  dbPut('settings', { key: 'openaiModel', value: pick }).catch(() => {});
  return pick;
}

// OpenAI's own messages are usable but say nothing about what to do next, and
// the quota one in particular reads like a fault rather than an errand.
function openaiError(status, errData) {
  const raw = errData?.error?.message || '';
  const code = errData?.error?.code || '';
  if (status === 401 || code === 'invalid_api_key') {
    return new Error('OpenAI rejected that API key. Check it in Settings — it should '
      + 'start with "sk-" and be copied whole.');
  }
  if (status === 429 && /quota|billing/i.test(raw + code)) {
    return new Error('Your OpenAI account has no credit. The API is billed separately '
      + 'from a ChatGPT subscription — add credit at platform.openai.com (Billing).');
  }
  if (status === 429) {
    return new Error('OpenAI is rate-limiting the account. Wait a moment and try again.');
  }
  if (status === 404 || code === 'model_not_found') {
    // The stored model is not one this account can run — forget it and re-pick
    AppState.settings.openaiModel = '';
    dbPut('settings', { key: 'openaiModel', value: '' }).catch(() => {});
    return new Error(`Your OpenAI account cannot use that model. Trying a different one — `
      + `ask again.`);
  }
  return new Error(raw || `OpenAI request failed (${status}).`);
}

function geminiUrl(model, stream = false) {
  const method = stream ? 'streamGenerateContent' : 'generateContent';
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:${method}`;
}
const GEMINI_FILE_MODEL = 'gemini-2.5-flash';   // the only Gemini model still used

// ── HELPER: GET API KEYS ─────────────────────────────────────────────────────
// The DeepSeek key drives the app. Falls back to the Settings field so a missing
// loadSettings() call doesn't silently break things.
function getApiKey() {
  const key = AppState.settings.apiKey
    || document.getElementById('input-api-key')?.value?.trim();
  if (!key) throw new Error('DeepSeek API key is missing. Add it in Settings.');
  if (key && !AppState.settings.apiKey) AppState.settings.apiKey = key;
  return key;
}

// Gemini is only reached for attachments, so its key is optional — and when it
// IS missing, the message has to say what it was actually needed for rather
// than "API key missing", which would send you to the wrong field.
function getGeminiKey() {
  const key = AppState.settings.geminiKey
    || document.getElementById('input-gemini-key')?.value?.trim();
  if (!key) {
    throw new Error('Reading a video or a PDF directly needs a Google Gemini key — '
      + 'neither DeepSeek nor ChatGPT watches video here. Add one in Settings, '
      + 'under "For video only".');
  }
  if (key && !AppState.settings.geminiKey) AppState.settings.geminiKey = key;
  return key;
}

// ── JSON EXTRACTION ───────────────────────────────────────────────────────────
// Models wrap JSON in markdown fences, use Python-style quotes, or slip in a
// stray character. Shared by both providers, and load-bearing for the reasoner,
// which is asked for JSON in the prompt rather than through response_format.
function parseModelJson(textResponse) {
  let toParse = textResponse.trim();

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

// ── CORE: ONE REQUEST, TWO PROVIDERS ──────────────────────────────────────────
// fileUri: optional attachment. A bare string is a PDF (Gemini File API URI).
//          Pass { fileUri, mimeType } for anything else; omit mimeType for a
//          YouTube URL, which Gemini fetches and watches by itself.
//          ITS PRESENCE IS WHAT ROUTES THE CALL TO GEMINI.
// tier:    'quick' | 'fast' | 'deep' — resolved to a model by modelFor()
async function queryAI(prompt, responseJson = false, fileUri = null, tier = 'fast') {
  return fileUri
    ? geminiRequest(prompt, responseJson, fileUri)
    : chatRequest(prompt, responseJson, tier);
}

async function queryAIStream(prompt, onChunk, tier = 'fast') {
  return chatStreamRequest(prompt, onChunk, tier);
}

// ── ONE CHAT PATH, TWO PROVIDERS ─────────────────────────────────────────────
// DeepSeek's API is a copy of OpenAI's, down to the SSE frames, so there is one
// implementation and a small description of each provider rather than two
// near-identical halves that drift apart.
async function chatConfig(responseJson, tier, stream) {
  const messages = [];

  // response_format REQUIRES the word "json" to appear in the messages, on both
  // providers. One system line beats editing thirty prompts.
  if (responseJson) {
    messages.push({ role: 'system', content: 'Reply with a single valid json object and nothing else.' });
  }

  if (activeProvider() === 'openai') {
    const body = { model: await resolveOpenAIModel(), messages, stream };
    if (responseJson) body.response_format = { type: 'json_object' };
    // Deliberately no max_tokens and no temperature. OpenAI's newer models
    // reject `max_tokens` in favour of `max_completion_tokens`, and reject a
    // non-default temperature outright — and since the model here is whatever
    // the account happens to offer, sending neither is the only setting that
    // works across all of them. Our prompts are short-output anyway.
    return { name: 'OpenAI', url: OPENAI_URL, key: getOpenAIKey(), body,
             mapError: openaiError };
  }

  const body = { model: modelFor(), messages, stream };
  if (responseJson) body.response_format = { type: 'json_object' };

  // The one line that decides whether this call takes 7 seconds or 30. Stated
  // explicitly in both directions rather than left to the model's default,
  // because the default moved under us once already when the aliases changed.
  body.thinking = { type: tierThinks(tier) ? 'enabled' : 'disabled' };

  // Thinking tokens count against this budget — a thinking call that runs out
  // mid-thought returns NOTHING (seen on deepseek-v4-pro at 500). Deep calls
  // get room for both halves.
  body.max_tokens = tierThinks(tier) ? 16384 : 8192;
  return { name: 'DeepSeek', url: DEEPSEEK_URL, key: getApiKey(), body,
           mapError: deepseekError };
}

async function chatRequest(prompt, responseJson, tier) {
  const cfg = await chatConfig(responseJson, tier, false);
  cfg.body.messages.push({ role: 'user', content: prompt });

  const response = await fetch(cfg.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.key}` },
    body: JSON.stringify(cfg.body)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    console.error(`${cfg.name} API Error:`, errData);
    throw cfg.mapError(response.status, errData);
  }

  const result = await response.json();
  const textResponse = result.choices?.[0]?.message?.content;
  if (!textResponse) throw new Error(`Received empty response from ${cfg.name}.`);

  if (!responseJson) return textResponse;
  console.log(`Raw ${cfg.name} response:`, textResponse.trim());
  return parseModelJson(textResponse);
}

// Streaming, OpenAI SSE — the same frames from both. DeepSeek's reasoner
// streams its chain of thought first as `reasoning_content` deltas; those are
// deliberately dropped, or the learner would watch the model think out loud
// before it says anything to them.
async function chatStreamRequest(prompt, onChunk, tier) {
  const cfg = await chatConfig(false, tier, true);
  cfg.body.messages.push({ role: 'user', content: prompt });

  const response = await fetch(cfg.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.key}` },
    body: JSON.stringify(cfg.body)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw cfg.mapError(response.status, errData);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop();   // keep the last (possibly incomplete) line
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('data:')) continue;
      const jsonStr = trimmed.slice(5).trim();
      if (!jsonStr || jsonStr === '[DONE]') continue;
      try {
        const delta = JSON.parse(jsonStr).choices?.[0]?.delta;
        const piece = delta?.content;      // NOT delta.reasoning_content
        if (piece) {
          fullText += piece;
          onChunk(piece, fullText);
        }
      } catch (_) { /* incomplete JSON fragment split across reads — ignore */ }
    }
  }

  if (!fullText) throw new Error(`Received empty response from ${cfg.name}.`);
  return fullText;
}

// ── DEEPSEEK ──────────────────────────────────────────────────────────────────
// OpenAI-compatible /chat/completions, which is why it shares chatRequest with
// OpenAI above. Called straight from the browser: the API sends CORS headers
// reflecting the origin, so this app needs no backend.
//
// DeepSeek's own error strings are terse, and two of them are what every new
// user meets first. Verified against the live API: a bad key returns 401
// "Authentication Fails", and a valid key with no credit returns 402
// "Insufficient Balance" — which sounds like a fault rather than an errand.
// Both get turned into something that says what to do about it.
function deepseekError(status, errData) {
  const raw = errData?.error?.message || '';
  if (status === 402 || /insufficient balance/i.test(raw)) {
    return new Error('Your DeepSeek account has no credit. The API is pay-as-you-go — '
      + 'top up at platform.deepseek.com (Billing) and try again. Your key is fine.');
  }
  if (status === 401 || /authentication fails/i.test(raw)) {
    return new Error('DeepSeek rejected that API key. Check it in Settings — it should '
      + 'start with "sk-" and be copied whole.');
  }
  if (status === 429) {
    return new Error('DeepSeek is rate-limiting the account. Wait a moment and try again.');
  }
  return new Error(raw || `DeepSeek request failed (${status}).`);
}

// ── GEMINI: ATTACHMENTS ONLY ──────────────────────────────────────────────────
// Reached only when a call carries a fileUri — a PDF in the Gemini File API, or
// a YouTube URL for it to watch. Everything else goes to DeepSeek.
async function geminiRequest(prompt, responseJson, fileUri) {
  const url = `${geminiUrl(GEMINI_FILE_MODEL)}?key=${getGeminiKey()}`;

  // Media part FIRST, then the text — the order the API's own examples use.
  // videoMetadata must sit beside fileData in the SAME part; that pairing is
  // what clips the video server-side so only the requested window is ever
  // tokenized. Without it a long video exceeds the context on its own.
  const fileData = typeof fileUri === 'string'
    ? { mimeType: 'application/pdf', fileUri }
    : { fileUri: fileUri.fileUri, ...(fileUri.mimeType ? { mimeType: fileUri.mimeType } : {}) };
  const part = { fileData };
  if (typeof fileUri === 'object' && fileUri.videoMetadata) {
    part.videoMetadata = fileUri.videoMetadata;
  }

  const payload = { contents: [{ parts: [part, { text: prompt }] }] };
  if (responseJson) {
    payload.generationConfig = {
      responseMimeType: 'application/json',
      // 1000-page books produce very large curricula
      maxOutputTokens: 65536
    };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    console.error('Gemini API Error:', errData);
    throw new Error(errData.error?.message || 'Failed to query Gemini API.');
  }

  const result = await response.json();
  const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textResponse) throw new Error('Received empty response from Gemini API.');

  if (!responseJson) return textResponse;
  console.log('Raw Gemini response:', textResponse.trim());
  return parseModelJson(textResponse);
}

// ── GEMINI FILE UPLOAD ────────────────────────────────────────────────────────
// Uploads a File (PDF or TXT) to Gemini's File API via multipart/related.
// Returns the fileUri string, which can then be attached to any prompt.
// onProgress(0..100) is called with upload progress estimates.
async function uploadPdfToGemini(file, onProgress = () => {}) {
  const apiKey = getGeminiKey();
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
// Checks whether the model has deep or surface-level knowledge of the book.
// Returns "deep" if it knows the book well, or "ref" if the user must paste text.
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
    return await queryAI(prompt, true);
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
    return await queryAI(prompt, true);
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
    const result = await queryAI(prompt, true);
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
    // the raw verbatim text, to avoid tripping recitation/copyright filters.
    // The model supplements with its own knowledge to generate rich summaries.
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

  return await queryAI(prompt, true, fileUri);
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
    return await queryAI(prompt, true);
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
  const result = await queryAI(prompt, true);
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
  const result = await queryAI(prompt, true);
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
  const result = await queryAI(prompt, true, null, 'fast');
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
  const result = await queryAI(prompt, true, null, 'fast');
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
  const result = await queryAI(prompt, true);
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
  const result = await queryAI(prompt, true, null, 'fast');
  return result.problem || '';
}

// ── AGENT 4: SOCRATIC TUTOR (TEACH & QUIZ MODES) ─────────────────────────────
// Powers the two-tab tutor system.
// "teach" mode: Page-by-page 80/20 teaching with mastery tag detection.
// "quiz" mode:  Comprehensive chapter review and retention testing.
// chapterText: raw PDF text for the chapter (optional) — enables direct quoting.
// A tutor that can only ever hint is a dead end: the student who genuinely does
// not know has no way out of the question. "I don't know" is not a wrong answer
// — it is the absence of one — and the Socratic rules on their own never covered
// it, so the tutor would hint at a learner who had nothing left to guess with.
// Shared verbatim by every tutor prompt: an escape hatch that exists in teach
// mode but not quiz mode is not an escape hatch.
const NO_DEAD_END_RULE = `
      WHEN THE STUDENT DOESN'T KNOW — this overrides every "hint, don't tell" rule above:
      - "I don't know", "no idea", "not sure", "tell me", "what's the answer",
        "just tell me", "skip", a shrug, or silence are NOT wrong answers. They are
        a request for help. Never score them as a failed attempt.
      - FIRST time on a question: one short hint, then invite a guess.
      - SECOND time on the same question, or ANY time they ask outright for the
        answer: GIVE THE ANSWER IN FULL, plainly, with a worked example. Then move
        on. Do not hint again, and do not ask them to try once more.
      - Never hint more than twice on the same question, whatever they say.
      - A question you asked must never be left unanswered. The student can always
        get the answer out of you simply by asking for it.`;

async function callLiveTutorAgent(userMessage, mode = 'teach', masteredConcepts = [], chapterText = '', onChunk = null, opts = {}) {
  const bookTitle = AppState.selectedBook.title;
  const chapter = AppState.selectedChapter;
  const { priorContext = '', scope = 'cumulative' } = opts;

  // Everything studied before this chapter, compactly. A book is one argument
  // running across its chapters, so by default the tutor and the quiz both see
  // the whole of it up to here — not the open chapter in isolation.
  const priorBlock = (scope === 'cumulative' && priorContext) ? `
      EVERYTHING THE STUDENT HAS STUDIED BEFORE THIS CHAPTER:
      ---
      ${priorContext}
      ---
      Treat the book as ONE continuous argument. Connect what you teach back to
      these earlier chapters wherever the link is real — "this is the same
      principle as X in chapter 3, applied to…" — and correct any earlier idea
      the student now seems to have muddled. Never re-teach an earlier chapter
      from scratch; assume they have read it and build on it.
` : '';

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
      ${scope === 'cumulative'
        ? 'You are teaching this chapter IN THE CONTEXT OF the whole book so far.'
        : 'The student has asked to focus on THIS CHAPTER ONLY — do not reach back to earlier chapters.'}
${priorBlock}
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
${NO_DEAD_END_RULE}
    `;
  } else {
    prompt = `
      You are a Socratic Quiz Master reviewing "${bookTitle}"${scope === 'cumulative'
        ? ` — everything up to and including Chapter ${chapter.number}: "${chapter.title}"`
        : ` — Chapter ${chapter.number}: "${chapter.title}" ONLY`}.
${priorBlock}
      CURRENT CHAPTER CONTENT:
      ---
      ${chapter.summary_15m}
      ---
      Core Concepts: ${chapter.concepts.join(', ')}

      QUIZ CONVERSATION HISTORY:
      ${historyText}

      Student's message: "${userMessage}"

      QUIZ RULES:
      1. Ask probing questions that test deep comprehension of all core concepts.
      ${scope === 'cumulative' ? `Draw from the WHOLE book so far, not just the
         current chapter, and favour questions that join two chapters together —
         those are the ones that reveal whether the argument has actually landed.` : ''}
      2. If they answer correctly, praise them and move to the next concept or ask a deeper follow-up.
      3. If they answer incorrectly, guide them with a Socratic hint — don't give the answer
         directly. This holds for a WRONG answer only; see the rule below for no answer at all.
      4. The student may also ask clarifying questions. Answer them clearly with analogies.
      5. NEVER output any "[MASTERED: ...]" tags in this mode.
      6. After covering all concepts, give a brief performance summary.
${NO_DEAD_END_RULE}
    `;
  }

  // 'fast'. The tutor streams, so its words start arriving in about a second —
  // and a tutor that pauses to think is a tutor you stop talking to. The
  // thinking budget is spent on the LESSON instead, which is written once and
  // then read many times.
  try {
    return onChunk
      ? await queryAIStream(prompt, onChunk, 'fast')
      : await queryAI(prompt, false, null, 'fast');
  } catch (error) {
    console.error('Tutor API call failed:', error);
    return `[Tutor System] Couldn't reach the API. Please check your key and connection.\nError: ${error.message}`;
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
      "notes": "one sentence on what makes this language's writing/pronunciation distinctive for a beginner",
      "altScripts": []
    }

    "altScripts": ONLY when the language is actively written in more than one
    script by different communities (e.g. Punjabi: Gurmukhi in India,
    Shahmukhi in Pakistan; Serbian: Cyrillic and Latin). Then list each as
    { "script": "one of the classification values above", "scriptName": "human name",
      "romanizationName": "its romanization or null",
      "note": "one line on who uses it / why choose it — e.g. for Shahmukhi,
       mention that readers of Urdu script already nearly know it" }.
    For single-script languages, return an empty array.

    If the input is not a recognizable human language, return: { "error": "not a language" }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  if (result.error || !result.code) throw new Error(`Couldn't recognize "${languageName}" as a language.`);
  return {
    name: result.name,
    nativeName: result.nativeName || result.name,
    code: result.code,
    ttsLangCode: result.ttsLangCode || result.code,
    script: result.script || 'latin',
    scriptName: result.scriptName || 'Latin alphabet',
    romanizationName: result.script === 'latin' ? null : (result.romanizationName || 'romanization'),
    notes: result.notes || '',
    altScripts: Array.isArray(result.altScripts)
      ? result.altScripts.filter(s => s && s.scriptName).slice(0, 3)
      : []
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
  const result = await queryAI(prompt, true, null, 'quick');
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

// ════════════════════════════════════════════════════════════════════════════
// THE INSTRUCTOR — the main tutor, who teaches how the language WORKS.
//
// The Companion agents below (story, partner) manufacture comprehensible input
// and forced output; on their own they rely on the learner INFERRING the rules
// from exposure, which needs immersion-scale volume. The Instructor supplies
// what an adult learner can use and a child cannot: the rules stated outright,
// then drilled. It owns the syllabus, and its current unit steers every
// Companion prompt — which is what makes conversation escalate quickly instead
// of drifting.
// ════════════════════════════════════════════════════════════════════════════

// ── AGENT: SYLLABUS ARCHITECT ────────────────────────────────────────────────
// Called ONCE per language, then cached in langSyllabus/{langId} forever. Lays
// out the grammar ladder in teaching order — each rung a structure the learner
// can build sentences with the moment they've got it.
async function callSyllabusArchitect(langProfile, startLevel = 'A0') {
  const prompt = `
    You are designing the complete grammar syllabus for an adult English
    speaker learning ${langProfile.name}, starting at ${startLevel}.

    Produce 40 units in STRICT TEACHING ORDER — each one usable immediately and
    building only on units before it. Cover the real backbone of the language:
    how a basic sentence is built, then negation and questions, then the tense
    system (present, past, future), agreement, and whatever else ${langProfile.name}
    genuinely requires (cases, particles, aspect, classifiers, honorifics — only
    if that language actually has them). Do NOT impose English grammar.

    For each unit:
    - "title": short and concrete, e.g. "Talking about yesterday"
    - "structure": the pattern itself in one line, the thing being taught
    - "whyItMatters": one sentence on what it unlocks for the learner
    - "level": one of A0, A1, A2, B1, B2

    Return ONLY valid JSON, no markdown fences:
    {
      "units": [
        { "id": "u1", "title": "...", "structure": "...", "whyItMatters": "...", "level": "A0" }
      ]
    }
  `;
  // 'deep' — this is the one call worth waiting for. A syllabus is written
  // ONCE and then read for the whole course, so letting the model think it
  // through costs a few seconds once and pays back every lesson after.
  const result = await queryAI(prompt, true, null, 'deep');
  const units = Array.isArray(result.units)
    ? result.units.filter(u => u.title && u.structure)
    : [];
  if (!units.length) throw new Error('Syllabus generation returned no units.');
  return units.map((u, i) => ({
    id: u.id || `u${i + 1}`,
    title: u.title,
    structure: u.structure,
    whyItMatters: u.whyItMatters || '',
    level: ['A0', 'A1', 'A2', 'B1', 'B2'].includes(u.level) ? u.level : 'A1'
  }));
}

// ── AGENT: GRAMMAR UNIT GENERATOR ────────────────────────────────────────────
// One unit's teaching content, generated on demand and cached with the lesson.
// Explanation → pattern table → worked examples → the pitfall → drills.
// A lesson is written in TWO calls, fired together, because it is read in two
// parts and they do not need each other. The teaching is prose and STREAMS, so
// the first sentences are on the page in about a second; the pattern table,
// examples, pitfall and drills are structured JSON and arrive when they arrive.
//
// It used to be one call for all of it, which meant nothing appeared until the
// slowest part finished — measured at 21s on DeepSeek for a full lesson, and
// worse on a provider whose model reasons before answering. Splitting costs
// nothing in quality: each half gets the same instructions it had, at the same
// length, and the two run in parallel so the wall clock is the slower of the
// two rather than the sum.
function lessonContext(langProfile, unit, knownWords, verses) {
  const knownList = knownWords.slice(-200).join(', ');
  const quranBlock = langProfile.code === 'ar-quran'
    ? `\n    THE EXAMPLES ARE NOT YOURS TO WRITE — they are verses.\n${QURAN_SOURCE_RULE}${quranVerseBlock(verses)}\n`
    : '';
  return `
    THE UNIT: ${unit.title}
    THE STRUCTURE: ${unit.structure}
${quranBlock}
    WORDS THEY ALREADY KNOW (build examples from these where you can):
    ${knownList || '(near-beginner — use only the most universal starter words)'}
`;
}

// The half a learner reads first. Prose, streamed, and deliberately unbounded —
// same brief it had when it was one field of a JSON blob.
async function callLessonExplanation(langProfile, unit, knownWords = [], verses = [], onChunk = null) {
  const prompt = `
    You are a patient grammar teacher explaining ONE structure in
    ${langProfile.name} to an adult English speaker.
${lessonContext(langProfile, unit, knownWords, verses)}
    Write THE TEACHING — the part of the page a learner actually reads to
    understand this structure. It should be AS LONG AS IT NEEDS TO BE. Do not
    summarise; teach. Cover, in this order:
      - what the structure IS, in plain English
      - how to RECOGNISE it on the page — what to look for, in what order
      - what CHANGES when it applies, part by part
      - where a beginner goes wrong, and how to tell the difference

    Compare to English wherever it helps. If you must use a grammatical term,
    define it in the same breath — never assume they know jargon.
    Aim for 300-600 words. Do not pad it, and do not cut it short.

    Write markdown: "## " for a sub-heading, "- " for a list item, "**bold**"
    for the thing being named. Short paragraphs.

    Output the teaching itself and NOTHING else — no preamble, no JSON, no
    fences, no closing remark about what comes next on the page.
  `;
  const text = onChunk
    ? await queryAIStream(prompt, onChunk, 'fast')
    : await queryAI(prompt, false, null, 'fast');
  return String(text || '').trim();
}

// Everything with a shape: the table, the examples, the pitfall, the drills.
// No "explanation" field any more — that is the streamed half above, and asking
// for it here would double the cost of the slowest call for nothing.
// `opts.withDrills` / `opts.withWordGlosses` — both default on, and both are
// turned OFF by the lesson page, which renders NEITHER. The drill activity
// belongs to the daily-session player, and the Quranic course has no strands so
// it is unreachable there; word taps look their gloss up on tap (see glossify,
// which ignores wordGlosses entirely). Generating them anyway put roughly 1,200
// output tokens on the slowest call for nothing:
//
//   with drills + wordGlosses   13.7s   1,898 output tokens
//   without                      7.5s     705 output tokens
//
// That is not a quality trade. It is the same lesson, minus two fields nobody
// ever saw. Recipes that DO play drills still ask for them.
async function callGrammarUnitGenerator(langProfile, unit, knownWords = [], verses = [], opts = {}) {
  const { withDrills = true, withWordGlosses = true } = opts;
  const nonLatin = langProfile.script !== 'latin';
  const prompt = `
    You are a patient grammar teacher laying out ONE structure in
    ${langProfile.name} for an adult English speaker. The prose explanation is
    being written separately — your job is the parts with a shape.
${lessonContext(langProfile, unit, knownWords, verses)}
    Write:
    1. "patternTable" — the pattern laid out concretely (the conjugation set,
       the word-order slots, the case endings — whatever fits). 3-8 rows.
    2. "examples" — 4 full sentences using the structure, each with an English
       gloss${withWordGlosses ? ' and a per-word gloss so every word can be tapped' : ''}.
    3. "pitfall" — the ONE mistake English speakers reliably make here.
    ${withDrills ? `4. "drills" — 6 practice items, mixed across these kinds:
       - "cloze": prompt has a ___ blank; "answer" is the missing word only
       - "build": "options" are the sentence's words scrambled; "answer" is the
         correctly ordered sentence
       - "transform": prompt gives a sentence + an instruction (e.g. "put this
         into the past"); "answer" is the transformed sentence
       - "translate": prompt is an English sentence; "answer" is it in ${langProfile.name}
       Every drill must exercise THIS unit's structure. Include a "hint" that
       points at the rule without giving the answer away.` : ''}
    ${nonLatin ? `- Give "${langProfile.romanizationName}" romanization for every example sentence.` : ''}

    Return ONLY valid JSON, no markdown fences:
    {
      "patternTable": { "caption": "...", "rows": [{ "form": "...", "example": "...", "gloss": "..." }] },
      "examples": [{ "text": "...", ${nonLatin ? '"romanization": "...", ' : ''}"gloss": "..."${withWordGlosses ? ', "wordGlosses": [{ "word": "...", "gloss": "..." }]' : ''} }],
      "pitfall": "..."${withDrills ? ',\n      "drills": [{ "kind": "cloze", "prompt": "...", "answer": "...", "options": [], "hint": "..." }]' : ''}
    }
  `;
  // 'fast', on evidence. This used to be 'deep' on the reasoning that a lesson
  // is generated once and cached, so being right beat being quick. Timed
  // against the live API on a real lesson prompt, that reasoning does not
  // survive contact:
  //
  //   thinking on   107.6s   12,310 reasoning tokens   4 table rows
  //   thinking off   13.1s        0 reasoning tokens   6 table rows
  //
  // and worse, a second run with thinking on spent its ENTIRE 16,384-token
  // budget reasoning and returned an empty object after 141 seconds — a lesson
  // that simply fails to load. The thinking was not buying quality here, it was
  // buying a two-minute wait and a coin flip.
  let result = await queryAI(prompt, true, null, 'fast');
  let drills = Array.isArray(result.drills)
    ? result.drills.filter(d => d.prompt && d.answer).slice(0, 8)
    : [];

  // One retry before giving up: a JSON call that comes back empty is usually a
  // one-off, and failing a lesson outright is much worse than asking twice.
  const empty = (r, d) => !r.patternTable?.rows?.length && !(r.examples || []).length
                          && (!withDrills || !d.length);
  if (empty(result, drills)) {
    console.warn('Lesson mechanics came back empty — retrying once.');
    result = await queryAI(prompt, true, null, 'fast');
    drills = Array.isArray(result.drills)
      ? result.drills.filter(d => d.prompt && d.answer).slice(0, 8)
      : [];
  }
  if (empty(result, drills)) {
    throw new Error('Grammar unit generation returned nothing usable.');
  }
  return {
    patternTable: result.patternTable && Array.isArray(result.patternTable.rows)
      ? { caption: result.patternTable.caption || '', rows: result.patternTable.rows.filter(r => r.form).slice(0, 8) }
      : null,
    examples: Array.isArray(result.examples) ? result.examples.filter(e => e.text).slice(0, 6) : [],
    pitfall: result.pitfall || '',
    drills: drills.map(d => ({
      kind: ['cloze', 'build', 'transform', 'translate'].includes(d.kind) ? d.kind : 'translate',
      prompt: d.prompt,
      answer: String(d.answer),
      options: Array.isArray(d.options) ? d.options : [],
      hint: d.hint || ''
    }))
  };
}

// ── AGENT: DRILL GRADER ──────────────────────────────────────────────────────
// Only for free-text drills (transform / translate) — cloze and build grade
// locally with no network call. The Instructor's voice: says what the rule is,
// unlike the Companion, which corrects by recasting and never lectures.
async function callDrillGrader(langProfile, unit, drill, answer) {
  const prompt = `
    A learner of ${langProfile.name} is practising this structure:
    "${unit.structure}" (unit: ${unit.title})

    TASK GIVEN: ${drill.prompt}
    EXPECTED ANSWER: ${drill.answer}
    LEARNER WROTE: ${answer}

    Mark it. Accept any answer that is genuinely correct ${langProfile.name},
    even if it differs from the expected one (synonyms, valid word order,
    missing accents or diacritics on an otherwise correct answer). Reject it
    only if the STRUCTURE being practised is wrong.

    If wrong, say in one sentence what the rule requires — name it plainly, do
    not just restate the correct answer.

    Return ONLY valid JSON, no markdown fences:
    { "verdict": "pass" | "gap", "feedback": "one sentence", "correctedAnswer": "the correct sentence" }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  return {
    verdict: result.verdict === 'pass' ? 'pass' : 'gap',
    feedback: result.feedback || '',
    correctedAnswer: result.correctedAnswer || drill.answer
  };
}

// ── AGENT: WORD GLOSS ────────────────────────────────────────────────────────
// The tap-a-word lookup. The most latency-sensitive call in the app, and the
// last resort — most taps are served by glosses shipped with the lesson or by
// the per-language cache, so this only fires for genuinely unseen words.
async function callWordGloss(langProfile, word, sentence = '') {
  const nonLatin = langProfile.script !== 'latin';
  const prompt = `
    Give the meaning of ONE word in ${langProfile.name} for an English-speaking
    learner who just tapped it.

    WORD: ${word}
    ${sentence ? `IN THIS SENTENCE: ${sentence}` : ''}

    Give the meaning it carries HERE, not a dictionary dump. Keep it under 8
    words. If it is an inflected form, add its base form in the note.

    Return ONLY valid JSON, no markdown fences:
    { "meaning": "short English meaning", ${nonLatin ? `"romanization": "in ${langProfile.romanizationName}", ` : ''}"note": "base form or grammar note, or empty" }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  return {
    meaning: result.meaning || '',
    romanization: result.romanization || null,
    note: result.note || ''
  };
}

// ── AGENT: FOUNDATION DECK ───────────────────────────────────────────────────
// The pre-built deck. One frequency band per call so onboarding can fire all
// bands in parallel and hand the learner a real vocabulary base — enough to
// hold a conversation up — instead of the ~30 cards the seed deck gave them.
async function callFoundationDeck(langProfile, band, count = 50) {
  const nonLatin = langProfile.script !== 'latin';
  const from = (band - 1) * count + 1;
  const to = band * count;
  const prompt = `
    You are building band ${band} of a frequency-ordered foundation deck for a
    learner of ${langProfile.name}.

    Cover roughly the ${from}-${to} most frequent words of ${langProfile.name},
    in descending frequency. These are the workhorse words — function words,
    core verbs, everyday nouns — not topic vocabulary.

    For each word, write a SHORT natural sentence (2-7 words) that uses it, and
    the English translation of that sentence. Sentences should reuse words from
    earlier in the band so the deck compounds.

    Return exactly ${count} cards. Return ONLY valid JSON, no markdown fences:
    {
      "cards": [
        { "front": "sentence in ${langProfile.name}", "back": "English translation", "word": "the target word", ${nonLatin ? '"romanization": "romanized sentence", ' : ''}"type": "vocab" }
      ]
    }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  const cards = Array.isArray(result.cards) ? result.cards.filter(c => c.front && c.back) : [];
  if (!cards.length) throw new Error(`Foundation deck band ${band} returned no cards.`);
  return cards.map(c => ({
    front: c.front,
    back: c.back,
    word: c.word || '',
    romanization: c.romanization || null,
    type: 'vocab',
    band
  }));
}

// ── AGENT: SCRIPT UNIT GENERATOR ─────────────────────────────────────────────
// Script bootcamp for non-Latin languages: each unit teaches the NEXT ~10
// characters of the writing system in pedagogical order (kana rows, alphabet
// clusters, highest-frequency hanzi with component mnemonics). Cards join the
// same SM-2 deck as type:'script'.
async function callScriptUnitGenerator(langProfile, unitNumber, learnedChars = []) {
  const prompt = `
    You are teaching the ${langProfile.scriptName} writing system of
    ${langProfile.name}, one small unit at a time, in the standard
    pedagogical order for this script (e.g. kana by gojūon row; alphabets by
    letter groups; Chinese characters by frequency with radical components).

    ALREADY LEARNED (do not repeat): ${learnedChars.join(' ') || '(nothing yet)'}
    This is unit ${unitNumber}. Teach the NEXT 10 characters/letters.

    For each, create one card:
    - front: the character exactly as it appears in text
    - back: its sound and/or meaning, plus a SHORT vivid mnemonic
      (for logographic characters, name the components: "tree 木 + sun 日 = …")
    - romanization: how it is pronounced in ${langProfile.romanizationName || 'romanization'}

    Return ONLY valid JSON, no markdown fences:
    { "cards": [{ "front": "char", "back": "sound/meaning — mnemonic", "romanization": "pronunciation" }] }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  const cards = Array.isArray(result.cards) ? result.cards.filter(c => c.front && c.back) : [];
  if (!cards.length) throw new Error('Script unit generation returned no cards.');
  return cards.slice(0, 12).map(c => ({
    front: c.front,
    back: c.back,
    word: c.front,
    romanization: c.romanization || null,
    type: 'script'
  }));
}

// ── AGENT: GRADED STORY / DAILY LESSON GENERATOR ─────────────────────────────
// The "i+1" engine: a tiny story using ~95% words the learner already knows
// plus a handful of new frequency words. Comprehensible input, manufactured.
// Returns a full day's lesson: story + glosses + checkpoints + shadow
// sentences + a conversation topic (consumed by the other strands).
async function callGradedStoryGenerator(langProfile, level, knownWords = [], unit = null) {
  const nonLatin = langProfile.script !== 'latin';
  const knownList = knownWords.slice(-400).join(', ');
  const prompt = `
    You are a language tutor writing today's micro-lesson for a ${level}-level
    learner of ${langProfile.name}.

    WORDS THE LEARNER KNOWS (use these for ~95% of the story):
    ${knownList || '(complete beginner — use only the most universal starter words)'}
${unit ? `
    THE STRUCTURE THEY HAVE JUST BEEN TAUGHT: ${unit.structure}
    (from the unit "${unit.title}")

    Use that structure in at least HALF the sentences — this story is where the
    rule they just studied becomes something they have actually seen working.
    Do NOT use structures from later in the course that they have not met yet.
` : ''}
    Write a SHORT, warm, slightly funny story or dialogue in ${langProfile.name}:
    - ${level === 'A0' ? '5-6' : level === 'A1' ? '7-9' : '9-12'} sentences, each short enough to hold in the head
    - Introduce exactly ${level === 'A0' ? '3' : '4'} NEW high-frequency words not on the known list
    - Every sentence must be understandable from the known words + the new
      words + obvious context. No rare vocabulary, no idioms.
    ${nonLatin ? `- Provide "${langProfile.romanizationName}" romanization for every sentence and word.` : ''}

    Also produce:
    - a one-line English gloss (translation) for each sentence
    - a per-word gloss for every sentence, so the learner can tap any word
    - the new words with meanings and the story sentence each appears in
    - 2 comprehension questions in English about the story's content
    - the 4 best sentences for out-loud shadowing practice
    - a one-line conversation topic related to the story${unit ? ' that cannot be answered without using the structure above' : ''}

    Return ONLY valid JSON, no markdown fences:
    {
      "title": "story title in ${langProfile.name}",
      "titleGloss": "English title",
      "sentences": [{ "text": "sentence", ${nonLatin ? '"romanization": "romanized", ' : ''}"gloss": "English translation", "wordGlosses": [{ "word": "word", "gloss": "English meaning" }] }],
      "newWords": [{ "word": "word", ${nonLatin ? '"romanization": "romanized", ' : ''}"meaning": "English meaning", "exampleSentence": "the story sentence containing it" }],
      "checkpoints": [{ "question": "English comprehension question" }],
      "shadowSentences": ["sentence text", "sentence text", "sentence text", "sentence text"],
      "chatTopic": "one-line topic"
    }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  if (!Array.isArray(result.sentences) || !result.sentences.length) {
    throw new Error('Story generation returned no sentences.');
  }
  return {
    title: result.title || '',
    titleGloss: result.titleGloss || '',
    sentences: result.sentences.filter(s => s.text).map(s => ({
      ...s,
      wordGlosses: Array.isArray(s.wordGlosses) ? s.wordGlosses.filter(w => w.word && w.gloss) : []
    })),
    newWords: Array.isArray(result.newWords) ? result.newWords.filter(w => w.word && w.meaning) : [],
    checkpoints: Array.isArray(result.checkpoints) ? result.checkpoints.filter(c => c.question).slice(0, 2) : [],
    shadowSentences: Array.isArray(result.shadowSentences) ? result.shadowSentences.slice(0, 4) : [],
    chatTopic: result.chatTopic || ''
  };
}

// ── AGENT: CONVERSATION PARTNER ──────────────────────────────────────────────
// The output strand: a patient native-speaker partner who replies at the
// learner's level, keeps them producing, and corrects errors by RECASTING —
// repeating the idea correctly in flow, then one marked "✏️" line the UI
// turns into an optional review card. Never lectures.
async function callLangPartner(langProfile, level, topic, history, userMessage, opts = {}) {
  const { unit = null, intensity = 'normal', onChunk = null } = opts;
  const nonLatin = langProfile.script !== 'latin';
  const historyText = history
    .map(m => `${m.role === 'user' ? 'Learner' : 'Partner'}: ${m.content}`)
    .join('\n');

  // The complexity dial. The old version keyed only off the CEFR level, which
  // drifts slowly — so the conversation never got harder at a pace the learner
  // could feel. Intensity is theirs to set, and it moves immediately.
  const intensityRules = {
    gentle: `Sentences no longer than 6 words. After EVERY ${langProfile.name} sentence,
      give the English in parentheses. Reuse the learner's own words back to them.`,
    normal: `Short, natural sentences. English in parentheses only for words likely
      to be new. Introduce one or two unfamiliar words per reply, in contexts that
      make them guessable.`,
    push: `Speak close to how you would to a native, just a notch slower: full
      sentences, natural connectors, idiom where it fits. Give English ONLY if the
      learner stalls. Introduce several new words per reply and expect them to keep
      up. Ask follow-up questions that need more than one sentence to answer.`
  };

  const prompt = `
    You are a warm, patient native ${langProfile.name} speaker having a casual
    chat with a ${level}-level learner. You are NOT a teacher giving a lesson —
    you are a friend keeping a conversation going.

    Topic to anchor on: "${topic}"

    HOW HARD TO MAKE THIS: ${intensityRules[intensity] || intensityRules.normal}
    ${nonLatin ? `SCRIPT: after each ${langProfile.name} phrase, add its ${langProfile.romanizationName} in parentheses.` : ''}
${unit ? `
    WHAT THEY ARE CURRENTLY LEARNING: ${unit.structure} (unit: "${unit.title}")
    Use this structure yourself, and ask questions that can only be answered by
    using it. This conversation is where that rule gets used for real. When they
    do use it correctly, just carry on naturally — do not praise the grammar.
` : ''}
    CONVERSATION RULES:
    1. Reply mostly in ${langProfile.name}, within the rules above. Keep the
       whole reply under ${intensity === 'push' ? '110' : '70'} words.
    2. If the learner made an error, do NOT point it out directly. First
       respond naturally, recasting their idea correctly inside your reply.
       Then, at the END, add one line starting with exactly "✏️ " in this
       format: ✏️ corrected sentence — brief English reason (max 10 words)
    3. If there was no error, no ✏️ line.${unit ? `
       Prioritise correcting mistakes in "${unit.structure}" over everything else.` : ''}
    4. ALWAYS end with a simple question to keep them talking.
    5. Understand them even when their grammar is broken — meaning first. This
       is about comprehension, not about letting errors pass uncorrected.

    CONVERSATION SO FAR:
    ${historyText || '(you speak first — greet them and open the topic)'}

    Learner's message: "${userMessage}"
  `;

  return onChunk
    ? await queryAIStream(prompt, onChunk, 'quick')
    : await queryAI(prompt, false, null, 'quick');
}

// ── ASSESSMENT ITEM GENERATORS ───────────────────────────────────────────────
// Three flavors of placement items for the adaptive ladder (LangAssess).
// Each returns an array of exactly 4 multiple-choice items for one difficulty
// band; the ladder moves between bands based on how many the learner gets.

function _validateAssessItems(result) {
  const items = (Array.isArray(result?.items) ? result.items : [])
    .filter(it => it && it.prompt && Array.isArray(it.options) && it.options.length === 4
      && Number.isInteger(it.answerIdx) && it.answerIdx >= 0 && it.answerIdx <= 3);
  if (items.length < 4) throw new Error('Assessment item generation came back malformed.');
  return items.slice(0, 4);
}

// Generic placement: mixed recognition/comprehension at CEFR-ish bands 1-8
async function callPlacementItems(langProfile, band) {
  const bandDesc = [
    'absolute beginner (most common greetings and words)',
    'high beginner (everyday nouns, simple present-tense sentences)',
    'low elementary (common verbs, simple questions)',
    'elementary (short everyday sentences, past tense)',
    'low intermediate (compound sentences, common idioms)',
    'intermediate (opinion and narration)',
    'upper intermediate (abstract topics, less common vocabulary)',
    'advanced (nuanced vocabulary, complex structures)'
  ][band - 1];
  const prompt = `
    Create exactly 4 multiple-choice placement questions for a learner of
    ${langProfile.name}, at difficulty band ${band}/8: ${bandDesc}.

    Mix vocabulary recognition and short-sentence comprehension. Each question
    has exactly 4 options with ONE correct answer. Questions and options in
    English; the ${langProfile.name} material inside the prompt text.
    ${langProfile.script !== 'latin' ? `Include ${langProfile.romanizationName} for any ${langProfile.name} text.` : ''}

    Return ONLY valid JSON, no markdown fences:
    { "items": [{ "prompt": "question text", "options": ["a","b","c","d"], "answerIdx": 0 }] }
  `;
  return _validateAssessItems(await queryAI(prompt, true, null, 'quick'));
}

// Frontier finding for fluent speakers: which frequency band gets spotty
async function callFrontierItems(langProfile, band) {
  const freqZone = [
    'the 1,000 most common words', 'the 1,000-2,000 frequency range',
    'the 2,000-5,000 frequency range', 'the 5,000-10,000 frequency range',
    'the 10,000-15,000 frequency range', 'the 15,000-20,000 frequency range',
    'the 20,000-30,000 frequency range', 'beyond the 30,000 most common words'
  ][band - 1];
  const prompt = `
    A fluent ${langProfile.name} speaker is mapping the edge of their
    vocabulary. Create exactly 4 word-recognition questions using words from
    ${freqZone} of ${langProfile.name}.

    Each question: "Which is the closest meaning of «word»?" with 4 short
    meaning options, ONE correct. Distractors must be plausible (same part of
    speech, related domain) but clearly wrong to someone who knows the word.
    Do NOT use words with transparent cognates that give the answer away.

    Return ONLY valid JSON, no markdown fences:
    { "items": [{ "prompt": "Which is the closest meaning of «word»?", "options": ["a","b","c","d"], "answerIdx": 0 }] }
  `;
  return _validateAssessItems(await queryAI(prompt, true, null, 'quick'));
}

// ── WHERE QURANIC EXAMPLES COME FROM ─────────────────────────────────────────
// Shared by the tutor and the lesson writer. The rule used to say "prefer short,
// famous verses the student is likely to have heard", naming al-Fātiḥah,
// al-Ikhlāṣ and Āyat al-Kursī — which is exactly why the same dozen verses came
// round again and again and the other 6,000 never appeared. Familiarity was the
// wrong thing to optimise: a learner is here to read the Qur'an they will
// actually open, and nearly all of it sits in the long and middle surahs.
//
// Naming surahs explicitly rather than saying "vary it" is deliberate. A model
// asked to be varied stays where it is comfortable; a model handed a list
// reaches into the list.
const QURAN_SOURCE_RULE = `
      WHERE YOUR EXAMPLES COME FROM:
      - Every example is REAL QUR'AN, quoted exactly: the Arabic, then the
        transliteration, then the English, then the surah:ayah reference. Never
        invent an Arabic sentence to illustrate a point.
      - Draw on the WHOLE Qur'an — any of the 114 surahs, any juzʾ. Most of the
        Qur'an is in the long and middle surahs, so that is where most of your
        examples should come from: al-Baqarah, Āl ʿImrān, al-Nisāʾ, al-Māʾidah,
        al-Anʿām, al-Aʿrāf, al-Tawbah, Yūnus, Hūd, Yūsuf, al-Raʿd, Ibrāhīm,
        al-Ḥijr, al-Naḥl, al-Isrāʾ, al-Kahf, Maryam, Ṭā-Hā, al-Anbiyāʾ, al-Ḥajj,
        al-Muʾminūn, al-Nūr, al-Furqān, al-Shuʿarāʾ, al-Naml, al-Qaṣaṣ,
        al-ʿAnkabūt, al-Rūm, Luqmān, al-Sajdah, al-Aḥzāb, Sabaʾ, Fāṭir, Yā-Sīn,
        al-Ṣāffāt, Ṣād, al-Zumar, Ghāfir, Fuṣṣilat, al-Shūrā, al-Zukhruf,
        al-Dukhān, al-Jāthiyah, al-Aḥqāf, Muḥammad, al-Fatḥ, al-Ḥujurāt, Qāf,
        al-Dhāriyāt, al-Ṭūr, al-Najm, al-Qamar, al-Raḥmān, al-Wāqiʿah, al-Ḥadīd,
        al-Mujādilah, al-Ḥashr, al-Ṣaff, al-Jumuʿah, al-Munāfiqūn, al-Ṭalāq,
        al-Taḥrīm, al-Mulk, al-Qalam, al-Ḥāqqah, al-Maʿārij, Nūḥ.
      - Do NOT keep returning to al-Fātiḥah, Āyat al-Kursī, al-Ikhlāṣ, al-ʿAṣr,
        al-Kawthar and the last juzʾ. A verse being famous is not a reason to
        pick it. Fitting the point you are teaching is the only reason.
      - Move around. Consecutive examples should come from different surahs, and
        across a lesson you should range over narrative, law, parable, argument
        and supplication rather than one kind of passage.
      - Accuracy still outranks reach. Quote only wording you are certain of — if
        you cannot recall a verse exactly, choose a different one you can.
      - THE REFERENCE MUST BE RIGHT OR ABSENT. Ranging widely means you will
        sometimes be sure of the words but unsure of the number. When that
        happens, name the surah alone ("from Sūrat al-Kahf") or say "elsewhere in
        the Qur'an" — never attach a surah:ayah you are guessing at. A student
        who memorises a wrong reference has been taught something false, and a
        missing number costs them nothing.`;

// The verses handed to a call, drawn from the bundled text. Quoting beats
// recalling: everything in this block is the checked Uthmani text with its real
// reference, so an example built from it cannot be misquoted or misattributed.
function quranVerseBlock(verses) {
  if (!verses?.length) return '';
  return `
      VERSES TO BUILD THIS MESSAGE'S EXAMPLE FROM — this is the exact text of
      the Qur'an with its exact reference. Copy the Arabic character for
      character and cite the reference as given:
${verses.map(v => `      ${v.ref} · ${v.surah}\n        ${v.text}`).join('\n')}

      YOUR EXAMPLE COMES FROM THIS LIST. Pick whichever shows your point most
      clearly — a phrase inside a verse is fine, you need not use the whole
      ayah. Copy it from the text above; do not type it from memory. The Arabic
      you show must appear character for character inside the verse you cite.

      Do NOT set the list aside for a verse you happen to remember. The verses
      you remember best — al-Fātiḥah, Āyat al-Kursī, al-Ikhlāṣ, the last juzʾ —
      are the ones this student has already met a hundred times, and they are
      off limits here. That is the whole reason this list exists.

      Only if NOT ONE of the verses above contains the structure at all may you
      go elsewhere, and then say the surah name with NO verse number.

      Choose silently. The student sees ONE example, not your search for it —
      never show a verse and then say it was the wrong one.`;
}

// A fresh conversation has no history to diversify against, and left to itself
// a model opens on the same verse every time. Each turn is handed a different
// stretch of the muṣḥaf to look in first — a nudge, not a cage: if the unit is
// better served elsewhere, elsewhere is right.
const QURAN_REGIONS = [
  'al-Baqarah and Āl ʿImrān (surahs 2-3)',
  'al-Nisāʾ, al-Māʾidah and al-Anʿām (surahs 4-6)',
  'al-Aʿrāf, al-Anfāl and al-Tawbah (surahs 7-9)',
  'Yūnus, Hūd and Yūsuf (surahs 10-12)',
  'al-Raʿd through al-Naḥl (surahs 13-16)',
  'al-Isrāʾ, al-Kahf and Maryam (surahs 17-19)',
  'Ṭā-Hā, al-Anbiyāʾ and al-Ḥajj (surahs 20-22)',
  'al-Muʾminūn, al-Nūr and al-Furqān (surahs 23-25)',
  'al-Shuʿarāʾ, al-Naml and al-Qaṣaṣ (surahs 26-28)',
  'al-ʿAnkabūt through al-Sajdah (surahs 29-32)',
  'al-Aḥzāb, Sabaʾ and Fāṭir (surahs 33-35)',
  'Yā-Sīn, al-Ṣāffāt and Ṣād (surahs 36-38)',
  'al-Zumar, Ghāfir and Fuṣṣilat (surahs 39-41)',
  'al-Shūrā through al-Jāthiyah (surahs 42-45)',
  'al-Aḥqāf, Muḥammad, al-Fatḥ and al-Ḥujurāt (surahs 46-49)',
  'Qāf, al-Dhāriyāt, al-Ṭūr and al-Najm (surahs 50-53)',
  'al-Qamar, al-Raḥmān and al-Wāqiʿah (surahs 54-56)',
  'al-Ḥadīd through al-Ṣaff (surahs 57-61)',
  'al-Jumuʿah through al-Taḥrīm (surahs 62-66)',
  'al-Mulk, al-Qalam, al-Ḥāqqah and al-Maʿārij (surahs 67-70)'
];

// Surah:ayah references the tutor has already used, pulled back out of the
// conversation so it can be told not to repeat itself. Insisting on variety in
// the abstract does nothing; naming the verses already spent does.
function usedVerseRefs(history) {
  const refs = [];
  for (const m of history) {
    if (m.role === 'user') continue;
    for (const [, s, a] of String(m.content).matchAll(/\b(\d{1,3}):(\d{1,3})\b/g)) {
      const surah = parseInt(s, 10);
      if (surah >= 1 && surah <= 114 && parseInt(a, 10) >= 1) refs.push(`${surah}:${a}`);
    }
  }
  return [...new Set(refs)];
}

// ── AGENT: QURANIC TUTOR ─────────────────────────────────────────────────────
// The book tutor's counterpart for the language side, and the same two modes:
// `teach` works through the unit and emits [MASTERED: …] when the learner shows
// they have it; `quiz` probes. What is different is the voice. The brief is
// "simple and simplistic": this tutor is talking to someone who wants to read
// the Qur'an, not someone taking an exam in Arabic grammar.
//
//   opts.scope     'cumulative' (default) — everything up to and including this
//                  unit, or 'unit' — this unit alone.
//   opts.history   [{ role, content }] for this mode only, so teach and quiz
//                  never bleed into each other.
//   opts.roots     roots the learner already knows, so examples use words they
//                  can actually decode.
//   opts.priorUnits the units already covered, for the cumulative view.
//   opts.verses    real verses from the bundled text to quote from, so the
//                  example and its reference are checked rather than recalled.
//   opts.intent    'explain' | 'next' when the learner TAPPED an answer to
//                  "Want me to explain?" rather than typing one. See below —
//                  a tap is a known intent, so it does not go through the
//                  branch table at all.
async function callQuranTutor(lang, unit, userMessage, mode = 'teach', opts = {}) {
  const { scope = 'cumulative', history = [], roots = [], priorUnits = [],
          verses = [], intent = null, onChunk = null } = opts;

  // The tags are machinery. Left in the transcript the model copies them back —
  // it answered "yes, explain" by offering to explain all over again, because
  // that is what its own previous message looked like. The state they carry is
  // restated below in words instead.
  const historyText = history
    .map(m => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${
      String(m.content).replace(/\[MASTERED:[^\]]*\]/gi, '').replace(/\[EXPLAIN\?\]/gi, '').trim()}`)
    .join('\n');

  const lastTutor = [...history].reverse().find(m => m.role !== 'user')?.content || '';
  const offerPending = /\[EXPLAIN\?\]/i.test(lastTutor);

  const priorBlock = (scope === 'cumulative' && priorUnits.length) ? `
      ALREADY COVERED — build on these, never re-teach them from scratch:
      ${priorUnits.map((u, i) => `${i + 1}. ${u.title} — ${u.structure}`).join('\n      ')}
` : '';

  const rootsBlock = roots.length ? `
      ROOTS THE STUDENT ALREADY KNOWS — reach for these first when choosing an
      example, so they can decode it instead of just being shown it:
      ${roots.slice(-60).join(' · ')}
` : '';

  const used = usedVerseRefs(history);
  const usedBlock = used.length ? `
      VERSES YOU HAVE ALREADY USED IN THIS CONVERSATION — do not use them again,
      go somewhere else in the Qur'an:
      ${used.slice(-40).join(' · ')}` : '';

  // Real verses when the text is loaded; a region nudge when it isn't, so a
  // learner whose text failed to download still gets examples from all over.
  const verseBlock = quranVerseBlock(verses);
  const regionBlock = verseBlock ? '' : `
      LOOK HERE FIRST for this message's example: ${
        QURAN_REGIONS[Math.floor(Math.random() * QURAN_REGIONS.length)]}. If nothing
      there teaches the point cleanly, go anywhere else in the Qur'an — but do
      not fall back on the famous short surahs out of habit.`;

  // The house style. Shared where it should be — plain English, jargon always
  // unpacked — but the two modes are not the same job. Teaching explains;
  // quizzing asks. Running one voice across both is what turned the quiz into
  // a second pass through the lesson.
  const commonVoice = `
      - Plain English, short sentences. Never use a grammatical term without its
        meaning in the same breath: "idafah (two nouns stuck together to mean
        'the X of the Y')". Not once the first time and bare thereafter — every
        time.
      - Never make them feel behind. They are learning eight things, not eighty.`;

  const voice = mode === 'quiz' ? `
      HOW YOU TALK — in a quiz this matters more than anything else:
      - NEVER THINK OUT LOUD. No "hold on", no "actually", no "wait, that's only
        one word", no correcting yourself halfway through. Work out what you are
        asking BEFORE you start writing, then write only that. A message that
        shows you changing your mind is a failed message however good it ends up.
      - SHORT. A whole message is one or two lines plus the question. If you are
        writing a third line, you have started teaching again.
      - No preamble, no recap, no "as we saw earlier", no summing up what they
        have learned. They were taught this on the lesson page. Ask.
${commonVoice}
${QURAN_SOURCE_RULE}${regionBlock}${usedBlock}` : `
      HOW YOU TALK — this matters as much as what you teach:
      - Plain English, short sentences, ONE idea per message. If a message is
        getting long, stop and ask something instead.
      - Never use a grammatical term without its meaning in the same breath:
        "idafah (two nouns stuck together to mean 'the X of the Y')". Not once
        the first time and bare thereafter — every time.
      - Answer any question they ask, however far off topic, and then come back
        to the unit. A question is never an interruption.
      - Never make them feel behind. They are learning eight things, not eighty.
${QURAN_SOURCE_RULE}${regionBlock}${usedBlock}`;

  // Deliberately last in the prompt. Sitting up with the rest of the house
  // style it was read as background and the model went on quoting from memory;
  // immediately before the reply it is read as the task.
  const versesLast = `${verseBlock}`;

  const prompt = mode === 'teach' ? `
      You are teaching ONE unit of a short Quranic Arabic course to an adult
      beginner who speaks English and wants to understand the Qur'an as they read it.

      THIS UNIT — this is your brief, stay on it:
      Title: ${unit?.title || 'Getting started'}
      What it is: ${unit?.structure || ''}
      Why it matters: ${unit?.whyItMatters || ''}
      ${scope === 'cumulative'
        ? 'Teach it as part of what they have already learned.'
        : 'They have asked to focus on THIS UNIT ONLY — do not reach back to earlier ones.'}
${priorBlock}${rootsBlock}${voice}

      CONVERSATION SO FAR:
      ${historyText || '(this is the start)'}

      Student's message: "${userMessage}"

      HOW THE LESSON RUNS:
      1. If they are just starting or saying they're ready ("yes", "start", "ok"):
         teach the FIRST piece of this unit. Explain it in plain English, show ONE
         real Quranic example broken down word by word, then ask if it makes sense
         or if they want to see another.
      2. If they say they're ready to move on: ask ONE short question that makes
         them USE what you just taught on a real Quranic word or phrase. Never a
         yes/no question.
      3. If they answer it and they have the idea — wording doesn't matter —
         output the tag [MASTERED: ${unit?.title || 'this unit'}] and teach the
         next piece of the unit the same way.
      4. If they answer and they have it wrong: show them where their reasoning
         went, on the same example, and let them try again. No tag.
      5. When the whole unit is covered and they can use it, say so plainly and
         tell them the next unit is waiting.
${NO_DEAD_END_RULE}${versesLast}
  ` : `
      You are quizzing an adult beginner on a short Quranic Arabic course.

      THIS IS A QUIZ, NOT A LESSON. They have already read the lesson page and
      been taught this. Your job is to ask, take the answer, and ask the next
      one. Teaching happens here only when they ask for it.

      ${scope === 'cumulative'
        ? `TEST EVERYTHING THEY HAVE COVERED, up to and including "${unit?.title || ''}".
      Favour questions that need two units at once — those are the ones that show
      whether it has actually landed.`
        : `TEST ONLY THIS UNIT: "${unit?.title || ''}" — ${unit?.structure || ''}.`}
${priorBlock}${rootsBlock}${voice}${versesLast}

      QUIZ SO FAR:
      ${historyText || '(this is the start)'}
${offerPending ? `
      STATE: your last message asked "Want me to explain?" and is waiting for an
      answer. The student's message below is that answer. You have NOT explained
      yet, and you have NOT asked a new question yet.` : ''}

      The student has just said: "${userMessage}"
${intent === 'explain' ? `
      ── WHAT TO DO NOW ──────────────────────────────────────────────────────
      They have TAPPED "Explain it". This is not an answer to your question —
      it is a request. Do exactly this and nothing else:

      Explain the question they just missed, in two or three sentences. Then ask
      ONE new question, in one line.

      Do NOT open with "Not quite". Do NOT restate the correction. Do NOT ask
      whether they want an explanation — they have just told you they do. Do NOT
      output [EXPLAIN?]. Six lines at the very most.
  ` : intent === 'next' ? `
      ── WHAT TO DO NOW ──────────────────────────────────────────────────────
      They have TAPPED "Next question". This is not an answer to your question —
      it is a request to move on. Do exactly this and nothing else:

      Ask ONE new question. One line. Nothing before it.

      Do NOT comment on the question they missed. Do NOT explain anything. Do
      NOT output [EXPLAIN?].
  ` : `
      ── WHAT TO DO NOW ──────────────────────────────────────────────────────
      Work out which ONE of these the message is, and do only that. Nothing
      else goes in your reply.

      A) They are starting ("ready", "ok", "go") →
         Ask one question. Nothing before it.

      B) Their answer is RIGHT →
         "Correct." then the next question. Exactly two lines. Do not say why it
         was right. Do not add a detail. Do not go deeper on the same point.

      C) Their answer is WRONG, or they don't know →
         Three things, in this order, and then STOP:
           1. "Not quite —" and the correct answer, in ONE line.
           2. The line "Want me to explain?"
           3. The tag [EXPLAIN?] on its own.
         Do NOT explain. Do NOT ask another question. Do NOT mention any other
         verse. Four lines at the very most, and the message ends at the tag.

      D) They are answering "Want me to explain?" with YES ("yes", "explain",
         "why", "go on") →
         Explain the question they just missed, in two or three sentences —
         no more. Then ask ONE new question, in one line. Six lines total, and
         no [EXPLAIN?] tag on this message.

      E) They are answering "Want me to explain?" with NO ("no", "next",
         "move on") →
         Ask the next question. One line. Say nothing about the one they missed.

         While an offer is pending, anything that is not plainly a refusal —
         including "I don't know", another wrong guess, or a puzzled reply —
         counts as YES. Do branch D. Never re-offer an explanation you have
         already offered.

      F) They asked you something →
         Answer it in two sentences, then ask the next question.

      G) They say they are done →
         One short, honest line on what is solid and what needs another look.

      WHATEVER THE BRANCH:
      - Pick your question silently. If the first verse you look at has nothing
        useful in it, look at another one — in your head. Never write "hold on",
        "that's only one word", "let me find a better one". The student sees the
        finished question and nothing else.
      - One question per message. Never two.
      - Never output a "[MASTERED: ...]" tag in this mode. The [EXPLAIN?] tag is
        machinery: it is stripped before the student sees the message, and it
        puts an "Explain it" button under your question. It belongs on branch C
        and nowhere else.
  `}`;

  // 'fast', for the same reason as the book tutor: it streams, and a pause
  // before every reply costs more than the thinking is worth in a conversation.
  try {
    return onChunk
      ? await queryAIStream(prompt, onChunk, 'fast')
      : await queryAI(prompt, false, null, 'fast');
  } catch (error) {
    console.error('Quran tutor call failed:', error);
    return `[Tutor] Couldn't reach the API. ${error.message}`;
  }
}

// ── AGENT: A WORD YOU ALREADY KNOW, SWAPPED ─────────────────────────────────
// "I know this one" is information, not a complaint: it says the set is pitched
// slightly below them. So the replacement is not just any other word — it is a
// word in the SAME area of meaning, which is where the next useful one lives.
// Same shape as callVocabWords returns, so the card renders identically.
async function callSimilarWord(langProfile, tier, word, meaning, known = [], theme = '') {
  const nonLatin = langProfile.script && langProfile.script !== 'latin';
  const bannedList = known.slice(-200).join(', ');

  const prompt = `
    A learner of ${langProfile.name} says they already know "${word}"
    (${meaning}). Give them ONE different word to learn instead.

    THE REPLACEMENT MUST:
    - sit in the SAME area of meaning as "${word}" — a near-synonym, a sharper
      or more specific version, or a word they would use in the same situation.
      They asked for more of this, not a change of subject.
    - be a DIFFERENT word, not a form or spelling of "${word}" itself.
    - be HARDER than "${word}" — if they know that one, the useful next word is
      the one just past it, not one beside it at the same level.
    ${theme ? `- stay within the theme: ${theme}.` : ''}

    NEVER return any of these, which they have already had:
    ${bannedList || '(nothing yet)'}

    ${nonLatin ? `Write the word in ${langProfile.name}'s own script. Give
    "${langProfile.romanizationName}" for the word and for the example.` : ''}

    Return ONLY valid JSON, no markdown fences:
    {
      "word": "...",
      "partOfSpeech": "...",
      ${nonLatin ? '"pronunciation": "...",' : '"pronunciation": "...",'}
      "meaning": "a precise definition, one sentence",
      "example": "one sentence using it naturally",
      ${nonLatin ? '"exampleRomanization": "...", "exampleTranslation": "...",' : ''}
      "contrast": "how it differs from ${word}, in one line"
    }
  `;

  // 'quick' — the learner is looking at the card, waiting for it to change.
  const w = await queryAI(prompt, true, null, 'quick');
  if (!w?.word) throw new Error('No replacement word came back.');
  if (!wordMatchesScript(w.word, langProfile.script)) {
    throw new Error(`"${w.word}" is not written in ${langProfile.name}.`);
  }
  if (String(w.word).trim().toLowerCase() === String(word).trim().toLowerCase()) {
    throw new Error('The same word came back — try once more.');
  }
  return {
    word: w.word,
    partOfSpeech: w.partOfSpeech || '',
    pronunciation: w.pronunciation || '',
    meaning: w.meaning || '',
    example: w.example || '',
    exampleRomanization: w.exampleRomanization || '',
    exampleTranslation: w.exampleTranslation || '',
    cloze: '',
    contrast: w.contrast || ''
  };
}

// ── AGENT: QURANIC LEMMAS, IN BULK ───────────────────────────────────────────
// The whole 300-root deck is built at once, and one call per root would be 300
// calls. Fifteen roots per call returns all fifteen with five lemmas each in
// about twenty seconds (measured), so the entire corpus costs ~21 calls that
// can run in parallel. The roots, their transliterations, meanings and
// frequencies all come from the static file — this only supplies the words.
const QURAN_LEMMA_BATCH = 15;

async function callQuranLemmasBatch(entries, perRoot = 5) {
  const list = entries.map((e, i) => {
    const label = e.kind === 'particles' ? e.words.join(' · ') : e.root;
    return `${i + 1}. ${label} (${e.translit}) — ${e.gloss}`;
  }).join('\n');

  const prompt = `
    You are a Quranic Arabic lexicographer. For EACH entry below, give the
    ${perRoot} words built from it that occur MOST OFTEN in the Qur'an.

    ${list}

    Frequency in the Qur'an decides each list — not how interesting or how
    classical a word is. If a form barely appears, leave it out in favour of one
    that appears constantly.

    For each word give:
    - "word": the word in Arabic script, fully vowelled, in the form the Qur'an
      actually uses (a verb in its 3rd-person masculine singular past, a noun in
      its singular indefinite, unless another form is the common one)
    - "romanization": how an English speaker would say it
    - "meaning": what it means, in plain English, in a few words
    - "form": what kind of word it is, in plain English — "verb (Form I), past",
      "noun", "doer noun", "passive participle", "plural noun", "adjective".
      Never an Arabic grammatical term without its English gloss.

    Return ONLY valid json, no markdown fences:
    { "roots": [ { "root": "<exactly as written above>",
                   "lemmas": [ { "word": "…", "romanization": "…", "meaning": "…", "form": "…" } ] } ] }

    All ${entries.length} entries must appear, in the same order.
  `;

  const result = await queryAI(prompt, true, null, 'fast');
  const rows = Array.isArray(result.roots) ? result.roots : [];

  // Matched back by POSITION, not by the root string the model echoed — it
  // reformats Arabic spacing often enough that string matching drops rows.
  return entries.map((entry, i) => {
    const lemmas = (rows[i]?.lemmas || [])
      .filter(l => l && l.word && l.meaning && wordMatchesScript(l.word, 'arabic'))
      .slice(0, perRoot)
      .map(l => ({
        word: l.word,
        romanization: l.romanization || '',
        meaning: l.meaning,
        form: l.form || '',
        note: ''
      }));
    return { entry, lemmas };
  });
}

// ── AGENT: QURANIC LEMMAS ────────────────────────────────────────────────────
// Item one of the syllabus: 300 roots, "along with some lemmas". The root, its
// transliteration, its meaning and its frequency all come from the static
// corpus file — this agent supplies only the five actual words the Qur'an
// builds from that root, which is the part no static file can hold for 300
// entries. Cached per root forever, so a root costs one call in its lifetime.
async function callQuranLemmas(entry, count = 5) {
  const isParticles = entry.kind === 'particles';
  const prompt = `
    You are a Quranic Arabic lexicographer.

    ${isParticles
      ? `THE GROUP: the function words ${entry.words.join(' · ')} (${entry.gloss}).`
      : `THE ROOT: ${entry.root} (${entry.translit}) — its core meaning is "${entry.gloss}".`}

    Give the ${count} words built from ${isParticles ? 'this group' : 'this root'}
    that occur MOST OFTEN in the Qur'an. Frequency in the Qur'an decides the list —
    not how interesting or how classical a word is. If a form barely appears, leave
    it out in favour of one that appears constantly.

    For each word:
    - "word": the word in Arabic script, fully vowelled, in the form the Qur'an
      actually uses it (a verb in its 3rd-person masculine singular past, a noun
      in its singular indefinite, unless another form is the common one)
    - "romanization": how an English speaker would say it
    - "meaning": what it means, in plain English, in a few words
    - "form": what kind of word it is, in plain English — "verb (Form I)",
      "verb (Form II)", "doer noun", "passive participle", "plural noun",
      "adjective". Never use an Arabic grammatical term without an English gloss.
    - "note": ONE short line on how this word relates to the root's core meaning,
      so the connection is visible rather than asserted. Omit if it adds nothing.

    Return ONLY valid JSON, no markdown fences:
    { "lemmas": [ { "word": "…", "romanization": "…", "meaning": "…", "form": "…", "note": "…" } ] }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  const lemmas = (Array.isArray(result.lemmas) ? result.lemmas : [])
    // An Arabic lemma is written in Arabic. Same guard as the vocabulary
    // builder: a model asked for Arabic will occasionally answer in English.
    .filter(l => l && l.word && l.meaning && wordMatchesScript(l.word, 'arabic'))
    .slice(0, count)
    .map(l => ({
      word: l.word,
      romanization: l.romanization || '',
      meaning: l.meaning,
      form: l.form || '',
      note: l.note || ''
    }));
  if (!lemmas.length) throw new Error(`No Quranic words came back for ${entry.root}.`);
  return lemmas;
}

// ── AGENT: VERSE LADDER (Quranic placement) ──────────────────────────────────
// Onboarding's reading check: verses of rising difficulty, so a learner starts
// the course where they actually are rather than where the app assumes.
async function callVerseLadderItems(band) {
  const bandDesc = [
    'extremely well-known short phrases nearly every Muslim knows (basmala, alhamdulillah)',
    'very short, very famous complete verses (from al-Ikhlas, al-Kawthar, al-Asr)',
    'short verses from frequently-recited surahs with common vocabulary',
    'medium verses with common roots but less familiar phrasing',
    'longer verses requiring real vocabulary knowledge across several roots',
    'complex verses with rarer roots and layered grammar'
  ][band - 1];
  const prompt = `
    Create exactly 4 comprehension questions for a Quranic Arabic placement
    test at difficulty band ${band}/6: ${bandDesc}.

    Each question shows a REAL, exactly-quoted Quranic snippet (with its
    transliteration${band <= 2 ? '' : ' only if band ≤ 2'}) and asks in English what it means or refers to,
    with 4 options, ONE correct. Keep snippets short (under 12 words). Include
    the surah:verse reference inside the prompt.

    Return ONLY valid JSON, no markdown fences:
    { "items": [{ "prompt": "«arabic snippet» (transliteration) — Surah X:Y. What is this saying?", "options": ["a","b","c","d"], "answerIdx": 0 }] }
  `;
  return _validateAssessItems(await queryAI(prompt, true, null, 'quick'));
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
    return await queryAI(prompt, true, null, 'fast');
  } catch (error) {
    console.error('Feynman assessor failed:', error);
    return {
      score: 0,
      right: 'Connection error. Could not grade your explanation.',
      gaps: `Error: ${error.message}`,
      refined: 'Please check your DeepSeek API key in Settings and try again.'
    };
  }
}

// ── AGENT: DECODE DRILL GENERATOR (literacy recipe) ──────────────────────────
// For heritage speakers who understand the language but can't read its
// script. Drills use words the learner almost certainly knows ORALLY, built
// as much as possible from characters they've already been taught — success
// is the "sound it out… oh, I know that word!" moment.
async function callDecodeDrillGenerator(langProfile, learnedChars = [], knownWords = []) {
  const prompt = `
    A heritage speaker of ${langProfile.name} understands the spoken language
    fluently but is LEARNING TO READ the ${langProfile.scriptName} script.

    CHARACTERS THEY HAVE STUDIED SO FAR: ${learnedChars.join(' ') || '(none yet — use only the most basic, most common characters)'}
    WORDS ALREADY USED IN DRILLS (avoid repeats): ${knownWords.slice(-60).join(', ') || '(none)'}

    Create 6 decoding drills. Each drill is ONE common everyday word that a
    native SPEAKER definitely knows orally (household words, food, family,
    greetings, numbers) written in ${langProfile.scriptName}:
    - Strongly prefer words spellable with the studied characters; when you
      must use an unstudied character, keep it to one per word.
    - "meaning": the English meaning.
    - "distractors": 2 wrong English meanings, plausible but clearly different.
    - "romanization": the word in ${langProfile.romanizationName || 'romanization'} —
      the learner reads this fluently already (heritage speakers text this way).

    Return ONLY valid JSON, no markdown fences:
    {
      "drills": [
        { "written": "word in script", "romanization": "romanized", "meaning": "English meaning", "distractors": ["wrong 1", "wrong 2"] }
      ]
    }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  const drills = (Array.isArray(result.drills) ? result.drills : [])
    .filter(d => d.written && d.meaning && Array.isArray(d.distractors) && d.distractors.length >= 2)
    .slice(0, 6);
  if (!drills.length) throw new Error('Decode drill generation returned nothing usable.');
  return drills.map(d => ({
    written: d.written,
    romanization: d.romanization || null,
    meaning: d.meaning,
    distractors: d.distractors.slice(0, 2)
  }));
}

// ── AGENT: LISTENING CHECK ITEMS (literacy onboarding) ───────────────────────
// Confirms the heritage speaker really does understand the spoken language —
// sentences are PLAYED (TTS), the learner picks the meaning. Not a gate;
// it sets a realistic starting level.
async function callListeningCheckItems(langProfile, band) {
  const bandDesc = [
    'single common words', 'short everyday phrases', 'simple full sentences',
    'normal conversational sentences', 'longer sentences with two clauses',
    'complex sentences with less common vocabulary',
    'idiomatic, fast conversational speech patterns', 'formal or literary register'
  ][band - 1];
  const prompt = `
    Create exactly 4 listening-comprehension questions for someone who claims
    to SPEAK ${langProfile.name} but cannot read it. Difficulty band ${band}/8:
    ${bandDesc}.

    Each item: a short ${langProfile.name} sentence (in its native script, it
    will be read aloud by TTS — the learner never sees it written), plus 4
    English meaning options, ONE correct.

    Return ONLY valid JSON, no markdown fences:
    { "items": [{ "prompt": "What did the sentence mean?", "ttsText": "sentence in ${langProfile.name}", "options": ["a","b","c","d"], "answerIdx": 0 }] }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  const items = _validateAssessItems(result);
  if (!items.every(it => result.items.find(r => r.prompt === it.prompt)?.ttsText)) {
    // keep whatever ttsText came through; items without it still render as text
  }
  return items.map((it, i) => ({ ...it, ttsText: result.items[i]?.ttsText || null }));
}

// ── AGENT: PRECISION WORDS / CARDS (vocab-expansion recipe) ──────────────────
// For fluent speakers growing the long tail. Precision over translation:
// cloze from real sentences, near-synonym contrast, usage nuance.
async function callPrecisionWords(langProfile, frontierBand, knownWords = []) {
  const freqZone = [
    'the 1,000 most common words', 'the 1,000-2,000 frequency range',
    'the 2,000-5,000 frequency range', 'the 5,000-10,000 frequency range',
    'the 10,000-15,000 frequency range', 'the 15,000-20,000 frequency range',
    'the 20,000-30,000 frequency range', 'beyond the 30,000 most common words'
  ][(frontierBand || 4) - 1];
  const prompt = `
    A fluent ${langProfile.name} speaker is expanding their vocabulary at its
    frontier: ${freqZone}. Pick 5 genuinely useful words from JUST PAST that
    zone — words an educated reader meets in quality writing, not dictionary
    trivia.

    ALREADY LEARNED (do not repeat): ${knownWords.slice(-80).join(', ') || '(none yet)'}

    For each word:
    - "meaning": a precise, compact definition
    - "example": one natural sentence using it (quality-writing register)
    - "cloze": the same sentence with the word replaced by "_____"
    - "contrast": one line distinguishing it from its nearest common synonym
      ("unlike X, it implies …")

    Return ONLY valid JSON, no markdown fences:
    { "words": [{ "word": "word", "meaning": "…", "example": "…", "cloze": "…", "contrast": "…" }] }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  const words = (Array.isArray(result.words) ? result.words : [])
    .filter(w => w.word && w.meaning && w.example).slice(0, 5);
  if (!words.length) throw new Error('Precision word generation returned nothing usable.');
  return words.map(w => ({
    word: w.word, meaning: w.meaning, example: w.example,
    cloze: w.cloze || w.example, contrast: w.contrast || ''
  }));
}

// ── VIDEO CURRICULUM ─────────────────────────────────────────────────────────
// Gemini can watch a YouTube video directly from its URL — no download, no
// transcript service. The trick is what we ask it to produce: not a summary,
// but faithful STUDY TEXT per lesson. Everything downstream in this app
// (chapter curricula, the reader, checkpoints, flashcards, the tutor's quoting)
// already works on chapter text, so producing good text is the whole job — the
// rest of the pipeline needs no knowledge that a video was involved.

// Gemini's direct-URL ingestion is YouTube-only; anything else has to be
// uploaded as bytes, which this client-side app can't do. Fail early and say so.
function parseYouTubeUrl(url) {
  const clean = String(url || '').trim();
  const m = clean.match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|live\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (!m) return null;
  return { id: m[1], url: `https://www.youtube.com/watch?v=${m[1]}` };
}

// Long videos cannot be turned into a curriculum in one response — the study
// text for a two-hour talk far exceeds the output token limit, and the whole
// video exceeds the input budget too. So generation is done in PARTS: each call
// clips the video to a window starting where the last part stopped, produces as
// much as comfortably fits under the cap, and reports where it got to. The
// learner pulls the next part when they want it.
const VIDEO_PART_MAX_LESSONS = 5;

// Video is charged by the second of runtime — roughly 300 input tokens per
// second — so a video longer than about an hour exceeds the 1,048,576-token
// context on its own, before a word of the prompt or the reply. Every request
// therefore sends one bounded SPLIT of the video and never the rest of it.
//
// 10 minutes is ~180k tokens: a sixth of the limit, which leaves room for the
// prompt, the reply, and any slack in how a given video tokenizes.
const VIDEO_WINDOW_SECONDS = 10 * 60;
const VIDEO_WINDOW_MIN_SECONDS = 150;

// A token-limit rejection is recoverable: the same split is simply too big for
// this video, so halve it and try again rather than failing in the user's face.
function isTokenLimitError(err) {
  return /token count|too large|exceeds the maximum number of tokens|request payload size/i
    .test(err?.message || '');
}

async function callVideoCurriculum(videoUrl, userTitle = '', startChapter = 1, existingChapters = [], opts = {}) {
  const parsed = parseYouTubeUrl(videoUrl);
  if (!parsed) throw new Error('That doesn\'t look like a YouTube link. Paste a youtube.com or youtu.be URL.');

  const startOffset = Math.max(0, Math.floor(opts.startOffset || 0));
  const windowSeconds = Math.max(60, Math.floor(opts.windowSeconds || VIDEO_WINDOW_SECONDS));
  const endOffset = startOffset + windowSeconds;
  const part = opts.part || 1;
  const maxLessons = opts.maxLessons || VIDEO_PART_MAX_LESSONS;
  const fromStamp = secondsToStamp(startOffset);
  const toStamp = secondsToStamp(endOffset);

  const prompt = `
    Watch this video and turn it into study material.

    ${userTitle ? `The learner has named this curriculum "${userTitle}".` : ''}
    YOU ARE SEEING ONE WINDOW OF A LONGER RECORDING: ${fromStamp} to ${toStamp}.
    ${startOffset > 0 ? `This is PART ${part}; earlier parts already covered
    everything up to ${fromStamp}, so continue from there and do not re-teach
    earlier material.

    Every timestamp you report must be its position in the ORIGINAL full video,
    so add ${fromStamp} to any time you measure from the start of what you were
    given.` : 'This is PART 1, the opening window of the recording.'}

    The window may cut off mid-sentence — that is expected and simply means the
    recording continues past it. Say so via "reachedVideoEnd" rather than
    inventing a conclusion.
    ${existingChapters.length ? `
    This is being ADDED to an existing curriculum that already covers:
    ${existingChapters.map((t, i) => `${i + 1}. ${t}`).join('\n    ')}
    Do not repeat material already covered above. Number your chapters starting
    from ${startChapter}.` : ''}

    Break what you cover into its natural LESSONS — the distinct things it
    actually teaches, in the order taught.

    STOP AFTER AT MOST ${maxLessons} LESSONS. This matters: your reply has a hard
    length limit, and a reply that runs over is lost entirely. If the video
    continues past your ${maxLessons}th lesson, stop cleanly at that lesson's
    natural boundary rather than compressing the rest — the remainder will be
    requested as the next part. Never rush or summarise the tail to fit it in.

    For each lesson write "passages": the lesson broken into timestamped
    paragraphs of study prose that someone could learn from WITHOUT watching
    the video. This is the most important part of your output, so make it
    substantial — several hundred words per lesson across 3-8 passages:
    - Capture every real point the speaker makes, in their order of reasoning
    - Keep their actual claims, definitions, numbers, names and examples exact.
      Never round a figure, invent an example, or smooth over a caveat.
    - Preserve the reasoning that connects points, not just the conclusions
    - Write in clean prose paragraphs. No bullet lists, no markdown headings,
      no "in this video" or "the speaker says" framing — write it as teaching
      material in its own right.
    - If the speaker states something contentious or unsupported, report it as
      their claim rather than as fact.
    - Each passage carries "time": the moment in the video where THAT passage's
      material is said, as mm:ss (or hh:mm:ss for long videos). Be accurate —
      these timestamps are used to jump straight to the source, so a passage's
      time must point at where its content actually appears.

    Also give each lesson a "startTime" and "endTime" marking where the whole
    lesson runs in the video.

    Finally identify:
    - "title": a good name for the whole curriculum${userTitle ? ` (the learner's name for it takes priority: "${userTitle}")` : ''}
    - "author": who is teaching — the speaker or channel name
    - "topic": one line on what this curriculum covers
    - "coveredUntil": the timestamp in the ORIGINAL video where your last lesson
      ends — where the next part must pick up. It must fall between ${fromStamp}
      and ${toStamp}.
    - "reachedVideoEnd": true ONLY if the recording itself finished inside this
      window — the talk concluded, the speaker signed off. If the window simply
      ran out while material was still being taught, this is false.

    Return ONLY valid JSON, no markdown fences:
    {
      "title": "...",
      "author": "...",
      "topic": "...",
      "coveredUntil": "18:40",
      "reachedVideoEnd": false,
      "chapters": [
        { "number": ${startChapter}, "title": "lesson title", "startTime": "0:00", "endTime": "4:12",
          "passages": [
            { "time": "0:00", "text": "a paragraph of study prose…" },
            { "time": "1:35", "text": "the next paragraph…" }
          ] }
      ]
    }
  `;

  // ALWAYS bounded at both ends — an open-ended clip sends the whole remaining
  // video and blows the context limit on anything feature-length.
  const attachment = {
    fileUri: parsed.url,
    videoMetadata: { startOffset: `${startOffset}s`, endOffset: `${endOffset}s` }
  };

  let result;
  try {
    result = await queryAI(prompt, true, attachment, 'fast');
  } catch (err) {
    // Too big for this video: halve the split and retry from the same point,
    // so a dense or high-framerate recording still gets through.
    if (isTokenLimitError(err) && windowSeconds > VIDEO_WINDOW_MIN_SECONDS) {
      const smaller = Math.max(VIDEO_WINDOW_MIN_SECONDS, Math.floor(windowSeconds / 2));
      console.warn(`Video split of ${windowSeconds}s exceeded the token limit — retrying with ${smaller}s.`);
      if (typeof opts.onShrink === 'function') opts.onShrink(smaller);
      return await callVideoCurriculum(videoUrl, userTitle, startChapter, existingChapters,
        { ...opts, windowSeconds: smaller });
    }
    throw err;
  }

  const chapters = (Array.isArray(result.chapters) ? result.chapters : [])
    .map(c => {
      // Tolerate a model that ignores the passage split and returns flat text
      const passages = Array.isArray(c.passages) && c.passages.length
        ? c.passages.filter(p => p && p.text)
        : (c.text ? [{ time: c.startTime || '', text: c.text }] : []);
      return { ...c, passages };
    })
    .filter(c => c.title && c.passages.length)
    .map((c, i) => ({
      number: startChapter + i,
      title: c.title,
      startTime: c.startTime || c.passages[0].time || '',
      endTime: c.endTime || '',
      passages: c.passages.map(p => ({ time: p.time || '', text: p.text })),
      text: c.passages.map(p => p.text).join('\n\n')
    }));

  if (!chapters.length) {
    throw new Error('The AI could not extract any lessons from that video. It may be private, age-restricted, or too long.');
  }

  // A clipped video may be described in times measured from the clip rather
  // than the original. If everything came back before where this part was told
  // to start, that's what happened — shift it all back onto the real timeline
  // so timestamps stay comparable across parts.
  if (startOffset > 0) {
    const firstSeen = chapters
      .flatMap(c => [c.startTime, ...c.passages.map(p => p.time)])
      .map(stampToSeconds).filter(n => n > 0);
    const minSeen = firstSeen.length ? Math.min(...firstSeen) : 0;
    if (minSeen < startOffset) {
      const shift = (t) => (t ? secondsToStamp(stampToSeconds(t) + startOffset) : t);
      chapters.forEach(c => {
        c.startTime = shift(c.startTime);
        c.endTime = shift(c.endTime);
        c.passages.forEach(p => { p.time = shift(p.time); });
      });
      if (result.coveredUntil) result.coveredUntil = shift(result.coveredUntil);
    }
  }

  // The next part starts at the END OF THE SPLIT WE JUST SENT — a number we
  // chose ourselves, not one the model reported. This is the whole reliability
  // story: the model can misjudge where it stopped, drift, or answer in
  // clip-relative times, but the split boundary is arithmetic. Parts therefore
  // always tile forward exactly, with no gaps, overlaps or stalls.
  const coveredSecs = endOffset;
  const coveredUntil = secondsToStamp(coveredSecs);

  // The only thing the model is trusted for here: did the recording itself end
  // inside this split? Even that is disbelieved when its last lesson runs to
  // the split's edge, which is what a video merely cut off by the split looks
  // like.
  const lastLessonEnd = stampToSeconds(
    chapters[chapters.length - 1].endTime
    || chapters[chapters.length - 1].passages.slice(-1)[0]?.time
    || ''
  );
  const ranToTheEdge = lastLessonEnd >= endOffset - 45;
  const hasMore = !(result.reachedVideoEnd === true && !ranToTheEdge);

  return {
    title: userTitle || result.title || 'Video curriculum',
    author: result.author || 'Unknown',
    topic: result.topic || '',
    videoId: parsed.id,
    videoUrl: parsed.url,
    chapters,
    part,
    startOffset,
    endOffset,
    windowSeconds,
    coveredUntil,
    coveredSeconds: coveredSecs,
    reachedVideoEnd: result.reachedVideoEnd === true,
    hasMore
  };
}

// mm:ss / hh:mm:ss → seconds, and back. Kept beside the agent so prompt and
// parsing share one definition of a timestamp.
function stampToSeconds(stamp) {
  if (!stamp) return 0;
  const parts = String(stamp).trim().split(':').map(n => parseInt(n, 10));
  if (!parts.length || parts.some(isNaN)) return 0;
  return parts.reduce((total, n) => total * 60 + n, 0);
}

function secondsToStamp(total) {
  const s = Math.max(0, Math.floor(total || 0));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h > 0
    ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
    : `${m}:${String(sec).padStart(2, '0')}`;
}

// ── SCRIPT GUARD ─────────────────────────────────────────────────────────────
// Asked for Urdu, a model will still hand back English words some of the time —
// no amount of prompt insistence removes this entirely. For a language with its
// own script the check is objective, so it is done in code rather than argued
// about in the prompt: an Urdu word is written in Arabic script, full stop.
const SCRIPT_RANGES = {
  latin: 'A-Za-z\\u00C0-\\u024F',
  cyrillic: '\\u0400-\\u04FF',
  greek: '\\u0370-\\u03FF\\u1F00-\\u1FFF',
  arabic: '\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF',
  hebrew: '\\u0590-\\u05FF\\uFB1D-\\uFB4F',
  devanagari: '\\u0900-\\u097F\\uA8E0-\\uA8FF',
  cjk: '\\u4E00-\\u9FFF\\u3400-\\u4DBF\\uF900-\\uFAFF',
  hangul: '\\uAC00-\\uD7AF\\u1100-\\u11FF\\u3130-\\u318F',
  'kana-kanji': '\\u3040-\\u309F\\u30A0-\\u30FF\\u4E00-\\u9FFF\\u3400-\\u4DBF',
  thai: '\\u0E00-\\u0E7F'
};

// An unrecognized script ("other", or nothing recorded) has no range to test,
// and returns null — the caller then lets everything through rather than
// hiding words it cannot judge.
function scriptRegex(script, flags = '') {
  const range = SCRIPT_RANGES[script];
  return range ? new RegExp(`[${range}]`, flags) : null;
}

// Does this text contain any of the language's own letters at all?
function textHasScript(text, script) {
  const re = scriptRegex(script);
  if (!re || !text) return true;
  return re.test(String(text));
}

// Is this WORD actually written in the language's script? Stricter than
// textHasScript: a word that is mostly Latin letters with one stray mark is
// still an English word wearing a hat.
function wordMatchesScript(word, script) {
  const re = scriptRegex(script);
  if (!re) return true;
  const s = String(word || '').trim();
  if (!s) return false;
  if (!re.test(s)) return false;
  if (script !== 'latin' && /[A-Za-z]/.test(s)) {
    const own = (s.match(scriptRegex(script, 'g')) || []).length;
    const latin = (s.match(/[A-Za-z]/g) || []).length;
    if (latin >= own) return false;
  }
  return true;
}

// ── AGENT: VOCAB BUILDER ─────────────────────────────────────────────────────
// The vocabulary builder proper. Unlike callPrecisionWords, which walks a
// frequency frontier, this picks for ARTICULACY: words that let you say a
// thing you can already think but currently say clumsily. Works in any
// language — including the learner's own, where the goal is expression
// rather than comprehension.
async function callVocabWords(langProfile, tier = 'articulate', knownWords = [], theme = '', count = 6) {
  const tiers = {
    everyday: `words an educated adult uses in ordinary speech and writing but that
      a vague speaker reaches past — the precise word instead of the general one.
      Nothing that would sound showy said out loud.`,
    articulate: `words that mark a genuinely articulate speaker — the ones that make
      writing exact and arguments sharp. An educated reader knows them on sight but
      most people never actively use them.`,
    literary: `richer, rarer words from serious writing — still real working words
      an author would choose deliberately, never dictionary curiosities nobody uses.`
  };

  const isEnglish = /^en/i.test(langProfile.code || '') || /english/i.test(langProfile.name || '');
  const nonLatin = langProfile.script && langProfile.script !== 'latin';
  const romanName = langProfile.romanizationName || 'Roman letters';

  const buildPrompt = (need, banList, wrongScript) => `
    You are building a vocabulary set in ${langProfile.name.toUpperCase()}.

    EVERY WORD YOU RETURN MUST BE A ${langProfile.name.toUpperCase()} WORD,
    written ${nonLatin ? `in ${langProfile.scriptName} script` : `as ${langProfile.name} is normally written`}.
    ${isEnglish ? '' : `Do NOT return English words. The learner already speaks
    English and wants to expand their ${langProfile.name}. If you cannot think of
    a suitable ${langProfile.name} word, choose a different ${langProfile.name}
    word — never substitute an English one.`}
    ${nonLatin ? `The "word", "example" and "cloze" fields must be in
    ${langProfile.scriptName} characters. A word typed in Roman letters is WRONG
    here however correct the underlying ${langProfile.name} word is — the
    romanization belongs in "pronunciation" and "exampleRomanization", nowhere
    else.` : ''}
    ${wrongScript && wrongScript.length ? `
    YOUR LAST ANSWER WAS REJECTED for these — they were not ${langProfile.name}
    words in ${nonLatin ? langProfile.scriptName : 'the language'}:
    ${wrongScript.join(', ')}
    Do not return them, or anything in that form, again.` : ''}

    The goal is ARTICULACY: words that let the learner say precisely what they
    mean in ${langProfile.name}, instead of reaching for a vague general term.

    PICK: ${tiers[tier] || tiers.articulate}
    ${theme ? `THEME: focus on words useful for talking about "${theme}".` : ''}

    ALREADY LEARNED — these are BANNED. Do not return any of them, and do not
    return a trivial inflection of one either:
    ${banList.slice(-300).join(', ') || '(none yet)'}

    Choose ${need} words, all different from each other. Avoid words that are
    merely long or obscure — every one must earn its place by expressing
    something its common synonym cannot.

    For each word give:
    - "word": the word itself${nonLatin ? `, in ${langProfile.scriptName} script` : ''}
    - "partOfSpeech": noun / verb / adjective / adverb${isEnglish ? '' : ' (in English)'}
    ${nonLatin
      ? `- "pronunciation": how to say it, written in ${romanName} — this is what an
      English speaker reads to pronounce it`
      : `- "pronunciation": a simple respelling, e.g. "per-FUNK-tuh-ree"`}
    - "meaning": a precise, compact definition IN ENGLISH — no circular wording
    - "example": ONE natural sentence IN ${langProfile.name.toUpperCase()}${nonLatin
      ? `, written in ${langProfile.scriptName} script` : ''}, using the word well
      so its meaning is felt from context
    ${nonLatin ? `- "exampleRomanization": that same sentence in ${romanName}` : ''}
    ${isEnglish ? '' : '- "exampleTranslation": the English translation of that sentence'}
    - "cloze": that same sentence with the word replaced by exactly "_____"
    - "contrast": one line IN ENGLISH separating it from its nearest common
      ${langProfile.name} synonym, phrased "Unlike X, it implies …"

    Return ONLY valid JSON, no markdown fences:
    {
      "words": [
        { "word": "…", "partOfSpeech": "…", "pronunciation": "…", "meaning": "…",
          "example": "…", ${nonLatin ? '"exampleRomanization": "…", ' : ''}${isEnglish ? '' : '"exampleTranslation": "…", '}"cloze": "…", "contrast": "…" }
      ]
    }
  `;

  // Belt and braces on the "never repeat" instruction: models drift back to
  // favourites across calls, so anything already learned is dropped here too.
  const banned = new Set(knownWords.map(w => String(w).trim().toLowerCase()));
  const seen = new Set();
  const kept = [];
  let wrongScript = [];

  // Two attempts at most. The second one only happens when the first was
  // rejected on script grounds, and it names the offending words back to the
  // model — being shown the mistake is what actually stops it repeating.
  for (let attempt = 0; attempt < 2 && kept.length < count; attempt++) {
    const banList = [...knownWords, ...kept.map(w => w.word)];
    const result = await queryAI(
      buildPrompt(count - kept.length, banList, wrongScript), true, null, 'quick');
    const words = (Array.isArray(result.words) ? result.words : [])
      .filter(w => w.word && w.meaning && w.example);

    wrongScript = [];
    for (const w of words) {
      const key = String(w.word).trim().toLowerCase();
      if (!key || banned.has(key) || seen.has(key)) continue;
      // The objective test: an Urdu word is in Arabic script, and so is the
      // sentence it lives in. Anything else is the model answering in English.
      if (!wordMatchesScript(w.word, langProfile.script) ||
          !textHasScript(w.example, langProfile.script)) {
        wrongScript.push(String(w.word).trim());
        continue;
      }
      seen.add(key);
      kept.push({
        word: w.word,
        partOfSpeech: w.partOfSpeech || '',
        pronunciation: w.pronunciation || '',
        meaning: w.meaning,
        example: w.example,
        exampleRomanization: w.exampleRomanization || '',
        exampleTranslation: w.exampleTranslation || '',
        // A cloze is only useful if the blank is actually there
        cloze: (w.cloze && w.cloze.includes('_____')) ? w.cloze : blankOut(w.example, w.word),
        contrast: w.contrast || ''
      });
      if (kept.length >= count) break;
    }
    // A short set with nothing rejected is the caller's top-up problem, not a
    // script failure — re-asking here would just burn a call.
    if (!wrongScript.length) break;
  }

  if (!kept.length) {
    throw new Error(wrongScript.length
      ? `The model kept answering in the wrong script for ${langProfile.name}. Try again.`
      : 'Vocabulary generation returned nothing usable.');
  }
  return kept.slice(0, count);
}

// Falls back to blanking the word out of its own example when the model
// forgets the cloze — the quiz depends on this never being missing.
function blankOut(sentence, word) {
  const stem = word.length > 4 ? word.slice(0, Math.ceil(word.length * 0.6)) : word;
  const re = new RegExp(`\\b${stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\w*\\b`, 'i');
  return re.test(sentence) ? sentence.replace(re, '_____') : `_____ — ${sentence}`;
}

// ── AGENT: VOCAB USAGE GRADER ────────────────────────────────────────────────
// The quiz's one open question: use the word yourself. Multiple choice proves
// recognition; only producing a sentence proves you own it.
async function callVocabUsageGrader(langProfile, wordEntry, sentence) {
  // A root can't be used in a sentence — ك ت ب isn't a word, كَتَبَ is. What
  // proves you own a root is naming something that grew from it.
  if (wordEntry.lemmas?.length) {
    const prompt = `
      A learner is proving they own the Arabic root ${wordEntry.word}
      (${wordEntry.pronunciation || ''}), whose core meaning is "${wordEntry.meaning}".

      They were asked to name a word built from this root and say what it means.
      THEIR ANSWER: ${sentence}

      Words the Qur'an actually builds from this root include:
      ${wordEntry.lemmas.map(l => `${l.word} (${l.romanization || ''}) — ${l.meaning}`).join('; ')}

      Pass them if they named a real Arabic word from THIS root and gave a
      meaning that fits, whether or not it is on the list above, and whether they
      wrote it in Arabic script or in Roman letters. Fail them only if the word
      is from a different root, is not a word, or the meaning is unrelated.

      Return ONLY valid JSON, no markdown fences:
      { "verdict": "pass" | "gap", "feedback": "one encouraging sentence — if they were wrong, name a word from this root and what it means" }
    `;
    const result = await queryAI(prompt, true, null, 'quick');
    return { verdict: result.verdict === 'pass' ? 'pass' : 'gap', feedback: result.feedback || '' };
  }

  const prompt = `
    A ${langProfile.name} learner is proving they can USE a word they just studied.

    WORD: ${wordEntry.word}
    MEANING: ${wordEntry.meaning}
    THEIR SENTENCE: ${sentence}

    Judge only whether the word is used correctly and meaningfully. Accept any
    natural sentence that shows they grasp the meaning, even if simple or
    imperfectly punctuated. Reject it if the word is used in the wrong sense,
    forced in where it does not fit, or the sentence is too empty to show
    understanding (e.g. "I like perfunctory").

    Return ONLY valid JSON, no markdown fences:
    { "verdict": "pass" | "gap", "feedback": "one encouraging sentence naming what worked or what went wrong" }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  return {
    verdict: result.verdict === 'pass' ? 'pass' : 'gap',
    feedback: result.feedback || ''
  };
}

// Harvested from the user's own reading: one highlighted word → precision cards
async function callPrecisionCards(langProfile, selection, sentence, sourceBook) {
  const prompt = `
    While reading "${sourceBook || 'a book'}", a fluent ${langProfile.name}
    speaker highlighted a word they want to own: "${selection}"
    It appeared in this sentence:
    "${sentence}"

    Create 2 spaced-repetition cards for it — precision over translation:
    1. A CLOZE card: front = the original sentence with the word blanked to
       "_____" (plus "(from ${sourceBook || 'your reading'})"), back = the word + its precise meaning.
    2. A USAGE card: front = "When would you use «${selection}» rather than its
       nearest synonym?", back = the distinction + one fresh example sentence.

    Return ONLY valid JSON, no markdown fences:
    { "cards": [{ "front": "…", "back": "…" }] }
  `;
  const result = await queryAI(prompt, true, null, 'quick');
  const cards = (Array.isArray(result.cards) ? result.cards : [])
    .filter(c => c.front && c.back).slice(0, 2);
  if (!cards.length) throw new Error('Card generation returned nothing usable.');
  return cards.map(c => ({
    front: c.front, back: c.back, word: selection,
    romanization: null, type: 'precision', sourceBook: sourceBook || null
  }));
}
