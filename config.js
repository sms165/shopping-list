import * as firebase from 'firebase';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, signInAnonymously } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDqZv7cGkkawuF4Hy2uXhKCY0OD384uQY0",
    authDomain: "shopping-list-f6f8e.firebaseapp.com",
    projectId: "shopping-list-f6f8e",
    storageBucket: "shopping-list-f6f8e.appspot.com",
    messagingSenderId: "610827837515",
    appId: "1:610827837515:web:30832bb1205c89326aadce",
    measurementId: "G-QHF1CMB9JB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

