import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAMHfJp1ec85QBo-mnke89qtiYGen9zTSE",
    authDomain: "sveltefire-testing.firebaseapp.com",
    databaseURL: "https://sveltefire-testing.firebaseio.com",
    projectId: "sveltefire-testing",
    storageBucket: "sveltefire-testing.appspot.com",
    messagingSenderId: "1030648105982",
    appId: "1:1030648105982:web:2afebc34841fa242ed4eaf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);