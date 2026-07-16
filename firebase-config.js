// firebase-config.js
//
// Centrale Firebase-configuratie, gebruikt door upload.html (uploaden)
// en index.html (galerij automatisch aanvullen met geüploade foto's/video's).
//
// Waar vind je deze waarden?
// Firebase Console → Project settings (tandwiel) → Algemeen →
// onder "Your apps" je webapp selecteren → "SDK setup and configuration" → Config
//
// Dit is dezelfde Firebase-project als je "boodschappen"-lijst al gebruikt
// (te herkennen aan de databaseURL in boodschappen.html) — vul hier de
// bijbehorende volledige config in.

export const firebaseConfig = {
  apiKey: "AIzaSyDYgaZENHO9Fbh7pcvcYDt1ObmMwwDPYSU",
  authDomain: "ebsite-c081e.firebaseapp.com",
  databaseURL: "https://ebsite-c081e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ebsite-c081e",
  storageBucket: "ebsite-c081e.firebasestorage.app",
  messagingSenderId: "62699217625",
  appId: "1:62699217625:web:6f568e90dc588839cc94c8"
};
