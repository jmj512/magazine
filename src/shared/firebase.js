// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS4mLWsARNQ0x5EqHl6qfnnihtVTPHekw",
  authDomain: "authex-40b3b.firebaseapp.com",
  projectId: "authex-40b3b",
  storageBucket: "authex-40b3b.appspot.com",
  messagingSenderId: "351118968994",
  appId: "1:351118968994:web:a62028afa7180a2feaaffb",
  measurementId: "G-7BXRLMW6CG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;