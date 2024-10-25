// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Votre configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD0_qSEiCfqYHhnIKrJtw0e-qgGOtbG7qQ",
    authDomain: "pwa-project-a5e0a.firebaseapp.com",
    projectId: "pwa-project-a5e0a",
    storageBucket: "pwa-project-a5e0a.appspot.com",
    messagingSenderId: "524713814180",
    appId: "1:524713814180:web:a9a85408e88bc9a51c5e31"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);

export { db };
