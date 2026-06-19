# Book Tutor: Socratic Active Learning Web App

An agentic, client-side web application designed to help you speed-read books and retain information using Active Recall, Spaced Repetition, and Socratic tutoring.

## Key Features
1. **Interactive Socratic Tutor:** An AI tutor that quizzes you to test your understanding.
2. **Knowledge Assessor:** Automatically grades your responses and unlocks chapters when you master concepts.
3. **Feynman Technique Sandbox:** A writing canvas where you explain concepts in your own words.
4. **Daily Review Deck:** Flashcards synced to your learning progress with a spaced-repetition scheduler.
5. **Multi-Agent Quality Check:** Before new summaries or flashcards are created, a QA agent fact-checks them.

---

## How to Get Started

### 1. Open the App
Since this is a client-side Single Page Application (SPA), you don't need to run any server!
* Simply open your file explorer, navigate to the `book-tutor` folder, and **double-click `index.html`** to open it in Chrome, Edge, Safari, or Firefox.
* Alternatively, if you want to run a local dev server, you can use:
  ```powershell
  npx http-server ./
  ```
  and visit the URL provided in your terminal.

### 2. Configure Your Free Gemini API Key
To run the learning agents on custom books:
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Click **Create API Key**.
3. Copy the key.
4. Open the web app, click **Settings** (gear icon in the top right), and paste your key there.
5. Click **Save**. The key is saved locally in your browser's `localStorage` and never leaves your computer.

### 3. Demo Mode
If you don't have an API key yet, toggle **Demo Mode** in the settings. This loads pre-configured books (including *The Behavior Operational Manual* by Chase Hughes and *Atomic Habits* by James Clear) so you can test all Socratic chat and flashcard features instantly.
