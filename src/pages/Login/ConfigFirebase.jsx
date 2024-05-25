// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfb3ZFMTDV9aTqDgZZGFzcMFb8G9vfchk",
    authDomain: "chat-app-backend-a97e4.firebaseapp.com",
    projectId: "chat-app-backend-a97e4",
    storageBucket: "chat-app-backend-a97e4.appspot.com",
    messagingSenderId: "148842048245",
    appId: "1:148842048245:web:5062eb10d213a5163f73bc",
    measurementId: "G-YF9D7Q78FQ"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export { auth, provider }