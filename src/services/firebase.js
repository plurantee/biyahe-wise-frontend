import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAlHyZGELP6C4dc4IXFeoHr94gFA6n3jm4",
    authDomain: "biyahewise-auth.firebaseapp.com",
    projectId: "biyahewise-auth",
    storageBucket: "biyahewise-auth.firebasestorage.app",
    messagingSenderId: "428044923013",
    appId: "1:428044923013:web:0c0bb8aa134fc89ea839ec",
    measurementId: "G-WC7DSZ75Y6"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');
