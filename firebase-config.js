// ============================================================================
// BookTutor — Firebase Configuration (firebase-config.js)
// Using the compat SDK (loaded via CDN) — no npm install needed.
// This file is SAFE to commit to GitHub. Firebase config values are public
// identifiers; security is enforced by Firestore Security Rules server-side.
// ============================================================================

const firebaseConfig = {
  apiKey:            "AIzaSyDUCA41RD5HyLbG4aMMt_nsqbfXXGFSkO0",
  authDomain:        "book-tutor-9530c.firebaseapp.com",
  projectId:         "book-tutor-9530c",
  storageBucket:     "book-tutor-9530c.firebasestorage.app",
  messagingSenderId: "864948127551",
  appId:             "1:864948127551:web:819523347e61b18981358a",
  measurementId:     "G-Q5FHLVK8R5"
};

// Initialise Firebase
firebase.initializeApp(firebaseConfig);

// Convenience references used throughout app.js
const firestoreDB   = firebase.firestore();
const firebaseAuth  = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
