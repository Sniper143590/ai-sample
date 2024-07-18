// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCf-jNdG3wgPukGmft0e5JtF9z44O31Iro",
  authDomain: "pro-audio-files-ai.firebaseapp.com",
  projectId: "pro-audio-files-ai",
  storageBucket: "pro-audio-files-ai.appspot.com",
  messagingSenderId: "383684347376",
  appId: "1:383684347376:web:1676c30d261243323b0935",
  measurementId: "G-H9XQSCQ1B5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage()

auth.languageCode = "en-GB"

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app)

export { auth, db, storage }