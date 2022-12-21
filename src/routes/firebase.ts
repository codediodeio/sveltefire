import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBOL3Y80Y6JASfwgvyq8IL6FlnrBQBN_0E",
    authDomain: "testing-proj-b7c60.firebaseapp.com",
    projectId: "testing-proj-b7c60",
    storageBucket: "testing-proj-b7c60.appspot.com",
    messagingSenderId: "665240273060",
    appId: "1:665240273060:web:b81550e114a46af9116631"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);